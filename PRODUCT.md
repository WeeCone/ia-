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
- Packs (since 2026-10-30, structure modelled on Visifoot's: three cards, Pro highlighted; reworked 2026-11-01): Starter 10 €/mois (1 analysis per day, reduced report on the light model: verdict, plan, probability of the favoured scenario, levels; the alternative scenario, risk notes, news side and AI questions show locked with the way up to Pro; AI cost capped at 0,50 €/month), Pro 19 €/mois (unlimited full analyses with the macro and news side, highlighted on its card, plus one question a day to the AI about an analysis; at most 5 € of AI a month: each Paris day gets what is left of a 4,50 € target divided by the days left; the top model reads the first 60 % of that share, the mid-size one the rest, then the light one (with the news side from the day's cache only); a heavy user (12 analyses a day) ends up mostly on the light model, a normal one mostly on the top one. The news side runs at most 2 web searches; this step-down is disclosed in the FAQ and CGV; a 10 € ceiling only stops automated use), À vie 99 € one-off (Pro's full analysis and AI question, 30 analyses per month refilled on the 1st, no subscription; no cap on how many are sold for now). Any pack can be bought without an account (Stripe takes the email). Prices are set inline in the checkout (OFFER_PRICE_CENTS) on the existing Stripe products; Starter's product is created on first use. "Unlimited" is only said of Pro, where it is true; never list a feature that doesn't exist. The 0,99 € trial is withdrawn; customers on older offers (trial, 19,99 € or 40 € monthly, 180 € lifetime) keep their terms.
- Prices are display copy kept in sync with Stripe (src/lib/plans.ts); never invent other plans or discounts.
- Regulatory: French financial-influencer law / AMF. No promise of gains, no performance claims; "Ce n'est pas un conseil en investissement" must stay visible. Directive wording is framed as a conditional plan, never as a recommendation to a specific person.
- Languages: French (default, unprefixed URLs), English (/en) and Spanish (/es) since 2026-10-16, Japanese (/ja), Korean (/ko), Vietnamese (/vi) and Indonesian (/id) since 2026-11-12, for the whole site, client area, AI reports, payment and legal pages. Legal translations state that the French text prevails. Copy lives in src/i18n/dictionaries; the AI keeps its choice-field values in French and writes free text in the customer's language.
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
- Read-only ops access (2026-11-11): /api/ops/customer and /api/ops/today, for the owner's assistant. They only read, and answer 404 without the token held in the App Hosting secret opsReadToken (rotate it with firebase apphosting:secrets:set opsReadToken, then redeploy: a secret is read at rollout).
- News cache key (2026-11-11): the ticker only (`assetKey`: what precedes the first bracket or comma, letters and digits), since the reading names the same chart several ways ("XAU/USD (Gold / US Dollar, OANDA)", "XAUUSD (Gold/USD, OANDA)"); before, each spelling re-ran the web search.
- Asian languages (2026-11-12): full site, AI reports, news side and chat in ja/ko/vi/id; legal pages show the English text (reference translation, French prevails). The 16 guides exist in every language (blog-ja/ko/vi/id.ts), adapted rather than word for word: local currency in examples, local time for releases, the local regulator in the bot-scam guide (FSA, FSS/"fine", SSC, OJK/Bappebti). Japanese reading time counts characters (500 a minute). CJK text falls back to system fonts; Vietnamese uses the web fonts' vietnamese subset.
- Local currencies (2026-11-12): the ja/ko/vi/id sites show and charge yen, won, dong and rupiah (OFFER_PRICES in plans.ts, set for purchasing power: JP/KR about the euro value, VN/ID about 40 % lower; fr/en/es stay in euros). Checkout lines use the visitor's language's currency; a customer Stripe already bills in another currency falls back to euros; the one-click upgrade keeps the subscription's own currency. Stripe amounts: yen, won and dong in whole units, euros and rupiah in hundredths (toStripeAmount). The admin's revenue counters convert with rough fixed rates (approxEur), for information only.
- Gold page (2026-11-12, council's advice): scanzivo.com/gold and /en/gold under the Scanzivo brand (no sub-brand, no other domain, slug /gold everywhere, the local word in titles); other languages to follow if Search Console shows traffic. Content in src/content/gold.ts: the 1H/15m/5m routine, an illustrative reading clearly labelled as made up, what the analysis takes into account on gold, the Pro news side, tools, limits, the CFD risk warning, a FAQ; no price. Backed by real behaviour: when the first look reads gold, analyzeChart adds GOLD_RULES (round numbers, sessions, US data, stops beyond noise) and the news side prioritises the Fed, US CPI/NFP, the dollar, real yields, central-bank buying and ETF flows (isGold in analysis.ts). Linked from the header, the footer and three FR/EN guides. Decision rule: if within 8-12 weeks /gold brings more sign-ups than the home page, consider a 'Scanzivo Gold' offer.
- Gold angle (2026-11-12): the gold page exists in all 7 languages (slug /gold, local word in titles: oro, ゴールド, 금, vàng, emas), titled as a specialised analysis ("spécialisée", never "expert" or "best"), with a lede under the H1; a box on every home page sends gold traders to it; a report whose asset is gold carries a "specialised gold analysis" badge; the economic-calendar guide links to it in every language.
- Models (2026-11-12, owner's request: cost first): every chart is read by Haiku on every pack, and the AI chat answers on Haiku; the news side stays on Sonnet with web search, once a day per asset, shared. The daily/monthly model step-down of Pro is gone; the FAQ, terms and gold page no longer mention a 'most advanced model'. Pro's 5 € ceiling remains as an anti-automation stop.
