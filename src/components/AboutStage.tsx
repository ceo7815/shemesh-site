"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { GoldOrbs } from "@/components/GoldOrbs";

export function AboutStage({
  id,
  className = "",
  children,
}: {
  id?: string;
  className?: string;
  children: ReactNode;
}) {
  const ref = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.22 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      id={id}
      className={`about-stage ${inView ? "is-in" : ""} ${className}`}
    >
      <GoldOrbs />
      <div className="about-stage-inner">{children}</div>
    </section>
  );
}
