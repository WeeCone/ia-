import type { ChartAnalysis } from "./analysis";

/** Illustrative example shown on the landing page — not a real market reading. */
export const DEMO_ANALYSIS: ChartAnalysis = {
  is_chart: true,
  asset: "BTC/USDT",
  timeframe: "4H",
  trend: "haussière",
  summary:
    "Structure de plus hauts et plus bas ascendants depuis 61 800. Le prix a cassé la résistance des 63 200, l'a retestée comme support, et bute désormais sous 65 400. Le momentum reste acheteur tant que 63 200 tient.",
  supports: ["63 200", "61 800"],
  resistances: ["65 400", "67 000"],
  patterns: ["Cassure puis retest de 63 200 (flip résistance → support)", "Plus bas ascendants", "Volumes en hausse sur les bougies vertes"],
  bullish: {
    probability: 62,
    thesis: "Une clôture 4H au-dessus de 65 400 ouvrirait la voie vers le sommet précédent.",
    entry: "Clôture au-dessus de 65 400",
    stop_loss: "64 300",
    targets: ["66 200", "67 000"],
  },
  bearish: {
    probability: 38,
    thesis: "Un rejet sous 65 400 suivi d'une perte de 63 200 invaliderait la structure haussière.",
    entry: "Clôture sous 63 200",
    stop_loss: "64 100",
    targets: ["62 400", "61 800"],
  },
};
