import api from '../services/api';
import { AppNav, AppFooter, initAppNav } from './app-layout';

export function renderWithdrawalPage(): string {
  return `
    <div class="min-h-screen bg-black text-white">
      ${AppNav('/withdrawal')}

      <div class="max-w-6xl mx-auto px-3 sm:px-4 lg:px-8 py-4 sm:py-6 lg:py-8">
        <!-- Header -->
        <div class="mb-6 sm:mb-8">
          <h1 class="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-2">Withdraw Funds</h1>
          <p class="text-white/60 text-sm sm:text-base">Request a withdrawal from your wallet</p>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
          <!-- Withdrawal Form -->
          <div class="lg:col-span-2">
            <div class="bg-white/[0.04] border border-white/10 rounded-2xl p-4 sm:p-6 lg:p-8">
              <h2 class="text-xl sm:text-2xl font-bold text-white/80 mb-4 sm:mb-6">Create Withdrawal Request</h2>

              <form id="withdrawalForm" class="space-y-4 sm:space-y-6">
                <!-- Amount -->
                <div>
                  <label class="block text-xs sm:text-sm font-semibold text-white/80 mb-1.5 sm:mb-2">Amount (PKR)</label>
                  <input 
                    type="number" 
                    id="withdrawalAmount" 
                    placeholder="Enter amount" 
                    class="w-full bg-white/[0.04] border border-white/10 rounded-lg px-3 sm:px-4 py-2 sm:py-3 text-white placeholder-white/40 text-xs sm:text-sm focus:outline-none focus:border-white/20"
                    min="500"
                    max="150000"
                    step="100"
                  />
                  <p class="text-[10px] sm:text-xs text-white/40 mt-1">Min: PKR 500 | Max: PKR 150,000</p>
                </div>

                <!-- Payment System -->
                <div>
                  <label class="block text-xs sm:text-sm font-semibold text-white/80 mb-1.5 sm:mb-2">Payment System</label>
                  <select 
                    id="paymentSystem" 
                    class="w-full bg-white/[0.04] border border-white/10 rounded-lg px-3 sm:px-4 py-2 sm:py-3 text-white text-xs sm:text-sm focus:outline-none focus:border-white/20"
                  >
                    <option value="">Select payment system</option>
                    <option value="raast_p2p">Raast P2P</option>
                    <option value="easypaisa">EasyPaisa</option>
                    <option value="jazzcash">JazzCash</option>
                    <option value="nayapay">NayaPay</option>
                  </select>
                </div>

                <!-- Account Number -->
                <div>
                  <label class="block text-xs sm:text-sm font-semibold text-white/80 mb-1.5 sm:mb-2">Account Number</label>
                  <input 
                    type="text" 
                    id="accountNumber" 
                    placeholder="Enter your account number" 
                    class="w-full bg-white/[0.04] border border-white/10 rounded-lg px-3 sm:px-4 py-2 sm:py-3 text-white placeholder-white/40 text-xs sm:text-sm focus:outline-none focus:border-white/20"
                  />
                </div>

                <!-- Account Name -->
                <div>
                  <label class="block text-xs sm:text-sm font-semibold text-white/80 mb-1.5 sm:mb-2">Account Name</label>
                  <input 
                    type="text" 
                    id="accountName" 
                    placeholder="Enter account holder name" 
                    class="w-full bg-white/[0.04] border border-white/10 rounded-lg px-3 sm:px-4 py-2 sm:py-3 text-white placeholder-white/40 text-xs sm:text-sm focus:outline-none focus:border-white/20"
                  />
                </div>

                <!-- Error Message -->
                <div id="withdrawalError" class="hidden bg-red-500/10 border border-red-500/20 rounded-lg p-3 sm:p-4 text-red-300 text-xs sm:text-sm"></div>

                <!-- Submit Button -->
                <button 
                  type="submit" 
                  id="submitWithdrawalBtn"
                  class="w-full bg-white/[0.04] border border-white/10 hover:bg-white/[0.08] text-white font-bold py-2 sm:py-3 rounded-lg transition-colors text-xs sm:text-sm"
                >
                  Request Withdrawal
                </button>
              </form>
            </div>
          </div>

          <!-- Info Sidebar -->
          <div class="space-y-4 sm:space-y-6">
            <!-- Balance Card -->
            <div class="bg-white/[0.04] border border-white/10 rounded-2xl p-4 sm:p-6">
              <p class="text-white/40 text-xs sm:text-sm mb-2">Available Balance</p>
              <p id="balanceDisplay" class="text-2xl sm:text-3xl font-bold text-white">PKR 0.00</p>
              <p class="text-[10px] sm:text-xs text-white/40 mt-2">Amount you can withdraw</p>
            </div>

            <!-- Info Card -->
            <div class="bg-white/[0.04] border border-white/10 rounded-2xl p-4 sm:p-6">
              <h3 class="font-bold text-white/80 mb-3 text-sm sm:text-base">Withdrawal Info</h3>
              <ul class="space-y-2 text-xs sm:text-sm text-white/60">
                <li>✓ Min: PKR 500</li>
                <li>✓ Max: PKR 150,000</li>
                <li>✓ Processing: 1-2 hours</li>
                <li>✓ No fees</li>
              </ul>
            </div>

            <!-- Payment Systems -->
            <div class="bg-white/[0.04] border border-white/10 rounded-2xl p-4 sm:p-6">
              <h3 class="font-bold text-white/80 mb-3 text-sm sm:text-base">Supported Systems</h3>
              <ul class="space-y-2 text-xs sm:text-sm text-white/60">
                <li>• Raast P2P</li>
                <li>• EasyPaisa</li>
                <li>• JazzCash</li>
                <li>• NayaPay</li>
              </ul>
            </div>
          </div>
        </div>

        <!-- Withdrawal History -->
        <div class="mt-8 sm:mt-12">
          <h2 class="text-xl sm:text-2xl font-bold text-white/80 mb-4 sm:mb-6">Withdrawal History</h2>
          <div class="bg-white/[0.04] border border-white/10 rounded-2xl p-4 sm:p-8">
            <div id="withdrawalsContainer">
              <div class="text-center py-8 text-white/40 text-sm">
                <p>Loading withdrawals...</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      ${AppFooter()}
    </div>
  `;
}

