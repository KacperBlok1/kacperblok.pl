import { ArrowRight, ArrowUpRight, Check } from "lucide-react";
import type { Project, ProjectImage } from "@/data/projects";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { CodeWindow } from "@/components/ui/CodeWindow";
import { GitHubIcon } from "@/components/ui/Icons";
import { Media, Tape } from "@/components/ui/Media";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { TagList } from "@/components/ui/TagList";
import { magneticCls } from "@/components/ui/magnetic";
import { localePath, type Locale } from "@/i18n/locales";
import { getDictionary } from "@/i18n/ui";

function Actions({ project, locale, sage = false }: { project: Project; locale: Locale; sage?: boolean }) {
  const t = getDictionary(locale);
  return (
    <div className="flex flex-wrap gap-2.5 pt-2">
      {project.codeAvailable !== false ? <ButtonLink href={project.repoUrl} variant={sage ? "sage" : "primary"}>
        <GitHubIcon size={17} />
        GitHub
        <span className="sr-only">{t.repositoryFor} {project.title}</span>
      </ButtonLink> : <span className="self-center text-sm font-semibold text-neutral-700">{t.codeUnavailable}</span>}
      <ButtonLink href={localePath(locale, `/projects/${project.slug}`)} variant="secondary">
        {t.caseStudy}
        <ArrowRight aria-hidden size={15} strokeWidth={2.75} />
        <span className="sr-only">: {project.title}</span>
      </ButtonLink>
      {project.demoUrl && (
        <ButtonLink href={project.demoUrl} variant="ghost">
          {t.liveDemo}
          <ArrowUpRight aria-hidden size={15} strokeWidth={2.75} />
        </ButtonLink>
      )}
    </div>
  );
}

export function Visual({ project, img, className, sizes }: { project: Project; img: ProjectImage; className: string; sizes?: string }) {
  const { preview } = project;
  const { screenshot, ...media } = img;
  if (img.src || !preview) return <Media {...media} washed={!screenshot} className={className} sizes={sizes} />;
  if (preview.kind === "terminal") return <CodeWindow title={preview.title} lines={preview.lines} className={className} />;
  if (preview.kind === "flow") return (
    <div className={`flex flex-col justify-center gap-4 bg-sand p-5 ${className}`}>
      <p className="text-xs font-bold uppercase tracking-wide text-accent-800">{preview.title}</p>
      <ol className="flex flex-col gap-2">
        {preview.lines.map((line, index) => <li key={line} className="flex items-center gap-3 text-sm font-semibold leading-snug">
          <span aria-hidden className="grid size-7 shrink-0 place-items-center rounded-full border border-ink bg-sage-200 text-xs">{index + 1}</span>
          {line.replace(/^\d\s/, "")}
        </li>)}
      </ol>
    </div>
  );
  return (
    <div className={`grid place-items-center bg-neutral-100 text-center ${className}`}>
      <p>
        <span className="block font-heading text-[64px] leading-none">{preview.value}</span>
        <span className="mt-2 block px-6 text-sm font-semibold text-neutral-800">{preview.label}</span>
      </p>
    </div>
  );
}

function Body({ project, locale, titleSize = "md", tagTone = "neutral", copyCls = "text-neutral-800" }: {
  project: Project;
  locale: Locale;
  titleSize?: "md" | "lg";
  tagTone?: "neutral" | "accent" | "sage";
  copyCls?: string;
}) {
  const t = getDictionary(locale);
  const titleId = `project-${project.slug}`;
  return (
    <>
      <StatusBadge status={project.status} locale={locale} />
      <h3 id={titleId} className={titleSize === "lg" ? "text-[clamp(30px,3.6vw,44px)]" : "text-[32px]"}>
        {project.title}
      </h3>
      <div>
        <p className="mb-1 text-[13px] font-bold uppercase tracking-[0.1em] text-neutral-700">{t.purpose}</p>
        <p className={`text-pretty text-[17px] ${copyCls}`}>{project.description}</p>
      </div>
      <ul aria-label={t.highlights} className="flex flex-col gap-1.5 text-[15px]">
        {project.highlights.map((item) => (
          <li key={item} className={`flex gap-2 ${copyCls}`}>
            <Check aria-hidden size={16} strokeWidth={2.75} className="mt-[5px] flex-none" />
            <span className="text-pretty">{item}</span>
          </li>
        ))}
      </ul>
      <TagList items={project.tech} tone={tagTone} label={t.techStack} />
    </>
  );
}

