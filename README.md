# RK247 — Landing Page

A modern, animated trading-platform landing page for **RK247**, built with Vite, TypeScript, Tailwind CSS and GSAP.

## Stack

- **Vite 5** — dev server & bundler
- **TypeScript** — typed, modular section components
- **Tailwind CSS 3** — utility-first styling, custom theme in `tailwind.config.js`
- **GSAP + ScrollTrigger** — hero timeline, reveal-on-scroll, parallax, chart line-draw

## Getting started

```bash
npm install
npm run dev      # start dev server at http://localhost:5173
npm run build    # type-check + production build to /dist
npm run preview  # preview the production build
```

## Project structure

```
index.html              # entry HTML
public/assets/          # images (webp/png)
src/
  main.ts               # mounts sections + wires interactions
  animations.ts         # all GSAP animations
  assets.ts             # central asset path map
  icons.ts              # inline SVG icons
  style.css             # Tailwind layers + custom components
  sections/             # one module per page section
    header.ts hero.ts anniversary.ts platform.ts riskfree.ts
    broker.ts confident.ts payments.ts globe.ts footer.ts
```

## Notes

- The page is fully responsive (mobile, tablet, desktop) with a slide-in mobile menu.
- Interactions: scroll-aware header, dropdown nav, cookie banner, bonus popup, smooth-scroll anchors.
- Content is original demo copy. This is a demonstration project and does not provide real financial services.
