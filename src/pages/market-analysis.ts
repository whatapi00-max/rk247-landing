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
    slug: "indices-july-13-2026",
    date: "July 13, 2026",
    tag: "Indices",
    title: "Global Indices Trade Mixed as Investors Await Key Inflation Data",
    image: "/assets/Indices july 13.jpeg",
    summary:
      "Global stock indices traded with mixed momentum on July 13, 2026, as investors remained cautious ahead of key U.S. inflation data and central bank commentary. While U.S. futures held firm, European and Asian markets posted mixed performances amid geopolitical uncertainty and earnings expectations.",
    overview:
      "Global equity markets started the week on a cautious note as traders balanced strong corporate earnings expectations against concerns over inflation, interest rates, and geopolitical developments. U.S. index futures remained relatively stable after recent gains, while European markets traded sideways. Asian indices showed mixed performance as investors evaluated China's economic outlook and the Bank of Japan's policy stance. Market participants are closely watching upcoming U.S. CPI inflation, Federal Reserve commentary, and the beginning of the quarterly earnings season, which could determine the next major direction for global equity markets.",
    bullets: [
      "S&P 500 futures remain steady ahead of U.S. inflation data.",
      "Nasdaq continues outperforming as AI-related technology stocks remain resilient.",
      "Dow Jones trades in a narrow consolidation range.",
      "Nikkei 225 remains supported by a weaker Japanese yen.",
      "Investors focus on earnings season and Federal Reserve guidance.",
    ],
    pairs: [
      { pair: "S&P 500", sentiment: "Bullish", direction: "Buy", rsi: "61", resistance: "6,450 / 6,520", support: "6,320 / 6,250", suggestion: "Buy above 6,350 / TP 6,450 / SL 6,290" },
      { pair: "Nasdaq 100", sentiment: "Bullish", direction: "Buy", rsi: "64", resistance: "23,900 / 24,200", support: "23,300 / 22,950", suggestion: "Buy above 23,450 / TP 23,900 / SL 23,150" },
      { pair: "Dow Jones", sentiment: "Neutral-Bullish", direction: "Buy", rsi: "57", resistance: "45,200 / 45,600", support: "44,500 / 44,000", suggestion: "Buy above 44,700 / TP 45,200 / SL 44,300" },
      { pair: "Nikkei 225", sentiment: "Bullish", direction: "Buy", rsi: "60", resistance: "42,300 / 42,900", support: "41,400 / 40,800", suggestion: "Buy above 41,600 / TP 42,300 / SL 41,150" },
    ],
    commentary: [
      {
        pair: "S&P 500",
        text: "The S&P 500 continues trading near record highs as investors remain optimistic about corporate earnings and resilient economic growth. Momentum indicators remain positive, with price holding above major moving averages. A breakout above 6,450 could extend gains toward 6,520, while a decline below 6,320 may trigger short-term profit-taking.",
      },
      {
        pair: "Nasdaq 100",
        text: "The Nasdaq remains the strongest-performing major U.S. index, supported by continued demand for AI, semiconductor, and large-cap technology stocks. Technical indicators continue to favor buyers. A sustained move above 23,900 could open the path toward 24,200, while support near 23,300 remains critical for maintaining the current bullish trend.",
      },
      {
        pair: "Dow Jones",
        text: "The Dow Jones Industrial Average remains range-bound as investors rotate between defensive and cyclical sectors. Momentum remains moderately positive. A move above 45,200 would reinforce bullish sentiment, while a break below 44,500 could increase downside pressure.",
      },
      {
        pair: "Nikkei 225",
        text: "Japan's Nikkei 225 continues benefiting from a relatively weaker yen and improving corporate earnings expectations. Technical indicators remain bullish. A breakout above 42,300 would strengthen the uptrend, while a fall below 41,400 could signal a short-term correction.",
      },
    ],
    qa: [
      { q: "Why are global indices trading sideways?", a: "Investors are waiting for U.S. inflation data, Federal Reserve commentary, and the latest corporate earnings before taking larger positions." },
      { q: "Which index currently has the strongest momentum?", a: "The Nasdaq 100 continues to lead major global indices, driven by strong performance in technology and AI-related stocks." },
      { q: "What is the key risk for equity markets this week?", a: "Higher-than-expected inflation could delay interest-rate cuts and increase market volatility." },
      { q: "Which event could move global indices the most?", a: "The U.S. CPI inflation report and upcoming earnings releases are expected to be the primary market-moving events." },
    ],
    takeaways: [
      "Global equity markets remain cautious ahead of major economic events.",
      "The Nasdaq continues outperforming due to strength in technology stocks.",
      "The S&P 500 remains close to record highs with a bullish technical outlook.",
      "The Dow Jones and Nikkei 225 continue trading with positive momentum.",
      "U.S. inflation data, Federal Reserve commentary, and corporate earnings are expected to determine the next major direction for global stock indices.",
    ],
  },
  {
    slug: "crypto-july-13-2026",
    date: "July 13, 2026",
    tag: "Crypto",
    title: "Crypto Markets Consolidate as Bitcoin Holds Key Support Ahead of Macro Catalysts",
    image: "/assets/crypto july 13.jpeg",
    summary:
      "The cryptocurrency market traded cautiously on July 13, 2026, with Bitcoin holding above a critical support zone, Ethereum consolidating near major resistance, and altcoins showing mixed performance. Investors remain focused on upcoming U.S. inflation data and Federal Reserve commentary for the next directional catalyst.",
    overview:
      "The crypto market opened the week with limited volatility as traders adopted a wait-and-see approach ahead of key macroeconomic events. Bitcoin continues to trade within a well-defined consolidation range after a strong recovery in recent weeks. Ethereum remains resilient above psychological support, while XRP and Solana are attempting to maintain bullish market structures. Dogecoin remains range-bound as meme coin activity slows. Institutional participation remains steady, while ETF inflows and expectations surrounding future monetary policy continue to influence overall market sentiment.",
    bullets: [
      "Bitcoin continues consolidating above key technical support.",
      "Ethereum trades sideways as buyers defend the $3,000 psychological zone.",
      "XRP stabilizes after recent volatility with support holding firm.",
      "Solana remains one of the strongest large-cap altcoins.",
      "Traders await U.S. CPI data and Federal Reserve commentary for the next major crypto move.",
    ],
    pairs: [
      { pair: "Bitcoin (BTC)", sentiment: "Bullish", direction: "Buy", rsi: "59", resistance: "118,500 / 121,000", support: "114,000 / 110,500", suggestion: "Buy above 115,000 / TP 118,500 / SL 112,800" },
      { pair: "Ethereum (ETH)", sentiment: "Bullish", direction: "Buy", rsi: "57", resistance: "3,150 / 3,300", support: "2,940 / 2,820", suggestion: "Buy above 3,000 / TP 3,150 / SL 2,920" },
      { pair: "XRP", sentiment: "Neutral-Bullish", direction: "Buy", rsi: "54", resistance: "2.72 / 2.90", support: "2.48 / 2.30", suggestion: "Buy above 2.50 / TP 2.72 / SL 2.38" },
      { pair: "Solana (SOL)", sentiment: "Bullish", direction: "Buy", rsi: "62", resistance: "172 / 180", support: "158 / 150", suggestion: "Buy above 160 / TP 172 / SL 154" },
    ],
    commentary: [
      {
        pair: "Bitcoin (BTC)",
        text: "Bitcoin continues trading above the $114,000 support zone after several sessions of sideways consolidation. Buyers remain active near lower levels, while resistance around $118,500 continues to cap upside momentum. Technical indicators remain constructive, with price trading above major moving averages. A breakout above $118,500 could open the path toward $121,000, while a close below $114,000 may trigger a deeper correction toward $110,500.",
      },
      {
        pair: "Ethereum (ETH)",
        text: "Ethereum remains stable above the important $3,000 psychological level despite reduced trading volume. Momentum indicators continue pointing higher, suggesting buyers remain in control. A break above $3,150 would strengthen bullish momentum toward $3,300, while failure to hold $2,940 could invite short-term selling pressure.",
      },
      {
        pair: "XRP",
        text: "XRP continues consolidating after recent gains as buyers defend support near $2.50. Moving averages remain broadly supportive, while momentum indicators remain neutral. Holding above current support could allow another attempt toward $2.72, whereas a break below $2.48 may weaken the short-term outlook.",
      },
      {
        pair: "Solana (SOL)",
        text: "Solana continues outperforming many large-cap cryptocurrencies, supported by strong ecosystem activity and improving market sentiment. Technical indicators remain bullish, with the next resistance located near $172. Sustained trading above $160 would keep the positive structure intact, while a decline below $158 could trigger temporary profit-taking.",
      },
    ],
    qa: [
      { q: "Why is Bitcoin consolidating?", a: "Investors are waiting for major macroeconomic events, including U.S. inflation data and Federal Reserve commentary, before establishing new positions." },
      { q: "What is Bitcoin's key breakout level?", a: "A sustained move above $118,500 could confirm renewed bullish momentum." },
      { q: "Why is Ethereum holding above $3,000?", a: "Strong institutional demand and continued buying around psychological support have helped Ethereum remain resilient." },
      { q: "Which altcoin currently shows the strongest momentum?", a: "Among the major altcoins, Solana continues displaying one of the strongest technical structures with bullish momentum remaining intact." },
    ],
    takeaways: [
      "Bitcoin remains in a healthy consolidation above major support.",
      "Ethereum continues holding the important $3,000 psychological level.",
      "XRP remains stable while Solana maintains bullish momentum.",
      "Overall crypto market sentiment remains cautiously optimistic.",
      "U.S. inflation data and Federal Reserve commentary are expected to be the primary catalysts for the next major move across cryptocurrency markets.",
    ],
  },
  {
    slug: "commodity-july-13-2026",
    date: "July 13, 2026",
    tag: "Commodity",
    title: "Commodity Markets Mixed as Gold Holds Firm While Oil Extends Gains",
    image: "/assets/Commodity july13.jpeg",
    summary:
      "Commodity markets traded with mixed momentum as gold remained supported by safe-haven demand, while crude oil extended its rally amid geopolitical tensions and supply concerns. Industrial metals were largely range-bound as investors awaited fresh inflation data and central bank guidance.",
    overview:
      "Global commodity markets began the week cautiously as investors balanced geopolitical risks against expectations for upcoming economic data. Gold continued to attract defensive buying due to uncertainty in global markets, while silver followed with moderate gains. Crude oil prices remained elevated on concerns over potential supply disruptions and stronger seasonal demand. Meanwhile, copper traded sideways as traders assessed China's economic outlook and global manufacturing activity. Market participants are closely watching this week's U.S. CPI inflation report, Federal Reserve commentary, and Chinese economic releases, which could significantly influence commodity prices.",
    bullets: [
      "Gold remains above key support as safe-haven demand strengthens.",
      "WTI and Brent crude extend gains amid geopolitical tensions.",
      "Silver continues consolidating near recent highs.",
      "Copper trades sideways as investors await fresh China data.",
      "Traders focus on U.S. inflation and central bank events for the next major catalyst.",
    ],
    pairs: [
      { pair: "Gold (XAU/USD)", sentiment: "Bullish", direction: "Buy", rsi: "61", resistance: "3,420 / 3,465", support: "3,330 / 3,280", suggestion: "Buy above 3,345 / TP 3,420 / SL 3,305" },
      { pair: "Silver (XAG/USD)", sentiment: "Bullish", direction: "Buy", rsi: "58", resistance: "39.20 / 40.00", support: "37.80 / 36.90", suggestion: "Buy above 38.10 / TP 39.20 / SL 37.40" },
      { pair: "WTI Crude Oil", sentiment: "Bullish", direction: "Buy", rsi: "65", resistance: "74.80 / 76.50", support: "71.90 / 70.30", suggestion: "Buy above 72.50 / TP 74.80 / SL 71.30" },
      { pair: "Copper", sentiment: "Neutral", direction: "Hold", rsi: "51", resistance: "5.78 / 5.92", support: "5.55 / 5.42", suggestion: "Buy above 5.60 / TP 5.78 / SL 5.48" },
    ],
    commentary: [
      {
        pair: "Gold (XAU/USD)",
        text: "Gold continues trading with a positive bias as investors seek safety amid geopolitical uncertainty and expectations that global central banks may gradually ease monetary policy later this year. Momentum indicators remain constructive, with price holding above major moving averages. A sustained break above $3,420 could trigger another leg higher toward $3,465, while a fall below $3,330 may encourage short-term profit-taking.",
      },
      {
        pair: "Silver (XAG/USD)",
        text: "Silver remains supported by both industrial demand expectations and safe-haven buying. Technical indicators suggest buyers still maintain control despite recent consolidation. A move above $39.20 would strengthen bullish momentum, while failure to hold $37.80 could lead to a correction toward $36.90.",
      },
      {
        pair: "WTI Crude Oil",
        text: "WTI crude oil continues extending gains as geopolitical tensions increase concerns over global supply while seasonal fuel demand remains supportive. Most moving averages continue pointing higher, reinforcing the bullish structure. A breakout above $74.80 could open the door toward $76.50, whereas a decline below $71.90 would weaken the near-term outlook.",
      },
      {
        pair: "Copper",
        text: "Copper remains trapped in a narrow trading range as investors wait for stronger economic signals from China and other major manufacturing economies. Momentum indicators remain neutral, suggesting consolidation may continue. A breakout above 5.78 could attract fresh buying interest, while a break below 5.55 may increase downside pressure.",
      },
    ],
    qa: [
      { q: "Why is gold remaining strong?", a: "Safe-haven demand and expectations of future monetary policy easing continue supporting gold prices." },
      { q: "Why are oil prices rising?", a: "Geopolitical tensions, supply concerns, and stronger seasonal demand are supporting crude oil." },
      { q: "What is the biggest risk for commodity markets this week?", a: "The U.S. CPI inflation report and central bank commentary could significantly impact both precious metals and energy markets." },
      { q: "Which commodity currently has the strongest technical outlook?", a: "WTI crude oil and gold continue showing the strongest bullish momentum among major commodities." },
    ],
    takeaways: [
      "Gold remains supported by strong safe-haven demand.",
      "Crude oil continues trading with a bullish bias amid supply concerns.",
      "Silver maintains a positive structure despite short-term consolidation.",
      "Copper remains range-bound while traders await stronger economic data.",
      "U.S. inflation figures and central bank commentary are expected to determine the next major move across commodity markets.",
    ],
  },
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
