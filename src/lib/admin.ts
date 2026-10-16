// Admin accounts, by Firebase uid (NEXT_PUBLIC_ADMIN_UIDS) or by email (NEXT_PUBLIC_ADMIN_EMAILS), comma-separated.
// Public on purpose: on the client it only decides whether admin links show. Every admin API re-checks server-side,
// where an email only counts once verified (a uid can't be claimed by someone else, so it needs no verification).
const list = (value: string | undefined, lower = false) =>
  (value ?? "")
    .split(",")
    .map((item) => (lower ? item.trim().toLowerCase() : item.trim()))
    .filter(Boolean);

const ADMIN_UIDS = list(process.env.NEXT_PUBLIC_ADMIN_UIDS);
const ADMIN_EMAILS = list(process.env.NEXT_PUBLIC_ADMIN_EMAILS, true);

export function isAdminUid(uid: string | null | undefined) {
  return Boolean(uid && ADMIN_UIDS.includes(uid));
}

export function isAdminEmail(email: string | null | undefined) {
  return Boolean(email && ADMIN_EMAILS.includes(email.toLowerCase()));
}

/** Client-side hint only (shows admin links). */
export function isAdminUser(user: { uid: string; email: string | null }) {
  return isAdminUid(user.uid) || isAdminEmail(user.email);
}

export type AdminUser = {
  uid: string;
  email: string | null;
  displayName: string | null;
  plan: "none" | "monthly" | "lifetime";
  credits: number;
  analyses: number;
  /** AI spend this calendar month, in euros. */
  spendEur: number;
  createdAt: number | null;
  hasStripe: boolean;
};

export type ReviewStatus = "pending" | "approved" | "hidden";

export type AdminReview = {
  uid: string;
  rating: number;
  text: string;
  displayName: string | null;
  publishConsent: boolean;
  status: ReviewStatus;
  createdAt: number | null;
};

export type AdminOverview = {
  users: AdminUser[];
  reviews: AdminReview[];
  totals: { users: number; newUsers7d: number; none: number; monthly: number; lifetime: number; analyses: number };
};

/** One row of the admin "Analyses" tab: who ran it, on what, and the outcome. The full report loads on demand. */
export type AdminAnalysis = {
  id: string;
  uid: string;
  email: string | null;
  displayName: string | null;
  createdAt: number | null;
  isChart: boolean;
  asset: string;
  timeframe: string;
  trend: string | null;
  action: string | null;
  headline: string | null;
  note: string | null;
  hasImage: boolean;
};

export type FunnelCounts = { visits: number; signup: number; analysis: number; checkout: number; purchase: number; revenue: number };

/** The admin "Visites" tab, over a period. */
export type AdminStats = {
  days: { day: string; visits: number; views: number; signup: number; purchase: number }[];
  totals: FunnelCounts & { views: number };
  sources: (FunnelCounts & { source: string })[];
  campaigns: (FunnelCounts & { source: string; campaign: string | null })[];
  pages: { page: string; views: number }[];
  devices: Record<string, number>;
  locales: Record<string, number>;
};
