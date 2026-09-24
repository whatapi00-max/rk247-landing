import { api } from '../services/api';
import { authService } from '../services/auth';

export function renderAdminWithdrawalsPage(): string {
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
          <a href="/admin/transactions" class="flex items-center gap-3 px-4 py-3 rounded-lg text-white/60 hover:bg-white/5 hover:text-white transition">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"></path>
            </svg>
            Transactions
          </a>
          <a href="/admin/withdrawals" class="flex items-center gap-3 px-4 py-3 rounded-lg bg-rk-green/20 text-rk-green font-medium">
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
          <h1 class="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-2">Withdrawal Management</h1>
          <p class="text-white/60 text-xs sm:text-sm md:text-base">Review and approve withdrawal requests</p>
        </div>

        <div class="mb-6 flex gap-2 sm:gap-3 md:gap-4">
          <select id="statusFilter" class="px-3 sm:px-4 py-2 bg-ink-850 border border-white/10 rounded-lg text-white focus:outline-none focus:border-rk-green/50 text-xs sm:text-sm">
            <option value="">All Status</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
            <option value="completed">Completed</option>
          </select>
        </div>

        <div class="bg-ink-850 backdrop-blur-lg rounded-2xl border border-white/10 shadow-card overflow-hidden">
          <div id="withdrawalsContainer" class="overflow-x-auto">
            <div class="text-center py-12">
              <div class="animate-pulse space-y-3">
                <div class="h-4 bg-white/10 rounded w-3/4 mx-auto"></div>
                <div class="h-4 bg-white/10 rounded w-1/2 mx-auto"></div>
              </div>
            </div>
          </div>

          <div id="paginationContainer" class="px-6 py-4 border-t border-white/10"></div>
        </div>
      </main>
    </div>
  `;
}

export function initAdminWithdrawalsPage(): void {
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
  let statusFilter = '';

  const statusSelect = document.getElementById('statusFilter') as HTMLSelectElement;

  statusSelect?.addEventListener('change', (e) => {
    statusFilter = (e.target as HTMLSelectElement).value;
    currentPage = 1;
    loadWithdrawals(currentPage, statusFilter);
  });

  loadWithdrawals(currentPage, statusFilter);
}

async function loadWithdrawals(page: number = 1, status: string = '', limit: number = 10): Promise<void> {
  try {
    const params: any = { page, limit };
    if (status) params.status = status;

    const response = await api.admin.getWithdrawals(params);
    const { withdrawals, pagination } = response.data.data;

    console.log('Withdrawals response:', { withdrawals, pagination }); // Debug logging

    const container = document.getElementById('withdrawalsContainer');
    if (!container) return;

    if (withdrawals.length === 0) {
      container.innerHTML = `
        <div class="text-center py-12 text-white/60">
          <p>No withdrawal requests found</p>
        </div>
      `;
      document.getElementById('paginationContainer')!.innerHTML = '';
      return;
    }

    container.innerHTML = `
      <table class="w-full">
        <thead>
          <tr class="border-b border-white/10 bg-white/[0.02]">
            <th class="text-left py-4 px-6 text-white/70 font-medium">Date</th>
            <th class="text-left py-4 px-6 text-white/70 font-medium">User</th>
            <th class="text-left py-4 px-6 text-white/70 font-medium">Amount</th>
            <th class="text-left py-4 px-6 text-white/70 font-medium">Payment Method</th>
            <th class="text-left py-4 px-6 text-white/70 font-medium">Account Details</th>
            <th class="text-left py-4 px-6 text-white/70 font-medium">Status</th>
            <th class="text-left py-4 px-6 text-white/70 font-medium">A-Pay Status</th>
            <th class="text-left py-4 px-6 text-white/70 font-medium">Actions</th>
          </tr>
        </thead>
        <tbody>
          ${withdrawals.map((wd: any) => `
            <tr class="border-b border-white/5 hover:bg-white/[0.02]">
              <td class="py-4 px-6 text-white/60">${new Date(wd.created_at).toLocaleString()}</td>
              <td class="py-4 px-6 text-white">${wd.wallets?.users?.email || 'N/A'}</td>
              <td class="py-4 px-6 text-white font-medium">PKR ${parseFloat(wd.amount).toLocaleString('en-PK')}</td>
              <td class="py-4 px-6 text-white/60">${formatPaymentSystem(wd.payment_system)}</td>
              <td class="py-4 px-6 text-white/60 text-sm max-w-xs truncate">${wd.account_data ? JSON.stringify(wd.account_data) : 'N/A'}</td>
              <td class="py-4 px-6">
                <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(wd.status)}">
                  ${wd.status}
                </span>
              </td>
              <td class="py-4 px-6">
                ${wd.transactions?.order_id ? `
                  <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getApayStatusColor(wd.transactions.status)}">
                    ${getApayStatusLabel(wd.transactions.status)}
                  </span>
                ` : `<span class="text-white/30 text-sm">—</span>`}
              </td>
              <td class="py-4 px-6">
                ${wd.status === 'pending' ? `
                  <div class="flex gap-2">
                    <button
                      onclick="window.approveWithdrawal('${wd.id}')"
                      class="px-3 py-1 bg-rk-green/20 hover:bg-rk-green/30 text-rk-green text-sm rounded transition border border-rk-green/30"
                    >
                      Approve
                    </button>
                    <button
                      onclick="window.rejectWithdrawal('${wd.id}')"
                      class="px-3 py-1 bg-red-500/20 hover:bg-red-500/30 text-red-300 text-sm rounded transition border border-red-500/30"
                    >
                      Reject
                    </button>
                  </div>
                ` : `
                  <span class="text-white/40 text-sm">No actions</span>
                `}
              </td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    `;

    if (pagination) {
      renderPagination(pagination, page, status);
    } else {
      console.error('Pagination data missing from response');
      document.getElementById('paginationContainer')!.innerHTML = '';
    }
  } catch (error: any) {
    console.error('Failed to load withdrawals:', error);
    const container = document.getElementById('withdrawalsContainer');
    if (container) {
      const message = error?.response?.data?.code === 'MIGRATION_REQUIRED'
        ? error.response.data.error
        : 'Failed to load withdrawal requests';
      container.innerHTML = `
        <div class="text-center py-12 text-red-300">
          <p>${message}</p>
          <p class="text-white/40 text-sm mt-2">Please check the database setup</p>
        </div>
      `;
    }
  }
}

