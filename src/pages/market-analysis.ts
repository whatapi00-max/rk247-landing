import { PageHero, CtaSection, BackLink, icons } from "./layout";

type MarketReport = {
  slug: string;
  date: string;
  tag: string;
  title: string;
  image: string;
  summary: string;
  overview: string;
  bullets: string[];
  pairs: {
    pair: string;
    sentiment: string;
    direction: string;
    rsi: string;
    resistance: string;
    support: string;
    suggestion: string;
  }[];
  commentary: { pair: string; text: string }[];
  qa: { q: string; a: string }[];
  takeaways: string[];
};

/**
 * Daily market analysis reports.
 * Add a new report at the TOP of this array every day you upload a new image.
 * The slug becomes the URL: /#/market-analysis/{slug}
 */
export const marketReports: MarketReport[] = [
  {
    slug: "july-13-2026",
    date: "July 13, 2026",
    tag: "Forex",
    title: "Forex Market Mixed as Safe-Haven Dollar Gains on Geopolitical Tensions",
    image: "/assets/july 13 forex market.jpeg",
    summary:
      "The forex market opened the week cautiously as the U.S. dollar strengthened on renewed safe-haven demand following escalating geopolitical tensions. Traders are now focused on U.S. CPI inflation data, Fed Chair testimony, UK GDP, and the Bank of Canada policy decision for the next major directional move.",
    overview:
      "Global currency markets remain relatively range-bound despite increased volatility caused by geopolitical developments in the Middle East. The U.S. dollar attracted fresh buying as investors sought safety after higher oil prices increased inflation concerns. EUR/USD remains under pressure below key resistance, while GBP/USD has pulled back after recent gains. USD/JPY continues trading near multi-year highs as the Bank of Japan maintains an accommodative stance. Commodity-linked currencies including AUD and NZD remain weak due to stronger dollar demand and global risk aversion.",
    bullets: [
      "U.S. Dollar strengthens as investors seek safe-haven assets.",
      "EUR/USD remains capped below 1.1450 resistance.",
      "GBP/USD slips as higher oil prices weigh on sterling.",
      "USD/JPY trades near long-term highs with bullish momentum intact.",
      "Traders await U.S. CPI, Fed testimony and UK GDP for fresh market direction.",
    ],
    pairs: [
      { pair: "EUR/USD", sentiment: "Bearish", direction: "Sell", rsi: "42", resistance: "1.1438 / 1.1456", support: "1.1364 / 1.1347", suggestion: "Sell below 1.1360 / TP 1.1300 / SL 1.1455" },
      { pair: "GBP/USD", sentiment: "Neutral-Bearish", direction: "Sell", rsi: "45", resistance: "1.3450 / 1.3550", support: "1.3330 / 1.3200", suggestion: "Sell below 1.3330 / TP 1.3250 / SL 1.3450" },
      { pair: "USD/JPY", sentiment: "Bullish", direction: "Buy", rsi: "63", resistance: "162.80 / 164.00", support: "160.80 / 159.60", suggestion: "Buy above 161.20 / TP 163.80 / SL 160.00" },
      { pair: "AUD/USD", sentiment: "Bearish", direction: "Sell", rsi: "41", resistance: "0.7000 / 0.7050", support: "0.6920 / 0.6880", suggestion: "Sell below 0.6920 / TP 0.6880 / SL 0.7000" },
    ],
    commentary: [
      {
        pair: "EUR/USD",
        text: "EUR/USD continues consolidating below the important 1.1450 resistance zone as demand for the U.S. dollar remains firm. Rising energy prices and stronger dollar sentiment continue to pressure the euro. Technical indicators remain slightly bearish, and a break below 1.1360 could expose the 1.1300 support area. A sustained move above 1.1450 would invalidate the immediate bearish outlook.",
      },
      {
        pair: "GBP/USD",
        text: "GBP/USD has retreated after reaching recent highs as geopolitical uncertainty and stronger dollar demand reduced sterling's momentum. The pair remains supported above 1.3300, but failure to hold this area could trigger additional downside toward 1.3200. Bulls need a break above 1.3450 to regain control.",
      },
      {
        pair: "USD/JPY",
        text: "USD/JPY remains one of the strongest major currency pairs, supported by widening interest-rate differentials and continued demand for the U.S. dollar. Momentum indicators remain positive. A move above 162.80 could extend the rally toward 164.00, while a drop below 160.80 would weaken the bullish structure.",
      },
      {
        pair: "AUD/USD",
        text: "AUD/USD remains under pressure as risk sentiment weakens and investors rotate into the U.S. dollar. The pair continues trading below major moving averages, with sellers targeting 0.6880 if 0.6920 support fails. Recovery above 0.7000 would improve the near-term outlook.",
      },
    ],
    qa: [
      { q: "Why is the U.S. dollar strengthening?", a: "Safe-haven demand has increased due to geopolitical tensions and expectations that higher energy prices could keep inflation elevated." },
      { q: "What is the key level for EUR/USD?", a: "1.1450 remains the major resistance, while 1.1360 is the immediate support." },
      { q: "Why is USD/JPY still bullish?", a: "Higher U.S. yields and policy divergence between the Federal Reserve and Bank of Japan continue supporting the pair." },
      { q: "Which events could move the forex market this week?", a: "U.S. CPI inflation, Fed Chair testimony, UK GDP, and the Bank of Canada interest-rate decision are expected to be the primary market catalysts." },
    ],
    takeaways: [
      "Safe-haven demand continues supporting the U.S. Dollar.",
      "EUR/USD and GBP/USD remain under bearish pressure below major resistance.",
      "USD/JPY continues trading with a bullish bias.",
      "AUD/USD remains vulnerable as risk sentiment weakens.",
      "This week's U.S. inflation data and central bank events are likely to determine the next major trend across the forex market.",
    ],
  },
];

