export interface User {
  id: string;
  email: string;
  username: string;
  phone?: string;
  full_name?: string;
  role: 'user' | 'admin';
  force_password_change?: boolean;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
}

// User and admin sessions are stored under separate keys so one browser
// can keep a user logged in on the main site in one tab while an admin
// stays logged in on /admin/* in another tab.
const USER_TOKEN_KEY = 'rk247_token';
const USER_DATA_KEY = 'rk247_user';
const ADMIN_TOKEN_KEY = 'rk247_admin_token';
const ADMIN_DATA_KEY = 'rk247_admin_user';

function isAdminContext(): boolean {
  return window.location.pathname.startsWith('/admin');
}

class AuthService {
  private listeners: Array<(state: AuthState) => void> = [];

  getState(): AuthState {
    const admin = isAdminContext();
    const token = localStorage.getItem(admin ? ADMIN_TOKEN_KEY : USER_TOKEN_KEY);
    const userStr = localStorage.getItem(admin ? ADMIN_DATA_KEY : USER_DATA_KEY);
    const user = userStr ? JSON.parse(userStr) : null;

    return {
      user,
      token,
      isAuthenticated: !!token && !!user,
      isAdmin: user?.role === 'admin'
    };
  }

  getAdminState(): AuthState {
    const token = localStorage.getItem(ADMIN_TOKEN_KEY);
    const userStr = localStorage.getItem(ADMIN_DATA_KEY);
    const user = userStr ? JSON.parse(userStr) : null;

    return {
      user,
      token,
      isAuthenticated: !!token && !!user,
      isAdmin: user?.role === 'admin'
    };
  }

  setAuth(token: string, user: User): void {
    localStorage.setItem(USER_TOKEN_KEY, token);
    localStorage.setItem(USER_DATA_KEY, JSON.stringify(user));
    this.notifyListeners();
  }

  setAdminAuth(token: string, user: User): void {
    localStorage.setItem(ADMIN_TOKEN_KEY, token);
    localStorage.setItem(ADMIN_DATA_KEY, JSON.stringify(user));
    this.notifyListeners();
  }

  logout(): void {
    if (isAdminContext()) {
      localStorage.removeItem(ADMIN_TOKEN_KEY);
      localStorage.removeItem(ADMIN_DATA_KEY);
      this.notifyListeners();
      window.location.href = '/admin/login';
      return;
    }
    localStorage.removeItem(USER_TOKEN_KEY);
    localStorage.removeItem(USER_DATA_KEY);
    this.notifyListeners();
    window.location.href = '/';
  }

  subscribe(listener: (state: AuthState) => void): () => void {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  private notifyListeners(): void {
    const state = this.getState();
    this.listeners.forEach(listener => listener(state));
  }

  requireAuth(): boolean {
    const state = this.getState();
    if (!state.isAuthenticated) {
      window.location.href = '/login';
      return false;
    }
    // Admin accounts are confined to the admin panel — never allow them
    // onto user-side pages (wallet, profile, withdrawal, statement, ...)
    if (state.isAdmin) {
      window.location.href = '/admin/dashboard';
      return false;
    }
    return true;
  }

  requireAdmin(): boolean {
    const state = this.getAdminState();
    if (!state.isAuthenticated || !state.isAdmin) {
      window.location.href = '/admin/login';
      return false;
    }
    return true;
  }
}

export const authService = new AuthService();
export default authService;
