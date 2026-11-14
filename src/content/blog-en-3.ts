import type { Article } from "./blog";

/** English versions of the guides in blog-fr-3.ts; `key` is the French slug. */
export const ARTICLES_EN_3: Omit<Article, "locale">[] = [
  {
    key: "macd-indicateur",
    slug: "macd-indicator-explained",
    title: "MACD indicator explained: lines, histogram and divergences",
    description:
      "How the MACD lines, histogram, crossovers and divergences work, with a worked example and the limits to know before you rely on it.",
    date: "2026-11-14",
    body: [
      {
        p: "The MACD (Moving Average Convergence Divergence) measures the gap between two exponential moving averages to show whether a market's momentum is building or fading. It doesn't predict anything. It sums up the speed of the current move. Used alone, it throws a lot of false signals.",
      },
      { h2: "How is the MACD calculated?" },
      {
        p: "With the default settings (12, 26, 9), the indicator has three parts, plotted under the price chart.",
      },
      {
        ul: [
          "**The MACD line**: the 12-period exponential moving average minus the 26-period one. When it is positive, the short average sits above the long one.",
          "**The signal line**: a 9-period exponential moving average of the MACD line. It reacts more slowly.",
          "**The histogram**: the gap between the MACD line and the signal line. It is above zero when the MACD is above its signal, below zero when it isn't.",
        ],
      },
      {
        p: "These settings date from the days of six-day trading weeks. Nothing forces you to keep them, but most traders watch them, so they are the ones that matter most.",
      },
      { h2: "What does a MACD crossover mean?" },
      {
        p: "When the MACD line crosses above the signal line, bullish momentum is taking over: a bullish crossover. When it crosses below, it's a bearish crossover. On the histogram, this is the moment the bars cross the zero line.",
      },
      {
        p: "The MACD line crossing above or below zero is another reference. Above zero, the short average is above the long one, so the market leans up. Below zero, it leans down.",
      },
      {
        p: "**Example (illustrative):** an asset has been rising for three weeks and the MACD line is positive. Price pauses, the histogram shrinks, then the MACD line crosses back below its signal. That doesn't say the rally is over. It says momentum has weakened. It's up to you to check whether price holds a support before drawing a conclusion.",
      },
      { h2: "How do you read the MACD histogram?" },
      {
        p: "The height of the bars matters, not just their color. Growing positive bars show a rise gaining speed. Shrinking positive bars show a rise slowing down, even if price is still going up. The histogram often flags the crossover a few candles before it happens.",
      },
      { h2: "What is a MACD divergence?" },
      {
        p: "A divergence happens when price and the indicator tell two different stories.",
      },
      {
        ul: [
          "**Bearish divergence**: price makes a new high, but the MACD makes a lower high. The rise is happening with less momentum.",
          "**Bullish divergence**: price makes a new low, but the MACD makes a higher low. The fall is running out of steam.",
        ],
      },
      {
        p: "It's a warning sign, not an entry signal. A divergence can last a long time while price keeps going the same way. Many traders wait for a break of structure or a reversal candle to confirm it. For those candles, see [Japanese candlesticks](/blog/japanese-candlesticks).",
      },
      { h2: "What are the limits of the MACD?" },
      {
        ul: [
          "**It lags.** It is built from moving averages, so from past prices. The crossover often arrives after the move has started.",
          "**It misleads in ranges.** When price drifts sideways, the lines cross again and again and produce a string of false signals. To know where you stand, read [trending vs ranging market](/blog/trending-vs-ranging-market).",
          "**It gives no level and no stop.** It doesn't tell you where to enter, exit or place protection. You need a chart with [support and resistance](/blog/support-and-resistance).",
          "**It depends on the timeframe.** A bullish crossover on the 5-minute chart can sit inside a bearish trend on the 4-hour. See how to [choose a timeframe](/blog/choosing-a-timeframe).",
        ],
      },
      { h2: "How do you combine the MACD with other tools?" },
      {
        p: "The MACD measures momentum, the [RSI](/blog/rsi-indicator) measures overextension, and [moving averages](/blog/moving-averages-sma-ema) give direction. None replaces reading price itself. A simple routine: mark the structure first (trend, support, resistance), then check whether the MACD confirms or contradicts what you see. If it contradicts, that isn't an order to stay out. It's a reason to size down or wait. For sizing, see [position size](/blog/position-size).",
      },
      { tip: "If you're new, add only one indicator at a time. Watch it on twenty past charts before you give it weight in a decision." },
      { h2: "Want a quick read of your chart?" },
      {
        p: "[Scanzivo](/) reads a screenshot of your chart, with or without indicators showing, and suggests levels and a numbered plan. You can check what it says about the MACD against what you see yourself, which is a good way to practice.",
      },
      {
        p: "This content is educational and is not investment advice. Trading carries a risk of capital loss, up to the full amount you put in.",
      },
    ],
  },
  {
    key: "moyennes-mobiles",
    slug: "moving-averages-sma-ema",
    title: "Moving averages (SMA vs EMA): 20, 50, 200 and crossovers",
    description:
      "What a moving average calculates, the difference between SMA and EMA, the role of the 20, 50 and 200 averages, and why crossovers fail in ranges.",
    date: "2026-11-14",
    body: [
      {
        p: "A moving average smooths closing prices over a set period so the direction shows up. It doesn't forecast anything. It describes what has already happened. Its strength is making a trend easy to read. Its weakness is that it arrives late.",
      },
      { h2: "How does a moving average work?" },
      {
        p: "A 20-period moving average adds the last 20 closes and divides by 20. With each new candle, the oldest close drops out and the new one comes in, so the line “moves”. On a 1-hour chart, the 20-period average covers the last 20 hours. On a daily chart, the last 20 days.",
      },
      { h2: "What is the difference between SMA and EMA?" },
      {
        ul: [
          "**SMA (simple)**: every close weighs the same. The line is smooth but reacts late.",
          "**EMA (exponential)**: recent closes weigh more. The line hugs price and reacts faster, at the cost of more false starts.",
        ],
      },
      {
        p: "Neither is better in itself. On the same chart, the gap between the two is often small. What matters is staying consistent: don't switch averages from trade to trade to make the story fit.",
      },
      { h2: "What are the 20, 50 and 200 moving averages used for?" },
      {
        p: "These are the most followed periods, so many market participants are looking at the same lines at the same time.",
      },
      {
        ul: [
          "**20**: the short term. In a healthy trend, price moves away from it and often comes back to touch it.",
          "**50**: the medium term. Often used as a pullback zone in an established trend.",
          "**200**: the long term. Price above it is generally read as a bullish backdrop, below it as bearish. On a daily chart, it's the most watched.",
        ],
      },
      {
        p: "**Example (illustrative):** an asset trades above its 20, 50 and 200 averages, all three sloping up and stacked in that order. Price pulls back to the 50 and prints a rejection candle. Many traders see a zone of interest there. It's not a guarantee: if price closes clearly below the 50, the scenario needs a rethink.",
      },
      { h2: "What is a moving average crossover?" },
      {
        p: "When a short average crosses above a longer one, it's a bullish crossover. The reverse is a bearish crossover. The best known in stocks is the 50/200 pair: a “golden cross” when the 50 moves above the 200, a “death cross” when it moves below.",
      },
      {
        p: "The names are dramatic, not magical. The crossover happens well after the move began, because both averages are already history. It often confirms a trend that has covered a good part of its path.",
      },
      { h2: "What are the limits of moving averages?" },
      {
        ul: [
          "**Lag.** The longer the period, the later the signal.",
          "**Ranges.** When price goes nowhere, it crosses the average both ways and every cross looks like a signal. That is where they cost the most. See [trending vs ranging market](/blog/trending-vs-ranging-market).",
          "**No precise level.** The average is a zone, not an exact line. A stop placed right on it often gets hit.",
          "**Over-optimization.** You can always find, after the fact, the period that would have worked. It says nothing about what comes next.",
        ],
      },
      { h2: "How do you use them without getting trapped?" },
      {
        ol: [
          "**Identify the trend** on a higher timeframe (see [choosing a timeframe](/blog/choosing-a-timeframe)).",
          "**Look at the slope.** A flat average signals a market without a trend, so signals lose value.",
          "**Look for confluence**: a 50 that lines up with a horizontal support carries more weight than a 50 alone. See [support and resistance](/blog/support-and-resistance).",
          "**Define invalidation**: where your idea is wrong, with a stop (see [where to place a stop-loss](/blog/where-to-place-a-stop-loss)).",
        ],
      },
      {
        p: "Moving averages pair well with the [MACD indicator](/blog/macd-indicator-explained), which is itself built from moving averages, and with [Bollinger Bands](/blog/bollinger-bands-explained), whose middle line is a 20-period average.",
      },
      { tip: "To find out whether the 200 matters on your asset, check whether price has reacted to it in the past. If not, it's just one more line." },
      {
        p: "If you want a second opinion on a chart crowded with lines, [Scanzivo](/) reads your screenshot, separates what matters (levels, trend) from what clutters, and suggests a numbered plan you can challenge.",
      },
      {
        p: "This content is educational and is not investment advice. Trading carries a risk of capital loss, up to the full amount you put in.",
      },
    ],
  },
  {
    key: "bandes-de-bollinger",
    slug: "bollinger-bands-explained",
    title: "Bollinger Bands explained: what they measure",
    description:
      "How the bands are built, how to read their width, what a squeeze is, and why touching a band is neither a buy nor a sell signal.",
    date: "2026-11-14",
    body: [
      {
        p: "Bollinger Bands wrap price in two envelopes that widen when volatility rises and tighten when it falls. They measure how far price spreads around its average. They don't say where the market is going, and touching a band is not a reversal signal.",
      },
      { h2: "How are Bollinger Bands calculated?" },
      {
        p: "The classic setting is (20, 2) and gives three lines.",
      },
      {
        ul: [
          "**The middle band**: a 20-period simple moving average (see [moving averages](/blog/moving-averages-sma-ema)).",
          "**The upper band**: the middle band plus 2 standard deviations of the last 20 closes.",
          "**The lower band**: the middle band minus 2 standard deviations.",
        ],
      },
      {
        p: "Standard deviation measures how far prices stray from their average. The bigger and wilder the candles, the higher it is, and the wider the bands get. With 2 standard deviations, price spends most of its time between the bands, but not always. It leaves them regularly, and that is exactly the trap.",
      },
      { h2: "What does the width of the bands tell you?" },
      {
        p: "Width matters more than where price sits. Wide bands mean high volatility, for example after a news release or a strong trend. Narrow bands mean a quiet market. Volatility comes in cycles: after a calm period, a lively one often follows, and the other way round. That is the most useful idea in the tool.",
      },
      { h2: "What is a Bollinger Band squeeze?" },
      {
        p: "A squeeze is when the bands tighten to a low level compared with the past few weeks. It signals low volatility and a possible expansion ahead. It says nothing about direction.",
      },
      {
        p: "**Example (illustrative):** on a 1-hour chart, price moves for two days in a narrow channel and the bands close in. Then a wide candle closes above the upper band, the bands open up, and volume rises. That may be the start of a move, or a false exit that falls back into the channel. Which is why it pays to read about the [false breakout](/blog/false-breakout-fakeout) before acting on this kind of signal.",
      },
      { h2: "Is touching the upper band a sell signal?" },
      {
        p: "No. This is the most common mistake. In a strong trend, price can ride the upper band for many candles: it's said to be “walking the band”. Selling at every touch would mean fading the trend again and again.",
      },
      {
        p: "In a market without direction, though, the bands work well as references: price often bounces back toward the middle line after touching an extreme. It all depends on context, so you need to know whether you're in a trend or a range (see [trending vs ranging market](/blog/trending-vs-ranging-market)).",
      },
      { h2: "What mistakes should you avoid with Bollinger Bands?" },
      {
        ul: [
          "**Reading them as support and resistance.** They move with every candle. A real level is horizontal and has been tested before. See [support and resistance](/blog/support-and-resistance).",
          "**Ignoring the trend.** The same bands give opposite readings depending on context.",
          "**Trading a squeeze without waiting for confirmation.** The direction of the exit is unknown. Some traders wait for a close outside the bands on stronger volume (see [trading volume explained](/blog/trading-volume-explained)).",
          "**Forgetting the timeframe.** A squeeze on the 5-minute chart doesn't carry the same weight as on the daily. See [choosing a timeframe](/blog/choosing-a-timeframe).",
          "**Stacking indicators of the same kind.** The bands, the RSI and the MACD all come from the same prices: three that agree are not three pieces of evidence.",
        ],
      },
      { h2: "How do you combine them with other references?" },
      {
        p: "A reasonable approach: mark the structure first (trend, levels), then use the bands to judge the state of volatility. A range breakout preceded by a squeeze is more interesting than one in the middle of a frenzy. The [RSI](/blog/rsi-indicator) can help show whether the move is already stretched. And risk management stays separate: size comes from the stop, not from the bands (see [position size](/blog/position-size)).",
      },
      { tip: "When the bands are very wide after a big move, don't use the opposite band as a target. It may be very far away, or already closing in." },
      {
        p: "On your own chart, [Scanzivo](/) can read a screenshot with your bands showing and pull out levels and a numbered plan, which you then compare with your own read of the context.",
      },
      {
        p: "This content is educational and is not investment advice. Trading carries a risk of capital loss, up to the full amount you put in.",
      },
    ],
  },
  {
    key: "retracement-de-fibonacci",
    slug: "fibonacci-retracement-levels",
    title: "Fibonacci retracement levels and how to draw them",
    description:
      "How to draw Fibonacci retracement levels step by step, what 38.2 / 50 / 61.8% mean, and why they are zones to watch, not certainties.",
    date: "2026-11-14",
    body: [
      {
        p: "Fibonacci retracement places levels (38.2%, 50%, 61.8%) between the start and end of a move to spot where a pullback might stop. They are zones of attention, not guarantees. Many traders watch them, which sometimes gives them weight, but price also cuts through them often.",
      },
      { h2: "Where do these percentages come from?" },
      {
        p: "They come from the Fibonacci sequence, where each number is the sum of the two before it. The ratio of a number to the next one tends toward 61.8%, and toward 38.2% with the one after. The 50% isn't strictly a Fibonacci ratio. It's added because many moves return halfway. No market law forces price to respect these ratios. Their use is practical: they give shared, objective reference points.",
      },
      { h2: "How do you draw a Fibonacci retracement?" },
      {
        ol: [
          "**Find a clean move**: one clear leg between a low and a high (or the reverse), without clutter.",
          "**Pick the two points**: the start and the end of the move. For a rise, from the low to the high. For a fall, from the high to the low. Use wicks or closes, but stay consistent.",
          "**Drag the tool** in your platform: the levels appear between the two points.",
          "**Watch how price reacts** when it comes back toward 38.2%, 50% or 61.8%.",
        ],
      },
      {
        p: "**Example (illustrative):** an asset rises from $100 to $120. The move is 20 points. The 38.2% level sits at 120 − 7.64 = $112.36. The 50% at $110. The 61.8% at 120 − 12.36 = $107.64. If price drops back, you watch what it does around these zones, such as a rejection candle or a clean break.",
      },
      { h2: "What does each level mean?" },
      {
        ul: [
          "**38.2%**: a shallow pullback. In a strong trend, price often restarts from there.",
          "**50%**: a medium pullback, often seen as the limit of a “healthy” correction.",
          "**61.8%**: a deep pullback. Beyond it, the idea of a simple pause is in doubt and the risk of a reversal grows.",
        ],
      },
      {
        p: "A pullback that goes past 78.6% or returns to the origin of the move usually invalidates the scenario. That is what gives the tool a concrete use: it helps you set a threshold where the idea is wrong.",
      },
      { h2: "What are the limits of Fibonacci retracements?" },
      {
        p: "Let's be direct: retracements have serious limits.",
      },
      {
        ul: [
          "**Choosing the points is subjective.** Two traders draw two different grids on the same chart, and each finds reactions.",
          "**There are too many levels.** With several grids, almost any price ends up near some level. You notice what worked and forget the rest.",
          "**Price often goes straight through the levels** without stopping.",
          "**No statistical edge is guaranteed.** Treat the tool as a visual reference, not a proven method.",
        ],
      },
      { h2: "How do you give Fibonacci levels more weight?" },
      {
        p: "Look for confluence. A Fibonacci level that lands on a [support or resistance](/blog/support-and-resistance) already tested, on a key [moving average](/blog/moving-averages-sma-ema) or on a round number deserves more attention than an isolated level. A rejection candle there (see [Japanese candlesticks](/blog/japanese-candlesticks)) adds confirmation. Without one, waiting is usually better.",
      },
      {
        p: "On the risk side, the retracement helps place the stop: below the next level or below the origin of the move. See [where to place a stop-loss](/blog/where-to-place-a-stop-loss), then check the [risk-reward ratio](/blog/risk-reward-ratio): the natural target is the previous high, which gives a measurable ratio before you enter. A pullback to 61.8% with a stop just below usually offers a better ratio than an entry at 38.2%, but price is less likely to reach that level.",
      },
      { tip: "Always draw the grid on the most obvious leg, the one everyone sees. A grid only you draw has no reason to be followed by the market." },
      {
        p: "To compare your drawing with another view, [Scanzivo](/) reads a screenshot of your chart and suggests entry, stop and target levels in a numbered plan, which you can set against your own grid.",
      },
      {
        p: "This content is educational and is not investment advice. Trading carries a risk of capital loss, up to the full amount you put in.",
      },
    ],
  },
  {
    key: "fausse-cassure",
    slug: "false-breakout-fakeout",
    title: "False breakout (fakeout): how to spot it and avoid the trap",
    description:
      "Why price breaks a level and then reverses, the warning signs to watch, and three habits to limit the damage without pretending to avoid every fakeout.",
    date: "2026-11-14",
    body: [
      {
        p: "A false breakout, or fakeout, is a move out of a support, resistance or range that doesn't hold: price pushes through the level, draws in entries, then falls back into the zone. You can't avoid them all. You learn to recognize them sooner and to limit what they cost.",
      },
      { h2: "What is a false breakout?" },
      {
        p: "A clear level concentrates orders: stops just behind it, and entry orders from breakout traders. When price pushes past the level, those orders trigger. If there isn't enough real demand behind the move, price runs out of steam and turns back. Those who entered on the breakout are trapped, and their stops fuel the move the other way.",
      },
      {
        p: "**Example (illustrative):** a resistance at $50 has been tested three times. A candle pokes up to $50.40, then price drops and closes at $49.60. The breakout buyers are underwater. The $50 level wasn't broken. It was swept.",
      },
      { h2: "What warning signs should you watch for?" },
      {
        ul: [
          "**A wick, not a body.** Price pokes through the level on a long wick, but the candle closes back below it. The close matters more than the high.",
          "**Volume that doesn't follow.** A breakout without above-average volume lacks conviction (see [trading volume explained](/blog/trading-volume-explained), including its limits).",
          "**An opposing context.** The breakout goes against the trend on the higher timeframe.",
          "**A fragile moment.** The open, an economic release, the weekend: liquidity is thinner and moves are more nervous (see the [economic calendar](/blog/economic-calendar)).",
          "**A reversal candle right after**, such as an engulfing or an evening star. See [Japanese candlesticks](/blog/japanese-candlesticks).",
        ],
      },
      { h2: "How do you avoid falling into the trap?" },
      { h3: "Wait for a close" },
      {
        p: "Instead of entering as soon as the level is touched, wait for the candle to close beyond the level, on the timeframe you follow. You give up a little price. You avoid many wicks.",
      },
      { h3: "Wait for the retest" },
      {
        p: "A genuine breakout often comes back to test the level, which then becomes support (old resistance) or resistance (old support). If price holds on that retest, the entry is better placed and the stop closer. The risk is missing the move if it never comes back. That is the price of caution.",
      },
      { h3: "Put the stop on the right side" },
      {
        p: "A stop just under the broken level often gets hit by a wick. A stop under the last significant low, or under the zone, leaves some room. It means a smaller position, which is the calculation in [position size](/blog/position-size) and [where to place a stop-loss](/blog/where-to-place-a-stop-loss).",
      },
      { h2: "Can you trade a false breakout?" },
      {
        p: "Some traders treat it as a signal in itself: price falls back under the resistance, so they sell with a stop above the wick. The idea is logical, since the stop is tight and close, which gives a good [risk-reward ratio](/blog/risk-reward-ratio). But it remains a bet: a second breakout attempt can succeed where the first one failed.",
      },
      { h2: "Which common mistakes make things worse?" },
      {
        ul: [
          "**Chasing price**: entering late on an already stretched candle.",
          "**Increasing size to win it back** after a trap.",
          "**Moving the stop** when price comes back against you.",
          "**Confusing a range with a trend**: in a range, most breakouts fail (see [trending vs ranging market](/blog/trending-vs-ranging-market)).",
          "**Ignoring context**: a 5-minute breakout against a strong 4-hour trend.",
        ],
      },
      { tip: "Write down your last ten breakout trades, with result and context. You'll quickly see whether your failures come from timing, from a type of level, or from your own impatience." },
      {
        p: "Before you decide, it can help to have your chart read a second time: [Scanzivo](/) analyzes a screenshot, spots possible breakout levels and suggests a numbered plan with invalidation, which you keep or reject.",
      },
      {
        p: "This content is educational and is not investment advice. Trading carries a risk of capital loss, up to the full amount you put in.",
      },
    ],
  },
  {
    key: "tendance-et-range",
    slug: "trending-vs-ranging-market",
    title: "Trending vs ranging market: how to tell them apart",
    description:
      "Highs and lows, moving average slope, lack of direction: the signs that separate a trending market from a ranging one, and what changes in how you trade.",
    date: "2026-11-14",
    body: [
      {
        p: "A market is trending when it strings together higher highs and higher lows (or lower highs and lower lows). It is ranging when it bounces between a ceiling and a floor without making progress. Knowing which one you're looking at is the first question to ask, because most tools work in one and fail in the other.",
      },
      { h2: "How do you recognize an uptrend or a downtrend?" },
      {
        p: "The simplest reference is structure.",
      },
      {
        ul: [
          "**Uptrend**: each high is above the previous high, each low is above the previous low.",
          "**Downtrend**: each high and each low is below the previous ones.",
        ],
      },
      {
        p: "You can add the slope of [moving averages](/blog/moving-averages-sma-ema): a clearly tilted 50-period average, with price staying on the same side, confirms direction. But structure comes first. An average is a consequence of price, not a cause.",
      },
      {
        p: "**Example (illustrative):** low at $100, high at $110, pullback to $104, new high at $116, pullback to $108. The lows (100, 104, 108) and the highs (110, 116) are rising: an uptrend. If the next pullback goes below $108, the structure is broken and the reading changes.",
      },
      { h2: "How do you recognize a range?" },
      {
        ul: [
          "Price bounces at least twice off the same floor and the same ceiling.",
          "Moving averages are flat and price crosses them in both directions.",
          "Highs and lows don't progress.",
          "Candles are often small, with wicks on both sides.",
        ],
      },
      {
        p: "The ceiling and the floor are your [support and resistance](/blog/support-and-resistance). The width of the range sets how much potential is left: a narrow range leaves little room for a good [risk-reward ratio](/blog/risk-reward-ratio) after costs.",
      },
      { h2: "How should you adjust your approach to each market?" },
      { h3: "In a trend" },
      {
        p: "Pullbacks toward an average or a support are zones of interest in the direction of the trend. [Momentum indicators](/blog/macd-indicator-explained) give useful signals, and retracements ([Fibonacci](/blog/fibonacci-retracement-levels)) help gauge how deep a pullback is. The main risk: trading against the trend because price “looks too high”.",
      },
      { h3: "In a range" },
      {
        p: "The edges are the zones of interest, and the middle is a zone with no edge. An [RSI](/blog/rsi-indicator) that hits extremes is more useful here than in a strong trend. The main risk: being caught off guard by the exit, which can be a [false breakout](/blog/false-breakout-fakeout) or a real one.",
      },
      { h2: "What happens when the market switches from one to the other?" },
      {
        p: "This is the hardest moment. A trend often ends in a range (the market pauses), and a range often ends in a trend (the market picks a side). A few transition signals: a break of structure (a low that falls below the previous low in an uptrend), a squeeze in volatility (see [Bollinger Bands](/blog/bollinger-bands-explained)), or volume that changes behavior (see [trading volume explained](/blog/trading-volume-explained)).",
      },
      { h2: "Does the timeframe change the answer?" },
      {
        p: "Yes, and it is a common source of confusion. A market can be in an uptrend on the daily chart and in a range on the 15-minute. The practical rule: identify direction on a higher timeframe, then look for your entry on a finer one. See [choosing a timeframe](/blog/choosing-a-timeframe) and, for the basics, [how to read a trading chart](/blog/how-to-read-a-trading-chart).",
      },
      { h2: "Which mistakes come up most often?" },
      {
        ul: [
          "**Seeing a trend everywhere.** A three-candle move is not a trend.",
          "**Using the same method all the time.** A breakout strategy in a range, or a bounce strategy in a strong trend, wears out fast.",
          "**Ignoring news context.** A release can break a range without warning (see the [economic calendar](/blog/economic-calendar)).",
          "**Changing your reading on every candle.** Set your criteria in advance.",
        ],
      },
      { tip: "Ask yourself one question before each trade: if I turn off the screen and come back in a week, is price more likely higher, lower or in the same place? Your answer tells you what you believe you see." },
      {
        p: "For an outside view, [Scanzivo](/) reads your screenshot, tells you whether the structure looks like a trend or a range, and suggests levels with a numbered plan. Always check what it says against your own reading.",
      },
      {
        p: "This content is educational and is not investment advice. Trading carries a risk of capital loss, up to the full amount you put in.",
      },
    ],
  },
  {
    key: "volume-trading",
    slug: "trading-volume-explained",
    title: "Trading volume explained: what it confirms",
    description:
      "How to read volume bars, what they confirm on a breakout or a trend, and why volume in forex and crypto doesn't mean the same thing as in stocks.",
    date: "2026-11-14",
    body: [
      {
        p: "Volume measures how much was traded during a candle. It helps you judge whether a move rests on real participation or is thin. It doesn't give direction, and depending on the market (stocks, crypto, forex) it doesn't mean the same thing.",
      },
      { h2: "What does volume actually measure?" },
      {
        p: "Under the chart, each bar shows the number of units traded in that period: shares, contracts, or units of crypto. A tall bar means a lot of trading, a short bar means little. What counts is the comparison with recent bars, not the raw number.",
      },
      { h2: "What does volume confirm?" },
      {
        ul: [
          "**A breakout.** Price leaving a level on clearly higher volume is more likely to follow through than an exit on low volume. This lowers the risk of a [false breakout](/blog/false-breakout-fakeout), without removing it.",
          "**A trend.** In a healthy rise, volume often picks up on pushes and calms down on pullbacks.",
          "**An exhaustion spike.** Exceptional volume after a long move can mark the end of a trend, but only if price reacts afterward.",
          "**A level.** A support defended on volume is more credible than a level touched with no activity. See [support and resistance](/blog/support-and-resistance).",
        ],
      },
      {
        p: "**Example (illustrative):** price breaks through a resistance. The previous 20 bars average about 1,000 units, and the breakout bar shows 3,500. Participation is clear. If it shows 900, the breakout is suspect: few players followed.",
      },
      { h2: "What volume doesn't tell you" },
      {
        ul: [
          "**Direction.** Heavy volume can come with a rise or a fall. It shows activity, not who won.",
          "**Intent.** Buys and sells meet in every trade, and volume counts them all.",
          "**What comes next.** A spike doesn't predict the next candle.",
        ],
      },
      { h2: "Is crypto volume reliable?" },
      {
        p: "In crypto, volume is either consolidated from many exchanges or limited to one, depending on your chart source. So the numbers differ from platform to platform, and part of the volume reported by some venues has been questioned. It isn't useless: relative spikes keep their meaning on a single source. But comparisons between platforms and absolute figures call for caution. The market also runs 24 hours a day, so volume varies by time of day (see [bitcoin technical analysis](/blog/bitcoin-technical-analysis)).",
      },
      { h2: "Volume in forex: a special case" },
      {
        p: "Forex has no single central exchange. Trading is over the counter between banks and brokers. The “volume” shown by most retail platforms is tick volume, meaning the number of price changes, not the quantity actually traded. It still correlates with activity, so it works as a hint of how busy the market is, but it doesn't replace real exchange volume. CFDs are the same: you see your broker's volume, not the market's.",
      },
      { h2: "How do you use volume in practice?" },
      {
        ol: [
          "**Compare it with the recent average.** A bar only means something next to its neighbors.",
          "**Read it together with price.** Heavy volume and a small candle: lots of trading with no progress, a sign of absorption. Heavy volume and a big candle: a move with backing.",
          "**Account for the time of day.** The open and news releases inflate volume without any special meaning (see the [economic calendar](/blog/economic-calendar)).",
          "**Keep it as confirmation**, never as the only trigger. [Structure](/blog/trending-vs-ranging-market) comes first.",
        ],
      },
      { tip: "If the volume source on your chart is doubtful (forex, CFDs), don't base any decision on it. Use it only to spot moments of activity." },
      {
        p: "Volume is one of the things [Scanzivo](/) can read on a screenshot, along with structure and levels, and it builds a numbered plan from them. But it only sees what your chart displays, so the reliability of the source is up to you.",
      },
      {
        p: "This content is educational and is not investment advice. Trading carries a risk of capital loss, up to the full amount you put in.",
      },
    ],
  },
  {
    key: "analyse-technique-bitcoin",
    slug: "bitcoin-technical-analysis",
    title: "Bitcoin technical analysis: how to read a BTC chart",
    description:
      "How to read a bitcoin chart: timeframes, volatility, key levels, the effect of news, and the limits of an analysis that stays a scenario, not a prediction.",
    date: "2026-11-14",
    body: [
      {
        p: "Reading a bitcoin chart takes the same tools as any other asset: trend, support and resistance, volume, risk management. What changes is the volatility, the 24/7 market and the sensitivity to news. An analysis remains a scenario with an invalidation point, never a prediction.",
      },
      { h2: "What makes BTC different from other assets?" },
      {
        ul: [
          "**A continuous market.** There is no daily open or close. On weekends, liquidity is thinner and moves can be abrupt.",
          "**High volatility.** Moves of several percent in a day are not rare. Your stops and position sizes have to allow for it (see [position size](/blog/position-size)).",
          "**Several trading venues.** Prices and volumes differ slightly by platform (see [trading volume explained](/blog/trading-volume-explained)).",
          "**Sensitivity to news.** Regulator decisions, financial product announcements, hacks, central bank statements.",
        ],
      },
      { h2: "Which timeframe should you use for bitcoin?" },
      {
        p: "It depends on your horizon. A common setup: the daily or 4-hour chart gives direction and the big levels, and the 1-hour or 15-minute chart is used to place the entry. For day trading, people mostly watch 5 to 15-minute candles and the 1-hour. Over seven days, the 4-hour and daily give a steadier view. The shorter the timeframe, the stronger the noise. More detail in [choosing a timeframe](/blog/choosing-a-timeframe).",
      },
      { h2: "How do you find the key levels on BTC?" },
      {
        p: "Start with the extremes of the past weeks: highs and lows that stopped price several times. Add round numbers (for example full thousands), which many participants watch. Then look for zones where price changed behavior, like an old resistance that became support. The method is the one in [support and resistance](/blog/support-and-resistance), and it works just as well on gold: see [gold round numbers](/blog/gold-round-numbers).",
      },
      {
        p: "**Example (illustrative, made-up figures):** BTC has been moving for ten days between $60,000 and $64,000. The ceiling has been tested three times, the floor twice. While price stays in that channel, it's a range (see [trending vs ranging market](/blog/trending-vs-ranging-market)). A daily close above $64,000 on stronger volume becomes a bullish scenario. A close below $60,000 invalidates the range to the downside.",
      },
      { h2: "Which indicators work on bitcoin?" },
      {
        p: "Few, and don't overdo it. [Moving averages](/blog/moving-averages-sma-ema) (50 and 200 on the daily) give context. The [RSI](/blog/rsi-indicator) flags extremes, but in a strong trend it stays in extreme territory for a long time. The [MACD indicator](/blog/macd-indicator-explained) measures momentum. [Bollinger Bands](/blog/bollinger-bands-explained) help show quiet phases before big moves. None replaces reading price, and their agreement proves nothing.",
      },
      { h2: "How do you account for news?" },
      {
        p: "Before entering, check what is scheduled: US macro releases (inflation, jobs, Fed decisions) move bitcoin like many other risk assets. Look at the [economic calendar](/blog/economic-calendar) and avoid opening a position just before a major event unless you have decided to with full knowledge. Unexpected news has no calendar, which is one more reason to always have a stop defined in advance (see [where to place a stop-loss](/blog/where-to-place-a-stop-loss)).",
      },
      { h2: "Which mistakes are common on BTC?" },
      {
        ul: [
          "**Using high leverage** on an asset that is already very volatile: one wick is enough to liquidate a position.",
          "**Chasing moves out of fear of missing out**, and entering late after a big candle.",
          "**Mistaking noise for signal** on small timeframes.",
          "**Trusting the volume or price of a single platform** without checking.",
          "**Falling for a [false breakout](/blog/false-breakout-fakeout)**, which are frequent around round numbers.",
          "**Being drawn in by the promises** of bots or signal sellers: see [AI trading bot scams](/blog/ai-trading-bot-scams).",
        ],
      },
      { h2: "What are the limits of bitcoin technical analysis?" },
      {
        p: "Bitcoin also reacts to factors the chart doesn't show: regulation, institutional flows, crypto-specific events. Technical analysis frames the risk and locates the levels. It doesn't tell you what will happen. Many traders stay out until their scenario is clear, and that is a legitimate choice.",
      },
      { tip: "Write down before you enter: entry level, stop, target and the amount you're risking. If one of the four is missing, you don't have a plan, only a hunch." },
      {
        p: "To save time, [Scanzivo](/) can read a screenshot of your BTC chart and suggest levels and a numbered plan. For taking the screenshot, see the [chart screenshot guide](/blog/chart-screenshot-guide). And to understand what AI can and can't do, read [AI and trading](/blog/ai-and-trading).",
      },
      {
        p: "This content is educational and is not investment advice. Cryptocurrency trading carries a high risk of capital loss, up to the full amount you put in.",
      },
    ],
  },
];
