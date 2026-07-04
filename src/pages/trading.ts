import { PageHero, CtaSection, FeatureGrid, StepList, BackLink, icons } from "./layout";

/* ─── Trading Overview ─── */
export function TradingPage(): string {
  const instruments = [
    { href: "#/trading/flex",       label: "Flex",         desc: "Trade with multipliers. Amplify gains on any market movement.", badge: "🔥 Popular" },
    { href: "#/trading/fixed-time", label: "Fixed Time",   desc: "Predict price direction in a fixed duration. Know your max risk.", badge: "" },
    { href: "#/trading/forex",      label: "Forex",        desc: "Trade 70+ currency pairs 24/5 with tight spreads.", badge: "💱 Most liquid" },
    { href: "#/trading/stocks",     label: "Stocks",       desc: "CFDs on Apple, Tesla, Amazon, Google and hundreds more.", badge: "" },
    { href: "#/trading/assets",     label: "Indices",      desc: "Trade global indices: S&P 500, NASDAQ, FTSE and more.", badge: "" },
    { href: "#/trading/assets",     label: "Crypto",       desc: "Bitcoin, Ethereum, Litecoin and 30+ crypto assets.", badge: "" },
  ];

  return `
  ${BackLink()}
  ${PageHero("Trade Any Market,<br/>Any Time", "Access Forex, Stocks, Crypto, Indices and more — all from one account with ultra-fast execution.", "Trading")}

  <section class="py-16 bg-ink-950">
    <div class="container-rk">
      <h2 class="reveal text-center text-2xl font-bold sm:text-3xl mb-10">Choose your trading instrument</h2>
      <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        ${instruments.map(i => `
          <a href="${i.href}" class="reveal card p-6 transition-all hover:ring-rk-green hover:ring-1 block">
            <div class="flex items-start justify-between gap-2 mb-3">
              <h3 class="text-xl font-bold text-white">${i.label}</h3>
              ${i.badge ? `<span class="text-xs font-semibold text-rk-green bg-rk-green/10 rounded-full px-2.5 py-1">${i.badge}</span>` : ""}
            </div>
            <p class="text-sm text-white/55 leading-relaxed">${i.desc}</p>
            <span class="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-rk-green">Learn more ${icons.chevronRight}</span>
          </a>`).join("")}
      </div>
    </div>
  </section>

  ${FeatureGrid([
    { icon: "⚡", title: "Lightning Fast Execution", desc: "Trade orders are executed in under 100ms. No slippage, no requotes." },
    { icon: "🛡️", title: "Regulated Broker", desc: "RK247 is a fully licensed and regulated broker operating in 130+ countries." },
    { icon: "💰", title: "Start from $1", desc: "Open a real account and start trading with just $1. No barriers to entry." },
    { icon: "📱", title: "Trade Anywhere", desc: "Desktop, mobile or web — your account syncs across all devices." },
    { icon: "📊", title: "Advanced Charting", desc: "Professional-grade charts with 100+ indicators and drawing tools." },
    { icon: "🎓", title: "Learning Resources", desc: "Access free tutorials, strategy guides and live webinars." },
  ]).replace('<div class="grid', '<div class="container-rk pb-16 grid')}

  ${CtaSection("Start Trading Today", "Open a free account in under 2 minutes. No credit card required.")}`;
}

