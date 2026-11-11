import type { Timestamp } from "firebase-admin/firestore";
import { connection } from "next/server";
import { adminAuth, adminDb } from "@/lib/firebase-admin";
import { notFound, isOpsRequest, parisDayStart } from "@/lib/ops-auth";
import { availableCredits } from "@/lib/plans";
import { monthSpend } from "@/lib/usage-cost";

const iso = (value: unknown) => (value && typeof (value as Timestamp).toDate === "function" ? (value as Timestamp).toDate().toISOString() : null);

/**
 * Read-only: one customer (by ?email= or ?uid=), their plan, credits and month's AI spend, and their analyses from a
 * Paris day on (?day=YYYY-MM-DD, today by default; ?days=N for N days back, at most 31). Never writes.
 */
export async function GET(request: Request) {
  // Read at request time, never prerendered: the answer depends on the token and on live data.
  await connection();
  if (!isOpsRequest(request)) return notFound();
  const url = new URL(request.url);
  const email = url.searchParams.get("email")?.trim().toLowerCase();
  let uid = url.searchParams.get("uid")?.trim();
  if (!uid && email) uid = await adminAuth.getUserByEmail(email).then((user) => user.uid).catch(() => undefined);
  if (!uid) return Response.json({ error: "Client introuvable." }, { status: 404 });

  const userSnap = await adminDb.collection("users").doc(uid).get();
  if (!userSnap.exists) return Response.json({ error: "Client introuvable." }, { status: 404 });
  const data = userSnap.data() ?? {};

  const days = Math.min(31, Math.max(1, Number(url.searchParams.get("days")) || 1));
  const { day, start } = parisDayStart(url.searchParams.get("day"));
  start.setUTCDate(start.getUTCDate() - (days - 1));

  const [analysesSnap, errorsSnap] = await Promise.all([
    userSnap.ref.collection("analyses").where("createdAt", ">=", start).orderBy("createdAt", "desc").limit(200).get(),
    adminDb.collection("analysisErrors").where("uid", "==", uid).limit(50).get(),
  ]);

  const analyses = analysesSnap.docs.map((doc) => {
    const a = doc.data();
    return {
      id: doc.id,
      at: iso(a.createdAt),
      chart: a.is_chart !== false,
      asset: a.asset ?? null,
      timeframe: a.timeframe ?? null,
      trend: a.trend ?? null,
      action: a.verdict?.action ?? null,
      headline: a.verdict?.headline ?? null,
      confidence: a.confidence?.level ?? null,
      note: a.note ?? null,
      model: a.model ?? null,
      costEur: a.usage?.costEur ?? null,
      outputTokens: a.usage?.outputTokens ?? null,
      macro: Boolean(a.macro),
      questions: Array.isArray(a.chat) ? a.chat.map((c: { question: string; answer: string }) => ({ question: c.question, answer: c.answer })) : [],
    };
  });
  const errors = errorsSnap.docs
    .map((doc) => ({ at: iso(doc.get("createdAt")), seconds: doc.get("seconds") ?? null, detail: doc.get("detail") ?? "" }))
    .filter((error) => !error.at || error.at >= start.toISOString())
    .sort((a, b) => (b.at ?? "").localeCompare(a.at ?? ""));

  return Response.json({
    customer: {
      uid,
      email: data.email ?? email ?? null,
      name: data.displayName ?? null,
      plan: data.plan ?? "none",
      credits: Number.isFinite(availableCredits(data)) ? availableCredits(data) : "illimité",
      monthSpendEur: Math.round(monthSpend(data) * 1000) / 1000,
      createdAt: iso(data.createdAt),
      stripeCustomer: Boolean(data.stripeCustomerId),
      subscription: Boolean(data.stripeSubscriptionId),
      questionsToday: data.chatDay === new Date().toLocaleDateString("sv-SE", { timeZone: "Europe/Paris" }) ? (data.chatCount ?? 0) : 0,
    },
    period: { from: start.toISOString(), toDay: day, days },
    analyses,
    totals: {
      analyses: analyses.length,
      charts: analyses.filter((a) => a.chart).length,
      costEur: Math.round(analyses.reduce((sum, a) => sum + (a.costEur ?? 0), 0) * 1000) / 1000,
    },
    errors,
  });
}
