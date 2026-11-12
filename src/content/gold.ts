import type { Locale } from "@/i18n/config";

/**
 * The gold (XAU/USD) page, in every language of the site (the slug stays /gold; the local word goes in titles). Honest by construction: what the analysis really does on gold (its own rules
 * in the prompt, the news side's gold priorities), what it does not do, the CFD risk, and no price.
 */
export type GoldPage = {
  metaTitle: string;
  metaDescription: string;
  kicker: string;
  /** One line under the title: what makes the analysis specialised. */
  lede: string;
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
  /** The box on the home page that sends gold traders here. */
  homeTitle: string;
  homeLink: string;
  /** The badge on a report whose chart is gold. */
  reportBadge: string;
};

export const GOLD: Partial<Record<Locale, GoldPage>> = {
  fr: {
    metaTitle: "Analyse IA spécialisée gold (XAU/USD) — Scanzivo",
    metaDescription:
      "Envoyez une capture de votre graphique XAU/USD : l'IA lit la tendance, trace les niveaux et chiffre un plan, en tenant compte de ce qui fait bouger l'or. Première lecture gratuite.",
    kicker: "Analyse spécialisée gold · XAU/USD",
    lede: "Une analyse réglée pour l'or : ses niveaux ronds, ses sessions, ses réactions aux statistiques américaines.",
    title: "L'analyse IA de vos graphiques gold.",
    titleB: "Du 1 heure au 5 minutes.",
    intro:
      "Envoyez une capture de votre graphique XAU/USD. L'IA lit la tendance et la structure, trace les niveaux sur votre image et propose un plan chiffré : entrée, stop, objectifs, et le niveau qui l'invaliderait.",
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
    homeTitle: "Vous tradez le gold ?",
    homeLink: "Découvrez l'analyse spécialisée XAU/USD →",
    reportBadge: "Analyse spécialisée gold",
  },
  en: {
    metaTitle: "Specialised AI gold analysis (XAU/USD) — Scanzivo",
    metaDescription:
      "Send a screenshot of your XAU/USD chart: the AI reads the trend, draws the levels and puts numbers on a plan, taking into account what moves gold. First reading free.",
    kicker: "Specialised gold analysis · XAU/USD",
    lede: "An analysis tuned for gold: its round numbers, its sessions, its reactions to US data.",
    title: "AI analysis of your gold charts.",
    titleB: "From the 1-hour to the 5-minute.",
    intro:
      "Send a screenshot of your XAU/USD chart. The AI reads the trend and structure, draws the levels on your image and proposes a plan with numbers: entry, stop, targets, and the level that would invalidate it.",
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
    homeTitle: "Trading gold?",
    homeLink: "Discover the specialised XAU/USD analysis →",
    reportBadge: "Specialised gold analysis",
  },
  es: {
    metaTitle: "Análisis IA especializado en oro (XAU/USD) — Scanzivo",
    metaDescription:
      "Envía una captura de tu gráfico XAU/USD: la IA lee la tendencia, traza los niveles y pone cifras a un plan, teniendo en cuenta lo que mueve el oro. Primera lectura gratis.",
    kicker: "Análisis especializado en oro · XAU/USD",
    lede: "Un análisis ajustado al oro: sus números redondos, sus sesiones, sus reacciones a los datos de EE. UU.",
    title: "El análisis IA de tus gráficos de oro.",
    titleB: "Del gráfico de 1 hora al de 5 minutos.",
    intro:
      "Envía una captura de tu gráfico XAU/USD. La IA lee la tendencia y la estructura, traza los niveles en tu imagen y propone un plan con cifras: entrada, stop, objetivos y el nivel que lo invalidaría.",
    cta: "Analizar mi gráfico de oro",
    routineTitle: "La rutina 1H, 15m, 5m",
    routineIntro: "Así trabajan el oro muchos traders intradía: primero la dirección, después la entrada. Una captura por temporalidad.",
    steps: [
      { tf: "1H", title: "La dirección", text: "La captura de 1 hora dice hacia dónde va el mercado: tendencia, estructura, zonas donde el oro ya ha reaccionado. Fija el marco de la sesión." },
      { tf: "15m", title: "El plan", text: "En 15 minutos, el análisis precisa los niveles útiles del día y el escenario preferido, con su stop y sus objetivos." },
      { tf: "5m", title: "La entrada", text: "El gráfico de 5 minutos sirve para esperar el momento adecuado: una ruptura confirmada, un retest o la conclusión «esperar» cuando la señal aún no está." },
    ],
    example: {
      label: "Ejemplo ilustrativo · cifras ficticias",
      rows: [
        { tf: "1H", reading: "Tendencia alcista, mínimos crecientes", plan: "Resistencia 2.450 · soporte 2.400" },
        { tf: "15m", reading: "Escenario alcista preferido, 64 %", plan: "Entrada con cierre por encima de 2.432, stop 2.418, objetivos 2.450 y luego 2.470" },
        { tf: "5m", reading: "El precio aún choca bajo 2.432", plan: "Esperar el cierre por encima antes de entrar" },
      ],
      note: "Esta tabla muestra la forma de una lectura, no un resultado real. Cada análisis sale de tu propia captura.",
    },
    knowsTitle: "Lo que la IA tiene en cuenta en el oro",
    knows: [
      { title: "Los números redondos", text: "Los múltiplos de 50 y de 100 $ atraen órdenes. El análisis los usa para situar niveles y objetivos." },
      { title: "Las sesiones", text: "El rango asiático suele romperse en la apertura de Londres, y la apertura estadounidense, a las 14:30 hora peninsular, trae los mayores movimientos del día." },
      { title: "Los datos de EE. UU.", text: "Inflación (CPI), empleo (NFP), decisiones de la Fed: alrededor de estos anuncios, las falsas rupturas son frecuentes. El análisis lo recuerda cuando es útil." },
      { title: "El ruido", text: "El oro se mueve mucho dentro de una sesión. Los stops propuestos se sitúan más allá de las mechas recientes, no pegados a un nivel." },
    ],
    macroTitle: "Con el pack Pro: el contexto que mueve el oro",
    macroText:
      "Cada análisis de oro se cruza con los anuncios de los próximos 7 días y las noticias recientes: Fed, inflación y empleo de EE. UU., dólar, tipos reales, compras de oro de los bancos centrales, flujos de los ETF. Con sus fuentes y una frase sobre cómo tenerlo en cuenta en tu plan.",
    platformsTitle: "Con tus herramientas",
    platformsText:
      "Basta una captura de TradingView, MetaTrader 4 o 5, cTrader o la app de tu bróker, sea cual sea el nombre que aparezca: XAU/USD, XAUUSD, GOLD. Solo hace falta que el eje de precios se lea bien.",
    limitsTitle: "Lo que Scanzivo no hace",
    limits: [
      "No predice el precio: sopesa escenarios, y el preferido también falla.",
      "No envía órdenes ni toca tu dinero.",
      "Solo conoce tu captura: no hay cotizaciones en tiempo real.",
      "No es un consejo de inversión personalizado.",
    ],
    cfd:
      "El XAU/USD se negocia sobre todo como CFD, con apalancamiento. Son productos complejos y la mayoría de las cuentas de clientes minoristas pierden dinero con ellos. Arriesga solo lo que puedas permitirte perder.",
    faqTitle: "Preguntas sobre el análisis del oro",
    faq: [
      {
        q: "¿La IA está realmente especializada en oro?",
        a: "Cuando la captura muestra oro, el análisis sigue instrucciones propias del XAU/USD (números redondos, sesiones, datos de EE. UU., colocación de los stops), y la parte de noticias del pack Pro busca primero lo que mueve el oro. El modelo de IA es el mismo que para los demás activos.",
      },
      { q: "¿Qué temporalidades?", a: "Todas, de 1 minuto a mensual. Para intradía, la rutina de 1 hora, 15 minutos y 5 minutos es un buen punto de partida." },
      {
        q: "¿Puedo analizar varias veces al día?",
        a: "Sí, con el pack Pro, sin límite de número. Cada día, los primeros análisis los redacta nuestro modelo de IA más avanzado y los siguientes, modelos más rápidos. El pack Starter da un análisis al día.",
      },
      { q: "¿Hace falta una cuenta para probar?", a: "No. Deja tu captura: la IA te muestra gratis su primera lectura, sin tarjeta ni registro." },
      { q: "¿Es un servicio de señales?", a: "No. Scanzivo te da una lectura razonada de tu gráfico y un plan, que eres libre de seguir o no. No envía alertas ni coloca órdenes." },
    ],
    closingTitle: "Tu próximo gráfico de oro, leído en menos de un minuto.",
    breadcrumb: "Análisis del oro",
    navLabel: "Oro",
    homeTitle: "¿Operas con oro?",
    homeLink: "Descubre el análisis especializado XAU/USD →",
    reportBadge: "Análisis especializado en oro",
  },
  ja: {
    metaTitle: "ゴールド特化のAI分析（XAU/USD） — Scanzivo",
    metaDescription:
      "XAU/USDチャートのスクリーンショットを送るだけ。金を動かす要因を踏まえて、AIがトレンドを読み、水準を引き、数値付きのプランを示します。初回の読み取りは無料。",
    kicker: "ゴールド特化の分析 · XAU/USD",
    lede: "金（ゴールド）に合わせた分析：キリのいい水準、取引時間帯、米国指標への反応。",
    title: "ゴールドチャートをAIが分析。",
    titleB: "1時間足から5分足まで。",
    intro:
      "XAU/USDチャートのスクリーンショットを送ってください。AIがトレンドと構造を読み取り、画像上に水準を描き、エントリー、ストップ、目標、そしてシナリオを無効にする水準まで数値付きのプランを示します。",
    cta: "ゴールドチャートを分析する",
    routineTitle: "1時間足・15分足・5分足のルーティン",
    routineIntro: "多くのデイトレーダーが金を取引するときの流れです。まず方向、次にエントリー。時間足ごとにスクリーンショットを1枚。",
    steps: [
      { tf: "1H", title: "方向", text: "1時間足のスクリーンショットで、相場の向きが分かります。トレンド、構造、金がすでに反応したゾーン。その日の枠組みを決めます。" },
      { tf: "15m", title: "プラン", text: "15分足では、その日に役立つ水準と優勢なシナリオを、ストップと目標とともに絞り込みます。" },
      { tf: "5m", title: "エントリー", text: "5分足はタイミングを待つためのものです。確定したブレイク、リテスト、あるいはシグナルがまだなければ「様子見」という結論。" },
    ],
    example: {
      label: "説明用の例 · 数値は架空",
      rows: [
        { tf: "1H", reading: "上昇トレンド、安値の切り上げ", plan: "レジスタンス 2,450 · サポート 2,400" },
        { tf: "15m", reading: "上昇シナリオが優勢、64%", plan: "2,432を上抜けて確定したらエントリー、ストップ 2,418、目標 2,450、次に 2,470" },
        { tf: "5m", reading: "価格はまだ2,432の下で抑えられている", plan: "上抜けの確定を待ってからエントリー" },
      ],
      note: "この表は読み取りの形を示すもので、実際の結果ではありません。分析はすべて、あなた自身のスクリーンショットから行われます。",
    },
    knowsTitle: "金についてAIが考慮すること",
    knows: [
      { title: "キリのいい水準", text: "50ドル、100ドル刻みの水準には注文が集まります。分析は水準や目標の位置にそれを活かします。" },
      { title: "取引時間帯", text: "アジア時間のレンジはロンドン市場のオープンで抜けることが多く、米国時間の始まり（日本時間21時30分、冬は22時30分）に1日で最も大きな動きが出やすくなります。" },
      { title: "米国の経済指標", text: "インフレ（CPI）、雇用（NFP）、FRBの決定。こうした発表の前後はだましが多く、分析は必要に応じてそれを伝えます。" },
      { title: "ノイズ", text: "金は1日のうちに大きく動きます。提案するストップは、水準ぎりぎりではなく、直近のヒゲの外側に置きます。" },
    ],
    macroTitle: "Proパックなら：金を動かす背景も",
    macroText:
      "ゴールドの分析のたびに、今後7日間の発表と最近のニュースを照らし合わせます。FRB、米国のインフレと雇用、ドル、実質金利、中央銀行の金購入、ETFの資金フロー。出典付きで、プランへの織り込み方も一言添えます。",
    platformsTitle: "お使いのツールで",
    platformsText:
      "TradingView、MetaTrader 4・5、cTrader、またはお使いの証券会社のアプリのスクリーンショットで十分です。表示名がXAU/USD、XAUUSD、GOLDのどれでも構いません。価格軸が読めれば大丈夫です。",
    limitsTitle: "Scanzivoがしないこと",
    limits: [
      "価格を予言しません。シナリオを比べるだけで、優勢なシナリオが外れることもあります。",
      "注文を出すことも、お金に触れることもありません。",
      "分かるのはスクリーンショットだけで、リアルタイムの相場は見ていません。",
      "個別の投資助言ではありません。",
    ],
    cfd:
      "XAU/USDは多くの場合、レバレッジ付きのCFDで取引されます。仕組みが複雑な商品で、個人口座の多くが損失を出しています。失っても困らない範囲でのみリスクを取ってください。",
    faqTitle: "ゴールド分析についての質問",
    faq: [
      {
        q: "AIは本当にゴールドに特化しているのですか？",
        a: "スクリーンショットが金を示している場合、分析はXAU/USD専用の指示（キリのいい水準、取引時間帯、米国指標、ストップの置き方）に従い、Proパックのニュース分析は金を動かす要因を優先して調べます。AIモデル自体は、他の銘柄と同じものです。",
      },
      { q: "どの時間足に対応していますか？", a: "1分足から月足まで、すべてです。デイトレードなら、1時間足・15分足・5分足のルーティンがよい出発点です。" },
      {
        q: "1日に何回も分析できますか？",
        a: "Proパックなら回数無制限です。毎日、最初の分析は最も高性能なAIモデルが、その後はより高速なモデルが作成します。Starterパックは1日1回です。",
      },
      { q: "試すのにアカウントは必要ですか？", a: "いいえ。スクリーンショットを入れるだけで、カード登録もアカウント作成もなしに、AIの最初の読み取りを無料でお見せします。" },
      { q: "シグナル配信サービスですか？", a: "いいえ。Scanzivoはチャートの根拠ある読み取りとプランをお届けするだけで、それに従うかどうかはあなた次第です。アラートの配信も注文の発注もしません。" },
    ],
    closingTitle: "次のゴールドチャートを、1分足らずで読み解きます。",
    breadcrumb: "ゴールド分析",
    navLabel: "ゴールド",
    homeTitle: "ゴールドを取引していますか？",
    homeLink: "XAU/USD特化の分析を見る →",
    reportBadge: "ゴールド特化の分析",
  },
  ko: {
    metaTitle: "금(골드) 특화 AI 분석 (XAU/USD) — Scanzivo",
    metaDescription:
      "XAU/USD 차트 스크린샷을 보내 주세요. 금을 움직이는 요인을 반영해 AI가 추세를 읽고, 레벨을 그리고, 수치가 담긴 플랜을 제시합니다. 첫 분석은 무료.",
    kicker: "금(골드) 특화 분석 · XAU/USD",
    lede: "금에 맞춘 분석: 라운드 넘버, 거래 세션, 미국 지표에 대한 반응까지.",
    title: "AI가 분석하는 금(골드) 차트.",
    titleB: "1시간봉부터 5분봉까지.",
    intro:
      "XAU/USD 차트 스크린샷을 보내 주세요. AI가 추세와 구조를 읽고, 이미지 위에 레벨을 그리고, 진입, 손절, 목표가와 시나리오를 무효로 만드는 레벨까지 수치가 담긴 플랜을 제시합니다.",
    cta: "내 금 차트 분석하기",
    routineTitle: "1시간봉, 15분봉, 5분봉 루틴",
    routineIntro: "많은 데이 트레이더가 금을 거래하는 방식입니다. 먼저 방향, 그다음 진입. 시간 단위마다 스크린샷 한 장.",
    steps: [
      { tf: "1H", title: "방향", text: "1시간봉 스크린샷은 시장이 어느 쪽으로 가는지 알려 줍니다. 추세, 구조, 금이 이미 반응한 구간. 그날의 틀을 정합니다." },
      { tf: "15m", title: "플랜", text: "15분봉에서는 그날 쓸모 있는 레벨과 우세한 시나리오를 손절, 목표가와 함께 좁혀 줍니다." },
      { tf: "5m", title: "진입", text: "5분봉은 타이밍을 기다리기 위한 것입니다. 확인된 돌파, 리테스트, 또는 신호가 아직 없다면 \"관망\"이라는 결론." },
    ],
    example: {
      label: "설명용 예시 · 가상의 수치",
      rows: [
        { tf: "1H", reading: "상승 추세, 높아지는 저점", plan: "저항선 2,450 · 지지선 2,400" },
        { tf: "15m", reading: "상승 시나리오 우세, 64%", plan: "2,432 위에서 마감하면 진입, 손절 2,418, 목표 2,450 다음 2,470" },
        { tf: "5m", reading: "가격이 아직 2,432 아래에서 막혀 있음", plan: "위에서 마감할 때까지 기다린 뒤 진입" },
      ],
      note: "이 표는 분석의 형태를 보여 줄 뿐 실제 결과가 아닙니다. 모든 분석은 여러분의 스크린샷에서 나옵니다.",
    },
    knowsTitle: "AI가 금에서 고려하는 것",
    knows: [
      { title: "라운드 넘버", text: "50달러, 100달러 단위의 가격에는 주문이 몰립니다. 분석은 레벨과 목표가를 정할 때 이를 활용합니다." },
      { title: "거래 세션", text: "아시아 세션의 박스권은 런던 개장 때 깨지는 경우가 많고, 미국 장 시작(한국 시간 밤 9시 30분, 겨울에는 10시 30분)에 하루 중 가장 큰 움직임이 나오기 쉽습니다." },
      { title: "미국 경제 지표", text: "물가(CPI), 고용(NFP), 연준 결정. 이런 발표 전후에는 가짜 돌파가 잦고, 분석은 필요할 때 이를 알려 줍니다." },
      { title: "노이즈", text: "금은 하루 안에서도 크게 움직입니다. 제안하는 손절은 레벨 바로 위가 아니라 최근 꼬리 바깥에 둡니다." },
    ],
    macroTitle: "Pro 팩이라면: 금을 움직이는 배경까지",
    macroText:
      "금 분석을 할 때마다 향후 7일간의 발표와 최근 뉴스를 함께 살핍니다. 연준, 미국 물가와 고용, 달러, 실질금리, 중앙은행의 금 매입, ETF 자금 흐름. 출처와 함께, 플랜에 어떻게 반영할지 한 문장으로 알려 드립니다.",
    platformsTitle: "쓰시는 도구 그대로",
    platformsText:
      "TradingView, MetaTrader 4·5, cTrader, 또는 쓰시는 증권사 앱의 스크린샷이면 충분합니다. 종목명이 XAU/USD, XAUUSD, GOLD 중 무엇이든 괜찮습니다. 가격 축만 읽히면 됩니다.",
    limitsTitle: "Scanzivo가 하지 않는 것",
    limits: [
      "가격을 예측하지 않습니다. 시나리오를 저울질할 뿐이고, 우세한 시나리오도 틀릴 수 있습니다.",
      "주문을 내지 않으며 여러분의 돈에 손대지 않습니다.",
      "스크린샷만 볼 뿐, 실시간 시세는 알지 못합니다.",
      "개인 맞춤형 투자 조언이 아닙니다.",
    ],
    cfd:
      "XAU/USD는 대부분 레버리지가 있는 CFD로 거래됩니다. 구조가 복잡한 상품이며, 개인 계좌의 다수가 손실을 봅니다. 잃어도 괜찮은 만큼만 위험을 감수하세요.",
    faqTitle: "금 분석에 대한 질문",
    faq: [
      {
        q: "AI가 정말 금에 특화되어 있나요?",
        a: "스크린샷이 금을 보여 주면, 분석은 XAU/USD 전용 지침(라운드 넘버, 거래 세션, 미국 지표, 손절 위치)을 따르고, Pro 팩의 뉴스 분석은 금을 움직이는 요인을 우선해서 찾습니다. AI 모델 자체는 다른 자산과 같습니다.",
      },
      { q: "어떤 시간 단위를 지원하나요?", a: "1분봉부터 월봉까지 모두 지원합니다. 데이 트레이딩이라면 1시간봉, 15분봉, 5분봉 루틴이 좋은 출발점입니다." },
      {
        q: "하루에 여러 번 분석할 수 있나요?",
        a: "Pro 팩이라면 횟수 제한 없이 가능합니다. 매일 첫 분석은 가장 고성능 AI 모델이, 이후 분석은 더 빠른 모델이 작성합니다. Starter 팩은 하루 1회입니다.",
      },
      { q: "써 보려면 계정이 필요한가요?", a: "아니요. 스크린샷만 올리면 카드 등록도 가입도 없이 AI의 첫 분석을 무료로 보여 드립니다." },
      { q: "시그널 서비스인가요?", a: "아니요. Scanzivo는 차트에 대한 근거 있는 분석과 플랜을 드릴 뿐이며, 따를지는 여러분이 정합니다. 알림을 보내거나 주문을 내지 않습니다." },
    ],
    closingTitle: "다음 금 차트, 1분 안에 분석해 드립니다.",
    breadcrumb: "금 분석",
    navLabel: "금(골드)",
    homeTitle: "금을 거래하시나요?",
    homeLink: "XAU/USD 특화 분석 보기 →",
    reportBadge: "금 특화 분석",
  },
  vi: {
    metaTitle: "Phân tích vàng bằng AI chuyên biệt (XAU/USD) — Scanzivo",
    metaDescription:
      "Gửi ảnh chụp biểu đồ XAU/USD: AI đọc xu hướng, vẽ các mức giá và đưa ra kế hoạch có số liệu, có tính đến những yếu tố làm vàng biến động. Lần đọc đầu tiên miễn phí.",
    kicker: "Phân tích chuyên biệt về vàng · XAU/USD",
    lede: "Một bản phân tích điều chỉnh riêng cho vàng: các mức giá tròn, các phiên giao dịch, phản ứng với số liệu của Mỹ.",
    title: "AI phân tích biểu đồ vàng của bạn.",
    titleB: "Từ khung 1 giờ đến khung 5 phút.",
    intro:
      "Gửi ảnh chụp biểu đồ XAU/USD của bạn. AI đọc xu hướng và cấu trúc, vẽ các mức giá lên ảnh và đề xuất kế hoạch có số liệu: điểm vào lệnh, stop, mục tiêu, và mức giá làm kịch bản mất hiệu lực.",
    cta: "Phân tích biểu đồ vàng của tôi",
    routineTitle: "Quy trình 1H, 15m, 5m",
    routineIntro: "Đây là cách nhiều trader trong ngày giao dịch vàng: hướng đi trước, điểm vào sau. Mỗi khung thời gian một ảnh chụp.",
    steps: [
      { tf: "1H", title: "Hướng đi", text: "Ảnh chụp khung 1 giờ cho biết thị trường đang đi về đâu: xu hướng, cấu trúc, các vùng vàng đã phản ứng. Nó đặt khung cho cả phiên." },
      { tf: "15m", title: "Kế hoạch", text: "Trên khung 15 phút, bản phân tích xác định các mức hữu ích trong ngày và kịch bản ưu tiên, kèm stop và mục tiêu." },
      { tf: "5m", title: "Điểm vào", text: "Khung 5 phút dùng để chờ đúng thời điểm: một cú phá vỡ có xác nhận, một lần retest, hoặc kết luận \"chờ\" khi tín hiệu chưa có." },
    ],
    example: {
      label: "Ví dụ minh họa · số liệu giả định",
      rows: [
        { tf: "1H", reading: "Xu hướng tăng, đáy sau cao hơn đáy trước", plan: "Kháng cự 2.450 · hỗ trợ 2.400" },
        { tf: "15m", reading: "Ưu tiên kịch bản tăng, 64%", plan: "Vào lệnh khi nến đóng trên 2.432, stop 2.418, mục tiêu 2.450 rồi 2.470" },
        { tf: "5m", reading: "Giá vẫn bị chặn dưới 2.432", plan: "Chờ nến đóng cửa bên trên rồi mới vào lệnh" },
      ],
      note: "Bảng này cho thấy hình thức của một bản đọc, không phải kết quả thật. Mỗi bản phân tích đều từ chính ảnh chụp của bạn.",
    },
    knowsTitle: "Những gì AI tính đến với vàng",
    knows: [
      { title: "Các mức giá tròn", text: "Các bội số của 50 và 100 USD thu hút lệnh. Bản phân tích dùng chúng để đặt các mức giá và mục tiêu." },
      { title: "Các phiên giao dịch", text: "Biên độ phiên Á thường bị phá vỡ khi London mở cửa, và lúc thị trường Mỹ bắt đầu (19:30 giờ Việt Nam, mùa đông 20:30) thường có những biến động lớn nhất trong ngày." },
      { title: "Số liệu của Mỹ", text: "Lạm phát (CPI), việc làm (NFP), quyết định của Fed: quanh các thông báo này, phá vỡ giả rất thường gặp. Bản phân tích nhắc điều đó khi cần." },
      { title: "Nhiễu", text: "Vàng biến động mạnh trong một phiên. Các stop đề xuất được đặt bên ngoài các bóng nến gần nhất, không sát ngay mức giá." },
    ],
    macroTitle: "Với gói Pro: bối cảnh làm vàng biến động",
    macroText:
      "Mỗi bản phân tích vàng được đối chiếu với các thông báo trong 7 ngày tới và tin tức gần đây: Fed, lạm phát và việc làm của Mỹ, đồng đô la, lãi suất thực, hoạt động mua vàng của các ngân hàng trung ương, dòng tiền vào các quỹ ETF. Có kèm nguồn, cùng một câu về cách tính đến chúng trong kế hoạch.",
    platformsTitle: "Dùng với công cụ của bạn",
    platformsText:
      "Một ảnh chụp từ TradingView, MetaTrader 4 hoặc 5, cTrader hay ứng dụng của sàn là đủ, dù tên hiển thị là XAU/USD, XAUUSD hay GOLD. Chỉ cần trục giá đọc được.",
    limitsTitle: "Những gì Scanzivo không làm",
    limits: [
      "Không dự đoán giá: nó cân nhắc các kịch bản, và kịch bản ưu tiên cũng có lúc sai.",
      "Không đặt lệnh và không chạm vào tiền của bạn.",
      "Chỉ biết ảnh chụp của bạn: không có giá trực tiếp.",
      "Không phải lời khuyên đầu tư cá nhân.",
    ],
    cfd:
      "XAU/USD chủ yếu được giao dịch dưới dạng CFD, có đòn bẩy. Đây là sản phẩm phức tạp, và phần lớn tài khoản nhà đầu tư cá nhân bị thua lỗ khi giao dịch chúng. Chỉ mạo hiểm số tiền bạn có thể chấp nhận mất.",
    faqTitle: "Câu hỏi về phân tích vàng",
    faq: [
      {
        q: "AI có thực sự chuyên về vàng không?",
        a: "Khi ảnh chụp là biểu đồ vàng, bản phân tích tuân theo các hướng dẫn riêng cho XAU/USD (mức giá tròn, các phiên, số liệu Mỹ, cách đặt stop), và phần tin tức của gói Pro ưu tiên tìm những gì làm vàng biến động. Còn mô hình AI thì vẫn là mô hình dùng cho các tài sản khác.",
      },
      { q: "Những khung thời gian nào?", a: "Tất cả, từ 1 phút đến khung tháng. Với giao dịch trong ngày, quy trình 1 giờ, 15 phút, 5 phút là điểm khởi đầu tốt." },
      {
        q: "Tôi có thể phân tích nhiều lần mỗi ngày không?",
        a: "Có, với gói Pro, không giới hạn số lần. Mỗi ngày, các bản phân tích đầu tiên do mô hình AI mạnh nhất của chúng tôi viết, các bản sau do các mô hình nhanh hơn. Gói Starter cho một lần phân tích mỗi ngày.",
      },
      { q: "Có cần tài khoản để dùng thử không?", a: "Không. Thả ảnh chụp vào: AI cho bạn xem miễn phí phần đọc đầu tiên, không cần thẻ, không cần đăng ký." },
      { q: "Đây có phải dịch vụ tín hiệu không?", a: "Không. Scanzivo đưa cho bạn một phần đọc có lập luận về biểu đồ và một kế hoạch, bạn tự do làm theo hay không. Nó không gửi cảnh báo và không đặt lệnh." },
    ],
    closingTitle: "Biểu đồ vàng tiếp theo của bạn, đọc xong trong chưa đầy một phút.",
    breadcrumb: "Phân tích vàng",
    navLabel: "Vàng",
    homeTitle: "Bạn giao dịch vàng?",
    homeLink: "Khám phá phân tích chuyên biệt XAU/USD →",
    reportBadge: "Phân tích chuyên biệt về vàng",
  },
  id: {
    metaTitle: "Analisis AI khusus emas (XAU/USD) — Scanzivo",
    metaDescription:
      "Kirim tangkapan layar grafik XAU/USD Anda: AI membaca tren, menggambar level, dan menyusun rencana dengan angka, dengan memperhitungkan apa yang menggerakkan emas. Bacaan pertama gratis.",
    kicker: "Analisis khusus emas · XAU/USD",
    lede: "Analisis yang disesuaikan untuk emas: angka bulatnya, sesinya, reaksinya terhadap data AS.",
    title: "Analisis AI untuk grafik emas Anda.",
    titleB: "Dari grafik 1 jam hingga 5 menit.",
    intro:
      "Kirim tangkapan layar grafik XAU/USD Anda. AI membaca tren dan struktur, menggambar level di gambar Anda, dan mengusulkan rencana dengan angka: entry, stop, target, serta level yang akan membatalkannya.",
    cta: "Analisis grafik emas saya",
    routineTitle: "Rutinitas 1H, 15m, 5m",
    routineIntro: "Beginilah banyak trader intraday menggarap emas: arah dulu, entry kemudian. Satu tangkapan layar per timeframe.",
    steps: [
      { tf: "1H", title: "Arah", text: "Tangkapan layar 1 jam memberi tahu ke mana pasar bergerak: tren, struktur, zona tempat emas sudah bereaksi. Inilah kerangka sesi Anda." },
      { tf: "15m", title: "Rencana", text: "Di grafik 15 menit, analisis menajamkan level yang berguna hari itu dan skenario utama, lengkap dengan stop dan target." },
      { tf: "5m", title: "Entry", text: "Grafik 5 menit dipakai untuk menunggu saat yang tepat: breakout yang terkonfirmasi, retest, atau kesimpulan \"tunggu\" saat sinyalnya belum ada." },
    ],
    example: {
      label: "Contoh ilustrasi · angka fiktif",
      rows: [
        { tf: "1H", reading: "Tren naik, low makin tinggi", plan: "Resistance 2.450 · support 2.400" },
        { tf: "15m", reading: "Skenario naik diutamakan, 64%", plan: "Entry saat ditutup di atas 2.432, stop 2.418, target 2.450 lalu 2.470" },
        { tf: "5m", reading: "Harga masih tertahan di bawah 2.432", plan: "Tunggu penutupan di atasnya sebelum entry" },
      ],
      note: "Tabel ini menunjukkan bentuk sebuah bacaan, bukan hasil nyata. Setiap analisis berasal dari tangkapan layar Anda sendiri.",
    },
    knowsTitle: "Yang diperhitungkan AI pada emas",
    knows: [
      { title: "Angka bulat", text: "Kelipatan 50 dan 100 dolar menarik banyak order. Analisis memakainya untuk menempatkan level dan target." },
      { title: "Sesi perdagangan", text: "Rentang sesi Asia sering ditembus saat London dibuka, dan awal sesi AS (19.30 WIB, 20.30 WIB saat musim dingin di AS) membawa gerakan terbesar hari itu." },
      { title: "Data ekonomi AS", text: "Inflasi (CPI), lapangan kerja (NFP), keputusan The Fed: di sekitar rilis ini, breakout palsu sering terjadi. Analisis mengingatkannya bila perlu." },
      { title: "Noise", text: "Emas bergerak liar dalam satu sesi. Stop yang diusulkan ditempatkan di luar shadow terakhir, bukan menempel di level." },
    ],
    macroTitle: "Dengan paket Pro: konteks yang menggerakkan emas",
    macroText:
      "Setiap analisis emas dicocokkan dengan pengumuman 7 hari ke depan dan berita terbaru: The Fed, inflasi dan lapangan kerja AS, dolar, imbal hasil riil, pembelian emas oleh bank sentral, arus dana ETF. Lengkap dengan sumber, dan satu kalimat tentang cara memperhitungkannya dalam rencana Anda.",
    platformsTitle: "Dengan alat Anda",
    platformsText:
      "Tangkapan layar dari TradingView, MetaTrader 4 atau 5, cTrader, atau aplikasi broker Anda sudah cukup, apa pun nama yang tampil: XAU/USD, XAUUSD, GOLD. Yang penting sumbu harganya terbaca.",
    limitsTitle: "Yang tidak dilakukan Scanzivo",
    limits: [
      "Tidak meramal harga: Scanzivo menimbang skenario, dan skenario utama pun bisa meleset.",
      "Tidak memasang order dan tidak menyentuh uang Anda.",
      "Hanya mengenal tangkapan layar Anda: tidak ada harga real-time.",
      "Bukan saran investasi pribadi.",
    ],
    cfd:
      "XAU/USD kebanyakan diperdagangkan sebagai CFD, dengan leverage. Ini produk yang kompleks, dan sebagian besar akun investor ritel merugi saat memperdagangkannya. Hanya pertaruhkan dana yang sanggup Anda relakan.",
    faqTitle: "Pertanyaan seputar analisis emas",
    faq: [
      {
        q: "Apakah AI-nya benar-benar khusus emas?",
        a: "Jika tangkapan layar menunjukkan emas, analisis mengikuti instruksi khusus XAU/USD (angka bulat, sesi, data AS, penempatan stop), dan bagian berita paket Pro lebih dulu mencari apa yang menggerakkan emas. Model AI-nya sendiri sama dengan untuk aset lain.",
      },
      { q: "Timeframe apa saja?", a: "Semuanya, dari 1 menit hingga bulanan. Untuk intraday, rutinitas 1 jam, 15 menit, 5 menit adalah titik awal yang baik." },
      {
        q: "Bisakah saya menganalisis beberapa kali sehari?",
        a: "Bisa, dengan paket Pro, tanpa batas jumlah. Setiap hari, analisis pertama ditulis oleh model AI tercanggih kami, berikutnya oleh model yang lebih cepat. Paket Starter memberi satu analisis per hari.",
      },
      { q: "Perlukah akun untuk mencoba?", a: "Tidak. Letakkan tangkapan layar Anda: AI menunjukkan bacaan pertamanya secara gratis, tanpa kartu, tanpa pendaftaran." },
      { q: "Apakah ini layanan sinyal?", a: "Bukan. Scanzivo memberi Anda bacaan grafik yang beralasan dan sebuah rencana, yang bebas Anda ikuti atau tidak. Scanzivo tidak mengirim notifikasi sinyal dan tidak memasang order." },
    ],
    closingTitle: "Grafik emas Anda berikutnya, terbaca dalam kurang dari semenit.",
    breadcrumb: "Analisis emas",
    navLabel: "Emas",
    homeTitle: "Anda trading emas?",
    homeLink: "Lihat analisis khusus XAU/USD →",
    reportBadge: "Analisis khusus emas",
  },
};

/** The languages the gold page exists in. */
export const goldLocales = () => Object.keys(GOLD) as Locale[];
