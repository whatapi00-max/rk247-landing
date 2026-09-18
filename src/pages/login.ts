import { api } from '../services/api';
import { authService } from '../services/auth';

export function renderLoginPage(): string {
  return `
    <div class="min-h-screen bg-black flex items-center justify-center px-4 sm:px-6">
      <div class="max-w-md w-full">
        <div class="bg-white/[0.04] backdrop-blur-lg rounded-2xl p-6 sm:p-8 border border-white/10 shadow-card">
          <div class="text-center mb-6 sm:mb-8">
            <h1 class="text-2xl sm:text-3xl font-bold text-white mb-2">Welcome Back</h1>
            <p class="text-white/60 text-sm sm:text-base">Sign in to your RK247 account</p>
          </div>

          <form id="loginForm" class="space-y-4 sm:space-y-6">
            <div>
              <label class="block text-sm font-medium text-white/80 mb-2">Email or Phone Number</label>
              <input
                type="text"
                id="identifier"
                required
                class="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-white/[0.04] border border-white/10 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-white/20 text-sm sm:text-base"
                placeholder="your@email.com or 0300 1234567"
              />
            </div>

            <div>
              <div class="flex items-center justify-between mb-2">
                <label class="block text-sm font-medium text-white/80">Password</label>
                <button
                  type="button"
                  id="forgotPasswordBtn"
                  class="text-xs text-white/60 hover:text-white transition"
                >
                  Forgot Password?
                </button>
              </div>
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
              Sign In
            </button>
          </form>

          <div class="mt-4 sm:mt-6 text-center">
            <p class="text-white/60 text-xs sm:text-sm">
              Don't have an account? 
              <a href="/register" class="text-white hover:text-white/80 font-medium">Sign up</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  `;
}

export function initLoginPage(): void {
  const form = document.getElementById('loginForm') as HTMLFormElement;
  const errorDiv = document.getElementById('errorMessage') as HTMLDivElement;
  const loginButton = document.getElementById('loginButton') as HTMLButtonElement;
  const forgotPasswordBtn = document.getElementById('forgotPasswordBtn') as HTMLButtonElement;

  if (!form) return;

  // Forgot password - opens WhatsApp
  forgotPasswordBtn?.addEventListener('click', () => {
    const identifierInput = document.getElementById('identifier') as HTMLInputElement;
    const userIdentifier = identifierInput.value || 'your-email@example.com';
    const message = `Hello RK247 Support,\n\nI would like to reset my password for my account.\n\nAccount: ${userIdentifier}\n\nPlease reset my password.\n\nThank you!`;
    const whatsappNumber = '923001234567'; // Replace with your actual WhatsApp support number
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    
    window.open(whatsappUrl, '_blank');
  });

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const identifier = (document.getElementById('identifier') as HTMLInputElement).value.trim();
    const password = (document.getElementById('password') as HTMLInputElement).value;

    errorDiv.classList.add('hidden');
    loginButton.disabled = true;
    loginButton.textContent = 'Signing in...';

    try {
      const response = await api.auth.login({ identifier, password });
      const { user, token } = response.data.data;
      
      authService.setAuth(token, user);
      window.location.href = '/';
    } catch (error: any) {
      if (error.response?.data?.code === 'ADMIN_USE_ADMIN_LOGIN') {
        errorDiv.innerHTML = `Admin accounts must sign in from the <a href="/admin/login" class="underline font-medium hover:text-white">Admin Panel</a>.`;
      } else {
        errorDiv.textContent = error.response?.data?.error || 'Login failed. Please try again.';
      }
      errorDiv.classList.remove('hidden');
      loginButton.disabled = false;
      loginButton.textContent = 'Sign In';
    }
  });
}
