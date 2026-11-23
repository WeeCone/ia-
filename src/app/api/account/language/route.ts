import { adminDb } from "@/lib/firebase-admin";
import { hasLocale } from "@/i18n/config";
import { getRequestUid } from "@/lib/server-auth";

/** Saves the language this account's reports are written in (the dashboard's language picker). */
export async function POST(request: Request) {
  const uid = await getRequestUid(request);
  if (!uid) return Response.json({ error: "Non authentifié." }, { status: 401 });
  const body = (await request.json().catch(() => ({}))) as { locale?: unknown };
  if (typeof body.locale !== "string" || !hasLocale(body.locale)) return Response.json({ error: "Invalid request." }, { status: 400 });
  const ref = adminDb.collection("users").doc(uid);
  if (!(await ref.get()).exists) return Response.json({ error: "Non authentifié." }, { status: 401 });
  await ref.update({ reportLocale: body.locale });
  return new Response(null, { status: 204 });
}
