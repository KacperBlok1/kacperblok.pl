"use client";

import { usePathname } from "next/navigation";
import { switchLocale, type Locale } from "@/i18n/locales";
import { getDictionary } from "@/i18n/ui";

export function LanguageSwitch({ locale }: { locale: Locale }) {
  const pathname = usePathname() ?? "/";
  const target: Locale = locale === "pl" ? "en" : "pl";
  const t = getDictionary(locale);

  return (
    <a
      href={switchLocale(pathname, target)}
      hrefLang={target}
      lang={target}
      aria-label={t.switchLanguage}
      title={t.switchLanguage}
      className="inline-flex size-11 flex-none items-center justify-center rounded-full border-2 border-ink bg-neutral-100 text-[13px] font-bold tracking-wide text-ink no-underline transition-colors hover:bg-accent-200 hover:text-ink"
    >
      {t.switchLanguageShort}
    </a>
  );
}
