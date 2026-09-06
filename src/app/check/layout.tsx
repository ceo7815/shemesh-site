import type { Metadata } from "next";
import { Heebo } from "next/font/google";
import Script from "next/script";
import { checkMeta, META_PIXEL_ID } from "@/lib/checkLanding";
import "./check.css";

const heebo = Heebo({
  subsets: ["hebrew", "latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-heebo",
});

export const metadata: Metadata = {
  title: checkMeta.title,
  description: checkMeta.description,
  openGraph: {
    title: checkMeta.title,
    description: checkMeta.description,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: checkMeta.title,
    description: checkMeta.description,
  },
};

export default function CheckLayout({ children }: LayoutProps<"/check">) {
  return (
    <div className={`check-lp ${heebo.className}`}>
      <Script id="meta-pixel" strategy="afterInteractive">
        {`
!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '${META_PIXEL_ID}');
fbq('track', 'PageView');
        `}
      </Script>
      <noscript>
        <img
          height="1"
          width="1"
          style={{ display: "none" }}
          alt=""
          src={`https://www.facebook.com/tr?id=${META_PIXEL_ID}&ev=PageView&noscript=1`}
        />
      </noscript>
      {children}
    </div>
  );
}
