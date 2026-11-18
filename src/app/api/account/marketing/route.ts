import { setMarketingConsent } from "@/lib/marketing";
import { getRequestUid } from "@/lib/server-auth";

/** Records the signed-in account's answer to "receive tips and offers by email?" (yes or no). */
export async function POST(request: Request) {
  const uid = await getRequestUid(request);
  if (!uid) return Response.json({ error: "Non authentifié." }, { status: 401 });
  const body = (await request.json().catch(() => ({}))) as { consent?: unknown };
  if (typeof body.consent !== "boolean") return Response.json({ error: "Invalid request." }, { status: 400 });
  await setMarketingConsent(uid, body.consent);
  return new Response(null, { status: 204 });
}
