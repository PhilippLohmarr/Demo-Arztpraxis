import { praxis, type OeffnungsTag } from "@/content/praxis";

export type Status = {
  offen: boolean;
  /** Kurzer Satz für die Statusanzeige, zum Beispiel "Jetzt geöffnet bis 18:00". */
  text: string;
  /** Für Screenreader und das title-Attribut, etwas ausführlicher. */
  lang: string;
};

export function minutenZuUhrzeit(m: number) {
  const h = Math.floor(m / 60);
  const min = m % 60;
  return `${h}:${String(min).padStart(2, "0")}`;
}

/** Zeiten stehen ausgeschrieben, weil Screenreader den Bis-Strich uneinheitlich vorlesen. */
export function blockText(block: number[]) {
  return `${minutenZuUhrzeit(block[0])} bis ${minutenZuUhrzeit(block[1])}`;
}

export function tagText(tag: OeffnungsTag) {
  if (tag.bloecke.length === 0) return "geschlossen";
  return tag.bloecke.map(blockText).join(" und ");
}

/**
 * Liest Wochentag und Uhrzeit in der Zeitzone Europe/Berlin aus, unabhängig
 * davon, wo Server oder Besucher stehen.
 */
export function berlinJetzt(now: Date = new Date()) {
  const parts = new Intl.DateTimeFormat("de-DE", {
    timeZone: "Europe/Berlin",
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).formatToParts(now);

  const get = (t: string) => parts.find((p) => p.type === t)?.value ?? "";
  const wochentage: Record<string, number> = {
    Mo: 1,
    Di: 2,
    Mi: 3,
    Do: 4,
    Fr: 5,
    Sa: 6,
    So: 7,
  };

  const kurz = get("weekday").replace(".", "").slice(0, 2);
  const tag = wochentage[kurz] ?? 1;
  const minuten = Number(get("hour")) * 60 + Number(get("minute"));

  return { tag, minuten };
}

export function statusJetzt(now: Date = new Date()): Status {
  const { tag, minuten } = berlinJetzt(now);
  const tage = praxis.oeffnungszeiten;
  const heute = tage.find((t) => t.tag === tag);

  if (heute) {
    for (const block of heute.bloecke) {
      if (minuten >= block[0] && minuten < block[1]) {
        const bis = minutenZuUhrzeit(block[1]);
        return {
          offen: true,
          text: `Jetzt geöffnet bis ${bis} Uhr`,
          lang: `Die Praxis hat gerade geöffnet und schließt um ${bis} Uhr.`,
        };
      }
    }

    const spaeter = heute.bloecke.find((b) => minuten < b[0]);
    if (spaeter) {
      const ab = minutenZuUhrzeit(spaeter[0]);
      return {
        offen: false,
        text: `Geschlossen, öffnet um ${ab} Uhr`,
        lang: `Die Praxis ist gerade geschlossen und öffnet heute um ${ab} Uhr.`,
      };
    }
  }

  for (let i = 1; i <= 7; i++) {
    const naechster = tage.find((t) => t.tag === ((tag + i - 1) % 7) + 1);
    if (naechster && naechster.bloecke.length > 0) {
      const ab = minutenZuUhrzeit(naechster.bloecke[0][0]);
      const wann = i === 1 ? "morgen" : naechster.lang;
      return {
        offen: false,
        text: `Geschlossen, öffnet ${wann} um ${ab} Uhr`,
        lang: `Die Praxis ist geschlossen. Geöffnet wird wieder ${wann} um ${ab} Uhr.`,
      };
    }
  }

  return { offen: false, text: "Geschlossen", lang: "Die Praxis ist geschlossen." };
}

/** Öffnungszeiten im Format, das schema.org für openingHours erwartet. */
export function schemaOeffnungszeiten() {
  const map: Record<number, string> = {
    1: "Monday",
    2: "Tuesday",
    3: "Wednesday",
    4: "Thursday",
    5: "Friday",
    6: "Saturday",
    7: "Sunday",
  };

  return praxis.oeffnungszeiten.flatMap((tag) =>
    tag.bloecke.map((block) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: map[tag.tag],
      opens: minutenZuUhrzeit(block[0]).padStart(5, "0"),
      closes: minutenZuUhrzeit(block[1]).padStart(5, "0"),
    })),
  );
}
