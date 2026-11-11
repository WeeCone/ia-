import type { Timestamp } from "firebase-admin/firestore";
import { connection } from "next/server";
import { adminDb } from "@/lib/firebase-admin";
import { notFound, isOpsRequest, parisDayStart } from "@/lib/ops-auth";

const iso = (value: unknown) => (value && typeof (value as Timestamp).toDate === "function" ? (value as Timestamp).toDate().toISOString() : null);

/**
 * Read-only: what happened on a Paris day (?day=YYYY-MM-DD, today by default): new accounts, analyses per customer
 * with their cost, free readings, and failures. Never writes.
 */
export async function GET(request: Request) {
  // Read at request time, never prerendered: the answer depends on the token and on live data.
  await connection();
  if (!isOpsRequest(request)) return notFound();
  const { day, start } = parisDayStart(new URL(request.url).searchParams.get("day"));
  const end = new Date(start.getTime() + 24 * 3600 * 1000);

  const [usersSnap, previewsSnap, errorsSnap] = await Promise.all([
    adminDb.collection("users").limit(2000).get(),
    adminDb.collection("previews").where("createdAt", ">=", start).where("createdAt", "<", end).limit(2000).get(),
    adminDb.collection("analysisErrors").where("createdAt", ">=", start).where("createdAt", "<", end).limit(200).get(),
  ]);

  const perCustomer = (
    await Promise.all(
      usersSnap.docs.map(async (userDoc) => {
        const snap = await userDoc.ref.collection("analyses").where("createdAt", ">=", start).where("createdAt", "<", end).get();
        if (snap.empty) return null;
        const items = snap.docs.map((doc) => doc.data());
        return {
          email: userDoc.get("email") ?? null,
          plan: userDoc.get("plan") ?? "none",
          analyses: items.length,
          assets: [...new Set(items.map((a) => `${a.asset ?? "?"} ${a.timeframe ?? ""}`.trim()))],
          costEur: Math.round(items.reduce((sum, a) => sum + (a.usage?.costEur ?? 0), 0) * 1000) / 1000,
        };
      }),
    )
  )
    .filter((row) => row !== null)
    .sort((a, b) => b.analyses - a.analyses);

  const newAccounts = usersSnap.docs
    .filter((doc) => {
      const at = iso(doc.get("createdAt"));
      return at && at >= start.toISOString() && at < end.toISOString();
    })
    .map((doc) => ({ email: doc.get("email") ?? null, plan: doc.get("plan") ?? "none" }));

  return Response.json({
    day,
    newAccounts,
    customers: perCustomer,
    totals: {
      analyses: perCustomer.reduce((sum, row) => sum + row.analyses, 0),
      analysesCostEur: Math.round(perCustomer.reduce((sum, row) => sum + row.costEur, 0) * 1000) / 1000,
      freeReadings: previewsSnap.size,
      freeReadingsCostEur: Math.round(previewsSnap.docs.reduce((sum, doc) => sum + (doc.get("costEur") ?? 0), 0) * 1000) / 1000,
      freeReadingsUnlocked: previewsSnap.docs.filter((doc) => doc.get("claimedBy")).length,
    },
    errors: errorsSnap.docs.map((doc) => ({ at: iso(doc.get("createdAt")), seconds: doc.get("seconds") ?? null, detail: doc.get("detail") ?? "" })),
  });
}
