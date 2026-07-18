export type SeoMetadata = {
  title: string;
  description: string;
  image?: string;
};

export const defaultSeo: SeoMetadata = {
  title: "RK247 – Online Forex & Stock Trading Platform | Trade from $1",
  description: "Trade Forex, stocks, indices and crypto on RK247. Start with just $1. Fast execution, 24x7 support. Join thousands of traders today.",
  image: "/assets/rk247-social-preview.jpg",
};

export const routeSeo: Record<string, SeoMetadata> = {
  "/": defaultSeo,
  "/trading": {
    title: "Online Trading Markets & Instruments | RK247",
    description: "Explore Forex, stocks, crypto, indices and fixed-time trading on RK247 with fast execution, advanced charts and a free demo account.",
  },
  "/trading/flex": {
    title: "Flex Trading with Multipliers | RK247",
    description: "Learn how RK247 Flex Trading works, set your multiplier, Stop Loss and Take Profit, and practise with a free demo account.",
  },
  "/trading/fixed-time": {
    title: "Fixed Time Trading Online | RK247",
    description: "Explore Fixed Time Trading on RK247, choose an asset and duration, and understand your potential return and maximum risk before trading.",
  },
  "/trading/forex": {
    title: "Forex Trading Online – Currency Pairs | RK247",
    description: "Trade major, minor and exotic Forex currency pairs on RK247 with advanced charting, fast execution and accessible trade sizes.",
  },
  "/trading/stocks": {
    title: "Online Stock Trading | RK247",
    description: "Access global stock markets and trade shares of leading companies through the RK247 online trading platform.",
  },
  "/trading/how-to-trade": {
    title: "How to Trade Online – Beginner Guide | RK247",
    description: "Learn how to open an account, choose a market, manage risk and place your first online trade with RK247.",
  },
  "/trading/account": {
    title: "RK247 Trading Account – Features & Setup",
    description: "Learn about RK247 trading account features, account setup, deposits, withdrawals and platform access.",
  },
  "/trading/islamic-account": {
    title: "Islamic Trading Account | RK247",
    description: "Explore the RK247 Islamic trading account, its swap-free features and the markets available to eligible traders.",
  },
  "/trading/demo": {
    title: "Free Demo Trading Account | RK247",
    description: "Practise online trading with virtual funds using an RK247 free demo account before trading with real money.",
  },
  "/trading/promotions": {
    title: "Trading Promotions & Offers | RK247",
    description: "View current RK247 trading promotions, eligibility requirements and important offer terms.",
  },
  "/trading/withdrawals": {
    title: "Withdrawals – Methods & Processing | RK247",
    description: "Learn about RK247 withdrawal methods, verification requirements and processing times.",
  },
  "/trading/assets": {
    title: "Trading Assets & Market Conditions | RK247",
    description: "Explore Forex, stocks, crypto, commodities and indices available on RK247, including key trading conditions.",
  },
  "/download": {
    title: "Download the RK247 Trading App",
    description: "Download RK247 for Android or desktop, or use the web app to access your trading account across devices.",
  },
  "/download/desktop": {
    title: "RK247 Desktop Trading App – Download",
    description: "Download the RK247 desktop trading platform for Windows or macOS and access advanced trading tools.",
  },
  "/download/android": {
    title: "RK247 Android Trading App – Download",
    description: "Download the RK247 Android app to monitor markets and manage trades from your mobile device.",
  },
  "/download/android-apk": {
    title: "RK247 Android APK – Direct Download",
    description: "Get information about installing the RK247 Android APK directly on a compatible device.",
  },
  "/download/web-app": {
    title: "RK247 Web Trading App",
    description: "Use the RK247 web trading app in a modern browser without installing additional software.",
  },
  "/about": {
    title: "About RK247 – Online Trading Platform",
    description: "Learn about RK247, its trading technology, customer support and commitment to transparent online trading.",
  },
  "/about/contacts": {
    title: "Contact RK247 Support",
    description: "Contact the RK247 support team for account, platform, deposit or withdrawal assistance.",
  },
  "/about/social": {
    title: "RK247 Social Media & Communities",
    description: "Find RK247 social channels and communities for platform news, education and market updates.",
  },
  "/about/awards": {
    title: "RK247 Awards & Recognition",
    description: "View information about RK247 platform recognition and company milestones.",
  },
  "/about/news": {
    title: "RK247 Company & Platform News",
    description: "Read the latest RK247 platform announcements, product updates and company news.",
  },
  "/about/reviews": {
    title: "RK247 User Reviews",
    description: "Read user feedback about the RK247 platform, tools and customer support experience.",
  },
  "/help/support": {
    title: "RK247 Help & Customer Support",
    description: "Get help with your RK247 account, trading platform, verification, deposits and withdrawals.",
  },
  "/help/faq": {
    title: "RK247 Frequently Asked Questions",
    description: "Find answers to frequently asked questions about RK247 accounts, trading, payments and platform security.",
  },
  "/help/learning": {
    title: "Trading Learning Center | RK247",
    description: "Build your market knowledge with RK247 trading tutorials, platform guides and risk-management resources.",
  },
  "/market-analysis": {
    title: "Daily Market Analysis – Forex, Crypto & Indices | RK247",
    description: "Read daily RK247 market analysis covering Forex, crypto, commodities and global stock indices with technical levels and commentary.",
  },
  "/legal": {
    title: "Legal Information | RK247",
    description: "Review RK247 legal information, risk notices, service terms and important customer disclosures.",
  },
  "/regulation": {
    title: "Regulatory Information | RK247",
    description: "Review RK247 regulatory disclosures and learn how to verify the legal entity serving your account.",
  },
  "/cookie-policy": {
    title: "Cookie Policy | RK247",
    description: "Learn how RK247 uses cookies and similar technologies and how you can manage browser preferences.",
  },
};
