import type { Article } from "./blog";

/** French guides published on 2026-11-01. Links are written without the language: `[texte](/blog/slug)`. */
export const ARTICLES_FR_2: Omit<Article, "locale" | "key">[] = [
  {
    slug: "taille-de-position",
    title: "Taille de position : combien engager sur un trade",
    description:
      "La règle du pourcentage de capital risqué, le calcul pas à pas à partir du stop, et les erreurs qui transforment une mauvaise série en compte vidé.",
    date: "2026-11-01",
    body: [
      {
        p: "La plupart des comptes ne sautent pas à cause d'un mauvais trade, mais à cause d'un trade trop gros. La taille de position est la seule variable que vous contrôlez entièrement : le marché décide si vous avez raison, vous décidez combien cela vous coûte quand vous avez tort.",
      },
      { h2: "Partir du risque, pas de la mise" },
      {
        p: "La question n'est pas « combien je mets ? » mais « combien j'accepte de perdre si mon stop est touché ? ». Beaucoup de traders fixent ce montant à un petit pourcentage de leur capital, souvent entre **0,5 % et 2 %** par trade. Avec 5 000 € et une règle de 1 %, la perte maximale prévue sur un trade est de 50 €.",
      },
      {
        p: "Ce chiffre paraît faible. C'est voulu : avec 1 % de risque, dix pertes d'affilée, ce qui arrive à tout le monde, coûtent environ 10 % du compte. Avec 10 % de risque par trade, la même série en coûte plus de 65 %.",
      },
      { h2: "Le calcul, en trois étapes" },
      {
        ol: [
          "**Le montant risqué** : capital × pourcentage. 5 000 € × 1 % = 50 €.",
          "**La distance au stop** : écart entre le prix d'entrée et le stop. Entrée à 100 €, stop à 96 € : 4 € par unité.",
          "**La taille** : montant risqué ÷ distance au stop. 50 € ÷ 4 € = 12,5 unités, soit environ 1 250 € de position.",
        ],
      },
      {
        p: "C'est le stop qui fixe la taille, et non l'inverse. Un stop large donne une petite position, un stop serré une position plus grosse, pour la même perte possible. Si vous ne savez pas encore où le placer, lisez d'abord [où placer son stop-loss](/blog/ou-placer-son-stop-loss) : un stop posé au hasard fausse tout le calcul.",
      },
      { tip: "Sur le forex ou les CFD, raisonnez en valeur du point ou du pip : le principe est le même, montant risqué ÷ (distance au stop × valeur d'un point)." },
      { h2: "L'effet de levier ne change pas le risque" },
      {
        p: "Le levier réduit la somme bloquée pour ouvrir une position, pas la perte si le stop est touché. Une position de 1 250 € avec un levier de 10 immobilise 125 €, mais elle perd toujours 50 € si le prix va de 100 à 96. Le danger vient quand le levier sert à ouvrir des positions bien plus grosses que ce que le calcul autorise.",
      },
      { h2: "Les erreurs qui coûtent le plus" },
      {
        ul: [
          "**Agrandir la taille après une perte** pour « se refaire » : c'est le chemin le plus court vers la grosse perte.",
          "**Déplacer le stop plus loin** une fois en position : le risque réel n'est plus celui que vous aviez calculé.",
          "**Cumuler des positions corrélées** : trois trades acheteurs sur trois cryptos qui bougent ensemble font un seul gros risque, pas trois petits.",
          "**Oublier les frais et le glissement** : sur des stops très serrés, ils pèsent une part importante de la perte.",
        ],
      },
      { h2: "Taille et ratio gain/risque vont ensemble" },
      {
        p: "Une taille bien calculée limite la perte ; le [ratio gain/risque](/blog/ratio-gain-risque) dit si le trade vaut la peine. Risquer 50 € pour viser 40 € n'a d'intérêt que si vous gagnez très souvent. Viser 100 € ou plus pour le même risque laisse une marge d'erreur bien plus confortable.",
      },
      {
        p: "Une analyse de [Scanzivo](/) donne l'entrée, le stop et les objectifs de chaque scénario : il vous reste à appliquer votre pourcentage pour obtenir la taille. C'est volontaire, car le montant dépend de votre capital et de votre tolérance au risque, que vous êtes seul à connaître.",
      },
    ],
  },
  {
    slug: "calendrier-economique",
    title: "Calendrier économique : les annonces qui font bouger les marchés",
    description:
      "Taux directeurs, inflation, emploi, résultats d'entreprises : les publications qui créent de la volatilité, et comment les intégrer à votre analyse technique.",
    date: "2026-11-01",
    body: [
      {
        p: "Un graphique parfait peut être balayé en une minute par une annonce de banque centrale. L'analyse technique dit où sont les niveaux ; le calendrier économique dit quand le marché risque de les traverser sans prévenir. Les deux se complètent.",
      },
      { h2: "Les annonces qui comptent le plus" },
      { h3: "Les banques centrales" },
      {
        p: "Les décisions de taux de la Réserve fédérale américaine (Fed) et de la Banque centrale européenne (BCE), et surtout les conférences de presse qui suivent, font partie des moments les plus agités de l'année. Le dollar, l'euro, l'or, les indices et la crypto y réagissent souvent tous en même temps.",
      },
      { h3: "L'inflation" },
      {
        p: "L'indice des prix à la consommation (CPI aux États-Unis) influence directement ce que les marchés attendent des banques centrales. Un chiffre très au-dessus ou en dessous des prévisions peut déclencher des mouvements de plusieurs pourcents sur les actifs les plus volatils.",
      },
      { h3: "L'emploi" },
      {
        p: "Le rapport mensuel sur l'emploi américain (NFP), publié en général le premier vendredi du mois à 14 h 30 heure de Paris, est l'un des rendez-vous les plus suivis du forex.",
      },
      { h3: "Les résultats d'entreprises" },
      {
        p: "Pour une action, la publication trimestrielle des résultats peut ouvrir la séance suivante loin de la clôture de la veille. Un support ou un stop placé juste en dessous n'offre alors aucune protection : le prix saute par-dessus.",
      },
      { h2: "Ce que la surprise change" },
      {
        p: "Le marché ne réagit pas au chiffre lui-même mais à l'écart avec ce qu'il attendait. Une inflation en baisse peut faire chuter un actif si elle baisse moins que prévu. C'est pourquoi les calendriers affichent toujours trois valeurs : la précédente, le consensus et la publiée.",
      },
      { h2: "Comment en tenir compte dans un trade" },
      {
        ul: [
          "**Vérifiez le calendrier avant d'entrer** : un trade prévu pour quelques heures n'a pas le même risque si une annonce majeure tombe au milieu.",
          "**Évitez d'entrer juste avant** une publication forte : l'écart entre acheteurs et vendeurs s'élargit et le prix peut toucher votre stop avant de partir dans votre sens.",
          "**Réduisez la taille** si vous gardez une position pendant l'annonce (voir [la taille de position](/blog/taille-de-position)).",
          "**Attendez la réaction** : laisser passer les premières minutes, puis regarder si le prix tient ou casse les niveaux, est souvent plus lisible.",
        ],
      },
      { tip: "Les heures des calendriers sont souvent affichées en heure de New York ou en UTC. Vérifiez le fuseau : une erreur d'une heure suffit à se retrouver en position au mauvais moment." },
      { h2: "Technique et macro : deux lectures du même marché" },
      {
        p: "Les [supports et résistances](/blog/supports-et-resistances) restent les repères du plan ; le calendrier dit à quel moment ces repères risquent d'être testés brutalement. Une bonne analyse croise les deux plutôt que d'en choisir une.",
      },
      {
        p: "C'est ce que fait le pack Pro de [Scanzivo](/) : avec chaque analyse de graphique, l'IA relève les annonces des 7 prochains jours et l'actualité récente sur l'actif, sources à l'appui, puis dit comment en tenir compte dans le plan. Elle ne prédit pas le chiffre : elle vous évite d'être surpris par la date.",
      },
    ],
  },
  {
    slug: "choisir-son-unite-de-temps",
    title: "Quelle unité de temps choisir pour trader ?",
    description:
      "1 minute, 1 heure, journalier : ce que change l'unité de temps, laquelle correspond à votre emploi du temps, et pourquoi regarder celle du dessus.",
    date: "2026-11-01",
    body: [
      {
        p: "Le même actif peut être haussier en 4 heures et baissier en journalier. Ce n'est pas une contradiction : chaque unité de temps raconte une partie différente de l'histoire. Choisir la sienne, c'est surtout choisir le rythme auquel on peut suivre ses positions.",
      },
      { h2: "Ce que change l'unité de temps" },
      {
        p: "Plus l'unité est courte, plus il y a de bougies, de signaux et de bruit. En 1 minute, un mouvement de quelques secondes ressemble à une tendance. En journalier, chaque bougie résume une séance entière : les signaux sont plus rares mais plus solides, et les stops plus larges.",
      },
      { h2: "Les grandes familles" },
      {
        ul: [
          "**Scalping (1 à 5 minutes)** : des dizaines de trades par jour, une attention constante, des frais qui pèsent lourd. Peu adapté à quelqu'un qui travaille à côté.",
          "**Day trading (15 minutes à 1 heure)** : positions ouvertes et fermées dans la journée. Demande d'être disponible pendant les heures actives du marché.",
          "**Swing trading (4 heures à journalier)** : positions de quelques jours à quelques semaines. Compatible avec un emploi : on regarde le graphique une ou deux fois par jour.",
          "**Position (hebdomadaire)** : tendances de plusieurs mois, très peu de décisions.",
        ],
      },
      { tip: "Choisissez l'unité de temps en fonction du temps que vous pouvez passer devant l'écran, pas de celui qui promet le plus d'opportunités." },
      { h2: "Toujours regarder une unité au-dessus" },
      {
        p: "La tendance de fond se lit sur l'unité supérieure, les entrées sur la vôtre. Si vous tradez en 1 heure, le 4 heures dit dans quel sens le courant va. Acheter un signal haussier en 1 heure alors que le 4 heures et le journalier baissent, c'est nager contre le courant.",
      },
      {
        p: "Une méthode simple consiste à garder un rapport de 4 à 6 entre les unités : journalier pour la direction, 4 heures pour le plan, 1 heure pour l'entrée. Les niveaux tracés sur l'unité supérieure, comme les [supports et résistances](/blog/supports-et-resistances), comptent plus que ceux d'en dessous.",
      },
      { h2: "Les erreurs fréquentes" },
      {
        ul: [
          "**Changer d'unité en cours de trade** pour trouver un graphique qui donne raison.",
          "**Descendre en unité après une perte** pour « se refaire » plus vite.",
          "**Utiliser un stop pensé pour le 1 minute** sur une position gardée plusieurs jours, ou l'inverse.",
        ],
      },
      { h2: "L'horizon d'une analyse dépend de son unité" },
      {
        p: "Un scénario lu en 15 minutes vaut pour quelques heures ; en journalier, pour plusieurs jours ou semaines. C'est pour cela que [Scanzivo](/) indique l'horizon de validité de chaque analyse à partir de l'unité de temps visible sur votre capture. Pensez à l'afficher clairement, comme expliqué dans le [guide de la capture d'écran](/blog/capture-ecran-graphique).",
      },
    ],
  },
  {
    slug: "chandeliers-japonais",
    title: "Chandeliers japonais : les figures qui méritent votre attention",
    description:
      "Marteau, avalement, étoile filante, doji : comment lire les figures de chandeliers les plus utiles, et pourquoi leur emplacement compte plus que leur forme.",
    date: "2026-11-01",
    body: [
      {
        p: "Il existe des dizaines de figures de chandeliers japonais, avec des noms souvent poétiques. Une poignée suffit pour la pratique, et une règle compte plus que toutes : une figure ne veut rien dire en elle-même, elle prend du sens à un endroit précis du graphique.",
      },
      {
        p: "Si vous débutez, commencez par [lire un graphique de trading](/blog/comment-lire-un-graphique-de-trading) : corps, mèches, ouverture et clôture sont la base de tout ce qui suit.",
      },
      { h2: "Le marteau et l'étoile filante" },
      {
        p: "Le **marteau** a un petit corps en haut et une longue mèche basse, au moins deux fois la taille du corps. Il montre que les vendeurs ont poussé le prix vers le bas, puis que les acheteurs ont tout repris avant la clôture. Après une baisse, sur un support, c'est un signe de rejet.",
      },
      {
        p: "L'**étoile filante** est son miroir : petit corps en bas, longue mèche haute. Après une hausse, sous une résistance, elle signale que les acheteurs n'ont pas réussi à tenir les plus hauts.",
      },
      { h2: "L'avalement" },
      {
        p: "Un **avalement haussier** est une bougie verte dont le corps recouvre entièrement celui de la bougie rouge précédente. Les acheteurs ont non seulement arrêté la baisse, mais repris plus que ce que les vendeurs avaient gagné. L'avalement baissier est l'inverse. C'est l'une des figures les plus lisibles, surtout sur une unité de temps élevée.",
      },
      { h2: "Le doji" },
      {
        p: "Un **doji** ouvre et clôture presque au même prix : le corps est une simple ligne. Il traduit l'hésitation. Seul, il ne dit pas dans quel sens le marché va repartir ; après une longue tendance, il signale surtout que l'élan faiblit.",
      },
      { h2: "Ce qui rend une figure fiable" },
      {
        ul: [
          "**L'emplacement** : un marteau au milieu de nulle part ne vaut rien ; sur un support testé plusieurs fois, il compte.",
          "**L'unité de temps** : une figure en journalier pèse bien plus qu'en 5 minutes (voir [quelle unité de temps choisir](/blog/choisir-son-unite-de-temps)).",
          "**La confirmation** : attendre que la bougie suivante aille dans le sens annoncé évite beaucoup de faux signaux.",
          "**Le volume**, quand il est disponible : un avalement sur fort volume est plus convaincant.",
        ],
      },
      { tip: "Une figure de chandelier sert à déclencher une entrée près d'un niveau que vous aviez déjà repéré. Elle ne remplace pas ce niveau." },
      { h2: "Les figures se lisent avec le reste" },
      {
        p: "Les chandeliers décrivent le comportement d'une ou deux bougies ; les [figures chartistes](/blog/figures-chartistes) décrivent la forme de dizaines de bougies. Les meilleurs signaux arrivent quand les deux racontent la même chose, par exemple un avalement haussier au point bas d'un double creux.",
      },
      {
        p: "Dans une analyse [Scanzivo](/), l'IA relève les figures visibles sur votre capture et indique, pour chacune, ce qu'elle implique et à quel niveau. Vous pouvez ainsi vérifier sa lecture sur le graphique plutôt que de la croire sur parole.",
      },
    ],
  },
  {
    slug: "figures-chartistes",
    title: "Les figures chartistes à connaître : tête-épaules, double sommet, triangles",
    description:
      "Comment reconnaître les figures chartistes les plus courantes, où se trouve leur ligne de cassure, comment en déduire un objectif, et quand s'en méfier.",
    date: "2026-11-01",
    body: [
      {
        p: "Les figures chartistes sont des formes que le prix dessine sur des dizaines de bougies, quand acheteurs et vendeurs se disputent une zone. Elles ne prédisent rien à coup sûr, mais elles donnent trois informations utiles : où le scénario se déclenche, où il échoue, et jusqu'où il peut aller.",
      },
      { h2: "Les figures de retournement" },
      { h3: "Tête-épaules" },
      {
        p: "Trois sommets, celui du milieu (la tête) plus haut que les deux autres (les épaules). La ligne qui relie les deux creux s'appelle la **ligne de cou**. Tant qu'elle tient, ce n'est qu'une hésitation ; une clôture nette en dessous valide la figure. La version inversée, en bas de tendance, annonce une possible reprise.",
      },
      { h3: "Double sommet et double creux" },
      {
        p: "Le prix bute deux fois sur le même niveau, puis repart. Le **double sommet** dessine un M, le double creux un W. La validation vient quand le prix casse le creux (ou le sommet) situé entre les deux tentatives. Avant cela, ce n'est qu'une [résistance](/blog/supports-et-resistances) qui a tenu deux fois.",
      },
      { h2: "Les figures de continuation" },
      { h3: "Les triangles" },
      {
        p: "Le prix se resserre entre deux droites. Un **triangle ascendant** (résistance horizontale, creux de plus en plus hauts) montre des acheteurs de plus en plus pressés. Un triangle descendant est l'inverse. Un triangle symétrique dit seulement que le marché hésite : c'est la sortie qui donne la direction.",
      },
      { h3: "Drapeaux et fanions" },
      {
        p: "Après un mouvement rapide (le mât), le prix fait une courte pause en pente légère contre ce mouvement. Si la pause se termine par une cassure dans le sens du mât, la tendance reprend souvent.",
      },
      { h2: "Mesurer un objectif" },
      {
        p: "La méthode classique reporte la hauteur de la figure depuis le point de cassure. Pour un tête-épaules, on mesure la distance entre la tête et la ligne de cou, puis on la reporte sous la ligne de cou. C'est un ordre de grandeur, pas une promesse : le prix s'arrête souvent avant, sur un support intermédiaire.",
      },
      { tip: "Comparez cet objectif à votre stop avant d'entrer. Si le [ratio gain/risque](/blog/ratio-gain-risque) est inférieur à 1, la figure peut être belle et le trade mauvais." },
      { h2: "Quand s'en méfier" },
      {
        ul: [
          "**Avant la cassure** : une figure non validée n'est qu'une hypothèse. Beaucoup de « tête-épaules » ne cassent jamais leur ligne de cou.",
          "**Les fausses cassures** : le prix sort, puis revient dans la figure. Attendre une clôture, voire un retest, filtre une partie de ces pièges.",
          "**Les petites unités de temps** : sur 1 minute, on voit des figures partout.",
          "**Le contexte** : une figure de retournement contre une tendance de fond très forte échoue plus souvent.",
        ],
      },
      { h2: "Voir une figure, ou la projeter ?" },
      {
        p: "Le risque principal est de voir ce que l'on veut voir. Un regard extérieur aide : c'est l'un des usages les plus utiles d'une [analyse technique par IA](/blog/analyse-technique-ia). Sur une capture, [Scanzivo](/) nomme les figures qu'il repère, indique leur ligne de validation et ce qui invaliderait le scénario.",
      },
    ],
  },
  {
    slug: "rsi-indicateur",
    title: "Le RSI : comment le lire sans tomber dans les pièges",
    description:
      "Ce que mesure vraiment le RSI, pourquoi « survendu » ne veut pas dire « acheter », et comment utiliser les divergences et la zone des 50.",
    date: "2026-11-01",
    body: [
      {
        p: "Le RSI (Relative Strength Index) est probablement l'indicateur le plus affiché sur les graphiques. C'est aussi l'un des plus mal utilisés : beaucoup de débutants achètent dès qu'il passe sous 30, puis regardent le prix continuer de baisser.",
      },
      { h2: "Ce que mesure le RSI" },
      {
        p: "Le RSI compare la taille des hausses et des baisses récentes, en général sur **14 périodes**, et ramène le résultat sur une échelle de 0 à 100. Au-dessus de 70, les hausses récentes ont été bien plus fortes que les baisses ; sous 30, c'est l'inverse. Il mesure la **vitesse** du mouvement, pas sa direction future.",
      },
      { h2: "Survendu ne veut pas dire « acheter »" },
      {
        p: "Dans une forte tendance baissière, le RSI peut rester sous 30 pendant des jours. Un marché « survendu » peut devenir encore plus survendu. Le signal n'est pas le passage sous 30, mais la **sortie** de la zone, idéalement sur un [support](/blog/supports-et-resistances) identifié, avec une bougie de retournement.",
      },
      { tip: "En tendance haussière solide, le RSI oscille souvent entre 40 et 80 ; en tendance baissière, entre 20 et 60. Repérer cette plage dit déjà beaucoup sur la force du marché." },
      { h2: "Les divergences" },
      {
        p: "Une **divergence baissière** apparaît quand le prix fait un sommet plus haut mais le RSI un sommet plus bas : la hausse continue, mais avec moins de force. Une divergence haussière est l'inverse, en bas de tendance.",
      },
      {
        p: "Une divergence n'est pas un signal de vente ou d'achat immédiat. Elle peut durer longtemps avant que le prix ne réagisse. Elle sert surtout d'avertissement : resserrer un stop, ne pas ouvrir de nouvelle position dans le sens de la tendance, attendre une cassure de structure.",
      },
      { h2: "La zone des 50" },
      {
        p: "Souvent négligée, la ligne des 50 sépare les phases où les hausses dominent de celles où les baisses dominent. Un RSI qui repasse au-dessus de 50 après une longue période en dessous accompagne souvent un changement de tendance, à confirmer sur le prix.",
      },
      { h2: "Les réglages" },
      {
        p: "Le réglage de 14 périodes convient dans la plupart des cas. Un réglage plus court rend l'indicateur plus nerveux et multiplie les faux signaux ; un réglage plus long le lisse mais le rend tardif. Changer de réglage jusqu'à trouver celui qui « aurait marché » sur le passé est une forme de triche envers soi-même.",
      },
      { h2: "Le RSI confirme, il ne décide pas" },
      {
        ul: [
          "Lisez d'abord la tendance et les niveaux sur les bougies.",
          "Utilisez le RSI pour juger de la force du mouvement et repérer les divergences.",
          "Décidez de l'entrée et du stop à partir du prix, jamais du seul RSI.",
        ],
      },
      {
        p: "Si le RSI est affiché sur votre capture, [Scanzivo](/) en tient compte dans sa lecture, par exemple pour signaler une divergence ou un essoufflement. Mais comme expliqué dans [comment lire un graphique de trading](/blog/comment-lire-un-graphique-de-trading), un graphique chargé d'indicateurs se lit moins bien : deux ou trois suffisent.",
      },
    ],
  },
];
