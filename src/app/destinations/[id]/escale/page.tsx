import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Blocs } from "@/components/escale/Blocs";
import { BandeauApercu } from "@/components/escale/BandeauApercu";
import { Nouveautes } from "@/components/escale/Nouveautes";
import { Sommaire } from "@/components/escale/Sommaire";
import { Verrou } from "@/components/escale/Verrou";
import { CouleurVille } from "@/components/destinations/CouleurVille";
import { Sticker } from "@/components/stickers/Sticker";
import { estStickerId } from "@/components/stickers/estStickerId";
import { Container } from "@/components/ui/Container";
import { texteSur } from "@/design/contraste";
import { Statut } from "@/generated/prisma/client";
import { messages } from "@/i18n";
import { dateLongue, partiesPourLecteur, prix } from "@/lib/escale-lecture";
import { apercuActif } from "@/lib/apercu";
import { trouverEscale } from "@/lib/escales";

// Page d'une escale complète (ticket T-034) : dix parties, un sommaire, la date de mise à jour
// et les nouveautés en tête. Tant qu'une escale n'est pas publiée, seul l'aperçu l'affiche.
export const dynamic = "force-dynamic";

async function escaleLisible(id: string) {
  const escale = await trouverEscale(id);
  const apercu = await apercuActif();
  if (!escale || escale.parties.length === 0) return null;
  if (escale.statut !== Statut.PUBLIE && !apercu) return null;
  return { escale, apercu };
}

export async function generateMetadata(
  props: PageProps<"/destinations/[id]/escale">,
): Promise<Metadata> {
  const { id } = await props.params;
  const lisible = await escaleLisible(id);
  if (!lisible) return {};
  const { escale } = lisible;
  return {
    title: messages.escale.titre(escale.destination.nom),
    description: `L'escale Valise à ${escale.destination.nom} : itinéraires, adresses testées, budget et conseils.`,
    robots: escale.statut === Statut.PUBLIE ? undefined : { index: false, follow: false },
  };
}

export default async function PageEscale(props: PageProps<"/destinations/[id]/escale">) {
  const { id } = await props.params;
  const lisible = await escaleLisible(id);
  if (!lisible) notFound();
  const { escale, apercu } = lisible;
  const { destination } = escale;

  // L'aperçu montre tout. Les droits d'achat s'ajouteront ici avec les comptes (T-062).
  const complet = apercu;
  const parties = partiesPourLecteur(escale.parties, complet);
  const texte = texteSur(destination.couleur);

  return (
    <div style={{ "--ville": destination.couleur } as React.CSSProperties}>
      <CouleurVille couleur={destination.couleur} />
      {apercu && <BandeauApercu destination={destination.id} />}

      <div style={{ background: destination.couleur, color: texte }}>
        <Container className="flex flex-col items-start gap-5 py-10 sm:flex-row sm:items-center sm:gap-6 sm:py-12">
          {estStickerId(destination.autocollant) && (
            <Sticker id={destination.autocollant} className="w-20 shrink-0 -rotate-3 sm:w-36" />
          )}
          <div className="flex flex-col gap-3">
            <h1 className="font-script text-6xl leading-none sm:text-7xl">
              {messages.escale.titre(destination.nom)}
            </h1>
            <p className="font-bold">
              {messages.escale.misAJour(dateLongue(escale.misAJourLe))}
            </p>
          </div>
        </Container>
      </div>

      <Container className="grid gap-10 py-10 lg:grid-cols-[17rem_minmax(0,1fr)] lg:gap-16">
        <aside className="hidden lg:block">
          <div className="sticky top-24">
            <Sommaire parties={parties} />
          </div>
        </aside>

        <div className="flex min-w-0 flex-col gap-12">
          <details className="border-trait rounded-carte border p-4 lg:hidden">
            <summary className="font-display cursor-pointer text-lg font-extrabold">
              {messages.escale.sommaire}
            </summary>
            <div className="mt-4">
              <Sommaire parties={parties} />
            </div>
          </details>

          <Nouveautes nouveautes={escale.nouveautes} />

          {parties.map((partie) => (
            <section
              key={partie.numero}
              id={`partie-${partie.numero}`}
              aria-labelledby={`titre-partie-${partie.numero}`}
              className="flex scroll-mt-24 flex-col gap-6"
            >
              <h2
                id={`titre-partie-${partie.numero}`}
                className="font-display flex items-center gap-4 text-3xl font-extrabold sm:text-4xl"
              >
                <span
                  aria-hidden="true"
                  className="bg-ville grid size-11 shrink-0 place-items-center rounded-full text-lg"
                  style={{ color: texte }}
                >
                  {partie.numero}
                </span>
                {partie.titre}
              </h2>
              <Blocs blocs={partie.blocs} />
              {partie.verrouillee && <Verrou prix={prix(escale.prixCentimes)} />}
              {apercu && partie.blocs.length === 0 && (
                <p className="text-discret italic">{messages.escale.partieAImporter}</p>
              )}
            </section>
          ))}
        </div>
      </Container>
    </div>
  );
}
