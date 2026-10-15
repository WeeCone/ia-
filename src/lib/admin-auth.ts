import "server-only";
import { isAdminEmail, isAdminUid } from "./admin";
import { adminAuth } from "./firebase-admin";

/** True when the request carries the ID token of a verified admin account. */
export async function isAdminRequest(request: Request) {
  const token = request.headers.get("authorization")?.replace(/^Bearer /, "");
  if (!token) return false;
  try {
    const decoded = await adminAuth.verifyIdToken(token);
    // An email counts only once verified: an unverified address could belong to anyone who typed it at sign-up.
    return isAdminUid(decoded.uid) || (decoded.email_verified === true && isAdminEmail(decoded.email));
  } catch {
    return false;
  }
}

export const forbidden = () => Response.json({ error: "Accès réservé à l'administrateur." }, { status: 403 });
