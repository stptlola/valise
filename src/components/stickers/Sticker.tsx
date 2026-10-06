import { cn } from "@/lib/cn";
import { stickerArtwork, type StickerId } from "./artwork";

type StickerProps = {
  id: StickerId;
  className?: string;
  /** Texte lu par les lecteurs d'écran ; sans titre, l'autocollant est décoratif. */
  title?: string;
};

export function Sticker({ id, className, title }: StickerProps) {
  const { viewBox, art } = stickerArtwork[id];
  return (
    <svg
      viewBox={viewBox}
      className={cn("autocollant block h-auto", className)}
      role={title ? "img" : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
      focusable="false"
      data-autocollant={id}
    >
      {art}
    </svg>
  );
}
