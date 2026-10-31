import { adminBucket, adminDb } from "@/lib/firebase-admin";
import { getRequestUid } from "@/lib/server-auth";

/** The signed-in customer's own screenshot for one of their analyses, read on the server (no Storage rules needed). */
export async function GET(request: Request, context: RouteContext<"/api/analyses/[id]/image">) {
  const uid = await getRequestUid(request);
  if (!uid) return new Response(null, { status: 401 });
  const { id } = await context.params;
  const snap = await adminDb.collection("users").doc(uid).collection("analyses").doc(id).get();
  const imagePath = snap.get("imagePath");
  if (typeof imagePath !== "string") return new Response(null, { status: 404 });
  try {
    const file = adminBucket().file(imagePath);
    const [[bytes], [meta]] = await Promise.all([file.download(), file.getMetadata()]);
    return new Response(new Uint8Array(bytes), {
      headers: { "Content-Type": meta.contentType ?? "image/png", "Cache-Control": "private, max-age=3600" },
    });
  } catch {
    return new Response(null, { status: 404 });
  }
}
