"use client";

import { useEffect } from "react";
import Link from "next/link";
import { CtaButton } from "@/components/check/CtaButton";
import { Reveal } from "@/components/check/Reveal";
import { CookieBanner } from "@/components/CookieBanner";
import { FloatDock } from "@/components/FloatDock";
import {
  fitFor,
  notFitFor,
  outcomes,
  promises,
  realQuestions,
  whatYouGet,
} from "@/lib/checkLanding";

function CheckMark() {
  return (
    <span aria-hidden="true" className="check-mark">
      ✓
    </span>
  );
}

export function CheckLanding() {
  useEffect(() => {
    if (window.location.hash) return;
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, []);

  return (
    <div className="check-shell">
      <a href="#main" className="check-skip">
        דילוג לתוכן הראשי
      </a>

      <header className="check-masthead">
        <div className="check-container flex flex-col items-center gap-0.5 py-3 text-center">
          <span className="text-lg font-black tracking-tight">בדיקת פנסיה לפני משיכה</span>
          <span className="check-muted text-xs font-semibold">עלות היכרות חד־פעמית: 80₪ בלבד</span>
        </div>
      </header>

      <main id="main">
        <section className="check-ink-panel relative overflow-hidden">
          <img
            src="/check/hero-finance.jpg"
            alt="דוח פנסיוני מודפס עם גרפים ועט על שולחן עבודה כהה"
            width={1600}
            height={1104}
            className="absolute inset-0 h-full w-full object-cover opacity-20"
          />
          <div aria-hidden="true" className="check-grid-lines absolute inset-0" />
          <div className="check-container relative py-14 text-center md:py-20">
            <Reveal>
              <span className="check-rule-label check-float-slow">בדיקה מקצועית · לפני החלטה</span>
            </Reveal>
            <Reveal delay={90}>
              <h1 className="mx-auto mt-5 max-w-3xl text-3xl font-black leading-tight md:text-5xl">
                אל תמשכו פנסיה לפני <span className="check-gold-gradient">שראיתם את המספרים</span>
              </h1>
            </Reveal>
            <Reveal delay={160}>
              <div className="mx-auto mt-5 max-w-2xl space-y-2.5 text-base leading-relaxed opacity-90 md:text-lg">
                <p>רוצים למשוך כספי פנסיה, קופות ישנות או כספים ממעסיקים קודמים?</p>
                <p>
                  לפני שאתם חותמים, שולחים מסמכים או מאמינים למישהו שמבטיח לכם “כסף מהר” —<br />
                  יש משהו אחד שחייבים לדעת:
                </p>
                <p className="text-lg font-extrabold opacity-100 md:text-xl">
                  כמה כסף באמת יש לכם, כמה מס אתם צפויים לשלם, והאם בכלל כדאי לכם למשוך עכשיו.
                </p>
                <p className="check-warn-box">
                  כי בתחום הזה טעות אחת יכולה לעלות עשרות ולפעמים אפילו מאות אלפי שקלים
                </p>
              </div>
            </Reveal>
            <Reveal delay={240}>
              <div className="mt-8 flex justify-center">
                <CtaButton pulse note="עלות היכרות חד־פעמית: 80₪ בלבד · ללא התחייבות נוספת">
                  לחצו עכשיו להתחלת הבדיקה
                </CtaButton>
              </div>
            </Reveal>
          </div>
          <div className="check-section-divider" />
        </section>

        <section className="check-container py-12 text-center md:py-16">
          <Reveal>
            <h2 className="mx-auto max-w-2xl text-2xl font-black md:text-3xl">
              כולם מציעים “בדיקה”. <span className="check-mark-gold">השאלה מה באמת בודקים.</span>
            </h2>
          </Reveal>
          <div className="mt-8 grid gap-5 md:grid-cols-2">
            <Reveal className="check-card check-card-lift p-6" delay={60}>
              <p className="check-muted text-sm font-bold tracking-wide uppercase">
                הרבה גורמים בשוק יגידו לכם:
              </p>
              <ul className="mt-3 space-y-2">
                {promises.map((item) => (
                  <li key={item} className="check-strike text-base">
                    {item}
                  </li>
                ))}
              </ul>
              <p className="mt-4 font-extrabold">אבל “בערך” זה לא מספיק כשמדובר בפנסיה שלכם.</p>
              <p className="check-muted mt-1">כי השאלה היא לא רק כמה כסף יש בקופה.</p>
            </Reveal>

            <Reveal className="check-card check-card-lift check-paper p-6" delay={140}>
              <p className="font-black">השאלה היא:</p>
              <ul className="check-list mx-auto mt-3 w-fit text-right">
                {realQuestions.map((item) => (
                  <li key={item} className="flex items-start justify-start gap-2 text-base">
                    <CheckMark />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p className="check-mark-ink mt-5">בדיוק בשביל זה נועדה הבדיקה.</p>
            </Reveal>
          </div>
        </section>

        <section className="check-paper relative py-12 md:py-16">
          <div className="check-section-divider absolute inset-x-0 top-0" />
          <div className="check-container text-center">
            <Reveal>
              <h2 className="text-2xl font-black md:text-3xl">מה מקבלים בבדיקה?</h2>
              <p className="mx-auto mt-3 max-w-2xl text-base md:text-lg">
                בעלות היכרות חד־פעמית של <span className="check-mark-gold">80₪ בלבד</span>, תקבלו בדיקת
                פנסיה מקצועית הכוללת:
              </p>
            </Reveal>
            <ul className="mx-auto mt-7 grid gap-3 text-right md:grid-cols-2">
              {whatYouGet.map((item, index) => (
                <Reveal
                  as="li"
                  key={item}
                  delay={index * 45}
                  className="check-card check-card-lift flex items-center justify-start gap-2 p-3.5 text-sm md:text-base"
                >
                  <CheckMark />
                  <span>{item}</span>
                </Reveal>
              ))}
            </ul>
            <Reveal delay={120}>
              <div className="mt-8 flex flex-col items-center gap-3 text-center">
                <p className="text-base font-extrabold md:text-lg">
                  המטרה היא פשוטה:
                  <br />
                  <span className="check-mark-gold">שלא תקבלו החלטה על הפנסיה שלכם בעיניים עצומות</span>
                </p>
                <CtaButton size="md" tone="ink">
                  לחצו עכשיו להתחלת הבדיקה
                </CtaButton>
              </div>
            </Reveal>
          </div>
        </section>

        <section className="check-container py-12 text-center md:py-16">
          <div className="grid gap-6 md:grid-cols-[1.1fr_0.9fr] md:items-center">
            <Reveal className="space-y-3 text-base leading-relaxed md:text-lg">
              <p>אנשים מוכנים לשלם מאות שקלים על בדיקה לרכב לפני קנייה.</p>
              <p>אלפי שקלים לעורך דין לפני חתימה על חוזה.</p>
              <p className="check-muted">
                אבל כשזה מגיע לפנסיה שלהם — הם לפעמים מקבלים החלטה לפי הבטחה של מישהו בטלפון.
              </p>
              <p className="text-xl font-black md:text-2xl">
                <span className="check-mark-gold">וזו בדיוק הטעות.</span>
              </p>
              <p className="font-semibold">כי משיכת פנסיה היא לא פעולה קטנה.</p>
              <p>
                זו החלטה שיכולה להשפיע על המס שלכם, על הזכויות שלכם, על הפנסיה העתידית שלכם ועל הכסף
                שייכנס לכם בפועל לחשבון.
              </p>
            </Reveal>
            <Reveal as="aside" delay={120} className="check-card check-ink-panel check-glow-ring p-6">
              <p className="text-base md:text-lg">
                בעלות נמוכה יחסית, אתם מקבלים תמונה ברורה לפני החלטה גדולה.
              </p>
              <p className="check-gold-gradient mt-4 text-2xl font-black md:text-3xl">לפני שמושכים — בודקים.</p>
              <div className="mt-5 flex justify-center">
                <CtaButton size="md">לחצו עכשיו להתחלת הבדיקה</CtaButton>
              </div>
            </Reveal>
          </div>
        </section>

        <section className="check-ink-panel relative py-12 md:py-16">
          <div aria-hidden="true" className="check-grid-lines absolute inset-0 opacity-70" />
          <div className="check-container relative text-center">
            <Reveal>
              <span className="check-rule-label">מחלקת הקלות ופטורי מס</span>
              <h2 className="mx-auto mt-4 max-w-3xl text-2xl font-black leading-snug md:text-3xl">
                ייתכן שאתם זכאים להקלות שלא ידעתם עליהן - אנחנו מתחייבים למצות עבורכם את מקסימום הזכויות
                שמגיעות לכם כחוק.
              </h2>
            </Reveal>
            <Reveal delay={100} className="mx-auto mt-6 max-w-3xl space-y-3 text-base leading-relaxed opacity-90 md:text-lg">
              <p>
                אחד הדברים החשובים ביותר בבדיקה הוא לא רק למצוא כמה כסף יש לכם — אלא לבדוק האם יש דרך
                חוקית להפחית את המס. במקרים מסוימים, אנשים מגלים שיש להם אפשרויות שלא סיפרו להם עליהן:
                הקלות מס. פטורים. מסלולים נכונים יותר. תזמון נכון יותר למשיכה. או החלטה שעדיף לא למשוך
                בכלל כרגע.
              </p>
              <p>
                בדיוק בשביל זה הקמנו מחלקה ייעודית של אנשי מקצוע, שכל תחום ההתמחות שלה הוא איתור הקלות
                מס, פטורים ומסלולי מיסוי נכונים בהתאם לנתונים האישיים של כל לקוח.
              </p>
            </Reveal>
            <Reveal delay={160} className="mx-auto mt-8 max-w-3xl">
              <figure className="check-glow-ring overflow-hidden rounded-3xl border border-[color:var(--check-gold-border)]">
                <div className="relative">
                  <img
                    src="/check/experts-team.jpg"
                    alt="מחלקת המומחים שלנו בעבודה — אנשי מקצוע בבדיקת נתונים פנסיוניים במשרד"
                    width={1920}
                    height={1280}
                    loading="lazy"
                    className="h-56 w-full object-cover md:h-80"
                  />
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-gradient-to-t from-[#142033] via-[#142033]/25 to-transparent"
                  />
                  <figcaption className="absolute inset-x-0 bottom-0 p-4 text-center text-sm font-bold text-white md:text-base">
                    מחלקה שלמה של אנשי מקצוע — בדיקת זכויות, הקלות ופטורי מס
                  </figcaption>
                </div>
              </figure>
            </Reveal>
            <Reveal delay={220} className="mx-auto mt-6 max-w-3xl">
              <p className="check-warn-box text-base md:text-lg">
                זו לא בדיקה כללית ולא הערכה.
                <br />
                זה תהליך מקצועי שמטרתו למצוא כל אפשרות חוקית שיכולה להפחית את המס שאתם צפויים לשלם ולמנוע
                תשלום מיותר.
              </p>
            </Reveal>
          </div>
        </section>

        <section className="check-container py-12 text-center md:py-16">
          <div className="grid gap-5 md:grid-cols-2">
            <Reveal className="check-card check-card-lift p-6">
              <h2 className="text-xl font-black md:text-2xl">למי הבדיקה מתאימה?</h2>
              <p className="check-muted mt-2 text-sm">הבדיקה מתאימה במיוחד למי ש:</p>
              <ul className="check-list mx-auto mt-4 w-fit text-right">
                {fitFor.map((item) => (
                  <li key={item} className="flex items-start justify-start gap-2 text-sm md:text-base">
                    <CheckMark />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal className="check-card check-card-lift p-6" delay={120}>
              <h2 className="text-xl font-black md:text-2xl">למי זה לא מתאים?</h2>
              <ul className="mx-auto mt-4 w-fit space-y-2 text-right">
                {notFitFor.map((item) => (
                  <li
                    key={item}
                    className="check-muted flex items-start justify-start gap-2 text-sm md:text-base"
                  >
                    <span aria-hidden="true" className="check-x">
                      ×
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <div className="check-hairline my-5" />
              <div className="space-y-1.5 text-sm font-semibold md:text-base">
                <p>אנחנו עובדים בצורה חוקית, שקופה ומסודרת.</p>
                <p>אם אפשר לעזור — נגיד איך.</p>
                <p>אם לא כדאי למשוך — נגיד גם את זה.</p>
                <p>אם יש דרך להפחית מס — נבדוק אותה.</p>
                <p className="check-mark-gold">ואם אין — לא נמכור לכם חלום.</p>
              </div>
            </Reveal>
          </div>
        </section>

        <section className="check-paper relative py-12 md:py-16">
          <div className="check-section-divider absolute inset-x-0 top-0" />
          <div className="check-container text-center">
            <Reveal>
              <h2 className="text-2xl font-black md:text-3xl">מה תדעו בסוף הבדיקה?</h2>
              <p className="mt-3">בסוף התהליך אתם אמורים להבין בצורה הרבה יותר ברורה:</p>
            </Reveal>
            <ul className="mt-7 grid gap-3 sm:grid-cols-2 md:grid-cols-4">
              {outcomes.map((item, index) => (
                <Reveal
                  as="li"
                  key={item}
                  delay={index * 45}
                  className="check-card check-card-lift p-4 text-sm font-semibold md:text-base"
                >
                  {item}
                </Reveal>
              ))}
            </ul>
            <Reveal delay={100}>
              <div className="mt-7 flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-base font-bold">
                <span className="check-strike">לא ניחוש.</span>
                <span className="check-strike">לא בערך.</span>
                <span className="check-strike">לא “יהיה בסדר”.</span>
                <span className="check-mark-gold">בדיקה מסודרת על בסיס נתונים.</span>
              </div>
            </Reveal>
          </div>
        </section>

        <section id="checkout" className="check-ink-panel relative overflow-hidden py-14 md:py-16">
          <div aria-hidden="true" className="check-grid-lines absolute inset-0" />
          <div className="check-section-divider absolute inset-x-0 top-0" />
          <div className="check-container relative text-center">
            <Reveal>
              <h2 className="text-2xl font-black md:text-4xl">בדיקת פנסיה מקצועית לפני משיכה</h2>
              <p className="mt-3 text-base opacity-90 md:text-lg">
                כולל הפקת נתונים + פענוח מקצועי + שיחת הסבר
              </p>
              <p className="check-price-pill">בעלות היכרות חד־פעמית: 80₪ בלבד</p>
            </Reveal>
            <Reveal delay={120}>
              <div className="mt-7 flex justify-center">
                <CtaButton pulse note="תשלום מאובטח · מענה אנושי לאחר הרכישה">
                  לחצו עכשיו להתחלת הבדיקה
                </CtaButton>
              </div>
            </Reveal>
          </div>
        </section>
      </main>

      <footer className="check-ink-panel mt-0 py-10">
        <div className="check-container text-right">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <p className="text-sm opacity-80">
              בדיקת פנסיה מקצועית לפני משיכה — מידע כללי ואינו מהווה ייעוץ מס או ייעוץ פנסיוני אישי.
            </p>
            <nav aria-label="ניווט תחתון" className="flex flex-wrap gap-x-5 gap-y-2 text-sm font-medium">
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
        </div>
      </footer>

      <FloatDock />
      <CookieBanner />
    </div>
  );
}