/* ─── Flex Trading ─── */
export function FlexPage(): string {
  return `
  ${BackLink("← Back to Trading")}
  ${PageHero("Flex Trading", "Multiply your profits on any market move. Set your own multiplier and trade smarter.", "Trading · Flex")}

  <section class="py-16 bg-ink-950">
    <div class="container-rk max-w-4xl">
      <div class="reveal card p-8 sm:p-12 mb-8">
        <h2 class="text-2xl font-bold mb-4">What is Flex Trading?</h2>
        <p class="text-white/60 leading-relaxed">
          Flex is RK247's most powerful instrument. It lets you trade with a
          multiplier — amplifying both potential profits and potential losses by a
          chosen factor. With Stop Loss and Take Profit built in, you always know
          the maximum you can lose before you open any trade.
        </p>
      </div>

      <h2 class="reveal text-xl font-bold mb-6">How Flex works</h2>
      ${StepList([
        { num: "1", title: "Pick an asset", desc: "Choose from Forex pairs, stocks, crypto, indices or commodities." },
        { num: "2", title: "Set your multiplier", desc: "Choose multiplier from x2 up to x1000. The higher the multiplier, the larger the movement amplification." },
        { num: "3", title: "Set Stop Loss & Take Profit", desc: "Define your risk appetite before opening the trade. These are guaranteed." },
        { num: "4", title: "Open your trade", desc: "Tap Up or Down and your Flex trade is live. Monitor it in real time." },
      ])}
    </div>
  </section>

  ${FeatureGrid([
    { icon: "📈", title: "Multiplier up to ×1000", desc: "Amplify your exposure on any asset up to 1000x your initial stake." },
    { icon: "🛡️", title: "Guaranteed Stop Loss", desc: "Your Stop Loss is always honoured, even during market gaps." },
    { icon: "💡", title: "No hidden fees", desc: "A small overnight fee applies if you hold past midnight. No other charges." },
    { icon: "🔄", title: "Close anytime", desc: "Close your Flex trade any time before it hits SL/TP." },
    { icon: "💵", title: "From $1", desc: "Open a Flex trade with as little as $1." },
    { icon: "📱", title: "All assets available", desc: "Forex, Stocks, Crypto, Commodities and Indices — all on Flex." },
  ]).replace('<div class="grid', '<div class="container-rk pb-16 grid')}

  ${CtaSection("Try Flex Trading Free", "Practice first with $10,000 virtual money. No risk, no commitment.")}`;
}

/* ─── Fixed Time Trading ─── */
export function FixedTimePage(): string {
  return `
  ${BackLink("← Back to Trading")}
  ${PageHero("Fixed Time Trading", "Predict price direction in a set timeframe. Know your profit and max loss before you trade.", "Trading · Fixed Time")}

  <section class="py-16 bg-ink-950">
    <div class="container-rk max-w-4xl">
      <div class="reveal card p-8 sm:p-12 mb-10">
        <h2 class="text-2xl font-bold mb-4">How Fixed Time Trading works</h2>
        <p class="text-white/60 leading-relaxed mb-4">
          Fixed Time is simple: choose an asset, decide whether the price will
          go <strong class="text-white">UP ↑</strong> or <strong class="text-white">DOWN ↓</strong>,
          pick a duration (5 seconds to 24 hours) and invest any amount from $1.
        </p>
        <p class="text-white/60 leading-relaxed">
          If your prediction is correct at expiry, you earn up to 96% profit.
          If incorrect, you lose only your invested amount — nothing more.
        </p>
      </div>

      <div class="reveal grid gap-4 sm:grid-cols-2 mb-12">
        <div class="card p-6 text-center">
          <div class="text-4xl mb-3">↑</div>
          <h3 class="font-bold text-rk-green text-xl">UP</h3>
          <p class="mt-2 text-sm text-white/55">Predict the asset price will be higher at expiry. Win up to 96%.</p>
        </div>
        <div class="card p-6 text-center">
          <div class="text-4xl mb-3">↓</div>
          <h3 class="font-bold text-red-400 text-xl">DOWN</h3>
          <p class="mt-2 text-sm text-white/55">Predict the asset price will be lower at expiry. Win up to 96%.</p>
        </div>
      </div>

      <h2 class="reveal text-xl font-bold mb-6">Key advantages</h2>
      ${FeatureGrid([
        { icon: "⏱️", title: "Durations from 5 seconds", desc: "Trade in ultra-short timeframes or go long with up to 24-hour expiry." },
        { icon: "💯", title: "Up to 96% return", desc: "High payout rates on correct predictions, fixed before you trade." },
        { icon: "🎯", title: "Simple mechanics", desc: "Just UP or DOWN — perfect for beginners and experienced traders alike." },
        { icon: "💰", title: "Min $1 trade", desc: "Low entry point makes Fixed Time accessible to everyone." },
        { icon: "📊", title: "100+ assets", desc: "Currency pairs, stocks, crypto, commodities — all available." },
        { icon: "📱", title: "Trade on any device", desc: "Mobile, tablet or desktop — seamless experience everywhere." },
      ])}
    </div>
  </section>

  ${CtaSection("Start Fixed Time Trading", "Open a free account and get $10,000 demo balance instantly.")}`;
}

