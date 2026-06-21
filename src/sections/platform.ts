import { A } from "../assets";
import { icons } from "../icons";

export function Platform(): string {
  return `
  <section id="download" class="relative overflow-hidden bg-ink-950 py-16 sm:py-24">
    <div class="container-rk relative">
      <h2 class="reveal text-center text-2xl font-bold sm:text-3xl">Modern trading platform</h2>

      <div class="relative mx-auto mt-10 flex max-w-md flex-col items-center">
        <div class="platform-phone relative w-[260px] sm:w-[300px]">
          <img src="${A.hand}" alt="" class="relative z-20 w-full select-none" />
          <!-- phone screen content clipped to the device frame -->
          <div class="absolute left-[7.6%] top-[1%] z-10 w-[38%] overflow-hidden rounded-[1.1rem]" style="aspect-ratio:9/19.2">
            <img src="${A.phoneScreen}" alt="RK247 trading terminal" class="h-full w-full object-cover object-top" />
          </div>
        </div>

        <div class="reveal mt-8 flex items-center gap-3 rounded-2xl bg-rk-green p-3 text-black shadow-green-glow">
          <div class="grid h-16 w-16 place-items-center rounded-xl bg-white">
            <div class="h-12 w-12" style="background:
              conic-gradient(#000 0 0) padding-box,
              repeating-conic-gradient(#000 0 8%, #fff 0 16%);
              mask: radial-gradient(circle, #000 60%, transparent 0) 0 0/8px 8px;"></div>
          </div>
          <div>
            <p class="text-sm font-bold leading-tight">Your financial future<br />is in your hands</p>
            <a href="#download" class="mt-1 inline-flex items-center gap-1 text-xs font-bold underline-offset-2 hover:underline">
              Download app now ${icons.chevronRight}
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>`;
}
