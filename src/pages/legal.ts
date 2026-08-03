import { BackLink, PageHero, icons } from "./layout";

const legalDocuments: { title: string; content: string[] }[] = [
  {
    title: "1-Click Service Terms and Conditions",
    content: [
      "The 1-Click Service allows eligible clients to open a trading account and place their first deposit using a simplified, expedited registration flow, without completing every standard onboarding step upfront.",
      "By using the 1-Click Service, you confirm that the information you provide is accurate and that you meet the minimum age and eligibility requirements applicable in your jurisdiction. RK247 reserves the right to request full identity verification (KYC) at any time, including before processing a withdrawal.",
      "Access to certain account features, higher deposit/withdrawal limits, and promotional offers may be restricted until standard verification is completed. RK247 may suspend or reverse transactions made through the 1-Click Service if fraudulent activity, duplicate accounts, or policy violations are detected.",
    ],
  },
  {
    title: "Terms of Provision of Additional Software and Additional Services in the Trading Terminal",
    content: [
      "RK247 may make available additional software components, plugins, indicators, expert advisors (EAs), signal services, or analytical tools (\"Additional Software/Services\") within the trading terminal, either developed by RK247 or provided by licensed third parties.",
      "Additional Software/Services are provided \"as is\" without warranty of profitability or fitness for a particular purpose. Use of automated trading tools (EAs, bots) is at the client's own risk, and RK247 is not liable for losses resulting from their use, misconfiguration, or third-party bugs.",
      "RK247 reserves the right to modify, suspend, or discontinue any Additional Software/Service at its discretion, with or without prior notice, and may restrict access to specific tools for certain account types or jurisdictions.",
    ],
  },
  {
    title: "Risk Disclosure",
    content: [
      "Trading financial instruments — including Forex, CFDs, stocks, indices, commodities, and cryptocurrencies — involves substantial risk and may not be suitable for every investor. You may lose some or all of your invested capital, and losses can occur rapidly due to leverage and market volatility.",
      "Past performance is not indicative of future results. Prices can be affected by factors including economic conditions, political events, and market sentiment that are outside RK247's control.",
      "Before trading, you should carefully consider your investment objectives, level of experience, and risk appetite. Only trade with funds you can afford to lose. If you are uncertain about any aspect of trading risk, seek independent financial advice before proceeding.",
    ],
  },
  {
    title: "Non-trading Transactions Regulation and KYC/AML Policy",
    content: [
      "Non-trading transactions (deposits, withdrawals, internal transfers) are subject to identity verification (Know Your Customer, \"KYC\") and Anti-Money Laundering (\"AML\") checks in line with applicable regulations and RK247's internal compliance procedures.",
      "Clients may be required to submit a government-issued photo ID, proof of address, and, where relevant, proof of the source of funds before a withdrawal is processed. RK247 reserves the right to request additional documentation at any stage of the business relationship.",
      "RK247 monitors transactions for signs of money laundering, terrorist financing, and fraud. Suspicious activity may result in the delay, refusal, or reversal of a transaction, and in the temporary or permanent suspension of an account, in accordance with applicable law.",
    ],
  },
  {
    title: "Compliance",
    content: [
      "RK247 is committed to conducting its business in compliance with the laws and regulations applicable to the entities that provide services under the RK247 brand, including licensing, consumer protection, data protection, and anti-financial-crime requirements.",
      "RK247's compliance framework includes ongoing staff training, transaction monitoring, periodic internal audits, and cooperation with relevant regulators and industry bodies such as the Financial Commission.",
      "Clients are expected to comply with these Terms and all applicable laws when using RK247's services, including restrictions relating to their country of residence and any local prohibitions on trading certain instruments.",
    ],
  },
  {
    title: "Agreement on the Storage of the Cardholder's Credentials",
    content: [
      "Where you choose to save your payment card details for future deposits, you consent to RK247 (or its licensed payment service providers) securely storing a tokenised representation of your card data in accordance with the Payment Card Industry Data Security Standard (PCI DSS).",
      "RK247 does not store your full card number or CVV in plain text. Stored card tokens are used solely to facilitate future deposits initiated by you and are not shared with unauthorised third parties.",
      "You may request the removal of stored card credentials at any time by contacting support. RK247 reserves the right to remove stored credentials automatically if a card expires or repeated transaction failures occur.",
    ],
  },
  {
    title: "Standard Promotional Terms",
    content: [
      "Unless a specific promotion states otherwise, all bonuses, cashback offers, and promotional campaigns run by RK247 are subject to these Standard Promotional Terms in addition to any campaign-specific conditions published at the time of the offer.",
      "Promotional funds are typically credited to a separate bonus balance and may be subject to a minimum trading volume (wagering) requirement before becoming eligible for withdrawal. Details of the applicable wagering requirement are provided at the time the bonus is offered.",
      "RK247 reserves the right to modify, suspend, or cancel any promotion at any time, and to disqualify accounts found to be abusing promotional offers (including through multiple accounts, arbitrage, or coordinated activity) from receiving or keeping bonus funds and associated profits.",
    ],
  },
  {
    title: "Trading Transactions Policy. Part 1",
    content: [
      "This Part 1 covers the general principles applicable to the execution of trading transactions on the RK247 platform, including order types, execution methods, and quote sourcing.",
      "Orders are executed at the best available price at the time of execution based on RK247's pricing feed. Under conditions of high volatility, low liquidity, or extraordinary market events, execution prices may differ from the price quoted at the moment the order was placed (slippage).",
      "RK247 reserves the right to decline, cancel, or adjust trading transactions that are found to result from manifest error, abnormal quotes, latency arbitrage, or other forms of abusive trading practices.",
    ],
  },
  {
    title: "Trading Transactions Policy. Part 2",
    content: [
      "This Part 2 continues from Part 1 and addresses dispute resolution for trading transactions, stop-out and margin call procedures, and the handling of gapped or re-quoted prices.",
      "Where a client disputes the execution of a trade, RK247 will investigate using server-side trade logs and third-party price feed data. Any adjustment will be based on objective evidence of a pricing or system error.",
      "Accounts that fall below the required margin level are subject to automatic stop-out in accordance with the margin requirements published for each instrument. RK247 is not liable for losses resulting from a stop-out triggered by insufficient margin.",
    ],
  },
  {
    title: "Privacy Policy",
    content: [
      "RK247 collects and processes personal data (such as identification details, contact information, financial information, and platform usage data) to provide its services, comply with legal obligations, prevent fraud, and improve the client experience.",
      "Personal data is stored securely and is only shared with third parties where necessary for service delivery (e.g., payment providers, identity verification partners, regulators) or where required by law. RK247 does not sell client data to unrelated third parties.",
      "Clients have the right to request access to, correction of, or deletion of their personal data, subject to RK247's legal and regulatory record-keeping obligations. Requests can be submitted to RK247 support at any time.",
    ],
  },
  {
    title: "Service Agreement. Part 1",
    content: [
      "This Part 1 of the Service Agreement sets out the general terms of the relationship between the client and the RK247 entity providing services, including account eligibility, registration requirements, and acceptance of these terms.",
      "By creating an account, the client confirms that they are of legal age, have the legal capacity to enter into this agreement, and are not a resident of a jurisdiction where RK247's services are restricted or prohibited.",
      "The Service Agreement, together with all referenced policies (Risk Disclosure, Privacy Policy, AML Policy, etc.), forms the complete agreement between the client and RK247 regarding use of the platform.",
    ],
  },
  {
    title: "Service Agreement. Part 2",
    content: [
      "This Part 2 continues from Part 1 and covers account maintenance, fees, suspension and termination rights, limitation of liability, and dispute resolution procedures, including recourse to the Financial Commission where applicable.",
      "RK247 reserves the right to suspend or close an account in cases of suspected fraud, breach of these terms, regulatory requirement, or prolonged inactivity, subject to returning any available client funds in accordance with applicable procedures.",
      "To the maximum extent permitted by law, RK247's liability to the client is limited to direct losses arising from RK247's own breach of these terms, and excludes indirect or consequential losses such as loss of profit or opportunity.",
    ],
  },
  {
    title: "RK247 Referral Policy",
    content: [
      "The RK247 Referral Program allows existing clients to invite new clients to the platform and earn a referral reward once the referred client meets the qualifying conditions (such as account verification and a minimum deposit or trading volume).",
      "Self-referrals, the creation of duplicate accounts, and any attempt to generate referral rewards through fraudulent or automated means are strictly prohibited and will result in forfeiture of rewards and possible account suspension.",
      "RK247 reserves the right to change the referral reward structure, qualifying conditions, or to discontinue the Referral Program at any time, with reasonable notice provided to active participants where feasible.",
    ],
  },
  {
    title: "Trading Transactions Policy — Stocks",
    content: [
      "This policy applies specifically to trading transactions in stock CFDs available on the RK247 platform, including execution during market hours, corporate actions, and dividend adjustments.",
      "Stock CFD prices are derived from the underlying exchange-listed shares and are subject to exchange trading hours, pre-market/after-hours conditions, and can be affected by corporate actions such as stock splits, mergers, or dividend payments, which may result in balance adjustments to reflect the underlying event.",
      "Trading in individual stocks may be temporarily suspended by RK247 around earnings announcements, exchange halts, or extreme volatility events to protect clients and maintain fair execution.",
    ],
  },
  {
    title: "Terms and Conditions of the Bonus Welcome Program",
    content: [
      "The Bonus Welcome Program offers new clients a deposit-matching bonus (e.g., up to 100% of their first qualifying deposit) credited to their trading account, subject to the specific percentage and cap published at the time of registration.",
      "Welcome bonus funds are subject to a trading volume (wagering) requirement before the bonus amount and any profit generated from it become eligible for withdrawal. The specific requirement is disclosed at the time the bonus is granted.",
      "RK247 reserves the right to withdraw or reduce an unclaimed or unused welcome bonus, and to disqualify accounts engaged in abusive practices (such as hedging across multiple accounts to lock in bonus-related profit) from participating in the program.",
    ],
  },
];

