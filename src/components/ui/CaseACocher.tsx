import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/cn";

type CaseACocherProps = Omit<ComponentProps<"input">, "type"> & {
  children: ReactNode;
};

/** Case à cocher avec un libellé cliquable sur toute sa largeur. */
export function CaseACocher({
  children,
  className,
  ...props
}: CaseACocherProps) {
  return (
    <label className={cn("flex cursor-pointer items-start gap-3", className)}>
      <input
        type="checkbox"
        className="mt-1 size-5 shrink-0 accent-[var(--encre)]"
        {...props}
      />
      <span className="text-base">{children}</span>
    </label>
  );
}
