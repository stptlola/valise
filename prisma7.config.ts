import type { PrismaConfig } from "prisma/config";

// Configuration de Prisma 7. L'adresse de la base vient de la variable DATABASE_URL,
// définie dans Coolify en production et dans .env.local en développement.
export default {
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    url: process.env.DATABASE_URL ?? "",
  },
} satisfies PrismaConfig;