/* ─── Forex Trading ─── */
export function ForexPage(): string {
  const pairs = [
    ["EUR/USD", "1.0842", "+0.08%"],
    ["GBP/USD", "1.2715", "+0.12%"],
    ["USD/JPY", "151.32", "-0.05%"],
    ["AUD/USD", "0.6583", "+0.04%"],
    ["USD/CAD", "1.3621", "-0.07%"],
    ["EUR/GBP", "0.8523", "+0.03%"],
  ];
  return `
  ${BackLink("← Back to Trading")}
  ${PageHero("Forex Trading", "Trade the world's most liquid market — $7.5 trillion in daily volume — with tight spreads and instant execution.", "Trading · Forex")}

  <section class="py-16 bg-ink-950">
    <div class="container-rk">
      <h2 class="reveal text-xl font-bold mb-6 text-center">Live Forex Rates (Sample)</h2>
      <div class="reveal card overflow-hidden mb-12 mx-auto max-w-2xl">
        <table class="w-full text-sm">
          <thead>
            <tr class="border-b border-white/10 text-white/40 text-xs uppercase">
              <th class="text-left px-5 py-3">Pair</th>
              <th class="text-right px-5 py-3">Price</th>
              <th class="text-right px-5 py-3">Change</th>
            </tr>
          </thead>
          <tbody>
            ${pairs.map(([pair, price, chg]) => `
            <tr class="border-b border-white/5 hover:bg-white/[0.02]">
              <td class="px-5 py-3.5 font-semibold">${pair}</td>
              <td class="px-5 py-3.5 text-right font-mono">${price}</td>
              <td class="px-5 py-3.5 text-right font-semibold ${chg.startsWith("+") ? "text-rk-green" : "text-red-400"}">${chg}</td>
            </tr>`).join("")}
          </tbody>
        </table>
      </div>

      ${FeatureGrid([
        { icon: "💱", title: "70+ Currency Pairs", desc: "Majors, minors, and exotics. Trade any pair with competitive spreads." },
        { icon: "🕐", title: "24/5 Market Access", desc: "Forex markets are open 24 hours, 5 days a week." },
        { icon: "⚡", title: "From 0.0 pips Spread", desc: "Ultra-tight spreads on major pairs with no re-quotes." },
        { icon: "🔧", title: "Leverage up to 1:1000", desc: "Control large positions with a small deposit using flexible leverage." },
        { icon: "📉", title: "Short Selling Allowed", desc: "Profit from both rising and falling markets equally." },
        { icon: "🌍", title: "All Major Sessions", desc: "Trade London, New York, Tokyo and Sydney sessions without limits." },
      ])}
    </div>
  </section>

  ${CtaSection("Trade Forex Now", "Start with a free demo or open a live account from $1.")}`;
}

/* ─── Stocks Trading ─── */
export function StocksPage(): string {
  const stocks = [
    { name: "Apple Inc.", ticker: "AAPL", sector: "Technology" },
    { name: "Tesla Inc.", ticker: "TSLA", sector: "Automotive" },
    { name: "Amazon.com", ticker: "AMZN", sector: "E-commerce" },
    { name: "Microsoft", ticker: "MSFT", sector: "Technology" },
    { name: "Meta Platforms", ticker: "META", sector: "Social Media" },
    { name: "Alphabet Inc.", ticker: "GOOGL", sector: "Technology" },
    { name: "Netflix Inc.", ticker: "NFLX", sector: "Streaming" },
    { name: "NVIDIA Corp.", ticker: "NVDA", sector: "Semiconductors" },
  ];
  return `
  ${BackLink("← Back to Trading")}
  ${PageHero("Stocks Trading", "Invest in global companies you know and love — all as CFDs with no ownership required.", "Trading · Stocks")}

  <section class="py-16 bg-ink-950">
    <div class="container-rk">
      <h2 class="reveal text-xl font-bold mb-6 text-center">Popular Stocks on RK247</h2>
      <div class="reveal grid gap-3 sm:grid-cols-2 lg:grid-cols-4 mb-16">
        ${stocks.map(s => `
          <div class="card p-4">
            <p class="text-xs text-white/40 mb-1">${s.sector}</p>
            <p class="font-bold">${s.name}</p>
            <p class="text-rk-green text-sm font-semibold mt-1">${s.ticker}</p>
          </div>`).join("")}
      </div>

      ${FeatureGrid([
        { icon: "🏢", title: "500+ Global Stocks", desc: "Apple, Tesla, Samsung, Alibaba and hundreds of other top companies." },
        { icon: "💹", title: "Long & Short", desc: "Go long to profit from rising prices or short to profit from falling prices." },
        { icon: "📱", title: "Real-time Prices", desc: "Live streaming prices directly from global exchanges." },
        { icon: "⚙️", title: "No Commission", desc: "Trade stocks as CFDs with no brokerage commission — just the spread." },
        { icon: "📅", title: "Extended Hours", desc: "Trade pre-market and after-hours on select US stocks." },
        { icon: "🛡️", title: "Risk Management", desc: "Stop Loss, Take Profit, and Negative Balance Protection on all stock trades." },
      ])}
    </div>
  </section>

  ${CtaSection("Start Trading Stocks", "Buy and sell the world's most popular stocks from just $1.")}`;
}

