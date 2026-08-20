import Image from "next/image";
import { AboutStage } from "@/components/AboutStage";
import { SectionHeading } from "@/components/SectionHeading";
import { approach, approachFooter, approachTitle } from "@/lib/site";

export function Approach() {
  return (
    <AboutStage id="approach" className="scroll-mt-32 px-5 py-24">
      <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2">
        <div>
          <SectionHeading title={approachTitle} />
          <div className="about-lines mt-8 space-y-5 text-lg leading-9 text-ink/90">
            {approach.map((p) => (
              <p key={p}>{p}</p>
            ))}
            <p className="font-medium">{approachFooter}</p>
          </div>
        </div>

        <div className="about-photo-wrap">
          <Image
            src="/hero/03.jpg"
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
