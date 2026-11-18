import "server-only";
import { randomBytes, timingSafeEqual } from "node:crypto";
import { FieldValue } from "firebase-admin/firestore";
import { adminDb } from "./firebase-admin";

/**
 * Optional marketing e-mails (tips and offers): sent only to accounts that said yes (a box left unticked at sign-up, or
 * the question in the dashboard), each e-mail carries a link to say no again. Account and payment e-mails are not
 * concerned. A token kept on the account makes the unsubscribe link work without signing in.
 */
export async function setMarketingConsent(uid: string, consent: boolean) {
  const ref = adminDb.collection("users").doc(uid);
  const snap = await ref.get();
  if (!snap.exists) return false;
  await ref.update({
    marketingConsent: consent,
    marketingDecidedAt: FieldValue.serverTimestamp(),
    ...(consent ? { marketingConsentAt: FieldValue.serverTimestamp(), unsubscribeToken: snap.get("unsubscribeToken") ?? randomBytes(16).toString("hex") } : {}),
  });
  return true;
}

/** Withdraws the consent of the account behind an unsubscribe link, when the token is the one kept on the account. */
export async function unsubscribeWithToken(uid: string, token: string) {
  const ref = adminDb.collection("users").doc(uid);
  const snap = await ref.get();
  const expected = snap.get("unsubscribeToken");
  if (typeof expected !== "string" || expected.length < 16) return false;
  const a = Buffer.from(token);
  const b = Buffer.from(expected);
  if (a.length !== b.length || !timingSafeEqual(a, b)) return false;
  await ref.update({ marketingConsent: false, marketingDecidedAt: FieldValue.serverTimestamp() });
  return true;
}

export const unsubscribeUrl = (appUrl: string, uid: string, token: string, locale: string) =>
  `${appUrl}/api/emails/unsubscribe?u=${encodeURIComponent(uid)}&t=${encodeURIComponent(token)}&l=${encodeURIComponent(locale)}`;
