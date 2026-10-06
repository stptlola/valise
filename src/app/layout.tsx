import type { Metadata } from "next";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SkipLink } from "@/components/layout/SkipLink";
import { messages } from "@/i18n";
import { fontVariables } from "@/lib/fonts";
import { siteIndexable, urlDuSite } from "@/lib/site";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(urlDuSite),
  title: {
    default: messages.site.titre,
    template: `%s · ${messages.site.nom}`,
  },
  description: messages.site.signature,
  openGraph: {
    siteName: messages.site.nom,
    locale: "fr_FR",
    type: "website",
    images: [
      { url: "/og.png", width: 1200, height: 630, alt: messages.site.titre },
    ],
  },
  // Pas de référencement tant que le nom de domaine définitif n'est pas en place.
  robots: siteIndexable ? undefined : { index: false, follow: false },
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
