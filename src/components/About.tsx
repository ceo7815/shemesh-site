import Image from "next/image";
import Link from "next/link";
import { AboutStage } from "@/components/AboutStage";
import { SectionHeading } from "@/components/SectionHeading";
import { aboutTeaser } from "@/lib/site";

export function About() {
  return (
    <AboutStage id="about" className="scroll-mt-32 px-5 py-24">
      <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2">
        <div>
          <SectionHeading kicker="מי אנחנו?" title="אודות" align="center" />
          <div className="about-lines mt-8 space-y-5 text-lg leading-9 text-ink/90">
            {aboutTeaser.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
          <Link
            href="/about"
            className="about-cta btn-gold mt-8 h-12 rounded-full px-8 text-base"
          >
            הסיפור המלא
          </Link>
        </div>

        <div className="about-photo-wrap">
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
  );
}
