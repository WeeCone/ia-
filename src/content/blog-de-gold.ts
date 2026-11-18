import type { Article } from "./blog";

/** German guides on gold (XAU/USD); `key` is the French slug. Times are Central European Time (MEZ/MESZ), examples in euros. */
export const ARTICLES_DE_GOLD: Omit<Article, "locale">[] = [
  {
    key: "comment-trader-l-or",
    slug: "gold-handeln-xau-usd",
    title: "Gold handeln (XAU/USD): der Einsteigerleitfaden",
    description:
      "Was den Goldpreis bewegt, wie er notiert wird, was ein Gold-CFD ist, welche Handelssitzungen Sie kennen sollten und eine einfache Routine für den Start.",
    date: "2026-11-19",
    body: [
      {
        p: "Um Gold zu handeln, eröffnen die meisten Privatanleger bei einem Broker einen CFD auf XAU/USD: Sie setzen auf steigende oder fallende Preise einer Unze Gold in Dollar, ohne das Metall zu besitzen. Das ist leicht zugänglich, aber ein nervöser Markt. Hier erfahren Sie, wie er funktioniert und wo Sie anfangen.",
      },
      { h2: "Was ist XAU/USD?" },
      {
        p: "XAU ist das Kürzel für Gold, USD das für den US-Dollar. Der angezeigte Preis gilt für **eine Feinunze Gold (rund 31,1 Gramm) in Dollar**. Zeigt der Chart 2.400, kostet eine Unze 2.400 $. Je nach Plattform sehen Sie XAU/USD, XAUUSD oder einfach GOLD: Es ist dasselbe Instrument.",
      },
      {
        p: "Weil der Preis in Dollar notiert, reagiert Gold auf alles, was den Dollar betrifft. Das ist das Erste, was Sie sich merken sollten: Ein steigender Dollar belastet Gold in der Regel, ein fallender stützt es. Die Einzelheiten stehen in [Warum Gold steigt oder fällt](/blog/warum-gold-steigt-oder-faellt).",
      },
      { h2: "Wie handelt man Gold: CFD, Futures, ETF" },
      {
        ul: [
          "**Der CFD**: ein Vertrag mit Ihrem Broker über die Kursdifferenz zwischen Eröffnung und Schließung. Sie können kaufen oder leerverkaufen, mit Hebel. Im Intraday-Handel ist das der übliche Weg.",
          "**Futures**: standardisiert, an der Börse gehandelt, mit großen Kontraktgrößen. Eher für Fortgeschrittene.",
          "**ETFs und physisches Gold**: um Gold langfristig und ohne Hebel zu halten. Das ist Trading im engeren Sinne nicht.",
        ],
      },
      {
        p: "Dieser Leitfaden behandelt den CFD. Er bietet Flexibilität, bringt aber eigene Risiken mit: Hebel, Spread, Finanzierungskosten. Sie sind in [Gold-CFD: Risiken](/blog/gold-cfd-risiken) beschrieben.",
      },
      { h2: "Warum ist Gold so beweglich?" },
      {
        p: "Innerhalb einer Sitzung kann Gold um mehrere Dutzend Dollar schwanken, an Meldungstagen mehr. In Preispunkten sind das deutlich größere Bewegungen als bei den meisten Währungspaaren. Zwei praktische Folgen: Ihre Stops müssen weiter sein, also Ihre Positionen kleiner, und Fehler kosten schneller.",
      },
      {
        p: "Gold reagiert vor allem auf US-Statistiken (Arbeitsmarkt, Inflation), Entscheidungen der Fed, den Dollar, die Realzinsen und geopolitische Spannungen. Der Kalender zählt also so viel wie der Chart: Lesen Sie den [Wirtschaftskalender](/blog/wirtschaftskalender).",
      },
      { h2: "Die Handelssitzungen, die Sie kennen sollten" },
      {
        p: "Gold wird fast durchgehend gehandelt, aber die Aktivität schwankt im Tagesverlauf stark. In mitteleuropäischer Zeit: Die asiatische Sitzung ist oft ruhig, London öffnet gegen 9:00 Uhr, New York gegen 14:30 Uhr mit den US-Statistiken. Die größten Bewegungen konzentrieren sich meist von London bis zum Ende der New Yorker Sitzung. Details in [Die besten Handelszeiten für Gold](/blog/beste-handelszeiten-gold).",
      },
      { h2: "Eine einfache Routine für den Einstieg" },
      {
        ol: [
          "**Vor der Sitzung** schauen Sie in den Kalender: Eine wichtige US-Meldung ändert den Plan des Tages.",
          "**Lesen Sie die Richtung im Stundenchart**: Trend, letzte Hochs und Tiefs, Zonen, in denen der Kurs schon reagiert hat. [Trading-Chart lesen](/blog/trading-chart-lesen) vermittelt die Grundlagen.",
          "**Erkennen Sie die Marken**: frühere Hochs und Tiefs sowie runde Zahlen (siehe [Gold: runde Marken](/blog/gold-runde-marken)).",
          "**Legen Sie den Plan vor dem Einstieg fest**: Einstieg, Stop, Ziel. Ist das Chance-Risiko-Verhältnis schlecht, lassen Sie den Trade aus ([Chance-Risiko-Verhältnis](/blog/chance-risiko-verhaeltnis)).",
          "**Berechnen Sie die Größe** aus dem Stop, nicht aus der Lust: Lesen Sie [Lotgröße bei Gold berechnen](/blog/lotgroesse-gold-berechnen).",
          "**Notieren Sie das Ergebnis**, egal wie es ausfällt, um zu verstehen, was Sie tatsächlich tun.",
        ],
      },
      {
        p: "Die ausführliche Intraday-Version dieser Routine steht in [Eine Gold-Routine: 1 Stunde, 15 Minuten, 5 Minuten](/blog/gold-routine-1h-15m-5m).",
      },
      { h2: "Die typischen Anfängerfehler" },
      {
        ul: [
          "**Eine zu große Position eröffnen**, weil der Unzenpreis neben der realen Volatilität „klein“ wirkt.",
          "**Mitten in einer Meldung handeln**, ohne sie im Kalender gesehen zu haben.",
          "**Direkt an einer runden Marke einsteigen** mit einem Stop knapp dahinter: Die Dochte gewinnen.",
          "**Zu viele Trades machen**, um „es wieder hereinzuholen“ nach einem Verlust.",
          "**Jede Woche die Methode wechseln**: Ohne vergleichbare Versuchsreihe lässt sich nicht erkennen, was funktioniert.",
        ],
      },
      {
        p: "Beginnen Sie mit einem Demokonto und wenig Beobachtungsobjekten: ein Instrument, zwei oder drei Zeitrahmen, eine Routine. Wenn Sie möchten, können Sie auch einen Screenshot Ihres Charts bei der [KI-Analyse für Gold](/gold) einreichen, um deren Lesart mit Ihrer zu vergleichen.",
      },
      {
        p: "Dieser Leitfaden dient der Information und stellt keine Anlageberatung dar. CFDs sind komplexe Produkte, die wegen des Hebels mit einem hohen Risiko verbunden sind, Geld zu verlieren: Riskieren Sie nur, was Sie sich leisten können zu verlieren.",
      },
    ],
  },
  {
    key: "meilleures-heures-pour-trader-l-or",
    slug: "beste-handelszeiten-gold",
    title: "Die besten Handelszeiten für Gold (MEZ)",
    description:
      "Sitzungen von Tokio, London und New York, Überschneidung, Zeiten der US-Meldungen: wann Gold sich am meisten bewegt, in mitteleuropäischer Zeit, und wann Sie es meiden sollten.",
    date: "2026-11-19",
    body: [
      {
        p: "Gold bewegt sich am stärksten zwischen der Londoner Eröffnung, gegen 9:00 Uhr MEZ, und dem Ende der US-Sitzung. Am aktivsten ist oft die Überschneidung London / New York, ungefähr von 14:30 bis 17:30 Uhr. Die asiatische Nacht ist meist ruhiger und anfälliger für Fehlbewegungen.",
      },
      { h2: "Die Zeiten in mitteleuropäischer Zeit" },
      {
        p: "Diese Zeiten sind Richtwerte und können in einigen Wochen im Jahr um eine Stunde abweichen, wenn Europa und die USA die Uhr nicht am selben Tag umstellen. Prüfen Sie sie in diesen Zeiträumen auf Ihrer Plattform.",
      },
      {
        ul: [
          "**Asiatische Sitzung (Tokio, Sydney)**: etwa 1:00 bis 9:00 Uhr. Oft eine enge Range.",
          "**Londoner Sitzung**: Eröffnung gegen 9:00 Uhr, Schluss gegen 17:30 Uhr. Der erste echte Volumenschub des Tages.",
          "**New Yorker Sitzung**: Die US-Statistiken erscheinen meist um **14:30 Uhr**, die Börse öffnet gegen 15:30 Uhr, das Sitzungsende liegt gegen 22:00 Uhr.",
          "**Überschneidung London / New York**: etwa 14:30 bis 17:30 Uhr. Viele Teilnehmer, daher größere Bewegungen.",
        ],
      },
      { h2: "Warum die Londoner Eröffnung zählt" },
      {
        p: "In der Nacht baut Gold oft eine Range auf: ein Hoch und ein Tief, zwischen denen der Kurs pendelt. Bei der Londoner Eröffnung wird diese Range häufig gebrochen, in die eine oder andere Richtung. Dieser Ausbruch gibt manchmal die Richtung des Tagesbeginns vor, kann aber auch ein Fehlstart sein, den der Kurs innerhalb einer Stunde zurücknimmt.",
      },
      {
        p: "Ein einfacher Anhaltspunkt: Zeichnen Sie Hoch und Tief der asiatischen Sitzung in Ihren Chart ein. Beobachten Sie, wie sich der Kurs verhält, wenn er sie erreicht, statt den Ausbruch vorwegzunehmen. Sie suchen einen klaren Schluss jenseits der Range und dann einen Rücklauf, der die Marke hält.",
      },
      { h2: "14:30 Uhr: die Zeit der US-Meldungen" },
      {
        p: "Viele US-Statistiken erscheinen um 14:30 Uhr MEZ: Arbeitsmarkt (NFP), Inflation (CPI), Einzelhandelsumsätze, wöchentliche Arbeitslosenanträge. Gold reagiert manchmal binnen Sekunden, mit sich weitenden Spreads. Die Fed-Entscheidungen kommen eher spätabends, gegen 20:00 Uhr. Schauen Sie vor jeder Eröffnung einer Position in den [Wirtschaftskalender](/blog/wirtschaftskalender).",
      },
      {
        p: "Wie Sie sich rund um diese Meldungen verhalten, wird gesondert behandelt: [Gold handeln bei NFP, CPI und Fed](/blog/gold-nfp-fed).",
      },
      { h2: "Wann Sie Gold besser nicht handeln" },
      {
        ul: [
          "**Kurz vor und kurz nach einer wichtigen Meldung**: weiterer Spread, Bewegungen in beide Richtungen.",
          "**Am Ende der US-Sitzung und beim Freitagsschluss**: geringere Liquidität, der Spread kann sich weiten.",
          "**An US-Feiertagen**: wenig Volumen, unzuverlässige Ausbrüche.",
          "**Am Sonntagabend zur Wiedereröffnung**: Kurslücken gegenüber dem Freitagsschluss sind möglich.",
        ],
      },
      { h2: "Welches Zeitfenster passt zu Ihrem Alltag?" },
      {
        p: "Sie müssen nicht den ganzen Tag vor dem Bildschirm sitzen. Besser ist ein festes Fenster, das Sie gut kennen.",
      },
      {
        ul: [
          "**Der Vormittag (9:00 bis 12:00 Uhr)**: Lesen der asiatischen Range und der Reaktion in London. Passt, wenn Sie danach arbeiten.",
          "**Der Nachmittag (14:30 bis 17:30 Uhr)**: der aktivste, aber auch der schnellste Abschnitt. Nur für alle, die ihre Positionen eng verfolgen können.",
          "**Der Abend**: Der Markt beruhigt sich oft, außer bei einer Fed-Meldung. Eine über Nacht offene Position setzt Kurslücken und Finanzierungskosten aus.",
        ],
      },
      { h2: "Den Zeitrahmen an die Sitzung anpassen" },
      {
        p: "In einem ruhigen Markt rauscht ein 5-Minuten-Chart viel bei wenig Information. In einem aktiven Markt wird er nützlich, um den Einstieg zu verfeinern. Die Logik steht in [Zeitrahmen wählen](/blog/trading-zeiteinheit-waehlen) und die Praxis in [der Routine 1 Stunde, 15 Minuten, 5 Minuten](/blog/gold-routine-1h-15m-5m).",
      },
      {
        p: "Die Analysen des [auf Gold spezialisierten Tools](/gold) berücksichtigen die Sitzungen: die in London gebrochene asiatische Range, die Meldungen um 14:30 Uhr. Wenn Sie einen Screenshot einreichen, nehmen Sie ihn zu dem Zeitpunkt auf, zu dem Sie ihn betrachten, denn er wird so gelesen, wie er ist.",
      },
      {
        p: "Dieser Leitfaden dient der Information und stellt keine Anlageberatung dar. CFDs sind komplexe Produkte, die mit einem hohen Risiko eines Kapitalverlusts verbunden sind: Auch zu den guten Zeiten bleibt ein Verlust möglich.",
      },
    ],
  },
  {
    key: "pourquoi-l-or-monte-ou-baisse",
    slug: "warum-gold-steigt-oder-faellt",
    title: "Warum Gold steigt oder fällt: die Einflussfaktoren",
    description:
      "Dollar, Realzinsen, Fed, Inflation, Käufe der Zentralbanken, geopolitische Spannungen, ETFs: was auf den Goldpreis wirkt und wie Sie es berücksichtigen.",
    date: "2026-11-19",
    body: [
      {
        p: "Der Goldpreis bewegt sich vor allem mit dem US-Dollar und den Realzinsen, also den Zinsen abzüglich der Inflation. Fallen Dollar oder Realzinsen, tendiert Gold nach oben. Steigen sie, tendiert es nach unten. Dazu kommen geopolitische Spannungen, Käufe der Zentralbanken und ETF-Flüsse. Das sind Tendenzen, keine Gesetze.",
      },
      { h2: "Der Dollar: der erste Reflex" },
      {
        p: "Gold notiert in Dollar. Wird der Dollar stärker, braucht man weniger Dollar für denselben Wert: Gold in Dollar fällt oft. Ein schwächerer Dollar macht die Unze für Käufer außerhalb der USA billiger und stützt die Nachfrage. Der Zusammenhang ist häufig, nicht dauerhaft: An manchen Tagen steigen Gold und Dollar gemeinsam.",
      },
      { h2: "Die Realzinsen" },
      {
        p: "Gold zahlt weder Zinsen noch Dividende. Bringen risikolose Anlagen nach Inflation viel ein, ist es teuer, Gold zu halten, weil man Erträge verpasst. Fallen die Realzinsen oder werden sie negativ, wird Gold attraktiver. Das ist oft der von Analysten am häufigsten genannte Hintergrundfaktor.",
      },
      {
        p: "Konkret beobachten Sie die Rendite zehnjähriger US-Staatsanleihen und die Erwartungen an Zinssenkungen oder -erhöhungen. Ein abrupter Renditeanstieg belastet Gold kurzfristig in der Regel.",
      },
      { h2: "Die Fed und ihre Entscheidungen" },
      {
        p: "Die Fed, die US-Notenbank, legt den Leitzins fest und kommentiert seinen Verlauf. Der Markt reagiert auf die Worte ebenso wie auf die Zahl. Eine lockerere Kommunikation als erwartet stützt Gold oft, ein straffer Ton lässt es zurückfallen. Die Termine der Sitzungen stehen im Kalender: Lesen Sie den [Wirtschaftskalender](/blog/wirtschaftskalender) und [Gold handeln bei NFP, CPI und Fed](/blog/gold-nfp-fed).",
      },
      { h2: "Die Inflation: ein weniger einfacher Zusammenhang, als man denkt" },
      {
        p: "Oft heißt es, Gold schütze vor Inflation. Langfristig hat die Idee Anhänger. Kurzfristig ist es differenzierter: Eine hohe Inflationszahl kann Gold steigen lassen oder fallen, wenn sie die Fed veranlasst, die Zinsen hoch zu halten. Für den Preis zählt also die Zahl **im Vergleich zu den Erwartungen** und die erwartete Reaktion der Notenbank.",
      },
      { h2: "Die Zentralbanken" },
      {
        p: "Mehrere Zentralbanken halten Gold in ihren Reserven, und ihre Käufe oder Verkäufe beeinflussen die Nachfrage. Ihre Bestände werden mit Verzögerung von Organisationen wie dem World Gold Council veröffentlicht. Diese Informationen liefern einen Hintergrund, selten ein Signal für einen stundengenauen Einstieg.",
      },
      { h2: "Geopolitische Spannungen und Risikoaversion" },
      {
        p: "Gold gilt als sicherer Hafen. In unsicheren Zeiten (Konflikt, Finanzkrise, politische Spannung) kann die Nachfrage steigen und der Preis schnell klettern. Dieser Effekt verblasst aber oft, wenn sich die Lage beruhigt, und er kündigt sich nicht an: Eine scharfe Umkehr ist möglich.",
      },
      { h2: "ETFs und physische Nachfrage" },
      {
        p: "Die Bestände von ETFs, die mit physischem Gold hinterlegt sind, steigen oder fallen mit den Zu- und Abflüssen der Anleger. Anhaltende Zuflüsse sprechen eher für eine stabile Nachfrage. Auch die Nachfrage nach Schmuck und physischen Anlagen, vor allem in Asien, wirkt mit eigener Saisonalität.",
      },
      { h2: "Wie Sie das beim Trading nutzen" },
      {
        ol: [
          "**Wissen, was erwartet wird**: Schauen Sie in den Wochenkalender und notieren Sie die US-Meldungen.",
          "**Den Kontext erkennen**: Steigen oder fallen Dollar und Renditen seit einigen Tagen? Läuft Gold in dieselbe Richtung oder dagegen?",
          "**Den Einstieg dem Chart überlassen**: Der Kontext gibt eine Tendenz vor, keinen Einstiegspunkt. Marken und Struktur (siehe [Unterstützung und Widerstand](/blog/unterstuetzung-und-widerstand)) erledigen den Rest.",
          "**Der Erzählung im Nachhinein misstrauen**: Nach der Bewegung eine Erklärung zu finden, ist leicht. Die Bewegung vorherzusagen ist es nicht.",
        ],
      },
      {
        tip: "Ein Markt kann steigen, obwohl alle Nachrichten schlecht sind, und umgekehrt. Handeln Sie keine Makromeinung gegen einen Chart, der das Gegenteil zeigt.",
      },
      {
        p: "Um den Überblick zu behalten, notieren Sie vor der Sitzung in wenigen Zeilen: Richtung des Dollars, Trend der Zinsen, nächste Meldung. Die [spezialisierte Gold-Analyse](/gold) von Scanzivo liest Ihren Screenshot mit goldspezifischen Regeln: runde Marken, Sitzungen, US-Veröffentlichungen. Sie kann sich irren wie jede Einschätzung: Sie hilft zu strukturieren, nicht vorherzusagen.",
      },
      {
        p: "Dieser Leitfaden dient der Information und stellt keine Anlageberatung dar. CFDs sind komplexe Produkte, die mit einem hohen Risiko eines Kapitalverlusts verbunden sind, und keine makroökonomische Erklärung garantiert die Richtung des Preises.",
      },
    ],
  },
  {
    key: "taille-de-lot-xau-usd",
    slug: "lotgroesse-gold-berechnen",
    title: "Lotgröße bei Gold (XAU/USD) berechnen",
    description:
      "Wert pro Punkt bei Gold, Kontraktgröße, Zahlenbeispiel in Euro mit 1 % Risiko: die Methode zur Berechnung des Lots und warum Sie beim Broker nachprüfen müssen.",
    date: "2026-11-19",
    body: [
      {
        p: "So berechnen Sie Ihre Lotgröße bei Gold: Betrag, den Sie zu verlieren bereit sind ÷ (Stop-Abstand in Dollar × Unzen pro Lot). Bei vielen Brokern entspricht 1 Lot Gold 100 Unzen, das gilt aber nicht überall: **Kontraktgröße und Pip-Wert hängen vom Broker ab. Prüfen Sie sie auf Ihrer Plattform, bevor Sie rechnen.**",
      },
      { h2: "Was Sie vor der Berechnung wissen müssen" },
      {
        ul: [
          "**Die Kontraktgröße**: wie viele Unzen 1 Lot entspricht. Oft 100, manchmal 1.000 oder weniger, je nach Instrument und Broker.",
          "**Das Mindestlot**: oft 0,01 Lot, manchmal mehr.",
          "**Die Kontowährung**: Läuft Ihr Konto in Euro, werden Gewinn oder Verlust, in Dollar berechnet, zum aktuellen EUR/USD-Kurs umgerechnet.",
          "**Die Definition des „Pips“ bei Gold**: Sie variiert. Manche Broker sprechen von einem Pip zu 0,10 $, andere von einem Punkt zu 0,01 $. Um Verwirrung zu vermeiden, rechnen Sie in **Dollar Kursbewegung**.",
        ],
      },
      {
        p: "Auf Ihrer Plattform liefert das Instrumentenblatt („Kontraktspezifikationen“) diese Werte. Eine weitere Kontrolle: Eröffnen Sie eine Demo-Position mit dem Mindestlot, verschieben Sie den Kurs gedanklich um 1 $ und sehen Sie sich die angezeigte Ergebnisänderung an.",
      },
      { h2: "Die Formel" },
      {
        p: "Bei einem Kontrakt von 100 Unzen pro Lot ändert eine Kursbewegung von 1 $ das Ergebnis um 100 $ pro Lot. Die allgemeine Formel ist die aus [Positionsgröße berechnen](/blog/positionsgroesse-berechnen):",
      },
      {
        ol: [
          "**Riskierter Betrag** = Kapital × Risikoprozentsatz.",
          "**Verlust pro Lot** = Stop-Abstand in $ × Unzen pro Lot (in Euro umgerechnet, wenn das Konto in Euro läuft).",
          "**Lotgröße** = riskierter Betrag ÷ Verlust pro Lot.",
        ],
      },
      { h2: "Zahlenbeispiel (zur Veranschaulichung)" },
      {
        p: "Die folgenden Zahlen sind **ein Beispiel**, weder eine Empfehlung noch ein Marktpreis. Annahmen: Konto mit 5.000 €, Risiko 1 %, Kontrakt mit 100 Unzen pro Lot, EUR/USD bei 1,10, Stop 10 $ vom Einstieg entfernt.",
      },
      {
        ul: [
          "Riskierter Betrag: 5.000 € × 1 % = **50 €**, etwa 55 $.",
          "Verlust für 1 Lot bei ausgelöstem Stop: 10 $ × 100 Unzen = 1.000 $, etwa 909 €.",
          "Lotgröße: 55 $ ÷ 1.000 $ = **0,055 Lot**.",
          "Es wird **abgerundet**: 0,05 Lot. Wird der Stop ausgelöst, beträgt der Verlust etwa 50 $, also knapp unter 46 €, damit unter dem geplanten Risiko.",
        ],
      },
      {
        p: "Mit einem weiteren Stop ergibt dieselbe Methode eine kleinere Position. Stop bei 20 $: 55 $ ÷ 2.000 $ = 0,0275 Lot, abgerundet 0,02 Lot. Der Stop bestimmt die Größe, nie umgekehrt.",
      },
      { h2: "Und wenn die Rechnung unter dem Mindestlot liegt?" },
      {
        p: "Mit einem kleinen Konto kann die Rechnung 0,008 Lot ergeben, obwohl das Minimum 0,01 beträgt. Dann eröffnen Sie trotzdem und riskieren mehr als geplant. Die ehrlichen Optionen: den Stop-Abstand verkleinern, wenn der Chart es zulässt, einen Broker mit kleinerem Kontrakt suchen oder den Trade auslassen. Erzwingen Sie die Größe nicht, nur um „trotzdem einzusteigen“.",
      },
      { h2: "Spread und Slippage nicht vergessen" },
      {
        p: "Ihr realer Verlust kann den theoretischen Stop übersteigen: Der Spread kommt beim Einstieg und beim Ausstieg dazu, und bei einer Meldung kann der Kurs das Stop-Level überspringen. Lassen Sie in Ihrer Rechnung einen kleinen Puffer und meiden Sie schwere Positionen rund um die Statistiken ([der Fall NFP und Fed](/blog/gold-nfp-fed)).",
      },
      { h2: "Wohin kommt der Stop, bevor Sie rechnen?" },
      {
        p: "Der Stop wird nach dem Chart gesetzt, nicht nach dem Betrag, den Sie riskieren möchten. Bei Gold sollte er in der Regel über die jüngsten Dochte und das Level hinausgehen, das Ihre Idee ungültig machen würde. Lesen Sie [Stop-Loss richtig setzen](/blog/stop-loss-richtig-setzen). Ein Stop von 3 $ in einem Markt, der sich in wenigen Minuten um 10 $ bewegt, wird fast immer ausgelöst.",
      },
      {
        p: "Die [KI-Analyse für Gold](/gold) schlägt aus Ihrem Screenshot einen Plan mit Zahlen für Einstieg, Stop und Ziele vor. Die Lotgröße berechnen Sie selbst, mit den Werten Ihres Brokers und Ihrem eigenen Risikoprozentsatz.",
      },
      {
        p: "Dieser Leitfaden dient der Information und stellt keine Anlageberatung dar. Die Zahlenbeispiele dienen der Veranschaulichung. CFDs sind mit einem hohen Risiko eines Kapitalverlusts verbunden, der bei starken Schwankungen den vorgesehenen Betrag übersteigen kann.",
      },
    ],
  },
  {
    key: "trader-l-or-cfd-risques",
    slug: "gold-cfd-risiken",
    title: "Gold per CFD handeln: Hebel, Spread, Swap und die echten Risiken",
    description:
      "Was ein Gold-CFD ist, wie Hebel, Spread, Swap und Nachschusspflicht funktionieren und was Sie wirklich riskieren. Ohne Gewinnversprechen.",
    date: "2026-11-19",
    body: [
      {
        p: "Ein Gold-CFD ist ein Vertrag mit einem Broker über die Kursdifferenz von XAU/USD. Er erlaubt es, mit Hebel auf steigende oder fallende Kurse zu setzen. Der Hebel verstärkt Gewinne wie Verluste: Sie können schnell Ihre gesamte Einlage oder einen großen Teil davon verlieren. Viele Privatkonten verlieren bei diesen Produkten Geld.",
      },
      { h2: "Was ist ein Gold-CFD?" },
      {
        p: "CFD steht für Differenzkontrakt. Sie besitzen keinen Barren: Sie tauschen mit dem Broker die Differenz zwischen Eröffnungs- und Schlusskurs. Kaufen Sie bei 2.400 und schließen bei 2.410, gewinnen Sie zehn Dollar je Unze des Kontrakts. Fällt der Kurs auf 2.390, verlieren Sie sie. Beim Leerverkauf gilt das Umgekehrte.",
      },
      { h2: "Der Hebel: ein Verstärker in beide Richtungen" },
      {
        p: "Der Hebel erlaubt es, eine Position zu eröffnen, die deutlich größer ist als Ihre Einlage. Bei Hebel 20 braucht eine Position von 20.000 $ nur rund 1.000 $ Margin. Aber der **Verlust wird auf die gesamte Positionsgröße berechnet**, nicht auf die Margin. Eine Bewegung von 1 % gegen Sie kostet in diesem Beispiel 200 $, also 20 % der eingesetzten Margin.",
      },
      {
        p: "Der maximal erlaubte Hebel für Privatkunden ist in der Europäischen Union begrenzt, doch diese Grenze bleibt bei einem so bewegten Markt wie Gold hoch. Der Schutz ist Ihre Positionsgröße, nicht der verfügbare Hebel: Lesen Sie [Lotgröße bei Gold berechnen](/blog/lotgroesse-gold-berechnen).",
      },
      { h2: "Der Spread: ein Kostenfaktor beim Einstieg" },
      {
        p: "Der Spread ist die Differenz zwischen Kauf- und Verkaufspreis. Jeder Trade beginnt also leicht im Minus. Bei Gold schwankt er: eng mitten in der Sitzung, weiter bei der Eröffnung, beim Freitagsschluss und rund um Meldungen. Handeln Sie kleine Bewegungen, belastet er Ihr Ergebnis stark. Schauen Sie ihn an, bevor Sie klicken.",
      },
      { h2: "Der Swap: die Kosten, eine Position über Nacht zu halten" },
      {
        p: "Halten Sie eine Position über den täglichen Handelsschluss Ihres Brokers hinaus, wird je nach Richtung der Position und den geltenden Zinsen eine Finanzierungsgebühr (der Swap) belastet oder gutgeschrieben. Oft ist er für beide Richtungen negativ. Für einen einzelnen Tag ist er gering, wird aber bei mehrwöchigen Positionen spürbar. Das Wochenende wird in der Regel am Mittwoch oder Freitag dreifach berechnet, je nach Broker: Prüfen Sie dessen Bedingungen.",
      },
      { h2: "Nachschusspflicht und Zwangsschließung" },
      {
        p: "Ihr Broker verlangt, dass Ihr Kapital die laufenden Verluste Ihrer Positionen deckt. Fällt das verfügbare Kapital unter eine bestimmte Schwelle, kann er Sie auffordern, Geld einzuzahlen (Margin Call) oder **Ihre Positionen automatisch schließen** (Stop-out), oft im ungünstigsten Moment. Privatanleger in der Europäischen Union genießen einen Schutz vor negativem Saldo, was nicht heißt, dass das Konto nicht leergeräumt werden kann.",
      },
      { h2: "Kurslücken (Gaps) und Slippage" },
      {
        p: "Ihr Stop ist keine Garantie für einen Ausstieg zu einem bestimmten Preis. Überspringt der Markt das Level (Meldung, Wiedereröffnung am Sonntag), wird die Order zum nächsten verfügbaren Preis ausgeführt, manchmal deutlich weiter weg. Das ist die Slippage. Manche Broker bieten garantierte Stops an, in der Regel gegen Aufpreis. Details zu den Meldungen in [Gold handeln bei NFP, CPI und Fed](/blog/gold-nfp-fed).",
      },
      { h2: "Die Risiken, die von Ihnen kommen" },
      {
        ul: [
          "**Zu große Positionen**: der wichtigste Faktor für Kontoverluste.",
          "**Die Weigerung, einen Verlust zu begrenzen**: Den Stop weiter wegzuschieben, macht aus einem kleinen Verlust einen großen.",
          "**Overtrading**: mehr Trades, mehr gezahlter Spread und mehr Fehler.",
          "**Rachetrading** nach einer Verlustserie.",
          "**Versprechen von außen**: Misstrauen Sie jedem Anbieter von Signalen, Robotern oder Schulungen, der regelmäßige Gewinne ankündigt ([KI-Trading-Bots und Betrug](/blog/ki-trading-bots-betrug)).",
        ],
      },
      { h2: "Wie Sie den Schaden begrenzen" },
      {
        ol: [
          "**Riskieren Sie pro Trade einen kleinen Prozentsatz**, oft zwischen 0,5 % und 1 % Ihres Kapitals ([Positionsgröße berechnen](/blog/positionsgroesse-berechnen)).",
          "**Setzen Sie immer einen Stop** an einer sinnvollen Stelle im Chart ([Stop-Loss richtig setzen](/blog/stop-loss-richtig-setzen)).",
          "**Verlangen Sie ein stimmiges Chance-Risiko-Verhältnis**, bevor Sie einsteigen ([Chance-Risiko-Verhältnis](/blog/chance-risiko-verhaeltnis)).",
          "**Meiden Sie wichtige Meldungen**, solange Sie Anfänger sind.",
          "**Beginnen Sie im Demokonto**, dann mit einem kleinen Betrag, dessen Verlust Ihr Leben nicht verändert.",
        ],
      },
      {
        p: "Analysewerkzeuge, auch die [auf Gold spezialisierte KI-Analyse](/gold), nehmen Ihnen diese Risiken nicht ab. Sie dienen dazu, einen Chart zu lesen und einen Plan zu strukturieren. Sie sagen den Preis nicht voraus.",
      },
      {
        p: "Dieser Leitfaden dient der Information und stellt keine Anlageberatung dar. CFDs sind komplexe Produkte, die wegen des Hebels mit einem hohen Risiko eines Kapitalverlusts verbunden sind. Die Mehrheit der Privatkonten verliert beim Handel damit Geld.",
      },
    ],
  },
  {
    key: "trader-l-or-nfp-fed",
    slug: "gold-nfp-fed",
    title: "Gold handeln bei NFP, CPI und Fed-Entscheidungen",
    description:
      "Fehlbewegungen, weitere Spreads, Slippage: wie Sie Gold an NFP-, CPI- und Fed-Tagen angehen und warum Abwarten oft eine gute Wahl ist.",
    date: "2026-11-19",
    body: [
      {
        p: "An Tagen mit NFP, CPI oder Fed-Entscheidung kann Gold binnen weniger Minuten um mehrere Dutzend Dollar schwanken, erst in die eine, dann in die andere Richtung. Der Spread weitet sich, und Stops werden weiter weg ausgeführt als geplant. Für die meisten Trader ist die beste Strategie, zum Zeitpunkt der Veröffentlichung nicht in einer Position zu sein und abzuwarten, bis sich der Markt beruhigt.",
      },
      { h2: "Von welchen Meldungen ist die Rede?" },
      {
        ul: [
          "**Der NFP (Non-Farm Payrolls)**: der US-Arbeitsmarktbericht, in der Regel am ersten Freitag des Monats um 14:30 Uhr MEZ veröffentlicht.",
          "**Der CPI**: der US-Verbraucherpreisindex, ein Maß der Inflation, einmal im Monat veröffentlicht, oft ebenfalls um 14:30 Uhr.",
          "**Die Fed-Entscheidungen (FOMC)**: Bekanntgabe des Leitzinses gegen 20:00 Uhr MEZ, gefolgt von einer Pressekonferenz, die den Markt ebenso bewegen kann wie die Entscheidung.",
          "**Weitere Statistiken**: PCE, Einzelhandelsumsätze, Aktivitätsindizes, Arbeitslosenanträge. Sie wirken meist weniger stark, doch Gold reagiert manchmal.",
        ],
      },
      {
        p: "Die genauen Termine und Zeiten stehen im [Wirtschaftskalender](/blog/wirtschaftskalender). Prüfen Sie sie jede Woche: Sie können sich ändern.",
      },
      { h2: "Warum Gold so stark reagiert" },
      {
        p: "Diese Zahlen verändern die Erwartungen an die US-Zinsen und damit an Dollar und Realzinsen, zwei Treiber von Gold ([Warum Gold steigt oder fällt](/blog/warum-gold-steigt-oder-faellt)). Der Preis reagiert nicht auf die Zahl allein, sondern auf ihre Abweichung von den Prognosen. Eine gute, schon eingepreiste Zahl kann nichts bewegen.",
      },
      { h2: "Die Fallen der folgenden Minute" },
      {
        ul: [
          "**Der sich weitende Spread**: Die Differenz zwischen Kauf und Verkauf kann sich vervielfachen, was jeden Einstieg teuer macht.",
          "**Die Slippage**: Ihr Stop wird zum verfügbaren Preis ausgeführt, nicht zu dem, den Sie gewählt haben.",
          "**Die Fehlbewegungen**: Ein erster heftiger Impuls wird in den folgenden Minuten oft teilweise zurückgenommen. In diesen Impuls einzusteigen heißt, das Hoch zu kaufen oder das Tief zu verkaufen.",
          "**Die Pending-Orders**: Eine Order auf jeder Seite (die sogenannte Straddle-Strategie) kann in beide Richtungen ausgelöst werden und zweimal verlieren.",
          "**Die verschwindende Liquidität**: Die Preise springen von einem Level zum anderen, ohne dazwischen gehandelt zu werden.",
        ],
      },
      { h2: "Drei vernünftige Arten, diese Tage anzugehen" },
      {
        ol: [
          "**Außen vor bleiben**: zum Zeitpunkt der Meldung keine offene Position haben und in den folgenden Minuten keine neue Order platzieren. Das ist die einfachste Option, und sie ist keine Schwäche.",
          "**Die Größe verringern**: Halten Sie eine Position, halbieren Sie sie oder verkleinern Sie sie stärker und setzen Sie einen weiteren Stop als üblich, wobei der Verlust berechnet bleibt ([Lotgröße bei Gold berechnen](/blog/lotgroesse-gold-berechnen)).",
          "**Die Reaktion abwarten und dann den Chart lesen**: die ersten 15 bis 30 Minuten verstreichen lassen, erkennen, wo sich der Markt beruhigt hat, und dann einen Retest eines gebrochenen Levels im 5- oder 15-Minuten-Chart suchen ([Zeitrahmen wählen](/blog/trading-zeiteinheit-waehlen)).",
        ],
      },
      {
        tip: "Haben Sie vor der Meldung eine Position im Gewinn, können Sie sie absichern, indem Sie sie schließen oder den Stop nachziehen. Entscheiden Sie in beiden Fällen vorher, nicht währenddessen.",
      },
      { h2: "Was tun, wenn Sie in der Bewegung stecken?" },
      {
        p: "Verschieben Sie Ihren Stop nach der Meldung nicht weiter weg, um „Luft zu lassen“. Der Plan wurde vorher gemacht, mit einem maximal akzeptierten Verlust. Wird der Stop ausgelöst, ist der Verlust, was er ist. Machen Sie eine Pause, bevor Sie einen Trade wieder aufnehmen: Entscheidungen unter Adrenalin sind selten die besten.",
      },
      { h2: "Die Woche vorbereiten" },
      {
        ul: [
          "Listen Sie am Sonntag die Meldungen der Woche auf und markieren Sie die Zeiten.",
          "Notieren Sie die wichtigen Level von Gold vor der Meldung (siehe [Gold: runde Marken](/blog/gold-runde-marken)).",
          "Legen Sie im Voraus fest, ob Sie an diesem Tag handeln, verkleinern oder außen vor bleiben.",
          "Vergleichen Sie nach der Meldung die tatsächliche Bewegung mit Ihrem Szenario: Das baut Ihre Erfahrung auf.",
        ],
      },
      {
        p: "Reichen Sie an einem Meldungstag einen Screenshot bei der [Gold-Analyse](/gold) ein, weist das Tool auf das Risiko von Fehlausbrüchen hin und kann zum Abwarten raten. Ein „abwarten“ ist eine gültige Antwort, kein Scheitern.",
      },
      {
        p: "Dieser Leitfaden dient der Information und stellt keine Anlageberatung dar. CFDs sind komplexe Produkte, die mit einem hohen Risiko eines Kapitalverlusts verbunden sind, besonders bei Wirtschaftsmeldungen.",
      },
    ],
  },
  {
    key: "niveaux-ronds-or",
    slug: "gold-runde-marken",
    title: "Unterstützung, Widerstand und runde Marken bei Gold",
    description:
      "So erkennen Sie die Level, die bei Gold zählen: Vielfache von 50 und 100 Dollar, frühere Hochs und Tiefs, Zonen statt Linien, und wie Sie Stop und Ziel platzieren.",
    date: "2026-11-19",
    body: [
      {
        p: "Bei Gold zählen die Vielfachen von 50 und 100 Dollar (2.400, 2.450, 2.500 ...), frühere Hochs und Tiefs und die Zonen, in denen der Kurs schon mehrmals reagiert hat. Zeichnen Sie sie als Zonen von einigen Dollar Breite, nicht als perfekte Linien.",
      },
      { h2: "Warum runde Zahlen eine Rolle spielen" },
      {
        p: "Trader denken in runden Zahlen. Viele setzen ihre Ziele, ihre Pending-Orders und ihre Stops auf oder nahe 2.400, 2.450 oder 2.500. Die Orders häufen sich um diese Preise, und der Markt zögert dort, prallt ab oder durchquert sie ruckartig. Das ist keine Magie: Es ist eine sich selbst erfüllende Erwartung, die bei Gold beobachtbar bleibt, weil sein Preis in einfachen Zahlen ausgedrückt wird.",
      },
      {
        p: "Die 100-$-Stufen sind die markantesten, die 50-$-Stufen folgen. Vielfache von 10 $ können im Intraday als Etappen dienen, wiegen aber weniger. Suchen Sie nicht bei jeder runden Zahl eine besondere Bedeutung: Ein Level, das der Markt nie berührt oder respektiert hat, hat keine besondere Wichtigkeit.",
      },
      { h2: "Frühere Hochs und Tiefs" },
      {
        p: "Am verlässlichsten bleibt, was der Kurs selbst gezeichnet hat. Ein altes Hoch wird zum Widerstand, ein altes Tief zur Unterstützung, und wenn sie gebrochen werden, können sie die Rolle wechseln. Je öfter ein Level getestet wurde und je lesbarer die Historie in einem höheren Zeitrahmen ist, desto mehr zählt es. Die Grundlagen stehen in [Unterstützung und Widerstand](/blog/unterstuetzung-und-widerstand).",
      },
      {
        ul: [
          "**Hoch und Tief des Vortags**: sehr beachtete Orientierungspunkte im Intraday.",
          "**Hoch und Tief der asiatischen Sitzung**: Grenzen der Range vor der Londoner Eröffnung ([Die besten Handelszeiten für Gold](/blog/beste-handelszeiten-gold)).",
          "**Hoch und Tief der Woche**: Kontext-Level.",
          "**Historische Höchststände**: Nähert sich der Kurs ihnen, sind die Reaktionen oft stark und schnell.",
        ],
      },
      { h2: "Zonen, keine Linien" },
      {
        p: "Ein Level wird selten auf den Dollar genau respektiert. Gold durchsticht oft um einige Dollar, bevor es wieder abdreht. Zeichnen Sie daher ein Rechteck, das die Dochte umfasst, keinen feinen Strich. Im Stundenchart ist eine Zone von 5 bis 10 $ Breite üblich. Sie achten darauf, wo die Kerzen abgelehnt wurden und wie sie schließen ([Candlestick-Muster](/blog/candlestick-muster)).",
      },
      { h2: "Wenn sich eine runde Marke und ein technisches Level überlagern" },
      {
        p: "Der interessanteste Fall ist die Konfluenz: eine runde Zahl, die mit einem alten Hoch oder Tief zusammenfällt. Mehrere Gründe, an derselben Stelle zu reagieren, stärken die Zone. Entspricht 2.450 auch einem Wochenhoch der Vorwoche, verdient es genaue Beobachtung. Das bleibt eine Wahrscheinlichkeit, keine Gewissheit.",
      },
      { h2: "Wie Sie das für den Plan nutzen" },
      {
        ol: [
          "**Markieren Sie die Zonen** im 1-Stunden-Chart: zwei oder drei Level über, zwei oder drei unter dem Kurs.",
          "**Wählen Sie das Szenario**: Abprall an einer Unterstützung, Ausbruch durch einen Widerstand mit Retest oder Abwarten.",
          "**Setzen Sie den Stop jenseits der Zone**, nicht innerhalb und nicht genau auf die runde Zahl. Eine Zone bei 2.450 kann bis 2.453 überschritten werden, bevor der Kurs zurückkehrt: Ein Stop bei 2.449,5 wird für nichts ausgelöst ([Stop-Loss richtig setzen](/blog/stop-loss-richtig-setzen)).",
          "**Setzen Sie das Ziel kurz vor das nächste Level**, nicht darauf: Dort liegen viele Gewinnmitnahme-Orders, und der Kurs kann einige Dollar davor umdrehen.",
          "**Prüfen Sie das Chance-Risiko-Verhältnis**, sobald diese Zahlen stehen ([Chance-Risiko-Verhältnis](/blog/chance-risiko-verhaeltnis)).",
        ],
      },
      { h2: "Häufige Fehler" },
      {
        ul: [
          "**Zu viele Level einzeichnen**: Der Chart wird unlesbar. Behalten Sie die offensichtlichsten.",
          "**Bei der ersten Berührung einsteigen**, ohne ein Zeichen von Reaktion. Das Warten auf eine Ablehnungskerze oder einen Schluss jenseits verringert Fehlstarts.",
          "**Den Kontext vergessen**: Eine runde Marke wiegt gegen eine wichtige US-Meldung wenig ([Gold handeln bei NFP und Fed](/blog/gold-nfp-fed)).",
          "**Zeitrahmen mischen**, ohne zu wissen, welcher Vorrang hat: Das Level des 1-Stunden-Charts schlägt das des 5-Minuten-Charts.",
        ],
      },
      {
        p: "Die [KI-Analyse für Gold](/gold) zeichnet die Level in Ihren Screenshot ein und berücksichtigt dabei die runden Zahlen. Sie können sie mit Ihren eigenen Zonen vergleichen: Ist die Abweichung groß, fragen Sie sich warum, bevor Sie handeln.",
      },
      {
        p: "Dieser Leitfaden dient der Information und stellt keine Anlageberatung dar. Für kein Level ist garantiert, dass es respektiert wird. CFDs sind mit einem hohen Risiko eines Kapitalverlusts verbunden.",
      },
    ],
  },
  {
    key: "strategie-or-1h-15m-5m",
    slug: "gold-routine-1h-15m-5m",
    title: "Eine Intraday-Routine für Gold: 1 Stunde, 15 Minuten, 5 Minuten",
    description:
      "Richtung im 1-Stunden-Chart, Plan im 15-Minuten-Chart, Einstieg im 5-Minuten-Chart: eine Multi-Zeitrahmen-Routine für Gold, Schritt für Schritt erklärt, mit ihren Grenzen.",
    date: "2026-11-19",
    body: [
      {
        p: "Diese Routine geht vom größten zum kleinsten Rahmen: Sie lesen die Richtung im 1-Stunden-Chart, bauen den Plan im 15-Minuten-Chart und suchen den Einstieg im 5-Minuten-Chart. Ziel ist, kein 5-Minuten-Signal zu handeln, das gegen alles läuft, was der 1-Stunden-Chart zeigt. Das ist keine garantiert gewinnbringende Methode: Es ist ein Arbeitsrahmen.",
      },
      { h2: "Warum drei Zeitrahmen?" },
      {
        p: "Ein einzelner Chart liefert ein unvollständiges Bild. Der 5-Minuten-Chart rauscht bei Gold stark und kann einen Ausbruch zeigen, der nur eine weitere Bewegung in einem Abwärtstrend im 1-Stunden-Chart ist. Der 1-Stunden-Chart gibt den Kontext, aber nicht den genauen Einstiegspunkt. Zusammen beantworten die drei drei Fragen: wohin der Markt läuft, wo die Level liegen, wann Sie handeln. Lesen Sie auch [Zeitrahmen wählen](/blog/trading-zeiteinheit-waehlen).",
      },
      { h2: "Schritt 0: bevor Sie den Chart öffnen" },
      {
        ul: [
          "Prüfen Sie den Kalender: US-Meldung um 14:30 Uhr? Fed-Entscheidung heute Abend? ([Wirtschaftskalender](/blog/wirtschaftskalender)).",
          "Legen Sie Ihr Handelsfenster fest ([Die besten Handelszeiten für Gold](/blog/beste-handelszeiten-gold)).",
          "Bestimmen Sie Ihr maximales Risiko pro Trade und pro Tag, zum Beispiel 1 % pro Trade und höchstens drei Verluste, bevor Sie aufhören.",
        ],
      },
      { h2: "Schritt 1: die Richtung im 1-Stunden-Chart" },
      {
        p: "Schauen Sie auf die letzten Tage. Steigen die Hochs und Tiefs, fallen sie oder stagnieren sie in einer Range? Wo hat der Kurs schon mehrfach reagiert? Zeichnen Sie zwei oder drei Zonen darüber und darunter ein ([runde Marken und Unterstützungen bei Gold](/blog/gold-runde-marken)).",
      },
      {
        p: "Am Ende dieses Schritts sollten Sie einen Satz schreiben können: „Aufwärtstrend, der Kurs liegt unter dem Widerstand bei 2.450, Unterstützung bei 2.400.“ Gelingt Ihnen das nicht, ist der Markt nicht lesbar: Lassen Sie den Trade aus. Das ist eine gültige Antwort.",
      },
      { h2: "Schritt 2: der Plan im 15-Minuten-Chart" },
      {
        p: "Verfeinern Sie im 15-Minuten-Chart die für den Tag nützlichen Level und wählen Sie ein bevorzugtes Szenario, mit einem alternativen. Zum Beispiel: „Schließt der Kurs über 2.432, suche ich den Kauf mit einem Stop unter 2.418 und einem Ziel bei 2.450. Bricht 2.418, gebe ich die Idee auf.“ Die Zahlen sind hier ein Beispiel, kein Rat.",
      },
      {
        ul: [
          "**Schreiben Sie die Einstiegsbedingungen auf**, bevor der Kurs ankommt.",
          "**Setzen Sie den Stop** jenseits der Zone, nicht direkt daran ([Stop-Loss richtig setzen](/blog/stop-loss-richtig-setzen)).",
          "**Berechnen Sie das Chance-Risiko-Verhältnis**: Unter 1,5 oder 2 verdient die Idee Zweifel ([Chance-Risiko-Verhältnis](/blog/chance-risiko-verhaeltnis)).",
          "**Berechnen Sie die Lotgröße** nach dem Abstand zum Stop ([Lotgröße bei Gold berechnen](/blog/lotgroesse-gold-berechnen)).",
        ],
      },
      { h2: "Schritt 3: der Einstieg im 5-Minuten-Chart" },
      {
        p: "Der 5-Minuten-Chart dient dazu, den Zeitpunkt zu wählen, nicht die Richtung. Warten Sie, bis Ihre Bedingung eintritt: ein Schluss über einem Level, ein haltender Retest, eine Ablehnungskerze an einer Unterstützung ([Candlestick-Muster](/blog/candlestick-muster)). Zappelt der Kurs unter der Zone ohne Schluss darüber, warten Sie.",
      },
      {
        p: "Steigen Sie nicht mitten in eine davonziehende Kerze ein. Besser einen Trade verpassen, als einem Kurs hinterherzulaufen, der schon weg ist: Der Stop liegt dann zu weit entfernt und das Chance-Risiko-Verhältnis verschlechtert sich.",
      },
      { h2: "Schritt 4: das Management" },
      {
        ul: [
          "Sobald Sie in der Position sind, fassen Sie den Stop nicht an, außer um ihn in Trade-Richtung nachzuziehen, nach vorher festgelegten Regeln.",
          "Nehmen Sie an einem sinnvollen Level einen Teil des Gewinns mit, wenn Ihr Plan das vorsieht.",
          "Schließen Sie vor einer wichtigen Meldung, wenn Sie nicht geplant haben, sie zu überstehen ([NFP, CPI und Fed](/blog/gold-nfp-fed)).",
          "Notieren Sie den Trade samt Screenshot, ob Gewinn oder Verlust: Das ist Ihr Material zum Lernen.",
        ],
      },
      { h2: "Die Grenzen dieser Routine" },
      {
        ul: [
          "**Sie sagt nichts voraus**: Das bevorzugte Szenario irrt sich oft, und dafür ist der Stop da.",
          "**Sie setzt Disziplin voraus**: Einen Schritt zu überspringen oder einen Stop zu verschieben, hebt den Sinn der Methode auf.",
          "**Sie zählt nur, wenn Sie sie testen**: über mindestens mehrere Dutzend Trades im Demokonto oder mit kleiner Größe, mit einem Journal, bevor Sie ein Fazit ziehen.",
          "**Sie passt schlecht zu Meldungstagen**: Die übliche Struktur ist gestört.",
          "**Kosten zählen**: Spread und Swap schmälern das Ergebnis, vor allem bei kleinen Zielen ([Gold-CFD: Risiken](/blog/gold-cfd-risiken)).",
        ],
      },
      {
        p: "Dieser Logik folgt die [auf Gold spezialisierte Analyse](/gold): ein Screenshot pro Zeitrahmen, von der Richtung bis zum Einstieg, mit der möglichen Schlussfolgerung „abwarten“. Sie können sie auch von Hand durchführen und das Tool zum Vergleichen nutzen. Für gut lesbare Aufnahmen lesen Sie [Chart-Screenshot](/blog/chart-screenshot).",
      },
      {
        p: "Dieser Leitfaden dient der Information und stellt keine Anlageberatung dar. Die genannten Zahlen sind Beispiele. CFDs sind komplexe Produkte, die mit einem hohen Risiko eines Kapitalverlusts verbunden sind.",
      },
    ],
  },
  {
    key: "analyser-l-or-avec-l-ia",
    slug: "gold-mit-ki-analysieren",
    title: "Gold mit KI analysieren: Was sie liest und was nicht",
    description:
      "Was eine KI auf einem XAU/USD-Chart lesen kann (Trend, Marken, Plan), was sie nicht kann (vorhersagen, Echtzeit sehen) und wie Sie sie nutzen, ohne sich zu täuschen.",
    date: "2026-11-19",
    body: [
      {
        p: "Eine KI kann den Screenshot eines XAU/USD-Charts lesen wie ein Trader: den Trend erkennen, Marken finden, Kerzen beschreiben und einen Plan mit Einstieg, Stop und Zielen vorschlagen. Sie kann den Preis nicht vorhersagen, sieht nur das Bild, das Sie ihr geben, und ersetzt weder Ihr Urteil noch Ihr Risikomanagement.",
      },
      { h2: "Was eine KI auf einem Gold-Chart liest" },
      {
        ul: [
          "**Trend und Struktur**: Abfolge von Hochs und Tiefs, Range oder Ausbruch.",
          "**Level**: Zonen, in denen der Kurs reagiert hat, frühere Hochs und Tiefs, runde Zahlen ([runde Marken bei Gold](/blog/gold-runde-marken)).",
          "**Kerzen und Formationen**: Ablehnungsdochte, Engulfing, Fortsetzungsformationen ([Candlestick-Muster](/blog/candlestick-muster), [Chartformationen](/blog/chartformationen)).",
          "**Sichtbare Indikatoren**: RSI, gleitende Durchschnitte, wenn sie auf dem Screenshot zu sehen sind ([RSI](/blog/rsi-indikator)).",
          "**Einen Plan mit Zahlen**: Einstieg, Stop, Ziele und das Level, das die Idee ungültig machen würde.",
        ],
      },
      {
        p: "Der Nutzen liegt vor allem darin, Zeit zu sparen und eine zweite, begründete Lesart zu erhalten, die Sie mit Ihrer eigenen abgleichen können. Das allgemeine Prinzip erklärt [Technische Analyse mit KI](/blog/ki-technische-analyse).",
      },
      { h2: "Was eine KI nicht kann" },
      {
        ul: [
          "**Vorhersagen**: Sie wägt Szenarien ab. Das bevorzugte Szenario kann sich irren, und eine angezeigte Prozentzahl ist keine garantierte statistische Wahrscheinlichkeit.",
          "**Echtzeit sehen**: Sie kennt nur Ihren Screenshot. Hat sich der Kurs seither bewegt, ist die Lesart überholt.",
          "**Ein unlesbares Bild lesen**: abgeschnittene Preisachse, überladener Chart oder unscharfer Screenshot verschlechtern die Antwort ([Chart-Screenshot](/blog/chart-screenshot)).",
          "**Ihre Situation kennen**: Ihr Kapital, Ihre Risikobereitschaft, Ihre Kosten, Ihren Broker. Sie platziert keine Orders und verwaltet kein Geld.",
          "**Disziplin ersetzen**: Eine gute Lesart, gefolgt von einer zu großen Position, bleibt eine schlechte Idee.",
        ],
      },
      { h2: "Warum Gold eigene Einstellungen verlangt" },
      {
        p: "Gold ist weder eine Aktie noch ein Währungspaar wie jedes andere. Es ist sehr beweglich, reagiert stark auf US-Statistiken, und runde Zahlen spielen dort eine sichtbare Rolle. Eine generische Lesart kann einen Stop zu nah setzen oder übersehen, dass eine Meldung ansteht. Das ist der Grund für eine auf Gold abgestimmte Analyse ([Gold handeln](/blog/gold-handeln-xau-usd)).",
      },
      { h2: "Die Gold-Analyse von Scanzivo" },
      {
        p: "Scanzivo bietet eine [spezialisierte Gold-Analyse](/gold). Sie senden einen Screenshot Ihres XAU/USD-Charts, auf welcher Plattform auch immer (TradingView, MetaTrader, cTrader oder Broker-App). Die Analyse folgt goldspezifischen Vorgaben: runde Zahlen, Sitzungen, US-Statistiken, Stops jenseits der jüngsten Dochte. Das KI-Modell selbst ist dasselbe wie bei den anderen Werten. Die Analyseroutine mit drei Screenshots ist in [der Routine 1 Stunde, 15 Minuten, 5 Minuten](/blog/gold-routine-1h-15m-5m) beschrieben.",
      },
      {
        p: "Was der Dienst nicht tut: Er sagt den Preis nicht voraus, platziert keine Orders, verschickt keine Signale und gibt keine persönliche Anlageberatung.",
      },
      { h2: "Wie Sie sie klug nutzen" },
      {
        ol: [
          "**Machen Sie zuerst Ihre eigene Lesart**, in wenigen Zeilen: Richtung, Level, Szenario.",
          "**Senden Sie dann den Screenshot** und vergleichen Sie. Eine Übereinstimmung beweist nichts, eine Abweichung lädt zum genaueren Hinsehen ein.",
          "**Prüfen Sie die Level in Ihrem Chart**: Die KI kann eine Linie falsch setzen. Sie sind der letzte Prüfer.",
          "**Kontrollieren Sie den Kalender**: Eine nahe Meldung ändert alles ([NFP, CPI und Fed](/blog/gold-nfp-fed)).",
          "**Berechnen Sie Ihre Größe selbst** mit Ihren Daten ([Lotgröße bei Gold berechnen](/blog/lotgroesse-gold-berechnen)).",
          "**Führen Sie ein Journal**, um auf Dauer zu sehen, ob die Lesart Ihnen hilft oder nicht.",
        ],
      },
      {
        tip: "Kommt die Analyse zu dem Schluss, dass Abwarten besser ist, ist das eine nützliche Information. Ein Tool, das immer einen Trade findet, sollte Sie beunruhigen.",
      },
      { h2: "Die schlechten Gründe, eine KI zu nutzen" },
      {
        ul: [
          "Um nicht mehr lernen zu müssen, einen Chart zu lesen.",
          "Um um jeden Preis einen Trade zu finden, wenn der Markt nichts bietet.",
          "Um eine bereits eingegangene Position zu rechtfertigen.",
          "Weil eine Quelle regelmäßige Ergebnisse verspricht: Seien Sie misstrauisch ([KI-Trading-Bots und Betrug](/blog/ki-trading-bots-betrug)).",
        ],
      },
      {
        p: "Als Denkhilfe genutzt, kann die KI Ihre Routine beschleunigen und Ihnen zeigen, was Sie übersehen haben. Als Kristallkugel wird sie Sie Geld kosten.",
      },
      {
        p: "Dieser Leitfaden dient der Information und stellt keine Anlageberatung dar. Die KI-Analyse garantiert kein Ergebnis. CFDs sind komplexe Produkte, die mit einem hohen Risiko eines Kapitalverlusts verbunden sind.",
      },
    ],
  },
];
