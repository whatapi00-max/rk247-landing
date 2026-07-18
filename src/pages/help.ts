import { PageHero, CtaSection, FeatureGrid, BackLink, icons } from "./layout";

/* ─── Support ─── */
export function SupportPage(): string {
  const topics = [
    { icon: "💳", title: "Deposits", desc: "Issues with depositing funds, payment methods, or transaction delays." },
    { icon: "💸", title: "Withdrawals", desc: "Help with withdrawing funds, verification, or processing times." },
    { icon: "🔑", title: "Account Access", desc: "Trouble logging in, password reset, or 2FA issues." },
    { icon: "📊", title: "Trading Issues", desc: "Problems with orders, platform performance, or trade execution." },
    { icon: "🎁", title: "Bonuses & Promotions", desc: "Questions about bonus activation, wagering requirements or expiry." },
    { icon: "🪪", title: "Verification (KYC)", desc: "Document upload, identity verification, and account approval." },
  ];
  return `
  ${BackLink()}
  ${PageHero("Customer Support", "We're here whenever you need us — 24 hours a day, 7 days a week.", "Help · Support")}

  <section class="py-16 bg-ink-950">
    <div class="container-rk">
      <div class="reveal grid gap-4 sm:grid-cols-2 max-w-3xl mx-auto mb-16">
        <div class="card p-8 text-center">
          <div class="text-4xl mb-3">💬</div>
          <h3 class="font-bold text-xl mb-2">WhatsApp / Live Chat</h3>
          <p class="text-sm text-white/55 mb-5">Average response time: under 1 minute. Available 24/7.</p>
          <button class="btn-green w-full" data-wa>Start Chat Now</button>
        </div>
        <div class="card p-8 text-center">
          <div class="text-4xl mb-3">📧</div>
          <h3 class="font-bold text-xl mb-2">Email</h3>
          <p class="text-sm text-white/55 mb-5">For detailed queries. Average reply time: under 2 hours.</p>
          <a href="mailto:support@rk247.com" class="btn-ghost w-full block text-center">support@rk247.com</a>
        </div>
      </div>

      <h2 class="reveal text-xl font-bold text-center mb-8">How can we help?</h2>
      <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 mb-12">
        ${topics.map(t => `
          <button class="reveal card p-6 text-left hover:ring-1 hover:ring-rk-green transition-all" data-wa>
            <div class="text-2xl mb-3">${t.icon}</div>
            <h3 class="font-semibold mb-1">${t.title}</h3>
            <p class="text-sm text-white/50 leading-relaxed">${t.desc}</p>
          </button>`).join("")}
      </div>

      <div class="reveal card p-6 max-w-2xl mx-auto text-center bg-rk-green/5 ring-1 ring-rk-green/20">
        <p class="font-semibold mb-2">🌍 Multilingual Support</p>
        <p class="text-sm text-white/55">
          Our support team speaks 20+ languages including English, Hindi, Arabic,
          Portuguese, Spanish, Russian, Turkish, Indonesian and more.
        </p>
      </div>
    </div>
  </section>

  ${CtaSection("Contact Support Now", "Our team is online and ready to help you right now.")}`;
}

