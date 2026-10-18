import "server-only";
import Anthropic from "@anthropic-ai/sdk";
import type { Locale } from "@/i18n/config";
import { MacroReport, type AllowedImageType } from "./analysis";
import { callCostEur } from "./usage-cost";

/**
 * The news side of a report: the scheduled events and recent news that can move the asset over the next days, found
 * with web search at the time of the analysis. Runs alongside the chart reading, so it adds no waiting time; a failure
 * here never blocks the chart report (it simply comes without this section).
 */

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY?.trim() });

/** At most this many searches per analysis: enough for the calendar and the news, and a bound on the cost. */
const MAX_SEARCHES = 4;
const SEARCH_COST_EUR = 0.01;
/** Never holds the report back for long: past this, the report comes without its news side. */
const TIME_LIMIT_MS = 75_000;
/** Server-side search loops can pause; resumed at most this many times. */
const MAX_CONTINUATIONS = 2;

const LANGUAGE: Record<Locale, string> = {
  fr: "Rédige les textes en français.",
  en: "Write the texts in English.",
  es: "Redacta los textos en español.",
};

function systemPrompt(locale: Locale) {
  const today = new Date().toLocaleDateString("fr-FR", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Europe/Paris",
  });
  return `Tu prépares le volet macro-économique et actualité d'une analyse technique. Nous sommes le ${today} (heure de Paris).
Lis sur la capture l'actif analysé et l'unité de temps, puis cherche sur le web :
- les événements programmés dans les 7 prochains jours qui peuvent faire bouger cet actif : banques centrales concernées (décisions de taux, discours), inflation, emploi, PIB, résultats d'entreprise pour une action, échéances propres à la crypto (régulation, ETF, déblocages de jetons) ;
- l'actualité des 48 dernières heures qui pèse sur cet actif.
Donne les dates et heures en heure de Paris. N'écris que ce que tes recherches confirment : aucun événement ni chiffre inventé, et une liste vide vaut mieux qu'un événement douteux. Garde les 3 à 6 événements les plus importants.
Reste factuel : ne donne pas de signal d'achat ou de vente tiré de l'actualité. Dans plan_impact, dis en une ou deux phrases comment en tenir compte dans un trade sur l'horizon de cette unité de temps (par exemple éviter d'entrer juste avant une annonce, réduire la taille, attendre la réaction du marché), ou qu'aucun événement majeur n'est attendu.
${LANGUAGE[locale]}
Termine ta réponse par un unique objet JSON, sans texte après, de la forme :
{"asset": "BTC/USDT", "context": "2 ou 3 phrases sur le contexte actuel", "events": [{"date": "jeu. 23 oct. 14h30", "title": "Inflation américaine (CPI)", "impact": "fort", "why": "une phrase"}], "plan_impact": "1 ou 2 phrases", "sources": [{"title": "titre de la page", "url": "https://..."}]}
"impact" vaut exactement "fort", "moyen" ou "faible". Les sources sont les pages consultées qui appuient les faits cités (5 au plus).`;
}

type Block = Anthropic.Beta.Messages.BetaContentBlock;

/** The JSON object the answer ends with, once the searches are done. */
function parseReport(blocks: Block[]) {
  const text = blocks
    .filter((block): block is Anthropic.Beta.Messages.BetaTextBlock => block.type === "text")
    .map((block) => block.text)
    .join("");
  const end = text.lastIndexOf("}");
  for (let start = text.lastIndexOf("{", end); start >= 0; start = text.lastIndexOf("{", start - 1)) {
    try {
      const parsed = MacroReport.safeParse(JSON.parse(text.slice(start, end + 1)));
      if (parsed.success) return parsed.data;
    } catch {}
  }
  return null;
}

/** Pages the searches really returned: a source the answer names is kept only if it is one of them. */
function searchedUrls(blocks: Block[]) {
  const urls = new Set<string>();
  for (const block of blocks) {
    if (block.type === "web_search_tool_result" && Array.isArray(block.content))
      block.content.forEach((result) => urls.add(result.url));
    if (block.type === "text") block.citations?.forEach((citation) => "url" in citation && urls.add(citation.url));
  }
  return urls;
}

export async function macroContext(imageBase64: string, mediaType: AllowedImageType, locale: Locale) {
  const messages: Anthropic.Beta.Messages.BetaMessageParam[] = [
    {
      role: "user",
      content: [
        { type: "image", source: { type: "base64", media_type: mediaType, data: imageBase64 } },
        { type: "text", text: "Prépare le volet macro et actualité pour l'actif de ce graphique." },
      ],
    },
  ];
  const blocks: Block[] = [];
  let costEur = 0;
  const deadline = Date.now() + TIME_LIMIT_MS;
  try {
    for (let turn = 0; turn <= MAX_CONTINUATIONS; turn++) {
      const response = await client.beta.messages.create(
        {
          model: "claude-opus-5-5",
          max_tokens: 6000,
          betas: ["server-side-fallback-2026-07-01"],
          fallbacks: "default",
          output_config: { effort: "low" },
          system: systemPrompt(locale),
          tools: [
            {
              type: "web_search_20260209",
              name: "web_search",
              max_uses: MAX_SEARCHES,
              user_location: { type: "approximate", country: "FR", timezone: "Europe/Paris" },
            },
          ],
          messages,
        },
        { timeout: Math.max(1000, deadline - Date.now()), maxRetries: 0 },
      );
      costEur +=
        callCostEur(response.model, response.usage) +
        (response.usage.server_tool_use?.web_search_requests ?? 0) * SEARCH_COST_EUR;
      blocks.push(...response.content);
      if (response.stop_reason !== "pause_turn") break;
      // The search loop paused: sending the turn back as it is lets the server resume it.
      messages.push({ role: "assistant", content: response.content });
    }
  } catch (err) {
    console.error("macro context failed", err);
    return { report: null, costEur };
  }

  const report = parseReport(blocks);
  if (!report) {
    console.error("macro context: no usable report");
    return { report: null, costEur };
  }
  const searched = searchedUrls(blocks);
  return {
    report: {
      ...report,
      events: report.events.slice(0, 6),
      sources: report.sources.filter((source) => searched.has(source.url)).slice(0, 5),
    },
    costEur,
  };
}
