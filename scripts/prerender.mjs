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

const escapeHtml = (value) => value
  .replaceAll("&", "&amp;")
  .replaceAll("<", "&lt;")
  .replaceAll(">", "&gt;")
  .replaceAll('"', "&quot;");

const replaceMeta = (html, selector, value) => {
  const escapedSelector = selector.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return html.replace(
    new RegExp(`(<meta ${escapedSelector} content=")[^"]*("\\s*/?>)`),
    `$1${escapeHtml(value)}$2`,
  );
};

for (const [path, metadata] of Object.entries(allSeo)) {
  const canonicalUrl = path === "/" ? `${baseUrl}/` : `${baseUrl}${path}`;
  const imageUrl = new URL(metadata.image ?? defaultSeo.image, baseUrl).href;
  let html = template
    .replace(/<title>[\s\S]*?<\/title>/, `<title>${escapeHtml(metadata.title)}</title>`)
    .replace(/<link rel="canonical" href="[^"]*"\s*\/>/, `<link rel="canonical" href="${canonicalUrl}" />`)
    .replace(/<link rel="alternate" hreflang="en" href="[^"]*"\s*\/>/, `<link rel="alternate" hreflang="en" href="${canonicalUrl}" />`)
    .replace(/<link rel="alternate" hreflang="x-default" href="[^"]*"\s*\/>/, `<link rel="alternate" hreflang="x-default" href="${canonicalUrl}" />`);

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

  const crawlableContent = `<main><section><h1>${escapeHtml(metadata.title.replace(/ \| RK247$| – RK247.*$| - RK247.*$/, ""))}</h1><p>${escapeHtml(metadata.description)}</p><nav aria-label="Related pages"><a href="/">RK247 home</a> <a href="/trading">Trading markets</a> <a href="/market-analysis">Market analysis</a> <a href="/help/support">Support</a></nav></section></main>`;
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
