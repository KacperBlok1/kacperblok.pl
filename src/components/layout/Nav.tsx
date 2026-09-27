import Link from "next/link";
import { siteConfig, siteCopy } from "@/config/site";
import { localePath, type Locale } from "@/i18n/locales";
import { getDictionary } from "@/i18n/ui";
import { LanguageSwitch } from "@/components/layout/LanguageSwitch";
import { MobileMenu } from "@/components/layout/MobileMenu";

export function Nav({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);
  const copy = siteCopy[locale];
  const availability = siteConfig.availableForInternships ? copy.availabilityLabel : null;
  const contact = copy.nav.find((item) => item.href.endsWith("#contact"));

  return (
    <header className="sticky top-0 z-40 border-b border-ink/15 bg-paper/95 backdrop-blur-[2px]">
      <nav
        aria-label={t.navLabel}
        className="relative mx-auto flex max-w-[1200px] flex-wrap items-center justify-between gap-x-4 gap-y-1.5 px-[clamp(18px,4vw,40px)] py-2 md:py-3"
      >
        <Link href={localePath(locale, "/#top")} className="inline-flex min-h-11 items-center font-heading text-xl text-ink no-underline hover:text-ink">
          <span className="flex items-baseline gap-1.5">
            {siteConfig.name}
            <span className="font-body text-sm font-normal text-neutral-700 max-[359px]:hidden">/ Portfolio</span>
          </span>
        </Link>

        {availability && (
          <span className="hidden -rotate-[1.5deg] items-center gap-2 rounded-full border-2 border-ink bg-sage-200 py-1 pl-2 pr-3 text-[13px] font-semibold text-sage-900 lg:inline-flex">
            <span aria-hidden className="size-2.5 rounded-full bg-sage-600 ring-[3px] ring-sage-100" />
            {availability}
          </span>
        )}

        <div className="hidden items-center gap-2 md:flex">
          <ul className="flex flex-wrap gap-1">
            {copy.nav.map((item) => {
              const isContact = item === contact;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`inline-flex min-h-11 items-center rounded-full px-3.5 no-underline transition-colors ${
                      isContact
                        ? "bg-ink text-paper hover:bg-accent-700 hover:text-paper"
                        : "text-accent-700 hover:bg-accent-100 hover:text-accent-800"
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
          <LanguageSwitch locale={locale} />
        </div>

        <div className="flex items-center gap-2 md:hidden">
          {contact && (
            <Link
              href={contact.href}
              className="inline-flex min-h-11 items-center rounded-full bg-ink px-4 text-[15px] text-paper no-underline hover:bg-accent-700 hover:text-paper"
            >
              {contact.label}
            </Link>
          )}
          <LanguageSwitch locale={locale} />
          <MobileMenu items={copy.nav} availability={availability} labels={{ open: t.openMenu, close: t.closeMenu }} />
        </div>
      </nav>
    </header>
  );
}
