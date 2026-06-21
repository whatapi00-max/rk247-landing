import { A } from "../assets";
import { icons } from "../icons";

const chips = [
  { icon: A.fire, label: "Modern platform" },
  { icon: A.love, label: "Useful features" },
  { icon: A.finish, label: "Easy start" },
  { icon: A.books, label: "Learning center" },
  { icon: A.money, label: "Quick withdrawals" },
  { icon: A.shield, label: "Trusted broker" },
];

// Decorative animated chart bars behind the hero figure.
const bars = Array.from({ length: 9 })
  .map((_, i) => {
    const heights = [42, 64, 80, 52, 96, 70, 88, 58, 46];
    return `<div class="hero-bar rounded-t-3xl bg-gradient-to-b from-white/[0.07] to-white/[0.01]" style="height:${heights[i]}%"></div>`;
  })
  .join("");

export function Hero(): string {
  return `
  <section id="top" class="relative min-h-[90svh] overflow-x-hidden pt-12">
    <!-- background bars -->
    <div class="pointer-events-none absolute inset-0 flex items-end justify-center gap-3 px-6 opacity-70 sm:gap-6">
      ${bars}
    </div>
    <div class="pointer-events-none absolute inset-0 bg-gradient-to-b from-ink-950/40 via-transparent to-ink-950"></div>

    <div class="container-rk relative flex min-h-[calc(90svh-3rem)] flex-col items-center justify-end pb-4 overflow-hidden">
      <img
        src="${A.heroMan}"
        alt=""
        class="hero-man pointer-events-none relative z-10 mt-2 w-[180px] max-w-[50vw] select-none sm:absolute sm:bottom-[7.5rem] sm:left-1/2 sm:mt-0 sm:w-[360px] sm:max-w-none sm:-translate-x-1/2 md:w-[420px]"
      />

      <div class="relative z-20 mb-2 max-w-2xl text-center">
        <h1 class="hero-title text-balance text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-5xl md:text-6xl">
          Build confidence<br />with every single trade
        </h1>
        <div class="mt-7 flex flex-col items-center gap-3">
          <a href="#cta" class="btn-green px-8 py-3.5 text-base">Start now for $0</a>
          <a href="#features" class="inline-flex items-center gap-1 text-sm font-semibold text-rk-green hover:text-rk-greenBright">
            Learn more ${icons.chevronRight}
          </a>
        </div>
      </div>

      <div class="relative z-20 flex max-w-full flex-wrap items-center justify-center gap-2">
        ${chips
          .map(
            (c) => `<span class="chip"><img src="${c.icon}" alt="" class="h-4 w-4" />${c.label}</span>`
          )
          .join("")}
      </div>
    </div>
  </section>`;
}
