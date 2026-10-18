import Stripe from "stripe";
import { adminDb } from "@/lib/firebase-admin";
import { TRIAL_DAYS, TRIAL_PRICE_CENTS, type Offer } from "@/lib/plans";
import { getRequestUid } from "@/lib/server-auth";
import { appUrl, getStripe, withBillingErrors } from "@/lib/stripe";
import { INTL_LOCALE, localePath } from "@/i18n/config";
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

/** Stripe's answer when a saved customer no longer exists (deleted, or saved in the other test/live mode). */
const isMissingCustomer = (err: unknown) =>
  err instanceof Stripe.errors.StripeInvalidRequestError && err.code === "resource_missing" && err.param === "customer";

/** The date the trial's subscription starts, as the customer will read it. */
function trialEnd(locale: "fr" | "en" | "es") {
  return new Date(Date.now() + TRIAL_DAYS * 24 * 3600 * 1000).toLocaleDateString(INTL_LOCALE[locale], {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

async function handler(request: Request) {
  const locale = requestLocale(request);
  const text = DICTIONARIES[locale].api;
  const uid = await getRequestUid(request);
  if (!uid) return Response.json({ error: text.sessionExpired }, { status: 401 });

  const {
    offer,
    embedded = false,
    source,
    campaign,
  } = (await request.json().catch(() => ({}))) as {
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
  // One trial per account, and only for accounts that never subscribed.
  if (offer === "trial" && (user.get("trialSessionId") || user.get("stripeSubscriptionId"))) {
    return Response.json({ error: text.trialUsed }, { status: 409 });
  }

  const stripe = getStripe();
  const newCustomer = async () => {
    const customer = await stripe.customers.create({
      email: user.get("email") ?? undefined,
      name: user.get("displayName") ?? undefined,
      metadata: { uid },
    });
    await userRef.update({ stripeCustomerId: customer.id });
    return customer.id;
  };

  const base = appUrl(request);
  // Back to the dashboard in the language the customer paid in.
  const dashboard = `${base}${localePath(locale, "/dashboard")}`;
  // The webhook resolves the user from this metadata (subscription invoices, or the one-off checkout session).
  // src / cmp: the ad or site that brought the buyer, for the admin "Visites" tab (anonymous counters only).
  const metadata = { uid, offer, src: statKey(source) ?? "direct", cmp: statKey(campaign) ?? "" };
  const createSession = (customer: string) =>
    stripe.checkout.sessions.create({
      customer,
      client_reference_id: uid,
      // Trial: the monthly price with a trial period, plus the 0,99 € fee charged today on the first invoice.
      line_items: [
        { price: PRICES.monthly, quantity: 1 },
        ...(offer === "trial"
          ? [{ price_data: { currency: "eur", unit_amount: TRIAL_PRICE_CENTS, product_data: { name: TRIAL_NAMES[locale] } }, quantity: 1 }]
          : []),
      ],
      locale,
      // Embedded: Stripe's form opens inside the site and sends the page to return_url once paid.
      ...(embedded
        ? { ui_mode: "embedded_page" as const, return_url: `${dashboard}?checkout=success` }
        : { success_url: `${dashboard}?checkout=success`, cancel_url: dashboard }),
      metadata,
      // Stripe's form in Scanzivo's colours and type. No logo, icon or name here: Stripe refuses them for the embedded
      // form (the dialog around it already shows the brand).
      branding_settings: {
        background_color: "#ffffff",
        button_color: "#047857",
        border_style: "rounded",
        font_family: "inter",
      },
      // Express consent required by art. L221-28 13° Code de la consommation for immediate digital access.
      // Needs a Terms of Service URL set in Stripe (Settings → Public details) pointing to /legal/cgv.
      consent_collection: { terms_of_service: "required" },
      custom_text: {
        terms_of_service_acceptance: {
          message: text.checkoutConsent(`${base}${localePath(locale, "/legal/cgv")}`),
        },
        // The trial's terms, right above the pay button: what is charged today, and when the subscription starts.
        ...(offer === "trial" ? { submit: { message: text.trialTerms(trialEnd(locale)) } } : {}),
      },
      mode: "subscription",
      subscription_data: { metadata, ...(offer === "trial" ? { trial_period_days: TRIAL_DAYS } : {}) },
    });

  // The saved customer is used as is (no lookup first, one Stripe round trip fewer); only if Stripe no longer knows it
  // is a fresh one created and the session retried.
  const saved: string | undefined = user.get("stripeCustomerId");
  let session;
  try {
    session = await createSession(saved ?? (await newCustomer()));
  } catch (err) {
    if (!saved || !isMissingCustomer(err)) throw err;
    session = await createSession(await newCustomer());
  }

  return Response.json(embedded ? { clientSecret: session.client_secret } : { url: session.url });
}

export const POST = withBillingErrors(handler);
