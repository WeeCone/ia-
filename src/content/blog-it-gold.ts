import type { Article } from "./blog";

/** Italian guides on gold (XAU/USD); `key` is the French slug. Times are Italian time (CET/CEST), examples in euros. */
export const ARTICLES_IT_GOLD: Omit<Article, "locale">[] = [
  {
    key: "comment-trader-l-or",
    slug: "come-fare-trading-sull-oro",
    title: "Come fare trading sull'oro (XAU/USD): la guida per iniziare",
    description:
      "Che cosa muove l'oro, come viene quotato, che cos'è un CFD sull'oro, le sessioni da conoscere e una routine semplice per iniziare senza disperdersi.",
    date: "2026-11-12",
    body: [
      {
        p: "Per fare trading sull'oro, la maggior parte dei privati apre un CFD sul XAU/USD presso un broker: si scommette sul rialzo o sul ribasso del prezzo di un'oncia d'oro espresso in dollari, senza possedere il metallo. È accessibile, ma è un mercato nervoso. Ecco come funziona e da dove partire.",
      },
      { h2: "Che cos'è il XAU/USD?" },
      {
        p: "XAU è il codice dell'oro, USD quello del dollaro americano. Il prezzo mostrato è quello di **un'oncia troy d'oro (circa 31,1 grammi) in dollari**. Quando il grafico indica 2.400, un'oncia vale 2.400 $. A seconda della piattaforma troverà XAU/USD, XAUUSD o semplicemente GOLD: è lo stesso strumento.",
      },
      {
        p: "Poiché il prezzo è in dollari, l'oro reagisce a tutto ciò che riguarda il dollaro. È la prima cosa da ricordare: un dollaro che sale pesa in genere sull'oro, un dollaro che scende lo aiuta. I dettagli sono in [perché l'oro sale o scende](/blog/perche-l-oro-sale-o-scende).",
      },
      { h2: "Come si fa trading sull'oro: CFD, futures, ETF" },
      {
        ul: [
          "**Il CFD**: un contratto con il broker sulla differenza di prezzo tra apertura e chiusura. Si può comprare o vendere allo scoperto, con leva. È lo strumento più diffuso per l'operatività intraday.",
          "**I futures**: contratti standardizzati, negoziati in borsa, con tagli di contratto importanti. Più adatti a profili esperti.",
          "**Gli ETF e l'oro fisico**: per detenere oro nel tempo, senza leva. Non è trading in senso stretto.",
        ],
      },
      {
        p: "Questa guida parla di CFD. Offrono flessibilità, ma anche rischi specifici: leva, spread, costi di finanziamento. Sono approfonditi in [trading sull'oro con i CFD: i rischi](/blog/trading-oro-cfd-rischi).",
      },
      { h2: "Perché l'oro è così mosso?" },
      {
        p: "In una sessione l'oro può muoversi di diverse decine di dollari, di più nei giorni di dati macro. In punti di prezzo i movimenti sono molto più ampi rispetto alla maggior parte delle coppie di valute. Due conseguenze pratiche: gli stop devono essere più larghi, quindi le posizioni più piccole, e gli errori costano più in fretta.",
      },
      {
        p: "L'oro reagisce soprattutto ai dati americani (occupazione, inflazione), alle decisioni della Fed, al dollaro, ai tassi d'interesse reali e alle tensioni geopolitiche. Il calendario conta quanto il grafico: veda il [calendario economico](/blog/calendario-economico).",
      },
      { h2: "Le sessioni da conoscere" },
      {
        p: "L'oro si negozia quasi senza interruzione, ma l'attività varia molto nell'arco della giornata. In orario italiano: la sessione asiatica è spesso tranquilla, Londra apre verso le 9:00, New York verso le 14:30 con i dati americani. I movimenti più ampi si concentrano in genere da Londra fino a fine sessione newyorkese. Il dettaglio è in [gli orari migliori per fare trading sull'oro](/blog/orari-migliori-trading-oro).",
      },
      { h2: "Una routine semplice per iniziare" },
      {
        ol: [
          "**Prima della sessione**, controlli il calendario: un dato americano importante cambia il piano della giornata.",
          "**Legga la direzione su 1 ora**: trend, ultimi massimi e minimi, zone in cui il prezzo ha già reagito. [Come leggere un grafico di trading](/blog/come-leggere-un-grafico-di-trading) Le dà le basi.",
          "**Individui i livelli**: vecchi massimi e minimi e numeri tondi (veda [numeri tondi, supporti e resistenze sull'oro](/blog/numeri-tondi-oro)).",
          "**Definisca il piano prima di entrare**: ingresso, stop, obiettivo. Se il rapporto rischio/rendimento è scarso, lasci perdere ([rapporto rischio/rendimento](/blog/rapporto-rischio-rendimento)).",
          "**Calcoli la dimensione** partendo dallo stop, non dalla voglia di entrare: veda [il calcolo del lotto sull'oro](/blog/lotto-oro-xau-usd).",
          "**Annoti il risultato**, qualunque sia, per capire che cosa sta facendo davvero.",
        ],
      },
      {
        p: "La versione intraday dettagliata di questa routine è in [una routine sull'oro: 1H, 15m, 5m](/blog/routine-oro-1h-15m-5m).",
      },
      { h2: "Gli errori classici di chi inizia" },
      {
        ul: [
          "**Aprire una posizione troppo grande** perché il prezzo dell'oncia sembra «piccolo» rispetto alla volatilità reale.",
          "**Operare nel mezzo di un annuncio** senza averlo visto sul calendario.",
          "**Entrare a ridosso di un numero tondo** con lo stop subito dietro: le ombre delle candele vincono.",
          "**Moltiplicare i trade** per «rifarsi» dopo una perdita.",
          "**Cambiare metodo ogni settimana**: senza una serie di prove confrontabili è impossibile capire che cosa funziona.",
        ],
      },
      {
        p: "Cominci su un conto demo, con poche cose da guardare: uno strumento, due o tre timeframe, una routine. Quando vuole, può anche sottoporre uno screenshot del grafico all'[analisi IA specializzata sull'oro](/gold) per confrontare la sua lettura con la Sua.",
      },
      {
        p: "Questa guida ha finalità esclusivamente educative e non costituisce una consulenza in materia di investimenti. I CFD sono strumenti complessi e comportano un rischio elevato di perdere rapidamente il capitale, soprattutto a causa della leva: non rischi più di quanto può permettersi di perdere.",
      },
    ],
  },
  {
    key: "meilleures-heures-pour-trader-l-or",
    slug: "orari-migliori-trading-oro",
    title: "Orari migliori per fare trading sull'oro (ora italiana)",
    description:
      "Sessioni di Tokyo, Londra e New York, sovrapposizione, orari dei dati americani: a che ora l'oro si muove di più, in orario italiano, e quando conviene evitarlo.",
    date: "2026-11-12",
    body: [
      {
        p: "L'oro si muove di più tra l'apertura di Londra, verso le 9:00 in orario italiano, e la fine della sessione americana. Il momento più attivo è spesso la sovrapposizione Londra / New York, indicativamente dalle 14:30 alle 17:30. La notte asiatica è in genere più calma e più soggetta a falsi movimenti.",
      },
      { h2: "Gli orari in ora italiana" },
      {
        p: "Questi orari sono indicativi e possono slittare di un'ora per alcune settimane l'anno, quando Europa e Stati Uniti cambiano ora legale in date diverse. In quei periodi li verifichi sulla Sua piattaforma.",
      },
      {
        ul: [
          "**Sessione asiatica (Tokyo, Sydney)**: circa dall'1:00 alle 9:00. Spesso un range stretto.",
          "**Sessione di Londra**: apertura verso le 9:00, chiusura verso le 17:30. Il primo vero picco di volumi della giornata.",
          "**Sessione di New York**: i dati americani escono in genere alle **14:30**, la borsa apre verso le 15:30, la chiusura è verso le 22:00.",
          "**Sovrapposizione Londra / New York**: circa dalle 14:30 alle 17:30. Molti partecipanti, quindi movimenti più ampi.",
        ],
      },
      { h2: "Perché conta l'apertura di Londra" },
      {
        p: "Durante la notte l'oro costruisce spesso un range: un massimo e un minimo attorno ai quali il prezzo gira. All'apertura di Londra questo range viene frequentemente rotto, da una parte o dall'altra. La rottura a volte indica la direzione dell'inizio di giornata, ma può anche essere una falsa partenza, che il prezzo riassorbe nel giro di un'ora.",
      },
      {
        p: "Un riferimento semplice: tracci massimo e minimo della sessione asiatica sul grafico. Osservi come si comporta il prezzo quando li raggiunge, invece di anticipare la rottura. Quello che cerca è una chiusura netta oltre il range e poi un ritorno che tiene il livello.",
      },
      { h2: "Le 14:30: l'ora dei dati americani" },
      {
        p: "Molti dati americani escono alle 14:30 ora italiana: occupazione (NFP), inflazione (CPI), vendite al dettaglio, richieste settimanali di sussidi di disoccupazione. L'oro a volte reagisce in pochi secondi, con spread che si allargano. Le decisioni della Fed arrivano piuttosto in tarda serata, verso le 20:00. Consulti sempre il [calendario economico](/blog/calendario-economico) prima di aprire una posizione.",
      },
      {
        p: "Come comportarsi attorno a questi annunci è trattato a parte: [oro, NFP e Fed](/blog/oro-nfp-fed).",
      },
      { h2: "Quando evitare di operare sull'oro" },
      {
        ul: [
          "**Subito prima e subito dopo un annuncio importante**: spread più largo, movimenti in entrambe le direzioni.",
          "**A fine sessione americana e alla chiusura del venerdì**: liquidità più bassa, lo spread può allargarsi.",
          "**Nei giorni festivi americani**: pochi volumi, rotture poco affidabili.",
          "**La domenica sera, alla riapertura**: possibili gap di prezzo rispetto alla chiusura del venerdì.",
        ],
      },
      { h2: "Quale fascia scegliere in base al Suo tempo?" },
      {
        p: "Non serve stare davanti allo schermo tutto il giorno. Meglio una fascia fissa che conosce bene.",
      },
      {
        ul: [
          "**La mattina (dalle 9:00 alle 12:00)**: lettura del range asiatico e della reazione a Londra. Adatta se poi lavora.",
          "**Il pomeriggio (dalle 14:30 alle 17:30)**: la più attiva, ma anche la più veloce. Riservata a chi può seguire le posizioni da vicino.",
          "**La sera**: il mercato spesso si calma, salvo annunci della Fed. Una posizione lasciata aperta nella notte espone a gap e a costi di finanziamento.",
        ],
      },
      { h2: "Adattare il timeframe alla sessione" },
      {
        p: "In un mercato calmo, un grafico a 5 minuti fa molto rumore per poca informazione. In un mercato attivo diventa utile per affinare l'ingresso. La logica è descritta in [quale timeframe scegliere](/blog/quale-timeframe-scegliere) e messa in pratica nella [routine 1H, 15m, 5m](/blog/routine-oro-1h-15m-5m).",
      },
      {
        p: "Le analisi dello [strumento specializzato sull'oro](/gold) tengono conto delle sessioni: il range asiatico rotto a Londra, gli annunci delle 14:30. Se invia uno screenshot, lo scatti all'ora in cui lo sta guardando: è quello che verrà letto.",
      },
      {
        p: "Questa guida ha finalità esclusivamente educative e non costituisce una consulenza in materia di investimenti. I CFD sono strumenti complessi e comportano un rischio elevato di perdere il capitale: anche negli orari migliori una perdita resta possibile.",
      },
    ],
  },
  {
    key: "pourquoi-l-or-monte-ou-baisse",
    slug: "perche-l-oro-sale-o-scende",
    title: "Perché l'oro sale o scende: i fattori da conoscere",
    description:
      "Dollaro, tassi reali, Fed, inflazione, acquisti delle banche centrali, tensioni geopolitiche, ETF: che cosa pesa sul prezzo dell'oro e come tenerne conto.",
    date: "2026-11-12",
    body: [
      {
        p: "Il prezzo dell'oro si muove soprattutto con il dollaro americano e con i tassi d'interesse reali, cioè i tassi al netto dell'inflazione. Quando dollaro o tassi reali scendono, l'oro tende a salire. Quando salgono, tende a scendere. Si aggiungono le tensioni geopolitiche, gli acquisti delle banche centrali e i flussi degli ETF. Sono tendenze, non leggi.",
      },
      { h2: "Il dollaro: il primo riflesso" },
      {
        p: "L'oro è quotato in dollari. Se il dollaro si rafforza, servono meno dollari per lo stesso valore: l'oro espresso in dollari spesso scende. Un dollaro più debole rende l'oncia meno cara per chi compra fuori dagli Stati Uniti, e sostiene la domanda. Il legame è frequente, non permanente: in certi giorni oro e dollaro salgono insieme.",
      },
      { h2: "I tassi d'interesse reali" },
      {
        p: "L'oro non paga né interessi né dividendi. Quando gli investimenti privi di rischio rendono molto al netto dell'inflazione, detenere oro costa caro in mancato guadagno. Quando i tassi reali scendono o diventano negativi, l'oro diventa più attraente. È spesso il fattore di fondo più citato dagli analisti.",
      },
      {
        p: "In concreto, osservi il rendimento dei titoli di Stato americani a 10 anni e le attese di taglio o rialzo dei tassi. Un rialzo brusco dei rendimenti pesa in genere sull'oro nel breve periodo.",
      },
      { h2: "La Fed e le sue decisioni" },
      {
        p: "La Fed, la banca centrale americana, fissa il tasso di riferimento e ne commenta la traiettoria. Il mercato reagisce alle parole quanto al numero. Una comunicazione più morbida del previsto sostiene spesso l'oro, un tono più fermo lo fa arretrare. Le date delle riunioni sono nel calendario: veda il [calendario economico](/blog/calendario-economico) e [oro, NFP e Fed](/blog/oro-nfp-fed).",
      },
      { h2: "L'inflazione: un rapporto meno semplice di quanto si creda" },
      {
        p: "Si dice spesso che l'oro protegga dall'inflazione. Nel lungo periodo l'idea ha i suoi sostenitori. Nel breve è più sfumata: un dato d'inflazione alto può far salire l'oro, oppure farlo scendere se spinge la Fed a mantenere tassi elevati. Ciò che conta per il prezzo è quindi il dato **rispetto alle attese** e la reazione prevista della banca centrale.",
      },
      { h2: "Le banche centrali" },
      {
        p: "Diverse banche centrali detengono oro nelle riserve, e i loro acquisti o vendite influenzano la domanda. Le posizioni vengono pubblicate con ritardo, da organismi come il World Gold Council. Queste informazioni danno un contesto di fondo, raramente un segnale per entrare all'ora giusta.",
      },
      { h2: "Le tensioni geopolitiche e l'avversione al rischio" },
      {
        p: "L'oro è considerato un bene rifugio. In periodi di incertezza (conflitti, crisi finanziarie, tensioni politiche) la domanda può aumentare e il prezzo salire in fretta. Ma l'effetto si spegne spesso quando la tensione cala, e non avvisa: è possibile un'inversione secca.",
      },
      { h2: "Gli ETF e la domanda fisica" },
      {
        p: "Gli ETF che replicano l'oro fisico vedono le proprie riserve salire o scendere in base agli ingressi e alle uscite degli investitori. Ingressi duraturi vanno piuttosto nel senso di una domanda sostenuta. Pesano anche la domanda di gioielleria e di oro fisico da investimento, in particolare in Asia, con una stagionalità propria.",
      },
      { h2: "Come usarli quando si fa trading" },
      {
        ol: [
          "**Sapere che cosa è atteso**: guardi il calendario della settimana e annoti i dati americani.",
          "**Individuare il contesto**: dollaro e rendimenti salgono o scendono da qualche giorno? L'oro va nella stessa direzione o in controtendenza?",
          "**Lasciare che sia il grafico a decidere l'ingresso**: il contesto dà un orientamento, non un punto d'ingresso. Il resto lo fanno livelli e struttura (veda [supporti e resistenze](/blog/supporti-e-resistenze)).",
          "**Diffidare del racconto a posteriori**: trovare una spiegazione dopo il movimento è facile. Prevedere il movimento no.",
        ],
      },
      {
        tip: "Un mercato può salire anche con tutte le notizie negative, e viceversa. Non operi un'opinione macro contro un grafico che dice il contrario.",
      },
      {
        p: "Per mantenere una visione d'insieme, annoti in poche righe prima della sessione: la direzione del dollaro, l'andamento dei tassi, il prossimo annuncio. L'[analisi specializzata sull'oro](/gold) di Scanzivo, con la sua parte dedicata alle notizie, incrocia questi elementi con il Suo screenshot. Può sbagliare come qualsiasi lettura: aiuta a organizzare le idee, non a prevedere.",
      },
      {
        p: "Questa guida ha finalità esclusivamente educative e non costituisce una consulenza in materia di investimenti. I CFD sono strumenti complessi e comportano un rischio elevato di perdere il capitale, e nessuna spiegazione macroeconomica garantisce la direzione del prezzo.",
      },
    ],
  },
  {
    key: "taille-de-lot-xau-usd",
    slug: "lotto-oro-xau-usd",
    title: "Calcolare il lotto sull'oro (XAU/USD)",
    description:
      "Valore del punto sull'oro, dimensione del contratto, esempio illustrativo in euro con il 1% di rischio: il metodo per calcolare il lotto e perché va verificato con il proprio broker.",
    date: "2026-11-12",
    body: [
      {
        p: "Per calcolare il lotto sull'oro: importo che accetta di perdere ÷ (distanza dello stop in dollari × numero di once per lotto). Presso molti broker 1 lotto d'oro corrisponde a 100 once, ma non è universale: **la dimensione del contratto e il valore del pip dipendono dal broker. Li verifichi sulla Sua piattaforma prima di qualsiasi calcolo.**",
      },
      { h2: "Che cosa sapere prima di calcolare" },
      {
        ul: [
          "**La dimensione del contratto**: quante once rappresenta 1 lotto. Spesso 100, a volte 1.000 o meno a seconda dello strumento e del broker.",
          "**Il lotto minimo**: spesso 0,01 lotti, a volte di più.",
          "**La valuta del conto**: se il conto è in euro, guadagno o perdita, calcolati in dollari, vengono convertiti al cambio EUR/USD del momento.",
          "**La definizione di «pip» sull'oro**: varia. Alcuni broker parlano di pip da 0,10 $, altri di punto da 0,01 $. Per evitare confusione, ragioni in **dollari di movimento del prezzo**.",
        ],
      },
      {
        p: "Sulla piattaforma, la scheda dello strumento («specifiche del contratto») riporta questi valori. Un altro modo di controllare: apra una posizione demo al lotto minimo, sposti mentalmente il prezzo di 1 $ e guardi la variazione del risultato mostrata.",
      },
      { h2: "La formula" },
      {
        p: "Con un contratto da 100 once per lotto, una variazione di 1 $ del prezzo cambia il risultato di 100 $ per lotto. La formula generale è quella della [dimensione della posizione](/blog/dimensione-della-posizione):",
      },
      {
        ol: [
          "**Importo a rischio** = capitale × percentuale di rischio.",
          "**Perdita per lotto** = distanza dello stop in $ × once per lotto (convertita in euro se il conto è in euro).",
          "**Dimensione del lotto** = importo a rischio ÷ perdita per lotto.",
        ],
      },
      { h2: "Esempio numerico (illustrativo)" },
      {
        p: "I numeri che seguono sono **un esempio**, non una raccomandazione né un prezzo di mercato, e dipendono dal broker. Ipotesi: conto da 5.000 €, rischio dell'1%, contratto da 100 once per lotto, EUR/USD a 1,10, stop a 10 $ dall'ingresso.",
      },
      {
        ul: [
          "Importo a rischio: 5.000 € × 1% = **50 €**, cioè circa 55 $.",
          "Perdita per 1 lotto se lo stop viene toccato: 10 $ × 100 once = 1.000 $, cioè circa 909 €.",
          "Dimensione del lotto: 55 $ ÷ 1.000 $ = **0,055 lotti**.",
          "Si arrotonda **per difetto**: 0,05 lotti. Se lo stop viene toccato, la perdita è di circa 50 $, poco meno di 46 €, quindi sotto il rischio previsto.",
        ],
      },
      {
        p: "Con uno stop più largo, lo stesso metodo dà una posizione più piccola. Stop a 20 $: 55 $ ÷ 2.000 $ = 0,0275 lotti, cioè 0,02 lotti arrotondando. È lo stop a imporre la dimensione, mai il contrario.",
      },
      { h2: "E se il calcolo scende sotto il lotto minimo?" },
      {
        p: "Con un conto piccolo, può capitare che il calcolo dia 0,008 lotti mentre il minimo è 0,01. In tal caso aprire comunque significa rischiare più del previsto. Le opzioni oneste: ridurre la distanza dello stop se il grafico lo consente, cercare un broker con un contratto più piccolo, oppure rinunciare. Non forzi la dimensione per «entrare lo stesso».",
      },
      { h2: "Non dimenticare spread e slippage" },
      {
        p: "La perdita reale può superare lo stop teorico: lo spread si aggiunge in ingresso e in uscita, e durante un annuncio il prezzo può saltare il livello dello stop. Lasci un piccolo margine nel calcolo ed eviti posizioni pesanti attorno ai dati macro ([il caso di NFP e Fed](/blog/oro-nfp-fed)).",
      },
      { h2: "Dove mettere lo stop prima di calcolare?" },
      {
        p: "Lo stop si posiziona in base al grafico, non in base all'importo che vorrebbe rischiare. Sull'oro deve in genere superare le ombre recenti e il livello che invaliderebbe la Sua idea. Veda [dove mettere lo stop loss](/blog/dove-mettere-lo-stop-loss). Uno stop da 3 $ su un mercato che si muove di 10 $ in pochi minuti verrà quasi sempre colpito.",
      },
      {
        p: "L'[analisi IA sull'oro](/gold) propone un piano numerico con ingresso, stop e obiettivi, a partire dal Suo screenshot. La dimensione del lotto resta da calcolare da Lei, con i valori del Suo broker e la Sua percentuale di rischio.",
      },
      {
        p: "Questa guida ha finalità esclusivamente educative e non costituisce una consulenza in materia di investimenti. Gli esempi numerici sono illustrativi. I CFD comportano un rischio elevato di perdere il capitale, e la perdita può superare la somma prevista in caso di forti variazioni.",
      },
    ],
  },
  {
    key: "trader-l-or-cfd-risques",
    slug: "trading-oro-cfd-rischi",
    title: "Trading sull'oro con i CFD: leva, spread, swap e rischi reali",
    description:
      "Che cos'è un CFD sull'oro, come funzionano leva, spread, swap e margin call, e che cosa rischia davvero. Senza promesse di guadagno.",
    date: "2026-11-12",
    body: [
      {
        p: "Un CFD sull'oro è un contratto con un broker sulla differenza di prezzo del XAU/USD. Permette di puntare al rialzo o al ribasso con la leva. La leva amplifica guadagni e perdite: si può perdere rapidamente tutto o gran parte del deposito. Molti conti di investitori privati perdono denaro su questi prodotti.",
      },
      { h2: "Che cos'è un CFD sull'oro?" },
      {
        p: "CFD significa contratto per differenza. Non possiede nessun lingotto: scambia con il broker la differenza tra prezzo di apertura e di chiusura. Se compra a 2.400 e chiude a 2.410, guadagna dieci dollari per oncia del contratto. Se il prezzo scende a 2.390, li perde. Vale il contrario per una vendita allo scoperto.",
      },
      { h2: "La leva: un amplificatore in entrambe le direzioni" },
      {
        p: "La leva permette di aprire una posizione molto più grande del deposito. Con leva 20, una posizione da 20.000 $ richiede solo circa 1.000 $ di margine. Ma la **perdita viene calcolata sulla dimensione totale della posizione**, non sul margine. Un movimento dell'1% contro di Lei costa 200 $ in questo esempio, il 20% del margine impegnato.",
      },
      {
        p: "La leva massima consentita ai clienti al dettaglio è limitata nell'Unione europea, ma il tetto resta alto su un mercato mosso come l'oro. La protezione è la dimensione della posizione, non la leva disponibile: veda [il calcolo del lotto sull'oro](/blog/lotto-oro-xau-usd).",
      },
      { h2: "Lo spread: un costo all'ingresso" },
      {
        p: "Lo spread è la differenza tra prezzo di acquisto e prezzo di vendita. Ogni trade parte quindi leggermente in perdita. Sull'oro varia: stretto a mercato pieno, più largo all'apertura, alla chiusura del venerdì e attorno agli annunci. Se opera su piccoli movimenti, pesa molto sul risultato. Lo guardi prima di cliccare.",
      },
      { h2: "Lo swap: il costo di tenere una posizione di notte" },
      {
        p: "Se mantiene una posizione dopo la chiusura giornaliera del broker, viene addebitato o accreditato un costo di finanziamento (lo swap), a seconda della direzione della posizione e dei tassi in vigore. Spesso è negativo in entrambe le direzioni. È modesto per un solo giorno, ma diventa rilevante per posizioni tenute per settimane. Il fine settimana viene in genere addebitato in triplo il mercoledì o il venerdì, a seconda del broker: verifichi le sue condizioni.",
      },
      { h2: "Margin call e chiusura forzata" },
      {
        p: "Il broker richiede che il Suo capitale copra le perdite in corso delle posizioni. Quando il capitale disponibile scende sotto una certa soglia, può chiederLe di versare fondi (margin call) o **chiudere automaticamente le posizioni** (stop-out), spesso nel momento peggiore. I clienti al dettaglio nell'Unione europea godono della protezione dal saldo negativo, il che non significa che il conto non possa essere azzerato.",
      },
      { h2: "I gap di prezzo e lo slippage" },
      {
        p: "Il Suo stop non è una garanzia di uscita a un prezzo preciso. Se il mercato salta il livello (annuncio, riapertura della domenica), l'ordine viene eseguito al prezzo successivo disponibile, a volte molto più lontano. È lo slippage. Alcuni broker offrono stop garantiti, in genere con un costo aggiuntivo. Dettagli sugli annunci in [oro, NFP e Fed](/blog/oro-nfp-fed).",
      },
      { h2: "I rischi che dipendono da Lei" },
      {
        ul: [
          "**La dimensione eccessiva**: la prima causa di perdita del conto.",
          "**Il rifiuto di chiudere una perdita**: spostare lo stop più lontano trasforma una piccola perdita in una grossa.",
          "**L'overtrading**: più operazioni, più spread pagato e più errori.",
          "**Il trading di vendetta** dopo una serie negativa.",
          "**Le promesse esterne**: diffidi di chi vende segnali, robot o corsi annunciando guadagni regolari ([le truffe dei bot di trading](/blog/bot-di-trading-ia-truffe)).",
        ],
      },
      { h2: "Come limitare i danni" },
      {
        ol: [
          "**Rischi una piccola percentuale per trade**, spesso tra lo 0,5% e l'1% del capitale ([dimensione della posizione](/blog/dimensione-della-posizione)).",
          "**Metta sempre uno stop** in un punto logico del grafico ([dove mettere lo stop loss](/blog/dove-mettere-lo-stop-loss)).",
          "**Pretenda un rapporto rischio/rendimento coerente** prima di entrare ([rapporto rischio/rendimento](/blog/rapporto-rischio-rendimento)).",
          "**Eviti gli annunci importanti** finché è alle prime armi.",
          "**Cominci in demo**, poi con una somma ridotta la cui perdita non Le cambi la vita.",
        ],
      },
      {
        p: "Gli strumenti di analisi, compresa l'[analisi IA specializzata sull'oro](/gold), non eliminano questi rischi. Servono a leggere un grafico e a organizzare un piano. Non prevedono il prezzo.",
      },
      {
        p: "Questa guida ha finalità esclusivamente educative e non costituisce una consulenza in materia di investimenti. I CFD sono strumenti complessi e comportano un rischio elevato di perdere rapidamente il capitale a causa della leva. La maggioranza dei conti di investitori privati perde denaro negoziandoli.",
      },
    ],
  },
  {
    key: "trader-l-or-nfp-fed",
    slug: "oro-nfp-fed",
    title: "Oro e NFP, CPI, Fed: come comportarsi nei giorni di annunci",
    description:
      "Falsi movimenti, spread che si allarga, slippage: come affrontare l'oro nei giorni di NFP, CPI e decisioni della Fed, e perché aspettare è spesso una scelta valida.",
    date: "2026-11-12",
    body: [
      {
        p: "Nei giorni di NFP, CPI o decisione della Fed, l'oro può muoversi di diverse decine di dollari in pochi minuti, in una direzione e poi nell'altra. Lo spread si allarga e gli stop vengono eseguiti più lontano del previsto. Per la maggior parte dei trader, la strategia migliore è non essere in posizione al momento della pubblicazione e attendere che il mercato si stabilizzi.",
      },
      { h2: "Di quali annunci parliamo?" },
      {
        ul: [
          "**L'NFP (Non-Farm Payrolls)**: il rapporto sull'occupazione americana, pubblicato in genere il primo venerdì del mese alle 14:30 ora italiana.",
          "**Il CPI**: l'indice dei prezzi al consumo americano, misura dell'inflazione, pubblicato una volta al mese, spesso anch'esso alle 14:30.",
          "**Le decisioni della Fed (FOMC)**: annuncio del tasso di riferimento verso le 20:00 ora italiana, seguito da una conferenza stampa che può muovere il mercato quanto la decisione.",
          "**Altri dati**: PCE, vendite al dettaglio, indici di attività, richieste di sussidi. In genere meno rilevanti, ma l'oro a volte reagisce.",
        ],
      },
      {
        p: "Date e orari esatti sono nel [calendario economico](/blog/calendario-economico). Li verifichi ogni settimana: possono cambiare.",
      },
      { h2: "Perché l'oro reagisce così forte" },
      {
        p: "Questi dati modificano le attese sui tassi d'interesse americani, quindi sul dollaro e sui tassi reali, due motori dell'oro ([perché l'oro sale o scende](/blog/perche-l-oro-sale-o-scende)). Il prezzo non reagisce al dato in sé, ma alla sua distanza dalle previsioni. Un buon dato già scontato può non muovere nulla.",
      },
      { h2: "Le trappole del minuto successivo" },
      {
        ul: [
          "**Lo spread che si allarga**: la differenza tra acquisto e vendita può moltiplicarsi, rendendo costoso ogni ingresso.",
          "**Lo slippage**: il Suo stop viene eseguito al prezzo disponibile, non a quello che ha scelto.",
          "**I falsi movimenti**: un primo impulso violento viene spesso riassorbito in parte nei minuti seguenti. Entrare in quell'impulso significa comprare il massimo o vendere il minimo.",
          "**Gli ordini pendenti**: un ordine piazzato da entrambi i lati (la strategia detta straddle) può scattare in tutte e due le direzioni e perdere due volte.",
          "**La liquidità che sparisce**: i prezzi saltano da un livello all'altro senza scambi intermedi.",
        ],
      },
      { h2: "Tre modi ragionevoli di affrontare questi giorni" },
      {
        ol: [
          "**Restare alla larga**: nessuna posizione aperta all'ora dell'annuncio, né nuovi ordini nei minuti successivi. È l'opzione più semplice, e non è una debolezza.",
          "**Ridurre la dimensione**: se mantiene una posizione, la divida per due o più e metta uno stop più largo del solito, accettando che la perdita resti calcolata ([il calcolo del lotto sull'oro](/blog/lotto-oro-xau-usd)).",
          "**Attendere la reazione e poi leggere il grafico**: lasci passare i primi 15-30 minuti, individui dove il mercato si è stabilizzato, poi cerchi un retest di un livello rotto su 5 o 15 minuti ([quale timeframe scegliere](/blog/quale-timeframe-scegliere)).",
        ],
      },
      {
        tip: "Se prima dell'annuncio ha una posizione in guadagno, può metterla al sicuro chiudendola o spostando lo stop. In entrambi i casi decida prima, non durante.",
      },
      { h2: "Che cosa fare se resta intrappolato nel movimento?" },
      {
        p: "Non sposti lo stop più lontano per «lasciar respirare» dopo l'annuncio. Il piano è stato fatto prima, con una perdita massima accettata. Se lo stop viene toccato, la perdita è quella che è. Faccia una pausa prima di riprendere a operare: le decisioni prese sotto adrenalina raramente sono le migliori.",
      },
      { h2: "Preparare la settimana" },
      {
        ul: [
          "La domenica elenchi gli annunci della settimana e segni gli orari.",
          "Annoti i livelli importanti dell'oro prima dell'annuncio (veda [numeri tondi, supporti e resistenze sull'oro](/blog/numeri-tondi-oro)).",
          "Decida in anticipo se quel giorno opera, riduce o resta alla larga.",
          "Dopo l'annuncio, confronti il movimento reale con il Suo scenario: costruisce la Sua esperienza.",
        ],
      },
      {
        p: "Quando sottopone uno screenshot all'[analisi sull'oro](/gold) in un giorno di annunci, lo strumento ricorda il rischio di false rotture e può concludere di attendere. Un «attendere» è una risposta valida, non un fallimento.",
      },
      {
        p: "Questa guida ha finalità esclusivamente educative e non costituisce una consulenza in materia di investimenti. I CFD sono strumenti complessi e comportano un rischio elevato di perdere il capitale, in particolare durante gli annunci economici.",
      },
    ],
  },
  {
    key: "niveaux-ronds-or",
    slug: "numeri-tondi-oro",
    title: "Numeri tondi, supporti e resistenze sull'oro",
    description:
      "Come individuare i livelli che contano sull'oro: multipli di 50 e 100 dollari, vecchi massimi e minimi, zone invece di linee, e come posizionare stop e obiettivo.",
    date: "2026-11-12",
    body: [
      {
        p: "Sull'oro i livelli che contano sono i multipli di 50 e 100 dollari (2.400, 2.450, 2.500…), i vecchi massimi e minimi e le zone in cui il prezzo ha già reagito più volte. Vanno tracciati come zone larghe qualche dollaro, non come linee perfette.",
      },
      { h2: "Perché i numeri tondi contano" },
      {
        p: "I trader ragionano per numeri tondi. Molti piazzano obiettivi, ordini pendenti e stop su o vicino a 2.400, 2.450 o 2.500. Gli ordini si accumulano attorno a questi prezzi e il mercato lì esita, rimbalza o li attraversa a scatti. Non c'è nulla di magico: è un effetto di auto-realizzazione, che sull'oro resta osservabile perché il suo prezzo si esprime in cifre semplici.",
      },
      {
        p: "Le soglie da 100 $ sono le più marcate, quelle da 50 $ vengono dopo. I multipli di 10 $ possono servire da tappe intraday, ma pesano meno. Non cerchi un significato particolare in ogni numero tondo: un livello mai toccato né rispettato dal mercato non ha un'importanza speciale.",
      },
      { h2: "I vecchi massimi e minimi" },
      {
        p: "Il riferimento più affidabile resta ciò che il prezzo ha disegnato da solo. Un vecchio massimo diventa resistenza, un vecchio minimo supporto, e una volta rotti possono invertire il ruolo. Più un livello è stato testato e più lo storico è leggibile su un timeframe alto, più conta. Le basi sono in [supporti e resistenze](/blog/supporti-e-resistenze).",
      },
      {
        ul: [
          "**Massimo e minimo del giorno precedente**: riferimenti molto seguiti in intraday.",
          "**Massimo e minimo della sessione asiatica**: i confini del range prima dell'apertura di Londra ([orari migliori per fare trading sull'oro](/blog/orari-migliori-trading-oro)).",
          "**Massimo e minimo della settimana**: livelli di contesto.",
          "**Massimi storici**: quando il prezzo si avvicina, le reazioni sono spesso forti e rapide.",
        ],
      },
      { h2: "Zone, non linee" },
      {
        p: "Un livello viene raramente rispettato al dollaro. L'oro spesso buca di qualche dollaro prima di ripartire. Tracci quindi un rettangolo che comprenda le ombre, non un tratto sottile. Su un grafico a 1 ora una zona larga da 5 a 10 $ è comune. Ciò che osserva: dove le candele sono state respinte e come si chiudono ([le candele giapponesi](/blog/candele-giapponesi)).",
      },
      { h2: "Quando un numero tondo e un livello tecnico si sovrappongono" },
      {
        p: "Il caso più interessante è la confluenza: un numero tondo che coincide con un vecchio massimo o minimo. Più ragioni per reagire nello stesso punto rafforzano la zona. Se 2.450 coincide anche con il massimo della settimana scorsa, merita di essere seguito da vicino. Resta una probabilità, non una certezza.",
      },
      { h2: "Come usarli nel piano" },
      {
        ol: [
          "**Segni le zone** sull'1 ora: due o tre livelli sopra, due o tre sotto il prezzo.",
          "**Scelga lo scenario**: rimbalzo su un supporto, rottura di una resistenza con retest, oppure attesa.",
          "**Metta lo stop oltre la zona**, non dentro né esattamente sul numero tondo. Una zona a 2.450 può essere superata fino a 2.453 prima del ritorno: uno stop a 2.449,5 verrebbe colpito per niente ([dove mettere lo stop loss](/blog/dove-mettere-lo-stop-loss)).",
          "**Posizioni l'obiettivo poco prima del livello successivo**, non sopra: lì sono piazzati molti ordini di presa di profitto e il prezzo può invertire a pochi dollari.",
          "**Verifichi il rapporto rischio/rendimento** una volta fissati questi numeri ([rapporto rischio/rendimento](/blog/rapporto-rischio-rendimento)).",
        ],
      },
      { h2: "Gli errori frequenti" },
      {
        ul: [
          "**Tracciare troppi livelli**: il grafico diventa illeggibile. Tenga i più evidenti.",
          "**Entrare al primo tocco** senza segni di reazione. Attendere una candela di rifiuto o una chiusura oltre il livello riduce le false partenze.",
          "**Dimenticare il contesto**: un numero tondo pesa poco davanti a un dato americano importante ([oro, NFP e Fed](/blog/oro-nfp-fed)).",
          "**Mescolare i timeframe** senza sapere quale prevalga: il livello dell'1 ora vale più di quello dei 5 minuti.",
        ],
      },
      {
        p: "L'[analisi IA sull'oro](/gold) traccia i livelli sul Suo screenshot tenendo conto dei numeri tondi. Può confrontarli con le Sue zone: se la differenza è grande, si chieda perché prima di operare.",
      },
      {
        p: "Questa guida ha finalità esclusivamente educative e non costituisce una consulenza in materia di investimenti. Nessun livello ha la garanzia di essere rispettato. I CFD comportano un rischio elevato di perdere il capitale.",
      },
    ],
  },
  {
    key: "strategie-or-1h-15m-5m",
    slug: "routine-oro-1h-15m-5m",
    title: "Una routine intraday sull'oro: 1H, 15m, 5m",
    description:
      "Direzione su 1 ora, piano su 15 minuti, ingresso su 5 minuti: una routine di analisi multi-timeframe sull'oro, spiegata passo per passo, con i suoi limiti.",
    date: "2026-11-12",
    body: [
      {
        p: "Questa routine va dal quadro più ampio al più piccolo: legge la direzione sul grafico a 1 ora, costruisce il piano sul 15 minuti e cerca l'ingresso sul 5 minuti. Lo scopo è non operare un segnale a 5 minuti che va contro tutto ciò che mostra l'1 ora. Non è un metodo vincente garantito: è un quadro di lavoro.",
      },
      { h2: "Perché tre timeframe?" },
      {
        p: "Un solo grafico dà un'immagine parziale. Il 5 minuti è rumoroso sull'oro e può mostrare una rottura che è solo un movimento in più dentro un trend ribassista a 1 ora. L'1 ora dà il contesto ma non il punto d'ingresso preciso. Insieme rispondono a tre domande: dove va il mercato, dove sono i livelli, quando agire. Veda anche [quale timeframe scegliere](/blog/quale-timeframe-scegliere).",
      },
      { h2: "Passo 0: prima di aprire il grafico" },
      {
        ul: [
          "Consulti il calendario: dato americano alle 14:30? Decisione della Fed stasera? ([calendario economico](/blog/calendario-economico)).",
          "Decida la Sua fascia di trading ([orari migliori per fare trading sull'oro](/blog/orari-migliori-trading-oro)).",
          "Fissi il rischio massimo per trade e per giornata, per esempio 1% a operazione e al massimo tre perdite prima di fermarsi.",
        ],
      },
      { h2: "Passo 1: la direzione su 1 ora" },
      {
        p: "Guardi le ultime giornate. Massimi e minimi salgono, scendono o ristagnano in un range? Dove il prezzo ha già reagito più volte? Tracci due o tre zone sopra e sotto ([numeri tondi, supporti e resistenze sull'oro](/blog/numeri-tondi-oro)).",
      },
      {
        p: "Al termine di questo passo deve riuscire a scrivere una frase: «Trend rialzista, il prezzo è sotto la resistenza di 2.450, supporto a 2.400». Se non ci riesce, il mercato non è leggibile: rinunci. È una risposta valida.",
      },
      { h2: "Passo 2: il piano su 15 minuti" },
      {
        p: "Sul 15 minuti affini i livelli utili per la giornata e scelga uno scenario principale, con uno alternativo. Per esempio: «Se il prezzo chiude sopra 2.432, cerco l'acquisto con stop sotto 2.418 e obiettivo verso 2.450. Se 2.418 cede, abbandono l'idea». I numeri sono qui un esempio, non un consiglio.",
      },
      {
        ul: [
          "**Scriva le condizioni d'ingresso** prima che il prezzo arrivi.",
          "**Fissi lo stop** oltre la zona, non a ridosso ([dove mettere lo stop loss](/blog/dove-mettere-lo-stop-loss)).",
          "**Calcoli il rapporto rischio/rendimento**: sotto 1,5 o 2, l'idea merita di essere rimessa in discussione ([rapporto rischio/rendimento](/blog/rapporto-rischio-rendimento)).",
          "**Calcoli la dimensione del lotto** in base alla distanza dallo stop ([il calcolo del lotto sull'oro](/blog/lotto-oro-xau-usd)).",
        ],
      },
      { h2: "Passo 3: l'ingresso su 5 minuti" },
      {
        p: "Il 5 minuti serve a scegliere il momento, non la direzione. Attenda che la Sua condizione si verifichi: una chiusura sopra un livello, un retest che tiene, una candela di rifiuto su un supporto ([candele giapponesi](/blog/candele-giapponesi)). Se il prezzo si agita sotto la zona senza chiudere sopra, aspetta.",
      },
      {
        p: "Non entri nel mezzo di una candela che sta volando. Meglio perdere un trade che inseguire un prezzo già partito: lo stop diventa troppo lontano e il rapporto rischio/rendimento peggiora.",
      },
      { h2: "Passo 4: la gestione" },
      {
        ul: [
          "Una volta in posizione, non tocchi lo stop se non per avvicinarlo nel senso del trade, secondo regole decise in anticipo.",
          "Incassi una parte del guadagno a un livello logico se il Suo piano lo prevede.",
          "Chiuda prima di un annuncio importante se non ha previsto di attraversarlo ([oro, NFP e Fed](/blog/oro-nfp-fed)).",
          "Annoti il trade con uno screenshot, vincente o perdente: è la Sua materia prima per migliorare.",
        ],
      },
      { h2: "I limiti di questa routine" },
      {
        ul: [
          "**Non prevede nulla**: lo scenario principale spesso sbaglia, e lo stop serve a questo.",
          "**Richiede disciplina**: saltare un passo o spostare uno stop annulla il senso del metodo.",
          "**Vale solo se la mette alla prova**: su almeno alcune decine di trade in demo o con dimensioni ridotte, con un diario, prima di trarre conclusioni.",
          "**Si adatta male ai giorni di annunci**: la struttura abituale ne esce alterata.",
          "**I costi contano**: spread e swap riducono il risultato, soprattutto su obiettivi piccoli ([i rischi dei CFD](/blog/trading-oro-cfd-rischi)).",
        ],
      },
      {
        p: "È la logica seguita dall'[analisi specializzata sull'oro](/gold): uno screenshot per timeframe, dalla direzione all'ingresso, con la possibile conclusione «attendere». Può anche farla a mano e usare lo strumento per confrontarsi. Per screenshot ben leggibili, veda [come fare un buon screenshot del grafico](/blog/screenshot-del-grafico).",
      },
      {
        p: "Questa guida ha finalità esclusivamente educative e non costituisce una consulenza in materia di investimenti. I numeri citati sono esempi. I CFD sono strumenti complessi e comportano un rischio elevato di perdere il capitale.",
      },
    ],
  },
  {
    key: "analyser-l-or-avec-l-ia",
    slug: "analizzare-l-oro-con-l-ia",
    title: "Analizzare l'oro con l'IA: che cosa legge, che cosa non sa fare",
    description:
      "Che cosa può leggere un'IA su un grafico XAU/USD (trend, livelli, piano), che cosa non può fare (prevedere, vedere il tempo reale) e come usarla senza farsi ingannare.",
    date: "2026-11-12",
    body: [
      {
        p: "Un'IA può leggere lo screenshot di un grafico XAU/USD come farebbe un trader: individuare il trend, segnalare livelli, descrivere le candele e proporre un piano con ingresso, stop e obiettivi. Non può prevedere il prezzo, vede solo l'immagine che le fornisce e non sostituisce né il Suo giudizio né la Sua gestione del rischio.",
      },
      { h2: "Che cosa legge un'IA su un grafico dell'oro" },
      {
        ul: [
          "**Il trend e la struttura**: successione di massimi e minimi, range o rottura.",
          "**I livelli**: zone in cui il prezzo ha reagito, vecchi massimi e minimi, numeri tondi ([numeri tondi sull'oro](/blog/numeri-tondi-oro)).",
          "**Le candele e i pattern**: ombre di rifiuto, engulfing, pattern di continuazione ([candele giapponesi](/blog/candele-giapponesi), [pattern grafici](/blog/pattern-grafici)).",
          "**Gli indicatori visibili**: RSI, medie mobili, se compaiono nello screenshot ([RSI](/blog/indicatore-rsi)).",
          "**Un piano numerico**: ingresso, stop, obiettivi e il livello che invaliderebbe l'idea.",
        ],
      },
      {
        p: "Il vantaggio è soprattutto risparmiare tempo e ottenere una seconda lettura, argomentata, da confrontare con la Sua. Il principio generale è spiegato in [l'analisi tecnica con l'IA](/blog/analisi-tecnica-ia).",
      },
      { h2: "Che cosa un'IA non sa fare" },
      {
        ul: [
          "**Prevedere**: pesa degli scenari. Lo scenario principale può sbagliare, e una percentuale mostrata non è una probabilità statistica garantita.",
          "**Vedere il tempo reale**: conosce solo il Suo screenshot. Se il prezzo si è mosso nel frattempo, la lettura è superata.",
          "**Leggere un'immagine illeggibile**: asse dei prezzi tagliato, grafico sovraccarico o screenshot sfocato peggiorano la risposta ([fare bene lo screenshot](/blog/screenshot-del-grafico)).",
          "**Conoscere la Sua situazione**: capitale, tolleranza al rischio, costi, broker. Non piazza ordini, non gestisce il Suo denaro.",
          "**Sostituire la disciplina**: una buona lettura seguita da una posizione eccessiva resta una cattiva idea.",
        ],
      },
      { h2: "Perché l'oro richiede impostazioni dedicate" },
      {
        p: "L'oro non è un'azione né una coppia di valute come le altre. È molto mosso, reagisce con forza ai dati americani e i numeri tondi vi giocano un ruolo visibile. Una lettura generica può mettere uno stop troppo vicino o ignorare che sta arrivando un annuncio. Da qui l'utilità di un'analisi tarata sull'oro ([come fare trading sull'oro](/blog/come-fare-trading-sull-oro)).",
      },
      { h2: "L'analisi sull'oro di Scanzivo" },
      {
        p: "Scanzivo propone un'[analisi specializzata sull'oro](/gold). Invia lo screenshot del Suo grafico XAU/USD, su qualsiasi piattaforma (TradingView, MetaTrader, cTrader o app del broker). L'analisi segue indicazioni specifiche per l'oro: numeri tondi, sessioni, dati americani, stop posti oltre le ombre recenti. Il modello di IA è lo stesso che per gli altri asset. La routine di analisi in tre screenshot è descritta in [la routine 1H, 15m, 5m](/blog/routine-oro-1h-15m-5m).",
      },
      {
        p: "Ciò che il servizio non fa: non prevede il prezzo, non piazza ordini, non invia segnali e non fornisce consulenza personalizzata in materia di investimenti.",
      },
      { h2: "Come usarla con intelligenza" },
      {
        ol: [
          "**Faccia prima la Sua lettura**, in poche righe: direzione, livelli, scenario.",
          "**Poi invii lo screenshot** e confronti. Un accordo non prova nulla, un disaccordo La invita a guardare meglio.",
          "**Verifichi i livelli sul Suo grafico**: l'IA può posizionare male una linea. L'ultimo revisore è Lei.",
          "**Controlli il calendario**: un annuncio vicino cambia tutto ([oro, NFP e Fed](/blog/oro-nfp-fed)).",
          "**Calcoli da solo la dimensione** con i Suoi dati ([il calcolo del lotto sull'oro](/blog/lotto-oro-xau-usd)).",
          "**Tenga un diario** per vedere nel tempo se la lettura Le serve o no.",
        ],
      },
      {
        tip: "Se l'analisi conclude che conviene attendere, è un'informazione utile. Uno strumento che trova sempre un trade da fare dovrebbe preoccuparLa.",
      },
      { h2: "Le cattive ragioni per usare un'IA" },
      {
        ul: [
          "Per non dover più imparare a leggere un grafico.",
          "Per trovare un trade a tutti i costi quando il mercato non offre nulla.",
          "Per giustificare una posizione già presa.",
          "Perché una fonte promette risultati regolari: diffidi ([truffe dei bot di trading](/blog/bot-di-trading-ia-truffe)).",
        ],
      },
      {
        p: "Usata come aiuto alla riflessione, l'IA può accelerare la Sua routine e farLe vedere ciò che aveva trascurato. Usata come una sfera di cristallo, Le farà perdere denaro.",
      },
      {
        p: "Questa guida ha finalità esclusivamente educative e non costituisce una consulenza in materia di investimenti. L'analisi con l'IA non garantisce alcun risultato. I CFD sono strumenti complessi e comportano un rischio elevato di perdere il capitale.",
      },
    ],
  },
];
