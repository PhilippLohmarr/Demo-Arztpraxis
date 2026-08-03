import type { Metadata } from "next";

import { Bild } from "@/components/Bild";
import { SeitenKopf } from "@/components/SeitenKopf";
import { Abschnitt, Knopf } from "@/components/Ui";
import { praxis } from "@/content/praxis";
import { aerzte, praxisTeam } from "@/content/team";
import type { BildKey } from "@/lib/bilder";

export const metadata: Metadata = {
  title: "Team",
  description:
    "Zwei Ärztinnen, ein Arzt und vier medizinische Fachkräfte in Hamburg-Ottensen. Das Team spricht Deutsch, Englisch, Türkisch, Französisch und Vietnamesisch.",
  alternates: { canonical: "/team" },
};

export default function TeamSeite() {
  return (
    <>
      <SeitenKopf
        eyebrow="Das Team"
        titel="Wer Sie behandelt"
        text="Sieben Menschen, die Sie beim Namen kennen. Wer regelmäßig kommt, bleibt bei derselben Ärztin oder demselben Arzt, damit niemand die Vorgeschichte zweimal erzählen muss."
        kinder={
          <ul className="mt-10 flex flex-wrap gap-2">
            {praxis.sprachen.map((sprache) => (
              <li
                key={sprache}
                className="rounded-full border border-line bg-paper-2/60 px-4 py-2 text-sm"
              >
                {sprache}
              </li>
            ))}
          </ul>
        }
      />

      <Abschnitt>
        <h2 className="eyebrow text-muted" data-reveal>
          Ärztinnen und Ärzte
        </h2>

        <div className="mt-10 space-y-20">
          {aerzte.map((person, i) => (
            <article
              key={person.slug}
              id={person.slug}
              className="grid scroll-mt-28 gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16"
              data-reveal
            >
              <div className={i % 2 === 1 ? "lg:order-2" : ""}>
                <Bild
                  name={person.bild as BildKey}
                  sizes="(max-width: 1024px) 100vw, 35vw"
                  className="aspect-[4/5] w-full"
                />
              </div>

              <div className={i % 2 === 1 ? "lg:order-1" : ""}>
                <h3 className="font-serif text-[clamp(1.75rem,3.4vw,2.75rem)] leading-tight">
                  {person.name}
                </h3>
                <p className="mt-3 text-lg text-muted">{person.rolle}</p>
                <p className="mt-1 text-sm text-muted">In der Praxis seit {person.seit}</p>

                {person.zitat ? (
                  <blockquote className="mt-8 border-l-2 border-moss pl-6 font-serif text-xl leading-relaxed text-ink italic">
                    {person.zitat}
                  </blockquote>
                ) : null}

                <div className="mt-8 grid gap-8 sm:grid-cols-2">
                  <div>
                    <h4 className="text-sm font-medium text-muted">Schwerpunkte</h4>
                    <ul className="mt-3 space-y-1.5">
                      {person.schwerpunkte.map((s) => (
                        <li key={s}>{s}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-muted">Sprachen</h4>
                    <p className="mt-3">{person.sprachen.join(", ")}</p>
                  </div>
                </div>

                {person.vita ? (
                  <div className="mt-8 border-t border-line pt-6">
                    <h4 className="text-sm font-medium text-muted">Werdegang</h4>
                    <ul className="mt-3 space-y-2 text-[0.95rem] leading-relaxed text-muted">
                      {person.vita.map((eintrag) => (
                        <li key={eintrag}>{eintrag}</li>
                      ))}
                    </ul>
                  </div>
                ) : null}
              </div>
            </article>
          ))}
        </div>
      </Abschnitt>

      <Abschnitt className="bg-paper-2/50">
        <h2 className="eyebrow text-muted" data-reveal>
          Am Empfang und im Behandlungsraum
        </h2>
        <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted" data-reveal>
          Die medizinischen Fachangestellten nehmen Blut ab, schreiben EKGs, versorgen
          Wunden und koordinieren Ihre Termine. Meistens sprechen Sie zuerst mit ihnen.
        </p>

        <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {praxisTeam.map((person, i) => (
            <li
              key={person.slug}
              id={person.slug}
              className="scroll-mt-28"
              data-reveal
              style={{ transitionDelay: `${i * 60}ms` }}
            >
              <Bild
                name={person.bild as BildKey}
                sizes="(max-width: 640px) 100vw, 25vw"
                className="aspect-[4/5] w-full"
              />
              <h3 className="mt-5 font-serif text-xl">{person.name}</h3>
              <p className="mt-1.5 text-[0.95rem] leading-relaxed text-muted">{person.rolle}</p>
              <ul className="mt-3 flex flex-wrap gap-1.5">
                {person.schwerpunkte.map((s) => (
                  <li
                    key={s}
                    className="rounded-full border border-line bg-paper px-2.5 py-1 text-xs text-muted"
                  >
                    {s}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </Abschnitt>

      <Abschnitt>
        <div className="grid gap-10 lg:grid-cols-[1fr_auto] lg:items-center">
          <div data-reveal>
            <h2 className="font-serif text-[clamp(1.75rem,3.4vw,2.5rem)] leading-tight">
              Wir bilden aus und suchen Verstärkung
            </h2>
            <p className="mt-4 max-w-xl leading-relaxed text-muted">
              Für 2027 haben wir einen Ausbildungsplatz zur medizinischen Fachangestellten
              zu vergeben. Bewerbungen gehen an {praxis.email} oder gern persönlich am
              Empfang.
            </p>
          </div>
          <div data-reveal>
            <Knopf href={`mailto:${praxis.email}`} variante="sekundaer">
              Bewerbung schreiben
            </Knopf>
          </div>
        </div>
      </Abschnitt>
    </>
  );
}
