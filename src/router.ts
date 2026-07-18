export type RouteHandler = () => string;

const _routes = new Map<string, RouteHandler>();

export function registerRoutes(map: Record<string, RouteHandler>): void {
  for (const [path, fn] of Object.entries(map)) {
    _routes.set(path, fn);
  }
}

/**
 * Returns the SPA route path from the current URL path.
 *  '/trading/forex' → '/trading/forex'
 *  ''               → '/'   (home)
 */
export function getRoutePath(): string {
  const path = window.location.pathname;
  return path || "/";
}

export function initRouter(onNavigate: (path: string) => void): void {
  window.addEventListener("popstate", () => {
    const path = getRoutePath();
    onNavigate(path);
  });

  // Intercept all link clicks for internal navigation
  document.addEventListener("click", (e) => {
    const link = (e.target as HTMLElement).closest("a");
    if (!link) return;

    const href = link.getAttribute("href");
    if (!href) return;

    // Skip external links, anchors, and links with target="_blank"
    if (href.startsWith("http") || href.startsWith("#") || link.target === "_blank") {
      return;
    }

    e.preventDefault();
    const newPath = href || "/";
    window.history.pushState({}, "", newPath);
    onNavigate(newPath);
  });
}
