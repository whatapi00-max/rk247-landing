import { icons } from "../icons";
import { A } from "../assets";

type MenuGroup = { label: string; href: string };

const tradingMenu: MenuGroup[] = [
  { label: "Trading", href: "/trading" },
  { label: "Market Analysis", href: "/market-analysis" },
  { label: "Flex", href: "/trading/flex" },
  { label: "Fixed Time", href: "/trading/fixed-time" },
  { label: "Forex", href: "/trading/forex" },
  { label: "Stocks", href: "/trading/stocks" },
  { label: "How to trade", href: "/trading/how-to-trade" },
  { label: "Account", href: "/trading/account" },
  { label: "Islamic Account", href: "/trading/islamic-account" },
  { label: "Free demo account", href: "/trading/demo" },
  { label: "Promotions", href: "/trading/promotions" },
  { label: "Withdrawals", href: "/trading/withdrawals" },
  { label: "Assets & Trading Conditions", href: "/trading/assets" },
];

const downloadMenu: MenuGroup[] = [
  { label: "Download App", href: "/download" },
  { label: "Desktop", href: "/download/desktop" },
  { label: "Android", href: "/download/android" },
  { label: "Android APK", href: "/download/android-apk" },
];

const aboutMenu: MenuGroup[] = [
  { label: "About", href: "/about" },
  { label: "Contacts", href: "/about/contacts" },
  { label: "Social media", href: "/about/social" },
  { label: "Awards", href: "/about/awards" },
  { label: "News", href: "/about/news" },
  { label: "Reviews", href: "/about/reviews" },
];

const helpMenu: MenuGroup[] = [
  { label: "Support", href: "/help/support" },
  { label: "FAQ", href: "/help/faq" },
  { label: "Learning Center", href: "/help/learning" },
];

const dropdown = (label: string, items: MenuGroup[]) => `
  <div class="dropdown-wrap relative">
    <button class="nav-link">${label} ${icons.chevronDown}</button>
    <div class="dropdown absolute left-0 top-full pt-3">
      <div class="min-w-[220px] rounded-2xl bg-ink-800 p-2 ring-1 ring-white/10 shadow-card">
        ${items
          .map(
            (i) =>
              `<a href="${i.href}" class="block rounded-xl px-4 py-2.5 text-sm text-white/75 transition-colors hover:bg-white/5 hover:text-white">${i.label}</a>`
          )
          .join("")}
      </div>
    </div>
  </div>`;

export function Header(): string {
  return `
  <header id="header" class="fixed inset-x-0 top-0 z-50 border-b border-transparent transition-colors duration-300">
    <div class="container-rk flex h-16 items-center justify-between gap-4">
      <a href="/" class="flex items-center font-extrabold tracking-tight">
        <img src="${A.logo}" alt="RK247" class="h-10 w-auto" />
      </a>

      <nav class="hidden items-center gap-1 rounded-full bg-white/[0.04] px-1.5 py-1 ring-1 ring-white/5 lg:flex">
        ${dropdown("Trading", tradingMenu)}
        ${dropdown("Download App", downloadMenu)}
        ${dropdown("About", aboutMenu)}
        ${dropdown("Help", helpMenu)}
      </nav>

      <div class="flex items-center gap-2 sm:gap-3">
        <!-- Wallet Button (shown when logged in) -->
        <div id="wallet-dropdown" class="hidden relative">
          <button id="wallet-btn" class="flex items-center gap-1.5 sm:gap-2 bg-white/[0.04] border border-white/10 rounded-full px-2.5 py-1.5 sm:px-4 sm:py-2 hover:bg-white/[0.08] transition-colors text-sm sm:text-base">
            <span class="text-white/60 font-medium text-xs sm:text-sm">PKR</span>
            <span id="header-balance" class="text-white font-semibold text-xs sm:text-sm">0.00</span>
            <span class="text-white/40 text-xs">${icons.chevronDown}</span>
          </button>
          <div id="wallet-menu" class="absolute right-0 top-full mt-2 hidden min-w-[180px] sm:min-w-[200px] rounded-xl bg-ink-800 border border-white/10 p-2 shadow-card">
            <button id="depositBtn" class="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-white/75 hover:bg-white/5 hover:text-white transition-colors w-full text-left">
              <svg class="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
              </svg>
              <span>Deposit</span>
            </button>
            <button id="withdrawBtn" class="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-white/75 hover:bg-white/5 hover:text-white transition-colors w-full text-left">
              <svg class="w-4 h-4 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18"></path>
              </svg>
              <span>Withdraw</span>
            </button>
            <div class="border-t border-white/10 my-1"></div>
            <a href="/profile" class="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-white/75 hover:bg-white/5 hover:text-white transition-colors">
              <svg class="w-4 h-4 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
              </svg>
              <span>My Profile</span>
            </a>
            <a href="/account-statement" class="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-white/75 hover:bg-white/5 hover:text-white transition-colors">
              <svg class="w-4 h-4 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
              </svg>
              <span>Account Statement</span>
            </a>
          </div>
        </div>

        <!-- Auth Buttons (shown when logged out) -->
        <div id="auth-buttons">
          <a href="/login" class="btn-ghost hidden lg:inline-flex" aria-label="Sign in">Sign in</a>
          <a href="/register" class="btn-green hidden lg:inline-flex">Try for free</a>
        </div>

        <!-- Logout Button (shown when logged in) -->
        <button id="desktopLogoutBtn" class="hidden lg:inline-flex btn-ghost" aria-label="Logout">Logout</button>

        <button id="menu-btn" class="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white lg:hidden hover:bg-white/20" aria-label="Open menu">${icons.menu}</button>
      </div>
    </div>
  </header>

  <!-- Mobile menu -->
  <div id="mobile-menu" class="fixed inset-0 z-[9999] hidden bg-black lg:hidden overflow-hidden flex flex-col">
    <div class="h-16 flex items-center justify-between border-b border-white/10 px-4 flex-shrink-0">
      <a href="/" class="flex items-center font-extrabold"><img src="${A.logo}" alt="RK247" class="h-10 w-auto" /></a>
      <button id="menu-close" onclick="closeMobileMenu()" class="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20" aria-label="Close menu">
        <svg onclick="closeMobileMenu()" viewBox="0 0 24 24" class="h-6 w-6" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 6l12 12M18 6 6 18" stroke-linecap="round"></path></svg>
      </button>
    </div>
    <div class="flex-1 overflow-y-auto">
      <div class="px-4 py-4 flex flex-col gap-1">
        ${[...tradingMenu.slice(0, 6), ...aboutMenu.slice(0, 4), ...helpMenu]
          .map(
            (i) =>
              `<a href="${i.href}" onclick="document.getElementById('mobile-menu').style.display='none'; document.body.style.overflow=''" class="mobile-link rounded-xl px-2 py-3 text-lg font-medium text-white/80 hover:text-white">${i.label}</a>`
          )
          .join("")}
      </div>
    </div>
    <div class="h-auto border-t border-white/10 px-4 py-4 flex-shrink-0">
      <div id="mobile-auth-buttons" class="flex gap-3">
        <a href="/login" class="btn-ghost flex-1">Sign in</a>
        <a href="/register" class="btn-green flex-1">Try for free</a>
      </div>
      <div id="mobile-logout-button" class="hidden">
        <button id="mobileLogoutBtn" class="w-full bg-white/[0.04] border border-white/10 hover:bg-white/[0.08] text-white font-semibold py-3 rounded-lg transition">
          Logout
        </button>
      </div>
    </div>
  </div>`;
}
