import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CouleurVille } from "@/components/destinations/CouleurVille";
import { FormulairePrevenir } from "@/components/destinations/FormulairePrevenir";
import { Sticker } from "@/components/stickers/Sticker";
import { estStickerId } from "@/components/stickers/estStickerId";
import { ButtonLink } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { texteSur } from "@/design/contraste";
import { Statut, TypeDestination } from "@/generated/prisma/client";
import { messages } from "@/i18n";
import { apercuActif } from "@/lib/apercu";
import { trouverDestination } from "@/lib/destinations";

// Fiche d'une destination (ticket T-032). Ses textes arrivent avec la rédaction des fiches (T-098).
export const dynamic = "force-dynamic";

async function destinationVisible(id: string) {
  const destination = await trouverDestination(id);
  // Les escales voisines auront leur page après le lancement (ESC-16).
  if (!destination || destination.type === TypeDestination.VOISINE) return null;
  return destination;
}

export async function generateMetadata(
  props: PageProps<"/destinations/[id]">,
): Promise<Metadata> {
  const { id } = await props.params;
  const destination = await destinationVisible(id);
  if (!destination) return {};
  return {
    title: destination.nom,
    description: `${destination.nom}, ${destination.pays} : la fiche Valise.`,
  };
}

export default async function Fiche(props: PageProps<"/destinations/[id]">) {
  const { id } = await props.params;
  const destination = await destinationVisible(id);
  if (!destination) notFound();

  const complete = destination.type === TypeDestination.COMPLETE;
  const texte = texteSur(destination.couleur);
  const escale = destination.escale;
  const escaleLisible =
    complete &&
    !!escale &&
    escale._count.parties > 0 &&
    (escale.statut === Statut.PUBLIE || (await apercuActif()));

  return (
    <>
      <CouleurVille couleur={destination.couleur} />
      <div style={{ background: destination.couleur, color: texte }}>
        <Container className="flex flex-col items-start gap-6 py-12 sm:flex-row sm:items-center">
          {estStickerId(destination.autocollant) && (
            <Sticker
              id={destination.autocollant}
              className="w-32 shrink-0 -rotate-3 sm:w-40"
            />
          )}
          <div className="flex flex-col gap-2">
            <span className="font-display text-sm font-extrabold tracking-widest">
              {destination.code} · {destination.pays}
            </span>
            <h1 className="font-script text-7xl leading-none sm:text-8xl">
              {destination.nom}
            </h1>
            <span className="font-bold">
              {complete
                ? messages.destinations.escaleComplete
                : messages.destinations.ficheGratuite}
            </span>
          </div>
        </Container>
      </div>

      <Container className="flex flex-col gap-8 py-12">
        {escaleLisible ? (
          <ButtonLink href={`/destinations/${destination.id}/escale`} className="self-start">
            {messages.escale.lire}
          </ButtonLink>
        ) : (
          <p className="text-discret max-w-2xl">
            {complete
              ? messages.destinations.escaleBientot
              : messages.destinations.ficheEnPreparation}
          </p>
        )}

        {!complete && (
          <Card className="max-w-xl">
            <h2 className="font-display text-2xl font-extrabold">
              {messages.destinations.prevenirTitre}
            </h2>
            <p className="text-discret mt-2 mb-5">
              {messages.destinations.prevenirTexte}
            </p>
            <FormulairePrevenir
              destinationId={destination.id}
              nom={destination.nom}
            />
          </Card>
        )}
      </Container>
    </>
  );
}
