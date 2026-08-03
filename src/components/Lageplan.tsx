import { praxis, praxisAdresseEinzeilig } from "@/content/praxis";

/**
 * Selbst gezeichneter Lageplan statt einer eingebetteten Karte.
 *
 * Google Maps lädt beim Einbetten Daten an Google, bevor jemand einwilligen
 * kann. Diese Grafik liegt im HTML, kostet keine externe Anfrage und braucht
 * deshalb kein Einwilligungsbanner. Wer eine Route möchte, klickt bewusst auf
 * den Link zu OpenStreetMap.
 */
export function Lageplan() {
  const routeUrl =
    "https://www.openstreetmap.org/search?query=" +
    encodeURIComponent(praxisAdresseEinzeilig);

  return (
    <figure className="overflow-hidden rounded-[var(--radius-card)] border border-line bg-paper-2">
      <svg
        viewBox="0 0 800 480"
        className="h-auto w-full"
        role="img"
        aria-label={`Lageplan: Die Praxis liegt am Lindenmarkt 12 in Hamburg-Ottensen, rund neun Gehminuten vom Bahnhof Altona entfernt.`}
      >
        <rect width="800" height="480" fill="#efeadd" />

        {/* Grünfläche */}
        <path
          d="M60 300 Q 130 250 210 275 Q 280 300 265 375 Q 200 430 120 405 Q 55 375 60 300 Z"
          fill="#dbe7e0"
        />
        <text x="130" y="350" fontSize="13" fill="#55645b" fontFamily="system-ui">
          Grünanlage
        </text>

        {/* Straßen */}
        <g stroke="#e5decd" strokeLinecap="round" fill="none">
          <path d="M0 200 H800" strokeWidth="26" />
          <path d="M420 0 V480" strokeWidth="22" />
          <path d="M0 380 H800" strokeWidth="16" />
          <path d="M180 0 V480" strokeWidth="14" />
          <path d="M640 0 V480" strokeWidth="14" />
        </g>
        <g
          stroke="#f7f4ec"
          strokeWidth="2"
          strokeDasharray="12 12"
          strokeLinecap="round"
          fill="none"
        >
          <path d="M0 200 H800" />
          <path d="M420 0 V480" />
        </g>

        {/* Bahnlinie */}
        <g fill="none">
          <path d="M0 96 H800" stroke="#55645b" strokeWidth="4" />
          <path d="M0 96 H800" stroke="#efeadd" strokeWidth="2" strokeDasharray="4 14" />
        </g>

        <g fontFamily="system-ui" fontSize="13" fill="#55645b">
          <text x="24" y="190">Ottenser Hauptstraße</text>
          <text x="432" y="40" >Bahrenfelder Straße</text>
          <text x="24" y="370">Am Felde</text>
          <text x="24" y="86">S1, S3 Richtung Altona</text>
        </g>

        {/* Bahnhof */}
        <g>
          <circle cx="150" cy="96" r="13" fill="#14201b" />
          <text x="150" y="101" fontSize="13" fill="#f7f4ec" textAnchor="middle" fontFamily="system-ui">
            S
          </text>
          <text x="150" y="70" fontSize="13" fill="#14201b" textAnchor="middle" fontFamily="system-ui">
            Altona
          </text>
        </g>

        {/* Bushaltestelle */}
        <g>
          <rect x="590" y="186" width="26" height="26" rx="7" fill="#a84a26" />
          <text
            x="603"
            y="205"
            fontSize="13"
            fill="#f7f4ec"
            textAnchor="middle"
            fontFamily="system-ui"
          >
            B
          </text>
          <text x="603" y="238" fontSize="12" fill="#55645b" textAnchor="middle" fontFamily="system-ui">
            Nöltingstraße
          </text>
        </g>

        {/* Gehweg vom Bahnhof zur Praxis */}
        <path
          d="M150 110 V 200 H 420 V 258"
          stroke="#1c5a48"
          strokeWidth="3"
          strokeDasharray="2 9"
          strokeLinecap="round"
          fill="none"
        />
        <text x="245" y="192" fontSize="12" fill="#1c5a48" fontFamily="system-ui">
          9 Minuten zu Fuß
        </text>

        {/* Praxis */}
        <g>
          <circle cx="420" cy="272" r="30" fill="#1c5a48" opacity="0.16" />
          <circle cx="420" cy="272" r="17" fill="#1c5a48" />
          <path
            d="M420 265v14M413 272h14"
            stroke="#f7f4ec"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <text
            x="420"
            y="322"
            fontSize="15"
            fill="#14201b"
            textAnchor="middle"
            fontFamily="system-ui"
            fontWeight="600"
          >
            {praxis.name}
          </text>
          <text x="420" y="342" fontSize="13" fill="#55645b" textAnchor="middle" fontFamily="system-ui">
            {praxis.adresse.strasse}
          </text>
        </g>
      </svg>

      <figcaption className="flex flex-wrap items-center justify-between gap-3 border-t border-line px-5 py-4 text-sm">
        <span className="text-muted">
          Schematische Darstellung. Diese Seite lädt keine Kartendaten von Dritten.
        </span>
        <a
          href={routeUrl}
          target="_blank"
          rel="noopener"
          className="group inline-flex items-center gap-1.5 font-medium text-moss underline underline-offset-4"
        >
          Route bei OpenStreetMap
          <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" aria-hidden="true" fill="none">
            <path
              d="M6 3h7v7M13 3L4 12"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </a>
      </figcaption>
    </figure>
  );
}
