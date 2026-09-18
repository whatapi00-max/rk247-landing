import logger from '../config/logger.js';
import supabase from '../config/database.js';
import apayService from './apayService.js';

class WithdrawalService {
  async createWithdrawal(walletId, userId, amount, paymentSystem, accountData) {
    try {
      // Validate amount
      if (amount < 500) {
        throw new Error('Minimum withdrawal amount is PKR 500');
      }

      if (amount > 150000) {
        throw new Error('Maximum withdrawal amount is PKR 150,000');
      }

      // Get current balance
      const { data: wallet, error: walletError } = await supabase
        .from('wallets')
        .select('balance')
        .eq('id', walletId)
        .single();

      if (walletError || !wallet) {
        throw new Error('Wallet not found');
      }

      // Check sufficient balance
      const currentBalance = parseFloat(wallet.balance);
      if (currentBalance < amount) {
        throw new Error('Insufficient balance for withdrawal');
      }

      // IMMEDIATELY DEDUCT from user wallet when withdrawal is submitted
      const newBalance = currentBalance - parseFloat(amount);
      const { error: updateBalanceError } = await supabase
        .from('wallets')
        .update({ balance: newBalance })
        .eq('id', walletId);

      if (updateBalanceError) throw updateBalanceError;

      // Create withdrawal transaction with pending status (requires admin approval)
      const { data: transaction, error: txError } = await supabase
        .from('transactions')
        .insert({
          wallet_id: walletId,
          type: 'withdrawal',
          amount,
          description: `Withdrawal via ${paymentSystem} - Pending approval (Amount deducted from wallet)`,
          status: 'pending'
        })
        .select()
        .single();

      if (txError) throw txError;

      // Create withdrawal record with pending status
      const { data: withdrawal, error: withdrawalError } = await supabase
        .from('withdrawals')
        .insert({
          transaction_id: transaction.id,
          wallet_id: walletId,
          user_id: userId,
          amount,
          payment_system: paymentSystem,
          account_data: accountData,
          status: 'pending'
        })
        .select()
        .single();

      if (withdrawalError) throw withdrawalError;

      logger.info(`Withdrawal created for user ${userId}: PKR ${amount} - Amount deducted from wallet. Previous balance: ${currentBalance}, New balance: ${newBalance}`, {
        withdrawal_id: withdrawal.id,
        transaction_id: transaction.id,
        previous_balance: currentBalance,
        new_balance: newBalance
      });

      return {
        withdrawal_id: withdrawal.id,
        transaction_id: transaction.id,
        amount,
        status: 'pending',
        previous_balance: currentBalance,
        new_balance: newBalance
      };
    } catch (error) {
      logger.error('Withdrawal creation error:', error);
      throw error;
    }
  }

  async getWithdrawals(userId, limit = 20) {
    try {
      const { data: withdrawals, error } = await supabase
        .from('withdrawals')
        .select(`
          id,
          transaction_id,
          amount,
          payment_system,
          status,
          created_at,
          updated_at
        `)
        .eq('user_id', userId)
        .order('created_at', { ascending: false })
        .limit(limit);

      if (error) throw error;

      return withdrawals || [];
    } catch (error) {
      logger.error('Get withdrawals error:', error);
      throw error;
    }
  }

  async getWithdrawalStatus(withdrawalId) {
    try {
      const { data: withdrawal, error } = await supabase
        .from('withdrawals')
        .select('*')
        .eq('id', withdrawalId)
        .single();

      if (error) throw error;

      return withdrawal;
    } catch (error) {
      logger.error('Get withdrawal status error:', error);
      throw error;
    }
  }

  async updateWithdrawalStatus(withdrawalId, status) {
    try {
      const { data: withdrawal, error } = await supabase
        .from('withdrawals')
        .update({ status, updated_at: new Date().toISOString() })
        .eq('id', withdrawalId)
        .select()
        .single();

      if (error) throw error;

      // Update transaction status
      await supabase
        .from('transactions')
        .update({ status })
        .eq('id', withdrawal.transaction_id);

      logger.info(`Withdrawal ${withdrawalId} status updated to ${status}`);

      return withdrawal;
    } catch (error) {
      logger.error('Update withdrawal status error:', error);
      throw error;
    }
  }

