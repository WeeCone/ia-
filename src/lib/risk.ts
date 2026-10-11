import type { Scenario } from "./analysis";

/**
 * Reward-to-risk ratio for each target, computed from the numeric prices (not trusted from the model).
 * Returns null when prices are missing or inconsistent with the scenario's direction.
 */
export function rewardRatios(scenario: Partial<Scenario>, direction: "long" | "short"): number[] | null {
  const { entry_price: entry, stop_price: stop, target_prices: targets } = scenario;
  if (entry == null || stop == null || !targets?.length) return null;
  const risk = direction === "long" ? entry - stop : stop - entry;
  if (!(risk > 0)) return null;
  const ratios = targets.map((target) => (direction === "long" ? target - entry : entry - target) / risk);
  return ratios.every((ratio) => ratio > 0 && Number.isFinite(ratio)) ? ratios : null;
}

export const formatRatio = (ratio: number) => `1 : ${ratio.toLocaleString("fr-FR", { maximumFractionDigits: 1 })}`;
