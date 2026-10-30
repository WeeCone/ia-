import "server-only";
import { createHash } from "node:crypto";
import { FieldValue } from "firebase-admin/firestore";
import type Stripe from "stripe";
import { hasLocale, localePath, type Locale } from "@/i18n/config";
import { creditPaidInvoice, grantLifetimeTo } from "./billing-grants";
import { sendPurchaseEmail, sendTrialEmail } from "./email";
import { adminAuth, adminDb } from "./firebase-admin";
import { getStripe } from "./stripe";

/**
 * A purchase made without an account: Stripe collects the email with the card, then the account is made from it here.
 * Called by the return page and by the webhook, whichever comes first; every step is idempotent so both may run.
 * Covers the subscriptions (Starter, Pro, and the former trial) and the one-off À vie payment.
 */

export type GuestClaim =
  | { status: "pending" }
  /** A new account was made for this payment: the return page may sign the buyer straight in. */
  | { status: "created"; uid: string }
  /** The email already had an account: the trial is added to it, the buyer signs in as usual. */
  | { status: "existing"; email: string }
  /** The email's account already has this access or more: the new purchase is cancelled and refunded. */
  | { status: "alreadyActive"; email: string };

/**
 * The uid a guest payment's own account gets. Fixed by the session, so the return page and the webhook racing each
 * other end up on the same account, and an account that existed before (any other uid) is never signed into from here.
 */
export const guestUid = (sessionId: string) => `g${createHash("sha256").update(sessionId).digest("hex").slice(0, 27)}`;

const isGuestSession = (session: Stripe.Checkout.Session) => session.metadata?.guest === "1";

/** Plan ranks: a purchase is refused (and refunded) when the account already has at least this much. */
const RANK: Record<string, number> = { none: 0, starter: 1, trial: 2, monthly: 2, lifetime: 3 };

const authCode = (err: unknown) => (err as { code?: string } | null)?.code ?? "";

/** The Firebase account behind the email: a new one with the session's uid, or the one that already has the email. */
async function accountFor(email: string, sessionId: string) {
  const uid = guestUid(sessionId);
  try {
    await adminAuth.createUser({ uid, email });
    return uid;
  } catch (err) {
    if (authCode(err) === "auth/uid-already-exists") return uid;
    if (authCode(err) !== "auth/email-already-exists") throw err;
    return (await adminAuth.getUserByEmail(email)).uid;
  }
}

async function refundPayment(paymentIntent: string | Stripe.PaymentIntent | null) {
  if (paymentIntent) await getStripe().refunds.create({ payment_intent: typeof paymentIntent === "string" ? paymentIntent : paymentIntent.id });
}

async function refundInvoice(invoiceId: string) {
  const stripe = getStripe();
  const payments = await stripe.invoicePayments.list({ invoice: invoiceId });
  for (const { payment } of payments.data) {
    const intent = payment.payment_intent;
    if (intent)
      await stripe.refunds.create({
        payment_intent: typeof intent === "string" ? intent : intent.id,
      });
  }
}