/* ─── How To Trade ─── */
export function HowToTradePage(): string {
  return `
  ${BackLink("← Back to Trading")}
  ${PageHero("How to Trade on RK247", "Get started in minutes. Follow these simple steps to begin your trading journey.", "Trading · Guide")}

  <section class="py-16 bg-ink-950">
    <div class="container-rk max-w-3xl">
      ${StepList([
        {
          num: "1",
          title: "Create your account",
          desc: "Register in under 2 minutes with just your email and a password. No credit card required to start.",
        },
        {
          num: "2",
          title: "Practice with a Demo",
          desc: "Get $10,000 in virtual money to practice risk-free. Learn how the platform works before risking real funds.",
        },
        {
          num: "3",
          title: "Make your first deposit",
          desc: "Fund your real account from $1 via bank card, e-wallet or bank transfer. Instant deposits.",
        },
        {
          num: "4",
          title: "Choose an asset",
          desc: "Browse 300+ assets: Forex pairs, stocks, crypto, indices and commodities. Use filters to find your preferred market.",
        },
        {
          num: "5",
          title: "Set your trade parameters",
          desc: "Choose your investment amount, duration or multiplier, and set Stop Loss / Take Profit levels.",
        },
        {
          num: "6",
          title: "Open your trade",
          desc: "Click UP or DOWN and your trade is live. Monitor it in real time and close whenever you choose.",
        },
        {
          num: "7",
          title: "Withdraw your profit",
          desc: "Withdraw your earnings quickly and easily — same-day processing available on most methods.",
        },
      ])}

      <div class="mt-16">
        <h2 class="reveal text-xl font-bold mb-6">Tips for beginners</h2>
        ${FeatureGrid([
          { icon: "📚", title: "Start with a Demo", desc: "Always practice on the demo account before trading with real money." },
          { icon: "💡", title: "Learn the basics", desc: "Visit the Learning Center for free courses on technical and fundamental analysis." },
          { icon: "⚠️", title: "Manage your risk", desc: "Never invest more than you can afford to lose. Use Stop Loss on every trade." },
          { icon: "📉", title: "Keep a trading journal", desc: "Record every trade to track what strategies work for you." },
          { icon: "🧘", title: "Control your emotions", desc: "Stick to your strategy. Don't chase losses or over-trade." },
          { icon: "🤝", title: "Ask for help", desc: "Our 24/7 support team is always available to answer your questions." },
        ])}
      </div>
    </div>
  </section>

  ${CtaSection("Begin Your Trading Journey", "Create a free account and start with a demo — no deposit needed.")}`;
}

/* ─── Account ─── */
export function AccountPage(): string {
  const features = [
    ["Min. deposit", "$1"],
    ["Max. leverage", "1:1000"],
    ["Min. trade size", "$1"],
    ["Base currencies", "USD, EUR, GBP, BRL, INR, NGN +more"],
    ["Instruments", "300+ assets"],
    ["Demo balance", "$10,000 virtual"],
    ["Withdrawal", "Same-day processing"],
    ["Support", "24/7 multilingual"],
  ];
  return `
  ${BackLink("← Back to Trading")}
  ${PageHero("Standard Trading Account", "Everything you need to trade professionally — from just $1.", "Trading · Account")}

  <section class="py-16 bg-ink-950">
    <div class="container-rk max-w-4xl">
      <div class="reveal card overflow-hidden mb-12">
        <div class="border-b border-white/10 px-6 py-4">
          <h2 class="font-bold text-lg">Account Specifications</h2>
        </div>
        <div class="divide-y divide-white/5">
          ${features.map(([k, v]) => `
          <div class="flex items-center justify-between px-6 py-4">
            <span class="text-sm text-white/50">${k}</span>
            <span class="text-sm font-semibold text-white">${v}</span>
          </div>`).join("")}
        </div>
      </div>

      ${FeatureGrid([
        { icon: "✅", title: "Instant Account Opening", desc: "Verify your email and start trading within minutes. No paperwork." },
        { icon: "💳", title: "Multiple Currencies", desc: "Hold your account in USD, EUR, GBP and 10+ other currencies." },
        { icon: "🔒", title: "Negative Balance Protection", desc: "You can never lose more than your deposited funds. Ever." },
        { icon: "🎁", title: "Bonus Eligible", desc: "Standard accounts qualify for all deposit bonuses and promotions." },
        { icon: "📊", title: "Full Platform Access", desc: "Signals, strategies, analytics tools and learning materials — all included." },
        { icon: "🌐", title: "Trade Globally", desc: "Available in 130+ countries with local payment method support." },
      ])}
    </div>
  </section>

  ${CtaSection("Open Your Account Now", "It takes less than 2 minutes. Start trading today.")}`;
}

