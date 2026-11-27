import type { Article } from "./blog";

/** French guides published on 2026-11-27. Links are written without the language: `[texte](/blog/slug)`. */
export const ARTICLES_FR_4A: Omit<Article, "locale" | "key">[] = [
  {
    slug: "analyse-multi-unites-de-temps",
    title: "Analyse multi-unités de temps : combiner plusieurs graphiques",
    description:
      "Comment combiner trois unités de temps : tendance et niveaux sur la plus grande, analyse au milieu, entrée sur la plus petite. Règle, exemple et erreurs.",
    date: "2026-11-27",
    body: [
      {
        p: "L'analyse multi-unités de temps consiste à regarder le même actif sur plusieurs graphiques de durées différentes, puis à les lire dans l'ordre, de la plus grande unité vers la plus petite. La grande unité donne le contexte (tendance, niveaux majeurs), l'unité intermédiaire dessine le scénario, la petite unité sert à positionner l'entrée et le stop. Chaque graphique répond à une question différente.",
      },
      {
        h2: "Pourquoi regarder plusieurs unités de temps sur un même actif ?",
      },
      {
        p: "Un graphique isolé ment par omission. Sur une bougie de 15 minutes, une baisse de quelques points peut ressembler à un effondrement, alors qu'elle n'est qu'un petit recul dans une tendance haussière installée depuis des semaines. À l'inverse, un joli rebond sur le graphique journalier peut venir buter sur un niveau que seul le graphique hebdomadaire laisse voir.",
      },
      {
        p: "Regarder plusieurs unités ne rend pas l'analyse plus sophistiquée, cela la rend moins myope. Vous replacez chaque mouvement dans son cadre : est-ce un simple bruit, un retournement local, ou une phase d'un mouvement bien plus large ? Cette question change la manière dont vous interprétez presque tout le reste.",
      },
      {
        p: "Si vous n'avez pas encore choisi l'unité sur laquelle vous travaillez principalement, commencez par l'article [choisir son unité de temps](/blog/choisir-son-unite-de-temps). Celui-ci explique comment en retenir une seule. Ici, on part du principe que vous en avez une, et on en ajoute deux autour.",
      },
      {
        h2: "Quelles sont les trois unités à combiner ?",
      },
      {
        p: "Le schéma le plus courant est un triplet : une unité supérieure, une unité d'analyse et une unité d'entrée. Les noms varient selon les auteurs, l'idée reste la même.",
      },
      {
        ul: [
          "**Unité supérieure** : elle sert à lire la tendance de fond et à repérer les [supports et résistances](/blog/supports-et-resistances) majeurs, ceux que le marché a respectés à plusieurs reprises. On ne trade pas dessus, on la consulte pour savoir dans quel décor on se trouve.",
          "**Unité d'analyse** : c'est celle où vous construisez votre scénario. Vous y repérez la structure en cours (progression, pullback, consolidation), les zones à surveiller et l'endroit où le scénario serait invalidé.",
          "**Unité d'entrée** : plus fine, elle permet de choisir un point d'entrée précis et de placer un stop proche d'une structure visible, au lieu de viser large par défaut.",
        ],
      },
      {
        p: "Un repère de proportions : l'unité supérieure vaut en général quatre à six fois l'unité d'analyse, et l'unité d'entrée est de la même façon quatre à six fois plus courte. Par exemple hebdomadaire, journalier, 4 heures. Ou journalier, 4 heures, 1 heure. Ce ne sont pas des lois, seulement des rapports qui donnent des images suffisamment différentes les unes des autres.",
      },
      {
        h2: "Dans quel ordre lire les graphiques ?",
      },
      {
        p: "La règle tient en une phrase : on va toujours de la plus grande unité vers la plus petite. Jamais l'inverse. Si vous commencez par le petit graphique, vous construisez une idée et vous allez ensuite chercher sur les autres de quoi la conforter. Commencer par le haut vous oblige à accepter le contexte tel qu'il est.",
      },
      {
        ol: [
          "Ouvrez l'unité supérieure. Notez la direction dominante, les deux ou trois niveaux majeurs les plus proches du prix et la position du prix dans le mouvement (en bas d'un range, au pied d'une résistance, en pleine tendance).",
          "Passez à l'unité d'analyse. Cherchez comment le prix se comporte par rapport à ces niveaux. Formulez un scénario simple, avec une condition d'invalidation.",
          "Descendez sur l'unité d'entrée seulement si le scénario tient. Cherchez une configuration qui s'aligne avec lui, et repérez la structure derrière laquelle le stop aurait du sens.",
          "Si les unités se contredisent, ne forcez rien. Ce désaccord est une information : le marché n'est pas lisible à cet instant.",
        ],
      },
      {
        p: "Pour savoir si la grande unité est en tendance ou en zone de consolidation, appuyez-vous sur l'article [tendance et range](/blog/tendance-et-range). Cette distinction détermine tout le reste de la lecture.",
      },
      {
        h2: "Un exemple concret de lecture sur trois graphiques ?",
      },
      {
        p: "Voici un exemple illustratif, avec des niveaux inventés pour l'occasion et sans lien avec un actif réel. Imaginons un instrument fictif.",
      },
      {
        ul: [
          "**Hebdomadaire** : le prix monte depuis plusieurs mois, avec des creux de plus en plus hauts. Une résistance majeure se situe à 1 200, un ancien sommet. Le prix évolue à 1 130. Le contexte est haussier, mais il reste une zone de blocage potentielle à environ 70 points.",
          "**Journalier** : le prix vient de reculer vers 1 100, une zone où se trouvaient plusieurs rebonds précédents. Le scénario : un rebond sur ce support, avec invalidation si le prix clôture nettement sous 1 085.",
          "**4 heures** : après le recul, le prix forme un creux plus haut et reprend le dessus sur un petit sommet intermédiaire à 1 112. L'entrée est envisagée autour de 1 114, avec un stop sous le dernier creux à 1 095.",
        ],
      },
      {
        p: "Le risque est ici d'environ 19 points (1 114 moins 1 095). La résistance hebdomadaire à 1 200 est à 86 points de l'entrée, soit un potentiel d'un peu plus de quatre fois le risque, avant même de savoir si le prix ira jusque-là. Voilà ce que l'unité supérieure apporte : elle dit où la place est limitée. Si la résistance avait été à 1 125, le même signal sur le 4 heures aurait offert un rapport très médiocre, et le mieux aurait été de passer son tour. Pour évaluer ce rapport, voyez [le ratio gain/risque](/blog/ratio-gain-risque).",
      },
      {
        h2: "Qu'est-ce que cela change pour le stop-loss ?",
      },
      {
        p: "Beaucoup de choses. Sur l'unité d'entrée, un stop se place derrière une structure fine, donc proche. C'est pratique pour limiter le risque en points, mais c'est aussi un stop que le bruit ordinaire du marché peut toucher facilement. Sur l'unité d'analyse, la structure est plus solide et le stop plus éloigné, ce qui demande une position plus petite pour risquer le même montant.",
      },
      {
        p: "L'approche multi-unités propose un compromis lisible. Vous entrez sur l'unité fine, mais vous vérifiez que votre stop ne se trouve pas dans une zone que l'unité supérieure considère comme un simple creux de passage. Si le stop est juste au-dessus d'un support majeur du journalier, il y a de bonnes chances qu'il soit balayé avant que le prix ne rebondisse. Mieux vaut le placer derrière ce support, et réduire la taille en conséquence. Le détail de la méthode figure dans [où placer son stop-loss](/blog/ou-placer-son-stop-loss).",
      },
      {
        h2: "Quelles erreurs commettre le plus souvent avec plusieurs unités ?",
      },
      {
        ul: [
          "**Chercher l'unité qui donne raison.** Vous avez une idée haussière, le journalier est baissier, alors vous basculez sur le 15 minutes où l'on trouve forcément un petit mouvement qui l'arrange. C'est la plus fréquente et la plus coûteuse des dérives.",
          "**Empiler trop d'unités.** Avec six ou sept graphiques ouverts, il existe toujours un signal quelque part. Trois unités suffisent. Au-delà, vous ajoutez de la confusion et non de l'information.",
          "**Lire dans le mauvais sens.** Partir de l'entrée pour remonter vers le contexte donne une analyse biaisée par ce que vous espériez voir.",
          "**Ignorer le désaccord.** Quand les unités racontent des histoires opposées, beaucoup de débutants prennent celle qui leur plaît. Le plus sobre est de s'abstenir.",
          "**Confondre accord et certitude.** Que trois graphiques pointent dans la même direction rend le scénario plus cohérent, pas plus sûr. Une [fausse cassure](/blog/fausse-cassure) peut surprendre sur toutes les unités à la fois.",
        ],
      },
      {
        h2: "Peut-on utiliser une capture d'écran pour s'entraîner ?",
      },
      {
        p: "Oui, et c'est un bon exercice : prenez trois captures du même actif aux trois unités, au même instant, et écrivez en deux lignes ce que chacune vous dit avant de décider quoi que ce soit. Vous pouvez aussi envoyer une capture à [Scanzivo](/), qui en propose une lecture (tendance, niveaux, scénarios possibles). C'est une aide à la lecture pour confronter votre propre analyse, pas une prévision : le résultat doit être recoupé avec ce que vous voyez vous-même sur les autres unités.",
      },
      {
        tip: "Avant chaque trade, écrivez une phrase par unité : « tendance et niveaux », « scénario et invalidation », « entrée et stop ». Si vous ne parvenez pas à remplir l'une des trois, c'est que l'analyse n'est pas finie.",
      },
      {
        p: "Ce contenu est pédagogique et ne constitue pas un conseil en investissement. Le trading comporte un risque élevé de perte en capital, pouvant aller jusqu'à la totalité des sommes engagées.",
      },
    ],
  },
  {
    slug: "atr-volatilite-et-stop-loss",
    title: "ATR : mesurer la volatilité pour placer son stop",
    description:
      "L'ATR mesure l'amplitude moyenne des mouvements d'un actif. Définition, calcul, usage pour placer un stop et ajuster la taille de position, limites.",
    date: "2026-11-27",
    body: [
      {
        p: "L'ATR (Average True Range) est un indicateur qui mesure l'amplitude moyenne des mouvements d'un actif sur une période donnée, 14 bougies par défaut. Il ne dit rien de la direction : il indique de combien le prix bouge habituellement. Cette information sert à placer un stop à une distance cohérente avec le comportement réel du marché, et à ajuster la taille de la position.",
      },
      {
        h2: "Qu'est-ce que l'ATR exactement ?",
      },
      {
        p: "ATR signifie Average True Range, que l'on peut traduire par « amplitude vraie moyenne ». Il a été conçu par J. Welles Wilder dans les années 1970 pour mesurer la volatilité, c'est-à-dire l'agitation du prix. Un actif dont les bougies sont longues a un ATR élevé, un actif calme a un ATR bas.",
      },
      {
        p: "Il s'affiche dans une fenêtre sous le graphique, sous forme d'une courbe unique. Sa valeur est exprimée dans l'unité du prix : si l'ATR journalier d'un instrument vaut 40 points, cela signifie qu'en moyenne, sur les dernières bougies journalières, l'amplitude a tourné autour de 40 points. Ce n'est ni un plafond ni une prévision, seulement une moyenne récente.",
      },
      {
        h2: "Comment l'ATR se calcule-t-il, en mots ?",
      },
      {
        p: "Le calcul se fait en deux étapes, et vous n'aurez jamais à le faire à la main puisque la plateforme s'en charge. Le comprendre aide cependant à interpréter la courbe.",
      },
      {
        ol: [
          "Pour chaque bougie, on calcule le « true range » : la plus grande des trois valeurs suivantes. L'écart entre le plus haut et le plus bas de la bougie, l'écart entre le plus haut et la clôture précédente, l'écart entre le plus bas et la clôture précédente. Les deux dernières servent à tenir compte des gaps, ces sauts de prix entre deux séances que la bougie seule ne montre pas.",
          "On fait ensuite la moyenne de ces true ranges sur 14 périodes (la formule de Wilder lisse légèrement cette moyenne, ce qui évite les à-coups).",
        ],
      },
      {
        p: "Sur un graphique journalier, 14 périodes couvrent donc deux à trois semaines. Sur un graphique 1 heure, elles couvrent 14 heures. La valeur de l'ATR dépend toujours de l'unité de temps affichée : celui d'un graphique 4 heures n'a rien à voir avec celui du journalier, d'où l'intérêt de bien garder en tête l'unité sur laquelle on travaille ([choisir son unité de temps](/blog/choisir-son-unite-de-temps)).",
      },
      {
        h2: "Comment utiliser l'ATR pour placer un stop-loss ?",
      },
      {
        p: "Le principe est simple : plutôt que de placer un stop à une distance arbitraire (20 points, parce que c'est un chiffre rond), vous le placez à une distance calibrée sur la volatilité. Une méthode courante consiste à partir d'un niveau technique (un support, une résistance, un creux) et à ajouter une marge exprimée en multiples d'ATR.",
      },
      {
        ul: [
          "**Repérez le niveau** qui invalide votre idée, par exemple le dernier creux ou un support ([supports et résistances](/blog/supports-et-resistances)).",
          "**Ajoutez une marge** de 1,5 à 2 ATR au-delà de ce niveau : en dessous pour un achat, au-dessus pour une vente. Cette marge sert à éviter que l'agitation ordinaire ne déclenche votre stop pour rien.",
          "**Vérifiez le résultat** : si le stop obtenu est trop éloigné pour que le trade ait du sens par rapport à votre objectif, le bon choix est de ne pas prendre le trade, pas de rapprocher le stop.",
        ],
      },
      {
        p: "Les valeurs de 1,5 et 2 sont des repères, pas des constantes. Un opérateur plus patient en prendra 2,5 ou 3, un autre se contentera de 1. L'important est de les choisir à l'avance et de s'y tenir, pas de les ajuster après coup en fonction de ce que vous souhaitez voir. Pour la logique générale du placement, voyez [où placer son stop-loss](/blog/ou-placer-son-stop-loss).",
      },
      {
        h2: "Un exemple chiffré de stop basé sur l'ATR ?",
      },
      {
        p: "Exemple illustratif, avec des chiffres inventés et un instrument fictif. Vous observez un support sur le graphique journalier à 1 000. L'ATR (14) vaut 40 points. Vous envisagez un achat à 1 010, après un rebond sur ce support.",
      },
      {
        ul: [
          "Marge de 1,5 ATR : 1,5 × 40 = 60 points.",
          "Stop : 1 000 moins 60 = 940.",
          "Risque par unité : 1 010 moins 940 = 70 points.",
        ],
      },
      {
        p: "Maintenant, supposons que la volatilité double et que l'ATR passe à 80. La même logique donne une marge de 120 points, un stop à 880 et un risque de 130 points par unité. Le niveau technique n'a pas bougé, mais l'espace dont le prix a besoin pour respirer, lui, a changé. Placer le stop à 20 points sous le support dans le second cas, c'est quasiment l'offrir au bruit.",
      },
      {
        h2: "Comment l'ATR aide-t-il à calculer la taille de position ?",
      },
      {
        p: "Un stop plus large implique de réduire la taille pour risquer le même montant. Reprenons l'exemple. Avec un capital de 10 000 et un risque fixé à 1 % par trade, soit 100, et un risque de 70 points par unité, la taille se calcule ainsi : 100 divisé par 70, soit environ 1,4 unité. Si l'ATR double et que le risque passe à 130 points, la taille tombe à 100 divisé par 130, soit environ 0,77 unité.",
      },
      {
        p: "Autrement dit, quand le marché devient plus agité, la même méthode vous conduit automatiquement à prendre une position plus petite, et inversement quand il se calme. C'est ce qui rend l'ATR utile : il ajuste le risque réel au lieu de le laisser fluctuer sans que vous vous en rendiez compte. La mécanique complète est détaillée dans [la taille de position](/blog/taille-de-position).",
      },
      {
        h2: "Quelles sont les limites de l'ATR ?",
      },
      {
        ul: [
          "**Il ne donne aucune direction.** Un ATR en hausse peut accompagner une forte montée comme une forte chute. Il dit que cela bouge, pas où cela va.",
          "**Il est rétrospectif.** C'est une moyenne des dernières bougies. Une annonce ou un événement imprévu peut produire une amplitude très supérieure à ce qu'il indiquait un instant plus tôt.",
          "**Il change avec les conditions de marché.** Un ATR calculé pendant une période calme sous-estime le risque quand l'agitation revient, et l'inverse après une phase très volatile. Il se recalcule à chaque bougie : votre stop doit être fixé au moment de l'entrée, pas ajusté en permanence.",
          "**Il dépend de l'unité et de la période.** Comparer l'ATR de deux actifs en valeur brute n'a pas de sens si leurs prix sont très différents. Certains préfèrent le rapporter au prix, en pourcentage.",
          "**Il ne protège pas d'une fausse cassure ni d'un gap.** Un stop calibré sur l'ATR reste un stop : en cas de saut de prix, l'exécution peut se faire plus loin que prévu ([fausse cassure](/blog/fausse-cassure)).",
        ],
      },
      {
        h2: "Faut-il toujours garder la période par défaut de 14 ?",
      },
      {
        p: "Non, mais c'est un bon point de départ, car la plupart des plateformes l'utilisent et les références publiées s'y rapportent. Une période plus courte (7 ou 10) réagit plus vite aux changements de volatilité, avec une courbe plus nerveuse. Une période plus longue (20 ou 30) est plus stable mais plus lente. Si vous la modifiez, testez-la sur l'historique d'un actif que vous connaissez, et ne la changez pas à chaque trade perdant : ce serait chercher le réglage qui donne raison après coup.",
      },
      {
        h2: "Comment l'ATR s'intègre-t-il à une lecture complète du graphique ?",
      },
      {
        p: "L'ATR répond à une seule question, celle de l'amplitude. Il se combine avec les éléments de structure : les niveaux, la tendance, éventuellement les [moyennes mobiles](/blog/moyennes-mobiles). Pour une vue d'ensemble de ces éléments, reportez-vous à [comment lire un graphique de trading](/blog/comment-lire-un-graphique-de-trading).",
      },
      {
        p: "Si vous souhaitez comparer votre lecture à une autre, vous pouvez envoyer une capture d'écran de votre graphique à [Scanzivo](/) : le service en propose une lecture (tendance, niveaux, scénarios possibles). C'est une aide à la lecture, pas une prévision, et elle ne remplace ni votre propre analyse ni le calcul de votre risque.",
      },
      {
        tip: "Notez l'ATR du jour dans votre journal de trading à chaque trade, avec la distance de stop retenue en multiple d'ATR. Au bout de quelques dizaines de trades, vous verrez si vos stops étaient trop serrés ou correctement dimensionnés.",
      },
      {
        p: "Ce contenu est pédagogique et ne constitue pas un conseil en investissement. Le trading comporte un risque élevé de perte en capital, pouvant aller jusqu'à la totalité des sommes engagées.",
      },
    ],
  },
];
