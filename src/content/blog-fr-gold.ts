import type { Article } from "./blog";

/** French guides on gold (XAU/USD) published on 2026-11-12. Links are written without the language: `[texte](/blog/slug)`. */
export const ARTICLES_FR_GOLD: Omit<Article, "locale" | "key">[] = [
  {
    slug: "comment-trader-l-or",
    title: "Comment trader l'or (XAU/USD) : le guide pour débuter",
    description:
      "Ce qui fait bouger l'or, comment il est coté, ce qu'est un CFD sur l'or, les séances à connaître et une routine simple pour commencer sans vous disperser.",
    date: "2026-11-12",
    body: [
      {
        p: "Pour trader l'or, la plupart des particuliers ouvrent un CFD sur le XAU/USD chez un courtier : ils parient sur la hausse ou la baisse du prix d'une once d'or exprimé en dollars, sans posséder de métal. C'est accessible, mais c'est un marché nerveux. Voici comment il fonctionne et par où commencer.",
      },
      { h2: "Qu'est-ce que le XAU/USD ?" },
      {
        p: "XAU est le code de l'or, USD celui du dollar américain. Le prix affiché est celui d'**une once troy d'or (environ 31,1 grammes) en dollars**. Quand le graphique indique 2 400, une once vaut 2 400 $. Selon les plateformes, vous verrez XAU/USD, XAUUSD ou simplement GOLD : c'est le même instrument.",
      },
      {
        p: "Comme le prix est en dollars, l'or réagit à tout ce qui touche le dollar. C'est la première chose à retenir : un dollar qui monte pèse en général sur l'or, un dollar qui baisse l'aide. Le détail est dans [pourquoi l'or monte ou baisse](/blog/pourquoi-l-or-monte-ou-baisse).",
      },
      { h2: "Comment on trade l'or : CFD, contrats à terme, ETF" },
      {
        ul: [
          "**Le CFD** : un contrat avec votre courtier sur l'écart de prix entre l'ouverture et la clôture. Vous pouvez acheter ou vendre à découvert, avec effet de levier. C'est le plus courant en intraday.",
          "**Les contrats à terme** : standardisés, négociés en bourse, avec des tailles de contrat importantes. Plutôt pour des profils avancés.",
          "**Les ETF et l'or physique** : pour détenir de l'or sur la durée, sans levier. Ce n'est pas du trading au sens strict.",
        ],
      },
      {
        p: "Ce guide parle du CFD. Il apporte de la souplesse, mais aussi des risques propres : levier, spread, frais de financement. Ils sont détaillés dans [trader l'or en CFD : les risques](/blog/trader-l-or-cfd-risques).",
      },
      { h2: "Pourquoi l'or est-il si mouvementé ?" },
      {
        p: "Sur une séance, l'or peut bouger de plusieurs dizaines de dollars, davantage les jours d'annonce. En points de prix, cela donne des mouvements bien plus larges que sur la plupart des paires de devises. Deux conséquences pratiques : vos stops doivent être plus larges, donc vos positions plus petites, et les erreurs coûtent plus vite.",
      },
      {
        p: "L'or réagit surtout aux statistiques américaines (emploi, inflation), aux décisions de la Fed, au dollar, aux taux d'intérêt réels et aux tensions géopolitiques. Le calendrier compte donc autant que le graphique : voyez [le calendrier économique](/blog/calendrier-economique).",
      },
      { h2: "Les séances à connaître" },
      {
        p: "L'or se négocie presque en continu, mais l'activité varie beaucoup au fil de la journée. À l'heure de Paris : la séance asiatique est souvent calme, Londres ouvre vers 9 h, New York vers 14 h 30 avec les statistiques américaines. Les plus gros mouvements se concentrent en général de Londres à la fin de la séance new-yorkaise. Le détail est dans [les meilleures heures pour trader l'or](/blog/meilleures-heures-pour-trader-l-or).",
      },
      { h2: "Une routine simple pour débuter" },
      {
        ol: [
          "**Avant la séance**, regardez le calendrier : une annonce américaine majeure change le plan de la journée.",
          "**Lisez la direction en 1 heure** : tendance, derniers sommets et creux, zones où le prix a déjà réagi. [Comment lire un graphique](/blog/comment-lire-un-graphique-de-trading) vous donne les bases.",
          "**Repérez les niveaux** : anciens plus hauts et plus bas, et chiffres ronds (voyez [les niveaux ronds sur l'or](/blog/niveaux-ronds-or)).",
          "**Définissez le plan avant d'entrer** : entrée, stop, objectif. Si le rapport gain/risque est faible, passez votre tour ([ratio gain/risque](/blog/ratio-gain-risque)).",
          "**Calculez la taille** à partir du stop, pas de l'envie : voyez [la taille de lot sur l'or](/blog/taille-de-lot-xau-usd).",
          "**Notez le résultat** quel qu'il soit, pour comprendre ce que vous faites réellement.",
        ],
      },
      {
        p: "La version intraday détaillée de cette routine est dans [une routine sur l'or : 1 heure, 15 minutes, 5 minutes](/blog/strategie-or-1h-15m-5m).",
      },
      { h2: "Les erreurs classiques des débutants" },
      {
        ul: [
          "**Prendre une position trop grosse** parce que le prix de l'once paraît « petit » à côté de la volatilité réelle.",
          "**Trader en plein milieu d'une annonce** sans l'avoir vue au calendrier.",
          "**Entrer au ras d'un niveau rond** avec un stop collé juste derrière : les mèches l'emportent.",
          "**Multiplier les trades** pour « se refaire » après une perte.",
          "**Changer de méthode toutes les semaines** : sans série d'essais comparables, impossible de savoir ce qui marche.",
        ],
      },
      {
        p: "Commencez sur un compte démo, avec peu de choses à regarder : un instrument, deux ou trois unités de temps, une routine. Quand vous le souhaitez, vous pouvez aussi soumettre une capture de votre graphique à l'[analyse IA spécialisée gold](/gold) pour comparer sa lecture à la vôtre.",
      },
      {
        p: "Ce guide est un contenu éducatif et ne constitue pas un conseil en investissement. Les CFD sont des produits complexes qui comportent un risque élevé de perte en capital, notamment à cause de l'effet de levier : ne risquez que ce que vous pouvez vous permettre de perdre.",
      },
    ],
  },
  {
    slug: "meilleures-heures-pour-trader-l-or",
    title: "Meilleures heures pour trader l'or (heure de Paris)",
    description:
      "Séances de Tokyo, Londres et New York, chevauchement, heures d'annonces américaines : à quelles heures l'or bouge le plus, en heure de Paris, et quand l'éviter.",
    date: "2026-11-12",
    body: [
      {
        p: "L'or bouge le plus entre l'ouverture de Londres, vers 9 h heure de Paris, et la fin de la séance américaine. Le moment le plus actif est souvent le chevauchement Londres / New York, de 14 h 30 à 17 h 30 environ. La nuit asiatique est en général plus calme, et plus propice aux faux mouvements.",
      },
      { h2: "Les horaires en heure de Paris" },
      {
        p: "Ces heures sont indicatives et peuvent glisser d'une heure quelques semaines par an, quand l'Europe et les États-Unis ne changent pas d'heure à la même date. Vérifiez-les sur votre plateforme à ces périodes.",
      },
      {
        ul: [
          "**Séance asiatique (Tokyo, Sydney)** : environ 1 h à 9 h. Souvent un range étroit.",
          "**Séance de Londres** : ouverture vers 9 h, fermeture vers 17 h 30. Premier vrai coup de volume de la journée.",
          "**Séance de New York** : les statistiques américaines tombent généralement à **14 h 30**, la bourse ouvre vers 15 h 30, la fin de séance se situe vers 22 h.",
          "**Chevauchement Londres / New York** : environ 14 h 30 à 17 h 30. Beaucoup de participants, donc des mouvements plus amples.",
        ],
      },
      { h2: "Pourquoi l'ouverture de Londres compte" },
      {
        p: "Pendant la nuit, l'or construit souvent un range : un plus haut et un plus bas autour desquels le prix tourne. À l'ouverture de Londres, ce range est fréquemment cassé, d'un côté ou de l'autre. Cette cassure donne parfois la direction du début de journée, mais elle peut aussi être un faux départ, que le prix reprend dans l'heure.",
      },
      {
        p: "Un repère simple : tracez le plus haut et le plus bas de la séance asiatique sur votre graphique. Observez comment le prix se comporte quand il les atteint, au lieu d'anticiper la cassure. Ce que vous cherchez, c'est une clôture franche au-delà du range puis un retour qui tient le niveau.",
      },
      { h2: "14 h 30 : l'heure des annonces américaines" },
      {
        p: "Beaucoup de statistiques américaines sont publiées à 14 h 30 heure de Paris : emploi (NFP), inflation (CPI), ventes au détail, demandes d'allocations chômage hebdomadaires. L'or réagit parfois en quelques secondes, avec des écarts qui s'élargissent. Les décisions de la Fed tombent plutôt en fin de soirée, vers 20 h. Consultez toujours [le calendrier économique](/blog/calendrier-economique) avant d'ouvrir une position.",
      },
      {
        p: "Comment se comporter autour de ces annonces est traité à part : [trader l'or pendant le NFP, le CPI et la Fed](/blog/trader-l-or-nfp-fed).",
      },
      { h2: "Quand éviter de trader l'or" },
      {
        ul: [
          "**Juste avant et juste après une annonce majeure** : spread plus large, mouvements dans les deux sens.",
          "**En fin de séance américaine et à la clôture du vendredi** : liquidité plus faible, le spread peut s'élargir.",
          "**Les jours fériés américains** : peu de volume, cassures peu fiables.",
          "**Le dimanche soir, à la réouverture** : des écarts de prix sont possibles par rapport à la clôture du vendredi.",
        ],
      },
      { h2: "Quelle fenêtre choisir selon votre emploi du temps ?" },
      {
        p: "Vous n'avez pas besoin d'être devant l'écran toute la journée. Mieux vaut une fenêtre fixe que vous connaissez bien.",
      },
      {
        ul: [
          "**Le matin (9 h à 12 h)** : lecture du range asiatique et de la réaction à Londres. Convient si vous travaillez ensuite.",
          "**L'après-midi (14 h 30 à 17 h 30)** : le plus actif, mais aussi le plus rapide. Réservé à ceux qui peuvent suivre leurs positions de près.",
          "**Le soir** : le marché se calme souvent, sauf annonce de la Fed. Une position laissée ouverte la nuit expose à des écarts et à des frais de financement.",
        ],
      },
      { h2: "Adapter l'unité de temps à la séance" },
      {
        p: "Dans un marché calme, un graphique en 5 minutes bruite beaucoup pour peu d'information. Dans un marché actif, il devient utile pour affiner l'entrée. La logique est décrite dans [choisir son unité de temps](/blog/choisir-son-unite-de-temps) et mise en pratique dans [la routine 1 heure, 15 minutes, 5 minutes](/blog/strategie-or-1h-15m-5m).",
      },
      {
        p: "Les analyses de l'[outil spécialisé gold](/gold) tiennent compte des séances : le range asiatique cassé à Londres, les annonces de 14 h 30. Si vous soumettez une capture, indiquez-la prise à l'heure où vous la regardez, c'est elle qui sera lue.",
      },
      {
        p: "Ce guide est un contenu éducatif et ne constitue pas un conseil en investissement. Les CFD sont des produits complexes qui comportent un risque élevé de perte en capital : même aux bonnes heures, une perte reste possible.",
      },
    ],
  },
  {
    slug: "pourquoi-l-or-monte-ou-baisse",
    title: "Pourquoi l'or monte ou baisse : les facteurs à connaître",
    description:
      "Dollar, taux réels, Fed, inflation, achats des banques centrales, tensions géopolitiques, ETF : ce qui pèse sur le prix de l'or et comment en tenir compte.",
    date: "2026-11-12",
    body: [
      {
        p: "Le prix de l'or bouge surtout avec le dollar américain et les taux d'intérêt réels, c'est-à-dire les taux nets de l'inflation. Quand le dollar ou les taux réels baissent, l'or tend à monter. Quand ils montent, il tend à baisser. Les tensions géopolitiques, les achats des banques centrales et les flux des ETF viennent s'ajouter. Ce sont des tendances, pas des lois.",
      },
      { h2: "Le dollar : le premier réflexe" },
      {
        p: "L'or est coté en dollars. Si le dollar se renforce, il faut moins de dollars pour la même valeur : l'or exprimé en dollars baisse souvent. Un dollar plus faible rend l'once moins chère pour les acheteurs hors des États-Unis, ce qui soutient la demande. Le lien est fréquent, pas permanent : certains jours, or et dollar montent ensemble.",
      },
      { h2: "Les taux d'intérêt réels" },
      {
        p: "L'or ne verse ni intérêt ni dividende. Quand les placements sans risque rapportent beaucoup après inflation, détenir de l'or coûte cher en manque à gagner. Quand les taux réels baissent ou deviennent négatifs, l'or devient plus attractif. C'est souvent le facteur de fond le plus cité par les analystes.",
      },
      {
        p: "Concrètement, surveillez le rendement des obligations américaines à 10 ans et les anticipations de baisse ou de hausse de taux. Une hausse brutale des rendements pèse en général sur l'or à court terme.",
      },
      { h2: "La Fed et ses décisions" },
      {
        p: "La Fed, la banque centrale américaine, fixe son taux directeur et commente sa trajectoire. Le marché réagit autant aux mots qu'au chiffre. Une communication plus souple que prévu soutient souvent l'or, un ton plus ferme le fait reculer. Les dates des réunions sont au calendrier : voyez [le calendrier économique](/blog/calendrier-economique) et [trader l'or pendant le NFP, le CPI et la Fed](/blog/trader-l-or-nfp-fed).",
      },
      { h2: "L'inflation : une relation moins simple qu'on le croit" },
      {
        p: "On dit souvent que l'or protège de l'inflation. À long terme, l'idée a des partisans. À court terme, c'est plus nuancé : un chiffre d'inflation élevé peut faire monter l'or, ou le faire baisser s'il pousse la Fed à garder des taux hauts. Ce qui compte pour le prix est donc le chiffre **par rapport aux attentes**, et la réaction attendue de la banque centrale.",
      },
      { h2: "Les banques centrales" },
      {
        p: "Plusieurs banques centrales détiennent de l'or dans leurs réserves, et leurs achats ou ventes influencent la demande. Leurs positions sont publiées avec retard, par des organismes comme le World Gold Council. Ces informations donnent un contexte de fond, rarement un signal pour une entrée à l'heure près.",
      },
      { h2: "Les tensions géopolitiques et l'aversion au risque" },
      {
        p: "L'or est considéré comme une valeur refuge. En période d'incertitude (conflit, crise financière, tension politique), la demande peut augmenter et le prix monter vite. Mais cet effet s'estompe souvent quand la tension retombe, et il ne prévient pas : un retournement sec est possible.",
      },
      { h2: "Les ETF et la demande physique" },
      {
        p: "Les ETF adossés à de l'or physique voient leurs avoirs augmenter ou baisser selon les entrées et sorties des investisseurs. Des entrées durables vont plutôt dans le sens d'une demande soutenue. La demande de bijouterie et d'investissement physique, notamment en Asie, pèse aussi, avec une saisonnalité propre.",
      },
      { h2: "Comment s'en servir quand on trade" },
      {
        ol: [
          "**Savoir ce qui est attendu** : regardez le calendrier de la semaine et notez les annonces américaines.",
          "**Repérer le contexte** : dollar et rendements montent ou baissent depuis quelques jours ? L'or va-t-il dans le même sens, ou à contre-courant ?",
          "**Laisser le graphique décider de l'entrée** : le contexte donne un biais, pas un point d'entrée. Les niveaux et la structure (voyez [supports et résistances](/blog/supports-et-resistances)) font le reste.",
          "**Se méfier du récit après coup** : trouver une explication après le mouvement est facile. Prévoir le mouvement ne l'est pas.",
        ],
      },
      {
        tip: "Un marché peut monter alors que toutes les nouvelles sont mauvaises, et inversement. Ne tradez pas une opinion macro contre un graphique qui dit le contraire.",
      },
      {
        p: "Pour garder une vue d'ensemble, notez en quelques lignes avant la séance : le sens du dollar, la tendance des taux, la prochaine annonce. L'[analyse spécialisée gold](/gold) de Scanzivo, avec son volet actualité, croise ces éléments avec votre capture. Elle peut se tromper comme n'importe quelle lecture : elle aide à structurer, pas à prédire.",
      },
      {
        p: "Ce guide est un contenu éducatif et ne constitue pas un conseil en investissement. Les CFD sont des produits complexes qui comportent un risque élevé de perte en capital, et aucune explication macro-économique ne garantit la direction du prix.",
      },
    ],
  },
  {
    slug: "taille-de-lot-xau-usd",
    title: "Calculer sa taille de lot sur l'or (XAU/USD)",
    description:
      "Valeur du point sur l'or, taille du contrat, exemple chiffré en euros avec 1 % de risque : la méthode pour calculer son lot, et pourquoi il faut vérifier chez son courtier.",
    date: "2026-11-12",
    body: [
      {
        p: "Pour calculer votre taille de lot sur l'or : montant que vous acceptez de perdre ÷ (distance du stop en dollars × nombre d'onces par lot). Chez de nombreux courtiers, 1 lot d'or correspond à 100 onces, mais ce n'est pas universel : **la taille du contrat et la valeur du pip dépendent du courtier. Vérifiez-les sur votre plateforme avant tout calcul.**",
      },
      { h2: "Ce qu'il faut savoir avant de calculer" },
      {
        ul: [
          "**La taille du contrat** : combien d'onces représente 1 lot. Souvent 100, parfois 1 000 ou moins selon l'instrument et le courtier.",
          "**Le lot minimum** : souvent 0,01 lot, parfois plus.",
          "**La devise du compte** : si votre compte est en euros, le gain ou la perte, calculés en dollars, sont convertis au taux EUR/USD du moment.",
          "**La définition du « pip » sur l'or** : elle varie. Certains courtiers parlent de pip à 0,10 $, d'autres de point à 0,01 $. Pour éviter toute confusion, raisonnez en **dollars de mouvement du prix**.",
        ],
      },
      {
        p: "Sur votre plateforme, la fiche de l'instrument (« spécifications du contrat ») donne ces valeurs. Un autre moyen de contrôle : ouvrez une position démo au lot minimum, déplacez mentalement le prix de 1 $ et regardez la variation du résultat affichée.",
      },
      { h2: "La formule" },
      {
        p: "Avec un contrat de 100 onces par lot, une variation de 1 $ du prix change le résultat de 100 $ par lot. La formule générale est celle de [la taille de position](/blog/taille-de-position) :",
      },
      {
        ol: [
          "**Montant risqué** = capital × pourcentage de risque.",
          "**Perte par lot** = distance du stop en $ × onces par lot (convertie en euros si le compte est en euros).",
          "**Taille de lot** = montant risqué ÷ perte par lot.",
        ],
      },
      { h2: "Exemple chiffré (illustratif)" },
      {
        p: "Les chiffres ci-dessous sont **un exemple**, pas une recommandation ni un prix de marché. Hypothèses : compte de 5 000 €, risque de 1 %, contrat de 100 onces par lot, EUR/USD à 1,10, stop à 10 $ de l'entrée.",
      },
      {
        ul: [
          "Montant risqué : 5 000 € × 1 % = **50 €**, soit environ 55 $.",
          "Perte pour 1 lot si le stop est touché : 10 $ × 100 onces = 1 000 $, soit environ 909 €.",
          "Taille de lot : 55 $ ÷ 1 000 $ = **0,055 lot**.",
          "On arrondit **vers le bas** : 0,05 lot. Si le stop est touché, la perte est d'environ 50 $, soit un peu moins de 46 €, donc sous le risque prévu.",
        ],
      },
      {
        p: "Avec un stop plus large, la même méthode donne une position plus petite. Stop à 20 $ : 55 $ ÷ 2 000 $ = 0,0275 lot, soit 0,02 lot en arrondissant. C'est le stop qui impose la taille, jamais l'inverse.",
      },
      { h2: "Et si le calcul tombe sous le lot minimum ?" },
      {
        p: "Avec un petit compte, il arrive que le calcul donne 0,008 lot alors que le minimum est 0,01. Dans ce cas, ouvrir quand même revient à risquer plus que prévu. Les options honnêtes : réduire la distance du stop si le graphique le permet, chercher un courtier qui propose un contrat plus petit, ou passer son tour. Ne forcez pas la taille pour « entrer quand même ».",
      },
      { h2: "Ne pas oublier le spread et le glissement" },
      {
        p: "Votre perte réelle peut dépasser le stop théorique : le spread s'ajoute à l'entrée et à la sortie, et lors d'une annonce le prix peut sauter le niveau du stop. Gardez une petite marge dans votre calcul et évitez les positions lourdes autour des statistiques ([le cas du NFP et de la Fed](/blog/trader-l-or-nfp-fed)).",
      },
      { h2: "Où placer le stop avant de calculer ?" },
      {
        p: "Le stop se place d'après le graphique, pas d'après le montant que vous voulez risquer. Sur l'or, il doit généralement dépasser les mèches récentes et le niveau qui invaliderait votre idée. Voyez [où placer son stop-loss](/blog/ou-placer-son-stop-loss). Un stop de 3 $ sur un marché qui bouge de 10 $ en quelques minutes sera presque toujours touché.",
      },
      {
        p: "L'[analyse IA gold](/gold) propose un plan chiffré avec entrée, stop et objectifs, à partir de votre capture. La taille du lot reste à calculer chez vous, avec les valeurs de votre courtier et votre propre pourcentage de risque.",
      },
      {
        p: "Ce guide est un contenu éducatif et ne constitue pas un conseil en investissement. Les exemples chiffrés sont illustratifs. Les CFD comportent un risque élevé de perte en capital, qui peut dépasser la somme prévue en cas de forte variation.",
      },
    ],
  },
  {
    slug: "trader-l-or-cfd-risques",
    title: "Trader l'or en CFD : levier, spread, swap et risques réels",
    description:
      "Ce qu'est un CFD sur l'or, comment fonctionnent le levier, le spread, le swap et l'appel de marge, et ce que vous risquez vraiment. Sans promesse de gain.",
    date: "2026-11-12",
    body: [
      {
        p: "Un CFD sur l'or est un contrat avec un courtier sur l'écart de prix du XAU/USD. Il vous permet de miser à la hausse ou à la baisse avec un effet de levier. Le levier amplifie les gains comme les pertes : vous pouvez perdre rapidement tout ou une grande partie de votre dépôt. Beaucoup de comptes de particuliers perdent de l'argent sur ces produits.",
      },
      { h2: "Qu'est-ce qu'un CFD sur l'or ?" },
      {
        p: "CFD signifie contrat pour la différence. Vous ne possédez aucun lingot : vous échangez avec le courtier la différence entre le prix d'ouverture et le prix de clôture. Si vous achetez à 2 400 et fermez à 2 410, vous gagnez dix dollars par once du contrat. Si le prix tombe à 2 390, vous les perdez. L'inverse vaut pour une vente à découvert.",
      },
      { h2: "Le levier : un amplificateur dans les deux sens" },
      {
        p: "Le levier permet d'ouvrir une position bien plus grosse que votre dépôt. Avec un levier de 20, une position de 20 000 $ n'exige qu'environ 1 000 $ de marge. Mais la **perte est calculée sur la taille totale de la position**, pas sur la marge. Un mouvement de 1 % contre vous coûte 200 $ sur cet exemple, soit 20 % de la marge engagée.",
      },
      {
        p: "Le levier maximal autorisé pour les particuliers est plafonné dans l'Union européenne, mais ce plafond reste élevé sur un marché aussi mouvant que l'or. La protection, c'est votre taille de position, pas le levier disponible : voyez [la taille de lot sur l'or](/blog/taille-de-lot-xau-usd).",
      },
      { h2: "Le spread : un coût à l'entrée" },
      {
        p: "Le spread est l'écart entre le prix d'achat et le prix de vente. Chaque trade commence donc légèrement dans le rouge. Sur l'or, il varie : étroit en pleine séance, plus large à l'ouverture, à la clôture du vendredi et autour des annonces. Si vous tradez de petits mouvements, il pèse lourd sur votre résultat. Regardez-le avant de cliquer.",
      },
      { h2: "Le swap : le coût de garder une position la nuit" },
      {
        p: "Si vous gardez une position après la clôture quotidienne de votre courtier, un frais de financement (le swap) est débité ou crédité selon le sens de la position et les taux en vigueur. Il est souvent négatif pour les deux sens. Il est faible pour un seul jour, mais devient notable pour des positions gardées plusieurs semaines. Le week-end est généralement facturé en triple le mercredi ou le vendredi, selon le courtier : vérifiez ses conditions.",
      },
      { h2: "L'appel de marge et la clôture forcée" },
      {
        p: "Votre courtier exige que votre capital couvre les pertes en cours de vos positions. Quand le capital disponible tombe sous un certain seuil, il peut vous demander de déposer des fonds (appel de marge) ou **fermer vos positions automatiquement** (stop-out), souvent au pire moment. Les particuliers dans l'Union européenne bénéficient d'une protection contre le solde négatif, ce qui ne veut pas dire que le compte ne peut pas être vidé.",
      },
      { h2: "Les écarts de prix (gaps) et le glissement" },
      {
        p: "Votre stop n'est pas une garantie de sortie à un prix précis. Si le marché saute le niveau (annonce, réouverture du dimanche), l'ordre est exécuté au prix suivant disponible, parfois nettement plus loin. C'est le glissement. Certains courtiers proposent des stops garantis, généralement avec un coût supplémentaire. Détails sur les annonces dans [trader l'or pendant le NFP, le CPI et la Fed](/blog/trader-l-or-nfp-fed).",
      },
      { h2: "Les risques qui viennent de vous" },
      {
        ul: [
          "**La taille excessive** : le premier facteur de perte de compte.",
          "**Le refus de couper une perte** : déplacer le stop plus loin transforme une petite perte en grosse perte.",
          "**Le sur-trading** : plus de trades, plus de spread payé et plus d'erreurs.",
          "**Le trading de vengeance** après une série perdante.",
          "**Les promesses extérieures** : méfiez-vous de tout vendeur de signaux, de robot ou de formation qui annonce des gains réguliers ([les arnaques aux bots de trading](/blog/bots-de-trading-ia-arnaques)).",
        ],
      },
      { h2: "Comment limiter les dégâts" },
      {
        ol: [
          "**Risquez un petit pourcentage par trade**, souvent entre 0,5 % et 1 % de votre capital ([taille de position](/blog/taille-de-position)).",
          "**Posez toujours un stop** à un endroit logique du graphique ([où placer son stop-loss](/blog/ou-placer-son-stop-loss)).",
          "**Exigez un rapport gain/risque cohérent** avant d'entrer ([ratio gain/risque](/blog/ratio-gain-risque)).",
          "**Évitez les annonces majeures** tant que vous débutez.",
          "**Commencez en démo**, puis avec une petite somme dont la perte ne change pas votre vie.",
        ],
      },
      {
        p: "Les outils d'analyse, y compris l'[analyse IA spécialisée gold](/gold), n'enlèvent pas ces risques. Ils servent à lire un graphique et à structurer un plan. Ils ne prédisent pas le prix.",
      },
      {
        p: "Ce guide est un contenu éducatif et ne constitue pas un conseil en investissement. Les CFD sont des produits complexes qui comportent un risque élevé de perte en capital, du fait de l'effet de levier. Une majorité de comptes de particuliers perdent de l'argent en les négociant.",
      },
    ],
  },
  {
    slug: "trader-l-or-nfp-fed",
    title: "Trader l'or pendant le NFP, le CPI et les annonces de la Fed",
    description:
      "Faux mouvements, spread qui s'écarte, glissement : comment aborder l'or les jours de NFP, de CPI et de décision de la Fed, et pourquoi attendre est souvent un choix valable.",
    date: "2026-11-12",
    body: [
      {
        p: "Les jours de NFP, de CPI ou de décision de la Fed, l'or peut bouger de plusieurs dizaines de dollars en quelques minutes, dans un sens puis dans l'autre. Le spread s'élargit et les stops sont exécutés plus loin que prévu. Pour la plupart des traders, la meilleure stratégie est de ne pas être en position au moment de la publication et d'attendre que le marché se stabilise.",
      },
      { h2: "De quelles annonces parle-t-on ?" },
      {
        ul: [
          "**Le NFP (Non-Farm Payrolls)** : le rapport sur l'emploi américain, publié en général le premier vendredi du mois à 14 h 30 heure de Paris.",
          "**Le CPI** : l'indice des prix à la consommation américain, mesure de l'inflation, publié une fois par mois, souvent à 14 h 30 également.",
          "**Les décisions de la Fed (FOMC)** : annonce du taux directeur vers 20 h heure de Paris, suivie d'une conférence de presse qui peut faire bouger le marché autant que la décision.",
          "**Autres statistiques** : PCE, ventes au détail, indices d'activité, demandes d'allocations. Elles sont généralement moins marquantes, mais l'or réagit parfois.",
        ],
      },
      {
        p: "Les dates et heures exactes figurent sur [le calendrier économique](/blog/calendrier-economique). Vérifiez-les chaque semaine : elles peuvent changer.",
      },
      { h2: "Pourquoi l'or réagit si fort" },
      {
        p: "Ces chiffres modifient les attentes sur les taux d'intérêt américains, donc sur le dollar et sur les taux réels, deux moteurs de l'or ([pourquoi l'or monte ou baisse](/blog/pourquoi-l-or-monte-ou-baisse)). Le prix ne réagit pas au chiffre seul, mais à son écart avec les prévisions. Un bon chiffre déjà anticipé peut ne rien faire bouger.",
      },
      { h2: "Les pièges de la minute qui suit" },
      {
        ul: [
          "**Le spread qui s'écarte** : l'écart entre achat et vente peut être multiplié, ce qui rend toute entrée coûteuse.",
          "**Le glissement** : votre stop est exécuté au prix disponible, pas à celui que vous avez choisi.",
          "**Les faux mouvements** : une première impulsion violente est souvent reprise en partie dans les minutes qui suivent. Entrer dans cette impulsion revient à acheter le haut ou vendre le bas.",
          "**Les ordres en attente** : un ordre posé de chaque côté (stratégie dite du straddle) peut être déclenché dans les deux sens et perdre deux fois.",
          "**La liquidité qui disparaît** : les prix sautent d'un niveau à un autre sans transactions intermédiaires.",
        ],
      },
      { h2: "Trois façons raisonnables d'aborder ces jours" },
      {
        ol: [
          "**Rester à l'écart** : ne pas avoir de position ouverte à l'heure de l'annonce, ni de nouvel ordre pendant les minutes qui suivent. C'est l'option la plus simple, et elle n'est pas une faiblesse.",
          "**Réduire la taille** : si vous gardez une position, divisez-la par deux ou plus et placez un stop plus large que d'habitude, en acceptant que la perte reste calculée ([taille de lot sur l'or](/blog/taille-de-lot-xau-usd)).",
          "**Attendre la réaction puis lire le graphique** : laisser passer les 15 à 30 premières minutes, repérer où le marché s'est stabilisé, puis chercher un retest d'un niveau cassé en 5 ou 15 minutes ([choisir son unité de temps](/blog/choisir-son-unite-de-temps)).",
        ],
      },
      {
        tip: "Si vous avez une position en gain avant l'annonce, vous pouvez la sécuriser en la fermant, ou en remontant le stop. Dans les deux cas, décidez avant, pas pendant.",
      },
      { h2: "Que faire si vous êtes pris dans le mouvement ?" },
      {
        p: "Ne déplacez pas votre stop plus loin pour « laisser respirer » après l'annonce. Le plan a été fait avant, avec une perte maximale acceptée. Si le stop est touché, la perte est ce qu'elle est. Prenez une pause avant de reprendre un trade, les décisions sous adrénaline sont rarement les meilleures.",
      },
      { h2: "Préparer la semaine" },
      {
        ul: [
          "Le dimanche, listez les annonces de la semaine et marquez leurs heures.",
          "Notez les niveaux importants de l'or avant l'annonce (voyez [les niveaux ronds sur l'or](/blog/niveaux-ronds-or)).",
          "Définissez à l'avance si vous tradez, réduisez ou restez à l'écart ce jour-là.",
          "Après l'annonce, comparez le mouvement réel avec votre scénario : cela construit votre expérience.",
        ],
      },
      {
        p: "Lorsque vous soumettez une capture à l'[analyse gold](/gold) un jour d'annonce, l'outil rappelle le risque de fausses cassures et peut conclure à l'attente. Un « attendre » est une réponse valable, pas un échec.",
      },
      {
        p: "Ce guide est un contenu éducatif et ne constitue pas un conseil en investissement. Les CFD sont des produits complexes qui comportent un risque élevé de perte en capital, particulièrement lors des annonces économiques.",
      },
    ],
  },
  {
    slug: "niveaux-ronds-or",
    title: "Supports, résistances et niveaux ronds sur l'or",
    description:
      "Comment repérer les niveaux qui comptent sur l'or : multiples de 50 et de 100 dollars, anciens plus hauts et plus bas, zones plutôt que lignes, et comment placer stop et objectif.",
    date: "2026-11-12",
    body: [
      {
        p: "Sur l'or, les niveaux qui comptent sont les multiples de 50 et de 100 dollars (2 400, 2 450, 2 500…), les anciens plus hauts et plus bas, et les zones où le prix a déjà réagi plusieurs fois. Il faut les tracer comme des zones de quelques dollars de large, pas comme des lignes parfaites.",
      },
      { h2: "Pourquoi les chiffres ronds jouent un rôle" },
      {
        p: "Les traders pensent en chiffres ronds. Beaucoup placent leurs objectifs, leurs ordres en attente et leurs stops sur ou près de 2 400, 2 450 ou 2 500. Les ordres s'accumulent autour de ces prix, et le marché y hésite, y rebondit ou les traverse par à-coups. Ce n'est pas magique : c'est de l'auto-réalisation, qui reste observable sur l'or parce que son prix s'exprime en chiffres simples.",
      },
      {
        p: "Les paliers de 100 $ sont les plus marquants, ceux de 50 $ viennent ensuite. Les multiples de 10 $ peuvent servir d'étapes en intraday, mais ils pèsent moins. Ne cherchez pas de signification particulière à chaque chiffre rond : un niveau qui n'a jamais été touché ou respecté par le marché n'a pas d'importance particulière.",
      },
      { h2: "Les anciens plus hauts et plus bas" },
      {
        p: "Le plus fiable reste ce que le prix a lui-même dessiné. Un ancien sommet devient une résistance, un ancien creux un support, et lorsqu'ils sont cassés, ils peuvent changer de rôle. Plus un niveau a été testé, et plus l'historique est lisible sur une unité de temps élevée, plus il compte. Les bases sont dans [supports et résistances](/blog/supports-et-resistances).",
      },
      {
        ul: [
          "**Plus haut et plus bas de la veille** : repères très suivis en intraday.",
          "**Plus haut et plus bas de la séance asiatique** : bornes du range avant l'ouverture de Londres ([meilleures heures pour trader l'or](/blog/meilleures-heures-pour-trader-l-or)).",
          "**Plus haut et plus bas de la semaine** : niveaux de contexte.",
          "**Sommets historiques** : quand le prix s'en approche, les réactions sont souvent fortes et rapides.",
        ],
      },
      { h2: "Des zones, pas des lignes" },
      {
        p: "Un niveau est rarement respecté au dollar près. L'or perce souvent de quelques dollars avant de repartir. Tracez donc un rectangle qui englobe les mèches, pas un trait fin. Sur un graphique en 1 heure, une zone de 5 à 10 $ de large est courante. Ce que vous regardez : où les bougies ont été rejetées, et comment elles se ferment ([les chandeliers japonais](/blog/chandeliers-japonais)).",
      },
      { h2: "Quand un niveau rond et un niveau technique se superposent" },
      {
        p: "Le cas le plus intéressant est la confluence : un chiffre rond qui coïncide avec un ancien sommet ou un creux. Plusieurs raisons de réagir au même endroit renforcent la zone. Si 2 450 correspond aussi à un plus haut de la semaine passée, il mérite d'être surveillé de près. Cela reste une probabilité, pas une certitude.",
      },
      { h2: "Comment s'en servir pour le plan" },
      {
        ol: [
          "**Marquez les zones** sur le 1 heure : deux ou trois niveaux au-dessus, deux ou trois en dessous du prix.",
          "**Choisissez le scénario** : rebond sur un support, cassure d'une résistance avec retest, ou attente.",
          "**Placez le stop au-delà de la zone**, pas à l'intérieur ni pile sur le chiffre rond. Une zone de 2 450 peut être dépassée à 2 453 avant un retour : un stop à 2 449,5 sera touché pour rien ([où placer son stop-loss](/blog/ou-placer-son-stop-loss)).",
          "**Placez l'objectif juste avant le niveau suivant**, plutôt que dessus : beaucoup d'ordres de prise de profit y sont posés, et le prix peut faire demi-tour à quelques dollars.",
          "**Vérifiez le rapport gain/risque** une fois ces chiffres posés ([ratio gain/risque](/blog/ratio-gain-risque)).",
        ],
      },
      { h2: "Les erreurs fréquentes" },
      {
        ul: [
          "**Tracer trop de niveaux** : le graphique devient illisible. Gardez les plus évidents.",
          "**Entrer à la première touche** sans signe de réaction. Attendre une bougie de rejet ou une clôture au-delà réduit les faux départs.",
          "**Oublier le contexte** : un niveau rond pèse peu face à une annonce américaine majeure ([trader l'or pendant le NFP et la Fed](/blog/trader-l-or-nfp-fed)).",
          "**Mélanger les unités de temps** sans savoir laquelle prime : le niveau du 1 heure l'emporte sur celui du 5 minutes.",
        ],
      },
      {
        p: "L'[analyse IA gold](/gold) trace les niveaux sur votre capture en tenant compte des chiffres ronds. Vous pouvez comparer avec vos propres zones : si l'écart est grand, demandez-vous pourquoi avant de trader.",
      },
      {
        p: "Ce guide est un contenu éducatif et ne constitue pas un conseil en investissement. Aucun niveau n'est garanti d'être respecté. Les CFD comportent un risque élevé de perte en capital.",
      },
    ],
  },
  {
    slug: "strategie-or-1h-15m-5m",
    title: "Une routine intraday sur l'or : 1 heure, 15 minutes, 5 minutes",
    description:
      "Direction en 1 heure, plan en 15 minutes, entrée en 5 minutes : une routine d'analyse multi-unités sur l'or, expliquée pas à pas, avec ses limites.",
    date: "2026-11-12",
    body: [
      {
        p: "Cette routine part du plus grand cadre vers le plus petit : vous lisez la direction sur le graphique en 1 heure, vous bâtissez le plan sur le 15 minutes et vous cherchez l'entrée sur le 5 minutes. Le but est de ne pas trader un signal de 5 minutes qui va contre tout ce que montre le 1 heure. Ce n'est pas une méthode gagnante garantie : c'est un cadre de travail.",
      },
      { h2: "Pourquoi trois unités de temps ?" },
      {
        p: "Un seul graphique donne une image partielle. Le 5 minutes est bruyant sur l'or et peut montrer une cassure qui n'est qu'un mouvement de plus dans une tendance baissière en 1 heure. Le 1 heure donne le contexte mais pas le point d'entrée précis. Les trois ensemble répondent à trois questions : où va le marché, où sont les niveaux, quand agir. Voyez aussi [choisir son unité de temps](/blog/choisir-son-unite-de-temps).",
      },
      { h2: "Étape 0 : avant d'ouvrir le graphique" },
      {
        ul: [
          "Consultez le calendrier : annonce américaine à 14 h 30 ? Décision de la Fed ce soir ? ([calendrier économique](/blog/calendrier-economique)).",
          "Décidez de votre fenêtre de trading ([meilleures heures pour trader l'or](/blog/meilleures-heures-pour-trader-l-or)).",
          "Fixez votre risque maximum par trade et pour la journée, par exemple 1 % par trade et trois pertes maximum avant d'arrêter.",
        ],
      },
      { h2: "Étape 1 : la direction en 1 heure" },
      {
        p: "Regardez les dernières journées. Les sommets et les creux montent-ils, descendent-ils, ou stagnent-ils dans un range ? Où le prix a-t-il déjà réagi à plusieurs reprises ? Tracez deux ou trois zones au-dessus et en dessous ([niveaux ronds et supports sur l'or](/blog/niveaux-ronds-or)).",
      },
      {
        p: "Au terme de cette étape, vous devez pouvoir écrire une phrase : « Tendance haussière, le prix est sous la résistance de 2 450, support à 2 400. » Si vous n'y arrivez pas, le marché n'est pas lisible : passez votre tour. C'est une réponse valable.",
      },
      { h2: "Étape 2 : le plan en 15 minutes" },
      {
        p: "Sur le 15 minutes, affinez les niveaux utiles pour la journée et choisissez un scénario privilégié, avec un scénario alternatif. Par exemple : « Si le prix clôture au-dessus de 2 432, je cherche l'achat avec un stop sous 2 418 et un objectif vers 2 450. Si 2 418 casse, j'abandonne l'idée. » Les chiffres sont ici un exemple, pas un conseil.",
      },
      {
        ul: [
          "**Écrivez les conditions d'entrée** avant que le prix n'arrive.",
          "**Fixez le stop** au-delà de la zone, pas au ras ([où placer son stop-loss](/blog/ou-placer-son-stop-loss)).",
          "**Calculez le rapport gain/risque** : sous 1,5 ou 2, l'idée mérite d'être remise en question ([ratio gain/risque](/blog/ratio-gain-risque)).",
          "**Calculez la taille de lot** d'après la distance au stop ([taille de lot sur l'or](/blog/taille-de-lot-xau-usd)).",
        ],
      },
      { h2: "Étape 3 : l'entrée en 5 minutes" },
      {
        p: "Le 5 minutes sert à choisir le moment, pas la direction. Attendez que votre condition se réalise : une clôture au-dessus d'un niveau, un retest qui tient, une bougie de rejet sur un support ([chandeliers japonais](/blog/chandeliers-japonais)). Si le prix s'agite sous la zone sans clôture au-dessus, vous attendez.",
      },
      {
        p: "N'entrez pas en pleine bougie qui s'envole. Mieux vaut manquer un trade que de courir après un prix déjà parti : le stop devient trop loin et le rapport gain/risque se dégrade.",
      },
      { h2: "Étape 4 : la gestion" },
      {
        ul: [
          "Une fois en position, ne touchez pas au stop sauf pour le remonter dans le sens du trade, selon des règles décidées à l'avance.",
          "Prenez une partie du gain à un niveau logique si votre plan le prévoit.",
          "Fermez avant une annonce majeure si vous n'avez pas prévu de la traverser ([NFP, CPI et Fed](/blog/trader-l-or-nfp-fed)).",
          "Notez le trade et une capture, gagnant ou perdant : c'est votre matière pour progresser.",
        ],
      },
      { h2: "Les limites de cette routine" },
      {
        ul: [
          "**Elle ne prédit rien** : le scénario privilégié se trompe souvent, et le stop est là pour ça.",
          "**Elle suppose de la discipline** : sauter une étape ou déplacer un stop annule l'intérêt de la méthode.",
          "**Elle ne vaut que si vous la testez** : sur au moins plusieurs dizaines de trades en démo ou en petite taille, avec un journal, avant d'en tirer une conclusion.",
          "**Elle s'adapte mal aux jours d'annonce** : la structure habituelle est brouillée.",
          "**Les coûts comptent** : spread et swap réduisent le résultat, surtout sur des petits objectifs ([risques des CFD](/blog/trader-l-or-cfd-risques)).",
        ],
      },
      {
        p: "C'est la logique que suit l'[analyse spécialisée gold](/gold) : une capture par unité de temps, de la direction à l'entrée, avec une conclusion « attendre » possible. Vous pouvez aussi la faire à la main et vous servir de l'outil pour comparer. Pour des captures bien lisibles, voyez [comment faire une bonne capture d'écran](/blog/capture-ecran-graphique).",
      },
      {
        p: "Ce guide est un contenu éducatif et ne constitue pas un conseil en investissement. Les chiffres cités sont des exemples. Les CFD sont des produits complexes qui comportent un risque élevé de perte en capital.",
      },
    ],
  },
  {
    slug: "analyser-l-or-avec-l-ia",
    title: "Analyser l'or avec l'IA : ce qu'elle lit, ce qu'elle ne sait pas faire",
    description:
      "Ce qu'une IA peut lire sur un graphique XAU/USD (tendance, niveaux, plan), ce qu'elle ne peut pas faire (prédire, voir le temps réel) et comment l'utiliser sans se tromper.",
    date: "2026-11-12",
    body: [
      {
        p: "Une IA peut lire une capture de graphique XAU/USD comme le ferait un trader : identifier la tendance, repérer des niveaux, décrire des bougies et proposer un plan avec entrée, stop et objectifs. Elle ne peut pas prédire le prix, ne voit que l'image que vous lui donnez et ne remplace pas votre jugement ni votre gestion du risque.",
      },
      { h2: "Ce qu'une IA lit sur un graphique d'or" },
      {
        ul: [
          "**La tendance et la structure** : succession de sommets et de creux, range ou cassure.",
          "**Les niveaux** : zones où le prix a réagi, anciens plus hauts et plus bas, chiffres ronds ([niveaux ronds sur l'or](/blog/niveaux-ronds-or)).",
          "**Les bougies et figures** : mèches de rejet, englobantes, figures de continuation ([chandeliers japonais](/blog/chandeliers-japonais), [figures chartistes](/blog/figures-chartistes)).",
          "**Les indicateurs visibles** : RSI, moyennes mobiles, s'ils figurent sur la capture ([RSI](/blog/rsi-indicateur)).",
          "**Un plan chiffré** : entrée, stop, objectifs et le niveau qui invaliderait l'idée.",
        ],
      },
      {
        p: "L'intérêt est surtout de gagner du temps et d'obtenir une seconde lecture, argumentée, que vous pouvez confronter à la vôtre. Le principe général est expliqué dans [l'analyse technique par IA](/blog/analyse-technique-ia).",
      },
      { h2: "Ce qu'une IA ne sait pas faire" },
      {
        ul: [
          "**Prédire** : elle pèse des scénarios. Le scénario privilégié peut se tromper, et un pourcentage affiché n'est pas une probabilité statistique garantie.",
          "**Voir le temps réel** : elle ne connaît que votre capture. Si le prix a bougé depuis, la lecture est périmée.",
          "**Lire une image illisible** : axe des prix coupé, graphique surchargé ou capture floue dégradent la réponse ([bien faire sa capture](/blog/capture-ecran-graphique)).",
          "**Connaître votre situation** : votre capital, votre tolérance au risque, vos frais, votre courtier. Elle ne passe pas d'ordres, elle ne gère pas votre argent.",
          "**Remplacer la discipline** : une bonne lecture suivie d'une taille de position excessive reste une mauvaise idée.",
        ],
      },
      { h2: "Pourquoi l'or demande des réglages propres" },
      {
        p: "L'or n'est pas une action ni une paire de devises comme les autres. Il est très mouvant, réagit fortement aux statistiques américaines, et les chiffres ronds y jouent un rôle visible. Une lecture générique peut placer un stop trop près ou ignorer qu'une annonce arrive. C'est ce qui motive une analyse réglée pour l'or ([comment trader l'or](/blog/comment-trader-l-or)).",
      },
      { h2: "L'analyse gold de Scanzivo" },
      {
        p: "Scanzivo propose une [analyse spécialisée gold](/gold). Vous envoyez une capture de votre graphique XAU/USD, quelle que soit la plateforme (TradingView, MetaTrader, cTrader ou application de courtier). L'analyse suit des consignes propres à l'or : chiffres ronds, sessions, statistiques américaines, stops placés au-delà des mèches récentes. Le modèle d'IA, lui, est le même que pour les autres actifs. La routine d'analyse en trois captures est décrite dans [la routine 1 heure, 15 minutes, 5 minutes](/blog/strategie-or-1h-15m-5m).",
      },
      {
        p: "Ce que le service ne fait pas : il ne prédit pas le prix, ne passe aucun ordre, n'envoie pas de signaux et ne donne pas de conseil en investissement personnalisé.",
      },
      { h2: "Comment s'en servir intelligemment" },
      {
        ol: [
          "**Faites d'abord votre propre lecture**, en quelques lignes : direction, niveaux, scénario.",
          "**Envoyez ensuite la capture** et comparez. Un accord ne prouve rien, un désaccord vous invite à regarder de plus près.",
          "**Vérifiez les niveaux sur votre graphique** : l'IA peut mal placer une ligne. Vous êtes le dernier relecteur.",
          "**Contrôlez le calendrier** : une annonce proche change tout ([NFP, CPI et Fed](/blog/trader-l-or-nfp-fed)).",
          "**Calculez vous-même votre taille** avec vos données ([taille de lot sur l'or](/blog/taille-de-lot-xau-usd)).",
          "**Tenez un journal** pour voir, sur la durée, si la lecture vous aide ou non.",
        ],
      },
      {
        tip: "Si l'analyse conclut qu'il vaut mieux attendre, c'est une information utile. Un outil qui trouve toujours un trade à prendre devrait vous inquiéter.",
      },
      { h2: "Les mauvaises raisons d'utiliser une IA" },
      {
        ul: [
          "Pour ne plus avoir à apprendre à lire un graphique.",
          "Pour trouver un trade à tout prix quand le marché n'offre rien.",
          "Pour justifier une position déjà prise.",
          "Parce qu'une source promet des résultats réguliers : méfiez-vous ([arnaques aux bots de trading](/blog/bots-de-trading-ia-arnaques)).",
        ],
      },
      {
        p: "Utilisée comme une aide à la réflexion, l'IA peut accélérer votre routine et vous faire voir ce que vous avez négligé. Comme une boule de cristal, elle vous fera perdre de l'argent.",
      },
      {
        p: "Ce guide est un contenu éducatif et ne constitue pas un conseil en investissement. L'analyse par IA ne garantit aucun résultat. Les CFD sont des produits complexes qui comportent un risque élevé de perte en capital.",
      },
    ],
  },
];
