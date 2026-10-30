import Stripe from "stripe";
import { adminDb } from "@/lib/firebase-admin";
import { OFFER_PRICE_CENTS, type Offer } from "@/lib/plans";
import { getRequestUid } from "@/lib/server-auth";
import { appUrl, getStripe, withBillingErrors } from "@/lib/stripe";
import { localePath, type Locale } from "@/i18n/config";
import { DICTIONARIES } from "@/i18n/dictionaries";
import { requestLocale } from "@/i18n/server";
import { statKey } from "@/lib/stats";

const OFFERS: Offer[] = ["starter", "monthly", "lifetime"];

/**
 * The Stripe product each offer is billed on. Pro and À vie use the existing "Mensuel" and "À vie" products, read once
 * from STRIPE_PRICE_MONTHLY / STRIPE_PRICE_LIFETIME; Starter's product is found by its metadata, or made the first time.
 * Prices themselves are set inline (OFFER_PRICE_CENTS), so changing one never needs a new Price in the dashboard.
 */
const products: Partial<Record<Offer, Promise<string>>> = {};

function productFor(offer: Offer) {
  products[offer] ??= (async () => {
    const stripe = getStripe();
    if (offer === "starter") {
      const found = await stripe.products.search({ query: "metadata['scanzivo_offer']:'starter' AND active:'true'", limit: 1 });
      if (found.data[0]) return found.data[0].id;
      return (await stripe.products.create({ name: "Scanzivo – Starter", metadata: { scanzivo_offer: "starter" } })).id;
    }
    const price = await stripe.prices.retrieve((offer === "monthly" ? process.env.STRIPE_PRICE_MONTHLY : process.env.STRIPE_PRICE_LIFETIME)!);
    return typeof price.product === "string" ? price.product : price.product.id;
  })().catch((err) => {
    delete products[offer];
    throw err;
  });
  return products[offer]!;
}

async function lineFor(offer: Offer) {
  const product = await productFor(offer);
  const recurring = offer === "lifetime" ? {} : { recurring: { interval: "month" as const } };
  return { price_data: { currency: "eur", unit_amount: OFFER_PRICE_CENTS[offer], product, ...recurring }, quantity: 1 };
}

/** Stripe's answer when a saved customer no longer exists (deleted, or saved in the other test/live mode). */
const isMissingCustomer = (err: unknown) =>
  err instanceof Stripe.errors.StripeInvalidRequestError && err.code === "resource_missing" && err.param === "customer";

/** Offers an account may not buy given its plan: nothing on top of À vie, no second subscription at the same level. */
function blocked(plan: string | undefined, offer: Offer) {
  if (plan === "lifetime") return true;
  if (plan === "monthly") return offer !== "lifetime";
  if (plan === "starter") return offer === "starter";
  return false;
}

async function handler(request: Request) {
  const locale = requestLocale(request);
  const text = DICTIONARIES[locale].api;
  const uid = await getRequestUid(request);

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
  if (!offer || !OFFERS.includes(offer)) return Response.json({ error: text.unknownOffer }, { status: 400 });

  // Any offer can be bought without an account: Stripe takes the email and the account is made from it once paid.
  if (!uid) return guestCheckout(request, locale, offer, embedded, source, campaign);

  const userRef = adminDb.collection("users").doc(uid);
  const user = await userRef.get();
  if (blocked(user.get("plan"), offer)) return Response.json({ error: text.alreadyActive }, { status: 409 });

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
  const line = await lineFor(offer);
  const createSession = (customer: string) =>
    stripe.checkout.sessions.create({
      ...sessionParams(request, locale, offer, embedded, `${dashboard}?checkout=success&session_id={CHECKOUT_SESSION_ID}`, dashboard, line, metadata),
      customer,
      client_reference_id: uid,
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

/** A purchase by a visitor without an account. Stripe asks for the email; the welcome page makes the account from it. */
async function guestCheckout(request: Request, locale: Locale, offer: Offer, embedded: boolean, source?: string, campaign?: string) {
  const base = appUrl(request);
  const welcome = `${base}${localePath(locale, "/welcome")}?session_id={CHECKOUT_SESSION_ID}`;
  // guest: lets the webhook and the welcome page know the account is still to be made (no uid yet).
  const metadata = { guest: "1", offer, locale, src: statKey(source) ?? "direct", cmp: statKey(campaign) ?? "" };
  const session = await getStripe().checkout.sessions.create({
    ...sessionParams(request, locale, offer, embedded, welcome, base + localePath(locale, "/"), await lineFor(offer), metadata),
    // A one-off payment makes no customer by default: one is needed for the receipt and the account.
    ...(offer === "lifetime" ? { customer_creation: "always" as const } : {}),
  });
  return Response.json(embedded ? { clientSecret: session.client_secret } : { url: session.url });
}

/** What every checkout shares: the line, Stripe's form, the metadata and the terms the customer accepts. */
function sessionParams(
  request: Request,
  locale: Locale,
  offer: Offer,
  embedded: boolean,
  successUrl: string,
  cancelUrl: string,
  line: Awaited<ReturnType<typeof lineFor>>,
  metadata: Record<string, string>,
) {
  const text = DICTIONARIES[locale].api;
  const base = appUrl(request);
  const subscription = offer !== "lifetime";
  return {
    line_items: [line],
    locale,
    metadata,
    ...(subscription
      ? { mode: "subscription" as const, subscription_data: { metadata } }
      : { mode: "payment" as const, payment_intent_data: { metadata } }),
    // Embedded: Stripe's form opens inside the site and sends the page to return_url once paid.
    ...(embedded
      ? { ui_mode: "embedded_page" as const, return_url: successUrl }
      : { success_url: successUrl, cancel_url: cancelUrl }),
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
    },
  } satisfies Stripe.Checkout.SessionCreateParams;
}

export const POST = withBillingErrors(handler);
