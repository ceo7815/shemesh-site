"use client";

import { useEffect, useRef } from "react";

type Orb = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  m: number;
  shine: number;
};

function spawn(width: number, height: number): Orb[] {
  const sizes = [22, 28, 34, 42, 52, 64, 78, 92, 110];
  const orbs: Orb[] = [];

  for (const r of sizes) {
    let placed = false;
    for (let attempt = 0; attempt < 40 && !placed; attempt += 1) {
      const x = r + Math.random() * Math.max(1, width - r * 2);
      const y = r + Math.random() * Math.max(1, height - r * 2);
      const hits = orbs.some((o) => Math.hypot(o.x - x, o.y - y) < o.r + r + 8);
      if (hits) continue;

      const speed = 0.4 + Math.random() * 0.38;
      const angle = Math.random() * Math.PI * 2;
      orbs.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        r,
        m: r * r,
        shine: 0.12 + Math.random() * 0.1,
      });
      placed = true;
    }
  }

  return orbs;
}

function bounceWalls(orb: Orb, width: number, height: number) {
  if (orb.x - orb.r < 0) {
    orb.x = orb.r;
    orb.vx = Math.abs(orb.vx);
  } else if (orb.x + orb.r > width) {
    orb.x = width - orb.r;
    orb.vx = -Math.abs(orb.vx);
  }

  if (orb.y - orb.r < 0) {
    orb.y = orb.r;
    orb.vy = Math.abs(orb.vy);
  } else if (orb.y + orb.r > height) {
    orb.y = height - orb.r;
    orb.vy = -Math.abs(orb.vy);
  }
}

function collide(a: Orb, b: Orb) {
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  const dist = Math.hypot(dx, dy);
  const min = a.r + b.r;
  if (dist === 0 || dist >= min) return;

  const nx = dx / dist;
  const ny = dy / dist;
  const overlap = min - dist;
  const mass = a.m + b.m;
  a.x -= nx * overlap * (b.m / mass);
  a.y -= ny * overlap * (b.m / mass);
  b.x += nx * overlap * (a.m / mass);
  b.y += ny * overlap * (a.m / mass);

  const velAlong = (a.vx - b.vx) * nx + (a.vy - b.vy) * ny;
  if (velAlong <= 0) return;

  const impulse = (1.88 * velAlong) / (1 / a.m + 1 / b.m);
  a.vx -= (impulse / a.m) * nx;
  a.vy -= (impulse / a.m) * ny;
  b.vx += (impulse / b.m) * nx;
  b.vy += (impulse / b.m) * ny;
}

function capSpeed(orb: Orb) {
  const speed = Math.hypot(orb.vx, orb.vy);
  const min = 0.32;
  const max = 0.95;
  if (speed > max) {
    orb.vx = (orb.vx / speed) * max;
    orb.vy = (orb.vy / speed) * max;
  } else if (speed < min && speed > 0) {
    orb.vx = (orb.vx / speed) * min;
    orb.vy = (orb.vy / speed) * min;
  }
}

export function GoldOrbs() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const reduced =
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      document.documentElement.classList.contains("a11y-motion");
    if (reduced) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const parent = canvas.parentElement;
    if (!parent) return;

    let width = 0;
    let height = 0;
    let orbs: Orb[] = [];
    let running = false;
    let visible = false;
    let frame = 0;

    const resize = () => {
      const nextW = parent.clientWidth;
      const nextH = parent.clientHeight;
      if (!nextW || !nextH) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(nextW * dpr);
      canvas.height = Math.round(nextH * dpr);
      canvas.style.width = `${nextW}px`;
      canvas.style.height = `${nextH}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      if (!orbs.length) {
        orbs = spawn(nextW, nextH);
      } else if (width && height) {
        const sx = nextW / width;
        const sy = nextH / height;
        for (const orb of orbs) {
          orb.x *= sx;
          orb.y *= sy;
        }
      }

      width = nextW;
      height = nextH;
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      for (const orb of orbs) {
        const glow = ctx.createRadialGradient(
          orb.x - orb.r * 0.28,
          orb.y - orb.r * 0.3,
          orb.r * 0.08,
          orb.x,
          orb.y,
          orb.r,
        );
        glow.addColorStop(0, `rgba(255, 224, 138, ${orb.shine + 0.08})`);
        glow.addColorStop(0.42, `rgba(212, 160, 23, ${orb.shine})`);
        glow.addColorStop(1, "rgba(212, 160, 23, 0)");
        ctx.beginPath();
        ctx.fillStyle = glow;
        ctx.arc(orb.x, orb.y, orb.r, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const tick = () => {
      if (!running) return;
      for (const orb of orbs) {
        orb.x += orb.vx;
        orb.y += orb.vy;
        bounceWalls(orb, width, height);
      }
      for (let i = 0; i < orbs.length; i += 1) {
        for (let j = i + 1; j < orbs.length; j += 1) {
          collide(orbs[i], orbs[j]);
        }
      }
      for (const orb of orbs) capSpeed(orb);
      draw();
      frame = window.requestAnimationFrame(tick);
    };

    const start = () => {
      if (
        running ||
        !visible ||
        document.documentElement.classList.contains("a11y-motion")
      ) {
        return;
      }
      running = true;
      frame = window.requestAnimationFrame(tick);
    };

    const stop = () => {
      running = false;
      window.cancelAnimationFrame(frame);
    };

    resize();

    const ro = new ResizeObserver(resize);
    ro.observe(parent);

    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        if (visible) start();
        else stop();
      },
      { threshold: 0.05 },
    );
    io.observe(parent);

    const onVis = () => {
      if (document.hidden) stop();
      else if (visible) start();
    };
    document.addEventListener("visibilitychange", onVis);

    const mo = new MutationObserver(() => {
      if (document.documentElement.classList.contains("a11y-motion")) {
        stop();
        ctx.clearRect(0, 0, width, height);
      } else if (visible && !document.hidden) {
        start();
      }
    });
    mo.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => {
      stop();
      ro.disconnect();
      io.disconnect();
      mo.disconnect();
      document.removeEventListener("visibilitychange", onVis);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="about-orbs"
      aria-hidden
    />
  );
}
