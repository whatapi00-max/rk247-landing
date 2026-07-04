import { PageHero, CtaSection, FeatureGrid, BackLink, icons } from "./layout";

/* ─── About Company ─── */
export function AboutPage(): string {
  const stats = [
    { value: "11+", label: "Years of excellence" },
    { value: "130+", label: "Countries served" },
    { value: "50M+", label: "Registered traders" },
    { value: "24/7", label: "Customer support" },
  ];
  return `
  ${BackLink()}
  ${PageHero("About RK247", "Empowering traders worldwide with the tools, education and technology to trade with confidence.", "About")}

  <section class="py-16 bg-ink-950">
    <div class="container-rk">
      <div class="reveal grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-16">
        ${stats.map(s => `
          <div class="card p-6 text-center">
            <p class="text-4xl font-extrabold text-rk-green">${s.value}</p>
            <p class="mt-2 text-sm text-white/55">${s.label}</p>
          </div>`).join("")}
      </div>

      <div class="reveal card p-8 sm:p-12 mb-12 max-w-4xl mx-auto">
        <h2 class="text-2xl font-bold mb-4">Our Story</h2>
        <p class="text-white/60 leading-relaxed mb-4">
          Founded in 2014, RK247 started with a simple mission: make online trading
          accessible, transparent and profitable for everyone — not just Wall Street
          professionals.
        </p>
        <p class="text-white/60 leading-relaxed mb-4">
          Over 11 years we have grown into one of the world's leading online brokers,
          serving clients in 130+ countries and processing millions of trades every day.
          Our platform is available in 20+ languages, and our support team is online
          24 hours a day, 7 days a week.
        </p>
        <p class="text-white/60 leading-relaxed">
          We are regulated, licensed and committed to maintaining the highest standards
          of financial integrity and client fund protection.
        </p>
      </div>

      <h2 class="reveal text-2xl font-bold text-center mb-10">Our Values</h2>
      ${FeatureGrid([
        { icon: "🔒", title: "Security First", desc: "Client funds are held in segregated accounts. We are licensed by multiple financial regulators." },
        { icon: "🌍", title: "Global Reach", desc: "Serving traders in 130+ countries with localised payment methods and multilingual support." },
        { icon: "📚", title: "Education", desc: "We invest heavily in free educational content so every trader can build real skills." },
        { icon: "⚡", title: "Innovation", desc: "Continuously improving our platform with cutting-edge technology and user feedback." },
        { icon: "🤝", title: "Transparency", desc: "Clear pricing, no hidden fees, and honest communication with every client." },
        { icon: "🌱", title: "Sustainability", desc: "Committed to responsible business practices and long-term client relationships." },
      ])}
    </div>
  </section>

  ${CtaSection("Join the RK247 Community", "Trade with a broker you can trust. Open your free account today.")}`;
}

