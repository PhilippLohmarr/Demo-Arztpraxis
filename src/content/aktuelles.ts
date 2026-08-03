export type Meldung = {
  slug: string;
  datum: string;
  titel: string;
  teaser: string;
  text: string[];
  /** Hebt zeitkritische Meldungen im Header hervor. */
  wichtig?: boolean;
  gueltigBis?: string;
};

export const meldungen: Meldung[] = [
  {
    slug: "sommerurlaub-2026",
    datum: "2026-07-14",
    titel: "Praxisurlaub vom 10. bis 21. August",
    teaser:
      "Die Praxis bleibt zwei Wochen geschlossen. Die Vertretung übernimmt die Praxis Bahrenfelder Steindamm.",
    text: [
      "Vom 10. bis 21. August 2026 ist die Praxis geschlossen. Ab Montag, dem 24. August, sind wir zu den gewohnten Zeiten wieder da.",
      "Die Vertretung übernimmt die Hausarztpraxis am Bahrenfelder Steindamm, Telefon 040 66969 340. Dort liegen Ihre Notfalldaten vor, wenn Sie uns vorher Bescheid geben.",
      "Denken Sie bitte rechtzeitig an Dauerrezepte. Bestellungen nehmen wir bis Freitag, den 7. August um 12:00 entgegen. Danach wenden Sie sich für Rezepte an die Vertretungspraxis.",
    ],
    wichtig: true,
    gueltigBis: "2026-08-24",
  },
  {
    slug: "grippeimpfung-2026",
    datum: "2026-06-30",
    titel: "Grippeimpfung ab dem 6. Oktober",
    teaser:
      "Ab Oktober impfen wir gegen Grippe, auch ohne Termin während der offenen Sprechstunde.",
    text: [
      "Der Impfstoff für die Saison 2026 und 2027 wird Anfang Oktober geliefert. Ab Dienstag, dem 6. Oktober, können Sie sich impfen lassen.",
      "Sie brauchen keinen Termin. Kommen Sie zwischen 8:00 und 9:30 in die offene Sprechstunde und sagen am Empfang Bescheid. Die Impfung selbst dauert fünf Minuten.",
      "Für Menschen ab 60, Schwangere, chronisch Kranke und medizinisches Personal zahlt die Kasse die Impfung. Wer jünger und gesund ist, zahlt 32 Euro. Viele Kassen erstatten den Betrag, fragen Sie dort nach.",
    ],
  },
  {
    slug: "rezeptbestellung-online",
    datum: "2026-05-12",
    titel: "Folgerezepte lassen sich jetzt online bestellen",
    teaser:
      "Das Formular auf der Terminseite ersetzt den Anruf. Bestellungen bis 12:00 liegen am nächsten Werktag bereit.",
    text: [
      "Bisher liefen Rezeptbestellungen über das Telefon, was morgens die Leitung blockiert hat. Ab sofort geht das über ein Formular auf dieser Website.",
      "Sie tragen Ihre Daten und das Präparat ein, wir prüfen die Bestellung und legen das Rezept bereit. Bestellungen, die bis 12:00 eingehen, sind am nächsten Werktag ab 10:00 abholbereit.",
      "Für Betäubungsmittel und Erstverordnungen gilt das nicht. Dafür brauchen wir weiterhin einen Termin.",
    ],
  },
  {
    slug: "praxis-barrierefrei",
    datum: "2026-03-02",
    titel: "Aufzug und Höranlage sind in Betrieb",
    teaser:
      "Nach vier Monaten Umbau ist die Praxis stufenlos erreichbar. Am Empfang hilft jetzt eine induktive Höranlage.",
    text: [
      "Der Umbau ist abgeschlossen. Der Eingang ist stufenlos, die Tür 92 Zentimeter breit, und der neue Aufzug fährt in den ersten Stock.",
      "Am Empfang ist eine induktive Höranlage installiert. Wer ein Hörgerät mit T-Spule trägt, schaltet einfach um und versteht das Gespräch ohne Nebengeräusche.",
      "Zwei Behandlungsliegen lassen sich bis auf 48 Zentimeter absenken, sodass der Umstieg aus dem Rollstuhl leichter fällt. Die Toilette im ersten Stock ist rollstuhlgerecht.",
    ],
  },
];

export const wichtigeMeldung = meldungen.find((m) => m.wichtig);

export function meldungBySlug(slug: string) {
  return meldungen.find((m) => m.slug === slug);
}

export function datumLang(iso: string) {
  return new Date(iso + "T12:00:00Z").toLocaleDateString("de-DE", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Europe/Berlin",
  });
}
