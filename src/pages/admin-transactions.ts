import { api } from '../services/api';
import { authService } from '../services/auth';

export function renderAdminTransactionsPage(): string {
  return `
    <div class="min-h-screen bg-ink-950 flex">
      <!-- Mobile Menu Button -->
      <button id="mobileMenuBtn" class="lg:hidden fixed top-4 left-4 z-50 p-2 bg-ink-850 rounded-lg border border-white/10 text-white">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
        </svg>
      </button>

      <!-- Sidebar -->
      <aside id="sidebar" class="w-64 bg-ink-850 border-r border-white/10 flex flex-col fixed h-full z-40 transform -translate-x-full lg:translate-x-0 transition-transform duration-300">
        <div class="p-6 border-b border-white/10">
          <div class="flex items-center gap-3">
            <img src="/assets/logo.png" alt="RK247" class="h-8 w-auto" />
            <span class="text-2xl font-bold text-white">RK247 Admin</span>
          </div>
        </div>
        
        <nav class="flex-1 p-4 space-y-2">
          <a href="/admin/dashboard" class="flex items-center gap-3 px-4 py-3 rounded-lg text-white/60 hover:bg-white/5 hover:text-white transition">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
            </svg>
            Dashboard
          </a>
          <a href="/admin/users" class="flex items-center gap-3 px-4 py-3 rounded-lg text-white/60 hover:bg-white/5 hover:text-white transition">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path>
            </svg>
            Users
          </a>
          <a href="/admin/transactions" class="flex items-center gap-3 px-4 py-3 rounded-lg bg-rk-green/20 text-rk-green font-medium">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"></path>
            </svg>
            Transactions
          </a>
          <a href="/admin/withdrawals" class="flex items-center gap-3 px-4 py-3 rounded-lg text-white/60 hover:bg-white/5 hover:text-white transition">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18"></path>
            </svg>
            Withdrawals
          </a>
          <a href="/admin/actions" class="flex items-center gap-3 px-4 py-3 rounded-lg text-white/60 hover:bg-white/5 hover:text-white transition">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
            </svg>
            Audit Log
          </a>
          <a href="/admin/login-history" class="flex items-center gap-3 px-4 py-3 rounded-lg text-white/60 hover:bg-white/5 hover:text-white transition">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
            </svg>
            Login History
          </a>
        </nav>

        <div class="p-4 border-t border-white/10">
          <div class="flex items-center gap-3 mb-4">
            <div class="w-10 h-10 rounded-full bg-rk-green/20 flex items-center justify-center">
              <svg class="w-5 h-5 text-rk-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
              </svg>
            </div>
            <div class="flex-1 min-w-0">
              <p class="text-sm font-medium text-white truncate" id="adminEmail"></p>
              <p class="text-xs text-white/60">Administrator</p>
            </div>
          </div>
          <button id="logoutBtn" class="w-full px-4 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-300 rounded-lg transition border border-red-500/30 text-sm">
            Logout
          </button>
        </div>
      </aside>

      <!-- Mobile Overlay -->
      <div id="sidebarOverlay" class="fixed inset-0 bg-black/50 z-30 hidden lg:hidden" onclick="window.closeSidebar()"></div>

      <!-- Main Content -->
      <main class="flex-1 min-w-0 lg:ml-64 p-4 pt-16 sm:p-6 sm:pt-16 md:p-8 md:pt-16 lg:pt-8">
        <div class="mb-6 sm:mb-8">
          <h1 class="text-2xl sm:text-3xl font-bold text-white mb-2">Transaction Management</h1>
          <p class="text-white/60 text-sm sm:text-base">Monitor and manage all platform transactions</p>
        </div>

        <div class="mb-6 flex flex-wrap gap-3 sm:gap-4">
          <select id="typeFilter" class="px-4 py-2 bg-ink-850 border border-white/10 rounded-lg text-white focus:outline-none focus:border-rk-green/50 text-sm sm:text-base">
            <option value="">All Types</option>
            <option value="deposit">Deposit</option>
            <option value="withdrawal">Withdrawal</option>
            <option value="trading_id_deduction">Trading ID Deduction</option>
            <option value="admin_adjustment">Admin Adjustment</option>
          </select>

          <select id="statusFilter" class="px-4 py-2 bg-ink-850 border border-white/10 rounded-lg text-white focus:outline-none focus:border-rk-green/50 text-sm sm:text-base">
            <option value="">All Status</option>
            <option value="completed">Completed</option>
            <option value="pending">Pending</option>
            <option value="failed">Failed</option>
            <option value="cancelled">Cancelled</option>
          </select>

          <input
            type="date"
            id="dateFilter"
            class="px-4 py-2 bg-ink-850 border border-white/10 rounded-lg text-white focus:outline-none focus:border-rk-green/50 text-sm sm:text-base"
          />

          <select
            id="limitSelect"
            class="px-4 py-2 bg-ink-850 border border-white/10 rounded-lg text-white focus:outline-none focus:border-rk-green/50 text-sm sm:text-base"
          >
            <option value="10" selected>10 per page</option>
            <option value="25">25 per page</option>
            <option value="50">50 per page</option>
            <option value="100">100 per page</option>
          </select>
        </div>

        <div class="bg-ink-850 backdrop-blur-lg rounded-2xl border border-white/10 shadow-card overflow-hidden">
          <div id="transactionsContainer" class="overflow-x-auto">
            <div class="text-center py-12">
              <div class="animate-pulse space-y-3">
                <div class="h-4 bg-white/10 rounded w-3/4 mx-auto"></div>
                <div class="h-4 bg-white/10 rounded w-1/2 mx-auto"></div>
              </div>
            </div>
          </div>

          <div id="paginationContainer" class="px-6 py-4 border-t border-white/10 bg-ink-850/50"></div>
        </div>
      </main>
    </div>

    <!-- Transaction Details Modal -->
    <div
      id="transactionDetailsModal"
      class="hidden fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
      style="display: none;"
      onclick="if (event.target === this) window.closeTransactionDetails()"
    >
      <div class="h-full w-full flex items-start sm:items-center justify-center p-4 sm:p-6" onclick="event.stopPropagation()">
        <div class="bg-ink-850 rounded-2xl p-5 sm:p-6 w-full max-w-2xl border border-white/10 shadow-2xl max-h-[85vh] overflow-y-auto">
          <div class="flex justify-between items-center mb-5">
            <h3 class="text-lg sm:text-xl font-bold text-white">Transaction Details</h3>
            <button
              type="button"
              onclick="window.closeTransactionDetails()"
              class="px-3 py-1 text-sm rounded-lg bg-white/10 hover:bg-white/20 text-white/80 transition"
            >
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
}

export function initAdminTransactionsPage(): void {
  if (!authService.requireAdmin()) return;

  const state = authService.getState();
  const adminEmailEl = document.getElementById('adminEmail');
  if (adminEmailEl && state.user) {
    adminEmailEl.textContent = state.user.email;
  }

  document.getElementById('logoutBtn')?.addEventListener('click', () => {
    authService.logout();
  });

  // Mobile menu toggle
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const sidebar = document.getElementById('sidebar');
  const sidebarOverlay = document.getElementById('sidebarOverlay');

  mobileMenuBtn?.addEventListener('click', () => {
    sidebar?.classList.remove('-translate-x-full');
    sidebarOverlay?.classList.remove('hidden');
  });

  (window as any).closeSidebar = () => {
    sidebar?.classList.add('-translate-x-full');
    sidebarOverlay?.classList.add('hidden');
  };

  let currentPage = 1;
  let typeFilter = '';
  let statusFilter = '';
  let dateFilter = '';
  let pageLimit = 10;

  (window as any).adminTransactionsLimit = pageLimit;
  (window as any).adminTransactionsDate = dateFilter;

  const typeSelect = document.getElementById('typeFilter') as HTMLSelectElement;
  const statusSelect = document.getElementById('statusFilter') as HTMLSelectElement;
  const dateInput = document.getElementById('dateFilter') as HTMLInputElement;
  const limitSelect = document.getElementById('limitSelect') as HTMLSelectElement;

  typeSelect?.addEventListener('change', (e) => {
    typeFilter = (e.target as HTMLSelectElement).value;
    currentPage = 1;
    loadTransactions(currentPage, typeFilter, statusFilter, dateFilter, pageLimit);
  });

  statusSelect?.addEventListener('change', (e) => {
    statusFilter = (e.target as HTMLSelectElement).value;
    currentPage = 1;
    loadTransactions(currentPage, typeFilter, statusFilter, dateFilter, pageLimit);
  });

  dateInput?.addEventListener('change', (e) => {
    dateFilter = (e.target as HTMLInputElement).value;
    (window as any).adminTransactionsDate = dateFilter;
    currentPage = 1;
    loadTransactions(currentPage, typeFilter, statusFilter, dateFilter, pageLimit);
  });

  limitSelect?.addEventListener('change', (e) => {
    pageLimit = parseInt((e.target as HTMLSelectElement).value) || 50;
    (window as any).adminTransactionsLimit = pageLimit;
    currentPage = 1;
    loadTransactions(currentPage, typeFilter, statusFilter, dateFilter, pageLimit);
  });

  loadTransactions(currentPage, typeFilter, statusFilter, dateFilter, pageLimit);
}

async function loadTransactions(page: number = 1, type: string = '', status: string = '', date: string = '', limit: number = 50): Promise<void> {
  try {
    const params: any = { page, limit };
    if (type) params.type = type;
    if (status) params.status = status;
    if (date) {
      const startDate = new Date(date);
      const endDate = new Date(date);
      endDate.setDate(endDate.getDate() + 1);
      params.start_date = startDate.toISOString();
      params.end_date = endDate.toISOString();
    }

    const response = await api.admin.getTransactions(params);
    const { transactions, pagination } = response.data.data;
    (window as any).currentTransactions = transactions;

    console.log('Transactions response:', { transactions, pagination }); // Debug logging

    const container = document.getElementById('transactionsContainer');
    if (!container) return;

    if (transactions.length === 0) {
      container.innerHTML = `
        <div class="text-center py-12 text-white/60">
          <p>No transactions found</p>
        </div>
      `;
      document.getElementById('paginationContainer')!.innerHTML = '';
      return;
    }

    container.innerHTML = `
      <div class="overflow-x-auto">
        <table class="w-full text-sm">
          <thead>
            <tr class="border-b border-white/10 bg-white/[0.02]">
              <th class="text-left py-3 px-4 text-white/70 font-medium whitespace-nowrap">Date</th>
              <th class="text-left py-3 px-4 text-white/70 font-medium whitespace-nowrap">User</th>
              <th class="text-left py-3 px-4 text-white/70 font-medium whitespace-nowrap">Type</th>
              <th class="text-right py-3 px-4 text-white/70 font-medium whitespace-nowrap">Amount</th>
              <th class="text-left py-3 px-4 text-white/70 font-medium whitespace-nowrap">Status</th>
              <th class="text-left py-3 px-4 text-white/70 font-medium whitespace-nowrap">Method</th>
              <th class="text-left py-3 px-4 text-white/70 font-medium whitespace-nowrap">Description</th>
              <th class="text-left py-3 px-4 text-white/70 font-medium whitespace-nowrap">Order ID</th>
              <th class="text-left py-3 px-4 text-white/70 font-medium whitespace-nowrap">Action</th>
            </tr>
          </thead>
          <tbody>
            ${transactions.map((tx: any, index: number) => `
              <tr class="border-b border-white/5 hover:bg-white/[0.02]">
                <td class="py-3 px-4 text-white/60 whitespace-nowrap">${new Date(tx.created_at).toLocaleDateString()}</td>
                <td class="py-3 px-4 text-white whitespace-nowrap">${tx.wallets?.users?.email || 'N/A'}</td>
                <td class="py-3 px-4 whitespace-nowrap">
                  <span class="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${getTypeColor(tx.type)}">
                    ${formatType(tx.type)}
                  </span>
                </td>
                <td class="py-3 px-4 text-white font-medium text-right whitespace-nowrap">PKR ${parseFloat(tx.amount).toLocaleString('en-PK', { maximumFractionDigits: 0 })}</td>
                <td class="py-3 px-4 whitespace-nowrap">
                  <span class="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${getStatusColor(tx.status)}">
                    ${tx.status.charAt(0).toUpperCase() + tx.status.slice(1)}
                  </span>
                </td>
                <td class="py-3 px-4 text-white/60 whitespace-nowrap">${tx.apay_payments?.payment_method ? formatPaymentMethod(tx.apay_payments.payment_method) : '-'}</td>
                <td class="py-3 px-4 text-white/60 max-w-[200px] break-words">${tx.description || '-'}</td>
                <td class="py-3 px-4 text-white/60 font-mono break-all max-w-[120px]" title="${(tx.order_id || tx.apay_payments?.order_id || tx.apay_payments?.apay_transaction_id || '-')}">${(tx.order_id || tx.apay_payments?.order_id || tx.apay_payments?.apay_transaction_id || '-')}</td>
                <td class="py-3 px-4 whitespace-nowrap">
                  <button
                    onclick="window.viewTransactionDetailsByIndex(${index})"
                    class="px-2.5 py-1 text-xs rounded bg-white/10 hover:bg-white/20 text-white/80 transition"
                  >
                    View
                  </button>
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    `;

    if (pagination) {
      renderPagination(pagination, page, type, status, limit);
    } else {
      console.error('Pagination data missing from response');
      document.getElementById('paginationContainer')!.innerHTML = '';
    }
  } catch (error) {
    console.error('Failed to load transactions:', error);
  }
}

function renderPagination(pagination: any, currentPage: number, type: string, status: string, limit: number = 50): void {
  const container = document.getElementById('paginationContainer');
  if (!container) return;

  console.log('Rendering pagination:', pagination); // Debug logging

  // Handle different possible data structures
  const totalPages = pagination?.totalPages || pagination?.total_pages || 1;
  const total = pagination?.total || pagination?.count || 0;
  const pageLimit = pagination?.limit || pagination?.per_page || limit;

  console.log('Pagination values:', { totalPages, total, limit: pageLimit, currentPage }); // Debug logging

  const startItem = total > 0 ? (currentPage - 1) * pageLimit + 1 : 0;
  const endItem = Math.min(currentPage * pageLimit, total);

  // Always show the info text, and always show the current page number
  // Show navigation buttons when more than one page
  container.innerHTML = `
    <div class="flex flex-col sm:flex-row justify-between items-center gap-4">
      <p class="text-white/60 text-sm">
        Showing ${startItem} to ${endItem} of ${total} transactions
      </p>
      <div class="flex items-center gap-2">
        ${totalPages > 1 ? `
          <button
            onclick="window.loadTransactionsPage(${Math.max(1, currentPage - 1)}, '${type}', '${status}', ${pageLimit})"
            ${currentPage === 1 ? 'disabled' : ''}
            class="px-3 py-1 rounded bg-white/10 text-white/60 hover:bg-white/20 disabled:opacity-50 disabled:cursor-not-allowed transition"
          >
            Previous
          </button>
        ` : ''}
        <button
          onclick="window.loadTransactionsPage(${currentPage}, '${type}', '${status}', ${pageLimit})"
          class="px-3 py-1 rounded bg-rk-green text-black transition"
        >
          ${currentPage}
        </button>
        ${totalPages > 1 ? `
          ${(() => {
            const pages = [];
            for (let i = 1; i <= totalPages; i++) {
              if (i === 1 || i === totalPages || (i >= currentPage - 2 && i <= currentPage + 2)) {
                if (i !== currentPage) pages.push(i);
              } else if (pages[pages.length - 1] !== '...') {
                pages.push('...');
              }
            }
            return pages.map(page => {
              if (page === '...') {
                return '<span class="px-3 py-1 text-white/40">...</span>';
              }
              return `
                <button
                  onclick="window.loadTransactionsPage(${page}, '${type}', '${status}', ${pageLimit})"
                  class="px-3 py-1 rounded bg-white/10 text-white/60 hover:bg-white/20 transition"
                >
                  ${page}
                </button>
              `;
            }).join('');
          })()}
          <button
            onclick="window.loadTransactionsPage(${Math.min(totalPages, currentPage + 1)}, '${type}', '${status}', ${pageLimit})"
            ${currentPage === totalPages ? 'disabled' : ''}
            class="px-3 py-1 rounded bg-white/10 text-white/60 hover:bg-white/20 disabled:opacity-50 disabled:cursor-not-allowed transition"
          >
            Next
          </button>
        ` : ''}
      </div>
    </div>
  `;
}

(window as any).loadTransactionsPage = (page: number, type: string, status: string, limit: number = (window as any).adminTransactionsLimit || 50) => {
  const date = (window as any).adminTransactionsDate || '';
  loadTransactions(page, type, status, date, limit);
};

(window as any).viewTransactionDetailsByIndex = (index: number): void => {
  const modal = document.getElementById('transactionDetailsModal');
  const content = document.getElementById('transactionDetailsContent');
  if (!modal || !content) return;

  try {
    const transactions = (window as any).currentTransactions || [];
    const tx = transactions[index];

    if (!tx) {
      content.innerHTML = `
        <div class="text-center py-8 text-red-300">
          <p class="font-semibold">Transaction not found</p>
          <p class="text-sm text-white/60 mt-1">Please close and try again</p>
        </div>
      `;
      modal.style.display = 'block';
      document.body.style.overflow = 'hidden';
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

        <div>
          <h4 class="text-white/50 text-xs uppercase tracking-wider mb-2">User</h4>
          <div class="bg-white/[0.03] rounded-xl p-4 space-y-3 border border-white/5">
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <p class="text-white/40 text-xs">User ID</p>
                <p class="text-white font-mono text-xs break-all">${tx.wallets?.users?.id || 'N/A'}</p>
              </div>
              <div>
                <p class="text-white/40 text-xs">Email</p>
                <p class="text-white break-all">${tx.wallets?.users?.email || 'N/A'}</p>
              </div>
              <div>
                <p class="text-white/40 text-xs">Username</p>
                <p class="text-white">${tx.wallets?.users?.username || 'N/A'}</p>
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
                  <p class="text-white">${apay.payment_method ? formatPaymentMethod(apay.payment_method) : '-'}</p>
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

        <div>
          <h4 class="text-white/50 text-xs uppercase tracking-wider mb-2">Payment Callback</h4>
          <pre class="bg-black/40 rounded-xl p-4 overflow-x-auto text-xs text-white/70 font-mono border border-white/5">${JSON.stringify(apay.callback_data || {}, null, 2)}</pre>
        </div>
      </div>
    `;

    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
  } catch (err) {
    console.error('viewTransactionDetails error:', err);
    content.innerHTML = `
      <div class="text-center py-8 text-red-300">
        <p class="font-semibold">Failed to load details</p>
        <p class="text-sm text-white/60 mt-1">${err instanceof Error ? err.message : 'Unknown error'}</p>
      </div>
    `;
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
  }
};

(window as any).closeTransactionDetails = (): void => {
  const modal = document.getElementById('transactionDetailsModal');
  if (modal) {
    modal.style.display = 'none';
    document.body.style.overflow = '';
  }
};

function getTypeColor(type: string): string {
  const colors: Record<string, string> = {
    deposit: 'bg-rk-green/20 text-rk-green',
    withdrawal: 'bg-rk-green/10 text-rk-green/80',
    trading_id_deduction: 'bg-rk-green/15 text-rk-green/90',
    admin_adjustment: 'bg-rk-green/10 text-rk-green/70'
  };
  return colors[type] || 'bg-white/10 text-white/60';
}

function getStatusColor(status: string): string {
  const colors: Record<string, string> = {
    completed: 'bg-rk-green/20 text-rk-green',
    pending: 'bg-yellow-500/20 text-yellow-300',
    failed: 'bg-red-500/20 text-red-300',
    cancelled: 'bg-white/10 text-white/60'
  };
  return colors[status] || 'bg-white/10 text-white/60';
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
