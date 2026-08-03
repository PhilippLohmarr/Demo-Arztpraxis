#!/usr/bin/env node
/**
 * Prüft den sichtbar gerenderten Text der Website gegen docs/COPY-STYLEGUIDE.md.
 *
 * Grundlage sind die Muster, die die Wikipedia-Community unter
 * "Signs of AI writing" gesammelt hat, plus ihre deutschen Entsprechungen.
 *
 * Geprüft wird das fertige HTML aus dem Build und nicht der Quelltext. Nur so
 * landet ausschließlich das im Test, was Besucher wirklich lesen. Variablen-
 * namen, Klassenlisten und Spread-Operatoren lösen dadurch keinen Fehlalarm aus.
 *
 * Aufruf: npm run build && npm run check:copy
 */

import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative } from "node:path";

const WURZEL = process.cwd();
const HTML_ORDNER = join(WURZEL, ".next", "server", "app");

/** Zeichen, die als Gedankenstrich durchgehen oder Sätze offen lassen. */
const ZEICHEN = [
  {
    muster: /—/,
    name: "Geviertstrich (—)",
    hinweis: "Komma, Doppelpunkt oder Punkt verwenden",
  },
  {
    muster: /–/,
    name: "Halbgeviertstrich (–)",
    hinweis: "in Zeitspannen das Wort bis ausschreiben",
  },
  { muster: /→/, name: "Pfeil (→)", hinweis: "im Fließtext ausschreiben" },
  {
    muster: /…|\.\.\./,
    name: "Auslassungspunkte",
    hinweis: "Satz zu Ende schreiben",
  },
];

/** Satzfiguren, die nach generiertem Text klingen. */
const FIGUREN = [
  {
    muster: /nicht nur\s+\S+[^.]{0,60}?\bsondern auch\b/i,
    name: "Negativer Parallelismus (nicht nur, sondern auch)",
  },
  {
    muster: /\bes geht nicht um\b[^.]{0,50}?\bes geht um\b/i,
    name: "Negativer Parallelismus (es geht nicht um)",
  },
  {
    muster: /\bkeine? \S+, keine? \S+, (einfach nur|sondern)\b/i,
    name: "Negativer Parallelismus (kein, kein, nur)",
  },
  {
    muster: /\bes ist wichtig zu (beachten|betonen|erwähnen)\b/i,
    name: "Redaktioneller Selbstkommentar",
  },
  {
    muster: /\b(erwähnenswert|hervorzuheben|anzumerken) ist\b/i,
    name: "Redaktioneller Selbstkommentar",
  },
  {
    muster: /\bzusammenfassend lässt sich sagen\b/i,
    name: "Formelhafter Schluss",
  },
  { muster: /\babschließend sei angemerkt\b/i, name: "Formelhafter Schluss" },
  {
    muster: /\bstudien zeigen\b|\bexperten (sagen|empfehlen|raten)\b|\bbeobachter (stellen|haben)\b/i,
    name: "Vager Beleg ohne Quelle",
  },
  {
    muster: /\bob sie\b[^.]{0,40}?\boder\b[^.]{0,40}?\bsind, (bei uns|hier)\b/i,
    name: "Konditionale Zielgruppenansprache",
  },
];

/** Verbrannte Wörter und Wendungen. */
const WOERTER = [
  "ganzheitlich",
  "maßgeschneidert",
  "individuell abgestimmt",
  "auf höchstem Niveau",
  "modernste Technik",
  "state of the art",
  "rundum-versorgung",
  "wohlfühlatmosphäre",
  "steht bei uns im mittelpunkt",
  "mit herz und verstand",
  "ihre gesundheit ist unser",
  "wir nehmen uns zeit für sie",
  "in der heutigen",
  "vor diesem hintergrund",
  "nicht zuletzt aufgrund",
  "am ende des tages",
  "herzlich willkommen auf unserer",
  "spielt eine entscheidende rolle",
  "spielt eine wichtige rolle",
  "zeichnet sich aus durch",
  "nahtlos",
  "hochmodern",
  "zukunftsweisend",
  "wegweisend",
  "meilenstein",
  "eckpfeiler",
  "grundpfeiler",
  "delve",
  "tapestry",
  "pivotal",
  "underscore",
  "testament",
  "intricate",
  "seamless",
  "holistic",
  "meticulous",
  "vibrant",
  "cutting-edge",
  "game-changer",
  "transformative",
  "stands as a testament",
  "plays a vital role",
];

function htmlDateien(pfad, treffer = []) {
  for (const eintrag of readdirSync(pfad)) {
    const voll = join(pfad, eintrag);
    if (statSync(voll).isDirectory()) htmlDateien(voll, treffer);
    else if (eintrag.endsWith(".html")) treffer.push(voll);
  }
  return treffer;
}

/** Holt aus dem HTML nur das, was am Bildschirm steht. */
function sichtbarerText(html) {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<svg[\s\S]*?<\/svg>/gi, " ")
    .replace(/<!--[\s\S]*?-->/g, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#x27;|&apos;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(Number(n)))
    .replace(/\s+/g, " ")
    .trim();
}

/** Schneidet die Fundstelle mit etwas Umgebung heraus. */
function ausschnitt(text, index, laenge) {
  const von = Math.max(0, index - 45);
  const bis = Math.min(text.length, index + laenge + 45);
  return (von > 0 ? "… " : "") + text.slice(von, bis).trim() + (bis < text.length ? " …" : "");
}

if (!existsSync(HTML_ORDNER)) {
  console.error("Copy-Check: kein Build gefunden. Bitte zuerst npm run build ausführen.");
  process.exit(1);
}

const funde = [];
const dateien = htmlDateien(HTML_ORDNER).filter(
  (d) => !d.endsWith("_global-error.html"),
);

for (const datei of dateien) {
  const text = sichtbarerText(readFileSync(datei, "utf8"));
  const seite = relative(HTML_ORDNER, datei).replace(/\.html$/, "");

  const pruefen = (muster, name, hinweis) => {
    const treffer = text.match(muster);
    if (!treffer) return;
    funde.push({
      seite,
      art: name,
      hinweis,
      stelle: ausschnitt(text, text.indexOf(treffer[0]), treffer[0].length),
    });
  };

  for (const regel of ZEICHEN) pruefen(regel.muster, regel.name, regel.hinweis);
  for (const regel of FIGUREN) pruefen(regel.muster, regel.name, "umformulieren");
  for (const wort of WOERTER) {
    const muster = new RegExp(wort.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i");
    pruefen(muster, `Verbranntes Wort: ${wort}`, "konkreter formulieren");
  }
}

console.log(`Copy-Check: ${dateien.length} gerenderte Seiten geprüft.`);

if (funde.length === 0) {
  console.log("Keine Treffer. Alle sichtbaren Texte halten den Styleguide ein.");
  process.exit(0);
}

console.error(`\n${funde.length} Treffer\n`);
for (const fund of funde) {
  console.error(`Seite /${fund.seite === "index" ? "" : fund.seite}`);
  console.error(`  ${fund.art}, ${fund.hinweis}`);
  console.error(`  ${fund.stelle}\n`);
}
process.exit(1);
