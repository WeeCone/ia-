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

- Paid only, no free tier, and the public site must say so plainly near the calls to action (the owner chose no price line under the hero drop bar, 2026-10-16; prices stay in the demo, pricing and closing sections): Mensuel 40 €/mois (sans engagement) or À vie 180 € (paiement unique). Both include 45 analyses per month (fair use), sized to a hard AI-cost ceiling of 5 € per customer per month. A non-chart image is not charged.
- Prices are display copy kept in sync with Stripe (src/lib/plans.ts); never invent other plans, discounts or trials.
- Regulatory: French financial-influencer law / AMF. No promise of gains, no performance claims; "Ce n'est pas un conseil en investissement" must stay visible. Directive wording is framed as a conditional plan, never as a recommendation to a specific person.
- Language: French only.
- Stack: Next.js 16 (App Router, cacheComponents), Tailwind v4, Firebase App Hosting; every push to main deploys.

## Brand Commitments

- Name: Scanzivo (scanzivo.com), with its current logo (gradient scan viewfinder framing candles).
- Visual identity confirmed by the owner (2026-10-15): cyan (#00d2ff) and neon green (#00f5a0) with anthracite (#0b0e14), modern sans titling (Space Grotesk), glass panels. Public site since 2026-10-15: light ground (theme-light, darker cyan/green for contrast) with large rounded dark blocks (theme-dark), floating pill nav, big tight headlines (style inspired by kickly.io, chosen by the owner). The client area (/dashboard) uses the same light ground since 2026-10-15, with a slightly darker sidebar; a theme-adaptive --warn colour replaces fixed amber text. It should feel modern and tech.
- Rejected (2026-10-15, live for a few minutes then reverted): a "chess annotation book" redesign with board green and paper white, Bodoni serif titles, chess evaluation symbols (± ∓ = ∞) and game vocabulary. The owner disliked the green, the serif fonts, the chess theme and the sober, old-fashioned feel. Do not propose these again.
- The BTC scan demo video (public/media/btc-scan.*) stays on the homepage; its analysis results are deliberately blurred.

## Evidence on Hand

- Real product output: example analyses (src/lib/demo.ts is illustrative; marketing/analyse-sidu.json is a real report on SIDU), the annotated-chart and report components.
- Demo video: public/media/btc-scan.mp4/.webm with poster.
- Customer reviews: none published yet. Real approved reviews appear automatically when they exist; never fabricate testimonials, user counts, accuracy rates or performance figures.

## Product Principles

1. Commit to one answer: every surface should feel decisive, including the honest "attendre".
2. Show the work on the trader's own chart: levels drawn where they really are beat abstract claims.
3. Honest by construction: visible-only analysis, estimates labelled as estimates, price and limits stated upfront.
4. Fast to first result: capture, drop, read in under a minute, on desktop and phone.

## Accessibility & Inclusion

WCAG 2.1 AA contrast and keyboard access on public pages; meaning never carried by bull/bear colour alone (labels accompany colours).
