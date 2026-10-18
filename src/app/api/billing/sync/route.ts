import type Stripe from "stripe";
import { creditPaidInvoice } from "@/lib/billing-grants";
import { adminDb } from "@/lib/firebase-admin";
import { getRequestUid } from "@/lib/server-auth";
import { getStripe, withBillingErrors } from "@/lib/stripe";
import { DICTIONARIES } from "@/i18n/dictionaries";
import { requestLocale } from "@/i18n/server";

/**
 * Repairs an account that paid but shows no offer (webhook missed, return page closed early): looks up the customer's
 * live subscription in Stripe and opens what its paid invoice gives. Safe to call again: each invoice credits once.
 */
async function handler(request: Request) {
  const text = DICTIONARIES[requestLocale(request)].api;
  const uid = await getRequestUid(request);
  if (!uid) return Response.json({ error: text.sessionExpired }, { status: 401 });

  const ref = adminDb.collection("users").doc(uid);
  const user = await ref.get();
  const customer: string | undefined = user.get("stripeCustomerId");
  if (!customer || user.get("plan") !== "none") return Response.json({ ok: false });

  const { data } = await getStripe().subscriptions.list({ customer, status: "all", limit: 5, expand: ["data.latest_invoice"] });
  const subscription = data.find((sub) => (sub.status === "trialing" || sub.status === "active") && sub.metadata?.uid === uid);
  const invoice = subscription?.latest_invoice as Stripe.Invoice | null | undefined;
  if (!subscription || !invoice || invoice.status !== "paid") return Response.json({ ok: false });

  const trial = subscription.metadata?.offer === "trial";
  await creditPaidInvoice(uid, { id: invoice.id!, trialStart: trial && invoice.billing_reason === "subscription_create" }, subscription.id);
  if (trial && !user.get("trialSessionId")) {
    await ref.update({ trialSessionId: `sync_${subscription.id}`, trialEndsAt: subscription.trial_end ? subscription.trial_end * 1000 : null });
  }
  return Response.json({ ok: true });
}

export const POST = withBillingErrors(handler);
