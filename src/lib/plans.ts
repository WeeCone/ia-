export type Plan = "none" | "starter" | "monthly" | "lifetime";
/** What can be bought: Starter and Pro (stored as "monthly") are monthly subscriptions, À vie a one-off payment. */
export type Offer = Exclude<Plan, "none">;

/**
 * The paid trial (0,99 € for 3 days) is no longer sold since 2026-10-30. Kept for subscriptions started before:
 * their first invoice opened TRIAL_CREDITS analyses.
 */
export const TRIAL_DAYS = 3;
export const TRIAL_CREDITS = 1;

/**
 * Hard ceiling on what one customer can cost in AI calls per calendar month, in euros, by plan.
 * Every call is priced from its real token usage and recorded on the user; once the ceiling is near, analyses stop until next month.
 */
const BUDGET_EUR: Record<Plan, number> = { none: 7, starter: 5, monthly: 11, lifetime: 11 };
export const budgetFor = (plan: Plan | undefined) => BUDGET_EUR[plan ?? "none"] ?? BUDGET_EUR.none;
/** The highest of the ceilings, for the admin's spend warnings. */
export const MONTHLY_BUDGET_EUR = Math.max(...Object.values(BUDGET_EUR));

/** Typical cost of one analysis, in euros (measured on real reports; keep it pessimistic). */
export const ANALYSIS_COST_EUR = 0.2;

/**
 * Worst case for a single analysis: the chart reading (16 000 output tokens at Opus prices, plus the image and prompt)
 * and its news side (up to 4 web searches, their results read as input, 6 000 output tokens).
 * An analysis only starts if this much budget is left, so the ceiling is never crossed.
 */
export const MAX_CALL_COST_EUR = 0.7;

/** Pro and À vie: analyses per calendar month. */
export const MONTHLY_CREDITS = 30;
/** Starter: analyses per day. */
export const STARTER_DAILY_CREDITS = 1;

/** Starter reports are read by a lighter model and come without the news side, which keeps the pack at 10 €. */
export const STARTER_MODEL = "claude-sonnet-5-5";

/** Which offers get the news side (events and news that can move the asset) with every analysis. */
export const hasNewsSide = (plan: Plan | undefined) => plan === "monthly" || plan === "lifetime";

/** Prices in euros (display; the checkout sends the same amounts to Stripe). Format with formatEur() for the visitor's language. */
export const OFFER_PRICE_EUR: Record<Offer, number> = { starter: 10, monthly: 19, lifetime: 99 };
/** The same prices as Stripe bills them, in cents (the checkout sets them inline, see api/billing/checkout). */
export const OFFER_PRICE_CENTS: Record<Offer, number> = { starter: 1000, monthly: 1900, lifetime: 9900 };

export const PLAN_LABELS: Record<Plan, string> = { none: "Aucune offre", starter: "Starter", monthly: "Pro", lifetime: "À vie" };

/** Month key ("2026-10") used to refill lifetime credits once per calendar month. */
export function creditPeriod(date = new Date()) {
  return date.toISOString().slice(0, 7);
}

/** The period a plan's credits refill on: each day for Starter, each month otherwise. */
export function periodFor(plan: Plan | undefined, date = new Date()) {
  return plan === "starter" ? date.toISOString().slice(0, 10) : creditPeriod(date);
}

type CreditState = { plan?: Plan; credits?: number; creditsPeriod?: string };

/** Credits actually available: À vie gets a fresh monthly quota when the month changes, Starter a fresh one each day. */
export function availableCredits({ plan, credits = 0, creditsPeriod }: CreditState) {
  if (plan === "lifetime" && creditsPeriod !== creditPeriod()) return MONTHLY_CREDITS;
  if (plan === "starter" && creditsPeriod !== periodFor("starter")) return STARTER_DAILY_CREDITS;
  return credits;
}
