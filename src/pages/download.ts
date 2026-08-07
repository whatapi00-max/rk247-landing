import { PageHero, CtaSection, FeatureGrid, StepList, BackLink, icons } from "./layout";

/* ─── Download Overview ─── */
export function DownloadPage(): string {
  const options = [
    {
      href: "https://web.theplatformapi.com/create-company-user?companyName=FX777&isDemo=true&parentId=29102",
      icon: "🌐",
      label: "Web Trader Demo",
      sub: "Browser-based",
      desc: "Practice trading in your browser with virtual funds. No deposit required.",
      external: true,
    },
    {
      href: "https://web.theplatformapi.com/create-company-user?companyName=FX777&isDemo=false&parentId=29103",
      icon: "🌐",
      label: "Web Trader Register",
      sub: "Browser-based",
      desc: "Create an account and trade directly in your browser. No download required. Works on any device.",
      external: true,
    },
    {
      href: "/download/android",
      icon: "🤖",
      label: "Android",
      sub: "Google Play Store",
      desc: "Download from the Google Play Store for Android 5.0 and above.",
    },
    {
      href: "https://apps.apple.com/jo/app/osense-trader/id6741929487",
      icon: "🍎",
      label: "iOS",
      sub: "Apple App Store",
      desc: "Download from the Apple App Store for iPhone and iPad.",
      external: true,
    },
    {
      href: "/download/android-apk",
      icon: "📦",
      label: "Android APK",
      sub: "Direct Install",
      desc: "Download the APK directly from RK247 — no Play Store required.",
    },
    {
      href: "/download/desktop",
      icon: "🖥️",
      label: "Desktop App",
      sub: "Windows & macOS",
      desc: "Full-featured desktop trading platform for Windows 10+ and macOS.",
    },
  ];
  return `
  ${BackLink()}
  ${PageHero("Download RK247", "Trade anywhere — desktop, mobile, or web. One account, every device.", "Download")}

  <section class="py-16 bg-ink-950">
    <div class="container-rk">
      <div class="grid gap-6 sm:grid-cols-2 mb-16">
        ${options.map(o => `
          <a href="${o.href}" ${o.external ? 'target="_blank" rel="noopener noreferrer"' : ''} class="reveal card p-6 sm:p-8 flex items-start gap-5 transition-all hover:ring-1 hover:ring-rk-green">
            <span class="text-4xl flex-shrink-0">${o.icon}</span>
            <div>
              <p class="font-bold text-lg">${o.label}</p>
              <p class="text-xs text-rk-green font-semibold mb-2">${o.sub}</p>
              <p class="text-sm text-white/55 leading-relaxed">${o.desc}</p>
              <span class="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-rk-green">${o.external ? 'Open' : 'Download'} ${icons.chevronRight}</span>
            </div>
          </a>`).join("")}
      </div>

      ${FeatureGrid([
        { icon: "🔄", title: "Instant Sync", desc: "All positions, history and settings sync across your devices in real time." },
        { icon: "📶", title: "Low Data Usage", desc: "Optimised to work even on slow or metered internet connections." },
        { icon: "🌙", title: "Dark & Light Mode", desc: "Trade comfortably day or night with adaptive theme support." },
        { icon: "🔔", title: "Push Notifications", desc: "Get instant alerts on price movements, trade results and account events." },
        { icon: "🔒", title: "Biometric Login", desc: "Use Face ID or fingerprint for fast, secure login on mobile." },
        { icon: "🛠️", title: "Full Feature Parity", desc: "All tools available on every platform — no features locked to desktop." },
      ])}
    </div>
  </section>

  ${CtaSection("Download & Start Trading", "Create your free account and choose your preferred platform.", "Try Demo", "Practice with virtual funds.", "/trading/demo")}`;
}

/* ─── Desktop App ─── */
export function DesktopPage(): string {
  return `
  ${BackLink("← Back to Download")}
  ${PageHero("Desktop App", "The most powerful way to trade RK247 — built for Windows and macOS.", "Download · Desktop")}

  <section class="py-16 bg-ink-950">
    <div class="container-rk max-w-4xl">
      <div class="reveal grid gap-6 sm:grid-cols-2 mb-14">
        <div class="card p-8 text-center">
          <div class="text-5xl mb-4"></div>
          <h3 class="text-xl font-bold mb-2">Windows</h3>
          <p class="text-sm text-white/50 mb-6">Windows 10 / 11 (64-bit)</p>
          <a href="http://theplatformapi.com/setup/fx777.exe" target="_blank" rel="noopener noreferrer" class="btn-green w-full inline-block">Download for Windows</a>
        </div>
        <div class="card p-8 text-center">
          <div class="text-5xl mb-4"></div>
          <h3 class="text-xl font-bold mb-2">macOS</h3>
          <p class="text-sm text-white/50 mb-6">macOS 12 Monterey and above</p>
          <a href="http://theplatformapi.com/setup/fx777.exe" target="_blank" rel="noopener noreferrer" class="btn-green w-full inline-block">Download for macOS</a>
        </div>
        <div class="card p-8 text-center">
          <div class="text-5xl mb-4">🌐</div>
          <h3 class="text-xl font-bold mb-2">Web Trader Demo</h3>
          <p class="text-sm text-white/50 mb-6">Practice with virtual funds</p>
          <a href="https://web.theplatformapi.com/create-company-user?companyName=FX777&isDemo=true&parentId=29102" target="_blank" rel="noopener noreferrer" class="btn-green w-full inline-block">Open Demo</a>
        </div>
        <div class="card p-8 text-center">
          <div class="text-5xl mb-4">🌐</div>
          <h3 class="text-xl font-bold mb-2">Web Trader Login</h3>
          <p class="text-sm text-white/50 mb-6">Access your account</p>
          <a href="https://web.theplatformapi.com/" target="_blank" rel="noopener noreferrer" class="btn-green w-full inline-block">Open Login</a>
        </div>
      </div>

      ${FeatureGrid([
        { icon: "", title: "Ultra-fast Execution", desc: "Native app delivers lower latency than any browser-based solution." },
        { icon: "", title: "Multi-window Charts", desc: "Open multiple chart windows side by side — perfect for multi-asset analysis." },
        { icon: "", title: "Multi-monitor Support", desc: "Extend your workspace across multiple screens for professional setups." },
        { icon: "", title: "System Notifications", desc: "Get native OS notifications for price alerts and trade events." },
        { icon: "", title: "Keyboard Shortcuts", desc: "Speed up trading with configurable keyboard shortcuts for common actions." },
        { icon: "", title: "Auto-update", desc: "The app updates silently in the background — always on the latest version." },
      ])}
    </div>
  </section>

  ${CtaSection("Download the Desktop App", "Create your free account first, then download the platform.", "Try Demo", "Practice with virtual funds.", "/trading/demo")}`;
}

