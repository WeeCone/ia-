import { cacheLife, cacheTag } from "next/cache";
import { adminDb } from "./firebase-admin";

export type Testimonial = { quote: string; name: string; rating: number };

export const REVIEWS_TAG = "public-reviews";

/** "David Mougin" → "David M.": first name and initial only. */
function shortName(displayName: unknown) {
  const parts = typeof displayName === "string" ? displayName.trim().split(/\s+/).filter(Boolean) : [];
  if (!parts.length) return "Client Scanzivo";
  return parts.length > 1 ? `${parts[0]} ${parts[parts.length - 1][0].toUpperCase()}.` : parts[0];
}

/**
 * Real customer reviews: approved in the admin and published with the author's consent.
 * Only genuine reviews are shown; the section stays hidden until there is at least one.
 */
export async function getPublishedReviews(): Promise<Testimonial[]> {
  "use cache";
  cacheLife("hours");
  cacheTag(REVIEWS_TAG);
  try {
    const snapshot = await adminDb.collection("reviews").where("status", "==", "approved").where("publishConsent", "==", true).get();
    return snapshot.docs
      .map((doc) => doc.data())
      .filter((review) => typeof review.text === "string" && review.text.trim())
      .sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0) || (b.createdAt?.toMillis?.() ?? 0) - (a.createdAt?.toMillis?.() ?? 0))
      .slice(0, 6)
      .map((review) => ({ quote: review.text.trim(), name: shortName(review.displayName), rating: Math.max(1, Math.min(5, Math.round(review.rating ?? 5))) }));
  } catch (error) {
    console.error("Avis publics indisponibles", error);
    return [];
  }
}
