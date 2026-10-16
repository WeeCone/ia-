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
    return offer === "monthly" || offer === "lifetime" ? offer : null;
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
