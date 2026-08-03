export type Person = {
  slug: string;
  name: string;
  rolle: string;
  seit: number;
  gruppe: "arzt" | "praxis";
  schwerpunkte: string[];
  sprachen: string[];
  /** Ein Satz in eigener Stimme. Kein Werbetext. */
  zitat?: string;
  vita?: string[];
  bild: string;
};

export const team: Person[] = [
  {
    slug: "katharina-vogt",
    name: "Dr. med. Katharina Vogt",
    rolle: "Fachärztin für Allgemeinmedizin, Praxisinhaberin",
    seit: 2009,
    gruppe: "arzt",
    schwerpunkte: [
      "Diabetologie",
      "Palliativmedizin",
      "Psychosomatische Grundversorgung",
    ],
    sprachen: ["Deutsch", "Englisch"],
    zitat:
      "Die meisten Diagnosen stehen nach dem Gespräch. Die Geräte bestätigen sie danach nur noch.",
    vita: [
      "Studium in Hamburg und Uppsala",
      "Weiterbildung am Asklepios Klinikum Altona und in einer Landarztpraxis bei Lüneburg",
      "Seit 2009 in eigener Praxis am Lindenmarkt",
      "Lehrbeauftragte für Allgemeinmedizin am UKE",
    ],
    bild: "vogt",
  },
  {
    slug: "jonas-reinhardt",
    name: "Dr. med. Jonas Reinhardt",
    rolle: "Facharzt für Innere Medizin und Allgemeinmedizin",
    seit: 2016,
    gruppe: "arzt",
    schwerpunkte: ["Sonographie DEGUM 1", "Herz und Kreislauf", "Ernährungsmedizin"],
    sprachen: ["Deutsch", "Englisch", "Französisch"],
    zitat:
      "Ich zeige Patienten den Ultraschall gern live auf dem Monitor. Wer sieht, worüber wir reden, versteht die Behandlung besser.",
    vita: [
      "Studium in Göttingen",
      "Kardiologie und Innere Medizin am Klinikum Nord",
      "Seit 2016 in der Praxis, seit 2019 Partner",
    ],
    bild: "reinhardt",
  },
  {
    slug: "miriam-alkan",
    name: "Miriam Alkan",
    rolle: "Fachärztin für Allgemeinmedizin",
    seit: 2021,
    gruppe: "arzt",
    schwerpunkte: ["Reisemedizin DTG", "Impfmedizin", "Frauengesundheit"],
    sprachen: ["Deutsch", "Türkisch", "Englisch"],
    zitat:
      "Viele meiner Patientinnen bringen ihre Eltern mit. Dass wir Türkisch sprechen, entscheidet oft darüber, ob jemand überhaupt kommt.",
    vita: [
      "Studium in Kiel",
      "Weiterbildung in Hamburg und ein Jahr am Bernhard-Nocht-Institut",
      "Reisemedizinische Qualifikation der Deutschen Tropenmedizinischen Gesellschaft",
    ],
    bild: "alkan",
  },
  {
    slug: "sabine-kroeger",
    name: "Sabine Kröger",
    rolle: "Leitende medizinische Fachangestellte",
    seit: 2010,
    gruppe: "praxis",
    schwerpunkte: ["Wundmanagement", "DMP-Koordination", "Praxisorganisation"],
    sprachen: ["Deutsch", "Englisch"],
    bild: "kroeger",
  },
  {
    slug: "tuan-nguyen",
    name: "Tuan Nguyen",
    rolle: "Medizinischer Fachangestellter",
    seit: 2018,
    gruppe: "praxis",
    schwerpunkte: ["Labor", "EKG und Langzeitmessungen", "Impfmanagement"],
    sprachen: ["Deutsch", "Vietnamesisch", "Englisch"],
    bild: "nguyen",
  },
  {
    slug: "nele-petersen",
    name: "Nele Petersen",
    rolle: "Medizinische Fachangestellte und VERAH",
    seit: 2019,
    gruppe: "praxis",
    schwerpunkte: ["Hausbesuche", "Pflegeberatung", "Palliativbegleitung"],
    sprachen: ["Deutsch"],
    bild: "petersen",
  },
  {
    slug: "lea-brandt",
    name: "Lea Brandt",
    rolle: "Auszubildende, zweites Lehrjahr",
    seit: 2024,
    gruppe: "praxis",
    schwerpunkte: ["Empfang", "Terminvergabe"],
    sprachen: ["Deutsch", "Englisch"],
    bild: "brandt",
  },
];

export const aerzte = team.filter((p) => p.gruppe === "arzt");
export const praxisTeam = team.filter((p) => p.gruppe === "praxis");

export function personBySlug(slug: string) {
  return team.find((p) => p.slug === slug);
}
