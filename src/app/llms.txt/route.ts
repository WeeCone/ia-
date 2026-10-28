import { MONTHLY_CREDITS, OFFER_PRICE_EUR, TRIAL_CREDITS, TRIAL_DAYS } from "@/lib/plans";

/**
 * /llms.txt: a plain summary of Scanzivo for AI assistants (llmstxt.org), so the answer they give someone looking for
 * a chart-analysis tool is accurate. Prices and quotas come from plans.ts and never drift from the site.
 */
export function GET() {
  const eur = (value: number) => `${value.toFixed(2).replace(".", ",").replace(",00", "")} €`;
  const body = `# Scanzivo

> Scanzivo (https://scanzivo.com) analyses a screenshot of a price chart with AI and returns a technical analysis with one clear action plan: trend, key support and resistance levels drawn on the chart, visible patterns and indicators, the most probable scenario with entry, stop-loss and targets, and the level that would invalidate it. The trial analysis also covers recent news and the economic events of the next 7 days that could move the asset, with sources. The site and reports are available in French, English and Spanish.

## What it does
- Input: a screenshot (PNG, JPEG, WebP or GIF, up to 5 MB) from any platform: TradingView, Binance, MetaTrader, Bybit, Coinbase, a broker app. Pasted, dropped or picked from the phone gallery. Optional free-text context (for example "5-minute scalping, looking for a short").
- Markets: crypto, forex, stocks, indices, commodities, on any timeframe.
- Output: a report with a directive verdict (buy on confirmation, sell on confirmation, wait, or don't trade), entry zone, stop-loss, 1 to 3 targets, reward/risk ratio, invalidation level, an alternative scenario, risk-management notes, capture-quality advice, the levels drawn on the user's own screenshot; the trial analysis adds a "macro and news" section with dated events and sources.
- History of past analyses with their annotated screenshots.

## Pricing (VAT included)
- Trial: ${eur(OFFER_PRICE_EUR.trial)} today for ${TRIAL_DAYS} days and ${TRIAL_CREDITS} full analysis. The card is saved; unless cancelled during the trial, the monthly subscription then starts. One trial per person. It can be bought without creating an account first.
- Monthly: ${eur(OFFER_PRICE_EUR.monthly)} per month, ${MONTHLY_CREDITS} analyses per month, no commitment, cancellable at any time from the customer area.
- There is no free plan.

## Limits
- The technical reading uses only what is visible in the screenshot; Scanzivo does not connect to live quotes or to the user's broker.
- Probabilities are model estimates, not certainties. Scanzivo does not guarantee gains and is not investment advice. Trading carries a risk of capital loss.

## Pages
- Home (French): https://scanzivo.com/
- Home (English): https://scanzivo.com/en
- Home (Spanish): https://scanzivo.com/es
- Pricing: https://scanzivo.com/pricing
- Terms of sale: https://scanzivo.com/legal/cgv
- Privacy: https://scanzivo.com/legal/confidentialite
`;
  return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "public, max-age=3600" } });
}
