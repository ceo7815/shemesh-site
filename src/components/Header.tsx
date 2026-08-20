"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { SiteLogo } from "@/components/SiteLogo";
import { nav, site } from "@/lib/site";

export function Header() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [open, setOpen] = useState(false);
  const [docked, setDocked] = useState(!isHome);

  useEffect(() => {
    if (!isHome) {
      setDocked(true);
      return;
    }

    const onScroll = () => {
      const hero = document.getElementById("top");
      const line = hero ? hero.offsetHeight - 8 : window.innerHeight;
      setDocked(window.scrollY > line);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isHome]);

  useEffect(() => {
    if (!docked) setOpen(false);
  }, [docked]);

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50 px-3 pt-[max(0.75rem,env(safe-area-inset-top))] sm:px-6 sm:pt-4">
      {!docked && (
        <div className="pointer-events-auto mx-auto flex max-w-6xl items-center justify-between gap-3 sm:gap-4">
          <Link href="/" className="block shrink-0">
            <SiteLogo size="hero" priority />
          </Link>

          <a
            href={`tel:${site.phone}`}
            aria-label={`חייגו אלינו ${site.phoneDisplay}`}
            className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full border border-white/15 bg-white/10 py-2 pr-2 pl-3 shadow-[0_12px_40px_rgba(0,0,0,0.28)] backdrop-blur-md transition hover:-translate-y-0.5 hover:bg-white/16 sm:pl-5"
          >
            <span className="hidden text-sm font-extrabold tracking-wide text-white min-[400px]:inline" dir="ltr">
              {site.phoneDisplay}
            </span>
            <span className="relative grid h-12 w-12 place-items-center rounded-full bg-mustard text-white shadow-[0_8px_20px_rgba(212,160,23,0.45)]">
              <span className="absolute inset-0 animate-ping rounded-full bg-mustard/50" />
              <svg
                viewBox="0 0 24 24"
                className="relative h-5 w-5 fill-current"
                aria-hidden
              >
                <path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1.1-.2 1.2.4 2.5.6 3.8.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C10.6 21 3 13.4 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.6.6 3.8.1.4 0 .8-.3 1.1L6.6 10.8Z" />
              </svg>
            </span>
          </a>
        </div>
      )}

      {docked && (
        <div className="bar-in pointer-events-auto mx-auto max-w-6xl">
          <div className="nav-shell">
            <div className="nav-inner">
              <Link href="/" className="flex shrink-0">
                <SiteLogo size="nav" />
              </Link>

              <nav className="hidden items-center gap-8 text-[15px] md:flex">
                {nav.map((item) => (
                  <Link key={item.href} href={item.href} className="nav-link">
                    {item.label}
                  </Link>
                ))}
              </nav>

              <div className="flex items-center gap-2">
                <a
                  href={`tel:${site.phone}`}
                  className="btn-outline inline-flex h-11 rounded-full px-4 text-sm whitespace-nowrap sm:px-5 max-md:absolute max-md:left-1/2 max-md:top-1/2 max-md:z-[1] max-md:-translate-x-1/2 max-md:-translate-y-1/2"
                >
                  {site.phoneDisplay}
                </a>
                <button
                  type="button"
                  className="grid h-11 w-11 place-items-center rounded-full border border-white/20 text-white md:hidden"
                  aria-expanded={open}
                  aria-label={open ? "סגירת תפריט" : "תפריט"}
                  onClick={() => setOpen((v) => !v)}
                >
                  <span className="relative block h-3.5 w-4" aria-hidden>
                    <span className={`absolute right-0 top-0 block h-px w-4 bg-current transition ${open ? "translate-y-[6px] rotate-45" : ""}`} />
                    <span className={`absolute right-0 top-[6px] block h-px w-4 bg-current transition ${open ? "opacity-0" : ""}`} />
                    <span className={`absolute right-0 top-[12px] block h-px w-4 bg-current transition ${open ? "-translate-y-[6px] -rotate-45" : ""}`} />
                  </span>
                </button>
              </div>
            </div>
          </div>

          {open && (
            <nav className="mt-2 grid gap-1 rounded-2xl border border-white/10 bg-[#111111]/95 px-5 py-3 text-white backdrop-blur-xl md:hidden">
              {nav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="min-h-11 py-3 font-bold"
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <a href={`tel:${site.phone}`} className="min-h-11 py-3 font-bold text-mustard">
                {site.phoneDisplay}
              </a>
            </nav>
          )}
        </div>
      )}
    </header>
  );
}
