import type { Metadata } from "next";
import Link from "next/link";

import { SeitenKopf } from "@/components/SeitenKopf";
import { Abschnitt, Pfeil } from "@/components/Ui";
import { meldungen, datumLang } from "@/content/aktuelles";

export const metadata: Metadata = {
  title: "Aktuelles",
  description:
    "Urlaubszeiten, Vertretungen, Impfaktionen und Neuerungen in der Praxis am Lindenmarkt in Hamburg-Ottensen.",
  alternates: { canonical: "/aktuelles" },
};

export default function AktuellesSeite() {
  return (
    <>
      <SeitenKopf
        eyebrow="Aktuelles"
        titel="Was gerade ansteht"
        text="Urlaubszeiten, Vertretungen und Hinweise, die für Ihren nächsten Besuch wichtig sein könnten."
      />

      <Abschnitt>
        <ul className="space-y-px">
          {meldungen.map((meldung) => (
            <li key={meldung.slug} data-reveal>
              <Link
                href={`/aktuelles/${meldung.slug}`}
                className="group grid gap-x-10 gap-y-3 border-t border-line py-9 transition-colors last:border-b hover:bg-paper-2/50 md:grid-cols-[10rem_1fr_auto] md:items-baseline"
              >
                <time
                  dateTime={meldung.datum}
                  className="text-sm text-muted tabular-nums"
                >
                  {datumLang(meldung.datum)}
                </time>

                <div>
                  <h2 className="font-serif text-[clamp(1.4rem,2.6vw,2rem)] leading-snug">
                    {meldung.titel}
                    {meldung.wichtig ? (
                      <span className="ml-3 rounded-full bg-clay/10 px-3 py-1 align-middle font-sans text-xs font-medium tracking-wide text-clay uppercase">
                        Wichtig
                      </span>
                    ) : null}
                  </h2>
                  <p className="mt-3 max-w-2xl leading-relaxed text-muted">
                    {meldung.teaser}
                  </p>
                </div>

                <span className="inline-flex items-center gap-2 font-medium text-moss">
                  Lesen
                  <Pfeil />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </Abschnitt>
    </>
  );
}
