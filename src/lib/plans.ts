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
// Starter: its analyses run on the light model (about 1 centime each), so a month of daily analyses stays under 0,50 €.
// Pro: unlimited analyses; the ceiling only stops automated use far beyond any human pace (see proModel below for how
// the model steps down so a normal heavy month stays near 5 €).
const BUDGET_EUR: Record<Plan, number> = { none: 7, starter: 0.5, monthly: 10, lifetime: 11 };
export const budgetFor = (plan: Plan | undefined) => BUDGET_EUR[plan ?? "none"] ?? BUDGET_EUR.none;
/** The highest of the ceilings, for the admin's spend warnings. */
export const MONTHLY_BUDGET_EUR = Math.max(...Object.values(BUDGET_EUR));

/** Typical cost of one analysis, in euros (measured on real reports; keep it pessimistic). */
export const ANALYSIS_COST_EUR = 0.2;

/**
 * Worst case for a single analysis: the chart reading (16 000 output tokens at Opus prices, plus the image and prompt,
 * about 0,34 €), its news side on the mid-size model (up to 4 web searches and their results read as input, 6 000 output
 * tokens, about 0,15 €) and the light model's first look. An analysis only starts if this much budget is left, so the
 * ceiling is never crossed.
 */
export const MAX_CALL_COST_EUR = 0.5;
/** Worst case for an analysis on the light model (16 000 output tokens, image, first look). */
export const LIGHT_MAX_CALL_COST_EUR = 0.03;

/** À vie: analyses per calendar month. */
export const MONTHLY_CREDITS = 30;
/** Pro has no analysis count. */
export const isUnlimited = (plan: Plan | undefined) => plan === "monthly";
/** Starter: analyses per day. */
export const STARTER_DAILY_CREDITS = 1;

export const OPUS_MODEL = "claude-opus-5-5";
export const SONNET_MODEL = "claude-sonnet-5-5";
export const HAIKU_MODEL = "claude-haiku-5-5";

/**
 * Pro is unlimited, and its AI spend is meant to stay near 5 € a month: the month's first analyses are read by the top
 * model, then by the mid-size one, then by the light one. Past the last step, the news side is only served from the
 * day's shared cache (no new web search).
 */
const PRO_STEPS_EUR = { sonnet: 3, haiku: 4.5 };
export function proModel(spentEur: number) {
  if (spentEur < PRO_STEPS_EUR.sonnet) return { model: OPUS_MODEL, freshNews: true };
  if (spentEur < PRO_STEPS_EUR.haiku) return { model: SONNET_MODEL, freshNews: true };
  return { model: HAIKU_MODEL, freshNews: false };
}

/**
 * Which model reads an account's next chart, whether its news side may run new searches, and the worst case to keep
 * free in the budget before starting. Starter: the light model, a reduced report (see the dashboard), no news side.
 */
export function analysisSetup(plan: Plan | undefined, spentEur: number) {
  if (plan === "starter") return { model: HAIKU_MODEL, freshNews: false, maxCost: LIGHT_MAX_CALL_COST_EUR };
  if (plan === "monthly") {
    const step = proModel(spentEur);
    return { ...step, maxCost: step.model === HAIKU_MODEL ? LIGHT_MAX_CALL_COST_EUR : MAX_CALL_COST_EUR };
  }
  return { model: OPUS_MODEL, freshNews: true, maxCost: MAX_CALL_COST_EUR };
}

/** Which offers can ask the AI a question about an analysis (one a day). */
export const hasChat = (plan: Plan | undefined) => plan === "monthly" || plan === "lifetime";
export const CHAT_QUESTIONS_PER_DAY = 1;

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
  if (isUnlimited(plan)) return Number.POSITIVE_INFINITY;
  if (plan === "lifetime" && creditsPeriod !== creditPeriod()) return MONTHLY_CREDITS;
  if (plan === "starter" && creditsPeriod !== periodFor("starter")) return STARTER_DAILY_CREDITS;
  return credits;
}
