import { A } from "../assets";
import { icons } from "../icons";

export function Confident(): string {
  return `
  <section id="confident" class="bg-ink-950 py-16 sm:py-24">
    <div class="container-rk">
      <h2 class="reveal text-center text-2xl font-bold sm:text-3xl">On your way<br class="sm:hidden" /> to confident trading</h2>

      <div class="mt-10 grid gap-4 sm:grid-cols-2">
        <!-- 24/7 support -->
        <article class="reveal card relative min-h-[260px] overflow-hidden p-6 sm:p-8">
          <h3 class="text-lg font-bold">24/7 support <span class="text-white/55">in your language</span></h3>
          <img src="${A.supportMan}" alt="" class="pointer-events-none absolute -bottom-2 right-0 w-64 object-contain" />
        </article>

        <!-- Trading signals -->
        <article class="reveal card relative min-h-[260px] overflow-hidden p-6 sm:p-8">
          <h3 class="text-lg font-bold">Trading signals <span class="text-white/55">help you notice profitable trends</span></h3>
          <svg viewBox="0 0 320 120" class="mt-6 h-28 w-full" preserveAspectRatio="none">
            <polyline fill="none" stroke="#15e372" stroke-width="2" points="0,20 40,35 80,30 120,55 160,70 200,60 240,85 280,75 320,100"/>
          </svg>
          <span class="absolute left-16 top-24 rounded-full bg-red-500 px-2.5 py-1 text-xs font-bold">$10.00 ↘</span>
          <span class="absolute bottom-10 right-10 rounded-full bg-rk-green px-2.5 py-1 text-xs font-bold text-black">$10.00 ↗</span>
        </article>

        <!-- Strategies -->
        <article class="reveal card relative min-h-[260px] overflow-hidden p-6 sm:p-8">
          <h3 class="text-lg font-bold">Ready-to-use <span class="text-white/55">trading strategies</span></h3>
          <a href="#cta" class="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-rk-green hover:text-rk-greenBright">Try for free ${icons.chevronRight}</a>
          <img src="${A.strategyIcons}" alt="" class="pointer-events-none absolute bottom-0 left-0 w-full object-cover opacity-90" />
        </article>

        <!-- Learning materials -->
        <article class="reveal card min-h-[260px] p-6 sm:p-8">
          <h3 class="text-lg font-bold">In-app learning materials <span class="text-white/55">and YouTube tutorials</span></h3>
          <a href="#cta" class="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-rk-green hover:text-rk-greenBright">Start learning ${icons.chevronRight}</a>
          <div class="mt-5 grid grid-cols-3 gap-2">
            <img src="${A.yt1}" alt="" class="aspect-video w-full rounded-lg object-cover" />
            <img src="${A.yt2}" alt="" class="aspect-video w-full rounded-lg object-cover" />
            <img src="${A.yt3}" alt="" class="aspect-video w-full rounded-lg object-cover" />
          </div>
        </article>
      </div>
    </div>
  </section>`;
}
