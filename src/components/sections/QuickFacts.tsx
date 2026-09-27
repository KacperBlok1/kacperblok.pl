import { quickFacts, type Tone } from "@/data/about";
import type { Locale } from "@/i18n/locales";
import { getDictionary } from "@/i18n/ui";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { MagneticGroup } from "@/components/ui/MagneticGroup";
import { magneticCls } from "@/components/ui/magnetic";

const toneCls: Record<Tone, { card: string; label: string }> = {
  accent: { card: "bg-accent-200", label: "text-accent-800" },
  paper: { card: "bg-neutral-100", label: "text-neutral-700" },
  sage: { card: "bg-sage-300", label: "text-sage-900" },
  sand: { card: "bg-sand", label: "text-neutral-700" },
};

const shapes = [
  "flex-[1_1_230px] -rotate-[1.5deg] rounded-[28px]",
  "flex-[1.4_1_300px] rotate-1 rounded-[28px_60px_28px_28px] md:mt-[18px]",
  "flex-[1.2_1_260px] -rotate-[0.5deg] rounded-[28px]",
  "flex-[1_1_260px] rotate-[1.5deg] rounded-[60px_28px_28px_28px] md:mt-2.5",
];

export function QuickFacts({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);
  return (
    <section
      id="about"
      aria-labelledby="facts-title"
      className="mx-auto max-w-[1200px] px-[clamp(18px,4vw,40px)] py-[clamp(40px,6vw,72px)]"
    >
      <SectionHeading id="facts-title" index="01" kicker={t.aboutKicker} title={t.aboutTitle} className="mb-9" />
      <MagneticGroup>
      <ul className="flex flex-wrap items-start gap-[22px]">
        {quickFacts[locale].map((fact, i) => (
          <li key={fact.label} data-tilt="1" className={`${magneticCls} border-2 border-ink p-[26px] ${toneCls[fact.tone].card} ${shapes[i % shapes.length]}`}>
            <Reveal delay={i * 0.05}>
              <p className={`mb-2.5 text-[13px] font-bold uppercase tracking-[0.1em] ${toneCls[fact.tone].label}`}>
                {fact.label}
              </p>
              <p className="font-heading text-[26px] leading-[1.15]">{fact.value}</p>
            </Reveal>
          </li>
        ))}
      </ul>
      </MagneticGroup>
    </section>
  );
}
