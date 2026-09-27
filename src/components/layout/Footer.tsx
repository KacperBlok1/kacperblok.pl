import { siteConfig, siteCopy } from "@/config/site";
import type { Locale } from "@/i18n/locales";
import { getDictionary } from "@/i18n/ui";

export function Footer({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);
  return (
    <footer className="mx-auto flex max-w-[1200px] flex-wrap justify-between gap-3 px-[clamp(18px,4vw,40px)] pb-10 text-sm text-neutral-700">
      <span>
        {siteConfig.fullName} · {siteCopy[locale].location}
      </span>
      <a href="#top" className="-my-3 inline-flex min-h-11 items-center">
        {t.backToTop}
      </a>
    </footer>
  );
}
