import { Header } from "../sections/header";
import { Footer, Overlays } from "../sections/footer";
import { icons } from "../icons";

export function PageLayout(content: string): string {
  return [
    Header(),
    `<main class="min-h-screen bg-ink-950">`,
    content,
    `</main>`,
    Footer(),
    Overlays(),
  ].join("");
}

export function PageHero(
  title: string,
  subtitle: string,
  breadcrumb?: string
): string {
  return `
  <section class="relative pt-36 sm:pt-40 pb-16 sm:pb-20 bg-ink-950 overflow-hidden">
    <div class="pointer-events-none absolute inset-0" style="background:radial-gradient(ellipse at 50% -10%,rgba(21,227,114,0.35) 0%,rgba(0,0,0,0) 65%)"></div>
    <div class="container-rk relative text-center">
      <h1 class="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight">${title}</h1>
      <p class="mt-4 text-base sm:text-lg text-white/60 max-w-2xl mx-auto leading-relaxed">${subtitle}</p>
    </div>
  </section>`;
}

export function CtaSection(
  headline = "Ready to start trading?",
  sub = "Join millions of traders on RK247 today."
): string {
  return `
  <section class="py-20 bg-ink-900 text-center">
    <div class="container-rk">
      <h2 class="text-2xl font-bold sm:text-3xl">${headline}</h2>
      <p class="mt-3 text-white/55">${sub}</p>
      <div class="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
        <button class="btn-green px-10 py-4 text-base" data-wa>Create Free Account</button>
        <button class="btn-ghost px-8 py-4 text-base" data-wa>Sign In</button>
      </div>
    </div>
  </section>`;
}

export function FeatureGrid(
  items: { icon: string; title: string; desc: string }[]
): string {
  return `
  <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
    ${items
      .map(
        (f) => `
      <div class="reveal card p-6">
        <div class="mb-4 text-3xl">${f.icon}</div>
        <h3 class="font-bold text-white">${f.title}</h3>
        <p class="mt-2 text-sm text-white/55 leading-relaxed">${f.desc}</p>
      </div>`
      )
      .join("")}
  </div>`;
}

export function StepList(
  steps: { num: string; title: string; desc: string }[]
): string {
  return `
  <ol class="relative space-y-8 border-l border-white/10 pl-8">
    ${steps
      .map(
        (s) => `
      <li class="reveal relative">
        <div class="absolute -left-[2.35rem] flex h-8 w-8 items-center justify-center rounded-full bg-rk-green text-sm font-extrabold text-black">${s.num}</div>
        <h3 class="font-bold text-white text-lg">${s.title}</h3>
        <p class="mt-1 text-sm text-white/55 leading-relaxed">${s.desc}</p>
      </li>`
      )
      .join("")}
  </ol>`;
}

export function BackLink(label = "← Back to Home"): string {
  return `
  <div class="container-rk pt-6">
    <a href="/" class="text-sm font-medium text-white/50 hover:text-rk-green transition-colors">${label}</a>
  </div>`;
}

export { icons };