/* ─── FAQ ─── */
export function FaqPage(): string {
  const categories: { cat: string; items: { q: string; a: string }[] }[] = [
    {
      cat: "Getting Started",
      items: [
        {
          q: "How do I create an account?",
          a: "Click the 'Create Free Account' button, enter your email and password, then verify your email. You'll be logged in within 2 minutes — no ID needed to start.",
        },
        {
          q: "Is there a minimum deposit?",
          a: "Yes. The minimum deposit on RK247 is just $1, making it accessible to traders of all budget levels.",
        },
        {
          q: "Can I practice before trading with real money?",
          a: "Absolutely. Every account comes with a free demo balance of $10,000 in virtual funds. Practice as long as you need before going live.",
        },
      ],
    },
    {
      cat: "Deposits & Withdrawals",
      items: [
        {
          q: "What deposit methods are accepted?",
          a: "We accept bank cards (Visa/Mastercard), e-wallets (Skrill, Neteller, Perfect Money), bank wire transfer, and cryptocurrencies (Bitcoin, USDT, Ethereum).",
        },
        {
          q: "How long does a withdrawal take?",
          a: "Most withdrawals are processed the same business day. Cards take 1–3 business days. Bank wires take 2–5 business days. Crypto is usually within 1 hour.",
        },
        {
          q: "Are there any withdrawal fees?",
          a: "RK247 charges no withdrawal fees. However, your bank or payment provider may charge their own transaction fees.",
        },
      ],
    },
    {
      cat: "Trading",
      items: [
        {
          q: "What assets can I trade?",
          a: "You can trade 300+ assets including 70+ Forex pairs, 500+ stocks, 35+ cryptocurrencies, 30+ indices, commodities, and ETFs.",
        },
        {
          q: "What is the minimum trade size?",
          a: "The minimum investment per trade is $1 on Fixed Time and Flex. This allows traders with small accounts to participate.",
        },
        {
          q: "Is there a mobile app available?",
          a: "Yes. RK247 has a highly-rated Android app on Google Play and a progressive web app (PWA) that works on iOS and any browser.",
        },
      ],
    },
    {
      cat: "Account & Security",
      items: [
        {
          q: "Do I need to verify my identity?",
          a: "Light KYC is required before your first withdrawal. You'll need to upload a government-issued ID and proof of address. This typically takes under 24 hours.",
        },
        {
          q: "Is my money safe with RK247?",
          a: "Trading carries risk. Before funding an account, review your account agreement and verify the legal entity, regulatory status and customer protections that apply to your location.",
        },
        {
          q: "What is Negative Balance Protection?",
          a: "Negative Balance Protection means you can never lose more than the funds in your account. Your balance cannot go below zero.",
        },
      ],
    },
  ];

  return `
  ${BackLink()}
  ${PageHero("Frequently Asked Questions", "Quick answers to the most common questions about RK247.", "Help · FAQ")}

  <section class="py-16 bg-ink-950">
    <div class="container-rk max-w-3xl">
      ${categories.map(cat => `
        <div class="mb-12">
          <h2 class="reveal text-xl font-bold mb-6 text-rk-green">${cat.cat}</h2>
          <div class="space-y-4">
            ${cat.items.map((item, idx) => `
              <div class="reveal card">
                <button
                  class="w-full text-left flex items-start justify-between gap-4 p-6 faq-toggle"
                  data-faq-id="${cat.cat}-${idx}">
                  <span class="font-semibold pr-2">${item.q}</span>
                  <span class="faq-icon text-rk-green flex-shrink-0 mt-0.5 transition-transform duration-200">${icons.chevronDown}</span>
                </button>
                <div id="faq-${cat.cat}-${idx}" class="faq-body hidden px-6 pb-6">
                  <p class="text-sm text-white/60 leading-relaxed">${item.a}</p>
                </div>
              </div>`).join("")}
          </div>
        </div>`).join("")}

      <div class="reveal card p-6 text-center bg-rk-green/5 ring-1 ring-rk-green/20">
        <p class="font-semibold mb-2">Still have questions?</p>
        <p class="text-sm text-white/55 mb-4">Our support team is available 24/7 to answer anything not covered here.</p>
        <button class="btn-green" data-wa>Chat with Support</button>
      </div>
    </div>
  </section>

  ${CtaSection("Ready to Start Trading?", "Create your free account and try the platform risk-free with a demo.")}`;
}

