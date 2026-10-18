import { adminAuth } from "@/lib/firebase-admin";
import { claimGuestSession } from "@/lib/guest-checkout";
import { appUrl, getStripe, withBillingErrors } from "@/lib/stripe";
import { DICTIONARIES } from "@/i18n/dictionaries";
import { requestLocale } from "@/i18n/server";

/** How long the return link can sign its buyer in: long enough to come back to the tab, not a lasting key. */
const SIGN_IN_WINDOW = 24 * 3600;

/**
 * The welcome page after a trial bought without an account: makes the account from the email given to Stripe (unless
 * the webhook already did) and, for a new account, returns a sign-in token so the buyer lands in their space at once.
 */
async function handler(request: Request) {
  const text = DICTIONARIES[requestLocale(request)].api;
  const { sessionId } = (await request.json().catch(() => ({}))) as { sessionId?: string };
  if (!sessionId || !/^cs_[A-Za-z0-9_]+$/.test(sessionId)) return Response.json({ error: text.unknownOffer }, { status: 400 });

  const session = await getStripe().checkout.sessions.retrieve(sessionId, { expand: ["subscription.latest_invoice"] });
  const claim = await claimGuestSession(session, appUrl(request));
  if (!claim) return Response.json({ error: text.unknownOffer }, { status: 400 });
  if (claim.status !== "created") return Response.json(claim);

  if (Date.now() / 1000 - session.created > SIGN_IN_WINDOW) return Response.json({ status: "expired" });
  try {
    return Response.json({ status: "created", token: await adminAuth.createCustomToken(claim.uid) });
  } catch (err) {
    // Signing tokens needs the server's service account to hold "Service Account Token Creator" on itself. Without it
    // the account still exists: the buyer gets in with the password link from the confirmation email.
    console.error("guest trial: sign-in token failed", err);
    return Response.json({ status: "expired" });
  }
}

export const POST = withBillingErrors(handler);
