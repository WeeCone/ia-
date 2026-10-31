import { z } from "zod";

const Scenario = z.object({
  probability: z.number().describe("Probabilité estimée en pourcentage (0-100). Haussier + baissier = 100. Le scénario dominant est à 65-80 dès que la structure penche d'un côté."),
  thesis: z.string().describe("Raisonnement en 1-2 phrases."),
  entry: z.string().describe("Condition ou zone d'entrée, telle que lisible sur le graphique (ex. « Clôture 4H au-dessus de 65 400 »)."),
  entry_price: z.number().nullable().describe("Prix d'entrée de référence, en nombre (ex. 65400). null si illisible."),
  stop_loss: z.string().describe("Stop, tel qu'écrit pour le trader."),
  stop_price: z.number().nullable().describe("Prix du stop, en nombre. null si illisible."),
  targets: z.array(z.string()).describe("1 à 3 objectifs de prix, du plus proche au plus lointain."),
  target_prices: z.array(z.number()).describe("Les mêmes objectifs en nombres, dans le même ordre."),
  invalidation: z.string().describe("Ce qui invalide ce scénario, en une phrase avec un niveau précis."),
});

/** The news side of a report (lib/macro.ts): events and news that can move the asset, found by web search. */
export const MacroReport = z.object({
  asset: z.string(),
  context: z.string(),
  events: z.array(
    z.object({
      date: z.string(),
      title: z.string(),
      impact: z.enum(["fort", "moyen", "faible"]),
      why: z.string(),
    }),
  ),
  plan_impact: z.string(),
  sources: z.array(z.object({ title: z.string(), url: z.string() })),
});
export type MacroReport = z.infer<typeof MacroReport>;

/**
 * The free reading's own output: only what the visitor sees, from a lighter model and a short answer, which keeps it at
 * about 0,02 €. The full report is made once a pack is bought.
 */
export const ChartPreview = z.object({
  is_chart: z.boolean().describe("false si l'image n'est pas un graphique de prix exploitable."),
  asset: z.string().describe("Actif identifié (ex. BTC/USDT), ou « Inconnu »."),
  timeframe: z.string().describe("Unité de temps (ex. 4H), ou « Inconnue »."),
  confidence: z.enum(["faible", "moyenne", "élevée"]).describe("Confiance dans la lecture de ce graphique."),
  summary: z
    .string()
    .describe("Résumé en 2 phrases : l'actif, l'unité de temps et le contexte visible (où se trouve le prix, ce qui s'est passé récemment), SANS tendance ni direction, sans prix chiffré, sans verdict."),
  stakes: z
    .string()
    .describe(
      "4 à 5 phrases sur ce qui se joue sur ce graphique : les zones et signaux repérés, ce qui est en train de se former, et la question que cela pose pour la suite, SANS révéler la direction probable, aucun prix ni niveau chiffré, aucun verdict.",
    ),
  patterns_count: z.number().describe("Nombre de figures chartistes ou signaux d'indicateurs visibles."),
  level_marks: z
    .array(z.object({ kind: z.enum(["support", "resistance"]), y: z.number().describe("Position verticale : 0 = bord haut de l'image, 1 = bord bas.") }))
    .describe("Les principaux supports et résistances (2 à 5), placés sur l'image."),
});
export type ChartPreview = z.infer<typeof ChartPreview>;

