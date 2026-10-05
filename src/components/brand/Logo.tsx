import Link from "next/link";
import { messages } from "@/i18n";
import { cn } from "@/lib/cn";

type LogoProps = { className?: string };

/** Logo « Valise » en Grand Hotel, sans pastille (charte graphique). */
export function Logo({ className }: LogoProps) {
  return (
    <Link
      href="/"
      aria-label={messages.navigation.accueil}
      className={cn(
        "font-script inline-flex min-h-11 items-center text-[2.5rem] leading-none",
        className,
      )}
    >
      <span className="pb-1">{messages.site.nom}</span>
    </Link>
  );
}
