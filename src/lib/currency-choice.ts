import type { Currency } from "./plans";

/**
 * The Portuguese site is priced in reais (Brazil), but Portuguese readers living in Europe pay in euros. The page is the
 * same static one for both, so the choice is made in the browser, after load: a visitor whose browser is in European
 * Portuguese (pt-PT) or whose clock is in Portugal sees and pays euros. The server sees the choice only when the
 * checkout request carries it, and accepts it for that language alone.
 */
let override: Currency | null = null;
const listeners = new Set<() => void>();

export const getCurrencyOverride = () => override;
export const subscribeCurrency = (listener: () => void) => {
  listeners.add(listener);
  return () => listeners.delete(listener);
};
export const getServerCurrencyOverride = () => null;

export function setCurrencyOverride(currency: Currency | null) {
  if (override === currency) return;
  override = currency;
  listeners.forEach((listener) => listener());
}

const PORTUGAL_ZONES = ["Europe/Lisbon", "Atlantic/Azores", "Atlantic/Madeira"];

/** True for a European-Portuguese reader: pt-PT as the browser's first Portuguese, or a Portuguese time zone. */
export function prefersEuros() {
  try {
    const portuguese = (navigator.languages?.length ? navigator.languages : [navigator.language]).find((tag) => /^pt\b/i.test(tag));
    if (portuguese && /^pt-(?!BR)[A-Z]{2}$/i.test(portuguese)) return true;
    return PORTUGAL_ZONES.includes(Intl.DateTimeFormat().resolvedOptions().timeZone);
  } catch {
    return false;
  }
}
