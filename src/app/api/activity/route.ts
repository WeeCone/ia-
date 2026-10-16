import { getRecentActivity } from "@/lib/activity";

// Public, anonymous feed for the homepage; shared caches may keep it a minute.
export async function GET() {
  try {
    return Response.json({ items: await getRecentActivity() }, { headers: { "Cache-Control": "public, s-maxage=60, stale-while-revalidate=60" } });
  } catch (err) {
    console.error("activity feed unavailable", err);
    return Response.json({ items: [] });
  }
}
