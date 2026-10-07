import { TypeDestination } from "@/generated/prisma/client";
import { db } from "@/lib/db";

/** L'escale complète d'une destination, avec ses parties et ses nouveautés, ou null. */
export async function trouverEscale(destinationId: string) {
  return db.escale.findFirst({
    where: { destinationId, destination: { type: TypeDestination.COMPLETE } },
    include: {
      destination: true,
      parties: { orderBy: { numero: "asc" } },
      nouveautes: { orderBy: { dateLe: "desc" } },
    },
  });
}
