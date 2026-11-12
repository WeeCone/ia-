import "server-only";
import Anthropic from "@anthropic-ai/sdk";
import { betaZodOutputFormat } from "@anthropic-ai/sdk/helpers/beta/zod";
import type { Locale } from "@/i18n/config";
import { ChartAnalysis, ChartCheck, ChartPreview, isGold, type AllowedImageType } from "./analysis";
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
Positionne-toi franchement sur les probabilités. Pas de répartition prudente par réflexe (50/50, 55/45, 60/40) : dès que la structure penche d'un côté (tendance en place, cassure, rejet net d'un niveau, plus hauts ou plus bas successifs), assume 65 à 80 %. Ne reste sous 65 % que si des signaux importants se contredisent vraiment, et dis alors lequel l'emporte et pourquoi.
Tranche ensuite (verdict) : retiens un seul scénario privilégié, le plus probable, et donne un plan d'action directif et chiffré, formulé comme un plan si le trader prend position (« Acheter sur clôture au-dessus de… »), sans promesse de gain.
Préfère « acheter sur confirmation » ou « vendre sur confirmation » avec un déclencheur précis : c'est la réponse attendue dès qu'un scénario domine. Réserve « attendre » au prix coincé au milieu d'un range sans signal exploitable ; dans ce cas, le plan donne quand même les deux déclencheurs chiffrés (niveau d'achat avec stop et objectif, niveau de vente avec stop et objectif) et quand refaire une analyse (ex. après la prochaine clôture de l'unité de temps). Réserve « ne pas trader » au gain/risque inférieur à 1 ou au graphique illisible.
Calibre la confiance honnêtement : « faible » si l'image est floue, l'axe illisible, l'historique trop court ou les signaux contradictoires.
Donne des conseils de gestion du risque spécifiques à ce graphique, pas des généralités.
Évalue aussi la capture elle-même (capture_quality) : « bonne » si on voit des bougies, un axe des prix lisible, l'actif et l'unité de temps, et assez d'historique (au moins une cinquantaine de bougies) ; « moyenne » s'il manque un de ces éléments ; « faible » pour une simple courbe, un axe illisible, une image floue ou trop zoomée. Liste les défauts concrets et donne un conseil précis pour mieux capturer.
Pour chaque support et chaque résistance, donne aussi sa position verticale dans l'image (level_marks.y, de 0 en haut à 1 en bas de l'image entière) en t'appuyant sur les graduations de l'axe des prix, afin qu'on puisse tracer le niveau sur la capture.
Si l'image n'est pas un graphique de prix, mets is_chart à false et remplis les autres champs de façon minimale.`;

/**
 * The report is written in the customer's language. Choice fields keep the schema's French values (the site translates
 * them for display), so stored analyses stay comparable whatever the language.
 */
/** The rule for a language without a hand-written one: free texts in that language, choice fields left in French. */
function otherLanguage(language: string, numbers: string) {
  return `Rédige tous les textes libres (synthèse, thèses, conditions d'entrée, stops, objectifs, verdict, conseils, défauts de capture, horizon…) en ${language}, avec les nombres écrits comme dans cette langue (${numbers}). Les noms d'actifs (BTC/USDT, XAU/USD…) et les unités de temps (4H, 1D…) restent tels quels.
Les champs à choix gardent exactement les valeurs françaises du schéma (trend, confidence.level, capture_quality.level, verdict.bias, verdict.action, level_marks.kind), et asset / timeframe restent « Inconnu » / « Inconnue » s'ils sont illisibles.`;
}

