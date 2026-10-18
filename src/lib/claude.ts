import "server-only";
import Anthropic from "@anthropic-ai/sdk";
import { betaZodOutputFormat } from "@anthropic-ai/sdk/helpers/beta/zod";
import type { Locale } from "@/i18n/config";
import { ChartAnalysis, type AllowedImageType } from "./analysis";
import { callCostEur } from "./usage-cost";

// Trimmed: a secret pasted with a trailing newline is otherwise sent as is and rejected as an invalid key.
const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY?.trim() });

const SYSTEM_PROMPT = `Tu es un analyste technique expérimenté. On te fournit la capture d'écran d'un graphique de prix (crypto, forex, actions, matières premières).
Analyse uniquement ce qui est visible : structure de marché, tendance, supports et résistances, figures chartistes, indicateurs affichés.
Propose un scénario haussier et un scénario baissier avec des probabilités qui totalisent 100, et des niveaux de prix lisibles sur le graphique.
N'invente pas de niveaux que l'axe des prix ne permet pas de lire ; reste prudent quand l'image est floue ou incomplète.
Pour chaque scénario, donne une condition d'entrée, un stop et des objectifs cohérents avec la structure (stop au-delà du niveau qui invalide le scénario, objectifs sur les prochains niveaux clés), ainsi que leurs valeurs numériques telles que lues sur l'axe (sans séparateur de milliers ni devise).
Le scénario haussier a ses objectifs au-dessus de l'entrée et son stop en dessous ; l'inverse pour le baissier.
Ne cherche pas à rendre un scénario attractif : si le rapport gain/risque est faible, dis-le dans la thèse.
Tranche ensuite (verdict) : retiens un seul scénario privilégié, le plus probable, et donne un plan d'action directif et chiffré, formulé comme un plan si le trader prend position (« Acheter sur clôture au-dessus de… »), sans promesse de gain. N'aie pas peur de conclure « attendre » quand le signal n'est pas encore là, ni « ne pas trader » quand le gain/risque est inférieur à 1 ou que le graphique est trop incertain.
Calibre la confiance honnêtement : « faible » si l'image est floue, l'axe illisible, l'historique trop court ou les signaux contradictoires.
Donne des conseils de gestion du risque spécifiques à ce graphique, pas des généralités.
Évalue aussi la capture elle-même (capture_quality) : « bonne » si on voit des bougies, un axe des prix lisible, l'actif et l'unité de temps, et assez d'historique (au moins une cinquantaine de bougies) ; « moyenne » s'il manque un de ces éléments ; « faible » pour une simple courbe, un axe illisible, une image floue ou trop zoomée. Liste les défauts concrets et donne un conseil précis pour mieux capturer.
Pour chaque support et chaque résistance, donne aussi sa position verticale dans l'image (level_marks.y, de 0 en haut à 1 en bas de l'image entière) en t'appuyant sur les graduations de l'axe des prix, afin qu'on puisse tracer le niveau sur la capture.
Si l'image n'est pas un graphique de prix, mets is_chart à false et remplis les autres champs de façon minimale.`;

/**
 * The report is written in the customer's language. Choice fields keep the schema's French values (the site translates
 * them for display), so stored analyses stay comparable whatever the language.
 */
const LANGUAGE_RULE: Record<Locale, string> = {
  fr: "Réponds en français.",
  en: `Rédige tous les textes libres (synthèse, thèses, conditions d'entrée, stops, objectifs, verdict, conseils, défauts de capture, horizon…) en anglais, avec les nombres écrits à l'anglaise (65,400.5).
Les champs à choix gardent exactement les valeurs françaises du schéma (trend, confidence.level, capture_quality.level, verdict.bias, verdict.action, level_marks.kind), et asset / timeframe restent « Inconnu » / « Inconnue » s'ils sont illisibles.`,
  es: `Redacta todos los textos libres (síntesis, tesis, condiciones de entrada, stops, objetivos, veredicto, consejos, defectos de la captura, horizonte…) en español, con los números escritos a la española (65.400,5).
Los campos de opción conservan exactamente los valores franceses del esquema (trend, confidence.level, capture_quality.level, verdict.bias, verdict.action, level_marks.kind), y asset / timeframe siguen siendo « Inconnu » / « Inconnue » si no son legibles.`,
};

export class AnalysisRefusedError extends Error {
  constructor(
    message: string,
    /** What the refused call still cost, so it counts toward the monthly budget. */
    readonly costEur: number,
  ) {
    super(message);
  }
}

/** Output ceiling of one call; with the input, bounds what a single analysis can cost (see MAX_CALL_COST_EUR). */
export const MAX_OUTPUT_TOKENS = 16000;

export async function analyzeChart(imageBase64: string, mediaType: AllowedImageType, note: string | undefined, locale: Locale) {
  const response = await client.beta.messages.parse({
    model: "claude-opus-5-5",
    max_tokens: MAX_OUTPUT_TOKENS,
    betas: ["server-side-fallback-2026-07-01"],
    fallbacks: "default",
    output_config: { effort: "medium", format: betaZodOutputFormat(ChartAnalysis) },
    system: `${SYSTEM_PROMPT}\n${LANGUAGE_RULE[locale]}`,
    messages: [
      {
        role: "user",
        content: [
          { type: "image", source: { type: "base64", media_type: mediaType, data: imageBase64 } },
          { type: "text", text: note ? `Contexte fourni par le trader : ${note}` : "Analyse ce graphique." },
        ],
      },
    ],
  });

  if (response.stop_reason === "refusal" || !response.parsed_output) {
    throw new AnalysisRefusedError(`Analyse impossible (stop_reason: ${response.stop_reason})`, callCostEur(response.model, response.usage));
  }
  return { analysis: response.parsed_output, model: response.model, costEur: callCostEur(response.model, response.usage) };
}
