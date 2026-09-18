import express from 'express';
import apayService from '../services/apayService.js';
import walletService from '../services/walletService.js';
import supabase from '../config/database.js';
import logger from '../config/logger.js';

const router = express.Router();

// A-Pay webhook handler — exported so it can be mounted on multiple paths,
// since the callback URL may be configured differently in the A-Pay panel
export const handleApayCallback = async (req, res) => {
  try {
    logger.info('Received A-Pay webhook callback:', req.body);

    // Verify the webhook signature
    const results = await apayService.verifyPaymentCallback(req.body);

    // Process each transaction
    for (const result of results) {
      const { transaction_id, status, amount } = result;

      try {
        if (status === 'completed') {
          // Atomically claim the transaction — only succeeds while it is
          // still pending, so retried/duplicate callbacks cannot credit twice
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
          logger.info(`Credited ${amount} to wallet ${claimed.wallet_id} for transaction ${transaction_id}`);
        } else if (status === 'failed' || status === 'rejected') {
          const { error: txError } = await supabase
            .from('transactions')
            .update({ status, updated_at: new Date().toISOString() })
            .eq('id', transaction_id)
            .eq('status', 'pending');

          if (txError) {
            logger.error('Failed to update transaction status:', txError);
          }
        }
      } catch (txErr) {
        logger.error(`Failed to process transaction ${transaction_id}:`, txErr);
      }
    }

    // A-Pay requires exactly { "status": "OK" } to acknowledge the callback
    res.json({ status: 'OK' });
  } catch (error) {
    logger.error('Webhook processing error:', error);
    res.status(500).json({ success: false, error: 'Webhook processing failed' });
  }
};

// A-Pay webhook endpoints — /why/callback matches the path configured in the
// A-Pay merchant panel (observed in live callbacks); keep both for safety
router.post(['/apay/callback', '/why/callback'], handleApayCallback);

export default router;
