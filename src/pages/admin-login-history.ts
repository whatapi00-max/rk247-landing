import { api } from '../services/api';
import { authService } from '../services/auth';

export function renderAdminLoginHistoryPage(): string {
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
          <a href="/admin/login-history" class="flex items-center gap-3 px-4 py-3 rounded-lg bg-rk-green/20 text-rk-green font-medium">
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
          <h1 class="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-2">Admin Login History</h1>
          <p class="text-white/60 text-xs sm:text-sm md:text-base">Track where and when admin accounts signed in — IP address, ISP, and location</p>
        </div>

        <div class="mb-6 flex flex-wrap gap-3">
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
          <div id="loginHistoryContainer" class="overflow-x-auto">
            <div class="text-center py-12">
              <div class="animate-pulse space-y-3">
                <div class="h-4 bg-white/10 rounded w-3/4 mx-auto"></div>
                <div class="h-4 bg-white/10 rounded w-1/2 mx-auto"></div>
              </div>
            </div>
          </div>

          <div id="paginationContainer" class="px-4 sm:px-6 py-4 border-t border-white/10"></div>
        </div>
      </main>
    </div>
  `;
}

export function initAdminLoginHistoryPage(): void {
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
  let pageLimit = 10;
  (window as any).adminLoginHistoryPageLimit = pageLimit;

  const limitSelect = document.getElementById('limitSelect') as HTMLSelectElement;
  limitSelect?.addEventListener('change', (e) => {
    pageLimit = parseInt((e.target as HTMLSelectElement).value) || 10;
    (window as any).adminLoginHistoryPageLimit = pageLimit;
    currentPage = 1;
    loadLoginHistory(currentPage, pageLimit);
  });

  loadLoginHistory(currentPage, pageLimit);
}

async function loadLoginHistory(page: number = 1, limit: number = 10): Promise<void> {
  try {
    const response = await api.admin.getLoginHistory({ page, limit });
    const { logins, pagination } = response.data.data;

    const container = document.getElementById('loginHistoryContainer');
    if (!container) return;

    if (!logins || logins.length === 0) {
      container.innerHTML = `
        <div class="text-center py-12 text-white/60">
          <p>No admin logins recorded yet</p>
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
              <th class="text-left py-3 px-4 text-white/70 font-medium whitespace-nowrap">Date &amp; Time</th>
              <th class="text-left py-3 px-4 text-white/70 font-medium whitespace-nowrap">Admin</th>
              <th class="text-left py-3 px-4 text-white/70 font-medium whitespace-nowrap">IP Address</th>
              <th class="text-left py-3 px-4 text-white/70 font-medium whitespace-nowrap">Location</th>
              <th class="text-left py-3 px-4 text-white/70 font-medium whitespace-nowrap">ISP</th>
              <th class="text-left py-3 px-4 text-white/70 font-medium whitespace-nowrap">Device / Browser</th>
            </tr>
          </thead>
          <tbody>
            ${logins.map((login: any) => `
              <tr class="border-b border-white/5 hover:bg-white/[0.02]">
                <td class="py-3 px-4 text-white/60 whitespace-nowrap">${new Date(login.created_at).toLocaleString()}</td>
                <td class="py-3 px-4 text-white whitespace-nowrap">${login.admin?.email || 'Unknown'}</td>
                <td class="py-3 px-4 text-white/60 font-mono whitespace-nowrap">${login.ip_address || '-'}</td>
                <td class="py-3 px-4 text-white/60 whitespace-nowrap">${formatLocation(login)}</td>
                <td class="py-3 px-4 text-white/60 whitespace-nowrap">${login.isp || '-'}</td>
                <td class="py-3 px-4 text-white/60 max-w-[280px] break-words">${login.user_agent || '-'}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    `;

    if (pagination) {
      renderPagination(pagination, page);
    } else {
      document.getElementById('paginationContainer')!.innerHTML = '';
    }
  } catch (error: any) {
    console.error('Failed to load admin login history:', error);
    const container = document.getElementById('loginHistoryContainer');
    if (container) {
      const message = error?.response?.data?.code === 'MIGRATION_REQUIRED'
        ? 'Login history table not found yet. Please run backend/src/migrations/add_admin_login_history.sql in Supabase.'
        : 'Failed to load admin login history.';
      container.innerHTML = `<div class="text-center py-12 text-red-300">${message}</div>`;
    }
  }
}

function formatLocation(login: any): string {
  const parts = [login.city, login.region, login.country].filter(Boolean);
  return parts.length > 0 ? parts.join(', ') : '-';
}

function renderPagination(pagination: any, currentPage: number): void {
  const container = document.getElementById('paginationContainer');
  if (!container) return;

  const totalPages = pagination?.totalPages || 1;
  const total = pagination?.total || 0;
  const limit = pagination?.limit || 10;

  const startItem = (currentPage - 1) * limit + 1;
  const endItem = Math.min(currentPage * limit, total);

  const pages = [];
  for (let i = 1; i <= totalPages; i++) {
    if (i === 1 || i === totalPages || (i >= currentPage - 2 && i <= currentPage + 2)) {
      pages.push(i);
    } else if (pages[pages.length - 1] !== '...') {
      pages.push('...');
    }
  }

  container.innerHTML = `
    <div class="flex flex-col sm:flex-row justify-between items-center gap-4">
      <p class="text-white/60 text-sm">
        Showing ${startItem} to ${endItem} of ${total} logins
      </p>
      <div class="flex items-center gap-2">
        <button
          onclick="window.loadLoginHistoryPage(${Math.max(1, currentPage - 1)})"
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
              onclick="window.loadLoginHistoryPage(${page})"
              class="px-3 py-1 rounded ${page === currentPage ? 'bg-rk-green text-black' : 'bg-white/10 text-white/60 hover:bg-white/20'} transition"
            >
              ${page}
            </button>
          `;
        }).join('')}
        <button
          onclick="window.loadLoginHistoryPage(${Math.min(totalPages, currentPage + 1)})"
          ${currentPage === totalPages ? 'disabled' : ''}
          class="px-3 py-1 rounded bg-white/10 text-white/60 hover:bg-white/20 disabled:opacity-50 disabled:cursor-not-allowed transition"
        >
          Next
        </button>
      </div>
    </div>
  `;
}

(window as any).loadLoginHistoryPage = (page: number) => {
  loadLoginHistory(page, (window as any).adminLoginHistoryPageLimit || 10);
};
