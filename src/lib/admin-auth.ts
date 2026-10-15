import "server-only";
import { isAdminEmail, isAdminUid } from "./admin";
import { adminAuth } from "./firebase-admin";

/** True when the request carries the ID token of a verified admin account. */
export async function isAdminRequest(request: Request) {
  const token = request.headers.get("authorization")?.replace(/^Bearer /, "");
  if (!token) return false;
  try {
    const decoded = await adminAuth.verifyIdToken(token);
    if (isAdminUid(decoded.uid)) return true;
    // An email counts only once verified: an unverified address could belong to anyone who typed it at sign-up.
    if (!isAdminEmail(decoded.email)) return false;
    if (decoded.email_verified === true) return true;
    // The token's claim lags for up to an hour after the user clicks the link: ask Firebase for the live status.
    return (await adminAuth.getUser(decoded.uid)).emailVerified;
  } catch {
    return false;
  }
}

export const forbidden = () => Response.json({ error: "Accès réservé à l'administrateur." }, { status: 403 });
