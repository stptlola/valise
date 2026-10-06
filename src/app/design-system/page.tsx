import type { Metadata } from "next";
import { CarteMonde } from "@/components/carte/CarteMonde";
import { LigneMetro } from "@/components/itineraire/LigneMetro";
import { Sticker } from "@/components/stickers/Sticker";
import { stickerIds } from "@/components/stickers/artwork";
import { Button, ButtonLink } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Chip } from "@/components/ui/Chip";
import { Container } from "@/components/ui/Container";
import { villes } from "@/content/villes";
import { contraste, texteSur } from "@/design/contraste";

// Page de travail pour relire le système de design ; elle n'est pas référencée.
export const metadata: Metadata = {
  title: "Système de design",
  robots: { index: false, follow: false },
};

const marque = [
  { nom: "Nuit", code: "#14213D" },
  { nom: "Blanc", code: "#FFFFFF" },
  { nom: "Gris", code: "#5B6374" },
  { nom: "Bleu ciel", code: "#8EC5FF" },
  { nom: "Crème", code: "#FFF3E2" },
];

const nomsAutocollants = Object.fromEntries(
  villes.map((v) => [v.autocollant ?? v.id, v.nom]),
);

function Section({
  titre,
  children,
}: {
  titre: string;
  children: React.ReactNode;
}) {
  return (
    <section className="border-trait flex flex-col gap-5 border-t py-10">
      <h2 className="font-display text-2xl font-extrabold">{titre}</h2>
      {children}
    </section>
  );
}

export default function DesignSystem() {
  return (
    <Container className="py-12">
      <h1 className="font-display text-5xl font-extrabold tracking-tight">
        Système de design
      </h1>
      <p className="text-discret mt-3 max-w-2xl">
        Les briques de Valise, pour les relire avant de construire les pages. Le
        mode sombre suit le réglage du téléphone.
      </p>

      <Section titre="Couleurs de la marque">
        <ul className="grid grid-cols-2 gap-4 sm:grid-cols-5">
          {marque.map((c) => (
            <li key={c.nom} className="flex flex-col gap-2">
              <span
                className="border-trait h-20 rounded-2xl border"
                style={{ background: c.code }}
              />
              <span className="font-bold">{c.nom}</span>
              <span className="text-discret font-mono text-sm">{c.code}</span>
            </li>
          ))}
        </ul>
      </Section>

      <Section titre="Couleurs des villes">
        <p className="text-discret">
          Chaque pastille montre le texte le plus lisible sur la couleur, et son
          contraste. Sous 4,5, le texte doit rester grand et gras.
        </p>
        <ul className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-5">
          {villes.map((v) => {
            const texte = texteSur(v.couleur);
            const ratio = contraste(v.couleur, texte);
            return (
              <li
                key={v.id}
                className="flex flex-col gap-1 rounded-2xl p-4"
                style={{ background: v.couleur, color: texte }}
              >
                <span className="font-display text-xl font-extrabold tracking-widest">
                  {v.code}
                </span>
                <span className="font-bold">{v.nom}</span>
                <span className="text-sm">
                  {v.couleur} · {ratio.toFixed(1).replace(".", ",")}
                  {ratio < 4.5 ? " · grand texte" : ""}
                </span>
                {v.type === "voisine" && (
                  <span className="text-sm">Voisine</span>
                )}
              </li>
            );
          })}
        </ul>
      </Section>

      <Section titre="Typographies">
        <p className="font-script text-6xl">Escale à Rome</p>
        <p className="font-display text-4xl font-extrabold tracking-tight">
          Des escales clés en main
        </p>
        <p className="max-w-2xl">
          Atkinson Hyperlegible pour les textes : une police conçue pour la
          lisibilité, du lexique aux conseils pratiques.
        </p>
      </Section>

      <Section titre="Boutons">
        <div className="flex flex-wrap items-center gap-4">
          <Button>Acheter l&apos;escale</Button>
          <Button variant="contour">Voir l&apos;aperçu</Button>
          <ButtonLink href="/destinations" variant="contour">
            Lien en forme de bouton
          </ButtonLink>
        </div>
        <div className="rounded-panneau bg-panneau text-sur-panneau flex flex-wrap items-center gap-4 p-8">
          <Button variant="clair">Créer mon compte</Button>
          <span className="text-sur-panneau-discret">
            Bouton clair, sur un panneau sombre
          </span>
        </div>
      </Section>

      <Section titre="Puces">
        <fieldset className="flex flex-wrap gap-2">
          <legend className="mb-3 font-bold">Mois du voyage</legend>
          {["Avril", "Mai", "Juin", "Juillet"].map((mois, i) => (
            <Chip
              key={mois}
              name="mois"
              value={mois}
              label={mois}
              defaultChecked={i === 1}
            />
          ))}
        </fieldset>
      </Section>

      <Section titre="Cartes">
        <Card className="max-w-md">
          <p className="font-display text-xl font-extrabold">
            Compte à rebours
          </p>
          <p className="text-discret mt-2">
            Une carte sur fond de surface, avec une bordure fine.
          </p>
        </Card>
      </Section>

      <Section titre="Ligne de métro">
        <p className="text-discret">
          Un itinéraire d&apos;exemple, à la couleur de Rome. Les étapes réelles
          viendront des escales.
        </p>
        <div className="max-w-md">
          <LigneMetro
            titre="Jour 1 à Rome, exemple"
            couleur="#C47A2C"
            stations={[
              { moment: "Matin", titre: "Colisée", detail: "Étape d'exemple" },
              {
                moment: "Matin",
                titre: "Forum romain",
                detail: "Étape d'exemple",
              },
              { moment: "Midi", titre: "Monti", detail: "Étape d'exemple" },
              {
                moment: "Après-midi",
                titre: "Panthéon",
                detail: "Étape d'exemple",
              },
              {
                moment: "Soir",
                titre: "Trastevere",
                detail: "Étape d'exemple",
              },
            ]}
          />
        </div>
      </Section>

      <Section titre="Carte du monde">
        <p className="text-discret">
          Les vingt destinations et escales voisines, avec l&apos;Italie et la
          France mises en valeur.
        </p>
        <CarteMonde
          titre="Carte du monde des destinations de Valise"
          paysActifs={["IT", "FR"]}
          reperes={villes.map((v) => ({
            id: v.id,
            nom: v.nom,
            latitude: v.latitude,
            longitude: v.longitude,
            couleur: v.couleur,
          }))}
        />
      </Section>

      <Section titre="Autocollants">
        <ul className="grid grid-cols-3 gap-x-6 gap-y-10 sm:grid-cols-4 lg:grid-cols-6">
          {stickerIds.map((id) => (
            <li key={id} className="flex flex-col items-center gap-3">
              <Sticker
                id={id}
                title={`Autocollant de ${nomsAutocollants[id]}`}
                className="w-full max-w-36"
              />
              <span className="text-sm font-bold">{nomsAutocollants[id]}</span>
            </li>
          ))}
        </ul>
      </Section>
    </Container>
  );
}
