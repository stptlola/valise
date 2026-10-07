import { messages } from "@/i18n";

/** Remplace la partie réservée d'une escale pour qui n'y a pas accès (ticket T-035). */
export function Verrou({ prix }: { prix: string }) {
  return (
    <div className="bg-panneau text-sur-panneau rounded-panneau flex max-w-prose flex-col gap-2 p-6 sm:p-8">
      <p className="font-display text-xl font-extrabold">{messages.escale.verrouTitre}</p>
      <p className="text-sur-panneau-discret leading-relaxed">
        {messages.escale.verrouTexte(prix)}
      </p>
      <p className="font-bold">{messages.escale.verrouBientot}</p>
    </div>
  );
}