function renderPagination(pagination: any, currentPage: number, status: string): void {
  const container = document.getElementById('paginationContainer');
  if (!container) return;

  console.log('Rendering pagination:', pagination); // Debug logging

  if (!pagination || !pagination.totalPages) {
    console.error('Invalid pagination data:', pagination);
    container.innerHTML = '';
    return;
  }

  const { totalPages, total, limit } = pagination;
  
  if (totalPages <= 1) {
    container.innerHTML = '';
    return;
  }

  const pages = [];
  for (let i = 1; i <= totalPages; i++) {
    if (i === 1 || i === totalPages || (i >= currentPage - 2 && i <= currentPage + 2)) {
      pages.push(i);
    } else if (pages[pages.length - 1] !== '...') {
      pages.push('...');
    }
  }

  const startItem = (currentPage - 1) * limit + 1;
  const endItem = Math.min(currentPage * limit, total);

  container.innerHTML = `
    <div class="flex flex-col sm:flex-row justify-between items-center gap-4">
      <p class="text-white/60 text-sm">
        Showing ${startItem} to ${endItem} of ${total} withdrawals
      </p>
      <div class="flex items-center gap-2">
        <button
          onclick="window.loadWithdrawalsPage(${Math.max(1, currentPage - 1)}, '${status}')"
          ${currentPage === 1 ? 'disabled' : ''}
          class="px-3 py-1 rounded bg-white/10 text-white/60 hover:bg-white/20 disabled:opacity-50 disabled:cursor-not-allowed transition"
        >
          Previous
        </button>
        ${pages.map(page => {
          if (page === '...') {
            return '<span class="px-3 py-1 text-white/40">...</span>';
          }
          return `
            <button
              onclick="window.loadWithdrawalsPage(${page}, '${status}')"
              class="px-3 py-1 rounded ${page === currentPage ? 'bg-rk-green text-black' : 'bg-white/10 text-white/60 hover:bg-white/20'} transition"
            >
              ${page}
            </button>
          `;
        }).join('')}
        <button
          onclick="window.loadWithdrawalsPage(${Math.min(totalPages, currentPage + 1)}, '${status}')"
          ${currentPage === totalPages ? 'disabled' : ''}
          class="px-3 py-1 rounded bg-white/10 text-white/60 hover:bg-white/20 disabled:opacity-50 disabled:cursor-not-allowed transition"
        >
          Next
        </button>
      </div>
    </div>
  `;
}

(window as any).loadWithdrawalsPage = (page: number, status: string) => {
  loadWithdrawals(page, status);
};

(window as any).approveWithdrawal = async (withdrawalId: string) => {
  try {
    const response = await api.admin.approveWithdrawal(withdrawalId);
    if (response.data.success) {
      alert('Withdrawal approved successfully!');
      loadWithdrawals(1, '');
    } else {
      alert('Failed to approve withdrawal: ' + response.data.error);
    }
  } catch (error: any) {
    alert('Failed to approve withdrawal: ' + (error.response?.data?.error || error.message));
  }
};

(window as any).rejectWithdrawal = async (withdrawalId: string) => {
  try {
    const response = await api.admin.rejectWithdrawal(withdrawalId);
    if (response.data.success) {
      alert('Withdrawal rejected successfully!');
      loadWithdrawals(1, '');
    } else {
      alert('Failed to reject withdrawal: ' + response.data.error);
    }
  } catch (error: any) {
    alert('Failed to reject withdrawal: ' + (error.response?.data?.error || error.message));
  }
};

function getStatusColor(status: string): string {
  const colors: Record<string, string> = {
    pending: 'bg-yellow-500/20 text-yellow-300',
    processing: 'bg-blue-500/20 text-blue-300',
    approved: 'bg-rk-green/20 text-rk-green',
    rejected: 'bg-red-500/20 text-red-300',
    completed: 'bg-blue-500/20 text-blue-300'
  };
  return colors[status] || 'bg-white/10 text-white/60';
}

function formatPaymentSystem(system: string): string {
  const labels: Record<string, string> = {
    raast_p2p: 'Raast P2P',
    easypaisa: 'EasyPaisa',
    jazzcash_fast: 'JazzCash Fast',
    nayapay_l: 'NayaPay',
    pkr_w: 'PKR Wallet'
  };
  return labels[system] || system || 'N/A';
}

function getApayStatusLabel(status: string): string {
  const labels: Record<string, string> = {
    pending: 'Pending',
    completed: 'Success',
    failed: 'Failed',
    rejected: 'Rejected'
  };
  return labels[status] || status;
}

function getApayStatusColor(status: string): string {
  const colors: Record<string, string> = {
    pending: 'bg-yellow-500/20 text-yellow-300',
    completed: 'bg-rk-green/20 text-rk-green',
    failed: 'bg-red-500/20 text-red-300',
    rejected: 'bg-red-500/20 text-red-300'
  };
  return colors[status] || 'bg-white/10 text-white/60';
}