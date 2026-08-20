import type { ReactNode } from "react";
import { CookieBanner } from "@/components/CookieBanner";
import { FloatDock } from "@/components/FloatDock";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";

export function SiteChrome({ children }: { children: ReactNode }) {
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:right-4 focus:top-4 focus:z-50 focus:bg-cream focus:px-4 focus:py-2"
      >
        דלג לתוכן
      </a>
      <Header />
      <main id="main">{children}</main>
      <Footer />
      <FloatDock />
      <CookieBanner />
    </>
  );
}
