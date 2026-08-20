import type { ReactNode } from "react";
import { LeadForm } from "@/components/LeadForm";
import { FadeIn } from "@/components/FadeIn";
import { SectionHeading } from "@/components/SectionHeading";
import { site } from "@/lib/site";

function ContactItem({
  label,
  href,
  children,
}: {
  label: string;
  href?: string;
  children: ReactNode;
}) {
  const body = (
    <>
      <span className="text-xs font-bold tracking-[0.16em] text-mustard">{label}</span>
      <span className="mt-1 block text-lg font-semibold leading-8 text-white">{children}</span>
    </>
  );

  const className =
    "block rounded-xl py-3 text-right transition hover:text-[#d4a017]";

  if (href) {
    return (
      <a href={href} className={className} target={href.startsWith("http") ? "_blank" : undefined} rel={href.startsWith("http") ? "noreferrer" : undefined}>
        {body}
      </a>
    );
  }

  return <div className={className}>{body}</div>;
}

export function Contact() {
  return (
    <section id="contact" className="scroll-mt-32 bg-[#141414] px-5 py-24 text-white">
      <div className="mx-auto grid max-w-6xl items-start gap-14 lg:grid-cols-2 lg:gap-20">
        <FadeIn>
          <SectionHeading title="צור קשר" light />
          <p className="mt-6 max-w-md text-right text-base leading-8 text-white/70">
            נשמח לחזור אליכם בהקדם — בדרך כלל עוד היום.
          </p>

          <div className="mt-8 divide-y divide-white/10 border-y border-white/10 text-right">
            <ContactItem label="טלפון" href={`tel:${site.phone}`}>
              <span dir="ltr">{site.phoneDisplay}</span>
            </ContactItem>
            <ContactItem
              label="וואטסאפ"
              href={`https://api.whatsapp.com/send?phone=${site.whatsapp}`}
            >
              צרו איתנו קשר ב-WhatsApp
            </ContactItem>
            <ContactItem label="כתובת" href={site.mapsUrl}>
              {site.address}
            </ContactItem>
            <ContactItem label="שעות פעילות">{site.hours}</ContactItem>
          </div>

          <div className="mt-8 flex flex-wrap justify-start gap-3">
            <a
              href={`tel:${site.phone}`}
              className="btn-gold h-12 rounded-full px-7 text-sm"
            >
              התקשרו אלינו
            </a>
            <a
              href={`https://api.whatsapp.com/send?phone=${site.whatsapp}`}
              className="btn-outline h-12 rounded-full px-7 text-sm"
              target="_blank"
              rel="noreferrer"
            >
              WhatsApp
            </a>
          </div>
        </FadeIn>

        <FadeIn delay={80}>
          <div className="rounded-2xl bg-cream p-6 text-ink shadow-[0_24px_60px_rgba(0,0,0,0.28)] sm:p-8">
            <h3 className="text-right text-2xl font-extrabold">השאירו פרטים</h3>
            <span className="heading-run is-on mt-3 block h-[3px] w-24 rounded-full" />
            <div className="mt-6">
              <LeadForm />
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
