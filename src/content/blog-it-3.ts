import type { Article } from "./blog";

/** Italian technical guides; `key` is the French slug. Examples use euros and Italian time. */
export const ARTICLES_IT_3: Omit<Article, "locale">[] = [
  {
    key: "macd-indicateur",
    slug: "indicatore-macd",
    title: "Indicatore MACD: come leggerlo, incroci e divergenze",
    description:
      "Le due linee, l'istogramma, gli incroci e le divergenze del MACD, con un esempio numerico e i limiti da conoscere prima di fidarsi.",
    date: "2026-11-19",
    body: [
      {
        p: "Il MACD (Moving Average Convergence Divergence) misura la distanza tra due medie mobili esponenziali per mostrare se lo slancio di un mercato accelera o si affievolisce. Non prevede nulla: riassume la velocità del trend in corso. Usato da solo, genera molti falsi segnali.",
      },
      { h2: "Come è costruito il MACD?" },
      {
        p: "Con le impostazioni classiche (12, 26, 9), l'indicatore poggia su tre elementi, mostrati sotto il grafico dei prezzi.",
      },
      {
        ul: [
          "**La linea MACD**: media mobile esponenziale a 12 periodi meno quella a 26 periodi. Quando è positiva, la media breve sta sopra la lunga.",
          "**La linea di segnale**: media mobile esponenziale a 9 periodi della linea MACD. Reagisce più lentamente.",
          "**L'istogramma**: la differenza tra la linea MACD e la linea di segnale. Sta sopra lo zero quando il MACD è sopra il proprio segnale, sotto nel caso opposto.",
        ],
      },
      {
        p: "Queste impostazioni risalgono a quando si negoziava sei giorni a settimana. Nessuno Le impone di tenerle, ma sono quelle che la maggior parte dei trader guarda, quindi sono quelle che contano di più.",
      },
      { h2: "Che cosa significa un incrocio del MACD?" },
      {
        p: "Quando la linea MACD supera la linea di segnale verso l'alto, lo slancio rialzista prende il sopravvento: è un incrocio rialzista. Quando la supera verso il basso, è un incrocio ribassista. Sull'istogramma corrisponde al momento in cui le barre attraversano lo zero.",
      },
      {
        p: "Anche il passaggio della linea MACD sopra o sotto lo zero è un riferimento. Sopra lo zero, la media breve è sopra la lunga: il mercato tende al rialzo. Sotto, tende al ribasso.",
      },
      {
        p: "**Esempio (illustrativo):** un asset sale da tre settimane e la linea MACD è positiva. Il prezzo si ferma, l'istogramma si riduce, poi la linea MACD reincrocia il segnale verso il basso. Questo non dice che il rialzo è finito. Dice che lo slancio si è indebolito. Sta a Lei verificare se il prezzo tiene un supporto prima di trarre conclusioni.",
      },
      { h2: "Come si legge l'istogramma?" },
      {
        p: "Contano le barre, non solo il colore. Barre positive che crescono mostrano un rialzo che prende velocità. Barre positive che si accorciano mostrano un rialzo che rallenta, anche se il prezzo sale ancora. L'istogramma anticipa spesso l'incrocio di qualche candela.",
      },
      { h2: "Che cos'è una divergenza MACD?" },
      {
        p: "C'è divergenza quando prezzo e indicatore raccontano due storie diverse.",
      },
      {
        ul: [
          "**Divergenza ribassista**: il prezzo segna un nuovo massimo, ma il MACD forma un massimo più basso. Il rialzo procede con meno slancio.",
          "**Divergenza rialzista**: il prezzo segna un nuovo minimo, ma il MACD forma un minimo più alto. Il ribasso si esaurisce.",
        ],
      },
      {
        p: "È un segnale d'allerta, non un segnale d'ingresso. Una divergenza può durare molto a lungo mentre il prezzo continua nella stessa direzione. Molti trader aspettano che la rottura di una struttura o una candela di inversione la confermi. Per queste candele, veda le [candele giapponesi](/blog/candele-giapponesi).",
      },
      { h2: "Quali sono i limiti del MACD?" },
      {
        ul: [
          "**È in ritardo.** È calcolato da medie mobili, quindi da prezzi passati. L'incrocio arriva spesso dopo l'inizio del movimento.",
          "**Sbaglia in range.** Quando il prezzo oscilla senza direzione, le linee si incrociano di continuo e producono una serie di falsi segnali. Per capire dove si trova, legga [trend o range](/blog/trend-o-range).",
          "**Non dà né livelli né stop.** Non dice dove entrare, dove uscire né dove mettere la protezione. Serve un grafico con [supporti e resistenze](/blog/supporti-e-resistenze).",
          "**Dipende dal timeframe.** Un incrocio rialzista sui 5 minuti può convivere con un trend ribassista sulle 4 ore. Veda come [scegliere il timeframe](/blog/quale-timeframe-scegliere).",
        ],
      },
      { h2: "Come abbinare il MACD ad altri strumenti?" },
      {
        p: "Il MACD misura lo slancio, l'[RSI](/blog/indicatore-rsi) misura l'eccesso, le [medie mobili](/blog/medie-mobili) danno la direzione. Nessuno sostituisce la lettura del prezzo stesso. Una routine semplice: individui la struttura (trend, supporti, resistenze), poi guardi se il MACD conferma o contraddice ciò che vede. Se contraddice, non è un ordine di restare fermo, è un motivo per ridurre la dimensione o aspettare. Per la dimensione, veda la [dimensione della posizione](/blog/dimensione-della-posizione).",
      },
      { tip: "Se è agli inizi, aggiunga un solo indicatore alla volta. Lo osservi su venti grafici passati prima di dargli peso in una decisione." },
      {
        p: "Il MACD vale anche sull'oro, dove lo slancio cambia in fretta attorno agli annunci americani: la nostra [pagina sull'analisi dell'oro (XAU/USD)](/gold) mostra come la lettura venga ripresa in un piano.",
      },
      { h2: "E se vuole una lettura rapida del Suo grafico?" },
      {
        p: "[Scanzivo](/) legge lo screenshot di un grafico, con o senza indicatori visibili, e propone livelli e un piano numerato. Può confrontare ciò che dice sul MACD con ciò che vede Lei stesso: è un buon modo per allenarsi.",
      },
      {
        p: "Questo contenuto ha scopo didattico e non costituisce consulenza in materia di investimenti. Il trading comporta un rischio di perdita del capitale, fino alla totalità delle somme impegnate.",
      },
    ],
  },
  {
    key: "moyennes-mobiles",
    slug: "medie-mobili",
    title: "Medie mobili: MM20, MM50, MM200, incroci e limiti",
    description:
      "Che cosa calcola una media mobile, la differenza tra SMA ed EMA, il ruolo di MM20, MM50 e MM200 e perché gli incroci ingannano in range.",
    date: "2026-11-19",
    body: [
      {
        p: "Una media mobile leviga i prezzi di chiusura su un dato periodo per far emergere la direzione. Non prevede nulla: descrive ciò che è accaduto. Il suo punto di forza è rendere leggibile un trend, il suo punto debole è arrivare in ritardo.",
      },
      { h2: "Come funziona una media mobile?" },
      {
        p: "Una media mobile a 20 periodi somma le ultime 20 chiusure e divide per 20. A ogni nuova candela, la più vecchia esce dal calcolo e quella nuova entra: la linea «si sposta». Su un grafico a 1 ora, la MM20 copre le ultime 20 ore. Su un grafico giornaliero, gli ultimi 20 giorni.",
      },
      { h2: "Che differenza c'è tra SMA ed EMA?" },
      {
        ul: [
          "**SMA (semplice)**: tutte le chiusure pesano allo stesso modo. La linea è regolare ma reagisce tardi.",
          "**EMA (esponenziale)**: le chiusure recenti pesano di più. La linea segue più da vicino il prezzo e reagisce prima, al costo di più false partenze.",
        ],
      },
      {
        p: "Nessuna delle due è migliore in assoluto. Sullo stesso grafico, lo scarto tra le due è spesso modesto. La cosa importante è restare coerenti: non cambi tipo di media a ogni trade per far quadrare la storia.",
      },
      { h2: "A che cosa servono MM20, MM50 e MM200?" },
      {
        p: "Sono i periodi più seguiti, quindi quelli su cui molti operatori guardano nello stesso momento.",
      },
      {
        ul: [
          "**MM20**: il breve termine. In un trend sano, il prezzo se ne allontana e spesso torna a toccarla.",
          "**MM50**: il medio termine. Spesso usata come zona di ritracciamento in un trend consolidato.",
          "**MM200**: il lungo termine. Un prezzo sopra viene in genere letto come un mercato rialzista di fondo, sotto come ribassista. Sul giornaliero è la più osservata.",
        ],
      },
      {
        p: "**Esempio (illustrativo):** un asset sta sopra le sue MM20, MM50 e MM200, e le tre sono rivolte verso l'alto e in quest'ordine. Il prezzo arretra verso la MM50 e vi segna una candela di rifiuto. Molti trader vi vedono una zona d'interesse. Non è una garanzia: se la chiusura scende nettamente sotto la MM50, lo scenario va rivisto.",
      },
      { h2: "Che cos'è un incrocio di medie mobili?" },
      {
        p: "Quando una media breve supera una media lunga verso l'alto, è un incrocio rialzista. L'opposto è un incrocio ribassista. Il più noto sui mercati azionari è quello tra MM50 e MM200: si parla di «golden cross» quando la MM50 passa sopra, di «death cross» quando passa sotto.",
      },
      {
        p: "Questi nomi sono spettacolari, non magici. L'incrocio avviene molto dopo l'inizio del movimento, perché entrambe le medie riflettono prezzi passati. Spesso conferma un trend che ha già percorso buona parte della sua strada.",
      },
      { h2: "Quali sono i limiti delle medie mobili?" },
      {
        ul: [
          "**Il ritardo.** Più il periodo è lungo, più tardi arriva il segnale.",
          "**Il range.** Quando il prezzo si muove senza direzione, attraversa la media in entrambi i sensi e ogni attraversamento sembra un segnale. È lì che costano di più. Veda [trend o range](/blog/trend-o-range).",
          "**Nessun livello preciso.** La media è una zona, non una linea esatta. Uno stop messo esattamente sopra o sotto viene spesso colpito.",
          "**L'effetto ottimizzazione.** Col senno di poi si trova sempre il periodo che avrebbe funzionato. Questo non dice nulla sul seguito.",
        ],
      },
      { h2: "Come usarle senza cadere in trappola?" },
      {
        ol: [
          "**Individui il trend** su un timeframe superiore (veda [quale timeframe scegliere](/blog/quale-timeframe-scegliere)).",
          "**Guardi la pendenza.** Una media piatta segnala un mercato senza trend: i segnali perdono valore.",
          "**Cerchi la confluenza**: una MM50 che coincide con un supporto orizzontale ha più peso di una MM50 isolata. Veda [supporti e resistenze](/blog/supporti-e-resistenze).",
          "**Definisca l'invalidazione**: il punto in cui la Sua idea è sbagliata, con uno stop (veda [dove mettere lo stop loss](/blog/dove-mettere-lo-stop-loss)).",
        ],
      },
      {
        p: "Le medie mobili si combinano bene con il [MACD](/blog/indicatore-macd), che è a sua volta fatto di medie mobili, e con le [bande di Bollinger](/blog/bande-di-bollinger), la cui linea centrale è una MM20. Sull'oro, MM50 e MM200 sul giornaliero sono molto seguite: ne parliamo nella nostra [pagina sull'analisi dell'oro (XAU/USD)](/gold).",
      },
      { tip: "Per sapere se la MM200 conta sul Suo asset, guardi se il prezzo ha già reagito su di essa in passato. Altrimenti è solo una linea in più." },
      {
        p: "Se vuole un secondo parere su un grafico pieno di linee, [Scanzivo](/) legge il Suo screenshot e separa ciò che conta (livelli, trend) da ciò che ingombra, poi propone un piano numerato che Lei può contestare.",
      },
      {
        p: "Questo contenuto ha scopo didattico e non costituisce consulenza in materia di investimenti. Il trading comporta un rischio di perdita del capitale, fino alla totalità delle somme impegnate.",
      },
    ],
  },
  {
    key: "bandes-de-bollinger",
    slug: "bande-di-bollinger",
    title: "Bande di Bollinger: che cosa misurano",
    description:
      "Costruzione delle bande, lettura dell'ampiezza, squeeze e perché toccare una banda non è né un segnale di acquisto né di vendita.",
    date: "2026-11-19",
    body: [
      {
        p: "Le bande di Bollinger avvolgono il prezzo con due inviluppi che si allargano quando la volatilità sale e si stringono quando scende. Misurano la dispersione del prezzo attorno alla sua media. Non dicono dove andrà il mercato, e toccare una banda non è un segnale di inversione.",
      },
      { h2: "Come sono costruite le bande di Bollinger?" },
      {
        p: "L'impostazione classica è (20, 2) e dà tre linee.",
      },
      {
        ul: [
          "**La banda centrale**: una media mobile semplice a 20 periodi (veda [medie mobili](/blog/medie-mobili)).",
          "**La banda superiore**: la centrale più 2 deviazioni standard delle ultime 20 chiusure.",
          "**La banda inferiore**: la centrale meno 2 deviazioni standard.",
        ],
      },
      {
        p: "La deviazione standard misura quanto i prezzi si allontanano dalla loro media. Più le candele sono grandi e agitate, più è alta e più le bande si allargano. Con 2 deviazioni standard, il prezzo sta per lo più tra le due bande, ma non sempre: ne esce regolarmente, ed è proprio questa la trappola.",
      },
      { h2: "Che cosa dice l'ampiezza delle bande?" },
      {
        p: "L'ampiezza conta più della posizione del prezzo. Bande larghe indicano una volatilità alta, per esempio dopo un annuncio o un forte trend. Bande strette indicano un mercato calmo. La volatilità si alterna: dopo un periodo calmo arriva spesso un periodo agitato, e viceversa. È l'idea più utile dello strumento.",
      },
      { h2: "Che cos'è uno squeeze di Bollinger?" },
      {
        p: "Lo squeeze è un restringimento delle bande a un livello basso rispetto alle ultime settimane. Segnala che la volatilità è debole e che potrebbe arrivare un'espansione. Non dice nulla sulla direzione.",
      },
      {
        p: "**Esempio (illustrativo):** su un grafico a 1 ora, il prezzo si muove per due giorni in un corridoio stretto e le bande si avvicinano. Poi una candela ampia chiude sopra la banda superiore, le bande si aprono, il volume sale. Può essere l'inizio di un movimento, oppure una falsa uscita che rientra nel corridoio. Per questo conviene leggere il [falso breakout](/blog/falso-breakout) prima di agire su questo tipo di segnale.",
      },
      { h2: "Toccare la banda superiore è un segnale di vendita?" },
      {
        p: "No. È l'errore più diffuso. In un trend forte, il prezzo può costeggiare la banda superiore per molte candele: si dice che «cammina sulla banda». Vendere a ogni contatto significherebbe mettersi ripetutamente contro il trend.",
      },
      {
        p: "In un mercato senza direzione, invece, le bande funzionano bene come riferimenti: il prezzo rimbalza spesso verso la centrale dopo aver toccato un estremo. Tutto dipende dal contesto, da cui la necessità di sapere se è in trend o in range (veda [trend o range](/blog/trend-o-range)).",
      },
      { h2: "Quali errori evitare con le bande di Bollinger?" },
      {
        ul: [
          "**Leggerle come supporti e resistenze.** Si muovono a ogni candela. Un vero livello è orizzontale ed è già stato testato; veda [supporti e resistenze](/blog/supporti-e-resistenze).",
          "**Ignorare il trend.** Le stesse bande danno letture opposte a seconda del contesto.",
          "**Agire su uno squeeze senza attendere conferme.** La direzione dell'uscita è sconosciuta. Alcuni trader aspettano una chiusura fuori dalle bande accompagnata da un volume più forte (veda [il volume nel trading](/blog/volume-nel-trading)).",
          "**Dimenticare il timeframe.** Uno squeeze sui 5 minuti non ha la stessa portata che sul giornaliero. Veda [quale timeframe scegliere](/blog/quale-timeframe-scegliere).",
          "**Accumulare indicatori della stessa natura.** Bande, RSI e MACD derivano tutti dagli stessi prezzi: tre conferme non valgono tre prove.",
        ],
      },
      { h2: "Come combinarle con altri riferimenti?" },
      {
        p: "Un uso ragionevole: individui prima la struttura (trend, livelli), poi si serva delle bande per giudicare lo stato della volatilità. Un'uscita da un range preceduta da un restringimento è più interessante di un'uscita in piena agitazione. L'[RSI](/blog/indicatore-rsi) può aiutare a vedere se il movimento è già molto esteso. E la gestione del rischio resta indipendente: la dimensione si calcola dallo stop, non dalle bande (veda [la dimensione della posizione](/blog/dimensione-della-posizione)).",
      },
      { tip: "Quando le bande sono molto larghe dopo un grande movimento, non usi la banda opposta come obiettivo. Può essere lontanissima o già in avvicinamento." },
      {
        p: "Sull'oro le bande si restringono spesso nelle ore calme prima dell'apertura di Londra (le 9:00 in Italia) e si allargano con i dati americani delle 14:30: ne trova il contesto nella nostra [pagina sull'analisi dell'oro (XAU/USD)](/gold).",
      },
      {
        p: "Sul Suo grafico, [Scanzivo](/) può leggere lo screenshot con le Sue bande visibili e ricavarne livelli e un piano numerato, che Lei confronta poi con la Sua lettura del contesto.",
      },
      {
        p: "Questo contenuto ha scopo didattico e non costituisce consulenza in materia di investimenti. Il trading comporta un rischio di perdita del capitale, fino alla totalità delle somme impegnate.",
      },
    ],
  },
  {
    key: "retracement-de-fibonacci",
    slug: "ritracciamento-di-fibonacci",
    title: "Ritracciamento di Fibonacci: livelli e come tracciarlo",
    description:
      "Come tracciare i livelli di Fibonacci passo per passo, che cosa significano 38,2 / 50 / 61,8% e perché vanno trattati come zone, non come certezze.",
    date: "2026-11-19",
    body: [
      {
        p: "Il ritracciamento di Fibonacci pone dei livelli (38,2%, 50%, 61,8%) tra l'inizio e la fine di un movimento per individuare dove un ritracciamento potrebbe fermarsi. Sono zone d'attenzione, non garanzie: molti trader li guardano, il che dà loro talvolta peso, ma il prezzo li attraversa anche spesso.",
      },
      { h2: "Da dove vengono queste percentuali?" },
      {
        p: "Derivano dalla successione di Fibonacci, in cui ogni numero è la somma dei due precedenti. Il rapporto tra un numero e il successivo tende a 61,8%, e a 38,2% con quello dopo ancora. Il 50% non è un rapporto di Fibonacci in senso stretto: viene aggiunto perché molti movimenti tornano a metà strada. Nessuna legge di mercato obbliga il prezzo a rispettare questi rapporti. La loro utilità è pratica: danno riferimenti oggettivi e condivisi.",
      },
      { h2: "Come si traccia un ritracciamento di Fibonacci?" },
      {
        ol: [
          "**Individui un movimento netto**: una gamba chiara tra un minimo e un massimo (o l'inverso), senza confusione.",
          "**Scelga i due punti**: la partenza e l'arrivo del movimento. Per un rialzo, dal minimo al massimo. Per un ribasso, dal massimo al minimo. Usi le ombre o le chiusure, ma resti coerente.",
          "**Tracci lo strumento** nella Sua piattaforma: i livelli compaiono tra i due punti.",
          "**Osservi la reazione del prezzo** quando torna verso il 38,2%, il 50% o il 61,8%.",
        ],
      },
      {
        p: "**Esempio (illustrativo):** un asset sale da 100 € a 120 €. Il movimento è di 20 €. Il livello 38,2% si trova a 120 − 7,64 = 112,36 €. Il 50% a 110 €. Il 61,8% a 120 − 12,36 = 107,64 €. Se il prezzo scende, si guarda che cosa fa attorno a queste zone, per esempio una candela di rifiuto o una rottura netta.",
      },
      { h2: "Che cosa significa ogni livello?" },
      {
        ul: [
          "**38,2%**: un ritracciamento debole. In un trend forte, il prezzo riparte spesso da lì.",
          "**50%**: un ritracciamento medio, spesso considerato il limite di una correzione «sana».",
          "**61,8%**: un ritracciamento profondo. Oltre, l'idea di semplice pausa viene messa in dubbio; aumenta il rischio di un'inversione.",
        ],
      },
      {
        p: "Un ritracciamento che supera il 78,6% o torna all'origine del movimento invalida quasi sempre lo scenario. È ciò che dà allo strumento un'utilità concreta: aiuta a fissare una soglia oltre la quale l'idea diventa sbagliata.",
      },
      { h2: "Quali sono i limiti di Fibonacci?" },
      {
        p: "Siamo diretti: i ritracciamenti hanno limiti seri.",
      },
      {
        ul: [
          "**La scelta dei punti è soggettiva.** Due trader tracciano due griglie diverse sullo stesso grafico, e ciascuno trova reazioni.",
          "**I livelli sono troppi.** Con più griglie, quasi ogni prezzo finisce vicino a un livello. Si vede ciò che ha funzionato e si dimentica il resto.",
          "**Il prezzo attraversa spesso i livelli** senza fermarsi.",
          "**Nessun vantaggio statistico è garantito.** Tratti lo strumento come un riferimento visivo, non come un metodo collaudato.",
        ],
      },
      { h2: "Come dargli più peso?" },
      {
        p: "Cercando la confluenza: un livello di Fibonacci che cade su un [supporto o una resistenza](/blog/supporti-e-resistenze) già testati, su una [media mobile](/blog/medie-mobili) importante o su un numero tondo merita più attenzione di un livello isolato. Una candela di rifiuto in quel punto (veda [candele giapponesi](/blog/candele-giapponesi)) aggiunge una conferma. Senza, meglio aspettare.",
      },
      {
        p: "Sul fronte del rischio, il ritracciamento aiuta a collocare lo stop: sotto il livello successivo o sotto l'origine del movimento. Veda [dove mettere lo stop loss](/blog/dove-mettere-lo-stop-loss), poi verifichi il [rapporto rischio/rendimento](/blog/rapporto-rischio-rendimento): l'obiettivo naturale è il massimo precedente, il che dà un rapporto misurabile prima di entrare. Un ritracciamento verso il 61,8% con uno stop appena sotto offre in genere un rapporto migliore di un ingresso al 38,2%, ma con meno probabilità che il prezzo raggiunga quel livello.",
      },
      { tip: "Tracci sempre la griglia sulla gamba più evidente, quella che tutti vedono. Una griglia che disegna solo Lei non ha alcun motivo di essere seguita dal mercato." },
      {
        p: "Lo stesso metodo vale per l'oro, dove i ritracciamenti si incrociano spesso con i numeri tondi: veda la nostra [pagina sull'analisi dell'oro (XAU/USD)](/gold).",
      },
      {
        p: "Per confrontare il Suo tracciato con un altro sguardo, [Scanzivo](/) legge uno screenshot del Suo grafico e propone livelli di ingresso, stop e obiettivo in un piano numerato, che può confrontare con la Sua griglia.",
      },
      {
        p: "Questo contenuto ha scopo didattico e non costituisce consulenza in materia di investimenti. Il trading comporta un rischio di perdita del capitale, fino alla totalità delle somme impegnate.",
      },
    ],
  },
  {
    key: "fausse-cassure",
    slug: "falso-breakout",
    title: "Falso breakout: come riconoscerlo ed evitare la trappola",
    description:
      "Perché il prezzo buca un livello e poi rientra, i segnali che devono metterLa in guardia e tre abitudini per limitare i danni senza pretendere di evitare tutto.",
    date: "2026-11-19",
    body: [
      {
        p: "Un falso breakout è un'uscita da un supporto, da una resistenza o da un range che non regge: il prezzo supera il livello, attira ingressi, poi rientra nella zona. Non si evitano tutti. Si impara a riconoscerli prima e a limitare quanto costano.",
      },
      { h2: "Che cos'è un falso breakout?" },
      {
        p: "Un livello chiaro concentra ordini: stop subito dietro, ordini d'ingresso dei trader di breakout. Quando il prezzo supera quel livello, questi ordini scattano. Se dietro il movimento non c'è abbastanza domanda reale, il prezzo si esaurisce e torna indietro. Chi è entrato sulla rottura resta intrappolato, e i suoi stop alimentano il movimento opposto.",
      },
      {
        p: "**Esempio (illustrativo):** una resistenza a 50 € è stata testata tre volte. Una candela sfonda a 50,40 €, poi il prezzo ridiscende e chiude a 49,60 €. I compratori del breakout sono in perdita. Il livello 50 non è stato rotto: è stato «spazzato».",
      },
      { h2: "Quali segnali devono metterLa in guardia?" },
      {
        ul: [
          "**Un'ombra, non un corpo.** Il prezzo supera il livello con un'ombra lunga, ma la candela chiude sotto. La chiusura conta più del massimo.",
          "**Un volume che non segue.** Un breakout senza volume superiore al normale manca di convinzione (veda [il volume nel trading](/blog/volume-nel-trading), con i suoi limiti).",
          "**Un contesto contrario.** La rottura va contro il trend del timeframe superiore.",
          "**Un momento fragile.** Apertura, annuncio economico, fine settimana: la liquidità è più sottile, i movimenti più nervosi (veda [il calendario economico](/blog/calendario-economico)).",
          "**Una candela di inversione subito dopo**, come un'engulfing o una stella della sera. Veda le [candele giapponesi](/blog/candele-giapponesi).",
        ],
      },
      { h2: "Come evitare di cadere nella trappola?" },
      { h3: "Aspettare una chiusura" },
      {
        p: "Invece di entrare appena il livello viene toccato, aspetti la chiusura della candela oltre il livello, sul timeframe che segue. Perde un po' di prezzo. Evita molte ombre.",
      },
      { h3: "Aspettare il retest" },
      {
        p: "Una rottura franca torna spesso a testare il livello, che diventa allora un supporto (ex resistenza) o una resistenza (ex supporto). Se il prezzo tiene sul retest, l'ingresso è meglio collocato e lo stop più vicino. Il rischio è perdere il movimento se non torna: è il prezzo della prudenza.",
      },
      { h3: "Mettere lo stop dal lato giusto" },
      {
        p: "Uno stop appena sotto il livello rotto viene spesso colpito da un'ombra. Uno stop sotto l'ultimo minimo significativo, o sotto la zona, lascia margine. Implica una posizione più piccola: è il calcolo descritto in [dimensione della posizione](/blog/dimensione-della-posizione) e [dove mettere lo stop loss](/blog/dove-mettere-lo-stop-loss).",
      },
      { h2: "Si può approfittare di un falso breakout?" },
      {
        p: "Alcuni trader lo trattano come un segnale in sé: il prezzo rientra sotto la resistenza, vendono con uno stop sopra l'ombra. L'idea è logica, perché lo stop è preciso e vicino, il che dà un buon [rapporto rischio/rendimento](/blog/rapporto-rischio-rendimento). Ma resta una scommessa: un secondo tentativo di rottura può riuscire dove il primo è fallito.",
      },
      { h2: "Quali errori frequenti peggiorano la situazione?" },
      {
        ul: [
          "**Inseguire il prezzo**: entrare tardi su una candela già estesa.",
          "**Aumentare la dimensione per «rifarsi»** dopo una trappola.",
          "**Spostare lo stop** quando il prezzo torna contro di Lei.",
          "**Confondere range e trend**: in range, la maggior parte delle rotture fallisce (veda [trend o range](/blog/trend-o-range)).",
          "**Ignorare il contesto**: rottura sui 5 minuti contro un trend forte sulle 4 ore.",
        ],
      },
      { tip: "Annoti le Sue ultime dieci rotture, con esito e contesto. Vedrà presto se i fallimenti dipendono da un momento, da un tipo di livello o dalla Sua impazienza." },
      {
        p: "Sull'oro i falsi breakout sono frequenti attorno ai numeri tondi e agli annunci americani delle 14:30: ne parliamo nella nostra [pagina sull'analisi dell'oro (XAU/USD)](/gold).",
      },
      {
        p: "Prima di decidere, può essere utile far rileggere il Suo grafico: [Scanzivo](/) analizza uno screenshot, individua i possibili livelli di rottura e propone un piano numerato con invalidazione, che Lei tiene o scarta.",
      },
      {
        p: "Questo contenuto ha scopo didattico e non costituisce consulenza in materia di investimenti. Il trading comporta un rischio di perdita del capitale, fino alla totalità delle somme impegnate.",
      },
    ],
  },
  {
    key: "tendance-et-range",
    slug: "trend-o-range",
    title: "Trend o range: come riconoscerli",
    description:
      "Massimi e minimi, pendenza delle medie, assenza di direzione: i riferimenti per distinguere un mercato in trend da uno in range e che cosa cambia.",
    date: "2026-11-19",
    body: [
      {
        p: "Un mercato è in trend quando concatena massimi e minimi sempre più alti (o sempre più bassi). È in range quando oscilla tra un tetto e un pavimento senza progredire. Riconoscere quale dei due ha davanti è la prima domanda da porsi, perché la maggior parte degli strumenti funziona nell'uno e fallisce nell'altro.",
      },
      { h2: "Come riconoscere un trend rialzista o ribassista?" },
      {
        p: "Il riferimento più semplice è la struttura.",
      },
      {
        ul: [
          "**Trend rialzista**: ogni massimo supera il precedente, ogni minimo è più alto del precedente.",
          "**Trend ribassista**: ogni massimo e ogni minimo sono più bassi dei precedenti.",
        ],
      },
      {
        p: "Si può aggiungere la pendenza delle [medie mobili](/blog/medie-mobili): una MM50 nettamente inclinata, con un prezzo che resta dallo stesso lato, conferma la direzione. Ma la struttura viene prima: una media è una conseguenza del prezzo, non una causa.",
      },
      {
        p: "**Esempio (illustrativo):** minimo a 100 €, massimo a 110 €, ritracciamento a 104 €, nuovo massimo a 116 €, ritracciamento a 108 €. I minimi (100, 104, 108) e i massimi (110, 116) salgono: trend rialzista. Se il prossimo ritracciamento scende sotto 108 €, la struttura è rotta e la lettura cambia.",
      },
      { h2: "Come riconoscere un range?" },
      {
        ul: [
          "Il prezzo rimbalza almeno due volte sullo stesso pavimento e sullo stesso tetto.",
          "Le medie mobili sono piatte e il prezzo le attraversa nei due sensi.",
          "Massimi e minimi non progrediscono.",
          "Le candele sono spesso piccole, con ombre su entrambi i lati.",
        ],
      },
      {
        p: "Il tetto e il pavimento sono i Suoi [supporti e resistenze](/blog/supporti-e-resistenze). L'ampiezza del range determina il potenziale che resta: un range stretto lascia poco spazio per un buon [rapporto rischio/rendimento](/blog/rapporto-rischio-rendimento) dopo i costi.",
      },
      { h2: "Come adattare la lettura al mercato?" },
      { h3: "In trend" },
      {
        p: "I ritracciamenti verso una media o un supporto sono zone d'interesse nel senso del trend. Gli [indicatori di slancio](/blog/indicatore-macd) danno segnali utili, e i ritracciamenti ([Fibonacci](/blog/ritracciamento-di-fibonacci)) aiutano a collocare la profondità del ritracciamento. Il rischio principale: operare contro il trend perché il prezzo «è troppo alto».",
      },
      { h3: "In range" },
      {
        p: "Gli estremi sono le zone d'interesse, il centro è una zona senza vantaggio. Un [RSI](/blog/indicatore-rsi) che tocca gli estremi è più utile qui che in un trend forte. Il rischio principale: farsi sorprendere dall'uscita, che può essere un [falso breakout](/blog/falso-breakout) o uno vero.",
      },
      { h2: "E quando il mercato passa dall'uno all'altro?" },
      {
        p: "È il momento più difficile. Un trend finisce spesso con un range (il mercato si ferma), e un range finisce con un trend (il mercato sceglie un campo). Alcuni segnali di transizione: la rottura della struttura (un minimo che scende sotto il precedente in un rialzo), un restringimento della volatilità (veda [bande di Bollinger](/blog/bande-di-bollinger)) o un volume che cambia comportamento (veda [il volume nel trading](/blog/volume-nel-trading)).",
      },
      { h2: "Il timeframe cambia la risposta?" },
      {
        p: "Sì, ed è una fonte di confusione. Un mercato può essere in trend rialzista sul giornaliero e in range sui 15 minuti. La regola pratica: individui la direzione su un timeframe superiore, poi cerchi l'ingresso su uno più fine. Veda [quale timeframe scegliere](/blog/quale-timeframe-scegliere) e, per le basi, [come leggere un grafico di trading](/blog/come-leggere-un-grafico-di-trading).",
      },
      { h2: "Quali errori ricorrono più spesso?" },
      {
        ul: [
          "**Vedere un trend dappertutto.** Un movimento di tre candele non è un trend.",
          "**Applicare sempre lo stesso metodo.** Una strategia di breakout in range, o di rimbalzo in un trend forte, si logora in fretta.",
          "**Ignorare il contesto degli annunci.** Una pubblicazione può rompere un range senza preavviso (veda [calendario economico](/blog/calendario-economico)).",
          "**Cambiare lettura a ogni candela.** Fissi in anticipo i Suoi criteri.",
        ],
      },
      { tip: "Si ponga una domanda prima di ogni trade: se spengo lo schermo e lo riaccendo tra una settimana, il prezzo sarà più alto, più basso o allo stesso punto? La Sua risposta dice che cosa crede di vedere." },
      {
        p: "L'oro alterna fasi di trend e lunghi range, spesso legati al calendario americano: la nostra [pagina sull'analisi dell'oro (XAU/USD)](/gold) mostra come distinguerli.",
      },
      {
        p: "Per uno sguardo esterno, [Scanzivo](/) legge il Suo screenshot, indica se la struttura somiglia a un trend o a un range e propone livelli con un piano numerato. Verifichi sempre ciò che dice con la Sua lettura.",
      },
      {
        p: "Questo contenuto ha scopo didattico e non costituisce consulenza in materia di investimenti. Il trading comporta un rischio di perdita del capitale, fino alla totalità delle somme impegnate.",
      },
    ],
  },
  {
    key: "volume-trading",
    slug: "volume-nel-trading",
    title: "Il volume nel trading: che cosa conferma",
    description:
      "Come leggere le barre del volume, che cosa confermano su una rottura o un trend e perché il volume di forex e cripto non ha lo stesso significato.",
    date: "2026-11-19",
    body: [
      {
        p: "Il volume misura la quantità scambiata durante una candela. Aiuta a giudicare se un movimento poggia su una partecipazione reale o se è sottile. Non dà la direzione e, a seconda del mercato (azioni, cripto, forex), non significa la stessa cosa.",
      },
      { h2: "Che cosa misura davvero il volume?" },
      {
        p: "Sotto il grafico, ogni barra rappresenta il numero di unità scambiate nel periodo: azioni, contratti o unità di cripto. Una barra alta significa molti scambi, una bassa pochi. Ciò che conta è il confronto con le barre recenti, non il valore assoluto.",
      },
      { h2: "Che cosa conferma il volume?" },
      {
        ul: [
          "**Una rottura.** Un prezzo che esce da un livello con un volume nettamente più alto ha più probabilità di essere seguito di un'uscita su volume debole. Riduce il rischio di [falso breakout](/blog/falso-breakout), senza eliminarlo.",
          "**Un trend.** In un rialzo sano, il volume sale spesso sulle spinte e si calma sui ritracciamenti.",
          "**Un picco di esaurimento.** Un volume eccezionale dopo un lungo movimento può segnare la fine di un trend, ma solo se il prezzo reagisce subito dopo.",
          "**Un livello.** Un supporto difeso con volume è più credibile di un livello toccato senza attività. Veda [supporti e resistenze](/blog/supporti-e-resistenze).",
        ],
      },
      {
        p: "**Esempio (illustrativo):** un prezzo supera una resistenza. Le 20 barre precedenti ruotano attorno a 1.000 unità, la barra di rottura ne mostra 3.500. La partecipazione è netta. Se ne mostra 900, la rottura è sospetta: pochi operatori l'hanno seguita.",
      },
      { h2: "Ciò che il volume non dice" },
      {
        ul: [
          "**La direzione.** Un grosso volume può accompagnare un rialzo o un ribasso. Indica attività, non chi ha vinto.",
          "**L'intenzione.** Acquisti e vendite si incontrano a ogni scambio: il volume li conta tutti.",
          "**Il seguito.** Un picco non prevede la candela successiva.",
        ],
      },
      { h2: "Il volume nelle cripto: è affidabile?" },
      {
        p: "Nelle cripto, il volume è consolidato da numerose piattaforme, oppure limitato a una sola secondo la fonte del Suo grafico. Le cifre differiscono quindi da una piattaforma all'altra, e una parte del volume dichiarato da alcune sedi è stata messa in discussione. Non è inutile: i picchi relativi conservano un senso sulla stessa fonte. Ma i confronti tra piattaforme e i valori assoluti richiedono prudenza. Il mercato gira anche 24 ore su 24, il che fa variare il volume a seconda delle ore (veda [analisi tecnica del bitcoin](/blog/analisi-tecnica-bitcoin)).",
      },
      { h2: "Il volume nel forex: un caso a parte" },
      {
        p: "Il forex non ha una sede centrale unica: gli scambi avvengono over the counter tra banche e broker. Il «volume» mostrato dalla maggior parte delle piattaforme retail è un volume di tick, cioè il numero di variazioni di prezzo, non la quantità realmente scambiata. Resta correlato all'attività, quindi utilizzabile come indizio di agitazione, ma non sostituisce un vero volume di borsa. Sui CFD è lo stesso: vede quello del broker, non quello del mercato.",
      },
      { h2: "Come usarlo in pratica?" },
      {
        ol: [
          "**Confronti con la media recente.** Una barra vale rispetto alle sue vicine.",
          "**Lo legga con il prezzo.** Grosso volume e candela piccola: molti scambi senza progresso, segno di assorbimento. Grosso volume e candela grande: un movimento sostenuto.",
          "**Tenga conto dell'orario.** L'apertura e gli annunci gonfiano il volume senza significato particolare (veda [calendario economico](/blog/calendario-economico)).",
          "**Lo tenga come conferma**, mai come unico innesco. La [struttura](/blog/trend-o-range) viene prima.",
        ],
      },
      { tip: "Se la fonte del volume sul Suo grafico è dubbia (forex, CFD), non basi alcuna decisione su di esso. Lo usi solo per individuare i momenti di attività." },
      {
        p: "Sull'oro CFD il volume è quello del broker: per questo conta soprattutto come indizio di attività attorno all'apertura di Londra e ai dati americani delle 14:30. La nostra [pagina sull'analisi dell'oro (XAU/USD)](/gold) approfondisce.",
      },
      {
        p: "Il volume è uno degli elementi che [Scanzivo](/) può leggere su uno screenshot, insieme a struttura e livelli: ne ricava un piano numerato. Ma vede solo ciò che il Suo grafico mostra, quindi l'affidabilità della fonte resta affare Suo.",
      },
      {
        p: "Questo contenuto ha scopo didattico e non costituisce consulenza in materia di investimenti. Il trading comporta un rischio di perdita del capitale, fino alla totalità delle somme impegnate.",
      },
    ],
  },
  {
    key: "analyse-technique-bitcoin",
    slug: "analisi-tecnica-bitcoin",
    title: "Analisi tecnica del bitcoin: come leggere un grafico BTC",
    description:
      "Come leggere un grafico del bitcoin: timeframe, volatilità, livelli, effetto degli annunci e limiti di un'analisi che resta uno scenario, non una previsione.",
    date: "2026-11-19",
    body: [
      {
        p: "Leggere un grafico del bitcoin richiede gli stessi strumenti di qualunque altro asset: trend, supporti e resistenze, volume, gestione del rischio. Cambiano la volatilità, il mercato aperto 24 ore su 24 e la sensibilità agli annunci. Un'analisi resta uno scenario con un punto di invalidazione, mai una previsione.",
      },
      { h2: "Che cosa rende il BTC diverso dagli altri asset?" },
      {
        ul: [
          "**Un mercato continuo.** Non ci sono apertura né chiusura giornaliera. Nel fine settimana la liquidità è più sottile e i movimenti possono essere bruschi.",
          "**Una volatilità elevata.** Variazioni di diversi punti percentuali in una giornata non sono rare. I Suoi stop e le dimensioni delle posizioni devono tenerne conto (veda [dimensione della posizione](/blog/dimensione-della-posizione)).",
          "**Più sedi di scambio.** Prezzi e volumi variano leggermente a seconda della piattaforma (veda [il volume nel trading](/blog/volume-nel-trading)).",
          "**Una sensibilità alle notizie.** Decisioni dei regolatori, annunci di prodotti finanziari, attacchi informatici, dichiarazioni delle banche centrali.",
        ],
      },
      { h2: "Quale timeframe scegliere per il bitcoin?" },
      {
        p: "Dipende dal Suo orizzonte. Uno schema comune: il grafico giornaliero o a 4 ore dà la direzione e i grandi livelli, l'1 ora o i 15 minuti servono a collocare l'ingresso. Su 24 ore si guardano soprattutto le candele da 5 a 15 minuti e l'1 ora. Su 7 giorni, il 4 ore e il giornaliero offrono una vista più stabile. Più il timeframe è corto, più il rumore è forte. Dettagli in [quale timeframe scegliere](/blog/quale-timeframe-scegliere).",
      },
      { h2: "Come individuare i livelli importanti sul BTC?" },
      {
        p: "Parta dagli estremi delle settimane passate: massimi e minimi che hanno fermato il prezzo più volte. Aggiunga i numeri tondi (per esempio le migliaia piene), che molti operatori guardano. Poi cerchi le zone in cui il prezzo ha cambiato comportamento, come una vecchia resistenza diventata supporto. Il metodo è quello di [supporti e resistenze](/blog/supporti-e-resistenze), e si applica altrettanto bene all'oro: veda [numeri tondi sull'oro](/blog/numeri-tondi-oro).",
      },
      {
        p: "**Esempio (illustrativo, cifre inventate):** il BTC oscilla da dieci giorni tra 55.000 € e 58.000 €. Il tetto è stato testato tre volte, il pavimento due. Finché il prezzo resta in questo corridoio, si è in range (veda [trend o range](/blog/trend-o-range)). Una chiusura giornaliera sopra 58.000 € con un volume più forte diventa uno scenario rialzista. Una chiusura sotto 55.000 € invalida il range verso il basso.",
      },
      { h2: "Quali indicatori usare sul bitcoin?" },
      {
        p: "Pochi, e senza abusarne. Le [medie mobili](/blog/medie-mobili) (MM50, MM200 sul giornaliero) danno il contesto. L'[RSI](/blog/indicatore-rsi) segnala gli eccessi, ma in un trend forte resta a lungo in zona estrema. Il [MACD](/blog/indicatore-macd) misura lo slancio. Le [bande di Bollinger](/blog/bande-di-bollinger) aiutano a vedere le fasi di calma prima dei grandi movimenti. Nessuno sostituisce la lettura del prezzo, e il loro accordo non prova nulla.",
      },
      { h2: "Come tenere conto degli annunci?" },
      {
        p: "Prima di entrare, guardi che cosa è previsto: le pubblicazioni macroeconomiche americane (inflazione, occupazione, decisioni della Fed) fanno reagire il bitcoin come molti altri asset rischiosi. Consulti il [calendario economico](/blog/calendario-economico) ed eviti di aprire una posizione subito prima di un appuntamento importante senza averlo deciso consapevolmente. Molti dati americani escono alle 14:30 ora italiana. Le notizie impreviste, invece, non hanno calendario: è un motivo in più per avere sempre uno stop definito in anticipo (veda [dove mettere lo stop loss](/blog/dove-mettere-lo-stop-loss)).",
      },
      { h2: "Quali errori sono frequenti sul BTC?" },
      {
        ul: [
          "**Usare una leva elevata** su un asset già molto volatile: basta un'ombra per liquidare una posizione.",
          "**Inseguire i movimenti per paura di perderli**, ed entrare tardi dopo una grande candela.",
          "**Confondere rumore e segnale** sui timeframe piccoli.",
          "**Fidarsi del volume o del prezzo di una sola piattaforma** senza verificare.",
          "**Cadere in un [falso breakout](/blog/falso-breakout)**, frequenti attorno ai numeri tondi.",
          "**Lasciarsi sedurre dalle promesse** di bot o segnali: veda [bot di trading IA e truffe](/blog/bot-di-trading-ia-truffe).",
        ],
      },
      { h2: "Quali sono i limiti di un'analisi tecnica del bitcoin?" },
      {
        p: "Il bitcoin reagisce anche a fattori che il grafico non mostra: regolamentazione, flussi istituzionali, eventi propri del mondo cripto. L'analisi tecnica inquadra il rischio e colloca i livelli, non dice che cosa succederà. Molti trader restano fuori finché il loro scenario non è chiaro, ed è una scelta legittima.",
      },
      { tip: "Scriva prima di entrare: livello d'ingresso, stop, obiettivo e importo rischiato. Se ne manca uno dei quattro, non ha un piano, solo un'intuizione." },
      {
        p: "Chi segue anche i metalli può applicare lo stesso metodo all'oro: la nostra [pagina sull'analisi dell'oro (XAU/USD)](/gold) mostra come.",
      },
      {
        p: "Per risparmiare tempo, [Scanzivo](/) può leggere uno screenshot del Suo grafico BTC e proporre livelli e un piano numerato. Per la cattura, veda [screenshot del grafico](/blog/screenshot-del-grafico). E per capire che cosa l'IA può o non può fare, legga [l'intelligenza artificiale e il trading](/blog/intelligenza-artificiale-e-trading).",
      },
      {
        p: "Questo contenuto ha scopo didattico e non costituisce consulenza in materia di investimenti. Il trading di criptovalute comporta un rischio elevato di perdita del capitale, fino alla totalità delle somme impegnate.",
      },
    ],
  },
];
