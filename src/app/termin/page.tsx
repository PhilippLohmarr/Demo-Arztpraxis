import type { Metadata } from "next";

import { RezeptFormular } from "@/components/RezeptFormular";
import { SeitenKopf } from "@/components/SeitenKopf";
import { Sprechzeiten } from "@/components/Sprechzeiten";
import { StatusPill } from "@/components/StatusPill";
import { Abschnitt, AbschnittKopf, Karte, Knopf } from "@/components/Ui";
import { praxis } from "@/content/praxis";
import { statusJetzt } from "@/lib/oeffnungszeiten";

export const metadata: Metadata = {
  title: "Termin und Kontakt",
  description:
    "Termin vereinbaren, Rezept bestellen oder anrufen. Offene Sprechstunde ohne Termin von 8:00 bis 9:30. Praxis am Lindenmarkt in Hamburg-Ottensen.",
  alternates: { canonical: "/termin" },
};

export default function TerminSeite() {
  const status = statusJetzt();

  return (
    <>
      <SeitenKopf
        eyebrow="Termin und Kontakt"
        titel="Drei Wege zu einem Termin"
        text="Am schnellsten geht es online. Wenn Sie unsicher sind, wie dringend Ihr Anliegen ist, rufen Sie lieber an, dann klären wir das direkt."
        kinder={
          <div className="mt-8">
            <StatusPill initial={status} />
          </div>
        }
      />

      <Abschnitt>
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Online */}
          <Karte className="flex flex-col bg-moss-100/40" data-reveal>
            <span className="eyebrow text-moss-600">Weg 1</span>
            <h2 className="mt-3 font-serif text-2xl">Online buchen</h2>
            <p className="mt-3 flex-1 leading-relaxed text-muted">
              Rund um die Uhr, auch sonntags um 23 Uhr. Sie sehen freie Zeiten und
              bekommen die Bestätigung sofort per E-Mail.
            </p>
            <div className="mt-6">
              <Knopf href="#buchung">Zum Buchungssystem</Knopf>
            </div>
          </Karte>

          {/* Telefon */}
          <Karte className="flex flex-col" data-reveal>
            <span className="eyebrow text-muted">Weg 2</span>
            <h2 className="mt-3 font-serif text-2xl">Anrufen</h2>
            <p className="mt-3 flex-1 leading-relaxed text-muted">
              {praxis.telefonzeiten}. Zwischen 8:00 und 9:00 ist am meisten los, gegen
              11:00 kommen Sie schneller durch.
            </p>
            <div className="mt-6">
              <Knopf href={`tel:${praxis.telefon.link}`} variante="sekundaer">
                {praxis.telefon.anzeige}
              </Knopf>
            </div>
          </Karte>

          {/* Ohne Termin */}
          <Karte className="flex flex-col" data-reveal>
            <span className="eyebrow text-clay">Weg 3</span>
            <h2 className="mt-3 font-serif text-2xl">Ohne Termin kommen</h2>
            <p className="mt-3 flex-1 leading-relaxed text-muted">
              {praxis.akutsprechstunde.zeit}. Für alles, was heute nicht warten kann.
              Reihenfolge nach Dringlichkeit, nicht nach Ankunft.
            </p>
            <div className="mt-6">
              <Knopf href="/praxis" variante="sekundaer">
                Anfahrt ansehen
              </Knopf>
            </div>
          </Karte>
        </div>
      </Abschnitt>

      {/* Platz für das Buchungssystem */}
      <Abschnitt id="buchung" className="bg-paper-2/50 pt-0">
        <AbschnittKopf
          eyebrow="Online buchen"
          titel="Freie Termine"
          text="Wählen Sie Anliegen, Ärztin oder Arzt und eine Uhrzeit. Neue Patientinnen und Patienten wählen bitte Erstgespräch, damit wir 30 Minuten einplanen."
        />

        <div
          className="mt-12 rounded-[var(--radius-card)] border-2 border-dashed border-line bg-paper p-10 text-center md:p-16"
          data-reveal
        >
          <svg
            viewBox="0 0 48 48"
            className="mx-auto h-12 w-12 text-moss"
            aria-hidden="true"
            fill="none"
          >
            <rect
              x="6"
              y="10"
              width="36"
              height="32"
              rx="4"
              stroke="currentColor"
              strokeWidth="2"
            />
            <path d="M6 20h36" stroke="currentColor" strokeWidth="2" />
            <path
              d="M16 6v8M32 6v8"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <rect x="14" y="26" width="7" height="6" rx="1.5" fill="currentColor" />
            <rect x="27" y="26" width="7" height="6" rx="1.5" fill="currentColor" opacity="0.4" />
          </svg>

          <h3 className="mt-6 font-serif text-2xl">Hier liegt das Buchungssystem</h3>
          <p className="mx-auto mt-4 max-w-xl leading-relaxed text-muted">
            {praxis.buchung.hinweis} Der Kalender wird an dieser Stelle eingebettet, sodass
            Besucher die Seite für die Buchung nicht verlassen.
          </p>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-muted">
            In dieser Demo ist bewusst kein echtes System angebunden. Bis dahin führen die
            Buttons zum Telefon.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Knopf href={`tel:${praxis.telefon.link}`}>
              Stattdessen anrufen: {praxis.telefon.anzeige}
            </Knopf>
          </div>
        </div>
      </Abschnitt>

      {/* Rezepte */}
      <Abschnitt>
        <div className="grid gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
          <div>
            <AbschnittKopf
              eyebrow="Rezepte"
              titel="Folgerezept bestellen"
              text="Für Medikamente, die Sie dauerhaft nehmen und die bei uns schon einmal verordnet wurden."
            />

            <ul className="mt-10 space-y-px" data-reveal>
              {[
                "Bestellungen bis 12:00 sind am nächsten Werktag ab 10:00 abholbereit.",
                "Sie brauchen nicht zu warten, das Rezept liegt am Empfang bereit.",
                "Mit dem E-Rezept genügt in vielen Fällen die Versichertenkarte in der Apotheke.",
                "Betäubungsmittel und Erstverordnungen brauchen einen Termin.",
              ].map((punkt) => (
                <li key={punkt} className="border-t border-line py-4 last:border-b">
                  <span className="leading-relaxed text-muted">{punkt}</span>
                </li>
              ))}
            </ul>
          </div>

          <div data-reveal>
            <RezeptFormular />
          </div>
        </div>
      </Abschnitt>

      {/* Notfall */}
      <Abschnitt dunkel>
        <div className="grid gap-14 lg:grid-cols-2 lg:gap-20">
          <div>
            <AbschnittKopf
              dunkel
              eyebrow="Außerhalb der Sprechzeiten"
              titel="Wen Sie im Notfall anrufen"
              text="Wenn die Praxis geschlossen ist, sind wir nicht erreichbar. Diese Nummern sind es."
            />
          </div>

          <dl className="space-y-px" data-reveal>
            {[
              {
                titel: "Bei Lebensgefahr",
                nummer: praxis.notfall.notruf,
                text: "Bewusstlosigkeit, starke Atemnot, Verdacht auf Herzinfarkt oder Schlaganfall, schwere Verletzungen.",
              },
              {
                titel: "Ärztlicher Bereitschaftsdienst",
                nummer: praxis.notfall.aerztlicherBereitschaftsdienst,
                text: "Rund um die Uhr, kostenlos. Für alles, was bis zur nächsten Sprechstunde nicht warten kann.",
              },
              {
                titel: "Giftnotruf Nord",
                nummer: praxis.notfall.giftnotruf,
                text: "Nach Einnahme von Medikamenten, Pflanzen, Reinigungsmitteln oder Pilzen.",
              },
              {
                titel: "Zahnärztlicher Notdienst",
                nummer: praxis.notfall.zahnaerztlicherNotdienst,
                text: "Für Hamburg, an Wochenenden und Feiertagen.",
              },
            ].map((eintrag) => (
              <div
                key={eintrag.titel}
                className="grid gap-x-8 gap-y-2 border-t border-line-dark py-6 last:border-b sm:grid-cols-[1fr_auto]"
              >
                <div>
                  <dt className="font-serif text-xl">{eintrag.titel}</dt>
                  <dd className="mt-1.5 text-[0.95rem] leading-relaxed text-paper/60">
                    {eintrag.text}
                  </dd>
                </div>
                <a
                  href={`tel:${eintrag.nummer.replace(/\s/g, "")}`}
                  className="inline-flex min-h-11 items-center self-start rounded-full border border-paper/30 px-5 font-medium tabular-nums transition-colors hover:bg-paper hover:text-ink"
                >
                  {eintrag.nummer}
                </a>
              </div>
            ))}
          </dl>
        </div>
      </Abschnitt>

      {/* Kontaktdaten */}
      <Abschnitt>
        <div className="grid gap-14 lg:grid-cols-2 lg:gap-20">
          <div>
            <AbschnittKopf eyebrow="Kontakt" titel="Erreichbarkeit" />

            <dl className="mt-10 space-y-6" data-reveal>
              <div className="border-b border-line pb-6">
                <dt className="text-sm text-muted">Adresse</dt>
                <dd className="mt-2 text-lg leading-relaxed">
                  {praxis.langname}
                  <br />
                  {praxis.adresse.strasse}
                  <br />
                  {praxis.adresse.plz} {praxis.adresse.ort}
                </dd>
              </div>
              <div className="border-b border-line pb-6">
                <dt className="text-sm text-muted">Telefon</dt>
                <dd className="mt-2 text-lg">
                  <a
                    href={`tel:${praxis.telefon.link}`}
                    className="underline underline-offset-4 hover:text-moss"
                  >
                    {praxis.telefon.anzeige}
                  </a>
                </dd>
              </div>
              <div className="border-b border-line pb-6">
                <dt className="text-sm text-muted">Fax</dt>
                <dd className="mt-2 text-lg tabular-nums">{praxis.fax}</dd>
              </div>
              <div>
                <dt className="text-sm text-muted">E-Mail</dt>
                <dd className="mt-2 text-lg">
                  <a
                    href={`mailto:${praxis.email}`}
                    className="break-all underline underline-offset-4 hover:text-moss"
                  >
                    {praxis.email}
                  </a>
                </dd>
                <dd className="mt-3 text-sm leading-relaxed text-muted">
                  Schreiben Sie uns bitte keine Befunde, Diagnosen oder Beschwerden per
                  E-Mail. Unverschlüsselte Nachrichten sind für Gesundheitsdaten nicht
                  sicher genug.
                </dd>
              </div>
            </dl>
          </div>

          <div>
            <h2 className="font-serif text-[clamp(1.6rem,3vw,2.25rem)]" data-reveal>
              Sprechzeiten
            </h2>
            <div className="mt-8" data-reveal>
              <Sprechzeiten />
            </div>
            <p className="mt-6 text-[0.95rem] leading-relaxed text-muted" data-reveal>
              An gesetzlichen Feiertagen ist die Praxis geschlossen. Urlaubszeiten und
              Vertretungen stehen unter Aktuelles.
            </p>
            <div className="mt-8" data-reveal>
              <Knopf href="/aktuelles" variante="sekundaer">
                Aktuelle Hinweise
              </Knopf>
            </div>
          </div>
        </div>
      </Abschnitt>
    </>
  );
}
