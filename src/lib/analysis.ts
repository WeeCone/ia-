import { z } from "zod";

const Scenario = z.object({
  probability: z.number().describe("Probabilité estimée en pourcentage (0-100). Haussier + baissier = 100."),
  thesis: z.string().describe("Raisonnement en 1-2 phrases."),
  entry: z.string().describe("Zone ou niveau d'entrée, tel que lisible sur le graphique."),
  stop_loss: z.string(),
  targets: z.array(z.string()).describe("1 à 3 objectifs de prix."),
});

export const ChartAnalysis = z.object({
  is_chart: z.boolean().describe("false si l'image n'est pas un graphique de prix exploitable."),
  asset: z.string().describe("Actif identifié (ex. BTC/USDT), ou « Inconnu »."),
  timeframe: z.string().describe("Unité de temps (ex. 4H), ou « Inconnue »."),
  trend: z.enum(["haussière", "baissière", "neutre"]),
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
});

export type ChartAnalysis = z.infer<typeof ChartAnalysis>;
export type LevelMark = ChartAnalysis["level_marks"][number];

export const ALLOWED_IMAGE_TYPES = ["image/png", "image/jpeg", "image/webp", "image/gif"] as const;
export type AllowedImageType = (typeof ALLOWED_IMAGE_TYPES)[number];
export const MAX_IMAGE_BYTES = 5 * 1024 * 1024;
