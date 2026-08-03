# Praxis am Lindenmarkt

Demo-Website einer Hausarztpraxis, gebaut von [Frame Studio](https://studio-three-pi-87.vercel.app)
als Beispiel dafür, wie eine Praxis-Website 2026 aussehen und funktionieren kann.

Die Praxis ist frei erfunden. Namen, Adresse und Telefonnummer sind erdacht, die
Nummer stammt aus dem Block, den die Bundesnetzagentur für Medienproduktionen
reserviert hat. Ein Hinweis darauf steht in der Leiste am Seitenkopf und im
Impressum.

## Schnellstart

```bash
npm install
npm run dev
```

## Skripte

| Befehl | Zweck |
|---|---|
| `npm run dev` | Entwicklungsserver |
| `npm run build` | Produktionsbuild, alle Seiten werden statisch erzeugt |
| `npm run check:copy` | prüft den gerenderten Text auf AI-Slop-Muster, braucht einen Build |
| `npm run check:contrast` | prüft alle Farbpaare gegen WCAG 2.1 AA |
| `npm run bilder` | zeigt offene Bildplätze, lädt Fotos nach `public/bilder` |
| `npm run check` | Copy, Kontraste und Lint in einem Durchlauf |

## Was diese Demo zeigen soll

Die Recherche zu Praxis-Websites läuft auf fünf Punkte hinaus. Jeder davon ist
hier umgesetzt und nachprüfbar.

**Der Termin ist das Produkt.** Über 70 Prozent der Praxissuchen kommen vom
Handy. Der Weg zum Termin steht im Hero, in jeder Leistungsseite, in der
Kopfzeile und als feste Leiste am unteren Bildschirmrand. Die offene
Sprechstunde steht direkt neben dem Hero-Bild, weil akut Kranke genau danach
suchen.

**Öffnungszeiten, die sich selbst kennen.** Der Status oben zeigt, ob gerade
geöffnet ist, und wann sonst wieder. Er rechnet in der Zeitzone Europe/Berlin,
unabhängig davon, wo Besucher oder Server stehen, und aktualisiert sich jede
Minute.

**Barrierefreiheit als Bauweise, nicht als Nachtrag.** Seit dem 28. Juni 2025
gilt das Barrierefreiheitsstärkungsgesetz. Kleinstunternehmen sind ausgenommen,
aber nicht, sobald eine Website eine Online-Terminbuchung anbietet. 96,3 Prozent
der meistbesuchten Websites haben messbare WCAG-Fehler, hier ist das ein
Unterscheidungsmerkmal. Details in `/barrierefreiheit`.

**Datenschutz ohne Einwilligungsbanner.** Keine Cookies, keine Analyse, keine
externen Anfragen. Schriften liefert `next/font` vom eigenen Server. Statt einer
Google-Maps-Einbettung steht ein selbst gezeichneter Lageplan im HTML. Deshalb
gibt es nichts, wozu jemand einwilligen müsste.

**Tempo.** Alle 24 Seiten werden statisch erzeugt. Keine Animationsbibliothek,
kein Smooth-Scroll-Paket, kein Icon-Set. Pro zusätzlicher Ladesekunde sinkt die
Conversion um rund 4,4 Prozent, das ist der teuerste Fehler auf Praxisseiten.

## Aufbau

```
src/
  app/          Seiten, Sitemap, robots.txt
  components/   Bausteine, Client-Komponenten nur wo nötig
  content/      alle Inhalte als TypeScript und JSON
  lib/          Öffnungszeitenlogik, Bildregistry
scripts/        Prüf- und Hilfsskripte
docs/           Copy-Styleguide und Bildanleitung
```

Inhalte stehen von der Darstellung getrennt in `src/content/`. Wer Sprechzeiten,
Team oder Leistungen ändern will, fasst kein JSX an.

## Bilder

Die Seite läuft ohne ein einziges Foto und zeigt dann gestaltete Grafiken in den
Praxisfarben. Sobald unter `public/bilder/` eine Datei mit dem Namen des
Bildplatzes liegt, wird sie verwendet. Anleitung in [docs/BILDER.md](docs/BILDER.md).

## Texte

Alle sichtbaren Texte folgen [docs/COPY-STYLEGUIDE.md](docs/COPY-STYLEGUIDE.md).
Der Styleguide sammelt die Muster, an denen man generierte Texte erkennt, und
`npm run check:copy` prüft den gerenderten HTML-Text automatisch dagegen.

## Für den Echtbetrieb

Impressum, Datenschutzerklärung und Barrierefreiheitserklärung sind vollständig
ausformuliert, aber mit erfundenen Daten. Sie gehören vor dem Livegang durch
echte Angaben ersetzt und juristisch geprüft. Die Stellen sind auf den Seiten als
Demo-Hinweis markiert.

Das Buchungssystem ist bewusst nicht angebunden. Auf `/termin` ist der Platz
dafür vorbereitet, dort kommt Doctolib, samedi oder Dr. Flex hinein.