export function ProjectCard({ project, locale }: { project: Project; locale: Locale }) {
  const titleId = `project-${project.slug}`;
  const [img, img2] = project.images;

  switch (project.layout) {
    case "feature":
      return (
        <article data-tilt="0.45" aria-labelledby={titleId} className={`${magneticCls} flex flex-[1_1_100%] flex-wrap gap-[clamp(22px,4vw,44px)] rounded-[36px] border-2 border-ink bg-sand p-[clamp(20px,3vw,32px)]`}>
          <div className="relative min-w-0 flex-[1.3_1_420px]">
            <Visual project={project} img={img} className="aspect-[16/10] rounded-[22px] border-2 border-ink" />
            <Tape tone="sage" className="-top-3 right-7 h-[26px] w-[90px] rotate-6" />
          </div>
          <div className="flex min-w-0 flex-[1_1_320px] flex-col gap-4 py-1.5">
            <Body project={project} locale={locale} titleSize="lg" />
            <div className="mt-auto">
              <Actions project={project} locale={locale} />
            </div>
          </div>
        </article>
      );

    case "compact":
      return (
        <article data-tilt="0.45" aria-labelledby={titleId} className={`${magneticCls} flex min-w-0 flex-[1_1_340px] -rotate-[0.8deg] flex-col gap-4 rounded-[36px] border-2 border-ink bg-neutral-100 p-[clamp(20px,3vw,28px)]`}>
          <Visual project={project} img={img} className="aspect-[4/3] rounded-[22px] border-2 border-ink" />
          <Body project={project} locale={locale} tagTone="accent" />
          <div className="mt-auto">
            <Actions project={project} locale={locale} />
          </div>
        </article>
      );

    case "circle":
      return (
        <article data-tilt="0.45" aria-labelledby={titleId} className={`${magneticCls} flex min-w-0 flex-[1.7_1_480px] rotate-[0.6deg] flex-wrap items-center gap-7 rounded-[36px_90px_36px_36px] border-2 border-ink bg-sage-200 p-[clamp(20px,3vw,32px)]`}>
          <div className="relative mx-auto w-[min(100%,250px)] flex-none">
            <Visual project={project} img={img} className="aspect-square rounded-full border-2 border-ink" sizes="250px" />
            {project.sticker && (
              <span aria-hidden className="absolute -right-1.5 bottom-1 -rotate-6 rounded-full border-2 border-ink bg-neutral-100 px-3 py-1.5 text-[13px] font-bold">
                {project.sticker}
              </span>
            )}
          </div>
          <div className="flex min-w-0 flex-[1_1_260px] flex-col gap-4">
            <Body project={project} locale={locale} tagTone="sage" copyCls="text-sage-900" />
            <Actions project={project} locale={locale} sage />
          </div>
        </article>
      );

    case "phones":
      return (
        <article data-tilt="0.45" aria-labelledby={titleId} className={`${magneticCls} flex flex-[1_1_100%] flex-wrap-reverse items-center gap-[clamp(24px,5vw,64px)] rounded-[36px] border-2 border-ink bg-accent-100 p-[clamp(22px,4vw,48px)]`}>
          <div className="flex min-w-0 flex-[1_1_380px] flex-col gap-4">
            <Body project={project} locale={locale} titleSize="lg" tagTone="accent" />
            <Actions project={project} locale={locale} />
          </div>
          <div className="mx-auto flex min-w-0 flex-[0_1_340px] justify-center gap-[5%] pb-7">
            <Visual project={project} img={img} className="aspect-[9/19] w-[50%] -rotate-3 rounded-[34px] border-[6px] border-ink shadow-soft-md" sizes="170px" />
            {img2 && (
              <Visual project={project} img={img2} className="aspect-[9/19] w-[44%] translate-y-7 rotate-[4deg] rounded-[30px] border-[6px] border-ink shadow-soft-md" sizes="150px" />
            )}
          </div>
        </article>
      );
  }
}
