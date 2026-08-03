"use client";

import { useState } from "react";

export const DEMOBAR_SPEICHER = "framestudio-demobar-aus";
const STUDIO_URL = "https://studio-three-pi-87.vercel.app";

/**
 * Hinweisleiste von Frame Studio über der Praxis-Website. Sie lässt sich
 * schließen, damit im Kundengespräch die reine Praxis-Erfahrung übrig bleibt.
 * Die Entscheidung merkt sich der Browser.
 *
 * Die Leiste steht immer im ausgelieferten HTML. Ob sie sichtbar ist, klärt ein
 * kurzes Skript im head, bevor der Browser zeichnet. Dadurch gibt es weder ein
 * Aufblitzen noch einen Sprung im Layout.
 */
export function DemoBar() {
  const [geschlossen, setGeschlossen] = useState(false);

  if (geschlossen) return null;

  return (
    <aside
      className="demo-bar no-print relative z-50 bg-[#17130e] text-[#f4f1e9]"
      aria-label="Hinweis zu dieser Demo"
    >
      <div className="wrap flex flex-wrap items-center gap-x-4 gap-y-2 py-2.5">
        <span
          className="inline-flex shrink-0 items-center gap-2 text-[0.7rem] font-semibold tracking-[0.18em] uppercase"
          style={{ color: "#f0431e" }}
        >
          <span
            aria-hidden="true"
            className="dot-live inline-block h-1.5 w-1.5 rounded-full"
            style={{ background: "#f0431e" }}
          />
          Demo
        </span>

        <p className="min-w-0 flex-1 text-sm text-[#f4f1e9]/80">
          Diese Praxis gibt es nicht. Die Website schon.{" "}
          <span className="hidden sm:inline">
            Gebaut von Frame Studio als Beispiel dafür, wie deine Seite aussehen kann.
          </span>
        </p>

        <a
          href={STUDIO_URL}
          target="_blank"
          rel="noopener"
          className="inline-flex min-h-9 shrink-0 items-center rounded-full px-4 text-sm font-medium text-[#17130e] transition-transform hover:-translate-y-px"
          style={{ background: "#f0431e" }}
        >
          Frame Studio ansehen
        </a>

        <button
          type="button"
          onClick={() => {
            try {
              localStorage.setItem(DEMOBAR_SPEICHER, "1");
            } catch {
              /* Privater Modus, dann gilt die Entscheidung nur für diese Ansicht. */
            }
            setGeschlossen(true);
          }}
          className="grid h-9 w-9 shrink-0 place-items-center rounded-full text-[#f4f1e9]/60 transition-colors hover:bg-[#f4f1e9]/10 hover:text-[#f4f1e9]"
          aria-label="Hinweisleiste ausblenden"
        >
          <svg viewBox="0 0 20 20" className="h-4 w-4" aria-hidden="true">
            <path
              d="M5 5l10 10M15 5L5 15"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              fill="none"
            />
          </svg>
        </button>
      </div>
    </aside>
  );
}
