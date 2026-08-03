/**
 * Stammdaten der Demo-Praxis.
 *
 * Die Praxis ist frei erfunden. Die Telefonnummer stammt aus dem Block
 * 040 66969 000 bis 999, den die Bundesnetzagentur für Medienproduktionen
 * reserviert hat, damit niemand versehentlich angerufen wird.
 */

export const praxis = {
  name: "Praxis am Lindenmarkt",
  langname: "Hausärztliche Gemeinschaftspraxis am Lindenmarkt",
  claim: "Hausärztliche Versorgung in Hamburg-Ottensen",
  gruendung: 2009,

  adresse: {
    strasse: "Lindenmarkt 12",
    plz: "22765",
    ort: "Hamburg",
    stadtteil: "Ottensen",
  },

  telefon: {
    anzeige: "040 66969 120",
    link: "+494066969120",
  },
  fax: "040 66969 121",
  email: "kontakt@praxis-am-lindenmarkt.de",

  /** Wochentag 1 = Montag, 7 = Sonntag. Zeiten in Minuten seit Mitternacht. */
  oeffnungszeiten: [
    { tag: 1, kurz: "Mo", lang: "Montag", bloecke: [[480, 780], [900, 1080]] },
    { tag: 2, kurz: "Di", lang: "Dienstag", bloecke: [[480, 780], [900, 1080]] },
    { tag: 3, kurz: "Mi", lang: "Mittwoch", bloecke: [[480, 780]] },
    { tag: 4, kurz: "Do", lang: "Donnerstag", bloecke: [[480, 780], [900, 1140]] },
    { tag: 5, kurz: "Fr", lang: "Freitag", bloecke: [[480, 780]] },
    { tag: 6, kurz: "Sa", lang: "Samstag", bloecke: [] },
    { tag: 7, kurz: "So", lang: "Sonntag", bloecke: [] },
  ] satisfies OeffnungsTag[],

  telefonzeiten: "Montag bis Freitag 8:00 bis 12:00 und 15:00 bis 17:00",

  akutsprechstunde: {
    titel: "Offene Sprechstunde ohne Termin",
    zeit: "Montag bis Freitag, 8:00 bis 9:30",
    hinweis:
      "Für alles, was heute nicht warten kann. Wer ohne Termin kommt, wartet nach Dringlichkeit, im Schnitt 35 Minuten.",
  },

  abendsprechstunde: {
    titel: "Abendsprechstunde",
    zeit: "Donnerstag bis 19:00",
    hinweis: "Gedacht für alle, die tagsüber nicht wegkönnen. Nur mit Termin.",
  },

  zahlen: [
    { wert: "3", label: "Ärztinnen und Ärzte" },
    { wert: "20 Min.", label: "pro Vorsorgetermin" },
    { wert: "2 Tage", label: "mittlere Wartezeit auf einen Termin" },
    { wert: "5", label: "Sprachen im Team" },
  ],

  sprachen: ["Deutsch", "Englisch", "Türkisch", "Französisch", "Vietnamesisch"],

  kassen:
    "Wir behandeln gesetzlich und privat Versicherte sowie Selbstzahlerinnen und Selbstzahler.",

  anfahrt: {
    sbahn: "S1 und S3 bis Altona, danach 9 Minuten zu Fuß",
    bus: "Bus 2 und 112 bis Nöltingstraße, 200 Meter",
    auto:
      "Anwohnerparken rund um den Lindenmarkt. Im Parkhaus Ottenser Hauptstraße sind die ersten 30 Minuten frei.",
    fahrrad: "Vier Bügel direkt vor dem Haus, StadtRAD-Station Am Felde in 300 Metern",
  },

  barrierefreiheit: [
    "Ebenerdiger Eingang ohne Stufe, Tür 92 Zentimeter breit",
    "Aufzug in den ersten Stock, Kabine 110 mal 140 Zentimeter",
    "Rollstuhlgerechte Toilette mit Haltegriffen",
    "Induktive Höranlage am Empfang",
    "Zwei Behandlungsliegen höhenverstellbar bis 48 Zentimeter",
    "Begleitpersonen und Assistenzhunde sind willkommen",
  ],

  notfall: {
    aerztlicherBereitschaftsdienst: "116 117",
    notruf: "112",
    giftnotruf: "0551 19240",
    zahnaerztlicherNotdienst: "040 4711 4711",
  },

  /** Rein für die Demo. Eine echte Praxis trägt hier ihr Buchungssystem ein. */
  buchung: {
    anbieter: "Doctolib",
    hinweis:
      "In der fertigen Website liegt an dieser Stelle das Buchungssystem der Praxis, zum Beispiel Doctolib, samedi oder Dr. Flex.",
  },
} as const;

export type OeffnungsTag = {
  tag: number;
  kurz: string;
  lang: string;
  bloecke: number[][];
};

export const praxisAdresseEinzeilig = `${praxis.adresse.strasse}, ${praxis.adresse.plz} ${praxis.adresse.ort}`;
