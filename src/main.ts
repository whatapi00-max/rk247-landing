import "./style.css";
import { Header } from "./sections/header";
import { Hero } from "./sections/hero";
import { Anniversary, Statement } from "./sections/anniversary";
import { Platform } from "./sections/platform";
import { RiskFree } from "./sections/riskfree";
import { TradeWidget, Broker } from "./sections/broker";
import { Confident } from "./sections/confident";
import { Payments, Smooth } from "./sections/payments";
import { Globe, CtaFinal } from "./sections/globe";
import { SeoText, Footer, Overlays } from "./sections/footer";
import { initAnimations } from "./animations";
import { getRoutePath, initRouter } from "./router";
import { PageLayout } from "./pages/layout";
import {
  TradingPage, FlexPage, FixedTimePage, ForexPage, StocksPage,
  HowToTradePage, AccountPage, IslamicAccountPage, DemoPage,
  PromotionsPage, WithdrawalsPage, AssetsPage,
} from "./pages/trading";
import {
  DownloadPage, DesktopPage, AndroidPage, AndroidApkPage,
} from "./pages/download";
import {
  AboutPage, ContactsPage, SocialPage, AwardsPage, NewsPage, ReviewsPage,
} from "./pages/about";
import {
  SupportPage, FaqPage, LearningPage,
} from "./pages/help";
import { MarketAnalysisPage, MarketAnalysisDetailPage, marketReports } from "./pages/market-analysis";
import { CookiePolicyPage, LegalPage, RegulationPage } from "./pages/legal";
import { renderLoginPage, initLoginPage } from "./pages/login";
import { renderRegisterPage, initRegisterPage } from "./pages/register";
import { renderAdminLoginPage, initAdminLoginPage } from "./pages/admin-login";
import { renderWalletPage, initWalletPage } from "./pages/wallet";
import { renderWithdrawalPage, initializeWithdrawalPage } from "./pages/withdrawal";
import { renderAccountStatementPage, initializeAccountStatementPage } from "./pages/account-statement";
import { renderProfilePage, initProfilePage } from "./pages/profile";
import { renderAdminDashboard, initAdminDashboard } from "./pages/admin-dashboard";
import { renderAdminUsersPage, initAdminUsersPage } from "./pages/admin-users";
import { renderAdminTransactionsPage, initAdminTransactionsPage } from "./pages/admin-transactions";
import { renderAdminActionsPage, initAdminActionsPage } from "./pages/admin-actions";
import { renderAdminWithdrawalsPage, initAdminWithdrawalsPage } from "./pages/admin-withdrawals";
import { renderAdminLoginHistoryPage, initAdminLoginHistoryPage } from "./pages/admin-login-history";
import { defaultSeo, routeSeo } from "./seo";
import { showForcePasswordChangeModal } from "./components/ForcePasswordChangeModal";
import { authService } from "./services/auth";

import { ScrollTrigger } from "gsap/ScrollTrigger";

const app = document.querySelector<HTMLDivElement>("#app")!;
const WA_LINK = "https://wa.link/rk247org";
const BASE_URL = "https://www.rk247.org";

/* ─── Update canonical tag based on current route ─── */
function updateSeoMetadata(path: string): void {
  const reportSlug = path.startsWith("/market-analysis/")
    ? path.slice("/market-analysis/".length)
    : "";
  const report = reportSlug ? marketReports.find((item) => item.slug === reportSlug) : undefined;
  const metadata = report
    ? { title: `${report.title} | RK247`, description: report.summary, image: report.image }
    : routeSeo[path] ?? defaultSeo;
  const canonicalUrl = path === "/" ? `${BASE_URL}/` : `${BASE_URL}${path}`;
  const imageUrl = new URL(metadata.image ?? defaultSeo.image!, BASE_URL).href;

  document.title = metadata.title;

  const setMeta = (selector: string, value: string): void => {
    document.querySelector<HTMLMetaElement>(selector)?.setAttribute("content", value);
  };

  document.querySelector<HTMLLinkElement>('link[rel="canonical"]')?.setAttribute("href", canonicalUrl);
  document.querySelectorAll<HTMLLinkElement>('link[rel="alternate"][hreflang]').forEach((link) => {
    link.href = canonicalUrl;
  });
  setMeta('meta[name="description"]', metadata.description);
  setMeta('meta[property="og:url"]', canonicalUrl);
  setMeta('meta[property="og:title"]', metadata.title);
  setMeta('meta[property="og:description"]', metadata.description);
  setMeta('meta[property="og:image"]', imageUrl);
  setMeta('meta[property="og:image:width"]', report ? "1536" : "1200");
  setMeta('meta[property="og:image:height"]', report ? "1024" : "630");
  setMeta('meta[name="twitter:url"]', canonicalUrl);
  setMeta('meta[name="twitter:title"]', metadata.title);
  setMeta('meta[name="twitter:description"]', metadata.description);
  setMeta('meta[name="twitter:image"]', imageUrl);
} 

