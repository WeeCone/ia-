import type { Timestamp } from "firebase-admin/firestore";
import { FieldValue } from "firebase-admin/firestore";
import { timingSafeEqual } from "node:crypto";
import { connection } from "next/server";
import { sendRelanceEmail } from "@/lib/email";
import { adminAuth, adminDb } from "@/lib/firebase-admin";
import { unsubscribeUrl } from "@/lib/marketing";
import { appUrl } from "@/lib/stripe";
import { DEFAULT_LOCALE, hasLocale } from "@/i18n/config";

const HOUR = 3600 * 1000;

/** Bearer secret of the daily scheduler (CRON_SECRET). Without it set, the route answers as if it did not exist. */
function authorised(request: Request) {
  const expected = process.env.CRON_SECRET?.trim();
  if (!expected || expected.length < 32) return false;
  const given = request.headers.get("authorization")?.replace(/^Bearer\s+/i, "").trim() ?? "";
  const a = Buffer.from(given);
  const b = Buffer.from(expected);
  return a.length === b.length && timingSafeEqual(a, b);
}

/**
 * Run once a day by a scheduler. Reminds the accounts that agreed to receive tips (marketingConsent) and have not bought
 * anything: the first mail between 24 h and 3 days after sign-up, the second from 3 days to 10 days. Each account gets
 * each mail once (relanceStage). `?dry=1` lists what would be sent, sends nothing.
 */
export async function POST(request: Request) {
  await connection();
  if (!authorised(request)) return new Response(null, { status: 404 });
  const dry = new URL(request.url).searchParams.get("dry") === "1";
  const now = Date.now();
  const snap = await adminDb.collection("users").where("marketingConsent", "==", true).limit(500).get();
  const result = { checked: snap.size, first: 0, second: 0, skipped: 0, failed: 0, dry };

  for (const doc of snap.docs) {
    const data = doc.data();
    const created = (data.createdAt as Timestamp | undefined)?.toMillis?.();
    const stage: number = data.relanceStage ?? 0;
    const bought = data.plan !== "none" || Boolean(data.stripeCustomerId);
    if (!created || bought) {
      result.skipped++;
      continue;
    }
    const age = now - created;
    const next = stage < 1 && age >= 24 * HOUR && age < 72 * HOUR ? "first" : stage < 2 && age >= 72 * HOUR && age < 240 * HOUR ? "second" : null;
    if (!next || typeof data.unsubscribeToken !== "string") {
      result.skipped++;
      continue;
    }
    if (dry) {
      result[next]++;
      continue;
    }
    const user = await adminAuth.getUser(doc.id).catch(() => null);
    if (!user?.email) {
      result.skipped++;
      continue;
    }
    const locale = hasLocale(data.locale) ? data.locale : DEFAULT_LOCALE;
    // Claimed before sending, so a second run never sends the same mail twice; released if the send fails.
    await doc.ref.update({ relanceStage: next === "first" ? 1 : 2, relanceAt: FieldValue.serverTimestamp() });
    const sent = await sendRelanceEmail(user.email, user.displayName ?? null, next, appUrl(request), locale, unsubscribeUrl(appUrl(request), doc.id, data.unsubscribeToken, locale));
    if (sent) result[next]++;
    else {
      result.failed++;
      await doc.ref.update({ relanceStage: stage });
    }
  }
  return Response.json(result);
}
