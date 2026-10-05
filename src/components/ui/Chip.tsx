import type { ComponentProps } from "react";
import { cn } from "@/lib/cn";

type ChipProps = Omit<ComponentProps<"input">, "type"> & { label: string };

/** Puce à choix unique (mois, durée…), utilisable au clavier comme un bouton radio. */
export function Chip({ label, className, ...props }: ChipProps) {
  return (
    <label className={cn("relative inline-flex", className)}>
      <input type="radio" className="peer absolute opacity-0" {...props} />
      <span className="border-trait hover:border-encre peer-checked:border-encre peer-checked:bg-encre peer-checked:text-fond peer-focus-visible:outline-focus inline-flex min-h-11 cursor-pointer items-center rounded-full border px-4 text-[0.95rem] font-bold whitespace-nowrap transition-colors duration-300 peer-focus-visible:outline-3 peer-focus-visible:outline-offset-2">
        {label}
      </span>
    </label>
  );
}
