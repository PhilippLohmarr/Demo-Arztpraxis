import type { MetadataRoute } from "next";

const basis =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://praxis-am-lindenmarkt.vercel.app";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/impressum", "/datenschutz"],
    },
    sitemap: `${basis}/sitemap.xml`,
  };
}
