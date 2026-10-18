import type Stripe from "stripe";
import { creditPaidInvoice } from "@/lib/billing-grants";
import { adminDb } from "@/lib/firebase-admin";
import { getRequestUid } from "@/lib/server-auth";
import { getStripe, withBillingErrors } from "@/lib/stripe";
import { DICTIONARIES } from "@/i18n/dictionaries";
import { requestLocale } from "@/i18n/server";

/**
 * Called by the dashboard on return from payment: reads the Checkout Session from Stripe and opens what was paid,
 * without waiting for the webhook (which may be late or misconfigured). The webhook stays the source for renewals,
 * cancellations and emails; both paths credit an invoice only once.
 */
async function handler(request: Request) {
  const text = DICTIONARIES[requestLocale(request)].api;
  const uid = await getRequestUid(request);
  if (!uid) return Response.json({ error: text.sessionExpired }, { status: 401 });

  const { sessionId } = (await request.json().catch(() => ({}))) as { sessionId?: string };
  if (!sessionId || !/^cs_[A-Za-z0-9_]+$/.test(sessionId)) return Response.json({ error: text.unknownOffer }, { status: 400 });

  const session = await getStripe().checkout.sessions.retrieve(sessionId, { expand: ["subscription.latest_invoice"] });
  // Only the account that paid can confirm its own session.
  if (session.metadata?.uid !== uid) return Response.json({ error: text.sessionExpired }, { status: 403 });
  if (session.status !== "complete") return Response.json({ ok: false, pending: true });

  const subscription = session.subscription as Stripe.Subscription | null;
  const invoice = subscription?.latest_invoice as Stripe.Invoice | null;
  if (!subscription || !invoice || invoice.status !== "paid") return Response.json({ ok: false, pending: true });

  const trial = session.metadata?.offer === "trial";
  await creditPaidInvoice(uid, { id: invoice.id!, trialStart: trial && invoice.billing_reason === "subscription_create" }, subscription.id);
  if (trial) {
    // Marks the trial as taken and records its end; the webhook adds the confirmation email.
    const ref = adminDb.collection("users").doc(uid);
    const user = await ref.get();
    if (!user.get("trialSessionId")) {
      await ref.update({ trialSessionId: session.id, trialEndsAt: subscription.trial_end ? subscription.trial_end * 1000 : null });
    }
  }
  return Response.json({ ok: true });
}

export const POST = withBillingErrors(handler);
