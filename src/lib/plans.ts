export type Plan = "none" | "monthly" | "lifetime";
export type Offer = Exclude<Plan, "none">;

/** Fair-use quota per calendar month, for both offers. */
export const MONTHLY_CREDITS = 100;

// Display only: keep prices in sync with the Stripe prices set in STRIPE_PRICE_MONTHLY / STRIPE_PRICE_LIFETIME.
export const OFFERS: Record<Offer, { name: string; price: string; period: string }> = {
  monthly: { name: "Mensuel", price: "40 €", period: "/ mois" },
  lifetime: { name: "À vie", price: "180 €", period: "paiement unique" },
};

export const PLAN_LABELS: Record<Plan, string> = { none: "Aucune offre", monthly: "Mensuel", lifetime: "À vie" };

/** Month key ("2026-10") used to refill lifetime credits once per calendar month. */
export function creditPeriod(date = new Date()) {
  return date.toISOString().slice(0, 7);
}

type CreditState = { plan?: Plan; credits?: number; creditsPeriod?: string };

/** Credits actually available: lifetime accounts get a fresh monthly quota when the month changes. */
export function availableCredits({ plan, credits = 0, creditsPeriod }: CreditState) {
  if (plan === "lifetime" && creditsPeriod !== creditPeriod()) return MONTHLY_CREDITS;
  return credits;
}
