import type { Locale } from "@/i18n/config";
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
// Pro: unlimited analyses for at most 5 € of AI a month (see proModel below for how the day's share steps the model
// down); the ceiling itself is only reached by automated use.
const BUDGET_EUR: Record<Plan, number> = { none: 7, starter: 0.5, monthly: 5, lifetime: 11 };
export const budgetFor = (plan: Plan | undefined) => BUDGET_EUR[plan ?? "none"] ?? BUDGET_EUR.none;
/** The highest of the ceilings, for the admin's spend warnings. */
export const MONTHLY_BUDGET_EUR = Math.max(...Object.values(BUDGET_EUR));

/** Typical cost of one analysis, in euros (measured on real reports; keep it pessimistic). */
export const ANALYSIS_COST_EUR = 0.2;

/**
 * Worst case for a single analysis: the chart reading (16 000 output tokens at Opus prices, plus the image and prompt,
 * about 0,34 €), its news side on the mid-size model (up to 2 web searches and their results read as input, 6 000 output
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
 * Pro is unlimited and costs at most 5 € a month in AI, however heavily it is used. The spend is shared out by day: each
 * Paris day gets what is left of a 4,50 € monthly target, divided by the days left in the month. Within that daily
 * share, analyses are read by the top model for the first 60 %, then by the mid-size one; once the share is spent, or the
 * target reached, by the light one (about 1 centime), with the news side served only from the day's shared cache. A
 * heavy day therefore makes the next days' shares smaller, and the month ends near the target; the 5 € ceiling
 * (BUDGET_EUR) is only reached by automated use.
 */
const PRO_TARGET_EUR = 4.5;
const PRO_TOP_SHARE = 0.6;

/** Days left in the current month, today included (Paris time). */
function daysLeftInMonth(date = new Date()) {
  const [year, month, day] = date.toLocaleDateString("sv-SE", { timeZone: "Europe/Paris" }).split("-").map(Number);
  const daysInMonth = new Date(Date.UTC(year, month, 0)).getUTCDate();
  return Math.max(1, daysInMonth - day + 1);
}

export function proModel(monthEur: number, dayEur: number) {
  const left = PRO_TARGET_EUR - (monthEur - dayEur);
  const share = left > 0 ? left / daysLeftInMonth() : 0;
  if (monthEur < PRO_TARGET_EUR && dayEur < share * PRO_TOP_SHARE) return { model: OPUS_MODEL, freshNews: true };
  if (monthEur < PRO_TARGET_EUR && dayEur < share) return { model: SONNET_MODEL, freshNews: true };
  return { model: HAIKU_MODEL, freshNews: false };
}

/**
 * Which model reads an account's next chart, whether its news side may run new searches, and the worst case to keep
 * free in the budget before starting. Starter: the light model, a reduced report (see the dashboard), no news side.
 */
export function analysisSetup(plan: Plan | undefined, spentEur: number, dayEur = 0) {
  if (plan === "starter") return { model: HAIKU_MODEL, freshNews: false, maxCost: LIGHT_MAX_CALL_COST_EUR };
  if (plan === "monthly") {
    const step = proModel(spentEur, dayEur);
    return { ...step, maxCost: step.model === HAIKU_MODEL ? LIGHT_MAX_CALL_COST_EUR : MAX_CALL_COST_EUR };
  }
  return { model: OPUS_MODEL, freshNews: true, maxCost: MAX_CALL_COST_EUR };
}

/** Which offers can ask the AI a question about an analysis (one a day). */
export const hasChat = (plan: Plan | undefined) => plan === "monthly" || plan === "lifetime";
export const CHAT_QUESTIONS_PER_DAY = 1;

/** Which offers get the news side (events and news that can move the asset) with every analysis. */
export const hasNewsSide = (plan: Plan | undefined) => plan === "monthly" || plan === "lifetime";

/**
 * Prices by currency. The euro grid applies to the French, English and Spanish site; the Japanese, Korean, Vietnamese
 * and Indonesian sites show and charge their own currency, at prices set for local purchasing power (Japan and Korea
 * about the euro value, Vietnam and Indonesia about 40 % lower). Format with formatPrice() for the visitor's language.
 */
export type Currency = "eur" | "jpy" | "krw" | "vnd" | "idr";
export const OFFER_PRICES: Record<Currency, Record<Offer, number>> = {
  eur: { starter: 10, monthly: 19, lifetime: 99 },
  jpy: { starter: 1500, monthly: 2980, lifetime: 14800 },
  krw: { starter: 14900, monthly: 27900, lifetime: 139000 },
  vnd: { starter: 149000, monthly: 279000, lifetime: 1490000 },
  idr: { starter: 99000, monthly: 189000, lifetime: 990000 },
};
export const LOCALE_CURRENCY: Record<Locale, Currency> = { fr: "eur", en: "eur", es: "eur", ja: "jpy", ko: "krw", vi: "vnd", id: "idr" };
export const isCurrency = (value: string | null | undefined): value is Currency => !!value && value in OFFER_PRICES;

/** The euro grid, for the admin's estimates and the French texts. */
export const OFFER_PRICE_EUR = OFFER_PRICES.eur;

/** Stripe counts yen, won and dong in whole units, euros and rupiah in hundredths. */
const ZERO_DECIMAL: Currency[] = ["jpy", "krw", "vnd"];
export const toStripeAmount = (currency: Currency, amount: number) => (ZERO_DECIMAL.includes(currency) ? Math.round(amount) : Math.round(amount * 100));
export const fromStripeAmount = (currency: string, amount: number) => (ZERO_DECIMAL.includes(currency as Currency) ? amount : amount / 100);

/** A pack's price in the currency of a language's site. */
export function offerPrice(locale: Locale, offer: Offer) {
  const currency = LOCALE_CURRENCY[locale];
  return { currency, amount: OFFER_PRICES[currency][offer] };
}

/** Rough euro value of an amount in another currency, for the admin's revenue counters only (not for billing). */
const EUR_PER_UNIT: Record<Currency, number> = { eur: 1, jpy: 0.006, krw: 0.00065, vnd: 0.000035, idr: 0.000055 };
export const approxEur = (currency: string, amount: number) => amount * (EUR_PER_UNIT[currency as Currency] ?? 1);

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
