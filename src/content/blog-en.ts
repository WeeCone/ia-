import type { Article } from "./blog";

/** English versions of the French guides in blog.ts; `key` is the French slug, linking the translations. */
export const ARTICLES_EN: Omit<Article, "locale">[] = [
  {
    key: "comment-lire-un-graphique-de-trading",
    slug: "how-to-read-a-trading-chart",
    title: "How to read a trading chart when you're starting out",
    description:
      "Candles, trend, support and resistance, indicators: the basics of reading a price chart without drowning in indicators.",
    date: "2026-10-28",
    body: [
      {
        p: "A price chart tells you what buyers and sellers have done. Before you look for a signal, you need to be able to read that story: who took control, where price stalled, and when the balance of power shifted. Here are the four things to look at, in this order.",
      },
      { h2: "1. Candles: what happened in each period" },
      {
        p: "Each candle sums up one period: a minute, an hour or a day, depending on the timeframe you pick. Its **body** runs from the open to the close. It's green (or white) if price finished higher than it started, red (or black) if it finished lower. The **wicks** above and below show how far price travelled during the period before coming back.",
      },
      {
        p: "A long lower wick means sellers pushed price down, then buyers drove it back up before the close. One candle on its own proves nothing, but several long wicks at the same spot point to a zone the market refuses to go past.",
      },
      { h2: "2. The trend: which way the market is going" },
      {
        p: "An uptrend is a series of **higher highs** and **higher lows**. A downtrend is the opposite. When highs and lows stay at roughly the same level, the market is in a range: it can't make up its mind.",
      },
      {
        p: "To see it, zoom out: look at a hundred candles or more. Over ten candles, any move looks like a trend. Plenty of beginners buy a rise that is just a bounce inside a bigger downtrend.",
      },
      { tip: "Always check the timeframe above the one you trade. If you trade the 1-hour chart, glance at the 4-hour: that's where the underlying direction comes from." },
      { h2: "3. Support and resistance: where price reacts" },
      {
        p: "**Support** is a zone where price has stopped falling several times: buyers step in there. **Resistance** is a zone where it has stopped rising: sellers are waiting there. These are zones, not lines drawn to the exact cent. The more often and the more sharply price has reacted there, the more they matter.",
      },
      {
        p: "When resistance is broken with a clean close above it, it often turns into support. This is one of the most useful behaviours to know: the old ceiling becomes the new floor.",
      },
      { h2: "4. Indicators: to confirm, not to decide" },
      {
        p: "Moving averages, RSI, MACD: indicators are calculated from price. They don't add information, they show it differently. Use them to confirm what you already see in the candles, for example an RSI that weakens while price makes a new high, a sign the rally is running out of steam.",
      },
      {
        p: "Two or three indicators are enough. A chart covered in lines becomes unreadable, and every indicator ends up telling you something different.",
      },
      { h2: "Key takeaways" },
      {
        ul: [
          "Read the candles to see who controls the market in each period.",
          "Identify the trend over at least a hundred candles, and on the higher timeframe.",
          "Mark the zones where price has reacted several times: they're your reference points for entering, exiting and placing a stop.",
          "Use indicators to confirm, never to decide on their own.",
        ],
      },
      {
        p: "Once you have these four things in mind, a chart becomes a map: you know where you are, where price could go, and the point at which your idea would be wrong. That last question is the one most beginners forget to ask.",
      },
    ],
  },
  {
    key: "supports-et-resistances",
    slug: "support-and-resistance",
    title: "Support and resistance: how to spot them and use them",
    description:
      "How to draw support and resistance levels that actually matter, tell a real breakout from a fake one, and use them to enter, exit or place a stop.",
    date: "2026-10-28",
    body: [
      {
        p: "Support and resistance are the first levels every trader draws, and often the most useful. You still have to draw the right ones, though: a chart covered in twenty lines tells you nothing.",
      },
      { h2: "What support and resistance really are" },
      {
        p: "Support is a price zone where demand has been strong enough, more than once, to stop a decline. Resistance is a zone where supply has been strong enough to stop a rally. Behind them are real orders: buyers who missed the last bounce and are waiting for price to come back to that level, sellers who want to get out at break-even.",
      },
      {
        p: "That's why we talk about **zones** and not lines. Price often pokes a little past the level before turning back. Drawing a band a few tenths of a percent wide stops you from thinking a level has broken when it's only being tested.",
      },
      { h2: "How to draw the ones that matter" },
      {
        ol: [
          "Start with a wide view: several months on the daily chart, or several weeks on the 4-hour.",
          "Find the places where price has turned around at least twice. One touch doesn't make a level.",
          "Favour sharp reactions: long wicks, a strong surge in the other direction.",
          "Keep the two or three levels closest to the current price, above and below. The rest are too far away for your next decision.",
        ],
      },
      { tip: "Round numbers (60,000 on bitcoin, 1.1000 on EUR/USD) tend to attract orders. When a level you've drawn sits near a round number, it carries more weight." },
      { h2: "Breakout or fakeout?" },
      {
        p: "Price moving above resistance isn't a breakout until the candle has **closed** above it. Many moves pierce a level for a few minutes and then fall back: that's a fakeout, and anyone who bought too early is trapped.",
      },
      {
        p: "Two signs make a breakout more convincing: a close well beyond the zone, and price coming back to the old level and holding (the well-known retest). Waiting for that retest sometimes means missing the move, but it keeps you out of a lot of traps.",
      },
      { h2: "Using them in a trade" },
      {
        ul: [
          "**Entry**: near support in an uptrend, or after a confirmed break of resistance.",
          "**Stop**: on the other side of the zone that justifies the trade, with some room. If the support breaks, your original idea no longer holds.",
          "**Target**: the next resistance for a long, the next support for a short. That's where other traders will take their profits.",
        ],
      },
      {
        p: "This approach gives you a full plan before you even enter: an entry point, a point where you admit you were wrong, and a realistic target. It's also what lets you work out whether the trade is worth the risk.",
      },
    ],
  },
  {
    key: "ou-placer-son-stop-loss",
    slug: "where-to-place-a-stop-loss",
    title: "Where to place your stop loss: 4 reference points from the chart",
    description:
      "A stop loss belongs where your idea is proven wrong, not at an arbitrary percentage. Four concrete reference points for placing it on a chart.",
    date: "2026-10-28",
    body: [
      {
        p: "A stop loss is the order that closes a position when price moves against you. Many traders set it at a fixed percentage, 2% or 5% below their entry. It's simple, but the market doesn't know your percentage. A good stop goes **where your reason for entering no longer exists**.",
      },
      { h2: "1. Below the support that justifies the buy" },
      {
        p: "Are you buying because price is bouncing off support? If that support breaks, your idea is invalidated. So the stop goes just below the zone, not on it. Give it some room: price often tests a level by a few tenths before moving away.",
      },
      { h2: "2. Below the last low, in an uptrend" },
      {
        p: "In an uptrend, each low is higher than the one before. If price drops below the last low, the structure is broken: the trend is no longer what it was. A stop below that low protects exactly the assumption that “the trend continues”.",
      },
      { h2: "3. Beyond the wick of a rejection candle" },
      {
        p: "A candle with a long lower wick at support shows that sellers were pushed back. If you enter on that signal, put your stop below the tip of the wick: if price goes back there, the rejection didn't hold.",
      },
      { h2: "4. Based on volatility" },
      {
        p: "On an asset that moves a lot, a tight stop gets hit by normal market noise. The ATR (Average True Range) indicator measures the average size of a candle. Placing your stop one or two ATRs beyond your level keeps you from being taken out by a routine move.",
      },
      { tip: "If the stop in the right place is too far away for your account, don't move it closer: reduce your position size. Size adjusts to the stop, never the other way round." },
      { h2: "Costly mistakes" },
      {
        ul: [
          "Moving the stop further away as price gets close to it. That turns a small, planned loss into a big, unplanned one.",
          "Placing it right on a round number or on the level itself, where everyone else has theirs.",
          "Not using one at all “because it'll come back up”.",
        ],
      },
      {
        p: "A well-placed stop doesn't guarantee a winning trade. It guarantees that if the trade loses, the loss is the one you accepted before you went in.",
      },
    ],
  },
  {
    key: "ratio-gain-risque",
    slug: "risk-reward-ratio",
    title: "The risk/reward ratio, explained simply",
    description:
      "How to calculate a trade's risk/reward ratio from the entry, stop and target, and why it matters as much as your win rate.",
    date: "2026-10-28",
    body: [
      {
        p: "The risk/reward ratio compares what you stand to gain on a trade with what you're willing to lose. It's the simplest calculation in trading, and one of the most overlooked.",
      },
      { h2: "The calculation" },
      {
        p: "You need three prices: the entry, the stop and the target. The risk is the distance between the entry and the stop. The potential gain is the distance between the entry and the target. The ratio is the second divided by the first.",
      },
      {
        p: "Made-up example: entry at 100, stop at 95, target at 112. The risk is 5, the potential gain 12. The ratio is 12 ÷ 5 = **2.4**. For every €1 you risk, you're aiming for €2.40.",
      },
      { h2: "Why it matters as much as your win rate" },
      {
        p: "With a ratio of 2, you can be wrong two times out of three and still break even, before fees: one win at +2 covers two losses at -1. With a ratio of 0.5, on the other hand, you need to be right two times out of three just to avoid losing.",
      },
      {
        p: "That's why a trader who wins often can still lose money: if they cut their winners too early and let their losers run, their real ratio collapses.",
      },
      { tip: "Work out the ratio before you enter, never after. Once you're in a position, there's always a good reason to pull the target closer or push the stop further away." },
      { h2: "A good ratio isn't enough" },
      {
        p: "A target set very far away gives a flattering ratio on paper, but price has no reason to get there. The target should match a real level on the chart (the next resistance for a long), and the stop should sit where the idea is proven wrong. A ratio only means something if all three prices come from the chart.",
      },
      {
        ul: [
          "Below 1: the trade pays less than it risks. You need a very good reason to take it.",
          "Between 1.5 and 3: where most reasonable trades sit.",
          "Above 3: check that the target is realistic, not just far away.",
        ],
      },
      {
        p: "When no trade on the chart offers a decent ratio, the best decision is often to do nothing. Staying out is a position in its own right.",
      },
    ],
  },
  {
    key: "analyse-technique-ia",
    slug: "ai-technical-analysis",
    title: "AI technical analysis: what it does well, and where it falls short",
    description:
      "What an AI can read on a price chart, what it can't know, and how to use it as a second opinion rather than an oracle.",
    date: "2026-10-28",
    body: [
      {
        p: "AI models that can read images are now able to analyse a chart screenshot: spot the trend, draw levels, recognise a pattern. That's useful. It isn't magic, though, and it's worth knowing where the line is.",
      },
      { h2: "What it does well" },
      {
        ul: [
          "**Reading fast without getting tired**: market structure, highs and lows, reaction zones, in a few seconds and the same way every time.",
          "**Staying consistent**: it applies the same rules at 2 a.m. as at 10 a.m., with no fear of missing the move and no urge to win it back after a loss.",
          "**Laying out a full plan**: entry, stop, target, and the level that would invalidate the scenario. That's exactly what gets forgotten when you decide on emotion.",
          "**Saying when there's nothing to do**: a good tool can conclude “wait” or “don't trade” rather than force a signal.",
        ],
      },
      { h2: "What it can't know" },
      {
        ul: [
          "**The future.** No analysis, human or automated, knows what price will do. A 70% probability means the opposite scenario happens too, and often.",
          "**What isn't in the image.** A blurry screenshot, one that's zoomed in too far, or one without a readable price axis gives a less reliable reading.",
          "**Your situation.** It doesn't know your capital, your risk tolerance or your other positions.",
        ],
      },
      { tip: "Be wary of an analysis that always sounds sure of itself. Good analyses also tell you when the signal is weak or mixed." },
      { h2: "Using it as a second opinion" },
      {
        p: "The best way to use an AI analysis is to check it against your own. If it sees the same thing you do, your idea holds up. If it reaches the opposite conclusion, or says “wait”, that's the moment to ask yourself what you missed. It saves you time on the reading and forces you to put numbers on a plan before you click.",
      },
      {
        p: "That's the use Scanzivo was built for: you send a screenshot of your chart and get back a structured reading with a clear action plan, including when that plan is to do nothing. The decision, and the risk, remain yours.",
      },
    ],
  },
  {
    key: "capture-ecran-graphique",
    slug: "chart-screenshot-guide",
    title: "How to take a good chart screenshot for analysis",
    description:
      "On TradingView, Binance, MetaTrader or your phone: how to take a clear chart screenshot, what to show and what to avoid.",
    date: "2026-10-28",
    body: [
      {
        p: "Whether you're asking a friend, a forum or an AI for an opinion, the quality of the answer depends first on the screenshot. A good one takes thirty seconds to set up.",
      },
      { h2: "What needs to be visible" },
      {
        ul: [
          "**The price axis**, readable, on the right-hand side. Without it, nobody can give you a precise level.",
          "**The asset name and timeframe** (for example BTC/USDT, 4H), top left on most platforms.",
          "**Enough history**: at least 50 to 100 candles. You can't read a trend from ten candles.",
          "**Candles** rather than a plain line: they show the opens, closes and wicks.",
        ],
      },
      { h2: "What to avoid" },
      {
        ul: [
          "Zooming right in on the last few candles.",
          "Taking a photo of your screen with your phone: glare, angle, blur.",
          "A chart covered in indicators and drawings that hide the candles.",
          "An order window or pop-up on top of the chart.",
        ],
      },
      { h2: "Platform by platform" },
      { h3: "TradingView" },
      {
        p: "The camera icon at the top right lets you download a clean image of the chart, without the rest of the screen. Otherwise, a regular screenshot of the window works fine.",
      },
      { h3: "Binance and exchange apps" },
      {
        p: "Switch the chart to full screen (usually an icon with arrows), choose the timeframe, then take a screenshot on your phone. Turn your phone sideways to show more history.",
      },
      { h3: "MetaTrader 4 and 5" },
      {
        p: "Right-click the chart, then choose “Save As Picture”. On mobile, take a screenshot once the chart is in landscape mode.",
      },
      { h3: "On a computer" },
      {
        p: "Windows: press Windows + Shift + S, then select the chart area. Mac: Cmd + Ctrl + Shift + 4. Either way, the screenshot goes to your clipboard, ready to paste.",
      },
      { tip: "On Scanzivo, you can paste a copied screenshot straight onto the page with Ctrl+V (or Cmd+V), no file needed." },
      {
        p: "One sharp screenshot with the price axis and enough history beats ten rough ones. It's what makes precise levels possible instead of generalities.",
      },
    ],
  },
  {
    key: "ia-et-trading",
    slug: "ai-and-trading",
    title: "AI and trading: what artificial intelligence can really do for you",
    description:
      "Reading a chart, summing up the news, sticking to a plan: what AI brings to a retail trader, and what it will never do in your place.",
    date: "2026-10-28",
    body: [
      {
        p: "“Trading with AI” covers very different things: an assistant that comments on a chart, a tool that sums up the news, a bot that places orders on its own. For a retail trader, the useful question isn't whether AI is powerful, but at which step of your decision it actually helps.",
      },
      { h2: "Where it really helps" },
      { h3: "Reading a chart without telling yourself stories" },
      {
        p: "A model that can read images spots the trend, the reaction zones and the patterns in a few seconds. Above all, it does it the same way every time. After three losses in a row, you don't read the same chart you read on Monday morning.",
      },
      { h3: "Setting a plan before you click" },
      {
        p: "The weak spot of most retail traders isn't analysis, it's the lack of a plan: they get in without knowing where to get out. A tool that always gives you an entry, a stop, a target and the level that invalidates the idea makes you answer those questions before you buy, not after.",
      },
      { h3: "Sorting through the news" },
      {
        p: "A rate decision, an inflation print or an earnings report can wipe out any technical signal. An AI connected to the web can list the announcements coming up for your asset over the next few days, with sources, in seconds.",
      },
      { h2: "What it won't do for you" },
      {
        ul: [
          "**Predict the price.** It weighs scenarios. A scenario rated at 70% is, by definition, wrong about three times out of ten.",
          "**Decide how much to risk.** It doesn't know your capital, your other positions, or what you can afford to lose.",
          "**Stop you from clicking.** The best plan is useless if you move your stop at the first move against you.",
        ],
      },
      { tip: "Be wary of any service that sells AI as a money machine. Serious tools talk about probabilities, plans and risk, never guaranteed returns." },
      { h2: "Where to start" },
      {
        p: "The simplest way is to use it as a second opinion on trades you would have taken anyway. Analyse the chart yourself first, write down your plan, then compare it with the AI's reading. Where you agree, you gain confidence. Where you differ, you learn something: about the market, or about your own biases.",
      },
      {
        p: "That's the use Scanzivo was built for: one chart screenshot, a structured reading, a plan with numbers, and the decision that stays yours.",
      },
    ],
  },
  {
    key: "analyser-un-graphique-avec-chatgpt",
    slug: "analyze-a-chart-with-chatgpt",
    title: "Analysing a chart with ChatGPT: what works and what doesn't",
    description:
      "ChatGPT can read a chart screenshot. Here's what it does well, the mistakes to watch for, and how to phrase your request to get an answer you can use.",
    date: "2026-10-28",
    body: [
      {
        p: "General assistants like ChatGPT, Claude or Gemini accept images, so you can send them a screenshot of your chart and ask for an analysis. The result is often interesting. It's also very inconsistent, and it helps to know why.",
      },
      { h2: "What works well" },
      {
        ul: [
          "Describing the overall trend and structure (highs, lows, ranges).",
          "Recognising classic patterns: double top, triangle, channel.",
          "Explaining an indicator on screen, for instance what an RSI above 70 means.",
          "Answering your follow-up questions, which makes it a good learning tool.",
        ],
      },
      { h2: "What doesn't" },
      {
        ul: [
          "**Rough levels.** A general assistant sometimes misreads the price axis and quotes a support that doesn't exist, with great confidence.",
          "**Answers that change.** The same screenshot sent twice can lead to two different conclusions, because there's no fixed method.",
          "**Lukewarm answers.** Without precise instructions, the reply describes a lot and commits to little: “the market could go up or down”.",
          "**No complete plan.** Entry, stop, target and risk/reward only show up if you ask for them, and not always consistently.",
        ],
      },
      { h2: "How to phrase your request better" },
      {
        p: "A good part of the result depends on the question. Give the context and set the format of the answer. For example:",
      },
      {
        tip: "“Here is a BTC/USDT chart on the 4-hour timeframe. Give the trend, the two nearest supports and resistances with their price read from the axis, then a single preferred scenario with entry, stop, target and risk/reward ratio. If no trade has a ratio above 1.5, say so.”",
      },
      {
        p: "Then check every level it quotes on your own chart. If a price doesn't match anything visible, don't use it.",
      },
      { h2: "General assistant or specialised tool" },
      {
        p: "A general assistant is great for learning and asking questions. A specialised tool like Scanzivo applies the same method to every screenshot, draws the levels on your chart, works out the risk/reward ratio, and can conclude “wait” or “don't trade”. The first explains, the second hands you a plan. Either way, the decision is yours.",
      },
    ],
  },
  {
    key: "bots-de-trading-ia-arnaques",
    slug: "ai-trading-bot-scams",
    title: "“AI” trading bots: how to spot misleading promises",
    description:
      "Guaranteed returns, bots that “never lose”, paid private groups: the warning signs to know before you trust an AI trading bot with your money.",
    date: "2026-10-28",
    body: [
      {
        p: "“AI” has become a selling point for all sorts of trading services. Some are honest tools. Others use the same old tricks with a tech coating. A few signs help you tell them apart.",
      },
      { h2: "The warning signs" },
      {
        ul: [
          "**A promised return**, especially a number given in advance: “+5% a week”, “30% a month”. No tool can guarantee a return on the markets.",
          "**Screenshots of wins, never losses.** A track record that only shows winning trades is either incomplete or made up.",
          "**Urgency**: limited spots, an offer that ends tonight, “last chance”.",
          "**You're asked to deposit money** on a platform you don't know, or to hand over access to your brokerage account.",
          "**Paid referrals** at the heart of the model: you mostly earn by recruiting other people.",
        ],
      },
      { tip: "A serious analysis tool shows you how it reasons, states its limits and lets you decide. A service that “trades for you” without explaining anything is mostly asking you to trust it." },
      { h2: "What needs to be authorised" },
      {
        p: "In most countries, a service that manages your money, places orders for you or tells you personally what to buy is a regulated activity. It needs an authorisation from the financial regulator: the FCA in the UK, the SEC or CFTC in the United States, or the national authority in your EU country. Each of them keeps a public register you can search.",
      },
      {
        p: "Regulators also publish warning lists of firms offering investments without authorisation. A few seconds of searching on your regulator's website before you pay can save you a lot of trouble.",
      },
      { h2: "The right questions to ask" },
      {
        ol: [
          "Who is behind the service: an identifiable company, with a legal notice?",
          "Do I keep control of my money and my orders?",
          "Does the service talk about risk and losses, or only about gains?",
          "Can I stop easily, with no hidden fees?",
        ],
      },
      {
        p: "A tool that helps you analyse, without touching your money and without promising results, isn't doing any of these regulated activities: you decide and you place your own orders. That's the case with Scanzivo, which provides a chart reading for information purposes only and is not investment advice.",
      },
    ],
  },
  {
    key: "choisir-un-outil-ia-de-trading",
    slug: "choosing-an-ai-trading-tool",
    title: "Choosing an AI trading tool: 7 questions to ask",
    description:
      "Before paying for an AI trading tool, seven simple questions to find out whether it will help you improve or is mostly selling a promise.",
    date: "2026-10-28",
    body: [
      {
        p: "AI trading tools are multiplying, at every price. Rather than a ranking that would quickly go out of date, here are the questions that let you judge any of them in a few minutes.",
      },
      { h2: "1. What exactly does it do?" },
      {
        p: "Analysing a chart, sending signals, placing orders automatically: these are three different jobs, with three levels of risk. An analysis tool lets you decide. A bot that trades for you decides for you.",
      },
      { h2: "2. Does it show its reasoning?" },
      {
        p: "A “buy now” with no explanation teaches you nothing and gives you nothing to check. A good analysis says why: the trend, the levels, what would invalidate the scenario.",
      },
      { h2: "3. Can it say “do nothing”?" },
      {
        p: "A tool that finds a trade on every chart pushes you to overtrade. The best decision is often to wait. Check that the tool can say so.",
      },
      { h2: "4. Does it give a plan with numbers?" },
      {
        p: "Entry, stop, target and risk/reward ratio: without these four, an analysis is just an opinion. With them, you know before you enter how much you're risking, and for what.",
      },
      { h2: "5. Does it work with your tools?" },
      {
        p: "If you trade on TradingView, Binance or MetaTrader, the tool should fit your platform, not the other way round. A plain screenshot is often the most universal way in.",
      },
      { h2: "6. What does it promise?" },
      {
        p: "A win rate in big letters, monthly returns, “guaranteed” gains: walk away. An honest tool talks about probabilities and reminds you that trading carries a risk of losing capital.",
      },
      { h2: "7. What does it cost, and how do you stop?" },
      {
        p: "Look at the real price after the trial, what's included, and how to cancel. A subscription you can cancel in one click from your account is a good sign. A twelve-month commitment on a tool you haven't tested is much less so.",
      },
      {
        tip: "Test the tool on past charts where you already know what happened next. You'll quickly see whether it reads the market accurately or recites generalities.",
      },
      {
        p: "For transparency: Scanzivo is a chart analysis tool that works from screenshots. Here's how it answers these questions: it explains its reasoning, can conclude “wait” or “don't trade”, gives a plan with numbers, promises no gains, and the subscription can be cancelled at any time from your account.",
      },
    ],
  },
];
