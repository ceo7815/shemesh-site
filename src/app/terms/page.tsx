import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";
import { SiteChrome } from "@/components/SiteChrome";
import { termsDoc } from "@/lib/legal";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: `${termsDoc.title} | ${site.name}`,
  description: termsDoc.description,
};

export default function TermsPage() {
  return (
    <SiteChrome>
      <LegalPage doc={termsDoc} />
    </SiteChrome>
  );
}
