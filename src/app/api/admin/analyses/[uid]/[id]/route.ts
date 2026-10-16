import { forbidden, isAdminRequest } from "@/lib/admin-auth";
import { adminBucket, adminDb } from "@/lib/firebase-admin";

/** One analysis in full (?image=1: its screenshot). Storage rules only let the owner read it, so the admin goes through here. */
export async function GET(request: Request, context: RouteContext<"/api/admin/analyses/[uid]/[id]">) {
  if (!(await isAdminRequest(request))) return forbidden();
  const { uid, id } = await context.params;
  const snap = await adminDb.collection("users").doc(uid).collection("analyses").doc(id).get();
  if (!snap.exists) return Response.json({ error: "Analyse introuvable." }, { status: 404 });
  const data = snap.data() ?? {};

  if (new URL(request.url).searchParams.get("image")) {
    if (typeof data.imagePath !== "string") return Response.json({ error: "Pas de capture." }, { status: 404 });
    try {
      const file = adminBucket().file(data.imagePath);
      const [[bytes], [meta]] = await Promise.all([file.download(), file.getMetadata()]);
      return new Response(new Uint8Array(bytes), {
        headers: { "Content-Type": meta.contentType ?? "image/png", "Cache-Control": "private, max-age=3600" },
      });
    } catch {
      return Response.json({ error: "Capture introuvable." }, { status: 404 });
    }
  }

  const { createdAt, ...analysis } = data;
  return Response.json({ analysis: { ...analysis, id: snap.id }, createdAt: createdAt?.toMillis?.() ?? null });
}
