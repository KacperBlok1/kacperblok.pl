import { getProjects } from "@/data/projects";
import type { Locale } from "@/i18n/locales";
import { getDictionary } from "@/i18n/ui";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { MagneticGroup } from "@/components/ui/MagneticGroup";

export function SelectedWork({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);
  return (
    <section
      id="work"
      aria-labelledby="work-title"
      className="mx-auto max-w-[1200px] px-[clamp(18px,4vw,40px)] py-[clamp(48px,7vw,88px)]"
    >
      <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
        <SectionHeading id="work-title" index="03" kicker={t.workKicker} title={t.workTitle} size="lg" />
        <p className="max-w-[30ch] text-[15px] text-neutral-700">
          {t.workIntro}
        </p>
      </div>
      <MagneticGroup className="flex flex-wrap gap-7">
        {getProjects(locale).map((project) => (
          <ProjectCard key={project.slug} project={project} locale={locale} />
        ))}
      </MagneticGroup>
    </section>
  );
}