const LANGUAGE_RULE: Record<Locale, string> = {
  fr: "Réponds en français.",
  en: `Rédige tous les textes libres (synthèse, thèses, conditions d'entrée, stops, objectifs, verdict, conseils, défauts de capture, horizon…) en anglais, avec les nombres écrits à l'anglaise (65,400.5).
Les champs à choix gardent exactement les valeurs françaises du schéma (trend, confidence.level, capture_quality.level, verdict.bias, verdict.action, level_marks.kind), et asset / timeframe restent « Inconnu » / « Inconnue » s'ils sont illisibles.`,
  es: `Redacta todos los textos libres (síntesis, tesis, condiciones de entrada, stops, objetivos, veredicto, consejos, defectos de la captura, horizonte…) en español, con los números escritos a la española (65.400,5).
Los campos de opción conservan exactamente los valores franceses del esquema (trend, confidence.level, capture_quality.level, verdict.bias, verdict.action, level_marks.kind), y asset / timeframe siguen siendo « Inconnu » / « Inconnue » si no son legibles.`,
  ja: otherLanguage("japonais (registre poli, です・ます調)", "65,400.5"),
  ko: otherLanguage("coréen (registre poli, 합니다체)", "65,400.5"),
  vi: otherLanguage("vietnamien", "65.400,5"),
  id: otherLanguage("indonésien", "65.400,5"),
  it: otherLanguage("italien (vouvoiement : Lei)", "65.400,5"),
  de: otherLanguage("allemand (vouvoiement : Sie)", "65.400,5"),
  pt: otherLanguage("portugais du Brésil (você)", "65.400,5"),
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

const GOLD_RULES = `L'actif est l'or (XAU/USD). Tiens compte de ce qui lui est propre :
- les chiffres ronds (multiples de 50 et de 100 $) attirent les ordres et servent souvent de supports, de résistances ou d'objectifs ;
- le range de la session asiatique est souvent cassé à l'ouverture de Londres, et l'ouverture américaine (14 h 30, heure de Paris) apporte de forts mouvements, avec des fausses cassures fréquentes autour des statistiques américaines ;
- la volatilité intrajournalière est élevée : place les stops au-delà du bruit (les mèches récentes), pas au ras d'un niveau ;
- dans risk_notes, rappelle quand c'est utile de vérifier l'agenda américain (inflation CPI, emploi NFP, Fed), et que l'or évolue souvent à l'inverse du dollar et des taux réels américains.`;

export async function analyzeChart(
  imageBase64: string,
  mediaType: AllowedImageType,
  note: string | undefined,
  locale: Locale,
  model = "claude-opus-5-5",
  /** The asset read beforehand by the light model, when known: gold gets its own rules. */
  assetHint?: string | null,
) {
  const response = await client.beta.messages.parse({
    model,
    max_tokens: MAX_OUTPUT_TOKENS,
    betas: ["server-side-fallback-2026-07-01"],
    fallbacks: "default",
    output_config: { effort: "medium", format: betaZodOutputFormat(ChartAnalysis) },
    system: `${SYSTEM_PROMPT}${isGold(assetHint) ? `\n${GOLD_RULES}` : ""}\n${LANGUAGE_RULE[locale]}`,
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
  return {
    analysis: response.parsed_output,
    model: response.model,
    costEur: callCostEur(response.model, response.usage),
    outputTokens: response.usage.output_tokens,
  };
}

/** The free reading's model: the smallest, asked for the visible part only (see ChartPreview), a fraction of a cent. */
const PREVIEW_MODEL = "claude-haiku-5-5";

const PREVIEW_PROMPT = `Tu es un analyste technique. On te fournit la capture d'écran d'un graphique de prix. Le trader verra gratuitement cette première lecture ; le résultat (tendance, scénarios, probabilités, verdict, plan chiffré) lui sera donné ensuite.
Écris un résumé (summary) de 1 ou 2 phrases courtes sur le contexte visible, puis un texte (stakes) de 2 ou 3 phrases courtes sur ce qui se joue sur CE graphique : le point clé repéré (zone testée, figure en formation, signal d'un indicateur affiché, volume…) et la question que cela pose pour la suite. Sois concret et bref : c'est un avant-goût, l'analyse complète vient ensuite.
Interdit dans ces deux textes : la tendance ou la direction probable (haussier, baissier, acheteur, vendeur, hausse, baisse, rebond, cassure à la hausse ou à la baisse…), tout prix ou niveau chiffré, tout verdict ou conseil, toute promesse. Pas de superlatifs, pas d'urgence, pas de formule publicitaire.
Indique l'actif, l'unité de temps, ta confiance dans la lecture, le nombre de figures ou signaux visibles, et place les principaux supports et résistances sur l'image (y de 0 en haut à 1 en bas de l'image entière) en t'appuyant sur les graduations de l'axe des prix.
Si l'image n'est pas un graphique de prix, mets is_chart à false et remplis le reste de façon minimale.`;

export async function previewChart(imageBase64: string, mediaType: AllowedImageType, locale: Locale) {
  const response = await client.beta.messages.parse({
    model: PREVIEW_MODEL,
    max_tokens: 2000,
    betas: ["server-side-fallback-2026-07-01"],
    fallbacks: "default",
    output_config: { format: betaZodOutputFormat(ChartPreview) },
    system: `${PREVIEW_PROMPT}\n${LANGUAGE_RULE[locale]}`,
    messages: [
      {
        role: "user",
        content: [
          { type: "image", source: { type: "base64", media_type: mediaType, data: imageBase64 } },
          { type: "text", text: "Première lecture de ce graphique." },
        ],
      },
    ],
  });
  if (response.stop_reason === "refusal" || !response.parsed_output) {
    throw new AnalysisRefusedError(`Lecture impossible (stop_reason: ${response.stop_reason})`, callCostEur(response.model, response.usage));
  }
  return { preview: response.parsed_output, costEur: callCostEur(response.model, response.usage) };
}

/**
 * Before a paid analysis: a fraction-of-a-cent look by the light model. An image that is not a chart stops here
 * instead of running the full analysis; a chart gives the asset the news side searches for.
 */
export async function checkChart(imageBase64: string, mediaType: AllowedImageType) {
  const response = await client.beta.messages.parse({
    model: PREVIEW_MODEL,
    max_tokens: 1000,
    output_config: { format: betaZodOutputFormat(ChartCheck) },
    system: "On te fournit une image. Dis si c'est un graphique de prix exploitable (bougies, courbe de cotation avec un axe des prix), et si oui, l'actif et l'unité de temps lisibles.",
    messages: [
      {
        role: "user",
        content: [
          { type: "image", source: { type: "base64", media_type: mediaType, data: imageBase64 } },
          { type: "text", text: "Est-ce un graphique de prix ?" },
        ],
      },
    ],
  });
  return { check: response.parsed_output, costEur: callCostEur(response.model, response.usage) };
}

/** The model that answers a customer's question about one of their analyses. */
const CHAT_MODEL = "claude-haiku-5-5";

const CHAT_LANGUAGE: Record<Locale, string> = {
  fr: "Réponds en français, en vouvoyant.",
  en: "Answer in English.",
  es: "Responde en español, tuteando.",
  ja: "日本語で、です・ます調で答えてください。",
  ko: "한국어로, 존댓말(합니다체)로 답하세요.",
  vi: "Hãy trả lời bằng tiếng Việt, xưng hô lịch sự (bạn).",
  id: "Jawablah dalam bahasa Indonesia yang sopan (Anda).",
  it: "Rispondi in italiano, dando del Lei.",
  de: "Antworte auf Deutsch und sieze den Nutzer.",
  pt: "Responda em português do Brasil, tratando o usuário por você.",
};

/**
 * One question about an analysis the customer already has: answered from that report (and its screenshot when it is
 * kept), in a few short paragraphs. Educational, never a personal investment recommendation.
 */
export async function askAboutAnalysis(
  analysis: object,
  question: string,
  locale: Locale,
  image: { base64: string; mediaType: AllowedImageType } | null,
) {
  const content: Anthropic.MessageParam["content"] = [
    ...(image ? [{ type: "image" as const, source: { type: "base64" as const, media_type: image.mediaType, data: image.base64 } }] : []),
    { type: "text", text: `Analyse déjà remise au trader (JSON) :\n${JSON.stringify(analysis)}\n\nSa question :\n${question}` },
  ];
  const response = await client.messages.create({
    model: CHAT_MODEL,
    max_tokens: 1200,
    system: `Tu es l'analyste technique qui a rédigé l'analyse ci-jointe d'un graphique de prix. Le trader te pose une question à son sujet.
Réponds à partir de cette analyse et de la capture : explique, précise un niveau, un scénario, une figure, la gestion du risque. Sois concret et bref (3 à 6 phrases, une courte liste si utile), sans titre.
Si la question sort du graphique (autre actif, sujet sans rapport), dis-le en une phrase et invite à lancer une nouvelle analyse.
Tu ne connais que la capture : pas de cours en temps réel. Ne promets aucun gain. C'est une aide à la lecture du graphique, pas un conseil en investissement personnalisé : ne dis pas combien investir de son argent.
${CHAT_LANGUAGE[locale]}`,
    messages: [{ role: "user", content }],
  });
  const answer = response.content
    .filter((block): block is Anthropic.TextBlock => block.type === "text")
    .map((block) => block.text)
    .join("\n")
    .trim();
  return { answer, costEur: callCostEur(response.model, response.usage) };
}
