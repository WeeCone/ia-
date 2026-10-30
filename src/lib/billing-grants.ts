import "server-only";
import { adminDb } from "./firebase-admin";
import { MONTHLY_CREDITS, periodFor, STARTER_DAILY_CREDITS, TRIAL_CREDITS, type Plan } from "./plans";
import { getStripe } from "./stripe";

/** The plan a subscription gives, from the offer it was bought for (a former trial became Pro). */
export const subscriptionPlan = (offer: string | undefined): Plan => (offer === "starter" ? "starter" : "monthly");

/**
 * Opens the credits paid by one subscription invoice: Pro's monthly quota, or Starter's daily one (refilled each day
 * afterwards); a former trial's first invoice (the 0,99 € fee) gave the trial's credits. Called by the Stripe webhook
 * and by the dashboard's own check on return from payment, whichever comes first; the invoice id makes the second call
 * a no-op for credits, so a credit already spent is never handed back.
 *
 * Moving from one subscription to another (Starter to Pro): the previous one is stopped, never two at once.
 */
export async function creditPaidInvoice(
  uid: string,
  invoice: { id: string; trialStart: boolean },
  subscriptionId: string,
  offer: string | undefined,
) {
  const ref = adminDb.collection("users").doc(uid);
  const plan = subscriptionPlan(offer);
  const previous = await adminDb.runTransaction(async (tx) => {
    const user = await tx.get(ref);
    if (!user.exists) return null;
    const before: string | null = user.get("stripeSubscriptionId") ?? null;
    const base = { plan, stripeSubscriptionId: subscriptionId };
    if (user.get("lastCreditedInvoice") === invoice.id) {
      tx.update(ref, base);
      return null;
    }
    tx.update(ref, {
      ...base,
      credits: invoice.trialStart ? TRIAL_CREDITS : plan === "starter" ? STARTER_DAILY_CREDITS : MONTHLY_CREDITS,
      creditsPeriod: periodFor(plan),
      lastCreditedInvoice: invoice.id,
    });
    return before && before !== subscriptionId ? before : null;
  });
  if (previous) {
    await getStripe()
      .subscriptions.cancel(previous, { prorate: false })
      .catch((err) => console.error("plan change: could not stop the previous subscription", previous, err));
  }
}

/**
 * À vie, once paid: the monthly quota from now on, refilled each month. A running subscription stops renewing (its
 * later events are ignored for À vie accounts). Credits are set to an absolute value, so a retried event never
 * double-credits.
 */
export async function grantLifetimeTo(uid: string) {
  const ref = adminDb.collection("users").doc(uid);
  const user = await ref.get();
  if (!user.exists) return;
  await ref.update({ plan: "lifetime", credits: MONTHLY_CREDITS, creditsPeriod: periodFor("lifetime") });
  const subscriptionId: string | undefined = user.get("stripeSubscriptionId");
  if (subscriptionId) {
    await getStripe()
      .subscriptions.update(subscriptionId, { cancel_at_period_end: true })
      // Already cancelled or deleted: nothing left to stop.
      .catch((err) => console.error("À vie: could not stop subscription", subscriptionId, err));
  }
}
