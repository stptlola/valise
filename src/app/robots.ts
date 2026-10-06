import type { MetadataRoute } from "next";
import { siteIndexable, urlDuSite } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  if (!siteIndexable) {
    return { rules: { userAgent: "*", disallow: "/" } };
  }
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/design-system", "/mes-escales"],
    },
    sitemap: `${urlDuSite}/sitemap.xml`,
  };
}