/* ─── Page registry ─── */
const routes: Record<string, () => string> = {
  "/":                       renderHome,
  "/trading":                () => PageLayout(TradingPage()),
  "/trading/flex":           () => PageLayout(FlexPage()),
  "/trading/fixed-time":     () => PageLayout(FixedTimePage()),
  "/trading/forex":          () => PageLayout(ForexPage()),
  "/trading/stocks":         () => PageLayout(StocksPage()),
  "/trading/how-to-trade":   () => PageLayout(HowToTradePage()),
  "/trading/account":        () => PageLayout(AccountPage()),
  "/trading/islamic-account":() => PageLayout(IslamicAccountPage()),
  "/trading/demo":           () => PageLayout(DemoPage()),
  "/trading/promotions":     () => PageLayout(PromotionsPage()),
  "/trading/withdrawals":    () => PageLayout(WithdrawalsPage()),
  "/trading/assets":         () => PageLayout(AssetsPage()),
  "/download":               () => PageLayout(DownloadPage()),
  "/download/desktop":       () => PageLayout(DesktopPage()),
  "/download/android":       () => PageLayout(AndroidPage()),
  "/download/android-apk":   () => PageLayout(AndroidApkPage()),
  "/about":                  () => PageLayout(AboutPage()),
  "/about/contacts":         () => PageLayout(ContactsPage()),
  "/about/social":           () => PageLayout(SocialPage()),
  "/about/awards":           () => PageLayout(AwardsPage()),
  "/about/news":             () => PageLayout(NewsPage()),
  "/about/reviews":          () => PageLayout(ReviewsPage()),
  "/help/support":           () => PageLayout(SupportPage()),
  "/help/faq":               () => PageLayout(FaqPage()),
  "/help/learning":          () => PageLayout(LearningPage()),
  "/market-analysis":        () => PageLayout(MarketAnalysisPage()),
  "/legal":                  () => PageLayout(LegalPage()),
  "/regulation":             () => PageLayout(RegulationPage()),
  "/cookie-policy":          () => PageLayout(CookiePolicyPage()),
  "/login":                  () => renderLoginPage(),
  "/register":               () => renderRegisterPage(),
  "/admin/login":            () => renderAdminLoginPage(),
  "/wallet":                 () => renderWalletPage(),
  "/withdrawal":             () => renderWithdrawalPage(),
  "/account-statement":     () => renderAccountStatementPage(),
  "/profile":               () => renderProfilePage(),
  "/admin/dashboard":        () => renderAdminDashboard(),
  "/admin/users":            () => renderAdminUsersPage(),
  "/admin/transactions":     () => renderAdminTransactionsPage(),
  "/admin/actions":          () => renderAdminActionsPage(),
  "/admin/withdrawals":      () => renderAdminWithdrawalsPage(),
  "/admin/login-history":    () => renderAdminLoginHistoryPage(),
};

function renderHome(): string {
  return [
    Header(),
    `<main>`,
    Hero(),
    Anniversary(),
    Statement(),
    Platform(),
    RiskFree(),
    TradeWidget(),
    Broker(),
    Confident(),
    Payments(),
    Smooth(),
    Globe(),
    CtaFinal(),
    SeoText(),
    `</main>`,
    Footer(),
    Overlays(),
  ].join("");
}

