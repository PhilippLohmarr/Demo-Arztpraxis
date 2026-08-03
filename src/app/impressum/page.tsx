import type { Metadata } from "next";

import { DemoHinweis, Rechtstext } from "@/components/Rechtstext";
import { SeitenKopf } from "@/components/SeitenKopf";
import { Abschnitt } from "@/components/Ui";
import { praxis } from "@/content/praxis";

export const metadata: Metadata = {
  title: "Impressum",
  description: "Angaben nach § 5 Digitale-Dienste-Gesetz und § 18 Medienstaatsvertrag.",
  alternates: { canonical: "/impressum" },
  robots: { index: false, follow: true },
};

export default function ImpressumSeite() {
  return (
    <>
      <SeitenKopf
        eyebrow="Rechtliches"
        titel="Impressum"
        text="Angaben nach § 5 Digitale-Dienste-Gesetz, § 18 Medienstaatsvertrag und § 2 Dienstleistungs-Informationspflichten-Verordnung."
      />

      <Abschnitt>
        <Rechtstext>
          <DemoHinweis>
            Diese Website ist eine Demonstration von Frame Studio. Die Praxis am
            Lindenmarkt gibt es nicht. Alle Namen, Adressen und Angaben sind erfunden. Die
            Telefonnummer stammt aus dem Bereich, den die Bundesnetzagentur für
            Medienproduktionen reserviert hat, damit niemand versehentlich angerufen wird.
          </DemoHinweis>

          <h2>Anbieter</h2>
          <p>
            {praxis.langname}
            <br />
            {praxis.adresse.strasse}
            <br />
            {praxis.adresse.plz} {praxis.adresse.ort}
          </p>

          <h2>Vertretungsberechtigt</h2>
          <p>
            Dr. med. Katharina Vogt und Dr. med. Jonas Reinhardt, Partner der
            Berufsausübungsgemeinschaft
          </p>

          <h2>Kontakt</h2>
          <dl className="mt-4 space-y-4">
            <div>
              <dt>Telefon</dt>
              <dd>{praxis.telefon.anzeige}</dd>
            </div>
            <div>
              <dt>Fax</dt>
              <dd>{praxis.fax}</dd>
            </div>
            <div>
              <dt>E-Mail</dt>
              <dd>{praxis.email}</dd>
            </div>
          </dl>

          <h2>Berufsbezeichnung und berufsrechtliche Regelungen</h2>
          <p>
            Gesetzliche Berufsbezeichnung: Ärztin und Arzt. Die Berufsbezeichnung wurde in
            der Bundesrepublik Deutschland verliehen.
          </p>

          <h3>Zuständige Kammer</h3>
          <p>
            Ärztekammer Hamburg, Weidestraße 122 b, 22083 Hamburg.{" "}
            <a href="https://www.aerztekammer-hamburg.org" target="_blank" rel="noopener">
              aerztekammer-hamburg.org
            </a>
          </p>

          <h3>Zuständige Kassenärztliche Vereinigung</h3>
          <p>
            Kassenärztliche Vereinigung Hamburg, Humboldtstraße 56, 22083 Hamburg.{" "}
            <a href="https://www.kvhh.net" target="_blank" rel="noopener">
              kvhh.net
            </a>
          </p>

          <h3>Maßgebliche berufsrechtliche Regelungen</h3>
          <ul>
            <li>Berufsordnung für Hamburger Ärztinnen und Ärzte</li>
            <li>Hamburgisches Kammergesetz für die Heilberufe</li>
            <li>Heilberufsgesetz</li>
            <li>Gebührenordnung für Ärzte</li>
            <li>Heilmittelwerbegesetz</li>
          </ul>
          <p>
            Die Regelungen sind über die Website der Ärztekammer Hamburg abrufbar.
          </p>

          <h2>Umsatzsteuer</h2>
          <p>
            Heilbehandlungen im Bereich der Humanmedizin sind nach § 4 Nr. 14 Buchstabe a
            Umsatzsteuergesetz von der Umsatzsteuer befreit.
          </p>

          <h2>Berufshaftpflichtversicherung</h2>
          <p>
            Musterversicherung AG, Musterstraße 1, 20095 Hamburg. Räumlicher
            Geltungsbereich: Europa.
          </p>

          <h2>Redaktionell verantwortlich</h2>
          <p>
            Dr. med. Katharina Vogt, Anschrift wie oben. Angabe nach § 18 Absatz 2
            Medienstaatsvertrag.
          </p>

          <h2>Verbraucherstreitbeilegung</h2>
          <p>
            Wir sind nicht bereit und nicht verpflichtet, an Streitbeilegungsverfahren vor
            einer Verbraucherschlichtungsstelle teilzunehmen. Bei Behandlungsfehlern können
            Sie sich an die Schlichtungsstelle für Arzthaftpflichtfragen der
            Norddeutschen Ärztekammern wenden.
          </p>

          <h2>Haftung für Inhalte und Links</h2>
          <p>
            Die Inhalte dieser Seiten wurden mit Sorgfalt erstellt. Für die Richtigkeit,
            Vollständigkeit und Aktualität können wir keine Gewähr übernehmen. Die Inhalte
            ersetzen keine ärztliche Beratung und keine Diagnose.
          </p>
          <p>
            Für Inhalte externer Links sind ausschließlich deren Betreiber verantwortlich.
            Zum Zeitpunkt der Verlinkung waren keine Rechtsverstöße erkennbar.
          </p>

          <h2>Bildnachweise</h2>
          <p>
            Die Bildnachweise trägt die Praxis hier ein. In dieser Demo sind die Bildplätze
            entweder mit frei lizenzierten Fotos belegt oder mit generierten Platzhaltern.
          </p>

          <h2>Gestaltung und Umsetzung</h2>
          <p>
            <a href="https://studio-three-pi-87.vercel.app" target="_blank" rel="noopener">
              Frame Studio
            </a>
            , Hamburg
          </p>
        </Rechtstext>
      </Abschnitt>
    </>
  );
}
