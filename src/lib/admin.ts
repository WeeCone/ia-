// Admin accounts, by email (comma-separated in NEXT_PUBLIC_ADMIN_EMAILS). Public on purpose: it only decides
// whether the "Administration" link shows. Every admin API re-checks the signed-in, verified email server-side.
const ADMIN_EMAILS = (process.env.NEXT_PUBLIC_ADMIN_EMAILS ?? "")
  .split(",")
  .map((email) => email.trim().toLowerCase())
  .filter(Boolean);

export function isAdminEmail(email: string | null | undefined) {
  return Boolean(email && ADMIN_EMAILS.includes(email.toLowerCase()));
}

export type AdminUser = {
  uid: string;
  email: string | null;
  displayName: string | null;
  plan: "none" | "monthly" | "lifetime";
  credits: number;
  analyses: number;
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
