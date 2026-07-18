import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import vm from "node:vm";

const root = process.cwd();
const distIndexPath = join(root, "dist", "index.html");
const seoSource = await readFile(join(root, "src", "seo.ts"), "utf8");
const executableSeo = seoSource
  .replace(/export type SeoMetadata = \{[\s\S]*?\};\s*/, "")
  .replace(/: SeoMetadata/g, "")
  .replace(/: Record<string, SeoMetadata>/g, "")
  .replace(/export const/g, "const")
  .concat("\nresult = { defaultSeo, routeSeo };");
const context = { result: undefined };
vm.runInNewContext(executableSeo, context);
const { defaultSeo, routeSeo } = context.result;
const template = await readFile(distIndexPath, "utf8");
const baseUrl = "https://www.rk247.org";
const reportSource = await readFile(join(root, "src", "pages", "market-analysis.ts"), "utf8");
const reportPattern = /slug:\s*"([^"]+)"[\s\S]*?title:\s*"([^"]+)"[\s\S]*?image:\s*"([^"]+)"[\s\S]*?summary:\s*\n?\s*"([^"]+)"/g;
const reportSeo = Object.fromEntries(
  [...reportSource.matchAll(reportPattern)].map((match) => [
    `/market-analysis/${match[1]}`,
    { title: `${match[2]} | RK247`, description: match[4], image: match[3] },
  ]),
);
const allSeo = { ...routeSeo, ...reportSeo };

const breadcrumbs = {
  "/": [{ name: "Home", path: "/" }],
  "/trading": [{ name: "Home", path: "/" }, { name: "Trading", path: "/trading" }],
  "/trading/flex": [{ name: "Home", path: "/" }, { name: "Trading", path: "/trading" }, { name: "Flex Trading", path: "/trading/flex" }],
  "/trading/fixed-time": [{ name: "Home", path: "/" }, { name: "Trading", path: "/trading" }, { name: "Fixed Time Trading", path: "/trading/fixed-time" }],
  "/trading/forex": [{ name: "Home", path: "/" }, { name: "Trading", path: "/trading" }, { name: "Forex Trading", path: "/trading/forex" }],
  "/trading/stocks": [{ name: "Home", path: "/" }, { name: "Trading", path: "/trading" }, { name: "Stock Trading", path: "/trading/stocks" }],
  "/trading/how-to-trade": [{ name: "Home", path: "/" }, { name: "Trading", path: "/trading" }, { name: "How to Trade", path: "/trading/how-to-trade" }],
  "/trading/account": [{ name: "Home", path: "/" }, { name: "Trading", path: "/trading" }, { name: "Account", path: "/trading/account" }],
  "/trading/islamic-account": [{ name: "Home", path: "/" }, { name: "Trading", path: "/trading" }, { name: "Islamic Account", path: "/trading/islamic-account" }],
  "/trading/demo": [{ name: "Home", path: "/" }, { name: "Trading", path: "/trading" }, { name: "Demo Account", path: "/trading/demo" }],
  "/trading/promotions": [{ name: "Home", path: "/" }, { name: "Trading", path: "/trading" }, { name: "Promotions", path: "/trading/promotions" }],
  "/trading/withdrawals": [{ name: "Home", path: "/" }, { name: "Trading", path: "/trading" }, { name: "Withdrawals", path: "/trading/withdrawals" }],
  "/trading/assets": [{ name: "Home", path: "/" }, { name: "Trading", path: "/trading" }, { name: "Assets", path: "/trading/assets" }],
  "/download": [{ name: "Home", path: "/" }, { name: "Download", path: "/download" }],
  "/download/desktop": [{ name: "Home", path: "/" }, { name: "Download", path: "/download" }, { name: "Desktop App", path: "/download/desktop" }],
  "/download/android": [{ name: "Home", path: "/" }, { name: "Download", path: "/download" }, { name: "Android App", path: "/download/android" }],
  "/download/android-apk": [{ name: "Home", path: "/" }, { name: "Download", path: "/download" }, { name: "Android APK", path: "/download/android-apk" }],
  "/download/web-app": [{ name: "Home", path: "/" }, { name: "Download", path: "/download" }, { name: "Web App", path: "/download/web-app" }],
  "/about": [{ name: "Home", path: "/" }, { name: "About", path: "/about" }],
  "/about/contacts": [{ name: "Home", path: "/" }, { name: "About", path: "/about" }, { name: "Contacts", path: "/about/contacts" }],
  "/about/social": [{ name: "Home", path: "/" }, { name: "About", path: "/about" }, { name: "Social", path: "/about/social" }],
  "/about/awards": [{ name: "Home", path: "/" }, { name: "About", path: "/about" }, { name: "Awards", path: "/about/awards" }],
  "/about/news": [{ name: "Home", path: "/" }, { name: "About", path: "/about" }, { name: "News", path: "/about/news" }],
  "/about/reviews": [{ name: "Home", path: "/" }, { name: "About", path: "/about" }, { name: "Reviews", path: "/about/reviews" }],
  "/help/support": [{ name: "Home", path: "/" }, { name: "Help", path: "/help/support" }],
  "/help/faq": [{ name: "Home", path: "/" }, { name: "Help", path: "/help/faq" }],
  "/help/learning": [{ name: "Home", path: "/" }, { name: "Help", path: "/help/learning" }],
  "/market-analysis": [{ name: "Home", path: "/" }, { name: "Market Analysis", path: "/market-analysis" }],
  "/legal": [{ name: "Home", path: "/" }, { name: "Legal", path: "/legal" }],
  "/regulation": [{ name: "Home", path: "/" }, { name: "Regulation", path: "/regulation" }],
  "/cookie-policy": [{ name: "Home", path: "/" }, { name: "Cookie Policy", path: "/cookie-policy" }],
};

const getBreadcrumbSchema = (path, metadata) => {
  let items = breadcrumbs[path];
  if (!items) {
    if (path.startsWith("/market-analysis/")) {
      items = [{ name: "Home", path: "/" }, { name: "Market Analysis", path: "/market-analysis" }, { name: metadata.title.replace(/ \| RK247$/, ""), path }];
    } else {
      items = [{ name: "Home", path: "/" }];
    }
  }
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.path === "/" ? baseUrl : `${baseUrl}${item.path}`,
    })),
  };
};

