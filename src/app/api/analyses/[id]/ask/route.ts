import { FieldValue } from "firebase-admin/firestore";
import { DICTIONARIES } from "@/i18n/dictionaries";
import type { AllowedImageType } from "@/lib/analysis";
import { askAboutAnalysis } from "@/lib/claude";
import { adminBucket, adminDb } from "@/lib/firebase-admin";
import { CHAT_QUESTIONS_PER_DAY, hasChat } from "@/lib/plans";
import { requestLocale } from "@/i18n/server";
import { getRequestUid } from "@/lib/server-auth";
import { addSpend } from "@/lib/usage-cost";

type Exchange = { question: string; answer: string; at: number };

const MAX_QUESTION = 400;
/** Today in Paris: the question of the day comes back at midnight there. */
const parisDay = () => new Date().toLocaleDateString("sv-SE", { timeZone: "Europe/Paris" });

function questionsLeft(user: FirebaseFirestore.DocumentData) {
  return user.chatDay === parisDay() ? Math.max(0, CHAT_QUESTIONS_PER_DAY - (user.chatCount ?? 0)) : CHAT_QUESTIONS_PER_DAY;
}

/** The questions already asked about this analysis, and whether one is left today. */
export async function GET(request: Request, context: RouteContext<"/api/analyses/[id]/ask">) {
  const uid = await getRequestUid(request);
  if (!uid) return new Response(null, { status: 401 });
  const { id } = await context.params;
  const userRef = adminDb.collection("users").doc(uid);
  const [user, analysis] = await Promise.all([userRef.get(), userRef.collection("analyses").doc(id).get()]);
  if (!analysis.exists) return new Response(null, { status: 404 });
  const data = user.data() ?? {};
  return Response.json({
    exchanges: (analysis.get("chat") as Exchange[] | undefined) ?? [],
    allowed: hasChat(data.plan),
    left: hasChat(data.plan) ? questionsLeft(data) : 0,
  });
}

/** Asks the AI one question about this analysis: Pro and À vie, one a day. */
export async function POST(request: Request, context: RouteContext<"/api/analyses/[id]/ask">) {
  const locale = requestLocale(request);
  const text = DICTIONARIES[locale].api;
  const error = (message: string, status: number) => Response.json({ error: message }, { status });

  const uid = await getRequestUid(request);
  if (!uid) return error(text.sessionExpired, 401);
  const { id } = await context.params;
  const body = (await request.json().catch(() => null)) as { question?: unknown } | null;
  const question = String(body?.question ?? "")
    .trim()
    .slice(0, MAX_QUESTION);
  if (question.length < 3) return error(text.chatEmpty, 400);

  const userRef = adminDb.collection("users").doc(uid);
  const analysisRef = userRef.collection("analyses").doc(id);

  // The day's question is taken before the call, so two quick clicks can't ask twice; given back if the call fails.
  try {
    await adminDb.runTransaction(async (tx) => {
      const user = (await tx.get(userRef)).data() ?? {};
      if (!hasChat(user.plan)) throw new Error("PLAN");
      if (questionsLeft(user) < 1) throw new Error("LIMIT");
      const day = parisDay();
      tx.update(userRef, { chatDay: day, chatCount: user.chatDay === day ? (user.chatCount ?? 0) + 1 : 1 });
    });
  } catch (err) {
    if (err instanceof Error && err.message === "PLAN") return error(text.chatPlan, 403);
    if (err instanceof Error && err.message === "LIMIT") return error(text.chatLimit, 429);
    throw err;
  }
  const giveBack = () => userRef.update({ chatCount: FieldValue.increment(-1) }).catch(() => {});

  const snap = await analysisRef.get();
  if (!snap.exists || snap.get("is_chart") === false) {
    await giveBack();
    return error(text.failed, 404);
  }
  const { chat, imagePath, ...analysis } = snap.data() ?? {};
  let image: { base64: string; mediaType: AllowedImageType } | null = null;
  if (typeof imagePath === "string") {
    try {
      const file = adminBucket().file(imagePath);
      const [[bytes], [meta]] = await Promise.all([file.download(), file.getMetadata()]);
      image = { base64: bytes.toString("base64"), mediaType: (meta.contentType ?? "image/png") as AllowedImageType };
    } catch {
      image = null;
    }
  }
  delete analysis.createdAt;
  delete analysis.usage;

  let result: Awaited<ReturnType<typeof askAboutAnalysis>>;
  try {
    result = await askAboutAnalysis(analysis, question, locale, image);
  } catch (err) {
    console.error("chat failed", err);
    await giveBack();
    return error(text.failed, 502);
  }
  if (!result.answer) {
    await giveBack();
    return error(text.failed, 502);
  }

  const exchange: Exchange = { question, answer: result.answer, at: Date.now() };
  await Promise.all([
    analysisRef.update({ chat: [...((chat as Exchange[] | undefined) ?? []), exchange] }),
    adminDb.runTransaction(async (tx) => {
      const user = (await tx.get(userRef)).data() ?? {};
      tx.update(userRef, addSpend(user, result.costEur));
    }),
  ]).catch((err) => console.error("chat save failed", err));

  return Response.json({ exchange, left: 0 });
}
