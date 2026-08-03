import Image from "next/image";
import { bilder, bildPfad, type BildKey } from "@/lib/bilder";

/**
 * Zeichnet aus dem Namen des Slots eine ruhige, immer gleiche Grafik. So sieht
 * jeder Bildplatz eigenständig aus, solange noch kein Foto hinterlegt ist.
 */
function Platzhalter({
  bildKey,
  initialen,
  className,
}: {
  bildKey: string;
  initialen?: string;
  className?: string;
}) {
  let h = 0;
  for (let i = 0; i < bildKey.length; i++) h = (h * 31 + bildKey.charCodeAt(i)) % 997;

  const rotation = (h % 50) - 25;
  const cx = 26 + (h % 38);
  const cy = 30 + ((h >> 2) % 34);
  const r = 30 + (h % 18);

  return (
    <div
      className={`relative isolate overflow-hidden bg-paper-3 ${className ?? ""}`}
      aria-hidden="true"
    >
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid slice"
        role="presentation"
      >
        <defs>
          <linearGradient id={`g-${bildKey}`} x1="0" y1="0" x2="0.7" y2="1">
            <stop offset="0%" stopColor="#efe9db" />
            <stop offset="100%" stopColor="#cfc5ac" />
          </linearGradient>
          <radialGradient id={`v-${bildKey}`} cx="0.5" cy="0.42" r="0.75">
            <stop offset="55%" stopColor="#14201b" stopOpacity="0" />
            <stop offset="100%" stopColor="#14201b" stopOpacity="0.16" />
          </radialGradient>
        </defs>

        <rect width="100" height="100" fill={`url(#g-${bildKey})`} />

        <g transform={`rotate(${rotation} 50 50)`}>
          <circle cx={cx} cy={cy} r={r} fill="#1c5a48" opacity="0.3" />
          <circle cx={100 - cx} cy={100 - cy} r={r * 0.62} fill="#a84a26" opacity="0.2" />
          <path
            d={`M0 ${68 + (h % 14)} Q 50 ${36 + (h % 32)} 100 ${62 + (h % 18)} L100 100 L0 100 Z`}
            fill="#14201b"
            opacity="0.14"
          />
          <path
            d={`M0 ${80 + (h % 10)} Q 50 ${58 + (h % 22)} 100 ${76 + (h % 12)} L100 100 L0 100 Z`}
            fill="#1c5a48"
            opacity="0.22"
          />
        </g>

        <rect width="100" height="100" fill={`url(#v-${bildKey})`} />
      </svg>

      {initialen ? (
        <span className="absolute inset-0 grid place-items-center font-serif text-[24cqw] leading-none text-paper/70">
          {initialen}
        </span>
      ) : null}

      <span className="grain absolute inset-0" />
    </div>
  );
}

export function Bild({
  name,
  className,
  sizes = "(max-width: 768px) 100vw, 50vw",
  priority = false,
  rundung = "rounded-[var(--radius-card)]",
}: {
  name: BildKey;
  className?: string;
  sizes?: string;
  priority?: boolean;
  rundung?: string;
}) {
  const slot = bilder[name];
  const pfad = bildPfad(name);
  const rahmen = `@container overflow-hidden ${rundung} ${className ?? ""}`;

  if (!pfad) {
    return (
      <div className={rahmen}>
        <Platzhalter
          bildKey={name}
          initialen={"initialen" in slot ? slot.initialen : undefined}
          className="h-full w-full"
        />
      </div>
    );
  }

  return (
    <div className={rahmen}>
      <Image
        src={pfad}
        alt={slot.alt}
        width={slot.breite}
        height={slot.hoehe}
        sizes={sizes}
        priority={priority}
        className="h-full w-full object-cover"
      />
    </div>
  );
}
