"use client";

import { useEffect, useRef, useState } from "react";
import { serviceTypes } from "@/lib/site";

export function ServiceSelect({
  inputClass,
  name = "service",
}: {
  inputClass: string;
  name?: string;
}) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const [invalid, setInvalid] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    const onPointer = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    document.addEventListener("mousedown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div ref={rootRef} className={`relative min-w-0 ${open ? "z-40" : ""}`}>
      <select
        required
        name={name}
        value={value}
        tabIndex={-1}
        aria-hidden
        className="pointer-events-none absolute h-0 w-0 overflow-hidden opacity-0"
        onChange={(event) => setValue(event.target.value)}
        onInvalid={(event) => {
          event.preventDefault();
          setInvalid(true);
          setOpen(true);
        }}
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
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        className={`${inputClass} flex items-center justify-between gap-3 pe-4 ps-10 text-right ${
          invalid ? "border-red-500" : ""
        }`}
        onClick={() => setOpen((v) => !v)}
      >
        <span className={`min-w-0 flex-1 truncate ${value ? "text-ink" : "text-muted/70"}`}>
          {value || "בחרו סוג טיפול"}
        </span>
        <svg
          viewBox="0 0 24 24"
          className={`pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 stroke-mustard transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
          fill="none"
          aria-hidden
        >
          <path
            d="M6 9l6 6 6-6"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {open ? (
        <ul role="listbox" className="service-menu">
          {serviceTypes.map((item) => (
            <li key={item} role="none">
              <button
                type="button"
                role="option"
                aria-selected={value === item}
                className={`service-option ${value === item ? "is-active" : ""}`}
                onClick={() => {
                  setValue(item);
                  setInvalid(false);
                  setOpen(false);
                }}
              >
                {item}
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
