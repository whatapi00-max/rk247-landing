import axios, { AxiosInstance } from 'axios';

// Prefer explicit env var; otherwise use the local backend only when the app
// itself is served from localhost — deployed builds always hit production.
const isLocal = typeof window !== 'undefined' &&
  ['localhost', '127.0.0.1'].includes(window.location.hostname);
const API_BASE_URL = import.meta.env.VITE_API_URL ||
  (isLocal ? 'http://localhost:5000/api' : 'https://rk247.onrender.com/api');

class ApiClient {
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: API_BASE_URL,
      headers: {
        'Content-Type': 'application/json'
      }
    });

    this.client.interceptors.request.use((config) => {
      // Admin API calls use the admin session; everything else uses the
      // regular user session, so both can stay logged in at once.
      const isAdminRequest = config.url?.startsWith('/admin');
      const token = localStorage.getItem(isAdminRequest ? 'rk247_admin_token' : 'rk247_token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });

    this.client.interceptors.response.use(
      (response) => response,
      (error) => {
        // Don't redirect for authentication endpoints - let them handle errors locally
        const isAuthEndpoint = error.config?.url?.includes('/auth/');
        if (error.response?.status === 401 && !isAuthEndpoint) {
          if (error.config?.url?.startsWith('/admin')) {
            localStorage.removeItem('rk247_admin_token');
            localStorage.removeItem('rk247_admin_user');
            window.location.href = '/admin/login';
          } else {
            localStorage.removeItem('rk247_token');
            localStorage.removeItem('rk247_user');
            window.location.href = '/login';
          }
        }
        return Promise.reject(error);
      }
    );
  }

  auth = {
    register: (data: { email: string; password: string; username: string; phone: string }) =>
      this.client.post('/auth/register', data),

    login: (data: { identifier: string; password: string }) =>
      this.client.post('/auth/login', data),
    
    adminLogin: (data: { email: string; password: string }) =>
      this.client.post('/auth/admin/login', data),
    
    getMe: () =>
      this.client.get('/auth/me'),
    
    changePasswordForced: (data: { newPassword: string }) =>
      this.client.post('/auth/change-password-forced', data)
  };

  user = {
    getProfile: () =>
      this.client.get('/user/profile'),

    updateProfile: (data: { full_name?: string; phone?: string; country?: string; city?: string }) =>
      this.client.put('/user/profile', data),

    changePassword: (data: { current_password: string; new_password: string }) =>
      this.client.post('/user/change-password', data)
  };

  wallet = {
    getBalance: () =>
      this.client.get('/wallet/balance'),
    
    getTransactions: (params?: { limit?: number; offset?: number }) =>
      this.client.get('/wallet/transactions', { params }),
    
    initiateDeposit: (amount: number, paymentSystem: string = 'raast_p2p') =>
      this.client.post('/wallet/deposit/initiate', { amount, payment_system: paymentSystem }),
    
    getDepositStatus: (transactionId: string) =>
      this.client.get(`/wallet/deposit/status/${transactionId}`)
  };

  withdrawal = {
    initiateWithdrawal: (amount: number, paymentSystem: string, accountData: any) =>
      this.client.post('/withdrawal/initiate', { amount, payment_system: paymentSystem, account_data: accountData }),
    
    getWithdrawals: (params?: { limit?: number; offset?: number }) =>
      this.client.get('/withdrawal/list', { params }),
    
    getWithdrawalStatus: (withdrawalId: string) =>
      this.client.get(`/withdrawal/status/${withdrawalId}`)
  };

  admin = {
    getUsers: (params?: { page?: number; limit?: number; search?: string }) =>
      this.client.get('/admin/users', { params }),
    
    getUserWallet: (userId: string, params?: { page?: number; limit?: number }) =>
      this.client.get(`/admin/users/${userId}/wallet`, { params }),
    
    deductPoints: (walletId: string, data: { amount: number; description: string }) =>
      this.client.post(`/admin/wallet/${walletId}/deduct-points`, data),
    
    adjustBalance: (walletId: string, data: { amount: number; type: 'credit' | 'debit'; description: string }) =>
      this.client.post(`/admin/wallet/${walletId}/adjust`, data),
    
    getTransactions: (params?: { page?: number; limit?: number; type?: string; status?: string; start_date?: string; end_date?: string }) =>
      this.client.get('/admin/transactions', { params }),
    
    getWithdrawals: (params?: { page?: number; limit?: number; status?: string }) =>
      this.client.get('/admin/withdrawals', { params }),
    
    approveWithdrawal: (withdrawalId: string) =>
      this.client.post(`/admin/withdrawals/${withdrawalId}/approve`),
    
    rejectWithdrawal: (withdrawalId: string) =>
      this.client.post(`/admin/withdrawals/${withdrawalId}/reject`),
    
    getAdminActions: (params?: { page?: number; limit?: number }) =>
      this.client.get('/admin/admin-actions', { params }),

    getLoginHistory: (params?: { page?: number; limit?: number }) =>
      this.client.get('/admin/login-history', { params }),
    
    getDashboardStats: () =>
      this.client.get('/admin/dashboard/stats'),
    
    resetUserPassword: (userId: string, newPassword: string) =>
      this.client.post(`/admin/users/${userId}/reset-password`, { newPassword }),
    
    toggleUserStatus: (userId: string, isActive: boolean) =>
      this.client.post(`/admin/users/${userId}/toggle-status`, { is_active: isActive }),
    
    createUser: (data: { email: string; username: string; password: string }) =>
      this.client.post('/admin/users/create', data)
  };
}

export const api = new ApiClient();
export default api;
