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
    slug: "crypto-july-15-2026",
    date: "July 15, 2026",
    tag: "Crypto",
    title: "Crypto Markets Recover: Bitcoin Climbs on Weaker Dollar and Improving Risk Sentiment",
    image: "/assets/crypto july 15.jpeg",
    summary:
      "The cryptocurrency market traded higher on July 15, 2026, with Bitcoin and Ethereum posting gains after softer U.S. inflation data weakened the U.S. Dollar and improved investor appetite for risk assets. Traders are now monitoring U.S. PPI data and further Federal Reserve commentary for the next major catalyst.",
    overview:
      "Digital asset markets strengthened following the release of lower-than-expected U.S. CPI figures, which reduced expectations for near-term Federal Reserve tightening. The weaker U.S. Dollar supported risk assets, helping Bitcoin reclaim higher levels while Ethereum and major altcoins followed. Institutional interest remained stable, and overall crypto market sentiment improved as investors anticipated a more accommodative monetary policy environment. However, trading volumes remained moderate ahead of additional U.S. economic data.",
    bullets: [
      "Bitcoin extends gains after softer U.S. inflation data.",
      "Ethereum outperforms as market sentiment improves.",
      "Solana and XRP trade higher alongside Bitcoin.",
      "Crypto market capitalization rebounds as the U.S. Dollar weakens.",
      "Investors await U.S. PPI data and further Federal Reserve guidance.",
    ],
    pairs: [
      { pair: "Bitcoin (BTC)", sentiment: "Bullish", direction: "Buy", rsi: "61", resistance: "66,800 / 68,500", support: "64,200 / 62,800", suggestion: "Buy above 64,800 / TP 66,800 / SL 63,900" },
      { pair: "Ethereum (ETH)", sentiment: "Bullish", direction: "Buy", rsi: "60", resistance: "3,180 / 3,320", support: "3,020 / 2,900", suggestion: "Buy above 3,050 / TP 3,180 / SL 2,980" },
      { pair: "XRP", sentiment: "Neutral-Bullish", direction: "Buy", rsi: "56", resistance: "2.62 / 2.75", support: "2.42 / 2.30", suggestion: "Buy above 2.48 / TP 2.62 / SL 2.38" },
      { pair: "Solana (SOL)", sentiment: "Bullish", direction: "Buy", rsi: "63", resistance: "156 / 165", support: "146 / 140", suggestion: "Buy above 148 / TP 156 / SL 143" },
    ],
    commentary: [
      {
        pair: "Bitcoin (BTC)",
        text: "Bitcoin extended its recovery as softer U.S. inflation data boosted demand for risk assets. The decline in the U.S. Dollar and Treasury yields provided additional support for the world's largest cryptocurrency. A sustained move above $66,800 could accelerate bullish momentum toward $68,500, while $64,200 remains the key support zone.",
      },
      {
        pair: "Ethereum (ETH)",
        text: "Ethereum continued moving higher alongside Bitcoin as improving market sentiment encouraged fresh buying. Technical indicators remain constructive. A breakout above $3,180 could pave the way toward $3,320, while $3,020 remains immediate support.",
      },
      {
        pair: "XRP",
        text: "XRP maintained a positive bias as buyers defended the $2.42 support level. A move above $2.62 would strengthen bullish momentum, while a break below $2.42 could trigger short-term weakness.",
      },
      {
        pair: "Solana (SOL)",
        text: "Solana remained one of the strongest-performing major cryptocurrencies, supported by positive ecosystem activity and improving investor confidence. Holding above $146 keeps the bullish trend intact, while a breakout above $156 could open the path toward $165.",
      },
    ],
    qa: [
      { q: "Why is the crypto market rising today?", a: "Softer U.S. inflation data weakened the U.S. Dollar, improving investor appetite for risk assets such as cryptocurrencies." },
      { q: "Why is Bitcoin gaining strength?", a: "Lower expectations for additional Federal Reserve tightening supported Bitcoin as investors shifted toward higher-risk assets." },
      { q: "What is Bitcoin's next major resistance?", a: "The $66,800 level is the next important resistance, followed by $68,500." },
      { q: "What could move crypto markets next?", a: "Upcoming U.S. PPI data and additional Federal Reserve commentary are expected to influence short-term cryptocurrency price action." },
    ],
    takeaways: [
      "Bitcoin and Ethereum strengthened following softer U.S. inflation data.",
      "The weaker U.S. Dollar improved overall crypto market sentiment.",
      "Solana continues to outperform many large-cap cryptocurrencies.",
      "XRP remains stable above key technical support.",
      "U.S. PPI data and Federal Reserve guidance are expected to determine the next major move across the cryptocurrency market.",
      "This report is for informational purposes only and does not constitute financial advice.",
    ],
  },
  {
    slug: "indices-july-15-2026",
    date: "July 15, 2026",
    tag: "Indices",
    title: "Global Indices Trade Mixed: Investors Assess Inflation Outlook and Earnings Season",
    image: "/assets/Indices july 15.jpeg",
    summary:
      "Global stock markets traded mixed on July 15, 2026, as investors welcomed softer U.S. inflation data but remained cautious ahead of major corporate earnings and additional Federal Reserve commentary. Lower Treasury yields supported technology stocks, while geopolitical tensions continued to limit overall market optimism.",
    overview:
      "Global equity markets showed mixed performance following the release of softer-than-expected U.S. CPI data. The easing inflation reading strengthened expectations that the Federal Reserve could adopt a less aggressive monetary policy stance later this year. U.S. futures edged higher, led by gains in technology stocks, while European markets remained cautious. Asian markets closed mostly positive as improving investor sentiment outweighed concerns over global economic growth. Market participants are now focusing on major U.S. bank earnings, Producer Price Index (PPI) data, and speeches from Federal Reserve officials for further market direction.",
    bullets: [
      "U.S. stock futures rise after softer inflation data.",
      "Nasdaq leads gains as technology shares strengthen.",
      "S&P 500 remains near record highs.",
      "Investors await major U.S. bank earnings this week.",
      "Markets shift focus toward U.S. PPI and Federal Reserve commentary.",
    ],
    pairs: [
      { pair: "S&P 500", sentiment: "Bullish", direction: "Buy", rsi: "60", resistance: "6,380 / 6,450", support: "6,270 / 6,200", suggestion: "Buy above 6,300 / TP 6,380 / SL 6,240" },
      { pair: "Nasdaq 100", sentiment: "Bullish", direction: "Buy", rsi: "63", resistance: "23,250 / 23,600", support: "22,700 / 22,350", suggestion: "Buy above 22,900 / TP 23,250 / SL 22,650" },
      { pair: "Dow Jones", sentiment: "Neutral-Bullish", direction: "Buy", rsi: "56", resistance: "45,000 / 45,350", support: "44,300 / 43,950", suggestion: "Buy above 44,500 / TP 45,000 / SL 44,150" },
      { pair: "Nikkei 225", sentiment: "Bullish", direction: "Buy", rsi: "58", resistance: "40,950 / 41,400", support: "40,100 / 39,650", suggestion: "Buy above 40,300 / TP 40,950 / SL 39,900" },
    ],
    commentary: [
      {
        pair: "S&P 500",
        text: "The S&P 500 remains supported by improving expectations for Federal Reserve policy following softer U.S. inflation. Investors are optimistic that lower inflation could benefit corporate earnings and equity valuations. A breakout above 6,380 could extend gains toward 6,450, while 6,270 remains the first key support.",
      },
      {
        pair: "Nasdaq 100",
        text: "The Nasdaq 100 continues outperforming global indices as technology and AI-related companies attract renewed investor interest. Momentum indicators remain bullish. A sustained move above 23,250 could open the path toward 23,600, while 22,700 remains the nearest support.",
      },
      {
        pair: "Dow Jones",
        text: "The Dow Jones continues trading with moderate bullish momentum as investors rotate into financial and industrial sectors ahead of earnings season. Holding above 44,300 keeps the short-term uptrend intact, while a breakout above 45,000 would strengthen the bullish outlook.",
      },
      {
        pair: "Nikkei 225",
        text: "Japan's Nikkei 225 posted gains as improved global risk sentiment and a relatively weaker yen supported export-oriented companies. A move above 40,950 would confirm continued bullish momentum, while 40,100 remains an important support level.",
      },
    ],
    qa: [
      { q: "Why are stock markets improving today?", a: "Softer U.S. inflation data increased expectations that the Federal Reserve may take a less aggressive approach to monetary policy, supporting equity markets." },
      { q: "Which index is showing the strongest momentum?", a: "The Nasdaq 100 continues to outperform due to strength in technology and artificial intelligence stocks." },
      { q: "What is the biggest event for equity markets now?", a: "Investors are closely watching major U.S. corporate earnings, U.S. PPI inflation data, and further comments from Federal Reserve officials." },
      { q: "Which sectors are leading the market?", a: "Technology, communication services, and selected financial stocks are currently leading global equity markets." },
    ],
    takeaways: [
      "Global stock markets remain supported by softer U.S. inflation.",
      "Technology shares continue driving gains in the Nasdaq.",
      "The S&P 500 remains close to record highs.",
      "Investors are focused on corporate earnings and U.S. PPI data.",
      "Federal Reserve guidance will likely determine the next major direction for global equity markets.",
      "This report is for informational purposes only and does not constitute financial advice.",
    ],
  },
  {
    slug: "indices-july-14-2026",
    date: "July 14, 2026",
    tag: "Indices",
    title: "Global Indices Decline: Geopolitical Risks and Inflation Concerns Weigh on Sentiment",
    image: "/assets/global july 14.jpeg",
    summary:
      "Global equity markets traded lower on July 14, 2026, as investors reacted to renewed geopolitical tensions in the Middle East, rising oil prices, and caution ahead of the U.S. CPI report and Federal Reserve Chair Kevin Warsh's congressional testimony.",
    overview:
      "Global stock markets opened the session under pressure after escalating tensions between the United States and Iran boosted crude oil prices and reduced investors' appetite for risk. Wall Street closed lower overnight, led by weakness in technology shares, while most Asian markets also declined. European index futures pointed to a softer open as investors awaited U.S. inflation data and the start of the earnings season from major U.S. banks. Chinese equities outperformed regional peers after stronger-than-expected trade data helped support sentiment.",
    bullets: [
      "Global equities decline as geopolitical tensions intensify.",
      "Nasdaq leads U.S. market losses amid technology sector weakness.",
      "Oil prices surge, increasing inflation concerns.",
      "Chinese stocks outperform after stronger trade data.",
      "Investors focus on U.S. CPI, Fed testimony, and major bank earnings.",
    ],
    pairs: [
      { pair: "S&P 500", sentiment: "Neutral-Bearish", direction: "Sell", rsi: "48", resistance: "6,310 / 6,380", support: "6,180 / 6,100", suggestion: "Sell below 6,180 / TP 6,100 / SL 6,260" },
      { pair: "Nasdaq 100", sentiment: "Bearish", direction: "Sell", rsi: "44", resistance: "22,950 / 23,250", support: "22,300 / 22,000", suggestion: "Sell below 22,350 / TP 22,000 / SL 22,850" },
      { pair: "Dow Jones", sentiment: "Neutral", direction: "Hold", rsi: "50", resistance: "44,850 / 45,150", support: "44,200 / 43,900", suggestion: "Buy above 44,400 / TP 44,850 / SL 44,000" },
      { pair: "Nikkei 225", sentiment: "Bearish", direction: "Sell", rsi: "45", resistance: "40,600 / 41,100", support: "39,700 / 39,200", suggestion: "Sell below 39,900 / TP 39,300 / SL 40,500" },
    ],
    commentary: [
      {
        pair: "S&P 500",
        text: "The S&P 500 retreated as higher oil prices and geopolitical uncertainty prompted investors to reduce exposure to risk assets. Market participants are also waiting for today's U.S. inflation data before taking larger positions. A move above 6,310 could stabilize sentiment, while a break below 6,180 may increase downside pressure.",
      },
      {
        pair: "Nasdaq 100",
        text: "The Nasdaq underperformed major U.S. indices as semiconductor and AI-related technology stocks extended recent losses. Momentum indicators remain weak. A break below 22,300 could trigger additional selling, while a recovery above 22,950 would improve the short-term outlook.",
      },
      {
        pair: "Dow Jones",
        text: "The Dow Jones proved relatively resilient as gains in energy companies partially offset weakness across technology and growth sectors. Holding above 44,200 keeps the broader structure stable, while a breakout above 44,850 could attract renewed buying interest.",
      },
      {
        pair: "Nikkei 225",
        text: "Japan's Nikkei 225 declined as global risk sentiment weakened, although a softer yen continued providing some support to exporters. A sustained move above 40,600 could encourage recovery, while a fall below 39,700 would strengthen the bearish outlook.",
      },
    ],
    qa: [
      { q: "Why are global stock markets falling today?", a: "Rising geopolitical tensions, higher oil prices, and caution ahead of the U.S. CPI report have reduced investor risk appetite." },
      { q: "Why is the Nasdaq underperforming?", a: "Technology and semiconductor stocks came under pressure, making the Nasdaq the weakest major U.S. index." },
      { q: "What is today's biggest market event?", a: "The U.S. Consumer Price Index (CPI) release and Federal Reserve Chair Kevin Warsh's testimony are expected to drive market direction." },
      { q: "Which sector is outperforming today?", a: "Energy stocks are benefiting from higher crude oil prices despite weakness across the broader market." },
    ],
    takeaways: [
      "Global equity markets remain under pressure from geopolitical tensions.",
      "Higher oil prices have increased inflation concerns and reduced risk appetite.",
      "The Nasdaq continues to lead declines due to weakness in technology shares.",
      "Energy stocks remain comparatively resilient.",
      "U.S. inflation data, Federal Reserve commentary, and major corporate earnings are expected to determine the next major move for global stock indices.",
      "This report is for informational purposes only and does not constitute financial advice.",
    ],
  },
  {
    slug: "crypto-july-14-2026",
    date: "July 14, 2026",
    tag: "Crypto",
    title: "Crypto Markets Stabilize: Bitcoin Holds Support Ahead of U.S. CPI",
    image: "/assets/crypto july 14.jpeg",
    summary:
      "The cryptocurrency market traded cautiously on July 14, 2026, with Bitcoin holding above the $62,000 support zone despite continued geopolitical tensions and ETF outflows. Investors are awaiting the U.S. CPI inflation report and Federal Reserve commentary for the next major catalyst.",
    overview:
      "The crypto market remained relatively stable despite risk-off sentiment across global financial markets. Bitcoin and Ethereum traded in narrow ranges as traders refrained from opening large positions ahead of today's high-impact U.S. inflation data. Institutional demand remained mixed, with continued spot Bitcoin ETF outflows weighing on sentiment. However, buyers continued defending key technical support levels, helping the broader crypto market avoid another sharp decline. Major altcoins including Ethereum, XRP, Solana, and Dogecoin also consolidated as investors monitored macroeconomic developments and geopolitical risks.",
    bullets: [
      "Bitcoin remains above the $62,000 support zone.",
      "Ethereum trades sideways as buyers defend key support.",
      "Spot Bitcoin ETF outflows continue to pressure sentiment.",
      "Altcoins remain range-bound ahead of U.S. CPI.",
      "Traders await Federal Reserve commentary for the next market catalyst.",
    ],
    pairs: [
      { pair: "Bitcoin (BTC)", sentiment: "Neutral", direction: "Hold", rsi: "47", resistance: "64,200 / 66,000", support: "62,000 / 60,000", suggestion: "Buy above 62,500 / TP 64,200 / SL 61,200" },
      { pair: "Ethereum (ETH)", sentiment: "Neutral", direction: "Hold", rsi: "45", resistance: "3,020 / 3,150", support: "2,900 / 2,780", suggestion: "Buy above 2,930 / TP 3,020 / SL 2,860" },
      { pair: "XRP", sentiment: "Neutral-Bearish", direction: "Hold", rsi: "44", resistance: "2.52 / 2.65", support: "2.34 / 2.20", suggestion: "Buy above 2.40 / TP 2.52 / SL 2.30" },
      { pair: "Solana (SOL)", sentiment: "Neutral", direction: "Hold", rsi: "48", resistance: "150 / 158", support: "140 / 132", suggestion: "Buy above 144 / TP 150 / SL 138" },
    ],
    commentary: [
      {
        pair: "Bitcoin (BTC)",
        text: "Bitcoin continues trading above the important $62,000 support area despite persistent ETF outflows and geopolitical uncertainty. The broader trend remains cautious as traders await today's U.S. inflation report. A sustained move above $64,200 would improve the short-term outlook, while a break below $62,000 could expose the next support near $60,000.",
      },
      {
        pair: "Ethereum (ETH)",
        text: "Ethereum remains trapped in a narrow consolidation range as buyers defend the $2,900 support zone. Momentum indicators remain neutral. A breakout above $3,020 could trigger renewed buying interest, while a decline below $2,900 may increase selling pressure.",
      },
      {
        pair: "XRP",
        text: "XRP continues trading sideways with mixed momentum as the broader crypto market lacks a strong directional catalyst. Holding above $2.34 keeps the structure stable, while a move above $2.52 would strengthen the bullish outlook.",
      },
      {
        pair: "Solana (SOL)",
        text: "Solana remains relatively resilient despite weakness across the broader crypto sector. Price continues holding above major support levels. A breakout above $150 could signal renewed bullish momentum, while a decline below $140 would weaken the near-term outlook.",
      },
    ],
    qa: [
      { q: "Why is Bitcoin moving sideways?", a: "Investors are waiting for the U.S. CPI inflation report and Federal Reserve commentary before taking larger positions." },
      { q: "Why is crypto market sentiment cautious?", a: "Geopolitical tensions, higher interest-rate expectations, and continued ETF outflows are limiting risk appetite." },
      { q: "What is Bitcoin's key support level?", a: "The $62,000 area remains the most important near-term support for Bitcoin." },
      { q: "What could move the crypto market today?", a: "The U.S. CPI inflation report and Federal Reserve commentary are expected to be the primary drivers of cryptocurrency prices." },
    ],
    takeaways: [
      "Bitcoin remains stable above the critical $62,000 support level.",
      "Ethereum, XRP, and Solana continue consolidating in narrow ranges.",
      "ETF outflows continue to weigh on institutional sentiment.",
      "Traders are focused on today's U.S. inflation data and Federal Reserve guidance.",
      "A breakout from current consolidation ranges is likely to determine the next major move across the cryptocurrency market.",
      "This report is for informational purposes only and does not constitute financial advice.",
    ],
  },
  {
    slug: "commodity-july-14-2026",
    date: "July 14, 2026",
    tag: "Commodity",
    title: "Commodity Markets Mixed: Gold Rebounds While Oil Climbs on Supply Concerns",
    image: "/assets/Commodity july14.jpeg",
    summary:
      "Commodity markets traded with mixed momentum on July 14, 2026, as gold recovered from a two-week low while crude oil surged to a one-month high amid escalating geopolitical tensions in the Middle East. Investors are also awaiting the U.S. CPI report and Federal Reserve commentary for fresh direction.",
    overview:
      "Global commodity markets remained volatile as geopolitical risks continued to dominate investor sentiment. Gold rebounded after Monday's sharp decline, supported by bargain buying ahead of key U.S. inflation data. However, expectations that inflation could remain elevated and keep interest rates higher continue to limit the metal's upside. Meanwhile, crude oil extended its rally after renewed conflict involving the U.S. and Iran raised concerns over potential disruptions to oil shipments through the Strait of Hormuz. Industrial metals, including copper, remained relatively stable as traders monitored Chinese economic data and global manufacturing demand.",
    bullets: [
      "Gold rebounds after falling to a two-week low.",
      "Brent and WTI crude oil hit one-month highs on Middle East tensions.",
      "Silver posts modest gains while platinum trades slightly lower.",
      "Copper remains range-bound as investors assess China's economic outlook.",
      "Traders await U.S. CPI inflation data and Federal Reserve testimony.",
    ],
    pairs: [
      { pair: "Gold (XAU/USD)", sentiment: "Neutral-Bullish", direction: "Buy", rsi: "56", resistance: "4,050 / 4,100", support: "3,980 / 3,920", suggestion: "Buy above 4,020 / TP 4,080 / SL 3,975" },
      { pair: "Silver (XAG/USD)", sentiment: "Bullish", direction: "Buy", rsi: "59", resistance: "58.40 / 59.80", support: "56.80 / 55.90", suggestion: "Buy above 57.80 / TP 58.80 / SL 56.90" },
      { pair: "WTI Crude Oil", sentiment: "Bullish", direction: "Buy", rsi: "69", resistance: "81.20 / 83.00", support: "77.80 / 75.90", suggestion: "Buy above 79.00 / TP 81.20 / SL 77.80" },
      { pair: "Copper", sentiment: "Neutral", direction: "Hold", rsi: "51", resistance: "5.85 / 5.98", support: "5.62 / 5.48", suggestion: "Buy above 5.68 / TP 5.85 / SL 5.56" },
    ],
    commentary: [
      {
        pair: "Gold (XAU/USD)",
        text: "Gold recovered after touching a two-week low as investors positioned ahead of today's U.S. CPI report. While safe-haven demand offered support, higher bond yields and expectations of tighter monetary policy continue limiting upside momentum. A sustained move above $4,050 could strengthen bullish momentum toward $4,100, while a break below $3,980 may trigger another wave of selling.",
      },
      {
        pair: "Silver (XAG/USD)",
        text: "Silver continues trading with a constructive bias, benefiting from both precious metal demand and improving industrial sentiment. Technical indicators remain positive. A breakout above $58.40 could open the path toward $59.80, while support at $56.80 remains critical for maintaining the current uptrend.",
      },
      {
        pair: "WTI Crude Oil",
        text: "WTI crude oil remains the strongest-performing major commodity as geopolitical tensions increase fears of supply disruptions through the Strait of Hormuz. Momentum indicators remain firmly bullish. A break above $81.20 could accelerate gains toward $83.00, while support near $77.80 is expected to attract buyers on pullbacks.",
      },
      {
        pair: "Copper",
        text: "Copper continues moving sideways as investors evaluate Chinese economic activity and the outlook for global manufacturing demand. A breakout above 5.85 would improve the technical outlook, while a decline below 5.62 could trigger additional selling pressure.",
      },
    ],
    qa: [
      { q: "Why did gold recover today?", a: "Gold rebounded after reaching a two-week low as investors positioned ahead of the U.S. CPI report, although expectations of higher interest rates continue to cap gains." },
      { q: "Why are oil prices rising?", a: "Oil prices surged because escalating U.S.–Iran tensions increased concerns over potential supply disruptions through the Strait of Hormuz." },
      { q: "What is today's biggest event for commodity markets?", a: "The U.S. Consumer Price Index (CPI) release and Federal Reserve commentary are expected to have the greatest impact on gold, silver, and energy markets." },
      { q: "Which commodity currently has the strongest momentum?", a: "WTI crude oil continues displaying the strongest bullish technical structure as geopolitical risks support higher prices." },
    ],
    takeaways: [
      "Gold has rebounded after a sharp decline but remains sensitive to inflation and interest-rate expectations.",
      "Crude oil continues trading near one-month highs as geopolitical tensions threaten global supply.",
      "Silver maintains a constructive technical outlook.",
      "Copper remains range-bound while traders monitor economic data from China.",
      "Today's U.S. CPI report and Federal Reserve commentary are expected to determine the next major move across commodity markets.",
      "This report is for informational purposes only and does not constitute financial advice.",
    ],
  },
  {
    slug: "forex-july-14-2026",
    date: "July 14, 2026",
    tag: "Forex",
    title: "Forex Markets Hold Steady: Dollar Awaits U.S. CPI Report and Federal Reserve Testimony",
    image: "/assets/forex july 14.jpeg",
    summary:
      "Global forex markets traded cautiously on July 14, 2026, with the U.S. Dollar holding firm ahead of the June U.S. CPI report and Federal Reserve testimony. Safe-haven demand remains elevated due to ongoing Middle East tensions, while traders await fresh inflation data for clues on the Fed's next policy move.",
    overview:
      "The U.S. Dollar Index (DXY) remained near recent highs as investors refrained from taking aggressive positions before today's key economic events. EUR/USD and GBP/USD traded in narrow ranges, while USD/JPY stayed close to multi-decade highs as pressure on the Japanese yen persisted. Commodity-linked currencies, including the Australian and New Zealand dollars, were supported by stronger commodity prices but remained sensitive to overall risk sentiment. Markets are primarily focused on the U.S. Consumer Price Index (CPI), Fed Chair Kevin Warsh's congressional testimony, and additional speeches from Federal Reserve officials, all of which could determine the short-term direction of major currency pairs.",
    bullets: [
      "U.S. Dollar remains firm ahead of today's CPI inflation report.",
      "EUR/USD consolidates near 1.1400 as traders await fresh catalysts.",
      "Japanese Yen remains under pressure despite intervention concerns.",
      "Australian and New Zealand dollars recover modestly.",
      "Middle East tensions continue supporting safe-haven demand for the U.S. Dollar.",
    ],
    pairs: [
      { pair: "EUR/USD", sentiment: "Neutral-Bearish", direction: "Sell", rsi: "45", resistance: "1.1435 / 1.1470", support: "1.1365 / 1.1320", suggestion: "Sell below 1.1365 / TP 1.1320 / SL 1.1445" },
      { pair: "GBP/USD", sentiment: "Neutral", direction: "Hold", rsi: "49", resistance: "1.3400 / 1.3460", support: "1.3320 / 1.3270", suggestion: "Buy above 1.3360 / TP 1.3450 / SL 1.3300" },
      { pair: "USD/JPY", sentiment: "Bullish", direction: "Buy", rsi: "64", resistance: "163.00 / 164.20", support: "161.60 / 160.80", suggestion: "Buy above 162.00 / TP 163.80 / SL 161.20" },
      { pair: "AUD/USD", sentiment: "Neutral-Bearish", direction: "Sell", rsi: "46", resistance: "0.7015 / 0.7060", support: "0.6945 / 0.6900", suggestion: "Sell below 0.6945 / TP 0.6900 / SL 0.7015" },
    ],
    commentary: [
      {
        pair: "EUR/USD",
        text: "EUR/USD continues consolidating around the 1.1400 area as traders await the U.S. inflation report. Momentum remains weak while the stronger U.S. Dollar limits upside potential. A sustained move above 1.1435 could improve sentiment toward 1.1470, while a break below 1.1365 may expose 1.1320.",
      },
      {
        pair: "GBP/USD",
        text: "Sterling remains relatively stable after recent volatility. Traders are balancing expectations for U.K. economic growth against continued strength in the U.S. Dollar. Holding above 1.3320 keeps the short-term structure intact, while a breakout above 1.3400 could encourage further buying.",
      },
      {
        pair: "USD/JPY",
        text: "USD/JPY continues trading near long-term highs as interest-rate differentials favor the U.S. Dollar. Momentum indicators remain bullish. A break above 163.00 could extend gains toward 164.20, while intervention concerns may increase volatility if prices rise further.",
      },
      {
        pair: "AUD/USD",
        text: "The Australian Dollar remains under pressure despite improved commodity prices. Traders remain cautious ahead of U.S. inflation data and broader global risk developments. Support at 0.6945 remains critical. A break lower could accelerate losses toward 0.6900, while recovery above 0.7015 would improve the short-term outlook.",
      },
    ],
    qa: [
      { q: "Why is the forex market quiet today?", a: "Investors are waiting for the U.S. CPI report and Federal Reserve testimony before taking larger positions." },
      { q: "Why is the U.S. Dollar remaining strong?", a: "Safe-haven demand, rising oil prices, and expectations that inflation could remain elevated continue supporting the Dollar." },
      { q: "What is today's biggest forex event?", a: "The U.S. Consumer Price Index (CPI) release, followed by Federal Reserve Chair Kevin Warsh's testimony before Congress." },
      { q: "Which currency pair looks strongest technically?", a: "USD/JPY continues displaying the strongest bullish momentum among the major currency pairs." },
    ],
    takeaways: [
      "Forex markets remain cautious ahead of today's major U.S. economic events.",
      "The U.S. Dollar continues benefiting from safe-haven demand.",
      "USD/JPY maintains the strongest bullish technical structure.",
      "EUR/USD and GBP/USD remain trapped in consolidation ranges.",
      "The CPI report and Federal Reserve commentary are expected to determine the next major move across the forex market.",
      "This report is for informational purposes only and does not constitute financial advice.",
    ],
  },
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
