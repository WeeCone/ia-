import type Stripe from "stripe";
import { adminDb } from "@/lib/firebase-admin";
import { PRO_MONTHLY_CREDITS } from "@/lib/plans";
import { getStripe } from "@/lib/stripe";

const ACTIVE_STATUSES: Stripe.Subscription.Status[] = ["active", "trialing"];

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
    // Each paid subscription invoice (first payment and every renewal) resets the monthly credits.
    // Setting an absolute value keeps this idempotent when Stripe retries the event.
    case "invoice.paid": {
      const details = event.data.object.parent?.subscription_details;
      const uid = details?.metadata?.uid;
      if (!uid) break;
      const subscription = details.subscription;
      await adminDb.collection("users").doc(uid).update({
        plan: "pro",
        credits: PRO_MONTHLY_CREDITS,
        stripeSubscriptionId: typeof subscription === "string" ? subscription : subscription.id,
      });
      break;
    }
    case "customer.subscription.updated":
    case "customer.subscription.deleted": {
      const subscription = event.data.object;
      const uid = subscription.metadata.uid;
      if (!uid) break;
      const active = event.type === "customer.subscription.updated" && ACTIVE_STATUSES.includes(subscription.status);
      // Downgrading keeps whatever credits are left; they simply stop being refilled.
      await adminDb.collection("users").doc(uid).update({ plan: active ? "pro" : "free" });
      break;
    }
  }

  return new Response(null, { status: 200 });
}
