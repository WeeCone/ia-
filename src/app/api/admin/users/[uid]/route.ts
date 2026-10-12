import { forbidden, isAdminRequest } from "@/lib/admin-auth";
import { adminDb } from "@/lib/firebase-admin";
import { creditPeriod, type Plan } from "@/lib/plans";

const PLANS: Plan[] = ["none", "monthly", "lifetime"];

/** Manual adjustments (gesture, support, test accounts). Does not touch Stripe: cancel or refund there. */
export async function PATCH(request: Request, context: RouteContext<"/api/admin/users/[uid]">) {
  if (!(await isAdminRequest(request))) return forbidden();
  const { uid } = await context.params;
  const body = (await request.json().catch(() => ({}))) as { plan?: Plan; credits?: number };

  const update: Record<string, unknown> = {};
  if (body.plan !== undefined) {
    if (!PLANS.includes(body.plan)) return Response.json({ error: "Offre inconnue." }, { status: 400 });
    update.plan = body.plan;
  }
  if (body.credits !== undefined) {
    if (!Number.isInteger(body.credits) || body.credits < 0 || body.credits > 10000) {
      return Response.json({ error: "Crédits : un nombre entier entre 0 et 10 000." }, { status: 400 });
    }
    update.credits = body.credits;
    // Stamp the month so a lifetime account isn't refilled over the manual value until next month.
    update.creditsPeriod = creditPeriod();
  }
  if (!Object.keys(update).length) return Response.json({ error: "Rien à modifier." }, { status: 400 });

  const ref = adminDb.collection("users").doc(uid);
  if (!(await ref.get()).exists) return Response.json({ error: "Utilisateur introuvable." }, { status: 404 });
  await ref.update(update);
  return Response.json({ ok: true });
}
