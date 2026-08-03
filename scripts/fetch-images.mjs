#!/usr/bin/env node
/**
 * Holt die Fotos für die Bildplätze nach public/bilder.
 *
 * Solange dort nichts liegt, rendert die Website gestaltete Platzhalter. Sobald
 * eine Datei mit dem Namen des Bildplatzes vorhanden ist, wird sie verwendet.
 *
 * Zwei Wege:
 *
 *   1. Eigene Dateien übernehmen
 *      node scripts/fetch-images.mjs --from ~/Downloads/praxisfotos
 *      Sucht im angegebenen Ordner nach Dateien, deren Name mit dem Bildplatz
 *      beginnt, etwa hero.jpg oder vogt-final.jpg.
 *
 *   2. Von Unsplash laden
 *      UNSPLASH_ACCESS_KEY=xxx node scripts/fetch-images.mjs
 *      Einen kostenlosen Schlüssel gibt es unter unsplash.com/developers.
 *      Das Skript schreibt die Urheber nach public/bilder/CREDITS.md, weil die
 *      Unsplash-Lizenz die Nennung verlangt.
 *
 * Die Bilder liegen danach lokal. Es geht im Betrieb keine Anfrage an Dritte,
 * das ist die Voraussetzung dafür, dass die Seite ohne Einwilligungsbanner
 * auskommt.
 */

import { copyFileSync, existsSync, mkdirSync, readdirSync, writeFileSync } from "node:fs";
import { basename, extname, join } from "node:path";

const registry = JSON.parse(
  await import("node:fs").then((fs) =>
    fs.promises.readFile(new URL("../src/content/bilder.json", import.meta.url), "utf8"),
  ),
);

const ZIEL = join(process.cwd(), "public", "bilder");
mkdirSync(ZIEL, { recursive: true });

const args = process.argv.slice(2);
const vonIndex = args.indexOf("--from");
const quellOrdner = vonIndex >= 0 ? args[vonIndex + 1] : null;
const ueberschreiben = args.includes("--force");

const schluessel = Object.keys(registry);
const vorhanden = (key) =>
  [".avif", ".webp", ".jpg", ".jpeg", ".png"].some((e) => existsSync(join(ZIEL, key + e)));

function bericht(fertig, uebersprungen, fehler) {
  console.log(`\nFertig. ${fertig} geladen, ${uebersprungen} übersprungen, ${fehler} Fehler.`);
  const offen = schluessel.filter((k) => !vorhanden(k));
  if (offen.length > 0) {
    console.log(`Noch ohne Foto: ${offen.join(", ")}`);
    console.log("Diese Plätze zeigen weiterhin den gestalteten Platzhalter.");
  } else {
    console.log("Alle Bildplätze sind belegt.");
  }
}

/* Weg 1: aus einem lokalen Ordner übernehmen */
if (quellOrdner) {
  if (!existsSync(quellOrdner)) {
    console.error(`Ordner nicht gefunden: ${quellOrdner}`);
    process.exit(1);
  }

  const dateien = readdirSync(quellOrdner).filter((d) =>
    [".jpg", ".jpeg", ".png", ".webp", ".avif"].includes(extname(d).toLowerCase()),
  );

  let fertig = 0;
  let uebersprungen = 0;

  for (const key of schluessel) {
    if (vorhanden(key) && !ueberschreiben) {
      uebersprungen++;
      continue;
    }

    const treffer = dateien.find((d) => basename(d, extname(d)).toLowerCase().startsWith(key));
    if (!treffer) continue;

    const endung = extname(treffer).toLowerCase();
    copyFileSync(join(quellOrdner, treffer), join(ZIEL, key + endung));
    console.log(`${key}${endung}  aus ${treffer}`);
    fertig++;
  }

  bericht(fertig, uebersprungen, 0);
  process.exit(0);
}

/* Weg 2: von Unsplash laden */
const key = process.env.UNSPLASH_ACCESS_KEY;

if (!key) {
  console.log("Bildplätze dieser Website:\n");
  for (const [name, slot] of Object.entries(registry)) {
    const status = vorhanden(name) ? "vorhanden" : "offen    ";
    console.log(
      `  ${status}  ${name.padEnd(14)} ${String(slot.breite).padStart(4)} mal ${String(slot.hoehe).padEnd(5)} ${slot.suche}`,
    );
  }
  console.log("\nSo füllen Sie die Plätze:\n");
  console.log("  Eigene Fotos:   node scripts/fetch-images.mjs --from /pfad/zum/ordner");
  console.log("  Von Unsplash:   UNSPLASH_ACCESS_KEY=xxx node scripts/fetch-images.mjs");
  console.log("\nDie Dateien müssen so heißen wie der Bildplatz, etwa hero.jpg.");
  process.exit(0);
}

let fertig = 0;
let uebersprungen = 0;
let fehler = 0;
const nachweise = [];

for (const [name, slot] of Object.entries(registry)) {
  if (vorhanden(name) && !ueberschreiben) {
    console.log(`${name}: liegt schon vor, übersprungen`);
    uebersprungen++;
    continue;
  }

  const ausrichtung = slot.breite >= slot.hoehe ? "landscape" : "portrait";
  const url =
    "https://api.unsplash.com/search/photos?per_page=1&content_filter=high" +
    `&orientation=${ausrichtung}&query=${encodeURIComponent(slot.suche)}`;

  try {
    const antwort = await fetch(url, {
      headers: { Authorization: `Client-ID ${key}`, "Accept-Version": "v1" },
    });

    if (!antwort.ok) {
      console.error(`${name}: Unsplash antwortet mit ${antwort.status}`);
      fehler++;
      continue;
    }

    const daten = await antwort.json();
    const foto = daten.results?.[0];
    if (!foto) {
      console.error(`${name}: kein Treffer für "${slot.suche}"`);
      fehler++;
      continue;
    }

    const bildUrl = `${foto.urls.raw}&w=${slot.breite}&h=${slot.hoehe}&fit=crop&q=80&fm=jpg`;
    const bild = await fetch(bildUrl);
    if (!bild.ok) {
      console.error(`${name}: Download fehlgeschlagen (${bild.status})`);
      fehler++;
      continue;
    }

    writeFileSync(join(ZIEL, `${name}.jpg`), Buffer.from(await bild.arrayBuffer()));
    nachweise.push(
      `- \`${name}.jpg\`: Foto von [${foto.user.name}](${foto.user.links.html}) auf [Unsplash](${foto.links.html})`,
    );
    console.log(`${name}.jpg  von ${foto.user.name}`);
    fertig++;

    // Unsplash erlaubt 50 Anfragen pro Stunde im Demo-Modus.
    await new Promise((r) => setTimeout(r, 350));
  } catch (e) {
    console.error(`${name}: ${e.message}`);
    fehler++;
  }
}

if (nachweise.length > 0) {
  writeFileSync(
    join(ZIEL, "CREDITS.md"),
    [
      "# Bildnachweise",
      "",
      "Die Unsplash-Lizenz verlangt keine Nennung, empfiehlt sie aber.",
      "Für das Impressum gehören diese Angaben übernommen.",
      "",
      ...nachweise,
      "",
    ].join("\n"),
  );
  console.log("\nBildnachweise stehen in public/bilder/CREDITS.md");
}

bericht(fertig, uebersprungen, fehler);
