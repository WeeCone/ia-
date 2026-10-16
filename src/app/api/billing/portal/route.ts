import { adminDb } from "@/lib/firebase-admin";
import { getRequestUid } from "@/lib/server-auth";
import { appUrl, getStripe, withBillingErrors } from "@/lib/stripe";
import { localePath } from "@/i18n/config";
import { DICTIONARIES } from "@/i18n/dictionaries";
import { requestLocale } from "@/i18n/server";

async function handler(request: Request) {
  const locale = requestLocale(request);
  const text = DICTIONARIES[locale].api;
  const uid = await getRequestUid(request);
  if (!uid) return Response.json({ error: text.sessionExpired }, { status: 401 });

  const customerId = (await adminDb.collection("users").doc(uid).get()).get("stripeCustomerId");
  if (!customerId) return Response.json({ error: text.noSubscription }, { status: 404 });

  const session = await getStripe().billingPortal.sessions.create({
    customer: customerId,
    return_url: `${appUrl(request)}${localePath(locale, "/dashboard")}`,
    locale,
  });
  return Response.json({ url: session.url });
}

export const POST = withBillingErrors(handler);
