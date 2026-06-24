import { icons } from "../icons";
import { A } from "../assets";

type MenuGroup = { label: string; href: string };

const tradingMenu: MenuGroup[] = [
  { label: "Trading", href: "#trading" },
  { label: "Flex", href: "#trading" },
  { label: "Fixed Time", href: "#trading" },
  { label: "Forex", href: "#trading" },
  { label: "Stocks", href: "#trading" },
  { label: "How to trade", href: "#trading" },
  { label: "Account", href: "#trading" },
  { label: "Islamic Account", href: "#trading" },
  { label: "Free demo account", href: "#trading" },
  { label: "Promotions", href: "#trading" },
  { label: "Withdrawals", href: "#payments" },
  { label: "Assets & Trading Conditions", href: "#trading" },
];

const downloadMenu: MenuGroup[] = [
  { label: "Download App", href: "#download" },
  { label: "Desktop", href: "#download" },
  { label: "Android", href: "#download" },
  { label: "Android APK", href: "#download" },
  { label: "Web App", href: "#download" },
];

const aboutMenu: MenuGroup[] = [
  { label: "About", href: "#about" },
  { label: "Contacts", href: "#footer" },
  { label: "Social media", href: "#footer" },
  { label: "Awards", href: "#about" },
  { label: "News", href: "#about" },
  { label: "Reviews", href: "#about" },
];

const helpMenu: MenuGroup[] = [
  { label: "Support", href: "#footer" },
  { label: "FAQ", href: "#footer" },
  { label: "Learning Center", href: "#confident" },
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
      <a href="#top" class="flex items-center font-extrabold tracking-tight">
        <img src="${A.logo}" alt="RK247" class="h-10 w-auto" />
      </a>

      <nav class="hidden items-center gap-1 rounded-full bg-white/[0.04] px-1.5 py-1 ring-1 ring-white/5 lg:flex">
        ${dropdown("Trading", tradingMenu)}
        ${dropdown("Download App", downloadMenu)}
        ${dropdown("About", aboutMenu)}
        ${dropdown("Help", helpMenu)}
      </nav>

      <div class="flex items-center gap-2 sm:gap-3">
        <button class="nav-link hidden sm:inline-flex" aria-label="Language">
          ${icons.globe}<span class="hidden md:inline">EN</span>
        </button>
        <button class="btn-ghost hidden sm:inline-flex">Sign in</button>
        <a href="#cta" class="btn-green">Try for free</a>
        <button id="menu-btn" class="text-white lg:hidden" aria-label="Open menu">${icons.menu}</button>
      </div>
    </div>
  </header>

  <!-- Mobile menu -->
  <div id="mobile-menu" class="fixed inset-0 z-[9999] hidden bg-black lg:hidden overflow-hidden flex flex-col">
    <div class="h-16 flex items-center justify-between border-b border-white/10 px-4 flex-shrink-0">
      <a href="#top" class="flex items-center font-extrabold"><img src="${A.logo}" alt="RK247" class="h-10 w-auto" /></a>
      <button id="menu-close" class="text-white" aria-label="Close menu">${icons.close}</button>
    </div>
    <div class="flex-1 overflow-y-auto">
      <div class="px-4 py-4 flex flex-col gap-1">
        ${[...tradingMenu.slice(0, 6), ...aboutMenu.slice(0, 4), ...helpMenu]
          .map(
            (i) =>
              `<a href="${i.href}" class="mobile-link rounded-xl px-2 py-3 text-lg font-medium text-white/80 hover:text-white">${i.label}</a>`
          )
          .join("")}
      </div>
    </div>
    <div class="h-auto border-t border-white/10 px-4 py-4 flex-shrink-0">
      <div class="flex gap-3">
        <button class="btn-ghost flex-1">Sign in</button>
        <a href="#cta" class="btn-green flex-1">Try for free</a>
      </div>
    </div>
  </div>`;
}
