import { adminDb } from "@/lib/firebase-admin";
import { hasLocale } from "@/i18n/config";
import { DICTIONARIES } from "@/i18n/dictionaries";
import { requestLocale } from "@/i18n/server";
import type { ChartAnalysis } from "@/lib/analysis";
import { translateAnalysis } from "@/lib/claude";
import { getRequestUid } from "@/lib/server-auth";
import { addSpend, parisDay } from "@/lib/usage-cost";

export const maxDuration = 60;

/** New translations one account may ask for per day (each costs a fraction of a cent; already made ones are free). */
const PER_DAY = 20;

/**
 * Shows one of the customer's reports in another language. The translation is kept with the report, so asking again
 * costs nothing. The original is never modified.
 */
export async function POST(request: Request, context: RouteContext<"/api/analyses/[id]/translate">) {
  const text = DICTIONARIES[requestLocale(request)].api;
  const error = (message: string, status: number) => Response.json({ error: message }, { status });
  const uid = await getRequestUid(request);
  if (!uid) return error(text.sessionExpired, 401);
  const { id } = await context.params;
  const body = (await request.json().catch(() => null)) as { locale?: unknown } | null;
  const target = body?.locale;
  if (typeof target !== "string" || !hasLocale(target)) return error(text.failed, 400);

  const userRef = adminDb.collection("users").doc(uid);
  const analysisRef = userRef.collection("analyses").doc(id);
  const snap = await analysisRef.get();
  if (!snap.exists || snap.get("is_chart") === false) return error(text.failed, 404);

  const { chat: _chat, imagePath: _path, createdAt: _created, usage: _usage, model: _model, note: _note, translations, ...original } = snap.data() as Record<string, unknown> & {
    translations?: Record<string, ChartAnalysis>;
  };
  const source = original as unknown as ChartAnalysis;
  if (target === (source.locale ?? "fr") && !translations?.[target]) return Response.json({ analysis: source });
  const done = translations?.[target];
  if (done) return Response.json({ analysis: done });

  // A daily ceiling on new translations.
  const user = (await userRef.get()).data() ?? {};
  const used = user.translateDay === parisDay() ? (user.translateCount ?? 0) : 0;
  if (used >= PER_DAY) return error(text.chatLimit, 429);

  let result: Awaited<ReturnType<typeof translateAnalysis>>;
  try {
    result = await translateAnalysis(source, target);
  } catch (err) {
    console.error("translate failed", err);
    return error(text.failed, 502);
  }
  await Promise.all([
    analysisRef.update({ [`translations.${target}`]: result.analysis }),
    userRef.update({ ...addSpend(user, result.costEur), translateDay: parisDay(), translateCount: used + 1 }),
  ]).catch((err) => console.error("translation save failed", err));
  return Response.json({ analysis: result.analysis });
}
