import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Bild } from "@/components/Bild";
import { SeitenKopf } from "@/components/SeitenKopf";
import { Abschnitt, Karte, Knopf, Pfeil } from "@/components/Ui";
import { leistungen, leistungBySlug } from "@/content/leistungen";
import { praxis } from "@/content/praxis";
import type { BildKey } from "@/lib/bilder";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return leistungen.map((l) => ({ slug: l.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const leistung = leistungBySlug(slug);
  if (!leistung) return {};

  return {
    title: leistung.titel,
    description: leistung.kurz,
    alternates: { canonical: `/leistungen/${leistung.slug}` },
  };
}

export default async function LeistungSeite({ params }: Props) {
  const { slug } = await params;
  const leistung = leistungBySlug(slug);
  if (!leistung) notFound();

  const weitere = leistungen.filter((l) => l.slug !== leistung.slug).slice(0, 3);

  return (
    <>
      <SeitenKopf
        eyebrow="Leistung"
        titel={leistung.titel}
        text={leistung.intro}
        zurueck={{ href: "/leistungen", label: "Alle Leistungen" }}
      />

      <Abschnitt>
        <div className="grid gap-14 lg:grid-cols-[1.15fr_0.85fr] lg:gap-20">
          <div>
            <div data-reveal>
              <Bild
                name={leistung.bild as BildKey}
                sizes="(max-width: 1024px) 100vw, 55vw"
                className="aspect-[16/10] w-full"
              />
            </div>

            <div className="mt-10 space-y-6" data-reveal>
              {leistung.absaetze.map((absatz) => (
                <p key={absatz.slice(0, 40)} className="text-lg leading-relaxed text-ink/85">
                  {absatz}
                </p>
              ))}
            </div>

            <h2 className="mt-14 font-serif text-[clamp(1.6rem,3vw,2.25rem)]" data-reveal>
              Was dazugehört
            </h2>
            <dl className="mt-8 grid gap-px overflow-hidden rounded-[var(--radius-card)] border border-line bg-line sm:grid-cols-2">
              {leistung.umfang.map((punkt) => (
                <div key={punkt.titel} className="bg-paper p-7">
                  <dt className="font-serif text-xl">{punkt.titel}</dt>
                  <dd className="mt-2 leading-relaxed text-muted">{punkt.text}</dd>
                </div>
              ))}
            </dl>
          </div>

          <aside className="lg:sticky lg:top-28 lg:self-start" data-reveal>
            <Karte className="bg-moss-100/40">
              <h2 className="font-serif text-2xl">Auf einen Blick</h2>
              <dl className="mt-6 space-y-5">
                <div>
                  <dt className="text-sm text-muted">Für wen</dt>
                  <dd className="mt-1 leading-relaxed">{leistung.fuerWen}</dd>
                </div>
                <div>
                  <dt className="text-sm text-muted">Dauer</dt>
                  <dd className="mt-1 leading-relaxed">{leistung.dauer}</dd>
                </div>
                <div>
                  <dt className="text-sm text-muted">Kosten</dt>
                  <dd className="mt-1 leading-relaxed">{leistung.kosten}</dd>
                </div>
              </dl>

              <div className="mt-8 flex flex-col gap-3 border-t border-line pt-6">
                <Knopf href="/termin">Termin vereinbaren</Knopf>
                <Knopf href={`tel:${praxis.telefon.link}`} variante="sekundaer">
                  {praxis.telefon.anzeige}
                </Knopf>
              </div>

              <p className="mt-5 text-sm leading-relaxed text-muted">
                Bei akuten Beschwerden kommen Sie ohne Termin in die offene Sprechstunde,{" "}
                {praxis.akutsprechstunde.zeit}.
              </p>
            </Karte>
          </aside>
        </div>
      </Abschnitt>

      <Abschnitt className="bg-paper-2/50">
        <h2 className="font-serif text-[clamp(1.6rem,3vw,2.25rem)]" data-reveal>
          Weitere Leistungen
        </h2>
        <ul className="mt-10 grid gap-6 md:grid-cols-3">
          {weitere.map((l) => (
            <li key={l.slug} data-reveal>
              <Link
                href={`/leistungen/${l.slug}`}
                className="group flex h-full flex-col rounded-[var(--radius-card)] border border-line bg-paper p-7 transition-all duration-300 hover:-translate-y-1 hover:border-moss/40"
              >
                <h3 className="font-serif text-xl leading-snug">{l.titel}</h3>
                <p className="mt-3 flex-1 text-[0.95rem] leading-relaxed text-muted">{l.kurz}</p>
                <span className="mt-5 inline-flex items-center gap-2 text-[0.95rem] font-medium text-moss">
                  Ansehen
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
