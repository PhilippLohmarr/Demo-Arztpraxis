import type { Metadata } from "next";

import { DemoHinweis, Rechtstext } from "@/components/Rechtstext";
import { SeitenKopf } from "@/components/SeitenKopf";
import { Abschnitt } from "@/components/Ui";
import { praxis } from "@/content/praxis";

export const metadata: Metadata = {
  title: "Datenschutz",
  description:
    "Informationen zur Verarbeitung personenbezogener Daten nach Artikel 13 und 14 Datenschutz-Grundverordnung.",
  alternates: { canonical: "/datenschutz" },
  robots: { index: false, follow: true },
};

export default function DatenschutzSeite() {
  return (
    <>
      <SeitenKopf
        eyebrow="Rechtliches"
        titel="Datenschutz"
        text="Informationen nach Artikel 13 und 14 Datenschutz-Grundverordnung, getrennt nach Website und Behandlung."
      />

      <Abschnitt>
        <Rechtstext>
          <DemoHinweis>
            Diese Erklärung gehört zu einer Demo-Website ohne echte Praxis und ohne
            Datenverarbeitung. Sie zeigt, welche Punkte eine Praxis abdecken muss. Für den
            Echtbetrieb gehört sie von einer Anwältin oder einem Anwalt geprüft.
          </DemoHinweis>

          <h2>Kurz vorweg</h2>
          <p>
            Diese Website setzt keine Cookies, bindet keine Analysewerkzeuge ein und lädt
            keine Inhalte von fremden Servern. Schriften, Bilder und Skripte liegen auf
            demselben Server wie die Seite. Deshalb erscheint hier auch kein
            Einwilligungsbanner, denn es gibt nichts einzuwilligen.
          </p>

          <h2>Verantwortlich</h2>
          <p>
            {praxis.langname}
            <br />
            {praxis.adresse.strasse}
            <br />
            {praxis.adresse.plz} {praxis.adresse.ort}
            <br />
            {praxis.telefon.anzeige}
            <br />
            {praxis.email}
          </p>

          <h2>Datenschutzbeauftragte</h2>
          <p>
            Praxen, die in großem Umfang Gesundheitsdaten verarbeiten, benennen eine
            datenschutzbeauftragte Person. Kontakt: datenschutz@praxis-am-lindenmarkt.de
          </p>

          <h2>Aufruf der Website</h2>
          <p>
            Beim Aufruf überträgt Ihr Browser technisch notwendige Daten an den Server:
            IP-Adresse, Zeitpunkt, aufgerufene Adresse, übertragene Datenmenge, Browsertyp
            und Betriebssystem. Diese Daten sind nötig, damit die Seite ausgeliefert werden
            kann, und dienen der Abwehr von Angriffen.
          </p>
          <p>
            Rechtsgrundlage ist Artikel 6 Absatz 1 Buchstabe f Datenschutz-Grundverordnung.
            Das berechtigte Interesse liegt im sicheren Betrieb der Website. Die Protokolle
            werden nach sieben Tagen gelöscht.
          </p>

          <h3>Hosting</h3>
          <p>
            Die Website wird bei Vercel Inc. betrieben. Mit dem Anbieter besteht ein
            Vertrag zur Auftragsverarbeitung nach Artikel 28 Datenschutz-Grundverordnung.
            Für Übermittlungen in die Vereinigten Staaten gelten die
            Standardvertragsklauseln der Europäischen Kommission.
          </p>

          <h2>Kontaktaufnahme und Formulare</h2>
          <p>
            Wenn Sie uns schreiben oder anrufen, verarbeiten wir Ihre Angaben, um Ihr
            Anliegen zu bearbeiten. Rechtsgrundlage ist Artikel 6 Absatz 1 Buchstabe b
            Datenschutz-Grundverordnung, bei Gesundheitsdaten zusätzlich Artikel 9 Absatz 2
            Buchstabe h in Verbindung mit § 22 Bundesdatenschutzgesetz.
          </p>
          <p>
            Unverschlüsselte E-Mail ist für Gesundheitsdaten nicht sicher genug. Schreiben
            Sie uns deshalb bitte keine Befunde, Diagnosen oder Beschwerden per E-Mail. Für
            solche Anliegen rufen Sie an oder kommen vorbei.
          </p>

          <h2>Behandlungsdaten</h2>
          <p>
            Für die Behandlung verarbeiten wir Ihre Stammdaten, Befunde, Diagnosen,
            Verordnungen und Abrechnungsdaten. Rechtsgrundlage ist Artikel 9 Absatz 2
            Buchstabe h Datenschutz-Grundverordnung in Verbindung mit dem
            Behandlungsvertrag nach § 630a Bürgerliches Gesetzbuch.
          </p>
          <p>
            Wir geben Daten nur weiter, soweit es für die Behandlung oder Abrechnung
            erforderlich ist, etwa an Labore, mitbehandelnde Praxen, Kliniken, die
            Kassenärztliche Vereinigung oder Ihre Krankenkasse. Alle Beschäftigten
            unterliegen der ärztlichen Schweigepflicht nach § 203 Strafgesetzbuch.
          </p>
          <p>
            Behandlungsunterlagen bewahren wir nach § 630f Bürgerliches Gesetzbuch
            mindestens zehn Jahre auf. Für Röntgenaufnahmen und einzelne andere Unterlagen
            gelten längere Fristen.
          </p>

          <h2>Ihre Rechte</h2>
          <ul>
            <li>Auskunft über die zu Ihnen gespeicherten Daten, Artikel 15</li>
            <li>Berichtigung unrichtiger Daten, Artikel 16</li>
            <li>Löschung, soweit keine Aufbewahrungspflicht entgegensteht, Artikel 17</li>
            <li>Einschränkung der Verarbeitung, Artikel 18</li>
            <li>Datenübertragbarkeit, Artikel 20</li>
            <li>Widerspruch gegen Verarbeitungen auf Grundlage berechtigter Interessen, Artikel 21</li>
            <li>Widerruf erteilter Einwilligungen mit Wirkung für die Zukunft, Artikel 7 Absatz 3</li>
          </ul>

          <h2>Beschwerderecht</h2>
          <p>
            Sie können sich bei einer Aufsichtsbehörde beschweren. Zuständig ist der
            Hamburgische Beauftragte für Datenschutz und Informationsfreiheit,
            Ludwig-Erhard-Straße 22, 20459 Hamburg.
          </p>

          <h2>Keine automatisierte Entscheidungsfindung</h2>
          <p>
            Es findet kein Profiling statt und es werden keine Entscheidungen
            ausschließlich automatisiert getroffen.
          </p>

          <h2>Stand</h2>
          <p>August 2026</p>
        </Rechtstext>
      </Abschnitt>
    </>
  );
}
