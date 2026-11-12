import type { GoldPage } from "./gold";

export const GOLD_IT: GoldPage = {
  metaTitle: "Analisi IA specializzata sull'oro (XAU/USD) — Scanzivo",
  metaDescription:
    "Carichi uno screenshot del Suo grafico XAU/USD: l'IA legge il trend, traccia i livelli e mette i numeri in un piano, tenendo conto di ciò che muove l'oro. Prima lettura gratuita.",
  kicker: "Analisi specializzata sull'oro · XAU/USD",
  lede: "Tarata sull'oro: riconosce i prezzi tondi dove molti trader piazzano gli ordini, tiene conto degli orari di Londra e New York e diffida degli annunci americani.",
  title: "L'analisi IA dei Suoi grafici sull'oro (XAU/USD).",
  titleB: "Dal grafico a 1 ora a quello a 5 minuti.",
  intro:
    "Carichi uno screenshot del Suo grafico XAU/USD. L'IA legge il trend e la struttura, traccia i livelli sulla Sua immagine e propone un piano in cifre: entrata, stop, obiettivi e il livello che lo invaliderebbe.",
  cta: "Analizza il mio grafico sull'oro",
  routineTitle: "La routine 1H, 15m, 5m",
  routineIntro: "È il metodo con cui molti trader intraday lavorano l'oro: prima la direzione, poi l'entrata. Uno screenshot per ogni timeframe.",
  steps: [
    { tf: "1H", title: "La direzione", text: "Lo screenshot a 1 ora dice in che direzione va il mercato: trend, struttura, zone dove l'oro ha già reagito. Fissa il quadro della sessione." },
    { tf: "15m", title: "Il piano", text: "Sul 15 minuti, l'analisi precisa i livelli utili per la giornata e lo scenario principale, con il suo stop e i suoi obiettivi." },
    { tf: "5m", title: "L'entrata", text: "Il 5 minuti serve ad aspettare il momento giusto: una rottura confermata, un retest, oppure la conclusione «aspettare» quando il segnale non c'è ancora." },
  ],
  example: {
    label: "Esempio illustrativo · cifre fittizie",
    rows: [
      { tf: "1H", reading: "Trend rialzista, minimi crescenti", plan: "Resistenza 2.450 · supporto 2.400" },
      { tf: "15m", reading: "Scenario rialzista principale, 64%", plan: "Entrata su chiusura sopra 2.432, stop 2.418, obiettivi 2.450 e poi 2.470" },
      { tf: "5m", reading: "Il prezzo resta ancora sotto 2.432", plan: "Aspettare la chiusura sopra prima di entrare" },
    ],
    note: "Questa tabella mostra la forma di una lettura, non un risultato reale. Ogni analisi nasce dal Suo screenshot.",
  },
  knowsTitle: "Cosa considera l'IA sull'oro",
  knows: [
    { title: "I numeri tondi", text: "Prezzi come 3.000 $, 3.050 $ o 3.100 $ attirano gli ordini: molti trader ci mettono entrate, stop e obiettivi. L'analisi li usa per collocare i suoi livelli." },
    { title: "Le sessioni", text: "Il range asiatico viene spesso rotto all'apertura di Londra, e l'apertura americana, alle 14:30 ora italiana, porta i movimenti più ampi della giornata." },
    { title: "I dati americani", text: "Inflazione (CPI), occupazione (NFP), decisioni della Fed: attorno a questi annunci le false rotture sono frequenti. L'analisi lo ricorda quando serve." },
    { title: "Il rumore", text: "L'oro si muove molto all'interno di una sessione. Gli stop proposti sono messi oltre le ombre recenti, non a ridosso di un livello." },
  ],
  macroTitle: "Con il pacchetto Pro: il contesto che muove l'oro",
  macroText:
    "Ogni analisi sull'oro viene incrociata con gli annunci dei prossimi 7 giorni e con le notizie recenti: Fed, inflazione e occupazione americane, dollaro, tassi reali, acquisti di oro delle banche centrali, flussi degli ETF. Con le fonti e una frase su come tenerne conto nel Suo piano.",
  platformsTitle: "Con i Suoi strumenti",
  platformsText:
    "Basta uno screenshot di TradingView, MetaTrader 4 o 5, cTrader o dell'app del Suo broker, qualunque sia il nome mostrato: XAU/USD, XAUUSD, GOLD. Serve solo che l'asse dei prezzi sia leggibile.",
  limitsTitle: "Cosa Scanzivo non fa",
  limits: [
    "Non prevede il prezzo: soppesa degli scenari, e anche lo scenario principale può sbagliare.",
    "Non invia ordini e non tocca il Suo denaro.",
    "Conosce solo il Suo screenshot: niente quotazioni in tempo reale.",
    "Non è una consulenza di investimento personalizzata.",
  ],
  cfd:
    "L'XAU/USD si negozia per lo più tramite CFD, con leva finanziaria. Sono prodotti complessi e la maggior parte dei conti di investitori al dettaglio perde denaro quando li utilizza. Rischi solo ciò che può permettersi di perdere.",
  faqTitle: "Domande sull'analisi dell'oro",
  faq: [
    {
      q: "L'IA è davvero specializzata sull'oro?",
      a: "Quando lo screenshot mostra l'oro, l'analisi segue istruzioni specifiche per l'XAU/USD (numeri tondi, sessioni, dati americani, posizionamento degli stop), e la parte notizie del pacchetto Pro cerca per prima cosa ciò che muove l'oro. Il modello di IA, invece, è lo stesso usato per gli altri asset.",
    },
    { q: "Quali timeframe?", a: "Tutti, dal 1 minuto al mensile. Per l'intraday, la routine 1 ora, 15 minuti, 5 minuti è un buon punto di partenza." },
    {
      q: "Posso analizzare più volte al giorno?",
      a: "Sì, con il pacchetto Pro, senza limiti di numero. Il pacchetto Starter dà un'analisi al giorno.",
    },
    { q: "Serve un account per provare?", a: "No. Carichi il Suo screenshot: l'IA Le mostra gratis la sua prima lettura, senza carta e senza registrazione." },
    { q: "È un servizio di segnali?", a: "No. Scanzivo Le restituisce una lettura motivata del Suo grafico e un piano, che è libero di seguire o meno. Non invia avvisi e non apre ordini." },
  ],
  closingTitle: "Il Suo prossimo grafico sull'oro, letto in meno di un minuto.",
  breadcrumb: "Analisi dell'oro",
  navLabel: "Oro",
  homeTitle: "Fa trading sull'oro?",
  homeLink: "Scopra l'analisi specializzata XAU/USD →",
  reportBadge: "Analisi specializzata sull'oro",
};
