import type { Metadata, Viewport } from "next";
import { Rubik } from "next/font/google";
import { site } from "@/lib/site";
import "./globals.css";

const rubik = Rubik({
  variable: "--font-rubik",
  subsets: ["hebrew", "latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

const ogImage = {
  url: "/og.png",
  width: 1200,
  height: 630,
  alt: site.name,
};

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: site.shareTitle,
  description: site.shareDescription,
  applicationName: site.name,
  icons: {
    icon: [{ url: "/apple-touch-icon.png", type: "image/png", sizes: "512x512" }],
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    type: "website",
    locale: "he_IL",
    url: "/",
    siteName: site.name,
    title: site.shareTitle,
    description: site.shareDescription,
    images: [ogImage],
  },
  twitter: {
    card: "summary_large_image",
    title: site.shareTitle,
    description: site.shareDescription,
    images: ["/og.png"],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#0c0b0a",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="he" dir="rtl" className={`${rubik.variable} h-full antialiased`}>
      <body className="min-h-full bg-cream font-sans text-ink">{children}</body>
    </html>
  );
}
