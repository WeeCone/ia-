import type { Timestamp } from "firebase-admin/firestore";
import type { AdminOverview, AdminReview, AdminUser, ReviewStatus } from "@/lib/admin";
import { forbidden, isAdminRequest } from "@/lib/admin-auth";
import { adminDb } from "@/lib/firebase-admin";
import { availableCredits } from "@/lib/plans";
import { monthSpend } from "@/lib/usage-cost";

const millis = (value: unknown) => (value && typeof (value as Timestamp).toMillis === "function" ? (value as Timestamp).toMillis() : null);

export async function GET(request: Request) {
  if (!(await isAdminRequest(request))) return forbidden();

  const [userSnap, reviewSnap] = await Promise.all([
    adminDb.collection("users").limit(2000).get(),
    adminDb.collection("reviews").limit(500).get(),
  ]);

  const users: AdminUser[] = await Promise.all(
    userSnap.docs.map(async (doc) => {
      const data = doc.data();
      const count = await doc.ref.collection("analyses").count().get();
      return {
        uid: doc.id,
        email: data.email ?? null,
        displayName: data.displayName ?? null,
        plan: data.plan ?? "none",
        credits: availableCredits(data),
        analyses: count.data().count,
        spendEur: monthSpend(data),
        createdAt: millis(data.createdAt),
        hasStripe: Boolean(data.stripeCustomerId),
      };
    }),
  );
  users.sort((a, b) => (b.createdAt ?? 0) - (a.createdAt ?? 0));

  const reviews: AdminReview[] = reviewSnap.docs
    .map((doc) => {
      const data = doc.data();
      return {
        uid: doc.id,
        rating: data.rating ?? 0,
        text: data.text ?? "",
        displayName: data.displayName ?? null,
        publishConsent: Boolean(data.publishConsent),
        status: (data.status as ReviewStatus) ?? "pending",
        createdAt: millis(data.createdAt),
      };
    })
    .sort((a, b) => (b.createdAt ?? 0) - (a.createdAt ?? 0));

  const weekAgo = Date.now() - 7 * 24 * 3600 * 1000;
  const overview: AdminOverview = {
    users,
    reviews,
    totals: {
      users: users.length,
      newUsers7d: users.filter((user) => (user.createdAt ?? 0) >= weekAgo).length,
      none: users.filter((user) => user.plan === "none").length,
      monthly: users.filter((user) => user.plan === "monthly").length,
      lifetime: users.filter((user) => user.plan === "lifetime").length,
      analyses: users.reduce((sum, user) => sum + user.analyses, 0),
    },
  };
  return Response.json(overview);
}
