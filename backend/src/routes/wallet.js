import express from 'express';
import walletService from '../services/walletService.js';
import apayService from '../services/apayService.js';
import { authenticate } from '../middleware/auth.js';
import { validate, schemas } from '../middleware/validation.js';
import { paymentLimiter } from '../middleware/rateLimiter.js';
import logger from '../config/logger.js';
import supabase from '../config/database.js';

const router = express.Router();

router.get('/balance', authenticate, async (req, res) => {
  try {
    const balance = await walletService.getBalance(req.user.id);
    
    res.json({
      success: true,
      data: balance
    });
  } catch (error) {
    logger.error('Get balance error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch balance'
    });
  }
});

router.get('/transactions', authenticate, async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 50;
    const offset = (page - 1) * limit;
    
    const result = await walletService.getTransactionHistory(
      req.user.id,
      limit,
      offset
    );
    
    res.json({
      success: true,
      data: result.transactions,
      pagination: result.pagination
    });
  } catch (error) {
    logger.error('Get transactions error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch transactions'
    });
  }
});

// Per-system maximums from the A-Pay project's configured deposit limits
const MAX_DEPOSIT = {
  raast_p2p: 250000,
  easypaisa: 150000,
  jazzcash_fast: 50000,
  nayapay_l: 150000
};

router.post('/deposit/initiate', authenticate, paymentLimiter, validate(schemas.deposit), async (req, res) => {
  try {
    const { amount, payment_system } = req.body;
    const paymentSystem = payment_system || 'raast_p2p';

    const maxDeposit = MAX_DEPOSIT[paymentSystem] || 150000;
    if (amount > maxDeposit) {
      return res.status(400).json({
        success: false,
        error: `Maximum deposit for ${paymentSystem} is PKR ${maxDeposit.toLocaleString()}`
      });
    }

    const wallet = await walletService.getWalletByUserId(req.user.id);
    
    const transaction = await walletService.createTransaction(
      wallet.id,
      'deposit',
      amount,
      `Deposit via ${paymentSystem}`
    );

    const paymentResult = await apayService.initiatePayment(
      transaction.id,
      amount,
      req.user.id,
      req.user.email,
      req.user.username,
      paymentSystem
    );

    logger.info(`Deposit initiated for user ${req.user.id}: ${amount} via ${paymentSystem}`);

    res.json({
      success: true,
      message: 'Payment initiated successfully',
      data: {
        transaction_id: transaction.id,
        payment_url: paymentResult.payment_url,
        order_id: paymentResult.order_id,
        payment_system: paymentSystem
      }
    });
  } catch (error) {
    logger.error('Deposit initiation error:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

router.post('/deposit/callback', async (req, res) => {
  try {
    const callbackData = req.body;

    logger.info('Payment callback received:', callbackData);

    const results = await apayService.verifyPaymentCallback(callbackData);

    for (const result of results) {
      const { transaction_id, status, amount } = result;

      try {
        if (status === 'completed') {
          // Atomically claim the transaction so duplicate callbacks
          // cannot credit the wallet twice
          const { data: claimed, error: claimError } = await supabase
            .from('transactions')
            .update({ status: 'completed', updated_at: new Date().toISOString() })
            .eq('id', transaction_id)
            .eq('status', 'pending')
            .select('wallet_id')
            .single();

          if (claimError || !claimed) {
            logger.info(`Transaction ${transaction_id} already processed or not found — skipping credit`);
            continue;
          }

          await walletService.updateWalletBalance(claimed.wallet_id, amount, 'add');
          logger.info(`Deposit completed for transaction ${transaction_id}`);
        } else if (status === 'failed' || status === 'rejected') {
          await supabase
            .from('transactions')
            .update({ status, updated_at: new Date().toISOString() })
            .eq('id', transaction_id)
            .eq('status', 'pending');

          logger.warn(`Deposit ${status} for transaction ${transaction_id}`);
        }
      } catch (txErr) {
        logger.error(`Failed to process transaction ${transaction_id}:`, txErr);
      }
    }

    res.json({
      success: true,
      message: 'Callback processed successfully'
    });
  } catch (error) {
    logger.error('Payment callback error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to process callback'
    });
  }
});

router.get('/deposit/status/:transactionId', authenticate, async (req, res) => {
  try {
    const { transactionId } = req.params;
    
    const { data: transaction, error } = await supabase
      .from('transactions')
      .select('*, apay_payments(*)')
      .eq('id', transactionId)
      .single();

    if (error || !transaction) {
      return res.status(404).json({
        success: false,
        error: 'Transaction not found'
      });
    }

    res.json({
      success: true,
      data: {
        transaction_id: transaction.id,
        status: transaction.status,
        amount: transaction.amount,
        created_at: transaction.created_at
      }
    });
  } catch (error) {
    logger.error('Get transaction status error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch transaction status'
    });
  }
});

export default router;
