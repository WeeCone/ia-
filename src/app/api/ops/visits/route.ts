import { connection } from "next/server";
import { adminDb } from "@/lib/firebase-admin";
import { isOpsRequest, notFound } from "@/lib/ops-auth";
import { statDay } from "@/lib/stats";

type Counters = Record<string, number | undefined>;

const addTo = (target: Record<string, number>, counts: Counters = {}) => {
  for (const [key, value] of Object.entries(counts)) target[key] = (target[key] ?? 0) + (value ?? 0);
};

/**
 * Read-only: the anonymous visit counters of the last `days` days (default 14, max 120): visits, page views, and the
 * language of the site visited, per day and in total, with the traffic sources, pages and devices. The language is the
 * site version visited, not the visitor's country. Never writes.
 */
export async function GET(request: Request) {
  await connection();
  if (!isOpsRequest(request)) return notFound();
  const days = Math.min(120, Math.max(1, Number(new URL(request.url).searchParams.get("days")) || 14));
  const keys = Array.from({ length: days }, (_, index) => statDay(new Date(Date.now() - (days - 1 - index) * 24 * 3600 * 1000)));
  const snap = await adminDb.collection("stats").where("day", ">=", keys[0]).get();

  const perDay = new Map(keys.map((day) => [day, { day, visits: 0, views: 0, locales: {} as Record<string, number> }]));
  const locales: Record<string, number> = {};
  const sources: Record<string, number> = {};
  const pages: Record<string, number> = {};
  const devices: Record<string, number> = {};
  let visits = 0;
  let views = 0;
  for (const doc of snap.docs) {
    const data = doc.data();
    const row = perDay.get(data.day);
    visits += data.visits ?? 0;
    views += data.views ?? 0;
    if (row) {
      row.visits += data.visits ?? 0;
      row.views += data.views ?? 0;
      addTo(row.locales, data.locales);
    }
    addTo(locales, data.locales);
    addTo(pages, data.pages);
    addTo(devices, data.devices);
    for (const [source, counters] of Object.entries((data.sources ?? {}) as Record<string, Counters>)) sources[source] = (sources[source] ?? 0) + (counters.visits ?? 0);
  }
  const top = (counts: Record<string, number>, limit = 20) => Object.entries(counts).sort((a, b) => b[1] - a[1]).slice(0, limit);
  return Response.json({ days, totals: { visits, views }, locales: top(locales), sources: top(sources), pages: top(pages), devices, perDay: [...perDay.values()] });
}
