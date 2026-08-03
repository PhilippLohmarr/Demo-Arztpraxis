import { Knopf } from "@/components/Ui";
import { praxis } from "@/content/praxis";

export default function NichtGefunden() {
  return (
    <section className="wrap flex min-h-[60vh] flex-col justify-center py-24">
      <p className="eyebrow text-muted">Fehler 404</p>
      <h1 className="mt-4 max-w-2xl text-[clamp(2.25rem,5.5vw,4rem)] leading-[1.02]">
        Diese Seite gibt es nicht
      </h1>
      <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">
        Vielleicht hat sich die Adresse geändert. Über die Navigation kommen Sie weiter.
        Wenn Sie einen Termin brauchen, rufen Sie einfach an.
      </p>
      <div className="mt-10 flex flex-wrap gap-3">
        <Knopf href="/">Zur Startseite</Knopf>
        <Knopf href={`tel:${praxis.telefon.link}`} variante="sekundaer">
          {praxis.telefon.anzeige}
        </Knopf>
      </div>
    </section>
  );
}
