import type { Article } from "./blog";

/** French guides published on 2026-11-27. Links are written without the language: `[texte](/blog/slug)`. */
export const ARTICLES_FR_4B: Omit<Article, "locale" | "key">[] = [
  {
    slug: "analyser-un-graphique-tradingview",
    title: "Comment analyser un graphique TradingView, étape par étape",
    description:
      "Une méthode simple pour analyser un graphique TradingView : unité de temps, tendance, niveaux, deux indicateurs au plus, puis un scénario chiffré.",
    date: "2026-11-27",
    body: [
      {
        p: "Pour analyser un graphique TradingView, procédez toujours dans le même ordre : choisissez l'unité de temps, identifiez la tendance, tracez quelques niveaux clés, ajoutez au plus deux indicateurs, puis écrivez un scénario avec une entrée, un stop et un objectif. Cet ordre compte plus que les outils eux-mêmes. Il vous évite de commencer par les détails alors que la structure d'ensemble n'est pas encore claire.",
      },
      { h2: "Par où commencer pour analyser un graphique ?" },
      {
        p: "Commencez par ne rien ajouter. Ouvrez un graphique propre, en chandeliers, sans indicateur ni dessin hérité d'une session précédente. Regardez-le trente secondes. Le prix monte-t-il, descend-il, ou stagne-t-il dans un couloir ? Cette première impression, brute, sert de référence : si vos outils la contredisent plus tard, vous le verrez tout de suite.",
      },
      {
        p: "Ensuite, vous avancez par étapes courtes. Chacune répond à une seule question, et vous ne passez à la suivante que lorsque la précédente a une réponse écrite, même en une ligne. Si vous voulez revoir les bases de la lecture d'un graphique avant cela, le guide [comment lire un graphique de trading](/blog/comment-lire-un-graphique-de-trading) pose le vocabulaire.",
      },
      { h2: "Quelle unité de temps choisir sur TradingView ?" },
      {
        p: "Choisissez l'unité de temps qui correspond à la durée pendant laquelle vous comptez garder une position. Quelqu'un qui garde ses trades quelques jours regardera le graphique journalier et le 4 heures. Quelqu'un qui sort dans la journée regardera plutôt le 1 heure et le 15 minutes. Une unité de temps trop courte multiplie le bruit et les faux signaux ; une unité trop longue rend les stops éloignés et la taille de position minuscule.",
      },
      {
        p: "Une habitude utile consiste à regarder d'abord une unité plus grande pour le contexte, puis l'unité de travail pour le détail. Le sujet est développé dans l'article [choisir son unité de temps](/blog/choisir-son-unite-de-temps). Dans TradingView, le sélecteur se trouve en haut à gauche du graphique ; un simple clic sur l'unité suffit pour la changer.",
      },
      { h2: "Comment repérer la tendance sur un graphique ?" },
      {
        p: "Cherchez la suite des sommets et des creux. Une tendance haussière enchaîne des sommets plus hauts et des creux plus hauts. Une tendance baissière fait l'inverse. Si les sommets et les creux restent dans une zone limitée, le marché est en range, et la logique de lecture change complètement. Vous trouverez les critères détaillés dans [tendance et range](/blog/tendance-et-range).",
      },
      {
        p: "Notez la conclusion en une phrase : « tendance haussière sur le journalier, correction en cours sur le 1 heure », par exemple. Cette phrase vous évitera de chercher des achats dans un marché qui descend nettement, sauf si vous avez une raison précise de le faire.",
      },
      { h2: "Comment tracer les supports et les résistances ?" },
      {
        p: "Un support est une zone où le prix s'est arrêté ou a rebondi plusieurs fois en descendant. Une résistance est la même chose en montant. Repérez les endroits où le prix a réagi nettement, avec des mèches ou des retournements, puis tracez une ligne horizontale ou, mieux, un rectangle fin pour matérialiser la zone. Un niveau n'est jamais un trait au pixel près.",
      },
      {
        ul: [
          "**Peu de niveaux** : trois ou quatre zones autour du prix actuel suffisent. Les niveaux très éloignés ne servent pas à la décision du moment.",
          "**Les plus visibles d'abord** : un niveau que vous voyez sans effort sur un graphique zoomé en arrière a plus de chances d'être regardé par d'autres.",
          "**Des zones, pas des lignes** : laissez de la marge pour les mèches. Une zone d'une épaisseur raisonnable résiste mieux qu'une ligne trop fine.",
        ],
      },
      {
        p: "La méthode complète est dans le guide [supports et résistances](/blog/supports-et-resistances).",
      },
      { h2: "Combien d'indicateurs faut-il ajouter ?" },
      {
        p: "Deux au maximum, et seulement s'ils apportent une information que le prix ne donne pas déjà. Un indicateur dérive du prix : il ne contient rien de plus, il le présente autrement. Il aide à confirmer une impression, par exemple la direction moyenne avec une [moyenne mobile](/blog/moyennes-mobiles), ou l'intérêt du marché avec le [volume](/blog/volume-trading).",
      },
      {
        p: "Choisissez des indicateurs dont vous comprenez le calcul, et gardez les mêmes paramètres d'une analyse à l'autre. Changer de réglages à chaque graphique pour que le signal « colle » revient à se raconter une histoire. Si un indicateur masque les bougies ou que vous devez plisser les yeux pour le lire, retirez-le.",
      },
      { h2: "Comment écrire un scénario avec entrée, stop et objectif ?" },
      {
        p: "Un scénario est une phrase conditionnelle : « si le prix fait telle chose, alors j'agis ici, je me trompe là, j'attends tel niveau ». Il comporte trois éléments chiffrés. L'entrée est le prix ou la condition de déclenchement. Le stop est le niveau où votre idée est invalidée. L'objectif est la zone où vous envisagez de sortir ou d'alléger.",
      },
      {
        ol: [
          "Écrivez la condition d'entrée, par exemple la clôture d'une bougie au-dessus d'une résistance, pas seulement un prix touché.",
          "Placez le stop au-delà d'un point qui invalide réellement l'idée (voir [où placer son stop loss](/blog/ou-placer-son-stop-loss)), pas à une distance choisie au hasard.",
          "Fixez un objectif sur un niveau visible du graphique et calculez le [ratio gain/risque](/blog/ratio-gain-risque). Si le gain potentiel est inférieur au risque, passez votre tour.",
          "Déterminez la quantité à partir du stop et du risque que vous acceptez, avec la méthode de la [taille de position](/blog/taille-de-position).",
        ],
      },
      {
        tip: "Écrivez aussi la condition qui annule le scénario avant l'entrée. Si elle se produit alors que vous n'êtes pas encore en position, vous n'avez rien à faire d'autre que de passer au graphique suivant.",
      },
      { h2: "Comment préparer son graphique avant de le capturer ?" },
      {
        p: "Une capture d'écran n'est utile que si elle montre ce que vous voyez. Avant de l'enregistrer, vérifiez que l'axe des prix est visible à droite, que l'unité de temps est lisible, et que l'actif est identifiable dans le coin supérieur. Sans échelle, personne, humain ou outil, ne peut situer un niveau.",
      },
      {
        ul: [
          "**Assez de bougies** : affichez plusieurs dizaines de bougies, idéalement une centaine, pour que la tendance et les niveaux passés apparaissent.",
          "**Un graphique dégagé** : retirez les fenêtres flottantes, les alertes et les dessins qui n'ont plus de raison d'être.",
          "**Des couleurs lisibles** : gardez un contraste net entre les bougies haussières et baissières, et évitez de superposer des zones colorées opaques.",
          "**Une seule unité de temps par capture** : si vous voulez le contexte, faites une seconde capture plutôt qu'un montage illisible.",
        ],
      },
      {
        p: "Les captures de TradingView fonctionnent très bien pour cet usage. Pour les autres conseils pratiques, consultez [capture d'écran de graphique](/blog/capture-ecran-graphique).",
      },
      { h2: "Quelles sont les erreurs fréquentes quand on analyse un graphique ?" },
      {
        p: "La première est d'empiler les indicateurs. Quand quatre indicateurs sont affichés, il y en a presque toujours un qui confirme ce que vous espérez, et c'est celui que vous regarderez. Vous aurez l'impression d'une analyse rigoureuse alors qu'elle est surtout confuse.",
      },
      {
        p: "La deuxième est de tracer des lignes partout. Un graphique couvert de traits horizontaux et de tendances ne laisse plus voir le prix. Chaque ligne que vous ajoutez devrait répondre à la question : qu'est-ce que je ferais différemment si le prix la touchait ? Sans réponse, effacez-la.",
      },
      {
        ul: [
          "**Ignorer l'unité de temps supérieure** : un « support » sur 5 minutes est souvent balayé par une tendance baissière visible sur le journalier.",
          "**Chercher l'entrée avant le stop** : sans stop défini, vous ne savez ni combien vous risquez ni quelle quantité prendre.",
          "**Modifier le scénario après coup** : déplacer son stop ou son objectif parce que le prix s'approche transforme une analyse en espoir.",
          "**Confondre signal et certitude** : un scénario est une hypothèse. Il peut échouer, c'est précisément pour cela qu'il y a un stop.",
        ],
      },
      { h2: "Une IA peut-elle aider à lire un graphique ?" },
      {
        p: "Elle peut servir de second regard. Vous pouvez envoyer une capture de votre graphique à [Scanzivo](/) pour obtenir une lecture structurée : tendance, niveaux repérés, scénarios possibles. C'est une aide à la lecture, utile pour comparer avec la vôtre ou repérer un niveau oublié, pas une prévision de ce que le prix fera. La décision, le stop et la taille de position restent les vôtres.",
      },
      {
        p: "Pour comprendre ce que ce type d'outil sait faire et ses limites, voyez [analyse technique et IA](/blog/analyse-technique-ia).",
      },
      {
        p: "Ce contenu est pédagogique et ne constitue pas un conseil en investissement. Le trading comporte un risque élevé de perte en capital, pouvant aller jusqu'à la totalité des sommes engagées.",
      },
    ],
  },
  {
    slug: "price-action-pour-debutants",
    title: "Price action : lire le prix sans indicateurs",
    description:
      "La price action, c'est lire le prix seul : sommets, creux, supports, bougies de rejet, cassures et retests, avec ses avantages et ses limites.",
    date: "2026-11-27",
    body: [
      {
        p: "La price action consiste à analyser un marché en lisant directement les mouvements du prix, c'est-à-dire les bougies, les sommets, les creux et les niveaux, sans s'appuyer sur des indicateurs calculés. Le graphique est nu, ou presque. Vous cherchez ce que les acheteurs et les vendeurs ont fait, plutôt que ce qu'une formule en tire.",
      },
      { h2: "Qu'est-ce que la price action en trading ?" },
      {
        p: "C'est une façon de lire un graphique à partir de quatre éléments : la structure (la suite des sommets et des creux), les niveaux (supports et résistances), les bougies (leur forme et leur position) et le comportement du prix autour des niveaux (cassure, rejet, retest). Il n'y a pas de logiciel spécial à installer. N'importe quelle plateforme affichant des chandeliers suffit.",
      },
      {
        p: "L'idée de fond est simple. Les indicateurs sont dérivés du prix : ils arrivent forcément après lui. En lisant le prix directement, vous voyez l'information à la source. Cela ne la rend pas plus fiable pour autant, comme on le verra plus loin, mais la lecture est plus directe et le graphique plus propre.",
      },
      { h2: "Comment lire la structure du marché avec les sommets et les creux ?" },
      {
        p: "Prenez un graphique et repérez les points de retournement : chaque sommet est une bougie ou un groupe de bougies après lesquelles le prix redescend, chaque creux l'inverse. Reliez-les mentalement. Si chaque sommet dépasse le précédent et que chaque creux reste au-dessus du précédent, la structure est haussière. L'inverse donne une structure baissière.",
      },
      {
        ul: [
          "**Sommet plus haut, creux plus haut** : les acheteurs gardent l'initiative.",
          "**Sommet plus bas, creux plus bas** : les vendeurs dominent.",
          "**Sommets et creux au même niveau** : le marché hésite, c'est un range.",
          "**Premier creux plus bas dans une hausse** : signal d'alerte, pas un renversement confirmé. Il demande une lecture prudente.",
        ],
      },
      {
        p: "Cette lecture fonctionne à toutes les échelles, mais pas de la même façon. La structure du journalier compte plus que celle du 5 minutes. Pour approfondir la distinction, lisez [tendance et range](/blog/tendance-et-range).",
      },
      { h2: "Comment repérer les supports et les résistances sans indicateur ?" },
      {
        p: "Cherchez les endroits où le prix a réagi plusieurs fois. Un prix qui rebondit trois fois sur la même zone vous dit qu'il s'y passe quelque chose : des ordres en attente, des positions qui se ferment, ou simplement des opérateurs qui regardent le même niveau. Tracez une zone plutôt qu'une ligne, avec quelques points de marge pour les mèches.",
      },
      {
        p: "Une règle utile : un ancien support cassé devient souvent une résistance, et inversement. Le prix garde en quelque sorte la mémoire de ses zones. Le détail est dans le guide [supports et résistances](/blog/supports-et-resistances).",
      },
      { h2: "Que signifie une bougie de rejet ?" },
      {
        p: "Une bougie de rejet est une bougie dont la mèche est longue par rapport au corps, et dont la mèche pointe vers un niveau. Elle montre que le prix est allé dans une zone puis en est revenu avec force avant la clôture. Un marteau sous un support ou une étoile filante sous une résistance en sont des exemples classiques.",
      },
      {
        p: "Retenez trois points pour ne pas la surinterpréter. Premièrement, une bougie de rejet n'a de sens qu'à un niveau identifié : en plein milieu d'un mouvement, elle ne prouve rien. Deuxièmement, c'est la clôture qui compte, pas le plus haut ou le plus bas atteint en séance. Troisièmement, elle est une information, pas un ordre : vous attendez une confirmation, par exemple la bougie suivante qui valide la direction. Les autres formes sont décrites dans [chandeliers japonais](/blog/chandeliers-japonais).",
      },
      { h2: "Comment distinguer une cassure d'une fausse cassure ?" },
      {
        p: "Une cassure est une clôture au-delà d'un niveau, pas seulement une mèche qui le dépasse. Plus la bougie de cassure est nette, avec un corps large et une clôture loin du niveau, plus elle est crédible. Une mèche qui dépasse puis revient dans la zone indique plutôt un piège : c'est une fausse cassure.",
      },
      {
        ul: [
          "**Attendre la clôture** : un dépassement en cours de bougie peut disparaître avant la fin.",
          "**Regarder le corps** : un petit corps avec une longue mèche est un avertissement.",
          "**Surveiller le retour** : si le prix revient rapidement sous le niveau cassé, la cassure est suspecte.",
        ],
      },
      {
        p: "Ce piège est suffisamment courant pour avoir son propre article : [la fausse cassure](/blog/fausse-cassure).",
      },
      { h2: "Qu'est-ce qu'un retest et comment l'utiliser ?" },
      {
        p: "Un retest est le retour du prix vers un niveau qu'il vient de casser, pour vérifier s'il tient de l'autre côté. Une résistance cassée devient un support potentiel : si le prix revient la toucher et repart, le retest est validé. S'il traverse à nouveau, la cassure était probablement fausse.",
      },
      {
        p: "Voici un exemple illustratif, sans actif réel. Imaginez un prix qui bute plusieurs fois sur une zone autour de 100 (illustratif). Une bougie clôture nettement à 103. Le prix redescend ensuite vers 100,5, forme une bougie avec une longue mèche basse et clôture à 101,5. Un opérateur pourrait écrire le scénario suivant : entrée au-dessus du sommet de cette bougie de rejet, stop sous 99,5 puisque la clôture sous la zone invaliderait l'idée, objectif sur le prochain niveau visible. Le risque est alors d'environ 2 points pour un objectif défini à l'avance, et c'est ce ratio qu'il faut comparer avant de décider, voir [ratio gain/risque](/blog/ratio-gain-risque).",
      },
      {
        tip: "Le retest n'arrive pas toujours. Si le prix part sans revenir, ne courez pas après : attendez la prochaine configuration plutôt que de déplacer votre stop pour justifier une entrée tardive.",
      },
      { h2: "Quels sont les avantages et les limites de la price action ?" },
      {
        p: "Du côté des avantages, le graphique est lisible : peu d'éléments, une logique que l'on peut expliquer en une phrase, et aucun réglage de paramètres à justifier. Vous apprenez aussi à regarder où est votre invalidation, puisque la structure vous donne naturellement des points de stop.",
      },
      {
        p: "Les limites sont réelles. La lecture est subjective : deux personnes peuvent tracer des niveaux différents sur le même graphique, et toutes deux de bonne foi. Elle dépend aussi de l'unité de temps. Enfin, aucune bougie, aucun niveau ne garantit une suite : un rejet peut échouer, un retest peut être traversé. La price action vous donne un cadre pour décider et pour limiter la perte, pas une prédiction.",
      },
      { h2: "Comment s'entraîner à lire le prix ?" },
      {
        ol: [
          "Ouvrez un graphique propre et masquez les indicateurs. Repérez les sommets et les creux sur une centaine de bougies.",
          "Tracez deux ou trois zones de support et de résistance. Notez pourquoi chacune compte.",
          "Faites défiler le graphique vers la gauche, cachez la partie droite, et écrivez ce que vous attendez avant de découvrir la suite.",
          "Tenez un journal : une capture, le scénario, le résultat. Relisez-le au bout de quelques semaines pour voir quelles erreurs reviennent.",
          "Répétez sur plusieurs actifs et plusieurs unités de temps, avant d'engager de l'argent réel. Un compte de démonstration convient très bien.",
        ],
      },
      {
        p: "Pour comparer votre lecture à un autre point de vue, vous pouvez envoyer une capture de votre graphique à [Scanzivo](/) et obtenir une lecture de la tendance, des niveaux et de scénarios possibles. C'est une aide à la lecture qui sert à confronter vos observations, pas une prévision. Si vous passez ensuite aux indicateurs, les [moyennes mobiles](/blog/moyennes-mobiles) sont un point de départ simple.",
      },
      {
        p: "Ce contenu est pédagogique et ne constitue pas un conseil en investissement. Le trading comporte un risque élevé de perte en capital, pouvant aller jusqu'à la totalité des sommes engagées.",
      },
    ],
  },
];
