import Link from "next/link";

import { Bild } from "@/components/Bild";
import { Faq, faqJsonLd } from "@/components/Faq";
import { Lageplan } from "@/components/Lageplan";
import { Sprechzeiten } from "@/components/Sprechzeiten";
import { StatusPill } from "@/components/StatusPill";
import { Abschnitt, AbschnittKopf, Karte, Knopf, Pfeil } from "@/components/Ui";
import { faq } from "@/content/faq";
import { leistungen } from "@/content/leistungen";
import { praxis } from "@/content/praxis";
import { aerzte } from "@/content/team";
import { wichtigeMeldung, datumLang } from "@/content/aktuelles";
import { statusJetzt } from "@/lib/oeffnungszeiten";
import type { BildKey } from "@/lib/bilder";

const schritte = [
  {
    nummer: "01",
    titel: "Anmelden",
    text: "Online, telefonisch oder am Empfang. Sagen Sie kurz, worum es geht, dann planen wir die richtige Terminlänge ein.",
  },
  {
    nummer: "02",
    titel: "Ankommen",
    text: "Versichertenkarte an den Empfang, danach warten Sie im Wartezimmer im ersten Stock. Wasser steht bereit.",
  },
  {
    nummer: "03",
    titel: "Weitergehen",
    text: "Sie bekommen Befunde, Rezepte und den nächsten Schritt schriftlich mit. Was offen bleibt, klären wir telefonisch.",
  },
];

const mitbringen = [
  "Versichertenkarte",
  "Impfpass",
  "Liste Ihrer Medikamente",
  "Arztbriefe der letzten zwei Jahre",
  "Allergiepass, falls vorhanden",
];

