import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";

import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { DemoBar } from "@/components/DemoBar";
import { MobileCta } from "@/components/MobileCta";
import { RevealScript } from "@/components/RevealScript";
import { praxis } from "@/content/praxis";
import { schemaOeffnungszeiten } from "@/lib/oeffnungszeiten";

/* Beide Schriften liefert next/font vom eigenen Server aus. Es geht keine
   Anfrage an Google, damit die Seite ohne Einwilligung datenschutzkonform ist. */
const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  axes: ["SOFT", "WONK"],
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const basisUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://praxis-am-lindenmarkt.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(basisUrl),
  title: {
    default: `${praxis.name} | Hausarzt in Hamburg-Ottensen`,
    template: `%s | ${praxis.name}`,
  },
  description:
    "Hausärztliche Gemeinschaftspraxis in Hamburg-Ottensen. Offene Sprechstunde ohne Termin, Vorsorge, Impfungen, Hausbesuche. Termine meist innerhalb von zwei Tagen.",
  keywords: [
    "Hausarzt Hamburg",
    "Hausarzt Ottensen",
    "Allgemeinmedizin Altona",
    "Praxis Ottensen",
    "Vorsorge Check-up Hamburg",
  ],
  openGraph: {
    type: "website",
    locale: "de_DE",
    siteName: praxis.name,
    title: `${praxis.name} | Hausarzt in Hamburg-Ottensen`,
    description:
      "Hausärztliche Gemeinschaftspraxis in Hamburg-Ottensen. Offene Sprechstunde ohne Termin, Vorsorge, Impfungen, Hausbesuche.",
  },
  robots: { index: true, follow: true },
  alternates: { canonical: "/" },
};

export const viewport = {
  themeColor: "#f7f4ec",
  colorScheme: "light" as const,
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "MedicalClinic",
  name: praxis.langname,
  description:
    "Hausärztliche Gemeinschaftspraxis in Hamburg-Ottensen mit offener Sprechstunde, Vorsorge, Impfungen und Hausbesuchen.",
  url: basisUrl,
  telephone: `+49${praxis.telefon.link.replace("+49", "")}`,
  email: praxis.email,
  medicalSpecialty: "PrimaryCare",
  address: {
    "@type": "PostalAddress",
    streetAddress: praxis.adresse.strasse,
    postalCode: praxis.adresse.plz,
    addressLocality: praxis.adresse.ort,
    addressCountry: "DE",
  },
  geo: { "@type": "GeoCoordinates", latitude: 53.5518, longitude: 9.9268 },
  openingHoursSpecification: schemaOeffnungszeiten(),
  availableLanguage: praxis.sprachen,
  isAcceptingNewPatients: true,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de" className={`${fraunces.variable} ${inter.variable} h-full`}>
      <head>
        {/* Läuft vor dem ersten Paint. Markiert aktives JavaScript, damit
            Scroll-Reveals ohne JS gar nicht erst ausgeblendet werden, und
            blendet die Demo-Leiste aus, falls sie einmal geschlossen wurde. */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              `document.documentElement.classList.add('js');` +
              `try{if(localStorage.getItem('framestudio-demobar-aus')==='1')` +
              `document.documentElement.classList.add('demo-aus')}catch(e){}`,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="flex min-h-full flex-col bg-paper text-ink antialiased">
        <a
          href="#inhalt"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:rounded-full focus:bg-ink focus:px-5 focus:py-3 focus:text-sm focus:font-medium focus:text-paper"
        >
          Direkt zum Inhalt
        </a>

        <DemoBar />
        <Header />

        <main id="inhalt" className="flex-1">
          {children}
        </main>

        <Footer />
        <MobileCta />
        <RevealScript />
      </body>
    </html>
  );
}
