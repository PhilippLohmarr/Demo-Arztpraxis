import type { FaqEintrag } from "@/content/faq";

/**
 * Aufklappbare Fragen auf Basis von details und summary. Damit funktioniert
 * die Bedienung per Tastatur und Screenreader ohne eine Zeile JavaScript,
 * und der Browser findet die Antworten auch über die Seitensuche.
 */
export function Faq({ eintraege }: { eintraege: FaqEintrag[] }) {
  return (
    <div className="divide-y divide-line border-y border-line">
      {eintraege.map((eintrag) => (
        <details key={eintrag.frage} className="group">
          <summary className="flex cursor-pointer list-none items-start justify-between gap-6 py-5 text-left [&::-webkit-details-marker]:hidden">
            <span className="font-serif text-xl leading-snug text-ink">{eintrag.frage}</span>
            <span
              aria-hidden="true"
              className="mt-1 grid h-7 w-7 shrink-0 place-items-center rounded-full border border-line text-muted transition-transform duration-300 group-open:rotate-45"
            >
              <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="none">
                <path d="M8 3v10M3 8h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </span>
          </summary>
          <p className="max-w-2xl pb-6 leading-relaxed text-muted">{eintrag.antwort}</p>
        </details>
      ))}
    </div>
  );
}

export function faqJsonLd(eintraege: FaqEintrag[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: eintraege.map((e) => ({
      "@type": "Question",
      name: e.frage,
      acceptedAnswer: { "@type": "Answer", text: e.antwort },
    })),
  };
}
