import type { Offer } from "./plans";

// The offer picker lives in the dashboard; any button there can open it without prop drilling.
const OPEN_EVENT = "scanzivo:open-offers";

export function openOffers() {
  window.dispatchEvent(new Event(OPEN_EVENT));
}

export function onOpenOffers(listener: () => void) {
  window.addEventListener(OPEN_EVENT, listener);
  return () => window.removeEventListener(OPEN_EVENT, listener);
}

// Payment inside the site (Stripe embedded checkout) when the publishable key is configured; otherwise Stripe's page.
export const EMBEDDED_CHECKOUT = Boolean(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);
const CHECKOUT_EVENT = "scanzivo:checkout";

export function openCheckout(offer: Offer) {
  window.dispatchEvent(new CustomEvent<Offer>(CHECKOUT_EVENT, { detail: offer }));
}

export function onOpenCheckout(listener: (offer: Offer) => void) {
  const handler = (event: Event) => listener((event as CustomEvent<Offer>).detail);
  window.addEventListener(CHECKOUT_EVENT, handler);
  return () => window.removeEventListener(CHECKOUT_EVENT, handler);
}

// An offer picked on the pricing page before having an account: checkout starts as soon as the account exists.
const PENDING_OFFER_KEY = "scanzivo:pending-offer";

export function savePendingOffer(offer: Offer) {
  try {
    sessionStorage.setItem(PENDING_OFFER_KEY, offer);
  } catch {}
}

export function takePendingOffer(): Offer | null {
  try {
    const offer = sessionStorage.getItem(PENDING_OFFER_KEY);
    sessionStorage.removeItem(PENDING_OFFER_KEY);
    // Lifetime is no longer sold: an old saved choice falls back to nothing.
    return offer === "monthly" || offer === "trial" ? offer : null;
  } catch {
    return null;
  }
}

export function hasPendingOffer() {
  try {
    return sessionStorage.getItem(PENDING_OFFER_KEY) !== null;
  } catch {
    return false;
  }
}

// A chart dropped on the landing page by a visitor without an account: shown back with its "Analyse" button.
const CHART_READY_EVENT = "scanzivo:chart-ready";

export function openChartReady() {
  window.dispatchEvent(new Event(CHART_READY_EVENT));
}

export function onOpenChartReady(listener: () => void) {
  window.addEventListener(CHART_READY_EVENT, listener);
  return () => window.removeEventListener(CHART_READY_EVENT, listener);
}

// "Analyse" was clicked before paying: the dashboard runs the waiting chart by itself once the account has credits.
const AUTO_ANALYZE_KEY = "scanzivo:auto-analyze";

export function requestAutoAnalyze() {
  try {
    sessionStorage.setItem(AUTO_ANALYZE_KEY, "1");
  } catch {}
}

export function takeAutoAnalyze() {
  try {
    const requested = sessionStorage.getItem(AUTO_ANALYZE_KEY) === "1";
    sessionStorage.removeItem(AUTO_ANALYZE_KEY);
    return requested;
  } catch {
    return false;
  }
}

// A chart previewed on the landing page: once the trial is paid, the dashboard unlocks that same analysis.
const PREVIEW_KEY = "scanzivo:preview";

export function savePreview(id: string) {
  try {
    sessionStorage.setItem(PREVIEW_KEY, id);
  } catch {}
}

export function takePreview() {
  try {
    const id = sessionStorage.getItem(PREVIEW_KEY);
    sessionStorage.removeItem(PREVIEW_KEY);
    return id;
  } catch {
    return null;
  }
}
