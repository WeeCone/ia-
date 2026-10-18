import "server-only";
import { createHash } from "node:crypto";
import { FieldValue } from "firebase-admin/firestore";
import type Stripe from "stripe";
import { hasLocale, localePath, type Locale } from "@/i18n/config";
import { creditPaidInvoice } from "./billing-grants";
import { sendTrialEmail } from "./email";
import { adminAuth, adminDb } from "./firebase-admin";
import { getStripe } from "./stripe";

/**
 * The trial bought without an account: Stripe collects the email with the card, then the account is made from it here.
 * Called by the return page and by the webhook, whichever comes first; every step is idempotent so both may run.
 */

export type GuestClaim =
  | { status: "pending" }
  /** A new account was made for this payment: the return page may sign the buyer straight in. */
  | { status: "created"; uid: string }
  /** The email already had an account: the trial is added to it, the buyer signs in as usual. */
  | { status: "existing"; email: string }
  /** The email's account already pays a subscription: the new one is cancelled and the 0,99 € refunded. */
  | { status: "alreadyActive"; email: string };

/**
 * The uid a guest payment's own account gets. Fixed by the session, so the return page and the webhook racing each
 * other end up on the same account, and an account that existed before (any other uid) is never signed into from here.
 */
export const guestUid = (sessionId: string) => `g${createHash("sha256").update(sessionId).digest("hex").slice(0, 27)}`;

const isGuestSession = (session: Stripe.Checkout.Session) =>
  session.metadata?.guest === "1" && session.metadata?.offer === "trial";

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

  const subscription = session.subscription as Stripe.Subscription | null;
  const invoice = subscription?.latest_invoice as Stripe.Invoice | null | undefined;
  const email = session.customer_details?.email?.trim().toLowerCase();
  if (session.status !== "complete" || !subscription || !invoice || invoice.status !== "paid" || !email)
    return { status: "pending" };

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
  const plan = existing.get("plan");
  if (!created && (plan === "monthly" || plan === "lifetime") && existing.get("stripeSubscriptionId") !== subscription.id) {
    // Already subscribed: never two subscriptions on one person. Stops this one and gives the 0,99 € back.
    if (firstClaim) {
      await stripe.subscriptions
        .cancel(subscription.id)
        .catch((err) => console.error("guest trial: cancel failed", subscription.id, err));
      await refundInvoice(invoice.id!).catch((err) => console.error("guest trial: refund failed", invoice.id, err));
    }
    return { status: "alreadyActive", email };
  }

  // Later invoices and subscription events find the account from this metadata, as for a trial bought signed in.
  if (subscription.metadata.uid !== uid) {
    await stripe.subscriptions.update(subscription.id, { metadata: { ...subscription.metadata, uid } });
  }
  if (customerId) await ref.update({ stripeCustomerId: customerId });
  await creditPaidInvoice(uid, { id: invoice.id!, trialStart: invoice.billing_reason === "subscription_create" }, subscription.id);

  const trialEndsAt = subscription.trial_end ? subscription.trial_end * 1000 : null;
  if (existing.get("trialSessionId") !== session.id) await ref.update({ trialSessionId: session.id, trialEndsAt });
  if (firstClaim) {
    // The confirmation, with a link to choose a password for a new account (its only way back in on another device).
    let passwordUrl: string | undefined;
    if (created) {
      passwordUrl = await adminAuth
        .generatePasswordResetLink(email, { url: `${baseUrl}${localePath(locale, "/auth/login")}` })
        .catch((err) => {
          console.error("guest trial: password link failed", err);
          return undefined;
        });
    }
    if (trialEndsAt) {
      const name = session.customer_details?.name ?? null;
      await sendTrialEmail(email, name, trialEndsAt, baseUrl, locale, passwordUrl).catch((err) =>
        console.error("trial email failed", err),
      );
    }
  }
  return created ? { status: "created", uid } : { status: "existing", email };
}
