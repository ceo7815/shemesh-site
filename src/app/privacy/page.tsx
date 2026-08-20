import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";
import { SiteChrome } from "@/components/SiteChrome";
import { privacyDoc } from "@/lib/legal";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: `${privacyDoc.title} | ${site.name}`,
  description: privacyDoc.description,
};

export default function PrivacyPage() {
  return (
    <SiteChrome>
      <LegalPage doc={privacyDoc} />
    </SiteChrome>
  );
}
