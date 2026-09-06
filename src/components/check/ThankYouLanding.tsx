"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Reveal } from "@/components/check/Reveal";
import { CookieBanner } from "@/components/CookieBanner";
import { FloatDock } from "@/components/FloatDock";
import { thankYouPrepare } from "@/lib/checkLanding";

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

const steps = [
  { num: "01", text: thankYouPrepare[0] },
  { num: "02", text: thankYouPrepare[1] },
  { num: "03", text: thankYouPrepare[2] },
] as const;

export function ThankYouLanding() {
  useEffect(() => {
    window.fbq?.("track", "Purchase");
  }, []);

  return (
    <div className="check-shell thanks-page">
      <a href="#main" className="check-skip">
        דילוג לתוכן הראשי
      </a>

      <main id="main">
        <section className="check-ink-panel thanks-hero relative overflow-hidden">
          <div aria-hidden="true" className="check-grid-lines absolute inset-0" />
          <div className="check-container relative py-20 text-center md:py-28">
            <span className="thanks-check" aria-hidden="true">
              ✓
            </span>
            <span
              className="check-rule-label check-float-slow thanks-in mx-auto mt-5"
              style={{ animationDelay: "80ms" }}
            >
              הרכישה התקבלה בהצלחה
            </span>
            <h1
              className="thanks-in mx-auto mt-6 max-w-3xl text-3xl font-black leading-tight md:text-5xl"
              style={{ animationDelay: "160ms" }}
            >
              תודה שרכשתם את <span className="check-gold-gradient">בדיקת הפנסיה</span>
            </h1>
            <p
              className="thanks-in mx-auto mt-6 max-w-2xl text-base leading-8 opacity-90 md:text-lg"
              style={{ animationDelay: "240ms" }}
            >
              בקרוב מאוד מומחה ייצור איתכם קשר עם כל הנתונים המדויקים שאתם צריכים לדעת, כדי שתדעו איך
              למשוך את הפנסיה ואיך לעשות את זה בצורה נכונה — ובכך לחסוך אלפי שקלים.
            </p>
          </div>
          <div className="check-section-divider" />
        </section>

        <section className="thanks-body">
          <div className="check-container py-16 text-center md:py-20">
            <Reveal>
              <h2 className="text-2xl font-black md:text-3xl">מה כדאי לעשות עד השיחה?</h2>
              <span className="thanks-title-line" />
            </Reveal>

            <ol className="mt-10 grid gap-5 md:grid-cols-3">
              {steps.map((step, index) => (
                <Reveal as="li" key={step.num} delay={index * 120} className="thanks-step check-card-lift">
                  <span className="thanks-step-num">{step.num}</span>
                  <p>{step.text}</p>
                </Reveal>
              ))}
            </ol>

            <Reveal delay={200}>
              <aside className="thanks-note check-glow-ring">
                <p className="text-base font-extrabold leading-8 md:text-lg">
                  חשוב: אל תחתמו ואל תשלחו מסמכים לאף גורם עד שתקבלו את התמונה המלאה בשיחה.
                </p>
                <p className="check-muted mt-3 text-sm leading-7 md:text-base">
                  המטרה שלנו היא שתקבלו החלטה על בסיס נתונים — לא לפי הבטחות.
                </p>
                <div className="mt-7">
                  <Link href="/check/" className="check-cta check-cta-gold check-cta-md check-pulse-cta">
                    חזרה לעמוד הראשי
                    <span aria-hidden="true" className="check-cta-arrow">
                      ←
                    </span>
                  </Link>
                </div>
              </aside>
            </Reveal>
          </div>
        </section>
      </main>

      <footer className="check-ink-panel mt-0 py-10">
        <div className="check-container text-center">
          <p className="mx-auto max-w-2xl text-sm leading-7 opacity-80">
            בדיקת פנסיה מקצועית לפני משיכה — מידע כללי ואינו מהווה ייעוץ מס או ייעוץ פנסיוני אישי.
          </p>
          <nav
            aria-label="ניווט תחתון"
            className="mt-5 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm font-medium"
          >
            <Link href="/privacy" className="opacity-85 hover:opacity-100">
              מדיניות פרטיות
            </Link>
            <Link href="/terms" className="opacity-85 hover:opacity-100">
              תנאי שימוש
            </Link>
            <Link href="/accessibility" className="opacity-85 hover:opacity-100">
              הצהרת נגישות
            </Link>
          </nav>
        </div>
      </footer>

      <FloatDock />
      <CookieBanner />
    </div>
  );
}
