"use client";

import Image from "next/image";
import { useState } from "react";
import { nav, site } from "@/lib/site";

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-white/10 bg-deep/70 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-3">
        <a href="#top" className="flex items-center gap-3">
          <Image
            src="/logo.jpg"
            alt={site.name}
            width={48}
            height={48}
            className="h-12 w-12 rounded-full object-cover ring-1 ring-gold/40"
            priority
          />
          <span className="hidden font-serif text-lg text-cream sm:block">
            {site.shortName}
          </span>
        </a>

        <nav className="hidden items-center gap-8 text-sm text-cream/80 md:flex">
          {nav.map((item) => (
            <a key={item.href} href={item.href} className="transition hover:text-gold-2">
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href={`tel:${site.phone}`}
            className="hidden rounded-full border border-gold/40 px-4 py-2 text-sm text-gold-2 transition hover:bg-gold hover:text-deep sm:inline-flex"
          >
            {site.phoneDisplay}
          </a>
          <button
            type="button"
            className="grid h-10 w-10 place-items-center rounded-full border border-white/20 text-cream md:hidden"
            aria-expanded={open}
            aria-label="תפריט"
            onClick={() => setOpen((v) => !v)}
          >
            <span className="block h-px w-4 bg-current" />
          </button>
        </div>
      </div>

      {open && (
        <nav className="grid gap-2 border-t border-white/10 bg-deep px-5 py-4 text-cream md:hidden">
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="py-2"
              onClick={() => setOpen(false)}
            >
              {item.label}
            </a>
          ))}
          <a href={`tel:${site.phone}`} className="py-2 text-gold-2">
            {site.phoneDisplay}
          </a>
        </nav>
      )}
    </header>
  );
}
