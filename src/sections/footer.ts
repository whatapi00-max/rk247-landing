import { A } from "../assets";
import { icons } from "../icons";

const colLinks: Record<string, Record<string, string>> = {
  Trading: {
    "Flex": "#/trading/flex",
    "Fixed Time": "#/trading/fixed-time",
    "Forex": "#/trading/forex",
    "Stocks": "#/trading/stocks",
    "How to trade": "#/trading/how-to-trade",
    "Account": "#/trading/account",
    "Islamic Account": "#/trading/islamic-account",
    "Free demo account": "#/trading/demo",
    "Promotions": "#/trading/promotions",
    "Withdrawals": "#/trading/withdrawals",
    "Assets & Trading Conditions": "#/trading/assets",
  },
  About: {
    "Social media": "#/about/social",
    "Contacts": "#/about/contacts",
    "News": "#/about/news",
    "Awards": "#/about/awards",
    "Affiliate Program": "#/about",
    "Reviews": "#/about/reviews",
  },
  "Download App": {
    "Android": "#/download/android",
    "Android APK": "#/download/android-apk",
    "iOS": "#/download",
    "Web App (PWA)": "#/download/web-app",
    "Desktop": "#/download/desktop",
  },
  Help: {
    "FAQ": "#/help/faq",
    "Support": "#/help/support",
    "Learning Center": "#/help/learning",
  },
};

const cols = {
  Trading: Object.keys(colLinks.Trading),
  About: Object.keys(colLinks.About),
  "Download App": Object.keys(colLinks["Download App"]),
  Help: Object.keys(colLinks.Help),
};

export function SeoText(): string {
  const items = [
    {
      t: "Become a pro trader with RK247",
      p: "Join RK247, a modern online trading platform, and unlock your potential as a trader. With access to Forex, stocks, multipliers, indices and more, you can easily diversify your trading portfolio. Our user-friendly interface, advanced tools and educational resources provide everything you need to grow.",
    },
    {
      t: "A reliable trading platform is essential for success",
      p: "Investing can be risky, so choosing the right broker matters. You need a reliable online trading platform that provides a safe and comfortable experience, making it easier to manage your investments while considering the risks.",
    },
    {
      t: "Learn trading with an easy-to-use trading platform",
      p: "Technical tools and trading instruments are key features of our platform. Additionally, a user-friendly interface and supportive educational setting provide beginners with the best learning and trading experience.",
    },
  ];
  return `
  <section class="bg-ink-950 py-16">
    <div class="container-rk grid gap-8 md:grid-cols-3">
      ${items
        .map(
          (i, idx) => `
        <div class="reveal">
          <h3 class="text-base font-bold text-white/85">${i.t}</h3>
          <p class="mt-3 text-sm leading-relaxed text-white/35">${i.p}</p>
          ${idx === 0 ? `<button class="btn-ghost mt-4 gap-1">Read all ${icons.chevronDown}</button>` : ""}
        </div>`
        )
        .join("")}
    </div>
  </section>`;
}

