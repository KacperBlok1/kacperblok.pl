import { siteCopy } from "@/config/site";
import { snapshots } from "@/data/about";
import type { Locale } from "@/i18n/locales";
import { getDictionary } from "@/i18n/ui";
import { Media, Tape } from "@/components/ui/Media";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

const tilt = ["-rotate-3", "rotate-2 translate-y-4", "-rotate-[1.5deg]"];
const tapeTones = ["sage", "accent", "neutral"] as const;

export function OutsideTerminal({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);
  const { outside } = siteCopy[locale];
  const photos = snapshots[locale].filter((snap) => snap.src);
  return (
    <section
      aria-labelledby="outside-title"
      className="mx-auto flex max-w-[1200px] flex-wrap items-center gap-[clamp(32px,5vw,64px)] px-[clamp(18px,4vw,40px)] py-[clamp(48px,7vw,88px)]"
    >
      <div className="min-w-0 flex-[1_1_360px]">
        <SectionHeading id="outside-title" index="05" kicker={t.personalKicker} title={outside.title} tone="sage" className="mb-5" />
        <p className="max-w-[42ch] text-pretty text-[19px] text-neutral-800">{outside.copy}</p>
      </div>
      {photos.length > 0 && (
        <Reveal className="flex min-w-0 flex-[1_1_420px] flex-wrap justify-center gap-[18px] pb-5 pt-2.5">
          {photos.map((snap, i) => (
            <figure
              key={snap.id}
              className={`relative w-[150px] rounded-lg border-2 border-ink bg-neutral-100 px-2 pb-2.5 pt-2 shadow-soft-sm ${tilt[i % tilt.length]}`}
            >
              <Tape tone={tapeTones[i % tapeTones.length]} className="-top-2.5 left-1/2 h-5 w-[60px] -translate-x-1/2 rotate-3" />
              <Media src={snap.src} alt={snap.alt} placeholder={snap.placeholder} className="aspect-square rounded" sizes="150px" />
              <figcaption className="mt-1.5 text-sm font-semibold text-neutral-800">{snap.caption}</figcaption>
            </figure>
          ))}
        </Reveal>
      )}
    </section>
  );
}
