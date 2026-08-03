import type { Metadata } from "next";
import Link from "next/link";

import { Bild } from "@/components/Bild";
import { Abschnitt, Knopf, Pfeil } from "@/components/Ui";
import { SeitenKopf } from "@/components/SeitenKopf";
import { leistungen } from "@/content/leistungen";
import { praxis } from "@/content/praxis";
import type { BildKey } from "@/lib/bilder";

export const metadata: Metadata = {
  title: "Leistungen",
  description:
    "Hausärztliche Versorgung, Vorsorge, Impfungen, Reisemedizin, chronische Erkrankungen, Diagnostik im Haus und Hausbesuche in Hamburg-Ottensen.",
  alternates: { canonical: "/leistungen" },
};

export default function LeistungenSeite() {
  return (
    <>
      <SeitenKopf
        eyebrow="Leistungen"
        titel="Womit wir Ihnen helfen"
        text="Als Hausarztpraxis sind wir für fast alles die erste Adresse. Was hier steht, machen wir selbst. Für alles andere überweisen wir gezielt und sagen Ihnen, zu wem."
      />

      <Abschnitt className="pt-0">
        <ul className="grid gap-6 md:grid-cols-2">
          {leistungen.map((leistung, i) => (
            <li
              key={leistung.slug}
              data-reveal
              style={{ transitionDelay: `${(i % 2) * 70}ms` }}
              className={i % 3 === 0 ? "md:col-span-2" : ""}
            >
              <Link
                href={`/leistungen/${leistung.slug}`}
                className={[
                  "group grid h-full overflow-hidden rounded-[var(--radius-card)] border border-line bg-paper-2/40 transition-all duration-300 hover:-translate-y-1 hover:border-moss/40 hover:bg-paper-2",
                  i % 3 === 0 ? "md:grid-cols-2" : "",
                ].join(" ")}
              >
                <Bild
                  name={leistung.bild as BildKey}
                  rundung=""
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className={i % 3 === 0 ? "aspect-[16/10] w-full md:h-full" : "aspect-[16/9] w-full"}
                />
                <div className="flex flex-col justify-center p-7 md:p-9">
                  <h2 className="font-serif text-[clamp(1.5rem,2.4vw,2rem)] leading-snug">
                    {leistung.titel}
                  </h2>
                  <p className="mt-3 leading-relaxed text-muted">{leistung.kurz}</p>
                  <dl className="mt-6 flex flex-wrap gap-x-8 gap-y-2 text-sm">
                    <div>
                      <dt className="text-muted">Dauer</dt>
                      <dd className="mt-0.5">{leistung.dauer}</dd>
                    </div>
                    <div>
                      <dt className="text-muted">Kosten</dt>
                      <dd className="mt-0.5">{leistung.kosten.split(".")[0]}</dd>
                    </div>
                  </dl>
                  <span className="mt-6 inline-flex items-center gap-2 font-medium text-moss">
                    Ansehen
                    <Pfeil />
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </Abschnitt>

      <Abschnitt className="bg-paper-2/50">
        <div className="grid gap-10 lg:grid-cols-[1fr_auto] lg:items-center">
          <div data-reveal>
            <h2 className="font-serif text-[clamp(1.75rem,3.4vw,2.5rem)] leading-tight">
              Sie sind unsicher, ob Sie hier richtig sind?
            </h2>
            <p className="mt-4 max-w-xl leading-relaxed text-muted">
              Rufen Sie an und schildern Sie kurz Ihr Anliegen. Wenn eine Fachpraxis
              besser passt, sagen wir Ihnen das am Telefon und nennen Ihnen eine.
            </p>
          </div>
          <div className="flex flex-wrap gap-3" data-reveal>
            <Knopf href={`tel:${praxis.telefon.link}`}>{praxis.telefon.anzeige}</Knopf>
            <Knopf href="/termin" variante="sekundaer">
              Termin vereinbaren
            </Knopf>
          </div>
        </div>
      </Abschnitt>
    </>
  );
}
