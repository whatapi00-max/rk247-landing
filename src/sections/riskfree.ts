import { A } from "../assets";
import { icons } from "../icons";

const learn = (href = "#features") =>
  `<a href="${href}" class="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-rk-green hover:text-rk-greenBright">Learn more ${icons.chevronRight}</a>`;

export function RiskFree(): string {
  return `
  <section class="bg-ink-950 py-16 sm:py-24">
    <div class="container-rk">
      <h2 class="reveal text-center text-2xl font-bold sm:text-3xl">Explore trading<br class="sm:hidden" /> with risk-free instruments</h2>

      <div class="mt-10 grid gap-4 lg:grid-cols-2">
        <!-- Demo account wide card -->
        <article class="reveal card lg:col-span-2 flex items-center justify-between gap-4 p-6 sm:p-8">
          <div class="max-w-xs">
            <h3 class="text-lg font-bold">Demo account <span class="text-white/55">designed for practice</span></h3>
            <a href="#cta" class="btn-green mt-4">Try now</a>
            ${learn("#cta")}
          </div>
          <img src="${A.demoWoman}" alt="Woman using demo trading account on phone" class="h-44 w-auto object-contain sm:h-52" />
        </article>

        <!-- Risk-free trades -->
        <article class="reveal card p-6 sm:p-8">
          <h3 class="text-lg font-bold">Risk-free trades <span class="text-white/55">allow you to trade confidently</span></h3>
          ${learn()}
          <img src="${A.riskFreePhone}" alt="Risk-free trading phone interface" class="mx-auto mt-5 w-56 rounded-2xl" />
        </article>

        <!-- Right column: insured + negative balance -->
        <div class="flex flex-col gap-4">
          <article class="reveal card flex-1 p-6 sm:p-8">
            <h3 class="text-lg font-bold">Insured deposits</h3>
            ${learn()}
            <img src="${A.shield3d}" alt="3D shield icon representing insured deposits" class="mx-auto mt-4 w-full max-w-[320px]" />
          </article>
          <article class="reveal card flex-1 overflow-hidden p-6 sm:p-8">
            <h3 class="text-lg font-bold">Negative balance protection <span class="text-white/55">so you only risk your trade amount</span></h3>
            <img src="${A.carabiner}" alt="Carabiner safety clip representing negative balance protection" class="mx-auto mt-4 w-full max-w-[280px]" />
          </article>
        </div>

        <!-- Stop loss / take profit -->
        <article class="reveal card p-6 sm:p-8 lg:col-span-2">
          <h3 class="text-lg font-bold">Stop loss / Take profit <span class="text-white/55">close the trade on your terms</span></h3>
          ${learn()}
          <div class="mt-5 inline-flex items-center gap-3 rounded-2xl bg-ink-700 px-4 py-3 text-sm">
            <span class="grid h-8 w-8 place-items-center rounded-full bg-rk-green text-black">${icons.shieldCheck}</span>
            <span>Market went against your trade. You saved <b class="text-rk-green">$420</b></span>
          </div>
        </article>
      </div>
    </div>
  </section>`;
}
