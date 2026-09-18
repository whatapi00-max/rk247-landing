import supabase from '../config/database.js';
import apayService from '../services/apayService.js';
import walletService from '../services/walletService.js';
import withdrawalService from '../services/withdrawalService.js';
import logger from '../config/logger.js';

// Poll A-Pay for deposits stuck in "pending" so a missed/delayed webhook
// still results in the wallet being credited. Runs alongside the webhook —
// the atomic claim on transactions.status='pending' guarantees a deposit can
// never be credited twice, whichever path processes it first.

// Interval is configurable — the default of 10 min is a single lightweight
// SELECT per cycle, and writes only happen for deposits that are actually stuck.
const POLL_INTERVAL_MS = (parseInt(process.env.RECONCILE_INTERVAL_MINUTES, 10) || 10) * 60 * 1000;
const MIN_AGE_MS = 3 * 60 * 1000;         // give the webhook 3 min to arrive first
const MAX_AGE_MS = 24 * 60 * 60 * 1000;   // stop checking after 24h (page expired)

async function processDeposit(payment) {
  const info = await apayService.getPaymentStatus(payment.order_id);

  if (!info || info.success !== true || !info.status) {
    logger.warn(`Reconcile: no status for order ${payment.order_id}`, info);
    return;
  }

  if (info.status === 'Success') {
    // Atomically claim — only succeeds while still pending, so a webhook
    // arriving at the same moment cannot double-credit
    const { data: claimed, error: claimError } = await supabase
      .from('transactions')
      .update({ status: 'completed', updated_at: new Date().toISOString() })
      .eq('id', payment.transaction_id)
      .eq('status', 'pending')
      .select('wallet_id')
      .single();

    await supabase
      .from('apay_payments')
      .update({ status: 'completed', callback_data: info, updated_at: new Date().toISOString() })
      .eq('id', payment.id);

    if (claimError || !claimed) {
      logger.info(`Reconcile: transaction ${payment.transaction_id} already processed — status synced only`);
      return;
    }

    await walletService.updateWalletBalance(claimed.wallet_id, payment.amount, 'add');
    logger.info(`Reconcile: credited ${payment.amount} to wallet ${claimed.wallet_id} (order ${payment.order_id} — webhook was missed)`);
  } else if (info.status === 'Failed' || info.status === 'Rejected') {
    const status = info.status === 'Failed' ? 'failed' : 'rejected';

    await supabase
      .from('transactions')
      .update({ status, updated_at: new Date().toISOString() })
      .eq('id', payment.transaction_id)
      .eq('status', 'pending');

    await supabase
      .from('apay_payments')
      .update({ status, callback_data: info, updated_at: new Date().toISOString() })
      .eq('id', payment.id);

    logger.info(`Reconcile: marked order ${payment.order_id} as ${status}`);
  }
  // Still pending on A-Pay's side — check again next cycle
}

async function processWithdrawal(withdrawal) {
  const info = await apayService.getWithdrawalInfo(withdrawal.order_id);
  if (!info || info.success !== true || !info.status) return;

  if (info.status === 'Success') {
    await withdrawalService.markWithdrawalPaid(withdrawal.id);
  } else if (info.status === 'Failed' || info.status === 'Rejected') {
    await withdrawalService.markWithdrawalFailed(withdrawal.id, info.status.toLowerCase());
  }
}

async function reconcile() {
  try {
    const cutoffMin = new Date(Date.now() - MAX_AGE_MS).toISOString();
    const cutoffMax = new Date(Date.now() - MIN_AGE_MS).toISOString();

    const { data: pending, error } = await supabase
      .from('apay_payments')
      .select('id, order_id, amount, transaction_id')
      .eq('status', 'pending')
      .not('order_id', 'is', null)
      .lt('created_at', cutoffMax)
      .gt('created_at', cutoffMin)
      .limit(50);

    if (error) {
      logger.error('Reconcile: failed to fetch pending deposits:', error);
      return;
    }

    for (const payment of pending || []) {
      try {
        await processDeposit(payment);
      } catch (err) {
        logger.error(`Reconcile: error processing order ${payment.order_id}:`, err.message);
      }
    }

    // Withdrawal payouts stuck in "processing" — same missed-callback safety net
    const { data: procList } = await supabase
      .from('withdrawals')
      .select('id, transaction_id')
      .eq('status', 'processing')
      .limit(50);

    for (const wd of procList || []) {
      try {
        const { data: tx } = await supabase
          .from('transactions')
          .select('order_id')
          .eq('id', wd.transaction_id)
          .single();

        if (tx?.order_id) {
          await processWithdrawal({ id: wd.id, order_id: tx.order_id });
        }
      } catch (err) {
        logger.error(`Reconcile: error processing withdrawal ${wd.id}:`, err.message);
      }
    }
  } catch (err) {
    logger.error('Reconcile: unexpected error:', err);
  }
}

export function startDepositReconciliation() {
  logger.info(`Deposit reconciliation started (every ${POLL_INTERVAL_MS / 60000} min)`);
  const timer = setInterval(reconcile, POLL_INTERVAL_MS);
  timer.unref(); // don't keep the process alive just for this
  reconcile();   // run once at startup
}
