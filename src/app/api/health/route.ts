// Point de contrôle utilisé par Coolify et par l'image Docker pour savoir si le site répond.
export const dynamic = "force-dynamic";

export function GET() {
  return Response.json({ status: "ok" });
}
