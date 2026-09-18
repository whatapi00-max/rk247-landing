import { api } from '../services/api';
import { authService } from '../services/auth';

export function renderAdminUsersPage(): string {
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
          <a href="/admin/users" class="flex items-center gap-3 px-4 py-3 rounded-lg bg-rk-green/20 text-rk-green font-medium">
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
        <div class="mb-6 sm:mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 class="text-2xl sm:text-3xl font-bold text-white mb-2">User Management</h1>
            <p class="text-white/60 text-sm sm:text-base">View and manage user accounts</p>
          </div>
          <button
            id="createUserBtn"
            class="px-4 py-2 bg-rk-green hover:bg-rk-green/90 text-white font-bold rounded-lg transition"
          >
            + Create User
          </button>
        </div>

        <div class="mb-6 flex flex-wrap gap-3">
          <input
            type="text"
            id="searchInput"
            placeholder="Search users..."
            class="flex-1 min-w-[200px] px-4 py-2 bg-ink-850 border border-white/10 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-rk-green/50"
          />
          <select
            id="statusFilter"
            class="px-4 py-2 bg-ink-850 border border-white/10 rounded-lg text-white focus:outline-none focus:border-rk-green/50"
          >
            <option value="">All Users</option>
            <option value="active">Active Only</option>
            <option value="inactive">Inactive Only</option>
          </select>
          <select
            id="limitSelect"
            class="px-4 py-2 bg-ink-850 border border-white/10 rounded-lg text-white focus:outline-none focus:border-rk-green/50"
          >
            <option value="2">2 per page</option>
            <option value="5">5 per page</option>
            <option value="10" selected>10 per page</option>
            <option value="20">20 per page</option>
            <option value="50">50 per page</option>
          </select>
        </div>

        <div class="bg-ink-850 backdrop-blur-lg rounded-2xl border border-white/10 shadow-card overflow-hidden">
          <div id="usersContainer" class="overflow-x-auto">
            <div class="text-center py-12">
              <div class="animate-pulse space-y-3">
                <div class="h-4 bg-white/10 rounded w-3/4 mx-auto"></div>
                <div class="h-4 bg-white/10 rounded w-1/2 mx-auto"></div>
              </div>
            </div>
          </div>
          
          <div id="paginationContainer" class="px-4 sm:px-6 py-4 border-t border-white/10 bg-ink-850/50"></div>
        </div>
      </main>

      <div id="userWalletModal" class="hidden fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 px-4">
        <div class="bg-ink-850 backdrop-blur-lg rounded-2xl p-8 max-w-4xl w-full border border-white/10 shadow-card max-h-[90vh] overflow-y-auto">
          <div class="flex justify-between items-start mb-6">
            <div>
              <h3 class="text-2xl font-bold text-white mb-2">User Wallet Details</h3>
              <p class="text-white/60" id="modalUserEmail"></p>
            </div>
            <button id="closeModalBtn" class="text-white/60 hover:text-white">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>

          <div id="walletDetailsContainer"></div>
        </div>
      </div>
    </div>
  `;
}

export function initAdminUsersPage(): void {
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
  let searchQuery = '';
  let pageLimit = 10;
  let statusFilter = '';

  (window as any).adminUsersPageLimit = pageLimit;

  const searchInput = document.getElementById('searchInput') as HTMLInputElement;
  searchInput?.addEventListener('input', (e) => {
    searchQuery = (e.target as HTMLInputElement).value;
    currentPage = 1;
    loadUsers(currentPage, searchQuery, pageLimit, statusFilter);
  });

  const statusFilterSelect = document.getElementById('statusFilter') as HTMLSelectElement;
  statusFilterSelect?.addEventListener('change', (e) => {
    statusFilter = (e.target as HTMLSelectElement).value;
    currentPage = 1;
    loadUsers(currentPage, searchQuery, pageLimit, statusFilter);
  });

  const limitSelect = document.getElementById('limitSelect') as HTMLSelectElement;
  limitSelect?.addEventListener('change', (e) => {
    pageLimit = parseInt((e.target as HTMLSelectElement).value) || 10;
    (window as any).adminUsersPageLimit = pageLimit;
    currentPage = 1;
    loadUsers(currentPage, searchQuery, pageLimit, statusFilter);
  });

  const createUserBtn = document.getElementById('createUserBtn');
  createUserBtn?.addEventListener('click', () => {
    (window as any).showCreateUserModal();
  });

  loadUsers(currentPage, searchQuery, pageLimit, statusFilter);

  document.getElementById('closeModalBtn')?.addEventListener('click', () => {
    document.getElementById('userWalletModal')?.classList.add('hidden');
  });
}

async function loadUsers(page: number = 1, search: string = '', limit: number = 10, status: string = ''): Promise<void> {
  try {
    const params: any = { page, limit, search };
    if (status) {
      params.is_active = status === 'active';
    }
    const response = await api.admin.getUsers(params);
    console.log('Full API response:', response); // Debug full response
    console.log('Response data:', response.data); // Debug response data
    
    // Handle different response structures
    const responseData = response.data?.data || response.data;
    const { users, pagination } = responseData || {};

    console.log('Users response:', { users, pagination }); // Debug logging

    const container = document.getElementById('usersContainer');
    const paginationContainer = document.getElementById('paginationContainer');
    if (!container || !paginationContainer) return;

    if (!users || users.length === 0) {
      container.innerHTML = `
        <div class="text-center py-12 text-gray-400">
          <p>No users found</p>
        </div>
      `;
      paginationContainer.innerHTML = '';
      return;
    }

    const pageLimit = pagination?.limit || limit;
    const hasNextPage = users.length === pageLimit; // If page is full, there might be more
    const total = pagination?.total || (hasNextPage ? page * pageLimit : (page - 1) * pageLimit + users.length);
    const totalPages = pagination?.totalPages || (hasNextPage ? page + 1 : page);

    container.innerHTML = `
      <div class="overflow-x-auto">
        <table class="w-full text-sm">
          <thead>
            <tr class="border-b border-white/10 bg-white/[0.02]">
              <th class="text-left py-3 px-4 text-white/70 font-medium whitespace-nowrap">Email</th>
              <th class="text-left py-3 px-4 text-white/70 font-medium whitespace-nowrap">Username</th>
              <th class="text-left py-3 px-4 text-white/70 font-medium whitespace-nowrap">Role</th>
              <th class="text-left py-3 px-4 text-white/70 font-medium whitespace-nowrap">Status</th>
              <th class="text-left py-3 px-4 text-white/70 font-medium whitespace-nowrap">Balance</th>
              <th class="text-left py-3 px-4 text-white/70 font-medium whitespace-nowrap">Joined</th>
              <th class="text-left py-3 px-4 text-white/70 font-medium whitespace-nowrap">Action</th>
            </tr>
          </thead>
          <tbody>
            ${users.map((user: any) => `
              <tr class="border-b border-white/5 hover:bg-white/[0.02]">
                <td class="py-3 px-4 text-white whitespace-nowrap">${user.email}</td>
                <td class="py-3 px-4 text-white/60 whitespace-nowrap">${user.username}</td>
                <td class="py-3 px-4">
                  <span class="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium whitespace-nowrap ${user.role === 'admin' ? 'bg-rk-green/20 text-rk-green' : 'bg-rk-green/10 text-rk-green/80'}">
                    ${user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                  </span>
                </td>
                <td class="py-3 px-4">
                  <span class="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium whitespace-nowrap ${user.is_active ? 'bg-rk-green/20 text-rk-green' : 'bg-red-500/20 text-red-300'}">
                    ${user.is_active ? 'Active' : 'Inactive'}
                  </span>
                </td>
                <td class="py-3 px-4 text-white whitespace-nowrap font-medium">
                  ${user.balance == null ? '-' : `PKR ${Number(user.balance).toLocaleString('en-PK', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
                </td>
                <td class="py-3 px-4 text-white/60 whitespace-nowrap">${new Date(user.created_at).toLocaleDateString()}</td>
                <td class="py-3 px-4">
                  <div class="flex gap-2 flex-nowrap">
                    ${user.role !== 'admin' ? `
                      <button
                        onclick="window.viewUserWallet('${user.id}')"
                        class="px-2.5 py-1 bg-rk-green/20 hover:bg-rk-green/30 text-rk-green text-xs rounded transition border border-rk-green/30 whitespace-nowrap"
                      >
                        View
                      </button>
                    ` : ''}
                    ${user.role !== 'admin' ? `
                      <button
                        onclick="window.resetUserPassword('${user.id}', '${user.email}')"
                        class="px-2.5 py-1 bg-blue-500/20 hover:bg-blue-500/30 text-blue-300 text-xs rounded transition border border-blue-500/30 whitespace-nowrap"
                        title="Reset Password"
                      >
                        Reset
                      </button>
                    ` : ''}
                    <button
                      onclick="window.toggleUserStatus('${user.id}', '${user.email}', ${user.is_active})"
                      class="px-2.5 py-1 ${user.is_active ? 'bg-red-500/20 hover:bg-red-500/30 text-red-300 border-red-500/30' : 'bg-green-500/20 hover:bg-green-500/30 text-green-300 border-green-500/30'} text-xs rounded transition border whitespace-nowrap"
                      title="${user.is_active ? 'Deactivate User' : 'Activate User'}"
                    >
                      ${user.is_active ? 'Deactivate' : 'Activate'}
                    </button>
                  </div>
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    `;

    renderPagination({
      ...pagination,
      total,
      totalPages,
      limit: pageLimit
    }, page, search, pageLimit);
  } catch (error) {
    console.error('Failed to load users:', error);
  }
}

function renderPagination(pagination: any, currentPage: number, search: string, limit: number = 10): void {
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

  // Always show the info text, and show page controls when more than one page
  // Always show at least the current page number
  container.innerHTML = `
    <div class="flex flex-col sm:flex-row justify-between items-center gap-4">
      <p class="text-white/60 text-sm">
        Showing ${startItem} to ${endItem} of ${total} users
      </p>
      <div class="flex items-center gap-2">
        ${totalPages > 1 ? `
          <button
            onclick="window.loadUsersPage(${Math.max(1, currentPage - 1)}, '${search}', ${limit})"
            ${currentPage === 1 ? 'disabled' : ''}
            class="px-3 py-1 rounded bg-white/10 text-white/60 hover:bg-white/20 disabled:opacity-50 disabled:cursor-not-allowed transition"
          >
            Previous
          </button>
        ` : ''}
        <button
          onclick="window.loadUsersPage(${currentPage}, '${search}', ${limit})"
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
                  onclick="window.loadUsersPage(${page}, '${search}', ${limit})"
                  class="px-3 py-1 rounded bg-white/10 text-white/60 hover:bg-white/20 transition"
                >
                  ${page}
                </button>
              `;
            }).join('');
          })()}
          <button
            onclick="window.loadUsersPage(${Math.min(totalPages, currentPage + 1)}, '${search}', ${limit})"
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

(window as any).loadUsersPage = (page: number, search: string, limit: number = (window as any).adminUsersPageLimit || 10) => {
  loadUsers(page, search, limit);
};

(window as any).viewUserWallet = async (userId: string, page: number = 1, limit: number = 10) => {
  (window as any).currentWalletUserId = userId;
  (window as any).currentWalletPage = page;
  (window as any).currentWalletLimit = limit;

  try {
    const response = await api.admin.getUserWallet(userId, { page, limit });
    const { user, wallet, transactions, pagination } = response.data.data;

    const modal = document.getElementById('userWalletModal');
    const modalUserEmail = document.getElementById('modalUserEmail');
    const walletDetailsContainer = document.getElementById('walletDetailsContainer');

    if (modalUserEmail) {
      modalUserEmail.textContent = user.email;
    }

    if (walletDetailsContainer) {
      const startItem = (page - 1) * limit + 1;
      const endItem = Math.min(page * limit, pagination.total);

      // Store transactions globally for modal access
      (window as any).adminUserTransactions = transactions;

      walletDetailsContainer.innerHTML = `
        <div class="space-y-6">
          <div class="bg-white/[0.02] rounded-lg p-6 border border-white/10">
            <h4 class="text-lg font-semibold text-white mb-4">Wallet Information</h4>
            <div class="grid grid-cols-2 gap-4">
              <div>
                <p class="text-white/60 text-sm">Balance</p>
                <p class="text-2xl font-bold text-white">PKR ${parseFloat(wallet.balance).toLocaleString('en-PK', { minimumFractionDigits: 2 })}</p>
              </div>
              <div>
                <p class="text-white/60 text-sm">Currency</p>
                <p class="text-xl font-semibold text-white">${wallet.currency}</p>
              </div>
            </div>
          </div>

          <div class="bg-white/[0.02] rounded-lg p-6 border border-white/10">
            <h4 class="text-lg font-semibold text-white mb-4">Admin Actions</h4>
            <div class="space-y-3">
              <button
                onclick="window.showDeductPointsForm('${wallet.id}')"
                class="w-full px-4 py-3 bg-rk-green/20 hover:bg-rk-green/30 text-rk-green rounded-lg transition border border-rk-green/30"
              >
                Deduct Points (Trading ID)
              </button>
              <button
                onclick="window.showAdjustBalanceForm('${wallet.id}')"
                class="w-full px-4 py-3 bg-rk-green/20 hover:bg-rk-green/30 text-rk-green rounded-lg transition border border-rk-green/30"
              >
                Adjust Balance
              </button>
            </div>
          </div>

          <!-- Action Form Container - appears between Admin Actions and Recent Transactions -->
          <div id="actionFormContainer"></div>

          <div class="bg-white/[0.02] rounded-lg p-6 border border-white/10">
            <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
              <h4 class="text-lg font-semibold text-white">Recent Transactions</h4>
              <div class="flex items-center gap-2">
                <span class="text-white/60 text-sm">Per page:</span>
                <select
                  onchange="window.viewUserWallet('${userId}', 1, parseInt(this.value))"
                  class="px-2 py-1 bg-ink-850 border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-rk-green/50"
                >
                  <option value="10" ${limit === 10 ? 'selected' : ''}>10</option>
                  <option value="25" ${limit === 25 ? 'selected' : ''}>25</option>
                  <option value="50" ${limit === 50 ? 'selected' : ''}>50</option>
                  <option value="100" ${limit === 100 ? 'selected' : ''}>100</option>
                </select>
              </div>
            </div>
            ${transactions.length === 0 ? `
              <p class="text-white/60 text-center py-4">No transactions yet</p>
            ` : `
              <div class="overflow-x-auto mb-4">
                <table class="w-full text-sm">
                  <thead>
                    <tr class="border-b border-white/10">
                      <th class="text-left py-3 px-4 text-white/60 font-medium whitespace-nowrap">Date</th>
                      <th class="text-left py-3 px-4 text-white/60 font-medium whitespace-nowrap">Type</th>
                      <th class="text-right py-3 px-4 text-white/60 font-medium whitespace-nowrap">Amount</th>
                      <th class="text-left py-3 px-4 text-white/60 font-medium whitespace-nowrap">Status</th>
                      <th class="text-left py-3 px-4 text-white/60 font-medium whitespace-nowrap">Method</th>
                      <th class="text-left py-3 px-4 text-white/60 font-medium whitespace-nowrap">Description</th>
                      <th class="text-left py-3 px-4 text-white/60 font-medium whitespace-nowrap">Order ID</th>
                      <th class="text-left py-3 px-4 text-white/60 font-medium whitespace-nowrap">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    ${transactions.map((tx: any, index: number) => `
                      <tr class="border-b border-white/5 hover:bg-white/5">
                        <td class="py-3 px-4 text-white/60 whitespace-nowrap">${new Date(tx.created_at).toLocaleDateString()}</td>
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
                          <button onclick="window.viewAdminUserTransaction('${userId}', ${index})" class="px-2.5 py-1 text-xs rounded bg-white/10 hover:bg-white/20 text-white/80 transition">
                            View
                          </button>
                        </td>
                      </tr>
                    `).join('')}
                  </tbody>
                </table>
              </div>
              <!-- Transaction Details Modal -->
              <div id="adminUserTransactionModal" class="hidden fixed inset-0 bg-black/80 backdrop-blur-sm z-50" onclick="if (event.target === this) window.closeAdminUserTransaction()">
                <div class="h-full w-full flex items-start sm:items-center justify-center p-4 sm:p-6" onclick="event.stopPropagation()">
                  <div class="bg-ink-850 rounded-2xl p-5 sm:p-6 w-full max-w-2xl border border-white/10 shadow-2xl max-h-[85vh] overflow-y-auto">
                    <div class="flex justify-between items-center mb-5">
                      <h3 class="text-lg sm:text-xl font-bold text-white">Transaction Details</h3>
                      <button type="button" onclick="window.closeAdminUserTransaction()" class="px-3 py-1 text-sm rounded-lg bg-white/10 hover:bg-white/20 text-white/80 transition">
                        Close
                      </button>
                    </div>
                    <div id="adminUserTransactionContent" class="space-y-5">
                      <p class="text-white/60 text-center py-8">Click a transaction to see details</p>
                    </div>
                  </div>
                </div>
              </div>
              <div class="mt-4 flex flex-col sm:flex-row justify-between items-center gap-4">
                <p class="text-white/60 text-sm">
                  Showing ${startItem} to ${endItem} of ${pagination.total} transactions
                </p>
                <div class="flex items-center gap-2">
                  <button
                    onclick="window.viewUserWallet('${userId}', ${Math.max(1, page - 1)}, ${limit})"
                    ${page === 1 ? 'disabled' : ''}
                    class="px-3 py-1 rounded bg-white/10 text-white/60 hover:bg-white/20 disabled:opacity-50 disabled:cursor-not-allowed transition"
                  >
                    Previous
                  </button>
                  <span class="px-3 py-1 rounded bg-rk-green text-black text-sm">${page}</span>
                  <button
                    onclick="window.viewUserWallet('${userId}', ${Math.min(pagination.totalPages, page + 1)}, ${limit})"
                    ${page === pagination.totalPages ? 'disabled' : ''}
                    class="px-3 py-1 rounded bg-white/10 text-white/60 hover:bg-white/20 disabled:opacity-50 disabled:cursor-not-allowed transition"
                  >
                    Next
                  </button>
                </div>
              </div>
            `}
          </div>
        </div>
      `;
    }

    modal?.classList.remove('hidden');
  } catch (error) {
    console.error('Failed to load user wallet:', error);
    alert('Failed to load wallet details');
  }
};

(window as any).showDeductPointsForm = (walletId: string) => {
  const container = document.getElementById('actionFormContainer');
  if (!container) return;

  container.innerHTML = `
    <div class="bg-white/[0.02] rounded-lg p-6 border-2 border-rk-green/30">
      <h4 class="text-lg font-semibold text-white mb-4">Deduct Points for Trading ID</h4>
      <form id="deductForm" class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-white/80 mb-2">Amount (PKR)</label>
          <input
            type="number"
            id="deductAmount"
            min="1"
            required
            class="w-full px-4 py-2 bg-ink-850 border border-white/10 rounded-lg text-white focus:outline-none focus:border-rk-green/50"
          />
        </div>
        <div>
          <label class="block text-sm font-medium text-white/80 mb-2">Description</label>
          <input
            type="text"
            id="deductDescription"
            required
            placeholder="Trading ID activation - ID#12345"
            class="w-full px-4 py-2 bg-ink-850 border border-white/10 rounded-lg text-white focus:outline-none focus:border-rk-green/50"
          />
        </div>
        <div id="deductError" class="hidden bg-red-500/20 border border-red-500/50 text-red-200 px-4 py-3 rounded-lg text-sm"></div>
        <div class="flex gap-3">
          <button
            type="button"
            onclick="document.getElementById('actionFormContainer').innerHTML = ''"
            class="flex-1 px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition"
          >
            Cancel
          </button>
          <button
            type="submit"
            class="flex-1 px-4 py-2 bg-rk-green hover:bg-rk-greenBright text-black rounded-lg transition"
          >
            Deduct Points
          </button>
        </div>
      </form>
    </div>
  `;

  document.getElementById('deductForm')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    await handleDeductPoints(walletId);
  });
};

(window as any).showAdjustBalanceForm = (walletId: string) => {
  const container = document.getElementById('actionFormContainer');
  if (!container) return;

  container.innerHTML = `
    <div class="bg-white/[0.02] rounded-lg p-6 border-2 border-rk-green/30">
      <h4 class="text-lg font-semibold text-white mb-4">Adjust Balance</h4>
      <form id="adjustForm" class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-white/80 mb-2">Type</label>
          <select
            id="adjustType"
            required
            class="w-full px-4 py-2 bg-ink-850 border border-white/10 rounded-lg text-white focus:outline-none focus:border-rk-green/50"
          >
            <option value="credit">Credit (Add)</option>
            <option value="debit">Debit (Subtract)</option>
          </select>
        </div>
        <div>
          <label class="block text-sm font-medium text-white/80 mb-2">Amount (PKR)</label>
          <input
            type="number"
            id="adjustAmount"
            min="1"
            required
            class="w-full px-4 py-2 bg-ink-850 border border-white/10 rounded-lg text-white focus:outline-none focus:border-rk-green/50"
          />
        </div>
        <div>
          <label class="block text-sm font-medium text-white/80 mb-2">Description</label>
          <input
            type="text"
            id="adjustDescription"
            required
            placeholder="Reason for adjustment"
            class="w-full px-4 py-2 bg-ink-850 border border-white/10 rounded-lg text-white focus:outline-none focus:border-rk-green/50"
          />
        </div>
        <div id="adjustError" class="hidden bg-red-500/20 border border-red-500/50 text-red-200 px-4 py-3 rounded-lg text-sm"></div>
        <div class="flex gap-3">
          <button
            type="button"
            onclick="document.getElementById('actionFormContainer').innerHTML = ''"
            class="flex-1 px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition"
          >
            Cancel
          </button>
          <button
            type="submit"
            class="flex-1 px-4 py-2 bg-rk-green hover:bg-rk-greenBright text-black rounded-lg transition"
          >
            Adjust Balance
          </button>
        </div>
      </form>
    </div>
  `;

  document.getElementById('adjustForm')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    await handleAdjustBalance(walletId);
  });
};

async function handleDeductPoints(walletId: string): Promise<void> {
  const amount = parseFloat((document.getElementById('deductAmount') as HTMLInputElement).value);
  const description = (document.getElementById('deductDescription') as HTMLInputElement).value;
  const errorDiv = document.getElementById('deductError');

  try {
    await api.admin.deductPoints(walletId, { amount, description });
    
    // Clear the form
    document.getElementById('actionFormContainer')!.innerHTML = '';
    
    // Show success message
    const successDiv = document.createElement('div');
    successDiv.className = 'bg-green-500/20 border border-green-500/50 text-green-200 px-4 py-3 rounded-lg text-sm mb-4';
    successDiv.textContent = `Successfully deducted PKR ${amount.toLocaleString('en-PK')} from wallet!`;
    document.getElementById('actionFormContainer')!.appendChild(successDiv);
    
    // Reload wallet data
    const userId = (window as any).currentWalletUserId;
    const page = (window as any).currentWalletPage || 1;
    const limit = (window as any).currentWalletLimit || 10;
    if (userId) {
      await (window as any).viewUserWallet(userId, page, limit);
    }
    
    // Remove success message after 3 seconds
    setTimeout(() => {
      successDiv.remove();
    }, 3000);
  } catch (error: any) {
    if (errorDiv) {
      errorDiv.textContent = error.response?.data?.error || 'Failed to deduct points';
      errorDiv.classList.remove('hidden');
    }
  }
}

async function handleAdjustBalance(walletId: string): Promise<void> {
  const type = (document.getElementById('adjustType') as HTMLSelectElement).value as 'credit' | 'debit';
  const amount = parseFloat((document.getElementById('adjustAmount') as HTMLInputElement).value);
  const description = (document.getElementById('adjustDescription') as HTMLInputElement).value;
  const errorDiv = document.getElementById('adjustError');

  try {
    await api.admin.adjustBalance(walletId, { amount, type, description });
    
    // Clear the form
    document.getElementById('actionFormContainer')!.innerHTML = '';
    
    // Show success message
    const successDiv = document.createElement('div');
    successDiv.className = 'bg-green-500/20 border border-green-500/50 text-green-200 px-4 py-3 rounded-lg text-sm mb-4';
    successDiv.textContent = `Successfully ${type === 'credit' ? 'added' : 'deducted'} PKR ${amount.toLocaleString('en-PK')} ${type === 'credit' ? 'to' : 'from'} wallet!`;
    document.getElementById('actionFormContainer')!.appendChild(successDiv);
    
    // Reload wallet data
    const userId = (window as any).currentWalletUserId;
    const page = (window as any).currentWalletPage || 1;
    const limit = (window as any).currentWalletLimit || 10;
    if (userId) {
      await (window as any).viewUserWallet(userId, page, limit);
    }
    
    // Remove success message after 3 seconds
    setTimeout(() => {
      successDiv.remove();
    }, 3000);
  } catch (error: any) {
    if (errorDiv) {
      errorDiv.textContent = error.response?.data?.error || 'Failed to adjust balance';
      errorDiv.classList.remove('hidden');
    }
  }
}

function formatType(type: string): string {
  return type.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
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

function getTypeColor(type: string): string {
  const colors: Record<string, string> = {
    deposit: 'bg-rk-green/20 text-rk-green',
    withdrawal: 'bg-blue-500/20 text-blue-300',
    trading_id_deduction: 'bg-yellow-500/20 text-yellow-300',
    admin_adjustment: 'bg-purple-500/20 text-purple-300'
  };
  return colors[type] || 'bg-white/10 text-white/60';
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

(window as any).viewAdminUserTransaction = (userId: string, index: number): void => {
  const modal = document.getElementById('adminUserTransactionModal');
  const content = document.getElementById('adminUserTransactionContent');
  if (!modal || !content) return;

  try {
    const transactions = (window as any).adminUserTransactions || [];
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
    console.error('viewAdminUserTransaction error:', err);
    content.innerHTML = `
      <div class="text-center py-8 text-red-300">
        <p class="font-semibold">Failed to load details</p>
        <p class="text-sm text-white/60 mt-1">${err instanceof Error ? err.message : 'Unknown error'}</p>
      </div>
    `;
    modal.classList.remove('hidden');
  }
};

(window as any).closeAdminUserTransaction = (): void => {
  const modal = document.getElementById('adminUserTransactionModal');
  if (modal) {
    modal.classList.add('hidden');
  }
};

// Password reset functionality
(window as any).resetUserPassword = (userId: string, userEmail: string): void => {
  const modal = document.createElement('div');
  modal.className = 'fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 px-4';
  modal.innerHTML = `
    <div class="bg-ink-800 backdrop-blur-lg rounded-2xl p-6 sm:p-8 max-w-md w-full border border-white/10 shadow-card">
      <h3 class="text-xl sm:text-2xl font-bold text-white mb-4">Reset Password</h3>
      <p class="text-white/60 text-sm mb-6">Reset password for: <span class="text-white font-medium">${userEmail}</span></p>
      
      <form id="resetPasswordForm" class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-white/80 mb-2">New Password</label>
          <input
            type="password"
            id="newPassword"
            required
            minlength="8"
            class="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-white/[0.04] border border-white/10 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-white/20 text-sm"
            placeholder="Enter new password"
          />
          <p class="text-xs text-white/40 mt-1">Must be at least 8 characters with uppercase, lowercase, number, and special character</p>
        </div>

        <div>
          <label class="block text-sm font-medium text-white/80 mb-2">Confirm Password</label>
          <input
            type="password"
            id="confirmNewPassword"
            required
            minlength="8"
            class="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-white/[0.04] border border-white/10 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-white/20 text-sm"
            placeholder="Confirm new password"
          />
          <p id="passwordMatchReset" class="text-xs mt-1 hidden"></p>
        </div>

        <div id="resetError" class="hidden bg-red-500/10 border border-red-500/20 text-red-300 px-3 sm:px-4 py-2.5 rounded-lg text-xs sm:text-sm"></div>
        <div id="resetSuccess" class="hidden bg-green-500/10 border border-green-500/20 text-green-300 px-3 sm:px-4 py-2.5 rounded-lg text-xs sm:text-sm"></div>

        <div class="flex gap-3">
          <button
            type="button"
            id="cancelResetBtn"
            class="flex-1 px-4 py-2.5 bg-white/[0.04] border border-white/10 hover:bg-white/[0.08] text-white rounded-lg transition text-sm"
          >
            Cancel
          </button>
          <button
            type="submit"
            id="confirmResetBtn"
            class="flex-1 px-4 py-2.5 bg-blue-500/20 border border-blue-500/30 hover:bg-blue-500/30 text-blue-300 rounded-lg transition text-sm font-medium"
          >
            Reset Password
          </button>
        </div>
      </form>
    </div>
  `;
  
  document.body.appendChild(modal);

  const form = modal.querySelector('#resetPasswordForm') as HTMLFormElement;
  const cancelBtn = modal.querySelector('#cancelResetBtn') as HTMLButtonElement;
  const newPasswordInput = modal.querySelector('#newPassword') as HTMLInputElement;
  const confirmPasswordInput = modal.querySelector('#confirmNewPassword') as HTMLInputElement;
  const passwordMatchText = modal.querySelector('#passwordMatchReset') as HTMLParagraphElement;
  const errorDiv = modal.querySelector('#resetError') as HTMLDivElement;
  const successDiv = modal.querySelector('#resetSuccess') as HTMLDivElement;
  const confirmBtn = modal.querySelector('#confirmResetBtn') as HTMLButtonElement;

  const closeModal = () => {
    modal.remove();
  };

  // Check if passwords match
  function checkPasswordMatch() {
    const password = newPasswordInput.value;
    const confirmPassword = confirmPasswordInput.value;
    
    if (confirmPassword.length > 0) {
      passwordMatchText.classList.remove('hidden');
      if (password === confirmPassword) {
        passwordMatchText.textContent = '✓ Passwords match';
        passwordMatchText.className = 'text-xs mt-1 text-green-400';
      } else {
        passwordMatchText.textContent = '✗ Passwords do not match';
        passwordMatchText.className = 'text-xs mt-1 text-red-400';
      }
    } else {
      passwordMatchText.classList.add('hidden');
    }
  }

  newPasswordInput.addEventListener('input', checkPasswordMatch);
  confirmPasswordInput.addEventListener('input', checkPasswordMatch);

  cancelBtn.addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const newPassword = newPasswordInput.value;
    const confirmPassword = confirmPasswordInput.value;

    errorDiv.classList.add('hidden');
    successDiv.classList.add('hidden');

    // Validate password strength
    const hasUpperCase = /[A-Z]/.test(newPassword);
    const hasLowerCase = /[a-z]/.test(newPassword);
    const hasNumber = /\d/.test(newPassword);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(newPassword);

    if (!hasUpperCase || !hasLowerCase || !hasNumber || !hasSpecialChar) {
      errorDiv.textContent = 'Password must contain uppercase, lowercase, number, and special character';
      errorDiv.classList.remove('hidden');
      return;
    }

    if (newPassword !== confirmPassword) {
      errorDiv.textContent = 'Passwords do not match';
      errorDiv.classList.remove('hidden');
      return;
    }

    confirmBtn.disabled = true;
    confirmBtn.textContent = 'Resetting...';

    try {
      const response = await api.admin.resetUserPassword(userId, newPassword);
      
      successDiv.textContent = 'Password reset successfully! The user can now login with the new password.';
      successDiv.classList.remove('hidden');
      
      confirmBtn.textContent = 'Password Reset!';
      
      setTimeout(() => {
        closeModal();
      }, 2000);
    } catch (error: any) {
      const errorMsg = error.response?.data?.error || 'Failed to reset password';
      errorDiv.textContent = errorMsg;
      errorDiv.classList.remove('hidden');
      confirmBtn.disabled = false;
      confirmBtn.textContent = 'Reset Password';
    }
  });
};

(window as any).toggleUserStatus = async (userId: string, userEmail: string, currentStatus: boolean) => {
  const action = currentStatus ? 'deactivate' : 'activate';
  const confirmed = confirm(`Are you sure you want to ${action} user: ${userEmail}?`);
  
  if (!confirmed) return;

  try {
    // Call API to toggle user status (we'll create this endpoint)
    await api.admin.toggleUserStatus(userId, !currentStatus);
    alert(`User ${action}d successfully!`);
    window.location.reload();
  } catch (error: any) {
    alert(error.response?.data?.error || `Failed to ${action} user`);
  }
};

(window as any).showCreateUserModal = () => {
  const modal = document.createElement('div');
  modal.id = 'createUserModal';
  modal.className = 'fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4';
  modal.innerHTML = `
    <div class="bg-ink-850 rounded-2xl p-6 w-full max-w-md border border-white/10 shadow-2xl" onclick="event.stopPropagation()">
      <div class="mb-6">
        <h2 class="text-2xl font-bold text-white mb-2">Create New User</h2>
        <p class="text-white/60 text-sm">Add a new user to the system</p>
      </div>

      <form id="createUserForm" class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-white/80 mb-2">Email</label>
          <input
            type="email"
            id="newUserEmail"
            class="w-full bg-white/[0.04] border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-rk-green/50"
            placeholder="user@example.com"
            required
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-white/80 mb-2">Username</label>
          <input
            type="text"
            id="newUserUsername"
            class="w-full bg-white/[0.04] border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-rk-green/50"
            placeholder="username"
            required
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-white/80 mb-2">Password</label>
          <input
            type="password"
            id="newUserPassword"
            class="w-full bg-white/[0.04] border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-rk-green/50"
            placeholder="Minimum 8 characters"
            required
          />
          <p class="text-xs text-white/40 mt-1">User will be forced to change this password on first login</p>
        </div>

        <div id="createUserError" class="hidden bg-red-500/10 border border-red-500/20 rounded-lg p-3 text-red-300 text-sm"></div>
        <div id="createUserSuccess" class="hidden bg-green-500/10 border border-green-500/20 rounded-lg p-3 text-green-300 text-sm"></div>

        <div class="flex gap-3">
          <button
            type="button"
            id="cancelCreateUserBtn"
            class="flex-1 px-4 py-3 bg-white/10 hover:bg-white/20 text-white rounded-lg transition"
          >
            Cancel
          </button>
          <button
            type="submit"
            id="confirmCreateUserBtn"
            class="flex-1 px-4 py-3 bg-rk-green hover:bg-rk-green/90 text-white font-bold rounded-lg transition"
          >
            Create User
          </button>
        </div>
      </form>
    </div>
  `;

  document.body.appendChild(modal);

  const form = document.getElementById('createUserForm') as HTMLFormElement;
  const emailInput = document.getElementById('newUserEmail') as HTMLInputElement;
  const usernameInput = document.getElementById('newUserUsername') as HTMLInputElement;
  const passwordInput = document.getElementById('newUserPassword') as HTMLInputElement;
  const errorDiv = document.getElementById('createUserError');
  const successDiv = document.getElementById('createUserSuccess');
  const cancelBtn = document.getElementById('cancelCreateUserBtn');
  const confirmBtn = document.getElementById('confirmCreateUserBtn') as HTMLButtonElement;

  const closeModal = () => {
    modal.remove();
  };

  cancelBtn?.addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const email = emailInput.value.trim();
    const username = usernameInput.value.trim();
    const password = passwordInput.value;

    if (!email || !username || !password) {
      if (errorDiv) {
        errorDiv.textContent = 'All fields are required';
        errorDiv.classList.remove('hidden');
      }
      return;
    }

    if (password.length < 8) {
      if (errorDiv) {
        errorDiv.textContent = 'Password must be at least 8 characters';
        errorDiv.classList.remove('hidden');
      }
      return;
    }

    errorDiv?.classList.add('hidden');
    successDiv?.classList.add('hidden');

    confirmBtn.disabled = true;
    confirmBtn.textContent = 'Creating...';

    try {
      await api.admin.createUser({ email, username, password });
      
      if (successDiv) {
        successDiv.textContent = 'User created successfully!';
        successDiv.classList.remove('hidden');
      }
      
      confirmBtn.textContent = 'Created!';
      
      setTimeout(() => {
        closeModal();
        window.location.reload();
      }, 1500);
    } catch (error: any) {
      const errorMsg = error.response?.data?.error || 'Failed to create user';
      if (errorDiv) {
        errorDiv.textContent = errorMsg;
        errorDiv.classList.remove('hidden');
      }
      confirmBtn.disabled = false;
      confirmBtn.textContent = 'Create User';
    }
  });
};
