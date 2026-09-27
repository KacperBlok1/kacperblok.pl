import { HardDrive, Monitor, ScanFace, Server } from "lucide-react";
import { buildAreas, type BuildArea, type Tone } from "@/data/about";
import type { Locale } from "@/i18n/locales";
import { getDictionary } from "@/i18n/ui";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

const icons: Record<BuildArea["icon"], typeof Monitor> = {
  monitor: Monitor,
  server: Server,
  "scan-face": ScanFace,
  "hard-drive": HardDrive,
};

const iconBg: Record<Tone, string> = {
  accent: "bg-accent-300",
  sage: "bg-sage-300",
  paper: "bg-accent-200",
  sand: "bg-sand",
};

export function WhatIBuild({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);
  return (
    <section
      aria-labelledby="build-title"
      className="mx-auto max-w-[1200px] px-[clamp(18px,4vw,40px)] py-[clamp(48px,7vw,88px)]"
    >
      <SectionHeading id="build-title" index="02" kicker={t.toolboxKicker} title={t.toolboxTitle} className="mb-9" />
      <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,260px),1fr))] gap-[22px]">
        {buildAreas[locale].map((area, i) => {
          const Icon = icons[area.icon];
          return (
            <Reveal key={area.title} delay={i * 0.06}>
              <article
                className={`flex h-full flex-col gap-3.5 rounded-[32px] border-2 border-ink bg-neutral-100 px-7 py-[30px] transition-transform duration-200 hover:-translate-y-1 ${
                  i % 2 ? "hover:rotate-[0.6deg]" : "hover:-rotate-[0.6deg]"
                }`}
              >
                <span aria-hidden className={`grid size-16 place-items-center rounded-full border-2 border-ink ${iconBg[area.tone]}`}>
                  <Icon size={30} strokeWidth={2.75} />
                </span>
                <h3 className="mt-1.5 text-[28px]">{area.title}</h3>
                <p className="text-neutral-800">{area.copy}</p>
              </article>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
