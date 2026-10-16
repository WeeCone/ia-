import { revalidateTag } from "next/cache";
import { adminAuth, adminBucket, adminDb } from "@/lib/firebase-admin";
import { getRequestUid } from "@/lib/server-auth";
import { getStripe } from "@/lib/stripe";
import { REVIEWS_TAG } from "@/lib/testimonials";
import { DICTIONARIES } from "@/i18n/dictionaries";
import { requestLocale } from "@/i18n/server";

/** Deletes the caller's account: stops billing, erases Firestore data, then the Firebase Auth user. */
export async function DELETE(request: Request) {
  const text = DICTIONARIES[requestLocale(request)].api;
  const uid = await getRequestUid(request);
  if (!uid) return Response.json({ error: text.sessionExpired }, { status: 401 });

  const userRef = adminDb.collection("users").doc(uid);
  const user = await userRef.get();

  // Stop future charges first. The Stripe customer itself is kept: invoices must be retained for accounting.
  const subscriptionId: string | undefined = user.get("stripeSubscriptionId");
  if (user.get("plan") === "monthly" && subscriptionId) {
    try {
      await getStripe().subscriptions.cancel(subscriptionId);
    } catch (err) {
      console.error("subscription cancel failed", err);
      return Response.json(
        { error: text.cancelFailed },
        { status: 502 },
      );
    }
  }

  await adminDb.recursiveDelete(userRef); // profile + analyses history
  try {
    await adminBucket().deleteFiles({ prefix: `users/${uid}/` }); // their chart screenshots
  } catch (err) {
    console.error("screenshot cleanup failed", err);
  }
  await adminDb.collection("reviews").doc(uid).delete();
  revalidateTag(REVIEWS_TAG, { expire: 0 });
  await adminAuth.deleteUser(uid);

  return new Response(null, { status: 204 });
}
