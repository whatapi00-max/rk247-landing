import api from '../services/api';
import { AppNav, AppFooter, initAppNav } from './app-layout';

export function renderAccountStatementPage(): string {
  return `
    <div class="min-h-screen bg-black text-white">
      ${AppNav('/account-statement')}

      <div class="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 py-4 sm:py-6 lg:py-8">
        <!-- Header -->
        <div class="mb-4 sm:mb-6 lg:mb-8">
          <h1 class="text-xl sm:text-2xl lg:text-4xl font-bold text-white mb-1 sm:mb-2">Account Statement</h1>
          <p class="text-white/60 text-xs sm:text-sm lg:text-base">View your complete transaction history</p>
        </div>

        <!-- Summary Cards -->
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 lg:gap-6 mb-4 sm:mb-6 lg:mb-8">
          <div class="bg-white/[0.04] border border-white/10 rounded-2xl p-3 sm:p-4 lg:p-6">
            <p class="text-white/40 text-[10px] sm:text-xs lg:text-sm mb-1.5 sm:mb-2">Total Deposits</p>
            <p id="totalDeposits" class="text-lg sm:text-xl lg:text-2xl font-bold text-white">PKR 0.00</p>
          </div>
          <div class="bg-white/[0.04] border border-white/10 rounded-2xl p-3 sm:p-4 lg:p-6">
            <p class="text-white/40 text-[10px] sm:text-xs lg:text-sm mb-1.5 sm:mb-2">Total Withdrawals</p>
            <p id="totalWithdrawals" class="text-lg sm:text-xl lg:text-2xl font-bold text-white">PKR 0.00</p>
          </div>
          <div class="bg-white/[0.04] border border-white/10 rounded-2xl p-3 sm:p-4 lg:p-6">
            <p class="text-white/40 text-[10px] sm:text-xs lg:text-sm mb-1.5 sm:mb-2">Net Balance</p>
            <p id="netBalance" class="text-lg sm:text-xl lg:text-2xl font-bold text-white">PKR 0.00</p>
          </div>
        </div>

        <!-- Transaction History -->
        <div class="bg-white/[0.04] border border-white/10 rounded-2xl p-3 sm:p-4 lg:p-8">
          <h2 class="text-lg sm:text-xl lg:text-2xl font-bold text-white/80 mb-3 sm:mb-4 lg:mb-6">Transaction History</h2>
          <div id="transactionsContainer">
            <div class="text-center py-8 text-white/40 text-sm">
              <p>Loading transactions...</p>
            </div>
          </div>
        </div>
      </div>
      ${AppFooter()}
    </div>
  `;
}

export function initializeAccountStatementPage(): void {
  initAppNav();
  loadTransactions();
}

// Pagination state
let currentPage = 1;
const itemsPerPage = 10;
let allTransactions: any[] = [];

// Pagination functions
function goToPreviousPage(): void {
  if (currentPage > 1) {
    currentPage--;
    renderTransactions();
  }
}

function goToNextPage(): void {
  const totalPages = Math.ceil(allTransactions.length / itemsPerPage);
  if (currentPage < totalPages) {
    currentPage++;
    renderTransactions();
  }
}

