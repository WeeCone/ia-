import { creditPeriod } from "./plans";

/** API list prices in USD per million tokens (input, output), by model family. */
const PRICES: [prefix: string, input: number, output: number][] = [
  ["claude-opus", 4, 20],
  ["claude-sonnet", 2, 10],
  ["claude-haiku", 0.1, 0.5],
];

// Deliberately pessimistic: counting 1 USD as 1 EUR keeps real spend under the euro cap.
const USD_TO_EUR = 1;

type Usage = {
  input_tokens?: number | null;
  output_tokens?: number | null;
  cache_creation_input_tokens?: number | null;
  cache_read_input_tokens?: number | null;
};

/** Cost in euros of one API call, from the token usage it reports. Unknown models are priced as Opus. */
export function callCostEur(model: string, usage: Usage) {
  const [, input, output] = PRICES.find(([prefix]) => model.startsWith(prefix)) ?? PRICES[0];
  const inputTokens = (usage.input_tokens ?? 0) + 1.25 * (usage.cache_creation_input_tokens ?? 0) + 0.1 * (usage.cache_read_input_tokens ?? 0);
  return ((inputTokens * input + (usage.output_tokens ?? 0) * output) / 1_000_000) * USD_TO_EUR;
}

type SpendState = { spendEur?: number; spendPeriod?: string };

/** API spend recorded for the current calendar month. */
export function monthSpend({ spendEur = 0, spendPeriod }: SpendState) {
  // Clamped: a negative value written at profile creation must not unlock extra budget.
  return spendPeriod === creditPeriod() && typeof spendEur === "number" ? Math.max(0, spendEur) : 0;
}