/* ─── Core render ─── */
function render(path: string): void {
  // Kill existing GSAP ScrollTriggers to avoid stale triggers on re-render
  ScrollTrigger.getAll().forEach((t) => t.kill());

  // Close mobile menu on navigation
  const menu = document.querySelector("#mobile-menu");
  menu?.classList.add("hidden");
  document.body.style.overflow = "";

  // Close bonus popup on navigation
  const bonus = document.querySelector("#bonus") as HTMLElement;
  if (bonus) {
    bonus.style.display = 'none';
  }

  // Update canonical tag for current route
  updateSeoMetadata(path);

  // Dynamic market-analysis detail routes
  if (path.startsWith("/market-analysis/")) {
    const slug = path.slice("/market-analysis/".length);
    app.innerHTML = PageLayout(MarketAnalysisDetailPage(slug));
    attachListeners();
    requestAnimationFrame(() => initAnimations());
    window.scrollTo({ top: 0 });
    return;
  }

  const handler = routes[path] ?? routes["/"];
  app.innerHTML = handler();

  attachListeners();
  
  if (path === "/login") initLoginPage();
  else if (path === "/register") initRegisterPage();
  else if (path === "/admin/login") initAdminLoginPage();
  else if (path === "/wallet") initWalletPage();
  else if (path === "/withdrawal") initializeWithdrawalPage();
  else if (path === "/account-statement") initializeAccountStatementPage();
  else if (path === "/profile") initProfilePage();
  else if (path === "/admin/dashboard") initAdminDashboard();
  else if (path === "/admin/users") initAdminUsersPage();
  else if (path === "/admin/transactions") initAdminTransactionsPage();
  else if (path === "/admin/withdrawals") initAdminWithdrawalsPage();
  else if (path === "/admin/actions") initAdminActionsPage();
  else if (path === "/admin/login-history") initAdminLoginHistoryPage();
  else requestAnimationFrame(() => initAnimations());
  
  // Update auth state after route change
  requestAnimationFrame(() => {
    updateHeaderAuthState();
    
    // Check if user needs to change password (after admin reset)
    const state = authService.getState();
    if (state.isAuthenticated && state.user?.force_password_change && path !== '/login' && path !== '/register' && !path.startsWith('/admin')) {
      showForcePasswordChangeModal();
    }
  });
  
  window.scrollTo({ top: 0 });
}