function sentimentColor(s: string): string {
  if (s.includes("Bullish")) return "text-rk-green";
  if (s.includes("Bearish")) return "text-red-400";
  return "text-yellow-400";
}

function MarketCardHTML(report: MarketReport): string {
  return `
  <a href="#/market-analysis/${report.slug}" class="reveal card group overflow-hidden block hover:ring-2 hover:ring-rk-green/50 transition-all duration-300">
    <div class="aspect-[16/10] overflow-hidden bg-ink-800">
      <img
        src="${report.image}"
        alt="${report.title}"
        class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        loading="lazy"
      />
    </div>
    <div class="p-4">
      <p class="text-xs font-semibold text-rk-green mb-2">${report.date}</p>
      <h3 class="text-sm font-bold leading-snug text-white/90 group-hover:text-white transition-colors line-clamp-2">${report.title}</h3>
      <p class="mt-3 text-xs text-white/40">Click to view full analysis</p>
    </div>
  </a>`;
}

export function MarketAnalysisPage(): string {
  return `
  ${BackLink()}
  ${PageHero(
    "Market Analysis",
    "Daily market analysis and trend reports. Click any card to read the full report.",
    "Research"
  )}

  <section class="py-16 bg-ink-950">
    <div class="container-rk">
      <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        ${marketReports.map(MarketCardHTML).join("")}
      </div>

      ${
        marketReports.length === 0
          ? `<div class="reveal card p-12 text-center">
               <p class="text-white/60">No market analysis reports available yet. Check back soon.</p>
             </div>`
          : ""
      }
    </div>
  </section>

  ${CtaSection("Trade the Market Today", "Apply today's analysis on RK247 with a free demo or live account.")}`;
}

