import api from '../services/api';

export function showForcePasswordChangeModal(): void {
  const modalHTML = `
    <div id="forcePasswordChangeModal" class="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div class="bg-ink-850 rounded-2xl p-6 w-full max-w-md border border-white/10 shadow-2xl">
        <div class="mb-6">
          <h2 class="text-2xl font-bold text-white mb-2">Change Your Password</h2>
          <p class="text-white/60 text-sm">For security reasons, you must change your password before continuing. This password was set by an administrator.</p>
        </div>

        <form id="forcePasswordChangeForm" class="space-y-4">
          <!-- New Password -->
          <div>
            <label class="block text-sm font-medium text-white/80 mb-2">New Password</label>
            <input
              type="password"
              id="newPassword"
              class="w-full bg-white/[0.04] border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-rk-green/50"
              placeholder="Enter new password"
              required
            />
          </div>

          <!-- Confirm Password -->
          <div>
            <label class="block text-sm font-medium text-white/80 mb-2">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              class="w-full bg-white/[0.04] border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-rk-green/50"
              placeholder="Confirm new password"
              required
            />
          </div>

          <!-- Password Strength Indicator -->
          <div id="passwordStrength" class="hidden">
            <div class="flex items-center gap-2 text-xs">
              <div class="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
                <div id="strengthBar" class="h-full transition-all duration-300"></div>
              </div>
              <span id="strengthText" class="text-white/60"></span>
            </div>
            <ul class="mt-2 space-y-1 text-xs text-white/60">
              <li id="req-length" class="flex items-center gap-2">
                <span class="text-white/40">○</span> At least 8 characters
              </li>
              <li id="req-upper" class="flex items-center gap-2">
                <span class="text-white/40">○</span> One uppercase letter
              </li>
              <li id="req-lower" class="flex items-center gap-2">
                <span class="text-white/40">○</span> One lowercase letter
              </li>
              <li id="req-number" class="flex items-center gap-2">
                <span class="text-white/40">○</span> One number
              </li>
              <li id="req-special" class="flex items-center gap-2">
                <span class="text-white/40">○</span> One special character
              </li>
            </ul>
          </div>

          <!-- Password Match Indicator -->
          <div id="passwordMatch" class="hidden text-xs"></div>

          <!-- Error Message -->
          <div id="forcePasswordError" class="hidden bg-red-500/10 border border-red-500/20 rounded-lg p-3 text-red-300 text-sm"></div>

          <!-- Submit Button -->
          <button
            type="submit"
            id="submitPasswordBtn"
            class="w-full bg-rk-green hover:bg-rk-green/90 text-white font-bold py-3 rounded-lg transition-colors"
          >
            Change Password
          </button>
        </form>

        <p class="mt-4 text-xs text-white/40 text-center">You cannot skip this step. Your password must be changed for security.</p>
      </div>
    </div>
  `;

  document.body.insertAdjacentHTML('beforeend', modalHTML);

  const form = document.getElementById('forcePasswordChangeForm') as HTMLFormElement;
  const newPasswordInput = document.getElementById('newPassword') as HTMLInputElement;
  const confirmPasswordInput = document.getElementById('confirmPassword') as HTMLInputElement;
  const errorDiv = document.getElementById('forcePasswordError');
  const submitBtn = document.getElementById('submitPasswordBtn') as HTMLButtonElement;

  // Password strength validation
  newPasswordInput.addEventListener('input', () => {
    const password = newPasswordInput.value;
    const strengthDiv = document.getElementById('passwordStrength');
    const strengthBar = document.getElementById('strengthBar');
    const strengthText = document.getElementById('strengthText');

    if (password.length > 0) {
      strengthDiv?.classList.remove('hidden');

      let strength = 0;
      const checks = {
        length: password.length >= 8,
        upper: /[A-Z]/.test(password),
        lower: /[a-z]/.test(password),
        number: /\d/.test(password),
        special: /[!@#$%^&*(),.?":{}|<>]/.test(password)
      };

      // Update requirement indicators
      Object.entries(checks).forEach(([key, met]) => {
        const el = document.getElementById(`req-${key}`);
        if (el) {
          const span = el.querySelector('span');
          if (span) {
            span.textContent = met ? '✓' : '○';
            span.className = met ? 'text-green-400' : 'text-white/40';
          }
        }
        if (met) strength++;
      });

      // Update strength bar
      const percentage = (strength / 5) * 100;
      if (strengthBar) {
        strengthBar.style.width = `${percentage}%`;
        if (strength <= 2) {
          strengthBar.className = 'h-full transition-all duration-300 bg-red-500';
          if (strengthText) strengthText.textContent = 'Weak';
        } else if (strength <= 4) {
          strengthBar.className = 'h-full transition-all duration-300 bg-yellow-500';
          if (strengthText) strengthText.textContent = 'Medium';
        } else {
          strengthBar.className = 'h-full transition-all duration-300 bg-green-500';
          if (strengthText) strengthText.textContent = 'Strong';
        }
      }
    } else {
      strengthDiv?.classList.add('hidden');
    }

    checkPasswordMatch();
  });

  confirmPasswordInput.addEventListener('input', checkPasswordMatch);

  function checkPasswordMatch() {
    const password = newPasswordInput.value;
    const confirm = confirmPasswordInput.value;
    const matchDiv = document.getElementById('passwordMatch');

    if (confirm.length > 0) {
      matchDiv?.classList.remove('hidden');
      if (password === confirm) {
        matchDiv!.innerHTML = '<span class="text-green-400">✓ Passwords match</span>';
      } else {
        matchDiv!.innerHTML = '<span class="text-red-400">✗ Passwords do not match</span>';
      }
    } else {
      matchDiv?.classList.add('hidden');
    }
  }

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const newPassword = newPasswordInput.value;
    const confirmPassword = confirmPasswordInput.value;

    // Validation
    if (newPassword.length < 8) {
      showError('Password must be at least 8 characters long');
      return;
    }

    if (newPassword !== confirmPassword) {
      showError('Passwords do not match');
      return;
    }

    const hasUpperCase = /[A-Z]/.test(newPassword);
    const hasLowerCase = /[a-z]/.test(newPassword);
    const hasNumber = /\d/.test(newPassword);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(newPassword);

    if (!hasUpperCase || !hasLowerCase || !hasNumber || !hasSpecialChar) {
      showError('Password must contain uppercase, lowercase, number, and special character');
      return;
    }

    try {
      submitBtn.disabled = true;
      submitBtn.textContent = 'Changing Password...';

      await api.auth.changePasswordForced({ newPassword });

      // Update user in localStorage to remove force_password_change flag
      const userStr = localStorage.getItem('rk247_user');
      if (userStr) {
        const user = JSON.parse(userStr);
        user.force_password_change = false;
        localStorage.setItem('rk247_user', JSON.stringify(user));
      }

      // Remove modal
      document.getElementById('forcePasswordChangeModal')?.remove();

      // Show success message
      alert('Password changed successfully! You can now use the platform.');

      // Reload page
      window.location.reload();
    } catch (error: any) {
      showError(error.response?.data?.error || 'Failed to change password');
      submitBtn.disabled = false;
      submitBtn.textContent = 'Change Password';
    }
  });

  function showError(message: string) {
    if (errorDiv) {
      errorDiv.textContent = message;
      errorDiv.classList.remove('hidden');
    }
  }
}
