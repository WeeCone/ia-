import { adminAuth, adminDb } from "@/lib/firebase-admin";
import { getRequestUid } from "@/lib/server-auth";
import { getStripe } from "@/lib/stripe";

/** Deletes the caller's account: stops billing, erases Firestore data, then the Firebase Auth user. */
export async function DELETE(request: Request) {
  const uid = await getRequestUid(request);
  if (!uid) return Response.json({ error: "Session expirée, reconnectez-vous." }, { status: 401 });

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
        { error: "Impossible de résilier votre abonnement pour le moment. Réessayez ou contactez-nous." },
        { status: 502 },
      );
    }
  }

  await adminDb.recursiveDelete(userRef); // profile + analyses history
  await adminDb.collection("reviews").doc(uid).delete();
  await adminAuth.deleteUser(uid);

  return new Response(null, { status: 204 });
}