function renderTransactions(): void {
  const container = document.getElementById('transactionsContainer');
  if (!container || allTransactions.length === 0) return;

  const totalPages = Math.ceil(allTransactions.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedTransactions = allTransactions.slice(startIndex, endIndex);

  container.innerHTML = `
    <div class="overflow-x-auto">
      <table class="w-full text-xs sm:text-sm">
        <thead>
          <tr class="border-b border-white/10">
            <th class="text-left py-2 sm:py-3 px-2 sm:px-4 text-white/60 font-semibold text-[10px] sm:text-sm">S.No</th>
            <th class="text-left py-2 sm:py-3 px-2 sm:px-4 text-white/60 font-semibold text-[10px] sm:text-sm hidden md:table-cell">Tx ID</th>
            <th class="text-left py-2 sm:py-3 px-2 sm:px-4 text-white/60 font-semibold text-[10px] sm:text-sm">Date</th>
            <th class="text-left py-2 sm:py-3 px-2 sm:px-4 text-white/60 font-semibold text-[10px] sm:text-sm">Type</th>
            <th class="text-right py-2 sm:py-3 px-2 sm:px-4 text-white/60 font-semibold text-[10px] sm:text-sm">Amount</th>
            <th class="text-left py-2 sm:py-3 px-2 sm:px-4 text-white/60 font-semibold text-[10px] sm:text-sm">Status</th>
            <th class="text-left py-2 sm:py-3 px-2 sm:px-4 text-white/60 font-semibold text-[10px] sm:text-sm">Method</th>
          </tr>
        </thead>
        <tbody>
          ${paginatedTransactions.map((tx: any, index: number) => `
            <tr class="border-b border-white/5 hover:bg-white/5">
              <td class="py-2 sm:py-3 px-2 sm:px-4 text-white/60 text-[10px] sm:text-sm font-semibold">
                ${startIndex + index + 1}
              </td>
              <td class="py-2 sm:py-3 px-2 sm:px-4 text-white/60 text-[9px] sm:text-xs font-mono hidden md:table-cell break-all" title="${tx.id || tx.transaction_id || 'N/A'}">
                ${tx.id || tx.transaction_id || 'N/A'}
              </td>
              <td class="py-2 sm:py-3 px-2 sm:px-4 text-white/60 text-[10px] sm:text-sm whitespace-nowrap">
                <div class="text-[10px] sm:text-sm">${formatDate(tx.created_at)}</div>
                <div class="text-[9px] sm:text-xs text-white/40">${formatTime(tx.created_at)}</div>
              </td>
              <td class="py-2 sm:py-3 px-2 sm:px-4 whitespace-nowrap">
                <span class="inline-flex items-center px-2 py-0.5 rounded text-[9px] sm:text-xs font-medium ${getTypeColor(tx.type)}">
                  ${formatType(tx.type)}
                </span>
              </td>
              <td class="py-2 sm:py-3 px-2 sm:px-4 text-white font-medium text-right text-[10px] sm:text-sm whitespace-nowrap">
                ${['withdrawal', 'trading_id_deduction'].includes(tx.type) ? '-' : '+'}PKR ${parseFloat(tx.amount).toLocaleString('en-PK', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </td>
              <td class="py-2 sm:py-3 px-2 sm:px-4 whitespace-nowrap">
                <span class="inline-flex items-center px-2 py-0.5 rounded text-[9px] sm:text-xs font-medium ${getStatusColor(tx.status)}">
                  ${formatType(tx.status)}
                </span>
              </td>
              <td class="py-2 sm:py-3 px-2 sm:px-4 text-white/60 text-[10px] sm:text-sm whitespace-nowrap">
                ${tx.apay_payments?.payment_method ? formatPaymentMethod(tx.apay_payments.payment_method) : (tx.payment_system ? formatPaymentMethod(tx.payment_system) : '-')}
              </td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    </div>

    <!-- Pagination Controls -->
    <div class="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4 mt-4 sm:mt-6">
      <div class="text-white/60 text-[10px] sm:text-sm text-center sm:text-left">
        Showing ${startIndex + 1} to ${Math.min(endIndex, allTransactions.length)} of ${allTransactions.length}
      </div>
      <div class="flex items-center gap-2">
        <button
          onclick="goToPreviousPage()"
          ${currentPage === 1 ? 'disabled' : ''}
          class="px-2 sm:px-3 py-1 sm:py-2 bg-white/[0.04] border border-white/10 hover:bg-white/[0.08] text-white rounded text-[9px] sm:text-sm transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Prev
        </button>
        <span class="text-white/60 text-[10px] sm:text-sm">
          ${currentPage} / ${totalPages}
        </span>
        <button
          onclick="goToNextPage()"
          ${currentPage === totalPages ? 'disabled' : ''}
          class="px-2 sm:px-3 py-1 sm:py-2 bg-white/[0.04] border border-white/10 hover:bg-white/[0.08] text-white rounded text-[9px] sm:text-sm transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Next
        </button>
      </div>
    </div>
  `;
}

// Make loadTransactions globally accessible for retry button
(window as any).loadTransactions = loadTransactions;

// Make pagination functions globally accessible
(window as any).goToPreviousPage = goToPreviousPage;
(window as any).goToNextPage = goToNextPage;

async function loadTransactions(): Promise<void> {
  try {
    const token = localStorage.getItem('rk247_token');
    if (!token) {
      const container = document.getElementById('transactionsContainer');
      if (container) {
        container.innerHTML = `
          <div class="text-center py-8 text-white/40">
            <p>Please log in to view your account statement</p>
            <a href="/login" class="text-white hover:text-white/80 underline mt-4 inline-block">Go to Login</a>
          </div>
        `;
      }
      return;
    }

    // Load transactions and withdrawals in parallel
    let transactions = [];
    let withdrawals = [];

    try {
      const [transactionsResponse, withdrawalsResponse] = await Promise.all([
        api.wallet.getTransactions({ limit: 20 }),
        api.withdrawal.getWithdrawals({ limit: 20 })
      ]);
      transactions = transactionsResponse.data.data || [];
      withdrawals = withdrawalsResponse.data.data || [];
    } catch (error) {
      console.error('Failed to load statement:', error);
    }

    // Combine and sort by date
    allTransactions = [
      ...transactions.map((t: any) => ({
        ...t,
        category: 'transaction'
      })),
      ...withdrawals.map((w: any) => ({
        ...w,
        type: 'withdrawal',
        category: 'withdrawal'
      }))
    ].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());

    // Reset to first page when loading new data
    currentPage = 1;

    // Calculate totals
    const totalDeposits = transactions
      .filter((t: any) => t.type === 'deposit' && t.status === 'completed')
      .reduce((sum: number, t: any) => sum + parseFloat(t.amount), 0);

    const totalWithdrawals = withdrawals
      .filter((w: any) => w.status === 'completed')
      .reduce((sum: number, w: any) => sum + parseFloat(w.amount), 0);

    const netBalance = totalDeposits - totalWithdrawals;

    // Update summary cards
    const totalDepositsEl = document.getElementById('totalDeposits');
    const totalWithdrawalsEl = document.getElementById('totalWithdrawals');
    const netBalanceEl = document.getElementById('netBalance');

    if (totalDepositsEl) {
      totalDepositsEl.textContent = `PKR ${totalDeposits.toLocaleString('en-PK', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    }
    if (totalWithdrawalsEl) {
      totalWithdrawalsEl.textContent = `PKR ${totalWithdrawals.toLocaleString('en-PK', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    }
    if (netBalanceEl) {
      netBalanceEl.textContent = `PKR ${netBalance.toLocaleString('en-PK', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    }

    // Render transactions with pagination
    renderTransactions();
  } catch (error: any) {
    console.error('Failed to load transactions:', error);
    const container = document.getElementById('transactionsContainer');
    if (container) {
      const errorMessage = error.response?.data?.error || error.message || 'Failed to load transactions';
      container.innerHTML = `
        <div class="text-center py-8 text-red-300">
          <p>${errorMessage}</p>
          <button onclick="loadTransactions()" class="mt-4 px-4 py-2 bg-white/[0.04] border border-white/10 hover:bg-white/[0.08] text-white rounded-lg transition">
            Retry
          </button>
        </div>
      `;
    }
  }
}

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-PK', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
}

function formatTime(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleTimeString('en-PK', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  });
}

function getTypeColor(type: string): string {
  const colors: Record<string, string> = {
    deposit: 'bg-white/10 text-white/80',
    withdrawal: 'bg-white/10 text-white/80',
    transaction: 'bg-white/10 text-white/80'
  };
  return colors[type] || 'bg-white/10 text-white/80';
}

function getStatusColor(status: string): string {
  const colors: Record<string, string> = {
    completed: 'bg-white/10 text-white/80',
    pending: 'bg-white/10 text-white/80',
    failed: 'bg-white/10 text-white/80',
    cancelled: 'bg-white/10 text-white/80',
    approved: 'bg-white/10 text-white/80',
    rejected: 'bg-white/10 text-white/80'
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
    'jazzcash': 'JazzCash',
    'nayapay_l': 'NayaPay',
    'nayapay': 'NayaPay'
  };
  return methods[method] || method;
}
