import { attribution, endLive, recordEvent, recordLive, recordView, STAT_EVENTS, statKey, type StatEvent } from "@/lib/stats";

const BOT = /bot|crawl|spider|slurp|preview|facebookexternalhit|headless|lighthouse|pingdom|monitor|curl|wget|python|axios/i;
const MOBILE = /mobile|android|iphone|ipad|ipod/i;

/** Anonymous page views and funnel steps from the site itself (see lib/stats.ts). Always answers 204. */
export async function POST(request: Request) {
  const done = () => new Response(null, { status: 204 });
  const agent = request.headers.get("user-agent") ?? "";
  if (!agent || BOT.test(agent)) return done();
  // Only the site's own pages report here.
  const origin = request.headers.get("origin");
  if (origin && new URL(origin).host !== new URL(request.url).host && !/(^|\.)scanzivo\.com$/.test(new URL(origin).hostname)) return done();

  const body = (await request.json().catch(() => null)) as Record<string, unknown> | null;
  if (!body) return done();
  const from = attribution(body.source, body.campaign);

  try {
    const path = typeof body.path === "string" && /^\/[a-z0-9/_-]{0,60}$/i.test(body.path) ? body.path : null;
    const page = path === "/" ? "accueil" : path ? (statKey(path.slice(1), 60) ?? "autre") : null;
    const device = MOBILE.test(agent) ? "mobile" : "desktop";
    const locale = statKey(body.locale, 5) ?? "fr";
    const liveId = typeof body.id === "string" && /^[a-z0-9-]{8,40}$/i.test(body.id) ? body.id : null;
    if (body.type === "view") {
      if (!page) return done();
      await recordView({ page, newVisit: body.newVisit === true, device, locale, from });
    } else if (body.type === "live") {
      if (!page || !liveId) return done();
      // When the page was opened, as the browser says it; kept within the last six hours.
      const now = Date.now();
      const since = typeof body.since === "number" ? Math.min(now, Math.max(now - 6 * 3600 * 1000, body.since)) : now;
      await recordLive(liveId, { page, device, locale, from, since });
    } else if (body.type === "leave") {
      if (liveId) await endLive(liveId);
    } else if (body.type === "event" && STAT_EVENTS.includes(body.event as StatEvent) && body.event !== "purchase") {
      // Purchases are counted by the Stripe webhook, from the payment itself.
      await recordEvent(body.event as StatEvent, from);
    }
  } catch (err) {
    console.error("track failed", err);
  }
  return done();
}