/* ─── Contacts ─── */
export function ContactsPage(): string {
  return `
  ${BackLink("← Back to About")}
  ${PageHero("Contact Us", "Our team is available 24/7. Reach out any time and we'll respond fast.", "About · Contacts")}

  <section class="py-16 bg-ink-950">
    <div class="container-rk max-w-4xl">
      <div class="reveal grid gap-6 sm:grid-cols-2 mb-12">
        <div class="card p-8 text-center">
          <div class="text-4xl mb-3">💬</div>
          <h3 class="font-bold text-xl mb-2">Live Chat & WhatsApp</h3>
          <p class="text-sm text-white/55 mb-5">Instant response, 24/7. The fastest way to reach our support team.</p>
          <button class="btn-green w-full" data-wa>Chat on WhatsApp</button>
        </div>
        <div class="card p-8 text-center">
          <div class="text-4xl mb-3">📧</div>
          <h3 class="font-bold text-xl mb-2">Email Support</h3>
          <p class="text-sm text-white/55 mb-5">Send a detailed query. We reply within 2 hours on business days.</p>
          <a href="mailto:support@rk247.com" class="btn-ghost w-full">support@rk247.com</a>
        </div>
      </div>

      <div class="reveal card p-8 mb-8">
        <h3 class="font-bold mb-6">Support hours</h3>
        <div class="grid gap-3 text-sm">
          ${[
            ["Live Chat / WhatsApp", "24/7 — Every day of the year"],
            ["Email", "Mon – Fri, 00:00 – 24:00 UTC"],
            ["Deposits & Withdrawals", "Mon – Fri, 07:00 – 20:00 UTC"],
            ["VIP Support", "24/7 for Gold & Platinum clients"],
          ].map(([k, v]) => `
            <div class="flex flex-col sm:flex-row sm:justify-between border-b border-white/5 pb-3 gap-1">
              <span class="text-white/45">${k}</span>
              <span class="font-semibold text-white">${v}</span>
            </div>`).join("")}
        </div>
      </div>

      <div class="reveal card p-8">
        <h3 class="font-bold mb-4">Languages Supported</h3>
        <div class="flex flex-wrap gap-2">
          ${["English","Hindi","Arabic","Portuguese","Spanish","Russian","Turkish","Indonesian","Thai","Vietnamese","Bengali","Swahili","French","German","Italian","Polish"].map(l => `
            <span class="rounded-full bg-white/5 px-3 py-1.5 text-xs font-medium text-white/70">${l}</span>`).join("")}
        </div>
      </div>
    </div>
  </section>

  ${CtaSection("Need Help? We're Here.", "Message us now and get an instant response from our support team.")}`;
}

/* ─── Social Media ─── */
export function SocialPage(): string {
  const channels = [
    {
      icon: icons.facebook,
      name: "Facebook",
      handle: "@RK247Official",
      desc: "Trading tips, market news and community posts. 500K+ followers.",
      color: "bg-blue-600/10 ring-blue-600/30",
      label: "Follow on Facebook",
    },
    {
      icon: icons.instagram,
      name: "Instagram",
      handle: "@rk247_official",
      desc: "Infographics, trader stories and platform screenshots.",
      color: "bg-pink-600/10 ring-pink-600/30",
      label: "Follow on Instagram",
    },
    {
      icon: icons.telegram,
      name: "Telegram",
      handle: "t.me/rk247",
      desc: "Free daily trading signals, market analysis and live alerts.",
      color: "bg-sky-500/10 ring-sky-500/30",
      label: "Join Telegram",
    },
    {
      icon: icons.youtube,
      name: "YouTube",
      handle: "youtube.com/rk247",
      desc: "Free trading tutorials, strategy breakdowns and live webinars.",
      color: "bg-red-600/10 ring-red-600/30",
      label: "Subscribe on YouTube",
    },
  ];
  return `
  ${BackLink("← Back to About")}
  ${PageHero("Follow Us on Social Media", "Stay connected — get free signals, market news and trading education.", "About · Social")}

  <section class="py-16 bg-ink-950">
    <div class="container-rk">
      <div class="grid gap-6 sm:grid-cols-2 mb-16">
        ${channels.map(c => `
          <div class="reveal card p-8 ring-1 ${c.color}">
            <div class="flex items-center gap-4 mb-4">
              <div class="text-white text-2xl">${c.icon}</div>
              <div>
                <h3 class="font-bold text-lg">${c.name}</h3>
                <p class="text-xs text-white/40">${c.handle}</p>
              </div>
            </div>
            <p class="text-sm text-white/55 mb-5 leading-relaxed">${c.desc}</p>
            <button class="btn-ghost" data-wa>${c.label}</button>
          </div>`).join("")}
      </div>

      <div class="reveal card p-8 text-center max-w-2xl mx-auto">
        <h2 class="text-xl font-bold mb-3">Get Free Daily Signals</h2>
        <p class="text-white/55 text-sm mb-6">
          Join our Telegram channel and receive free trading signals every morning —
          with entry, stop loss and take profit levels included.
        </p>
        <button class="btn-green px-10 py-3.5" data-wa>Join Free Signals Channel</button>
      </div>
    </div>
  </section>

  ${CtaSection("Start Trading with the Community", "Join thousands of active traders on RK247 today.")}`;
}

