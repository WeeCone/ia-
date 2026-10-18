import "server-only";
import { adminDb } from "./firebase-admin";
import { creditPeriod, MONTHLY_CREDITS, TRIAL_CREDITS } from "./plans";

/**
 * Opens the credits paid by one subscription invoice: the trial's first invoice (the 0,99 € fee) gives the trial's
 * credits, any other paid invoice the monthly quota. Called by the Stripe webhook and by the dashboard's own check on
 * return from payment, whichever comes first; the invoice id makes the second call a no-op for credits, so a credit
 * already spent is never handed back.
 */
export async function creditPaidInvoice(
  uid: string,
  invoice: { id: string; trialStart: boolean },
  subscriptionId: string,
) {
  const ref = adminDb.collection("users").doc(uid);
  await adminDb.runTransaction(async (tx) => {
    const user = await tx.get(ref);
    if (!user.exists) return;
    const base = { plan: "monthly", stripeSubscriptionId: subscriptionId };
    if (user.get("lastCreditedInvoice") === invoice.id) {
      tx.update(ref, base);
      return;
    }
    tx.update(ref, {
      ...base,
      credits: invoice.trialStart ? TRIAL_CREDITS : MONTHLY_CREDITS,
      creditsPeriod: creditPeriod(),
      lastCreditedInvoice: invoice.id,
    });
  });
}
