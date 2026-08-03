import type { Metadata } from "next";

import { DemoHinweis, Rechtstext } from "@/components/Rechtstext";
import { SeitenKopf } from "@/components/SeitenKopf";
import { Abschnitt } from "@/components/Ui";
import { praxis } from "@/content/praxis";

export const metadata: Metadata = {
  title: "Erklärung zur Barrierefreiheit",
  description:
    "Erklärung zur Barrierefreiheit dieser Website nach dem Barrierefreiheitsstärkungsgesetz, mit Konformitätsstatus, bekannten Einschränkungen und Kontakt für Rückmeldungen.",
  alternates: { canonical: "/barrierefreiheit" },
};

const umgesetzt = [
  "Alle Farbkombinationen erreichen mindestens den Kontrast 4,5 zu 1, große Schrift mindestens 3 zu 1. Geprüft mit einem Skript im Projekt.",
  "Die Seite lässt sich vollständig mit der Tastatur bedienen. Der Fokus ist an jeder Stelle sichtbar.",
  "Ein Sprunglink am Seitenanfang führt direkt zum Inhalt.",
  "Überschriften folgen einer durchgehenden Rangfolge ohne Sprünge.",
  "Bilder haben Alternativtexte. Rein dekorative Grafiken sind vor Screenreadern verborgen.",
  "Die Seite funktioniert bis 200 Prozent Zoom ohne waagerechtes Scrollen.",
  "Bewegungen werden abgeschaltet, wenn im Betriebssystem weniger Bewegung eingestellt ist.",
  "Alle Bedienelemente sind mindestens 44 mal 44 Pixel groß.",
  "Zeitangaben stehen ausgeschrieben, weil Screenreader den Bis-Strich uneinheitlich vorlesen.",
  "Formularfelder haben sichtbare Beschriftungen, keine reinen Platzhaltertexte.",
  "Die Seite ist ohne JavaScript lesbar und bedienbar.",
];

const einschraenkungen = [
  {
    punkt: "Der Lageplan ist eine Grafik",
    text: "Er trägt eine ausführliche Bildbeschreibung. Alle Wege stehen zusätzlich als Text daneben, sodass keine Information nur im Bild steckt.",
  },
  {
    punkt: "Keine Gebärdensprache und keine Leichte Sprache",
    text: "Beides ist für die nächste Ausbaustufe vorgesehen. Bis dahin erklären wir Inhalte am Telefon.",
  },
];

export default function BarrierefreiheitSeite() {
  return (
    <>
      <SeitenKopf
        eyebrow="Rechtliches"
        titel="Erklärung zur Barrierefreiheit"
        text="Diese Erklärung gilt für die Website der Praxis am Lindenmarkt. Sie folgt den Anforderungen des Barrierefreiheitsstärkungsgesetzes, das seit dem 28. Juni 2025 gilt."
      />

      <Abschnitt>
        <Rechtstext>
          <DemoHinweis>
            Frame Studio baut Websites von Anfang an nach diesen Vorgaben. Der Grund ist
            nicht nur die Pflicht: Wer eine Website mit der Tastatur bedienen kann, kann
            sie auch mit einer Hand am Handy bedienen.
          </DemoHinweis>

          <h2>Konformitätsstatus</h2>
          <p>
            Diese Website erfüllt nach eigener Prüfung die Web Content Accessibility
            Guidelines in Version 2.1 auf Stufe AA. Eine Prüfung durch eine unabhängige
            Stelle liegt nicht vor.
          </p>

          <h2>Wer betroffen ist</h2>
          <p>
            Nach dem Barrierefreiheitsstärkungsgesetz sind Kleinstunternehmen mit weniger
            als zehn Beschäftigten und höchstens zwei Millionen Euro Jahresumsatz von den
            Anforderungen ausgenommen. Diese Ausnahme greift jedoch nicht, sobald eine
            Website eine Dienstleistung im elektronischen Geschäftsverkehr anbietet, wozu
            eine Online-Terminbuchung zählt. Verstöße können mit Bußgeldern bis 100.000
            Euro geahndet werden.
          </p>

          <h2>Was umgesetzt ist</h2>
          <ul>
            {umgesetzt.map((punkt) => (
              <li key={punkt}>{punkt}</li>
            ))}
          </ul>

          <h2>Bekannte Einschränkungen</h2>
          {einschraenkungen.map((e) => (
            <div key={e.punkt}>
              <h3>{e.punkt}</h3>
              <p>{e.text}</p>
            </div>
          ))}

          <h2>Rückmeldung und Kontakt</h2>
          <p>
            Wenn Ihnen eine Barriere auffällt oder Sie einen Inhalt nicht nutzen können,
            melden Sie sich. Wir antworten innerhalb von zwei Wochen und nennen Ihnen, was
            wir ändern.
          </p>
          <p>
            {praxis.langname}, {praxis.adresse.strasse}, {praxis.adresse.plz}{" "}
            {praxis.adresse.ort}
            <br />
            Telefon {praxis.telefon.anzeige}
            <br />
            E-Mail {praxis.email}
          </p>

          <h2>Durchsetzungsverfahren</h2>
          <p>
            Wenn Sie mit unserer Antwort nicht zufrieden sind, können Sie sich an die
            Marktüberwachungsstelle der Länder für die Barrierefreiheit von Produkten und
            Dienstleistungen wenden. Sie hat ihren Sitz in Magdeburg und ist für alle
            Bundesländer zuständig.
          </p>

          <h2>Erstellung dieser Erklärung</h2>
          <p>
            Erstellt am 3. August 2026. Grundlage war eine Selbstbewertung anhand der
            WCAG 2.1 auf Stufe AA, ergänzt um Tests mit Tastaturbedienung, einem
            Screenreader und automatisierten Kontrastprüfungen.
          </p>
        </Rechtstext>
      </Abschnitt>
    </>
  );
}