/* ─── Awards ─── */
export function AwardsPage(): string {
  const awards = [
    { year: "2024", title: "Best Trading App", org: "Global Finance Awards", icon: "🏆" },
    { year: "2024", title: "Most Trusted Online Broker", org: "FinanceWorld Summit", icon: "🥇" },
    { year: "2023", title: "Best Mobile Trading Platform", org: "TradeTech Annual", icon: "📱" },
    { year: "2023", title: "Best Broker for Beginners", org: "Investing.com Awards", icon: "🎯" },
    { year: "2022", title: "Best Customer Service", org: "ForexPeaceArmy", icon: "🤝" },
    { year: "2022", title: "Innovation in Trading Technology", org: "FXReport Awards", icon: "⚡" },
    { year: "2021", title: "Best Forex Broker — Asia Pacific", org: "Asia Pacific Finance", icon: "🌏" },
    { year: "2020", title: "Best Multi-Asset Broker", org: "TraderPoll Annual", icon: "📊" },
  ];
  return `
  ${BackLink("← Back to About")}
  ${PageHero("Awards & Recognition", "Over a decade of industry recognition — here's why traders trust RK247.", "About · Awards")}

  <section class="py-16 bg-ink-950">
    <div class="container-rk">
      <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-16">
        ${awards.map(a => `
          <div class="reveal card p-6 text-center">
            <div class="text-4xl mb-3">${a.icon}</div>
            <p class="text-rk-green text-xs font-semibold mb-2">${a.year}</p>
            <h3 class="font-bold text-sm mb-1">${a.title}</h3>
            <p class="text-xs text-white/40">${a.org}</p>
          </div>`).join("")}
      </div>

      ${FeatureGrid([
        { icon: "📜", title: "Licensed & Regulated", desc: "RK247 holds licences from multiple tier-1 financial regulators worldwide." },
        { icon: "🔐", title: "Segregated Client Funds", desc: "Your money is kept separately from company operational funds at all times." },
        { icon: "🌐", title: "IFSC Regulated", desc: "International Financial Services Commission oversight for global operations." },
        { icon: "📋", title: "Annual Audits", desc: "Independent external financial audits conducted every year." },
        { icon: "💼", title: "Professional Indemnity", desc: "All operations covered by professional indemnity insurance." },
        { icon: "✅", title: "KYC/AML Compliant", desc: "Full compliance with Know Your Customer and Anti-Money Laundering laws." },
      ])}
    </div>
  </section>

  ${CtaSection("Trade with an Award-Winning Broker", "Open your account with a platform recognised for excellence.")}`;
}

/* ─── News ─── */
export function NewsPage(): string {
  const articles = [
    {
      date: "July 2026",
      tag: "Platform Update",
      title: "RK247 Launches New Algorithmic Trading Features",
      desc: "Our latest platform update introduces EA builder tools, advanced backtesting and improved API access for automated traders.",
    },
    {
      date: "June 2026",
      tag: "Market Analysis",
      title: "Q2 2026 Market Review: What Moved the Markets",
      desc: "A look back at the major currency movements, stock rallies and crypto swings that defined Q2 2026.",
    },
    {
      date: "May 2026",
      tag: "Company News",
      title: "RK247 Reaches 50 Million Registered Traders",
      desc: "We are proud to announce that RK247 has crossed the milestone of 50 million registered users across 130 countries.",
    },
    {
      date: "April 2026",
      tag: "Promotions",
      title: "New 100% Deposit Bonus Available for All New Clients",
      desc: "Starting this month, all new clients can claim a 100% deposit bonus on their first deposit, capped at $5,000.",
    },
    {
      date: "March 2026",
      tag: "Platform Update",
      title: "Copy Trading Feature Now Live on RK247",
      desc: "Follow and automatically copy the trades of top-performing traders on RK247 with our new Copy Trading module.",
    },
    {
      date: "February 2026",
      tag: "Awards",
      title: "RK247 Wins Best Trading App at Global Finance Awards 2026",
      desc: "For the second consecutive year, RK247 has been awarded Best Trading App at the prestigious Global Finance Awards.",
    },
  ];
  return `
  ${BackLink("← Back to About")}
  ${PageHero("Latest News", "Company updates, market insights and platform announcements.", "About · News")}

  <section class="py-16 bg-ink-950">
    <div class="container-rk">
      <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 mb-12">
        ${articles.map(a => `
          <article class="reveal card p-6 flex flex-col">
            <div class="flex items-center gap-2 mb-3">
              <span class="text-xs font-semibold text-rk-green bg-rk-green/10 rounded-full px-2.5 py-1">${a.tag}</span>
              <span class="text-xs text-white/35">${a.date}</span>
            </div>
            <h3 class="font-bold text-base mb-2 flex-1">${a.title}</h3>
            <p class="text-sm text-white/50 leading-relaxed">${a.desc}</p>
          </article>`).join("")}
      </div>
    </div>
  </section>

  ${CtaSection("Stay Updated with RK247", "Follow us on social media for daily market news and platform updates.")}`;
}

