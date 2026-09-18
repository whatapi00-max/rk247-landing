import supabase from '../config/database.js';
import logger from '../config/logger.js';
import { v4 as uuidv4 } from 'uuid';

class WalletService {
  async getWalletByUserId(userId) {
    try {
      const { data, error } = await supabase
        .from('wallets')
        .select('*')
        .eq('user_id', userId)
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      logger.error('Error fetching wallet:', error);
      throw new Error('Failed to fetch wallet');
    }
  }

  async getBalance(userId) {
    try {
      const wallet = await this.getWalletByUserId(userId);
      return {
        balance: parseFloat(wallet.balance),
        currency: wallet.currency
      };
    } catch (error) {
      logger.error('Error getting balance:', error);
      throw error;
    }
  }

  async createTransaction(walletId, type, amount, description = '', metadata = {}) {
    try {
      const { data, error } = await supabase
        .from('transactions')
        .insert({
          wallet_id: walletId,
          type,
          amount,
          description,
          metadata,
          status: 'pending'
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      logger.error('Error creating transaction:', error);
      throw new Error('Failed to create transaction');
    }
  }

  async updateTransactionStatus(transactionId, status, referenceId = null) {
    try {
      const updateData = { status, updated_at: new Date().toISOString() };
      if (referenceId) updateData.reference_id = referenceId;

      const { data, error } = await supabase
        .from('transactions')
        .update(updateData)
        .eq('id', transactionId)
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      logger.error('Error updating transaction status:', error);
      throw error;
    }
  }

  async updateWalletBalance(walletId, amount, operation = 'add') {
    try {
      const { data: wallet, error: fetchError } = await supabase
        .from('wallets')
        .select('balance')
        .eq('id', walletId)
        .single();

      if (fetchError) throw fetchError;

      const currentBalance = parseFloat(wallet.balance);
      const newBalance = operation === 'add' 
        ? currentBalance + parseFloat(amount)
        : currentBalance - parseFloat(amount);

      if (newBalance < 0) {
        throw new Error('Insufficient balance');
      }

      const { data, error } = await supabase
        .from('wallets')
        .update({ 
          balance: newBalance,
          updated_at: new Date().toISOString()
        })
        .eq('id', walletId)
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      logger.error('Error updating wallet balance:', error);
      throw error;
    }
  }

  async getTransactionHistory(userId, limit = 50, offset = 0) {
    try {
      const wallet = await this.getWalletByUserId(userId);

      const { data, error, count } = await supabase
        .from('transactions')
        .select('*, apay_payments(*)', { count: 'exact' })
        .eq('wallet_id', wallet.id)
        .order('created_at', { ascending: false })
        .range(offset, offset + limit - 1);

      if (error) throw error;
      
      return {
        transactions: data,
        pagination: {
          page: Math.floor(offset / limit) + 1,
          limit,
          total: count,
          totalPages: Math.ceil(count / limit)
        }
      };
    } catch (error) {
      logger.error('Error fetching transaction history:', error);
      throw error;
    }
  }

  async deductPoints(walletId, amount, description, adminId) {
    try {
      const wallet = await supabase
        .from('wallets')
        .select('balance, user_id')
        .eq('id', walletId)
        .single();

      if (wallet.error) throw wallet.error;

      if (parseFloat(wallet.data.balance) < parseFloat(amount)) {
        throw new Error('Insufficient balance');
      }

      const transaction = await this.createTransaction(
        walletId,
        'trading_id_deduction',
        amount,
        description,
        { deducted_by: adminId }
      );

      await this.updateWalletBalance(walletId, amount, 'subtract');
      await this.updateTransactionStatus(transaction.id, 'completed');

      await supabase.from('admin_actions').insert({
        admin_id: adminId,
        action_type: 'deduct_points',
        target_user_id: wallet.data.user_id,
        target_wallet_id: walletId,
        details: {
          amount,
          description,
          transaction_id: transaction.id
        }
      });

      return transaction;
    } catch (error) {
      logger.error('Error deducting points:', error);
      throw error;
    }
  }

  async adminAdjustBalance(walletId, amount, type, description, adminId) {
    try {
      const wallet = await supabase
        .from('wallets')
        .select('user_id')
        .eq('id', walletId)
        .single();

      if (wallet.error) throw wallet.error;

      const transaction = await this.createTransaction(
        walletId,
        'admin_adjustment',
        Math.abs(amount),
        description,
        { 
          adjustment_type: type,
          adjusted_by: adminId 
        }
      );

      const operation = type === 'credit' ? 'add' : 'subtract';
      await this.updateWalletBalance(walletId, Math.abs(amount), operation);
      await this.updateTransactionStatus(transaction.id, 'completed');

      await supabase.from('admin_actions').insert({
        admin_id: adminId,
        action_type: 'adjust_balance',
        target_user_id: wallet.data.user_id,
        target_wallet_id: walletId,
        details: {
          amount: Math.abs(amount),
          type,
          description,
          transaction_id: transaction.id
        }
      });

      return transaction;
    } catch (error) {
      logger.error('Error adjusting balance:', error);
      throw error;
    }
  }
}

export default new WalletService();
