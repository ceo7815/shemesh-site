"use client";

import { useEffect, useRef, useState } from "react";

export function SectionHeading({
  kicker,
  title,
  light = false,
  align = "right",
}: {
  kicker?: string;
  title: string;
  light?: boolean;
  align?: "right" | "center";
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.4 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={align === "center" ? "text-center" : "text-right"}
    >
      {kicker ? (
        <p
          className={`text-sm font-bold tracking-[0.18em] text-mustard ${
            visible ? "rise" : "opacity-0"
          }`}
        >
          {kicker}
        </p>
      ) : null}
      <h2
        className={`mt-2 text-4xl font-extrabold sm:text-5xl ${
          light ? "text-white" : "text-ink"
        } ${visible ? "rise" : "opacity-0"}`}
        style={{ animationDelay: "80ms" }}
      >
        {title}
      </h2>
      <span
        className={`heading-run mt-4 block h-[3px] w-24 rounded-full ${
          align === "center" ? "mx-auto" : ""
        } ${visible ? "is-on" : ""}`}
      />
    </div>
  );
}
