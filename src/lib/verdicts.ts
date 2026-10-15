import type { Verdict } from "./analysis";

export type VerdictAction = Verdict["action"];
export type VerdictMark = "plus-minus" | "minus-plus" | "equal" | "unclear";

/**
 * The four verdicts and the annotation mark each one is written with, borrowed from chess
 * analysis books: ± one side better, ∓ the other side better, = balanced, ∞ unclear.
 */
export const VERDICTS: { action: VerdictAction; mark: VerdictMark; glyph: string; title: string; when: string }[] = [
  {
    action: "acheter sur confirmation",
    mark: "plus-minus",
    glyph: "±",
    title: "Acheter sur confirmation",
    when: "Le scénario haussier domine et le gain espéré couvre le risque. Le plan dit à quel niveau entrer, où couper, où viser.",
  },
  {
    action: "vendre sur confirmation",
    mark: "minus-plus",
    glyph: "∓",
    title: "Vendre sur confirmation",
    when: "Le scénario baissier domine. Même plan chiffré, dans l'autre sens : déclencheur, stop, objectifs.",
  },
  {
    action: "attendre",
    mark: "equal",
    glyph: "=",
    title: "Attendre",
    when: "La structure se dessine mais le signal n'y est pas encore. Scanzivo dit quel niveau surveiller avant d'agir.",
  },
  {
    action: "ne pas trader",
    mark: "unclear",
    glyph: "∞",
    title: "Ne pas trader",
    when: "Graphique trop incertain, ou gain espéré inférieur au risque. Le verdict le plus rare, et parfois le plus utile.",
  },
];

export const verdictFor = (action: VerdictAction) => VERDICTS.find((verdict) => verdict.action === action) ?? VERDICTS[2];
