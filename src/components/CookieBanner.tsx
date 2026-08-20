"use client";

import Link from "next/link";
import { useEffect, useId, useState } from "react";

const STORAGE = "shemesh-cookies";
export const COOKIE_OPEN_EVENT = "shemesh-cookies-open";

export type CookieConsent = {
  essential: true;
  analytics: boolean;
  marketing: boolean;
  decidedAt: number;
};

function readConsent(): CookieConsent | null {
  try {
    const raw = localStorage.getItem(STORAGE);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<CookieConsent>;
    if (typeof parsed.decidedAt !== "number") return null;
    return {
      essential: true,
      analytics: Boolean(parsed.analytics),
      marketing: Boolean(parsed.marketing),
      decidedAt: parsed.decidedAt,
    };
  } catch {
    return null;
  }
}

function applyConsent(consent: CookieConsent) {
  document.documentElement.classList.toggle("cookies-analytics", consent.analytics);
  document.documentElement.classList.toggle("cookies-marketing", consent.marketing);
}

function writeConsent(next: Omit<CookieConsent, "essential" | "decidedAt">) {
  const consent: CookieConsent = {
    essential: true,
    analytics: next.analytics,
    marketing: next.marketing,
    decidedAt: Date.now(),
  };
  localStorage.setItem(STORAGE, JSON.stringify(consent));
  applyConsent(consent);
  return consent;
}

export function CookieSettingsButton({ className = "" }: { className?: string }) {
  return (
    <button
      type="button"
      className={className}
      onClick={() => window.dispatchEvent(new Event(COOKIE_OPEN_EVENT))}
    >
      ניהול עוגיות
    </button>
  );
}

export function CookieBanner() {
  const titleId = useId();
  const [ready, setReady] = useState(false);
  const [open, setOpen] = useState(false);
  const [prefs, setPrefs] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  const [marketing, setMarketing] = useState(false);

  useEffect(() => {
    const saved = readConsent();
    if (saved) {
      setAnalytics(saved.analytics);
      setMarketing(saved.marketing);
      applyConsent(saved);
    } else {
      setOpen(true);
    }
    setReady(true);

    const onOpen = () => {
      const current = readConsent();
      if (current) {
        setAnalytics(current.analytics);
        setMarketing(current.marketing);
      }
      setPrefs(true);
      setOpen(true);
    };
    window.addEventListener(COOKIE_OPEN_EVENT, onOpen);
    return () => window.removeEventListener(COOKIE_OPEN_EVENT, onOpen);
  }, []);

  function close(next: { analytics: boolean; marketing: boolean }) {
    writeConsent(next);
    setAnalytics(next.analytics);
    setMarketing(next.marketing);
    setPrefs(false);
    setOpen(false);
  }

  if (!ready || !open) return null;

  return (
    <div className="cookie-root">
      <div
        role="dialog"
        aria-modal="false"
        aria-labelledby={titleId}
        className="cookie-banner"
      >
        <div className="cookie-copy">
          <p id={titleId} className="cookie-title">
            עוגיות באתר
          </p>
          <p className="cookie-text">
            אנחנו משתמשים בעוגיות על מנת לשמור על פרטיותכם ולהתאים את חוויית הגלישה.
            עוגיות חיוניות פועלות תמיד; מדידה ושיווק רק אם תאשרו. פירוט מלא ב<Link href="/privacy#cookies" className="cookie-link">מדיניות הפרטיות</Link>.
          </p>
        </div>

        <div className="cookie-actions">
          {prefs ? (
            <button
              type="button"
              className="cookie-btn cookie-btn-gold"
              onClick={() => close({ analytics, marketing })}
            >
              שמירת העדפות
            </button>
          ) : (
            <button
              type="button"
              className="cookie-btn cookie-btn-gold"
              onClick={() => close({ analytics: true, marketing: true })}
            >
              אשר הכל
            </button>
          )}
          <button
            type="button"
            className="cookie-btn cookie-btn-outline"
            onClick={() => setPrefs((v) => !v)}
            aria-expanded={prefs}
          >
            {prefs ? "הסתר העדפות" : "העדפות"}
          </button>
          <button type="button" className="cookie-btn cookie-btn-ghost" onClick={() => close({ analytics: false, marketing: false })}>
            דחה הכל
          </button>
        </div>

        {prefs ? (
          <div className="cookie-prefs">
            <label className="cookie-row is-locked">
              <span>
                <strong>חיוניות</strong>
                <span>הפעלת האתר, אבטחה, נגישות ושמירת בחירת העוגיות. תמיד פעילות.</span>
              </span>
              <input type="checkbox" checked disabled readOnly />
            </label>
            <label className="cookie-row">
              <span>
                <strong>מדידה</strong>
                <span>הבנת שימוש באתר. כיום לא מופעל כלי מדידה חיצוני, עד שתאשרו.</span>
              </span>
              <input
                type="checkbox"
                checked={analytics}
                onChange={(event) => setAnalytics(event.target.checked)}
              />
            </label>
            <label className="cookie-row">
              <span>
                <strong>שיווק</strong>
                <span>תוכן מותאם או פיקסלים שיווקיים. כיום לא מופעל, עד שתאשרו.</span>
              </span>
              <input
                type="checkbox"
                checked={marketing}
                onChange={(event) => setMarketing(event.target.checked)}
              />
            </label>
          </div>
        ) : null}
      </div>
    </div>
  );
}
