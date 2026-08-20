import Link from "next/link";
import { FadeIn } from "@/components/FadeIn";
import { SectionHeading } from "@/components/SectionHeading";
import type { LegalDoc } from "@/lib/legal";
import { site } from "@/lib/site";

export function LegalPage({ doc }: { doc: LegalDoc }) {
  return (
    <>
      <section className="bg-cream px-5 pb-10 pt-32">
        <div className="mx-auto max-w-6xl text-center">
          <SectionHeading kicker={doc.kicker} title={doc.title} align="center" />
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-ink/80">
            {doc.intro}
          </p>
          <p className="mt-5 text-sm font-bold text-mustard">
            עדכון אחרון: {doc.updated}
          </p>
        </div>
      </section>

      <section className="bg-[#141414] px-5 py-8">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-3">
          {doc.chips.map((chip) => (
            <span
              key={chip}
              className="rounded-full border border-mustard/45 bg-white/5 px-4 py-2 text-xs font-extrabold tracking-wide text-gold-2"
            >
              {chip}
            </span>
          ))}
        </div>
      </section>

      <section className="bg-cream px-5 py-16">
        <div className="mx-auto grid max-w-6xl items-start gap-12 lg:grid-cols-[16.5rem_minmax(0,1fr)]">
          <nav
            aria-label="תוכן העניינים"
            className="legal-toc lg:sticky lg:top-28"
          >
            <p className="mb-3 text-xs font-extrabold tracking-[0.18em] text-mustard">
              תוכן העניינים
            </p>
            <ol className="grid gap-1">
              {doc.sections.map((section, index) => (
                <li key={section.id}>
                  <a href={`#${section.id}`} className="legal-toc-link">
                    <span className="legal-toc-num">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    {section.title}
                  </a>
                </li>
              ))}
            </ol>
          </nav>

          <article className="min-w-0">
            {doc.sections.map((section, index) => (
              <FadeIn key={section.id} delay={Math.min(index * 40, 200)}>
                <section
                  id={section.id}
                  className="legal-section scroll-mt-32"
                  aria-labelledby={`${section.id}-title`}
                >
                  <div className="flex items-start gap-4">
                    <span className="legal-num" aria-hidden>
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <div className="min-w-0 flex-1">
                      <h2
                        id={`${section.id}-title`}
                        className="text-2xl font-extrabold leading-tight sm:text-3xl"
                      >
                        {section.title}
                      </h2>
                      <span className="heading-run is-on mt-3 block h-[3px] w-16 rounded-full" />
                      <div className="mt-5 space-y-4 text-base leading-8 text-ink/90">
                        {section.blocks.map((block, i) =>
                          block.type === "p" ? (
                            <p key={i}>{block.text}</p>
                          ) : (
                            <ul key={i} className="legal-list">
                              {block.items.map((item) => (
                                <li key={item}>{item}</li>
                              ))}
                            </ul>
                          ),
                        )}
                      </div>
                    </div>
                  </div>
                </section>
              </FadeIn>
            ))}

            <div className="mt-10 rounded-2xl bg-[#141414] px-6 py-8 text-white sm:px-8">
              <p className="text-sm font-bold tracking-[0.16em] text-mustard">
                צריכים אותנו
              </p>
              <h2 className="mt-2 text-2xl font-extrabold">
                שאלה על המסמך הזה?
              </h2>
              <p className="mt-3 max-w-xl text-sm leading-7 text-white/70">
                נשמח להסביר, לתקן או לקבל פנייה — בטלפון, בוואטסאפ או בטופס באתר.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href={`tel:${site.phone}`}
                  className="btn-gold h-11 rounded-full px-6 text-sm"
                >
                  {site.phoneDisplay}
                </a>
                <Link
                  href="/#contact"
                  className="btn-outline h-11 rounded-full px-6 text-sm"
                >
                  צור קשר
                </Link>
              </div>
            </div>
          </article>
        </div>
      </section>
    </>
  );
}
