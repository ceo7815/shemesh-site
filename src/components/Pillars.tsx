import Image from "next/image";
import { FadeIn } from "@/components/FadeIn";
import { LeadForm } from "@/components/LeadForm";
import { pillars } from "@/lib/site";

const icons = [
  "/icons/info.png",
  "/icons/completed.png",
  "/icons/giving.png",
  "/icons/time.png",
];

export function Pillars() {
  return (
    <section className="relative bg-cream px-5 pb-16 pt-28">
      <div
        id="lead"
        className="form-box mx-auto max-w-6xl scroll-mt-32 rounded-2xl border border-[#1a1a1a]/80 bg-white px-6 py-8 text-right shadow-[0_18px_50px_rgba(0,0,0,0.08)] max-sm:max-w-[22.5rem] sm:px-8 sm:py-10"
      >
        <LeadForm layout="hero" />
      </div>
      <div className="mx-auto mt-12 grid max-w-6xl grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
        {pillars.map((item, index) => (
          <FadeIn key={item.title} delay={index * 80} className="h-full">
            <article className="pillar-card h-full">
              <div className="pillar-card-inner">
                <Image src={icons[index]} alt="" width={56} height={56} className="h-10 w-10 sm:h-14 sm:w-14" />
                <h2 className="mt-3 text-sm font-extrabold leading-6 sm:mt-5 sm:text-xl">{item.title}</h2>
              </div>
            </article>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}
