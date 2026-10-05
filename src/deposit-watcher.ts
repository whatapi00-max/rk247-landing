import api from './services/api';

/**
 * Watches a deposit transaction while the user pays in a new tab.
 * Shows a waiting overlay, polls every 5s, and resolves when the
 * webhook marks the transaction completed/failed. Returns a stop fn.
 */
export function watchDeposit(
  transactionId: string,
  amount: number,
  onComplete?: () => void
): () => void {
  const overlay = document.createElement('div');
  overlay.className = 'fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[60] p-4';
  overlay.innerHTML = `
    <div class="bg-ink-800 border border-white/10 rounded-2xl p-6 sm:p-8 max-w-md w-full shadow-card text-center">
      <div id="dwSpinner" class="mx-auto mb-4 w-10 h-10 border-4 border-white/10 border-t-rk-green rounded-full animate-spin"></div>
      <h3 id="dwTitle" class="text-xl font-bold text-white mb-2">Waiting for payment</h3>
      <p id="dwMsg" class="text-white/60 text-sm mb-6">Complete the payment in the tab that just opened. This page updates automatically — PKR ${amount.toLocaleString()}.</p>
      <button id="dwClose" class="px-6 py-2 bg-white/[0.04] border border-white/10 hover:bg-white/[0.08] text-white rounded-lg transition text-sm">Close</button>
    </div>`;
  document.body.appendChild(overlay);

  let stopped = false;
  const stop = () => {
    stopped = true;
    clearInterval(timer);
    overlay.remove();
  };
  overlay.querySelector('#dwClose')?.addEventListener('click', stop);

  const setState = (title: string, msg: string, spinning: boolean, color = 'text-white') => {
    const t = overlay.querySelector('#dwTitle');
    const m = overlay.querySelector('#dwMsg');
    const s = overlay.querySelector('#dwSpinner') as HTMLElement;
    if (t) { t.textContent = title; t.className = `text-xl font-bold mb-2 ${color}`; }
    if (m) m.textContent = msg;
    if (s) s.style.display = spinning ? '' : 'none';
  };

  const timer = setInterval(async () => {
    try {
      const res = await api.wallet.getTransactions({ limit: 15 });
      const tx = (res.data.data || []).find((t: any) => t.id === transactionId);
      if (!tx) return;
      if (tx.status === 'completed') {
        setState('Payment received', `PKR ${amount.toLocaleString()} has been credited to your wallet.`, false, 'text-rk-green');
        onComplete?.();
        clearInterval(timer);
        setTimeout(stop, 4000);
      } else if (tx.status === 'failed' || tx.status === 'rejected') {
        setState('Payment failed', 'The deposit could not be completed. Any amount held has been released.', false, 'text-red-300');
        clearInterval(timer);
      }
    } catch {
      // transient errors — keep polling
    }
  }, 5000);

  // Give up after 5 minutes — deposit stays pending and the reconciler handles it
  setTimeout(() => {
    if (!stopped) {
      setState('Still processing', 'Payment is taking longer than usual. Check your Account Statement — it updates automatically once confirmed.', false);
      clearInterval(timer);
    }
  }, 5 * 60 * 1000);

  return stop;
}