export function Footer(): string {
  return `
  <footer id="footer" class="border-t border-white/5 bg-ink-950 py-14">
    <div class="container-rk">
      <div class="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <p class="font-bold">Follow us<br />on social media</p>
          <div class="mt-4 flex gap-3">
            ${[icons.facebook, icons.instagram, icons.telegram, icons.youtube]
              .map(
                (s) =>
                  `<a href="#/about/social" class="grid h-9 w-9 place-items-center rounded-full bg-white/5 text-white/70 ring-1 ring-white/10 transition-colors hover:bg-white/10 hover:text-white">${s}</a>`
              )
              .join("")}
          </div>
        </div>
        <div class="flex items-center gap-4 rounded-2xl bg-ink-850 p-4 ring-1 ring-white/5">
          <div class="grid h-16 w-16 place-items-center rounded-lg bg-white">
            <div class="h-12 w-12 bg-black" style="mask:radial-gradient(circle,#000 60%,transparent 0) 0 0/6px 6px;-webkit-mask:radial-gradient(circle,#000 60%,transparent 0) 0 0/6px 6px"></div>
          </div>
          <div>
            <p class="text-sm font-bold leading-tight">Your financial future<br />is in your hands</p>
            <a href="#/download" class="mt-1 inline-flex items-center gap-1 text-xs font-bold text-rk-green hover:text-rk-greenBright">Download app now ${icons.chevronRight}</a>
          </div>
        </div>
      </div>

      <nav class="mt-12 grid grid-cols-2 gap-8 sm:grid-cols-4">
        ${Object.entries(cols)
          .map(
            ([title, links]) => `
          <div>
            <p class="flex items-center gap-1 text-sm font-bold">${title} ${icons.arrowUpRight}</p>
            <ul class="mt-4 space-y-2.5">
              ${links.map((l) => `<li><a href="${colLinks[title][l]}" class="text-sm text-white/45 transition-colors hover:text-white">${l}</a></li>`).join("")}
            </ul>
          </div>`
          )
          .join("")}
      </nav>

      <div class="mt-12 border-t border-white/5 pt-8">
        <p class="text-sm font-semibold text-white/70">© 2014–2026 RK247</p>
        <p class="mt-4 max-w-5xl text-xs leading-relaxed text-white/30">
          Trading financial instruments involves substantial risk and may not be suitable for everyone. Past performance is not indicative of future results. You may lose some or all of your invested capital, so you should not trade with money you cannot afford to lose. Before trading, please ensure you fully understand the risks involved and review the Service Agreement and Risk Disclosure. RK247 is a registered trading platform providing financial services to global clients.
        </p>
        <div class="mt-6 flex gap-6 text-sm">
          <a href="#footer" class="text-white/60 hover:text-white">Legal information</a>
          <a href="#footer" class="text-white/60 hover:text-white">Regulation</a>
        </div>
      </div>
    </div>
  </footer>`;
}

export function Overlays(): string {
  return `
  <!-- Chat widget -->
  <button class="fixed bottom-5 right-5 z-40 grid h-12 w-12 place-items-center rounded-full bg-rk-green text-black shadow-green-glow transition-transform hover:scale-105" aria-label="Chat" data-wa>
    ${icons.chat}
  </button>

  <!-- Cookie banner -->
  <div id="cookie" class="fixed bottom-5 left-5 z-40 hidden max-w-sm items-center gap-3 rounded-2xl bg-ink-800 p-4 text-sm ring-1 ring-white/10 sm:flex">
    <p class="text-white/70">By continuing to browse, you agree to our <a href="#footer" class="text-rk-green underline">Cookies Policy</a>.</p>
    <button id="cookie-ok" class="btn-green shrink-0 px-4 py-2">Ok</button>
  </div>

  <!-- Bonus popup -->
  <div id="bonus" class="fixed inset-0 z-[60] hidden items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
    <div class="relative w-full max-w-md overflow-hidden rounded-3xl bg-ink-850 ring-1 ring-white/10">
      <button id="bonus-close" class="absolute right-3 top-3 z-10 grid h-8 w-8 place-items-center rounded-full bg-white/10 text-white hover:bg-white/20">${icons.close}</button>
      <img src="${A.bonusBottle}" alt="Bonus bottle representing deposit bonus offer" class="h-48 w-full object-cover" />
      <div class="p-6 text-center">
        <h2 class="text-2xl font-extrabold text-rk-green">Bonus up to 100%</h2>
        <p class="mt-2 text-sm text-white/60">Supercharge your funds with a deposit bonus, and unlock a withdrawable reward.</p>
        <button id="bonus-claim" class="btn-green mt-5 w-full py-3.5" data-wa>Claim now</button>
      </div>
    </div>
  </div>`;
}
