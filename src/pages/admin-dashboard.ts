import { api } from '../services/api';
import { authService } from '../services/auth';

export function renderAdminDashboard(): string {
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
          <a href="/admin/dashboard" class="flex items-center gap-3 px-4 py-3 rounded-lg bg-rk-green/20 text-rk-green font-medium">
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
          <h1 class="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-2">Dashboard Overview</h1>
          <p class="text-white/60 text-xs sm:text-sm md:text-base">Real-time platform statistics and analytics</p>
        </div>

        <!-- Stats Grid -->
        <div id="statsContainer" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
          <div class="bg-ink-850 backdrop-blur-lg rounded-2xl p-4 sm:p-6 border border-white/10 shadow-card">
            <div class="flex items-center justify-between mb-4">
              <h3 class="text-xs sm:text-sm font-medium text-white/70">Total Users</h3>
              <svg class="w-6 sm:w-8 h-6 sm:h-8 text-rk-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path>
              </svg>
            </div>
            <div id="totalUsers" class="text-2xl sm:text-3xl font-bold text-white">
              <div class="animate-pulse bg-white/10 h-8 sm:h-10 w-20 sm:w-24 rounded"></div>
            </div>
            <p class="text-xs text-white/60 mt-2">Registered accounts</p>
          </div>

          <div class="bg-ink-850 backdrop-blur-lg rounded-2xl p-4 sm:p-6 border border-white/10 shadow-card">
            <div class="flex items-center justify-between mb-4">
              <h3 class="text-xs sm:text-sm font-medium text-white/70">Total Balance</h3>
              <svg class="w-6 sm:w-8 h-6 sm:h-8 text-rk-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <div id="totalBalance" class="text-2xl sm:text-3xl font-bold text-white">
              <div class="animate-pulse bg-white/10 h-8 sm:h-10 w-24 sm:w-32 rounded"></div>
            </div>
            <p class="text-xs text-white/60 mt-2">Across all wallets</p>
          </div>

          <div class="bg-ink-850 backdrop-blur-lg rounded-2xl p-4 sm:p-6 border border-white/10 shadow-card">
            <div class="flex items-center justify-between mb-4">
              <h3 class="text-xs sm:text-sm font-medium text-white/70">Today's Deposits</h3>
              <svg class="w-6 sm:w-8 h-6 sm:h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path>
              </svg>
            </div>
            <div id="todayDeposits" class="text-2xl sm:text-3xl font-bold text-white">
              <div class="animate-pulse bg-white/10 h-8 sm:h-10 w-20 sm:w-28 rounded"></div>
            </div>
            <p class="text-xs text-white/60 mt-2">Deposits today</p>
          </div>

          <div class="bg-ink-850 backdrop-blur-lg rounded-2xl p-4 sm:p-6 border border-white/10 shadow-card">
            <div class="flex items-center justify-between mb-4">
              <h3 class="text-xs sm:text-sm font-medium text-white/70">Today's Withdrawals</h3>
              <svg class="w-6 sm:w-8 h-6 sm:h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 13l-5 5m0 0l-5-5m5 5V6"></path>
              </svg>
            </div>
            <div id="todayWithdrawals" class="text-2xl sm:text-3xl font-bold text-white">
              <div class="animate-pulse bg-white/10 h-8 sm:h-10 w-20 sm:w-28 rounded"></div>
            </div>
            <p class="text-xs text-white/60 mt-2">Withdrawals today</p>
          </div>

          <div class="bg-ink-850 backdrop-blur-lg rounded-2xl p-4 sm:p-6 border border-white/10 shadow-card">
            <div class="flex items-center justify-between mb-4">
              <h3 class="text-xs sm:text-sm font-medium text-white/70">Pending Transactions</h3>
              <svg class="w-6 sm:w-8 h-6 sm:h-8 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <div id="pendingTransactions" class="text-2xl sm:text-3xl font-bold text-white">
              <div class="animate-pulse bg-white/10 h-8 sm:h-10 w-12 sm:w-16 rounded"></div>
            </div>
            <p class="text-xs text-white/60 mt-2">Awaiting processing</p>
          </div>

          <div class="bg-ink-850 backdrop-blur-lg rounded-2xl p-4 sm:p-6 border border-white/10 shadow-card">
            <div class="flex items-center justify-between mb-4">
              <h3 class="text-xs sm:text-sm font-medium text-white/70">Pending Withdrawals</h3>
              <svg class="w-6 sm:w-8 h-6 sm:h-8 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
              </svg>
            </div>
            <div id="pendingWithdrawals" class="text-2xl sm:text-3xl font-bold text-white">
              <div class="animate-pulse bg-white/10 h-8 sm:h-10 w-12 sm:w-16 rounded"></div>
            </div>
            <p class="text-xs text-white/60 mt-2">Awaiting approval</p>
          </div>
        </div>

        <!-- Charts Section -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
          <div class="bg-ink-850 backdrop-blur-lg rounded-2xl p-4 sm:p-6 border border-white/10 shadow-card">
            <h3 class="text-base sm:text-lg font-semibold text-white mb-4">Transaction Trends (Last 7 Days)</h3>
            <div id="transactionChart" class="h-48 sm:h-64">
              <div class="flex items-center justify-center h-full text-white/60">
                <div class="animate-pulse space-y-2">
                  <div class="h-4 bg-white/10 rounded w-32 sm:w-48"></div>
                  <div class="h-4 bg-white/10 rounded w-20 sm:w-32"></div>
                </div>
              </div>
            </div>
          </div>

          <div class="bg-ink-850 backdrop-blur-lg rounded-2xl p-4 sm:p-6 border border-white/10 shadow-card">
            <h3 class="text-base sm:text-lg font-semibold text-white mb-4">Transaction Types Distribution</h3>
            <div id="typeChart" class="h-48 sm:h-64">
              <div class="flex items-center justify-center h-full text-white/60">
                <div class="animate-pulse space-y-2">
                  <div class="h-4 bg-white/10 rounded w-32 sm:w-48"></div>
                  <div class="h-4 bg-white/10 rounded w-20 sm:w-32"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Recent Activity -->
        <div class="bg-ink-850 backdrop-blur-lg rounded-2xl p-4 sm:p-6 border border-white/10 shadow-card">
          <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 sm:mb-6 gap-2">
            <h3 class="text-base sm:text-lg font-semibold text-white">Recent Transactions</h3>
            <a href="/admin/transactions" class="text-rk-green hover:text-rk-greenBright text-sm">View All</a>
          </div>
          <div id="recentTransactions" class="space-y-3 sm:space-y-4">
            <div class="animate-pulse space-y-2 sm:space-y-3">
              <div class="h-10 sm:h-12 bg-white/10 rounded"></div>
              <div class="h-10 sm:h-12 bg-white/10 rounded"></div>
              <div class="h-10 sm:h-12 bg-white/10 rounded"></div>
            </div>
          </div>
        </div>
      </main>
    </div>
  `;
}

export function initAdminDashboard(): void {
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

  loadDashboardStats();
  loadRecentTransactions();
}

async function loadDashboardStats(): Promise<void> {
  try {
    const response = await api.admin.getDashboardStats();
    const stats = response.data.data;

    const totalUsersEl = document.getElementById('totalUsers');
    const totalBalanceEl = document.getElementById('totalBalance');
    const todayDepositsEl = document.getElementById('todayDeposits');
    const todayWithdrawalsEl = document.getElementById('todayWithdrawals');
    const pendingTransactionsEl = document.getElementById('pendingTransactions');
    const pendingWithdrawalsEl = document.getElementById('pendingWithdrawals');

    if (totalUsersEl) {
      totalUsersEl.textContent = stats.total_users.toLocaleString();
    }

    if (totalBalanceEl) {
      totalBalanceEl.textContent = `PKR ${stats.total_balance.toLocaleString('en-PK', { minimumFractionDigits: 2 })}`;
    }

    if (todayDepositsEl) {
      todayDepositsEl.textContent = `PKR ${stats.today_deposits.toLocaleString('en-PK', { minimumFractionDigits: 2 })}`;
    }

    if (todayWithdrawalsEl) {
      todayWithdrawalsEl.textContent = `PKR ${stats.today_withdrawals.toLocaleString('en-PK', { minimumFractionDigits: 2 })}`;
    }

    if (pendingTransactionsEl) {
      pendingTransactionsEl.textContent = stats.pending_transactions.toString();
    }

    if (pendingWithdrawalsEl) {
      pendingWithdrawalsEl.textContent = stats.pending_withdrawals.toString();
    }

    // Load charts after stats are loaded
    loadCharts();
  } catch (error) {
    console.error('Failed to load dashboard stats:', error);
  }
}

async function loadRecentTransactions(): Promise<void> {
  try {
    const response = await api.admin.getTransactions({ limit: 5 });
    const transactions = response.data.data.transactions;

    const container = document.getElementById('recentTransactions');
    if (!container) return;

    if (transactions.length === 0) {
      container.innerHTML = '<p class="text-white/60 text-center py-4">No recent transactions</p>';
      return;
    }

    container.innerHTML = transactions.map((tx: any) => `
      <div class="flex items-center justify-between py-3 border-b border-white/10 last:border-0">
        <div class="flex items-center gap-4">
          <div class="w-10 h-10 rounded-full ${getTransactionIconBg(tx.type)} flex items-center justify-center">
            ${getTransactionIcon(tx.type)}
          </div>
          <div>
            <p class="text-white font-medium">${formatType(tx.type)}</p>
            <p class="text-white/60 text-sm">${tx.wallets?.users?.email || 'Unknown'}</p>
          </div>
        </div>
        <div class="text-right">
          <p class="text-white font-semibold">PKR ${parseFloat(tx.amount).toLocaleString('en-PK')}</p>
          <span class="text-xs px-2 py-0.5 rounded-full ${getStatusColor(tx.status)}">${tx.status}</span>
        </div>
      </div>
    `).join('');
  } catch (error) {
    console.error('Failed to load recent transactions:', error);
  }
}

async function loadCharts(): Promise<void> {
  try {
    // Load transaction trends for last 7 days
    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - 7);

    const response = await api.admin.getTransactions({ limit: 100 });
    const transactions = response.data.data.transactions;

    // Filter transactions from last 7 days
    const recentTransactions = transactions.filter((tx: any) => {
      const txDate = new Date(tx.created_at);
      return txDate >= startDate && txDate <= endDate;
    });

    // Group by date with proper typing
    const dailyData: Record<string, { deposits: number; withdrawals: number }> = {};
    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const dateStr = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
      dailyData[dateStr] = { deposits: 0, withdrawals: 0 };
    }

    recentTransactions.forEach((tx: any) => {
      const dateStr = new Date(tx.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
      if (dailyData[dateStr]) {
        if (tx.type === 'deposit') {
          dailyData[dateStr].deposits += parseFloat(tx.amount);
        } else if (tx.type === 'withdrawal') {
          dailyData[dateStr].withdrawals += parseFloat(tx.amount);
        }
      }
    });

    // Create simple bar chart using HTML/CSS
    const chartContainer = document.getElementById('transactionChart');
    if (chartContainer) {
      const maxValue = Math.max(...Object.values(dailyData).map((d) => Math.max(d.deposits, d.withdrawals)), 1);
      
      chartContainer.innerHTML = `
        <div class="flex items-end justify-between h-full gap-2">
          ${Object.entries(dailyData).map(([date, data]) => `
            <div class="flex-1 flex flex-col items-center gap-2">
              <div class="w-full flex gap-1 items-end h-40">
                <div class="flex-1 bg-rk-green/60 rounded-t" style="height: ${(data.deposits / maxValue) * 100}%"></div>
                <div class="flex-1 bg-red-500/60 rounded-t" style="height: ${(data.withdrawals / maxValue) * 100}%"></div>
              </div>
              <p class="text-xs text-white/60">${date}</p>
            </div>
          `).join('')}
        </div>
        <div class="flex justify-center gap-6 mt-4">
          <div class="flex items-center gap-2">
            <div class="w-3 h-3 bg-rk-green/60 rounded"></div>
            <span class="text-xs text-white/60">Deposits</span>
          </div>
          <div class="flex items-center gap-2">
            <div class="w-3 h-3 bg-red-500/60 rounded"></div>
            <span class="text-xs text-white/60">Withdrawals</span>
          </div>
        </div>
      `;
    }

    // Create transaction type distribution with proper typing
    const typeData: Record<string, number> = {};
    transactions.forEach((tx: any) => {
      typeData[tx.type] = (typeData[tx.type] || 0) + parseFloat(tx.amount);
    });

    const typeChartContainer = document.getElementById('typeChart');
    if (typeChartContainer) {
      const total = Object.values(typeData).reduce((sum: number, val: number) => sum + val, 0);
      const colors = ['bg-rk-green', 'bg-blue-500', 'bg-purple-500', 'bg-yellow-500', 'bg-red-500'];
      
      typeChartContainer.innerHTML = `
        <div class="flex items-center justify-center h-full">
          <div class="grid grid-cols-2 gap-4 w-full">
            ${Object.entries(typeData).map(([type, amount], index) => `
              <div class="flex items-center gap-3">
                <div class="w-4 h-4 ${colors[index % colors.length]} rounded"></div>
                <div class="flex-1">
                  <p class="text-white text-sm">${formatType(type)}</p>
                  <p class="text-white/60 text-xs">PKR ${amount.toLocaleString('en-PK')}</p>
                </div>
                <p class="text-white font-medium text-sm">${((amount / total) * 100).toFixed(1)}%</p>
              </div>
            `).join('')}
          </div>
        </div>
      `;
    }
  } catch (error) {
    console.error('Failed to load charts:', error);
  }
}

function getTransactionIcon(type: string): string {
  const icons: Record<string, string> = {
    deposit: '<svg class="w-5 h-5 text-rk-green" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path></svg>',
    withdrawal: '<svg class="w-5 h-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18"></path></svg>',
    trading_id_deduction: '<svg class="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>',
    admin_adjustment: '<svg class="w-5 h-5 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>'
  };
  return icons[type] || '<svg class="w-5 h-5 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path></svg>';
}

function getTransactionIconBg(type: string): string {
  const bgs: Record<string, string> = {
    deposit: 'bg-rk-green/20',
    withdrawal: 'bg-red-500/20',
    trading_id_deduction: 'bg-purple-500/20',
    admin_adjustment: 'bg-yellow-500/20'
  };
  return bgs[type] || 'bg-white/10';
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
