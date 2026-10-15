import { revalidateTag } from "next/cache";
import type { ReviewStatus } from "@/lib/admin";
import { forbidden, isAdminRequest } from "@/lib/admin-auth";
import { adminDb } from "@/lib/firebase-admin";
import { REVIEWS_TAG } from "@/lib/testimonials";

const STATUSES: ReviewStatus[] = ["pending", "approved", "hidden"];

export async function PATCH(request: Request, context: RouteContext<"/api/admin/reviews/[uid]">) {
  if (!(await isAdminRequest(request))) return forbidden();
  const { uid } = await context.params;
  const { status } = (await request.json().catch(() => ({}))) as { status?: ReviewStatus };
  if (!status || !STATUSES.includes(status)) return Response.json({ error: "Statut inconnu." }, { status: 400 });

  const ref = adminDb.collection("reviews").doc(uid);
  if (!(await ref.get()).exists) return Response.json({ error: "Avis introuvable." }, { status: 404 });
  await ref.update({ status });
  // Approving or hiding a review updates the homepage on its next visit.
  revalidateTag(REVIEWS_TAG, { expire: 0 });
  return Response.json({ ok: true });
}
