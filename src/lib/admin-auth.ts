import "server-only";
import { isAdminEmail } from "./admin";
import { adminAuth } from "./firebase-admin";

/** True when the request carries the ID token of a verified admin account. */
export async function isAdminRequest(request: Request) {
  const token = request.headers.get("authorization")?.replace(/^Bearer /, "");
  if (!token) return false;
  try {
    const decoded = await adminAuth.verifyIdToken(token);
    // Verified only: an unverified address could belong to anyone who typed it at sign-up.
    return decoded.email_verified === true && isAdminEmail(decoded.email);
  } catch {
    return false;
  }
}

export const forbidden = () => Response.json({ error: "Accès réservé à l'administrateur." }, { status: 403 });
