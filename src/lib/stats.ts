import "server-only";
import { FieldValue } from "firebase-admin/firestore";
import { adminDb } from "./firebase-admin";

/**
 * First-party audience measurement, without cookies or personal data: anonymous counters per day, never a row per
 * visitor. Each day is split over a few shard documents so a burst of traffic from an ad never contends on one document.
 */

export const STAT_EVENTS = ["signup", "analysis", "checkout", "purchase"] as const;
export type StatEvent = (typeof STAT_EVENTS)[number];

const SHARDS = 8;

/** Calendar day in Paris time, e.g. "2026-10-16". */
export function statDay(date = new Date()) {
  return new Intl.DateTimeFormat("en-CA", { timeZone: "Europe/Paris" }).format(date);
}

/** A safe Firestore map key: lower case, letters, digits and dashes only. */
export function statKey(value: unknown, max = 40) {
  const key = String(value ?? "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9-]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, max);
  return key || null;
}

export type Attribution = { source: string; campaign: string | null };

/** Source and campaign keys, from what the browser reported (already reduced to a source name, never a full URL). */
export function attribution(source: unknown, campaign: unknown): Attribution {
  return { source: statKey(source) ?? "direct", campaign: statKey(campaign) };
}

const campaignKey = ({ source, campaign }: Attribution) => `${source}__${campaign ?? "sans-campagne"}`;

function write(increments: Record<string, unknown>) {
  const day = statDay();
  const shard = Math.floor(Math.random() * SHARDS);
  return adminDb
    .collection("stats")
    .doc(`${day}_${shard}`)
    .set({ day, ...increments }, { merge: true });
}

const one = () => FieldValue.increment(1);

/** A page view; `newVisit` on the first page of a browsing session. */
export function recordView(input: { page: string; newVisit: boolean; device: "mobile" | "desktop"; locale: string; from: Attribution }) {
  const visit = input.newVisit ? { visits: one() } : {};
  return write({
    views: one(),
    ...visit,
    pages: { [input.page]: one() },
    ...(input.newVisit
      ? {
          devices: { [input.device]: one() },
          locales: { [input.locale]: one() },
          sources: { [input.from.source]: { visits: one() } },
          ...(input.from.campaign ? { campaigns: { [campaignKey(input.from)]: { visits: one() } } } : {}),
        }
      : {}),
  });
}

/** A step of the funnel, credited to the source that brought the visitor. */
export function recordEvent(event: StatEvent, from: Attribution, revenueEur = 0) {
  const counters = (extra: Record<string, unknown> = {}) => ({ [event]: one(), ...extra });
  const revenue = revenueEur > 0 ? { revenue: FieldValue.increment(revenueEur) } : {};
  return write({
    events: { [event]: one() },
    ...revenue,
    sources: { [from.source]: counters(revenue) },
    ...(from.campaign ? { campaigns: { [campaignKey(from)]: counters(revenue) } } : {}),
  });
}

/** A paid Stripe checkout, counted once even when Stripe sends the event again. */
export async function recordPurchase(sessionId: string, from: Attribution, revenueEur: number) {
  try {
    await adminDb.collection("statsPurchases").doc(sessionId).create({ createdAt: FieldValue.serverTimestamp() });
  } catch {
    return; // Already counted.
  }
  await recordEvent("purchase", from, revenueEur);
}

/** Splits a campaign map key back into its source and campaign. */
export function splitCampaignKey(key: string) {
  const [source, campaign] = key.split("__");
  return { source, campaign: campaign === "sans-campagne" ? null : campaign };
}

/**
 * Live presence for the admin "En ce moment" panel: one short-lived document per open page, keyed by a random id the
 * page keeps in memory only (nothing stored on the device). Refreshed every 30 s while the tab is visible, deleted when
 * it closes; the admin view drops anything not refreshed lately and clears the leftovers.
 */
export const LIVE_WINDOW_MS = 70_000;

export function recordLive(
  id: string,
  input: { page: string; device: "mobile" | "desktop"; locale: string; from: Attribution; since: number },
) {
  return adminDb
    .collection("live")
    .doc(id)
    .set({ at: Date.now(), since: input.since, page: input.page, device: input.device, locale: input.locale, ...input.from });
}

export function endLive(id: string) {
  return adminDb.collection("live").doc(id).delete();
}
