"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { heroSlides, site } from "@/lib/site";

export function Hero() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const go = useCallback((next: number) => {
    setIndex((next + heroSlides.length) % heroSlides.length);
  }, []);

  useEffect(() => {
    if (paused) return;
    const id = window.setInterval(() => go(index + 1), 4000);
    return () => window.clearInterval(id);
  }, [index, paused, go]);

  return (
    <section
      id="top"
      className="relative h-svh min-h-svh overflow-hidden bg-deep text-white max-md:h-[100dvh] max-md:min-h-[100dvh]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {heroSlides.map((src, i) => (
        <div
          key={src}
          className={`absolute inset-0 transition-opacity duration-[1100ms] ease-out ${
            i === index ? "opacity-100" : "opacity-0"
          }`}
        >
          <Image
            src={src}
            alt=""
            fill
            priority={i === 0}
            sizes="100vw"
            className={`object-cover ${i === index ? "hero-ken" : ""}`}
          />
        </div>
      ))}

      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/78" />

      <div className="relative z-10 mx-auto flex h-full max-w-6xl flex-col items-center justify-center px-4 text-center sm:px-5 max-md:pt-8 max-md:pb-28 max-md:-translate-y-6">
        <p
          className="rise mb-4 text-sm font-bold tracking-[0.22em] text-mustard max-sm:mb-2 max-sm:tracking-[0.1em]"
          style={{ animationDelay: "40ms" }}
        >
          {site.heroKicker}
        </p>
        <h1 className="rise max-w-4xl whitespace-pre-line text-4xl font-extrabold leading-[1.15] max-sm:text-[1.7rem] sm:text-6xl">
          {site.heroHeadline}
        </h1>
        <p
          className="rise mt-5 max-w-2xl text-base font-medium leading-8 text-white/90 max-sm:mt-3 max-sm:text-[0.95rem] max-sm:leading-7 sm:text-xl"
          style={{ animationDelay: "120ms" }}
        >
          {site.heroSub}
        </p>
        <a
          href={`tel:${site.phone}`}
          className="btn-gold rise mt-8 h-12 rounded-full px-8 text-base max-sm:mt-5 max-sm:h-11 max-sm:px-7"
          style={{ animationDelay: "220ms" }}
        >
          התקשרו אלינו
        </a>

        <div className="mt-10 flex items-center gap-2 max-sm:mt-6">
          {heroSlides.map((src, i) => (
            <button
              key={src}
              type="button"
              aria-label={`תמונה ${i + 1}`}
              onClick={() => go(i)}
              className={`h-2 rounded-full transition-all ${
                i === index ? "w-8 bg-mustard" : "w-2 bg-white/45 hover:bg-white/80"
              }`}
            />
          ))}
        </div>
      </div>

      <a
        href="#lead"
        className="absolute bottom-16 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2 text-[#d8d8d8] transition hover:text-white max-md:bottom-5"
      >
        <span className="text-sm font-bold tracking-[0.28em]">גלול</span>
        <span className="relative h-12 w-8 overflow-hidden" aria-hidden>
          <span className="scroll-chevron absolute left-1/2 top-0">
            <svg viewBox="0 0 24 12" className="h-4 w-7 fill-none stroke-current">
              <path d="M3 2l9 7 9-7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
          <span className="scroll-chevron scroll-chevron-2 absolute left-1/2 top-3">
            <svg viewBox="0 0 24 12" className="h-4 w-7 fill-none stroke-current">
              <path d="M3 2l9 7 9-7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
          <span className="scroll-chevron scroll-chevron-3 absolute left-1/2 top-6">
            <svg viewBox="0 0 24 12" className="h-4 w-7 fill-none stroke-current">
              <path d="M3 2l9 7 9-7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        </span>
      </a>
    </section>
  );
}
