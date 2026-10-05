import type { Metadata } from "next";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SkipLink } from "@/components/layout/SkipLink";
import { messages } from "@/i18n";
import { fontVariables } from "@/lib/fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: messages.site.titre,
    template: `%s · ${messages.site.nom}`,
  },
  description: messages.site.signature,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="fr" className={`${fontVariables} h-full antialiased`}>
      <body className="flex min-h-full flex-col">
        <SkipLink />
        <SiteHeader />
        <main id="contenu" className="flex flex-1 flex-col">
          {children}
        </main>
        <SiteFooter />
      </body>
    </html>
  );
}