const getPageSchema = (path, metadata) => {
  const breadcrumbSchema = getBreadcrumbSchema(path, metadata);
  const schemas = [breadcrumbSchema];

  if (path.startsWith("/trading") || path === "/") {
    schemas.push({
      "@context": "https://schema.org",
      "@type": "FinancialService",
      name: "RK247",
      description: metadata.description,
      url: path === "/" ? baseUrl : `${baseUrl}${path}`,
      provider: {
        "@type": "Organization",
        name: "RK247",
        url: baseUrl,
      },
    });
  } else if (path.startsWith("/market-analysis/")) {
    schemas.push({
      "@context": "https://schema.org",
      "@type": "Article",
      headline: metadata.title,
      description: metadata.description,
      url: `${baseUrl}${path}`,
      image: metadata.image ? `${baseUrl}${metadata.image}` : `${baseUrl}${defaultSeo.image}`,
      publisher: {
        "@type": "Organization",
        name: "RK247",
        url: baseUrl,
      },
    });
  } else {
    schemas.push({
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: metadata.title,
      description: metadata.description,
      url: path === "/" ? baseUrl : `${baseUrl}${path}`,
    });
  }

  return schemas.map((schema) => `<script type="application/ld+json">${JSON.stringify(schema)}</script>`).join("\n    ");
};

const pageContent = {
  "/": {
    h1: "Build confidence with every single trade",
    p: "Trade Forex, stocks, indices and crypto on RK247 with fast execution, trading tools and educational resources.",
  },
  "/trading": {
    h1: "Trade Any Market, Any Time",
    p: "Access Forex, Stocks, Crypto, Indices and more — all from one account with ultra-fast execution.",
  },
  "/market-analysis": {
    h1: "Daily Market Analysis",
    p: "Read daily RK247 market analysis covering Forex, crypto, commodities and global stock indices with technical levels and commentary.",
  },
};

const escapeHtml = (value) => value
  .replaceAll("&", "&amp;")
  .replaceAll("<", "&lt;")
  .replaceAll(">", "&gt;")
  .replaceAll('"', "&quot;");

