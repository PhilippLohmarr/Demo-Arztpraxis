import Link from "next/link";
import { praxis } from "@/content/praxis";
import { leistungen } from "@/content/leistungen";
import { tagText } from "@/lib/oeffnungszeiten";

const STUDIO_URL = "https://studio-three-pi-87.vercel.app";

export function Footer() {
  return (
    <footer className="grain relative border-t border-line-dark bg-ink text-paper">
      <div className="wrap relative py-16 md:py-20">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="font-serif text-2xl">{praxis.name}</p>
            <address className="mt-4 text-[0.95rem] leading-relaxed text-paper/70 not-italic">
              {praxis.adresse.strasse}
              <br />
              {praxis.adresse.plz} {praxis.adresse.ort}
              <br />
              {praxis.adresse.stadtteil}
            </address>
            <div className="mt-5 flex flex-col gap-1.5 text-[0.95rem]">
              <a
                href={`tel:${praxis.telefon.link}`}
                className="text-paper transition-colors hover:text-[#8fd3b6]"
              >
                {praxis.telefon.anzeige}
              </a>
              <a
                href={`mailto:${praxis.email}`}
                className="break-all text-paper/70 transition-colors hover:text-paper"
              >
                {praxis.email}
              </a>
            </div>
          </div>

          <div>
            <h2 className="font-sans text-xs font-semibold tracking-[0.16em] text-paper/50 uppercase">
              Sprechzeiten
            </h2>
            <table className="mt-4 w-full text-[0.95rem]">
              <caption className="sr-only">Sprechzeiten der Praxis</caption>
              <tbody>
                {praxis.oeffnungszeiten
                  .filter((t) => t.bloecke.length > 0)
                  .map((tag) => (
                    <tr key={tag.tag} className="align-baseline">
                      <th scope="row" className="w-12 pb-1.5 text-left font-normal text-paper/55">
                        {tag.kurz}
                      </th>
                      <td className="pb-1.5 text-paper/85">{tagText(tag)}</td>
                    </tr>
                  ))}
                <tr className="align-baseline">
                  <th scope="row" className="w-12 text-left font-normal text-paper/55">
                    Sa, So
                  </th>
                  <td className="text-paper/85">geschlossen</td>
                </tr>
              </tbody>
            </table>
            <p className="mt-4 text-sm text-paper/55">Telefon: {praxis.telefonzeiten}</p>
          </div>

          <div>
            <h2 className="font-sans text-xs font-semibold tracking-[0.16em] text-paper/50 uppercase">
              Leistungen
            </h2>
            <ul className="mt-4 space-y-2 text-[0.95rem]">
              {leistungen.map((l) => (
                <li key={l.slug}>
                  <Link
                    href={`/leistungen/${l.slug}`}
                    className="text-paper/75 transition-colors hover:text-paper"
                  >
                    {l.titel}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="font-sans text-xs font-semibold tracking-[0.16em] text-paper/50 uppercase">
              Im Notfall
            </h2>
            <dl className="mt-4 space-y-3 text-[0.95rem]">
              <div>
                <dt className="text-paper/55">Lebensgefahr</dt>
                <dd>
                  <a href="tel:112" className="text-paper transition-colors hover:text-[#8fd3b6]">
                    {praxis.notfall.notruf}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="text-paper/55">Ärztlicher Bereitschaftsdienst</dt>
                <dd>
                  <a
                    href="tel:116117"
                    className="text-paper transition-colors hover:text-[#8fd3b6]"
                  >
                    {praxis.notfall.aerztlicherBereitschaftsdienst}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="text-paper/55">Giftnotruf</dt>
                <dd>
                  <a
                    href={`tel:${praxis.notfall.giftnotruf.replace(/\s/g, "")}`}
                    className="text-paper transition-colors hover:text-[#8fd3b6]"
                  >
                    {praxis.notfall.giftnotruf}
                  </a>
                </dd>
              </div>
            </dl>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-6 border-t border-line-dark pt-8 text-sm md:flex-row md:items-center md:justify-between">
          <nav aria-label="Rechtliches" className="flex flex-wrap gap-x-6 gap-y-2">
            <Link href="/impressum" className="text-paper/60 transition-colors hover:text-paper">
              Impressum
            </Link>
            <Link href="/datenschutz" className="text-paper/60 transition-colors hover:text-paper">
              Datenschutz
            </Link>
            <Link
              href="/barrierefreiheit"
              className="text-paper/60 transition-colors hover:text-paper"
            >
              Barrierefreiheit
            </Link>
            <Link href="/termin" className="text-paper/60 transition-colors hover:text-paper">
              Kontakt
            </Link>
          </nav>

          <p className="text-paper/45">
            Demo-Website.{" "}
            <a
              href={STUDIO_URL}
              target="_blank"
              rel="noopener"
              className="underline underline-offset-4 transition-colors hover:text-paper"
            >
              Gebaut von Frame Studio
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
