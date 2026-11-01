import Stripe from "stripe";
import { creditPaidInvoice } from "@/lib/billing-grants";
import { adminDb } from "@/lib/firebase-admin";
import { getRequestUid } from "@/lib/server-auth";
import { getStripe, withBillingErrors } from "@/lib/stripe";
import { lineFor } from "@/lib/stripe-products";
import { DICTIONARIES } from "@/i18n/dictionaries";
import { requestLocale } from "@/i18n/server";

/**
 * Starter to Pro in one click, on the card already on file. The Starter subscription itself moves to Pro's price: the
 * days already paid are deducted, the difference is charged now, and renewals keep the same date at Pro's price.
 *
 * Without `confirm`: the quote (amount due today, next renewal date, and the proration time to confirm with, so the
 * charge is exactly the amount shown). With `confirm`: the switch. A 409 means "no one-click path here" (no Starter
 * subscription, or the bank asks for a check the customer must pass in Stripe's form): the site falls back to the
 * ordinary payment form, and nothing has changed.
 */
async function handler(request: Request) {
  const text = DICTIONARIES[requestLocale(request)].api;
  const uid = await getRequestUid(request);
  if (!uid) return Response.json({ error: text.sessionExpired }, { status: 401 });
  const body = (await request.json().catch(() => ({}))) as { confirm?: boolean; prorationDate?: number };

  const user = await adminDb.collection("users").doc(uid).get();
  const subscriptionId: string | undefined = user.get("stripeSubscriptionId");
  const customer: string | undefined = user.get("stripeCustomerId");
  if (user.get("plan") !== "starter" || !subscriptionId || !customer) return Response.json({ fallback: true }, { status: 409 });

  const stripe = getStripe();
  const subscription = await stripe.subscriptions.retrieve(subscriptionId);
  const item = subscription.items.data[0];
  if (subscription.status !== "active" || !item || subscription.items.data.length !== 1 || subscription.cancel_at_period_end) {
    return Response.json({ fallback: true }, { status: 409 });
  }

  const { price_data } = await lineFor("monthly");
  const items = [{ id: item.id, price_data: { ...price_data, recurring: { interval: "month" as const } } }];

  if (!body.confirm) {
    const prorationDate = Math.floor(Date.now() / 1000);
    const preview = await stripe.invoices.createPreview({
      customer,
      subscription: subscriptionId,
      subscription_details: { items, proration_behavior: "always_invoice", proration_date: prorationDate },
    });
    return Response.json({ amountCents: Math.max(0, preview.amount_due), nextAt: item.current_period_end * 1000, prorationDate });
  }

  // The quoted proration time, if it is still within the period; otherwise Stripe's "now".
  const prorationDate =
    typeof body.prorationDate === "number" && body.prorationDate >= item.current_period_start && body.prorationDate <= Date.now() / 1000
      ? Math.floor(body.prorationDate)
      : undefined;
  let updated: Stripe.Subscription;
  try {
    updated = await stripe.subscriptions.update(subscriptionId, {
      items,
      proration_behavior: "always_invoice",
      ...(prorationDate ? { proration_date: prorationDate } : {}),
      // A declined card or a bank check makes the call fail and changes nothing (no unpaid Pro left behind).
      payment_behavior: "error_if_incomplete",
      metadata: { ...subscription.metadata, offer: "monthly" },
      expand: ["latest_invoice"],
    });
  } catch (err) {
    if (err instanceof Stripe.errors.StripeCardError || err instanceof Stripe.errors.StripeInvalidRequestError) {
      console.error("one-click upgrade refused, falling back to checkout", err.message);
      return Response.json({ fallback: true }, { status: 409 });
    }
    throw err;
  }

  // The invoice.paid webhook does the same; doing it here makes Pro visible at once. The invoice id keeps it single.
  const invoice = updated.latest_invoice;
  const invoiceId = typeof invoice === "string" ? invoice : invoice?.id;
  if (invoiceId) await creditPaidInvoice(uid, { id: invoiceId, trialStart: false }, subscriptionId, "monthly");
  return Response.json({ ok: true });
}

export const POST = withBillingErrors(handler);
