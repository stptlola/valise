import type { ComponentProps } from "react";
import { cn } from "@/lib/cn";

/** Carte sur fond de surface, avec bordure fine et grands arrondis. */
export function Card({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "rounded-carte border-trait bg-surface border p-6 sm:p-8",
        className,
      )}
      {...props}
    />
  );
}
