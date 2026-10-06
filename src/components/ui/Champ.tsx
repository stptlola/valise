import type { ComponentProps } from "react";
import { cn } from "@/lib/cn";

type ChampProps = ComponentProps<"input"> & { label: string };

/** Champ de saisie avec son étiquette, assez grand pour le doigt. */
export function Champ({ label, id, className, ...props }: ChampProps) {
  return (
    <label htmlFor={id} className="flex flex-col gap-1.5">
      <span className="font-bold">{label}</span>
      <input
        id={id}
        className={cn(
          "border-trait bg-fond text-encre placeholder:text-discret focus-visible:border-encre min-h-12 rounded-2xl border px-4",
          className,
        )}
        {...props}
      />
    </label>
  );
}
