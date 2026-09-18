import { api } from '../services/api';
import { authService } from '../services/auth';

export function renderRegisterPage(): string {
  return `
    <div class="min-h-screen bg-black flex items-center justify-center px-4 sm:px-6">
      <div class="max-w-md w-full">
        <div class="bg-white/[0.04] backdrop-blur-lg rounded-2xl p-6 sm:p-8 border border-white/10 shadow-card">
          <div class="text-center mb-6 sm:mb-8">
            <h1 class="text-2xl sm:text-3xl font-bold text-white mb-2">Create Account</h1>
            <p class="text-white/60 text-sm sm:text-base">Join RK247 trading platform</p>
          </div>

          <form id="registerForm" class="space-y-4 sm:space-y-5">
            <div>
              <label class="block text-sm font-medium text-white/80 mb-2">Username</label>
              <input
                type="text"
                id="username"
                required
                minlength="3"
                maxlength="30"
                class="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-white/[0.04] border border-white/10 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-white/20 text-sm sm:text-base"
                placeholder="johndoe"
              />
              <p class="text-xs text-white/40 mt-1">3-30 characters, letters and numbers only</p>
            </div>

            <div>
              <label class="block text-sm font-medium text-white/80 mb-2">Email Address</label>
              <input
                type="email"
                id="email"
                required
                class="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-white/[0.04] border border-white/10 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-white/20 text-sm sm:text-base"
                placeholder="your@email.com"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-white/80 mb-2">Phone Number</label>
              <input
                type="tel"
                id="phone"
                required
                class="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-white/[0.04] border border-white/10 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-white/20 text-sm sm:text-base"
                placeholder="0300 1234567"
              />
              <p class="text-xs text-white/40 mt-1">You can use this number to sign in</p>
            </div>

            <div>
              <label class="block text-sm font-medium text-white/80 mb-2">Password</label>
              <input
                type="password"
                id="password"
                required
                minlength="8"
                class="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-white/[0.04] border border-white/10 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-white/20 text-sm sm:text-base"
                placeholder="••••••••"
              />
              <div id="passwordStrength" class="mt-2 hidden">
                <div class="flex gap-1 mb-1">
                  <div class="h-1 flex-1 rounded bg-white/10" id="strength-bar-1"></div>
                  <div class="h-1 flex-1 rounded bg-white/10" id="strength-bar-2"></div>
                  <div class="h-1 flex-1 rounded bg-white/10" id="strength-bar-3"></div>
                  <div class="h-1 flex-1 rounded bg-white/10" id="strength-bar-4"></div>
                </div>
                <p id="strengthText" class="text-xs text-white/60"></p>
              </div>
              <p class="text-xs text-white/40 mt-1">Must be at least 8 characters with uppercase, lowercase, number, and special character</p>
            </div>

            <div>
              <label class="block text-sm font-medium text-white/80 mb-2">Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                required
                minlength="8"
                class="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-white/[0.04] border border-white/10 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-white/20 text-sm sm:text-base"
                placeholder="••••••••"
              />
              <p id="passwordMatch" class="text-xs mt-1 hidden"></p>
            </div>

            <div id="errorMessage" class="hidden bg-red-500/10 border border-red-500/20 text-red-300 px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg text-xs sm:text-sm"></div>

            <button
              type="submit"
              id="registerButton"
              class="w-full bg-white/[0.04] border border-white/10 hover:bg-white/[0.08] text-white font-semibold py-2.5 sm:py-3 rounded-lg transition-all duration-200 text-sm sm:text-base"
            >
              Create Account
            </button>
          </form>

          <div class="mt-4 sm:mt-6 text-center">
            <p class="text-white/60 text-xs sm:text-sm">
              Already have an account? 
              <a href="/login" class="text-white hover:text-white/80 font-medium">Sign in</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  `;
}

