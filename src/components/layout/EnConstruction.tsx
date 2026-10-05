import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { messages } from "@/i18n";

/** Contenu provisoire des rubriques qui ne sont pas encore construites. */
export function EnConstruction({ titre }: { titre: string }) {
  return (
    <Container className="flex flex-1 flex-col items-start justify-center gap-4 py-24">
      <h1 className="font-display text-5xl font-extrabold tracking-tight">
        {titre}
      </h1>
      <p className="text-discret">{messages.pages.enConstruction}</p>
      <Link href="/" className="font-bold underline underline-offset-4">
        {messages.pages.retourAccueil}
      </Link>
    </Container>
  );
}
