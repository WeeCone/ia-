import { auth } from "./firebase";
import type { Offer } from "./plans";

/** Calls a billing route and sends the browser to the Stripe URL it returns. */
export async function redirectToBilling(route: "checkout" | "portal", offer?: Offer) {
  const user = auth.currentUser;
  if (!user) throw new Error("Session expirée, reconnectez-vous.");
  const response = await fetch(`/api/billing/${route}`, {
    method: "POST",
    headers: { Authorization: `Bearer ${await user.getIdToken()}`, "Content-Type": "application/json" },
    body: JSON.stringify({ offer }),
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok || !data.url) throw new Error(data.error ?? "Paiement indisponible pour le moment.");
  window.location.assign(data.url);
}

/** Creates a Checkout Session shown inside the site; returns the client secret Stripe.js needs to display it. */
export async function createEmbeddedCheckout(offer: Offer): Promise<string> {
  const user = auth.currentUser;
  if (!user) throw new Error("Session expirée, reconnectez-vous.");
  const response = await fetch("/api/billing/checkout", {
    method: "POST",
    headers: { Authorization: `Bearer ${await user.getIdToken()}`, "Content-Type": "application/json" },
    body: JSON.stringify({ offer, embedded: true }),
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok || !data.clientSecret) throw new Error(data.error ?? "Paiement indisponible pour le moment.");
  return data.clientSecret;
}