/* ─── Reviews ─── */
export function ReviewsPage(): string {
  const reviews = [
    {
      name: "Arjun M.",
      country: "India",
      stars: 5,
      text: "I've been trading on RK247 for 3 years. The platform is fast, withdrawals are always processed same day. No issues ever. 10/10.",
      date: "June 2026",
    },
    {
      name: "Sarah O.",
      country: "Nigeria",
      stars: 5,
      text: "The demo account is amazing — I practiced for 2 weeks before going live. Now I make consistent profits. RK247 changed my life.",
      date: "May 2026",
    },
    {
      name: "Marco R.",
      country: "Brazil",
      stars: 5,
      text: "Best customer support in the industry. They replied in under 1 minute on WhatsApp and solved my problem instantly.",
      date: "May 2026",
    },
    {
      name: "Fatima K.",
      country: "Pakistan",
      stars: 5,
      text: "The Islamic account option is exactly what I needed. No swap, full access to all features. Highly recommended for Muslim traders.",
      date: "April 2026",
    },
    {
      name: "Chen W.",
      country: "Malaysia",
      stars: 4,
      text: "Very smooth mobile app. I trade on my phone during breaks and it works perfectly. Would love more crypto pairs but overall great.",
      date: "April 2026",
    },
    {
      name: "Emmanuel N.",
      country: "Ghana",
      stars: 5,
      text: "Fast deposits and fast withdrawals via mobile money. The local payment support is incredible. RK247 really understands our market.",
      date: "March 2026",
    },
  ];

  const starBar = (n: number) => "★".repeat(n) + "☆".repeat(5 - n);

  return `
  ${BackLink("← Back to About")}
  ${PageHero("Trader Reviews", "Real feedback from real traders on RK247. See what our community says.", "About · Reviews")}

  <section class="py-16 bg-ink-950">
    <div class="container-rk">
      <div class="reveal card p-8 text-center mb-12 max-w-sm mx-auto">
        <p class="text-5xl font-extrabold text-rk-green">4.8</p>
        <p class="text-yellow-400 text-xl my-2">★★★★★</p>
        <p class="text-sm text-white/50">Based on 120,000+ verified reviews</p>
      </div>

      <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 mb-12">
        ${reviews.map(r => `
          <div class="reveal card p-6">
            <div class="flex items-start justify-between mb-3">
              <div>
                <p class="font-semibold text-sm">${r.name}</p>
                <p class="text-xs text-white/40">${r.country} · ${r.date}</p>
              </div>
              <span class="text-yellow-400 text-sm">${starBar(r.stars)}</span>
            </div>
            <p class="text-sm text-white/60 leading-relaxed">"${r.text}"</p>
          </div>`).join("")}
      </div>

      <div class="text-center">
        <p class="text-sm text-white/40 mb-4">Verified reviews from Trustpilot, Google, and App Store</p>
        <button class="btn-ghost" data-wa>Leave Your Review</button>
      </div>
    </div>
  </section>

  ${CtaSection("Join 50 Million Happy Traders", "Experience the platform that traders rate 4.8 stars. Sign up free.")}`;
}
