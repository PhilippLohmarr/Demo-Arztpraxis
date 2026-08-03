export type Leistung = {
  slug: string;
  titel: string;
  kurz: string;
  /** Steht in der Übersichtskarte und im Hero der Detailseite. */
  intro: string;
  absaetze: string[];
  umfang: { titel: string; text: string }[];
  fuerWen: string;
  dauer: string;
  kosten: string;
  bild: string;
};

export const leistungen: Leistung[] = [
  {
    slug: "hausaerztliche-versorgung",
    titel: "Hausärztliche Versorgung",
    kurz: "Erste Anlaufstelle bei allem, was Sie gesundheitlich beschäftigt.",
    intro:
      "Husten, Rückenschmerzen, Bluthochdruck, ein Ausschlag, der nicht weggeht: Wir klären ab, was dahintersteckt, behandeln selbst was wir behandeln können, und überweisen gezielt, wenn eine Fachärztin gebraucht wird.",
    absaetze: [
      "Als Hausarztpraxis kennen wir Ihre Vorgeschichte. Das spart Ihnen bei jedem neuen Anliegen die halbe Anamnese und uns doppelte Untersuchungen. Befunde von Fachärzten laufen bei uns zusammen, sodass jemand den Überblick behält.",
      "Wenn eine Überweisung nötig ist, sagen wir Ihnen, zu wem und warum. Für die häufigsten Fachrichtungen in Altona und Ottensen haben wir feste Ansprechpartner, bei denen Sie in der Regel schneller drankommen.",
    ],
    umfang: [
      {
        titel: "Akute Beschwerden",
        text: "Infekte, Schmerzen, Verletzungen, Magen und Darm, Haut. In der offenen Sprechstunde ohne Termin.",
      },
      {
        titel: "Befunde einordnen",
        text: "Sie bringen Laborwerte oder Arztbriefe mit, wir gehen sie mit Ihnen durch und erklären, was daraus folgt.",
      },
      {
        titel: "Medikamente prüfen",
        text: "Wer mehr als drei Präparate nimmt, bekommt einmal im Jahr einen Medikationsplan und einen Check auf Wechselwirkungen.",
      },
      {
        titel: "Überweisungen und Rezepte",
        text: "Folgerezepte bestellen Sie online oder telefonisch und holen sie am nächsten Werktag ab.",
      },
    ],
    fuerWen: "Alle Patientinnen und Patienten ab 16 Jahren",
    dauer: "15 Minuten, bei komplexen Anliegen 30",
    kosten: "Kassenleistung",
    bild: "sprechzimmer",
  },
  {
    slug: "vorsorge-und-frueherkennung",
    titel: "Vorsorge und Früherkennung",
    kurz: "Der Check-up, den die Kasse zahlt, in ordentlicher Länge.",
    intro:
      "Ab 35 zahlt Ihre Krankenkasse alle drei Jahre einen Gesundheits-Check-up. Wir planen dafür 20 Minuten ein statt der üblichen acht, weil ein Blutdruckwert allein wenig aussagt.",
    absaetze: [
      "Zum Check-up gehören Blutabnahme, Blutdruck, Urin, ein körperliche Untersuchung und ein Gespräch über Schlaf, Bewegung, Alkohol und Belastung. Das Gespräch ist der Teil, der am häufigsten etwas findet.",
      "Die Ergebnisse besprechen wir in einem zweiten kurzen Termin oder telefonisch, je nachdem was Ihnen lieber ist. Sie bekommen die Werte schriftlich mit, inklusive der Vorwerte zum Vergleich.",
    ],
    umfang: [
      {
        titel: "Check-up 35",
        text: "Alle drei Jahre ab 35, einmalig zwischen 18 und 34. Blut, Urin, Blutdruck, Untersuchung, Gespräch.",
      },
      {
        titel: "Hautkrebs-Screening",
        text: "Alle zwei Jahre ab 35. Ganzkörperinspektion mit Auflichtmikroskop.",
      },
      {
        titel: "Darmkrebsvorsorge",
        text: "Stuhltest ab 50, Beratung zur Koloskopie und Überweisung, wenn Sie sie möchten.",
      },
      {
        titel: "Jugendgesundheitsuntersuchung J1",
        text: "Für 13- bis 14-Jährige, mit oder ohne Eltern im Raum. Das entscheiden die Jugendlichen selbst.",
      },
    ],
    fuerWen: "Gesetzlich Versicherte im jeweiligen Alter, privat nach Tarif",
    dauer: "20 Minuten plus Besprechungstermin",
    kosten: "Kassenleistung, keine Zuzahlung",
    bild: "labor",
  },
  {
    slug: "impfungen-und-reisemedizin",
    titel: "Impfungen und Reisemedizin",
    kurz: "Impfpass prüfen, Lücken schließen, Fernreise vorbereiten.",
    intro:
      "Bringen Sie Ihren Impfpass mit, auch wenn er alt und unvollständig ist. Wir tragen nach, was fehlt, und sagen Ihnen, was Sie wirklich brauchen und was verzichtbar ist.",
    absaetze: [
      "Frau Alkan hat die reisemedizinische Zusatzqualifikation der Deutschen Tropenmedizinischen Gesellschaft. Für Fernreisen planen Sie am besten sechs bis acht Wochen Vorlauf ein, weil manche Impfungen mehrere Dosen im Abstand brauchen.",
      "Gelbfieber dürfen wir nicht impfen, dafür brauchen Sie eine zugelassene Gelbfieberimpfstelle. Wir sagen Ihnen, welche in Hamburg Termine hat, und übernehmen den Rest der Reiseimpfungen.",
    ],
    umfang: [
      {
        titel: "Standardimpfungen nach STIKO",
        text: "Tetanus, Diphtherie, Keuchhusten, Polio, Masern, FSME, Gürtelrose, Pneumokokken.",
      },
      {
        titel: "Grippeimpfung",
        text: "Ab Mitte Oktober, auch ohne Termin während der offenen Sprechstunde.",
      },
      {
        titel: "Reiseberatung",
        text: "Persönliche Beratung zu Zielland, Route und Jahreszeit, mit Malariaprophylaxe und Reiseapotheke.",
      },
      {
        titel: "Impfpass digital",
        text: "Wir erfassen Ihren Impfstatus in der Akte, sodass Sie bei Verlust des Passes eine Zweitschrift bekommen.",
      },
    ],
    fuerWen: "Alle, Reiseberatung auch für Nichtpatienten",
    dauer: "10 Minuten Impfung, 30 Minuten Reiseberatung",
    kosten:
      "Standardimpfungen zahlt die Kasse. Reiseberatung und Reiseimpfungen sind Selbstzahlerleistungen, viele Kassen erstatten sie.",
    bild: "impfung",
  },
  {
    slug: "chronische-erkrankungen",
    titel: "Chronische Erkrankungen",
    kurz: "Strukturierte Programme für Diabetes, KHK, Asthma und COPD.",
    intro:
      "Wer dauerhaft eine Erkrankung mit sich trägt, braucht keine Einzeltermine, sondern einen Plan. Dafür gibt es die Disease-Management-Programme der Krankenkassen, und wir schreiben Sie dort ein.",
    absaetze: [
      "In einem DMP sind die Kontrolltermine, Untersuchungen und Schulungen festgelegt. Sie bekommen vor jedem Termin eine Erinnerung, und wir sehen auf einen Blick, welcher Wert seit wann aus dem Rahmen fällt.",
      "Zwischen den Terminen ist Frau Kröger Ihre feste Ansprechpartnerin. Sie kennt Ihre Werte, kann Rezepte vorbereiten und holt eine ärztliche Einschätzung ein, wenn etwas nicht passt.",
    ],
    umfang: [
      {
        titel: "Diabetes Typ 2",
        text: "Quartalskontrollen, HbA1c, Fußstatus, Augenarztkoordination, Schulung in Kleingruppen.",
      },
      {
        titel: "Koronare Herzkrankheit",
        text: "EKG, Belastungs-EKG, Blutdruckeinstellung, Abstimmung mit der Kardiologie.",
      },
      {
        titel: "Asthma und COPD",
        text: "Lungenfunktion, Inhalationstechnik überprüfen, Notfallplan für Verschlechterungen.",
      },
      {
        titel: "Bluthochdruck",
        text: "Langzeitblutdruckmessung über 24 Stunden, Auswertung im Folgetermin.",
      },
    ],
    fuerWen: "Patientinnen und Patienten mit gesicherter Diagnose",
    dauer: "Quartalstermin 20 Minuten",
    kosten: "Kassenleistung, Einschreibung ins DMP ist freiwillig",
    bild: "geraet",
  },
  {
    slug: "diagnostik-im-haus",
    titel: "Diagnostik im Haus",
    kurz: "Labor, EKG, Ultraschall und Lungenfunktion, ohne zweiten Weg.",
    intro:
      "Was wir selbst untersuchen können, untersuchen wir selbst. Das spart Ihnen Termine bei anderen Praxen und uns Wartezeit auf Befunde, die wir für die Behandlung brauchen.",
    absaetze: [
      "Blut nehmen wir morgens ab 8:00 ab. Die meisten Werte liegen am selben Nachmittag vor, Spezialparameter dauern zwei bis drei Tage. Auffällige Werte melden wir Ihnen aktiv, auch abends.",
      "Für den Ultraschall des Bauchraums und der Schilddrüse nutzen wir ein Gerät mit hochauflösendem Schallkopf. Herrn Reinhardts Schwerpunkt ist die Sonographie, er hat die DEGUM-Stufe 1.",
    ],
    umfang: [
      {
        titel: "Labor",
        text: "Blutbild, Leber, Niere, Schilddrüse, Entzündungswerte, Gerinnung, Urinstatus.",
      },
      {
        titel: "Herz und Kreislauf",
        text: "Ruhe-EKG, Belastungs-EKG, Langzeit-EKG über 24 Stunden, Langzeitblutdruck.",
      },
      {
        titel: "Ultraschall",
        text: "Bauchorgane, Schilddrüse, Halsschlagadern.",
      },
      {
        titel: "Lunge",
        text: "Spirometrie, Sauerstoffsättigung, Reversibilitätstest.",
      },
    ],
    fuerWen: "Nach ärztlicher Indikation",
    dauer: "Blutabnahme 5 Minuten, Ultraschall 20 Minuten",
    kosten: "Kassenleistung bei medizinischer Notwendigkeit",
    bild: "ultraschall",
  },
  {
    slug: "hausbesuche-und-palliativversorgung",
    titel: "Hausbesuche und Palliativversorgung",
    kurz: "Für Menschen, die den Weg in die Praxis nicht schaffen.",
    intro:
      "Wenn Sie Ihre Wohnung nicht mehr verlassen können, kommen wir zu Ihnen. Im Umkreis von zwei Kilometern um den Lindenmarkt fahren wir regelmäßig, in Ottensen, Othmarschen und Bahrenfeld.",
    absaetze: [
      "Frau Petersen ist Versorgungsassistentin in der Hausarztpraxis, kurz VERAH. Sie übernimmt die planbaren Besuche, kontrolliert Wunden und Werte und ruft ärztliche Unterstützung dazu, wenn es nötig ist.",
      "In der letzten Lebensphase arbeiten wir mit dem Palliativteam Altona und den Pflegediensten im Viertel zusammen. Ziel ist, dass Menschen zu Hause bleiben können, wenn sie das möchten. Für diese Fälle sind wir außerhalb der Sprechzeiten über eine gesonderte Nummer erreichbar, die Angehörige von uns bekommen.",
    ],
    umfang: [
      {
        titel: "Regelbesuche",
        text: "Nach Absprache wöchentlich oder alle zwei Wochen, mit festem Zeitfenster.",
      },
      {
        titel: "Wundversorgung",
        text: "Zertifizierte Wundmanagerin im Team, Abstimmung mit dem Pflegedienst.",
      },
      {
        titel: "Pflegegrad",
        text: "Wir stellen die Unterlagen für den Medizinischen Dienst zusammen und begleiten die Begutachtung.",
      },
      {
        titel: "Palliativversorgung",
        text: "Schmerztherapie, Symptomkontrolle, Gespräche mit Angehörigen, Vorsorgevollmacht und Patientenverfügung.",
      },
    ],
    fuerWen: "Patientinnen und Patienten, die nicht mobil sind",
    dauer: "Nach Bedarf",
    kosten: "Kassenleistung",
    bild: "hausbesuch",
  },
];

export function leistungBySlug(slug: string) {
  return leistungen.find((l) => l.slug === slug);
}
