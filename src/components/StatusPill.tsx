"use client";

import { useSyncExternalStore } from "react";
import { statusJetzt, type Status } from "@/lib/oeffnungszeiten";

/*
  Der Öffnungsstatus ist ein Wert außerhalb von React: er hängt an der Uhr.
  useSyncExternalStore ist dafür das passende Werkzeug. Es liefert beim
  Serverrendern den Wert aus dem Build und schaltet nach der Hydration auf die
  echte Uhrzeit um, ohne dass eine Abweichung als Fehler gemeldet wird.
*/

function abonnieren(benachrichtigen: () => void) {
  const timer = setInterval(benachrichtigen, 60_000);
  return () => clearInterval(timer);
}

/* getSnapshot muss dieselbe Referenz zurückgeben, solange sich nichts ändert,
   sonst rendert React endlos. Deshalb der Zwischenspeicher. */
let zwischenspeicher: Status | null = null;

function aktuellerStatus(): Status {
  const neu = statusJetzt();
  if (!zwischenspeicher || zwischenspeicher.text !== neu.text) {
    zwischenspeicher = neu;
  }
  return zwischenspeicher;
}

export function StatusPill({
  initial,
  variante = "hell",
}: {
  initial: Status;
  variante?: "hell" | "dunkel";
}) {
  const status = useSyncExternalStore(abonnieren, aktuellerStatus, () => initial);

  const dunkel = variante === "dunkel";
  const punkt = status.offen ? "#3d9c76" : "#b3703f";

  return (
    <p
      className={[
        "inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-sm font-medium",
        dunkel ? "border-paper/20 bg-paper/10 text-paper" : "border-line bg-paper text-ink",
      ].join(" ")}
      title={status.lang}
    >
      <span
        aria-hidden="true"
        className={`inline-block h-2 w-2 rounded-full ${status.offen ? "dot-live" : ""}`}
        style={{ background: punkt }}
      />
      <span>{status.text}</span>
      <span className="sr-only">{status.lang}</span>
    </p>
  );
}
