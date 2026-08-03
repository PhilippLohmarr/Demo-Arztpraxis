import type { Metadata } from "next";

import { Bild } from "@/components/Bild";
import { Lageplan } from "@/components/Lageplan";
import { SeitenKopf } from "@/components/SeitenKopf";
import { Sprechzeiten } from "@/components/Sprechzeiten";
import { Abschnitt, AbschnittKopf, Karte, Knopf } from "@/components/Ui";
import { praxis } from "@/content/praxis";

export const metadata: Metadata = {
  title: "Die Praxis",
  description:
    "Räume, Ausstattung, Barrierefreiheit und Anfahrt der Praxis am Lindenmarkt in Hamburg-Ottensen. Stufenloser Eingang, Aufzug und induktive Höranlage.",
  alternates: { canonical: "/praxis" },
};

const ausstattung = [
  { titel: "Sechs Behandlungsräume", text: "Vier für Sprechstunden, einer für Eingriffe, einer für Labor und EKG." },
  { titel: "Eigenes Labor", text: "Die häufigsten Werte messen wir im Haus, das Ergebnis liegt am selben Nachmittag vor." },
  { titel: "Ultraschall", text: "Gerät mit hochauflösendem Schallkopf für Bauchraum, Schilddrüse und Halsgefäße." },
  { titel: "Digitales Röntgen", text: "Bilder gehen ohne Umweg an Fachpraxen und Kliniken, wenn Sie zustimmen." },
  { titel: "Elektronische Akte", text: "Befunde, Impfungen und Medikamente an einer Stelle, mit Zugriff nur für das Behandlungsteam." },
  { titel: "Ruhiges Wartezimmer", text: "Zwölf Plätze, Tageslicht von zwei Seiten, kein Fernseher, kein Radio." },
];

export default function PraxisSeite() {
  return (
    <>
      <SeitenKopf
        eyebrow="Die Praxis"
        titel="Hell, stufenlos und mitten im Viertel"
        text="Wir sitzen im ersten Stock eines Altbaus direkt am Lindenmarkt. Seit dem Umbau im Februar 2026 kommen Sie ohne eine einzige Stufe bis in den Wartebereich."
      />

      <Abschnitt>
        <div className="grid gap-6 md:grid-cols-3">
          <div className="md:col-span-2" data-reveal>
            <Bild
              name="wartezimmer"
              sizes="(max-width: 768px) 100vw, 62vw"
              className="aspect-[16/10] w-full"
              priority
            />
          </div>
          <div data-reveal>
            <Bild
              name="flur"
              sizes="(max-width: 768px) 100vw, 30vw"
              className="aspect-[3/4] h-full w-full"
            />
          </div>
        </div>
      </Abschnitt>

      <Abschnitt className="pt-0">
        <div className="grid gap-14 lg:grid-cols-2 lg:gap-20">
          <div>
            <AbschnittKopf
              eyebrow="Barrierefreiheit"
              titel="Was Sie vorfinden"
              text="Wir schreiben die Maße dazu, weil Angaben wie barrierefrei je nach Einschränkung etwas anderes bedeuten."
            />
            <ul className="mt-10 space-y-px" data-reveal>
              {praxis.barrierefreiheit.map((punkt) => (
                <li key={punkt} className="flex gap-4 border-t border-line py-5 last:border-b">
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
                  <span className="leading-relaxed">{punkt}</span>
                </li>
              ))}
            </ul>
            <p className="mt-6 text-[0.95rem] leading-relaxed text-muted" data-reveal>
              Wenn Sie Unterstützung brauchen, rufen Sie vor dem Termin an. Dann holt Sie
              jemand an der Haustür ab.
            </p>
          </div>

          <div>
            <AbschnittKopf eyebrow="Sprechzeiten" titel="Wann wir da sind" />

            <div className="mt-10" data-reveal>
              <Sprechzeiten />
            </div>

            <div className="mt-8 grid gap-4" data-reveal>
              <Karte className="bg-moss-100/40 p-6">
                <h3 className="font-serif text-xl">{praxis.akutsprechstunde.titel}</h3>
                <p className="mt-1.5 font-medium">{praxis.akutsprechstunde.zeit}</p>
                <p className="mt-2 text-[0.95rem] leading-relaxed text-muted">
                  {praxis.akutsprechstunde.hinweis}
                </p>
              </Karte>

              <Karte className="p-6">
                <h3 className="font-serif text-xl">{praxis.abendsprechstunde.titel}</h3>
                <p className="mt-1.5 font-medium">{praxis.abendsprechstunde.zeit}</p>
                <p className="mt-2 text-[0.95rem] leading-relaxed text-muted">
                  {praxis.abendsprechstunde.hinweis}
                </p>
              </Karte>

              <Karte className="p-6">
                <h3 className="font-serif text-xl">Telefonzeiten</h3>
                <p className="mt-1.5 font-medium">{praxis.telefonzeiten}</p>
                <p className="mt-2 text-[0.95rem] leading-relaxed text-muted">
                  Zwischen 8:00 und 9:00 ist am meisten los. Wer warten kann, ruft besser
                  gegen 11:00 an.
                </p>
              </Karte>
            </div>
          </div>
        </div>
      </Abschnitt>

      <Abschnitt dunkel>
        <AbschnittKopf dunkel eyebrow="Ausstattung" titel="Was im Haus ist" />
        <dl className="mt-12 grid gap-px overflow-hidden rounded-[var(--radius-card)] border border-line-dark bg-line-dark md:grid-cols-2 lg:grid-cols-3">
          {ausstattung.map((punkt) => (
            <div key={punkt.titel} className="bg-ink p-7" data-reveal>
              <dt className="font-serif text-xl">{punkt.titel}</dt>
              <dd className="mt-2 leading-relaxed text-paper/65">{punkt.text}</dd>
            </div>
          ))}
        </dl>
      </Abschnitt>

      <Abschnitt>
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

        <div className="mt-12 flex flex-wrap gap-3" data-reveal>
          <Knopf href="/termin">Termin vereinbaren</Knopf>
          <Knopf href={`tel:${praxis.telefon.link}`} variante="sekundaer">
            {praxis.telefon.anzeige}
          </Knopf>
        </div>
      </Abschnitt>
    </>
  );
}
