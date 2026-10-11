import { adminDb } from "@/lib/firebase-admin";
import { getRequestUid } from "@/lib/server-auth";
import { appUrl, getStripe, withBillingErrors } from "@/lib/stripe";

async function handler(request: Request) {
  const uid = await getRequestUid(request);
  if (!uid) return Response.json({ error: "Session expirée, reconnectez-vous." }, { status: 401 });

  const customerId = (await adminDb.collection("users").doc(uid).get()).get("stripeCustomerId");
  if (!customerId) return Response.json({ error: "Aucun abonnement trouvé." }, { status: 404 });

  const session = await getStripe().billingPortal.sessions.create({
    customer: customerId,
    return_url: `${appUrl(request)}/dashboard`,
  });
  return Response.json({ url: session.url });
}

export const POST = withBillingErrors(handler);
