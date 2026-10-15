import type { ChartAnalysis } from "./analysis";

/** Illustrative example shown on the landing page — not a real market reading. */
export const DEMO_ANALYSIS: ChartAnalysis = {
  is_chart: true,
  asset: "BTC/USDT",
  timeframe: "4H",
  trend: "haussière",
  confidence: {
    level: "moyenne",
    reason: "Structure haussière nette, mais le prix teste une résistance et le volume de cassure reste à confirmer.",
  },
  capture_quality: { level: "bonne", issues: [], tip: "" },
  horizon: "1 à 3 jours",
  summary:
    "Structure de plus hauts et plus bas ascendants depuis 61 800. Le prix a cassé la résistance des 63 200, l'a retestée comme support, et bute désormais sous 65 400. Le momentum reste acheteur tant que 63 200 tient.",
  supports: ["63 200", "61 800"],
  resistances: ["65 400", "67 000"],
  patterns: ["Cassure puis retest de 63 200 (flip résistance → support)", "Plus bas ascendants", "Volumes en hausse sur les bougies vertes"],
  level_marks: [],
  bullish: {
    probability: 62,
    thesis: "Une clôture 4H au-dessus de 65 400 ouvrirait la voie vers le sommet précédent.",
    entry: "Clôture 4H au-dessus de 65 400",
    entry_price: 65400,
    stop_loss: "64 300",
    stop_price: 64300,
    targets: ["66 200", "67 000"],
    target_prices: [66200, 67000],
    invalidation: "Retour sous 64 300 après la cassure (fausse cassure).",
  },
  bearish: {
    probability: 38,
    thesis: "Un rejet sous 65 400 suivi d'une perte de 63 200 invaliderait la structure haussière.",
    entry: "Clôture 4H sous 63 200",
    entry_price: 63200,
    stop_loss: "64 100",
    stop_price: 64100,
    targets: ["62 400", "61 800"],
    target_prices: [62400, 61800],
    invalidation: "Reprise de 64 100 en clôture 4H.",
  },
  verdict: {
    bias: "haussier",
    action: "acheter sur confirmation",
    headline: "Acheter sur clôture 4H au-dessus de 65 400, stop 64 300, objectifs 66 200 puis 67 000.",
    rationale: "Structure de plus bas ascendants et retest réussi de 63 200 : la pression acheteuse domine tant que ce support tient.",
    change_mind: "Une clôture 4H sous 63 200 invaliderait la structure haussière.",
  },
  risk_notes: [
    "Attendre la clôture 4H au-delà du niveau plutôt qu'entrer sur une mèche.",
    "Le premier objectif haussier rapporte moins que le risque pris : alléger la position sur 66 200.",
    "Volatilité élevée près de 65 400 : réduire la taille de position.",
  ],
};
