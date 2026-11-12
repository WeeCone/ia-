import type { GoldPage } from "./gold";

export const GOLD_DE: GoldPage = {
  metaTitle: "KI-Analyse spezialisiert auf Gold (XAU/USD) — Scanzivo",
  metaDescription:
    "Senden Sie einen Screenshot Ihres XAU/USD-Charts: Die KI liest den Trend, zeichnet die Marken ein und erstellt einen Plan mit konkreten Zahlen. Dabei berücksichtigt sie, was den Goldpreis bewegt. Erste Auswertung kostenlos.",
  kicker: "Spezialisiert auf Gold · XAU/USD",
  lede: "Eine Analyse, abgestimmt auf Gold: runde Marken, Handelssessions, Reaktionen auf US-Daten.",
  title: "KI-Analyse für Ihre Gold-Charts.",
  titleB: "Vom 1-Stunden- bis zum 5-Minuten-Chart.",
  intro:
    "Senden Sie einen Screenshot Ihres XAU/USD-Charts. Die KI liest Trend und Struktur, zeichnet die Marken in Ihr Bild ein und schlägt einen Plan in Zahlen vor: Einstieg, Stop, Kursziele und die Marke, an der er ungültig würde.",
  cta: "Meinen Gold-Chart analysieren",
  routineTitle: "Die Routine 1H, 15m, 5m",
  routineIntro: "So handeln viele Intraday-Trader Gold: erst die Richtung, dann der Einstieg. Ein Screenshot pro Zeitrahmen.",
  steps: [
    { tf: "1H", title: "Die Richtung", text: "Der Screenshot im Stundenchart zeigt, wohin der Markt läuft: Trend, Struktur, Zonen, an denen Gold schon reagiert hat. Er gibt den Rahmen für die Session vor." },
    { tf: "15m", title: "Der Plan", text: "Im 15-Minuten-Chart grenzt die Analyse die wichtigen Marken des Tages und das bevorzugte Szenario ein, mit Stop und Kurszielen." },
    { tf: "5m", title: "Der Einstieg", text: "Der 5-Minuten-Chart dient dazu, den richtigen Moment abzuwarten: einen bestätigten Ausbruch, einen Retest oder das Fazit „abwarten“, wenn das Signal noch nicht da ist." },
  ],
  example: {
    label: "Beispiel zur Veranschaulichung · fiktive Zahlen",
    rows: [
      { tf: "1H", reading: "Aufwärtstrend, steigende Tiefs", plan: "Widerstand 2.450 · Unterstützung 2.400" },
      { tf: "15m", reading: "Aufwärtsszenario bevorzugt, 64 %", plan: "Einstieg bei Schluss über 2.432, Stop 2.418, Ziele 2.450, dann 2.470" },
      { tf: "5m", reading: "Kurs prallt noch unter 2.432 ab", plan: "Schlusskurs darüber abwarten, dann einsteigen" },
    ],
    note: "Diese Tabelle zeigt, wie eine Auswertung aufgebaut ist, kein echtes Ergebnis. Jede Analyse entsteht aus Ihrem eigenen Screenshot.",
  },
  knowsTitle: "Was die KI bei Gold berücksichtigt",
  knows: [
    { title: "Runde Marken", text: "Vielfache von 50 und 100 $ ziehen Orders an. Die Analyse nutzt sie, um Marken und Kursziele zu setzen." },
    { title: "Die Sessions", text: "Die Asien-Range wird oft zur Eröffnung in London gebrochen, und die US-Eröffnung um 14:30 Uhr deutscher Zeit bringt die größten Bewegungen des Tages." },
    { title: "US-Daten", text: "Inflation (CPI), Arbeitsmarkt (NFP), Fed-Entscheide: Rund um diese Termine kommt es oft zu Fehlausbrüchen. Die Analyse weist darauf hin, wenn es relevant ist." },
    { title: "Das Rauschen", text: "Gold schwankt innerhalb einer Session stark. Die vorgeschlagenen Stops liegen jenseits der letzten Dochte, nicht knapp an einer Marke." },
  ],
  macroTitle: "Mit dem Pro-Paket: das Umfeld, das Gold bewegt",
  macroText:
    "Jede Gold-Analyse wird mit den Terminen der nächsten 7 Tage und aktuellen Nachrichten abgeglichen: Fed, US-Inflation und -Arbeitsmarkt, Dollar, Realzinsen, Goldkäufe der Notenbanken, ETF-Zuflüsse. Mit Quellenangaben und einem Satz dazu, wie Sie das in Ihrem Plan berücksichtigen.",
  platformsTitle: "Mit Ihren Tools",
  platformsText:
    "Ein Screenshot aus TradingView, MetaTrader 4 oder 5, cTrader oder der App Ihres Brokers genügt, egal wie das Symbol heißt: XAU/USD, XAUUSD, GOLD. Die Preisachse muss nur lesbar sein.",
  limitsTitle: "Was Scanzivo nicht macht",
  limits: [
    "Es sagt den Kurs nicht voraus: Es wägt Szenarien ab, und auch das bevorzugte Szenario liegt mal daneben.",
    "Es platziert keine Orders und hat keinen Zugriff auf Ihr Geld.",
    "Es kennt nur Ihren Screenshot: keine Echtzeitkurse.",
    "Es ist keine persönliche Anlageberatung.",
  ],
  cfd:
    "XAU/USD wird meist als CFD gehandelt, mit Hebel. CFDs sind komplexe Produkte, und die Mehrheit der Privatanlegerkonten verliert beim Handel damit Geld. Riskieren Sie nur Geld, dessen Verlust Sie verkraften können.",
  faqTitle: "Fragen zur Gold-Analyse",
  faq: [
    {
      q: "Ist die KI wirklich auf Gold spezialisiert?",
      a: "Wenn der Screenshot Gold zeigt, folgt die Analyse eigenen Vorgaben für XAU/USD (runde Marken, Sessions, US-Daten, Platzierung der Stops), und der Nachrichtenteil des Pro-Pakets sucht zuerst nach dem, was Gold bewegt. Das KI-Modell selbst ist dasselbe wie bei anderen Werten.",
    },
    { q: "Welche Zeitrahmen?", a: "Alle, vom 1-Minuten- bis zum Monatschart. Für Intraday ist die Routine 1 Stunde, 15 Minuten, 5 Minuten ein guter Ausgangspunkt." },
    {
      q: "Kann ich mehrmals am Tag analysieren?",
      a: "Ja, mit dem Pro-Paket, ohne Begrenzung der Anzahl. Das Starter-Paket bietet eine Analyse pro Tag.",
    },
    { q: "Brauche ich ein Konto zum Testen?", a: "Nein. Laden Sie Ihren Screenshot hoch: Die KI zeigt Ihnen ihre erste Auswertung kostenlos, ohne Karte und ohne Registrierung." },
    { q: "Ist das ein Signaldienst?", a: "Nein. Scanzivo liefert Ihnen eine begründete Auswertung Ihres Charts und einen Plan. Ob Sie ihm folgen, entscheiden Sie selbst. Es verschickt keine Alerts und platziert keine Orders." },
  ],
  closingTitle: "Ihr nächster Gold-Chart, ausgewertet in weniger als einer Minute.",
  breadcrumb: "Gold-Analyse",
  navLabel: "Gold",
  homeTitle: "Sie handeln Gold?",
  homeLink: "Zur spezialisierten XAU/USD-Analyse →",
  reportBadge: "Gold-Analyse, spezialisiert",
};
