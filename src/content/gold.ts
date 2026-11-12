import type { Locale } from "@/i18n/config";

/**
 * The gold (XAU/USD) page, in the languages it is published in (French and English first: the council's advice was to
 * prove the page before translating it). Honest by construction: what the analysis really does on gold (its own rules
 * in the prompt, the news side's gold priorities), what it does not do, the CFD risk, and no price.
 */
export type GoldPage = {
  metaTitle: string;
  metaDescription: string;
  kicker: string;
  title: string;
  titleB: string;
  intro: string;
  cta: string;
  routineTitle: string;
  routineIntro: string;
  steps: { tf: string; title: string; text: string }[];
  example: { label: string; rows: { tf: string; reading: string; plan: string }[]; note: string };
  knowsTitle: string;
  knows: { title: string; text: string }[];
  macroTitle: string;
  macroText: string;
  platformsTitle: string;
  platformsText: string;
  limitsTitle: string;
  limits: string[];
  cfd: string;
  faqTitle: string;
  faq: { q: string; a: string }[];
  closingTitle: string;
  breadcrumb: string;
  navLabel: string;
};

export const GOLD: Partial<Record<Locale, GoldPage>> = {
  fr: {
    metaTitle: "Analyse IA du gold (XAU/USD) — Scanzivo",
    metaDescription:
      "Envoyez une capture de votre graphique XAU/USD : l'IA lit la tendance, trace les niveaux et chiffre un plan, en tenant compte de ce qui fait bouger l'or. Première lecture gratuite.",
    kicker: "Gold · XAU/USD",
    title: "L'analyse IA de vos graphiques gold.",
    titleB: "Du 1 heure au 5 minutes.",
    intro:
      "Envoyez une capture de votre graphique XAU/USD. L'IA lit la tendance et la structure, trace les niveaux sur votre image et propose un plan chiffré : entrée, stop, objectifs, et le niveau qui l'invaliderait. Elle tient compte des habitudes de l'or : chiffres ronds, sessions, réactions aux statistiques américaines.",
    cta: "Analyser mon graphique gold",
    routineTitle: "La routine 1H, 15m, 5m",
    routineIntro: "C'est la façon dont beaucoup de traders intraday travaillent le gold : la direction d'abord, l'entrée ensuite. Une capture par unité de temps.",
    steps: [
      { tf: "1H", title: "La direction", text: "La capture en 1 heure dit dans quel sens va le marché : tendance, structure, zones où l'or a déjà réagi. Elle fixe le cadre de la séance." },
      { tf: "15m", title: "Le plan", text: "Sur le 15 minutes, l'analyse précise les niveaux utiles pour la journée et le scénario privilégié, avec son stop et ses objectifs." },
      { tf: "5m", title: "L'entrée", text: "Le 5 minutes sert à attendre le bon moment : une cassure confirmée, un retest, ou la conclusion « attendre » quand le signal n'y est pas encore." },
    ],
    example: {
      label: "Exemple illustratif · chiffres fictifs",
      rows: [
        { tf: "1H", reading: "Tendance haussière, plus bas ascendants", plan: "Résistance 2 450 · support 2 400" },
        { tf: "15m", reading: "Scénario haussier privilégié, 64 %", plan: "Entrée sur clôture au-dessus de 2 432, stop 2 418, objectifs 2 450 puis 2 470" },
        { tf: "5m", reading: "Le prix bute encore sous 2 432", plan: "Attendre la clôture au-dessus avant d'entrer" },
      ],
      note: "Ce tableau montre la forme d'une lecture, pas un résultat réel. Chaque analyse vient de votre propre capture.",
    },
    knowsTitle: "Ce que l'IA prend en compte sur l'or",
    knows: [
      { title: "Les chiffres ronds", text: "Les multiples de 50 et de 100 $ attirent les ordres. L'analyse s'en sert pour placer niveaux et objectifs." },
      { title: "Les sessions", text: "Le range asiatique est souvent cassé à l'ouverture de Londres, et l'ouverture américaine, à 14 h 30 heure de Paris, apporte les plus gros mouvements de la journée." },
      { title: "Les statistiques américaines", text: "Inflation (CPI), emploi (NFP), décisions de la Fed : autour de ces annonces, les fausses cassures sont fréquentes. L'analyse le rappelle quand c'est utile." },
      { title: "Le bruit", text: "L'or bouge beaucoup à l'intérieur d'une séance. Les stops proposés sont placés au-delà des mèches récentes, pas au ras d'un niveau." },
    ],
    macroTitle: "Avec le pack Pro : le contexte qui fait bouger l'or",
    macroText:
      "Chaque analyse gold est croisée avec les annonces des 7 prochains jours et l'actualité récente : Fed, inflation et emploi américains, dollar, taux réels, achats d'or des banques centrales, flux des ETF. Sources à l'appui, avec une phrase sur la façon d'en tenir compte dans votre plan.",
    platformsTitle: "Avec vos outils",
    platformsText:
      "Une capture TradingView, MetaTrader 4 ou 5, cTrader ou de l'application de votre courtier suffit, quel que soit le nom affiché : XAU/USD, XAUUSD, GOLD. Il faut juste que l'axe des prix soit lisible.",
    limitsTitle: "Ce que Scanzivo ne fait pas",
    limits: [
      "Il ne prédit pas le prix : il pèse des scénarios, et le scénario privilégié se trompe aussi.",
      "Il ne passe aucun ordre et ne touche pas à votre argent.",
      "Il ne connaît que votre capture : pas de cours en temps réel.",
      "Ce n'est pas un conseil en investissement personnalisé.",
    ],
    cfd:
      "Le XAU/USD se traite le plus souvent en CFD, avec effet de levier. Ce sont des produits complexes, et une majorité de comptes de particuliers perdent de l'argent en les utilisant. Ne risquez que ce que vous pouvez vous permettre de perdre.",
    faqTitle: "Questions sur l'analyse gold",
    faq: [
      {
        q: "L'IA est-elle vraiment spécialisée sur le gold ?",
        a: "Quand la capture montre de l'or, l'analyse suit des consignes propres au XAU/USD (chiffres ronds, sessions, statistiques américaines, placement des stops), et le volet actualité du pack Pro cherche en priorité ce qui fait bouger l'or. Le modèle d'IA, lui, est le même que pour les autres actifs.",
      },
      { q: "Quelles unités de temps ?", a: "Toutes, du 1 minute au mensuel. Pour l'intraday, la routine 1 heure, 15 minutes, 5 minutes est un bon point de départ." },
      {
        q: "Puis-je analyser plusieurs fois par jour ?",
        a: "Oui, avec le pack Pro, sans limite de nombre. Chaque jour, les premières analyses sont rédigées par notre modèle d'IA le plus avancé, les suivantes par des modèles plus rapides. Le pack Starter donne une analyse par jour.",
      },
      { q: "Faut-il un compte pour essayer ?", a: "Non. Déposez votre capture : l'IA vous montre gratuitement sa première lecture, sans carte ni inscription." },
      { q: "Est-ce un service de signaux ?", a: "Non. Scanzivo vous rend une lecture argumentée de votre graphique et un plan, que vous êtes libre de suivre ou non. Il n'envoie pas d'alertes et ne passe pas d'ordres." },
    ],
    closingTitle: "Votre prochain graphique gold, lu en moins d'une minute.",
    breadcrumb: "Analyse gold",
    navLabel: "Gold",
  },
  en: {
    metaTitle: "AI gold chart analysis (XAU/USD) — Scanzivo",
    metaDescription:
      "Send a screenshot of your XAU/USD chart: the AI reads the trend, draws the levels and puts numbers on a plan, taking into account what moves gold. First reading free.",
    kicker: "Gold · XAU/USD",
    title: "AI analysis of your gold charts.",
    titleB: "From the 1-hour to the 5-minute.",
    intro:
      "Send a screenshot of your XAU/USD chart. The AI reads the trend and structure, draws the levels on your image and proposes a plan with numbers: entry, stop, targets, and the level that would invalidate it. It takes gold's habits into account: round numbers, sessions, reactions to US data.",
    cta: "Analyse my gold chart",
    routineTitle: "The 1H, 15m, 5m routine",
    routineIntro: "It's how many intraday traders work gold: direction first, entry second. One screenshot per timeframe.",
    steps: [
      { tf: "1H", title: "Direction", text: "The 1-hour screenshot tells you which way the market is going: trend, structure, zones where gold has already reacted. It sets the frame for the session." },
      { tf: "15m", title: "The plan", text: "On the 15-minute, the analysis pins down the levels that matter for the day and the favoured scenario, with its stop and targets." },
      { tf: "5m", title: "The entry", text: "The 5-minute is for waiting for the right moment: a confirmed break, a retest, or the conclusion “wait” when the signal isn't there yet." },
    ],
    example: {
      label: "Illustrative example · made-up figures",
      rows: [
        { tf: "1H", reading: "Uptrend, higher lows", plan: "Resistance 2,450 · support 2,400" },
        { tf: "15m", reading: "Bullish scenario favoured, 64%", plan: "Entry on a close above 2,432, stop 2,418, targets 2,450 then 2,470" },
        { tf: "5m", reading: "Price still capped below 2,432", plan: "Wait for the close above before entering" },
      ],
      note: "This table shows the shape of a reading, not a real result. Every analysis comes from your own screenshot.",
    },
    knowsTitle: "What the AI takes into account on gold",
    knows: [
      { title: "Round numbers", text: "Multiples of $50 and $100 attract orders. The analysis uses them to place levels and targets." },
      { title: "Sessions", text: "The Asian range is often broken at the London open, and the US open, at 8:30 a.m. New York time, brings the biggest moves of the day." },
      { title: "US data", text: "Inflation (CPI), jobs (NFP), Fed decisions: around these releases, false breaks are common. The analysis reminds you when it matters." },
      { title: "Noise", text: "Gold moves a lot within a session. The suggested stops sit beyond recent wicks, not right on a level." },
    ],
    macroTitle: "With the Pro pack: the context that moves gold",
    macroText:
      "Every gold analysis is checked against the announcements of the next 7 days and recent news: the Fed, US inflation and jobs, the dollar, real yields, central-bank gold buying, ETF flows. With sources, and a sentence on how to factor it into your plan.",
    platformsTitle: "With your tools",
    platformsText:
      "A screenshot from TradingView, MetaTrader 4 or 5, cTrader or your broker's app is enough, whatever the symbol says: XAU/USD, XAUUSD, GOLD. The price axis just needs to be readable.",
    limitsTitle: "What Scanzivo doesn't do",
    limits: [
      "It doesn't predict the price: it weighs scenarios, and the favoured one is sometimes wrong.",
      "It places no orders and never touches your money.",
      "It only knows your screenshot: no live prices.",
      "It isn't personal investment advice.",
    ],
    cfd:
      "XAU/USD is mostly traded as a CFD, with leverage. These are complex products, and most retail accounts lose money trading them. Only risk what you can afford to lose.",
    faqTitle: "Questions about gold analysis",
    faq: [
      {
        q: "Is the AI really specialised in gold?",
        a: "When the screenshot shows gold, the analysis follows XAU/USD-specific instructions (round numbers, sessions, US data, stop placement), and the Pro pack's news side looks first for what moves gold. The AI model itself is the same as for other assets.",
      },
      { q: "Which timeframes?", a: "All of them, from 1-minute to monthly. For intraday, the 1-hour, 15-minute, 5-minute routine is a good place to start." },
      {
        q: "Can I analyse several times a day?",
        a: "Yes, with the Pro pack, with no limit on the number. Each day, the first analyses are written by our most advanced AI model, the following ones by faster models. The Starter pack gives one analysis a day.",
      },
      { q: "Do I need an account to try?", a: "No. Drop your screenshot: the AI shows you its first reading for free, no card, no sign-up." },
      { q: "Is it a signals service?", a: "No. Scanzivo gives you a reasoned reading of your chart and a plan, which you're free to follow or not. It sends no alerts and places no orders." },
    ],
    closingTitle: "Your next gold chart, read in under a minute.",
    breadcrumb: "Gold analysis",
    navLabel: "Gold",
  },
};

/** The languages the gold page exists in. */
export const goldLocales = () => Object.keys(GOLD) as Locale[];
