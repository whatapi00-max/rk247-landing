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

const app = document.querySelector<HTMLDivElement>("#app")!;

app.innerHTML = [
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

/* ---------- Interactions ---------- */

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
document.querySelector("#menu-btn")?.addEventListener("click", () => menu?.classList.remove("hidden"));
document.querySelector("#menu-close")?.addEventListener("click", () => menu?.classList.add("hidden"));
document.querySelectorAll(".mobile-link").forEach((l) =>
  l.addEventListener("click", () => menu?.classList.add("hidden"))
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
document.querySelector("#bonus-claim")?.addEventListener("click", closeBonus);
bonus?.addEventListener("click", (e) => {
  if (e.target === bonus) closeBonus();
});

// Smooth-scroll for in-page anchors
document.querySelectorAll<HTMLAnchorElement>('a[href^="#"]').forEach((a) => {
  a.addEventListener("click", (e) => {
    const id = a.getAttribute("href")!;
    if (id.length <= 1) return;
    const target = document.querySelector(id);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });
});

// Kick off animations after layout
requestAnimationFrame(() => initAnimations());
