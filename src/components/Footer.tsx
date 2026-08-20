import Link from "next/link";
import { CookieSettingsButton } from "@/components/CookieBanner";
import { SiteLogo } from "@/components/SiteLogo";
import { legalNav, nav, site } from "@/lib/site";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-deep px-5 pb-10 pt-16 text-cream/70">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-8 lg:grid-cols-[1.4fr_repeat(3,minmax(0,1fr))] lg:gap-10">
        <div className="col-span-2 text-center lg:col-span-1 lg:text-right">
          <Link href="/" className="inline-block">
            <SiteLogo size="footer" />
          </Link>
          <p className="mx-auto mt-4 max-w-sm text-sm leading-7 lg:mx-0">{site.tagline}</p>
        </div>

        <nav aria-label="ניווט באתר">
          <p className="text-xs font-extrabold tracking-[0.18em] text-mustard">
            ניווט
          </p>
          <ul className="mt-4 grid gap-2.5 text-sm">
            {nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="footer-link">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <p className="text-xs font-extrabold tracking-[0.18em] text-mustard">
            יצירת קשר
          </p>
          <ul className="mt-4 grid gap-2.5 text-sm">
            <li>
              <a href={`tel:${site.phone}`} className="footer-link" dir="ltr">
                {site.phoneDisplay}
              </a>
            </li>
            <li>
              <a
                href={`https://api.whatsapp.com/send?phone=${site.whatsapp}`}
                className="footer-link"
                target="_blank"
                rel="noreferrer"
              >
                WhatsApp
              </a>
            </li>
            <li>
              <a
                href={site.mapsUrl}
                className="footer-link"
                target="_blank"
                rel="noreferrer"
              >
                {site.address}
              </a>
            </li>
            <li>{site.hours}</li>
          </ul>
        </div>

        <nav aria-label="מידע משפטי" className="col-span-2 lg:col-span-1">
          <p className="text-xs font-extrabold tracking-[0.18em] text-mustard">
            מידע משפטי
          </p>
          <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm lg:grid lg:gap-2.5">
            {legalNav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="footer-link">
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <CookieSettingsButton className="footer-link" />
            </li>
          </ul>
        </nav>
      </div>

      <div className="gold-line mx-auto my-10 max-w-6xl" />

      <div className="mx-auto flex max-w-6xl flex-col items-center gap-3 text-center text-xs sm:flex-row sm:items-center sm:justify-between sm:text-right">
        <p>
          כל הזכויות שמורות ל-{site.name} © {year}
        </p>
        <nav aria-label="מסמכים משפטיים" className="flex flex-wrap justify-center gap-x-5 gap-y-2 sm:justify-start">
          {legalNav.map((item) => (
            <Link key={item.href} href={item.href} className="footer-link font-bold">
              {item.label}
            </Link>
          ))}
          <CookieSettingsButton className="footer-link font-bold" />
        </nav>
      </div>
    </footer>
  );
}
