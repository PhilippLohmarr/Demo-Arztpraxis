import fs from "node:fs";
import path from "node:path";

import registry from "@/content/bilder.json";

/**
 * Die Bildplätze stehen als JSON daneben, damit scripts/fetch-images.mjs
 * dieselbe Quelle liest wie die Anwendung. So können Alternativtext, Maße und
 * Suchbegriff nicht auseinanderlaufen.
 */
export const bilder = registry;

export type BildKey = keyof typeof bilder;

const ENDUNGEN = [".avif", ".webp", ".jpg", ".jpeg", ".png"];

/**
 * Prüft beim Rendern, ob unter public/bilder eine Datei liegt. Fehlt sie,
 * zeigt die Seite den gestalteten Platzhalter statt eines kaputten Bildes.
 * Wird nur in Server Components aufgerufen.
 */
export function bildPfad(key: BildKey): string | null {
  const basis = path.join(process.cwd(), "public", "bilder");
  for (const endung of ENDUNGEN) {
    if (fs.existsSync(path.join(basis, key + endung))) {
      return `/bilder/${key}${endung}`;
    }
  }
  return null;
}
