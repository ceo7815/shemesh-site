import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";
import { SiteChrome } from "@/components/SiteChrome";
import { accessibilityDoc } from "@/lib/legal";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: `${accessibilityDoc.title} | ${site.name}`,
  description: accessibilityDoc.description,
};

export default function AccessibilityPage() {
  return (
    <SiteChrome>
      <LegalPage doc={accessibilityDoc} />
    </SiteChrome>
  );
}
