import api from '../services/api';
import { authService } from '../services/auth';
import { AppNav, AppFooter, initAppNav } from './app-layout';

export function renderProfilePage(): string {
  return `
    <div class="min-h-screen bg-black text-white">
      ${AppNav('/profile')}

      <div class="max-w-6xl mx-auto px-3 sm:px-4 lg:px-8 py-4 sm:py-6 lg:py-8">
        <div class="mb-6 sm:mb-8">
          <h1 class="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-2">My Profile</h1>
          <p class="text-white/60 text-sm sm:text-base">View and manage your account details</p>
        </div>

        <!-- Profile header card -->
        <div class="bg-white/[0.04] border border-white/10 rounded-2xl p-4 sm:p-6 lg:p-8 mb-6 sm:mb-8">
          <div class="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6">
            <div id="avatarCircle" class="flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-rk-green/20 border border-rk-green/30 text-rk-green text-2xl sm:text-3xl font-extrabold shrink-0">
              ?
            </div>
            <div class="flex-1 text-center sm:text-left">
              <h2 id="profileName" class="text-xl sm:text-2xl font-bold text-white">—</h2>
              <p id="profileEmail" class="text-white/60 text-sm mt-1">—</p>
              <div class="flex flex-wrap items-center justify-center sm:justify-start gap-2 mt-3">
                <span id="profileStatus" class="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-white/10 text-white/80">Active</span>
                <span id="profileRole" class="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-white/10 text-white/80">User</span>
                <span id="profileSince" class="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-white/10 text-white/60"></span>
              </div>
            </div>
            <div class="grid grid-cols-3 gap-3 sm:gap-4 w-full sm:w-auto">
              <div class="bg-white/[0.04] border border-white/10 rounded-xl p-3 text-center min-w-[90px]">
                <p class="text-white/40 text-[10px] sm:text-xs mb-1">Balance</p>
                <p id="statBalance" class="text-white font-bold text-xs sm:text-sm">—</p>
              </div>
              <div class="bg-white/[0.04] border border-white/10 rounded-xl p-3 text-center min-w-[90px]">
                <p class="text-white/40 text-[10px] sm:text-xs mb-1">Deposits</p>
                <p id="statDeposits" class="text-white font-bold text-xs sm:text-sm">—</p>
              </div>
              <div class="bg-white/[0.04] border border-white/10 rounded-xl p-3 text-center min-w-[90px]">
                <p class="text-white/40 text-[10px] sm:text-xs mb-1">Withdrawals</p>
                <p id="statWithdrawals" class="text-white font-bold text-xs sm:text-sm">—</p>
              </div>
            </div>
          </div>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
          <!-- Personal information form -->
          <div class="lg:col-span-2">
            <div class="bg-white/[0.04] border border-white/10 rounded-2xl p-4 sm:p-6 lg:p-8">
              <h2 class="text-xl sm:text-2xl font-bold text-white/80 mb-4 sm:mb-6">Personal Information</h2>
              <form id="profileForm" class="space-y-4 sm:space-y-5">
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                  <div>
                    <label class="block text-xs sm:text-sm font-semibold text-white/80 mb-1.5 sm:mb-2">Username</label>
                    <input type="text" id="username" disabled class="w-full bg-white/[0.02] border border-white/10 rounded-lg px-3 sm:px-4 py-2 sm:py-3 text-white/50 text-xs sm:text-sm cursor-not-allowed" />
                    <p class="text-[10px] sm:text-xs text-white/40 mt-1">Username can't be changed after registration</p>
                  </div>
                  <div>
                    <label class="block text-xs sm:text-sm font-semibold text-white/80 mb-1.5 sm:mb-2">Full Name</label>
                    <input type="text" id="fullName" class="w-full bg-white/[0.04] border border-white/10 rounded-lg px-3 sm:px-4 py-2 sm:py-3 text-white placeholder-white/40 text-xs sm:text-sm focus:outline-none focus:border-white/20" placeholder="Your full name" />
                  </div>
                  <div>
                    <label class="block text-xs sm:text-sm font-semibold text-white/80 mb-1.5 sm:mb-2">Email</label>
                    <input type="email" id="email" disabled class="w-full bg-white/[0.02] border border-white/10 rounded-lg px-3 sm:px-4 py-2 sm:py-3 text-white/50 text-xs sm:text-sm cursor-not-allowed" />
                  </div>
                  <div>
                    <label class="block text-xs sm:text-sm font-semibold text-white/80 mb-1.5 sm:mb-2">Phone Number</label>
                    <input type="tel" id="phone" class="w-full bg-white/[0.04] border border-white/10 rounded-lg px-3 sm:px-4 py-2 sm:py-3 text-white placeholder-white/40 text-xs sm:text-sm focus:outline-none focus:border-white/20" placeholder="e.g. +92 300 1234567" />
                  </div>
                  <div>
                    <label class="block text-xs sm:text-sm font-semibold text-white/80 mb-1.5 sm:mb-2">Country</label>
                    <input type="text" id="country" class="w-full bg-white/[0.04] border border-white/10 rounded-lg px-3 sm:px-4 py-2 sm:py-3 text-white placeholder-white/40 text-xs sm:text-sm focus:outline-none focus:border-white/20" placeholder="Your country" />
                  </div>
                  <div>
                    <label class="block text-xs sm:text-sm font-semibold text-white/80 mb-1.5 sm:mb-2">City</label>
                    <input type="text" id="city" class="w-full bg-white/[0.04] border border-white/10 rounded-lg px-3 sm:px-4 py-2 sm:py-3 text-white placeholder-white/40 text-xs sm:text-sm focus:outline-none focus:border-white/20" placeholder="Your city" />
                  </div>
                </div>
                <div id="profileError" class="hidden bg-red-500/10 border border-red-500/20 text-red-300 px-3 sm:px-4 py-2 sm:py-3 rounded-lg text-xs sm:text-sm"></div>
                <div id="profileSuccess" class="hidden bg-rk-green/10 border border-rk-green/20 text-rk-green px-3 sm:px-4 py-2 sm:py-3 rounded-lg text-xs sm:text-sm"></div>
                <button type="submit" id="saveProfileBtn" class="w-full sm:w-auto px-6 sm:px-8 py-2.5 sm:py-3 bg-white/[0.04] border border-white/10 hover:bg-white/[0.08] text-white font-semibold rounded-lg transition text-xs sm:text-sm">
                  Save Changes
                </button>
              </form>
            </div>
          </div>

          <!-- Sidebar: account details + security -->
          <div class="space-y-6 sm:space-y-8">
            <div class="bg-white/[0.04] border border-white/10 rounded-2xl p-4 sm:p-6">
              <h2 class="text-lg sm:text-xl font-bold text-white/80 mb-4">Account Details</h2>
              <div class="space-y-3">
                <div>
                  <p class="text-white/40 text-[10px] sm:text-xs mb-1">Account ID</p>
                  <div class="flex items-center gap-2">
                    <p id="accountId" class="text-white font-mono text-xs sm:text-sm truncate flex-1">—</p>
                    <button id="copyAccountId" class="px-2.5 py-1 bg-white/[0.04] border border-white/10 hover:bg-white/[0.08] text-white/80 rounded text-[10px] sm:text-xs transition shrink-0">Copy</button>
                  </div>
                </div>
                <div class="border-t border-white/5 pt-3">
                  <p class="text-white/40 text-[10px] sm:text-xs mb-1">Member Since</p>
                  <p id="memberSince" class="text-white text-xs sm:text-sm">—</p>
                </div>
              </div>
              <div class="border-t border-white/5 mt-4 pt-4 space-y-2">
                <a href="/account-statement" class="block w-full text-center px-3 py-2 bg-white/[0.04] border border-white/10 hover:bg-white/[0.08] text-white rounded-lg transition text-xs sm:text-sm">Account Statement</a>
                <a href="/withdrawal" class="block w-full text-center px-3 py-2 bg-white/[0.04] border border-white/10 hover:bg-white/[0.08] text-white rounded-lg transition text-xs sm:text-sm">Withdraw Funds</a>
              </div>
            </div>

            <div class="bg-white/[0.04] border border-white/10 rounded-2xl p-4 sm:p-6">
              <h2 class="text-lg sm:text-xl font-bold text-white/80 mb-4">Security</h2>
              <form id="passwordForm" class="space-y-3 sm:space-y-4">
                <div>
                  <label class="block text-xs sm:text-sm font-semibold text-white/80 mb-1.5 sm:mb-2">Current Password</label>
                  <input type="password" id="currentPassword" required class="w-full bg-white/[0.04] border border-white/10 rounded-lg px-3 sm:px-4 py-2 sm:py-3 text-white placeholder-white/40 text-xs sm:text-sm focus:outline-none focus:border-white/20" placeholder="Current password" />
                </div>
                <div>
                  <label class="block text-xs sm:text-sm font-semibold text-white/80 mb-1.5 sm:mb-2">New Password</label>
                  <input type="password" id="newPassword" required class="w-full bg-white/[0.04] border border-white/10 rounded-lg px-3 sm:px-4 py-2 sm:py-3 text-white placeholder-white/40 text-xs sm:text-sm focus:outline-none focus:border-white/20" placeholder="New password" />
                  <p class="text-[10px] sm:text-xs text-white/40 mt-1">Min 8 chars, with uppercase, lowercase, number &amp; special character</p>
                </div>
                <div>
                  <label class="block text-xs sm:text-sm font-semibold text-white/80 mb-1.5 sm:mb-2">Confirm New Password</label>
                  <input type="password" id="confirmPassword" required class="w-full bg-white/[0.04] border border-white/10 rounded-lg px-3 sm:px-4 py-2 sm:py-3 text-white placeholder-white/40 text-xs sm:text-sm focus:outline-none focus:border-white/20" placeholder="Confirm new password" />
                </div>
                <div id="passwordError" class="hidden bg-red-500/10 border border-red-500/20 text-red-300 px-3 sm:px-4 py-2 sm:py-3 rounded-lg text-xs sm:text-sm"></div>
                <div id="passwordSuccess" class="hidden bg-rk-green/10 border border-rk-green/20 text-rk-green px-3 sm:px-4 py-2 sm:py-3 rounded-lg text-xs sm:text-sm"></div>
                <button type="submit" id="changePasswordBtn" class="w-full px-4 py-2.5 sm:py-3 bg-white/[0.04] border border-white/10 hover:bg-white/[0.08] text-white font-semibold rounded-lg transition text-xs sm:text-sm">
                  Change Password
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      ${AppFooter()}
    </div>
  `;
}

