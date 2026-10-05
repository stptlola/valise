import { Container } from "@/components/ui/Container";
import { messages } from "@/i18n";

/** Pied de page ; les liens légaux arrivent avec les pages correspondantes (T-025, T-029). */
export function SiteFooter() {
  return (
    <footer className="border-trait mt-auto border-t py-10">
      <Container className="flex flex-wrap items-baseline justify-between gap-4">
        <p className="font-script text-3xl">{messages.site.nom}</p>
        <p className="text-discret text-base">
          {messages.site.signature} {messages.pied.droits}
        </p>
      </Container>
    </footer>
  );
}
