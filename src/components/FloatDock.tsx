"use client";

import type { ReactNode } from "react";
import { useEffect, useRef } from "react";
import {
  AccessibilityIcon,
  AccessibilityPanel,
  useAccessibility,
} from "@/components/AccessibilityWidget";
import { site } from "@/lib/site";

function FloatLink({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: ReactNode;
}) {
  return (
    <a href={href} target="_blank" rel="noreferrer" aria-label={label} className="float-btn">
      {children}
    </a>
  );
}

export function FloatDock() {
  const a11y = useAccessibility();
  const shellRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!a11y.open) return;
    const onPointer = (event: MouseEvent) => {
      if (!shellRef.current?.contains(event.target as Node)) a11y.setOpen(false);
    };
    document.addEventListener("mousedown", onPointer);
    return () => document.removeEventListener("mousedown", onPointer);
  }, [a11y.open, a11y.setOpen]);

  return (
    <div ref={shellRef} className="float-shell">
      <div className="float-dock">
        <FloatLink
          href={`https://api.whatsapp.com/send?phone=${site.whatsapp}`}
          label="וואטסאפ"
        >
          <svg viewBox="0 0 24 24" className="h-[22px] w-[22px] fill-current" aria-hidden>
            <path d="M19.05 4.91A9.82 9.82 0 0 0 12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.87 9.87 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.91-7.02Zm-7.01 15.24h-.01a8.2 8.2 0 0 1-4.18-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.2 8.2 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.25-8.24 2.2 0 4.27.86 5.82 2.42a8.18 8.18 0 0 1 2.42 5.83c0 4.55-3.7 8.23-8.25 8.23Zm4.52-6.16c-.25-.12-1.47-.72-1.7-.81-.23-.08-.39-.12-.56.12-.17.25-.64.81-.79.97-.15.17-.29.19-.54.06-.25-.12-1.05-.39-2-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.02-.38.11-.51.11-.11.25-.29.37-.43.12-.14.16-.25.25-.41.08-.17.04-.31-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.48-.4-.42-.56-.42h-.48c-.17 0-.43.06-.66.31-.23.25-.87.85-.87 2.07 0 1.22.89 2.4 1.01 2.56.12.17 1.75 2.67 4.23 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.67-1.18.21-.58.21-1.07.14-1.18-.06-.1-.23-.17-.48-.29Z" />
          </svg>
        </FloatLink>

        <FloatLink href={site.facebook} label="פייסבוק">
          <svg viewBox="0 0 24 24" className="h-[22px] w-[22px] fill-current" aria-hidden>
            <path d="M14.5 8.5V6.8c0-.7.5-1.1 1.2-1.1h1.3V3h-2.3C12.2 3 11 4.4 11 6.6v1.9H9v2.7h2V21h3.5v-9.8h2.3l.4-2.7h-2.7Z" />
          </svg>
        </FloatLink>

        <button
          type="button"
          className="float-btn"
          aria-expanded={a11y.open}
          aria-controls={a11y.panelId}
          aria-label="תפריט נגישות"
          onClick={() => a11y.setOpen((v) => !v)}
        >
          <AccessibilityIcon />
        </button>
      </div>

      <AccessibilityPanel
        open={a11y.open}
        panelId={a11y.panelId}
        prefs={a11y.prefs}
        save={a11y.save}
        toggle={a11y.toggle}
        onClose={() => a11y.setOpen(false)}
      />
    </div>
  );
}
