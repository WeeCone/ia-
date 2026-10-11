import { auth } from "./firebase";

/** Calls a billing route and sends the browser to the Stripe URL it returns. */
export async function redirectToBilling(route: "checkout" | "portal") {
  const user = auth.currentUser;
  if (!user) throw new Error("Session expirée, reconnectez-vous.");
  const response = await fetch(`/api/billing/${route}`, {
    method: "POST",
    headers: { Authorization: `Bearer ${await user.getIdToken()}` },
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok || !data.url) throw new Error(data.error ?? "Paiement indisponible pour le moment.");
  window.location.assign(data.url);
}
