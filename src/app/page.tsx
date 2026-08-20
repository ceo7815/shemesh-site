import { About } from "@/components/About";
import { Approach } from "@/components/Approach";
import { Contact } from "@/components/Contact";
import { Hero } from "@/components/Hero";
import { Pillars } from "@/components/Pillars";
import { Services } from "@/components/Services";
import { SiteChrome } from "@/components/SiteChrome";

export default function Home() {
  return (
    <SiteChrome>
      <Hero />
      <Pillars />
      <About />
      <Services />
      <Approach />
      <Contact />
    </SiteChrome>
  );
}