/* ─── Islamic Account ─── */
export function IslamicAccountPage(): string {
  return `
  ${BackLink("← Back to Trading")}
  ${PageHero("Islamic Account", "Trade in full compliance with Islamic finance principles. Swap-free, always.", "Trading · Islamic")}

  <section class="py-16 bg-ink-950">
    <div class="container-rk max-w-4xl">
      <div class="reveal card p-8 sm:p-12 mb-10">
        <h2 class="text-2xl font-bold mb-4">What is an Islamic Account?</h2>
        <p class="text-white/60 leading-relaxed mb-4">
          An Islamic Account (also called a Swap-Free Account) is designed for
          traders who observe Islamic finance principles, which prohibit the
          payment or receipt of interest (Riba).
        </p>
        <p class="text-white/60 leading-relaxed">
          On RK247's Islamic Account, no overnight swap or rollover interest is
          charged or credited on open positions held past the daily cutoff.
          All other features remain identical to the Standard Account.
        </p>
      </div>

      ${FeatureGrid([
        { icon: "🕌", title: "No Swap / No Riba", desc: "Positions held overnight incur zero swap interest charges. Fully Halal." },
        { icon: "✅", title: "Same Features", desc: "Full access to all 300+ assets, tools, bonuses and the complete platform." },
        { icon: "💰", title: "From $1", desc: "Same low minimum deposit as the Standard Account — just $1." },
        { icon: "⚡", title: "Instant Activation", desc: "Enable Islamic mode instantly from your account settings." },
        { icon: "🛡️", title: "Regulated", desc: "The same regulated and licensed broker. Your funds are fully protected." },
        { icon: "🤝", title: "Dedicated Support", desc: "Our multilingual support team understands your specific needs." },
      ])}
    </div>
  </section>

  ${CtaSection("Open Islamic Account", "Create your swap-free account today. Start trading according to your principles.")}`;
}

/* ─── Demo Account ─── */
export function DemoPage(): string {
  return `
  ${BackLink("← Back to Trading")}
  ${PageHero("Free Demo Account", "Practice trading risk-free with $10,000 in virtual money. No deposit required.", "Trading · Demo")}

  <section class="py-16 bg-ink-950">
    <div class="container-rk max-w-4xl">
      <div class="reveal grid gap-6 sm:grid-cols-3 mb-14 text-center">
        <div class="card p-8">
          <p class="text-4xl font-extrabold text-rk-green">$10,000</p>
          <p class="mt-2 text-sm text-white/55">Virtual balance to practice with</p>
        </div>
        <div class="card p-8">
          <p class="text-4xl font-extrabold text-rk-green">300+</p>
          <p class="mt-2 text-sm text-white/55">Real assets to trade on demo</p>
        </div>
        <div class="card p-8">
          <p class="text-4xl font-extrabold text-rk-green">0</p>
          <p class="mt-2 text-sm text-white/55">Risk — it's all virtual money</p>
        </div>
      </div>

      ${FeatureGrid([
        { icon: "🎯", title: "Identical to Live", desc: "The demo uses real market prices. Your skills transfer directly to live trading." },
        { icon: "♾️", title: "Unlimited Resets", desc: "Run out of virtual money? Reset your demo balance any time for free." },
        { icon: "📈", title: "All Instruments", desc: "Practice on Forex, Stocks, Crypto, Fixed Time, Flex and everything in between." },
        { icon: "🚀", title: "No Time Limit", desc: "Keep your demo account forever. There's no expiry on your practice period." },
        { icon: "🛠️", title: "Full Toolset", desc: "Signals, indicators, charts and all analytics tools are active on demo." },
        { icon: "🔄", title: "Switch Anytime", desc: "Toggle between demo and real accounts with a single tap." },
      ])}
    </div>
  </section>

  ${CtaSection("Get Your Free Demo Account", "Register now and receive $10,000 virtual money instantly.")}`;
}

