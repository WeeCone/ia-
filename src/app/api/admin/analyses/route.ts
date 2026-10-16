import type { Timestamp } from "firebase-admin/firestore";
import type { AdminAnalysis } from "@/lib/admin";
import { forbidden, isAdminRequest } from "@/lib/admin-auth";
import { adminDb } from "@/lib/firebase-admin";

const millis = (value: unknown) => (value && typeof (value as Timestamp).toMillis === "function" ? (value as Timestamp).toMillis() : null);

const PER_USER = 30;
const MAX_ROWS = 500;

/**
 * Latest analyses across every account, newest first. Read per user (each subcollection's createdAt index exists by
 * default) rather than with a collection-group query, which would need a custom index deployed by hand.
 */
export async function GET(request: Request) {
  if (!(await isAdminRequest(request))) return forbidden();

  const userSnap = await adminDb.collection("users").limit(2000).get();
  const perUser = await Promise.all(
    userSnap.docs.map(async (userDoc) => {
      const user = userDoc.data();
      const snap = await userDoc.ref
        .collection("analyses")
        .orderBy("createdAt", "desc")
        .limit(PER_USER)
        .select("is_chart", "asset", "timeframe", "trend", "verdict", "note", "imagePath", "createdAt")
        .get();
      return snap.docs.map((doc): AdminAnalysis => {
        const data = doc.data();
        return {
          id: doc.id,
          uid: userDoc.id,
          email: user.email ?? null,
          displayName: user.displayName ?? null,
          createdAt: millis(data.createdAt),
          isChart: data.is_chart !== false,
          asset: data.asset ?? "—",
          timeframe: data.timeframe ?? "—",
          trend: data.trend ?? null,
          action: data.verdict?.action ?? null,
          headline: data.verdict?.headline ?? null,
          note: data.note ?? null,
          hasImage: Boolean(data.imagePath),
        };
      });
    }),
  );

  const analyses = perUser
    .flat()
    .sort((a, b) => (b.createdAt ?? 0) - (a.createdAt ?? 0))
    .slice(0, MAX_ROWS);
  return Response.json({ analyses });
}
