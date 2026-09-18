import { api } from '../services/api';
import { authService } from '../services/auth';
import { AppNav, AppFooter, initAppNav } from './app-layout';

export function renderWalletPage(): string {
  return `
    <div class="min-h-screen bg-black">
      ${AppNav('/wallet')}

      <div class="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 py-4 sm:py-6 lg:py-8">
        <div class="mb-6 sm:mb-8">
          <h1 class="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-1 sm:mb-2">My Wallet</h1>
          <p class="text-white/60 text-xs sm:text-sm lg:text-base">Manage your trading funds</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
          <div class="bg-white/[0.04] backdrop-blur-lg rounded-2xl p-4 sm:p-6 border border-white/10">
            <div class="flex items-center justify-between mb-4">
              <h2 class="text-sm sm:text-base lg:text-lg font-semibold text-white/80">Wallet Balance</h2>
              <svg class="w-6 sm:w-8 h-6 sm:h-8 text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 003-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"></path>
              </svg>
            </div>
            <div id="balanceDisplay" class="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-2">
              <div class="animate-pulse bg-white/10 h-8 sm:h-10 lg:h-12 w-40 sm:w-48 rounded"></div>
            </div>
            <p class="text-white/40 text-xs sm:text-sm">Available for trading</p>
          </div>

          <div class="bg-white/[0.04] backdrop-blur-lg rounded-2xl p-4 sm:p-6 border border-white/10">
            <h2 class="text-sm sm:text-base lg:text-lg font-semibold text-white/80 mb-3 sm:mb-4">Quick Actions</h2>
            <div class="space-y-2 sm:space-y-3">
              <button id="depositBtn" class="w-full bg-white/[0.04] border border-white/10 hover:bg-white/[0.08] text-white font-semibold py-2 sm:py-3 rounded-lg transition-all text-xs sm:text-sm">
                Deposit Funds
              </button>
              <a href="/withdrawal" class="w-full bg-white/[0.04] border border-white/10 hover:bg-white/[0.08] text-white font-semibold py-2 sm:py-3 rounded-lg transition-all block text-center text-xs sm:text-sm">
                Withdraw Funds
              </a>
            </div>
          </div>
        </div>

        <div class="bg-white/[0.04] backdrop-blur-lg rounded-2xl p-4 sm:p-6 border border-white/10">
          <h2 class="text-lg sm:text-xl font-semibold text-white/80 mb-4 sm:mb-6">Transaction History</h2>
          <div id="transactionsContainer">
            <div class="text-center py-8">
              <div class="animate-pulse space-y-3">
                <div class="h-4 bg-white/20 rounded w-3/4 mx-auto"></div>
                <div class="h-4 bg-white/20 rounded w-1/2 mx-auto"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      ${AppFooter()}

      <div id="depositModal" class="hidden fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 px-3 sm:px-4">
        <div class="bg-ink-800 backdrop-blur-lg rounded-2xl p-4 sm:p-6 md:p-8 max-w-md w-full border border-white/10 shadow-card">
          <h3 class="text-xl sm:text-2xl font-bold text-white mb-4 sm:mb-6">Deposit Funds</h3>
          <form id="depositForm" class="space-y-3 sm:space-y-4">
            <div>
              <label class="block text-xs sm:text-sm font-medium text-white/80 mb-1.5 sm:mb-2">Payment System</label>
              <div class="relative">
                <button
                  type="button"
                  id="paymentSystemBtn"
                  class="w-full px-3 sm:px-4 py-2 sm:py-3 bg-white/[0.04] border border-white/10 rounded-lg text-white text-xs sm:text-sm focus:outline-none focus:border-white/20 text-left flex justify-between items-center"
                >
                  <span id="paymentSystemText">Select a payment system</span>
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
                  </svg>
                </button>
                <div id="paymentSystemDropdown" class="hidden absolute top-full left-0 right-0 mt-1 bg-ink-900 border border-white/10 rounded-lg shadow-lg z-50">
                  <button type="button" class="payment-option w-full text-left px-3 sm:px-4 py-2 sm:py-3 text-white text-xs sm:text-sm hover:bg-white/10 transition" data-value="">Select a payment system</button>
                  <button type="button" class="payment-option w-full text-left px-3 sm:px-4 py-2 sm:py-3 text-white text-xs sm:text-sm hover:bg-white/10 transition" data-value="raast_p2p">Raast P2P</button>
                  <button type="button" class="payment-option w-full text-left px-3 sm:px-4 py-2 sm:py-3 text-white text-xs sm:text-sm hover:bg-white/10 transition" data-value="easypaisa">Easypaisa (P2C)</button>
                  <button type="button" class="payment-option w-full text-left px-3 sm:px-4 py-2 sm:py-3 text-white text-xs sm:text-sm hover:bg-white/10 transition" data-value="jazzcash_fast">JazzCash Fast (P2C)</button>
                  <button type="button" class="payment-option w-full text-left px-3 sm:px-4 py-2 sm:py-3 text-white text-xs sm:text-sm hover:bg-white/10 transition" data-value="nayapay_l">NayaPay (P2P)</button>
                </div>
                <input type="hidden" id="paymentSystem" required />
              </div>
            </div>
            <div>
              <label class="block text-xs sm:text-sm font-medium text-white/80 mb-1.5 sm:mb-2">Amount (PKR)</label>
              <input
                type="number"
                id="depositAmount"
                min="100"
                max="250000"
                required
                class="w-full px-3 sm:px-4 py-2 sm:py-3 bg-white/[0.04] border border-white/10 rounded-lg text-white placeholder-white/40 text-xs sm:text-sm focus:outline-none focus:border-white/20"
                placeholder="Enter amount (min PKR 100)"
              />
            </div>
            <div id="depositError" class="hidden bg-red-500/10 border border-red-500/20 text-red-300 px-3 sm:px-4 py-2 sm:py-3 rounded-lg text-xs sm:text-sm"></div>
            <div class="flex gap-2 sm:gap-3">
              <button
                type="button"
                id="cancelDepositBtn"
                class="flex-1 px-3 sm:px-4 py-2 sm:py-3 bg-white/[0.04] border border-white/10 hover:bg-white/[0.08] text-white rounded-lg transition text-xs sm:text-sm"
              >
                Cancel
              </button>
              <button
                type="submit"
                id="confirmDepositBtn"
                class="flex-1 px-3 sm:px-4 py-2 sm:py-3 bg-white/[0.04] border border-white/10 hover:bg-white/[0.08] text-white rounded-lg transition text-xs sm:text-sm"
              >
                Proceed
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  `;
}

