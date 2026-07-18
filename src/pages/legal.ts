import { BackLink, PageHero } from "./layout";

export function LegalPage(): string {
  return `
  ${BackLink()}
  ${PageHero("Legal Information", "Important terms, disclosures and risk information for RK247 users.", "Legal")}
  <section class="bg-ink-950 py-16">
    <div class="container-rk max-w-4xl space-y-6">
      <div class="card p-8">
        <h2 class="text-xl font-bold">Risk disclosure</h2>
        <p class="mt-3 leading-relaxed text-white/60">Trading financial instruments involves substantial risk and may not be suitable for every person. You may lose some or all of your invested capital. Past performance does not guarantee future results. Consider your objectives, experience and financial circumstances before trading.</p>
      </div>
      <div class="card p-8">
        <h2 class="text-xl font-bold">Account agreements</h2>
        <p class="mt-3 leading-relaxed text-white/60">The legal entity, governing terms and documents applicable to you may depend on your country and the service offered. Review the agreement presented during registration and contact support for the current signed version before depositing funds.</p>
      </div>
      <div class="card p-8">
        <h2 class="text-xl font-bold">Questions and document requests</h2>
        <p class="mt-3 leading-relaxed text-white/60">Ask RK247 support for the current service agreement, privacy notice, risk disclosure and entity-specific regulatory documentation.</p>
        <button class="btn-green mt-5" data-wa>Request legal documents</button>
      </div>
    </div>
  </section>`;
}

export function RegulationPage(): string {
  return `
  ${BackLink()}
  ${PageHero("Regulatory Information", "Verify the legal entity and regulatory status applicable to your account.", "Regulation")}
  <section class="bg-ink-950 py-16">
    <div class="container-rk max-w-4xl space-y-6">
      <div class="card p-8">
        <h2 class="text-xl font-bold">Entity-specific disclosure</h2>
        <p class="mt-3 leading-relaxed text-white/60">Regulatory coverage can differ by legal entity, product and customer location. Before opening or funding an account, confirm the contracting entity shown in your registration documents.</p>
      </div>
      <div class="card p-8">
        <h2 class="text-xl font-bold">How to verify</h2>
        <ol class="mt-4 list-decimal space-y-3 pl-5 text-white/60">
          <li>Request the full legal entity name and registration or licence number.</li>
          <li>Confirm the regulator and jurisdiction stated in your account agreement.</li>
          <li>Verify those details directly in the regulator's official public register.</li>
        </ol>
      </div>
      <div class="card p-8">
        <h2 class="text-xl font-bold">Request current details</h2>
        <p class="mt-3 leading-relaxed text-white/60">Contact support for the current regulator name, licence number, legal entity and customer-protection terms that apply to your location.</p>
        <button class="btn-green mt-5" data-wa>Request regulatory details</button>
      </div>
    </div>
  </section>`;
}

export function CookiePolicyPage(): string {
  return `
  ${BackLink()}
  ${PageHero("Cookie Policy", "How RK247 uses cookies and similar browser technologies.", "Cookie Policy")}
  <section class="bg-ink-950 py-16">
    <div class="container-rk max-w-4xl space-y-6">
      <div class="card p-8">
        <h2 class="text-xl font-bold">Cookies we use</h2>
        <p class="mt-3 leading-relaxed text-white/60">The site may use essential browser storage for preferences and session functions, analytics cookies to understand site usage, and functional cookies to support interactive features.</p>
      </div>
      <div class="card p-8">
        <h2 class="text-xl font-bold">Managing cookies</h2>
        <p class="mt-3 leading-relaxed text-white/60">You can delete or block cookies using your browser settings. Blocking essential storage may affect site features such as saved consent and session preferences.</p>
      </div>
    </div>
  </section>`;
}
