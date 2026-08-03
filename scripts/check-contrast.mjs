#!/usr/bin/env node
/**
 * Prüft die Farbpaare des Designsystems gegen WCAG 2.1.
 *
 * Erforderlich sind 4,5 zu 1 für normalen Text, 3 zu 1 für große Schrift
 * ab 24 Pixel sowie für Ränder und Bedienelemente.
 */

const farben = {
  paper: "#f7f4ec",
  paper2: "#efeadd",
  paper3: "#e5decd",
  ink: "#14201b",
  ink2: "#26332c",
  muted: "#55645b",
  moss: "#1c5a48",
  moss600: "#154639",
  moss100: "#dbe7e0",
  clay: "#a84a26",
  line: "#ded6c4",
};

/** Paare, die auf der Seite tatsächlich vorkommen. */
const paare = [
  { vorne: "ink", hinten: "paper", zweck: "Fließtext auf Papier", min: 4.5 },
  { vorne: "muted", hinten: "paper", zweck: "Sekundärtext auf Papier", min: 4.5 },
  { vorne: "muted", hinten: "paper2", zweck: "Sekundärtext auf Sandfläche", min: 4.5 },
  { vorne: "moss", hinten: "paper", zweck: "Links und Akzente", min: 4.5 },
  { vorne: "moss600", hinten: "moss100", zweck: "Aktiver Navigationspunkt", min: 4.5 },
  { vorne: "clay", hinten: "paper", zweck: "Warnhinweise und Fokusring", min: 4.5 },
  { vorne: "paper", hinten: "moss", zweck: "Schrift auf Hauptbutton", min: 4.5 },
  { vorne: "paper", hinten: "moss600", zweck: "Schrift auf Button im Hover", min: 4.5 },
  { vorne: "paper", hinten: "ink", zweck: "Schrift auf dunklem Abschnitt", min: 4.5 },
  { vorne: "ink", hinten: "moss100", zweck: "Schrift auf hellgrüner Karte", min: 4.5 },
  { vorne: "ink", hinten: "paper3", zweck: "Schrift auf tiefer Sandfläche", min: 4.5 },
  { vorne: "moss", hinten: "paper2", zweck: "Akzent auf Sandfläche", min: 4.5 },
  { vorne: "clay", hinten: "paper2", zweck: "Warnhinweis auf Sandfläche", min: 4.5 },
];

function kanal(wert) {
  const v = wert / 255;
  return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
}

function leuchtdichte(hex) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return 0.2126 * kanal(r) + 0.7152 * kanal(g) + 0.0722 * kanal(b);
}

function verhaeltnis(a, b) {
  const la = leuchtdichte(a);
  const lb = leuchtdichte(b);
  const hell = Math.max(la, lb);
  const dunkel = Math.min(la, lb);
  return (hell + 0.05) / (dunkel + 0.05);
}

let fehler = 0;
const zeilen = [];

for (const paar of paare) {
  const wert = verhaeltnis(farben[paar.vorne], farben[paar.hinten]);
  const bestanden = wert >= paar.min;
  if (!bestanden) fehler++;

  zeilen.push(
    `${bestanden ? "ok  " : "FEHL"}  ${wert.toFixed(2).padStart(5)} zu 1   ` +
      `${paar.vorne} auf ${paar.hinten}`.padEnd(30) +
      `${paar.zweck} (mindestens ${paar.min})`,
  );
}

console.log("Kontrastprüfung nach WCAG 2.1\n");
console.log(zeilen.join("\n"));

if (fehler > 0) {
  console.error(`\n${fehler} Paar(e) unter dem Grenzwert.`);
  process.exit(1);
}

console.log(`\nAlle ${paare.length} Paare erfüllen mindestens Stufe AA.`);