export function initWalletPage(): void {
  if (!authService.requireAuth()) return;

  initAppNav();

  loadBalance();
  loadTransactions();

  const depositBtn = document.getElementById('depositBtn');
  const depositModal = document.getElementById('depositModal');
  const cancelDepositBtn = document.getElementById('cancelDepositBtn');
  const depositForm = document.getElementById('depositForm') as HTMLFormElement;

  depositBtn?.addEventListener('click', () => {
    depositModal?.classList.remove('hidden');
    initializePaymentDropdown();
  });

  cancelDepositBtn?.addEventListener('click', () => {
    depositModal?.classList.add('hidden');
  });

  depositForm?.addEventListener('submit', async (e) => {
    e.preventDefault();
    await handleDeposit();
  });

  // Initialize dropdown on page load
  initializePaymentDropdown();
}

function initializePaymentDropdown(): void {
  const paymentSystemBtn = document.getElementById('paymentSystemBtn');
  const paymentSystemDropdown = document.getElementById('paymentSystemDropdown');
  const paymentSystemInput = document.getElementById('paymentSystem') as HTMLInputElement;
  const paymentSystemText = document.getElementById('paymentSystemText');
  const paymentOptions = document.querySelectorAll('.payment-option');

  if (!paymentSystemBtn || !paymentSystemDropdown) return;

  // Remove existing listeners by cloning
  const newBtn = paymentSystemBtn.cloneNode(true) as HTMLElement;
  paymentSystemBtn.parentNode?.replaceChild(newBtn, paymentSystemBtn);

  newBtn.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    paymentSystemDropdown.classList.toggle('hidden');
  });

  paymentOptions.forEach(option => {
    const newOption = option.cloneNode(true) as HTMLElement;
    option.parentNode?.replaceChild(newOption, option);
    
    newOption.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      const value = newOption.getAttribute('data-value');
      const text = newOption.textContent;
      if (paymentSystemInput) paymentSystemInput.value = value || '';
      if (paymentSystemText) paymentSystemText.textContent = text || 'Select a payment system';
      paymentSystemDropdown.classList.add('hidden');
    });
  });

  // Close dropdown when clicking outside
  document.addEventListener('click', (e) => {
    if (!newBtn.contains(e.target as Node) && !paymentSystemDropdown.contains(e.target as Node)) {
      paymentSystemDropdown.classList.add('hidden');
    }
  });
}

