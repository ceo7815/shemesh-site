import type { Metadata } from "next";
import { ServicesCatalog } from "@/components/ServicesCatalog";
import { SiteChrome } from "@/components/SiteChrome";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: `שירותינו | ${site.name}`,
  description:
    "משיכת כספים, החזרי מס, תביעות מול חברות הביטוח וביטוח לאומי — ליווי עד שהכסף אצלכם.",
};

export default function ServicesPage() {
  return (
    <SiteChrome>
      <ServicesCatalog />
    </SiteChrome>
  );
}
