import type { Metadata } from "next";
import Link from "next/link";
import { Sticker } from "@/components/stickers/Sticker";
import { estStickerId } from "@/components/stickers/estStickerId";
import { Container } from "@/components/ui/Container";
import { texteSur } from "@/design/contraste";
import { TypeDestination } from "@/generated/prisma/client";
import { messages } from "@/i18n";
import { listerDestinations } from "@/lib/destinations";

// La liste vient de la base : elle est lue à chaque visite (ticket T-031).
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: messages.destinations.titre,
  description: messages.destinations.intro,
};

export default async function Destinations() {
  const destinations = await listerDestinations();

  return (
    <Container className="py-12">
      <h1 className="font-display text-5xl font-extrabold tracking-tight">
        {messages.destinations.titre}
      </h1>
      <p className="text-discret mt-3 max-w-2xl">
        {messages.destinations.intro}
      </p>

      <ul className="mt-10 grid grid-cols-2 gap-x-5 gap-y-8 sm:grid-cols-3 lg:grid-cols-5">
        {destinations.map((d) => {
          const complete = d.type === TypeDestination.COMPLETE;
          return (
            <li key={d.id}>
              <Link
                href={`/destinations/${d.id}`}
                className="group rounded-carte hover:bg-surface flex flex-col items-center gap-3 p-3 text-center transition-colors"
              >
                <span className="flex h-40 w-full items-end justify-center">
                  {estStickerId(d.autocollant) && (
                    <Sticker
                      id={d.autocollant}
                      className="ease-valise max-h-40 w-full max-w-32 transition-transform duration-500 group-hover:scale-105 group-hover:-rotate-3"
                    />
                  )}
                </span>
                <span
                  className="font-display rounded-full px-2.5 py-0.5 text-sm font-extrabold tracking-widest"
                  style={{ background: d.couleur, color: texteSur(d.couleur) }}
                >
                  {d.code}
                </span>
                <span className="font-display text-xl leading-tight font-extrabold">
                  {d.nom}
                </span>
                <span className="text-discret text-base">{d.pays}</span>
                <span
                  className={
                    complete
                      ? "bg-encre text-fond rounded-full px-3 py-1 text-sm font-bold"
                      : "border-trait rounded-full border px-3 py-1 text-sm font-bold"
                  }
                >
                  {complete
                    ? messages.destinations.escaleComplete
                    : messages.destinations.ficheGratuite}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </Container>
  );
}
