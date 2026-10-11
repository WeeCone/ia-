import "server-only";
import { adminAuth } from "./firebase-admin";

/** Returns the Firebase uid behind the request's `Authorization: Bearer <idToken>` header, or null. */
export async function getRequestUid(request: Request): Promise<string | null> {
  const token = request.headers.get("authorization")?.replace(/^Bearer /, "");
  if (!token) return null;
  try {
    return (await adminAuth.verifyIdToken(token)).uid;
  } catch {
    return null;
  }
}
