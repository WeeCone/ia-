import type { Locale } from "@/i18n/config";
import { DICTIONARIES } from "@/i18n/dictionaries";
import { auth } from "./firebase";
import { pixel } from "./meta-pixel";
import { offerPrice, type Offer } from "./plans";
import { checkoutAttribution, trackEvent } from "./track";

async function callBilling(route: "checkout" | "portal", body: Record<string, unknown>, locale: Locale) {
  const text = DICTIONARIES[locale].checkout;
  const user = auth.currentUser;
  // Signed out, any pack can be bought: Stripe then asks for the email and the account is made from it. The customer
  // portal needs an account.
  if (!user && route !== "checkout") throw new Error(text.sessionExpired);
  if (route === "checkout") {
    trackEvent("checkout");
    const offer = body.offer as Offer | undefined;
    if (offer) {
      const { amount, currency } = offerPrice(locale, offer);
      pixel("InitiateCheckout", { value: amount, currency: currency.toUpperCase() });
    }
    body = { ...body, ...checkoutAttribution() };
  }
  const response = await fetch(`/api/billing/${route}`, {
    method: "POST",
    headers: {
      ...(user ? { Authorization: `Bearer ${await user.getIdToken()}` } : {}),
      "Content-Type": "application/json",
      "X-Locale": locale,
    },
    body: JSON.stringify({ ...body, locale }),
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(data.error ?? text.unavailable);
  return data as { url?: string; clientSecret?: string };
}

/** Calls a billing route and sends the browser to the Stripe URL it returns. */
export async function redirectToBilling(route: "checkout" | "portal", offer: Offer | undefined, locale: Locale) {
  const { url } = await callBilling(route, { offer }, locale);
  if (!url) throw new Error(DICTIONARIES[locale].checkout.unavailable);
  window.location.assign(url);
}

/** Creates a Checkout Session shown inside the site; returns the client secret Stripe.js needs to display it. */
export async function createEmbeddedCheckout(offer: Offer, locale: Locale): Promise<string> {
  const { clientSecret } = await callBilling("checkout", { offer, embedded: true }, locale);
  if (!clientSecret) throw new Error(DICTIONARIES[locale].checkout.unavailable);
  return clientSecret;
}
