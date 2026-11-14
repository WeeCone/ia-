import type { Article } from "./blog";

/** French guides published on 2026-11-14. Links are written without the language: `[texte](/blog/slug)`. */
export const ARTICLES_FR_3: Omit<Article, "locale" | "key">[] = [
  {
    slug: "macd-indicateur",
    title: "MACD : comment lire l'indicateur et ses divergences",
    description:
      "Les deux lignes, l'histogramme, les croisements et les divergences du MACD, avec un exemple chiffré et les limites à connaître avant de vous y fier.",
    date: "2026-11-14",
    body: [
      {
        p: "Le MACD (Moving Average Convergence Divergence) mesure l'écart entre deux moyennes mobiles exponentielles pour montrer si l'élan d'un marché s'accélère ou s'essouffle. Il ne prédit rien : il résume la vitesse de la tendance en cours. Utilisé seul, il donne beaucoup de faux signaux.",
      },
      { h2: "Comment le MACD est-il construit ?" },
      {
        p: "Avec les réglages classiques (12, 26, 9), l'indicateur repose sur trois éléments, affichés sous le graphique de prix.",
      },
      {
        ul: [
          "**La ligne MACD** : moyenne mobile exponentielle sur 12 périodes moins celle sur 26 périodes. Quand elle est positive, la moyenne courte est au-dessus de la longue.",
          "**La ligne de signal** : moyenne mobile exponentielle sur 9 périodes de la ligne MACD. Elle réagit plus lentement.",
          "**L'histogramme** : l'écart entre la ligne MACD et la ligne de signal. Il passe au-dessus de zéro quand la MACD est au-dessus de son signal, en dessous dans le cas inverse.",
        ],
      },
      {
        p: "Ces réglages viennent de l'époque des séances de six jours par semaine. Rien ne vous oblige à les garder, mais ce sont ceux que la plupart des traders regardent, donc ceux qui comptent le plus.",
      },
      { h2: "Que signifie un croisement du MACD ?" },
      {
        p: "Quand la ligne MACD passe au-dessus de la ligne de signal, l'élan haussier prend le dessus : c'est un croisement haussier. Quand elle passe en dessous, c'est un croisement baissier. Sur l'histogramme, cela correspond au moment où les barres traversent la ligne zéro.",
      },
      {
        p: "Le passage de la ligne MACD elle-même au-dessus ou en dessous de zéro est un autre repère. Au-dessus de zéro, la moyenne courte est au-dessus de la longue : le marché est plutôt orienté à la hausse. En dessous, plutôt à la baisse.",
      },
      {
        p: "**Exemple (illustratif) :** un actif monte depuis trois semaines, la ligne MACD est positive. Le prix marque une pause, l'histogramme se réduit, puis la ligne MACD recroise son signal vers le bas. Cela ne dit pas que la hausse est finie. Cela dit que l'élan a faibli. À vous de regarder si le prix tient un support avant de conclure.",
      },
      { h2: "Comment lire l'histogramme ?" },
      {
        p: "Ce sont les barres qui comptent, pas seulement leur couleur. Des barres positives qui grandissent montrent une hausse qui prend de la vitesse. Des barres positives qui raccourcissent montrent une hausse qui ralentit, même si le prix monte encore. L'histogramme annonce souvent le croisement quelques bougies avant qu'il ait lieu.",
      },
      { h2: "Qu'est-ce qu'une divergence MACD ?" },
      {
        p: "Il y a divergence quand le prix et l'indicateur racontent deux histoires différentes.",
      },
      {
        ul: [
          "**Divergence baissière** : le prix atteint un nouveau sommet, mais le MACD forme un sommet plus bas. La hausse se fait avec moins d'élan.",
          "**Divergence haussière** : le prix fait un nouveau creux, mais le MACD forme un creux plus haut. La baisse s'essouffle.",
        ],
      },
      {
        p: "C'est un signal d'alerte, pas un signal d'entrée. Une divergence peut durer très longtemps pendant que le prix continue dans le même sens. Beaucoup de traders attendent qu'une cassure de structure ou une bougie de retournement la confirme. Pour ces bougies, voyez les [chandeliers japonais](/blog/chandeliers-japonais).",
      },
      { h2: "Quelles sont les limites du MACD ?" },
      {
        ul: [
          "**Il est en retard.** Il est calculé à partir de moyennes mobiles, donc de prix passés. Le croisement arrive souvent après le début du mouvement.",
          "**Il se trompe en range.** Quand le prix oscille sans direction, les lignes se croisent sans cesse et produisent une série de faux signaux. Pour savoir où vous en êtes, lisez [tendance ou range](/blog/tendance-et-range).",
          "**Il ne donne ni niveau ni stop.** Il ne dit pas où entrer, où sortir ni où placer votre protection. Il faut un graphique avec des [supports et résistances](/blog/supports-et-resistances).",
          "**Il dépend de l'unité de temps.** Un croisement haussier en 5 minutes peut coexister avec une tendance baissière en 4 heures. Voyez comment [choisir son unité de temps](/blog/choisir-son-unite-de-temps).",
        ],
      },
      { h2: "Comment associer le MACD à d'autres outils ?" },
      {
        p: "Le MACD mesure l'élan, le [RSI](/blog/rsi-indicateur) mesure l'excès, les [moyennes mobiles](/blog/moyennes-mobiles) donnent la direction. Aucun ne remplace la lecture du prix lui-même. Une routine simple : repérez la structure (tendance, supports, résistances), puis regardez si le MACD confirme ou contredit ce que vous voyez. S'il contredit, ce n'est pas un ordre de ne rien faire, c'est une raison de réduire la taille ou d'attendre. Pour la taille, voyez la [taille de position](/blog/taille-de-position).",
      },
      { tip: "Si vous débutez, n'ajoutez qu'un seul indicateur à la fois. Observez-le sur vingt graphiques passés avant de lui accorder du poids dans une décision." },
      { h2: "Et si vous voulez une lecture rapide de votre graphique ?" },
      {
        p: "[Scanzivo](/) lit la capture d'écran d'un graphique, avec ou sans indicateurs affichés, et propose des niveaux et un plan numéroté. Vous pouvez vérifier ce qu'il dit du MACD contre ce que vous voyez vous-même : c'est une bonne façon de vous entraîner.",
      },
      {
        p: "Ce contenu est pédagogique et ne constitue pas un conseil en investissement. Le trading comporte un risque de perte en capital, pouvant aller jusqu'à la totalité des sommes engagées.",
      },
    ],
  },
  {
    slug: "moyennes-mobiles",
    title: "Moyennes mobiles : MM20, MM50, MM200, croisements et limites",
    description:
      "Ce que calcule une moyenne mobile, la différence entre SMA et EMA, le rôle des MM20, MM50 et MM200, et pourquoi les croisements trompent en range.",
    date: "2026-11-14",
    body: [
      {
        p: "Une moyenne mobile lisse les prix de clôture sur une période donnée pour faire apparaître la direction. Elle ne prévoit rien : elle décrit ce qui s'est passé. Sa force est de rendre une tendance lisible, sa faiblesse est d'arriver en retard.",
      },
      { h2: "Comment fonctionne une moyenne mobile ?" },
      {
        p: "Une moyenne mobile sur 20 périodes additionne les 20 dernières clôtures et divise par 20. À chaque nouvelle bougie, la plus ancienne sort du calcul et la nouvelle entre : la ligne « se déplace ». Sur un graphique en 1 heure, la MM20 couvre les 20 dernières heures. Sur un graphique journalier, les 20 derniers jours.",
      },
      { h2: "Quelle différence entre SMA et EMA ?" },
      {
        ul: [
          "**SMA (simple)** : toutes les clôtures pèsent pareil. La ligne est régulière mais réagit tard.",
          "**EMA (exponentielle)** : les clôtures récentes pèsent davantage. La ligne colle plus au prix et réagit plus vite, au prix de plus de faux départs.",
        ],
      },
      {
        p: "Aucune n'est meilleure en soi. Sur un même graphique, l'écart entre les deux est souvent faible. Le plus important est de rester cohérent : ne changez pas de type de moyenne à chaque trade pour faire coller l'histoire.",
      },
      { h2: "À quoi servent la MM20, la MM50 et la MM200 ?" },
      {
        p: "Ce sont les périodes les plus suivies, donc celles sur lesquelles beaucoup d'acteurs regardent en même temps.",
      },
      {
        ul: [
          "**MM20** : le court terme. Dans une tendance saine, le prix s'en écarte puis revient souvent la toucher.",
          "**MM50** : le moyen terme. Souvent utilisée comme zone de repli dans une tendance installée.",
          "**MM200** : le long terme. Un prix au-dessus est généralement lu comme un marché haussier de fond, en dessous comme baissier. Sur un graphique journalier, c'est la plus regardée.",
        ],
      },
      {
        p: "**Exemple (illustratif) :** un actif est au-dessus de ses MM20, MM50 et MM200, et les trois sont orientées vers le haut et dans cet ordre. Le prix recule vers la MM50 et y marque une bougie de rejet. Beaucoup de traders y voient une zone d'intérêt. Ce n'est pas une garantie : si la clôture passe nettement sous la MM50, le scénario est à revoir.",
      },
      { h2: "Qu'est-ce qu'un croisement de moyennes mobiles ?" },
      {
        p: "Quand une moyenne courte passe au-dessus d'une moyenne longue, c'est un croisement haussier. L'inverse est un croisement baissier. Le plus connu sur les marchés actions est celui entre la MM50 et la MM200 : on parle de « croix d'or » quand la MM50 passe au-dessus, de « croix de la mort » quand elle passe en dessous.",
      },
      {
        p: "Ces noms sont spectaculaires, pas magiques. Le croisement a lieu longtemps après le début du mouvement, parce que deux moyennes sont déjà du passé. Il confirme souvent une tendance qui a déjà parcouru une bonne partie de son chemin.",
      },
      { h2: "Quelles sont les limites des moyennes mobiles ?" },
      {
        ul: [
          "**Le retard.** Plus la période est longue, plus le signal arrive tard.",
          "**Le range.** Quand le prix évolue sans direction, il traverse la moyenne dans les deux sens et chaque traversée ressemble à un signal. C'est là qu'elles coûtent le plus. Voyez [tendance ou range](/blog/tendance-et-range).",
          "**Pas de niveau précis.** La moyenne est une zone, pas une ligne exacte. Un stop placé pile dessus se fait souvent toucher.",
          "**L'effet d'optimisation.** On trouve toujours après coup la période qui aurait bien marché. Cela ne dit rien de la suite.",
        ],
      },
      { h2: "Comment les utiliser sans se piéger ?" },
      {
        ol: [
          "**Identifiez la tendance** sur une unité de temps supérieure (voir [choisir son unité de temps](/blog/choisir-son-unite-de-temps)).",
          "**Regardez la pente.** Une moyenne plate signale un marché sans tendance : les signaux perdent de leur valeur.",
          "**Cherchez la confluence** : une MM50 qui coïncide avec un support horizontal a plus de poids qu'une MM50 seule. Voyez [supports et résistances](/blog/supports-et-resistances).",
          "**Définissez l'invalidation** : où votre idée est fausse, avec un stop (voir [où placer son stop-loss](/blog/ou-placer-son-stop-loss)).",
        ],
      },
      {
        p: "Les moyennes mobiles se combinent bien avec le [MACD](/blog/macd-indicateur), qui est lui-même fait de moyennes mobiles, et avec les [bandes de Bollinger](/blog/bandes-de-bollinger), dont la ligne centrale est une MM20.",
      },
      { tip: "Pour savoir si la MM200 compte sur votre actif, regardez si le prix a déjà réagi dessus par le passé. Sinon, elle n'est qu'une ligne de plus." },
      {
        p: "Si vous voulez un second avis sur un graphique chargé de lignes, [Scanzivo](/) lit votre capture d'écran et sépare ce qui compte (niveaux, tendance) de ce qui encombre, puis propose un plan numéroté que vous pouvez contester.",
      },
      {
        p: "Ce contenu est pédagogique et ne constitue pas un conseil en investissement. Le trading comporte un risque de perte en capital, pouvant aller jusqu'à la totalité des sommes engagées.",
      },
    ],
  },
  {
    slug: "bandes-de-bollinger",
    title: "Bandes de Bollinger : ce qu'elles mesurent",
    description:
      "Construction des bandes, lecture de la largeur, squeeze, et pourquoi toucher une bande n'est ni un signal d'achat ni un signal de vente.",
    date: "2026-11-14",
    body: [
      {
        p: "Les bandes de Bollinger entourent le prix de deux enveloppes qui s'élargissent quand la volatilité monte et se resserrent quand elle baisse. Elles mesurent la dispersion du prix autour de sa moyenne. Elles ne disent pas où le marché ira, et toucher une bande n'est pas un signal de retournement.",
      },
      { h2: "Comment sont construites les bandes de Bollinger ?" },
      {
        p: "Le réglage classique est (20, 2) et donne trois lignes.",
      },
      {
        ul: [
          "**La bande médiane** : une moyenne mobile simple sur 20 périodes (voir [moyennes mobiles](/blog/moyennes-mobiles)).",
          "**La bande haute** : la médiane plus 2 écarts-types des 20 dernières clôtures.",
          "**La bande basse** : la médiane moins 2 écarts-types.",
        ],
      },
      {
        p: "L'écart-type mesure à quel point les prix s'éloignent de leur moyenne. Plus les bougies sont grandes et agitées, plus il est élevé, plus les bandes s'écartent. Avec 2 écarts-types, le prix passe la plupart du temps entre les deux bandes, mais pas toujours : il en sort régulièrement, et c'est précisément le piège.",
      },
      { h2: "Que dit la largeur des bandes ?" },
      {
        p: "La largeur compte plus que la position du prix. Des bandes larges indiquent une volatilité élevée, par exemple après une annonce ou une forte tendance. Des bandes étroites indiquent un marché calme. La volatilité alterne : après une période calme vient souvent une période agitée, et inversement. C'est l'idée la plus utile de l'outil.",
      },
      { h2: "Qu'est-ce qu'un squeeze de Bollinger ?" },
      {
        p: "Le squeeze, c'est un resserrement des bandes à un niveau bas par rapport aux dernières semaines. Il signale que la volatilité est faible et qu'une expansion pourrait venir. Il ne dit rien sur la direction.",
      },
      {
        p: "**Exemple (illustratif) :** sur un graphique en 1 heure, le prix évolue pendant deux jours dans un couloir étroit, les bandes se rapprochent. Puis une bougie large clôture au-dessus de la bande haute, bandes qui s'ouvrent, volume en hausse. Cela peut être le début d'un mouvement, ou une fausse sortie qui revient dans le couloir. D'où l'intérêt de lire [fausse cassure](/blog/fausse-cassure) avant d'agir sur ce type de signal.",
      },
      { h2: "Toucher la bande haute, est-ce un signal de vente ?" },
      {
        p: "Non. C'est l'erreur la plus répandue. Dans une tendance forte, le prix peut longer la bande haute pendant de nombreuses bougies : on dit qu'il « marche sur la bande ». Vendre à chaque contact reviendrait à se placer contre la tendance à répétition.",
      },
      {
        p: "En revanche, dans un marché sans direction, les bandes servent bien de repères : le prix rebondit souvent vers la médiane après avoir touché une extrémité. Tout dépend du contexte, d'où la nécessité de savoir si vous êtes en tendance ou en range (voir [tendance ou range](/blog/tendance-et-range)).",
      },
      { h2: "Quelles erreurs éviter avec les bandes de Bollinger ?" },
      {
        ul: [
          "**Les lire comme des supports et résistances.** Elles bougent à chaque bougie. Un vrai niveau est horizontal et a déjà été testé ; voyez [supports et résistances](/blog/supports-et-resistances).",
          "**Ignorer la tendance.** Les mêmes bandes donnent des lectures opposées selon le contexte.",
          "**Agir sur un squeeze sans attendre de confirmation.** La direction de la sortie est inconnue. Certains traders attendent une clôture hors des bandes accompagnée d'un volume plus fort (voir [le volume en trading](/blog/volume-trading)).",
          "**Oublier l'unité de temps.** Un squeeze en 5 minutes n'a pas la même portée qu'en journalier. Voyez [choisir son unité de temps](/blog/choisir-son-unite-de-temps).",
          "**Empiler les indicateurs de même nature.** Les bandes, le RSI et le MACD dérivent tous des mêmes prix : trois accords ne valent pas trois preuves.",
        ],
      },
      { h2: "Comment les combiner avec d'autres repères ?" },
      {
        p: "Un usage raisonnable : repérez d'abord la structure (tendance, niveaux), puis servez-vous des bandes pour juger l'état de la volatilité. Une sortie de range appuyée par un resserrement préalable est plus intéressante qu'une sortie en pleine agitation. Le [RSI](/blog/rsi-indicateur) peut aider à voir si le mouvement est déjà très étiré. Et la gestion du risque reste indépendante : la taille se calcule à partir du stop, pas des bandes (voir [taille de position](/blog/taille-de-position)).",
      },
      { tip: "Quand les bandes sont très écartées après un gros mouvement, n'utilisez pas la bande opposée comme objectif. Elle peut être très loin ou déjà en train de se rapprocher." },
      {
        p: "Sur votre propre graphique, [Scanzivo](/) peut lire la capture d'écran avec vos bandes affichées et en tirer des niveaux et un plan numéroté, que vous confrontez ensuite à votre lecture du contexte.",
      },
      {
        p: "Ce contenu est pédagogique et ne constitue pas un conseil en investissement. Le trading comporte un risque de perte en capital, pouvant aller jusqu'à la totalité des sommes engagées.",
      },
    ],
  },
  {
    slug: "retracement-de-fibonacci",
    title: "Retracement de Fibonacci : niveaux et tracé",
    description:
      "Comment tracer les niveaux de Fibonacci pas à pas, ce que signifient 38,2 / 50 / 61,8 %, et pourquoi il faut les traiter comme des zones, pas des certitudes.",
    date: "2026-11-14",
    body: [
      {
        p: "Le retracement de Fibonacci place des niveaux (38,2 %, 50 %, 61,8 %) entre le début et la fin d'un mouvement pour repérer où un repli pourrait s'arrêter. Ce sont des zones d'attention, pas des garanties : beaucoup de traders les regardent, ce qui leur donne parfois du poids, mais le prix les traverse aussi souvent.",
      },
      { h2: "D'où viennent ces pourcentages ?" },
      {
        p: "Ils dérivent de la suite de Fibonacci, où chaque nombre est la somme des deux précédents. Le rapport entre un nombre et le suivant tend vers 61,8 %, et vers 38,2 % avec celui d'après. Le 50 % n'est pas un ratio de Fibonacci à proprement parler : il est ajouté parce que beaucoup de mouvements reviennent à mi-chemin. Aucune loi du marché n'oblige le prix à respecter ces rapports. Leur utilité est pratique : ils donnent des repères objectifs et communs.",
      },
      { h2: "Comment tracer un retracement de Fibonacci ?" },
      {
        ol: [
          "**Repérez un mouvement net** : une jambe claire entre un creux et un sommet (ou l'inverse), sans fouillis.",
          "**Choisissez les deux points** : le départ et l'arrivée du mouvement. Pour une hausse, du creux au sommet. Pour une baisse, du sommet au creux. Utilisez les mèches ou les clôtures, mais restez cohérent.",
          "**Tirez l'outil** dans votre plateforme : les niveaux s'affichent entre les deux points.",
          "**Regardez la réaction du prix** quand il revient vers 38,2 %, 50 % ou 61,8 %.",
        ],
      },
      {
        p: "**Exemple (illustratif) :** un actif monte de 100 à 120. Le mouvement fait 20 points. Le niveau 38,2 % se situe à 120 − 7,64 = 112,36. Le 50 % à 110. Le 61,8 % à 120 − 12,36 = 107,64. Si le prix redescend, on regarde ce qu'il fait autour de ces zones, par exemple une bougie de rejet ou une cassure nette.",
      },
      { h2: "Que signifie chaque niveau ?" },
      {
        ul: [
          "**38,2 %** : un repli faible. Dans une tendance forte, le prix repart souvent de là.",
          "**50 %** : un repli moyen, souvent considéré comme la limite d'une correction « saine ».",
          "**61,8 %** : un repli profond. Au-delà, l'idée de simple pause est mise en doute ; le risque d'un retournement augmente.",
        ],
      },
      {
        p: "Un repli qui dépasse 78,6 % ou revient à l'origine du mouvement invalide le plus souvent le scénario. C'est ce qui donne à l'outil une utilité concrète : il aide à fixer un seuil où l'idée devient fausse.",
      },
      { h2: "Quelles sont les limites de Fibonacci ?" },
      {
        p: "Soyons directs : les retracements ont des limites sérieuses.",
      },
      {
        ul: [
          "**Le choix des points est subjectif.** Deux traders tracent deux grilles différentes sur le même graphique, et chacun trouve des réactions.",
          "**Il y a trop de niveaux.** Avec plusieurs grilles, presque tout prix finit par tomber près d'un niveau. On voit ce qui a marché et on oublie le reste.",
          "**Le prix traverse souvent les niveaux** sans s'arrêter.",
          "**Aucun avantage statistique n'est garanti.** Traitez l'outil comme un repère visuel, non comme une méthode éprouvée.",
        ],
      },
      { h2: "Comment lui donner plus de poids ?" },
      {
        p: "En cherchant la confluence : un niveau de Fibonacci qui tombe sur un [support ou une résistance](/blog/supports-et-resistances) déjà testé, sur une [moyenne mobile](/blog/moyennes-mobiles) importante ou sur un chiffre rond mérite plus d'attention qu'un niveau isolé. Une bougie de rejet à cet endroit (voir [chandeliers japonais](/blog/chandeliers-japonais)) ajoute une confirmation. Sans elle, mieux vaut attendre.",
      },
      {
        p: "Côté risque, le retracement aide à situer le stop : sous le niveau suivant ou sous l'origine du mouvement. Voyez [où placer son stop-loss](/blog/ou-placer-son-stop-loss), puis vérifiez le [ratio gain/risque](/blog/ratio-gain-risque) : l'objectif naturel est le précédent sommet, ce qui donne un rapport mesurable avant d'entrer. Un repli vers 61,8 % avec un stop juste dessous offre généralement un meilleur rapport qu'une entrée à 38,2 %, mais avec moins de chances que le prix atteigne ce niveau.",
      },
      { tip: "Tracez toujours la grille sur la jambe la plus évidente, celle que tout le monde voit. Une grille que vous seul dessinez n'a aucune raison d'être suivie par le marché." },
      {
        p: "Pour comparer votre tracé à un autre regard, [Scanzivo](/) lit une capture d'écran de votre graphique et propose des niveaux d'entrée, de stop et d'objectif dans un plan numéroté, que vous pouvez confronter à votre grille.",
      },
      {
        p: "Ce contenu est pédagogique et ne constitue pas un conseil en investissement. Le trading comporte un risque de perte en capital, pouvant aller jusqu'à la totalité des sommes engagées.",
      },
    ],
  },
  {
    slug: "fausse-cassure",
    title: "Fausse cassure : reconnaître et éviter le piège",
    description:
      "Pourquoi le prix perce un niveau puis revient, les signes qui doivent vous alerter, et trois habitudes pour limiter les dégâts sans prétendre tout éviter.",
    date: "2026-11-14",
    body: [
      {
        p: "Une fausse cassure est une sortie d'un support, d'une résistance ou d'un range qui ne tient pas : le prix franchit le niveau, attire des entrées, puis revient dans la zone. On ne les évite pas toutes. On apprend à les reconnaître plus tôt et à limiter ce qu'elles coûtent.",
      },
      { h2: "Qu'est-ce qu'une fausse cassure ?" },
      {
        p: "Un niveau clair concentre des ordres : des stops juste derrière, des ordres d'entrée de traders de cassure. Quand le prix dépasse ce niveau, ces ordres se déclenchent. S'il n'y a pas assez de demande réelle derrière le mouvement, le prix s'essouffle et retourne. Ceux qui sont entrés sur la cassure sont piégés, et leurs stops alimentent le mouvement inverse.",
      },
      {
        p: "**Exemple (illustratif) :** une résistance à 50 a été testée trois fois. Une bougie dépasse à 50,4, puis le prix redescend et clôture à 49,6. Les acheteurs de la cassure sont dans le rouge. Le niveau 50 n'a pas été cassé : il a été « balayé ».",
      },
      { h2: "Quels signes doivent vous alerter ?" },
      {
        ul: [
          "**Une mèche, pas un corps.** Le prix dépasse le niveau sur une mèche longue, mais la bougie clôture en dessous. La clôture compte plus que le sommet.",
          "**Un volume qui ne suit pas.** Une cassure sans volume supérieur à la normale manque de conviction (voir [le volume en trading](/blog/volume-trading), avec ses limites).",
          "**Un contexte contraire.** La cassure va contre la tendance de l'unité de temps supérieure.",
          "**Un moment fragile.** Ouverture, annonce économique, week-end : la liquidité est plus fine, les mouvements plus nerveux (voir [le calendrier économique](/blog/calendrier-economique)).",
          "**Une bougie de retournement juste après**, comme un englobement ou une étoile du soir. Voyez les [chandeliers japonais](/blog/chandeliers-japonais).",
        ],
      },
      { h2: "Comment éviter de tomber dans le piège ?" },
      { h3: "Attendre une clôture" },
      {
        p: "Au lieu d'entrer dès que le niveau est touché, attendez la clôture de la bougie au-delà du niveau, sur l'unité de temps que vous suivez. Vous perdez un peu de prix. Vous évitez beaucoup de mèches.",
      },
      { h3: "Attendre le retest" },
      {
        p: "Une cassure franche revient souvent tester le niveau, qui devient alors un soutien (ancienne résistance) ou une résistance (ancien support). Si le prix tient sur ce retest, l'entrée est mieux placée et le stop plus proche. Le risque est de rater le mouvement s'il ne revient pas : c'est le prix de la prudence.",
      },
      { h3: "Placer le stop du bon côté" },
      {
        p: "Un stop juste sous le niveau cassé se fait souvent toucher par une mèche. Un stop sous le dernier creux significatif, ou sous la zone, laisse de la marge. Il implique une position plus petite : c'est le calcul décrit dans [taille de position](/blog/taille-de-position) et [où placer son stop-loss](/blog/ou-placer-son-stop-loss).",
      },
      { h2: "Peut-on profiter d'une fausse cassure ?" },
      {
        p: "Certains traders la traitent comme un signal en soi : le prix revient sous la résistance, ils vendent avec un stop au-dessus de la mèche. L'idée est logique, puisque le stop est précis et proche, ce qui donne un bon [ratio gain/risque](/blog/ratio-gain-risque). Mais elle reste un pari : une seconde tentative de cassure peut réussir là où la première a échoué.",
      },
      { h2: "Quelles erreurs fréquentes aggravent la situation ?" },
      {
        ul: [
          "**Courir derrière le prix** : entrer tard sur une bougie déjà étirée.",
          "**Augmenter la taille pour « se refaire »** après un piège.",
          "**Déplacer le stop** quand le prix revient contre vous.",
          "**Confondre range et tendance** : en range, la plupart des cassures échouent (voir [tendance ou range](/blog/tendance-et-range)).",
          "**Ignorer le contexte** : cassure sur 5 minutes contre une tendance forte en 4 heures.",
        ],
      },
      { tip: "Notez vos dix dernières cassures, avec résultat et contexte. Vous verrez vite si vos échecs viennent d'un moment, d'un type de niveau ou de votre impatience." },
      {
        p: "Avant de décider, il peut aider de faire relire votre graphique : [Scanzivo](/) analyse une capture d'écran, repère les niveaux de cassure possibles et propose un plan numéroté avec invalidation, que vous gardez ou rejetez.",
      },
      {
        p: "Ce contenu est pédagogique et ne constitue pas un conseil en investissement. Le trading comporte un risque de perte en capital, pouvant aller jusqu'à la totalité des sommes engagées.",
      },
    ],
  },
  {
    slug: "tendance-et-range",
    title: "Tendance ou range : comment les reconnaître",
    description:
      "Sommets et creux, pente des moyennes, absence de direction : les repères pour distinguer un marché en tendance d'un marché en range, et ce que cela change.",
    date: "2026-11-14",
    body: [
      {
        p: "Un marché est en tendance quand il enchaîne des sommets et des creux de plus en plus hauts (ou de plus en plus bas). Il est en range quand il oscille entre un plafond et un plancher sans progresser. Reconnaître lequel des deux vous avez devant vous est la première question à se poser, parce que la plupart des outils fonctionnent dans l'un et échouent dans l'autre.",
      },
      { h2: "Comment reconnaître une tendance haussière ou baissière ?" },
      {
        p: "Le repère le plus simple est la structure.",
      },
      {
        ul: [
          "**Tendance haussière** : chaque sommet dépasse le précédent, chaque creux est plus haut que le précédent.",
          "**Tendance baissière** : chaque sommet et chaque creux sont plus bas que les précédents.",
        ],
      },
      {
        p: "On peut ajouter la pente des [moyennes mobiles](/blog/moyennes-mobiles) : une MM50 nettement inclinée, avec un prix qui reste du même côté, confirme la direction. Mais la structure prime : une moyenne est une conséquence du prix, pas une cause.",
      },
      {
        p: "**Exemple (illustratif) :** creux à 100, sommet à 110, repli à 104, nouveau sommet à 116, repli à 108. Les creux (100, 104, 108) et les sommets (110, 116) montent : tendance haussière. Si le prochain repli passe sous 108, la structure est cassée et la lecture change.",
      },
      { h2: "Comment reconnaître un range ?" },
      {
        ul: [
          "Le prix rebondit au moins deux fois sur un même plancher et sur un même plafond.",
          "Les moyennes mobiles sont plates et le prix les traverse dans les deux sens.",
          "Les sommets et les creux ne progressent pas.",
          "Les bougies sont souvent petites, avec des mèches des deux côtés.",
        ],
      },
      {
        p: "Le plafond et le plancher sont vos [supports et résistances](/blog/supports-et-resistances). La largeur du range détermine ce qu'il reste de potentiel : un range étroit, c'est peu de place pour un bon [ratio gain/risque](/blog/ratio-gain-risque) après frais.",
      },
      { h2: "Comment adapter sa lecture selon le marché ?" },
      { h3: "En tendance" },
      {
        p: "Les replis vers une moyenne ou un support sont des zones d'intérêt dans le sens de la tendance. Les [indicateurs d'élan](/blog/macd-indicateur) donnent des signaux utiles, et les retracements ([Fibonacci](/blog/retracement-de-fibonacci)) aident à situer la profondeur du repli. Le risque principal : trader contre la tendance parce que le prix « est trop haut ».",
      },
      { h3: "En range" },
      {
        p: "Les extrémités sont les zones d'intérêt, le milieu est une zone sans avantage. Un [RSI](/blog/rsi-indicateur) qui touche des extrêmes est plus utile ici qu'en tendance forte. Le risque principal : se faire surprendre par la sortie, qui peut être une [fausse cassure](/blog/fausse-cassure) ou une vraie.",
      },
      { h2: "Et quand le marché passe de l'un à l'autre ?" },
      {
        p: "C'est le moment le plus difficile. Une tendance finit souvent par un range (le marché se met en pause), et un range finit par une tendance (le marché choisit un camp). Quelques signaux de transition : une cassure de la structure (un creux qui passe sous le précédent dans une hausse), un resserrement de la volatilité (voir [bandes de Bollinger](/blog/bandes-de-bollinger)), ou un volume qui change de comportement (voir [le volume en trading](/blog/volume-trading)).",
      },
      { h2: "L'unité de temps change-t-elle la réponse ?" },
      {
        p: "Oui, et c'est une source de confusion. Un marché peut être en tendance haussière en journalier et en range en 15 minutes. La règle pratique : identifiez la direction sur une unité de temps supérieure, puis cherchez votre entrée sur une unité plus fine. Voyez [choisir son unité de temps](/blog/choisir-son-unite-de-temps) et, pour les bases, [comment lire un graphique de trading](/blog/comment-lire-un-graphique-de-trading).",
      },
      { h2: "Quelles erreurs reviennent le plus souvent ?" },
      {
        ul: [
          "**Voir une tendance partout.** Un mouvement de trois bougies n'est pas une tendance.",
          "**Appliquer la même méthode tout le temps.** Une stratégie de cassure en range, ou de rebond en tendance forte, s'use vite.",
          "**Ignorer le contexte d'annonce.** Une publication peut casser un range sans prévenir (voir [calendrier économique](/blog/calendrier-economique)).",
          "**Modifier sa lecture à chaque bougie.** Fixez vos critères d'avance.",
        ],
      },
      { tip: "Posez-vous une question avant chaque trade : si je coupe l'écran et rouvre dans une semaine, le prix est-il plutôt plus haut, plus bas ou au même endroit ? Votre réponse dit ce que vous croyez voir." },
      {
        p: "Pour un regard extérieur, [Scanzivo](/) lit votre capture d'écran, indique si la structure ressemble à une tendance ou à un range et propose des niveaux avec un plan numéroté. Vérifiez toujours ce qu'il dit avec votre propre lecture.",
      },
      {
        p: "Ce contenu est pédagogique et ne constitue pas un conseil en investissement. Le trading comporte un risque de perte en capital, pouvant aller jusqu'à la totalité des sommes engagées.",
      },
    ],
  },
  {
    slug: "volume-trading",
    title: "Le volume en trading : ce qu'il confirme",
    description:
      "Comment lire les barres de volume, ce qu'elles confirment sur une cassure ou une tendance, et pourquoi le volume du forex et de la crypto n'a pas le même sens.",
    date: "2026-11-14",
    body: [
      {
        p: "Le volume mesure la quantité échangée pendant une bougie. Il aide à juger si un mouvement s'appuie sur une participation réelle ou s'il est mince. Il ne donne pas la direction, et selon le marché (actions, crypto, forex), il ne veut pas dire la même chose.",
      },
      { h2: "Que mesure vraiment le volume ?" },
      {
        p: "Sous le graphique, chaque barre représente le nombre d'unités échangées sur la période : actions, contrats, ou unités de crypto. Une barre haute signifie beaucoup d'échanges, une barre basse peu. Ce qui compte, c'est la comparaison avec les barres récentes, pas la valeur brute.",
      },
      { h2: "Qu'est-ce que le volume confirme ?" },
      {
        ul: [
          "**Une cassure.** Un prix qui sort d'un niveau avec un volume nettement plus élevé a plus de chances d'être suivi qu'une sortie sur volume faible. Cela réduit le risque de [fausse cassure](/blog/fausse-cassure), sans l'éliminer.",
          "**Une tendance.** Dans une hausse saine, le volume s'élève souvent sur les poussées et se calme sur les replis.",
          "**Un pic d'épuisement.** Un volume exceptionnel après un long mouvement peut marquer une fin de tendance, mais seulement si le prix réagit ensuite.",
          "**Un niveau.** Un support qui est défendu avec du volume est plus crédible qu'un niveau touché sans activité. Voyez [supports et résistances](/blog/supports-et-resistances).",
        ],
      },
      {
        p: "**Exemple (illustratif) :** un prix franchit une résistance. Les 20 barres précédentes tournent autour de 1 000 unités, la barre de cassure en affiche 3 500. La participation est nette. Si elle en affiche 900, la cassure est suspecte : peu d'acteurs ont suivi.",
      },
      { h2: "Ce que le volume ne dit pas" },
      {
        ul: [
          "**La direction.** Un gros volume peut accompagner une hausse ou une baisse. Il indique de l'activité, pas qui a gagné.",
          "**L'intention.** Des achats et des ventes se croisent à chaque échange : le volume les compte tous.",
          "**La suite.** Un pic ne prévoit pas la bougie suivante.",
        ],
      },
      { h2: "Le volume en crypto : fiable ?" },
      {
        p: "En crypto, le volume est consolidé à partir de nombreuses plateformes, ou limité à une seule selon la source de votre graphique. Les chiffres diffèrent donc d'une plateforme à l'autre, et une partie du volume déclaré par certaines places a été remise en question. Ce n'est pas inutile : les pics relatifs gardent un sens sur une même source. Mais les comparaisons entre plateformes et les valeurs absolues demandent de la prudence. Le marché tourne aussi 24 h sur 24, ce qui fait varier le volume selon les heures (voir [analyse technique du bitcoin](/blog/analyse-technique-bitcoin)).",
      },
      { h2: "Le volume en forex : un cas à part" },
      {
        p: "Le forex n'a pas de place centrale unique : les échanges se font de gré à gré entre banques et courtiers. Le « volume » affiché par la plupart des plateformes de détail est un volume de ticks, c'est-à-dire le nombre de changements de prix, pas la quantité réellement échangée. Il reste corrélé à l'activité, donc utilisable comme indice d'agitation, mais il ne remplace pas un vrai volume de bourse. Sur les CFD, c'est pareil : vous voyez celui du courtier, pas celui du marché.",
      },
      { h2: "Comment l'utiliser en pratique ?" },
      {
        ol: [
          "**Comparez à la moyenne récente.** Une barre vaut par rapport à ses voisines.",
          "**Lisez-le avec le prix.** Gros volume et petite bougie : beaucoup d'échanges sans progrès, un signe d'absorption. Gros volume et grande bougie : un mouvement porté.",
          "**Tenez compte de l'heure.** L'ouverture et les annonces gonflent le volume sans signification particulière (voir [calendrier économique](/blog/calendrier-economique)).",
          "**Gardez-le comme confirmation**, jamais comme déclencheur unique. La [structure](/blog/tendance-et-range) passe avant.",
        ],
      },
      { tip: "Si la source de volume de votre graphique est douteuse (forex, CFD), ne basez aucune décision dessus. Servez-vous-en uniquement pour repérer les moments d'activité." },
      {
        p: "Le volume est l'un des éléments que [Scanzivo](/) peut lire sur une capture d'écran, avec la structure et les niveaux : il en tire un plan numéroté. Mais il ne voit que ce que votre graphique affiche, donc la fiabilité de la source reste votre affaire.",
      },
      {
        p: "Ce contenu est pédagogique et ne constitue pas un conseil en investissement. Le trading comporte un risque de perte en capital, pouvant aller jusqu'à la totalité des sommes engagées.",
      },
    ],
  },
  {
    slug: "analyse-technique-bitcoin",
    title: "Analyse technique du bitcoin : lire un graphique BTC",
    description:
      "Comment lire un graphique du bitcoin : unités de temps, volatilité, niveaux, effet des annonces et limites d'une analyse qui reste un scénario, pas une prédiction.",
    date: "2026-11-14",
    body: [
      {
        p: "Lire un graphique du bitcoin demande les mêmes outils que pour n'importe quel actif : tendance, supports et résistances, volume, gestion du risque. Ce qui change, c'est la volatilité, le marché ouvert 24 h sur 24 et la sensibilité aux annonces. Une analyse reste un scénario avec un point d'invalidation, jamais une prédiction.",
      },
      { h2: "Qu'est-ce qui rend le BTC différent des autres actifs ?" },
      {
        ul: [
          "**Un marché continu.** Il n'y a ni ouverture ni clôture quotidienne. Le week-end, la liquidité est plus fine et les mouvements peuvent être brusques.",
          "**Une volatilité élevée.** Des variations de plusieurs pourcents en une journée ne sont pas rares. Vos stops et vos tailles de position doivent en tenir compte (voir [taille de position](/blog/taille-de-position)).",
          "**Plusieurs places d'échange.** Les prix et les volumes varient légèrement selon la plateforme (voir [le volume en trading](/blog/volume-trading)).",
          "**Une sensibilité aux nouvelles.** Décisions de régulateurs, annonces de produits financiers, piratages, déclarations de banques centrales.",
        ],
      },
      { h2: "Quelle unité de temps choisir pour le bitcoin ?" },
      {
        p: "Tout dépend de votre horizon. Un schéma courant : le graphique journalier ou de 4 heures donne la direction et les grands niveaux, le 1 heure ou le 15 minutes sert à placer l'entrée. En 24 h, on regarde surtout les bougies de 5 à 15 minutes et le 1 heure. Sur 7 jours, le 4 heures et le journalier donnent une vue plus stable. Plus l'unité est courte, plus le bruit est fort. Détail dans [choisir son unité de temps](/blog/choisir-son-unite-de-temps).",
      },
      { h2: "Comment repérer les niveaux importants sur le BTC ?" },
      {
        p: "Commencez par les extrêmes des semaines passées : sommets et creux qui ont arrêté le prix plusieurs fois. Ajoutez les chiffres ronds (par exemple les milliers pleins), que beaucoup d'acteurs regardent. Puis cherchez les zones où le prix a changé de comportement, comme d'ancienne résistance devenue soutien. La méthode est celle de [supports et résistances](/blog/supports-et-resistances), et elle s'applique tout aussi bien à l'or : voyez [niveaux ronds sur l'or](/blog/niveaux-ronds-or).",
      },
      {
        p: "**Exemple (illustratif, chiffres inventés) :** le BTC oscille depuis dix jours entre 60 000 et 64 000. Le plafond a été testé trois fois, le plancher deux. Tant que le prix reste dans ce couloir, on est en range (voir [tendance ou range](/blog/tendance-et-range)). Une clôture journalière au-dessus de 64 000 avec un volume plus fort devient un scénario haussier. Une clôture sous 60 000 invalide le range par le bas.",
      },
      { h2: "Quels indicateurs utiliser sur le bitcoin ?" },
      {
        p: "Peu, et sans en abuser. Les [moyennes mobiles](/blog/moyennes-mobiles) (MM50, MM200 en journalier) donnent le contexte. Le [RSI](/blog/rsi-indicateur) signale les excès, mais en tendance forte il reste longtemps en zone extrême. Le [MACD](/blog/macd-indicateur) mesure l'élan. Les [bandes de Bollinger](/blog/bandes-de-bollinger) aident à voir les phases de calme avant les grands mouvements. Aucun ne remplace la lecture du prix, et leur accord ne prouve rien.",
      },
      { h2: "Comment tenir compte des annonces ?" },
      {
        p: "Avant d'entrer, regardez ce qui est prévu : les publications macroéconomiques américaines (inflation, emploi, décisions de la Fed) font réagir le bitcoin comme beaucoup d'autres actifs risqués. Consultez le [calendrier économique](/blog/calendrier-economique) et évitez d'ouvrir une position juste avant un rendez-vous majeur sans l'avoir décidé en connaissance de cause. Les nouvelles imprévues, elles, n'ont pas de calendrier : c'est une raison de plus de toujours avoir un stop défini à l'avance (voir [où placer son stop-loss](/blog/ou-placer-son-stop-loss)).",
      },
      { h2: "Quelles erreurs sont fréquentes sur le BTC ?" },
      {
        ul: [
          "**Utiliser un levier élevé** sur un actif déjà très volatil : une mèche suffit à liquider une position.",
          "**Suivre les mouvements par peur de les rater**, et entrer tard après une grande bougie.",
          "**Confondre bruit et signal** sur les petites unités de temps.",
          "**Se fier à un volume ou à un prix d'une seule plateforme** sans vérifier.",
          "**Tomber dans une [fausse cassure](/blog/fausse-cassure)**, fréquentes autour des chiffres ronds.",
          "**Se laisser séduire par les promesses** de bots ou de signaux : voyez [bots de trading IA et arnaques](/blog/bots-de-trading-ia-arnaques).",
        ],
      },
      { h2: "Quelles sont les limites d'une analyse technique du bitcoin ?" },
      {
        p: "Le bitcoin réagit aussi à des facteurs que le graphique ne montre pas : régulation, flux institutionnels, événements propres à la crypto. L'analyse technique cadre le risque et situe les niveaux, elle ne dit pas ce qui va arriver. Beaucoup de traders restent à l'écart tant que leur scénario n'est pas clair, et c'est un choix légitime.",
      },
      { tip: "Écrivez avant d'entrer : niveau d'entrée, stop, objectif et montant risqué. Si l'un des quatre manque, vous n'avez pas de plan, seulement une intuition." },
      {
        p: "Pour gagner du temps, [Scanzivo](/) peut lire une capture d'écran de votre graphique BTC et proposer des niveaux et un plan numéroté. Pour la prise de vue, voyez [capture d'écran du graphique](/blog/capture-ecran-graphique). Et pour comprendre ce que l'IA peut ou non faire, lisez [l'IA et le trading](/blog/ia-et-trading).",
      },
      {
        p: "Ce contenu est pédagogique et ne constitue pas un conseil en investissement. Le trading de cryptomonnaies comporte un risque élevé de perte en capital, pouvant aller jusqu'à la totalité des sommes engagées.",
      },
    ],
  },
];