/* ─── All event listeners (re-attached after every render) ─── */
function attachListeners(): void {
  // Header background on scroll
  const header = document.querySelector("#header");
  const onScroll = () => {
    if (!header) return;
    header.classList.toggle("header-scrolled", window.scrollY > 20);
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  // Mobile menu - using inline onclick handlers in HTML
  const menu = document.querySelector("#mobile-menu") as HTMLElement;
  const menuBtn = document.querySelector("#menu-btn") as HTMLElement;
  
  if (menuBtn) {
    menuBtn.onclick = () => {
      if (menu) {
        menu.classList.remove("hidden");
        menu.style.display = 'flex';
        document.body.style.overflow = "hidden";
      }
    };
  }

  // Cookie banner
  const cookie = document.querySelector("#cookie");
  if (!localStorage.getItem("rk_cookie_ok")) {
    setTimeout(() => cookie?.classList.replace("hidden", "flex"), 1200);
  }
  document.querySelector("#cookie-ok")?.addEventListener("click", () => {
    localStorage.setItem("rk_cookie_ok", "1");
    cookie?.classList.replace("flex", "hidden");
  });

  // Wallet dropdown toggle
  const walletBtn = document.querySelector("#wallet-btn");
  const walletMenu = document.querySelector("#wallet-menu");
  walletBtn?.addEventListener("click", (e) => {
    e.stopPropagation();
    walletMenu?.classList.toggle("hidden");
  });

  // Close wallet dropdown when clicking outside
  document.addEventListener("click", (e) => {
    if (!walletBtn?.contains(e.target as Node) && !walletMenu?.contains(e.target as Node)) {
      walletMenu?.classList.add("hidden");
    }
  });

  // Deposit button click handler
  const depositBtn = document.querySelector("#depositBtn");
  depositBtn?.addEventListener("click", (e) => {
    e.preventDefault();
    walletMenu?.classList.add("hidden");
    showDepositModal();
  });

  // Withdraw button click handler
  const withdrawBtn = document.querySelector("#withdrawBtn");
  withdrawBtn?.addEventListener("click", (e) => {
    e.preventDefault();
    walletMenu?.classList.add("hidden");
    showWithdrawModal();
  });

  // Mobile logout button click handler
  const mobileLogoutBtn = document.querySelector("#mobileLogoutBtn");
  mobileLogoutBtn?.addEventListener("click", (e) => {
    e.preventDefault();
    handleLogout();
  });

  // Desktop logout button click handler
  const desktopLogoutBtn = document.querySelector("#desktopLogoutBtn");
  desktopLogoutBtn?.addEventListener("click", (e) => {
    e.preventDefault();
    handleLogout();
  });

  // Bonus popup - using event delegation
  document.addEventListener('click', (e) => {
    const target = e.target as HTMLElement;
    const bonusCloseBtn = target.closest('#bonus-close');
    const bonusPopup = document.getElementById('bonus');
    
    if (bonusCloseBtn && bonusPopup) {
      bonusPopup.style.display = 'none';
    }
    
    // Close when clicking outside
    if (bonusPopup && target === bonusPopup) {
      bonusPopup.style.display = 'none';
    }
  });

  // Show popup after 15 seconds on desktop only
  const bonus = document.querySelector("#bonus") as HTMLElement;
  if (bonus && !sessionStorage.getItem("rk_bonus_seen") && window.matchMedia("(min-width: 1024px)").matches) {
    setTimeout(() => {
      bonus.style.display = 'flex';
      sessionStorage.setItem("rk_bonus_seen", "1");
    }, 15000);
  }

  // WhatsApp redirect — ONLY for elements with data-wa attribute
  document.querySelectorAll<HTMLElement>("[data-wa]").forEach((el) => {
    el.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      window.open(WA_LINK, "_blank", "noopener,noreferrer");
    });
  });

  // FAQ accordion (only present on FAQ page)
  document.querySelectorAll<HTMLButtonElement>(".faq-toggle").forEach((btn) => {
    btn.addEventListener("click", () => {
      const id = btn.getAttribute("data-faq-id");
      if (!id) return;
      const body = document.getElementById(`faq-${id}`);
      const icon = btn.querySelector(".faq-icon");
      if (!body) return;
      const isOpen = !body.classList.contains("hidden");
      body.classList.toggle("hidden", isOpen);
      if (icon) icon.classList.toggle("rotate-180", !isOpen);
    });
  });

  // TradingView widget (only present on Forex page)
  const widgetContainer = document.querySelector(".tradingview-widget-container__widget");
  if (widgetContainer && !widgetContainer.querySelector("script")) {
    const script = document.createElement("script");
    script.src = "https://s3.tradingview.com/external-embedding/embed-widget-symbol-overview.js";
    script.async = true;
    script.innerHTML = JSON.stringify({
      "symbols": [
        ["FOREXCOM:EURUSD", "EUR/USD"],
        ["FOREXCOM:GBPUSD", "GBP/USD"],
        ["FOREXCOM:USDJPY", "USD/JPY"],
        ["FOREXCOM:AUDUSD", "AUD/USD"],
        ["FOREXCOM:USDCAD", "USD/CAD"]
      ],
      "chartOnly": false,
      "width": "100%",
      "height": "100%",
      "locale": "en",
      "colorTheme": "dark",
      "isTransparent": false,
      "autosize": true,
      "showVolume": false,
      "showMA": false,
      "hideDateRanges": false,
      "hideMarketStatus": false,
      "hideSymbolLogo": false,
      "scalePosition": "right",
      "scaleMode": "normal",
      "fontFamily": "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      "fontSize": 10,
      "noTimeScale": false,
      "valuesTracking": "1",
      "changeMode": "when-it-signals"
    });
    widgetContainer.appendChild(script);
  }

  // TradingView widgets for Assets page
  const forexWidget = document.querySelector(".tv-forex-widget");
  if (forexWidget && !forexWidget.querySelector("script")) {
    const script = document.createElement("script");
    script.src = "https://s3.tradingview.com/external-embedding/embed-widget-forex-cross-rates.js";
    script.async = true;
    script.innerHTML = JSON.stringify({
      "width": "100%",
      "height": "100%",
      "currencies": ["EUR", "USD", "JPY", "GBP", "AUD", "CAD", "CHF"],
      "isTransparent": false,
      "colorTheme": "dark",
      "locale": "en"
    });
    forexWidget.appendChild(script);
  }

  const cryptoWidget = document.querySelector(".tv-crypto-widget");
  if (cryptoWidget && !cryptoWidget.querySelector("script")) {
    const script = document.createElement("script");
    script.src = "https://s3.tradingview.com/external-embedding/embed-widget-symbol-overview.js";
    script.async = true;
    script.innerHTML = JSON.stringify({
      "symbols": [
        ["BINANCE:BTCUSDT", "Bitcoin"],
        ["BINANCE:ETHUSDT", "Ethereum"],
        ["BINANCE:SOLUSDT", "Solana"],
        ["BINANCE:XRPUSDT", "XRP"],
        ["BINANCE:BNBUSDT", "BNB"]
      ],
      "chartOnly": false,
      "width": "100%",
      "height": "100%",
      "locale": "en",
      "colorTheme": "dark",
      "isTransparent": false,
      "autosize": true,
      "showVolume": false,
      "showMA": false,
      "hideDateRanges": false,
      "hideMarketStatus": false,
      "hideSymbolLogo": false,
      "scalePosition": "right",
      "scaleMode": "normal",
      "fontFamily": "-apple-system, BlinkMacSystemFont, Trebuchet MS, Roboto, Ubuntu, sans-serif",
      "fontSize": 10,
      "noTimeScale": false,
      "valuesTracking": 1,
      "changeMode": 1,
      "chartType": "area",
      "maLineColor": "#2962FF",
      "maFillColor": "#2962FF",
      "maLineWidth": 1,
      "maLength": 9,
      "lineWidth": 2,
      "lineType": 0,
      "dateRanges": ["1d|1D", "1m|30", "3m|60", "12m|1D", "60m|1W", "all|1M"]
    });
    cryptoWidget.appendChild(script);
  }
}

