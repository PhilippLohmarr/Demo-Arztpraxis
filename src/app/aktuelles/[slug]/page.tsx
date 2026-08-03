import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { SeitenKopf } from "@/components/SeitenKopf";
import { Abschnitt, Knopf } from "@/components/Ui";
import { meldungen, meldungBySlug, datumLang } from "@/content/aktuelles";
import { praxis } from "@/content/praxis";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return meldungen.map((m) => ({ slug: m.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const meldung = meldungBySlug(slug);
  if (!meldung) return {};

  return {
    title: meldung.titel,
    description: meldung.teaser,
    alternates: { canonical: `/aktuelles/${meldung.slug}` },
    openGraph: { type: "article", publishedTime: meldung.datum },
  };
}

export default async function MeldungSeite({ params }: Props) {
  const { slug } = await params;
  const meldung = meldungBySlug(slug);
  if (!meldung) notFound();

  const weitere = meldungen.filter((m) => m.slug !== meldung.slug).slice(0, 3);

  return (
    <>
      <SeitenKopf
        eyebrow={datumLang(meldung.datum)}
        titel={meldung.titel}
        zurueck={{ href: "/aktuelles", label: "Alle Meldungen" }}
      />

      <Abschnitt>
        <article className="max-w-2xl">
          <p className="text-xl leading-relaxed text-ink/85" data-reveal>
            {meldung.teaser}
          </p>

          <div className="mt-8 space-y-6" data-reveal>
            {meldung.text.map((absatz) => (
              <p key={absatz.slice(0, 40)} className="text-lg leading-relaxed text-muted">
                {absatz}
              </p>
            ))}
          </div>

          <div className="mt-12 flex flex-wrap gap-3 border-t border-line pt-8" data-reveal>
            <Knopf href={`tel:${praxis.telefon.link}`}>{praxis.telefon.anzeige}</Knopf>
            <Knopf href="/termin" variante="sekundaer">
              Termin vereinbaren
            </Knopf>
          </div>
        </article>
      </Abschnitt>

      <Abschnitt className="bg-paper-2/50">
        <h2 className="font-serif text-[clamp(1.6rem,3vw,2.25rem)]" data-reveal>
          Weitere Meldungen
        </h2>
        <ul className="mt-10 grid gap-6 md:grid-cols-3">
          {weitere.map((m) => (
            <li key={m.slug} data-reveal>
              <Link
                href={`/aktuelles/${m.slug}`}
                className="flex h-full flex-col rounded-[var(--radius-card)] border border-line bg-paper p-7 transition-all duration-300 hover:-translate-y-1 hover:border-moss/40"
              >
                <time dateTime={m.datum} className="text-sm text-muted">
                  {datumLang(m.datum)}
                </time>
                <h3 className="mt-3 font-serif text-xl leading-snug">{m.titel}</h3>
                <p className="mt-3 text-[0.95rem] leading-relaxed text-muted">{m.teaser}</p>
              </Link>
            </li>
          ))}
        </ul>
      </Abschnitt>
    </>
  );
}
