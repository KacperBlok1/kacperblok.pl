import type { Metadata, Viewport } from "next";
import { Figtree, Fraunces } from "next/font/google";
import { siteConfig, siteCopy } from "@/config/site";
import { htmlLang, localePath, type Locale } from "@/i18n/locales";
import { getDictionary } from "@/i18n/ui";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import "@/app/globals.css";

const fraunces = Fraunces({
  subsets: ["latin", "latin-ext"],
  axes: ["SOFT", "WONK", "opsz"],
  variable: "--font-fraunces",
  display: "swap",
});
const figtree = Figtree({ subsets: ["latin", "latin-ext"], variable: "--font-figtree", display: "swap" });

export const siteViewport: Viewport = { themeColor: "#f5ead8" };

export function siteMetadata(locale: Locale): Metadata {
  const title = `${siteConfig.fullName} – ${siteConfig.role}`;
  const description = siteCopy[locale].description;
  return {
    metadataBase: new URL(siteConfig.url),
    title,
    description,
    alternates: {
      canonical: localePath(locale, "/"),
      languages: { pl: localePath("pl", "/"), en: localePath("en", "/") },
    },
    openGraph: { title, description, type: "website", locale: locale === "pl" ? "pl_PL" : "en_US" },
  };
}

export function SiteShell({ locale, children }: { locale: Locale; children: React.ReactNode }) {
  const t = getDictionary(locale);
  return (
    <html lang={htmlLang[locale]} className={`${fraunces.variable} ${figtree.variable}`}>
      <body>
        <noscript>
          <style>{"[data-reveal]{opacity:1!important;transform:none!important}"}</style>
        </noscript>
        <a
          href="#main"
          className="absolute left-3 -top-16 z-50 rounded-full bg-ink px-4 py-2.5 text-paper no-underline focus:top-3"
        >
          {t.skipToContent}
        </a>
        <Nav locale={locale} />
        {children}
        <Footer locale={locale} />
      </body>
    </html>
  );
}
