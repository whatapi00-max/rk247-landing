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
  DownloadPage, DesktopPage, AndroidPage, AndroidApkPage, WebAppPage,
} from "./pages/download";
import {
  AboutPage, ContactsPage, SocialPage, AwardsPage, NewsPage, ReviewsPage,
} from "./pages/about";
import {
  SupportPage, FaqPage, LearningPage,
} from "./pages/help";
import { MarketAnalysisPage, MarketAnalysisDetailPage } from "./pages/market-analysis";

import { ScrollTrigger } from "gsap/ScrollTrigger";

const app = document.querySelector<HTMLDivElement>("#app")!;
const WA_LINK = "https://wa.link/rk247org";

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
  "/download/web-app":       () => PageLayout(WebAppPage()),
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

  // Dynamic market-analysis detail routes
  if (path.startsWith("/market-analysis/")) {
    const slug = path.slice("/market-analysis/".length);
    app.innerHTML = PageLayout(MarketAnalysisDetailPage(slug));
    attachListeners();
    window.scrollTo({ top: 0 });
    return;
  }

  const handler = routes[path] ?? routes["/"];
  app.innerHTML = handler();

  attachListeners();

  // Only run homepage animations when on the homepage
  if (path === "/") {
    requestAnimationFrame(() => initAnimations());
  }

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
    setTimeout(() => cookie?.classList.remove("hidden"), 1200);
  }
  document.querySelector("#cookie-ok")?.addEventListener("click", () => {
    localStorage.setItem("rk_cookie_ok", "1");
    cookie?.classList.add("hidden");
  });

  // Bonus popup
  const bonus = document.querySelector("#bonus");
  const closeBonus = () => bonus?.classList.replace("flex", "hidden");
  if (!sessionStorage.getItem("rk_bonus_seen")) {
    setTimeout(() => {
      bonus?.classList.replace("hidden", "flex");
      sessionStorage.setItem("rk_bonus_seen", "1");
    }, 4500);
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
}

/* ─── Boot ─── */
const initialPath = getRoutePath() ?? "/";
render(initialPath);

initRouter((path) => render(path));
