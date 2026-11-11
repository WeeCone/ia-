import "server-only";
import { createHash } from "node:crypto";
import Anthropic from "@anthropic-ai/sdk";
import { FieldValue } from "firebase-admin/firestore";
import type { Locale } from "@/i18n/config";
import { MacroReport } from "./analysis";
import { adminDb } from "./firebase-admin";
import { callCostEur } from "./usage-cost";

/**
 * The news side of a report: the scheduled events and recent news that can move the asset over the next days, found
 * with web search at the time of the analysis. It works from the asset's name (read beforehand from the capture by the
 * light model), not from the image, on a mid-size model; and it is shared: once found for an asset, in a language, on
 * a given day, it is reused for every analysis of that asset that day. Runs alongside the chart reading, so it adds no
 * waiting time; a failure here never blocks the chart report (it simply comes without this section).
 */

/** Searching and summarising announcements needs no top model. */
const MACRO_MODEL = "claude-sonnet-5-5";

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY?.trim() });

/** At most this many searches per analysis: enough for the calendar and the news, and a bound on the cost. */
const MAX_SEARCHES = 2;
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
L'actif et l'unité de temps te sont donnés. Cherche sur le web :
- les événements programmés dans les 7 prochains jours qui peuvent faire bouger cet actif : banques centrales concernées (décisions de taux, discours), inflation, emploi, PIB, résultats d'entreprise pour une action, échéances propres à la crypto (régulation, ETF, déblocages de jetons) ;
- l'actualité des 48 dernières heures qui pèse sur cet actif.
Donne les dates et heures en heure de Paris. N'écris que ce que tes recherches confirment : aucun événement ni chiffre inventé, et une liste vide vaut mieux qu'un événement douteux. Garde les 3 à 6 événements les plus importants.
Reste factuel : ne donne pas de signal d'achat ou de vente tiré de l'actualité. Dans plan_impact, dis en une ou deux phrases comment en tenir compte dans un trade sur les prochains jours (par exemple éviter d'entrer juste avant une annonce, réduire la taille, attendre la réaction du marché), ou qu'aucun événement majeur n'est attendu.
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

/** Today in Paris, the day a shared news side is valid for. */
const parisDay = () => new Date().toLocaleDateString("sv-SE", { timeZone: "Europe/Paris" });

/**
 * The asset as a cache key: its ticker only. The reading names the same chart in several ways ("XAU/USD (Gold / US
 * Dollar, OANDA)", "XAUUSD (Gold/USD, OANDA)", "XAU/USD (OANDA)"), which must all share one entry: what follows the
 * first bracket or comma (full name, exchange) is dropped, then everything but letters and digits.
 */
export function assetKey(asset: string) {
  const ticker = asset.split(/[(,·|—–]/)[0] ?? asset;
  return (ticker.toLowerCase().replace(/[^a-z0-9]/g, "") || asset.toLowerCase().replace(/[^a-z0-9]/g, "")).slice(0, 40);
}

/** One cache entry per asset, language and day ("BTC/USDT", "btcusdt" and "BTC/USDT (Binance)" share it). */
function cacheRef(asset: string, locale: Locale) {
  const normalized = assetKey(asset);
  const id = createHash("sha256").update(`${parisDay()}|${locale}|${normalized}`).digest("hex").slice(0, 32);
  return adminDb.collection("macroCache").doc(id);
}

const UNKNOWN = /^(inconnu|inconnue|unknown|desconocido|n\/a|-)?$/i;

export async function macroContext(target: { asset: string; timeframe: string }, locale: Locale, { cachedOnly = false } = {}) {
  // Nothing to search for without a named asset.
  if (UNKNOWN.test(target.asset.trim())) return { report: null, costEur: 0 };

  const ref = cacheRef(target.asset, locale);
  const cached = await ref.get().catch(() => null);
  if (cached?.exists) {
    const parsed = MacroReport.safeParse(cached.get("report"));
    if (parsed.success) return { report: parsed.data, costEur: 0 };
  }
  // Past Pro's last spending step: only what was already found today.
  if (cachedOnly) return { report: null, costEur: 0 };

  const messages: Anthropic.Beta.Messages.BetaMessageParam[] = [
    {
      role: "user",
      content: `Prépare le volet macro et actualité pour l'actif ${target.asset} (unité de temps du graphique : ${target.timeframe}).`,
    },
  ];
  const blocks: Block[] = [];
  let costEur = 0;
  const deadline = Date.now() + TIME_LIMIT_MS;
  try {
    for (let turn = 0; turn <= MAX_CONTINUATIONS; turn++) {
      const response = await client.beta.messages.create(
        {
          model: MACRO_MODEL,
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

  const parsed = parseReport(blocks);
  if (!parsed) {
    console.error("macro context: no usable report");
    return { report: null, costEur };
  }
  const searched = searchedUrls(blocks);
  const report = {
    ...parsed,
    events: parsed.events.slice(0, 6),
    sources: parsed.sources.filter((source) => searched.has(source.url)).slice(0, 5),
  };
  // Shared for the rest of the day; best effort.
  await ref.set({ report, asset: target.asset, locale, day: parisDay(), createdAt: FieldValue.serverTimestamp() }).catch(() => {});
  return { report, costEur };
}
