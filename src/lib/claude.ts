import "server-only";
import Anthropic from "@anthropic-ai/sdk";
import { betaZodOutputFormat } from "@anthropic-ai/sdk/helpers/beta/zod";
import { ChartAnalysis, type AllowedImageType } from "./analysis";

const client = new Anthropic();

const SYSTEM_PROMPT = `Tu es un analyste technique expérimenté. On te fournit la capture d'écran d'un graphique de prix (crypto, forex, actions, matières premières).
Analyse uniquement ce qui est visible : structure de marché, tendance, supports et résistances, figures chartistes, indicateurs affichés.
Propose un scénario haussier et un scénario baissier avec des probabilités qui totalisent 100, et des niveaux de prix lisibles sur le graphique.
N'invente pas de niveaux que l'axe des prix ne permet pas de lire ; reste prudent quand l'image est floue ou incomplète.
Si l'image n'est pas un graphique de prix, mets is_chart à false et remplis les autres champs de façon minimale.
Réponds en français.`;

export class AnalysisRefusedError extends Error {}

export async function analyzeChart(imageBase64: string, mediaType: AllowedImageType, note?: string) {
  const response = await client.beta.messages.parse({
    model: "claude-opus-5-5",
    max_tokens: 16000,
    betas: ["server-side-fallback-2026-07-01"],
    fallbacks: "default",
    output_config: { effort: "medium", format: betaZodOutputFormat(ChartAnalysis) },
    system: SYSTEM_PROMPT,
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
    throw new AnalysisRefusedError(`Analyse impossible (stop_reason: ${response.stop_reason})`);
  }
  return { analysis: response.parsed_output, model: response.model };
}
