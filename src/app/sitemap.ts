import type { MetadataRoute } from "next";
import { destinations } from "@/content/villes";
import { urlDuSite } from "@/lib/site";

// Pages publiques ; les escales s'ajouteront avec leurs pages.
const chemins = [
  "",
  "/destinations",
  "/outils-gratuits",
  "/contributions",
  "/informations-pratiques",
  ...destinations.map((d) => `/destinations/${d.id}`),
];

export default function sitemap(): MetadataRoute.Sitemap {
  return chemins.map((chemin) => ({
    url: `${urlDuSite}${chemin}`,
    changeFrequency: "weekly",
  }));
}