  async approveWithdrawal(withdrawalId, adminId) {
    try {
      const withdrawal = await this.getWithdrawalStatus(withdrawalId);

      if (withdrawal.status !== 'pending') {
        throw new Error('Only pending withdrawals can be approved');
      }

      // Automatic payout via A-Pay — enabled with APAY_AUTO_PAYOUT=true and
      // only for payment systems whose data shape we can build. Any A-Pay
      // failure leaves the withdrawal 'pending' so the admin can retry.
      const autoPayoutSystems = ['easypaisa', 'jazzcash', 'nayapay_l'];
      const autoPayout = process.env.APAY_AUTO_PAYOUT === 'true' &&
        autoPayoutSystems.includes(withdrawal.payment_system);

      if (autoPayout) {
        const apayResult = await apayService.createWithdrawal(withdrawal);

        // Store APay order_id on the linked transaction so callbacks and the
        // reconciler can find this withdrawal again.
        await supabase
          .from('transactions')
          .update({
            order_id: apayResult.order_id,
            description: `Withdrawal via ${withdrawal.payment_system} — A-Pay payout processing (order ${apayResult.order_id})`
          })
          .eq('id', withdrawal.transaction_id);

        const { data: processingWithdrawal, error: pwError } = await supabase
          .from('withdrawals')
          .update({ status: 'processing', updated_at: new Date().toISOString() })
          .eq('id', withdrawalId)
          .select()
          .single();

        if (pwError) throw pwError;

        await supabase.from('admin_actions').insert({
          admin_id: adminId,
          action_type: 'approve_withdrawal',
          target_user_id: withdrawal.user_id,
          target_wallet_id: withdrawal.wallet_id,
          details: {
            withdrawal_id: withdrawalId,
            amount: withdrawal.amount,
            payment_system: withdrawal.payment_system,
            transaction_id: withdrawal.transaction_id,
            apay_order_id: apayResult.order_id,
            note: 'Payout sent to A-Pay — completes when A-Pay confirms'
          }
        });

        logger.info(`Withdrawal ${withdrawalId} approved — A-Pay payout ${apayResult.order_id} processing`);
        return processingWithdrawal;
      }

      // Update withdrawal status to approved
      const { data: updatedWithdrawal, error: withdrawalError } = await supabase
        .from('withdrawals')
        .update({ status: 'approved', updated_at: new Date().toISOString() })
        .eq('id', withdrawalId)
        .select()
        .single();

      if (withdrawalError) throw withdrawalError;

      // Update transaction status to completed (since admin approved it)
      await supabase
        .from('transactions')
        .update({ 
          status: 'completed',
          description: `Withdrawal via ${withdrawal.payment_system} - Approved by admin. Amount will be transferred to user.`
        })
        .eq('id', withdrawal.transaction_id);

      // Log admin action
      await supabase.from('admin_actions').insert({
        admin_id: adminId,
        action_type: 'approve_withdrawal',
        target_user_id: withdrawal.user_id,
        target_wallet_id: withdrawal.wallet_id,
        details: {
          withdrawal_id: withdrawalId,
          amount: withdrawal.amount,
          payment_system: withdrawal.payment_system,
          transaction_id: withdrawal.transaction_id,
          note: 'Amount was already deducted from user wallet when withdrawal was submitted'
        }
      });

      logger.info(`Withdrawal ${withdrawalId} approved by admin. Amount PKR ${withdrawal.amount} will be transferred to user. (Amount was already deducted from wallet on submission)`);

      return updatedWithdrawal;
    } catch (error) {
      logger.error('Approve withdrawal error:', error);
      throw error;
    }
  }

  async rejectWithdrawal(withdrawalId, reason, adminId) {
    try {
      const withdrawal = await this.getWithdrawalStatus(withdrawalId);

      if (withdrawal.status !== 'pending') {
        throw new Error('Only pending withdrawals can be rejected');
      }

      // Update withdrawal status to rejected
      const { data: updatedWithdrawal, error: withdrawalError } = await supabase
        .from('withdrawals')
        .update({ status: 'rejected', updated_at: new Date().toISOString() })
        .eq('id', withdrawalId)
        .select()
        .single();

      if (withdrawalError) throw withdrawalError;

      // Update transaction status to failed
      await supabase
        .from('transactions')
        .update({ 
          status: 'failed',
          description: `Withdrawal via ${withdrawal.payment_system} - Rejected by admin: ${reason}`
        })
        .eq('id', withdrawal.transaction_id);

      // REFUND the amount back to user wallet (since it was deducted on submission)
      const { data: wallet, error: walletFetchError } = await supabase
        .from('wallets')
        .select('balance')
        .eq('id', withdrawal.wallet_id)
        .single();

      if (walletFetchError || !wallet) {
        throw new Error('Wallet not found for refund');
      }

      const previousBalance = parseFloat(wallet.balance);
      const refundedBalance = previousBalance + parseFloat(withdrawal.amount);

      const { error: refundError } = await supabase
        .from('wallets')
        .update({ balance: refundedBalance })
        .eq('id', withdrawal.wallet_id);

      if (refundError) throw refundError;

      // Log admin action
      await supabase.from('admin_actions').insert({
        admin_id: adminId,
        action_type: 'reject_withdrawal',
        target_user_id: withdrawal.user_id,
        target_wallet_id: withdrawal.wallet_id,
        details: {
          withdrawal_id: withdrawalId,
          amount: withdrawal.amount,
          payment_system: withdrawal.payment_system,
          reason,
          transaction_id: withdrawal.transaction_id,
          previous_balance: previousBalance,
          refunded_balance: refundedBalance,
          note: 'Amount refunded to user wallet'
        }
      });

      logger.info(`Withdrawal ${withdrawalId} rejected by admin. Reason: ${reason}. Amount PKR ${withdrawal.amount} refunded to wallet. Previous balance: ${previousBalance}, New balance: ${refundedBalance}`);

      return updatedWithdrawal;
    } catch (error) {
      logger.error('Reject withdrawal error:', error);
      throw error;
    }
  }