export default function Startseite() {
  const status = statusJetzt();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(faq)) }}
      />

      {/* Hero */}
      <section className="relative overflow-hidden pt-10 pb-16 md:pt-16 md:pb-24">
        <div className="wrap">
          <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
            <div>
              <p className="eyebrow text-muted" data-reveal>
                {praxis.adresse.ort}-{praxis.adresse.stadtteil}, seit {praxis.gruendung}
              </p>

              <h1
                className="mt-5 text-[clamp(2.75rem,7.5vw,5.25rem)] leading-[0.98]"
                data-reveal
              >
                Hausärztliche Praxis
                <span className="block text-moss italic">am Lindenmarkt</span>
              </h1>

              <p
                className="mt-7 max-w-xl text-lg leading-relaxed text-muted md:text-xl"
                data-reveal
              >
                Zwei Ärztinnen, ein Arzt und vier medizinische Fachkräfte. Offene
                Sprechstunde jeden Morgen ohne Termin, 20 Minuten für Vorsorge und
                Hausbesuche im Umkreis von zwei Kilometern.
              </p>

              <div className="mt-9 flex flex-wrap items-center gap-3" data-reveal>
                <Knopf href="/termin">Termin vereinbaren</Knopf>
                <Knopf href={`tel:${praxis.telefon.link}`} variante="sekundaer">
                  {praxis.telefon.anzeige}
                </Knopf>
              </div>

              <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-3" data-reveal>
                <StatusPill initial={status} />
                <p className="text-sm text-muted">{praxis.kassen}</p>
              </div>
            </div>

            <div className="relative" data-reveal>
              <Bild
                name="hero"
                priority
                sizes="(max-width: 1024px) 100vw, 46vw"
                className="aspect-[4/3.4] w-full"
              />

              {/* Die offene Sprechstunde ist das, wonach akut Kranke suchen.
                  Deshalb steht sie direkt im Bild und nicht erst weiter unten. */}
              <div className="mt-4 rounded-[var(--radius-card)] border border-line bg-paper-2/70 p-6 sm:absolute sm:-bottom-8 sm:-left-8 sm:mt-0 sm:max-w-xs sm:bg-paper sm:shadow-[0_20px_50px_-24px_rgba(20,32,27,0.35)]">
                <p className="eyebrow text-clay">Ohne Termin</p>
                <p className="mt-2 font-serif text-xl leading-snug">
                  {praxis.akutsprechstunde.titel}
                </p>
                <p className="mt-1 text-[0.95rem] font-medium text-ink">
                  {praxis.akutsprechstunde.zeit}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-muted">
                  {praxis.akutsprechstunde.hinweis}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Aktuelle Meldung, nur wenn eine ansteht */}
      {wichtigeMeldung ? (
        <div className="wrap">
          <Link
            href={`/aktuelles/${wichtigeMeldung.slug}`}
            className="group flex flex-wrap items-center gap-x-4 gap-y-2 rounded-[var(--radius-card)] border border-clay/30 bg-clay/5 px-6 py-5 transition-colors hover:border-clay/60"
          >
            <span className="eyebrow shrink-0 text-clay">Hinweis</span>
            <span className="min-w-0 flex-1 font-medium">{wichtigeMeldung.titel}</span>
            <span className="hidden text-sm text-muted sm:block">
              {datumLang(wichtigeMeldung.datum)}
            </span>
            <Pfeil className="text-clay" />
          </Link>
        </div>
      ) : null}

      {/* Kennzahlen */}
      <section className="py-16 md:py-20">
        <div className="wrap">
          <dl className="grid grid-cols-2 gap-x-8 gap-y-10 border-y border-line py-12 md:grid-cols-4">
            {praxis.zahlen.map((zahl) => (
              <div key={zahl.label} data-reveal>
                <dt className="sr-only">{zahl.label}</dt>
                <dd>
                  <span className="block font-serif text-[clamp(2.5rem,5vw,3.5rem)] leading-none text-moss">
                    {zahl.wert}
                  </span>
                  <span className="mt-3 block text-sm leading-snug text-muted">
                    {zahl.label}
                  </span>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Leistungen */}
      <Abschnitt id="leistungen" className="pt-0">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <AbschnittKopf
            eyebrow="Leistungen"
            titel="Womit wir Ihnen helfen"
            text="Von der Erkältung bis zur jahrelangen Begleitung einer chronischen Erkrankung. Was wir selbst untersuchen können, untersuchen wir hier im Haus."
          />
          <Knopf href="/leistungen" variante="sekundaer" className="shrink-0">
            Alle Leistungen
          </Knopf>
        </div>

        <ul className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {leistungen.map((leistung, i) => (
            <li key={leistung.slug} data-reveal style={{ transitionDelay: `${i * 60}ms` }}>
              <Link
                href={`/leistungen/${leistung.slug}`}
                className="group flex h-full flex-col overflow-hidden rounded-[var(--radius-card)] border border-line bg-paper-2/40 transition-all duration-300 hover:-translate-y-1 hover:border-moss/40 hover:bg-paper-2"
              >
                <Bild
                  name={leistung.bild as BildKey}
                  rundung=""
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="aspect-[16/10] w-full"
                />
                <div className="flex flex-1 flex-col p-7">
                  <h3 className="font-serif text-2xl leading-snug">{leistung.titel}</h3>
                  <p className="mt-3 flex-1 leading-relaxed text-muted">{leistung.kurz}</p>
                  <span className="mt-6 inline-flex items-center gap-2 text-[0.95rem] font-medium text-moss">
                    Ansehen
                    <Pfeil />
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </Abschnitt>

      {/* Team */}
      <Abschnitt dunkel>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <AbschnittKopf
            dunkel
            eyebrow="Das Team"
            titel="Wer Sie behandelt"
            text="Sie können sich aussuchen, bei wem Sie einen Termin bekommen. Wer regelmäßig kommt, bleibt in der Regel bei derselben Ärztin oder demselben Arzt."
          />
          <Knopf href="/team" variante="geist" className="shrink-0">
            Ganzes Team
          </Knopf>
        </div>

        <ul className="mt-14 grid gap-8 md:grid-cols-3">
          {aerzte.map((person, i) => (
            <li key={person.slug} data-reveal style={{ transitionDelay: `${i * 80}ms` }}>
              <Link href={`/team#${person.slug}`} className="group block">
                <Bild
                  name={person.bild as BildKey}
                  sizes="(max-width: 768px) 100vw, 30vw"
                  className="aspect-[4/5] w-full"
                />
                <h3 className="mt-5 font-serif text-2xl">{person.name}</h3>
                <p className="mt-1.5 text-[0.95rem] leading-relaxed text-paper/60">
                  {person.rolle}
                </p>
                <p className="mt-3 text-sm text-paper/45">
                  Spricht {person.sprachen.join(", ")}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      </Abschnitt>

      {/* Erster Besuch */}
      <Abschnitt>
        <div className="grid gap-14 lg:grid-cols-[1fr_0.8fr] lg:gap-20">
          <div>
            <AbschnittKopf
              eyebrow="Ihr erster Besuch"
              titel="Wie ein Termin bei uns abläuft"
              text="Für das Erstgespräch planen wir 30 Minuten ein. Danach wissen wir genug über Sie, dass die folgenden Termine kürzer ausfallen können."
            />

            <ol className="mt-12">
              {schritte.map((schritt) => (
                <li
                  key={schritt.nummer}
                  className="grid gap-x-6 gap-y-2 border-t border-line py-7 sm:grid-cols-[auto_1fr]"
                  data-reveal
                >
                  <span className="font-serif text-2xl text-moss tabular-nums">
                    {schritt.nummer}
                  </span>
                  <div>
                    <h3 className="font-serif text-2xl">{schritt.titel}</h3>
                    <p className="mt-2 max-w-lg leading-relaxed text-muted">{schritt.text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          <div className="lg:pt-24" data-reveal>
            <Karte className="bg-moss-100/50">
              <h3 className="font-serif text-2xl">Das bringen Sie mit</h3>
              <ul className="mt-5 space-y-3">
                {mitbringen.map((punkt) => (
                  <li key={punkt} className="flex items-start gap-3 text-[0.95rem]">
                    <svg
                      viewBox="0 0 16 16"
                      className="mt-1 h-4 w-4 shrink-0 text-moss"
                      aria-hidden="true"
                      fill="none"
                    >
                      <path
                        d="M3 8.5l3.2 3.2L13 5"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    {punkt}
                  </li>
                ))}
              </ul>
              <p className="mt-6 border-t border-line pt-5 text-sm leading-relaxed text-muted">
                Fehlt etwas davon, kommen Sie trotzdem. Wir fordern Unterlagen bei
                Vorbehandlern an, wenn Sie uns dafür eine Einwilligung geben.
              </p>
            </Karte>
          </div>
        </div>
      </Abschnitt>

      {/* Praxis und Sprechzeiten */}
      <Abschnitt className="bg-paper-2/50">
        <div className="grid gap-14 lg:grid-cols-2 lg:gap-20">
          <div data-reveal>
            <Bild
              name="wartezimmer"
              sizes="(max-width: 1024px) 100vw, 46vw"
              className="aspect-[5/4] w-full"
            />
          </div>

          <div>
            <AbschnittKopf
              eyebrow="Die Praxis"
              titel="Stufenlos, hell und im ersten Stock"
              text="Seit dem Umbau im Februar 2026 ist die Praxis ohne Stufe erreichbar. Der Aufzug fährt direkt in den Wartebereich."
            />

            <ul className="mt-10 grid gap-3 sm:grid-cols-2" data-reveal>
              {praxis.barrierefreiheit.slice(0, 4).map((punkt) => (
                <li
                  key={punkt}
                  className="rounded-2xl border border-line bg-paper px-5 py-4 text-sm leading-relaxed"
                >
                  {punkt}
                </li>
              ))}
            </ul>

            <div className="mt-10" data-reveal>
              <h3 className="mb-4 font-serif text-2xl">Sprechzeiten</h3>
              <Sprechzeiten />
              <p className="mt-5 text-sm leading-relaxed text-muted">
                {praxis.abendsprechstunde.titel}: {praxis.abendsprechstunde.zeit}.{" "}
                {praxis.abendsprechstunde.hinweis}
              </p>
            </div>

            <div className="mt-8">
              <Knopf href="/praxis" variante="sekundaer">
                Mehr über die Praxis
              </Knopf>
            </div>
          </div>
        </div>
      </Abschnitt>

      {/* Fragen */}
      <Abschnitt>
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <AbschnittKopf
            eyebrow="Häufige Fragen"
            titel="Das wollen die meisten wissen"
            text="Wenn Ihre Frage nicht dabei ist, rufen Sie an. Das geht meistens schneller als eine E-Mail."
          />
          <div data-reveal>
            <Faq eintraege={faq} />
          </div>
        </div>
      </Abschnitt>

      {/* Anfahrt */}
      <Abschnitt className="bg-paper-2/50">
        <AbschnittKopf
          eyebrow="Anfahrt"
          titel="So finden Sie uns"
          text={`${praxis.adresse.strasse}, ${praxis.adresse.plz} ${praxis.adresse.ort}. Der Eingang liegt an der Straßenseite, das Praxisschild hängt links neben der Tür.`}
        />

        <div className="mt-12 grid gap-10 lg:grid-cols-[1.3fr_0.7fr]">
          <div data-reveal>
            <Lageplan />
          </div>

          <dl className="space-y-6" data-reveal>
            {[
              { titel: "Mit der S-Bahn", text: praxis.anfahrt.sbahn },
              { titel: "Mit dem Bus", text: praxis.anfahrt.bus },
              { titel: "Mit dem Rad", text: praxis.anfahrt.fahrrad },
              { titel: "Mit dem Auto", text: praxis.anfahrt.auto },
            ].map((eintrag) => (
              <div key={eintrag.titel} className="border-b border-line pb-6 last:border-0">
                <dt className="font-serif text-xl">{eintrag.titel}</dt>
                <dd className="mt-2 leading-relaxed text-muted">{eintrag.text}</dd>
              </div>
            ))}
          </dl>
        </div>
      </Abschnitt>

      {/* Abschluss */}
      <section className="grain relative bg-moss py-24 text-paper md:py-32">
        <div className="wrap relative text-center">
          <h2
            className="mx-auto max-w-3xl text-[clamp(2.25rem,5.5vw,4rem)] leading-[1.05]"
            data-reveal
          >
            Wir nehmen neue Patientinnen und Patienten auf.
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-paper/75" data-reveal>
            Für das Erstgespräch planen wir 30 Minuten ein. Rufen Sie an oder vereinbaren
            Sie den Termin online.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-3" data-reveal>
            <Knopf href="/termin" variante="hell">
              Termin vereinbaren
            </Knopf>
            <Knopf href={`tel:${praxis.telefon.link}`} variante="geist">
              {praxis.telefon.anzeige}
            </Knopf>
          </div>
        </div>
      </section>
    </>
  );
}
