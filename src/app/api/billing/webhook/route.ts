import type Stripe from "stripe";
import { adminDb } from "@/lib/firebase-admin";
import { attribution, recordPurchase } from "@/lib/stats";
import { creditPaidInvoice, grantLifetimeTo, subscriptionPlan } from "@/lib/billing-grants";
import { appUrl, getStripe } from "@/lib/stripe";
import { sendTrialEmail } from "@/lib/email";
import { claimGuestSession } from "@/lib/guest-checkout";
import { hasLocale, type Locale } from "@/i18n/config";

const ACTIVE_STATUSES: Stripe.Subscription.Status[] = ["active", "trialing"];

const userRef = (uid: string) => adminDb.collection("users").doc(uid);

// The account may have been deleted since the event was emitted (e.g. its subscription is cancelled on deletion).
async function updateUser(uid: string, data: Record<string, unknown>) {
  const ref = userRef(uid);
  if ((await ref.get()).exists) await ref.update(data);
}

async function grantLifetime(session: Stripe.Checkout.Session) {
  const uid = session.metadata?.uid;
  if (!uid || session.metadata?.offer !== "lifetime" || session.payment_status !== "paid") return;
  const ref = userRef(uid);
  // Once per payment: the return page may have opened it already.
  if ((await ref.get()).get("lifetimeSessionId") === session.id) return;
  await grantLifetimeTo(uid);
  await ref.update({ lifetimeSessionId: session.id });
}

/** Audience stats: one purchase for the source that brought the buyer. Never blocks the webhook. */
async function countPurchase(session: Stripe.Checkout.Session) {
  if (session.payment_status !== "paid") return;
  try {
    await recordPurchase(session.id, attribution(session.metadata?.src, session.metadata?.cmp), (session.amount_total ?? 0) / 100);
  } catch (err) {
    console.error("purchase stat failed", err);
  }
}

/** The paid trial: marks the account (one trial each) and records when the subscription's first payment is due. */
async function markTrial(session: Stripe.Checkout.Session, baseUrl: string) {
  const uid = session.metadata?.uid;
  if (!uid || session.metadata?.offer !== "trial" || session.payment_status !== "paid") return;
  let trialEndsAt: number | null = null;
  const subscription = session.subscription;
  if (subscription) {
    const id = typeof subscription === "string" ? subscription : subscription.id;
    const trialEnd = (await getStripe().subscriptions.retrieve(id)).trial_end;
    trialEndsAt = trialEnd ? trialEnd * 1000 : null;
  }
  // Once per trial: a retried event finds the session already recorded and sends nothing.
  const user = await userRef(uid).get();
  if (!user.exists || user.get("trialSessionId") === session.id) return;
  await userRef(uid).update({ trialSessionId: session.id, trialEndsAt });
  const email = user.get("email");
  if (email && trialEndsAt) {
    // The language the customer paid in, else the one chosen at sign-up.
    const stored = user.get("locale");
    const locale: Locale = hasLocale(session.locale) ? session.locale : hasLocale(stored) ? stored : "fr";
    await sendTrialEmail(email, user.get("displayName") ?? null, trialEndsAt, baseUrl, locale).catch((err) =>
      console.error("trial email failed", err),
    );
  }
}

export async function POST(request: Request) {
  const signature = request.headers.get("stripe-signature");
  if (!signature) return new Response("Missing signature", { status: 400 });

  let event: Stripe.Event;
  try {
    event = getStripe().webhooks.constructEvent(await request.text(), signature, process.env.STRIPE_WEBHOOK_SECRET!.trim());
  } catch {
    return new Response("Invalid signature", { status: 400 });
  }

  switch (event.type) {
    // One-off À vie purchase (async methods such as SEPA confirm later).
    case "checkout.session.completed":
    case "checkout.session.async_payment_succeeded":
      await grantLifetime(event.data.object);
      await markTrial(event.data.object, appUrl(request));
      // Bought without an account: the account is made here if the buyer closed the page before it could.
      if (event.data.object.metadata?.guest === "1") await claimGuestSession(event.data.object, appUrl(request));
      await countPurchase(event.data.object);
      break;

    // Each paid subscription invoice (first payment and every renewal) resets the plan's credits. A former trial's first
    // invoice (the 0,99 € fee) opened the trial's credits only.
    case "invoice.paid": {
      const invoice = event.data.object;
      const details = invoice.parent?.subscription_details;
      // No uid yet on a guest purchase's first invoice: claimGuestSession credits it once the account exists.
      const uid = details?.metadata?.uid;
      if (!uid) break;
      const subscription = details.subscription;
      const offer = details.metadata?.offer;
      const trialStart = offer === "trial" && invoice.billing_reason === "subscription_create";
      await creditPaidInvoice(uid, { id: invoice.id!, trialStart }, typeof subscription === "string" ? subscription : subscription.id, offer);
      break;
    }

    case "customer.subscription.updated":
    case "customer.subscription.deleted": {
      const subscription = event.data.object;
      const uid = subscription.metadata.uid;
      if (!uid) break;
      const user = await userRef(uid).get();
      // Never let a subscription event touch an account that has since bought lifetime access, nor one that has moved
      // to another subscription (Starter to Pro: the old one's cancellation must not close the new one).
      if (user.get("plan") === "lifetime") break;
      const current: string | undefined = user.get("stripeSubscriptionId");
      if (current && current !== subscription.id) break;
      const active = event.type === "customer.subscription.updated" && ACTIVE_STATUSES.includes(subscription.status);
      // Losing the subscription keeps any credits left; they simply stop being refilled.
      const trialing = active && subscription.status === "trialing" && subscription.trial_end;
      await updateUser(uid, {
        plan: active ? subscriptionPlan(subscription.metadata.offer) : "none",
        trialEndsAt: trialing ? subscription.trial_end! * 1000 : null,
      });
      break;
    }
  }

  return new Response(null, { status: 200 });
}
