import { A } from "../assets";
import { icons } from "../icons";

export function Globe(): string {
  return `
  <section class="relative overflow-hidden bg-ink-950">
    <!-- earth -->
    <div class="relative">
      <img src="${A.earth}" alt="" class="globe-img mx-auto w-full max-w-5xl select-none" />
      <div class="absolute inset-x-0 top-1/2 flex -translate-y-1/2 flex-col items-center px-4 text-center">
        <h2 class="reveal text-2xl font-bold sm:text-3xl">RK247 operates<br />in 130+ countries</h2>
        <div class="reveal mt-5 flex items-center -space-x-3">
          <img src="${A.people}" alt="" class="h-12 w-auto" />
          <span class="grid h-12 w-12 place-items-center rounded-full bg-rk-green text-2xl font-bold text-black ring-4 ring-ink-950">+</span>
        </div>
        <a href="#footer" class="reveal mt-3 inline-flex items-center gap-1 text-xs font-semibold text-rk-green hover:text-rk-greenBright">Join our communities ${icons.chevronRight}</a>
      </div>
      <div class="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-ink-950 to-transparent"></div>
    </div>
  </section>`;
}

export function CtaFinal(): string {
  return `
  <section id="cta" class="bg-ink-950 pb-20 pt-10">
    <div class="container-rk">
      <div class="grid gap-4 sm:grid-cols-2">
        <article class="reveal card flex min-h-[260px] flex-col justify-center p-6 sm:p-8 text-center">
          <span class="mx-auto grid h-10 w-10 place-items-center rounded-lg bg-amber-500 font-bold text-black">J</span>
          <p class="mt-2 text-xs text-white/50">Jacobo Ortiz</p>
          <h3 class="mt-6 text-lg font-bold">My stats</h3>
          <p class="mx-auto mt-2 max-w-xs text-sm text-white/55">After I started trading FTT on the platform, my profitability increased by about 18%. This is a good result.</p>
          <div class="mx-auto mt-6 flex gap-1.5">
            ${Array.from({ length: 7 })
              .map((_, i) => `<span class="h-1 rounded-full ${i === 0 ? "w-6 bg-white" : "w-1.5 bg-white/25"}"></span>`)
              .join("")}
          </div>
        </article>

        <article class="reveal card relative flex min-h-[260px] flex-col items-center justify-center overflow-hidden p-6 sm:p-8 text-center">
          <h3 class="relative z-10 text-lg font-bold">11 years of excellence</h3>
          <div class="spotlight absolute inset-0 scale-125"></div>
          <img src="${A.elevenAlt}" alt="" class="relative z-10 mt-2 w-48" />
          <div class="relative z-10 mt-2 flex gap-3 text-[10px] text-white/40">
            <span>2018</span><span class="rounded-full bg-white px-2 py-0.5 text-black">2019</span><span>2020</span>
          </div>
        </article>
      </div>

      <a href="#top" class="cta-btn mt-4 flex w-full items-center justify-center rounded-2xl bg-gradient-to-r from-rk-greenDeep via-rk-green to-rk-greenBright py-5 text-lg font-bold text-black shadow-green-glow transition-transform hover:scale-[1.01]">
        Start trading confidently
      </a>
    </div>
  </section>`;
}
