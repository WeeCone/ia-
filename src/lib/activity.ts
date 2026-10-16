import { FieldValue, Timestamp } from "firebase-admin/firestore";
import type { ChartAnalysis } from "./analysis";
import { adminDb } from "./firebase-admin";

export type Activity = { asset: string; timeframe: string | null; trend: ChartAnalysis["trend"]; at: number };

const UNKNOWN = /^(inconnu|inconnue|non identifié|n\/a|-)?$/i;

/**
 * Logs a real analysis for the homepage activity feed: market, timeframe and trend only. No user id, no note,
 * no verdict (a public buy/sell line would read as a signal).
 */
export function recordActivity(analysis: ChartAnalysis) {
  const asset = analysis.asset?.trim() ?? "";
  if (UNKNOWN.test(asset)) return;
  const timeframe = analysis.timeframe?.trim() ?? "";
  adminDb
    .collection("activity")
    .add({ asset: asset.slice(0, 24), timeframe: UNKNOWN.test(timeframe) ? null : timeframe.slice(0, 8), trend: analysis.trend, createdAt: FieldValue.serverTimestamp() })
    .catch((err) => console.error("activity log failed", err));
}

/** Analyses from the last 24 hours, newest first. Empty when nothing happened: nothing is ever made up. */
export async function getRecentActivity(): Promise<Activity[]> {
  const since = Timestamp.fromMillis(Date.now() - 24 * 60 * 60 * 1000);
  const snapshot = await adminDb.collection("activity").where("createdAt", ">=", since).orderBy("createdAt", "desc").limit(8).get();
  return snapshot.docs.map((doc) => {
    const data = doc.data();
    return { asset: data.asset, timeframe: data.timeframe ?? null, trend: data.trend, at: data.createdAt.toMillis() };
  });
}
