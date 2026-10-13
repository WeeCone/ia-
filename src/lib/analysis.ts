import { z } from "zod";

const Scenario = z.object({
  probability: z.number().describe("Probabilité estimée en pourcentage (0-100). Haussier + baissier = 100."),
  thesis: z.string().describe("Raisonnement en 1-2 phrases."),
  entry: z.string().describe("Condition ou zone d'entrée, telle que lisible sur le graphique (ex. « Clôture 4H au-dessus de 65 400 »)."),
  entry_price: z.number().nullable().describe("Prix d'entrée de référence, en nombre (ex. 65400). null si illisible."),
  stop_loss: z.string().describe("Stop, tel qu'écrit pour le trader."),
  stop_price: z.number().nullable().describe("Prix du stop, en nombre. null si illisible."),
  targets: z.array(z.string()).describe("1 à 3 objectifs de prix, du plus proche au plus lointain."),
  target_prices: z.array(z.number()).describe("Les mêmes objectifs en nombres, dans le même ordre."),
  invalidation: z.string().describe("Ce qui invalide ce scénario, en une phrase avec un niveau précis."),
});

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
  risk_notes: z
    .array(z.string())
    .describe("2 à 4 conseils concrets de gestion du risque propres à ce graphique (taille de position, attente de confirmation, volatilité…)."),
});

export type ChartAnalysis = z.infer<typeof ChartAnalysis>;
export type LevelMark = ChartAnalysis["level_marks"][number];
export type Scenario = ChartAnalysis["bullish"];

export const ALLOWED_IMAGE_TYPES = ["image/png", "image/jpeg", "image/webp", "image/gif"] as const;
export type AllowedImageType = (typeof ALLOWED_IMAGE_TYPES)[number];
export const MAX_IMAGE_BYTES = 5 * 1024 * 1024;
