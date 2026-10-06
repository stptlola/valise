import type { MetadataRoute } from "next";
import { urlDuSite } from "@/lib/site";

// Pages publiques ; les fiches et les escales s'ajouteront avec leurs pages.
const chemins = [
  "",
  "/destinations",
  "/outils-gratuits",
  "/contributions",
  "/informations-pratiques",
];

export default function sitemap(): MetadataRoute.Sitemap {
  return chemins.map((chemin) => ({
    url: `${urlDuSite}${chemin}`,
    changeFrequency: "weekly",
  }));
}
