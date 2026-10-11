import type Stripe from "stripe";
import { adminDb } from "@/lib/firebase-admin";
import { creditPeriod, MONTHLY_CREDITS } from "@/lib/plans";
import { getStripe } from "@/lib/stripe";

const ACTIVE_STATUSES: Stripe.Subscription.Status[] = ["active", "trialing"];

const userRef = (uid: string) => adminDb.collection("users").doc(uid);

// The account may have been deleted since the event was emitted (e.g. its subscription is cancelled on deletion).
async function updateUser(uid: string, data: Record<string, unknown>) {
  const ref = userRef(uid);
  if ((await ref.get()).exists) await ref.update(data);
}

// Credits are always set to an absolute value, so Stripe retrying an event never double-credits.
async function grantLifetime(session: Stripe.Checkout.Session) {
  const uid = session.metadata?.uid;
  if (!uid || session.metadata?.offer !== "lifetime" || session.payment_status !== "paid") return;
  await updateUser(uid, { plan: "lifetime", credits: MONTHLY_CREDITS, creditsPeriod: creditPeriod() });
}

export async function POST(request: Request) {
  const signature = request.headers.get("stripe-signature");
  if (!signature) return new Response("Missing signature", { status: 400 });

  let event: Stripe.Event;
  try {
    event = getStripe().webhooks.constructEvent(await request.text(), signature, process.env.STRIPE_WEBHOOK_SECRET!);
  } catch {
    return new Response("Invalid signature", { status: 400 });
  }

  switch (event.type) {
    // One-off lifetime purchase (async methods such as SEPA confirm later).
    case "checkout.session.completed":
    case "checkout.session.async_payment_succeeded":
      await grantLifetime(event.data.object);
      break;

    // Each paid monthly invoice (first payment and every renewal) resets the monthly credits.
    case "invoice.paid": {
      const details = event.data.object.parent?.subscription_details;
      const uid = details?.metadata?.uid;
      if (!uid) break;
      const subscription = details.subscription;
      await updateUser(uid, {
        plan: "monthly",
        credits: MONTHLY_CREDITS,
        creditsPeriod: creditPeriod(),
        stripeSubscriptionId: typeof subscription === "string" ? subscription : subscription.id,
      });
      break;
    }

    case "customer.subscription.updated":
    case "customer.subscription.deleted": {
      const subscription = event.data.object;
      const uid = subscription.metadata.uid;
      if (!uid) break;
      // Never let a subscription event touch an account that has since bought lifetime access.
      if ((await userRef(uid).get()).get("plan") === "lifetime") break;
      const active = event.type === "customer.subscription.updated" && ACTIVE_STATUSES.includes(subscription.status);
      // Losing the subscription keeps any credits left; they simply stop being refilled.
      await updateUser(uid, { plan: active ? "monthly" : "none" });
      break;
    }
  }

  return new Response(null, { status: 200 });
}