// Update header based on login state
function updateHeaderAuthState(): void {
  const token = localStorage.getItem('rk247_token');
  const walletDropdown = document.querySelector('#wallet-dropdown');
  const authButtons = document.querySelector('#auth-buttons');
  const headerBalance = document.querySelector('#header-balance');
  const mobileAuthButtons = document.querySelector('#mobile-auth-buttons');
  const mobileLogoutButton = document.querySelector('#mobile-logout-button');
  const desktopLogoutBtn = document.querySelector('#desktopLogoutBtn') as HTMLElement;

  if (token) {
    // User is logged in
    walletDropdown?.classList.remove('hidden');
    authButtons?.classList.add('hidden');
    mobileAuthButtons?.classList.add('hidden');
    mobileLogoutButton?.classList.remove('hidden');
    desktopLogoutBtn?.classList.add('lg:inline-flex');
    if (authButtons) (authButtons as HTMLElement).style.display = 'none';
    
    // Load balance
    fetch('http://localhost:5000/api/wallet/balance', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then(response => response.json())
    .then(data => {
      if (data.success && headerBalance) {
        headerBalance.textContent = data.data.balance.toLocaleString('en-PK', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
      }
    })
    .catch(error => {
      console.error('Failed to load balance:', error);
    });
  } else {
    // User is logged out
    walletDropdown?.classList.add('hidden');
    authButtons?.classList.remove('hidden');
    mobileAuthButtons?.classList.remove('hidden');
    mobileLogoutButton?.classList.add('hidden');
    desktopLogoutBtn?.classList.remove('lg:inline-flex');
    if (authButtons) (authButtons as HTMLElement).style.display = 'flex';
  }
}

// Handle logout
function handleLogout(): void {
  localStorage.removeItem('rk247_token');
  localStorage.removeItem('rk247_user');
  // Force hard redirect with timestamp to prevent caching
  window.location.href = '/?t=' + Date.now();
}

// Show deposit modal
function showDepositModal(): void {
  const modal = document.createElement('div');
  modal.className = 'fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 px-4';
  modal.innerHTML = `
    <div class="bg-ink-800 backdrop-blur-lg rounded-2xl p-6 sm:p-8 max-w-md w-full border border-white/10 shadow-card">
      <h3 class="text-xl sm:text-2xl font-bold text-white mb-4 sm:mb-6">Deposit Funds</h3>
      <form id="headerDepositForm" class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-white/80 mb-2">Payment System</label>
          <div class="relative">
            <button
              type="button"
              id="headerPaymentSystemBtn"
              class="w-full px-3 sm:px-4 py-2 sm:py-3 bg-white/[0.04] border border-white/10 rounded-lg text-white text-sm sm:text-base focus:outline-none focus:border-white/20 text-left flex justify-between items-center"
            >
              <span id="headerPaymentSystemText">Select a payment system</span>
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
              </svg>
            </button>
            <div id="headerPaymentSystemDropdown" class="hidden absolute top-full left-0 right-0 mt-1 bg-ink-900 border border-white/10 rounded-lg shadow-lg z-50">
              <button type="button" class="header-payment-option w-full text-left px-3 sm:px-4 py-2 sm:py-3 text-white text-sm sm:text-base hover:bg-white/10 transition" data-value="">Select a payment system</button>
              <button type="button" class="header-payment-option w-full text-left px-3 sm:px-4 py-2 sm:py-3 text-white text-sm sm:text-base hover:bg-white/10 transition" data-value="raast_p2p">Raast P2P</button>
              <button type="button" class="header-payment-option w-full text-left px-3 sm:px-4 py-2 sm:py-3 text-white text-sm sm:text-base hover:bg-white/10 transition" data-value="easypaisa">Easypaisa (P2C)</button>
              <button type="button" class="header-payment-option w-full text-left px-3 sm:px-4 py-2 sm:py-3 text-white text-sm sm:text-base hover:bg-white/10 transition" data-value="jazzcash_fast">JazzCash Fast (P2C)</button>
              <button type="button" class="header-payment-option w-full text-left px-3 sm:px-4 py-2 sm:py-3 text-white text-sm sm:text-base hover:bg-white/10 transition" data-value="nayapay_l">NayaPay (P2P)</button>
            </div>
            <input type="hidden" id="headerPaymentSystem" required />
          </div>
        </div>
        <div>
          <label class="block text-sm font-medium text-white/80 mb-2">Amount (PKR)</label>
          <input
            type="number"
            id="headerDepositAmount"
            min="100"
            max="250000"
            required
            class="w-full px-3 sm:px-4 py-2 sm:py-3 bg-white/[0.04] border border-white/10 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-white/20 text-sm sm:text-base"
            placeholder="Enter amount (min PKR 100)"
          />
        </div>
        <div id="headerDepositError" class="hidden bg-red-500/10 border border-red-500/20 text-red-300 px-3 sm:px-4 py-2 sm:py-3 rounded-lg text-xs sm:text-sm"></div>
        <div class="flex gap-2 sm:gap-3">
          <button
            type="button"
            id="headerCancelDepositBtn"
            class="flex-1 px-3 sm:px-4 py-2 sm:py-3 bg-white/[0.04] border border-white/10 hover:bg-white/[0.08] text-white rounded-lg transition text-sm sm:text-base"
          >
            Cancel
          </button>
          <button
            type="submit"
            id="headerConfirmDepositBtn"
            class="flex-1 px-3 sm:px-4 py-2 sm:py-3 bg-white/[0.04] border border-white/10 hover:bg-white/[0.08] text-white rounded-lg transition text-sm sm:text-base"
          >
            Proceed to Payment
          </button>
        </div>
      </form>
    </div>
  `;
  document.body.appendChild(modal);

  // Prevent background scrolling
  document.body.style.overflow = 'hidden';
  document.documentElement.style.overflow = 'hidden';

  // Event listeners
  const form = modal.querySelector('#headerDepositForm') as HTMLFormElement;
  const cancelBtn = modal.querySelector('#headerCancelDepositBtn') as HTMLButtonElement;
  const errorDiv = modal.querySelector('#headerDepositError') as HTMLDivElement;
  const paymentSystemBtn = modal.querySelector('#headerPaymentSystemBtn') as HTMLButtonElement;
  const paymentSystemDropdown = modal.querySelector('#headerPaymentSystemDropdown') as HTMLDivElement;
  const paymentSystemInput = modal.querySelector('#headerPaymentSystem') as HTMLInputElement;
  const paymentSystemText = modal.querySelector('#headerPaymentSystemText') as HTMLSpanElement;
  const paymentOptions = modal.querySelectorAll('.header-payment-option');

  const closeModal = () => {
    modal.remove();
    document.body.style.overflow = '';
    document.documentElement.style.overflow = '';
  };

  // Custom dropdown handler
  paymentSystemBtn?.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    paymentSystemDropdown.classList.toggle('hidden');
  });

  paymentOptions.forEach(option => {
    option.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      const value = (option as HTMLElement).getAttribute('data-value');
      const text = (option as HTMLElement).textContent;
      paymentSystemInput.value = value || '';
      paymentSystemText.textContent = text || 'Select a payment system';
      paymentSystemDropdown.classList.add('hidden');
    });
  });

  // Close dropdown when clicking outside
  document.addEventListener('click', (e) => {
    if (!paymentSystemBtn.contains(e.target as Node) && !paymentSystemDropdown.contains(e.target as Node)) {
      paymentSystemDropdown.classList.add('hidden');
    }
  });

  cancelBtn?.addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  form?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const amountInput = modal.querySelector('#headerDepositAmount') as HTMLInputElement;
    const paymentSystem = paymentSystemInput.value;
    const amount = parseFloat(amountInput.value);

    if (!paymentSystem) {
      if (errorDiv) {
        errorDiv.textContent = 'Please select a payment system';
        errorDiv.classList.remove('hidden');
      }
      return;
    }

    if (amount < 100 || amount > 250000) {
      if (errorDiv) {
        errorDiv.textContent = 'Amount must be between PKR 100 and PKR 250,000';
        errorDiv.classList.remove('hidden');
      }
      return;
    }

    errorDiv?.classList.add('hidden');

    try {
      const token = localStorage.getItem('rk247_token');
      const response = await fetch('http://localhost:5000/api/wallet/deposit/initiate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ amount, payment_system: paymentSystem })
      });

      const data = await response.json();
      if (data.success && data.data.payment_url) {
        // Restore overflow before redirect
        document.body.style.overflow = '';
        window.location.href = data.data.payment_url;
      } else {
        throw new Error(data.error || 'Failed to initiate deposit');
      }
    } catch (error: any) {
      if (errorDiv) {
        errorDiv.textContent = error.message || 'Failed to initiate deposit';
        errorDiv.classList.remove('hidden');
      }
    }
  });
}