export function MarketAnalysisDetailPage(slug: string): string {
  const report = marketReports.find((r) => r.slug === slug);
  if (!report) {
    return `
    ${BackLink()}
    <section class="py-32 bg-ink-950 text-center">
      <div class="container-rk">
        <h1 class="text-2xl font-bold mb-4">Report not found</h1>
        <p class="text-white/60 mb-8">The market analysis report you are looking for does not exist.</p>
        <a href="#/market-analysis" class="btn-green">Back to Market Analysis</a>
      </div>
    </section>`;
  }

  return `
  ${BackLink("← Back to Market Analysis")}
  ${PageHero("Market Analysis", report.title, report.date)}

  <article class="py-16 bg-ink-950">
    <div class="container-rk">
      <div class="grid gap-8 lg:grid-cols-3">
        <!-- Main content -->
        <div class="lg:col-span-2 space-y-8">
          <div class="reveal card overflow-hidden">
            <img src="${report.image}" alt="${report.title}" class="w-full h-auto" />
          </div>

          <div class="reveal card p-6 sm:p-8">
            <div class="flex flex-wrap items-center gap-3 mb-4">
              <span class="text-xs font-semibold text-rk-green bg-rk-green/10 rounded-full px-2.5 py-1">${report.tag}</span>
              <span class="text-xs text-white/40">${report.date}</span>
            </div>
            <h1 class="text-2xl sm:text-3xl font-bold mb-4 leading-tight">${report.title}</h1>

            <div class="space-y-6 text-white/60 leading-relaxed">
              <div>
                <h2 class="text-lg font-bold text-white mb-2">Headline Summary</h2>
                <p>${report.summary}</p>
              </div>

              <div>
                <h2 class="text-lg font-bold text-white mb-2">Market Overview</h2>
                <p>${report.overview}</p>
              </div>

              <div>
                <h2 class="text-lg font-bold text-white mb-3">Major News Bullets</h2>
                <ul class="space-y-2">
                  ${report.bullets.map((b) => `<li class="flex gap-2"><span class="text-rk-green">•</span> ${b}</li>`).join("")}
                </ul>
              </div>

              <div>
                <h2 class="text-lg font-bold text-white mb-3">Technical Summary</h2>

                <!-- Mobile card view -->
                <div class="grid gap-3 sm:hidden">
                  ${report.pairs
                    .map(
                      (p) => `
                    <div class="card p-4">
                      <div class="flex items-center justify-between mb-3">
                        <span class="font-bold text-white">${p.pair}</span>
                        <span class="text-xs ${sentimentColor(p.sentiment)}">${p.sentiment}</span>
                      </div>
                      <div class="grid grid-cols-2 gap-2 text-xs mb-3">
                        <div class="bg-white/5 rounded-lg p-2">
                          <span class="text-white/50 block">Direction</span>
                          <span class="font-semibold text-white">${p.direction}</span>
                        </div>
                        <div class="bg-white/5 rounded-lg p-2">
                          <span class="text-white/50 block">RSI</span>
                          <span class="font-semibold text-white">${p.rsi}</span>
                        </div>
                        <div class="bg-white/5 rounded-lg p-2">
                          <span class="text-white/50 block">Resistance</span>
                          <span class="font-semibold text-white">${p.resistance}</span>
                        </div>
                        <div class="bg-white/5 rounded-lg p-2">
                          <span class="text-white/50 block">Support</span>
                          <span class="font-semibold text-white">${p.support}</span>
                        </div>
                      </div>
                      <div class="bg-white/5 rounded-lg p-2 text-xs">
                        <span class="text-white/50 block mb-1">Trade Suggestion</span>
                        <span class="font-semibold text-white">${p.suggestion}</span>
                      </div>
                    </div>`
                    )
                    .join("")}
                </div>

                <!-- Desktop/Tablet table view -->
                <div class="hidden sm:block overflow-x-auto -mx-6 px-6">
                  <table class="min-w-full text-left text-xs sm:text-sm border border-white/10 rounded-xl overflow-hidden">
                    <thead class="bg-white/5 text-white/80">
                      <tr>
                        <th class="px-3 py-2 font-semibold">Pair</th>
                        <th class="px-3 py-2 font-semibold">Sentiment</th>
                        <th class="px-3 py-2 font-semibold">Direction</th>
                        <th class="px-3 py-2 font-semibold">RSI</th>
                        <th class="px-3 py-2 font-semibold">Resistance</th>
                        <th class="px-3 py-2 font-semibold">Support</th>
                        <th class="px-3 py-2 font-semibold">Trade Suggestion</th>
                      </tr>
                    </thead>
                    <tbody class="divide-y divide-white/5">
                      ${report.pairs
                        .map(
                          (p) => `
                        <tr>
                          <td class="px-3 py-2 font-semibold">${p.pair}</td>
                          <td class="px-3 py-2 ${sentimentColor(p.sentiment)}">${p.sentiment}</td>
                          <td class="px-3 py-2">${p.direction}</td>
                          <td class="px-3 py-2">${p.rsi}</td>
                          <td class="px-3 py-2">${p.resistance}</td>
                          <td class="px-3 py-2">${p.support}</td>
                          <td class="px-3 py-2">${p.suggestion}</td>
                        </tr>`
                        )
                        .join("")}
                    </tbody>
                  </table>
                </div>
              </div>

              <div>
                <h2 class="text-lg font-bold text-white mb-3">Analyst Commentary Per Pair</h2>
                <div class="space-y-4">
                  ${report.commentary
                    .map(
                      (c) => `
                    <div>
                      <h3 class="font-semibold text-white mb-1">${c.pair}</h3>
                      <p>${c.text}</p>
                    </div>`
                    )
                    .join("")}
                </div>
              </div>

              <div>
                <h2 class="text-lg font-bold text-white mb-3">AI Q&A</h2>
                <div class="space-y-3">
                  ${report.qa
                    .map(
                      (item) => `
                    <div>
                      <p class="font-semibold text-white">Q: ${item.q}</p>
                      <p class="text-white/55">A: ${item.a}</p>
                    </div>`
                    )
                    .join("")}
                </div>
              </div>

              <div>
                <h2 class="text-lg font-bold text-white mb-3">Key Takeaways</h2>
                <ul class="space-y-2">
                  ${report.takeaways.map((t) => `<li class="flex gap-2"><span class="text-rk-green">•</span> ${t}</li>`).join("")}
                </ul>
              </div>
            </div>
          </div>
        </div>

        <!-- Sidebar -->
        <aside class="space-y-6">
          <div class="reveal card p-6">
            <h3 class="font-bold mb-4 flex items-center gap-2">
              <span class="text-rk-green">${icons.arrowUpRight}</span> Today's Highlights
            </h3>
            <ul class="space-y-3 text-sm text-white/60">
              ${report.bullets.slice(0, 4).map((b) => `<li class="flex gap-2"><span class="text-rk-green">•</span> ${b}</li>`).join("")}
            </ul>
          </div>

          <div class="reveal card p-6">
            <h3 class="font-bold mb-4">Popular Instruments</h3>
            <div class="flex flex-wrap gap-2">
              ${report.pairs
                .map((p) => `<span class="rounded-full bg-white/5 px-3 py-1.5 text-xs font-medium text-white/70">${p.pair}</span>`)
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
  </article>

  ${CtaSection("Trade the Market Today", "Apply today's analysis on RK247 with a free demo or live account.")}`;
}
