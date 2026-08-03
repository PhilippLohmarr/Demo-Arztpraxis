import Link from "next/link";
import type { ReactNode } from "react";

/** Einheitlicher Kopfbereich aller Unterseiten. */
export function SeitenKopf({
  eyebrow,
  titel,
  text,
  zurueck,
  kinder,
}: {
  eyebrow: string;
  titel: string;
  text?: string;
  zurueck?: { href: string; label: string };
  kinder?: ReactNode;
}) {
  return (
    <section className="border-b border-line pt-12 pb-16 md:pt-16 md:pb-20">
      <div className="wrap">
        {zurueck ? (
          <Link
            href={zurueck.href}
            className="group mb-8 inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-ink"
          >
            <svg viewBox="0 0 16 16" className="h-4 w-4" aria-hidden="true" fill="none">
              <path
                d="M13 8H3M7 4L3 8l4 4"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            {zurueck.label}
          </Link>
        ) : null}

        <p className="eyebrow text-muted">{eyebrow}</p>
        <h1 className="mt-4 max-w-4xl text-[clamp(2.25rem,5.5vw,4rem)] leading-[1.02]">
          {titel}
        </h1>
        {text ? (
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">{text}</p>
        ) : null}
        {kinder}
      </div>
    </section>
  );
}
