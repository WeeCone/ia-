import "server-only";
import { timingSafeEqual } from "node:crypto";

/**
 * Read-only access for the owner's assistant (Claude), separate from the admin account: a long random token kept in
 * the App Hosting secret opsReadToken, sent as "Authorization: Bearer <token>". It only opens the /api/ops/* routes,
 * which read and never write. Without the secret set, those routes answer 404, as if they did not exist. To revoke it,
 * set a new value for the secret (or remove it) and redeploy.
 */
export function isOpsRequest(request: Request) {
  const expected = process.env.OPS_READ_TOKEN?.trim();
  if (!expected || expected.length < 32) return false;
  const given = request.headers.get("authorization")?.replace(/^Bearer\s+/i, "").trim() ?? "";
  const a = Buffer.from(given);
  const b = Buffer.from(expected);
  return a.length === b.length && timingSafeEqual(a, b);
}

export const notFound = () => new Response(null, { status: 404 });

/** Start of the given Paris day (YYYY-MM-DD), or of today, as a Date. */
export function parisDayStart(day?: string | null) {
  const target = day && /^\d{4}-\d{2}-\d{2}$/.test(day) ? day : new Date().toLocaleDateString("sv-SE", { timeZone: "Europe/Paris" });
  // Paris is UTC+1 or UTC+2: find the UTC instant whose Paris date and hour are target 00:00.
  for (const offset of [1, 2]) {
    const candidate = new Date(`${target}T00:00:00.000Z`);
    candidate.setUTCHours(candidate.getUTCHours() - offset);
    const parts = candidate.toLocaleString("sv-SE", { timeZone: "Europe/Paris" });
    if (parts.startsWith(`${target} 00:00`)) return { day: target, start: candidate };
  }
  return { day: target, start: new Date(`${target}T00:00:00.000Z`) };
}
