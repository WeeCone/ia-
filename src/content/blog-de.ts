import type { Article } from "./blog";

/** German versions of the guides; `key` is the French slug. Examples use euros and Central European Time. */
export const ARTICLES_DE: Omit<Article, "locale">[] = [
  {
    key: "taille-de-position",
    slug: "positionsgroesse-berechnen",
    title: "Positionsgröße berechnen: Wie viel Sie pro Trade einsetzen sollten",
    description:
      "Die Regel vom riskierten Kapitalanteil, die Berechnung Schritt für Schritt ab dem Stop und die Fehler, die aus einer Verlustserie ein leeres Konto machen.",
    date: "2026-11-01",
    body: [
      {
        p: "Die meisten Konten gehen nicht an einem schlechten Trade zugrunde, sondern an einem zu großen. Die Positionsgröße ist die einzige Stellschraube, die Sie vollständig selbst in der Hand haben: Der Markt entscheidet, ob Sie richtigliegen. Sie entscheiden, was es Sie kostet, wenn Sie falschliegen.",
      },
      { h2: "Vom Risiko ausgehen, nicht vom Einsatz" },
      {
        p: "Die Frage lautet nicht „Wie viel setze ich ein?“, sondern „Wie viel bin ich bereit zu verlieren, wenn mein Stop ausgelöst wird?“. Viele Trader legen diesen Betrag als kleinen Prozentsatz ihres Kapitals fest, häufig zwischen **0,5 % und 2 %** pro Trade. Bei 5.000 € und einer 1-%-Regel liegt der geplante Höchstverlust pro Trade bei 50 €.",
      },
      {
        p: "Das wirkt wenig. Genau das ist der Sinn: Bei 1 % Risiko kosten zehn Verluste in Folge, die jedem einmal passieren, rund 10 % des Kontos. Bei 10 % Risiko pro Trade kostet dieselbe Serie mehr als 65 %.",
      },
      { h2: "Die Berechnung in drei Schritten" },
      {
        ol: [
          "**Riskierter Betrag**: Kapital × Prozentsatz. 5.000 € × 1 % = 50 €.",
          "**Abstand zum Stop**: Differenz zwischen Einstiegskurs und Stop. Einstieg bei 100 €, Stop bei 96 €: 4 € pro Stück.",
          "**Positionsgröße**: riskierter Betrag ÷ Abstand zum Stop. 50 € ÷ 4 € = 12,5 Stück, also eine Position von etwa 1.250 €.",
        ],
      },
      {
        p: "Der Stop bestimmt die Größe, nicht umgekehrt. Ein weiter Stop ergibt eine kleine Position, ein enger Stop eine größere, bei gleichem möglichen Verlust. Wenn Sie noch nicht wissen, wo der Stop hingehört, lesen Sie zuerst, [wie Sie den Stop-Loss richtig setzen](/blog/stop-loss-richtig-setzen): Ein willkürlich gesetzter Stop verfälscht die ganze Rechnung.",
      },
      { tip: "Im Forex- oder CFD-Handel rechnen Sie mit dem Wert pro Punkt bzw. Pip. Das Prinzip bleibt gleich: riskierter Betrag ÷ (Abstand zum Stop × Wert eines Punktes)." },
      { h2: "Der Hebel ändert nichts am Risiko" },
      {
        p: "Ein Hebel verringert die Summe, die Sie zum Eröffnen einer Position hinterlegen müssen, nicht aber den Verlust, wenn der Stop greift. Eine Position über 1.250 € mit Hebel 10 bindet 125 €, verliert aber trotzdem 50 €, wenn der Kurs von 100 auf 96 fällt. Gefährlich wird es, wenn der Hebel dazu dient, deutlich größere Positionen zu eröffnen, als die Rechnung zulässt.",
      },
      { h2: "Die teuersten Fehler" },
      {
        ul: [
          "**Die Position nach einem Verlust vergrößern**, um das Geld „zurückzuholen“: der kürzeste Weg zum großen Verlust.",
          "**Den Stop nachträglich weiter weg legen**: Das tatsächliche Risiko ist dann nicht mehr das, was Sie berechnet hatten.",
          "**Korrelierte Positionen anhäufen**: Drei Long-Trades auf drei Kryptowährungen, die sich gemeinsam bewegen, sind ein großes Risiko, nicht drei kleine.",
          "**Gebühren und Slippage vergessen**: Bei sehr engen Stops machen sie einen erheblichen Teil des Verlusts aus.",
        ],
      },
      { h2: "Positionsgröße und Chance-Risiko-Verhältnis gehören zusammen" },
      {
        p: "Eine sauber berechnete Größe begrenzt den Verlust; das [Chance-Risiko-Verhältnis](/blog/chance-risiko-verhaeltnis) zeigt, ob sich der Trade überhaupt lohnt. 50 € zu riskieren, um 40 € zu gewinnen, ergibt nur Sinn, wenn Sie sehr oft richtigliegen. Wer beim gleichen Risiko 100 € oder mehr anpeilt, hat deutlich mehr Spielraum für Fehler.",
      },
      {
        p: "Eine Analyse von [Scanzivo](/) nennt für jedes Szenario Einstieg, Stop und Kursziele. Ihren Prozentsatz wenden Sie selbst an, um die Größe zu erhalten. Das ist bewusst so: Der Betrag hängt von Ihrem Kapital und Ihrer Risikobereitschaft ab, und die kennen nur Sie.",
      },
    ],
  },
  {
    key: "calendrier-economique",
    slug: "wirtschaftskalender",
    title: "Wirtschaftskalender: Die Termine, die die Märkte bewegen",
    description:
      "Leitzinsen, Inflation, Arbeitsmarkt, Quartalszahlen: Diese Veröffentlichungen sorgen für Volatilität, und so beziehen Sie sie in Ihre Chartanalyse ein.",
    date: "2026-11-01",
    body: [
      {
        p: "Ein perfekter Chart kann durch eine Notenbankentscheidung innerhalb einer Minute hinfällig werden. Die technische Analyse sagt Ihnen, wo die wichtigen Marken liegen; der Wirtschaftskalender sagt Ihnen, wann der Markt sie ohne Vorwarnung durchbrechen könnte. Beides ergänzt sich.",
      },
      { h2: "Die wichtigsten Termine" },
      { h3: "Die Notenbanken" },
      {
        p: "Die Zinsentscheidungen der US-Notenbank (Fed) und der Europäischen Zentralbank (EZB), vor allem die anschließenden Pressekonferenzen, gehören zu den unruhigsten Momenten des Jahres. Dollar, Euro, Gold, Indizes und Kryptowährungen reagieren darauf oft alle gleichzeitig.",
      },
      { h3: "Die Inflation" },
      {
        p: "Der Verbraucherpreisindex (in den USA der CPI) beeinflusst direkt, was die Märkte von den Notenbanken erwarten. Eine Zahl deutlich über oder unter den Prognosen kann bei den schwankungsfreudigsten Werten Bewegungen von mehreren Prozent auslösen.",
      },
      { h3: "Der Arbeitsmarkt" },
      {
        p: "Der monatliche US-Arbeitsmarktbericht (Non-Farm Payrolls, kurz NFP), meist am ersten Freitag des Monats um 14:30 Uhr MEZ veröffentlicht, ist einer der meistbeachteten Termine im Devisenhandel.",
      },
      { h3: "Die Quartalszahlen" },
      {
        p: "Bei einer Aktie können die Quartalszahlen dazu führen, dass der nächste Handelstag weit entfernt vom Vortagesschluss eröffnet. Eine Unterstützung oder ein Stop knapp darunter bietet dann keinen Schutz: Der Kurs springt einfach darüber hinweg.",
      },
      { h2: "Was die Überraschung ausmacht" },
      {
        p: "Der Markt reagiert nicht auf die Zahl selbst, sondern auf die Abweichung von seiner Erwartung. Eine sinkende Inflation kann einen Wert fallen lassen, wenn sie weniger stark sinkt als erwartet. Deshalb zeigen Wirtschaftskalender immer drei Werte an: den vorherigen, die Prognose (Konsens) und den tatsächlichen.",
      },
      { h2: "So berücksichtigen Sie Termine bei einem Trade" },
      {
        ul: [
          "**Prüfen Sie den Kalender vor dem Einstieg**: Ein Trade, der einige Stunden laufen soll, hat ein anderes Risiko, wenn mittendrin eine wichtige Veröffentlichung ansteht.",
          "**Steigen Sie nicht kurz vor** einem wichtigen Termin ein: Der Spread weitet sich aus, und der Kurs kann Ihren Stop auslösen, bevor er in Ihre Richtung läuft.",
          "**Verkleinern Sie die Position**, wenn Sie sie über den Termin hinweg halten (siehe [Positionsgröße berechnen](/blog/positionsgroesse-berechnen)).",
          "**Warten Sie die Reaktion ab**: Die ersten Minuten verstreichen lassen und dann prüfen, ob der Kurs die Marken hält oder bricht, ist oft aufschlussreicher.",
        ],
      },
      { tip: "Wirtschaftskalender zeigen die Uhrzeiten oft in New Yorker Zeit oder in UTC an. Achten Sie auf die Zeitzone: Eine Stunde Unterschied reicht, um zum falschen Zeitpunkt in einer Position zu sitzen." },
      { p: "Gold reagiert besonders empfindlich auf diese Termine: Fed, US-Inflation und US-Arbeitsmarkt wirken direkt auf den Goldpreis, oft entgegengesetzt zum Dollar. Auf unserer [Seite zur Gold-Analyse (XAU/USD)](/gold) erfahren Sie, was die KI bei diesem Wert berücksichtigt." },
      { h2: "Technik und Makro: zwei Blickwinkel auf denselben Markt" },
      {
        p: "[Unterstützungen und Widerstände](/blog/unterstuetzung-und-widerstand) bleiben die Orientierungspunkte Ihres Plans; der Kalender sagt Ihnen, wann diese Marken möglicherweise heftig getestet werden. Eine gute Analyse verbindet beides, statt sich für eine Seite zu entscheiden.",
      },
      {
        p: "Genau das macht das Pro-Paket von [Scanzivo](/): Zu jeder Chartanalyse listet die KI die Termine der nächsten 7 Tage und aktuelle Nachrichten zum Wert auf, jeweils mit Quellen, und erklärt, wie Sie sie in Ihrem Plan berücksichtigen können. Die Zahl selbst sagt sie nicht voraus, aber der Termin überrascht Sie nicht mehr.",
      },
    ],
  },
  {
    key: "choisir-son-unite-de-temps",
    slug: "trading-zeiteinheit-waehlen",
    title: "Welche Zeiteinheit eignet sich zum Traden?",
    description:
      "1 Minute, 1 Stunde, Tageschart: Was die Zeiteinheit verändert, welche zu Ihrem Alltag passt und warum Sie immer die nächsthöhere im Blick behalten sollten.",
    date: "2026-11-01",
    body: [
      {
        p: "Derselbe Wert kann im 4-Stunden-Chart steigen und im Tageschart fallen. Das ist kein Widerspruch: Jede Zeiteinheit zeigt einen anderen Ausschnitt des Geschehens. Wer seine Zeiteinheit wählt, entscheidet vor allem, in welchem Rhythmus er seine Positionen verfolgen kann.",
      },
      { h2: "Was die Zeiteinheit verändert" },
      {
        p: "Je kürzer die Zeiteinheit, desto mehr Kerzen, Signale und Rauschen. Im 1-Minuten-Chart sieht eine Bewegung von wenigen Sekunden wie ein Trend aus. Im Tageschart fasst jede Kerze einen ganzen Handelstag zusammen: Die Signale sind seltener, aber belastbarer, und die Stops liegen weiter entfernt.",
      },
      { h2: "Die großen Trading-Stile" },
      {
        ul: [
          "**Scalping (1 bis 5 Minuten)**: Dutzende Trades am Tag, ständige Aufmerksamkeit, Gebühren, die stark ins Gewicht fallen. Für Berufstätige kaum geeignet.",
          "**Daytrading (15 Minuten bis 1 Stunde)**: Positionen werden innerhalb eines Tages eröffnet und geschlossen. Sie müssen während der aktiven Handelszeiten verfügbar sein.",
          "**Swingtrading (4 Stunden bis Tageschart)**: Positionen über einige Tage bis wenige Wochen. Mit einem Job vereinbar: Ein- bis zweimal am Tag auf den Chart zu schauen genügt.",
          "**Positionstrading (Wochenchart)**: Trends über mehrere Monate, sehr wenige Entscheidungen.",
        ],
      },
      { tip: "Wählen Sie die Zeiteinheit danach, wie viel Zeit Sie vor dem Bildschirm verbringen können, nicht danach, welche die meisten Gelegenheiten verspricht." },
      { p: "Ein gängiges Beispiel im Intraday-Handel mit Gold: der Stundenchart für die Richtung, der 15-Minuten-Chart für den Plan, der 5-Minuten-Chart für den Einstieg. Diese Routine beschreiben wir Schritt für Schritt auf unserer [Seite zur XAU/USD-Analyse](/gold)." },
      { h2: "Immer eine Zeiteinheit höher schauen" },
      {
        p: "Den übergeordneten Trend lesen Sie in der höheren Zeiteinheit ab, die Einstiege in Ihrer eigenen. Wenn Sie im Stundenchart handeln, zeigt Ihnen der 4-Stunden-Chart, in welche Richtung die Strömung geht. Ein Kaufsignal im Stundenchart zu nehmen, während 4-Stunden- und Tageschart fallen, heißt gegen den Strom schwimmen.",
      },
      {
        p: "Eine einfache Methode: zwischen den Zeiteinheiten einen Faktor von 4 bis 6 einhalten. Tageschart für die Richtung, 4-Stunden-Chart für den Plan, Stundenchart für den Einstieg. Marken aus der höheren Zeiteinheit, etwa [Unterstützungen und Widerstände](/blog/unterstuetzung-und-widerstand), haben mehr Gewicht als die aus der niedrigeren.",
      },
      { h2: "Häufige Fehler" },
      {
        ul: [
          "**Mitten im Trade die Zeiteinheit wechseln**, bis man einen Chart findet, der einem recht gibt.",
          "**Nach einem Verlust in eine kleinere Zeiteinheit wechseln**, um das Geld schneller „zurückzuholen“.",
          "**Einen Stop für den 1-Minuten-Chart** bei einer Position verwenden, die mehrere Tage gehalten wird, oder umgekehrt.",
        ],
      },
      { h2: "Der Zeithorizont einer Analyse hängt von ihrer Zeiteinheit ab" },
      {
        p: "Ein Szenario aus dem 15-Minuten-Chart gilt für einige Stunden, eines aus dem Tageschart für mehrere Tage oder Wochen. Deshalb gibt [Scanzivo](/) für jede Analyse an, wie lange sie gilt, abgeleitet aus der Zeiteinheit auf Ihrem Screenshot. Achten Sie darauf, dass sie gut lesbar ist, wie im [Leitfaden zum Chart-Screenshot](/blog/chart-screenshot) beschrieben.",
      },
    ],
  },
  {
    key: "chandeliers-japonais",
    slug: "candlestick-muster",
    title: "Candlestick-Muster: Die Formationen, die Ihre Aufmerksamkeit verdienen",
    description:
      "Hammer, Engulfing, Shooting Star, Doji: So lesen Sie die nützlichsten Kerzenmuster, und darum ist ihre Position im Chart wichtiger als ihre Form.",
    date: "2026-11-01",
    body: [
      {
        p: "Es gibt Dutzende japanische Kerzenmuster, viele davon mit klangvollen Namen. Für die Praxis reicht eine Handvoll, und eine Regel ist wichtiger als alle anderen: Ein Muster bedeutet für sich allein nichts. Aussagekraft bekommt es erst an einer bestimmten Stelle im Chart.",
      },
      {
        p: "Wenn Sie gerade erst anfangen, lesen Sie zuerst, [wie man einen Trading-Chart liest](/blog/trading-chart-lesen): Kerzenkörper, Dochte, Eröffnung und Schluss sind die Grundlage für alles Weitere.",
      },
      { h2: "Hammer und Shooting Star" },
      {
        p: "Der **Hammer** hat einen kleinen Körper oben und einen langen unteren Docht, mindestens doppelt so lang wie der Körper. Er zeigt, dass die Verkäufer den Kurs nach unten gedrückt haben und die Käufer bis zum Schluss alles zurückgeholt haben. Nach einem Rückgang, an einer Unterstützung, ist das ein Zeichen der Ablehnung tieferer Kurse.",
      },
      {
        p: "Der **Shooting Star** ist sein Spiegelbild: kleiner Körper unten, langer oberer Docht. Nach einem Anstieg, unter einem Widerstand, zeigt er, dass die Käufer die Hochs nicht halten konnten.",
      },
      { h2: "Das Engulfing" },
      {
        p: "Ein **bullisches Engulfing** ist eine grüne Kerze, deren Körper den der vorherigen roten Kerze vollständig umschließt. Die Käufer haben den Rückgang nicht nur gestoppt, sondern mehr zurückgeholt, als die Verkäufer gewonnen hatten. Das bärische Engulfing ist das Gegenstück. Es gehört zu den am besten erkennbaren Mustern, vor allem in höheren Zeiteinheiten.",
      },
      { h2: "Der Doji" },
      {
        p: "Ein **Doji** eröffnet und schließt fast auf demselben Kurs: Der Körper ist nur ein Strich. Er steht für Unentschlossenheit. Allein sagt er nicht, in welche Richtung es weitergeht; nach einem langen Trend zeigt er vor allem, dass der Schwung nachlässt.",
      },
      { h2: "Was ein Muster verlässlich macht" },
      {
        ul: [
          "**Die Lage**: Ein Hammer irgendwo im Nirgendwo ist wertlos; an einer mehrfach getesteten Unterstützung zählt er.",
          "**Die Zeiteinheit**: Ein Muster im Tageschart wiegt deutlich mehr als im 5-Minuten-Chart (siehe [welche Zeiteinheit sich eignet](/blog/trading-zeiteinheit-waehlen)).",
          "**Die Bestätigung**: Abzuwarten, bis die nächste Kerze in die angezeigte Richtung läuft, erspart viele Fehlsignale.",
          "**Das Volumen**, sofern verfügbar: Ein Engulfing bei hohem Volumen überzeugt mehr.",
        ],
      },
      { tip: "Ein Kerzenmuster dient dazu, einen Einstieg an einer Marke auszulösen, die Sie vorher schon identifiziert hatten. Es ersetzt diese Marke nicht." },
      { h2: "Muster wirken im Zusammenspiel" },
      {
        p: "Kerzenmuster beschreiben das Verhalten von ein oder zwei Kerzen; [Chartformationen](/blog/chartformationen) beschreiben die Form von Dutzenden Kerzen. Die besten Signale entstehen, wenn beide dasselbe erzählen, etwa ein bullisches Engulfing am Tief eines Doppelbodens.",
      },
      {
        p: "In einer Analyse von [Scanzivo](/) benennt die KI die Muster, die auf Ihrem Screenshot zu sehen sind, und gibt für jedes an, was es bedeutet und auf welchem Niveau. So können Sie die Einschätzung am Chart überprüfen, statt sie einfach zu glauben.",
      },
    ],
  },
  {
    key: "figures-chartistes",
    slug: "chartformationen",
    title: "Chartformationen, die Sie kennen sollten: Schulter-Kopf-Schulter, Doppeltop, Dreiecke",
    description:
      "Wie Sie die häufigsten Chartformationen erkennen, wo ihre Ausbruchslinie liegt, wie Sie daraus ein Kursziel ableiten und wann Vorsicht angebracht ist.",
    date: "2026-11-01",
    body: [
      {
        p: "Chartformationen sind Muster, die der Kurs über Dutzende Kerzen zeichnet, während Käufer und Verkäufer um eine Zone ringen. Sie sagen nichts mit Sicherheit voraus, liefern aber drei nützliche Informationen: wo das Szenario ausgelöst wird, wo es scheitert und wie weit es reichen kann.",
      },
      { h2: "Umkehrformationen" },
      { h3: "Schulter-Kopf-Schulter" },
      {
        p: "Drei Hochs, das mittlere (der Kopf) höher als die beiden anderen (die Schultern). Die Linie, die die beiden Tiefs dazwischen verbindet, heißt **Nackenlinie**. Solange sie hält, ist das nur ein Zögern; ein klarer Schlusskurs darunter bestätigt die Formation. Die umgekehrte Variante am Ende eines Abwärtstrends deutet auf eine mögliche Erholung hin.",
      },
      { h3: "Doppeltop und Doppelboden" },
      {
        p: "Der Kurs scheitert zweimal am selben Niveau und dreht dann. Das **Doppeltop** sieht aus wie ein M, der Doppelboden wie ein W. Bestätigt ist die Formation erst, wenn der Kurs das Tief (bzw. Hoch) zwischen den beiden Versuchen durchbricht. Bis dahin ist es nur ein [Widerstand](/blog/unterstuetzung-und-widerstand), der zweimal gehalten hat.",
      },
      { h2: "Fortsetzungsformationen" },
      { h3: "Dreiecke" },
      {
        p: "Der Kurs verengt sich zwischen zwei Linien. Ein **aufsteigendes Dreieck** (waagerechter Widerstand, steigende Tiefs) zeigt Käufer, die zunehmend ungeduldig werden. Ein absteigendes Dreieck ist das Gegenteil. Ein symmetrisches Dreieck sagt nur, dass der Markt unentschlossen ist: Erst der Ausbruch gibt die Richtung vor.",
      },
      { h3: "Flaggen und Wimpel" },
      {
        p: "Nach einer schnellen Bewegung (dem Fahnenmast) legt der Kurs eine kurze Pause ein, leicht gegen diese Bewegung geneigt. Endet die Pause mit einem Ausbruch in Richtung des Masts, setzt sich der Trend häufig fort.",
      },
      { h2: "Ein Kursziel abmessen" },
      {
        p: "Die klassische Methode trägt die Höhe der Formation vom Ausbruchspunkt aus ab. Bei Schulter-Kopf-Schulter messen Sie den Abstand zwischen Kopf und Nackenlinie und tragen ihn unterhalb der Nackenlinie ab. Das ist eine Größenordnung, kein Versprechen: Oft stoppt der Kurs schon vorher an einer dazwischenliegenden Unterstützung.",
      },
      { tip: "Vergleichen Sie dieses Kursziel vor dem Einstieg mit Ihrem Stop. Liegt das [Chance-Risiko-Verhältnis](/blog/chance-risiko-verhaeltnis) unter 1, kann die Formation schön sein und der Trade trotzdem schlecht." },
      { h2: "Wann Vorsicht angebracht ist" },
      {
        ul: [
          "**Vor dem Ausbruch**: Eine unbestätigte Formation ist nur eine Hypothese. Viele „Schulter-Kopf-Schulter“-Formationen durchbrechen ihre Nackenlinie nie.",
          "**Fehlausbrüche**: Der Kurs bricht aus und kehrt dann in die Formation zurück. Auf einen Schlusskurs oder sogar einen Retest zu warten, filtert einen Teil dieser Fallen heraus.",
          "**Kleine Zeiteinheiten**: Im 1-Minuten-Chart sieht man überall Formationen.",
          "**Das Umfeld**: Eine Umkehrformation gegen einen sehr starken übergeordneten Trend scheitert häufiger.",
        ],
      },
      { h2: "Formation erkannt oder hineininterpretiert?" },
      {
        p: "Die größte Gefahr ist, das zu sehen, was man sehen will. Ein Blick von außen hilft, und genau dafür ist eine [technische Analyse per KI](/blog/ki-technische-analyse) besonders nützlich. Auf einem Screenshot benennt [Scanzivo](/) die erkannten Formationen, gibt ihre Bestätigungslinie an und sagt, was das Szenario ungültig machen würde.",
      },
    ],
  },
  {
    key: "rsi-indicateur",
    slug: "rsi-indikator",
    title: "Der RSI-Indikator: richtig lesen, ohne in die Fallen zu tappen",
    description:
      "Was der RSI wirklich misst, warum „überverkauft“ nicht „kaufen“ heißt und wie Sie Divergenzen und die 50er-Linie nutzen.",
    date: "2026-11-01",
    body: [
      {
        p: "Der RSI (Relative Strength Index) ist wahrscheinlich der Indikator, der am häufigsten auf Charts zu sehen ist. Er wird aber auch oft falsch eingesetzt: Viele Einsteiger kaufen, sobald er unter 30 fällt, und sehen dann zu, wie der Kurs weiter nachgibt.",
      },
      { h2: "Was der RSI misst" },
      {
        p: "Der RSI vergleicht die Stärke der jüngsten Anstiege und Rückgänge, meist über **14 Perioden**, und bildet das Ergebnis auf einer Skala von 0 bis 100 ab. Über 70 waren die jüngsten Anstiege deutlich stärker als die Rückgänge, unter 30 ist es umgekehrt. Er misst das **Tempo** der Bewegung, nicht ihre künftige Richtung.",
      },
      { h2: "Überverkauft heißt nicht „kaufen“" },
      {
        p: "In einem starken Abwärtstrend kann der RSI tagelang unter 30 bleiben. Ein „überverkaufter“ Markt kann noch weiter überverkauft werden. Das Signal ist nicht das Unterschreiten der 30, sondern das **Verlassen** dieser Zone, idealerweise an einer erkannten [Unterstützung](/blog/unterstuetzung-und-widerstand) und mit einer Umkehrkerze.",
      },
      { tip: "In einem soliden Aufwärtstrend pendelt der RSI oft zwischen 40 und 80, in einem Abwärtstrend zwischen 20 und 60. Allein diese Spanne verrät viel über die Stärke des Marktes." },
      { h2: "Divergenzen" },
      {
        p: "Eine **bärische Divergenz** entsteht, wenn der Kurs ein höheres Hoch markiert, der RSI aber ein tieferes: Der Anstieg geht weiter, aber mit weniger Kraft. Eine bullische Divergenz ist das Gegenstück am Ende eines Abwärtstrends.",
      },
      {
        p: "Eine Divergenz ist kein sofortiges Verkaufs- oder Kaufsignal. Sie kann lange bestehen, bevor der Kurs reagiert. Vor allem ist sie eine Warnung: den Stop enger ziehen, keine neue Position in Trendrichtung eröffnen, auf einen Bruch der Marktstruktur warten.",
      },
      { h2: "Die 50er-Linie" },
      {
        p: "Die oft vernachlässigte 50er-Linie trennt Phasen, in denen die Anstiege überwiegen, von solchen, in denen die Rückgänge dominieren. Steigt der RSI nach längerer Zeit darunter wieder über 50, geht das häufig mit einem Trendwechsel einher, der sich im Kurs bestätigen muss.",
      },
      { h2: "Die Einstellungen" },
      {
        p: "Die Standardeinstellung von 14 Perioden passt in den meisten Fällen. Eine kürzere Einstellung macht den Indikator nervöser und erzeugt mehr Fehlsignale, eine längere glättet ihn, macht ihn aber träge. Die Einstellung so lange zu verändern, bis man diejenige findet, die in der Vergangenheit „funktioniert hätte“, ist eine Form von Selbstbetrug.",
      },
      { h2: "Der RSI bestätigt, er entscheidet nicht" },
      {
        ul: [
          "Lesen Sie zuerst den Trend und die wichtigen Marken an den Kerzen ab.",
          "Nutzen Sie den RSI, um die Stärke der Bewegung einzuschätzen und Divergenzen zu erkennen.",
          "Legen Sie Einstieg und Stop anhand des Kurses fest, nie allein anhand des RSI.",
        ],
      },
      {
        p: "Ist der RSI auf Ihrem Screenshot zu sehen, berücksichtigt [Scanzivo](/) ihn in der Analyse, etwa um auf eine Divergenz oder nachlassenden Schwung hinzuweisen. Aber wie im Artikel [Trading-Chart lesen](/blog/trading-chart-lesen) erklärt: Ein mit Indikatoren überladener Chart lässt sich schlechter lesen. Zwei oder drei genügen.",
      },
    ],
  },
  {
    key: "comment-lire-un-graphique-de-trading",
    slug: "trading-chart-lesen",
    title: "Trading-Chart lesen: Die Grundlagen für Einsteiger",
    description:
      "Kerzen, Trend, Unterstützungen und Widerstände, Indikatoren: die Grundlagen, um einen Kurschart zu lesen, ohne sich in Indikatoren zu verlieren.",
    date: "2026-10-28",
    body: [
      {
        p: "Ein Kurschart erzählt, was Käufer und Verkäufer getan haben. Bevor Sie nach einem Signal suchen, sollten Sie diese Geschichte lesen können: Wer hat die Oberhand gewonnen, wo ist der Kurs hängen geblieben, und wann hat sich das Kräfteverhältnis verschoben? Hier sind die vier Dinge, auf die Sie achten sollten, in dieser Reihenfolge.",
      },
      { h2: "1. Die Kerzen: Was in jeder Periode passiert ist" },
      {
        p: "Jede Kerze fasst eine Periode zusammen: eine Minute, eine Stunde, einen Tag, je nach gewählter Zeiteinheit. Ihr **Körper** reicht vom Eröffnungs- bis zum Schlusskurs. Er ist grün (oder weiß), wenn der Kurs höher geschlossen als eröffnet hat, sonst rot (oder schwarz). Die **Dochte** ober- und unterhalb zeigen, wie weit sich der Kurs in der Periode bewegt hat, bevor er zurückkam.",
      },
      {
        p: "Ein langer unterer Docht bedeutet, dass die Verkäufer den Kurs gedrückt haben und die Käufer ihn vor Periodenende wieder nach oben gebracht haben. Eine einzelne Kerze reicht nicht für eine Schlussfolgerung, aber mehrere lange Dochte an derselben Stelle zeigen eine Zone, die der Markt nicht durchbrechen will.",
      },
      { h2: "2. Der Trend: In welche Richtung läuft der Markt?" },
      {
        p: "Ein Aufwärtstrend ist eine Folge **immer höherer Hochs** und **immer höherer Tiefs**. Ein Abwärtstrend ist das Gegenteil. Bleiben Hochs und Tiefs ungefähr auf demselben Niveau, befindet sich der Markt in einer Seitwärtsphase (Range): Er zögert.",
      },
      {
        p: "Um den Trend zu erkennen, zoomen Sie heraus: Schauen Sie sich mindestens hundert Kerzen an. Auf zehn Kerzen sieht jede Bewegung wie ein Trend aus. Viele Einsteiger kaufen einen Anstieg, der nur eine Gegenbewegung innerhalb eines größeren Abwärtstrends ist.",
      },
      { tip: "Schauen Sie immer eine Zeiteinheit über der, in der Sie handeln. Wenn Sie im Stundenchart traden, werfen Sie einen Blick auf den 4-Stunden-Chart: Er gibt die übergeordnete Richtung vor." },
      { h2: "3. Unterstützungen und Widerstände: Wo der Kurs reagiert" },
      {
        p: "Eine **Unterstützung** ist eine Zone, in der der Kurs mehrmals aufgehört hat zu fallen: Dort treten Käufer auf. Ein **Widerstand** ist eine Zone, in der er aufgehört hat zu steigen: Dort warten Verkäufer. Es sind Zonen, keine centgenauen Linien. Je öfter und deutlicher der Kurs dort reagiert hat, desto wichtiger sind sie.",
      },
      {
        p: "Wird ein Widerstand mit einem klaren Schlusskurs darüber überwunden, wird er häufig zur Unterstützung. Das ist eine der nützlichsten Verhaltensweisen, die Sie kennen sollten: Die alte Decke wird zum Boden.",
      },
      { h2: "4. Indikatoren: zum Bestätigen, nicht zum Entscheiden" },
      {
        p: "Gleitende Durchschnitte, RSI, MACD: Indikatoren werden aus dem Kurs berechnet. Sie fügen keine neue Information hinzu, sie stellen sie nur anders dar. Sie helfen, das zu bestätigen, was Sie an den Kerzen bereits sehen, zum Beispiel ein RSI, der schwächer wird, während der Kurs ein neues Hoch markiert: ein Zeichen, dass dem Anstieg die Luft ausgeht.",
      },
      {
        p: "Zwei oder drei Indikatoren reichen. Ein mit Linien übersäter Chart lässt sich nicht mehr lesen, und am Ende sagt jeder Indikator etwas anderes.",
      },
      { h2: "Das Wichtigste in Kürze" },
      {
        ul: [
          "Lesen Sie die Kerzen, um zu wissen, wer den Markt in jeder Periode kontrolliert.",
          "Bestimmen Sie den Trend über mindestens hundert Kerzen und in der nächsthöheren Zeiteinheit.",
          "Zeichnen Sie die Zonen ein, an denen der Kurs mehrfach reagiert hat: Das sind Ihre Orientierungspunkte für Einstieg, Ausstieg und Stop.",
          "Nutzen Sie Indikatoren zur Bestätigung, nie als alleinige Entscheidungsgrundlage.",
        ],
      },
      {
        p: "Mit diesen vier Elementen im Kopf wird ein Chart zur Landkarte: Sie wissen, wo Sie stehen, wohin der Kurs laufen könnte und ab welchem Punkt Ihre Idee falsch wäre. Diese letzte Frage vergessen die meisten Einsteiger.",
      },
    ],
  },
  {
    key: "supports-et-resistances",
    slug: "unterstuetzung-und-widerstand",
    title: "Unterstützung und Widerstand: erkennen und richtig nutzen",
    description:
      "Wie Sie Unterstützungen und Widerstände einzeichnen, die wirklich zählen, einen echten Ausbruch erkennen und sie für Einstieg, Ausstieg und Stop nutzen.",
    date: "2026-10-28",
    body: [
      {
        p: "Unterstützungen und Widerstände sind die ersten Marken, die jeder Trader einzeichnet, und oft die nützlichsten. Allerdings nur, wenn es die richtigen sind: Ein Chart mit zwanzig Linien sagt nichts mehr aus.",
      },
      { h2: "Was eine Unterstützung oder ein Widerstand wirklich ist" },
      {
        p: "Eine Unterstützung ist eine Kurszone, in der die Nachfrage mehrmals ausgereicht hat, um einen Rückgang zu stoppen. Ein Widerstand ist eine Zone, in der das Angebot ausgereicht hat, um einen Anstieg zu stoppen. Dahinter stehen echte Orders: Käufer, die die letzte Erholung verpasst haben und auf dieses Niveau warten, Verkäufer, die ohne Verlust aussteigen wollen.",
      },
      {
        p: "Deshalb spricht man von **Zonen** und nicht von Linien. Der Kurs schießt oft etwas über die Marke hinaus, bevor er dreht. Wer ein Band von einigen Zehntelprozent einzeichnet, hält eine Marke nicht vorschnell für gebrochen, wenn sie nur getestet wird.",
      },
      { h2: "So zeichnen Sie die Marken ein, die zählen" },
      {
        ol: [
          "Beginnen Sie mit einem weiten Blick: mehrere Monate im Tageschart oder mehrere Wochen im 4-Stunden-Chart.",
          "Suchen Sie die Stellen, an denen der Kurs mindestens zweimal gedreht hat. Ein einzelner Kontakt macht noch keine Marke.",
          "Bevorzugen Sie deutliche Reaktionen: lange Dochte, kräftige Beschleunigung in die Gegenrichtung.",
          "Behalten Sie die zwei oder drei Marken, die dem aktuellen Kurs am nächsten liegen, darüber und darunter. Die anderen sind für Ihre nächste Entscheidung zu weit entfernt.",
        ],
      },
      { tip: "Runde Zahlen (60.000 beim Bitcoin, 1,1000 beim EUR/USD) ziehen oft Orders an. Liegt eine eingezeichnete Marke in der Nähe einer runden Zahl, gewinnt sie an Bedeutung." },
      { p: "Beim Gold spielen Vielfache von 50 und 100 $ ständig diese Rolle: siehe unsere [Seite zur XAU/USD-Analyse](/gold)." },
      { h2: "Ausbruch oder Fehlausbruch?" },
      {
        p: "Steigt der Kurs über einen Widerstand, ist das noch kein Ausbruch, solange die Kerze nicht darüber **geschlossen** hat. Viele Bewegungen durchstoßen eine Marke für ein paar Minuten und fallen dann zurück: Das ist ein Fehlausbruch, und wer zu früh gekauft hat, sitzt in der Falle.",
      },
      {
        p: "Zwei Anzeichen machen einen Ausbruch glaubwürdiger: ein Schlusskurs deutlich jenseits der Zone und eine Rückkehr des Kurses an die alte Marke, die hält (der bekannte Retest). Wer darauf wartet, verpasst manchmal die Bewegung, umgeht aber einen Großteil der Fallen.",
      },
      { h2: "So nutzen Sie die Marken für einen Trade" },
      {
        ul: [
          "**Einstieg**: nahe einer Unterstützung in einem Aufwärtstrend oder nach dem bestätigten Ausbruch über einen Widerstand.",
          "**Stop setzen**: auf der anderen Seite der Zone, die den Trade begründet, mit etwas Abstand. Bricht die Unterstützung, ist die ursprüngliche Idee hinfällig.",
          "**Kursziel**: der nächste Widerstand bei einem Kauf, die nächste Unterstützung bei einem Verkauf. Dort nehmen andere Trader ihre Gewinne mit.",
        ],
      },
      {
        p: "So steht ein vollständiger Plan, bevor Sie überhaupt einsteigen: ein Einstiegspunkt, ein Punkt, an dem Sie sich einen Irrtum eingestehen, und ein realistisches Ziel. Damit können Sie anschließend berechnen, ob sich das Risiko lohnt.",
      },
    ],
  },
  {
    key: "ou-placer-son-stop-loss",
    slug: "stop-loss-richtig-setzen",
    title: "Stop-Loss richtig setzen: 4 Orientierungspunkte aus dem Chart",
    description:
      "Ein Stop-Loss gehört dorthin, wo Ihre Idee falsch wird, nicht auf einen willkürlichen Prozentsatz. Vier konkrete Orientierungspunkte, um ihn im Chart zu platzieren.",
    date: "2026-10-28",
    body: [
      {
        p: "Der Stop-Loss ist die Order, die eine Position schließt, wenn der Kurs gegen Sie läuft. Viele setzen ihn auf einen festen Prozentsatz, 2 % oder 5 % unter dem Einstieg. Das ist einfach, aber der Markt kennt Ihren Prozentsatz nicht. Ein guter Stop liegt **dort, wo Ihr Grund für den Einstieg nicht mehr besteht**.",
      },
      { h2: "1. Unter der Unterstützung, die den Kauf begründet" },
      {
        p: "Sie kaufen, weil der Kurs an einer Unterstützung abprallt? Bricht diese Unterstützung, ist Ihre Idee widerlegt. Der Stop gehört also knapp unter die Zone, nicht direkt darauf. Lassen Sie etwas Spielraum: Kurse testen eine Marke oft um einige Zehntel, bevor sie drehen.",
      },
      { h2: "2. Unter dem letzten Tief im Aufwärtstrend" },
      {
        p: "In einem Aufwärtstrend liegt jedes Tief höher als das vorherige. Fällt der Kurs unter das letzte Tief, ist die Struktur gebrochen: Der Trend ist nicht mehr derselbe. Ein Stop unter diesem Tief schützt genau die Annahme „der Trend setzt sich fort“.",
      },
      { h2: "3. Jenseits des Dochts einer Ablehnungskerze" },
      {
        p: "Eine Kerze mit langem unterem Docht an einer Unterstützung zeigt, dass die Verkäufer zurückgedrängt wurden. Steigen Sie auf dieses Signal ein, setzen Sie den Stop unter das Ende des Dochts: Kehrt der Kurs dorthin zurück, hat die Ablehnung nicht gehalten.",
      },
      { h2: "4. Abhängig von der Volatilität" },
      {
        p: "Bei einem Wert, der stark schwankt, wird ein enger Stop schon durch das normale Marktrauschen ausgelöst. Der Indikator ATR (Average True Range) misst die durchschnittliche Spanne einer Kerze. Wer den Stop ein- bis zweimal die ATR jenseits seiner Marke setzt, wird nicht durch eine ganz gewöhnliche Schwankung ausgestoppt.",
      },
      { tip: "Ist der richtig platzierte Stop für Ihr Kapital zu weit entfernt, ziehen Sie ihn nicht näher heran: Verkleinern Sie die Position. Die Größe passt sich dem Stop an, nie umgekehrt." },
      { h2: "Teure Fehler" },
      {
        ul: [
          "Den Stop weiter weg verschieben, wenn sich der Kurs ihm nähert. So wird aus einem kleinen, geplanten Verlust ein großer, ungeplanter.",
          "Ihn genau auf eine runde Zahl oder auf die Marke selbst legen, wo alle anderen ihren auch haben.",
          "Gar keinen setzen, „weil es schon wieder steigen wird“.",
        ],
      },
      {
        p: "Ein gut platzierter Stop garantiert nicht, dass der Trade aufgeht. Er garantiert, dass der Verlust, falls nicht, genau der bleibt, den Sie vor dem Einstieg akzeptiert haben.",
      },
    ],
  },
  {
    key: "ratio-gain-risque",
    slug: "chance-risiko-verhaeltnis",
    title: "Das Chance-Risiko-Verhältnis einfach erklärt",
    description:
      "Wie Sie das Chance-Risiko-Verhältnis eines Trades aus Einstieg, Stop und Kursziel berechnen, und warum es genauso wichtig ist wie die Trefferquote.",
    date: "2026-10-28",
    body: [
      {
        p: "Das Chance-Risiko-Verhältnis (CRV) vergleicht, was Sie bei einem Trade gewinnen können, mit dem, was Sie zu verlieren bereit sind. Es ist die einfachste Rechnung im Trading und eine der am meisten vernachlässigten.",
      },
      { h2: "Die Berechnung" },
      {
        p: "Sie brauchen drei Kurse: Einstieg, Stop und Kursziel. Das Risiko ist der Abstand zwischen Einstieg und Stop. Die Chance ist der Abstand zwischen Einstieg und Kursziel. Das Verhältnis ergibt sich, wenn Sie die Chance durch das Risiko teilen.",
      },
      {
        p: "Ein fiktives Beispiel: Einstieg bei 100, Stop bei 95, Ziel bei 112. Das Risiko beträgt 5, die Chance 12. Das CRV liegt bei 12 ÷ 5 = **2,4**. Für jeden riskierten Euro peilen Sie 2,40 € an.",
      },
      { h2: "Warum es so wichtig ist wie die Trefferquote" },
      {
        p: "Mit einem CRV von 2 können Sie in zwei von drei Fällen danebenliegen und kommen trotzdem ohne Gebühren gerechnet bei null heraus: Ein Gewinn von +2 gleicht zwei Verluste von −1 aus. Umgekehrt müssen Sie bei einem CRV von 0,5 in zwei von drei Fällen richtigliegen, nur um nichts zu verlieren.",
      },
      {
        p: "Deshalb kann ein Trader, der oft gewinnt, trotzdem Geld verlieren: Wenn er Gewinne zu früh mitnimmt und Verluste laufen lässt, bricht sein tatsächliches Verhältnis ein.",
      },
      { tip: "Berechnen Sie das CRV vor dem Einstieg, nie danach. Sobald man in einer Position ist, findet man immer einen guten Grund, das Ziel näher heranzuholen oder den Stop weiter weg zu legen." },
      { h2: "Ein gutes CRV allein reicht nicht" },
      {
        p: "Ein sehr weit entferntes Kursziel ergibt auf dem Papier ein schmeichelhaftes Verhältnis, aber der Kurs hat keinen Grund, dorthin zu laufen. Das Ziel muss einer echten Marke im Chart entsprechen (beim Kauf dem nächsten Widerstand), und der Stop dem Punkt, an dem die Idee falsch wird. Ein CRV hat nur Aussagekraft, wenn alle drei Kurse aus dem Chart stammen.",
      },
      {
        ul: [
          "Unter 1: Der Trade bringt weniger, als er riskiert. Dafür braucht es einen sehr guten Grund.",
          "Zwischen 1,5 und 3: der Bereich, in dem die meisten vernünftigen Trades liegen.",
          "Über 3: Prüfen Sie, ob das Ziel realistisch ist und nicht nur weit weg.",
        ],
      },
      {
        p: "Bietet kein Trade im Chart ein vernünftiges Verhältnis, ist es oft die beste Entscheidung, nichts zu tun. Nicht zu traden ist eine vollwertige Position.",
      },
    ],
  },
  {
    key: "analyse-technique-ia",
    slug: "ki-technische-analyse",
    title: "Technische Analyse per KI: Was sie gut kann und wo ihre Grenzen liegen",
    description:
      "Was eine KI aus einem Kurschart herauslesen kann, was sie nicht wissen kann und wie Sie sie als zweite Meinung nutzen statt als Orakel.",
    date: "2026-10-28",
    body: [
      {
        p: "KI-Modelle, die Bilder verstehen, können inzwischen einen Chart-Screenshot analysieren: den Trend erkennen, Marken einzeichnen, eine Formation benennen. Das ist nützlich. Zauberei ist es trotzdem nicht, und es lohnt sich zu wissen, wo die Grenze verläuft.",
      },
      { h2: "Was sie gut kann" },
      {
        ul: [
          "**Schnell und ohne Ermüdung lesen**: Marktstruktur, Hochs und Tiefs, Reaktionszonen, in wenigen Sekunden und jedes Mal auf dieselbe Weise.",
          "**Konsequent bleiben**: Sie wendet um 2 Uhr nachts dieselben Regeln an wie um 10 Uhr morgens, ohne Angst, die Bewegung zu verpassen, und ohne den Drang, einen Verlust wieder hereinzuholen.",
          "**Einen vollständigen Plan aufstellen**: Einstieg, Stop, Kursziel und die Marke, an der das Szenario ungültig wird. Genau das vergisst man, wenn man aus dem Bauch heraus entscheidet.",
          "**Sagen, wenn es nichts zu tun gibt**: Ein gutes Tool kommt auch zum Schluss „abwarten“ oder „nicht traden“, statt ein Signal zu erzwingen.",
        ],
      },
      { h2: "Was sie nicht wissen kann" },
      {
        ul: [
          "**Die Zukunft.** Keine Analyse, ob von Mensch oder Maschine, weiß, was der Kurs tun wird. Eine Wahrscheinlichkeit von 70 % bedeutet, dass das Gegenszenario ebenfalls eintritt, und zwar oft.",
          "**Was nicht auf dem Bild ist.** Ein unscharfer, zu stark gezoomter Screenshot oder einer ohne lesbare Preisachse führt zu einer weniger verlässlichen Einschätzung.",
          "**Ihre Situation.** Sie kennt weder Ihr Kapital noch Ihre Risikobereitschaft noch Ihre übrigen Positionen.",
        ],
      },
      { tip: "Eine Analyse, die immer völlig sicher klingt, sollte Sie misstrauisch machen. Gute Analysen sagen auch, wenn ein Signal schwach oder widersprüchlich ist." },
      { h2: "Als zweite Meinung nutzen" },
      {
        p: "Am besten nutzen Sie eine KI-Analyse, indem Sie sie mit Ihrer eigenen vergleichen. Sieht sie dasselbe wie Sie, ist Ihre Idee stimmig. Kommt sie zum gegenteiligen Schluss oder zu „abwarten“, ist das der Moment, sich zu fragen, was Sie übersehen haben. Sie spart Ihnen Zeit beim Lesen des Charts und zwingt Sie, einen Plan mit konkreten Zahlen aufzustellen, bevor Sie klicken.",
      },
      {
        p: "Für genau diesen Zweck wurde Scanzivo entwickelt: Sie senden einen Screenshot Ihres Charts und erhalten eine strukturierte Einschätzung mit einem klaren Handlungsplan, auch wenn dieser Plan lautet, nichts zu tun. Die Entscheidung und das Risiko bleiben bei Ihnen.",
      },
    ],
  },
  {
    key: "capture-ecran-graphique",
    slug: "chart-screenshot",
    title: "Einen guten Chart-Screenshot für die Analyse erstellen",
    description:
      "Mit TradingView, Binance, MetaTrader oder am Smartphone: So machen Sie einen gut lesbaren Chart-Screenshot, was darauf zu sehen sein sollte und was nicht.",
    date: "2026-10-28",
    body: [
      {
        p: "Ob Sie einen Freund, ein Forum oder eine KI um ihre Meinung bitten: Die Qualität der Antwort hängt zuerst vom Screenshot ab. Ein guter Screenshot ist in dreißig Sekunden vorbereitet.",
      },
      { h2: "Was sichtbar sein muss" },
      {
        ul: [
          "**Die Preisachse**, gut lesbar, am rechten Rand. Ohne sie lässt sich keine genaue Marke angeben.",
          "**Name des Werts und Zeiteinheit** (zum Beispiel BTC/USDT, 4H), bei den meisten Plattformen oben links.",
          "**Genug Historie**: mindestens 50 bis 100 Kerzen. Einen Trend liest man nicht an zehn Kerzen ab.",
          "**Kerzen** statt einer einfachen Linie: Sie zeigen Eröffnung, Schluss und Dochte.",
        ],
      },
      { h2: "Was Sie besser vermeiden" },
      {
        ul: [
          "Extremes Hineinzoomen auf die letzten Kerzen.",
          "Ein mit dem Handy abfotografierter Bildschirm: Spiegelungen, schräger Winkel, Unschärfe.",
          "Ein Chart voller Indikatoren und Zeichnungen, die die Kerzen verdecken.",
          "Ein Orderfenster oder Pop-up über dem Chart.",
        ],
      },
      { h2: "Je nach Plattform" },
      { h3: "TradingView" },
      {
        p: "Über das Kamerasymbol oben rechts laden Sie ein sauberes Bild des Charts herunter, ohne den Rest des Bildschirms. Alternativ funktioniert ein normaler Screenshot des Fensters genauso gut.",
      },
      { h3: "Binance und andere Exchange-Apps" },
      {
        p: "Schalten Sie den Chart in den Vollbildmodus (meist ein Symbol mit Pfeilen), wählen Sie die Zeiteinheit und machen Sie dann einen Screenshot mit dem Smartphone. Halten Sie das Handy quer, um mehr Historie anzuzeigen.",
      },
      { h3: "MetaTrader 4 und 5" },
      {
        p: "Rechtsklick auf den Chart, dann „Als Bild speichern“. Am Smartphone machen Sie einen Screenshot, sobald der Chart im Querformat angezeigt wird.",
      },
      { h3: "Am Computer" },
      {
        p: "Windows: Windows-Taste + Umschalt + S, dann den Chartbereich auswählen. Mac: Cmd + Ctrl + Umschalt + 4. In beiden Fällen landet der Screenshot in der Zwischenablage und kann direkt eingefügt werden.",
      },
      { tip: "Bei Scanzivo können Sie einen kopierten Screenshot direkt mit Strg+V (bzw. Cmd+V) auf der Seite einfügen, ganz ohne Datei." },
      {
        p: "Ein scharfer Screenshot mit Preisachse und ausreichend Historie ist mehr wert als zehn ungenaue. Erst er macht es möglich, konkrete Marken statt Allgemeinplätzen zu nennen.",
      },
    ],
  },
  {
    key: "ia-et-trading",
    slug: "ki-im-trading",
    title: "KI im Trading: Was künstliche Intelligenz wirklich für Sie tun kann",
    description:
      "Charts lesen, Nachrichten zusammenfassen, einen Plan einhalten: was KI privaten Tradern bringt und was sie Ihnen niemals abnehmen wird.",
    date: "2026-10-28",
    body: [
      {
        p: "„Mit KI traden“ kann sehr Unterschiedliches bedeuten: ein Assistent, der einen Chart kommentiert, ein Tool, das Nachrichten zusammenfasst, ein Bot, der selbstständig Orders platziert. Für private Trader ist nicht die Frage entscheidend, wie leistungsfähig die KI ist, sondern bei welchem Schritt Ihrer Entscheidung sie Ihnen hilft.",
      },
      { h2: "Wo sie wirklich hilft" },
      { h3: "Einen Chart lesen, ohne sich etwas vorzumachen" },
      {
        p: "Ein Modell, das Bilder versteht, erkennt Trend, Reaktionszonen und Formationen in wenigen Sekunden. Vor allem macht es das jedes Mal auf dieselbe Weise. Sie selbst lesen nach drei Verlusten in Folge nicht mehr denselben Chart wie am Wochenanfang.",
      },
      { h3: "Einen Plan aufstellen, bevor Sie klicken" },
      {
        p: "Die Schwachstelle der meisten privaten Trader ist nicht die Analyse, sondern der fehlende Plan: Man steigt ein, ohne zu wissen, wo man wieder aussteigt. Ein Tool, das Ihnen jedes Mal Einstieg, Stop, Kursziel und die Marke nennt, an der die Idee ungültig wird, zwingt Sie, sich diese Fragen vor dem Kauf zu stellen, nicht danach.",
      },
      { h3: "Nachrichten sortieren" },
      {
        p: "Eine Zinsentscheidung, eine Inflationszahl oder Quartalszahlen können jedes technische Signal zunichtemachen. Eine KI mit Internetzugang kann in wenigen Sekunden die anstehenden Termine zu Ihrem Wert heraussuchen, samt Quellen.",
      },
      { h2: "Was sie Ihnen nicht abnimmt" },
      {
        ul: [
          "**Den Kurs vorhersagen.** Sie schätzt Szenarien ein. Ein Szenario mit 70 % liegt per Definition etwa dreimal von zehn daneben.",
          "**Entscheiden, wie viel Sie riskieren.** Sie kennt weder Ihr Kapital noch Ihre übrigen Positionen noch das, was Sie sich leisten können zu verlieren.",
          "**Sie vom Klicken abhalten.** Der beste Plan nützt nichts, wenn Sie Ihren Stop bei der ersten Gegenbewegung verschieben.",
        ],
      },
      { tip: "Seien Sie vorsichtig bei jedem Dienst, der KI als Gewinnmaschine darstellt. Seriöse Tools sprechen von Wahrscheinlichkeiten, Plänen und Risiken, nie von garantierter Rendite." },
      { h2: "Wo Sie anfangen" },
      {
        p: "Am einfachsten nutzen Sie KI als zweite Meinung zu Trades, die Sie ohnehin eingegangen wären. Analysieren Sie den Chart zuerst selbst, notieren Sie Ihren Plan und vergleichen Sie ihn dann mit der Einschätzung der KI. Wo Sie übereinstimmen, gewinnen Sie Sicherheit. Wo Sie abweichen, lernen Sie etwas dazu: entweder über den Markt oder über Ihre eigenen Denkfehler.",
      },
      {
        p: "Für genau diesen Zweck wurde Scanzivo entwickelt: ein Chart-Screenshot, eine strukturierte Einschätzung, ein Plan mit konkreten Zahlen, und die Entscheidung bleibt bei Ihnen.",
      },
    ],
  },
  {
    key: "analyser-un-graphique-avec-chatgpt",
    slug: "chart-mit-chatgpt-analysieren",
    title: "Einen Chart mit ChatGPT analysieren: Was funktioniert, was hakt",
    description:
      "ChatGPT kann einen Chart-Screenshot lesen. Was es gut macht, auf welche Fehler Sie achten sollten und wie Sie Ihre Anfrage formulieren, um eine brauchbare Antwort zu bekommen.",
    date: "2026-10-28",
    body: [
      {
        p: "Allgemeine KI-Assistenten wie ChatGPT, Claude oder Gemini verarbeiten auch Bilder. Sie können ihnen also einen Screenshot Ihres Charts schicken und um eine Analyse bitten. Das Ergebnis ist oft interessant, schwankt aber stark, und es lohnt sich zu verstehen, warum.",
      },
      { h2: "Was gut funktioniert" },
      {
        ul: [
          "Den allgemeinen Trend und die Struktur beschreiben (Hochs, Tiefs, Seitwärtsphase).",
          "Klassische Formationen erkennen: Doppeltop, Dreieck, Kanal.",
          "Einen eingeblendeten Indikator erklären, etwa was ein RSI über 70 bedeutet.",
          "Auf Ihre Nachfragen eingehen, was es zu einem guten Werkzeug zum Lernen macht.",
        ],
      },
      { h2: "Was hakt" },
      {
        ul: [
          "**Ungenaue Marken.** Ein allgemeiner Assistent liest die Preisachse manchmal falsch und nennt sehr selbstsicher eine Unterstützung, die es gar nicht gibt.",
          "**Wechselnde Antworten.** Derselbe Screenshot kann zweimal geschickt zu zwei unterschiedlichen Ergebnissen führen, weil keine feste Methode dahintersteht.",
          "**Lauwarme Antworten.** Ohne genaue Vorgabe beschreibt die Antwort viel und legt sich wenig fest: „Der Markt könnte steigen oder fallen.“",
          "**Kein vollständiger Plan.** Einstieg, Stop, Kursziel und Chance-Risiko-Verhältnis kommen nur, wenn Sie danach fragen, und nicht immer stimmig.",
        ],
      },
      { h2: "So formulieren Sie Ihre Anfrage besser" },
      {
        p: "Ein großer Teil des Ergebnisses hängt von der Frage ab. Liefern Sie den Kontext mit und geben Sie das Antwortformat vor. Zum Beispiel:",
      },
      {
        tip: "„Hier ist ein BTC/USDT-Chart im 4-Stunden-Zeitrahmen. Nenne den Trend, die beiden nächstgelegenen Unterstützungen und Widerstände mit ihrem Kurs laut Preisachse und dann ein einziges bevorzugtes Szenario mit Einstieg, Stop, Kursziel und Chance-Risiko-Verhältnis. Wenn kein Trade ein Verhältnis über 1,5 bietet, sag das.“",
      },
      {
        p: "Prüfen Sie anschließend jede genannte Marke an Ihrem eigenen Chart. Entspricht ein Kurs nichts, was dort zu sehen ist, verwenden Sie ihn nicht.",
      },
      { h2: "Allgemeiner Assistent oder spezialisiertes Tool" },
      {
        p: "Ein allgemeiner Assistent eignet sich sehr gut zum Lernen und für Fragen. Ein spezialisiertes Tool wie Scanzivo wendet bei jedem Screenshot dieselbe Methode an, zeichnet die Marken in Ihren Chart ein, berechnet das Chance-Risiko-Verhältnis und kann auch zu „abwarten“ oder „nicht traden“ raten. Das eine erklärt, das andere liefert Ihnen einen Plan. In beiden Fällen bleibt die Entscheidung bei Ihnen.",
      },
    ],
  },
  {
    key: "bots-de-trading-ia-arnaques",
    slug: "ki-trading-bots-betrug",
    title: "„KI“-Trading-Bots: irreführende Versprechen erkennen",
    description:
      "Garantierte Renditen, Bots, die „nie verlieren“, kostenpflichtige Privatgruppen: die Warnsignale, die Sie kennen sollten, bevor Sie einem KI-Trading-Bot Geld anvertrauen.",
    date: "2026-10-28",
    body: [
      {
        p: "Das Wort „KI“ ist zum Verkaufsargument für alle möglichen Trading-Angebote geworden. Manche davon sind seriöse Werkzeuge. Andere verkaufen die altbekannten Maschen mit einem technischen Anstrich. Einige Warnsignale helfen, die Spreu vom Weizen zu trennen.",
      },
      { h2: "Die Warnsignale" },
      {
        ul: [
          "**Eine versprochene Rendite**, vor allem eine im Voraus bezifferte: „+5 % pro Woche“, „30 % im Monat“. Kein Tool kann an den Märkten eine Rendite garantieren.",
          "**Screenshots von Gewinnen ohne Verluste.** Eine Historie, die nur Gewinntrades zeigt, ist entweder unvollständig oder erfunden.",
          "**Zeitdruck**: begrenzte Plätze, ein Angebot, das heute Abend ausläuft, „letzte Chance“.",
          "**Sie sollen Geld einzahlen** auf einer Plattform, die Sie nicht kennen, oder Zugriff auf Ihr Depot oder Brokerkonto gewähren.",
          "**Bezahlte Empfehlungen** als Kern des Geschäftsmodells: Sie verdienen vor allem, indem Sie andere Leute anwerben.",
        ],
      },
      { tip: "Ein seriöses Analysetool zeigt Ihnen, wie es zu seinen Schlüssen kommt, nennt seine Grenzen und lässt Sie entscheiden. Ein Dienst, der „für Sie tradet“, ohne etwas zu erklären, verlangt vor allem, dass Sie ihm vertrauen." },
      { h2: "Was eine Erlaubnis braucht" },
      {
        p: "In Deutschland ist es erlaubnispflichtig, Ihr Geld zu verwalten, Orders für Sie zu platzieren oder Ihnen persönlich zu empfehlen, was Sie kaufen sollen. Ein solcher Anbieter braucht eine Erlaubnis der Bundesanstalt für Finanzdienstleistungsaufsicht (BaFin), die Sie in deren Unternehmensdatenbank überprüfen können. Anbieter aus anderen EU-Ländern sind bei ihrer nationalen Aufsichtsbehörde registriert.",
      },
      {
        p: "Die BaFin veröffentlicht außerdem Warnungen vor Unternehmen und Websites, die ohne Erlaubnis Geldanlagen anbieten. Eine kurze Suche auf der BaFin-Website, bevor Sie bezahlen, erspart Ihnen viel Ärger.",
      },
      { h2: "Die richtigen Fragen" },
      {
        ol: [
          "Wer steckt hinter dem Angebot: ein identifizierbares Unternehmen mit Impressum?",
          "Behalte ich die Kontrolle über mein Geld und meine Orders?",
          "Spricht der Anbieter über Risiken und Verluste oder nur über Gewinne?",
          "Kann ich einfach und ohne versteckte Kosten aufhören?",
        ],
      },
      {
        p: "Ein Tool, das Ihnen bei der Analyse hilft, ohne Ihr Geld anzurühren und ohne Ergebnisse zu versprechen, übt keine dieser erlaubnispflichtigen Tätigkeiten aus: Sie entscheiden selbst und platzieren Ihre Orders selbst. Das gilt für Scanzivo, das eine Chart-Einschätzung ausschließlich zu Informationszwecken liefert. Sie stellt keine Anlageberatung dar.",
      },
    ],
  },
  {
    key: "choisir-un-outil-ia-de-trading",
    slug: "ki-trading-tool-auswaehlen",
    title: "Ein KI-Tool fürs Trading auswählen: 7 Fragen, die Sie sich stellen sollten",
    description:
      "Bevor Sie für ein KI-Trading-Tool bezahlen: sieben einfache Fragen, um herauszufinden, ob es Sie weiterbringt oder vor allem ein Versprechen verkauft.",
    date: "2026-10-28",
    body: [
      {
        p: "KI-Tools fürs Trading gibt es inzwischen viele, in allen Preisklassen. Statt einer Rangliste, die schnell veraltet wäre, finden Sie hier die Fragen, mit denen Sie jedes beliebige Tool in wenigen Minuten beurteilen können.",
      },
      { h2: "1. Was genau macht es?" },
      {
        p: "Einen Chart analysieren, Signale verschicken, automatisch Orders platzieren: Das sind drei verschiedene Aufgaben mit drei unterschiedlichen Risikostufen. Ein Analysetool lässt Sie entscheiden. Ein Bot, der für Sie handelt, entscheidet an Ihrer Stelle.",
      },
      { h2: "2. Legt es seine Begründung offen?" },
      {
        p: "Ein „Jetzt kaufen“ ohne Erklärung bringt Ihnen nichts bei und lässt sich nicht überprüfen. Eine gute Analyse sagt, warum: Trend, Marken und das, was das Szenario ungültig machen würde.",
      },
      { h2: "3. Kann es „Tun Sie nichts“ sagen?" },
      {
        p: "Ein Tool, das in jedem Chart einen Trade findet, verleitet zum Overtrading. Oft ist Abwarten die beste Entscheidung. Prüfen Sie, ob das Tool das auch sagen kann.",
      },
      { h2: "4. Liefert es einen Plan mit konkreten Zahlen?" },
      {
        p: "Einstieg, Stop, Kursziel und Chance-Risiko-Verhältnis: Ohne diese vier Elemente bleibt eine Analyse eine Meinung. Mit ihnen wissen Sie vor dem Einstieg, wie viel Sie riskieren und wofür.",
      },
      { h2: "5. Funktioniert es mit Ihren Werkzeugen?" },
      {
        p: "Wenn Sie über TradingView, Binance oder MetaTrader handeln, sollte sich das Tool an Ihre Plattform anpassen, nicht umgekehrt. Ein einfacher Screenshot ist oft der universellste Weg.",
      },
      { h2: "6. Was verspricht es?" },
      {
        p: "Eine groß angepriesene Trefferquote, monatliche Renditen, „garantierte“ Gewinne: Finger weg. Ein seriöses Tool spricht von Wahrscheinlichkeiten und weist darauf hin, dass Trading mit dem Risiko eines Kapitalverlusts verbunden ist.",
      },
      { h2: "7. Was kostet es, und wie kündige ich?" },
      {
        p: "Achten Sie auf den tatsächlichen Preis nach der Testphase, auf den Leistungsumfang und auf die Kündigungsmöglichkeiten. Ein Abo, das sich mit einem Klick im Kundenbereich kündigen lässt, ist ein gutes Zeichen. Eine zwölfmonatige Bindung an ein Tool, das Sie nie getestet haben, eher nicht.",
      },
      {
        tip: "Testen Sie das Tool an vergangenen Charts, deren weiteren Verlauf Sie kennen. So sehen Sie schnell, ob es den Markt treffend liest oder nur Allgemeinplätze aufsagt.",
      },
      {
        p: "Der Transparenz halber: Scanzivo ist ein Tool zur Chartanalyse per Screenshot. Auf diese Fragen antwortet es so: Es erklärt seine Begründung, kann zu „abwarten“ oder „nicht traden“ raten, liefert einen Plan mit konkreten Zahlen, verspricht keine Gewinne, und das Abo lässt sich jederzeit im Kundenbereich kündigen.",
      },
    ],
  },
];
