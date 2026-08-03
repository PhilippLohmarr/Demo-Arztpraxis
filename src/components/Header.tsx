"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { praxis } from "@/content/praxis";
import { statusJetzt } from "@/lib/oeffnungszeiten";
import { StatusPill } from "@/components/StatusPill";

const navigation = [
  { href: "/leistungen", label: "Leistungen" },
  { href: "/team", label: "Team" },
  { href: "/praxis", label: "Praxis" },
  { href: "/aktuelles", label: "Aktuelles" },
];

export function Header() {
  const pathname = usePathname();
  const [offen, setOffen] = useState(false);
  const [gescrollt, setGescrollt] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const knopfRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const beiScroll = () => setGescrollt(window.scrollY > 12);
    beiScroll();
    window.addEventListener("scroll", beiScroll, { passive: true });
    return () => window.removeEventListener("scroll", beiScroll);
  }, []);

  // Beim Seitenwechsel schließt das Menü. Der Vergleich läuft während des
  // Renderns statt in einem Effekt, sonst blitzt das offene Menü kurz auf.
  const [letzterPfad, setLetzterPfad] = useState(pathname);
  if (letzterPfad !== pathname) {
    setLetzterPfad(pathname);
    setOffen(false);
  }

  useEffect(() => {
    if (!offen) return;

    document.body.style.overflow = "hidden";

    const beiTaste = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOffen(false);
        knopfRef.current?.focus();
        return;
      }
      if (e.key !== "Tab" || !menuRef.current) return;

      // Fokus im geöffneten Menü halten, sonst tabbt man in die Seite dahinter.
      const fokussierbar = menuRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled])',
      );
      if (fokussierbar.length === 0) return;
      const erstes = fokussierbar[0];
      const letztes = fokussierbar[fokussierbar.length - 1];

      if (e.shiftKey && document.activeElement === erstes) {
        e.preventDefault();
        letztes.focus();
      } else if (!e.shiftKey && document.activeElement === letztes) {
        e.preventDefault();
        erstes.focus();
      }
    };

    document.addEventListener("keydown", beiTaste);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", beiTaste);
    };
  }, [offen]);

  const status = statusJetzt();

  return (
    <header
      className={[
        "no-print sticky top-0 z-40 transition-all duration-300",
        gescrollt
          ? "border-b border-line bg-paper/85 backdrop-blur-md"
          : "border-b border-transparent",
      ].join(" ")}
    >
      <div className="wrap flex h-18 items-center justify-between gap-6 py-3.5">
        <Link
          href="/"
          className="group flex items-center gap-3"
          aria-label={`${praxis.name}, zur Startseite`}
        >
          <Monogramm />
          <span className="leading-tight">
            <span className="block font-serif text-lg tracking-tight">{praxis.name}</span>
            <span className="hidden text-xs text-muted sm:block">
              Hausärzte in {praxis.adresse.stadtteil}
            </span>
          </span>
        </Link>

        <nav aria-label="Hauptnavigation" className="hidden items-center gap-1 lg:flex">
          {navigation.map((eintrag) => {
            const aktiv = pathname.startsWith(eintrag.href);
            return (
              <Link
                key={eintrag.href}
                href={eintrag.href}
                aria-current={aktiv ? "page" : undefined}
                className={[
                  "rounded-full px-4 py-2 text-[0.95rem] transition-colors",
                  aktiv ? "bg-moss-100 text-moss-600" : "text-ink/75 hover:text-ink",
                ].join(" ")}
              >
                {eintrag.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <a
            href={`tel:${praxis.telefon.link}`}
            className="rounded-full px-3 py-2 text-[0.95rem] font-medium text-ink transition-colors hover:text-moss"
          >
            {praxis.telefon.anzeige}
          </a>
          <Link
            href="/termin"
            className="inline-flex min-h-11 items-center rounded-full bg-moss px-5 text-[0.95rem] font-medium text-paper transition-all hover:-translate-y-0.5 hover:bg-moss-600"
          >
            Termin vereinbaren
          </Link>
        </div>

        <button
          ref={knopfRef}
          type="button"
          onClick={() => setOffen((v) => !v)}
          aria-expanded={offen}
          aria-controls="hauptmenue"
          className="grid h-11 w-11 place-items-center rounded-full border border-line lg:hidden"
        >
          <span className="sr-only">{offen ? "Menü schließen" : "Menü öffnen"}</span>
          <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true" fill="none">
            {offen ? (
              <path
                d="M6 6l12 12M18 6L6 18"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinecap="round"
              />
            ) : (
              <path
                d="M4 8h16M4 16h16"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinecap="round"
              />
            )}
          </svg>
        </button>
      </div>

      {offen ? (
        <div
          id="hauptmenue"
          ref={menuRef}
          className="fixed inset-x-0 top-18 bottom-0 z-40 overflow-y-auto border-t border-line bg-paper px-5 pt-6 pb-28 lg:hidden"
        >
          <StatusPill initial={status} />

          <nav aria-label="Hauptnavigation mobil" className="mt-6 flex flex-col">
            {navigation.map((eintrag) => (
              <Link
                key={eintrag.href}
                href={eintrag.href}
                className="border-b border-line py-4 font-serif text-2xl"
              >
                {eintrag.label}
              </Link>
            ))}
            <Link href="/termin" className="border-b border-line py-4 font-serif text-2xl">
              Termin und Kontakt
            </Link>
          </nav>

          <div className="mt-8 flex flex-col gap-3">
            <a
              href={`tel:${praxis.telefon.link}`}
              className="inline-flex min-h-13 items-center justify-center rounded-full bg-moss px-6 font-medium text-paper"
            >
              {praxis.telefon.anzeige} anrufen
            </a>
            <p className="text-center text-sm text-muted">{praxis.telefonzeiten}</p>
          </div>
        </div>
      ) : null}
    </header>
  );
}

/** Wortbildmarke der Praxis: eine Linde, stark abstrahiert. */
function Monogramm() {
  return (
    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-moss text-paper">
      <svg viewBox="0 0 24 24" className="h-6 w-6" aria-hidden="true" fill="none">
        <path
          d="M12 21v-6.5"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
        <path
          d="M12 14.5c-3.2 0-5-1.9-5-4.2 0-1 .35-1.9.95-2.6-.2-.5-.3-1-.3-1.5C7.65 4.4 9.5 3 11.4 3c.9 0 1.7.3 2.3.8.5-.3 1.1-.5 1.75-.5 1.85 0 3.3 1.4 3.3 3.15 0 .35-.05.7-.15 1 .9.75 1.4 1.8 1.4 2.95 0 2.4-2.2 4.1-5.5 4.1"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}
