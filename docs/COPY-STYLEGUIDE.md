# Copy-Styleguide

Verbindlich für jeden sichtbaren Text auf der Website. Grundlage sind die von der
Wikipedia-Community (WikiProject AI Cleanup, "Signs of AI writing") dokumentierten
Muster generierter Texte sowie deren deutsche Entsprechungen.

Der Zweck ist nicht Wortverbot, sondern Ergebnis: Die Texte sollen klingen, als hätte
sie das Praxisteam selbst geschrieben. Konkret, sachlich, ohne Werbepathos.

## 1. Zeichensetzung

| Regel | Statt |
|---|---|
| Kein Geviertstrich (—) und kein Halbgeviertstrich (–) als Gedankenstrich | Komma, Doppelpunkt, Klammer oder Punkt |
| Bindestrich nur als echter Bindestrich in Komposita | "Haus-Arzt-Praxis" ist falsch, "Hausarztpraxis" richtig |
| Keine typografischen Pfeile (→) im Fließtext | ausschreiben |
| Keine Auslassungspunkte als Spannungsmittel | Punkt |

Prüfbar per Skript: `npm run check:copy`

## 2. Verbotene Satzfiguren

**Negative Parallelismen.** Das auffälligste Muster überhaupt.
- "Nicht nur X, sondern auch Y"
- "Es geht nicht um X, es geht um Y"
- "Keine X, keine Y, einfach nur Z"

**Dreierfiguren als Füllsel.** Drei Adjektive oder drei Halbsätze in Reihe, die eine
dünne Aussage umfangreich wirken lassen.
- "kompetent, freundlich und zuverlässig"
- "Vertrauen, Kompetenz und Menschlichkeit"

**Redaktionelle Selbstkommentare.** Der Text erklärt, was am Text wichtig ist.
- "Es ist wichtig zu beachten, dass"
- "Erwähnenswert ist außerdem"
- "Zusammenfassend lässt sich sagen"
- "Abschließend sei angemerkt"

**Vage Belege ohne Quelle.**
- "Studien zeigen", "Experten sagen", "Beobachter stellen fest"
- Auf einer Praxisseite ersatzlos streichen oder durch eine konkrete Zahl mit Quelle ersetzen.

**Konditionale Zielgruppenansprache.**
- "Ob Sie X sind oder Y, bei uns sind Sie richtig"

## 3. Verbrannte Wörter und Wendungen (Deutsch)

Werbepathos: ganzheitlich, maßgeschneidert, individuell abgestimmt, auf höchstem Niveau,
modernste Technik, State of the Art, Rundum-Versorgung, Wohlfühlatmosphäre, Ihr
Wohlbefinden steht bei uns im Mittelpunkt, mit Herz und Verstand, Ihre Gesundheit ist
unser Anliegen, wir nehmen uns Zeit für Sie.

Floskel-Satzanfänge: In der heutigen schnelllebigen Welt, Vor diesem Hintergrund,
Nicht zuletzt aufgrund, Am Ende des Tages, Im Kern, Herzlich willkommen auf unserer
Internetseite.

Aufgeblasene Nomen: Spektrum, Landschaft, Bandbreite, Vielfalt, Reise, Meilenstein,
Grundpfeiler, Eckpfeiler, Fundament (im übertragenen Sinn).

Aufgeblasene Verben und Adjektive: spielt eine entscheidende Rolle, unterstreicht,
zeichnet sich aus durch, umfassend, vielfältig, nahtlos, hochmodern, innovativ,
zukunftsweisend, wegweisend.

## 4. Verbrannte Wörter (Englisch, falls Begriffe übernommen werden)

delve, tapestry, pivotal, underscore, foster, testament, enhance, crucial, intricate,
landscape, realm, showcase, leverage, navigate, robust, seamless, comprehensive,
holistic, meticulous, vibrant, embark, journey, unlock, elevate, transformative,
game-changer, cutting-edge, state-of-the-art, boasts, garner, interplay, beacon,
cornerstone, bedrock, mosaic, ecosystem, symphony.

Ebenso: "stands as a testament to", "plays a vital role", "continues to captivate".

## 5. Formatierung

- Überschriften in normaler deutscher Groß- und Kleinschreibung, kein Title Case.
- Kein Fettdruck zur Betonung im Fließtext. Fett nur für echte Labels.
- Keine Emoji in Überschriften.
- Keine Aufzählung, in der jeder Punkt mit einem fett gesetzten Schlagwort plus
  Doppelpunkt beginnt.
- Kein Abschnitt, der am Ende noch einmal zusammenfasst, was gerade dastand.

## 6. Positive Regeln

**Konkret statt qualifizierend.** "Wir nehmen uns Zeit" sagt nichts. "20 Minuten pro
Vorsorgetermin, nicht 8" sagt etwas.

**Zahlen und Namen statt Adjektiven.** Wartezeit, Öffnungszeiten am Samstag, Anzahl der
Behandlungsräume, Name der Ärztin unter dem Zitat.

**Der Patient hat ein Anliegen, keine Beziehung zur Praxis.** Texte beantworten in
dieser Reihenfolge: Bekomme ich hier Hilfe für mein Problem? Wann? Wie komme ich hin?
Was kostet es? Alles andere kommt danach.

**Satzrhythmus wechseln.** Gleichlange Sätze hintereinander sind ein Erkennungszeichen.
Kurze Sätze zwischen längere setzen.

**Vorlesen.** Wenn ein Satz beim lauten Lesen wie eine Broschüre klingt, umschreiben.