  async completeWithdrawal(withdrawalId) {
    try {
      const withdrawal = await this.getWithdrawalStatus(withdrawalId);

      if (withdrawal.status !== 'approved') {
        throw new Error('Only approved withdrawals can be completed');
      }

      // Update status to completed
      await this.updateWithdrawalStatus(withdrawalId, 'completed');

      logger.info(`Withdrawal ${withdrawalId} completed`);

      return withdrawal;
    } catch (error) {
      logger.error('Complete withdrawal error:', error);
      throw error;
    }
  }

  // Called when the A-Pay withdrawal webhook/reconciler reports Success —
  // the payout has reached the user's account.
  async markWithdrawalPaid(withdrawalId) {
    const withdrawal = await this.getWithdrawalStatus(withdrawalId);

    if (withdrawal.status !== 'processing') {
      logger.info(`Withdrawal ${withdrawalId} already ${withdrawal.status} — skipping paid marking`);
      return withdrawal;
    }

    const { data: updated, error } = await supabase
      .from('withdrawals')
      .update({ status: 'completed', updated_at: new Date().toISOString() })
      .eq('id', withdrawalId)
      .select()
      .single();

    if (error) throw error;

    await supabase
      .from('transactions')
      .update({
        status: 'completed',
        description: `Withdrawal via ${withdrawal.payment_system} — paid out by A-Pay`
      })
      .eq('id', withdrawal.transaction_id);

    logger.info(`Withdrawal ${withdrawalId} marked paid — PKR ${withdrawal.amount} reached user's ${withdrawal.payment_system} account`);
    return updated;
  }

  // Called when the A-Pay withdrawal webhook/reconciler reports Failed/Rejected —
  // payout failed, so the deducted amount is refunded to the user's wallet.
  async markWithdrawalFailed(withdrawalId, apayStatus = 'failed') {
    const withdrawal = await this.getWithdrawalStatus(withdrawalId);

    if (withdrawal.status !== 'processing') {
      logger.info(`Withdrawal ${withdrawalId} already ${withdrawal.status} — skipping failed marking`);
      return withdrawal;
    }

    const { data: updated, error } = await supabase
      .from('withdrawals')
      .update({ status: 'rejected', updated_at: new Date().toISOString() })
      .eq('id', withdrawalId)
      .select()
      .single();

    if (error) throw error;

    await supabase
      .from('transactions')
      .update({
        status: 'failed',
        description: `Withdrawal via ${withdrawal.payment_system} — A-Pay payout ${apayStatus}. Amount refunded.`
      })
      .eq('id', withdrawal.transaction_id);

    // Refund the deducted amount back to the wallet
    const { data: wallet, error: walletFetchError } = await supabase
      .from('wallets')
      .select('balance')
      .eq('id', withdrawal.wallet_id)
      .single();

    if (walletFetchError || !wallet) {
      throw new Error('Wallet not found for refund');
    }

    const refundedBalance = parseFloat(wallet.balance) + parseFloat(withdrawal.amount);
    const { error: refundError } = await supabase
      .from('wallets')
      .update({ balance: refundedBalance })
      .eq('id', withdrawal.wallet_id);

    if (refundError) throw refundError;

    logger.info(`Withdrawal ${withdrawalId} payout ${apayStatus} — PKR ${withdrawal.amount} refunded to wallet (new balance ${refundedBalance})`);
    return updated;
  }
}

export default new WithdrawalService();