export async function claimGuestSession(
  sessionOrId: Stripe.Checkout.Session | string,
  baseUrl: string,
): Promise<GuestClaim | null> {
  const stripe = getStripe();
  const session =
    typeof sessionOrId === "string" || typeof sessionOrId.subscription === "string"
      ? await stripe.checkout.sessions.retrieve(typeof sessionOrId === "string" ? sessionOrId : sessionOrId.id, {
          expand: ["subscription.latest_invoice"],
        })
      : sessionOrId;
  if (!isGuestSession(session)) return null;

  const offer = session.metadata?.offer ?? "trial";
  const oneOff = session.mode === "payment";
  const subscription = session.subscription as Stripe.Subscription | null;
  const invoice = subscription?.latest_invoice as Stripe.Invoice | null | undefined;
  const email = session.customer_details?.email?.trim().toLowerCase();
  const paid = oneOff ? session.payment_status === "paid" : Boolean(subscription && invoice && invoice.status === "paid");
  if (session.status !== "complete" || !paid || !email) return { status: "pending" };

  const uid = await accountFor(email, session.id);
  const created = uid === guestUid(session.id);
  const locale: Locale = hasLocale(session.locale)
    ? session.locale
    : hasLocale(session.metadata?.locale)
      ? session.metadata.locale
      : "fr";
  const customerId = typeof session.customer === "string" ? session.customer : session.customer?.id;

  const ref = adminDb.collection("users").doc(uid);
  // A new account gets the profile the sign-up page would have made. Claimed once: whichever of the return page and the webhook gets here first sends the email (or the refund).
  const firstClaim = await adminDb.runTransaction(async (tx) => {
    const user = await tx.get(ref);
    if (user.get("guestClaimedSession") === session.id) return false;
    if (!user.exists) {
      tx.set(ref, {
        uid,
        email,
        displayName: session.customer_details?.name ?? null,
        plan: "none",
        credits: 0,
        locale,
        createdAt: FieldValue.serverTimestamp(),
        guestClaimedSession: session.id,
      });
    } else {
      tx.update(ref, { guestClaimedSession: session.id });
    }
    return true;
  });

  const existing = await ref.get();
  const plan: string = existing.get("plan") ?? "none";
  const alreadyThis = subscription ? existing.get("stripeSubscriptionId") === subscription.id : existing.get("lifetimeSessionId") === session.id;
  if (!created && !alreadyThis && (RANK[plan] ?? 0) >= (RANK[offer] ?? 0)) {
    // Already has this access or more: never two subscriptions on one person. Stops this purchase and refunds it.
    if (firstClaim) {
      if (subscription) {
        await stripe.subscriptions.cancel(subscription.id).catch((err) => console.error("guest purchase: cancel failed", subscription.id, err));
        await refundInvoice(invoice!.id!).catch((err) => console.error("guest purchase: refund failed", invoice!.id, err));
      } else {
        await refundPayment(session.payment_intent).catch((err) => console.error("guest purchase: refund failed", session.id, err));
      }
    }
    return { status: "alreadyActive", email };
  }

  if (customerId) await ref.update({ stripeCustomerId: customerId });
  let trialEndsAt: number | null = null;
  if (subscription && invoice) {
    // Later invoices and subscription events find the account from this metadata, as for a purchase made signed in.
    if (subscription.metadata.uid !== uid) {
      await stripe.subscriptions.update(subscription.id, { metadata: { ...subscription.metadata, uid } });
    }
    const trialStart = offer === "trial" && invoice.billing_reason === "subscription_create";
    await creditPaidInvoice(uid, { id: invoice.id!, trialStart }, subscription.id, offer);
    if (offer === "trial") {
      trialEndsAt = subscription.trial_end ? subscription.trial_end * 1000 : null;
      if (existing.get("trialSessionId") !== session.id) await ref.update({ trialSessionId: session.id, trialEndsAt });
    }
  } else if (!alreadyThis) {
    await grantLifetimeTo(uid);
    await ref.update({ lifetimeSessionId: session.id });
  }
  if (firstClaim) {
    // The confirmation, with a link to choose a password for a new account (its only way back in on another device).
    let passwordUrl: string | undefined;
    if (created) {
      passwordUrl = await adminAuth
        .generatePasswordResetLink(email, { url: `${baseUrl}${localePath(locale, "/auth/login")}` })
        .catch((err) => {
          console.error("guest purchase: password link failed", err);
          return undefined;
        });
    }
    const name = session.customer_details?.name ?? null;
    const sent =
      offer === "trial"
        ? trialEndsAt
          ? sendTrialEmail(email, name, trialEndsAt, baseUrl, locale, passwordUrl)
          : Promise.resolve(false)
        : sendPurchaseEmail(email, name, offer, baseUrl, locale, passwordUrl);
    await sent.catch((err) => console.error("purchase email failed", err));
  }
  return created ? { status: "created", uid } : { status: "existing", email };
}
