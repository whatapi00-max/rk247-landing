export type RouteHandler = () => string;

const _routes = new Map<string, RouteHandler>();

export function registerRoutes(map: Record<string, RouteHandler>): void {
  for (const [path, fn] of Object.entries(map)) {
    _routes.set(path, fn);
  }
}

/**
 * Returns the SPA route path from the current hash.
 *  '#/trading/forex' → '/trading/forex'
 *  '#top'            → null  (section anchor, ignore)
 *  '' | '#'          → '/'   (home)
 */
export function getRoutePath(): string | null {
  const hash = window.location.hash;
  if (!hash || hash === "#") return "/";
  if (hash.startsWith("#/")) return hash.slice(1); // '/trading' etc.
  return null; // plain anchor link, not a page route
}

export function initRouter(onNavigate: (path: string) => void): void {
  window.addEventListener("hashchange", () => {
    const path = getRoutePath();
    if (path !== null) onNavigate(path);
  });
}
