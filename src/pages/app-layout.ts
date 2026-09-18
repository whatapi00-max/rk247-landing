import { A } from '../assets';
import { authService } from '../services/auth';

const NAV_LINKS = [
  { href: '/wallet', label: 'Wallet' },
  { href: '/profile', label: 'My Profile' },
  { href: '/account-statement', label: 'Statement' },
  { href: '/withdrawal', label: 'Withdraw' },
  { href: '/', label: 'Home' },
];

export function AppNav(active: string): string {
  const desktopLinks = NAV_LINKS
    .map(
      (l) => `
      <a href="${l.href}" class="px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg transition text-xs lg:text-sm whitespace-nowrap ${
        l.href === active ? 'text-white bg-white/[0.08]' : 'text-white/60 hover:text-white hover:bg-white/[0.04]'
      }">${l.label}</a>`
    )
    .join('');

  const mobileLinks = NAV_LINKS
    .map(
      (l) => `
      <a href="${l.href}" class="block px-3 py-2.5 rounded-lg text-sm ${
        l.href === active ? 'text-white bg-white/[0.08] font-semibold' : 'text-white/70 hover:text-white hover:bg-white/5'
      }">${l.label}</a>`
    )
    .join('');

  return `
    <nav class="bg-black/30 backdrop-blur-lg border-b border-white/10 sticky top-0 z-40">
      <div class="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
        <div class="flex justify-between items-center h-12 sm:h-14 lg:h-16">
          <a href="/" class="flex items-center shrink-0 font-extrabold tracking-tight">
            <img src="${A.logo}" alt="RK247" class="h-6 sm:h-8 lg:h-10 w-auto" />
          </a>
          <div class="hidden md:flex items-center gap-1 lg:gap-2">
            ${desktopLinks}
            <span id="userEmail" class="text-white/40 text-[10px] lg:text-xs truncate max-w-[140px] ml-2"></span>
            <button class="js-app-logout px-2 sm:px-3 lg:px-4 py-1.5 sm:py-2 bg-white/[0.04] border border-white/10 hover:bg-white/[0.08] text-white rounded-lg transition text-[10px] lg:text-sm whitespace-nowrap">
              Logout
            </button>
          </div>
          <button id="appMenuBtn" class="md:hidden inline-flex h-9 w-9 items-center justify-center rounded-lg bg-white/[0.06] border border-white/10 text-white" aria-label="Open menu">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </button>
        </div>
      </div>
      <div id="appMenu" class="hidden md:hidden border-t border-white/10 bg-black/95 backdrop-blur-lg">
        <div class="px-4 py-3 space-y-1">
          ${mobileLinks}
          <div class="border-t border-white/10 my-2"></div>
          <button class="js-app-logout block w-full text-left px-3 py-2.5 rounded-lg text-sm text-red-400 hover:bg-white/5">
            Logout
          </button>
        </div>
      </div>
    </nav>
  `;
}

export function AppFooter(): string {
  return `
    <footer class="border-t border-white/10 mt-10 sm:mt-14">
      <div class="max-w-7xl mx-auto px-4 py-6 flex flex-col sm:flex-row items-center justify-between gap-3">
        <p class="text-white/40 text-[10px] sm:text-xs">© ${new Date().getFullYear()} RK247. All rights reserved.</p>
        <div class="flex items-center gap-4 text-[10px] sm:text-xs text-white/50">
          <a href="/help/faq" class="hover:text-white transition">FAQ</a>
          <a href="/help/support" class="hover:text-white transition">Support</a>
          <a href="/legal" class="hover:text-white transition">Legal</a>
        </div>
      </div>
    </footer>
  `;
}

export function initAppNav(): void {
  const menuBtn = document.getElementById('appMenuBtn');
  const menu = document.getElementById('appMenu');

  menuBtn?.addEventListener('click', (e) => {
    e.stopPropagation();
    menu?.classList.toggle('hidden');
  });

  document.addEventListener('click', (e) => {
    if (menu && !menu.classList.contains('hidden') && !menu.contains(e.target as Node) && e.target !== menuBtn) {
      menu.classList.add('hidden');
    }
  });

  document.querySelectorAll('.js-app-logout').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      authService.logout();
    });
  });

  const state = authService.getState();
  const emailEl = document.getElementById('userEmail');
  if (emailEl && state.user) {
    emailEl.textContent = state.user.email;
  }
}
