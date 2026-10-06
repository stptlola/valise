import { db } from "@/lib/db";

// État du déploiement : l'image qui tourne et l'accès à la base, pour vérifier sans ouvrir les journaux.
export const dynamic = "force-dynamic";

function avecDelai<T>(promesse: Promise<T>, ms: number): Promise<T> {
  return Promise.race([
    promesse,
    new Promise<never>((_, rejeter) =>
      setTimeout(() => rejeter(new Error("délai dépassé")), ms),
    ),
  ]);
}

export async function GET() {
  const image = process.env.VALISE_IMAGE ?? "inconnue";
  try {
    const destinations = await avecDelai(db.destination.count(), 3000);
    return Response.json({ image, base: "ok", destinations });
  } catch (erreur) {
    const code = (erreur as { code?: string }).code;
    const detail = code === "P2021" ? "tables absentes" : "base injoignable";
    return Response.json({ image, base: "erreur", detail });
  }
}
