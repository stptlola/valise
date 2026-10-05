import Link from "next/link";
import type { ComponentProps } from "react";
import { cn } from "@/lib/cn";

type Variant = "primaire" | "clair" | "contour";

const base =
  "inline-flex min-h-[3.25rem] items-center justify-center gap-2.5 rounded-full px-7 font-bold no-underline transition-[transform,box-shadow] duration-500 ease-valise hover:-translate-y-0.5 disabled:pointer-events-none disabled:opacity-50";

const variants: Record<Variant, string> = {
  primaire:
    "bg-bouton text-sur-bouton hover:shadow-[0_14px_30px_-12px_rgb(20_33_61/0.5)]",
  clair: "bg-blanc text-nuit hover:shadow-[0_14px_30px_-12px_rgb(0_0_0/0.6)]",
  contour: "bg-transparent text-encre shadow-[inset_0_0_0_2px_var(--encre)]",
};

type ButtonProps = ComponentProps<"button"> & { variant?: Variant };

export function Button({
  variant = "primaire",
  className,
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={cn(base, variants[variant], className)}
      {...props}
    />
  );
}

type ButtonLinkProps = ComponentProps<typeof Link> & { variant?: Variant };

export function ButtonLink({
  variant = "primaire",
  className,
  ...props
}: ButtonLinkProps) {
  return <Link className={cn(base, variants[variant], className)} {...props} />;
}
