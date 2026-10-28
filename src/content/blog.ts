import type { Locale } from "@/i18n/config";

/**
 * Blog articles: educational pieces on reading charts, for search engines and AI assistants as much as for readers.
 * Written as plain blocks so they stay typed and render with the site's own styles. `**text**` sets bold inline.
 * Never a promise of gains, never a call to trade a specific asset: every article ends with the investment warning.
 */
export type Block =
  | { h2: string }
  | { h3: string }
  | { p: string }
  | { ul: string[] }
  | { ol: string[] }
  | { tip: string };

export type Article = {
  slug: string;
  locale: Locale;
  title: string;
  description: string;
  /** ISO date of publication. */
  date: string;
  body: Block[];
};

const ARTICLES_FR: Omit<Article, "locale">[] = [
  {
    slug: "comment-lire-un-graphique-de-trading",
    title: "Comment lire un graphique de trading quand on débute",
    description:
      "Bougies, tendance, supports et résistances, indicateurs : les bases pour lire un graphique de prix sans se noyer dans les indicateurs.",
    date: "2026-10-28",
    body: [
      {
        p: "Un graphique de prix raconte ce que les acheteurs et les vendeurs ont fait. Avant de chercher un signal, il faut savoir lire cette histoire : qui a pris le dessus, où le prix a calé, et à quel moment le rapport de force a changé. Voici les quatre choses à regarder, dans cet ordre.",
      },
      { h2: "1. Les bougies : ce qu'il s'est passé sur chaque période" },
      {
        p: "Chaque bougie résume une période : une minute, une heure, un jour, selon l'unité de temps choisie. Son **corps** va du prix d'ouverture au prix de clôture. Il est vert (ou blanc) si le prix a fini plus haut qu'il n'a commencé, rouge (ou noir) dans le cas contraire. Les **mèches** au-dessus et en dessous montrent jusqu'où le prix est allé pendant la période avant de revenir.",
      },
      {
        p: "Une longue mèche basse veut dire que les vendeurs ont poussé le prix vers le bas, puis que les acheteurs l'ont fait remonter avant la clôture. Une bougie seule ne suffit pas à conclure, mais plusieurs longues mèches au même endroit montrent une zone que le marché refuse de dépasser.",
      },
      { h2: "2. La tendance : dans quel sens va le marché" },
      {
        p: "Une tendance haussière, c'est une suite de **sommets de plus en plus hauts** et de **creux de plus en plus hauts**. Une tendance baissière, l'inverse. Quand les sommets et les creux restent à peu près au même niveau, le marché est en range : il hésite.",
      },
      {
        p: "Pour la voir, éloignez-vous : regardez au moins une centaine de bougies. Sur dix bougies, n'importe quel mouvement ressemble à une tendance. Beaucoup de débutants achètent une hausse qui n'est qu'un rebond à l'intérieur d'une baisse plus large.",
      },
      { tip: "Regardez toujours une unité de temps au-dessus de celle sur laquelle vous tradez. Si vous tradez en 1 heure, jetez un œil au 4 heures : c'est lui qui donne la direction de fond." },
      { h2: "3. Les supports et résistances : où le prix réagit" },
      {
        p: "Un **support** est une zone où le prix a cessé de baisser plusieurs fois : des acheteurs s'y présentent. Une **résistance** est une zone où il a cessé de monter : des vendeurs y attendent. Ce sont des zones, pas des lignes au centime près. Plus le prix y a réagi souvent, et nettement, plus elles comptent.",
      },
      {
        p: "Quand une résistance est franchie avec une clôture nette au-dessus, elle devient souvent un support. C'est l'un des comportements les plus utiles à connaître : l'ancien plafond sert de plancher.",
      },
      { h2: "4. Les indicateurs : pour confirmer, pas pour décider" },
      {
        p: "Moyennes mobiles, RSI, MACD : les indicateurs sont calculés à partir du prix. Ils n'ajoutent pas d'information, ils la présentent autrement. Ils servent à confirmer ce que vous voyez déjà sur les bougies, par exemple un RSI qui faiblit pendant que le prix fait un nouveau sommet, signe que la hausse s'essouffle.",
      },
      {
        p: "Deux ou trois indicateurs suffisent. Un graphique couvert de courbes ne se lit plus, et chaque indicateur finit par dire une chose différente.",
      },
      { h2: "Ce qu'on retient" },
      {
        ul: [
          "Lisez les bougies pour savoir qui contrôle le marché sur chaque période.",
          "Identifiez la tendance sur au moins une centaine de bougies, et sur l'unité de temps supérieure.",
          "Tracez les zones où le prix a réagi plusieurs fois : ce sont vos repères pour entrer, sortir et placer un stop.",
          "Gardez les indicateurs pour confirmer, jamais pour décider seuls.",
        ],
      },
      {
        p: "Une fois ces quatre éléments en tête, un graphique devient une carte : vous savez où vous êtes, où le prix pourrait aller, et à partir d'où votre idée serait fausse. C'est cette dernière question que la plupart des débutants oublient de se poser.",
      },
    ],
  },
  {
    slug: "supports-et-resistances",
    title: "Supports et résistances : les repérer et s'en servir",
    description:
      "Comment tracer des supports et résistances qui comptent vraiment, reconnaître une vraie cassure et s'en servir pour entrer, sortir ou placer un stop.",
    date: "2026-10-28",
    body: [
      {
        p: "Les supports et les résistances sont les premiers niveaux que tout trader trace, et souvent les plus utiles. Encore faut-il tracer les bons : un graphique couvert de vingt lignes ne dit plus rien.",
      },
      { h2: "Ce qu'est vraiment un support ou une résistance" },
      {
        p: "Un support est une zone de prix où la demande a suffi, plusieurs fois, à arrêter une baisse. Une résistance est une zone où l'offre a suffi à arrêter une hausse. Derrière, il y a des ordres réels : des acheteurs qui ont manqué le dernier rebond et attendent le prix à ce niveau, des vendeurs qui veulent sortir à l'équilibre.",
      },
      {
        p: "C'est pour ça qu'on parle de **zones** et pas de lignes. Le prix dépasse souvent un peu le niveau avant de repartir. Tracer une bande de quelques dixièmes de pour cent évite de croire qu'un niveau est cassé alors qu'il est simplement testé.",
      },
      { h2: "Comment tracer ceux qui comptent" },
      {
        ol: [
          "Partez d'une vue large : plusieurs mois en graphique journalier, ou plusieurs semaines en 4 heures.",
          "Repérez les endroits où le prix a fait demi-tour au moins deux fois. Un seul contact ne fait pas un niveau.",
          "Privilégiez les réactions nettes : longues mèches, forte accélération dans l'autre sens.",
          "Gardez les deux ou trois niveaux les plus proches du prix actuel, au-dessus et en dessous. Les autres sont trop loin pour votre prochaine décision.",
        ],
      },
      { tip: "Les chiffres ronds (60 000 sur le bitcoin, 1,1000 sur l'EUR/USD) attirent souvent des ordres. Quand un niveau tracé tombe près d'un chiffre rond, il gagne en importance." },
      { h2: "Cassure ou fausse cassure ?" },
      {
        p: "Le prix qui passe au-dessus d'une résistance n'est pas une cassure tant que la bougie n'a pas **clôturé** au-dessus. Beaucoup de mouvements percent un niveau pendant quelques minutes puis rechutent : c'est une fausse cassure, et ceux qui ont acheté trop tôt se retrouvent piégés.",
      },
      {
        p: "Deux signes rendent une cassure plus crédible : une clôture franchement au-delà de la zone, et un retour du prix sur l'ancien niveau qui tient (le fameux retest). Attendre ce retour fait parfois manquer le mouvement, mais évite une bonne partie des pièges.",
      },
      { h2: "S'en servir pour un trade" },
      {
        ul: [
          "**Entrer** : près d'un support dans une tendance haussière, ou après la cassure confirmée d'une résistance.",
          "**Placer son stop** : de l'autre côté de la zone qui justifie le trade, avec une marge. Si le support casse, l'idée de départ ne tient plus.",
          "**Viser** : la prochaine résistance pour un achat, le prochain support pour une vente. C'est là que d'autres traders prendront leurs bénéfices.",
        ],
      },
      {
        p: "Cette logique donne un plan complet avant même d'entrer : un point d'entrée, un point où l'on reconnaît s'être trompé, et un objectif réaliste. C'est elle qui permet ensuite de calculer si le trade vaut le risque.",
      },
    ],
  },
  {
    slug: "ou-placer-son-stop-loss",
    title: "Où placer son stop loss : 4 repères tirés du graphique",
    description:
      "Un stop loss se place là où votre idée devient fausse, pas à un pourcentage arbitraire. Quatre repères concrets pour le positionner sur un graphique.",
    date: "2026-10-28",
    body: [
      {
        p: "Le stop loss est l'ordre qui coupe une position quand le prix va contre vous. Beaucoup le placent à un pourcentage fixe, 2 % ou 5 % sous le prix d'entrée. C'est simple, mais le marché ne connaît pas votre pourcentage. Un bon stop se place **là où votre raison d'entrer n'existe plus**.",
      },
      { h2: "1. Sous le support qui justifie l'achat" },
      {
        p: "Vous achetez parce que le prix rebondit sur un support ? Si ce support casse, votre idée est invalidée. Le stop va donc juste en dessous de la zone, pas dessus. Laissez une marge : les prix testent souvent un niveau de quelques dixièmes avant de repartir.",
      },
      { h2: "2. Sous le dernier creux, en tendance haussière" },
      {
        p: "Dans une tendance haussière, chaque creux est plus haut que le précédent. Si le prix passe sous le dernier creux, la structure est rompue : la tendance n'est plus ce qu'elle était. Le stop sous ce creux protège exactement l'hypothèse « la tendance continue ».",
      },
      { h2: "3. Au-delà de la mèche d'une bougie de rejet" },
      {
        p: "Une bougie avec une longue mèche basse sur un support montre que les vendeurs ont été repoussés. Si vous entrez sur ce signal, placez le stop sous l'extrémité de la mèche : si le prix y retourne, le rejet n'a pas tenu.",
      },
      { h2: "4. En fonction de la volatilité" },
      {
        p: "Sur un actif qui bouge beaucoup, un stop serré se fait déclencher par le bruit normal du marché. L'indicateur ATR (Average True Range) mesure l'amplitude moyenne d'une bougie. Placer le stop à une ou deux fois l'ATR au-delà de votre niveau évite d'être sorti par un simple mouvement de routine.",
      },
      { tip: "Si le stop placé au bon endroit est trop loin pour votre capital, ne le rapprochez pas : réduisez la taille de la position. C'est la taille qui s'adapte au stop, jamais l'inverse." },
      { h2: "Les erreurs qui coûtent cher" },
      {
        ul: [
          "Déplacer le stop plus loin quand le prix s'en approche. C'est transformer une petite perte prévue en grosse perte non prévue.",
          "Le placer pile sur un chiffre rond ou sur le niveau lui-même, là où tout le monde a le sien.",
          "Ne pas en mettre du tout « parce que ça va remonter ».",
        ],
      },
      {
        p: "Un stop bien placé ne garantit pas que le trade sera gagnant. Il garantit que, s'il ne l'est pas, la perte reste celle que vous aviez acceptée avant d'entrer.",
      },
    ],
  },
  {
    slug: "ratio-gain-risque",
    title: "Le ratio gain/risque, expliqué simplement",
    description:
      "Comment calculer le ratio gain/risque d'un trade avec l'entrée, le stop et l'objectif, et pourquoi il compte autant que le taux de réussite.",
    date: "2026-10-28",
    body: [
      {
        p: "Le ratio gain/risque compare ce que vous pouvez gagner à ce que vous acceptez de perdre sur un trade. C'est le calcul le plus simple du trading, et l'un des plus négligés.",
      },
      { h2: "Le calcul" },
      {
        p: "Il faut trois prix : l'entrée, le stop et l'objectif. Le risque est la distance entre l'entrée et le stop. Le gain potentiel est la distance entre l'entrée et l'objectif. Le ratio est le second divisé par le premier.",
      },
      {
        p: "Exemple fictif : entrée à 100, stop à 95, objectif à 112. Le risque est de 5, le gain potentiel de 12. Le ratio est de 12 ÷ 5 = **2,4**. Pour 1 euro risqué, vous visez 2,40 euros.",
      },
      { h2: "Pourquoi il compte autant que le taux de réussite" },
      {
        p: "Avec un ratio de 2, vous pouvez vous tromper deux fois sur trois et rester à l'équilibre, hors frais : une victoire à +2 compense deux pertes à -1. À l'inverse, avec un ratio de 0,5, il faut avoir raison deux fois sur trois rien que pour ne pas perdre.",
      },
      {
        p: "C'est pour ça qu'un trader qui gagne souvent peut quand même perdre de l'argent : s'il coupe ses gains trop tôt et laisse courir ses pertes, son ratio réel s'effondre.",
      },
      { tip: "Calculez le ratio avant d'entrer, jamais après. Une fois en position, on a toujours une bonne raison de rapprocher l'objectif ou d'éloigner le stop." },
      { h2: "Un bon ratio ne suffit pas" },
      {
        p: "Un objectif placé très loin donne un ratio flatteur sur le papier, mais le prix n'a aucune raison d'y aller. L'objectif doit correspondre à un vrai niveau du graphique (la prochaine résistance pour un achat), et le stop à l'endroit où l'idée devient fausse. Un ratio n'a de sens que si les trois prix viennent du graphique.",
      },
      {
        ul: [
          "En dessous de 1 : le trade rapporte moins qu'il ne risque. Il faut une très bonne raison de le prendre.",
          "Entre 1,5 et 3 : la zone où se trouvent la plupart des trades raisonnables.",
          "Au-delà de 3 : vérifiez que l'objectif est réaliste, et pas seulement lointain.",
        ],
      },
      {
        p: "Quand aucun trade du graphique n'offre un ratio correct, la meilleure décision est souvent de ne rien faire. Ne pas trader est une position à part entière.",
      },
    ],
  },
  {
    slug: "analyse-technique-ia",
    title: "Analyse technique par IA : ce qu'elle fait bien, et ses limites",
    description:
      "Ce qu'une IA peut lire sur un graphique de prix, ce qu'elle ne peut pas savoir, et comment s'en servir comme second avis plutôt que comme oracle.",
    date: "2026-10-28",
    body: [
      {
        p: "Les modèles d'IA capables de lire des images savent désormais analyser une capture de graphique : repérer la tendance, tracer des niveaux, reconnaître une figure. C'est utile. Ce n'est pas magique pour autant, et mieux vaut savoir où passe la frontière.",
      },
      { h2: "Ce qu'elle fait bien" },
      {
        ul: [
          "**Lire vite et sans fatigue** : la structure du marché, les sommets et creux, les zones de réaction, en quelques secondes et de la même façon à chaque fois.",
          "**Être cohérente** : elle applique les mêmes règles à 2 heures du matin qu'à 10 heures, sans peur de rater le mouvement et sans envie de se refaire après une perte.",
          "**Poser un plan complet** : entrée, stop, objectif, et le niveau qui invaliderait le scénario. C'est précisément ce que l'on oublie quand on décide sous le coup de l'émotion.",
          "**Dire quand il n'y a rien à faire** : un bon outil sait conclure « attendre » ou « ne pas trader » plutôt que de forcer un signal.",
        ],
      },
      { h2: "Ce qu'elle ne peut pas savoir" },
      {
        ul: [
          "**L'avenir.** Aucune analyse, humaine ou automatique, ne sait ce que fera le prix. Une probabilité de 70 % veut dire que le scénario inverse arrive aussi, souvent.",
          "**Ce qui n'est pas sur l'image.** Une capture floue, trop zoomée ou sans axe des prix lisible donne une lecture moins fiable.",
          "**Votre situation.** Elle ne connaît ni votre capital, ni votre tolérance au risque, ni vos autres positions.",
        ],
      },
      { tip: "Une analyse qui sonne toujours sûre d'elle doit vous méfier. Les bonnes analyses disent aussi quand le signal est faible ou contradictoire." },
      { h2: "S'en servir comme second avis" },
      {
        p: "La meilleure façon d'utiliser une analyse par IA est de la confronter à la vôtre. Si elle voit la même chose que vous, votre idée tient. Si elle conclut l'inverse, ou « attendre », c'est le moment de vous demander ce que vous n'avez pas vu. Elle vous fait gagner du temps sur la lecture et vous oblige à formuler un plan chiffré avant de cliquer.",
      },
      {
        p: "C'est l'usage pour lequel Scanzivo a été conçu : vous envoyez une capture de votre graphique, et vous recevez une lecture structurée avec un plan d'action clair, y compris quand ce plan est de ne rien faire. La décision, et le risque, restent les vôtres.",
      },
    ],
  },
  {
    slug: "capture-ecran-graphique",
    title: "Faire une bonne capture de graphique pour l'analyser",
    description:
      "Sur TradingView, Binance, MetaTrader ou sur téléphone : comment faire une capture de graphique lisible, avec ce qu'il faut montrer et ce qu'il faut éviter.",
    date: "2026-10-28",
    body: [
      {
        p: "Que vous demandiez l'avis d'un ami, d'un forum ou d'une IA, la qualité de la réponse dépend d'abord de la capture. Une bonne capture se prépare en trente secondes.",
      },
      { h2: "Ce qui doit être visible" },
      {
        ul: [
          "**L'axe des prix**, lisible, sur le côté droit. Sans lui, impossible de donner un niveau précis.",
          "**Le nom de l'actif et l'unité de temps** (par exemple BTC/USDT, 4H), en haut à gauche sur la plupart des plateformes.",
          "**Assez d'historique** : au moins 50 à 100 bougies. On ne lit pas une tendance sur dix bougies.",
          "**Des bougies**, plutôt qu'une simple courbe : elles montrent les ouvertures, clôtures et mèches.",
        ],
      },
      { h2: "Ce qu'il vaut mieux éviter" },
      {
        ul: [
          "Un zoom extrême sur les dernières bougies.",
          "Une photo de l'écran prise avec un téléphone : reflets, angle, flou.",
          "Un graphique couvert d'indicateurs et de dessins qui cachent les bougies.",
          "Une fenêtre d'ordres ou un pop-up par-dessus le graphique.",
        ],
      },
      { h2: "Selon votre plateforme" },
      { h3: "TradingView" },
      {
        p: "L'icône appareil photo en haut à droite permet de télécharger une image propre du graphique, sans le reste de l'écran. Sinon, une capture d'écran classique de la fenêtre fonctionne très bien.",
      },
      { h3: "Binance et les applications d'exchange" },
      {
        p: "Passez le graphique en plein écran (souvent une icône en forme de flèches), choisissez l'unité de temps, puis faites une capture d'écran du téléphone. Tournez le téléphone à l'horizontale pour afficher plus d'historique.",
      },
      { h3: "MetaTrader 4 et 5" },
      {
        p: "Clic droit sur le graphique, puis « Enregistrer comme image ». Sur mobile, faites une capture d'écran une fois le graphique en mode paysage.",
      },
      { h3: "Sur un ordinateur" },
      {
        p: "Windows : touche Windows + Maj + S, puis sélectionnez la zone du graphique. Mac : Cmd + Ctrl + Maj + 4. Dans les deux cas, la capture va dans le presse-papiers, prête à être collée.",
      },
      { tip: "Sur Scanzivo, une capture copiée peut être collée directement avec Ctrl+V (ou Cmd+V) sur la page, sans passer par un fichier." },
      {
        p: "Une capture nette, avec l'axe des prix et assez d'historique, vaut mieux que dix captures approximatives. C'est elle qui permet de donner des niveaux précis au lieu de généralités.",
      },
    ],
  },
];

export const ARTICLES: Article[] = ARTICLES_FR.map((article) => ({ ...article, locale: "fr" as const }));

export const articlesFor = (locale: Locale) => ARTICLES.filter((article) => article.locale === locale);

export const findArticle = (locale: Locale, slug: string) => ARTICLES.find((article) => article.locale === locale && article.slug === slug);

/** Reading time at about 220 words a minute, never under a minute. */
export function readingMinutes(article: Article) {
  const words = article.body
    .flatMap((block) => Object.values(block))
    .flat()
    .join(" ")
    .split(/\s+/).length;
  return Math.max(1, Math.round(words / 220));
}
