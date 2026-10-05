import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Sortie autonome : l'image Docker ne contient que le nécessaire pour faire tourner le site.
  output: "standalone",
};

export default nextConfig;
