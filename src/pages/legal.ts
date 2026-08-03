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
  ${PageHero("Regulatory Information", "RK247 is a licensed and regulated broker by the Vanuatu Financial Services Commission.", "Regulation")}
  <section class="bg-ink-950 py-16">
    <div class="container-rk max-w-4xl space-y-6">
      <div class="card p-8">
        <h2 class="text-xl font-bold">Financial dealer license</h2>
        <p class="mt-3 leading-relaxed text-white/60">RK247 is a licensed and regulated broker by the Vanuatu Financial Services Commission. RK247 is committed to providing the highest quality of service. Our clients are covered by deposit insurance and have access to comprehensive support and prompt resolution of any issues concerning their financial interactions with RK247.</p>
      </div>

      <div class="card p-8">
        <h2 class="text-xl font-bold">International Financial Commission (FinaCom)</h2>
        <p class="mt-3 leading-relaxed text-white/60">The International Financial Commission is an alternative dispute resolution center established to protect the interests of individual traders. It promotes transparency, integrity, and client education.</p>
        <p class="mt-3 leading-relaxed text-white/60">Membership with FinaCom is an honor reserved for companies that constantly and faithfully adhere to these principles. RK247 joined the Commission on February 22, 2016.</p>
      </div>

      <div class="card p-8">
        <h2 class="text-xl font-bold">Financial Markets Association in Vanuatu</h2>
        <p class="mt-3 leading-relaxed text-white/60">Financial Markets Association in Vanuatu is a self-regulatory body for Vanuatu Financial Dealer License holders.</p>
      </div>

      <div class="grid gap-6 sm:grid-cols-3">
        <div class="card p-6">
          <h3 class="font-bold text-white">Legal Aid</h3>
          <p class="mt-2 text-sm leading-relaxed text-white/55">RK247 clients are entitled to free legal assistance with any disputes they may raise with the broker.</p>
        </div>
        <div class="card p-6">
          <h3 class="font-bold text-white">Compensation</h3>
          <p class="mt-2 text-sm leading-relaxed text-white/55">Should any wrongdoing be proven on the part of the broker, a trader is eligible to receive up to €20,000 in compensation.</p>
        </div>
        <div class="card p-6">
          <h3 class="font-bold text-white">Verifiable Quotes</h3>
          <p class="mt-2 text-sm leading-relaxed text-white/55">All market prices quoted on the RK247 platform are third-party verified. The data can be accessed at all times so the trader can ensure they are getting the best trade execution.</p>
        </div>
      </div>

      <div class="card p-8">
        <h2 class="text-xl font-bold">Contacts</h2>
        <p class="mt-3 leading-relaxed text-white/60"><span class="font-semibold text-white">Financial Commission:</span> <a href="mailto:info@financialcommission.org" class="text-rk-green hover:underline">info@financialcommission.org</a></p>
        <p class="mt-2 leading-relaxed text-white/60"><span class="font-semibold text-white">RK247:</span> <a href="mailto:support@rk247.com" class="text-rk-green hover:underline">support@rk247.com</a></p>
      </div>

      <div class="card p-8">
        <h2 class="text-xl font-bold">How to contact FinaCom</h2>
        <ol class="mt-4 list-decimal space-y-4 pl-5 text-white/60 leading-relaxed">
          <li>You should first go to the Help section, contact our Customer Support Team via live chat or email and describe your situation in detail. Our support team will be able to help you solve the issue, and if it requires escalation, they will help you escalate it according to our internal complaint-handling procedure. If your issue wasn't resolved within 35 days or escalated by our Customer Support Team, you can contact our Customer Service Executive team via the email our support agents will provide you with, who will do their best to reply within 24 hours of receiving your message.</li>
          <li>If your complaint wasn't resolved through the Customer Service Executive team, you'll receive information about how you can submit your complaint to our Claims Department. You'll need to have verified your account and provide your complaint reference number, which you'll receive from the Customer Service Executive team via email. They will take an in-depth look at your case and work with you to resolve the issue fairly and carefully.</li>
          <li>If you have completed these steps of our internal complaint-handling procedure and are not fully satisfied with the solution our specialists have proposed, or the problem has not been resolved, you have the right to file a formal complaint with the Financial Commission within 45 days after the incident occurred. To do this, first follow the guidelines laid out by the Financial Commission, and then you can file an appeal here.</li>
        </ol>
      </div>

      <div class="card p-8">
        <h2 class="text-xl font-bold">Legal entity information</h2>
        <p class="mt-3 text-sm leading-relaxed text-white/50">The services on the Website are provided by Aollikus Limited, a licensed financial dealer, company number: 40131, registered address: 1276, Govant Building, Kumul Highway, Port Vila, Republic of Vanuatu. Saledo Global LLC, registered at Euro House, Richmond Hill Road, Kingstown, St. Vincent and the Grenadines, P.O. Box 2897, provides services to clients trading in digital assets and to clients with accounts nominated in digital assets. The companies are fully licensed to perform its activities by the laws of that country. Partner companies: VISEPOINT LIMITED (registration No. C 94716, registered at 123, Melita Street, Valletta, VLT 1123, Malta) and MARTIQUE LIMITED (registration No. HE 43318, registered at Kypranoros, 13, EVI BUILDING, 2nd floor, Flat/Office 201, 1061, Nicosia, Cyprus), provide content and perform operational management of the business.</p>
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
