import type { ChartAnalysis } from "./analysis";

/**
 * The free texts of a report, in a fixed order, and a way to put translated ones back. Prices, numbers, the asset, the
 * time frame, choice fields (trend, confidence, action…) and the chart marks stay exactly as they are: only words are
 * translated.
 */
type Path = (string | number)[];

function paths(a: ChartAnalysis): Path[] {
  const list: Path[] = [["confidence", "reason"], ["capture_quality", "tip"], ["horizon"], ["summary"]];
  a.capture_quality?.issues?.forEach((_, i) => list.push(["capture_quality", "issues", i]));
  a.supports?.forEach((_, i) => list.push(["supports", i]));
  a.resistances?.forEach((_, i) => list.push(["resistances", i]));
  a.patterns?.forEach((_, i) => list.push(["patterns", i]));
  for (const side of ["bullish", "bearish"] as const) {
    list.push([side, "thesis"], [side, "entry"], [side, "stop_loss"], [side, "invalidation"]);
    a[side]?.targets?.forEach((_, i) => list.push([side, "targets", i]));
  }
  list.push(["verdict", "headline"], ["verdict", "rationale"], ["verdict", "change_mind"]);
  a.risk_notes?.forEach((_, i) => list.push(["risk_notes", i]));
  return list;
}

function read(target: unknown, path: Path): unknown {
  return path.reduce<unknown>((value, key) => (value == null ? undefined : (value as Record<string | number, unknown>)[key]), target);
}

/** The texts to translate (never empty ones), with where each comes from. */
export function reportTexts(analysis: ChartAnalysis) {
  return paths(analysis).flatMap((path) => {
    const value = read(analysis, path);
    return typeof value === "string" && value.trim() ? [{ path, text: value }] : [];
  });
}

/** A copy of the report with the translated texts in place (same order as reportTexts). */
export function withTranslatedTexts(analysis: ChartAnalysis, items: { path: Path }[], translated: string[]): ChartAnalysis {
  const copy = structuredClone(analysis);
  items.forEach(({ path }, index) => {
    const parent = read(copy, path.slice(0, -1)) as Record<string | number, unknown> | undefined;
    if (parent) parent[path[path.length - 1]] = translated[index];
  });
  return copy;
}