async function loadBalance(): Promise<void> {
  try {
    const response = await api.wallet.getBalance();
    const { balance } = response.data.data;
    
    const balanceDisplay = document.getElementById('balanceDisplay');
    if (balanceDisplay) {
      balanceDisplay.innerHTML = `PKR ${balance.toLocaleString('en-PK', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    }
  } catch (error) {
    console.error('Failed to load balance:', error);
  }
}

async function loadTransactions(): Promise<void> {
  try {
    const response = await api.wallet.getTransactions({ limit: 20 });
    const transactions = response.data.data;
    
    // Store transactions globally for modal access
    (window as any).walletTransactions = transactions;
    
    const container = document.getElementById('transactionsContainer');
    if (!container) return;

    if (transactions.length === 0) {
      container.innerHTML = `
        <div class="text-center py-8 text-white/40">
          <p>No transactions yet</p>
        </div>
      `;
      return;
    }

    container.innerHTML = `
      <div class="overflow-x-auto">
        <table class="w-full min-w-[900px] text-sm">
          <thead>
            <tr class="border-b border-white/10">
              <th class="text-left py-3 px-4 text-white/60 font-medium">Date</th>
              <th class="text-left py-3 px-4 text-white/60 font-medium">Type</th>
              <th class="text-right py-3 px-4 text-white/60 font-medium">Amount</th>
              <th class="text-left py-3 px-4 text-white/60 font-medium">Status</th>
              <th class="text-left py-3 px-4 text-white/60 font-medium">Payment Method</th>
              <th class="text-left py-3 px-4 text-white/60 font-medium hidden md:table-cell">Description</th>
              <th class="text-left py-3 px-4 text-white/60 font-medium">Order ID</th>
              <th class="text-left py-3 px-4 text-white/60 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            ${transactions.map((tx: any, index: number) => `
              <tr class="border-b border-white/5 hover:bg-white/5">
                <td class="py-3 px-4 text-white/60">${new Date(tx.created_at).toLocaleString()}</td>
                <td class="py-3 px-4">
                  <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getTypeColor(tx.type)}">
                    ${formatType(tx.type)}
                  </span>
                </td>
                <td class="py-3 px-4 text-white font-medium text-right">PKR ${parseFloat(tx.amount).toLocaleString('en-PK')}</td>
                <td class="py-3 px-4">
                  <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(tx.status)}">
                    ${tx.status}
                  </span>
                </td>
                <td class="py-3 px-4 text-white/60 text-xs">${tx.apay_payments?.payment_method ? formatPaymentMethod(tx.apay_payments.payment_method) : '-'}</td>
                <td class="py-3 px-4 text-white/60 text-xs hidden md:table-cell truncate max-w-[150px]">${tx.description || '-'}</td>
                <td class="py-3 px-4 text-white/60 text-xs font-mono">${tx.order_id || tx.apay_payments?.order_id || tx.apay_payments?.apay_transaction_id || '-'}</td>
                <td class="py-3 px-4">
                  <button onclick="window.viewWalletTransactionDetails(${index})" class="px-3 py-1 text-xs rounded bg-white/10 hover:bg-white/20 text-white/80 transition">
                    View
                  </button>
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>

      <!-- Transaction Details Modal -->
      <div id="transactionDetailsModal" class="hidden fixed inset-0 bg-black/80 backdrop-blur-sm z-50" onclick="if (event.target === this) window.closeWalletTransactionDetails()">
        <div class="h-full w-full flex items-start sm:items-center justify-center p-4 sm:p-6" onclick="event.stopPropagation()">
          <div class="bg-ink-850 rounded-2xl p-5 sm:p-6 w-full max-w-2xl border border-white/10 shadow-2xl max-h-[85vh] overflow-y-auto">
            <div class="flex justify-between items-center mb-5">
              <h3 class="text-lg sm:text-xl font-bold text-white">Transaction Details</h3>
              <button type="button" onclick="window.closeWalletTransactionDetails()" class="px-3 py-1 text-sm rounded-lg bg-white/10 hover:bg-white/20 text-white/80 transition">
                Close
              </button>
            </div>
            <div id="transactionDetailsContent" class="space-y-5">
              <p class="text-white/60 text-center py-8">Click a transaction to see details</p>
            </div>
          </div>
        </div>
      </div>
    `;
  } catch (error) {
    console.error('Failed to load transactions:', error);
  }
}

async function handleDeposit(): Promise<void> {
  const paymentSystemSelect = document.getElementById('paymentSystem') as HTMLSelectElement;
  const amountInput = document.getElementById('depositAmount') as HTMLInputElement;
  const errorDiv = document.getElementById('depositError');
  const confirmBtn = document.getElementById('confirmDepositBtn') as HTMLButtonElement;
  
  const paymentSystem = paymentSystemSelect.value;
  const amount = parseFloat(amountInput.value);
  
  if (!paymentSystem) {
    if (errorDiv) {
      errorDiv.textContent = 'Please select a payment system';
      errorDiv.classList.remove('hidden');
    }
    return;
  }
  
  if (amount < 100 || amount > 100000) {
    if (errorDiv) {
      errorDiv.textContent = 'Amount must be between PKR 100 and PKR 250,000';
      errorDiv.classList.remove('hidden');
    }
    return;
  }

  errorDiv?.classList.add('hidden');
  confirmBtn.disabled = true;
  confirmBtn.textContent = 'Processing...';

  try {
    const response = await api.wallet.initiateDeposit(amount, paymentSystem);
    const { payment_url } = response.data.data;
    
    if (!payment_url) {
      throw new Error('No payment URL received from server');
    }
    
    // Redirect to A-Pay payment page
    window.location.href = payment_url;
  } catch (error: any) {
    console.error('Deposit error:', error);
    if (errorDiv) {
      errorDiv.textContent = error.response?.data?.error || 'Failed to initiate deposit. Please try again.';
      errorDiv.classList.remove('hidden');
    }
    confirmBtn.disabled = false;
    confirmBtn.textContent = 'Proceed to Payment';
  }
}

function showPaymentInstructions(paymentData: any, orderId: string, amount: number): void {
  const modal = document.createElement('div');
  modal.className = 'fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4';
  modal.innerHTML = `
    <div class="bg-ink-800 border border-white/10 rounded-2xl p-8 max-w-md w-full shadow-card">
      <h3 class="text-2xl font-bold text-white mb-6">Payment Instructions</h3>
      
      <div class="space-y-4 mb-6">
        <div class="bg-white/[0.04] rounded-lg p-4">
          <p class="text-sm text-white/40 mb-1">Amount to Pay</p>
          <p class="text-2xl font-bold text-white">PKR ${amount.toLocaleString()}</p>
        </div>
        
        <div class="bg-white/[0.04] rounded-lg p-4">
          <p class="text-sm text-white/40 mb-1">Account Number</p>
          <p class="text-xl font-mono text-white">${paymentData.receiver_account_number || 'N/A'}</p>
        </div>
        
        <div class="bg-white/[0.04] rounded-lg p-4">
          <p class="text-sm text-white/40 mb-1">Order ID</p>
          <p class="text-sm font-mono text-white">${orderId}</p>
        </div>
      </div>
      
      <div class="bg-white/[0.04] border border-white/10 rounded-lg p-4 mb-6">
        <p class="text-sm text-white/60">
          <strong>Instructions:</strong><br>
          1. Transfer PKR ${amount.toLocaleString()} to the account number above using Raast<br>
          2. Your balance will be updated automatically after payment confirmation<br>
          3. Keep this order ID for reference
        </p>
      </div>
      
      <button id="closePaymentInstructions" class="w-full bg-white/[0.04] border border-white/10 hover:bg-white/[0.08] text-white font-bold py-3 rounded-lg transition-colors">
        I've Made the Payment
      </button>
    </div>
  `;
  
  document.body.appendChild(modal);
  
  document.getElementById('closePaymentInstructions')?.addEventListener('click', () => {
    modal.remove();
    loadBalance();
    loadTransactions();
  });
}

function getTypeColor(type: string): string {
  const colors: Record<string, string> = {
    deposit: 'bg-white/10 text-white/80',
    withdrawal: 'bg-white/10 text-white/80',
    trading_id_deduction: 'bg-white/10 text-white/80',
    admin_adjustment: 'bg-white/10 text-white/80'
  };
  return colors[type] || 'bg-white/10 text-white/80';
}

function getStatusColor(status: string): string {
  const colors: Record<string, string> = {
    completed: 'bg-white/10 text-white/80',
    pending: 'bg-white/10 text-white/80',
    failed: 'bg-white/10 text-white/80',
    cancelled: 'bg-white/10 text-white/80'
  };
  return colors[status] || 'bg-white/10 text-white/80';
}

function formatType(type: string): string {
  return type.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
}

function formatPaymentMethod(method: string): string {
  const methods: Record<string, string> = {
    'raast_p2p': 'Raast P2P',
    'easypaisa': 'Easypaisa',
    'jazzcash_fast': 'JazzCash Fast',
    'nayapay_l': 'NayaPay'
  };
  return methods[method] || method;
}

(window as any).viewWalletTransactionDetails = (index: number): void => {
  const modal = document.getElementById('transactionDetailsModal');
  const content = document.getElementById('transactionDetailsContent');
  if (!modal || !content) return;

  // Clear any stale inline display (other pages may set style.display)
  modal.style.display = '';

  try {
    const transactions = (window as any).walletTransactions || [];
    const tx = transactions[index];

    if (!tx) {
      content.innerHTML = `
        <div class="text-center py-8 text-red-300">
          <p class="font-semibold">Transaction not found</p>
        </div>
      `;
      modal.classList.remove('hidden');
      return;
    }

    const apay = tx.apay_payments || {};

    content.innerHTML = `
      <div class="space-y-5 text-sm">
        <div>
          <h4 class="text-white/50 text-xs uppercase tracking-wider mb-2">Transaction</h4>
          <div class="bg-white/[0.03] rounded-xl p-4 space-y-3 border border-white/5">
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <p class="text-white/40 text-xs">Transaction ID</p>
                <p class="text-white font-mono text-xs break-all">${tx.id}</p>
              </div>
              <div>
                <p class="text-white/40 text-xs">Date</p>
                <p class="text-white">${new Date(tx.created_at).toLocaleString()}</p>
              </div>
              <div>
                <p class="text-white/40 text-xs">Type</p>
                <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getTypeColor(tx.type)}">${formatType(tx.type)}</span>
              </div>
              <div>
                <p class="text-white/40 text-xs">Amount</p>
                <p class="text-white font-semibold">PKR ${parseFloat(tx.amount).toLocaleString('en-PK')}</p>
              </div>
              <div>
                <p class="text-white/40 text-xs">Status</p>
                <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(tx.status)}">${tx.status}</span>
              </div>
              <div>
                <p class="text-white/40 text-xs">Reference ID</p>
                <p class="text-white font-mono text-xs break-all">${tx.reference_id || '-'}</p>
              </div>
              <div>
                <p class="text-white/40 text-xs">Order ID</p>
                <p class="text-white font-mono text-xs break-all">${tx.order_id || '-'}</p>
              </div>
              <div>
                <p class="text-white/40 text-xs">Payment Method</p>
                <p class="text-white">${apay.payment_method ? formatPaymentMethod(apay.payment_method) : '-'}</p>
              </div>
              <div class="sm:col-span-2">
                <p class="text-white/40 text-xs">Description</p>
                <p class="text-white/90">${tx.description || '-'}</p>
              </div>
              <div>
                <p class="text-white/40 text-xs">Wallet ID</p>
                <p class="text-white font-mono text-xs break-all">${tx.wallet_id}</p>
              </div>
            </div>
          </div>
        </div>

        ${apay.apay_transaction_id || apay.order_id ? `
          <div>
            <h4 class="text-white/50 text-xs uppercase tracking-wider mb-2">A-Pay Payment</h4>
            <div class="bg-white/[0.03] rounded-xl p-4 space-y-3 border border-white/5">
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <p class="text-white/40 text-xs">A-Pay Transaction ID</p>
                  <p class="text-white font-mono text-xs break-all">${apay.apay_transaction_id || '-'}</p>
                </div>
                <div>
                  <p class="text-white/40 text-xs">Order ID</p>
                  <p class="text-white font-mono text-xs break-all">${apay.order_id || '-'}</p>
                </div>
                <div>
                  <p class="text-white/40 text-xs">Payment Method</p>
                  <p class="text-white">${apay.payment_method || '-'}</p>
                </div>
                <div>
                  <p class="text-white/40 text-xs">Payment Status</p>
                  <p class="text-white">${apay.status || '-'}</p>
                </div>
                ${apay.payment_url ? `
                  <div class="sm:col-span-2">
                    <p class="text-white/40 text-xs">Payment URL</p>
                    <a href="${apay.payment_url}" target="_blank" rel="noopener" class="text-rk-green hover:underline text-xs font-mono break-all">${apay.payment_url}</a>
                  </div>
                ` : ''}
              </div>
            </div>
          </div>
        ` : ''}

        <div>
          <h4 class="text-white/50 text-xs uppercase tracking-wider mb-2">Metadata</h4>
          <pre class="bg-black/40 rounded-xl p-4 overflow-x-auto text-xs text-white/70 font-mono border border-white/5">${JSON.stringify(tx.metadata || {}, null, 2)}</pre>
        </div>
      </div>
    `;

    modal.classList.remove('hidden');
  } catch (err) {
    console.error('viewWalletTransactionDetails error:', err);
    content.innerHTML = `
      <div class="text-center py-8 text-red-300">
        <p class="font-semibold">Failed to load details</p>
        <p class="text-sm text-white/60 mt-1">${err instanceof Error ? err.message : 'Unknown error'}</p>
      </div>
    `;
    modal.classList.remove('hidden');
  }
};

(window as any).closeWalletTransactionDetails = (): void => {
  const modal = document.getElementById('transactionDetailsModal');
  if (modal) {
    modal.classList.add('hidden');
    modal.style.display = '';
  }
};