export function initRegisterPage(): void {
  const form = document.getElementById('registerForm') as HTMLFormElement;
  const errorDiv = document.getElementById('errorMessage') as HTMLDivElement;
  const registerButton = document.getElementById('registerButton') as HTMLButtonElement;
  const passwordInput = document.getElementById('password') as HTMLInputElement;
  const confirmPasswordInput = document.getElementById('confirmPassword') as HTMLInputElement;
  const passwordMatchText = document.getElementById('passwordMatch') as HTMLParagraphElement;
  const strengthDiv = document.getElementById('passwordStrength') as HTMLDivElement;
  const strengthText = document.getElementById('strengthText') as HTMLParagraphElement;

  if (!form) return;

  // Password strength checker
  function checkPasswordStrength(password: string): { score: number; text: string; color: string } {
    let score = 0;
    
    if (password.length >= 8) score++;
    if (password.length >= 12) score++;
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) score++;
    if (/\d/.test(password)) score++;
    if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) score++;

    const levels = [
      { score: 0, text: 'Very Weak', color: '#ef4444' },
      { score: 1, text: 'Weak', color: '#f97316' },
      { score: 2, text: 'Fair', color: '#eab308' },
      { score: 3, text: 'Good', color: '#22c55e' },
      { score: 4, text: 'Strong', color: '#10b981' },
      { score: 5, text: 'Very Strong', color: '#059669' }
    ];

    return levels[Math.min(score, 5)];
  }

  // Update password strength indicator
  passwordInput?.addEventListener('input', () => {
    const password = passwordInput.value;
    
    if (password.length > 0) {
      strengthDiv.classList.remove('hidden');
      const strength = checkPasswordStrength(password);
      
      // Update strength bars
      for (let i = 1; i <= 4; i++) {
        const bar = document.getElementById(`strength-bar-${i}`);
        if (bar) {
          if (i <= strength.score) {
            bar.style.backgroundColor = strength.color;
          } else {
            bar.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
          }
        }
      }
      
      strengthText.textContent = `Password Strength: ${strength.text}`;
      strengthText.style.color = strength.color;
    } else {
      strengthDiv.classList.add('hidden');
    }
    
    checkPasswordMatch();
  });

  // Check if passwords match
  function checkPasswordMatch() {
    const password = passwordInput.value;
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

  confirmPasswordInput?.addEventListener('input', checkPasswordMatch);

  // Validate strong password
  function isStrongPassword(password: string): boolean {
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    const isLongEnough = password.length >= 8;
    
    return hasUpperCase && hasLowerCase && hasNumber && hasSpecialChar && isLongEnough;
  }

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const username = (document.getElementById('username') as HTMLInputElement).value.trim();
    const email = (document.getElementById('email') as HTMLInputElement).value.trim();
    const phone = (document.getElementById('phone') as HTMLInputElement).value.trim();
    const password = passwordInput.value;
    const confirmPassword = confirmPasswordInput.value;

    errorDiv.classList.add('hidden');

    // Validate username
    if (!/^[a-zA-Z0-9_]+$/.test(username)) {
      errorDiv.textContent = 'Username can only contain letters, numbers, and underscores';
      errorDiv.classList.remove('hidden');
      return;
    }

    // Validate phone number
    if (!/^\+?[0-9][0-9\s\-]{8,18}$/.test(phone)) {
      errorDiv.textContent = 'Please enter a valid phone number';
      errorDiv.classList.remove('hidden');
      return;
    }

    // Validate password strength
    if (!isStrongPassword(password)) {
      errorDiv.textContent = 'Password must contain at least 8 characters with uppercase, lowercase, number, and special character';
      errorDiv.classList.remove('hidden');
      return;
    }

    // Check if passwords match
    if (password !== confirmPassword) {
      errorDiv.textContent = 'Passwords do not match';
      errorDiv.classList.remove('hidden');
      return;
    }

    registerButton.disabled = true;
    registerButton.textContent = 'Creating account...';

    try {
      const response = await api.auth.register({ email, password, username, phone });
      const { user, token } = response.data.data;
      
      authService.setAuth(token, user);
      window.location.href = '/';
    } catch (error: any) {
      const errorMsg = error.response?.data?.error || 'Registration failed. Please try again.';
      errorDiv.textContent = errorMsg;
      errorDiv.classList.remove('hidden');
      registerButton.disabled = false;
      registerButton.textContent = 'Create Account';
    }
  });
}
