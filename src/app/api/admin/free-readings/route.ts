import { FieldPath, type Timestamp } from "firebase-admin/firestore";
import type { AdminFreeReadings } from "@/lib/admin";
import { forbidden, isAdminRequest } from "@/lib/admin-auth";
import { adminDb } from "@/lib/firebase-admin";

const dayKey = (date: Date) => date.toISOString().slice(0, 10);

/**
 * Free readings over the last `days` days (UTC days, like the daily budget they are metered against): readings asked
 * for and their real AI cost (previewBudget, which also counts images that were not charts), charts that got a stored
 * reading, and how many were unlocked by a purchase (previews). No visitor identity is stored, so these are readings,
 * not people.
 */
export async function GET(request: Request) {
  if (!(await isAdminRequest(request))) return forbidden();
  const days = Math.min(365, Math.max(1, Number(new URL(request.url).searchParams.get("days")) || 30));
  const keys = Array.from({ length: days }, (_, index) => dayKey(new Date(Date.now() - (days - 1 - index) * 24 * 3600 * 1000)));
  const from = new Date(`${keys[0]}T00:00:00.000Z`);

  const [budgetSnap, previewSnap] = await Promise.all([
    adminDb.collection("previewBudget").where(FieldPath.documentId(), ">=", keys[0]).get(),
    adminDb.collection("previews").where("createdAt", ">=", from).limit(10000).get(),
  ]);

  const rows = new Map(keys.map((day) => [day, { day, asked: 0, charts: 0, unlocked: 0, costEur: 0 }]));
  for (const doc of budgetSnap.docs) {
    const row = rows.get(doc.id);
    if (row) {
      row.asked = doc.get("count") ?? 0;
      row.costEur = doc.get("spendEur") ?? 0;
    }
  }
  const locales: Record<string, number> = {};
  const assets = new Map<string, number>();
  const recent: AdminFreeReadings["recent"] = [];
  for (const doc of previewSnap.docs) {
    const at = (doc.get("createdAt") as Timestamp | undefined)?.toDate?.();
    const row = at ? rows.get(dayKey(at)) : undefined;
    if (!row) continue;
    row.charts += 1;
    if (doc.get("claimedBy")) row.unlocked += 1;
    const locale = doc.get("locale") ?? "fr";
    locales[locale] = (locales[locale] ?? 0) + 1;
    const asset = String(doc.get("preview.asset") ?? "Inconnu").trim() || "Inconnu";
    assets.set(asset, (assets.get(asset) ?? 0) + 1);
    recent.push({
      id: doc.id,
      at: at ? at.getTime() : null,
      asset,
      timeframe: String(doc.get("preview.timeframe") ?? ""),
      locale,
      unlocked: Boolean(doc.get("claimedBy")),
      costEur: Math.round((doc.get("costEur") ?? 0) * 10000) / 10000,
    });
  }

  const list = [...rows.values()].map((row) => ({ ...row, costEur: Math.round(row.costEur * 10000) / 10000 }));
  const sum = (key: "asked" | "charts" | "unlocked" | "costEur") => list.reduce((total, row) => total + row[key], 0);
  const result: AdminFreeReadings = {
    days: list,
    totals: {
      asked: sum("asked"),
      charts: sum("charts"),
      unlocked: sum("unlocked"),
      costEur: Math.round(sum("costEur") * 100) / 100,
      costPerReadingEur: sum("asked") ? Math.round((sum("costEur") / sum("asked")) * 10000) / 10000 : 0,
    },
    locales,
    assets: [...assets.entries()].map(([asset, count]) => ({ asset, count })).sort((a, b) => b.count - a.count).slice(0, 15),
    recent: recent.sort((a, b) => (b.at ?? 0) - (a.at ?? 0)).slice(0, 50),
  };
  return Response.json(result);
}
