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
import { defaultSeo, routeSeo } from "./seo";

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
  requestAnimationFrame(() => initAnimations());
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

  // Mobile menu
  const menu = document.querySelector("#mobile-menu");
  const toggleMenu = (show: boolean) => {
    if (show) {
      menu?.classList.remove("hidden");
      document.body.style.overflow = "hidden";
    } else {
      menu?.classList.add("hidden");
      document.body.style.overflow = "";
    }
  };
  document.querySelector("#menu-btn")?.addEventListener("click", () => toggleMenu(true));
  document.querySelector("#menu-close")?.addEventListener("click", () => toggleMenu(false));
  document.querySelectorAll(".mobile-link").forEach((l) =>
    l.addEventListener("click", () => toggleMenu(false))
  );

  // Cookie banner
  const cookie = document.querySelector("#cookie");
  if (!localStorage.getItem("rk_cookie_ok")) {
    setTimeout(() => cookie?.classList.replace("hidden", "flex"), 1200);
  }
  document.querySelector("#cookie-ok")?.addEventListener("click", () => {
    localStorage.setItem("rk_cookie_ok", "1");
    cookie?.classList.replace("flex", "hidden");
  });

  // Bonus popup
  const bonus = document.querySelector("#bonus");
  const closeBonus = () => bonus?.classList.replace("flex", "hidden");
  if (!sessionStorage.getItem("rk_bonus_seen") && window.matchMedia("(min-width: 1024px)").matches) {
    setTimeout(() => {
      bonus?.classList.replace("hidden", "flex");
      sessionStorage.setItem("rk_bonus_seen", "1");
    }, 15000);
  }
  document.querySelector("#bonus-close")?.addEventListener("click", closeBonus);
  bonus?.addEventListener("click", (e) => {
    if (e.target === bonus) closeBonus();
  });

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

  const indicesWidget = document.querySelector(".tv-indices-widget");
  if (indicesWidget && !indicesWidget.querySelector("script")) {
    const script = document.createElement("script");
    script.src = "https://s3.tradingview.com/external-embedding/embed-widget-ticker-tape.js";
    script.async = true;
    script.innerHTML = JSON.stringify({
      "symbols": [
        { "proName": "INDEX:SPX", "title": "S&P 500" },
        { "proName": "INDEX:NDX", "title": "NASDAQ 100" },
        { "proName": "INDEX:UKX", "title": "FTSE 100" },
        { "proName": "INDEX:DAX", "title": "DAX 40" },
        { "proName": "INDEX:NKY", "title": "Nikkei 225" }
      ],
      "showSymbolLogo": true,
      "colorTheme": "dark",
      "isTransparent": false,
      "displayMode": "adaptive",
      "locale": "en"
    });
    indicesWidget.appendChild(script);
  }
}

/* ─── Boot ─── */
const initialPath = getRoutePath() ?? "/";
render(initialPath);

initRouter((path) => render(path));
