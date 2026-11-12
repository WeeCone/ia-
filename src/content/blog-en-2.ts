import type { Article } from "./blog";

/** English versions of the guides in blog-fr-2.ts; `key` is the French slug. */
export const ARTICLES_EN_2: Omit<Article, "locale">[] = [
  {
    key: "taille-de-position",
    slug: "position-size",
    title: "Position size: how much to put on a trade",
    description:
      "The percentage-of-capital rule, the step-by-step calculation from your stop, and the mistakes that turn a losing streak into an empty account.",
    date: "2026-11-01",
    body: [
      {
        p: "Most accounts don't blow up because of one bad trade, but because of one trade that was too big. Position size is the only variable you fully control: the market decides whether you're right, you decide how much it costs when you're wrong.",
      },
      { h2: "Start from the risk, not the stake" },
      {
        p: "The question isn't “how much do I put in?” but “how much am I willing to lose if my stop is hit?”. Many traders set that amount at a small percentage of their capital, often between **0.5% and 2%** per trade. With €5,000 and a 1% rule, the planned maximum loss on a trade is €50.",
      },
      {
        p: "That sounds small. It's meant to: at 1% risk, ten losses in a row, which happens to everyone, cost about 10% of the account. At 10% risk per trade, the same streak costs more than 65%.",
      },
      { h2: "The calculation, in three steps" },
      {
        ol: [
          "**The amount at risk**: capital × percentage. €5,000 × 1% = €50.",
          "**The distance to the stop**: the gap between entry and stop. Entry at €100, stop at €96: €4 per unit.",
          "**The size**: amount at risk ÷ distance to the stop. €50 ÷ €4 = 12.5 units, about €1,250 of position.",
        ],
      },
      {
        p: "The stop sets the size, not the other way round. A wide stop gives a small position, a tight stop a bigger one, for the same possible loss. If you don't yet know where to put it, read [where to place a stop-loss](/blog/where-to-place-a-stop-loss) first: a stop placed at random skews the whole calculation.",
      },
      { tip: "On forex or CFDs, think in point or pip value: the principle is the same, amount at risk ÷ (distance to the stop × value of one point)." },
      { h2: "Leverage doesn't change the risk" },
      {
        p: "Leverage reduces the money tied up to open a position, not the loss if the stop is hit. A €1,250 position at 10× leverage ties up €125, but it still loses €50 if the price goes from 100 to 96. The danger starts when leverage is used to open positions far bigger than the calculation allows.",
      },
      { h2: "The most expensive mistakes" },
      {
        ul: [
          "**Increasing size after a loss** to “win it back”: the shortest road to the big loss.",
          "**Moving the stop further away** once in the trade: the real risk is no longer the one you calculated.",
          "**Stacking correlated positions**: three long trades on three cryptos that move together are one big risk, not three small ones.",
          "**Forgetting fees and slippage**: on very tight stops, they are a large part of the loss.",
        ],
      },
      { h2: "Size and risk/reward go together" },
      {
        p: "A well-sized position limits the loss; the [risk/reward ratio](/blog/risk-reward-ratio) tells you whether the trade is worth it. Risking €50 to aim for €40 only makes sense if you win very often. Aiming for €100 or more on the same risk leaves a much more comfortable margin for error.",
      },
      {
        p: "A [Scanzivo](/) analysis gives the entry, stop and targets of each scenario: you then apply your percentage to get the size. That's deliberate, because the amount depends on your capital and your risk tolerance, which only you know.",
      },
    ],
  },
  {
    key: "calendrier-economique",
    slug: "economic-calendar",
    title: "Economic calendar: the announcements that move the markets",
    description:
      "Interest rates, inflation, jobs, earnings: the releases that create volatility, and how to fit them into your technical analysis.",
    date: "2026-11-01",
    body: [
      {
        p: "A perfect chart can be swept away in a minute by a central bank announcement. Technical analysis tells you where the levels are; the economic calendar tells you when the market might cross them without warning. The two complement each other.",
      },
      { h2: "The announcements that matter most" },
      { h3: "Central banks" },
      {
        p: "Rate decisions from the US Federal Reserve (Fed) and the European Central Bank (ECB), and above all the press conferences that follow, are among the most volatile moments of the year. The dollar, the euro, gold, indices and crypto often react all at once.",
      },
      { h3: "Inflation" },
      {
        p: "The consumer price index (CPI in the United States) directly shapes what markets expect from central banks. A figure well above or below forecasts can trigger moves of several percent on the most volatile assets.",
      },
      { h3: "Jobs" },
      {
        p: "The monthly US jobs report (NFP), usually published on the first Friday of the month at 8:30 a.m. New York time, is one of the most watched releases in forex.",
      },
      { h3: "Company earnings" },
      {
        p: "For a stock, quarterly earnings can open the next session far from the previous close. A support, or a stop placed just below it, then offers no protection: the price jumps over it.",
      },
      { h2: "It's the surprise that counts" },
      {
        p: "The market doesn't react to the figure itself but to the gap with what it expected. Falling inflation can sink an asset if it falls less than forecast. That's why calendars always show three values: previous, consensus and actual.",
      },
      { h2: "How to factor it into a trade" },
      {
        ul: [
          "**Check the calendar before entering**: a trade planned for a few hours doesn't carry the same risk if a major release lands in the middle.",
          "**Avoid entering just before** a high-impact release: spreads widen and the price can hit your stop before moving your way.",
          "**Reduce your size** if you hold through the announcement (see [position size](/blog/position-size)).",
          "**Wait for the reaction**: letting the first minutes pass, then seeing whether the price holds or breaks the levels, is often easier to read.",
        ],
      },
      { tip: "Calendars often show times in New York time or UTC. Check the time zone: an hour's mistake is enough to be in a trade at the wrong moment." },
      { p: "Gold is the asset most sensitive to these releases: the Fed, US inflation and jobs weigh on it directly, often in the opposite direction to the dollar. Our [gold (XAU/USD) analysis page](/gold) explains what the AI takes into account on it." },
      { h2: "Technicals and macro: two readings of the same market" },
      {
        p: "[Support and resistance](/blog/support-and-resistance) remain the landmarks of the plan; the calendar tells you when those landmarks may be tested violently. A good analysis combines both rather than picking one.",
      },
      {
        p: "That's what [Scanzivo](/)'s Pro pack does: with each chart analysis, the AI lists the announcements of the next 7 days and the recent news on the asset, with sources, then explains how to factor them into the plan. It doesn't predict the figure: it keeps the date from catching you out.",
      },
    ],
  },
  {
    key: "choisir-son-unite-de-temps",
    slug: "choosing-a-timeframe",
    title: "Which timeframe should you trade?",
    description:
      "1 minute, 1 hour, daily: what the timeframe changes, which one fits your schedule, and why you should look at the one above.",
    date: "2026-11-01",
    body: [
      {
        p: "The same asset can be bullish on the 4-hour chart and bearish on the daily. That's not a contradiction: each timeframe tells a different part of the story. Choosing yours is mostly choosing the pace at which you can follow your trades.",
      },
      { h2: "What the timeframe changes" },
      {
        p: "The shorter the timeframe, the more candles, signals and noise. On 1 minute, a few seconds of movement looks like a trend. On the daily, each candle sums up a whole session: signals are rarer but sturdier, and stops wider.",
      },
      { h2: "The main styles" },
      {
        ul: [
          "**Scalping (1 to 5 minutes)**: dozens of trades a day, constant attention, fees that weigh heavily. Hard to combine with a job.",
          "**Day trading (15 minutes to 1 hour)**: positions opened and closed within the day. You need to be available during the market's active hours.",
          "**Swing trading (4 hours to daily)**: positions held for a few days to a few weeks. Works with a job: you check the chart once or twice a day.",
          "**Position trading (weekly)**: trends lasting months, very few decisions.",
        ],
      },
      { tip: "Pick the timeframe for the time you can spend in front of the screen, not the one that promises the most opportunities." },
      { p: "A common intraday example on gold: the 1-hour for direction, the 15-minute for the plan, the 5-minute for the entry. That routine is laid out step by step on our [XAU/USD analysis page](/gold)." },
      { h2: "Always look one timeframe up" },
      {
        p: "The underlying trend is read on the higher timeframe, entries on yours. If you trade the 1-hour, the 4-hour tells you which way the current flows. Buying a bullish 1-hour signal while the 4-hour and daily are falling is swimming against the current.",
      },
      {
        p: "A simple method keeps a ratio of 4 to 6 between timeframes: daily for direction, 4-hour for the plan, 1-hour for the entry. Levels drawn on the higher timeframe, such as [support and resistance](/blog/support-and-resistance), matter more than those below.",
      },
      { h2: "Common mistakes" },
      {
        ul: [
          "**Switching timeframe mid-trade** to find a chart that proves you right.",
          "**Dropping to a lower timeframe after a loss** to win it back faster.",
          "**Using a stop designed for the 1-minute** on a position held for days, or the reverse.",
        ],
      },
      { h2: "An analysis's horizon depends on its timeframe" },
      {
        p: "A scenario read on the 15-minute holds for a few hours; on the daily, for days or weeks. That's why [Scanzivo](/) states the horizon of each analysis from the timeframe visible on your screenshot. Make sure it shows clearly, as explained in the [chart screenshot guide](/blog/chart-screenshot-guide).",
      },
    ],
  },
  {
    key: "chandeliers-japonais",
    slug: "japanese-candlesticks",
    title: "Japanese candlesticks: the patterns worth your attention",
    description:
      "Hammer, engulfing, shooting star, doji: how to read the most useful candlestick patterns, and why where they form matters more than their shape.",
    date: "2026-11-01",
    body: [
      {
        p: "There are dozens of Japanese candlestick patterns, many with poetic names. A handful is enough in practice, and one rule matters more than all of them: a pattern means nothing on its own, it takes on meaning at a specific place on the chart.",
      },
      {
        p: "If you're starting out, begin with [how to read a trading chart](/blog/how-to-read-a-trading-chart): body, wicks, open and close are the basis of everything below.",
      },
      { h2: "The hammer and the shooting star" },
      {
        p: "The **hammer** has a small body at the top and a long lower wick, at least twice the size of the body. It shows sellers pushed the price down, then buyers took it all back before the close. After a fall, on a support, it's a sign of rejection.",
      },
      {
        p: "The **shooting star** is its mirror: small body at the bottom, long upper wick. After a rise, under a resistance, it signals that buyers couldn't hold the highs.",
      },
      { h2: "The engulfing pattern" },
      {
        p: "A **bullish engulfing** is a green candle whose body fully covers the previous red candle's body. Buyers didn't just stop the fall, they took back more than sellers had gained. The bearish engulfing is the reverse. It's one of the clearest patterns, especially on a higher timeframe.",
      },
      { h2: "The doji" },
      {
        p: "A **doji** opens and closes at almost the same price: the body is a thin line. It reflects hesitation. On its own it doesn't say which way the market will go; after a long trend, it mainly signals that momentum is fading.",
      },
      { h2: "What makes a pattern reliable" },
      {
        ul: [
          "**Location**: a hammer in the middle of nowhere is worth nothing; on a support tested several times, it counts.",
          "**Timeframe**: a pattern on the daily weighs far more than on the 5-minute (see [which timeframe to trade](/blog/choosing-a-timeframe)).",
          "**Confirmation**: waiting for the next candle to move the expected way avoids many false signals.",
          "**Volume**, when available: an engulfing on heavy volume is more convincing.",
        ],
      },
      { tip: "A candlestick pattern is there to trigger an entry near a level you had already spotted. It doesn't replace that level." },
      { h2: "Read patterns together with the rest" },
      {
        p: "Candlesticks describe the behaviour of one or two candles; [chart patterns](/blog/chart-patterns) describe the shape of dozens. The best signals come when both tell the same story, for example a bullish engulfing at the low of a double bottom.",
      },
      {
        p: "In a [Scanzivo](/) analysis, the AI lists the patterns visible on your screenshot and states, for each, what it implies and at which level. You can then check its reading on the chart rather than take it on trust.",
      },
    ],
  },
  {
    key: "figures-chartistes",
    slug: "chart-patterns",
    title: "Chart patterns to know: head and shoulders, double top, triangles",
    description:
      "How to recognise the most common chart patterns, where their breakout line sits, how to derive a target, and when to be wary of them.",
    date: "2026-11-01",
    body: [
      {
        p: "Chart patterns are shapes the price draws over dozens of candles while buyers and sellers fight over a zone. They predict nothing for certain, but they give three useful pieces of information: where the scenario triggers, where it fails, and how far it might go.",
      },
      { h2: "Reversal patterns" },
      { h3: "Head and shoulders" },
      {
        p: "Three peaks, the middle one (the head) higher than the other two (the shoulders). The line joining the two troughs is the **neckline**. As long as it holds, it's only hesitation; a clean close below it confirms the pattern. The inverse version, at the bottom of a trend, signals a possible recovery.",
      },
      { h3: "Double top and double bottom" },
      {
        p: "The price hits the same level twice, then turns. The **double top** draws an M, the double bottom a W. Confirmation comes when the price breaks the trough (or peak) between the two attempts. Before that, it's just a [resistance](/blog/support-and-resistance) that held twice.",
      },
      { h2: "Continuation patterns" },
      { h3: "Triangles" },
      {
        p: "The price narrows between two lines. An **ascending triangle** (flat resistance, rising lows) shows increasingly eager buyers. A descending triangle is the reverse. A symmetrical triangle only says the market is undecided: the breakout gives the direction.",
      },
      { h3: "Flags and pennants" },
      {
        p: "After a fast move (the pole), the price takes a short pause sloping gently against that move. If the pause ends with a break in the pole's direction, the trend often resumes.",
      },
      { h2: "Measuring a target" },
      {
        p: "The classic method projects the pattern's height from the breakout point. For a head and shoulders, measure the distance from the head to the neckline, then project it below the neckline. It's an order of magnitude, not a promise: the price often stops earlier, on an intermediate support.",
      },
      { tip: "Compare that target with your stop before entering. If the [risk/reward ratio](/blog/risk-reward-ratio) is below 1, the pattern can be pretty and the trade bad." },
      { h2: "When to be wary" },
      {
        ul: [
          "**Before the breakout**: an unconfirmed pattern is only a hypothesis. Many “head and shoulders” never break their neckline.",
          "**False breakouts**: the price breaks out, then comes back into the pattern. Waiting for a close, or even a retest, filters out some of these traps.",
          "**Low timeframes**: on 1 minute, you see patterns everywhere.",
          "**Context**: a reversal pattern against a very strong underlying trend fails more often.",
        ],
      },
      { h2: "Seeing a pattern, or projecting one?" },
      {
        p: "The main risk is seeing what you want to see. An outside view helps: it's one of the most useful uses of [AI technical analysis](/blog/ai-technical-analysis). On a screenshot, [Scanzivo](/) names the patterns it spots, their confirmation line and what would invalidate the scenario.",
      },
    ],
  },
  {
    key: "rsi-indicateur",
    slug: "rsi-indicator",
    title: "The RSI: how to read it without falling into the traps",
    description:
      "What the RSI really measures, why “oversold” doesn't mean “buy”, and how to use divergences and the 50 line.",
    date: "2026-11-01",
    body: [
      {
        p: "The RSI (Relative Strength Index) is probably the most displayed indicator on charts. It's also one of the most misused: many beginners buy as soon as it drops below 30, then watch the price keep falling.",
      },
      { h2: "What the RSI measures" },
      {
        p: "The RSI compares the size of recent rises and falls, usually over **14 periods**, and maps the result onto a scale from 0 to 100. Above 70, recent rises have been much stronger than falls; below 30, the reverse. It measures the **speed** of the move, not its future direction.",
      },
      { h2: "Oversold doesn't mean “buy”" },
      {
        p: "In a strong downtrend, the RSI can stay below 30 for days. An “oversold” market can become even more oversold. The signal isn't the drop below 30 but the **exit** from that zone, ideally on an identified [support](/blog/support-and-resistance), with a reversal candle.",
      },
      { tip: "In a solid uptrend, the RSI often moves between 40 and 80; in a downtrend, between 20 and 60. Spotting that range already says a lot about the market's strength." },
      { h2: "Divergences" },
      {
        p: "A **bearish divergence** appears when the price makes a higher high but the RSI a lower high: the rise continues, but with less strength. A bullish divergence is the reverse, at the bottom of a trend.",
      },
      {
        p: "A divergence isn't an immediate buy or sell signal. It can last a long time before the price reacts. It's mainly a warning: tighten a stop, don't open new positions in the direction of the trend, wait for a break in structure.",
      },
      { h2: "The 50 line" },
      {
        p: "Often overlooked, the 50 line separates phases where rises dominate from those where falls dominate. An RSI crossing back above 50 after a long time below often accompanies a change of trend, to be confirmed on the price.",
      },
      { h2: "Settings" },
      {
        p: "The 14-period setting works in most cases. A shorter setting makes the indicator jumpier and multiplies false signals; a longer one smooths it but makes it late. Tweaking settings until you find the one that “would have worked” in the past is a way of fooling yourself.",
      },
      { h2: "The RSI confirms, it doesn't decide" },
      {
        ul: [
          "Read the trend and levels on the candles first.",
          "Use the RSI to judge the strength of the move and spot divergences.",
          "Decide the entry and stop from the price, never from the RSI alone.",
        ],
      },
      {
        p: "If the RSI shows on your screenshot, [Scanzivo](/) takes it into account in its reading, for example to flag a divergence or fading momentum. But as explained in [how to read a trading chart](/blog/how-to-read-a-trading-chart), a chart loaded with indicators is harder to read: two or three are enough.",
      },
    ],
  },
];
