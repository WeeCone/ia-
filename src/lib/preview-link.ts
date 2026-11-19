import "server-only";
import type Stripe from "stripe";
import { adminDb } from "./firebase-admin";

/** What the checkout carried: the free reading the buyer saw just before paying (see lib/offers-client peekPreview). */
export const PREVIEW_ID = /^[A-Za-z0-9]{10,40}$/;

/**
 * After a payment: notes on the buyer's account which free reading it was for, so the dashboard unlocks it by itself,
 * whatever happened to the browser in between (in-app webview, 3DS app switch, another device). Safe to call twice.
 */
export async function rememberPreview(uid: string, session: Stripe.Checkout.Session) {
  const id = session.metadata?.pv;
  if (!id || !PREVIEW_ID.test(id)) return;
  const ref = adminDb.collection("users").doc(uid);
  if (!(await ref.get()).exists) return;
  // Not again once that reading was claimed by this account.
  const preview = await adminDb.collection("previews").doc(id).get();
  if (!preview.exists || preview.get("claimedBy")) return;
  await ref.update({ pendingPreviewId: id });
}