/* ─── Promotions ─── */
export function PromotionsPage(): string {
  const promos = [
    {
      badge: "🎁 Deposit Bonus",
      title: "100% Deposit Bonus",
      desc: "Double your first deposit with a 100% match bonus. Trade with double the funds and withdraw your profits.",
      tag: "New clients",
    },
    {
      badge: "💸 Cashback",
      title: "Weekly Cashback",
      desc: "Earn up to 5% cashback every week based on your trading volume. The more you trade, the more you get back.",
      tag: "All traders",
    },
    {
      badge: "🏆 Tournament",
      title: "Trading Championships",
      desc: "Compete in demo or live trading contests with prize pools up to $50,000. Top the leaderboard and win big.",
      tag: "Competitive traders",
    },
    {
      badge: "👥 Referral",
      title: "Refer a Friend",
      desc: "Invite friends to RK247 and earn a cash bonus for every successful referral. No limits on how much you earn.",
      tag: "Existing clients",
    },
  ];
  return `
  ${BackLink("← Back to Trading")}
  ${PageHero("Promotions & Bonuses", "Exclusive offers to boost your trading power. More funds, more opportunities.", "Trading · Promotions")}

  <section class="py-16 bg-ink-950">
    <div class="container-rk">
      <div class="grid gap-6 sm:grid-cols-2 mb-12">
        ${promos.map(p => `
          <div class="reveal card p-6 sm:p-8">
            <div class="flex items-start justify-between gap-2 mb-4">
              <span class="text-sm font-semibold text-rk-green">${p.badge}</span>
              <span class="text-xs bg-white/5 text-white/50 rounded-full px-3 py-1">${p.tag}</span>
            </div>
            <h3 class="text-xl font-bold mb-3">${p.title}</h3>
            <p class="text-sm text-white/55 leading-relaxed">${p.desc}</p>
            <button class="mt-5 btn-green" data-wa>Claim Offer</button>
          </div>`).join("")}
      </div>

      <div class="reveal card p-6 bg-ink-800">
        <h3 class="font-bold mb-2">Terms & Conditions</h3>
        <p class="text-sm text-white/40 leading-relaxed">
          All promotions are subject to terms and conditions. Bonuses have wagering requirements before withdrawal.
          RK247 reserves the right to modify or cancel promotions at any time. Please trade responsibly.
          Trading involves risk and may not be suitable for all investors.
        </p>
      </div>
    </div>
  </section>

  ${CtaSection("Claim Your Bonus Today", "Register or log in to activate your preferred promotion.")}`;
}

/* ─── Withdrawals ─── */
export function WithdrawalsPage(): string {
  const methods = [
    { name: "Bank Card", icon: "💳", time: "Instant – 3 days", min: "$5", max: "$5,000/day" },
    { name: "Bank Wire", icon: "🏦", time: "1 – 3 business days", min: "$10", max: "Unlimited" },
    { name: "E-Wallet", icon: "📲", time: "Instant – 24h", min: "$1", max: "$20,000/day" },
    { name: "Crypto", icon: "₿", time: "30 min – 2h", min: "$10", max: "Unlimited" },
  ];
  return `
  ${BackLink("← Back to Trading")}
  ${PageHero("Withdrawals", "Fast, secure and fee-free withdrawals. Your money is always accessible.", "Trading · Withdrawals")}

  <section class="py-16 bg-ink-950">
    <div class="container-rk">
      <h2 class="reveal text-xl font-bold mb-6 text-center">Withdrawal methods</h2>
      <div class="reveal card overflow-hidden mb-14 max-w-3xl mx-auto">
        <div class="hidden sm:grid grid-cols-4 border-b border-white/10 text-xs uppercase text-white/40 px-5 py-3">
          <span>Method</span><span class="text-center">Processing</span><span class="text-center">Min</span><span class="text-right">Max / day</span>
        </div>
        ${methods.map(m => `
          <div class="border-b border-white/5 px-5 py-4 flex flex-col sm:grid sm:grid-cols-4 gap-1 sm:gap-0 sm:items-center">
            <span class="font-semibold flex items-center gap-2">${m.icon} ${m.name}</span>
            <span class="text-sm text-white/55 sm:text-center">${m.time}</span>
            <span class="text-sm text-white/55 sm:text-center">${m.min}</span>
            <span class="text-sm text-rk-green font-semibold sm:text-right">${m.max}</span>
          </div>`).join("")}
      </div>

      ${FeatureGrid([
        { icon: "⚡", title: "Same-day Processing", desc: "Most withdrawals are processed the same business day you request them." },
        { icon: "🚫", title: "No Withdrawal Fees", desc: "RK247 does not charge any fees on withdrawals. Third-party fees may apply." },
        { icon: "🔒", title: "Secure & Encrypted", desc: "All transactions use bank-grade TLS encryption and 2FA protection." },
        { icon: "✅", title: "Simple Verification", desc: "One-time KYC verification required for first withdrawal — takes minutes." },
        { icon: "💱", title: "Multi-currency", desc: "Withdraw in your account currency with transparent conversion rates." },
        { icon: "📞", title: "24/7 Support", desc: "Contact support at any time if you have questions about your withdrawal." },
      ])}
    </div>
  </section>

  ${CtaSection("Withdraw Your Profits", "Log in to your account or contact support to initiate a withdrawal.")}`;
}

