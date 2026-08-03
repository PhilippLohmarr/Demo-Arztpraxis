"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { praxis } from "@/content/praxis";

/**
 * Auf dem Handy bleiben Anruf und Terminbuchung immer erreichbar. Die Leiste
 * erscheint erst nach dem ersten Bildschirm, damit sie den Hero nicht verdeckt.
 */
export function MobileCta() {
  const [sichtbar, setSichtbar] = useState(false);

  useEffect(() => {
    const beiScroll = () => setSichtbar(window.scrollY > window.innerHeight * 0.6);
    beiScroll();
    window.addEventListener("scroll", beiScroll, { passive: true });
    return () => window.removeEventListener("scroll", beiScroll);
  }, []);

  return (
    <div
      className={[
        "no-print fixed inset-x-0 bottom-0 z-30 border-t border-line bg-paper/95 backdrop-blur-md transition-transform duration-300 lg:hidden",
        sichtbar ? "translate-y-0" : "translate-y-full",
      ].join(" ")}
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
      aria-hidden={!sichtbar}
    >
      <div className="flex gap-2.5 px-4 py-3">
        <a
          href={`tel:${praxis.telefon.link}`}
          tabIndex={sichtbar ? 0 : -1}
          className="inline-flex min-h-12 flex-1 items-center justify-center gap-2 rounded-full border border-ink/25 font-medium"
        >
          <svg viewBox="0 0 20 20" className="h-4 w-4" aria-hidden="true" fill="none">
            <path
              d="M4.5 3h3l1.5 3.5-2 1.2a9.5 9.5 0 004.3 4.3l1.2-2L16 11.5v3a1.5 1.5 0 01-1.6 1.5A12.4 12.4 0 013 5.1 1.5 1.5 0 014.5 3z"
              stroke="currentColor"
              strokeWidth="1.4"
              strokeLinejoin="round"
            />
          </svg>
          Anrufen
        </a>
        <Link
          href="/termin"
          tabIndex={sichtbar ? 0 : -1}
          className="inline-flex min-h-12 flex-1 items-center justify-center rounded-full bg-moss font-medium text-paper"
        >
          Termin
        </Link>
      </div>
    </div>
  );
}
