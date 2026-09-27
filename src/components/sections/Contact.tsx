import { Mail } from "lucide-react";
import { siteConfig, siteCopy } from "@/config/site";
import type { Locale } from "@/i18n/locales";
import { getDictionary } from "@/i18n/ui";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { GitHubIcon, LinkedInIcon } from "@/components/ui/Icons";
import { Reveal } from "@/components/ui/Reveal";

export function Contact({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);
  const { contact } = siteCopy[locale];
  return (
    <section
      id="contact"
      aria-labelledby="contact-title"
      className="mx-auto max-w-[1200px] px-[clamp(18px,4vw,40px)] pb-[clamp(64px,9vw,120px)] pt-[clamp(48px,7vw,88px)]"
    >
      <Reveal>
        <div className="relative rounded-[32px_32px_32px_72px] border-2 border-ink bg-accent-300 px-[clamp(20px,5vw,64px)] pb-[clamp(36px,5vw,64px)] pt-[clamp(32px,5vw,64px)] sm:rounded-[44px_44px_44px_120px]">
          <span aria-hidden className="absolute -top-[22px] right-[clamp(20px,6vw,70px)] rotate-[5deg] rounded-full border-2 border-ink bg-sage-300 px-4 py-2 text-sm font-bold">
            {contact.sticker}
          </span>
          <p className="mb-2.5 text-[13px] font-bold uppercase tracking-[0.12em] text-accent-900">06 · {t.contactKicker}</p>
          <h2 id="contact-title" className="mb-5 max-w-[13ch] text-[clamp(34px,6.4vw,84px)] leading-[1.02]">
            {contact.heading}
          </h2>
          <p className="mb-8 max-w-[44ch] text-pretty text-[17px] text-accent-900 sm:text-[19px]">{contact.copy}</p>
          <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
            <ButtonLink
              href={`mailto:${siteConfig.email}`}
              variant="dark"
              size="lg"
              className="shadow-[3px_3px_0_var(--color-neutral-100)] max-sm:px-4 max-sm:text-[15px]"
            >
              <Mail aria-hidden size={19} strokeWidth={2.75} className="flex-none" />
              <span className="min-w-0 [overflow-wrap:anywhere]">{siteConfig.email}</span>
            </ButtonLink>
            <ButtonLink href={siteConfig.github.url} variant="secondary" size="lg">
              <GitHubIcon />
              GitHub
            </ButtonLink>
            <ButtonLink href={siteConfig.linkedin} variant="secondary" size="lg">
              <LinkedInIcon />
              LinkedIn
            </ButtonLink>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
