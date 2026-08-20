"use client";

import { FormEvent, useState } from "react";
import { ServiceSelect } from "@/components/ServiceSelect";

type LeadFormProps = {
  variant?: "light" | "dark";
  compact?: boolean;
  layout?: "default" | "hero";
};

const fieldClass =
  "field-control h-12 w-full min-w-0 rounded-xl border border-[#e6d7b0] bg-[#fbf8f1] px-4 text-right text-sm font-medium text-ink outline-none transition duration-300 placeholder:text-muted/70 focus:border-mustard focus:bg-white focus:shadow-[0_0_0_3px_rgba(212,160,23,0.16)]";

const heroFieldClass =
  "field-control h-14 w-full min-w-0 rounded-xl border border-[#e6d7b0] bg-[#fbf8f1] px-4 text-right text-sm font-medium text-ink outline-none transition duration-300 placeholder:text-muted/70 focus:border-mustard focus:bg-white focus:shadow-[0_0_0_3px_rgba(212,160,23,0.16)]";

export function LeadForm({
  variant = "light",
  compact = false,
  layout = "default",
}: LeadFormProps) {
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "error">(
    "idle",
  );
  const [formKey, setFormKey] = useState(0);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    setStatus("sending");

    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("failed");
      setStatus("ok");
      form.reset();
      setFormKey((key) => key + 1);
    } catch {
      setStatus("error");
    }
  }

  const isDark = variant === "dark";
  const isHero = layout === "hero";
  const inputClass = isHero ? heroFieldClass : fieldClass;

  return (
    <form
      dir="rtl"
      onSubmit={onSubmit}
      className={
        compact
          ? "grid gap-3"
          : isHero
            ? "grid grid-cols-2 gap-2.5 sm:grid-cols-1 sm:gap-5 md:grid-cols-4"
            : "grid grid-cols-1 gap-4 sm:grid-cols-2"
      }
    >
      <label className="field-enter min-w-0" style={{ animationDelay: "0ms" }}>
        <span className={`mb-1.5 block text-xs font-bold ${isDark ? "text-white/70" : "text-muted"}`}>
          שם
        </span>
        <input
          required
          name="name"
          placeholder="שם מלא"
          autoComplete="name"
          className={inputClass}
        />
      </label>

      <label className="field-enter min-w-0" style={{ animationDelay: "80ms" }}>
        <span className={`mb-1.5 block text-xs font-bold ${isDark ? "text-white/70" : "text-muted"}`}>
          טלפון
        </span>
        <input
          required
          name="phone"
          type="tel"
          inputMode="tel"
          placeholder="05X-XXX-XXXX"
          autoComplete="tel"
          className={inputClass}
          dir="ltr"
        />
      </label>

      <label className="field-enter min-w-0" style={{ animationDelay: "160ms" }}>
        <span className={`mb-1.5 block text-xs font-bold ${isDark ? "text-white/70" : "text-muted"}`}>
          אימייל
        </span>
        <input
          required
          name="email"
          type="email"
          placeholder="name@email.com"
          autoComplete="email"
          className={inputClass}
          dir="ltr"
        />
      </label>

      <label className="field-enter relative z-30 min-w-0" style={{ animationDelay: "240ms" }}>
        <span className={`mb-1.5 block text-xs font-bold ${isDark ? "text-white/70" : "text-muted"}`}>
          שירות נדרש
        </span>
        <span className="relative block min-w-0">
          <ServiceSelect key={formKey} inputClass={inputClass} />
        </span>
      </label>

      <div
        className={`field-enter relative z-0 min-w-0 ${compact ? "" : isHero ? "col-span-2 sm:col-span-1 md:col-span-4" : "sm:col-span-2"}`}
        style={{ animationDelay: "320ms" }}
      >
        <label className="mb-3 flex cursor-pointer items-start gap-3 text-right text-xs leading-5 sm:mb-4 sm:text-sm sm:leading-6">
          <input
            required
            type="checkbox"
            name="privacy"
            className="mt-1 h-4 w-4 shrink-0 accent-[#d4a017]"
          />
          <span className={isDark ? "text-white/75" : "text-muted"}>
            קראתי ואני מסכים/ה ל
            <a href="/privacy" className="font-bold text-mustard underline-offset-2 hover:underline">
              מדיניות הפרטיות
            </a>
            , ולכך שתחזרו אליי לגבי הפנייה.
          </span>
        </label>
        <button
          type="submit"
          disabled={status === "sending"}
          className={`btn-gold flex w-full rounded-full text-sm disabled:opacity-70 ${isHero ? "h-12 md:h-14" : "h-12"}`}
        >
          {status === "sending" ? "שולחים..." : "שליחה"}
        </button>
        {status === "ok" && (
          <p className="mt-3 text-sm font-bold text-mustard">
            התקבל. נחזור אליכם בהקדם — בדרך כלל עוד היום.
          </p>
        )}
        {status === "error" && (
          <p className="mt-3 text-sm font-bold text-red-700">
            משהו לא עבר. אפשר גם להתקשר או לשלוח וואטסאפ.
          </p>
        )}
      </div>
    </form>
  );
}
