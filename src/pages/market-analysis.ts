import { PageHero, CtaSection, BackLink } from "./layout";

type MarketCard = {
  date: string;
  title: string;
  image: string;
};

/**
 * Daily market analysis cards.
 * Add a new card at the TOP of this array every day you upload a new image.
 * The image path must be a file inside /public/assets.
 */
const marketCards: MarketCard[] = [
  {
    date: "July 13, 2026",
    title: "Forex Market Mixed as Safe-Haven Dollar Gains on Geopolitical Tensions",
    image: "/assets/july 13 forex market.jpeg",
  },
];

function MarketCardHTML(card: MarketCard): string {
  return `
  <a href="#/" class="reveal card group overflow-hidden block hover:ring-2 hover:ring-rk-green/50 transition-all duration-300">
    <div class="aspect-[16/10] overflow-hidden bg-ink-800">
      <img
        src="${card.image}"
        alt="${card.title}"
        class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        loading="lazy"
      />
    </div>
    <div class="p-4">
      <p class="text-xs font-semibold text-rk-green mb-2">${card.date}</p>
      <h3 class="text-sm font-bold leading-snug text-white/90 group-hover:text-white transition-colors line-clamp-2">${card.title}</h3>
      <p class="mt-3 text-xs text-white/40">Click to view full analysis</p>
    </div>
  </a>`;
}

export function MarketAnalysisPage(): string {
  return `
  ${BackLink()}
  ${PageHero(
    "Market Analysis",
    "Daily market analysis and trend reports. Click any card to view the full report on the main page.",
    "Research"
  )}

  <section class="py-16 bg-ink-950">
    <div class="container-rk">
      <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        ${marketCards.map(MarketCardHTML).join("")}
      </div>

      ${
        marketCards.length === 0
          ? `<div class="reveal card p-12 text-center">
               <p class="text-white/60">No market analysis reports available yet. Check back soon.</p>
             </div>`
          : ""
      }
    </div>
  </section>

  ${CtaSection("Trade the Market Today", "Apply today's analysis on RK247 with a free demo or live account.")}`;
}
