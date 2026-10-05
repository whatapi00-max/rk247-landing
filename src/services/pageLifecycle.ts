// Page-scoped intervals and focus listeners.
// The SPA never reloads the document, so raw setInterval/window listeners
// outlive their page and keep writing into shared element IDs (e.g.
// "transactionsContainer" exists on wallet, statement, and admin pages).
// Everything registered here is cleared on each route change.

const intervals = new Set<number>();
const focusHandlers = new Set<() => void>();

export function setPageInterval(fn: () => void, ms: number): number {
  const id = window.setInterval(fn, ms);
  intervals.add(id);
  return id;
}

export function onPageFocus(fn: () => void): void {
  focusHandlers.add(fn);
  window.addEventListener('focus', fn);
}

export function clearPageState(): void {
  intervals.forEach((id) => window.clearInterval(id));
  intervals.clear();
  focusHandlers.forEach((fn) => window.removeEventListener('focus', fn));
  focusHandlers.clear();
}