export function initializeWithdrawalPage(): void {
  initAppNav();

  const form = document.getElementById('withdrawalForm') as HTMLFormElement;

  form?.addEventListener('submit', async (e) => {
    e.preventDefault();
    await handleWithdrawal();
  });

  loadBalance();
  loadWithdrawals();
}

async function handleWithdrawal(): Promise<void> {
  const amountInput = document.getElementById('withdrawalAmount') as HTMLInputElement;
  const paymentSystemInput = document.getElementById('paymentSystem') as HTMLSelectElement;
  const accountNumberInput = document.getElementById('accountNumber') as HTMLInputElement;
  const accountNameInput = document.getElementById('accountName') as HTMLInputElement;
  const errorDiv = document.getElementById('withdrawalError');
  const submitBtn = document.getElementById('submitWithdrawalBtn') as HTMLButtonElement;

  const amount = parseFloat(amountInput.value);
  const paymentSystem = paymentSystemInput.value;
  const accountNumber = accountNumberInput.value;
  const accountName = accountNameInput.value;

  // Validation
  if (amount < 500 || amount > 150000) {
    if (errorDiv) {
      errorDiv.textContent = 'Amount must be between PKR 500 and PKR 150,000';
      errorDiv.classList.remove('hidden');
    }
    return;
  }

  if (!paymentSystem) {
    if (errorDiv) {
      errorDiv.textContent = 'Please select a payment system';
      errorDiv.classList.remove('hidden');
    }
    return;
  }

  if (!accountNumber || !accountName) {
    if (errorDiv) {
      errorDiv.textContent = 'Please enter account details';
      errorDiv.classList.remove('hidden');
    }
    return;
  }

  errorDiv?.classList.add('hidden');
  submitBtn.disabled = true;
  submitBtn.textContent = 'Processing...';

  try {
    const response = await api.withdrawal.initiateWithdrawal(amount, paymentSystem, {
      account_number: accountNumber,
      account_name: accountName
    });

    if (errorDiv) {
      errorDiv.classList.add('hidden');
    }

    // Show success message
    const successDiv = document.createElement('div');
    successDiv.className = 'fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4';
    successDiv.innerHTML = `
      <div class="bg-ink-800 border border-white/10 rounded-2xl p-8 max-w-md w-full shadow-card">
        <h3 class="text-2xl font-bold text-white mb-4">✓ Withdrawal Requested</h3>
        <p class="text-white/60 mb-6">Your withdrawal request has been submitted successfully.</p>
        <div class="bg-white/[0.04] rounded-lg p-4 mb-6">
          <p class="text-sm text-white/40 mb-1">Amount</p>
          <p class="text-2xl font-bold text-white">PKR ${amount.toLocaleString()}</p>
        </div>
        <p class="text-sm text-white/40 mb-6">Status: <span class="text-white/80">Pending Approval</span></p>
        <button onclick="this.parentElement.parentElement.remove()" class="w-full bg-white/[0.04] border border-white/10 hover:bg-white/[0.08] text-white font-bold py-2 rounded-lg transition">
          Close
        </button>
      </div>
    `;
    document.body.appendChild(successDiv);

    // Reset form
    (document.getElementById('withdrawalForm') as HTMLFormElement).reset();
    loadBalance();
    loadWithdrawals();
  } catch (error: any) {
    if (errorDiv) {
      errorDiv.textContent = error.response?.data?.error || 'Failed to create withdrawal request';
      errorDiv.classList.remove('hidden');
    }
    submitBtn.disabled = false;
    submitBtn.textContent = 'Request Withdrawal';
  }
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

async function loadWithdrawals(): Promise<void> {
  try {
    const response = await api.withdrawal.getWithdrawals({ limit: 20 });
    const withdrawals = response.data.data;
    
    const container = document.getElementById('withdrawalsContainer');
    if (!container) return;

    if (withdrawals.length === 0) {
      container.innerHTML = `
        <div class="text-center py-8 text-gray-400">
          <p>No withdrawals yet</p>
        </div>
      `;
      return;
    }

    container.innerHTML = `
      <div class="overflow-x-auto">
        <table class="w-full">
          <thead>
            <tr class="border-b border-white/10">
              <th class="text-left py-3 px-4 text-white/60 font-semibold">Amount</th>
              <th class="text-left py-3 px-4 text-white/60 font-semibold">System</th>
              <th class="text-left py-3 px-4 text-white/60 font-semibold">Status</th>
              <th class="text-left py-3 px-4 text-white/60 font-semibold">Date</th>
            </tr>
          </thead>
          <tbody>
            ${withdrawals.map((w: any) => `
              <tr class="border-b border-white/5 hover:bg-white/5">
                <td class="py-3 px-4 font-semibold text-white">PKR ${w.amount.toLocaleString()}</td>
                <td class="py-3 px-4 text-white/60">${w.payment_system}</td>
                <td class="py-3 px-4">
                  <span class="px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(w.status)}">
                    ${w.status.charAt(0).toUpperCase() + w.status.slice(1)}
                  </span>
                </td>
                <td class="py-3 px-4 text-white/60">${new Date(w.created_at).toLocaleDateString()}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    `;
  } catch (error) {
    console.error('Failed to load withdrawals:', error);
  }
}

function getStatusColor(status: string): string {
  const colors: Record<string, string> = {
    pending: 'bg-yellow-500/20 text-yellow-300 border border-yellow-500/30',
    approved: 'bg-blue-500/20 text-blue-300 border border-blue-500/30',
    completed: 'bg-green-500/20 text-green-300 border border-green-500/30',
    rejected: 'bg-red-500/20 text-red-300 border border-red-500/30'
  };
  return colors[status] || 'bg-white/10 text-white/80';
}
