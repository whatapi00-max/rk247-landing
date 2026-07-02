import { A } from "../assets";
import { icons } from "../icons";

export function TradeWidget(): string {
  return `
  <section id="trading" class="bg-ink-950 py-12 sm:py-20">
    <div class="container-rk">
      <div class="reveal card mx-auto flex max-w-3xl flex-col items-stretch gap-6 p-6 sm:flex-row sm:p-8">
        <!-- chart -->
        <div class="relative flex-1 overflow-hidden rounded-2xl bg-ink-900 p-4">
          <svg viewBox="0 0 300 140" class="h-32 w-full" preserveAspectRatio="none">
            <polyline class="trade-line" fill="none" stroke="#15e372" stroke-width="2"
              points="0,90 25,70 50,82 75,40 100,55 125,25 150,60 175,48 200,75 225,55 250,85 275,70 300,95" />
          </svg>
          <div class="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center gap-2">
            <span class="rounded-full bg-rk-green px-3 py-1 text-xs font-bold text-black">$10.00</span>
            <span class="h-px w-16 bg-white/20"></span>
            <span class="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold">1:17:31</span>
          </div>
        </div>
        <!-- copy -->
        <div class="flex flex-1 flex-col justify-center">
          <h3 class="text-xl font-bold">You choose<br /><span class="text-rk-green">the amount and duration</span><br />of your trade</h3>
          <p class="mt-3 text-sm text-white/55">Open trades starting with as little as $1 with durations as low as 5 seconds.</p>
          <div class="mt-5 grid grid-cols-2 gap-3">
            <div class="rounded-xl bg-ink-700 px-4 py-3"><p class="text-xs text-white/45">Amount, $</p><p class="font-semibold">10</p></div>
            <div class="rounded-xl bg-ink-700 px-4 py-3"><p class="text-xs text-white/45">Duration</p><p class="font-semibold">5 min</p></div>
          </div>
        </div>
      </div>
    </div>
  </section>`;
}

export function Broker(): string {
  return `
  <section class="relative overflow-hidden bg-ink-950 py-20 sm:py-28">
    <div class="container-rk relative text-center">
      <h2 class="reveal text-2xl font-bold sm:text-3xl">RK247 is a licensed<br />and regulated online broker</h2>
      <img src="${A.regulationIcons}" alt="Regulators" class="reveal mx-auto mt-6 h-10 w-auto opacity-90" />
      <a href="#footer" class="reveal mt-3 inline-flex items-center gap-1 text-xs font-semibold text-rk-green hover:text-rk-greenBright">Learn more ${icons.chevronRight}</a>
    </div>
  </section>`;
}
