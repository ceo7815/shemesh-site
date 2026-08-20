"use client";

import { FormEvent, useState } from "react";
import { serviceTypes } from "@/lib/site";

type LeadFormProps = {
  variant?: "light" | "dark";
  compact?: boolean;
};

export function LeadForm({ variant = "light", compact = false }: LeadFormProps) {
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "error">(
    "idle",
  );

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
    } catch {
      setStatus("error");
    }
  }

  const isDark = variant === "dark";

  return (
    <form
      onSubmit={onSubmit}
      className={compact ? "grid gap-3" : "grid gap-4 sm:grid-cols-2"}
    >
      <label className="grid gap-1.5 text-right">
        <span className={`text-xs tracking-wide ${isDark ? "text-white/70" : "text-muted"}`}>
          שם
        </span>
        <input
          required
          name="name"
          autoComplete="name"
          className="h-12 rounded-md border border-gold/25 bg-white/90 px-3 text-ink outline-none transition focus:border-gold"
        />
      </label>
      <label className="grid gap-1.5 text-right">
        <span className={`text-xs tracking-wide ${isDark ? "text-white/70" : "text-muted"}`}>
          טלפון
        </span>
        <input
          required
          name="phone"
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          className="h-12 rounded-md border border-gold/25 bg-white/90 px-3 text-ink outline-none transition focus:border-gold"
        />
      </label>
      <label className="grid gap-1.5 text-right">
        <span className={`text-xs tracking-wide ${isDark ? "text-white/70" : "text-muted"}`}>
          אימייל
        </span>
        <input
          required
          name="email"
          type="email"
          autoComplete="email"
          className="h-12 rounded-md border border-gold/25 bg-white/90 px-3 text-ink outline-none transition focus:border-gold"
        />
      </label>
      <label className="grid gap-1.5 text-right">
        <span className={`text-xs tracking-wide ${isDark ? "text-white/70" : "text-muted"}`}>
          שירות נדרש
        </span>
        <select
          required
          name="service"
          defaultValue=""
          className="h-12 rounded-md border border-gold/25 bg-white/90 px-3 text-ink outline-none transition focus:border-gold"
        >
          <option value="" disabled>
            בחרו סוג טיפול
          </option>
          {serviceTypes.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      </label>
      <div className={compact ? "" : "sm:col-span-2"}>
        <button
          type="submit"
          disabled={status === "sending"}
          className="flex h-12 w-full items-center justify-center rounded-md bg-gold text-sm font-medium text-deep transition hover:bg-gold-2 disabled:opacity-70"
        >
          {status === "sending" ? "שולחים..." : "שליחה"}
        </button>
        {status === "ok" && (
          <p className="mt-3 text-sm text-gold">
            התקבל. נחזור אליכם בהקדם — בדרך כלל עוד היום.
          </p>
        )}
        {status === "error" && (
          <p className="mt-3 text-sm text-red-700">
            משהו לא עבר. אפשר גם להתקשר או לשלוח וואטסאפ.
          </p>
        )}
      </div>
    </form>
  );
}
