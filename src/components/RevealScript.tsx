"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Blendet Abschnitte beim Scrollen ein. Bewusst mit IntersectionObserver statt
 * einer Animationsbibliothek, das spart rund 40 Kilobyte JavaScript.
 */
export function RevealScript() {
  const pathname = usePathname();

  useEffect(() => {
    const reduziert = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const ziele = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));

    if (reduziert) {
      ziele.forEach((el) => el.classList.add("is-in"));
      return;
    }

    const beobachter = new IntersectionObserver(
      (eintraege) => {
        eintraege.forEach((eintrag) => {
          if (eintrag.isIntersecting) {
            eintrag.target.classList.add("is-in");
            beobachter.unobserve(eintrag.target);
          }
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
    );

    ziele.forEach((el) => {
      // Was beim Laden schon im Bild steht, wird sofort gezeigt.
      if (el.getBoundingClientRect().top < window.innerHeight * 0.92) {
        el.classList.add("is-in");
      } else {
        beobachter.observe(el);
      }
    });

    /* Sicherheitsnetz: Kein Inhalt darf dauerhaft unsichtbar bleiben, nur weil
       der IntersectionObserver nicht auslöst. Das passiert etwa in eingebetteten
       Ansichten, bei Seitenaufnahmen oder wenn ein Browser die API einschränkt.
       Nach drei Sekunden wird alles gezeigt, was noch aussteht. */
    const notbremse = window.setTimeout(() => {
      ziele.forEach((el) => el.classList.add("is-in"));
      beobachter.disconnect();
    }, 3000);

    return () => {
      window.clearTimeout(notbremse);
      beobachter.disconnect();
    };
  }, [pathname]);

  return null;
}
