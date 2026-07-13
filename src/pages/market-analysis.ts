import { PageHero, CtaSection, BackLink, icons } from "./layout";

export function MarketAnalysisPage(): string {
  return `
  ${BackLink()}
  ${PageHero(
    "Market Analysis",
    "Daily trends, technical insights and key levels for Forex, stocks, indices and crypto. Updated every day by the RK247 research team.",
    "Research"
  )}

  <article class="py-16 bg-ink-950">
    <div class="container-rk">
      <div class="grid gap-8 lg:grid-cols-3">
        <!-- Main content -->
        <div class="lg:col-span-2 space-y-8">
          <div class="reveal card p-6 sm:p-8">
            <div class="flex flex-wrap items-center gap-3 mb-4">
              <span class="text-xs font-semibold text-rk-green bg-rk-green/10 rounded-full px-2.5 py-1">Forex</span>
              <span class="text-xs text-white/40">July 13, 2026</span>
            </div>
            <h1 class="text-2xl sm:text-3xl font-bold mb-4 leading-tight">Forex Market Mixed as Safe-Haven Dollar Gains on Geopolitical Tensions</h1>

            <div class="space-y-6 text-white/60 leading-relaxed">
              <div>
                <h2 class="text-lg font-bold text-white mb-2">Headline Summary</h2>
                <p>The forex market opened the week cautiously as the U.S. dollar strengthened on renewed safe-haven demand following escalating geopolitical tensions. Traders are now focused on U.S. CPI inflation data, Fed Chair testimony, UK GDP, and the Bank of Canada policy decision for the next major directional move.</p>
              </div>

              <div>
                <h2 class="text-lg font-bold text-white mb-2">Market Overview</h2>
                <p>Global currency markets remain relatively range-bound despite increased volatility caused by geopolitical developments in the Middle East. The U.S. dollar attracted fresh buying as investors sought safety after higher oil prices increased inflation concerns.</p>
                <p class="mt-3">EUR/USD remains under pressure below key resistance, while GBP/USD has pulled back after recent gains. USD/JPY continues trading near multi-year highs as the Bank of Japan maintains an accommodative stance. Commodity-linked currencies including AUD and NZD remain weak due to stronger dollar demand and global risk aversion.</p>
              </div>

              <div>
                <h2 class="text-lg font-bold text-white mb-3">Major News Bullets</h2>
                <ul class="space-y-2">
                  <li class="flex gap-2"><span class="text-rk-green">•</span> U.S. Dollar strengthens as investors seek safe-haven assets.</li>
                  <li class="flex gap-2"><span class="text-rk-green">•</span> EUR/USD remains capped below 1.1450 resistance.</li>
                  <li class="flex gap-2"><span class="text-rk-green">•</span> GBP/USD slips as higher oil prices weigh on sterling.</li>
                  <li class="flex gap-2"><span class="text-rk-green">•</span> USD/JPY trades near long-term highs with bullish momentum intact.</li>
                  <li class="flex gap-2"><span class="text-rk-green">•</span> Traders await U.S. CPI, Fed testimony and UK GDP for fresh market direction.</li>
                </ul>
              </div>

              <div>
                <h2 class="text-lg font-bold text-white mb-3">Technical Summary</h2>
                <div class="overflow-x-auto">
                  <table class="w-full text-left text-xs sm:text-sm border border-white/10 rounded-xl overflow-hidden">
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
                      <tr>
                        <td class="px-3 py-2 font-semibold">EUR/USD</td>
                        <td class="px-3 py-2 text-red-400">Bearish</td>
                        <td class="px-3 py-2">Sell</td>
                        <td class="px-3 py-2">42</td>
                        <td class="px-3 py-2">1.1438 / 1.1456</td>
                        <td class="px-3 py-2">1.1364 / 1.1347</td>
                        <td class="px-3 py-2">Sell below 1.1360</td>
                      </tr>
                      <tr>
                        <td class="px-3 py-2 font-semibold">GBP/USD</td>
                        <td class="px-3 py-2 text-yellow-400">Neutral-Bearish</td>
                        <td class="px-3 py-2">Sell</td>
                        <td class="px-3 py-2">45</td>
                        <td class="px-3 py-2">1.3450 / 1.3550</td>
                        <td class="px-3 py-2">1.3330 / 1.3200</td>
                        <td class="px-3 py-2">Sell below 1.3330</td>
                      </tr>
                      <tr>
                        <td class="px-3 py-2 font-semibold">USD/JPY</td>
                        <td class="px-3 py-2 text-rk-green">Bullish</td>
                        <td class="px-3 py-2">Buy</td>
                        <td class="px-3 py-2">63</td>
                        <td class="px-3 py-2">162.80 / 164.00</td>
                        <td class="px-3 py-2">160.80 / 159.60</td>
                        <td class="px-3 py-2">Buy above 161.20</td>
                      </tr>
                      <tr>
                        <td class="px-3 py-2 font-semibold">AUD/USD</td>
                        <td class="px-3 py-2 text-red-400">Bearish</td>
                        <td class="px-3 py-2">Sell</td>
                        <td class="px-3 py-2">41</td>
                        <td class="px-3 py-2">0.7000 / 0.7050</td>
                        <td class="px-3 py-2">0.6920 / 0.6880</td>
                        <td class="px-3 py-2">Sell below 0.6920</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div>
                <h2 class="text-lg font-bold text-white mb-3">Analyst Commentary Per Pair</h2>
                <div class="space-y-4">
                  <div>
                    <h3 class="font-semibold text-white mb-1">EUR/USD</h3>
                    <p>EUR/USD continues consolidating below the important 1.1450 resistance zone as demand for the U.S. dollar remains firm. Rising energy prices and stronger dollar sentiment continue to pressure the euro. Technical indicators remain slightly bearish, and a break below 1.1360 could expose the 1.1300 support area. A sustained move above 1.1450 would invalidate the immediate bearish outlook.</p>
                  </div>
                  <div>
                    <h3 class="font-semibold text-white mb-1">GBP/USD</h3>
                    <p>GBP/USD has retreated after reaching recent highs as geopolitical uncertainty and stronger dollar demand reduced sterling's momentum. The pair remains supported above 1.3300, but failure to hold this area could trigger additional downside toward 1.3200. Bulls need a break above 1.3450 to regain control.</p>
                  </div>
                  <div>
                    <h3 class="font-semibold text-white mb-1">USD/JPY</h3>
                    <p>USD/JPY remains one of the strongest major currency pairs, supported by widening interest-rate differentials and continued demand for the U.S. dollar. Momentum indicators remain positive. A move above 162.80 could extend the rally toward 164.00, while a drop below 160.80 would weaken the bullish structure.</p>
                  </div>
                  <div>
                    <h3 class="font-semibold text-white mb-1">AUD/USD</h3>
                    <p>AUD/USD remains under pressure as risk sentiment weakens and investors rotate into the U.S. dollar. The pair continues trading below major moving averages, with sellers targeting 0.6880 if 0.6920 support fails. Recovery above 0.7000 would improve the near-term outlook.</p>
                  </div>
                </div>
              </div>

              <div>
                <h2 class="text-lg font-bold text-white mb-3">AI Q&A</h2>
                <div class="space-y-3">
                  <div>
                    <p class="font-semibold text-white">Q: Why is the U.S. dollar strengthening?</p>
                    <p class="text-white/55">A: Safe-haven demand has increased due to geopolitical tensions and expectations that higher energy prices could keep inflation elevated.</p>
                  </div>
                  <div>
                    <p class="font-semibold text-white">Q: What is the key level for EUR/USD?</p>
                    <p class="text-white/55">A: 1.1450 remains the major resistance, while 1.1360 is the immediate support.</p>
                  </div>
                  <div>
                    <p class="font-semibold text-white">Q: Why is USD/JPY still bullish?</p>
                    <p class="text-white/55">A: Higher U.S. yields and policy divergence between the Federal Reserve and Bank of Japan continue supporting the pair.</p>
                  </div>
                  <div>
                    <p class="font-semibold text-white">Q: Which events could move the forex market this week?</p>
                    <p class="text-white/55">A: U.S. CPI inflation, Fed Chair testimony, UK GDP, and the Bank of Canada interest-rate decision are expected to be the primary market catalysts.</p>
                  </div>
                </div>
              </div>

              <div>
                <h2 class="text-lg font-bold text-white mb-3">Key Takeaways</h2>
                <ul class="space-y-2">
                  <li class="flex gap-2"><span class="text-rk-green">•</span> Safe-haven demand continues supporting the U.S. Dollar.</li>
                  <li class="flex gap-2"><span class="text-rk-green">•</span> EUR/USD and GBP/USD remain under bearish pressure below major resistance.</li>
                  <li class="flex gap-2"><span class="text-rk-green">•</span> USD/JPY continues trading with a bullish bias.</li>
                  <li class="flex gap-2"><span class="text-rk-green">•</span> AUD/USD remains vulnerable as risk sentiment weakens.</li>
                  <li class="flex gap-2"><span class="text-rk-green">•</span> This week's U.S. inflation data and central bank events are likely to determine the next major trend across the forex market.</li>
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
              <li class="flex gap-2"><span class="text-rk-green">•</span> U.S. Dollar strengthens on safe-haven demand</li>
              <li class="flex gap-2"><span class="text-rk-green">•</span> EUR/USD capped below 1.1450</li>
              <li class="flex gap-2"><span class="text-rk-green">•</span> USD/JPY near long-term highs</li>
              <li class="flex gap-2"><span class="text-rk-green">•</span> U.S. CPI and Fed testimony due this week</li>
            </ul>
          </div>

          <div class="reveal card p-6">
            <h3 class="font-bold mb-4">Popular Instruments</h3>
            <div class="flex flex-wrap gap-2">
              ${["EUR/USD", "GBP/USD", "USD/JPY", "AUD/USD", "Gold", "USD Index", "U.S. CPI"]
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
  </article>

  ${CtaSection("Trade the Market Today", "Apply today's analysis on RK247 with a free demo or live account.")}`;
}
