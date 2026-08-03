import type { ReactNode } from "react";

/** Einheitliche Typografie für Impressum, Datenschutz und Barrierefreiheit. */
export function Rechtstext({ children }: { children: ReactNode }) {
  return (
    <div
      className="max-w-2xl [&_a]:text-moss [&_a]:underline [&_a]:underline-offset-4 [&_dd]:mt-1 [&_dd]:leading-relaxed [&_dt]:text-sm [&_dt]:text-muted [&_h2]:mt-14 [&_h2]:font-serif [&_h2]:text-[clamp(1.5rem,2.8vw,2rem)] [&_h2]:leading-snug [&_h3]:mt-9 [&_h3]:font-serif [&_h3]:text-xl [&_li]:leading-relaxed [&_p]:mt-4 [&_p]:leading-relaxed [&_p]:text-muted [&_ul]:mt-4 [&_ul]:space-y-2 [&_ul]:text-muted"
    >
      {children}
    </div>
  );
}

/** Kennzeichnet Textstellen, die eine echte Praxis durch eigene Angaben ersetzt. */
export function DemoHinweis({ children }: { children: ReactNode }) {
  return (
    <aside className="mt-8 rounded-[var(--radius-card)] border border-clay/30 bg-clay/5 p-6">
      <p className="eyebrow text-clay">Hinweis zur Demo</p>
      <p className="mt-3 leading-relaxed">{children}</p>
    </aside>
  );
}
