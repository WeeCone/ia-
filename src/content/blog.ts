import type { Locale } from "@/i18n/config";
import { ARTICLES_EN } from "./blog-en";
import { ARTICLES_ES } from "./blog-es";

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
  /** Same in every language: links an article to its translations (hreflang). The French slug. */
  key: string;
  slug: string;
  locale: Locale;
  title: string;
  description: string;
  /** ISO date of publication. */
  date: string;
  body: Block[];
};

const ARTICLES_FR: Omit<Article, "locale" | "key">[] = [
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
  {
    slug: "ia-et-trading",
    title: "IA et trading : ce qu'une intelligence artificielle peut vraiment faire pour vous",
    description:
      "Lire un graphique, résumer l'actualité, tenir un plan : ce que l'IA apporte à un trader particulier, et ce qu'elle ne fera jamais à sa place.",
    date: "2026-10-28",
    body: [
      {
        p: "« Trader avec l'IA » recouvre des choses très différentes : un assistant qui commente un graphique, un outil qui résume l'actualité, un robot qui passe des ordres seul. Pour un trader particulier, la question utile n'est pas de savoir si l'IA est puissante, mais à quelle étape de votre décision elle vous aide.",
      },
      { h2: "Là où elle aide vraiment" },
      { h3: "Lire un graphique sans se raconter d'histoire" },
      {
        p: "Un modèle capable de lire des images repère la tendance, les zones de réaction et les figures en quelques secondes. Surtout, il le fait de la même manière à chaque fois. Vous, après trois pertes d'affilée, vous ne lisez plus le même graphique qu'en début de semaine.",
      },
      { h3: "Poser un plan avant de cliquer" },
      {
        p: "Le point faible de la plupart des traders particuliers n'est pas l'analyse, c'est l'absence de plan : on entre sans savoir où sortir. Un outil qui vous rend systématiquement une entrée, un stop, un objectif et le niveau qui invalide l'idée vous oblige à vous poser ces questions avant d'acheter, pas après.",
      },
      { h3: "Faire le tri dans l'actualité" },
      {
        p: "Une décision de taux, un chiffre d'inflation ou des résultats d'entreprise peuvent effacer n'importe quel signal technique. Une IA connectée au web peut relever les annonces des prochains jours qui concernent votre actif, avec leurs sources, en quelques secondes.",
      },
      { h2: "Ce qu'elle ne fera pas à votre place" },
      {
        ul: [
          "**Prédire le prix.** Elle estime des scénarios. Un scénario donné à 70 % se trompe, par définition, environ trois fois sur dix.",
          "**Choisir combien risquer.** Elle ne connaît ni votre capital, ni vos autres positions, ni ce que vous pouvez vous permettre de perdre.",
          "**Vous empêcher de cliquer.** Le meilleur plan ne sert à rien si vous déplacez votre stop au premier mouvement contraire.",
        ],
      },
      { tip: "Méfiez-vous de tout service qui présente l'IA comme une machine à gagner. Les outils sérieux parlent de probabilités, de plans et de risques, jamais de rendement garanti." },
      { h2: "Par où commencer" },
      {
        p: "Le plus simple est de l'utiliser comme second avis sur des trades que vous auriez pris de toute façon. Analysez d'abord le graphique vous-même, notez votre plan, puis comparez avec la lecture de l'IA. Là où vous êtes d'accord, vous gagnez en confiance. Là où vous divergez, vous apprenez quelque chose : soit sur le marché, soit sur vos propres biais.",
      },
      {
        p: "C'est l'usage pour lequel Scanzivo a été conçu : une capture de graphique, une lecture structurée, un plan chiffré, et la décision qui reste la vôtre.",
      },
    ],
  },
  {
    slug: "analyser-un-graphique-avec-chatgpt",
    title: "Analyser un graphique avec ChatGPT : ce qui marche, ce qui coince",
    description:
      "ChatGPT sait lire une capture de graphique. Voici ce qu'il fait bien, les erreurs à surveiller, et comment formuler votre demande pour obtenir une réponse exploitable.",
    date: "2026-10-28",
    body: [
      {
        p: "Les assistants généralistes comme ChatGPT, Claude ou Gemini acceptent les images. Vous pouvez donc leur envoyer une capture de votre graphique et demander une analyse. Le résultat est souvent intéressant. Il est aussi très variable, et il vaut mieux savoir pourquoi.",
      },
      { h2: "Ce qui marche bien" },
      {
        ul: [
          "Décrire la tendance générale et la structure (sommets, creux, range).",
          "Reconnaître les figures classiques : double sommet, triangle, canal.",
          "Expliquer un indicateur affiché, par exemple ce que signifie un RSI au-dessus de 70.",
          "Répondre à vos questions de suivi, ce qui en fait un bon outil pour apprendre.",
        ],
      },
      { h2: "Ce qui coince" },
      {
        ul: [
          "**Des niveaux approximatifs.** Un assistant généraliste lit parfois mal l'axe des prix et cite un support qui n'existe pas, avec beaucoup d'assurance.",
          "**Des réponses qui changent.** La même capture envoyée deux fois peut donner deux conclusions différentes, faute de méthode fixe.",
          "**Des réponses tièdes.** Sans consigne précise, la réponse décrit beaucoup et tranche peu : « le marché pourrait monter ou baisser ».",
          "**Pas de plan complet.** Entrée, stop, objectif et ratio gain/risque n'arrivent que si vous les demandez, et pas toujours de façon cohérente.",
        ],
      },
      { h2: "Comment mieux formuler votre demande" },
      {
        p: "Une bonne partie du résultat dépend de la question. Donnez le contexte et imposez le format de réponse. Par exemple :",
      },
      {
        tip: "« Voici un graphique BTC/USDT en 4 heures. Indique la tendance, les deux supports et résistances les plus proches avec leur prix lu sur l'axe, puis un seul scénario privilégié avec entrée, stop, objectif et ratio gain/risque. Si aucun trade n'a un ratio supérieur à 1,5, dis-le. »",
      },
      {
        p: "Vérifiez ensuite chaque niveau cité sur votre propre graphique. Si un prix ne correspond à rien de visible, ne l'utilisez pas.",
      },
      { h2: "Généraliste ou outil spécialisé" },
      {
        p: "Un assistant généraliste convient très bien pour apprendre et poser des questions. Un outil spécialisé, comme Scanzivo, applique la même méthode à chaque capture, trace les niveaux sur votre graphique, calcule le ratio gain/risque et sait conclure « attendre » ou « ne pas trader ». Le premier explique, le second vous rend un plan. Dans les deux cas, la décision reste la vôtre.",
      },
    ],
  },
  {
    slug: "bots-de-trading-ia-arnaques",
    title: "Bots de trading « IA » : repérer les promesses trompeuses",
    description:
      "Rendements garantis, robots qui « ne perdent jamais », groupes privés payants : les signaux d'alerte à connaître avant de confier de l'argent à un bot de trading IA.",
    date: "2026-10-28",
    body: [
      {
        p: "Le mot « IA » est devenu un argument de vente pour toutes sortes de services de trading. Certains sont des outils honnêtes. D'autres reprennent les recettes de toujours, avec un vernis technologique. Quelques signaux permettent de faire le tri.",
      },
      { h2: "Les signaux d'alerte" },
      {
        ul: [
          "**Un rendement promis**, surtout chiffré à l'avance : « +5 % par semaine », « 30 % par mois ». Aucun outil ne peut garantir un rendement sur les marchés.",
          "**Des captures de gains sans pertes.** Un historique qui ne montre que des trades gagnants est soit incomplet, soit inventé.",
          "**L'urgence** : places limitées, offre qui expire ce soir, « dernière chance ».",
          "**On vous demande de déposer de l'argent** sur une plateforme que vous ne connaissez pas, ou de donner l'accès à votre compte de courtage.",
          "**Un parrainage rémunéré** au cœur du modèle : vous gagnez surtout en recrutant d'autres personnes.",
        ],
      },
      { tip: "Un outil d'analyse sérieux vous montre comment il raisonne, affiche ses limites et vous laisse décider. Un service qui « trade pour vous » sans rien expliquer vous demande surtout de lui faire confiance." },
      { h2: "Ce qui doit être autorisé" },
      {
        p: "En France, un service qui gère votre argent, place vos ordres à votre place ou vous recommande personnellement quoi acheter exerce une activité réglementée. Il doit être autorisé, par exemple comme prestataire de services d'investissement (vérifiable sur le registre REGAFI) ou comme conseiller en investissements financiers (registre ORIAS).",
      },
      {
        p: "L'Autorité des marchés financiers publie aussi des listes noires de sites et d'entités qui proposent des investissements sans autorisation. Une recherche de quelques secondes sur le site de l'AMF avant de payer évite bien des déconvenues.",
      },
      { h2: "Les bonnes questions à poser" },
      {
        ol: [
          "Qui est derrière le service : une société identifiable, avec des mentions légales ?",
          "Est-ce que je garde la main sur mon argent et sur mes ordres ?",
          "Le service parle-t-il de risques et de pertes, ou seulement de gains ?",
          "Puis-je arrêter facilement, sans frais cachés ?",
        ],
      },
      {
        p: "Un outil qui vous aide à analyser, sans toucher à votre argent et sans promettre de résultat, ne relève pas de ces activités réglementées : c'est à vous de décider et de passer vos ordres. C'est le cas de Scanzivo, qui fournit une lecture de graphique à titre informatif et ne constitue pas un conseil en investissement.",
      },
    ],
  },
  {
    slug: "choisir-un-outil-ia-de-trading",
    title: "Choisir un outil d'IA pour le trading : 7 questions à se poser",
    description:
      "Avant de payer un outil d'IA pour le trading, sept questions simples pour savoir s'il vous fera progresser ou s'il vend surtout une promesse.",
    date: "2026-10-28",
    body: [
      {
        p: "Les outils d'IA pour le trading se multiplient, à tous les prix. Plutôt qu'un classement qui serait vite dépassé, voici les questions qui permettent de juger n'importe lequel en quelques minutes.",
      },
      { h2: "1. Que fait-il exactement ?" },
      {
        p: "Analyser un graphique, envoyer des signaux, passer des ordres automatiquement : ce sont trois métiers différents, avec trois niveaux de risque. Un outil d'analyse vous laisse décider. Un robot qui trade à votre place décide pour vous.",
      },
      { h2: "2. Montre-t-il son raisonnement ?" },
      {
        p: "Un « achetez maintenant » sans explication ne vous apprend rien et ne vous permet pas de vérifier. Une bonne analyse dit pourquoi : la tendance, les niveaux, ce qui invaliderait le scénario.",
      },
      { h2: "3. Sait-il dire « ne faites rien » ?" },
      {
        p: "Un outil qui trouve un trade sur chaque graphique pousse à surtrader. Les meilleures décisions sont souvent d'attendre. Vérifiez que l'outil sait le dire.",
      },
      { h2: "4. Donne-t-il un plan chiffré ?" },
      {
        p: "Entrée, stop, objectif et ratio gain/risque : sans ces quatre éléments, une analyse reste une opinion. Avec eux, vous savez avant d'entrer combien vous risquez et pour quoi.",
      },
      { h2: "5. Fonctionne-t-il avec vos outils ?" },
      {
        p: "Si vous tradez sur TradingView, Binance ou MetaTrader, l'outil doit s'adapter à votre plateforme, pas l'inverse. Une simple capture d'écran est souvent le moyen le plus universel.",
      },
      { h2: "6. Que promet-il ?" },
      {
        p: "Un taux de réussite affiché en gros, des rendements mensuels, des gains « garantis » : fuyez. Un outil honnête parle de probabilités et rappelle que le trading comporte un risque de perte en capital.",
      },
      { h2: "7. Combien coûte-t-il, et comment arrêter ?" },
      {
        p: "Regardez le prix réel après l'essai, ce qui est inclus, et la façon de résilier. Un abonnement qui se résilie en un clic depuis votre espace est bon signe. Un engagement de douze mois sur un outil que vous n'avez pas testé l'est beaucoup moins.",
      },
      {
        tip: "Testez l'outil sur des graphiques passés dont vous connaissez la suite. Vous verrez vite s'il lit le marché avec justesse ou s'il récite des généralités.",
      },
      {
        p: "Pour la transparence : Scanzivo est un outil d'analyse de graphique par capture d'écran. Il répond à ces questions de la façon suivante : il explique son raisonnement, sait conclure « attendre » ou « ne pas trader », donne un plan chiffré, ne promet aucun gain, et l'abonnement se résilie à tout moment depuis votre espace.",
      },
    ],
  },
];

export const ARTICLES: Article[] = [
  ...ARTICLES_FR.map((article) => ({ ...article, key: article.slug, locale: "fr" as const })),
  ...ARTICLES_EN.map((article) => ({ ...article, locale: "en" as const })),
  ...ARTICLES_ES.map((article) => ({ ...article, locale: "es" as const })),
];

/** The same article in the other languages that have it, for hreflang links. */
export const translationsOf = (article: Article) => ARTICLES.filter((other) => other.key === article.key);

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
