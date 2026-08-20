import Image from "next/image";
import Link from "next/link";
import { AboutStage } from "@/components/AboutStage";
import { FadeIn } from "@/components/FadeIn";
import { SectionHeading } from "@/components/SectionHeading";
import {
  aboutParagraphs,
  knowledgeLine,
  specialties,
  specialtiesIntro,
} from "@/lib/site";

export function AboutStory() {
  return (
    <>
      <section className="bg-cream px-5 pb-8 pt-32">
        <div className="mx-auto max-w-6xl">
          <SectionHeading kicker="מי אנחנו?" title="אודות" align="center" />
        </div>
      </section>

      <AboutStage className="px-5 py-16">
        <div className="mx-auto grid max-w-6xl items-start gap-12 lg:grid-cols-2">
          <div className="about-lines space-y-5 text-lg leading-9 text-ink/90">
            {aboutParagraphs.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>

          <div className="about-photo-wrap lg:sticky lg:top-28">
            <Image
              src="/hero/02.jpg"
              alt=""
              width={1600}
              height={1067}
              className="about-photo h-auto w-full object-cover"
            />
          </div>
        </div>
      </AboutStage>

      <section className="bg-cream px-5 py-20">
        <div className="mx-auto max-w-6xl text-center">
          <FadeIn>
            <h2 className="text-3xl font-extrabold leading-tight sm:text-4xl">
              {specialtiesIntro}
            </h2>
            <span className="heading-run is-on mx-auto mt-4 block h-[3px] w-24 rounded-full" />
          </FadeIn>

          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {specialties.map((item, i) => (
              <FadeIn key={item} delay={i * 60} className="h-full">
                <article className="gold-frame h-full">
                  <div className="gold-frame-inner justify-center px-6 py-5 text-lg leading-8">
                    {item}
                  </div>
                </article>
              </FadeIn>
            ))}
          </div>

          <FadeIn delay={120}>
            <p className="mt-12 text-2xl font-semibold">{knowledgeLine}</p>
            <div className="mt-8 flex justify-center">
              <Link
                href="/#contact"
                className="btn-gold h-12 rounded-full px-8 text-base"
              >
                השאירו פרטים
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
