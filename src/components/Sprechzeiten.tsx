"use client";

import { useSyncExternalStore } from "react";
import { praxis } from "@/content/praxis";
import { berlinJetzt, tagText } from "@/lib/oeffnungszeiten";

/*
  Der heutige Wochentag darf nicht schon beim Build feststehen, sonst zeigt eine
  statisch ausgelieferte Seite tagelang denselben Tag als heute an. Beim
  Serverrendern liefert der Store deshalb null, erst im Browser den echten Tag.
  Ohne JavaScript fehlt nur die Hervorhebung, die Zeiten stehen trotzdem da.
*/
const nichtsAbonnieren = () => () => {};
const tagImBrowser = () => berlinJetzt().tag;
const keinTagAufDemServer = () => null;

export function Sprechzeiten({ dunkel = false }: { dunkel?: boolean }) {
  const heute = useSyncExternalStore(
    nichtsAbonnieren,
    tagImBrowser,
    keinTagAufDemServer,
  );

  return (
    <table className="w-full border-collapse text-left">
      <caption className="sr-only">
        Sprechzeiten der {praxis.name}, Woche im Überblick
      </caption>
      <tbody>
        {praxis.oeffnungszeiten.map((tag) => {
          const istHeute = tag.tag === heute;
          const geschlossen = tag.bloecke.length === 0;

          return (
            <tr
              key={tag.tag}
              className={[
                "border-b last:border-b-0",
                dunkel ? "border-line-dark" : "border-line",
                istHeute ? (dunkel ? "bg-paper/10" : "bg-moss-100/60") : "",
              ].join(" ")}
            >
              <th
                scope="row"
                className={[
                  "py-3 pl-3 text-[0.95rem] font-normal",
                  geschlossen
                    ? dunkel
                      ? "text-paper/40"
                      : "text-muted"
                    : dunkel
                      ? "text-paper"
                      : "text-ink",
                ].join(" ")}
              >
                {tag.lang}
                {istHeute ? (
                  <span
                    className={`ml-2 rounded-full px-2 py-0.5 text-[0.68rem] font-medium tracking-wide uppercase ${
                      dunkel ? "bg-paper/15 text-paper" : "bg-moss text-paper"
                    }`}
                  >
                    heute
                  </span>
                ) : null}
              </th>
              <td
                className={[
                  "py-3 pr-3 text-right text-[0.95rem] tabular-nums",
                  geschlossen
                    ? dunkel
                      ? "text-paper/40"
                      : "text-muted"
                    : dunkel
                      ? "text-paper/85"
                      : "text-ink",
                ].join(" ")}
              >
                {tagText(tag)}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
