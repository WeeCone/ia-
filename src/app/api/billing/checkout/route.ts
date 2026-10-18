import Stripe from "stripe";
import { adminDb } from "@/lib/firebase-admin";
import { TRIAL_PRICE_CENTS, type Offer } from "@/lib/plans";
import { getRequestUid } from "@/lib/server-auth";
import { appUrl, getStripe, withBillingErrors } from "@/lib/stripe";
import { localePath } from "@/i18n/config";
import { DICTIONARIES } from "@/i18n/dictionaries";
import { requestLocale } from "@/i18n/server";
import { statKey } from "@/lib/stats";

const PRICES: Record<Exclude<Offer, "trial">, string | undefined> = {
  monthly: process.env.STRIPE_PRICE_MONTHLY,
  lifetime: process.env.STRIPE_PRICE_LIFETIME,
};

const TRIAL_NAMES: Record<string, string> = {
  fr: "Scanzivo — analyse d'essai",
  en: "Scanzivo — trial analysis",
  es: "Scanzivo — análisis de prueba",
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
  const locale = requestLocale(request);
  const text = DICTIONARIES[locale].api;
  const uid = await getRequestUid(request);
  if (!uid) return Response.json({ error: text.sessionExpired }, { status: 401 });

  const { offer, embedded = false, source, campaign } = (await request.json().catch(() => ({}))) as {
    offer?: Offer;
    embedded?: boolean;
    source?: string;
    campaign?: string;
  };
  // Lifetime access is no longer sold (existing owners keep it; the webhook still honours their past purchases).
  if (offer !== "monthly" && offer !== "trial") {
    return Response.json({ error: text.unknownOffer }, { status: 400 });
  }

  const userRef = adminDb.collection("users").doc(uid);
  const user = await userRef.get();
  if (user.get("plan") === "lifetime" || user.get("plan") === "monthly") {
    return Response.json({ error: text.alreadyActive }, { status: 409 });
  }
  // One trial per account.
  if (offer === "trial" && user.get("trialSessionId")) {
    return Response.json({ error: text.trialUsed }, { status: 409 });
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
  // Back to the dashboard in the language the customer paid in.
  const dashboard = `${base}${localePath(locale, "/dashboard")}`;
  // The webhook resolves the user from this metadata (subscription invoices, or the one-off checkout session).
  // src / cmp: the ad or site that brought the buyer, for the admin "Visites" tab (anonymous counters only).
  const metadata = { uid, offer, src: statKey(source) ?? "direct", cmp: statKey(campaign) ?? "" };
  const session = await stripe.checkout.sessions.create({
    customer: customerId,
    client_reference_id: uid,
    line_items: [
      offer === "trial"
        ? { price_data: { currency: "eur", unit_amount: TRIAL_PRICE_CENTS, product_data: { name: TRIAL_NAMES[locale] } }, quantity: 1 }
        : { price: PRICES[offer], quantity: 1 },
    ],
    locale,
    // Embedded: Stripe's form opens inside the site and sends the page to return_url once paid.
    ...(embedded
      ? { ui_mode: "embedded_page" as const, return_url: `${dashboard}?checkout=success` }
      : { success_url: `${dashboard}?checkout=success`, cancel_url: dashboard }),
    metadata,
    // Express consent required by art. L221-28 13° Code de la consommation for immediate digital access.
    // Needs a Terms of Service URL set in Stripe (Settings → Public details) pointing to /legal/cgv.
    consent_collection: { terms_of_service: "required" },
    custom_text: {
      terms_of_service_acceptance: {
        message: text.checkoutConsent(`${base}${localePath(locale, "/legal/cgv")}`),
      },
    },
    ...(offer === "monthly"
      ? { mode: "subscription", subscription_data: { metadata } }
      : { mode: "payment", invoice_creation: { enabled: true } }),
  });

  return Response.json(embedded ? { clientSecret: session.client_secret } : { url: session.url });
}

export const POST = withBillingErrors(handler);