const replaceMeta = (html, selector, value) => {
  const escapedSelector = selector.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const escapedValue = escapeHtml(value);
  const regex = new RegExp(`(<meta ${escapedSelector} content=")([^"]*)("\\s*/?>)`);
  return html.replace(regex, (match, p1, p2, p3) => `${p1}${escapedValue}${p3}`);
};

for (const [path, metadata] of Object.entries(allSeo)) {
  const canonicalUrl = path === "/" ? `${baseUrl}/` : `${baseUrl}${path}`;
  const imageUrl = new URL(metadata.image ?? defaultSeo.image, baseUrl).href;
  let html = template
    .replace(/<title>[\s\S]*?<\/title>/, (match) => `<title>${escapeHtml(metadata.title)}</title>`)
    .replace(/<link rel="canonical" href="[^"]*"\s*\/>/, `<link rel="canonical" href="${canonicalUrl}" />`)
    .replace(/<link rel="alternate" hreflang="en" href="[^"]*"\s*\/>/, `<link rel="alternate" hreflang="en" href="${canonicalUrl}" />`)
    .replace(/<link rel="alternate" hreflang="x-default" href="[^"]*"\s*\/>/, `<link rel="alternate" hreflang="x-default" href="${canonicalUrl}" />`)
    .replace(/<meta name="robots"[^>]*>/, `<meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1">`);

  html = replaceMeta(html, 'name="description"', metadata.description);
  html = replaceMeta(html, 'property="og:url"', canonicalUrl);
  html = replaceMeta(html, 'property="og:title"', metadata.title);
  html = replaceMeta(html, 'property="og:description"', metadata.description);
  html = replaceMeta(html, 'property="og:image"', imageUrl);
  html = replaceMeta(html, 'property="og:image:width"', metadata.image && metadata.image !== defaultSeo.image ? "1536" : "1200");
  html = replaceMeta(html, 'property="og:image:height"', metadata.image && metadata.image !== defaultSeo.image ? "1024" : "630");
  html = replaceMeta(html, 'name="twitter:url"', canonicalUrl);
  html = replaceMeta(html, 'name="twitter:title"', metadata.title);
  html = replaceMeta(html, 'name="twitter:description"', metadata.description);
  html = replaceMeta(html, 'name="twitter:image"', imageUrl);

  const pageSchema = getPageSchema(path, metadata);
  html = html.replace(/<script type="application\/ld\+json">[\s\S]*?<\/script>\s*<script type="application\/ld\+json">[\s\S]*?<\/script>/, pageSchema);

  const content = pageContent[path] || { h1: metadata.title.replace(/ \| RK247$| – RK247.*$| - RK247.*$/, ""), p: metadata.description };
  const crawlableContent = `<main><section><h1>${escapeHtml(content.h1)}</h1><p>${escapeHtml(content.p)}</p><nav aria-label="Related pages"><a href="/">RK247 home</a> <a href="/trading">Trading markets</a> <a href="/market-analysis">Market analysis</a> <a href="/help/support">Support</a></nav></section></main>`;
  html = html.replace(/<div id="app">[\s\S]*?<\/div>\s*<noscript>/, `<div id="app">${crawlableContent}</div>\n    <noscript>`);

  const outputPath = path === "/"
    ? distIndexPath
    : join(root, "dist", path.slice(1), "index.html");
  await mkdir(dirname(outputPath), { recursive: true });
  await writeFile(outputPath, html);
}

const sitemapPaths = Object.keys(allSeo);
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapPaths.map((path) => {
  const url = path === "/" ? `${baseUrl}/` : `${baseUrl}${path}`;
  const changefreq = path.startsWith("/market-analysis") ? "daily" : "monthly";
  const priority = path === "/" ? "1.0" : path === "/trading" || path === "/market-analysis" ? "0.9" : "0.7";
  return `  <url><loc>${url}</loc><changefreq>${changefreq}</changefreq><priority>${priority}</priority></url>`;
}).join("\n")}
</urlset>
`;
await writeFile(join(root, "public", "sitemap.xml"), sitemap);
await writeFile(join(root, "dist", "sitemap.xml"), sitemap);

console.log(`Prerendered ${Object.keys(allSeo).length} routes and generated ${sitemapPaths.length} sitemap URLs.`);
