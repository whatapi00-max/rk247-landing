import { PageHero, CtaSection, BackLink, icons } from "./layout";

export type MarketUpdate = {
  id: string;
  date: string;
  tag: string;
  title: string;
  summary: string;
  content: string;
  instruments: string[];
};

/**
 * Daily market analysis updates.
 * Replace or extend this array with fresh content every day.
 */
const updates: MarketUpdate[] = [
  {
    id: "1",
    date: "13 July 2026",
    tag: "Daily Trend",
    title: "EUR/USD Tests Key Resistance Ahead of US Inflation Data",
    summary:
      "The euro is pushing against the 1.0950 resistance zone as traders position for the upcoming US CPI release. A breakout could open the door to 1.1020.",
    content:
      "EUR/USD has gained momentum for three consecutive sessions, supported by improving Eurozone sentiment and a softer US dollar. Price action is currently testing the 1.0950 resistance level, which has held since early June. If today's US CPI prints below expectations, a break above 1.0950 may target 1.1020. On the downside, support sits at 1.0880 and 1.0840. Traders should watch the 1-hour close for confirmation.",
    instruments: ["EUR/USD", "USD Index", "Gold"],
  },
  {
    id: "2",
    date: "13 July 2026",
    tag: "Crypto",
    title: "Bitcoin Holds Above $58,000 as ETF Inflows Resume",
    summary:
      "Bitcoin finds steady bids above the $58,000 support after renewed spot ETF inflows. Short-term resistance is seen near $60,500.",
    content:
      "BTC/USD is consolidating in a tight range between $58,000 and $60,500 after spot Bitcoin ETFs posted their strongest weekly inflow since May. The 4-hour structure remains bullish above $57,200, with the next target at $61,800 if buyers clear the $60,500 barrier. Ethereum is lagging but holding above $3,100, while Solana shows relative strength near $145.",
    instruments: ["BTC/USD", "ETH/USD", "SOL/USD"],
  },
  {
    id: "3",
    date: "12 July 2026",
    tag: "Stocks",
    title: "Tech Sector Leads Wall Street Higher as Earnings Season Begins",
    summary:
      "Major US indices closed higher on Friday, led by technology and semiconductor names. This week brings earnings from several large banks and tech giants.",
    content:
      "The S&P 500 gained 0.8% and the Nasdaq 100 rose 1.2% on Friday, with chipmakers and cloud providers leading the way. Investors are optimistic about AI-driven demand and margin expansion. This week's earnings calendar includes major banks and consumer tech companies, which could set the tone for the rest of the quarter. Key levels to watch: S&P 500 support at 5,580 and Nasdaq 100 resistance at 20,800.",
    instruments: ["S&P 500", "Nasdaq 100", "NVDA", "AAPL"],
  },
];

function UpdateCard(u: MarketUpdate): string {
  return `
  <article class="reveal card p-6 sm:p-8" id="market-update-${u.id}">
    <div class="flex flex-wrap items-center gap-3 mb-4">
      <span class="text-xs font-semibold text-rk-green bg-rk-green/10 rounded-full px-2.5 py-1">${u.tag}</span>
      <span class="text-xs text-white/40">${u.date}</span>
    </div>
    <h2 class="text-xl sm:text-2xl font-bold mb-3 leading-tight">${u.title}</h2>
    <p class="text-white/60 leading-relaxed mb-4">${u.summary}</p>
    <div class="prose prose-invert max-w-none text-white/55 text-sm leading-relaxed mb-5">
      <p>${u.content}</p>
    </div>
    <div class="flex flex-wrap gap-2">
      ${u.instruments
        .map(
          (inst) =>
            `<span class="rounded-full bg-white/5 px-3 py-1 text-xs font-medium text-white/70">${inst}</span>`
        )
        .join("")}
    </div>
  </article>`;
}

export function MarketAnalysisPage(): string {
  return `
  ${BackLink()}
  ${PageHero(
    "Market Analysis",
    "Daily trends, technical insights and key levels for Forex, stocks, indices and crypto. Updated every day by the RK247 research team.",
    "Research"
  )}

  <section class="py-16 bg-ink-950">
    <div class="container-rk">
      <div class="grid gap-8 lg:grid-cols-3">
        <!-- Main feed -->
        <div class="lg:col-span-2 space-y-6">
          ${updates.map(UpdateCard).join("")}
        </div>

        <!-- Sidebar -->
        <aside class="space-y-6">
          <div class="reveal card p-6">
            <h3 class="font-bold mb-4 flex items-center gap-2">
              <span class="text-rk-green">${icons.arrowUpRight}</span> Today's Highlights
            </h3>
            <ul class="space-y-3 text-sm text-white/60">
              <li class="flex gap-2"><span class="text-rk-green">•</span> EUR/USD testing 1.0950 resistance</li>
              <li class="flex gap-2"><span class="text-rk-green">•</span> Bitcoin holding above $58,000</li>
              <li class="flex gap-2"><span class="text-rk-green">•</span> Tech sector leads US indices higher</li>
              <li class="flex gap-2"><span class="text-rk-green">•</span> US CPI data due this week</li>
            </ul>
          </div>

          <div class="reveal card p-6">
            <h3 class="font-bold mb-4">Popular Instruments</h3>
            <div class="flex flex-wrap gap-2">
              ${["EUR/USD", "GBP/USD", "USD/JPY", "Gold", "BTC/USD", "ETH/USD", "S&P 500", "Nasdaq 100"]
                .map(
                  (i) =>
                    `<span class="rounded-full bg-white/5 px-3 py-1.5 text-xs font-medium text-white/70">${i}</span>`
                )
                .join("")}
            </div>
          </div>

          <div class="reveal card p-6 text-center">
            <h3 class="font-bold mb-2">Get analysis on WhatsApp</h3>
            <p class="text-sm text-white/55 mb-4">Receive daily market updates and trading signals directly on your phone.</p>
            <button class="btn-green w-full" data-wa>Subscribe free</button>
          </div>
        </aside>
      </div>
    </div>
  </section>

  ${CtaSection("Start Trading the Markets", "Apply today's analysis on RK247 with a free demo or live account.")}`;
}
