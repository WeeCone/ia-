import Stripe from "stripe";
import { adminDb } from "@/lib/firebase-admin";
import type { Offer } from "@/lib/plans";
import { getRequestUid } from "@/lib/server-auth";
import { appUrl, getStripe, withBillingErrors } from "@/lib/stripe";

const PRICES: Record<Offer, string | undefined> = {
  monthly: process.env.STRIPE_PRICE_MONTHLY,
  lifetime: process.env.STRIPE_PRICE_LIFETIME,
};

async function customerExists(id: string) {
  try {
    const customer = await getStripe().customers.retrieve(id);
    return !customer.deleted;
  } catch (err) {
    if (err instanceof Stripe.errors.StripeInvalidRequestError && err.code === "resource_missing") return false;
    throw err;
  }
}

async function handler(request: Request) {
  const uid = await getRequestUid(request);
  if (!uid) return Response.json({ error: "Session expirée, reconnectez-vous." }, { status: 401 });

  const { offer } = (await request.json().catch(() => ({}))) as { offer?: Offer };
  if (offer !== "monthly" && offer !== "lifetime") {
    return Response.json({ error: "Offre inconnue." }, { status: 400 });
  }

  const userRef = adminDb.collection("users").doc(uid);
  const user = await userRef.get();
  // Monthly → lifetime is allowed: the webhook stops the subscription once lifetime access is paid.
  if (user.get("plan") === "lifetime" || (user.get("plan") === "monthly" && offer === "monthly")) {
    return Response.json({ error: "Vous avez déjà un accès actif." }, { status: 409 });
  }

  const stripe = getStripe();
  let customerId: string | undefined = user.get("stripeCustomerId");
  // A customer saved with the other Stripe mode (test ↔ live) or deleted in Stripe can't be reused: start fresh.
  if (customerId && !(await customerExists(customerId))) customerId = undefined;
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
  // The webhook resolves the user from this metadata (subscription invoices, or the one-off checkout session).
  const metadata = { uid, offer };
  const session = await stripe.checkout.sessions.create({
    customer: customerId,
    client_reference_id: uid,
    line_items: [{ price: PRICES[offer], quantity: 1 }],
    locale: "fr",
    success_url: `${base}/dashboard?checkout=success`,
    cancel_url: `${base}/dashboard`,
    metadata,
    // Express consent required by art. L221-28 13° Code de la consommation for immediate digital access.
    // Needs a Terms of Service URL set in Stripe (Settings → Public details) pointing to /legal/cgv.
    consent_collection: { terms_of_service: "required" },
    custom_text: {
      terms_of_service_acceptance: {
        message: `J'accepte les [conditions générales](${base}/legal/cgv), je demande l'accès immédiat au service et je renonce à mon droit de rétractation.`,
      },
    },
    ...(offer === "monthly"
      ? { mode: "subscription", subscription_data: { metadata } }
      : { mode: "payment", invoice_creation: { enabled: true } }),
  });

  return Response.json({ url: session.url });
}

export const POST = withBillingErrors(handler);