export function initProfilePage(): void {
  if (!authService.requireAuth()) return;

  initAppNav();

  document.getElementById('copyAccountId')?.addEventListener('click', async () => {
    const id = document.getElementById('accountId')?.textContent;
    if (id && id !== '—') {
      try {
        await navigator.clipboard.writeText(id);
        const btn = document.getElementById('copyAccountId');
        if (btn) {
          btn.textContent = 'Copied';
          setTimeout(() => { btn.textContent = 'Copy'; }, 1500);
        }
      } catch {
        // clipboard unavailable
      }
    }
  });

  document.getElementById('profileForm')?.addEventListener('submit', handleProfileSave);
  document.getElementById('passwordForm')?.addEventListener('submit', handlePasswordChange);

  loadProfile();
}

async function loadProfile(): Promise<void> {
  try {
    const response = await api.user.getProfile();
    const { user, wallet, stats } = response.data.data;

    setText('profileName', user.full_name || user.username);
    setText('profileEmail', user.email);
    setText('accountId', user.id);

    const initials = (user.full_name || user.username || 'U')
      .split(' ')
      .map((w: string) => w[0])
      .join('')
      .slice(0, 2)
      .toUpperCase();
    setText('avatarCircle', initials);

    const roleEl = document.getElementById('profileRole');
    if (roleEl) roleEl.textContent = user.role === 'admin' ? 'Admin' : 'User';

    const since = new Date(user.created_at);
    setText('profileSince', `Joined ${since.toLocaleDateString('en-PK', { year: 'numeric', month: 'short', day: 'numeric' })}`);
    setText('memberSince', since.toLocaleDateString('en-PK', { year: 'numeric', month: 'long', day: 'numeric' }));

    const fmt = (n: number) => `PKR ${n.toLocaleString('en-PK', { maximumFractionDigits: 0 })}`;
    setText('statBalance', fmt(wallet?.balance ?? 0));
    setText('statDeposits', fmt(stats?.total_deposits ?? 0));
    setText('statWithdrawals', fmt(stats?.total_withdrawals ?? 0));

    setValue('username', user.username);
    setValue('fullName', user.full_name);
    setValue('email', user.email);
    setValue('phone', user.phone);
    setValue('country', user.country);
    setValue('city', user.city);
  } catch (error) {
    console.error('Failed to load profile:', error);
    showMessage('profileError', 'Failed to load profile. Please refresh the page.');
  }
}

