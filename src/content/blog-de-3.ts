import type { Article } from "./blog";

/** German technical guides; `key` is the French slug. Examples use euros and Central European Time. */
export const ARTICLES_DE_3: Omit<Article, "locale">[] = [
  {
    key: "macd-indicateur",
    slug: "macd-indikator",
    title: "MACD-Indikator lesen: Signallinie, Histogramm und Divergenzen",
    description:
      "Die zwei Linien, das Histogramm, Kreuzungen und Divergenzen des MACD, mit Zahlenbeispiel und den Grenzen, die Sie kennen sollten, bevor Sie sich darauf verlassen.",
    date: "2026-11-19",
    body: [
      {
        p: "Der MACD (Moving Average Convergence Divergence) misst den Abstand zwischen zwei exponentiellen gleitenden Durchschnitten. Er zeigt, ob der Schwung eines Marktes zunimmt oder nachlässt. Er sagt nichts voraus: Er fasst die Geschwindigkeit des aktuellen Trends zusammen. Allein verwendet, liefert er viele Fehlsignale.",
      },
      { h2: "Wie ist der MACD aufgebaut?" },
      {
        p: "Mit den klassischen Einstellungen (12, 26, 9) besteht der Indikator aus drei Elementen, die unterhalb des Kurschartes angezeigt werden.",
      },
      {
        ul: [
          "**Die MACD-Linie**: der exponentielle Durchschnitt über 12 Perioden minus der über 26 Perioden. Ist sie positiv, liegt der kurze Durchschnitt über dem langen.",
          "**Die Signallinie**: der exponentielle Durchschnitt über 9 Perioden der MACD-Linie. Sie reagiert langsamer.",
          "**Das Histogramm**: der Abstand zwischen MACD-Linie und Signallinie. Es liegt über null, wenn der MACD über seiner Signallinie steht, sonst darunter.",
        ],
      },
      {
        p: "Diese Einstellungen stammen aus der Zeit der Sechstagewoche an der Börse. Sie müssen sie nicht beibehalten. Es sind aber die Werte, auf die die meisten Trader schauen, und deshalb zählen sie am meisten.",
      },
      { h2: "Was bedeutet eine MACD-Kreuzung?" },
      {
        p: "Kreuzt die MACD-Linie die Signallinie von unten nach oben, gewinnt der Aufwärtsschwung die Oberhand: ein bullisches Kreuzsignal. Kreuzt sie von oben nach unten, ist es ein bärisches. Im Histogramm entspricht das dem Moment, in dem die Balken die Nulllinie durchqueren.",
      },
      {
        p: "Ein weiterer Anhaltspunkt ist der Nulldurchgang der MACD-Linie selbst. Über null liegt der kurze Durchschnitt über dem langen: Der Markt tendiert eher nach oben. Darunter eher nach unten.",
      },
      {
        p: "**Beispiel (zur Veranschaulichung):** Ein Wert steigt seit drei Wochen, die MACD-Linie ist positiv. Der Kurs macht eine Pause, das Histogramm schrumpft, dann kreuzt die MACD-Linie ihre Signallinie nach unten. Das heißt nicht, dass der Anstieg vorbei ist. Es heißt, dass der Schwung nachgelassen hat. Prüfen Sie, ob der Kurs eine Unterstützung hält, bevor Sie Schlüsse ziehen.",
      },
      { h2: "Wie liest man das MACD-Histogramm?" },
      {
        p: "Auf die Balken kommt es an, nicht nur auf ihre Farbe. Wachsende positive Balken zeigen einen Anstieg, der Tempo aufnimmt. Kürzer werdende positive Balken zeigen einen Anstieg, der langsamer wird, auch wenn der Kurs noch steigt. Das Histogramm kündigt die Kreuzung oft einige Kerzen vor ihrem Eintreten an.",
      },
      { h2: "Was ist eine MACD-Divergenz?" },
      {
        p: "Von einer Divergenz spricht man, wenn Kurs und Indikator zwei verschiedene Geschichten erzählen.",
      },
      {
        ul: [
          "**Bärische Divergenz**: Der Kurs erreicht ein neues Hoch, der MACD aber ein niedrigeres Hoch. Der Anstieg läuft mit weniger Schwung.",
          "**Bullische Divergenz**: Der Kurs fällt auf ein neues Tief, der MACD bildet ein höheres Tief. Der Rückgang verliert an Kraft.",
        ],
      },
      {
        p: "Das ist ein Warnsignal, kein Einstiegssignal. Eine Divergenz kann sehr lange bestehen, während der Kurs weiter in dieselbe Richtung läuft. Viele Trader warten, bis ein Strukturbruch oder eine Umkehrkerze sie bestätigt. Zu diesen Kerzen lesen Sie die [Candlestick-Muster](/blog/candlestick-muster).",
      },
      { h2: "Wo liegen die Grenzen des MACD?" },
      {
        ul: [
          "**Er hinkt hinterher.** Er wird aus gleitenden Durchschnitten berechnet, also aus vergangenen Kursen. Die Kreuzung kommt oft erst, wenn die Bewegung schon läuft.",
          "**Er irrt in der Range.** Pendelt der Kurs ohne Richtung, kreuzen sich die Linien ständig und erzeugen eine Serie von Fehlsignalen. Wo Sie stehen, klärt [Trend oder Range](/blog/trend-oder-range).",
          "**Er liefert weder Marke noch Stop.** Er sagt nicht, wo Sie einsteigen, aussteigen oder Ihren Schutz platzieren. Dafür brauchen Sie einen Chart mit [Unterstützung und Widerstand](/blog/unterstuetzung-und-widerstand).",
          "**Er hängt vom Zeitrahmen ab.** Ein bullisches Kreuzsignal im 5-Minuten-Chart kann neben einem Abwärtstrend im 4-Stunden-Chart bestehen. Lesen Sie dazu, wie Sie den [Zeitrahmen wählen](/blog/trading-zeiteinheit-waehlen).",
        ],
      },
      { h2: "Wie kombiniert man den MACD mit anderen Werkzeugen?" },
      {
        p: "Der MACD misst den Schwung, der [RSI](/blog/rsi-indikator) misst die Übertreibung, die [gleitenden Durchschnitte](/blog/gleitende-durchschnitte) geben die Richtung vor. Keiner ersetzt das Lesen des Kurses selbst. Eine einfache Routine: Erkennen Sie zuerst die Struktur (Trend, Unterstützungen, Widerstände) und prüfen Sie dann, ob der MACD bestätigt oder widerspricht. Widerspricht er, heißt das nicht „nichts tun“, sondern: kleiner einsteigen oder abwarten. Zur Größe lesen Sie [Positionsgröße berechnen](/blog/positionsgroesse-berechnen).",
      },
      { tip: "Wenn Sie am Anfang stehen, fügen Sie immer nur einen Indikator hinzu. Beobachten Sie ihn an zwanzig vergangenen Charts, bevor Sie ihm in einer Entscheidung Gewicht geben." },
      { h2: "Und wenn Sie Ihren Chart schnell einschätzen lassen möchten?" },
      {
        p: "[Scanzivo](/) liest den Screenshot eines Charts, mit oder ohne eingeblendete Indikatoren, und schlägt Marken und einen nummerierten Plan vor. Sie können prüfen, was das Tool zum MACD sagt, und es mit Ihrer eigenen Einschätzung vergleichen. Das ist eine gute Übung.",
      },
      {
        p: "Dieser Inhalt dient der Information und stellt keine Anlageberatung dar. Trading ist mit dem Risiko eines Kapitalverlusts verbunden, der bis zum Totalverlust des eingesetzten Betrags reichen kann.",
      },
    ],
  },
  {
    key: "moyennes-mobiles",
    slug: "gleitende-durchschnitte",
    title: "Gleitende Durchschnitte: GD20, GD50, GD200, Kreuzungen und Grenzen",
    description:
      "Was ein gleitender Durchschnitt berechnet, der Unterschied zwischen SMA und EMA, die Rolle von GD20, GD50 und GD200 und warum Kreuzungen in der Range täuschen.",
    date: "2026-11-19",
    body: [
      {
        p: "Ein gleitender Durchschnitt glättet die Schlusskurse über einen bestimmten Zeitraum, damit die Richtung sichtbar wird. Er sagt nichts voraus: Er beschreibt, was passiert ist. Seine Stärke ist, einen Trend lesbar zu machen. Seine Schwäche ist, dass er zu spät kommt.",
      },
      { h2: "Wie funktioniert ein gleitender Durchschnitt?" },
      {
        p: "Ein gleitender Durchschnitt über 20 Perioden addiert die letzten 20 Schlusskurse und teilt durch 20. Mit jeder neuen Kerze fällt die älteste aus der Rechnung und die neue kommt hinzu: Die Linie „wandert“. Im Stundenchart deckt der GD20 die letzten 20 Stunden ab. Im Tageschart die letzten 20 Tage.",
      },
      { h2: "Was ist der Unterschied zwischen SMA und EMA?" },
      {
        ul: [
          "**SMA (einfach)**: Alle Schlusskurse zählen gleich. Die Linie ist ruhig, reagiert aber spät.",
          "**EMA (exponentiell)**: Aktuelle Schlusskurse zählen stärker. Die Linie liegt näher am Kurs und reagiert schneller, dafür gibt es mehr Fehlstarts.",
        ],
      },
      {
        p: "Keiner ist an sich besser. Auf demselben Chart ist der Abstand zwischen beiden oft klein. Wichtiger ist Konsequenz: Wechseln Sie die Art des Durchschnitts nicht bei jedem Trade, nur damit die Geschichte passt.",
      },
      { h2: "Wofür dienen GD20, GD50 und GD200?" },
      {
        p: "Das sind die am häufigsten beobachteten Perioden, also die, auf die viele Marktteilnehmer gleichzeitig schauen.",
      },
      {
        ul: [
          "**GD20**: der kurze Zeithorizont. In einem gesunden Trend entfernt sich der Kurs davon und kehrt oft zurück, um ihn zu berühren.",
          "**GD50**: der mittlere Zeithorizont. Oft die Rücklaufzone in einem etablierten Trend.",
          "**GD200**: der lange Zeithorizont. Ein Kurs darüber gilt meist als grundsätzlich steigender Markt, darunter als fallender. Im Tageschart wird er am meisten beachtet.",
        ],
      },
      {
        p: "**Beispiel (zur Veranschaulichung):** Ein Wert liegt über GD20, GD50 und GD200, und alle drei zeigen nach oben, in dieser Reihenfolge. Der Kurs fällt zurück zum GD50 und bildet dort eine Ablehnungskerze. Viele Trader sehen darin eine interessante Zone. Eine Garantie ist das nicht: Schließt der Kurs deutlich unter dem GD50, muss das Szenario überprüft werden.",
      },
      { h2: "Was ist eine Kreuzung gleitender Durchschnitte?" },
      {
        p: "Zieht ein kurzer Durchschnitt über einen langen, ist das eine bullische Kreuzung. Das Gegenteil ist eine bärische Kreuzung. Am Aktienmarkt am bekanntesten ist die zwischen GD50 und GD200: Man spricht vom „Golden Cross“, wenn der GD50 darüber zieht, und vom „Death Cross“, wenn er darunter fällt.",
      },
      {
        p: "Diese Namen sind spektakulär, nicht magisch. Die Kreuzung findet lange nach dem Beginn der Bewegung statt, weil zwei Durchschnitte schon Vergangenheit sind. Oft bestätigt sie einen Trend, der bereits einen guten Teil seines Weges hinter sich hat.",
      },
      { h2: "Wo liegen die Grenzen gleitender Durchschnitte?" },
      {
        ul: [
          "**Die Verzögerung.** Je länger der Zeitraum, desto später kommt das Signal.",
          "**Die Range.** Bewegt sich der Kurs ohne Richtung, durchquert er den Durchschnitt in beide Richtungen, und jede Durchquerung sieht wie ein Signal aus. Dort kosten sie am meisten. Lesen Sie [Trend oder Range](/blog/trend-oder-range).",
          "**Keine genaue Marke.** Der Durchschnitt ist eine Zone, keine exakte Linie. Ein Stop direkt darauf wird oft ausgelöst.",
          "**Der Optimierungseffekt.** Im Nachhinein findet man immer die Periode, die gut funktioniert hätte. Über die Zukunft sagt das nichts.",
        ],
      },
      { h2: "Wie nutzt man sie, ohne in die Falle zu tappen?" },
      {
        ol: [
          "**Erkennen Sie den Trend** in einem höheren Zeitrahmen (siehe [Zeitrahmen wählen](/blog/trading-zeiteinheit-waehlen)).",
          "**Achten Sie auf die Neigung.** Ein flacher Durchschnitt zeigt einen Markt ohne Trend: Die Signale verlieren an Wert.",
          "**Suchen Sie die Konfluenz**: Ein GD50, der mit einer horizontalen Unterstützung zusammenfällt, hat mehr Gewicht als ein GD50 allein. Lesen Sie [Unterstützung und Widerstand](/blog/unterstuetzung-und-widerstand).",
          "**Legen Sie die Ungültigkeit fest**: wo Ihre Idee falsch ist, mit einem Stop (siehe [Stop-Loss richtig setzen](/blog/stop-loss-richtig-setzen)).",
        ],
      },
      {
        p: "Gleitende Durchschnitte lassen sich gut mit dem [MACD](/blog/macd-indikator) kombinieren, der selbst aus Durchschnitten besteht, und mit den [Bollinger-Bändern](/blog/bollinger-baender), deren Mittellinie ein GD20 ist.",
      },
      { tip: "Um zu wissen, ob der GD200 bei Ihrem Wert zählt, schauen Sie, ob der Kurs in der Vergangenheit schon darauf reagiert hat. Wenn nicht, ist er nur eine Linie mehr." },
      {
        p: "Wenn Sie eine zweite Meinung zu einem Chart voller Linien möchten: [Scanzivo](/) liest Ihren Screenshot, trennt das Wesentliche (Marken, Trend) vom Überflüssigen und schlägt einen nummerierten Plan vor, den Sie infrage stellen können.",
      },
      {
        p: "Dieser Inhalt dient der Information und stellt keine Anlageberatung dar. Trading ist mit dem Risiko eines Kapitalverlusts verbunden, der bis zum Totalverlust des eingesetzten Betrags reichen kann.",
      },
    ],
  },
  {
    key: "bandes-de-bollinger",
    slug: "bollinger-baender",
    title: "Bollinger-Bänder: Was sie messen und wie Sie sie lesen",
    description:
      "Aufbau der Bänder, Lesen der Bandbreite, Squeeze und warum die Berührung eines Bandes weder Kauf- noch Verkaufssignal ist.",
    date: "2026-11-19",
    body: [
      {
        p: "Die Bollinger-Bänder legen zwei Hüllkurven um den Kurs. Sie weiten sich, wenn die Volatilität steigt, und ziehen sich zusammen, wenn sie sinkt. Sie messen, wie stark der Kurs um seinen Durchschnitt streut. Sie sagen nicht, wohin der Markt läuft, und die Berührung eines Bandes ist kein Umkehrsignal.",
      },
      { h2: "Wie sind die Bollinger-Bänder aufgebaut?" },
      {
        p: "Die klassische Einstellung ist (20, 2) und ergibt drei Linien.",
      },
      {
        ul: [
          "**Das mittlere Band**: ein einfacher gleitender Durchschnitt über 20 Perioden (siehe [gleitende Durchschnitte](/blog/gleitende-durchschnitte)).",
          "**Das obere Band**: das mittlere Band plus 2 Standardabweichungen der letzten 20 Schlusskurse.",
          "**Das untere Band**: das mittlere Band minus 2 Standardabweichungen.",
        ],
      },
      {
        p: "Die Standardabweichung misst, wie weit sich die Kurse von ihrem Durchschnitt entfernen. Je größer und unruhiger die Kerzen, desto höher ist sie und desto weiter gehen die Bänder auseinander. Bei 2 Standardabweichungen bewegt sich der Kurs meistens zwischen den beiden Bändern, aber nicht immer: Er verlässt sie regelmäßig, und genau das ist die Falle.",
      },
      { h2: "Was sagt die Breite der Bänder?" },
      {
        p: "Die Breite zählt mehr als die Lage des Kurses. Breite Bänder zeigen eine hohe Volatilität, zum Beispiel nach einer Meldung oder in einem starken Trend. Enge Bänder zeigen einen ruhigen Markt. Die Volatilität wechselt: Auf eine ruhige Phase folgt oft eine unruhige, und umgekehrt. Das ist der nützlichste Gedanke dieses Werkzeugs.",
      },
      { h2: "Was ist ein Bollinger-Squeeze?" },
      {
        p: "Beim Squeeze ziehen sich die Bänder auf ein im Vergleich zu den letzten Wochen niedriges Niveau zusammen. Er zeigt, dass die Volatilität gering ist und eine Ausweitung kommen könnte. Über die Richtung sagt er nichts.",
      },
      {
        p: "**Beispiel (zur Veranschaulichung):** Im Stundenchart bewegt sich der Kurs zwei Tage lang in einem engen Korridor, die Bänder rücken zusammen. Dann schließt eine große Kerze über dem oberen Band, die Bänder öffnen sich, das Volumen steigt. Das kann der Beginn einer Bewegung sein oder ein falscher Ausbruch, der in den Korridor zurückkehrt. Lesen Sie deshalb den Artikel zum [Fehlausbruch](/blog/fehlausbruch), bevor Sie auf ein solches Signal handeln.",
      },
      { h2: "Ist die Berührung des oberen Bandes ein Verkaufssignal?" },
      {
        p: "Nein. Das ist der häufigste Irrtum. In einem starken Trend kann der Kurs viele Kerzen lang am oberen Band entlanglaufen: Man sagt, er „läuft auf dem Band“. Bei jeder Berührung zu verkaufen hieße, sich immer wieder gegen den Trend zu stellen.",
      },
      {
        p: "In einem Markt ohne Richtung dagegen taugen die Bänder gut als Orientierung: Der Kurs springt nach der Berührung eines Randes oft zurück zur Mitte. Alles hängt vom Kontext ab, deshalb müssen Sie wissen, ob Trend oder Range vorliegt (siehe [Trend oder Range](/blog/trend-oder-range)).",
      },
      { h2: "Welche Fehler sollten Sie mit Bollinger-Bändern vermeiden?" },
      {
        ul: [
          "**Sie als Unterstützung und Widerstand lesen.** Sie bewegen sich mit jeder Kerze. Eine echte Marke ist horizontal und wurde schon getestet; lesen Sie [Unterstützung und Widerstand](/blog/unterstuetzung-und-widerstand).",
          "**Den Trend ignorieren.** Dieselben Bänder liefern je nach Kontext gegensätzliche Lesarten.",
          "**Auf einen Squeeze handeln, ohne eine Bestätigung abzuwarten.** Die Richtung des Ausbruchs ist unbekannt. Manche Trader warten auf einen Schluss außerhalb der Bänder mit höherem Volumen (siehe [Volumen im Trading](/blog/volumen-im-trading)).",
          "**Den Zeitrahmen vergessen.** Ein Squeeze im 5-Minuten-Chart hat nicht dieselbe Tragweite wie im Tageschart. Lesen Sie [Zeitrahmen wählen](/blog/trading-zeiteinheit-waehlen).",
          "**Gleichartige Indikatoren stapeln.** Bänder, RSI und MACD leiten sich alle aus denselben Kursen ab: Drei Übereinstimmungen sind keine drei Beweise.",
        ],
      },
      { h2: "Wie kombiniert man sie mit anderen Orientierungspunkten?" },
      {
        p: "Ein vernünftiger Ablauf: Erkennen Sie zuerst die Struktur (Trend, Marken) und beurteilen Sie dann mit den Bändern den Zustand der Volatilität. Ein Ausbruch aus der Range nach vorheriger Verengung ist interessanter als einer mitten in der Unruhe. Der [RSI](/blog/rsi-indikator) kann zeigen, ob die Bewegung schon stark gedehnt ist. Und das Risikomanagement bleibt unabhängig: Die Größe wird aus dem Stop berechnet, nicht aus den Bändern (siehe [Positionsgröße berechnen](/blog/positionsgroesse-berechnen)).",
      },
      { tip: "Sind die Bänder nach einer großen Bewegung sehr weit auseinander, nehmen Sie das gegenüberliegende Band nicht als Kursziel. Es kann sehr weit entfernt sein oder sich schon wieder annähern." },
      {
        p: "Auf Ihrem eigenen Chart kann [Scanzivo](/) den Screenshot mit eingeblendeten Bändern lesen und daraus Marken und einen nummerierten Plan ableiten, den Sie dann mit Ihrer Einschätzung des Kontexts abgleichen.",
      },
      {
        p: "Dieser Inhalt dient der Information und stellt keine Anlageberatung dar. Trading ist mit dem Risiko eines Kapitalverlusts verbunden, der bis zum Totalverlust des eingesetzten Betrags reichen kann.",
      },
    ],
  },
  {
    key: "retracement-de-fibonacci",
    slug: "fibonacci-retracement",
    title: "Fibonacci-Retracement: Level einzeichnen und richtig lesen",
    description:
      "So zeichnen Sie die Fibonacci-Level Schritt für Schritt ein, was 38,2 / 50 / 61,8 % bedeuten und warum Sie sie als Zonen behandeln sollten, nicht als Gewissheiten.",
    date: "2026-11-19",
    body: [
      {
        p: "Das Fibonacci-Retracement legt Level (38,2 %, 50 %, 61,8 %) zwischen Anfang und Ende einer Bewegung, um zu erkennen, wo ein Rücksetzer enden könnte. Das sind Aufmerksamkeitszonen, keine Garantien: Viele Trader beobachten sie, was ihnen manchmal Gewicht gibt, aber der Kurs durchläuft sie auch oft einfach.",
      },
      { h2: "Woher kommen diese Prozentsätze?" },
      {
        p: "Sie leiten sich aus der Fibonacci-Folge ab, in der jede Zahl die Summe der beiden vorherigen ist. Das Verhältnis einer Zahl zur nächsten nähert sich 61,8 %, und mit der übernächsten 38,2 %. Die 50 % sind streng genommen kein Fibonacci-Verhältnis: Sie kommen dazu, weil viele Bewegungen bis zur Hälfte zurücklaufen. Kein Marktgesetz zwingt den Kurs, diese Verhältnisse einzuhalten. Ihr Nutzen ist praktisch: Sie liefern objektive, gemeinsame Orientierungspunkte.",
      },
      { h2: "Wie zeichnet man ein Fibonacci-Retracement ein?" },
      {
        ol: [
          "**Suchen Sie eine klare Bewegung**: ein deutliches Teilstück zwischen einem Tief und einem Hoch (oder umgekehrt), ohne Durcheinander.",
          "**Wählen Sie die zwei Punkte**: Start und Ende der Bewegung. Bei einem Anstieg vom Tief zum Hoch. Bei einem Rückgang vom Hoch zum Tief. Nutzen Sie die Dochte oder die Schlusskurse, aber bleiben Sie konsequent.",
          "**Ziehen Sie das Werkzeug** in Ihrer Plattform auf: Die Level erscheinen zwischen den beiden Punkten.",
          "**Beobachten Sie die Reaktion des Kurses**, wenn er zu 38,2 %, 50 % oder 61,8 % zurückkehrt.",
        ],
      },
      {
        p: "**Beispiel (zur Veranschaulichung):** Ein Wert steigt von 100 € auf 120 €. Die Bewegung umfasst 20 €. Das Level 38,2 % liegt bei 120 − 7,64 = 112,36 €. Die 50 % bei 110 €. Die 61,8 % bei 120 − 12,36 = 107,64 €. Fällt der Kurs zurück, schaut man, was er rund um diese Zonen tut, etwa eine Ablehnungskerze oder einen klaren Durchbruch.",
      },
      { h2: "Was bedeutet jedes Level?" },
      {
        ul: [
          "**38,2 %**: ein schwacher Rücksetzer. In einem starken Trend startet der Kurs oft von dort wieder.",
          "**50 %**: ein mittlerer Rücksetzer, oft als Grenze einer „gesunden“ Korrektur betrachtet.",
          "**61,8 %**: ein tiefer Rücksetzer. Darüber hinaus wird die Idee einer bloßen Pause infrage gestellt; das Risiko einer Umkehr steigt.",
        ],
      },
      {
        p: "Ein Rücksetzer über 78,6 % hinaus oder zurück zum Ursprung der Bewegung macht das Szenario meistens ungültig. Das gibt dem Werkzeug seinen konkreten Nutzen: Es hilft, eine Schwelle festzulegen, ab der die Idee falsch ist.",
      },
      { h2: "Wo liegen die Grenzen von Fibonacci?" },
      {
        p: "Seien wir ehrlich: Retracements haben ernsthafte Grenzen.",
      },
      {
        ul: [
          "**Die Wahl der Punkte ist subjektiv.** Zwei Trader zeichnen auf demselben Chart zwei verschiedene Raster, und jeder findet Reaktionen.",
          "**Es gibt zu viele Level.** Mit mehreren Rastern landet fast jeder Kurs irgendwann nahe an einem Level. Man sieht, was funktioniert hat, und vergisst den Rest.",
          "**Der Kurs durchläuft die Level oft** ohne anzuhalten.",
          "**Ein statistischer Vorteil ist nicht garantiert.** Behandeln Sie das Werkzeug als visuelle Orientierung, nicht als erprobte Methode.",
        ],
      },
      { h2: "Wie gibt man ihm mehr Gewicht?" },
      {
        p: "Indem Sie die Konfluenz suchen: Ein Fibonacci-Level, das auf eine bereits getestete [Unterstützung oder einen Widerstand](/blog/unterstuetzung-und-widerstand), auf einen wichtigen [gleitenden Durchschnitt](/blog/gleitende-durchschnitte) oder auf eine runde Zahl fällt, verdient mehr Aufmerksamkeit als ein einzelnes Level. Eine Ablehnungskerze an dieser Stelle (siehe [Candlestick-Muster](/blog/candlestick-muster)) liefert eine Bestätigung. Ohne sie warten Sie besser ab.",
      },
      {
        p: "Beim Risiko hilft das Retracement, den Stop zu verorten: unter dem nächsten Level oder unter dem Ursprung der Bewegung. Lesen Sie [Stop-Loss richtig setzen](/blog/stop-loss-richtig-setzen) und prüfen Sie dann das [Chance-Risiko-Verhältnis](/blog/chance-risiko-verhaeltnis): Das natürliche Ziel ist das vorherige Hoch, was vor dem Einstieg ein messbares Verhältnis ergibt. Ein Rücksetzer zu 61,8 % mit einem Stop knapp darunter bietet meist ein besseres Verhältnis als ein Einstieg bei 38,2 %, aber der Kurs erreicht dieses Level mit geringerer Wahrscheinlichkeit.",
      },
      { tip: "Zeichnen Sie das Raster immer auf das offensichtlichste Teilstück, das, das alle sehen. Ein Raster, das nur Sie einzeichnen, hat keinen Grund, vom Markt beachtet zu werden." },
      {
        p: "Um Ihre Zeichnung mit einem anderen Blick zu vergleichen, liest [Scanzivo](/) den Screenshot Ihres Charts und schlägt Einstiegs-, Stop- und Zielmarken in einem nummerierten Plan vor, den Sie mit Ihrem Raster abgleichen können.",
      },
      {
        p: "Dieser Inhalt dient der Information und stellt keine Anlageberatung dar. Trading ist mit dem Risiko eines Kapitalverlusts verbunden, der bis zum Totalverlust des eingesetzten Betrags reichen kann.",
      },
    ],
  },
  {
    key: "fausse-cassure",
    slug: "fehlausbruch",
    title: "Fehlausbruch erkennen und vermeiden: So umgehen Sie die Falle",
    description:
      "Warum der Kurs ein Level durchstößt und zurückkehrt, welche Zeichen Sie warnen sollten und drei Gewohnheiten, die den Schaden begrenzen, ohne alles vermeiden zu wollen.",
    date: "2026-11-19",
    body: [
      {
        p: "Ein Fehlausbruch ist ein Ausbruch aus einer Unterstützung, einem Widerstand oder einer Range, der nicht hält: Der Kurs überschreitet das Level, lockt Einstiege an und kehrt dann in die Zone zurück. Man vermeidet nicht alle. Man lernt, sie früher zu erkennen und zu begrenzen, was sie kosten.",
      },
      { h2: "Was ist ein Fehlausbruch?" },
      {
        p: "Ein klares Level bündelt Orders: Stops direkt dahinter, Einstiegsorders von Ausbruchshändlern. Überschreitet der Kurs das Level, werden diese Orders ausgelöst. Steht hinter der Bewegung nicht genug echte Nachfrage, geht dem Kurs die Luft aus und er dreht um. Wer beim Ausbruch eingestiegen ist, sitzt in der Falle, und seine Stops nähren die Gegenbewegung.",
      },
      {
        p: "**Beispiel (zur Veranschaulichung):** Ein Widerstand bei 50 € wurde dreimal getestet. Eine Kerze geht auf 50,40 €, dann fällt der Kurs zurück und schließt bei 49,60 €. Die Käufer des Ausbruchs liegen im Minus. Das Level bei 50 € wurde nicht gebrochen: Es wurde „abgefegt“.",
      },
      { h2: "Welche Zeichen sollten Sie warnen?" },
      {
        ul: [
          "**Ein Docht, kein Körper.** Der Kurs überschreitet das Level mit einem langen Docht, aber die Kerze schließt darunter. Der Schlusskurs zählt mehr als das Hoch.",
          "**Ein Volumen, das nicht mitzieht.** Ein Ausbruch ohne überdurchschnittliches Volumen wirkt wenig überzeugend (siehe [Volumen im Trading](/blog/volumen-im-trading), mit seinen Grenzen).",
          "**Ein gegenläufiger Kontext.** Der Ausbruch läuft gegen den Trend des höheren Zeitrahmens.",
          "**Ein fragiler Zeitpunkt.** Börsenöffnung, Wirtschaftsmeldung, Wochenende: Die Liquidität ist dünner, die Bewegungen nervöser (siehe [Wirtschaftskalender](/blog/wirtschaftskalender)).",
          "**Eine Umkehrkerze direkt danach**, etwa ein Engulfing oder ein Abendstern. Lesen Sie die [Candlestick-Muster](/blog/candlestick-muster).",
        ],
      },
      { h2: "Wie vermeiden Sie die Falle?" },
      { h3: "Auf einen Schlusskurs warten" },
      {
        p: "Steigen Sie nicht ein, sobald das Level berührt wird, sondern warten Sie auf den Schluss der Kerze jenseits des Levels, in dem Zeitrahmen, den Sie verfolgen. Sie verlieren etwas Kurs. Sie umgehen viele Dochte.",
      },
      { h3: "Den Retest abwarten" },
      {
        p: "Ein klarer Ausbruch kehrt oft zurück, um das Level zu testen, das dann zur Unterstützung (ehemaliger Widerstand) oder zum Widerstand (ehemalige Unterstützung) wird. Hält der Kurs beim Retest, ist der Einstieg besser platziert und der Stop näher. Das Risiko: Sie verpassen die Bewegung, wenn der Kurs nicht zurückkommt. Das ist der Preis der Vorsicht.",
      },
      { h3: "Den Stop auf die richtige Seite setzen" },
      {
        p: "Ein Stop knapp unter dem gebrochenen Level wird oft von einem Docht ausgelöst. Ein Stop unter dem letzten bedeutenden Tief oder unter der Zone lässt Spielraum. Er bedeutet eine kleinere Position: Das ist die Rechnung aus [Positionsgröße berechnen](/blog/positionsgroesse-berechnen) und [Stop-Loss richtig setzen](/blog/stop-loss-richtig-setzen).",
      },
      { h2: "Kann man einen Fehlausbruch nutzen?" },
      {
        p: "Manche Trader behandeln ihn als eigenes Signal: Der Kurs fällt unter den Widerstand zurück, sie verkaufen mit einem Stop über dem Docht. Die Idee ist logisch, denn der Stop ist präzise und nah, was ein gutes [Chance-Risiko-Verhältnis](/blog/chance-risiko-verhaeltnis) ergibt. Aber es bleibt eine Wette: Ein zweiter Ausbruchsversuch kann gelingen, wo der erste gescheitert ist.",
      },
      { h2: "Welche häufigen Fehler verschlimmern die Lage?" },
      {
        ul: [
          "**Dem Kurs hinterherlaufen**: spät auf einer schon gedehnten Kerze einsteigen.",
          "**Die Größe erhöhen, um „es wieder hereinzuholen“**, nachdem man in eine Falle geraten ist.",
          "**Den Stop verschieben**, wenn der Kurs gegen Sie läuft.",
          "**Range und Trend verwechseln**: In der Range scheitern die meisten Ausbrüche (siehe [Trend oder Range](/blog/trend-oder-range)).",
          "**Den Kontext ignorieren**: Ausbruch im 5-Minuten-Chart gegen einen starken Trend im 4-Stunden-Chart.",
        ],
      },
      { tip: "Notieren Sie Ihre letzten zehn Ausbrüche mit Ergebnis und Kontext. Sie sehen schnell, ob Ihre Fehlschläge von einer Tageszeit, einer Art von Level oder Ihrer Ungeduld kommen." },
      {
        p: "Bevor Sie sich entscheiden, kann es helfen, den Chart gegenlesen zu lassen: [Scanzivo](/) analysiert einen Screenshot, erkennt mögliche Ausbruchsmarken und schlägt einen nummerierten Plan mit Ungültigkeitsmarke vor, den Sie übernehmen oder verwerfen.",
      },
      {
        p: "Dieser Inhalt dient der Information und stellt keine Anlageberatung dar. Trading ist mit dem Risiko eines Kapitalverlusts verbunden, der bis zum Totalverlust des eingesetzten Betrags reichen kann.",
      },
    ],
  },
  {
    key: "tendance-et-range",
    slug: "trend-oder-range",
    title: "Trend oder Range: So erkennen Sie den Unterschied",
    description:
      "Hochs und Tiefs, Neigung der Durchschnitte, fehlende Richtung: die Anhaltspunkte, um einen Trendmarkt von einem Rangemarkt zu unterscheiden, und was das ändert.",
    date: "2026-11-19",
    body: [
      {
        p: "Ein Markt ist im Trend, wenn er immer höhere (oder immer tiefere) Hochs und Tiefs aneinanderreiht. Er ist in der Range, wenn er zwischen einer Decke und einem Boden pendelt, ohne voranzukommen. Zu erkennen, welcher Fall vorliegt, ist die erste Frage, die Sie sich stellen sollten, denn die meisten Werkzeuge funktionieren in dem einen und versagen in dem anderen.",
      },
      { h2: "Wie erkennt man einen Aufwärts- oder Abwärtstrend?" },
      {
        p: "Der einfachste Anhaltspunkt ist die Struktur.",
      },
      {
        ul: [
          "**Aufwärtstrend**: Jedes Hoch übertrifft das vorherige, jedes Tief liegt höher als das vorherige.",
          "**Abwärtstrend**: Jedes Hoch und jedes Tief liegt tiefer als die vorherigen.",
        ],
      },
      {
        p: "Man kann die Neigung der [gleitenden Durchschnitte](/blog/gleitende-durchschnitte) hinzunehmen: Ein deutlich geneigter GD50 mit einem Kurs, der auf derselben Seite bleibt, bestätigt die Richtung. Aber die Struktur geht vor: Ein Durchschnitt ist eine Folge des Kurses, keine Ursache.",
      },
      {
        p: "**Beispiel (zur Veranschaulichung):** Tief bei 100 €, Hoch bei 110 €, Rücksetzer auf 104 €, neues Hoch bei 116 €, Rücksetzer auf 108 €. Die Tiefs (100, 104, 108) und die Hochs (110, 116) steigen: Aufwärtstrend. Fällt der nächste Rücksetzer unter 108 €, ist die Struktur gebrochen und die Lesart ändert sich.",
      },
      { h2: "Wie erkennt man eine Range?" },
      {
        ul: [
          "Der Kurs prallt mindestens zweimal von demselben Boden und derselben Decke ab.",
          "Die gleitenden Durchschnitte sind flach, und der Kurs durchquert sie in beide Richtungen.",
          "Hochs und Tiefs kommen nicht voran.",
          "Die Kerzen sind oft klein, mit Dochten auf beiden Seiten.",
        ],
      },
      {
        p: "Decke und Boden sind Ihre [Unterstützungen und Widerstände](/blog/unterstuetzung-und-widerstand). Die Breite der Range bestimmt, wie viel Potenzial bleibt: Eine enge Range bietet wenig Platz für ein gutes [Chance-Risiko-Verhältnis](/blog/chance-risiko-verhaeltnis) nach Kosten.",
      },
      { h2: "Wie passt man seine Lesart an den Markt an?" },
      { h3: "Im Trend" },
      {
        p: "Rücksetzer zu einem Durchschnitt oder einer Unterstützung sind Zonen von Interesse in Trendrichtung. Die [Schwungindikatoren](/blog/macd-indikator) liefern nützliche Signale, und die Retracements ([Fibonacci](/blog/fibonacci-retracement)) helfen, die Tiefe des Rücksetzers einzuordnen. Das Hauptrisiko: gegen den Trend zu handeln, weil der Kurs „zu hoch“ ist.",
      },
      { h3: "In der Range" },
      {
        p: "Die Ränder sind die interessanten Zonen, die Mitte ist eine Zone ohne Vorteil. Ein [RSI](/blog/rsi-indikator), der Extremwerte berührt, ist hier nützlicher als in einem starken Trend. Das Hauptrisiko: vom Ausbruch überrascht zu werden, der ein [Fehlausbruch](/blog/fehlausbruch) oder ein echter sein kann.",
      },
      { h2: "Und wenn der Markt von einem zum anderen wechselt?" },
      {
        p: "Das ist der schwierigste Moment. Ein Trend endet oft in einer Range (der Markt pausiert), und eine Range endet in einem Trend (der Markt entscheidet sich für eine Seite). Einige Übergangssignale: ein Strukturbruch (ein Tief fällt im Aufwärtstrend unter das vorherige), eine Verengung der Volatilität (siehe [Bollinger-Bänder](/blog/bollinger-baender)) oder ein Volumen, das sein Verhalten ändert (siehe [Volumen im Trading](/blog/volumen-im-trading)).",
      },
      { h2: "Ändert der Zeitrahmen die Antwort?" },
      {
        p: "Ja, und das ist eine Quelle der Verwirrung. Ein Markt kann im Tageschart im Aufwärtstrend und im 15-Minuten-Chart in der Range sein. Die praktische Regel: Bestimmen Sie die Richtung in einem höheren Zeitrahmen und suchen Sie dann Ihren Einstieg in einem feineren. Lesen Sie [Zeitrahmen wählen](/blog/trading-zeiteinheit-waehlen) und, für die Grundlagen, [Trading-Chart lesen](/blog/trading-chart-lesen).",
      },
      { h2: "Welche Fehler kommen am häufigsten vor?" },
      {
        ul: [
          "**Überall einen Trend sehen.** Eine Bewegung über drei Kerzen ist kein Trend.",
          "**Immer dieselbe Methode anwenden.** Eine Ausbruchsstrategie in der Range oder eine Rebound-Strategie im starken Trend nutzt sich schnell ab.",
          "**Den Meldungskontext ignorieren.** Eine Veröffentlichung kann eine Range ohne Vorwarnung sprengen (siehe [Wirtschaftskalender](/blog/wirtschaftskalender)).",
          "**Die Lesart bei jeder Kerze ändern.** Legen Sie Ihre Kriterien vorab fest.",
        ],
      },
      { tip: "Stellen Sie sich vor jedem Trade eine Frage: Wenn ich den Bildschirm ausschalte und in einer Woche wieder öffne, steht der Kurs eher höher, tiefer oder am selben Ort? Ihre Antwort zeigt, was Sie zu sehen glauben." },
      {
        p: "Für einen Blick von außen liest [Scanzivo](/) Ihren Screenshot, zeigt an, ob die Struktur eher nach Trend oder nach Range aussieht, und schlägt Marken mit einem nummerierten Plan vor. Prüfen Sie immer, was das Tool sagt, an Ihrer eigenen Lesart.",
      },
      {
        p: "Dieser Inhalt dient der Information und stellt keine Anlageberatung dar. Trading ist mit dem Risiko eines Kapitalverlusts verbunden, der bis zum Totalverlust des eingesetzten Betrags reichen kann.",
      },
    ],
  },
  {
    key: "volume-trading",
    slug: "volumen-im-trading",
    title: "Handelsvolumen im Trading: Was es bestätigt und was nicht",
    description:
      "Wie Sie Volumenbalken lesen, was sie bei einem Ausbruch oder Trend bestätigen und warum das Volumen bei Forex und Krypto eine andere Bedeutung hat.",
    date: "2026-11-19",
    body: [
      {
        p: "Das Volumen misst die Menge, die während einer Kerze gehandelt wurde. Es hilft zu beurteilen, ob sich eine Bewegung auf echte Beteiligung stützt oder dünn ist. Es zeigt nicht die Richtung, und je nach Markt (Aktien, Krypto, Forex) bedeutet es nicht dasselbe.",
      },
      { h2: "Was misst das Volumen wirklich?" },
      {
        p: "Unter dem Chart steht jeder Balken für die Zahl der gehandelten Einheiten in der Periode: Aktien, Kontrakte oder Krypto-Einheiten. Ein hoher Balken heißt viel Handel, ein niedriger wenig. Entscheidend ist der Vergleich mit den letzten Balken, nicht der absolute Wert.",
      },
      { h2: "Was bestätigt das Volumen?" },
      {
        ul: [
          "**Einen Ausbruch.** Ein Kurs, der ein Level mit deutlich höherem Volumen verlässt, hat bessere Chancen auf Anschluss als ein Ausbruch bei geringem Volumen. Das senkt das Risiko eines [Fehlausbruchs](/blog/fehlausbruch), ohne es zu beseitigen.",
          "**Einen Trend.** In einem gesunden Anstieg steigt das Volumen oft bei den Schüben und beruhigt sich bei den Rücksetzern.",
          "**Eine Erschöpfungsspitze.** Ein außergewöhnliches Volumen nach einer langen Bewegung kann das Ende eines Trends markieren, aber nur, wenn der Kurs anschließend reagiert.",
          "**Ein Level.** Eine Unterstützung, die mit Volumen verteidigt wird, ist glaubwürdiger als ein Level, das ohne Aktivität berührt wird. Lesen Sie [Unterstützung und Widerstand](/blog/unterstuetzung-und-widerstand).",
        ],
      },
      {
        p: "**Beispiel (zur Veranschaulichung):** Ein Kurs durchbricht einen Widerstand. Die 20 vorherigen Balken liegen um 1.000 Einheiten, der Ausbruchsbalken zeigt 3.500. Die Beteiligung ist deutlich. Zeigt er 900, ist der Ausbruch verdächtig: Nur wenige sind gefolgt.",
      },
      { h2: "Was das Volumen nicht sagt" },
      {
        ul: [
          "**Die Richtung.** Ein hohes Volumen kann einen Anstieg oder einen Rückgang begleiten. Es zeigt Aktivität, nicht, wer gewonnen hat.",
          "**Die Absicht.** Bei jedem Geschäft treffen Käufe und Verkäufe aufeinander: Das Volumen zählt sie alle.",
          "**Die Fortsetzung.** Eine Spitze sagt die nächste Kerze nicht voraus.",
        ],
      },
      { h2: "Das Volumen bei Krypto: verlässlich?" },
      {
        p: "Bei Krypto wird das Volumen aus vielen Plattformen zusammengeführt oder, je nach Quelle Ihres Charts, nur von einer einzigen genommen. Die Zahlen unterscheiden sich daher von Plattform zu Plattform, und ein Teil des von manchen Handelsplätzen gemeldeten Volumens wurde angezweifelt. Nutzlos ist es nicht: Relative Spitzen behalten innerhalb derselben Quelle ihre Bedeutung. Aber Vergleiche zwischen Plattformen und absolute Werte verlangen Vorsicht. Der Markt läuft zudem rund um die Uhr, sodass das Volumen je nach Tageszeit schwankt (siehe [Bitcoin-Chartanalyse](/blog/bitcoin-chartanalyse)).",
      },
      { h2: "Das Volumen im Forex: ein Sonderfall" },
      {
        p: "Der Forex-Markt hat keinen zentralen Handelsplatz: Gehandelt wird direkt zwischen Banken und Brokern. Das „Volumen“, das die meisten Privatanleger-Plattformen anzeigen, ist ein Tick-Volumen, also die Zahl der Kursänderungen, nicht die tatsächlich gehandelte Menge. Es korreliert mit der Aktivität und ist als Hinweis auf Unruhe brauchbar, ersetzt aber kein echtes Börsenvolumen. Bei CFDs ist es genauso: Sie sehen das des Brokers, nicht das des Marktes.",
      },
      { h2: "Wie nutzt man es in der Praxis?" },
      {
        ol: [
          "**Vergleichen Sie mit dem jüngsten Durchschnitt.** Ein Balken zählt im Verhältnis zu seinen Nachbarn.",
          "**Lesen Sie es zusammen mit dem Kurs.** Hohes Volumen und kleine Kerze: viel Handel ohne Fortschritt, ein Zeichen von Absorption. Hohes Volumen und große Kerze: eine getragene Bewegung.",
          "**Berücksichtigen Sie die Uhrzeit.** Börsenöffnung und Meldungen blähen das Volumen auf, ohne besondere Bedeutung (siehe [Wirtschaftskalender](/blog/wirtschaftskalender)).",
          "**Behalten Sie es als Bestätigung**, nie als einzigen Auslöser. Die [Struktur](/blog/trend-oder-range) geht vor.",
        ],
      },
      { tip: "Ist die Volumenquelle Ihres Charts zweifelhaft (Forex, CFD), stützen Sie keine Entscheidung darauf. Nutzen Sie es nur, um Momente mit Aktivität zu erkennen." },
      {
        p: "Das Volumen gehört zu den Elementen, die [Scanzivo](/) auf einem Screenshot lesen kann, zusammen mit Struktur und Marken: Daraus entsteht ein nummerierter Plan. Das Tool sieht aber nur, was Ihr Chart anzeigt, die Verlässlichkeit der Quelle bleibt also Ihre Sache.",
      },
      {
        p: "Dieser Inhalt dient der Information und stellt keine Anlageberatung dar. Trading ist mit dem Risiko eines Kapitalverlusts verbunden, der bis zum Totalverlust des eingesetzten Betrags reichen kann.",
      },
    ],
  },
  {
    key: "analyse-technique-bitcoin",
    slug: "bitcoin-chartanalyse",
    title: "Bitcoin-Chartanalyse: So lesen Sie einen BTC-Chart",
    description:
      "Wie Sie einen Bitcoin-Chart lesen: Zeitrahmen, Volatilität, Marken, Einfluss von Meldungen und die Grenzen einer Analyse, die ein Szenario bleibt und keine Prognose ist.",
    date: "2026-11-19",
    body: [
      {
        p: "Einen Bitcoin-Chart zu lesen, verlangt dieselben Werkzeuge wie bei jedem anderen Wert: Trend, Unterstützung und Widerstand, Volumen, Risikomanagement. Anders sind die Volatilität, der Handel rund um die Uhr und die Empfindlichkeit gegenüber Meldungen. Eine Analyse bleibt ein Szenario mit einem Ungültigkeitspunkt, nie eine Prognose.",
      },
      { h2: "Was unterscheidet BTC von anderen Werten?" },
      {
        ul: [
          "**Ein durchgehender Markt.** Es gibt weder tägliche Eröffnung noch Schluss. Am Wochenende ist die Liquidität dünner, und Bewegungen können abrupt sein.",
          "**Eine hohe Volatilität.** Schwankungen von mehreren Prozent an einem Tag sind keine Seltenheit. Ihre Stops und Positionsgrößen müssen das berücksichtigen (siehe [Positionsgröße berechnen](/blog/positionsgroesse-berechnen)).",
          "**Mehrere Handelsplätze.** Kurse und Volumen weichen je nach Plattform leicht ab (siehe [Volumen im Trading](/blog/volumen-im-trading)).",
          "**Empfindlichkeit für Nachrichten.** Entscheidungen von Regulierern, Ankündigungen von Finanzprodukten, Hackerangriffe, Äußerungen von Zentralbanken.",
        ],
      },
      { h2: "Welchen Zeitrahmen wählen Sie für Bitcoin?" },
      {
        p: "Das hängt von Ihrem Horizont ab. Ein gängiges Schema: Der Tages- oder 4-Stunden-Chart liefert die Richtung und die großen Marken, der 1-Stunden- oder 15-Minuten-Chart dient dazu, den Einstieg zu platzieren. Auf 24 Stunden schaut man vor allem auf die Kerzen von 5 bis 15 Minuten und den 1-Stunden-Chart. Auf 7 Tage geben der 4-Stunden- und der Tageschart ein stabileres Bild. Je kürzer der Zeitrahmen, desto stärker das Rauschen. Details in [Zeitrahmen wählen](/blog/trading-zeiteinheit-waehlen).",
      },
      { h2: "Wie erkennt man wichtige Marken bei BTC?" },
      {
        p: "Beginnen Sie mit den Extremen der vergangenen Wochen: Hochs und Tiefs, die den Kurs mehrmals gestoppt haben. Fügen Sie runde Zahlen hinzu (etwa volle Tausender), auf die viele Marktteilnehmer schauen. Suchen Sie dann Zonen, in denen der Kurs sein Verhalten geändert hat, etwa ein früherer Widerstand, der zur Unterstützung wurde. Die Methode ist die von [Unterstützung und Widerstand](/blog/unterstuetzung-und-widerstand), und sie gilt genauso für Gold: Lesen Sie [Gold: Unterstützung, Widerstand und runde Marken](/blog/gold-runde-marken).",
      },
      {
        p: "**Beispiel (zur Veranschaulichung, erfundene Zahlen):** BTC pendelt seit zehn Tagen zwischen 60.000 € und 64.000 €. Die Decke wurde dreimal getestet, der Boden zweimal. Solange der Kurs in diesem Korridor bleibt, liegt eine Range vor (siehe [Trend oder Range](/blog/trend-oder-range)). Ein Tagesschluss über 64.000 € mit höherem Volumen wird zu einem Aufwärtsszenario. Ein Schluss unter 60.000 € macht die Range nach unten ungültig.",
      },
      { h2: "Welche Indikatoren nutzt man bei Bitcoin?" },
      {
        p: "Wenige, und ohne Übertreibung. Die [gleitenden Durchschnitte](/blog/gleitende-durchschnitte) (GD50, GD200 im Tageschart) geben den Kontext. Der [RSI](/blog/rsi-indikator) zeigt Übertreibungen, bleibt aber im starken Trend lange im Extrembereich. Der [MACD](/blog/macd-indikator) misst den Schwung. Die [Bollinger-Bänder](/blog/bollinger-baender) helfen, ruhige Phasen vor großen Bewegungen zu erkennen. Keiner ersetzt das Lesen des Kurses, und ihre Übereinstimmung beweist nichts.",
      },
      { h2: "Wie berücksichtigen Sie Meldungen?" },
      {
        p: "Schauen Sie vor dem Einstieg, was ansteht: Die makroökonomischen US-Veröffentlichungen (Inflation, Arbeitsmarkt, Fed-Entscheidungen) lassen Bitcoin wie viele andere Risikoanlagen reagieren. Prüfen Sie den [Wirtschaftskalender](/blog/wirtschaftskalender) und eröffnen Sie keine Position kurz vor einem wichtigen Termin, ohne das bewusst entschieden zu haben. Unvorhergesehene Nachrichten haben keinen Kalender: ein Grund mehr, immer einen im Voraus festgelegten Stop zu haben (siehe [Stop-Loss richtig setzen](/blog/stop-loss-richtig-setzen)).",
      },
      { h2: "Welche Fehler sind bei BTC häufig?" },
      {
        ul: [
          "**Einen hohen Hebel nutzen** bei einem ohnehin sehr volatilen Wert: Ein Docht reicht, um eine Position zu liquidieren.",
          "**Den Bewegungen aus Angst, sie zu verpassen, folgen** und spät nach einer großen Kerze einsteigen.",
          "**Rauschen und Signal verwechseln** in kleinen Zeitrahmen.",
          "**Sich auf Volumen oder Kurs einer einzigen Plattform verlassen**, ohne nachzuprüfen.",
          "**In einen [Fehlausbruch](/blog/fehlausbruch) laufen**, die um runde Zahlen häufig sind.",
          "**Sich von Versprechen verführen lassen**, die Bots oder Signale machen: Lesen Sie [KI-Trading-Bots und Betrug](/blog/ki-trading-bots-betrug).",
        ],
      },
      { h2: "Welche Grenzen hat die technische Analyse von Bitcoin?" },
      {
        p: "Bitcoin reagiert auch auf Faktoren, die der Chart nicht zeigt: Regulierung, institutionelle Zuflüsse, Ereignisse, die nur Krypto betreffen. Die technische Analyse rahmt das Risiko ein und verortet die Marken, sie sagt nicht, was passieren wird. Viele Trader bleiben außen vor, solange ihr Szenario nicht klar ist, und das ist eine legitime Entscheidung.",
      },
      { tip: "Schreiben Sie vor dem Einstieg auf: Einstiegsmarke, Stop, Ziel und riskierten Betrag. Fehlt eines der vier, haben Sie keinen Plan, nur ein Bauchgefühl." },
      {
        p: "Um Zeit zu sparen, kann [Scanzivo](/) den Screenshot Ihres BTC-Charts lesen und Marken sowie einen nummerierten Plan vorschlagen. Zur Aufnahme lesen Sie [Chart-Screenshot](/blog/chart-screenshot). Und um zu verstehen, was KI kann und was nicht, lesen Sie [KI im Trading](/blog/ki-im-trading).",
      },
      {
        p: "Dieser Inhalt dient der Information und stellt keine Anlageberatung dar. Der Handel mit Kryptowährungen ist mit einem hohen Risiko eines Kapitalverlusts verbunden, der bis zum Totalverlust des eingesetzten Betrags reichen kann.",
      },
    ],
  },
];