/* ─── Android App ─── */
export function AndroidPage(): string {
  return `
  ${BackLink("← Back to Download")}
  ${PageHero("Android App", "Trade on the go with the RK247 Android app — rated 4.8 ★ on Google Play.", "Download · Android")}

  <section class="py-16 bg-ink-950">
    <div class="container-rk max-w-3xl">
      <div class="reveal card p-8 sm:p-12 text-center mb-14">
        <div class="text-6xl mb-4"></div>
        <h2 class="text-2xl font-bold mb-2">Available on Google Play</h2>
        <p class="text-white/55 mb-6">Requires Android 5.0 or higher. Free download.</p>
        <div class="flex flex-col sm:flex-row gap-3 justify-center">
          <a href="https://play.google.com/store/apps/details?id=com.osensetrader.osensetrader" target="_blank" rel="noopener noreferrer" class="btn-green px-10 py-3.5 text-base">Get on Google Play</a>
          <a href="/download/android-apk" class="btn-ghost px-8 py-3.5 text-base">Download APK directly</a>
        </div>
        <div class="mt-6 flex items-center justify-center gap-2 text-yellow-400 text-sm font-semibold">
          ★★★★★ <span class="text-white/50 font-normal">4.8 / 5 — 500,000+ downloads</span>
        </div>
      </div>

      ${FeatureGrid([
        { icon: "", title: "Optimised for Android", desc: "Smooth 60fps interface designed specifically for Android phones and tablets." },
        { icon: "", title: "Push Alerts", desc: "Instant notifications for trade results, deposits, and price alerts." },
        { icon: "", title: "Fingerprint / Face Unlock", desc: "Secure login using your device biometrics." },
        { icon: "", title: "Offline Mode", desc: "View account history and manage pending orders even offline." },
        { icon: "", title: "Dark Theme", desc: "Eye-friendly dark UI — designed for extended trading sessions." },
        { icon: "", title: "Live Sync", desc: "Real-time sync with your web and desktop accounts." },
      ])}
    </div>
  </section>

  ${CtaSection("Download the Android App", "Free to download. Create your account and start trading in minutes.", "Try Demo", "Practice with virtual funds.", "/trading/demo")}`;
}

/* ─── Android APK ─── */
export function AndroidApkPage(): string {
  return `
  ${BackLink("← Back to Download")}
  ${PageHero("Android APK – Direct Download", "Install RK247 directly without the Play Store. Perfect for any Android device.", "Download · APK")}

  <section class="py-16 bg-ink-950">
    <div class="container-rk max-w-3xl">
      <div class="reveal card p-8 sm:p-12 mb-12">
        <h2 class="text-xl font-bold mb-6">How to install the APK</h2>
        ${StepList([
          { num: "1", title: "Contact us for the APK link", desc: "Tap the button below to request the latest APK download link via WhatsApp." },
          { num: "2", title: "Allow unknown sources", desc: 'On your Android device go to Settings → Security and enable "Install unknown apps" for your browser.' },
          { num: "3", title: "Open the downloaded file", desc: "Tap the downloaded .apk file from your notifications or file manager." },
          { num: "4", title: "Install & open", desc: "Follow the on-screen prompts to install. Open the app and log in to your account." },
        ])}
      </div>

      <div class="reveal card p-6 bg-yellow-500/5 ring-1 ring-yellow-500/20 mb-8">
        <p class="text-sm text-yellow-400 font-semibold mb-1">⚠️ Security Notice</p>
        <p class="text-sm text-white/55 leading-relaxed">
          Only download the RK247 APK from official sources (this page or our support team). Never install APKs from unknown third-party websites.
        </p>
      </div>

      <div class="text-center">
        <a href="https://play.google.com/store/apps/details?id=com.osensetrader.osensetrader" target="_blank" rel="noopener noreferrer" class="btn-green px-10 py-4 text-base">Download APK</a>
      </div>
    </div>
  </section>

  ${CtaSection("Get the RK247 APK", "Contact our support team to receive the latest verified APK.", "Try Demo", "Practice with virtual funds.", "/trading/demo")}`;
}
