import Link from "next/link";
import { FadeIn } from "@/components/FadeIn";
import { SectionHeading } from "@/components/SectionHeading";
import { featuredServices } from "@/lib/site";

export function Services() {
  return (
    <section id="services" className="scroll-mt-32 bg-cream px-5 py-20">
      <div className="mx-auto max-w-5xl">
        <div className="mb-10">
          <SectionHeading kicker="מה אנחנו עושים" title="שירותינו" align="center" />
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {featuredServices.map((item, index) => (
            <FadeIn key={item.slug} delay={index * 90} className="h-full">
              <Link href={`/services#${item.slug}`} className="service-card">
                <span className="service-card-inner">
                  <h3 className="text-xl font-extrabold leading-8">
                    {"shortTitle" in item ? item.shortTitle : item.title}
                  </h3>
                  <p className="mt-3 flex-1 text-[15px] leading-7 text-muted">{item.teaser}</p>
                  <span className="service-card-more">לפרטים</span>
                </span>
              </Link>
            </FadeIn>
          ))}
        </div>

        <div className="mt-10 flex justify-center">
          <Link href="/services" className="btn-gold h-12 rounded-full px-8 text-base">
            כל השירותים שלנו
          </Link>
        </div>
      </div>
    </section>
  );
}
