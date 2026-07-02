import { A } from "../assets";
import { icons } from "../icons";

const methods = ["Bank Cards", "Bybit", "Binance Pay", "Tether USDT", "Tether TRC20", "Tether ERC20"];

const payCard = (label: string) => `
  <div class="grid h-28 w-44 shrink-0 place-items-center rounded-2xl bg-ink-800 ring-1 ring-white/5">
    <span class="text-sm font-semibold text-white/80">${label}</span>
  </div>`;

export function Payments(): string {
  return `
  <section id="payments" class="overflow-hidden bg-ink-950 py-16 sm:py-24">
    <div class="container-rk text-center">
      <h2 class="reveal text-2xl font-bold sm:text-3xl"><span class="text-rk-green">Quick withdrawal</span><br />with local payment options</h2>
      <a href="#payments" class="reveal mt-3 inline-flex items-center gap-1 text-xs font-semibold text-rk-green hover:text-rk-greenBright">Show all 22 ${icons.chevronRight}</a>
    </div>
    <div class="relative mt-10">
      <div class="flex w-max gap-4 px-4 animate-marquee">
        ${[...methods, ...methods].map(payCard).join("")}
      </div>
    </div>
  </section>`;
}

export function Smooth(): string {
  return `
  <section class="bg-ink-950 py-16 sm:py-24">
    <div class="container-rk">
      <h2 class="reveal text-center text-2xl font-bold sm:text-3xl">Smooth trading experience</h2>
      <div class="mt-10 grid gap-4 sm:grid-cols-2">
        <article class="reveal card min-h-[220px] p-6 sm:p-8">
          <h3 class="text-lg font-bold">Deposit just $10 <span class="text-white/55">to start trading</span></h3>
          <img src="${A.coin10}" alt="10 dollar coin representing minimum deposit" class="mx-auto mt-2 w-44" />
        </article>
        <article class="reveal card relative min-h-[220px] overflow-hidden p-6 sm:p-8">
          <h3 class="text-lg font-bold">24/7 local assets</h3>
          <div class="mt-6 flex justify-center">
            <div class="clock relative h-32 w-32 rounded-full ring-4 ring-white/10">
              <span class="clock-hand absolute left-1/2 top-1/2 h-12 w-1 origin-bottom -translate-x-1/2 -translate-y-full rounded bg-rk-green"></span>
              <span class="absolute left-1/2 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white"></span>
            </div>
          </div>
        </article>
        <article class="reveal card relative min-h-[220px] overflow-hidden p-6 sm:p-8">
          <h3 class="relative z-10 text-lg font-bold">Increased profitability <span class="text-white/55">of up to 93%</span></h3>
          <img src="${A.blob93}" alt="93% profitability indicator" class="pointer-events-none absolute -bottom-4 left-1/2 w-64 -translate-x-1/2" />
        </article>
        <article class="reveal card relative min-h-[220px] overflow-hidden p-6 sm:p-8">
          <h3 class="text-lg font-bold">Personal trading advice <span class="text-white/55">from experts</span></h3>
          <a href="#cta" class="mt-2 inline-flex items-center rounded-full bg-rk-green px-3 py-1 text-xs font-bold text-black">Go to</a>
        </article>
      </div>
    </div>
  </section>`;
}
