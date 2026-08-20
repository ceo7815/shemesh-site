import Image from "next/image";
import Link from "next/link";
import { FadeIn } from "@/components/FadeIn";
import { ScrollToHash } from "@/components/ScrollToHash";
import { SectionHeading } from "@/components/SectionHeading";
import { featuredServices, serviceGroups } from "@/lib/site";

export function ServicesCatalog() {
  return (
    <>
      <ScrollToHash />

      <section className="bg-cream px-5 pb-10 pt-32">
        <div className="mx-auto max-w-6xl text-center">
          <SectionHeading kicker="מה אנחנו עושים" title="שירותינו" align="center" />
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-ink/80">
            ליווי מלא מול המדינה, מס הכנסה וחברות הביטוח — עד שהכסף אצלכם בבנק.
          </p>
        </div>
      </section>

      {featuredServices.map((item, index) => {
        const reverse = index % 2 === 1;
        return (
          <section
            key={item.slug}
            id={item.slug}
            className={`scroll-mt-32 px-5 py-16 ${index % 2 === 0 ? "bg-white" : "bg-cream"}`}
          >
            <div
              className={`mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2 ${
                reverse ? "lg:[&>*:first-child]:order-2" : ""
              }`}
            >
              <FadeIn>
                <p className="text-sm font-bold tracking-[0.18em] text-mustard">
                  0{index + 1}
                </p>
                <h2 className="mt-2 text-3xl font-extrabold leading-tight sm:text-4xl">
                  {item.title}
                </h2>
                <span className="heading-run is-on mt-4 block h-[3px] w-24 rounded-full" />
                <p className="mt-6 text-lg leading-9 text-ink/90">{item.text}</p>
                <Link
                  href="/#contact"
                  className="btn-gold mt-8 h-12 rounded-full px-8 text-base"
                >
                  השאירו פרטים
                </Link>
              </FadeIn>

              <FadeIn delay={90}>
                <div className="service-photo">
                  <Image
                    src={item.image}
                    alt=""
                    width={1600}
                    height={1067}
                    className="h-auto w-full object-cover"
                  />
                </div>
              </FadeIn>
            </div>
          </section>
        );
      })}

      <section className="bg-cream px-5 py-20">
        <div className="mx-auto max-w-6xl text-center">
          <FadeIn>
            <h2 className="text-3xl font-extrabold sm:text-4xl">כל השירותים</h2>
            <span className="heading-run is-on mx-auto mt-4 block h-[3px] w-24 rounded-full" />
          </FadeIn>

          <div className="mt-12 grid gap-8 lg:grid-cols-3">
            {serviceGroups.map((group, gi) => (
              <FadeIn key={group.title} delay={gi * 80} className="h-full">
                <article className="gold-frame h-full">
                  <div className="gold-frame-inner px-6 py-7">
                    <h3 className="text-xl font-extrabold">{group.title}</h3>
                    <ul className="mt-5 w-full space-y-3 text-[15px] leading-7 text-ink/85">
                      {group.items.map((item) => (
                        <li key={item} className="service-chip">
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </article>
              </FadeIn>
            ))}
          </div>

          <FadeIn delay={120}>
            <div className="mt-12 flex justify-center">
              <Link href="/#contact" className="btn-gold h-12 rounded-full px-8 text-base">
                דברו איתנו
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
