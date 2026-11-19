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

/**
 * Social apps open links in their own in-page browser (Instagram, TikTok, Facebook, Snapchat, LINE, WeChat). A payment
 * form inside a pop-up inside that browser is fragile (3D Secure switches app, the page is reloaded) and looks like
 * phishing to a cold visitor: there, Stripe's own page is used instead.
 */
export function inAppBrowser() {
  if (typeof navigator === "undefined") return false;
  return /FBAN|FBAV|FB_IAB|Instagram|TikTok|musical_ly|BytedanceWebview|Snapchat|Line\/|MicroMessenger|; wv\)/i.test(navigator.userAgent);
}

/** Stripe's form inside the site, unless this browser is a social app's. Read when the button is clicked. */
export const embeddedCheckout = () => EMBEDDED_CHECKOUT && !inAppBrowser();

export function openCheckout(offer: Offer) {
  window.dispatchEvent(new CustomEvent<Offer>(CHECKOUT_EVENT, { detail: offer }));
}

export function onOpenCheckout(listener: (offer: Offer) => void) {
  const handler = (event: Event) => listener((event as CustomEvent<Offer>).detail);
  window.addEventListener(CHECKOUT_EVENT, handler);
  return () => window.removeEventListener(CHECKOUT_EVENT, handler);
}

// The payment window was closed without paying: whatever stood behind it (the free reading) can come back.
const CHECKOUT_CLOSED_EVENT = "scanzivo:checkout-closed";

export function notifyCheckoutClosed() {
  window.dispatchEvent(new Event(CHECKOUT_CLOSED_EVENT));
}

export function onCheckoutClosed(listener: () => void) {
  window.addEventListener(CHECKOUT_CLOSED_EVENT, listener);
  return () => window.removeEventListener(CHECKOUT_CLOSED_EVENT, listener);
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
    // The trial is no longer sold: an old saved choice falls back to nothing.
    return offer === "starter" || offer === "monthly" || offer === "lifetime" ? offer : null;
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

/** The previewed analysis's id without taking it: checkout sends it to the server, which remembers it with the payment. */
export function peekPreview() {
  try {
    return sessionStorage.getItem(PREVIEW_KEY);
  } catch {
    return null;
  }
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

/**
 * Everything a visitor left waiting in this tab (a chart, its free reading, a chosen pack): dropped when the account
 * changes or signs out, so the next person on the same browser never inherits it.
 */
export function clearPendingWork() {
  try {
    for (const key of [PENDING_OFFER_KEY, AUTO_ANALYZE_KEY, PREVIEW_KEY, "scanzivo:pending-chart"]) sessionStorage.removeItem(key);
  } catch {}
}
