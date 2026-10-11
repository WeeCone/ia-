import { FieldValue } from "firebase-admin/firestore";
import { sendWelcomeEmail } from "@/lib/email";
import { adminAuth, adminDb } from "@/lib/firebase-admin";
import { getRequestUid } from "@/lib/server-auth";
import { appUrl } from "@/lib/stripe";

/** Sends the welcome email once per account, right after sign-up. */
export async function POST(request: Request) {
  const uid = await getRequestUid(request);
  if (!uid) return Response.json({ error: "Non authentifié." }, { status: 401 });

  const userRef = adminDb.collection("users").doc(uid);
  // Claim the send in a transaction so concurrent calls can't email twice.
  const claimed = await adminDb.runTransaction(async (tx) => {
    const user = await tx.get(userRef);
    if (!user.exists || user.get("welcomeEmailSentAt")) return false;
    tx.update(userRef, { welcomeEmailSentAt: FieldValue.serverTimestamp() });
    return true;
  });
  if (!claimed) return new Response(null, { status: 204 });

  const { email, displayName } = await adminAuth.getUser(uid);
  const sent = email ? await sendWelcomeEmail(email, displayName ?? null, appUrl(request)) : false;
  // Release the claim so a later call can retry.
  if (!sent) await userRef.update({ welcomeEmailSentAt: FieldValue.delete() });

  return new Response(null, { status: 204 });
}