// Show withdraw modal
function showWithdrawModal(): void {
  const modal = document.createElement('div');
  modal.className = 'fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 px-4';
  modal.innerHTML = `
    <div class="bg-ink-800 backdrop-blur-lg rounded-2xl p-6 sm:p-8 max-w-md w-full border border-white/10 shadow-card max-h-[90vh] overflow-y-auto">
      <h3 class="text-xl sm:text-2xl font-bold text-white mb-4 sm:mb-6">Withdraw Funds</h3>
      <form id="headerWithdrawForm" class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-white/80 mb-2">Amount (PKR)</label>
          <input
            type="number"
            id="headerWithdrawAmount"
            min="500"
            max="150000"
            required
            class="w-full px-3 sm:px-4 py-2 sm:py-3 bg-white/[0.04] border border-white/10 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-white/20 text-sm sm:text-base"
            placeholder="Enter amount (min PKR 500)"
          />
        </div>
        <div>
          <label class="block text-sm font-medium text-white/80 mb-2">Payment System</label>
          <select
            id="headerPaymentSystem"
            class="w-full bg-white/[0.04] border border-white/10 rounded-lg px-3 sm:px-4 py-2 sm:py-3 text-white focus:outline-none focus:border-white/20 text-sm sm:text-base"
          >
            <option value="" class="bg-ink-800 text-white/60">Select payment system</option>
            <option value="raast_p2p" class="bg-ink-800 text-white">Raast P2P</option>
            <option value="easypaisa" class="bg-ink-800 text-white">EasyPaisa</option>
            <option value="jazzcash" class="bg-ink-800 text-white">JazzCash</option>
            <option value="nayapay" class="bg-ink-800 text-white">NayaPay</option>
          </select>
        </div>
        <div>
          <label class="block text-sm font-medium text-white/80 mb-2">Account Number</label>
          <input
            type="text"
            id="headerAccountNumber"
            required
            class="w-full px-3 sm:px-4 py-2 sm:py-3 bg-white/[0.04] border border-white/10 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-white/20 text-sm sm:text-base"
            placeholder="Enter your account number"
          />
        </div>
        <div>
          <label class="block text-sm font-medium text-white/80 mb-2">Account Name</label>
          <input
            type="text"
            id="headerAccountName"
            required
            class="w-full px-3 sm:px-4 py-2 sm:py-3 bg-white/[0.04] border border-white/10 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-white/20 text-sm sm:text-base"
            placeholder="Enter account holder name"
          />
        </div>
        <div id="headerWithdrawError" class="hidden bg-red-500/10 border border-red-500/20 text-red-300 px-3 sm:px-4 py-2 sm:py-3 rounded-lg text-xs sm:text-sm"></div>
        <div class="flex gap-2 sm:gap-3">
          <button
            type="button"
            id="headerCancelWithdrawBtn"
            class="flex-1 px-3 sm:px-4 py-2 sm:py-3 bg-white/[0.04] border border-white/10 hover:bg-white/[0.08] text-white rounded-lg transition text-sm sm:text-base"
          >
            Cancel
          </button>
          <button
            type="submit"
            id="headerConfirmWithdrawBtn"
            class="flex-1 px-3 sm:px-4 py-2 sm:py-3 bg-white/[0.04] border border-white/10 hover:bg-white/[0.08] text-white rounded-lg transition text-sm sm:text-base"
          >
            Request Withdrawal
          </button>
        </div>
      </form>
    </div>
  `;
  document.body.appendChild(modal);

  // Prevent background scrolling
  document.body.style.overflow = 'hidden';
  document.documentElement.style.overflow = 'hidden';

  // Event listeners
  const form = modal.querySelector('#headerWithdrawForm') as HTMLFormElement;
  const cancelBtn = modal.querySelector('#headerCancelWithdrawBtn') as HTMLButtonElement;
  const errorDiv = modal.querySelector('#headerWithdrawError') as HTMLDivElement;

  const closeModal = () => {
    modal.remove();
    document.body.style.overflow = '';
    document.documentElement.style.overflow = '';
  };

  cancelBtn?.addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  form?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const amountInput = modal.querySelector('#headerWithdrawAmount') as HTMLInputElement;
    const paymentSystemInput = modal.querySelector('#headerPaymentSystem') as HTMLSelectElement;
    const accountNumberInput = modal.querySelector('#headerAccountNumber') as HTMLInputElement;
    const accountNameInput = modal.querySelector('#headerAccountName') as HTMLInputElement;

    const amount = parseFloat(amountInput.value);
    const paymentSystem = paymentSystemInput.value;
    const accountNumber = accountNumberInput.value;
    const accountName = accountNameInput.value;

    if (amount < 500 || amount > 150000) {
      if (errorDiv) {
        errorDiv.textContent = 'Amount must be between PKR 500 and PKR 150,000';
        errorDiv.classList.remove('hidden');
      }
      return;
    }

    if (!paymentSystem || !accountNumber || !accountName) {
      if (errorDiv) {
        errorDiv.textContent = 'Please fill in all fields';
        errorDiv.classList.remove('hidden');
      }
      return;
    }

    errorDiv?.classList.add('hidden');

    try {
      const token = localStorage.getItem('rk247_token');
      const response = await fetch('http://localhost:5000/api/withdrawal/initiate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          amount,
          payment_system: paymentSystem,
          account_data: {
            account_number: accountNumber,
            account_name: accountName
          }
        })
      });

      const data = await response.json();
      if (data.success) {
        modal.remove();
        // Show success message
        const successDiv = document.createElement('div');
        successDiv.className = 'fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4';
        successDiv.innerHTML = `
          <div class="bg-ink-800 border border-white/10 rounded-2xl p-6 sm:p-8 max-w-md w-full shadow-card">
            <h3 class="text-xl sm:text-2xl font-bold text-white mb-4">✓ Withdrawal Requested</h3>
            <p class="text-white/60 mb-4 sm:mb-6 text-sm sm:text-base">Your withdrawal request has been submitted successfully.</p>
            <div class="bg-white/[0.04] rounded-lg p-4 mb-4 sm:mb-6">
              <p class="text-xs sm:text-sm text-white/40 mb-1">Amount</p>
              <p class="text-xl sm:text-2xl font-bold text-white">PKR ${amount.toLocaleString()}</p>
            </div>
            <p class="text-xs sm:text-sm text-white/40 mb-4 sm:mb-6">Status: <span class="text-white/80">Pending Approval</span></p>
            <button id="closeSuccessBtn" class="w-full bg-white/[0.04] border border-white/10 hover:bg-white/[0.08] text-white font-bold py-2 sm:py-2.5 rounded-lg transition text-sm sm:text-base">
              Close
            </button>
          </div>
        `;
        document.body.appendChild(successDiv);

        // Prevent background scrolling
        document.body.style.overflow = 'hidden';
        document.documentElement.style.overflow = 'hidden';

        // Close button handler
        const closeSuccessBtn = successDiv.querySelector('#closeSuccessBtn') as HTMLButtonElement;
        closeSuccessBtn?.addEventListener('click', () => {
          successDiv.remove();
          document.body.style.overflow = '';
          document.documentElement.style.overflow = '';
        });

        successDiv.addEventListener('click', (e) => {
          if (e.target === successDiv) {
            successDiv.remove();
            document.body.style.overflow = '';
            document.documentElement.style.overflow = '';
          }
        });
        // Update balance
        updateHeaderAuthState();
      } else {
        throw new Error(data.error || 'Failed to create withdrawal request');
      }
    } catch (error: any) {
      if (errorDiv) {
        errorDiv.textContent = error.message || 'Failed to create withdrawal request';
        errorDiv.classList.remove('hidden');
      }
    }
  });
}

/* ─── Boot ─── */
const initialPath = getRoutePath() ?? "/";
// Close mobile menu before initial render
const initialMenu = document.querySelector("#mobile-menu");
initialMenu?.classList.add("hidden");
document.body.style.overflow = "";



// Add global functions for inline onclick handlers
(window as any).closeBonusPopup = () => {
  const bonus = document.getElementById('bonus');
  if (bonus) {
    bonus.style.display = 'none';
  }
};

(window as any).closeMobileMenu = () => {
  const menu = document.getElementById('mobile-menu');
  if (menu) {
    menu.style.display = 'none';
    document.body.style.overflow = '';
  }
};

render(initialPath);
app.classList.add('ready');

initRouter((path) => render(path));
