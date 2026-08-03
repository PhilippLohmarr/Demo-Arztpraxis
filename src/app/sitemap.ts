import type { MetadataRoute } from "next";
import { leistungen } from "@/content/leistungen";
import { meldungen } from "@/content/aktuelles";

const basis =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://praxis-am-lindenmarkt.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const statisch = [
    { pfad: "", prioritaet: 1 },
    { pfad: "/leistungen", prioritaet: 0.9 },
    { pfad: "/team", prioritaet: 0.8 },
    { pfad: "/praxis", prioritaet: 0.8 },
    { pfad: "/termin", prioritaet: 0.9 },
    { pfad: "/aktuelles", prioritaet: 0.6 },
    { pfad: "/barrierefreiheit", prioritaet: 0.3 },
  ];

  return [
    ...statisch.map((s) => ({
      url: `${basis}${s.pfad}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: s.prioritaet,
    })),
    ...leistungen.map((l) => ({
      url: `${basis}/leistungen/${l.slug}`,
      lastModified: new Date(),
      changeFrequency: "yearly" as const,
      priority: 0.7,
    })),
    ...meldungen.map((m) => ({
      url: `${basis}/aktuelles/${m.slug}`,
      lastModified: new Date(m.datum),
      changeFrequency: "yearly" as const,
      priority: 0.5,
    })),
  ];
}