/* ─── Assets & Trading Conditions ─── */
export function AssetsPage(): string {
  const categories = [
    {
      name: "Forex",
      count: "70+",
      examples: "EUR/USD · GBP/USD · USD/JPY · AUD/USD · USD/CHF",
      spread: "From 0.0 pips",
    },
    {
      name: "Stocks",
      count: "500+",
      examples: "AAPL · TSLA · AMZN · MSFT · NVDA · META",
      spread: "From 0.1%",
    },
    {
      name: "Indices",
      count: "30+",
      examples: "S&P 500 · NASDAQ · FTSE 100 · DAX · Nikkei",
      spread: "From 0.4 pts",
    },
    {
      name: "Commodities",
      count: "20+",
      examples: "Gold · Silver · Oil (WTI) · Brent · Natural Gas",
      spread: "From $0.3",
    },
    {
      name: "Crypto",
      count: "35+",
      examples: "BTC · ETH · LTC · XRP · BNB · SOL",
      spread: "From 0.5%",
    },
    {
      name: "ETFs",
      count: "40+",
      examples: "SPY · QQQ · GLD · VTI · IWM · ARKK",
      spread: "From 0.2%",
    },
  ];
  return `
  ${BackLink("← Back to Trading")}
  ${PageHero("Assets & Trading Conditions", "300+ instruments across 6 asset classes. Tight spreads, fast execution.", "Trading · Assets")}

  <section class="py-16 bg-ink-950">
    <div class="container-rk">
      <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 mb-14">
        ${categories.map(c => `
          <div class="reveal card p-6">
            <div class="flex items-baseline gap-2 mb-3">
              <h3 class="text-xl font-bold">${c.name}</h3>
              <span class="text-sm font-semibold text-rk-green">${c.count} assets</span>
            </div>
            <p class="text-xs text-white/40 mb-3 font-mono">${c.examples}</p>
            <div class="flex items-center justify-between border-t border-white/10 pt-3 mt-3">
              <span class="text-xs text-white/40">Spread</span>
              <span class="text-xs font-semibold text-rk-green">${c.spread}</span>
            </div>
          </div>`).join("")}
      </div>

      <div class="reveal card p-6 max-w-3xl mx-auto mb-6">
        <h3 class="font-bold mb-4">General Conditions</h3>
        <div class="grid gap-3 text-sm">
          ${[
            ["Execution", "Market execution < 100ms"],
            ["Leverage", "Up to 1:1000 (instrument dependent)"],
            ["Min. trade", "$1"],
            ["Stop out", "20% margin level"],
            ["Hedging", "Allowed"],
            ["Scalping", "Allowed"],
            ["EAs / Bots", "Allowed"],
          ].map(([k, v]) => `
            <div class="flex justify-between border-b border-white/5 pb-3">
              <span class="text-white/45">${k}</span>
              <span class="font-semibold">${v}</span>
            </div>`).join("")}
        </div>
      </div>
    </div>
  </section>

  ${CtaSection("Trade Any Asset Today", "Open a free account and access all 300+ instruments instantly.")}`;
}