async function handleProfileSave(e: Event): Promise<void> {
  e.preventDefault();

  const btn = document.getElementById('saveProfileBtn') as HTMLButtonElement;
  hideMessage('profileError');
  hideMessage('profileSuccess');

  const payload = {
    full_name: getValue('fullName'),
    phone: getValue('phone'),
    country: getValue('country'),
    city: getValue('city')
  };

  btn.disabled = true;
  btn.textContent = 'Saving...';

  try {
    const response = await api.user.updateProfile(payload);
    const user = response.data.data;

    const state = authService.getState();
    if (state.user) {
      authService.setAuth(state.token!, { ...state.user, full_name: user.full_name });
    }

    setText('profileName', user.full_name || user.username);
    showMessage('profileSuccess', 'Profile updated successfully');
    loadProfile();
  } catch (error: any) {
    showMessage('profileError', error.response?.data?.error || 'Failed to update profile');
  } finally {
    btn.disabled = false;
    btn.textContent = 'Save Changes';
  }
}

async function handlePasswordChange(e: Event): Promise<void> {
  e.preventDefault();

  const btn = document.getElementById('changePasswordBtn') as HTMLButtonElement;
  hideMessage('passwordError');
  hideMessage('passwordSuccess');

  const current = getValue('currentPassword');
  const next = getValue('newPassword');
  const confirm = getValue('confirmPassword');

  if (next !== confirm) {
    showMessage('passwordError', 'New passwords do not match');
    return;
  }

  btn.disabled = true;
  btn.textContent = 'Changing...';

  try {
    await api.user.changePassword({ current_password: current, new_password: next });
    showMessage('passwordSuccess', 'Password changed successfully');
    (document.getElementById('passwordForm') as HTMLFormElement).reset();
  } catch (error: any) {
    showMessage('passwordError', error.response?.data?.error || 'Failed to change password');
  } finally {
    btn.disabled = false;
    btn.textContent = 'Change Password';
  }
}

function setText(id: string, text: string): void {
  const el = document.getElementById(id);
  if (el) el.textContent = text;
}

function setValue(id: string, value: string | null | undefined): void {
  const el = document.getElementById(id) as HTMLInputElement;
  if (el) el.value = value || '';
}

function getValue(id: string): string {
  const el = document.getElementById(id) as HTMLInputElement;
  return el?.value.trim() || '';
}

function showMessage(id: string, text: string): void {
  const el = document.getElementById(id);
  if (el) {
    el.textContent = text;
    el.classList.remove('hidden');
  }
}

function hideMessage(id: string): void {
  document.getElementById(id)?.classList.add('hidden');
}
