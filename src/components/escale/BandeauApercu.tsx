import { messages } from "@/i18n";
import { Container } from "@/components/ui/Container";

/** Rappelle qu'on lit l'escale en aperçu, avec le moyen d'en sortir. */
export function BandeauApercu({ destination }: { destination: string }) {
  return (
    <div className="bg-ciel text-nuit">
      <Container className="flex flex-wrap items-center justify-between gap-2 py-3 text-sm font-bold">
        <p>{messages.escale.apercuTexte}</p>
        <a
          href={`/api/apercu/fin?destination=${destination}`}
          className="underline decoration-2 underline-offset-2"
        >
          {messages.escale.apercuQuitter}
        </a>
      </Container>
    </div>
  );
}
