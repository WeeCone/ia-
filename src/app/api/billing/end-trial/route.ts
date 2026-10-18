import { adminDb } from "@/lib/firebase-admin";
import { creditPeriod, MONTHLY_CREDITS } from "@/lib/plans";
import { getRequestUid } from "@/lib/server-auth";
import { getStripe, withBillingErrors } from "@/lib/stripe";
import { DICTIONARIES } from "@/i18n/dictionaries";
import { requestLocale } from "@/i18n/server";

/**
 * Ends a running trial now, at the customer's request: the first monthly payment is taken immediately on the saved card
 * and the full monthly quota opens. If the card is declined nothing changes and the trial carries on.
 */
async function handler(request: Request) {
  const text = DICTIONARIES[requestLocale(request)].api;
  const uid = await getRequestUid(request);
  if (!uid) return Response.json({ error: text.sessionExpired }, { status: 401 });

  const ref = adminDb.collection("users").doc(uid);
  const user = await ref.get();
  const subscriptionId: string | undefined = user.get("stripeSubscriptionId");
  if (!subscriptionId) return Response.json({ error: text.noTrial }, { status: 409 });

  const stripe = getStripe();
  const subscription = await stripe.subscriptions.retrieve(subscriptionId);
  if (subscription.status !== "trialing") return Response.json({ error: text.noTrial }, { status: 409 });

  // error_if_incomplete: a declined card makes the call fail instead of leaving an unpaid subscription.
  await stripe.subscriptions.update(subscriptionId, { trial_end: "now", proration_behavior: "none", payment_behavior: "error_if_incomplete" });

  // The invoice.paid webhook writes the same; doing it here lets the dashboard update at once.
  await ref.update({ plan: "monthly", credits: MONTHLY_CREDITS, creditsPeriod: creditPeriod(), trialEndsAt: null });
  return Response.json({ ok: true });
}

export const POST = withBillingErrors(handler);
