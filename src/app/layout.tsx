import type { Metadata, Viewport } from "next";
import { Rubik } from "next/font/google";
import { ConstructionScreen } from "@/components/ConstructionScreen";
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

const pageTitle = site.constructionMode ? "האתר בשיפוצים | שמש מימוש זכויות" : site.shareTitle;
const pageDescription = site.constructionMode
  ? "האתר בשיפוצים כרגע. נשוב לפעילות בהקדם, עד להודעה חדשה."
  : site.shareDescription;

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: pageTitle,
  description: pageDescription,
  applicationName: site.name,
  openGraph: {
    type: "website",
    locale: "he_IL",
    url: "/",
    siteName: site.name,
    title: pageTitle,
    description: pageDescription,
    images: [ogImage],
  },
  twitter: {
    card: "summary_large_image",
    title: pageTitle,
    description: pageDescription,
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
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
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
      <body className="min-h-full bg-cream font-sans text-ink">
        {site.constructionMode ? <ConstructionScreen /> : children}
      </body>
    </html>
  );
}
