# Bilder

Die Website läuft ohne ein einziges Foto. Jeder Bildplatz zeigt dann eine
gestaltete Grafik in den Praxisfarben, bei Porträts mit den Initialen. Das ist
kein grauer Kasten, sondern ein bewusst entworfener Zustand.

Sobald unter `public/bilder/` eine Datei liegt, deren Name dem Bildplatz
entspricht, wird sie automatisch verwendet. Es ist keine Codeänderung nötig.

## Bildplätze

| Datei | Format | Motiv |
|---|---|---|
| `hero.jpg` | 1600 mal 1100 | Empfangstresen mit Blick in den Wartebereich |
| `wartezimmer.jpg` | 1400 mal 1120 | Wartebereich, Holzstühle, Tageslicht |
| `flur.jpg` | 900 mal 1200 | Praxisflur, Hochformat |
| `sprechzimmer.jpg` | 1200 mal 750 | Sprechzimmer mit Schreibtisch und Liege |
| `labor.jpg` | 1200 mal 750 | Blutröhrchen auf der Laborablage |
| `impfung.jpg` | 1200 mal 750 | Ampulle und Spritze auf einem Tablett |
| `geraet.jpg` | 1200 mal 750 | Blutdruckmessgerät |
| `ultraschall.jpg` | 1200 mal 750 | Ultraschallgerät im Untersuchungsraum |
| `hausbesuch.jpg` | 1200 mal 750 | Arzttasche auf einem Küchentisch |
| `ottensen.jpg` | 1600 mal 900 | Straßenzug im Viertel |
| `vogt.jpg` | 800 mal 1000 | Porträt, Hochformat |
| `reinhardt.jpg` | 800 mal 1000 | Porträt, Hochformat |
| `alkan.jpg` | 800 mal 1000 | Porträt, Hochformat |
| `kroeger.jpg` | 800 mal 1000 | Porträt, Hochformat |
| `nguyen.jpg` | 800 mal 1000 | Porträt, Hochformat |
| `petersen.jpg` | 800 mal 1000 | Porträt, Hochformat |
| `brandt.jpg` | 800 mal 1000 | Porträt, Hochformat |

Die maßgebliche Liste steht in `src/content/bilder.json`, samt Alternativtexten
und Suchbegriffen. Wer dort etwas ändert, ändert es für Website und Skript
gleichzeitig.

## Fotos einspielen

**Eigene Dateien aus einem Ordner übernehmen**

```bash
node scripts/fetch-images.mjs --from ~/Downloads/praxisfotos
```

Das Skript sucht Dateien, deren Name mit dem Bildplatz beginnt. `hero.jpg`,
`hero-final.jpg` und `vogt_02.jpg` werden alle erkannt.

**Von Unsplash laden**

```bash
UNSPLASH_ACCESS_KEY=xxx node scripts/fetch-images.mjs
```

Einen kostenlosen Schlüssel gibt es unter unsplash.com/developers. Das Skript
sucht pro Bildplatz nach dem hinterlegten Begriff, lädt das beste Ergebnis im
richtigen Zuschnitt und schreibt die Urheber nach `public/bilder/CREDITS.md`.

**Aktuellen Stand ansehen**

```bash
node scripts/fetch-images.mjs
```

Ohne Argumente listet das Skript alle Plätze und zeigt, welche noch offen sind.

## Worauf bei der Auswahl zu achten ist

Die Recherche zu Praxis-Websites ist an einem Punkt eindeutig: Ein dekoratives
Stockfoto einer lächelnden Pflegekraft baut kein Vertrauen auf. Echte Fotos der
echten Räume und der echten Menschen tun es.

Für eine Demo sind Stockfotos in Ordnung. Für eine Praxis, die damit Patienten
gewinnen will, sind sie die schwächste Option. Frame Studio hat für genau diesen
Fall ein Foto-Shooting im Professional-Paket.

Wenn es Stockfotos sein müssen:

- Motive ohne Kittel-und-Stethoskop-Inszenierung wirken glaubwürdiger.
- Räume schlagen Personen. Ein echter Flur sagt mehr als ein fremdes Gesicht.
- Warmes Tageslicht passt zur Palette, kaltes Klinikweiß bricht sie.
- Porträts brauchen einen ruhigen Hintergrund, sonst kollidieren sie im Raster.

## Rechtliches

Fotos von Mitarbeitenden brauchen eine schriftliche Einwilligung nach Artikel 6
Absatz 1 Buchstabe a Datenschutz-Grundverordnung. Die Einwilligung ist
widerrufbar, deshalb gehört zu jedem Porträt eine Notiz, wer wann zugestimmt
hat.

Patientinnen und Patienten dürfen nie erkennbar abgebildet werden, auch nicht im
Hintergrund. Vorher-Nachher-Bilder operativer Eingriffe verbietet § 11 Absatz 1
Satz 3 Heilmittelwerbegesetz.
