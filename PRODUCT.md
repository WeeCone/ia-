# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

French-speaking retail traders (crypto first, also forex, stocks, indices, commodities) who already chart on TradingView, Binance or MetaTrader and want a second reading before taking a position. Many capture charts on their phone. Range from beginners learning to read a chart to swing/intraday traders who want a disciplined plan (entry, stop, targets, invalidation) before clicking. (Inferred from the product, copy and session history; not formally surveyed.)

## Product Purpose

Scanzivo turns a screenshot of a price chart into a technical analysis in under a minute: trend, key levels drawn on the capture, visible patterns and indicators, and a directive verdict. Success: the trader leaves with one clear, numbered plan (or an explicit "wait / don't trade") and keeps coming back before each trade.

## Positioning

A verdict, not a "maybe": the AI commits to the single most probable scenario and states it as an action plan (buy on confirmation, sell on confirmation, wait, or don't trade), with entry, stop, targets, reward/risk computed from the prices, and the level that would change its mind. The alternative scenario stays available but folded. It reads only what is visible on the capture and says so.

## Operating Context

- Input: a screenshot (PNG/JPEG/WebP/GIF, 5 MB max), pasted (Ctrl+V), dropped, or picked from the phone gallery; optional free-text context.
- Output: an annotated copy of the screenshot (levels drawn at their true height) plus the report; history of past analyses with their screenshots.
- Capture-quality guidance in the client area (good vs bad capture, sharpness/size checks).
- Accounts via email/password or Google; payment via Stripe.

## Capabilities and Constraints

- No free subscription, but a free reading before paying (since 2026-10-30): a visitor drops a chart and sees the AI's general reading (trend, structure, patterns, where the levels sit, prices hidden); the plan with numbers stays locked. The free reading runs on the smallest model with a short answer (a fraction of a cent, the visible part only); the screenshot is kept 48 h and the full report is made from it once a pack is bought, told to stay consistent with the first reading. The share shown ("environ 15 %") is the reading's words over a typical full report. No practical limit on free readings (they cost a fraction of a cent): only safety nets against abuse, 30 per connection per day and 3 € of AI spend per day overall (several hundred readings).
- AI cost per analysis (since 2026-11-01): a Haiku check first stops images that are not charts for under a centime, before any credit or big model. The full chart reading stays on Opus (Starter on Sonnet). The macro and news side (Pro, À vie) runs on Sonnet with web search from the asset name and timeframe, not the image, and is cached per asset, language and Paris day, so the second Pro analysis of an asset on a given day pays no news cost. Each analysis records its real cost and output tokens (`usage`), shown in the admin Analyses tab. Safety cap per call: 0,50 €.
- Packs (since 2026-10-30, structure modelled on Visifoot's: three cards, Pro highlighted; reworked 2026-11-01): Starter 10 €/mois (1 analysis per day, reduced report on the light model: verdict, plan, probability of the favoured scenario, levels; the alternative scenario, risk notes, news side and AI questions show locked with the way up to Pro; AI cost capped at 0,50 €/month), Pro 19 €/mois (unlimited full analyses with the macro and news side, highlighted on its card, plus one question a day to the AI about an analysis; the month's first analyses are read by the top model, then the mid-size one past 3 € of spend, then the light one past 4,50 € with the news side served from the day's cache only, so a heavy month stays near 5 €; this step-down is disclosed in the FAQ and CGV; a 10 € ceiling only stops automated use), À vie 99 € one-off (Pro's full analysis and AI question, 30 analyses per month refilled on the 1st, no subscription; no cap on how many are sold for now). Any pack can be bought without an account (Stripe takes the email). Prices are set inline in the checkout (OFFER_PRICE_CENTS) on the existing Stripe products; Starter's product is created on first use. "Unlimited" is only said of Pro, where it is true; never list a feature that doesn't exist. The 0,99 € trial is withdrawn; customers on older offers (trial, 19,99 € or 40 € monthly, 180 € lifetime) keep their terms.
- Prices are display copy kept in sync with Stripe (src/lib/plans.ts); never invent other plans or discounts.
- Regulatory: French financial-influencer law / AMF. No promise of gains, no performance claims; "Ce n'est pas un conseil en investissement" must stay visible. Directive wording is framed as a conditional plan, never as a recommendation to a specific person.
- Languages: French (default, unprefixed URLs), English (/en) and Spanish (/es) since 2026-10-16, for the whole site, client area, AI reports, payment and legal pages. Legal translations state that the French text prevails. Copy lives in src/i18n/dictionaries; the AI keeps its choice-field values in French and writes free text in the customer's language.
- Stack: Next.js 16 (App Router, cacheComponents), Tailwind v4, Firebase App Hosting; every push to main deploys.

## Brand Commitments

- Name: Scanzivo (scanzivo.com), with its current logo (gradient scan viewfinder framing candles).
- Visual identity confirmed by the owner (2026-10-15): cyan (#00d2ff) and neon green (#00f5a0) with anthracite (#0b0e14), modern sans titling (Space Grotesk), glass panels. Public site since 2026-10-15: light ground (theme-light, darker cyan/green for contrast) with large rounded dark blocks (theme-dark), floating pill nav, big tight headlines (style inspired by kickly.io, chosen by the owner). The client area (/dashboard) uses the same light ground since 2026-10-15, with a slightly darker sidebar; a theme-adaptive --warn colour replaces fixed amber text. It should feel modern and tech.
- Rejected (2026-10-15, live for a few minutes then reverted): a "chess annotation book" redesign with board green and paper white, Bodoni serif titles, chess evaluation symbols (± ∓ = ∞) and game vocabulary. The owner disliked the green, the serif fonts, the chess theme and the sober, old-fashioned feel. Do not propose these again.
- The BTC scan demo video (public/media/btc-scan.*) stays on the homepage; its analysis results are deliberately blurred.

## Evidence on Hand

- Real product output: example analyses (src/lib/demo.ts is illustrative; marketing/analyse-sidu.json is a real report on SIDU), the annotated-chart and report components.
- Demo video: public/media/btc-scan.mp4/.webm with poster.
- Photos supplied by the owner (rights to be confirmed by the owner): public/media/hero-bull.jpg (hero), public/media/nyse-facade.jpg (faded background of the pricing section, cropped to the facade without people or shop banners).
- Customer reviews: none published yet. Real approved reviews appear automatically when they exist; never fabricate testimonials, user counts, accuracy rates or performance figures.

## Product Principles

1. Commit to one answer: every surface should feel decisive, including the honest "attendre".
2. Show the work on the trader's own chart: levels drawn where they really are beat abstract claims.
3. Honest by construction: visible-only analysis, estimates labelled as estimates, price and limits stated upfront.
4. Fast to first result: capture, drop, read in under a minute, on desktop and phone.

## Accessibility & Inclusion

WCAG 2.1 AA contrast and keyboard access on public pages; meaning never carried by bull/bear colour alone (labels accompany colours).
- No packs and no prices on the landing page, in its header or footer, or in the blog's call to action (since 2026-11-01): the visitor sees them only once a chart is dropped and read (free reading, then the packs). /pricing stays for signed-in customers and is not indexed; the home page's structured data carries no offers.
- SEO (2026-11-01): share images drawn per page ([lang]/og and blog/[slug]/og routes, at clean URLs), Open Graph and X cards on every page, Organization / WebSite / SoftwareApplication / FAQ data on the home page, Blog and BlogPosting data on the blog, hreflang with x-default, articles linked to each other in their text (`[texte](/blog/slug)`) and in "À lire aussi" (the next three, wrapping round), the blog in the header.
