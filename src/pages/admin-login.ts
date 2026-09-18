import { api } from '../services/api';
import { authService } from '../services/auth';

export function renderAdminLoginPage(): string {
  return `
    <div class="min-h-screen bg-black flex items-center justify-center px-4 sm:px-6">
      <div class="max-w-md w-full">
        <div class="bg-white/[0.04] backdrop-blur-lg rounded-2xl p-6 sm:p-8 border border-white/10 shadow-card">
          <div class="text-center mb-6 sm:mb-8">
            <h1 class="text-2xl sm:text-3xl font-bold text-white mb-2">Admin Login</h1>
            <p class="text-white/60 text-sm sm:text-base">Sign in to RK247 Admin Panel</p>
          </div>

          <form id="adminLoginForm" class="space-y-4 sm:space-y-6">
            <div>
              <label class="block text-sm font-medium text-white/80 mb-2">Admin Email</label>
              <input
                type="email"
                id="email"
                required
                class="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-white/[0.04] border border-white/10 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-white/20 text-sm sm:text-base"
                placeholder="admin@rk247.com"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-white/80 mb-2">Password</label>
              <input
                type="password"
                id="password"
                required
                class="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-white/[0.04] border border-white/10 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-white/20 text-sm sm:text-base"
                placeholder="••••••••"
              />
            </div>

            <div id="errorMessage" class="hidden bg-red-500/10 border border-red-500/20 text-red-300 px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg text-xs sm:text-sm"></div>

            <button
              type="submit"
              id="loginButton"
              class="w-full bg-white/[0.04] border border-white/10 hover:bg-white/[0.08] text-white font-semibold py-2.5 sm:py-3 rounded-lg transition-all duration-200 text-sm sm:text-base"
            >
              Admin Sign In
            </button>
          </form>

          <div class="mt-4 sm:mt-6 text-center">
            <p class="text-white/60 text-xs sm:text-sm">
              <a href="/login" class="text-white hover:text-white/80 font-medium">User Login</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  `;
}

export function initAdminLoginPage(): void {
  if (authService.getAdminState().isAdmin) {
    window.location.href = '/admin/dashboard';
    return;
  }

  const form = document.getElementById('adminLoginForm') as HTMLFormElement;
  const errorDiv = document.getElementById('errorMessage') as HTMLDivElement;
  const loginButton = document.getElementById('loginButton') as HTMLButtonElement;

  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const email = (document.getElementById('email') as HTMLInputElement).value;
    const password = (document.getElementById('password') as HTMLInputElement).value;

    errorDiv.classList.add('hidden');
    loginButton.disabled = true;
    loginButton.textContent = 'Signing in...';

    try {
      const response = await api.auth.adminLogin({ email, password });
      const { user, token } = response.data.data;
      
      authService.setAdminAuth(token, user);
      window.location.href = '/admin/dashboard';
    } catch (error: any) {
      errorDiv.textContent = error.response?.data?.error || 'Admin login failed. Please try again.';
      errorDiv.classList.remove('hidden');
      loginButton.disabled = false;
      loginButton.textContent = 'Admin Sign In';
    }
  });
}
