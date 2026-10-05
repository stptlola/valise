import type { ComponentProps } from "react";
import { cn } from "@/lib/cn";

/** Largeur maximale et marges latérales communes à toutes les pages. */
export function Container({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      className={cn("mx-auto w-full max-w-[1240px] px-4 sm:px-6", className)}
      {...props}
    />
  );
}
