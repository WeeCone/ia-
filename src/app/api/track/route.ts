import { attribution, recordEvent, recordView, STAT_EVENTS, statKey, type StatEvent } from "@/lib/stats";

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
    if (body.type === "view") {
      const path = typeof body.path === "string" && /^\/[a-z0-9/_-]{0,60}$/i.test(body.path) ? body.path : null;
      if (!path) return done();
      await recordView({
        page: path === "/" ? "accueil" : (statKey(path.slice(1), 60) ?? "autre"),
        newVisit: body.newVisit === true,
        device: MOBILE.test(agent) ? "mobile" : "desktop",
        locale: statKey(body.locale, 5) ?? "fr",
        from,
      });
    } else if (body.type === "event" && STAT_EVENTS.includes(body.event as StatEvent) && body.event !== "purchase") {
      // Purchases are counted by the Stripe webhook, from the payment itself.
      await recordEvent(body.event as StatEvent, from);
    }
  } catch (err) {
    console.error("track failed", err);
  }
  return done();
}
