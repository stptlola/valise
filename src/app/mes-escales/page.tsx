import type { Metadata } from "next";
import { EnConstruction } from "@/components/layout/EnConstruction";
import { messages } from "@/i18n";

export const metadata: Metadata = { title: messages.navigation.mesEscales };

export default function Page() {
  return <EnConstruction titre={messages.navigation.mesEscales} />;
}
