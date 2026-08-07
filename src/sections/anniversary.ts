import { A } from "../assets";
import { icons } from "../icons";

export function Anniversary(): string {
  return `
  <section id="about" class="relative overflow-hidden bg-ink-950 py-24 sm:py-32">
    <div class="container-rk relative flex flex-col items-center text-center">
      <div class="relative flex items-center justify-center">
        <div class="spotlight absolute inset-0 -z-0 scale-150"></div>
        <img src="${A.eleven}" alt="11 years" class="anniv-img relative z-10 w-[420px] max-w-full select-none sm:w-[560px]" />
      </div>
      <h2 class="reveal mt-6 max-w-xl text-2xl font-bold leading-tight sm:text-3xl">
        11 years of empowering traders,<br class="hidden sm:block" /> and it's just a beginning.
      </h2>
      <p class="reveal mt-3 max-w-md text-sm text-white/55">
        Discover RK247's transformed and enhanced trading experience. Feel care that counts.
      </p>
    </div>
  </section>`;
}

export function Statement(): string {
  return `
  <section id="features" class="bg-ink-950 py-20 sm:py-28">
    <div class="container-rk text-center">
      <h2 class="statement text-3xl font-extrabold leading-tight sm:text-5xl md:text-6xl">
        Discover the perfect<br />blend of <span class="text-rk-green">care, reliability</span><br />and <span class="text-rk-green">usability</span>
      </h2>
    </div>
  </section>`;
}
