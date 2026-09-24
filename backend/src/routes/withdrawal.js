import express from 'express';
import withdrawalService from '../services/withdrawalService.js';
import walletService from '../services/walletService.js';
import { authenticate } from '../middleware/auth.js';
import { validate } from '../middleware/validation.js';
import { paymentLimiter } from '../middleware/rateLimiter.js';
import logger from '../config/logger.js';
import Joi from 'joi';

const router = express.Router();

// Validation schemas
const schemas = {
  withdrawal: Joi.object({
    amount: Joi.number().min(500).max(150000).required(),
    // Only systems enabled for withdrawals on the A-Pay project
    payment_system: Joi.string().valid('raast_p2p', 'easypaisa', 'nayapay_l').required(),
    account_data: Joi.object().required()
  })
};

// Create withdrawal request
router.post('/initiate', authenticate, paymentLimiter, validate(schemas.withdrawal), async (req, res) => {
  try {
    const { amount, payment_system, account_data } = req.body;
    const wallet = await walletService.getWalletByUserId(req.user.id);
    
    const result = await withdrawalService.createWithdrawal(
      wallet.id,
      req.user.id,
      amount,
      payment_system,
      account_data
    );

    logger.info(`Withdrawal initiated for user ${req.user.id}: PKR ${amount}`);

    res.json({
      success: true,
      message: 'Withdrawal request created successfully',
      data: result
    });
  } catch (error) {
    logger.error('Withdrawal initiation error:', error);
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
});

// Get user's withdrawals
router.get('/list', authenticate, async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 20;
    const withdrawals = await withdrawalService.getWithdrawals(req.user.id, limit);
    
    res.json({
      success: true,
      data: withdrawals
    });
  } catch (error) {
    logger.error('Get withdrawals error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch withdrawals'
    });
  }
});

// Get withdrawal status
router.get('/status/:id', authenticate, async (req, res) => {
  try {
    const withdrawal = await withdrawalService.getWithdrawalStatus(req.params.id);
    
    if (!withdrawal || withdrawal.user_id !== req.user.id) {
      return res.status(404).json({
        success: false,
        error: 'Withdrawal not found'
      });
    }

    res.json({
      success: true,
      data: withdrawal
    });
  } catch (error) {
    logger.error('Get withdrawal status error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch withdrawal status'
    });
  }
});

export default router;