export const ChartAnalysis = z.object({
  is_chart: z.boolean().describe("false si l'image n'est pas un graphique de prix exploitable."),
  asset: z.string().describe("Actif identifié (ex. BTC/USDT), ou « Inconnu »."),
  timeframe: z.string().describe("Unité de temps (ex. 4H), ou « Inconnue »."),
  trend: z.enum(["haussière", "baissière", "neutre"]),
  confidence: z
    .object({
      level: z.enum(["faible", "moyenne", "élevée"]),
      reason: z.string().describe("Pourquoi ce niveau de confiance, en une phrase (lisibilité, signaux concordants ou contradictoires…)."),
    })
    .describe("Confiance globale dans la lecture du graphique."),
  capture_quality: z
    .object({
      level: z.enum(["bonne", "moyenne", "faible"]),
      issues: z
        .array(z.string())
        .describe("Défauts concrets de la capture, en quelques mots chacun (ex. « courbe en ligne, pas de bougies », « axe des prix illisible »). Vide si bonne."),
      tip: z.string().describe("Un conseil précis pour une meilleure capture la prochaine fois, ou chaîne vide si la capture est bonne."),
    })
    .describe("Qualité de la capture elle-même, indépendamment du marché."),
  horizon: z.string().describe("Horizon de validité des scénarios, déduit de l'unité de temps (ex. « 1 à 3 jours »)."),
  summary: z.string().describe("Synthèse de la structure du marché en 2-3 phrases."),
  supports: z.array(z.string()),
  resistances: z.array(z.string()),
  patterns: z.array(z.string()).describe("Figures chartistes / signaux d'indicateurs visibles."),
  level_marks: z
    .array(
      z.object({
        price: z.string().describe("Le niveau, écrit comme dans supports / resistances."),
        kind: z.enum(["support", "resistance"]),
        y: z.number().describe("Position verticale de ce prix dans l'image entière : 0 = bord haut, 1 = bord bas."),
      }),
    )
    .describe("Un repère par support et par résistance, pour les tracer sur la capture."),
  bullish: Scenario,
  bearish: Scenario,
  verdict: z
    .object({
      bias: z.enum(["haussier", "baissier"]).describe("Le scénario privilégié : celui dont la probabilité est la plus élevée."),
      action: z
        .enum(["acheter sur confirmation", "vendre sur confirmation", "attendre", "ne pas trader"])
        .describe(
          "Ce que le trader devrait faire. « acheter / vendre sur confirmation » dès qu'un scénario domine ; « attendre » seulement si le prix est au milieu d'un range sans signal ; « ne pas trader » si le gain/risque du scénario privilégié est inférieur à 1 ou si le graphique est illisible.",
        ),
      headline: z
        .string()
        .describe(
          "Le plan en une phrase directive, avec les niveaux (ex. « Vendre sur clôture journalière sous 1,50, stop 1,82, objectifs 1,20 puis 1,00 »). Pour « attendre » : les deux déclencheurs chiffrés et quand refaire une analyse (ex. « Attendre : achat sur clôture 4H au-dessus de 65 400, stop 64 300, objectif 66 600 ; vente sous 64 300. Refaire une analyse après la prochaine clôture 4H. »).",
        ),
      rationale: z.string().describe("Pourquoi ce scénario plutôt que l'autre, en 1-2 phrases."),
      change_mind: z.string().describe("Ce qui ferait changer d'avis, avec un niveau précis."),
    })
    .describe("Le verdict : un seul scénario privilégié et un plan d'action clair."),
  risk_notes: z
    .array(z.string())
    .describe("2 à 4 conseils concrets de gestion du risque propres à ce graphique (taille de position, attente de confirmation, volatilité…)."),
});

/** A report as stored and shown: the chart reading, plus the news side when it could be gathered (older reports have none). */
export type ChartAnalysis = z.infer<typeof ChartAnalysis> & { macro?: MacroReport | null };
export type LevelMark = ChartAnalysis["level_marks"][number];
export type Scenario = ChartAnalysis["bullish"];

export const ALLOWED_IMAGE_TYPES = ["image/png", "image/jpeg", "image/webp", "image/gif"] as const;
export type AllowedImageType = (typeof ALLOWED_IMAGE_TYPES)[number];
export const MAX_IMAGE_BYTES = 5 * 1024 * 1024;

export type Verdict = ChartAnalysis["verdict"];

/**
 * The preferred scenario, its alternative and the verdict. Analyses stored before the verdict existed
 * fall back to the more probable scenario, with a plan derived from its entry.
 */
export function preferredPlan(analysis: ChartAnalysis) {
  const stored = analysis.verdict as Verdict | undefined;
  const bias = stored?.bias ?? (analysis.bearish.probability > analysis.bullish.probability ? "baissier" : "haussier");
  const scenario = bias === "haussier" ? analysis.bullish : analysis.bearish;
  const alternative = bias === "haussier" ? analysis.bearish : analysis.bullish;
  const verdict: Verdict = stored ?? {
    bias,
    action: bias === "haussier" ? "acheter sur confirmation" : "vendre sur confirmation",
    headline: scenario.thesis,
    rationale: "",
    change_mind: scenario.invalidation ?? "",
  };
  return { bias, scenario, alternative, verdict };
}
