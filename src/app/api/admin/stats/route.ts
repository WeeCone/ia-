import type { AdminStats, FunnelCounts } from "@/lib/admin";
import { forbidden, isAdminRequest } from "@/lib/admin-auth";
import { adminDb } from "@/lib/firebase-admin";
import { splitCampaignKey, statDay } from "@/lib/stats";

type Counters = Record<string, number | undefined>;

const empty = (): FunnelCounts => ({ visits: 0, signup: 0, analysis: 0, checkout: 0, purchase: 0, revenue: 0 });

function add(target: FunnelCounts, counters: Counters = {}) {
  for (const key of Object.keys(target) as (keyof FunnelCounts)[]) target[key] += counters[key] ?? 0;
}

function addMap(target: Record<string, number>, counts: Counters = {}) {
  for (const [key, value] of Object.entries(counts)) target[key] = (target[key] ?? 0) + (value ?? 0);
}

/** Sums the daily shards of lib/stats.ts over the last `days` days (7 to 365). */
export async function GET(request: Request) {
  if (!(await isAdminRequest(request))) return forbidden();
  const days = Math.min(365, Math.max(1, Number(new URL(request.url).searchParams.get("days")) || 30));
  const dayKeys = Array.from({ length: days }, (_, index) => statDay(new Date(Date.now() - (days - 1 - index) * 24 * 3600 * 1000)));

  const snap = await adminDb.collection("stats").where("day", ">=", dayKeys[0]).get();

  const byDay = new Map(dayKeys.map((day) => [day, { day, visits: 0, views: 0, signup: 0, purchase: 0 }]));
  const totals = { ...empty(), views: 0 };
  const sources = new Map<string, FunnelCounts>();
  const campaigns = new Map<string, FunnelCounts>();
  const pages: Record<string, number> = {};
  const devices: Record<string, number> = {};
  const locales: Record<string, number> = {};

  for (const doc of snap.docs) {
    const data = doc.data();
    const events: Counters = data.events ?? {};
    const day = byDay.get(data.day);
    if (day) {
      day.visits += data.visits ?? 0;
      day.views += data.views ?? 0;
      day.signup += events.signup ?? 0;
      day.purchase += events.purchase ?? 0;
    }
    totals.views += data.views ?? 0;
    add(totals, { visits: data.visits, revenue: data.revenue, ...events });
    for (const [key, counters] of Object.entries((data.sources ?? {}) as Record<string, Counters>)) {
      if (!sources.has(key)) sources.set(key, empty());
      add(sources.get(key)!, counters);
    }
    for (const [key, counters] of Object.entries((data.campaigns ?? {}) as Record<string, Counters>)) {
      if (!campaigns.has(key)) campaigns.set(key, empty());
      add(campaigns.get(key)!, counters);
    }
    addMap(pages, data.pages);
    addMap(devices, data.devices);
    addMap(locales, data.locales);
  }

  const byVisits = (a: FunnelCounts, b: FunnelCounts) => b.visits - a.visits || b.purchase - a.purchase;
  const stats: AdminStats = {
    days: [...byDay.values()],
    totals,
    sources: [...sources.entries()].map(([source, counts]) => ({ source, ...counts })).sort(byVisits),
    campaigns: [...campaigns.entries()].map(([key, counts]) => ({ ...splitCampaignKey(key), ...counts })).sort(byVisits),
    pages: Object.entries(pages)
      .map(([page, views]) => ({ page, views }))
      .sort((a, b) => b.views - a.views)
      .slice(0, 15),
    devices,
    locales,
  };
  return Response.json(stats);
}
