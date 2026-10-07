import { messages } from "@/i18n";
import { titreNouveaute } from "@/lib/escale-lecture";
import { Card } from "@/components/ui/Card";

/**
 * Les nouveautés de l'escale, en tête de page (ESC-04), de la plus récente à la plus ancienne.
 * Leur titre porte déjà la date ; le détail est dans la partie 2.
 */
export function Nouveautes({ nouveautes }: { nouveautes: { texte: string }[] }) {
  if (nouveautes.length === 0) return null;
  return (
    <Card className="flex flex-col gap-4">
      <h2 className="font-display text-2xl font-extrabold">
        {messages.escale.nouveautesTitre}
      </h2>
      <ul className="marker:text-discret flex list-disc flex-col gap-2 pl-6">
        {nouveautes.map((nouveaute) => (
          <li key={nouveaute.texte} className="pl-1 font-bold">
            {titreNouveaute(nouveaute.texte)}
          </li>
        ))}
      </ul>
      <a
        href="#partie-2"
        className="decoration-ville self-start underline decoration-2 underline-offset-2"
      >
        {messages.escale.nouveautesLien}
      </a>
    </Card>
  );
}
