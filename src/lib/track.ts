"use client";

/**
 * Browser side of the anonymous audience measurement (lib/stats.ts). No cookie: the tab keeps a "visit started" flag
 * (sessionStorage) and the browser remembers for 30 days which ad or site brought it (localStorage), so a sign-up or a
 * purchase a few days later is credited to that campaign. Nothing identifies the person.
 */

const VISIT_KEY = "scanzivo:visit";
const SOURCE_KEY = "scanzivo:source";
const OPT_OUT_KEY = "scanzivo:notrack";
const SOURCE_TTL = 30 * 24 * 3600 * 1000;

type Source = { source: string; campaign: string | null; at: number };

// Referrer host → source name. Anything else keeps its main domain name.
const REFERRERS: [RegExp, string][] = [
  [/(^|\.)instagram\.com$/, "instagram"],
  [/(^|\.)(facebook\.com|fb\.com|fb\.me)$/, "facebook"],
  [/(^|\.)tiktok\.com$/, "tiktok"],
  [/(^|\.)(youtube\.com|youtu\.be)$/, "youtube"],
  [/(^|\.)(t\.co|twitter\.com|x\.com)$/, "x"],
  [/(^|\.)snapchat\.com$/, "snapchat"],
  [/(^|\.)linkedin\.com$|(^|\.)lnkd\.in$/, "linkedin"],
  [/(^|\.)(whatsapp\.com|wa\.me)$/, "whatsapp"],
  [/(^|\.)reddit\.com$/, "reddit"],
  // AI assistants first: gemini.google.com must not count as Google search. ChatGPT also tags its links
  // utm_source=chatgpt.com, which lands under the same key.
  [/(^|\.)chatgpt\.com$|(^|\.)openai\.com$/, "chatgpt-com"],
  [/(^|\.)perplexity\.ai$/, "perplexity"],
  [/(^|\.)claude\.ai$/, "claude"],
  [/^gemini\.google\.com$/, "gemini"],
  [/(^|\.)copilot\.microsoft\.com$/, "copilot"],
  [/(^|\.)mistral\.ai$/, "mistral"],
  [/(^|\.)google\./, "google"],
  [/(^|\.)bing\.com$/, "bing"],
  [/(^|\.)duckduckgo\.com$/, "duckduckgo"],
  [/(^|\.)qwant\.com$/, "qwant"],
];

function read<T>(storage: () => Storage, key: string): T | null {
  try {
    const value = storage().getItem(key);
    return value ? (JSON.parse(value) as T) : null;
  } catch {
    return null;
  }
}

function save(storage: () => Storage, key: string, value: unknown) {
  try {
    storage().setItem(key, JSON.stringify(value));
  } catch {}
}

const local = () => localStorage;
const session = () => sessionStorage;

export function optOutOfTracking() {
  save(local, OPT_OUT_KEY, true);
}

const optedOut = () => read<boolean>(local, OPT_OUT_KEY) === true;

/** Where this visit comes from: ad tags first (utm_*, click ids), then the referring site. Null for a direct visit. */
function sourceFromLanding(): Omit<Source, "at"> | null {
  const params = new URLSearchParams(window.location.search);
  const utm = params.get("utm_source");
  if (utm) return { source: utm, campaign: params.get("utm_campaign") };
  if (params.has("fbclid")) return { source: "facebook", campaign: null };
  if (params.has("gclid") || params.has("gbraid") || params.has("wbraid")) return { source: "google-ads", campaign: null };
  if (params.has("ttclid")) return { source: "tiktok", campaign: null };
  if (params.has("ScCid")) return { source: "snapchat", campaign: null };
  if (!document.referrer) return null;
  try {
    const host = new URL(document.referrer).hostname.replace(/^www\./, "");
    if (host === window.location.hostname.replace(/^www\./, "")) return null;
    const known = REFERRERS.find(([pattern]) => pattern.test(host));
    return { source: known ? known[1] : host.split(".").slice(-2, -1)[0] || host, campaign: null };
  } catch {
    return null;
  }
}

function currentSource(): Omit<Source, "at"> {
  const stored = read<Source>(local, SOURCE_KEY);
  if (stored && Date.now() - stored.at < SOURCE_TTL) return { source: stored.source, campaign: stored.campaign };
  return { source: "direct", campaign: null };
}

function send(payload: Record<string, unknown>) {
  if (optedOut()) return;
  const body = JSON.stringify({ ...payload, ...currentSource() });
  try {
    if (navigator.sendBeacon?.(new URL("/api/track", window.location.origin), new Blob([body], { type: "application/json" }))) return;
  } catch {}
  fetch("/api/track", { method: "POST", body, headers: { "Content-Type": "application/json" }, keepalive: true }).catch(() => {});
}

/** One page view. The first one in a tab opens a visit and records where it came from. */
export function trackView(path: string, locale: string) {
  const newVisit = !read<boolean>(session, VISIT_KEY);
  if (newVisit) {
    save(session, VISIT_KEY, true);
    // The last ad or site that brought the visitor wins; a direct visit keeps the earlier one.
    const landing = sourceFromLanding();
    if (landing) save(local, SOURCE_KEY, { ...landing, at: Date.now() });
  }
  send({ type: "view", path, locale, newVisit });
}

// Live presence: one random id per page load, in memory only, so nothing is written on the device for it.
let liveId: string | null = null;
let liveSince = 0;

/** "This page is open": sent on each page and every 30 s while the tab is visible (admin "En ce moment"). */
export function trackLive(path: string, locale: string) {
  if (!liveId) {
    liveId = typeof crypto.randomUUID === "function" ? crypto.randomUUID() : `${Date.now().toString(36)}-${Math.random().toString(36).slice(2)}`;
    liveSince = Date.now();
  }
  send({ type: "live", id: liveId, path, locale, since: liveSince });
}

/** The tab was hidden or closed: off the live count at once rather than after the timeout. */
export function trackLeave() {
  if (liveId) send({ type: "leave", id: liveId });
}

export function trackEvent(event: "signup" | "analysis" | "checkout") {
  send({ type: "event", event });
}

/** Source and campaign to attach to a Stripe checkout, so the webhook credits the purchase to them. */
export function checkoutAttribution() {
  return optedOut() ? {} : currentSource();
}
