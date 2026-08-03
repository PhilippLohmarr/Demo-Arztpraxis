"use client";

import { useState } from "react";

const felder = [
  { name: "name", label: "Vor- und Nachname", typ: "text", autoComplete: "name", pflicht: true },
  { name: "geburtsdatum", label: "Geburtsdatum", typ: "date", autoComplete: "bday", pflicht: true },
  { name: "telefon", label: "Telefon für Rückfragen", typ: "tel", autoComplete: "tel", pflicht: true },
] as const;

/**
 * Rezeptbestellung. In der Demo geht nichts raus, das steht auch so in der
 * Bestätigung. Eine echte Praxis hängt hier ihr Praxisverwaltungssystem an
 * oder einen Dienst, der die Daten Ende-zu-Ende verschlüsselt entgegennimmt.
 */
export function RezeptFormular() {
  const [gesendet, setGesendet] = useState(false);

  if (gesendet) {
    return (
      <div
        className="rounded-[var(--radius-card)] border border-moss/40 bg-moss-100/50 p-8"
        role="status"
      >
        <h3 className="font-serif text-2xl">Bestellung angekommen</h3>
        <p className="mt-3 leading-relaxed text-muted">
          So würde die Bestätigung aussehen. Ihr Rezept läge am nächsten Werktag ab 10:00
          am Empfang bereit.
        </p>
        <p className="mt-5 rounded-xl border border-clay/30 bg-clay/5 px-4 py-3 text-sm leading-relaxed">
          Hinweis zur Demo: Es wurde nichts abgeschickt und nichts gespeichert. Diese Seite
          hat kein Backend.
        </p>
        <button
          type="button"
          onClick={() => setGesendet(false)}
          className="mt-6 min-h-11 rounded-full border border-ink/25 px-5 font-medium transition-colors hover:bg-ink hover:text-paper"
        >
          Formular zurücksetzen
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setGesendet(true);
      }}
      className="rounded-[var(--radius-card)] border border-line bg-paper p-7 md:p-8"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        {felder.map((feld) => (
          <div key={feld.name} className={feld.name === "name" ? "sm:col-span-2" : ""}>
            <label htmlFor={feld.name} className="block text-sm font-medium">
              {feld.label}
              {feld.pflicht ? (
                <span className="text-clay" aria-hidden="true">
                  {" "}
                  *
                </span>
              ) : null}
            </label>
            <input
              id={feld.name}
              name={feld.name}
              type={feld.typ}
              autoComplete={feld.autoComplete}
              required={feld.pflicht}
              className="mt-2 min-h-12 w-full rounded-xl border border-line bg-paper-2/40 px-4 text-base transition-colors focus:border-moss focus:bg-paper"
            />
          </div>
        ))}

        <div className="sm:col-span-2">
          <label htmlFor="praeparate" className="block text-sm font-medium">
            Welche Präparate brauchen Sie?
            <span className="text-clay" aria-hidden="true">
              {" "}
              *
            </span>
          </label>
          <textarea
            id="praeparate"
            name="praeparate"
            rows={4}
            required
            placeholder="Ein Präparat pro Zeile, mit Dosierung falls bekannt"
            className="mt-2 w-full resize-y rounded-xl border border-line bg-paper-2/40 px-4 py-3 text-base transition-colors focus:border-moss focus:bg-paper"
          />
          <p className="mt-2 text-sm text-muted">
            Für Betäubungsmittel und Erstverordnungen brauchen wir einen Termin.
          </p>
        </div>

        <div className="sm:col-span-2">
          <label className="flex items-start gap-3 text-sm leading-relaxed">
            <input
              type="checkbox"
              name="einwilligung"
              required
              className="mt-0.5 h-5 w-5 shrink-0 rounded border-line accent-[#1c5a48]"
            />
            <span>
              Ich bin damit einverstanden, dass die Praxis meine Angaben zur Bearbeitung
              dieser Bestellung verwendet.
              <span className="text-clay" aria-hidden="true">
                {" "}
                *
              </span>
            </span>
          </label>
        </div>
      </div>

      <div className="mt-7 flex flex-wrap items-center gap-4 border-t border-line pt-6">
        <button
          type="submit"
          className="inline-flex min-h-12 items-center rounded-full bg-moss px-7 font-medium text-paper transition-all hover:-translate-y-0.5 hover:bg-moss-600"
        >
          Rezept bestellen
        </button>
        <p className="text-sm text-muted">
          <span aria-hidden="true">* </span>Pflichtfeld
        </p>
      </div>
    </form>
  );
}
