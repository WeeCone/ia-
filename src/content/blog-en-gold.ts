import type { Article } from "./blog";

/** English guides on gold (XAU/USD) published on 2026-11-12; `key` is the French slug from blog-fr-gold.ts. */
export const ARTICLES_EN_GOLD: Omit<Article, "locale">[] = [
  {
    key: "comment-trader-l-or",
    slug: "how-to-trade-gold",
    title: "How to Trade Gold (XAU/USD): A Beginner's Guide",
    description:
      "What moves gold, how XAU/USD is quoted, what a gold CFD is, which sessions matter and a simple routine to get started without spreading yourself thin.",
    date: "2026-11-12",
    body: [
      {
        p: "Most retail traders who trade gold open a CFD on XAU/USD with a broker. They bet on the price of one ounce of gold, quoted in US dollars, going up or down, without owning any metal. It's accessible, but it's a fast market. Here is how it works and where to start.",
      },
      { h2: "What is XAU/USD?" },
      {
        p: "XAU is the code for gold, USD the code for the US dollar. The quoted price is for **one troy ounce of gold (about 31.1 grams) in dollars**. When the chart reads 2,400, one ounce is worth 2,400 dollars. Depending on the platform you'll see XAU/USD, XAUUSD or just GOLD. It's the same instrument.",
      },
      {
        p: "Because the price is in dollars, gold reacts to anything that moves the dollar. Remember this first: a stronger dollar usually weighs on gold, a weaker dollar usually helps it. The details are in [why gold goes up or down](/blog/why-gold-goes-up-or-down).",
      },
      { h2: "Ways to trade gold: CFDs, futures, ETFs" },
      {
        ul: [
          "**CFDs**: a contract with your broker on the price difference between opening and closing. You can buy or sell short, with leverage. This is the most common route for intraday trading.",
          "**Futures**: standardised contracts traded on an exchange, with large contract sizes. Better suited to advanced traders.",
          "**ETFs and physical gold**: for holding gold over the long term, without leverage. That isn't trading in the strict sense.",
        ],
      },
      {
        p: "This guide is about CFDs. They add flexibility, but also their own risks: leverage, spread and overnight financing. They are covered in [trading gold CFDs: the real risks](/blog/trading-gold-cfds-risks).",
      },
      { h2: "Why is gold so volatile?" },
      {
        p: "In a single session gold can move several dollars an ounce, and far more on news days. In price points that is a much wider range than most currency pairs. Two practical consequences: your stops need to be wider, so your positions need to be smaller, and mistakes cost you faster.",
      },
      {
        p: "Gold reacts mostly to US data (jobs, inflation), Federal Reserve decisions, the dollar, real interest rates and geopolitical tension. The calendar matters as much as the chart. See [the economic calendar](/blog/economic-calendar).",
      },
      { h2: "The sessions to know" },
      {
        p: "Gold trades almost around the clock, but activity changes a lot through the day. The Asian session is often quiet, London opens at 8:00 local time, and US data usually lands at 8:30 am New York time. The biggest moves tend to cluster from the London open to the late New York session. The details are in [the best time to trade gold](/blog/best-time-to-trade-gold).",
      },
      { h2: "A simple routine for beginners" },
      {
        ol: [
          "**Before the session**, check the calendar. A major US release changes the plan for the day.",
          "**Read the direction on the 1-hour chart**: trend, recent highs and lows, zones where price has already reacted. [How to read a trading chart](/blog/how-to-read-a-trading-chart) covers the basics.",
          "**Mark your levels**: old highs and lows, and round numbers (see [round numbers on gold](/blog/gold-round-numbers)).",
          "**Set the plan before you enter**: entry, stop, target. If the reward-to-risk is poor, skip it ([risk-reward ratio](/blog/risk-reward-ratio)).",
          "**Size the trade from the stop**, not from how you feel: see the [gold lot size calculator guide](/blog/gold-lot-size-calculator).",
          "**Log the result**, whatever it is, so you understand what you actually do.",
        ],
      },
      {
        p: "The detailed intraday version of this routine is in [a gold intraday routine: 1H, 15m, 5m](/blog/gold-intraday-routine).",
      },
      { h2: "Common beginner mistakes" },
      {
        ul: [
          "**Taking too big a position** because the ounce price looks small next to the real volatility.",
          "**Trading right through a release** you never saw on the calendar.",
          "**Entering right on a round number** with a stop tucked just behind it. Wicks win.",
          "**Piling on trades** to win back a loss.",
          "**Changing method every week.** Without a series of comparable trades you can't tell what works.",
        ],
      },
      {
        p: "Start on a demo account with very little to watch: one instrument, two or three timeframes, one routine. When you want a second opinion, you can also upload a screenshot of your chart to the [AI gold analysis](/gold) and compare its read with yours.",
      },
      {
        p: "This guide is educational content and is not investment advice. CFDs are complex instruments and carry a high risk of losing money, mainly because of leverage. Only risk what you can afford to lose.",
      },
    ],
  },
  {
    key: "meilleures-heures-pour-trader-l-or",
    slug: "best-time-to-trade-gold",
    title: "Best Time to Trade Gold: Sessions in New York, London and UTC",
    description:
      "Asian, London and New York sessions, the overlap, and the US data release times: when gold moves most, in New York, London and UTC time, and when to stay out.",
    date: "2026-11-12",
    body: [
      {
        p: "Gold tends to move most from the London open, at 8:00 am London time, through the end of the US session. The busiest stretch is usually the London / New York overlap, roughly 8:30 am to 11:30 am New York time (13:30 to 16:30 UTC in winter). The Asian night is generally quieter, and more prone to false moves.",
      },
      { h2: "Gold trading hours in New York, London and UTC" },
      {
        p: "These times are approximate and can shift by an hour for a few weeks a year, when the US and Europe change their clocks on different dates. Check them on your platform during those weeks. The UTC figures below are for winter time in New York.",
      },
      {
        ul: [
          "**Asian session (Tokyo, Sydney)**: about 00:00 to 08:00 UTC, which is 7:00 pm to 3:00 am in New York. Often a tight range.",
          "**London session**: opens at 8:00 am London time (08:00 UTC in winter) and closes around 4:30 pm. The first real burst of volume of the day.",
          "**New York session**: US data usually comes out at **8:30 am New York time (13:30 UTC)**, US stocks open at 9:30 am, and the session fades in the late afternoon.",
          "**London / New York overlap**: about 8:30 to 11:30 am New York time (13:30 to 16:30 UTC). Lots of participants, so bigger moves.",
        ],
      },
      { h2: "Why the London open matters" },
      {
        p: "Overnight, gold often builds a range: a high and a low that price keeps circling. At the London open that range is frequently broken, one way or the other. The break sometimes sets the direction for the early part of the day, but it can also be a false start that price reverses within the hour.",
      },
      {
        p: "A simple reference: mark the high and low of the Asian session on your chart. Watch how price behaves when it reaches them, instead of guessing the breakout. What you want is a clean close beyond the range, then a pullback that holds the level.",
      },
      { h2: "8:30 am New York: US data time" },
      {
        p: "Many US releases come out at 8:30 am New York time: jobs (NFP), inflation (CPI), retail sales, weekly jobless claims. Gold can react within seconds, and spreads widen. Fed rate decisions usually come at 2:00 pm New York time. Always check [the economic calendar](/blog/economic-calendar) before opening a position.",
      },
      {
        p: "How to behave around these releases is covered separately: [trading gold on NFP, CPI and Fed days](/blog/trading-gold-nfp-cpi-fed).",
      },
      { h2: "When to avoid trading gold" },
      {
        ul: [
          "**Just before and just after a major release**: wider spreads, moves in both directions.",
          "**Late in the US session and at the Friday close**: thinner liquidity, and spreads can widen.",
          "**US public holidays**: low volume, unreliable breakouts.",
          "**Sunday evening, at the weekly open**: price gaps against Friday's close are possible.",
        ],
      },
      { h2: "Which window suits your schedule?" },
      {
        p: "You don't need to sit at the screen all day. A fixed window you know well beats a vague one.",
      },
      {
        ul: [
          "**London morning (8:00 to 11:00 am London time)**: read the Asian range and the reaction at the London open. Works if you have to go to work afterwards.",
          "**New York morning (8:30 to 11:30 am New York time)**: the busiest and fastest part of the day. Only for people who can watch their positions closely.",
          "**New York evening**: the market often calms down, unless the Fed is speaking. A position left open overnight is exposed to gaps and financing costs.",
        ],
      },
      { h2: "Match your timeframe to the session" },
      {
        p: "In a quiet market a 5-minute chart is mostly noise. In an active one it becomes useful for fine-tuning the entry. The logic is in [choosing a timeframe](/blog/choosing-a-timeframe) and put into practice in the [1H, 15m, 5m routine](/blog/gold-intraday-routine).",
      },
      {
        p: "The [gold-specific analysis tool](/gold) takes sessions into account: the Asian range broken at London, the 8:30 am releases. If you upload a screenshot, take it at the moment you're looking at the market, because that is what will be read.",
      },
      {
        p: "This guide is educational content and is not investment advice. CFDs are complex instruments and carry a high risk of losing money. Even at the best times of day, a loss is still possible.",
      },
    ],
  },
  {
    key: "pourquoi-l-or-monte-ou-baisse",
    slug: "why-gold-goes-up-or-down",
    title: "Why Gold Goes Up or Down: The Factors to Know",
    description:
      "The dollar, real yields, the Fed, inflation, central bank buying, geopolitics and ETFs: what moves the price of gold and how to factor it into your trading.",
    date: "2026-11-12",
    body: [
      {
        p: "The price of gold moves mostly with the US dollar and with real interest rates, meaning rates after inflation. When the dollar or real yields fall, gold tends to rise. When they rise, gold tends to fall. Geopolitical tension, central bank buying and ETF flows add to the picture. These are tendencies, not laws.",
      },
      { h2: "The US dollar: the first thing to check" },
      {
        p: "Gold is priced in dollars. When the dollar strengthens, it takes fewer dollars to buy the same value, so gold in dollars often falls. A weaker dollar makes an ounce cheaper for buyers outside the US, which supports demand. The link is common but not permanent. Some days gold and the dollar rise together.",
      },
      { h2: "Real interest rates" },
      {
        p: "Gold pays no interest and no dividend. When safe assets pay a lot after inflation, holding gold has a high opportunity cost. When real yields fall or turn negative, gold looks more attractive. Analysts cite this more than any other underlying driver.",
      },
      {
        p: "In practice, watch the US 10-year Treasury yield and expectations for rate cuts or hikes. A sharp rise in yields usually weighs on gold in the short term.",
      },
      { h2: "The Federal Reserve and its decisions" },
      {
        p: "The Fed sets US interest rates and signals where they are heading. The market reacts to the wording as much as to the number. A softer tone than expected often supports gold, a firmer one pushes it down. Meeting dates are on the calendar: see [the economic calendar](/blog/economic-calendar) and [trading gold on NFP, CPI and Fed days](/blog/trading-gold-nfp-cpi-fed).",
      },
      { h2: "Inflation: less simple than it sounds" },
      {
        p: "People often say gold protects against inflation. Over the long run the idea has its supporters. Over the short run it's more nuanced. A hot inflation print can lift gold, or push it down if it makes the Fed keep rates high. What matters for the price is the number **compared with expectations**, and how the central bank is expected to respond.",
      },
      { h2: "Central banks" },
      {
        p: "Several central banks hold gold in their reserves, and their buying or selling affects demand. Their positions are published with a delay, by organisations such as the World Gold Council. This gives background context, rarely a signal for an entry at a particular hour.",
      },
      { h2: "Geopolitics and risk aversion" },
      {
        p: "Gold is seen as a safe haven. In uncertain times (conflict, financial stress, political tension) demand can rise and the price can jump. But the effect often fades when the tension eases, and it comes without warning: a sharp reversal is possible.",
      },
      { h2: "ETFs and physical demand" },
      {
        p: "Gold-backed ETFs hold more or less metal depending on investor inflows and outflows. Sustained inflows tend to point to firm demand. Jewellery and physical investment demand, notably in Asia, also matter, with their own seasonal patterns.",
      },
      { h2: "How to use this when you trade" },
      {
        ol: [
          "**Know what is expected.** Look at the week's calendar and note the US releases.",
          "**Check the backdrop.** Have the dollar and yields been rising or falling for a few days? Is gold moving with them, or against them?",
          "**Let the chart decide the entry.** The backdrop gives you a bias, not an entry point. Levels and structure (see [support and resistance](/blog/support-and-resistance)) do the rest.",
          "**Be wary of stories told after the fact.** Explaining a move once it has happened is easy. Predicting it is not.",
        ],
      },
      {
        tip: "A market can rise while all the news is bad, and the other way round. Don't trade a macro opinion against a chart that says the opposite.",
      },
      {
        p: "To keep the big picture, write a few lines before the session: the direction of the dollar, the trend in yields, the next release. Scanzivo's [gold analysis](/gold), with its news section, cross-checks these points against your screenshot. It can be wrong like any other read. It helps you structure your thinking, it doesn't predict.",
      },
      {
        p: "This guide is educational content and is not investment advice. CFDs are complex instruments and carry a high risk of losing money, and no macroeconomic explanation guarantees where the price goes next.",
      },
    ],
  },
  {
    key: "taille-de-lot-xau-usd",
    slug: "gold-lot-size-calculator",
    title: "Gold Lot Size Calculator (XAU/USD): How to Work Out Your Position",
    description:
      "Contract size, value per dollar move, and a worked example with 1% risk on a dollar account: how to calculate your lot size on gold, and why you must check with your broker.",
    date: "2026-11-12",
    body: [
      {
        p: "To calculate your lot size on gold: amount you accept to lose ÷ (stop distance in dollars × ounces per lot). At many brokers, 1 lot of gold is 100 ounces, but that isn't universal. **Contract size and pip value depend on the broker. Check them on your platform before doing any calculation.**",
      },
      { h2: "What to know before you calculate" },
      {
        ul: [
          "**Contract size**: how many ounces 1 lot represents. Often 100, sometimes 1,000 or less, depending on the instrument and broker.",
          "**Minimum lot**: often 0.01 lot, sometimes higher.",
          "**Account currency**: if your account isn't in dollars, profit and loss are converted at the current exchange rate.",
          "**What a pip means on gold**: it varies. Some brokers call 0.10 dollars a pip, others call 0.01 dollars a point. To avoid confusion, think in **dollars of price movement**.",
        ],
      },
      {
        p: "On your platform, the instrument page (often called contract specifications) shows these values. Another check: open a demo trade at the minimum lot, imagine price moving 1 dollar, and look at the change in profit it displays.",
      },
      { h2: "The formula" },
      {
        p: "With a 100-ounce contract, a 1 dollar move in price changes your result by 100 dollars per lot. The general formula is the one from [position size](/blog/position-size):",
      },
      {
        ol: [
          "**Amount at risk** = account balance × risk percentage.",
          "**Loss per lot** = stop distance in dollars × ounces per lot.",
          "**Lot size** = amount at risk ÷ loss per lot.",
        ],
      },
      { h2: "Worked example (illustrative)" },
      {
        p: "The numbers below are **an example only**: not a recommendation and not a market price. Assumptions: a 5,000 dollar account, 1% risk, a 100-ounce contract per lot, and a stop 10 dollars from entry. Your broker's contract may differ.",
      },
      {
        ul: [
          "Amount at risk: 5,000 dollars × 1% = **50 dollars**.",
          "Loss on 1 lot if the stop is hit: 10 dollars × 100 ounces = 1,000 dollars.",
          "Lot size: 50 ÷ 1,000 = **0.05 lot**.",
          "If the stop is hit, the loss is about 50 dollars, in line with the plan. If the result isn't a round number, round **down**.",
        ],
      },
      {
        p: "With a wider stop, the same method gives a smaller position. Stop 20 dollars away: 50 ÷ 2,000 = 0.025 lot, so 0.02 lot after rounding down. The stop dictates the size, never the other way round.",
      },
      { h2: "What if the result is below the minimum lot?" },
      {
        p: "On a small account the maths can give 0.008 lot when the minimum is 0.01. Opening anyway means risking more than planned. The honest options: tighten the stop distance if the chart allows it, look for a broker with a smaller contract, or skip the trade. Don't force the size just to get in.",
      },
      { h2: "Don't forget spread and slippage" },
      {
        p: "Your real loss can exceed the theoretical stop. The spread is added on entry and exit, and during a release price can jump over your stop level. Keep a small margin in your calculation and avoid heavy positions around data ([NFP and Fed days](/blog/trading-gold-nfp-cpi-fed)).",
      },
      { h2: "Where do you put the stop before calculating?" },
      {
        p: "The stop goes where the chart says, not where your risk budget would like it. On gold it should usually sit beyond recent wicks and beyond the level that would invalidate your idea. See [where to place a stop-loss](/blog/where-to-place-a-stop-loss). A 3 dollar stop in a market that moves 10 dollars in a few minutes will almost always be hit.",
      },
      {
        p: "The [AI gold analysis](/gold) suggests a plan with entry, stop and targets from your screenshot. The lot size is still yours to calculate, with your broker's values and your own risk percentage.",
      },
      {
        p: "This guide is educational content and is not investment advice. Worked examples are illustrative. CFDs carry a high risk of losing money, and losses can exceed the planned amount in a fast market.",
      },
    ],
  },
  {
    key: "trader-l-or-cfd-risques",
    slug: "trading-gold-cfds-risks",
    title: "Trading Gold CFDs: Leverage, Spread, Swap and the Real Risks",
    description:
      "What a gold CFD is, how leverage, spread, overnight swap and margin calls work, and what you can really lose. No promises of profit.",
    date: "2026-11-12",
    body: [
      {
        p: "A gold CFD is a contract with a broker on the price movement of XAU/USD. It lets you bet on a rise or a fall using leverage. Leverage magnifies gains and losses alike: you can lose all or a large part of your deposit quickly. Many retail accounts lose money trading these products.",
      },
      { h2: "What is a gold CFD?" },
      {
        p: "CFD stands for contract for difference. You own no gold bar. You and the broker exchange the difference between the opening price and the closing price. If you buy at 2,400 and close at 2,410, you make ten dollars per ounce of the contract. If price falls to 2,390, you lose those ten dollars. The reverse applies to a short sale.",
      },
      { h2: "Leverage: an amplifier in both directions" },
      {
        p: "Leverage lets you open a position much larger than your deposit. With 20:1 leverage, a 20,000 dollar position needs only about 1,000 dollars of margin. But the **loss is calculated on the full size of the position**, not on the margin. A 1% move against you costs 200 dollars in this example, which is 20% of the margin you put up.",
      },
      {
        p: "Maximum leverage for retail clients is capped in some jurisdictions, but even the cap is high for a market as fast as gold. Your protection is your position size, not the leverage on offer. See the [gold lot size calculator guide](/blog/gold-lot-size-calculator).",
      },
      { h2: "The spread: a cost on entry" },
      {
        p: "The spread is the gap between the buy price and the sell price. Every trade starts slightly in the red. On gold it varies: tight in the middle of a busy session, wider at the open, at the Friday close and around releases. If you trade small moves, it weighs heavily on your results. Look at it before you click.",
      },
      { h2: "Swap: the cost of holding overnight" },
      {
        p: "If you hold a position past your broker's daily rollover, a financing charge (the swap) is debited or credited depending on direction and prevailing rates. It's often negative for both directions. It's small for a single night, but adds up on positions held for weeks. Weekends are usually charged triple on one weekday, which depends on the broker. Check its conditions.",
      },
      { h2: "Margin calls and forced closure" },
      {
        p: "Your broker requires your equity to cover the open losses on your positions. When equity falls below a set level, you may get a margin call, asking you to deposit funds, or your positions may be **closed automatically** (a stop-out), often at the worst moment. Some jurisdictions give retail clients negative balance protection. That doesn't mean the account can't be wiped out.",
      },
      { h2: "Gaps and slippage" },
      {
        p: "A stop-loss isn't a guarantee of exiting at a precise price. If the market jumps over your level (a release, the Sunday reopening), the order fills at the next available price, sometimes much further away. That's slippage. Some brokers offer guaranteed stops, usually at an extra cost. More on releases in [trading gold on NFP, CPI and Fed days](/blog/trading-gold-nfp-cpi-fed).",
      },
      { h2: "The risks that come from you" },
      {
        ul: [
          "**Oversized positions**: the main reason accounts blow up.",
          "**Refusing to take a loss**: moving the stop further away turns a small loss into a big one.",
          "**Overtrading**: more trades means more spread paid and more mistakes.",
          "**Revenge trading** after a losing streak.",
          "**Outside promises**: be wary of any signal seller, bot or course that advertises steady profits ([AI trading bot scams](/blog/ai-trading-bot-scams)).",
        ],
      },
      { h2: "How to limit the damage" },
      {
        ol: [
          "**Risk a small percentage per trade**, often between 0.5% and 1% of your account ([position size](/blog/position-size)).",
          "**Always set a stop** at a logical place on the chart ([where to place a stop-loss](/blog/where-to-place-a-stop-loss)).",
          "**Require a sensible reward-to-risk** before you enter ([risk-reward ratio](/blog/risk-reward-ratio)).",
          "**Avoid major releases** while you're learning.",
          "**Start on demo**, then with a small amount whose loss won't change your life.",
        ],
      },
      {
        p: "Analysis tools, including the [AI gold analysis](/gold), don't remove these risks. They help you read a chart and structure a plan. They don't predict the price.",
      },
      {
        p: "This guide is educational content and is not investment advice. CFDs are complex instruments and carry a high risk of losing money because of leverage. A majority of retail accounts lose money trading them.",
      },
    ],
  },
  {
    key: "trader-l-or-nfp-fed",
    slug: "trading-gold-nfp-cpi-fed",
    title: "Trading Gold on NFP, CPI and Fed Days",
    description:
      "False moves, widening spreads and slippage: how to approach gold on NFP, CPI and Fed decision days, and why waiting is often a valid choice.",
    date: "2026-11-12",
    body: [
      {
        p: "On NFP, CPI or Fed decision days, gold can move many dollars in a few minutes, up and then down. Spreads widen and stops fill further away than planned. For most traders, the best approach is not to be in a position when the figure comes out, and to wait for the market to settle.",
      },
      { h2: "Which releases are we talking about?" },
      {
        ul: [
          "**NFP (Non-Farm Payrolls)**: the US jobs report, usually published on the first Friday of the month at 8:30 am New York time (13:30 UTC in winter).",
          "**CPI**: the US consumer price index, a measure of inflation, published monthly, often also at 8:30 am New York time.",
          "**Fed decisions (FOMC)**: the rate announcement at about 2:00 pm New York time, followed by a press conference that can move the market as much as the decision.",
          "**Other data**: PCE, retail sales, activity surveys, jobless claims. They are usually less dramatic, but gold sometimes reacts.",
        ],
      },
      {
        p: "Exact dates and times are on [the economic calendar](/blog/economic-calendar). Check them every week, since they can change.",
      },
      { h2: "Why gold reacts so strongly" },
      {
        p: "These figures shift expectations for US interest rates, and so the dollar and real yields, two key drivers of gold ([why gold goes up or down](/blog/why-gold-goes-up-or-down)). Price doesn't react to the number alone, but to its gap versus forecasts. A strong figure that was already expected may move nothing.",
      },
      { h2: "The traps in the first minutes" },
      {
        ul: [
          "**Widening spread**: the gap between buy and sell can be multiplied, making any entry expensive.",
          "**Slippage**: your stop fills at the price available, not the one you chose.",
          "**False moves**: a violent first spike is often partly reversed in the next few minutes. Entering that spike means buying the high or selling the low.",
          "**Pending orders**: an order on each side (the straddle approach) can trigger in both directions and lose twice.",
          "**Vanishing liquidity**: price jumps from one level to another with no trades in between.",
        ],
      },
      { h2: "Three reasonable ways to handle these days" },
      {
        ol: [
          "**Stay out.** Have no open position at release time and place no new order for the next few minutes. It's the simplest option, and it's not a weakness.",
          "**Cut your size.** If you hold a position, halve it or more and use a wider stop than usual, while accepting that the loss is still calculated ([gold lot size calculator guide](/blog/gold-lot-size-calculator)).",
          "**Wait for the reaction, then read the chart.** Let the first 15 to 30 minutes pass, see where the market has settled, then look for a retest of a broken level on the 5 or 15-minute chart ([choosing a timeframe](/blog/choosing-a-timeframe)).",
        ],
      },
      {
        tip: "If you have a profit running into the release, you can lock it in by closing, or by moving the stop up. Either way, decide beforehand, not during.",
      },
      { h2: "What if you're caught in the move?" },
      {
        p: "Don't move your stop further away to give the trade room after the release. The plan was made beforehand, with a maximum accepted loss. If the stop is hit, the loss is what it is. Take a break before the next trade. Decisions made on adrenaline are rarely the best ones.",
      },
      { h2: "Preparing the week" },
      {
        ul: [
          "On Sunday, list the week's releases and note their times.",
          "Mark the key gold levels before the release (see [round numbers on gold](/blog/gold-round-numbers)).",
          "Decide in advance whether you will trade, cut size or stay out that day.",
          "After the release, compare the actual move with your scenario. It builds your experience.",
        ],
      },
      {
        p: "When you upload a screenshot to the [gold analysis](/gold) on a release day, the tool flags the risk of false breakouts and may conclude that waiting is best. Wait is a valid answer, not a failure.",
      },
      {
        p: "This guide is educational content and is not investment advice. CFDs are complex instruments and carry a high risk of losing money, especially around economic releases.",
      },
    ],
  },
  {
    key: "niveaux-ronds-or",
    slug: "gold-round-numbers",
    title: "Gold Support and Resistance: Round Numbers and Key Levels",
    description:
      "How to find the levels that matter on gold: multiples of 50 and 100 dollars, old highs and lows, zones rather than lines, and how to place your stop and target.",
    date: "2026-11-12",
    body: [
      {
        p: "On gold, the levels that matter are multiples of 50 and 100 dollars (2,400, 2,450, 2,500…), old highs and lows, and zones where price has reacted several times. Draw them as zones a few dollars wide, not as perfect lines.",
      },
      { h2: "Why round numbers matter" },
      {
        p: "Traders think in round numbers. Many place targets, pending orders and stops on or near 2,400, 2,450 or 2,500. Orders pile up around those prices, and the market hesitates, bounces or pushes through in jerks. It isn't magic. It's self-fulfilling behaviour, and it stays visible on gold because the price is expressed in simple numbers.",
      },
      {
        p: "The 100 dollar levels stand out most, the 50 dollar levels come next. Multiples of 10 dollars can act as stepping stones intraday, but they carry less weight. Don't look for meaning in every round number: a level the market has never touched or respected is not special.",
      },
      { h2: "Old highs and lows" },
      {
        p: "The most reliable levels are the ones price drew itself. An old peak becomes resistance, an old trough becomes support, and once broken they can swap roles. The more often a level has been tested, and the more visible it is on a higher timeframe, the more it matters. The basics are in [support and resistance](/blog/support-and-resistance).",
      },
      {
        ul: [
          "**Previous day's high and low**: closely watched intraday reference points.",
          "**Asian session high and low**: the edges of the range before the London open ([best time to trade gold](/blog/best-time-to-trade-gold)).",
          "**Weekly high and low**: context levels.",
          "**All-time highs**: when price approaches them, reactions are often sharp and fast.",
        ],
      },
      { h2: "Zones, not lines" },
      {
        p: "A level is rarely respected to the dollar. Gold often pokes through by a few dollars before turning. So draw a rectangle that covers the wicks, not a thin line. On a 1-hour chart a zone 5 to 10 dollars wide is common. What you watch is where candles were rejected and how they close ([Japanese candlesticks](/blog/japanese-candlesticks)).",
      },
      { h2: "When a round number and a technical level overlap" },
      {
        p: "The most interesting case is confluence: a round number that coincides with an old high or low. Several reasons to react at the same spot strengthen the zone. If 2,450 is also last week's high, it deserves close attention. It's still a probability, not a certainty.",
      },
      { h2: "How to use levels in your plan" },
      {
        ol: [
          "**Mark the zones** on the 1-hour chart: two or three levels above price, two or three below.",
          "**Choose the scenario**: a bounce off support, a breakout and retest of resistance, or waiting.",
          "**Put the stop beyond the zone**, not inside it and not exactly on the round number. A 2,450 zone can be pierced up to 2,453 before price turns back, and a stop at 2,449.50 gets hit for nothing ([where to place a stop-loss](/blog/where-to-place-a-stop-loss)).",
          "**Put the target just before the next level**, rather than on it. Plenty of take-profit orders sit there, and price can turn a few dollars short.",
          "**Check the reward-to-risk** once those numbers are down ([risk-reward ratio](/blog/risk-reward-ratio)).",
        ],
      },
      { h2: "Common mistakes" },
      {
        ul: [
          "**Drawing too many levels.** The chart becomes unreadable. Keep the most obvious ones.",
          "**Entering on the first touch** with no sign of a reaction. Waiting for a rejection candle or a close beyond the level cuts false starts.",
          "**Ignoring context.** A round number counts for little against a major US release ([trading gold on NFP and Fed days](/blog/trading-gold-nfp-cpi-fed)).",
          "**Mixing timeframes** without knowing which one rules. The 1-hour level beats the 5-minute one.",
        ],
      },
      {
        p: "The [AI gold analysis](/gold) marks levels on your screenshot with round numbers in mind. You can compare with your own zones: if they differ a lot, ask yourself why before you trade.",
      },
      {
        p: "This guide is educational content and is not investment advice. No level is guaranteed to hold. CFDs carry a high risk of losing money.",
      },
    ],
  },
  {
    key: "strategie-or-1h-15m-5m",
    slug: "gold-intraday-routine",
    title: "A Gold Intraday Routine: 1H, 15m and 5m Timeframes",
    description:
      "Direction on the 1-hour, plan on the 15-minute, entry on the 5-minute: a multi-timeframe routine for gold explained step by step, with its limits.",
    date: "2026-11-12",
    body: [
      {
        p: "This routine works from the biggest frame to the smallest. You read direction on the 1-hour chart, build the plan on the 15-minute chart and look for the entry on the 5-minute chart. The aim is to avoid taking a 5-minute signal that runs against everything the 1-hour chart shows. It is not a guaranteed winning method. It's a working framework.",
      },
      { h2: "Why three timeframes?" },
      {
        p: "A single chart gives a partial picture. The 5-minute chart is noisy on gold and can show a breakout that is just one more leg in a 1-hour downtrend. The 1-hour chart gives context but not a precise entry. Together they answer three questions: where is the market going, where are the levels, when do I act. See also [choosing a timeframe](/blog/choosing-a-timeframe).",
      },
      { h2: "Step 0: before you open the chart" },
      {
        ul: [
          "Check the calendar: a US release at 8:30 am New York time? A Fed decision this afternoon? ([economic calendar](/blog/economic-calendar)).",
          "Decide your trading window ([best time to trade gold](/blog/best-time-to-trade-gold)).",
          "Set your maximum risk per trade and for the day, for example 1% per trade and three losses at most before you stop.",
        ],
      },
      { h2: "Step 1: direction on the 1-hour chart" },
      {
        p: "Look at the last few days. Are highs and lows rising, falling, or stuck in a range? Where has price reacted more than once? Draw two or three zones above and below ([round numbers and key levels on gold](/blog/gold-round-numbers)).",
      },
      {
        p: "By the end of this step you should be able to write one sentence: “Uptrend, price is under the 2,450 resistance, support at 2,400.” If you can't, the market isn't readable. Skip it. That's a valid answer.",
      },
      { h2: "Step 2: the plan on the 15-minute chart" },
      {
        p: "On the 15-minute chart, refine the levels that matter for the day and choose a preferred scenario, plus an alternative. For example: “If price closes above 2,432, I look for a buy with a stop under 2,418 and a target near 2,450. If 2,418 breaks, I drop the idea.” The numbers here are an example, not advice.",
      },
      {
        ul: [
          "**Write the entry conditions** before price gets there.",
          "**Set the stop** beyond the zone, not right on it ([where to place a stop-loss](/blog/where-to-place-a-stop-loss)).",
          "**Work out the reward-to-risk.** Below 1.5 or 2, the idea deserves a second look ([risk-reward ratio](/blog/risk-reward-ratio)).",
          "**Calculate the lot size** from the stop distance ([gold lot size calculator guide](/blog/gold-lot-size-calculator)).",
        ],
      },
      { h2: "Step 3: the entry on the 5-minute chart" },
      {
        p: "The 5-minute chart is for timing, not direction. Wait for your condition to happen: a close above a level, a retest that holds, a rejection candle at support ([Japanese candlesticks](/blog/japanese-candlesticks)). If price churns under the zone without closing above it, you wait.",
      },
      {
        p: "Don't enter in the middle of a candle that's running away. Missing a trade beats chasing a price that has already gone: the stop ends up too far away and the reward-to-risk gets worse.",
      },
      { h2: "Step 4: managing the trade" },
      {
        ul: [
          "Once in, leave the stop alone, except to move it in the direction of the trade under rules set in advance.",
          "Take part of the profit at a logical level if your plan says so.",
          "Close before a major release if you didn't plan to hold through it ([NFP, CPI and Fed days](/blog/trading-gold-nfp-cpi-fed)).",
          "Log the trade with a screenshot, win or lose. It's your material for improving.",
        ],
      },
      { h2: "The limits of this routine" },
      {
        ul: [
          "**It predicts nothing.** The preferred scenario is often wrong, and the stop exists for that.",
          "**It needs discipline.** Skipping a step or moving a stop cancels the point of the method.",
          "**It's only worth something once tested**: over at least several dozen trades on demo or in small size, with a journal, before you draw any conclusion.",
          "**It fits release days badly.** The usual structure gets scrambled.",
          "**Costs matter.** Spread and swap eat into results, especially on small targets ([CFD risks](/blog/trading-gold-cfds-risks)).",
        ],
      },
      {
        p: "This is the logic the [gold analysis](/gold) follows: one screenshot per timeframe, from direction to entry, with “wait” as a possible conclusion. You can also do it by hand and use the tool to compare. For clear screenshots, see [how to take a good chart screenshot](/blog/chart-screenshot-guide).",
      },
      {
        p: "This guide is educational content and is not investment advice. The figures quoted are examples. CFDs are complex instruments and carry a high risk of losing money.",
      },
    ],
  },
  {
    key: "analyser-l-or-avec-l-ia",
    slug: "analysing-gold-with-ai",
    title: "Analysing Gold with AI: What It Can Read and What It Can't Do",
    description:
      "What an AI can read on an XAU/USD chart (trend, levels, plan), what it can't do (predict, see live prices) and how to use it without fooling yourself.",
    date: "2026-11-12",
    body: [
      {
        p: "An AI can read a screenshot of an XAU/USD chart the way a trader would: spot the trend, mark levels, describe candles and suggest a plan with entry, stop and targets. It can't predict the price, it only sees the image you give it, and it doesn't replace your judgement or your risk management.",
      },
      { h2: "What an AI reads on a gold chart" },
      {
        ul: [
          "**Trend and structure**: a sequence of highs and lows, a range or a breakout.",
          "**Levels**: zones where price reacted, old highs and lows, round numbers ([round numbers on gold](/blog/gold-round-numbers)).",
          "**Candles and patterns**: rejection wicks, engulfing candles, continuation patterns ([Japanese candlesticks](/blog/japanese-candlesticks), [chart patterns](/blog/chart-patterns)).",
          "**Visible indicators**: RSI, moving averages, if they are on the screenshot ([RSI](/blog/rsi-indicator)).",
          "**A numbered plan**: entry, stop, targets and the level that would invalidate the idea.",
        ],
      },
      {
        p: "The main value is saving time and getting a second, reasoned read you can set against your own. The general principle is explained in [AI technical analysis](/blog/ai-technical-analysis).",
      },
      { h2: "What an AI can't do" },
      {
        ul: [
          "**Predict.** It weighs scenarios. The preferred scenario can be wrong, and a displayed percentage is not a guaranteed statistical probability.",
          "**See live prices.** It only knows your screenshot. If price has moved since, the read is out of date.",
          "**Read an unreadable image.** A cropped price axis, a cluttered chart or a blurry capture degrade the answer ([taking a good screenshot](/blog/chart-screenshot-guide)).",
          "**Know your situation**: your capital, risk tolerance, costs, broker. It places no orders and manages none of your money.",
          "**Replace discipline.** A good read followed by an oversized position is still a bad idea.",
        ],
      },
      { h2: "Why gold needs its own settings" },
      {
        p: "Gold isn't a stock or a currency pair like the others. It's very fast, it reacts hard to US data, and round numbers play a visible role. A generic read may place a stop too tight or ignore an upcoming release. That's why an analysis tuned for gold makes sense ([how to trade gold](/blog/how-to-trade-gold)).",
      },
      { h2: "Scanzivo's gold analysis" },
      {
        p: "Scanzivo offers a [gold-specific analysis](/gold). You upload a screenshot of your XAU/USD chart, from any platform (TradingView, MetaTrader, cTrader or a broker app). The analysis follows instructions written for gold: round numbers, sessions, US data, stops placed beyond recent wicks. The AI model itself is the same one used for other assets. The three-screenshot routine is described in [the 1H, 15m, 5m routine](/blog/gold-intraday-routine).",
      },
      {
        p: "What the service doesn't do: it doesn't predict the price, place orders, send signals or give personalised investment advice.",
      },
      { h2: "How to use it sensibly" },
      {
        ol: [
          "**Make your own read first**, in a few lines: direction, levels, scenario.",
          "**Then upload the screenshot** and compare. Agreement proves nothing. Disagreement is a reason to look closer.",
          "**Check the levels on your own chart.** The AI can misplace a line. You are the last reviewer.",
          "**Check the calendar.** A release nearby changes everything ([NFP, CPI and Fed days](/blog/trading-gold-nfp-cpi-fed)).",
          "**Calculate your own size** with your own numbers ([gold lot size calculator guide](/blog/gold-lot-size-calculator)).",
          "**Keep a journal** to see over time whether the read helps you or not.",
        ],
      },
      {
        tip: "If the analysis concludes it's better to wait, that's useful information. A tool that always finds a trade to take should worry you.",
      },
      { h2: "Bad reasons to use an AI" },
      {
        ul: [
          "To avoid learning how to read a chart.",
          "To find a trade at any price when the market offers nothing.",
          "To justify a position you've already taken.",
          "Because a source promises steady results. Be careful ([AI trading bot scams](/blog/ai-trading-bot-scams)).",
        ],
      },
      {
        p: "Used as an aid to thinking, AI can speed up your routine and show you what you overlooked. Used as a crystal ball, it will cost you money.",
      },
      {
        p: "This guide is educational content and is not investment advice. AI analysis guarantees no result. CFDs are complex instruments and carry a high risk of losing money.",
      },
    ],
  },
];
