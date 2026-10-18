import type { LiveVisitor } from "@/lib/admin";
import { forbidden, isAdminRequest } from "@/lib/admin-auth";
import { adminDb } from "@/lib/firebase-admin";
import { LIVE_WINDOW_MS } from "@/lib/stats";

/** The pages open on the site right now (see recordLive in lib/stats.ts). Polled by the admin "Visites" tab. */
export async function GET(request: Request) {
  if (!(await isAdminRequest(request))) return forbidden();
  const now = Date.now();
  const live = adminDb.collection("live");

  // Tabs closed without saying so (phone locked, crash) leave a document behind: cleared here, a batch at a time.
  const stale = await live.where("at", "<", now - 10 * 60_000).limit(200).get();
  if (!stale.empty) {
    const batch = adminDb.batch();
    stale.docs.forEach((doc) => batch.delete(doc.ref));
    await batch.commit().catch((err) => console.error("live cleanup failed", err));
  }

  const snap = await live.where("at", ">=", now - LIVE_WINDOW_MS).get();
  const visitors: LiveVisitor[] = snap.docs
    .map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        page: data.page ?? "autre",
        source: data.source ?? "direct",
        campaign: data.campaign ?? null,
        device: data.device ?? "desktop",
        locale: data.locale ?? "fr",
        onSiteSeconds: Math.max(0, Math.round((now - (data.since ?? data.at)) / 1000)),
      };
    })
    .sort((a, b) => a.onSiteSeconds - b.onSiteSeconds);
  return Response.json({ visitors });
}