export function LegalPage(): string {
  return `
  ${BackLink()}
  ${PageHero("Legal Information", "Important terms, agreements and disclosures governing your use of RK247.", "Legal")}
  <section class="bg-ink-950 py-16">
    <div class="container-rk max-w-3xl">
      <div class="space-y-4">
        ${legalDocuments.map((doc, idx) => `
          <div class="reveal card">
            <button
              class="w-full text-left flex items-start justify-between gap-4 p-6 faq-toggle"
              data-faq-id="legal-${idx}">
              <span class="font-semibold pr-2">${doc.title}</span>
              <span class="faq-icon text-rk-green flex-shrink-0 mt-0.5 transition-transform duration-200">${icons.chevronDown}</span>
            </button>
            <div id="faq-legal-${idx}" class="faq-body hidden px-6 pb-6 space-y-3">
              ${doc.content.map(p => `<p class="text-sm text-white/60 leading-relaxed">${p}</p>`).join("")}
            </div>
          </div>`).join("")}
      </div>

      <div class="reveal card p-8 mt-10 text-center">
        <h2 class="text-xl font-bold">Questions and document requests</h2>
        <p class="mt-3 leading-relaxed text-white/60">Ask RK247 support for the current signed version of any service agreement, privacy notice, risk disclosure or entity-specific regulatory documentation.</p>
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
        <p class="mt-2 leading-relaxed text-white/60"><span class="font-semibold text-white">RK247:</span> <a href="mailto:support@rk247.org" class="text-rk-green hover:underline">support@rk247.org</a></p>
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
  const cookieTypes = [
    {
      title: "Essential Cookies",
      icon: "🔒",
      desc: "Required for the website to function properly. These enable core features such as page navigation, secure areas, session management, and remembering your cookie consent choice. The site cannot function properly without these cookies.",
    },
    {
      title: "Performance & Analytics Cookies",
      icon: "📊",
      desc: "Help us understand how visitors interact with the website by collecting anonymous information such as pages visited, time spent, and navigation paths. This data helps us improve site performance and user experience.",
    },
    {
      title: "Functional Cookies",
      icon: "⚙️",
      desc: "Allow the website to remember choices you make, such as your preferred language or region, and provide enhanced, more personalised features.",
    },
    {
      title: "Marketing & Advertising Cookies",
      icon: "📣",
      desc: "May be used to track visitors across websites to display relevant advertisements and measure the effectiveness of marketing campaigns.",
    },
  ];
  return `
  ${BackLink()}
  ${PageHero("Cookie Policy", "How RK247 uses cookies and similar browser technologies to improve your experience.", "Cookie Policy")}
  <section class="bg-ink-950 py-16">
    <div class="container-rk max-w-4xl space-y-6">
      <div class="card p-8">
        <h2 class="text-xl font-bold">What are cookies?</h2>
        <p class="mt-3 leading-relaxed text-white/60">Cookies are small text files that are placed on your computer or mobile device when you visit a website. They are widely used to make websites work more efficiently, remember your preferences, and provide information to the site owners.</p>
      </div>

      <div class="card p-8">
        <h2 class="text-xl font-bold mb-4">Types of cookies we use</h2>
        <div class="grid gap-4 sm:grid-cols-2">
          ${cookieTypes.map(c => `
            <div class="rounded-2xl bg-white/[0.03] p-5 ring-1 ring-white/5">
              <div class="text-2xl mb-2">${c.icon}</div>
              <h3 class="font-semibold text-white mb-1">${c.title}</h3>
              <p class="text-sm text-white/55 leading-relaxed">${c.desc}</p>
            </div>`).join("")}
        </div>
      </div>

      <div class="card p-8">
        <h2 class="text-xl font-bold">Why we use cookies</h2>
        <ul class="mt-4 list-disc space-y-2 pl-5 text-white/60 leading-relaxed">
          <li>To keep you signed in and maintain your session securely.</li>
          <li>To remember your cookie consent and site preferences.</li>
          <li>To understand how our website is used so we can improve it.</li>
          <li>To provide relevant content and measure the effectiveness of our communications.</li>
          <li>To detect and prevent fraudulent or unauthorised activity.</li>
        </ul>
      </div>

      <div class="card p-8">
        <h2 class="text-xl font-bold">Third-party cookies</h2>
        <p class="mt-3 leading-relaxed text-white/60">Some cookies on our site are placed by trusted third-party service providers, such as analytics and marketing partners. These parties may use cookies to collect information about your visits to this and other websites in order to provide relevant advertising and services.</p>
      </div>

      <div class="card p-8">
        <h2 class="text-xl font-bold">How long do cookies last?</h2>
        <p class="mt-3 leading-relaxed text-white/60"><span class="font-semibold text-white">Session cookies</span> are temporary and are deleted once you close your browser. <span class="font-semibold text-white">Persistent cookies</span> remain on your device for a set period of time or until you delete them manually, and are used to remember your preferences across visits.</p>
      </div>

      <div class="card p-8">
        <h2 class="text-xl font-bold">Managing cookies</h2>
        <p class="mt-3 leading-relaxed text-white/60">You can control and manage cookies in several ways. Most web browsers allow you to view, delete, and block cookies through their settings menu. Please note that blocking essential cookies may affect the functionality of the website, including your ability to stay signed in or have your cookie preferences remembered.</p>
        <p class="mt-3 leading-relaxed text-white/60">You can also opt out of interest-based advertising provided by certain third parties by visiting their respective opt-out pages.</p>
      </div>

      <div class="card p-8">
        <h2 class="text-xl font-bold">Changes to this policy</h2>
        <p class="mt-3 leading-relaxed text-white/60">We may update this Cookie Policy from time to time to reflect changes in technology, legislation, or our operations. Any changes will be posted on this page, so please check back periodically.</p>
      </div>

      <div class="card p-8">
        <h2 class="text-xl font-bold">Questions about cookies?</h2>
        <p class="mt-3 leading-relaxed text-white/60">If you have any questions about how we use cookies, please contact our support team.</p>
        <a href="mailto:support@rk247.org" class="btn-green mt-5 inline-block">support@rk247.org</a>
      </div>
    </div>
  </section>`;
}
