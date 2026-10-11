import { adminDb } from "@/lib/firebase-admin";
import { getRequestUid } from "@/lib/server-auth";
import { appUrl, getStripe } from "@/lib/stripe";

export async function POST(request: Request) {
  const uid = await getRequestUid(request);
  if (!uid) return Response.json({ error: "Session expirée, reconnectez-vous." }, { status: 401 });

  const userRef = adminDb.collection("users").doc(uid);
  const user = await userRef.get();
  if (user.get("plan") === "pro") {
    return Response.json({ error: "Vous êtes déjà abonné." }, { status: 409 });
  }

  const stripe = getStripe();
  let customerId: string | undefined = user.get("stripeCustomerId");
  if (!customerId) {
    const customer = await stripe.customers.create({
      email: user.get("email") ?? undefined,
      name: user.get("displayName") ?? undefined,
      metadata: { uid },
    });
    customerId = customer.id;
    await userRef.update({ stripeCustomerId: customerId });
  }

  const base = appUrl(request);
  const session = await stripe.checkout.sessions.create({
    mode: "subscription",
    customer: customerId,
    client_reference_id: uid,
    line_items: [{ price: process.env.STRIPE_PRICE_PRO, quantity: 1 }],
    // The webhook resolves the user from this metadata on every subscription invoice.
    subscription_data: { metadata: { uid } },
    allow_promotion_codes: true,
    success_url: `${base}/dashboard?checkout=success`,
    cancel_url: `${base}/pricing`,
  });

  return Response.json({ url: session.url });
}
