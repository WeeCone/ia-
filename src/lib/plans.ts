export type Plan = "none" | "monthly" | "lifetime";
/**
 * What can be bought: a plan, or the paid trial — 0,99 € today and the card saved, TRIAL_DAYS days with TRIAL_CREDITS
 * analyses, then the monthly subscription starts by itself unless cancelled first. Once per account.
 */
export type Offer = Exclude<Plan, "none"> | "trial";

export const TRIAL_DAYS = 3;
export const TRIAL_CREDITS = 1;

/**
 * Hard ceiling on what one customer can cost in AI calls per calendar month, in euros.
 * Every call is priced from its real token usage and recorded on the user; once the ceiling is near, analyses stop until next month.
 */
export const MONTHLY_BUDGET_EUR = 10;

/** Typical cost of one analysis, in euros (measured on real reports; keep it pessimistic). */
export const ANALYSIS_COST_EUR = 0.2;

/**
 * Worst case for a single analysis: the chart reading (16 000 output tokens at Opus prices, plus the image and prompt)
 * and its news side (up to 4 web searches, their results read as input, 6 000 output tokens).
 * An analysis only starts if this much budget is left, so the ceiling is never crossed.
 */
export const MAX_CALL_COST_EUR = 0.7;

/** Fair-use quota per month, for both offers: one credit per analysis, sized to fit the budget (rounded down to 5). */
export const MONTHLY_CREDITS = Math.floor((MONTHLY_BUDGET_EUR - MAX_CALL_COST_EUR) / ANALYSIS_COST_EUR / 5) * 5;

// Display only: keep prices in sync with the Stripe prices set in STRIPE_PRICE_MONTHLY / STRIPE_PRICE_LIFETIME.
export const OFFERS: Record<Offer, { name: string; price: string; period: string }> = {
  monthly: { name: "Mensuel", price: "40 €", period: "/ mois" },
  lifetime: { name: "À vie", price: "180 €", period: "paiement unique" },
  trial: { name: "Essai", price: "0,99 €", period: "3 jours, puis 40 € / mois" },
};

/** Prices in euros (display; keep in sync with Stripe). Format with formatEur() for the visitor's language. */
// The trial fee has no Stripe price to create: the checkout route sends its amount inline (TRIAL_PRICE_CENTS).
export const OFFER_PRICE_EUR: Record<Offer, number> = { monthly: 40, lifetime: 180, trial: 0.99 };
export const TRIAL_PRICE_CENTS = 99;

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
