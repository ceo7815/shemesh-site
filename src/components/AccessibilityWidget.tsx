"use client";

import { useEffect, useId, useState } from "react";

const STORAGE = "shemesh-a11y";

export type A11yPrefs = {
  text: number;
  contrast: boolean;
  invert: boolean;
  gray: boolean;
  readable: boolean;
  links: boolean;
  headings: boolean;
  motion: boolean;
  spacing: boolean;
  cursor: boolean;
  keyboard: boolean;
  targets: boolean;
};

const defaults: A11yPrefs = {
  text: 0,
  contrast: false,
  invert: false,
  gray: false,
  readable: false,
  links: false,
  headings: false,
  motion: false,
  spacing: false,
  cursor: false,
  keyboard: false,
  targets: false,
};

function readPrefs(): A11yPrefs {
  try {
    const raw = localStorage.getItem(STORAGE);
    if (!raw) return defaults;
    return { ...defaults, ...JSON.parse(raw) };
  } catch {
    return defaults;
  }
}

function applyPrefs(prefs: A11yPrefs) {
  const root = document.documentElement;
  const flags: Array<[string, boolean]> = [
    ["a11y-contrast", prefs.contrast],
    ["a11y-invert", prefs.invert],
    ["a11y-gray", prefs.gray],
    ["a11y-readable", prefs.readable],
    ["a11y-links", prefs.links],
    ["a11y-headings", prefs.headings],
    ["a11y-motion", prefs.motion],
    ["a11y-spacing", prefs.spacing],
    ["a11y-cursor", prefs.cursor],
    ["a11y-keyboard", prefs.keyboard],
    ["a11y-targets", prefs.targets],
  ];
  for (const [cls, on] of flags) root.classList.toggle(cls, on);
  root.classList.remove("a11y-text-1", "a11y-text-2", "a11y-text-3");
  if (prefs.text > 0) root.classList.add(`a11y-text-${Math.min(prefs.text, 3)}`);
}

const options: Array<{ key: Exclude<keyof A11yPrefs, "text">; label: string }> = [
  { key: "contrast", label: "ניגודיות גבוהה" },
  { key: "invert", label: "ניגודיות הפוכה" },
  { key: "gray", label: "גווני אפור" },
  { key: "readable", label: "גופן קריא" },
  { key: "links", label: "סימון קישורים" },
  { key: "headings", label: "סימון כותרות" },
  { key: "keyboard", label: "ניווט מקלדת" },
  { key: "motion", label: "ביטול הנפשות" },
  { key: "spacing", label: "ריווח מוגדל" },
  { key: "cursor", label: "סמן גדול" },
  { key: "targets", label: "לחצנים גדולים" },
];

export function useAccessibility() {
  const panelId = useId();
  const [open, setOpen] = useState(false);
  const [prefs, setPrefs] = useState<A11yPrefs>(defaults);

  useEffect(() => {
    const next = readPrefs();
    setPrefs(next);
    applyPrefs(next);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  function save(next: A11yPrefs) {
    setPrefs(next);
    applyPrefs(next);
    localStorage.setItem(STORAGE, JSON.stringify(next));
  }

  function toggle(key: Exclude<keyof A11yPrefs, "text">) {
    save({ ...prefs, [key]: !prefs[key] });
  }

  return { open, setOpen, prefs, save, toggle, options, panelId, defaults };
}

export function AccessibilityPanel({
  open,
  panelId,
  prefs,
  save,
  toggle,
  onClose,
}: {
  open: boolean;
  panelId: string;
  prefs: A11yPrefs;
  save: (next: A11yPrefs) => void;
  toggle: (key: Exclude<keyof A11yPrefs, "text">) => void;
  onClose: () => void;
}) {
  if (!open) return null;

  return (
    <div className="a11y-drop">
      <div
        id={panelId}
        role="dialog"
        aria-modal="true"
        aria-labelledby="a11y-title"
        className="a11y-panel"
      >
      <div className="a11y-head">
        <h2 id="a11y-title" className="text-lg font-extrabold text-ink">
          תפריט נגישות
        </h2>
        <button
          type="button"
          className="a11y-close"
          aria-label="סגירת תפריט נגישות"
          onClick={onClose}
        >
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.4" aria-hidden>
            <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
          </svg>
        </button>
      </div>

      <div className="a11y-body">
        <div className="flex items-center justify-between gap-3 rounded-xl bg-white px-3 py-2">
          <span className="text-sm font-bold">גודל טקסט</span>
          <div className="flex items-center gap-2">
            <button
              type="button"
              className="a11y-step"
              aria-label="הקטנת טקסט"
              onClick={() => save({ ...prefs, text: Math.max(0, prefs.text - 1) })}
            >
              א-
            </button>
            <span className="min-w-10 text-center text-sm font-extrabold">
              {100 + prefs.text * 25}%
            </span>
            <button
              type="button"
              className="a11y-step"
              aria-label="הגדלת טקסט"
              onClick={() => save({ ...prefs, text: Math.min(3, prefs.text + 1) })}
            >
              א+
            </button>
          </div>
        </div>

        <div className="mt-3 grid grid-cols-1 gap-2">
          {options.map((item) => (
            <button
              key={item.key}
              type="button"
              aria-pressed={prefs[item.key]}
              className={`a11y-option ${prefs[item.key] ? "is-on" : ""}`}
              onClick={() => toggle(item.key)}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      <div className="a11y-foot">
        <button type="button" className="a11y-reset" onClick={() => save(defaults)}>
          איפוס
        </button>
        <button type="button" className="a11y-done" onClick={onClose}>
          סגירה
        </button>
      </div>
      </div>
    </div>
  );
}

export function AccessibilityIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-6 w-6"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.15"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <circle cx="14.5" cy="4.4" r="2.05" fill="currentColor" stroke="none" />
      <circle cx="7.4" cy="16.6" r="4.35" />
      <path d="M14.5 8.6v3.3" />
      <path d="M9.4 10.6h8.1" />
      <path d="M14.5 11.9c-1.7.9-3.1 2.5-3.6 4.4" />
      <path d="M17.5 10.6 19.8 17" />
      <circle cx="19.9" cy="18.3" r="1.25" fill="currentColor" stroke="none" />
    </svg>
  );
}