/* ─── Learning Center ─── */
export function LearningPage(): string {
  const courses = [
    {
      level: "Beginner",
      color: "text-green-400",
      items: [
        { title: "Introduction to Online Trading", dur: "15 min", type: "Video" },
        { title: "Understanding Currency Pairs", dur: "20 min", type: "Article" },
        { title: "How to Read a Chart", dur: "25 min", type: "Video" },
        { title: "What is a Pip?", dur: "10 min", type: "Article" },
      ],
    },
    {
      level: "Intermediate",
      color: "text-yellow-400",
      items: [
        { title: "Technical Analysis Fundamentals", dur: "45 min", type: "Course" },
        { title: "Support and Resistance Levels", dur: "30 min", type: "Video" },
        { title: "Using Moving Averages", dur: "25 min", type: "Video" },
        { title: "RSI & MACD Explained", dur: "35 min", type: "Video" },
      ],
    },
    {
      level: "Advanced",
      color: "text-orange-400",
      items: [
        { title: "Risk Management Strategies", dur: "60 min", type: "Course" },
        { title: "Trading Psychology Masterclass", dur: "50 min", type: "Video" },
        { title: "Building a Trading Plan", dur: "40 min", type: "Article" },
        { title: "Algorithmic Trading Basics", dur: "90 min", type: "Course" },
      ],
    },
  ];

  return `
  ${BackLink()}
  ${PageHero("Learning Center", "Free trading education for everyone — from complete beginner to advanced trader.", "Help · Learning")}

  <section class="py-16 bg-ink-950">
    <div class="container-rk">
      <div class="reveal grid gap-4 sm:grid-cols-3 mb-14 text-center">
        <div class="card p-6">
          <p class="text-3xl font-extrabold text-rk-green">50+</p>
          <p class="text-sm text-white/55 mt-1">Free courses & videos</p>
        </div>
        <div class="card p-6">
          <p class="text-3xl font-extrabold text-rk-green">20+</p>
          <p class="text-sm text-white/55 mt-1">Languages available</p>
        </div>
        <div class="card p-6">
          <p class="text-3xl font-extrabold text-rk-green">100%</p>
          <p class="text-sm text-white/55 mt-1">Free — no subscription</p>
        </div>
      </div>

      <div class="grid gap-8 lg:grid-cols-3 mb-14">
        ${courses.map(cat => `
          <div class="reveal">
            <h2 class="font-bold text-lg mb-4 ${cat.color}">${cat.level}</h2>
            <div class="space-y-3">
              ${cat.items.map(item => `
                <button class="w-full card p-4 text-left flex items-center gap-3 hover:ring-1 hover:ring-white/10 transition-all" data-wa>
                  <span class="text-lg flex-shrink-0">${item.type === "Video" ? "▶️" : item.type === "Course" ? "📚" : "📄"}</span>
                  <div class="flex-1 min-w-0">
                    <p class="text-sm font-semibold leading-snug">${item.title}</p>
                    <p class="text-xs text-white/40 mt-0.5">${item.type} · ${item.dur}</p>
                  </div>
                  <span class="text-rk-green flex-shrink-0">${icons.chevronRight}</span>
                </button>`).join("")}
            </div>
          </div>`).join("")}
      </div>

      ${FeatureGrid([
        { icon: "📺", title: "YouTube Tutorials", desc: "Subscribe to our YouTube channel for weekly video lessons and live market analysis." },
        { icon: "📡", title: "Live Webinars", desc: "Join free live webinars every week hosted by professional traders." },
        { icon: "📰", title: "Market Analysis", desc: "Daily written and video market analysis published by our analyst team." },
        { icon: "🧮", title: "Trading Calculators", desc: "Pip calculator, margin calculator, profit/loss calculator — all free to use." },
        { icon: "📖", title: "Glossary", desc: "Comprehensive trading glossary covering 300+ financial terms and concepts." },
        { icon: "🤝", title: "Mentorship", desc: "One-on-one coaching sessions available with senior traders for premium clients." },
      ])}
    </div>
  </section>

  ${CtaSection("Start Learning for Free", "Register now and unlock the full Learning Center at no cost.")}`;
}
