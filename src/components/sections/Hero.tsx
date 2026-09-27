import { ArrowRight, Download, Mail, MapPin } from "lucide-react";
import { siteConfig, siteCopy } from "@/config/site";
import type { Locale } from "@/i18n/locales";
import { getDictionary } from "@/i18n/ui";
import { publicFileExists } from "@/lib/files";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { CodeWindow } from "@/components/ui/CodeWindow";
import { Media, Tape } from "@/components/ui/Media";
import { HandArrow } from "@/components/ui/Icons";
import { Reveal } from "@/components/ui/Reveal";

export function Hero({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);
  const { hero } = siteCopy[locale];
  const [line1, line2, line3] = hero.headline;
  const hasCv = publicFileExists(siteConfig.cvPath);

  return (
    <section
      id="top"
      aria-labelledby="hero-title"
      className="mx-auto flex max-w-[1200px] flex-wrap items-center gap-[clamp(40px,6vw,72px)] px-[clamp(18px,4vw,40px)] pb-[clamp(56px,8vw,110px)] pt-[clamp(40px,8vw,96px)]"
    >
      <Reveal className="min-w-0 flex-[1_1_540px]">
        <p className="mb-5 inline-flex items-center gap-2 text-[13px] font-bold uppercase tracking-[0.12em] text-accent-700">
          <span aria-hidden className="h-[3px] w-7 rounded-full bg-accent-500" />
          {hero.kicker}
        </p>
        <h1
          id="hero-title"
          className="mb-7 text-balance text-[clamp(44px,7.4vw,100px)] leading-[1.02] tracking-[-0.025em]"
        >
          {line1}
          <br />
          {line2}
          <br />
          <span className="text-accent-600">{line3}</span>
        </h1>
        <p className="mb-8 max-w-[34ch] text-pretty text-[clamp(18px,1.7vw,21px)] leading-normal text-neutral-800">
          {hero.intro}
        </p>
        <div className="flex flex-wrap gap-3">
          <ButtonLink href="#work" size="lg" className="shadow-stamp">
            {t.seeWork}
            <ArrowRight aria-hidden size={18} strokeWidth={2.75} />
          </ButtonLink>
          {hasCv ? (
            <ButtonLink href={siteConfig.cvPath} size="lg" variant="secondary" download>
              <Download aria-hidden size={18} strokeWidth={2.75} />
              {t.downloadCv}
            </ButtonLink>
          ) : (
            <ButtonLink href={`mailto:${siteConfig.email}?subject=${encodeURIComponent(t.cvSubject)}`} size="lg" variant="secondary">
              <Mail aria-hidden size={18} strokeWidth={2.75} />
              {t.askForCv}
            </ButtonLink>
          )}
        </div>
      </Reveal>

      <Reveal delay={0.15} className="relative min-w-[280px] flex-[0_1_380px] px-6 pb-16 pt-11">
        <figure className="relative rotate-2 rounded-[10px] border-2 border-ink bg-neutral-100 px-3.5 pb-4 pt-3.5 shadow-soft-lg">
          <Tape className="-top-4 left-1/2 h-[30px] w-[110px] -translate-x-1/2 -rotate-[4deg]" />
          {siteConfig.profileImage ? (
            <Media
              src={siteConfig.profileImage}
              alt={`${t.portraitOf} ${siteConfig.fullName}`}
              placeholder="Profile photo (4:5)"
              className="aspect-[4/5] rounded-md"
              sizes="(min-width: 1024px) 360px, 80vw"
              priority
            />
          ) : (
            <CodeWindow title={hero.codeCard.title} lines={hero.codeCard.lines} className="aspect-[4/5] rounded-md" />
          )}
          <figcaption className="mt-3 font-heading text-xl">
            {siteConfig.profileImage ? hero.photoCaption : hero.codeCard.caption}
          </figcaption>
        </figure>

        <span className="absolute -left-2.5 top-2 inline-flex -rotate-[4deg] items-center gap-1.5 rounded-full border-2 border-ink bg-neutral-100 px-3.5 py-1.5 text-sm font-semibold shadow-soft-sm">
          <MapPin aria-hidden size={15} strokeWidth={2.75} className="text-accent-700" />
          {hero.labels.location}
        </span>
        <span className="absolute -right-3.5 top-[46%] hidden max-w-[170px] rotate-3 sm:block rounded-2xl border-2 border-ink bg-sage-300 px-3.5 py-2 text-sm font-semibold leading-snug text-sage-900 shadow-soft-sm">
          {t.currentlyBuilding}
          <br />
          <strong className="font-bold">{hero.labels.building}</strong>
        </span>
        <span className="absolute bottom-2 left-2 -rotate-2 rounded-full bg-ink px-4 py-2 text-sm font-semibold tracking-wide text-paper">
          {hero.labels.focus}
        </span>
        <HandArrow className="absolute -left-16 top-16 hidden text-ink lg:block" />
      </Reveal>
    </section>
  );
}
