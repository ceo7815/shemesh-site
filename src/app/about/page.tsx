import type { Metadata } from "next";
import { AboutStory } from "@/components/AboutStory";
import { SiteChrome } from "@/components/SiteChrome";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: `אודות | ${site.name}`,
  description:
    "הסיפור של שמש מימוש זכויות — מבעלי מקצוע מהצד השני של עולם הפנסיה, עד הישורת האחרונה של הלקוח.",
};

export default function AboutPage() {
  return (
    <SiteChrome>
      <AboutStory />
    </SiteChrome>
  );
}
