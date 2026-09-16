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
  url: "/og-share.jpg",
  width: 1200,
  height: 630,
  alt: site.name,
  type: "image/jpeg",
};

const shareImage = `${site.url}/og-share.jpg`;

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: site.shareTitle,
  description: site.shareDescription,
  applicationName: site.name,
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
    images: [shareImage],
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
      <head>
        <meta property="og:title" content={site.shareTitle} />
        <meta property="og:description" content={site.shareDescription} />
        <meta property="og:image" content={shareImage} />
        <meta property="og:image:secure_url" content={shareImage} />
        <meta property="og:image:type" content="image/jpeg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:url" content={`${site.url}/`} />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content={shareImage} />
        <link rel="image_src" href={shareImage} />
      </head>
      <body className="min-h-full bg-cream font-sans text-ink">{children}</body>
    </html>
  );
}
