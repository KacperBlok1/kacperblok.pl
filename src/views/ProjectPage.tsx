import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, ArrowUpRight, Check } from "lucide-react";
import { siteConfig } from "@/config/site";
import { getProjects, projects } from "@/data/projects";
import { localePath, type Locale } from "@/i18n/locales";
import { getDictionary } from "@/i18n/ui";
import { Visual } from "@/components/projects/ProjectCard";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { CodeWindow } from "@/components/ui/CodeWindow";
import { GitHubIcon } from "@/components/ui/Icons";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { TagList } from "@/components/ui/TagList";
import { pageMetadata, projectDescriptions } from "@/lib/seo";

export function projectStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export function projectMetadata(locale: Locale, slug: string): Metadata {
  const project = getProjects(locale).find((item) => item.slug === slug);
  if (!project) return {};
  const title = `${project.title} – ${siteConfig.fullName}`;
  const path = `/projects/${slug}`;
  return pageMetadata(locale, path, title, projectDescriptions[slug]?.[locale] ?? project.description);
}

const wrap = "mx-auto max-w-[1200px] px-[clamp(18px,4vw,40px)]";

function Kicker({ children }: { children: React.ReactNode }) {
  return <p className="mb-2 text-[13px] font-bold uppercase tracking-[0.12em] text-accent-700">{children}</p>;
}

export function ProjectPage({ locale, slug }: { locale: Locale; slug: string }) {
  const t = getDictionary(locale);
  const list = getProjects(locale);
  const project = list.find((item) => item.slug === slug);
  if (!project) notFound();

  const { details } = project;
  const index = list.indexOf(project);
  const next = list[(index + 1) % list.length];
  const [firstShot] = details.screenshots;
  const img =
    project.layout === "phones" && firstShot
      ? { src: firstShot.src, alt: firstShot.alt, placeholder: "", screenshot: true }
      : project.images[0];

  return (
    <main id="main">
      <article aria-labelledby="project-title">
        {/* Header */}
        <header id="top" className={`${wrap} pb-[clamp(40px,6vw,72px)] pt-[clamp(20px,4vw,40px)]`}>
          <Link
            href={localePath(locale, "/#work")}
            className="-ml-2 mb-[clamp(20px,4vw,40px)] inline-flex min-h-11 items-center gap-1.5 rounded-full px-2 font-semibold no-underline hover:bg-accent-100"
          >
            <ArrowLeft aria-hidden size={17} strokeWidth={2.75} />
            {t.allProjects}
          </Link>

          <div className="flex flex-wrap items-center gap-[clamp(28px,5vw,64px)]">
            <div className="flex min-w-0 flex-[1_1_440px] flex-col items-start gap-5">
              <Kicker>
                {t.project} · {String(index + 1).padStart(2, "0")}
              </Kicker>
              <StatusBadge status={project.status} locale={locale} />
              <h1 id="project-title" className="text-balance text-[clamp(40px,6.4vw,84px)] leading-[1.02] tracking-[-0.02em]">
                {project.title}
              </h1>
              <p className="max-w-[46ch] text-pretty text-[clamp(18px,1.7vw,21px)] leading-normal text-neutral-800">
                {details.overview}
              </p>
              <div className="flex w-full flex-col gap-3 pt-1 sm:w-auto sm:flex-row sm:flex-wrap">
                {project.codeAvailable !== false ? <ButtonLink href={project.repoUrl} size="lg" className="shadow-stamp">
                  <GitHubIcon />
                  {t.viewCode}
                </ButtonLink> : <span className="self-center text-sm font-semibold">{t.codeUnavailable}</span>}
                {project.demoUrl ? (
                  <ButtonLink href={project.demoUrl} size="lg" variant="secondary">
                    {t.liveDemo}
                    <ArrowUpRight aria-hidden size={18} strokeWidth={2.75} />
                  </ButtonLink>
                ) : project.codeAvailable !== false ? (
                  <ButtonLink href="#run" size="lg" variant="secondary">
                    {t.runLocally}
                    <ArrowRight aria-hidden size={18} strokeWidth={2.75} />
                  </ButtonLink>
                ) : null}
              </div>
            </div>
            {img && (
              <div className="min-w-0 flex-[1_1_420px]">
                <Visual project={project} img={img} className="aspect-[16/10] rounded-[22px] border-2 border-ink" />
              </div>
            )}
          </div>
        </header>

        {/* Problem & solution */}
        <section aria-label={t.problemAndSolution} className={`${wrap} pb-[clamp(40px,6vw,72px)]`}>
          <div className="grid gap-[22px] md:grid-cols-2">
            <div className="rounded-[32px] border-2 border-ink bg-sand p-[clamp(22px,3vw,36px)]">
              <Kicker>01 · {t.problemKicker}</Kicker>
              <h2 className="mb-3 text-[clamp(26px,3vw,34px)]">{t.problemTitle}</h2>
              <p className="text-pretty text-neutral-800">{details.problem}</p>
            </div>
            <div className="rounded-[32px_32px_32px_72px] border-2 border-ink bg-sage-200 p-[clamp(22px,3vw,36px)]">
              <p className="mb-2 text-[13px] font-bold uppercase tracking-[0.12em] text-sage-800">02 · {t.solutionKicker}</p>
              <h2 className="mb-3 text-[clamp(26px,3vw,34px)]">{t.solutionTitle}</h2>
              <p className="text-pretty text-sage-900">{details.solution}</p>
            </div>
          </div>
        </section>

        {/* Features */}
        <section aria-label={t.featuresAndStack} className={`${wrap} pb-[clamp(40px,6vw,72px)]`}>
          <div className="grid gap-[22px] lg:grid-cols-[1.6fr_1fr]">
            <div className="rounded-[32px] border-2 border-ink bg-neutral-100 p-[clamp(22px,3vw,36px)]">
              <Kicker>03 · {t.featuresKicker}</Kicker>
              <h2 className="mb-5 text-[clamp(26px,3vw,34px)]">{t.featuresTitle}</h2>
              <ul className="flex flex-col gap-3">
                {details.features.map((feature) => (
                  <li key={feature} className="flex gap-3 text-neutral-800">
                    <span aria-hidden className="mt-0.5 grid size-6 flex-none place-items-center rounded-full border-2 border-ink bg-accent-300">
                      <Check size={13} strokeWidth={3} />
                    </span>
                    <span className="text-pretty">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex flex-col gap-5 self-start rounded-[32px] border-2 border-ink bg-accent-100 p-[clamp(22px,3vw,36px)]">
              <div>
                <Kicker>04 · {t.stackKicker}</Kicker>
                <h2 className="text-[clamp(26px,3vw,34px)]">{t.stackTitle}</h2>
              </div>
              <TagList items={project.tech} tone="accent" label={t.techStack} />
              <dl className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-2.5 border-t-2 border-dashed border-accent-400 pt-5 text-[15px]">
                <dt className="font-bold text-accent-900">Status</dt>
                <dd className="text-neutral-800">{t.status[project.status]}</dd>
                <dt className="font-bold text-accent-900">{t.code}</dt>
                <dd className="min-w-0 [overflow-wrap:anywhere]">
                  {project.codeAvailable !== false ? <a href={project.repoUrl} target="_blank" rel="noopener noreferrer" className="font-semibold">
                    {project.repoUrl.replace("https://", "")}
                  </a> : <span>{t.codeUnavailable}</span>}
                </dd>
                <dt className="font-bold text-accent-900">{t.demo}</dt>
                <dd className="text-neutral-800">
                  {project.demoUrl ? (
                    <a href={project.demoUrl} target="_blank" rel="noopener noreferrer" className="font-semibold">
                      {t.openDemo}
                    </a>
                  ) : project.codeAvailable !== false ? (
                    <a href="#run" className="font-semibold">
                      {t.notHosted}
                    </a>
                  ) : <span>{locale === "pl" ? "Brak publicznego demo" : "No public demo"}</span>}
                </dd>
              </dl>
            </div>
          </div>
        </section>

        {/* Challenges */}
        <section aria-labelledby="challenges-title" className={`${wrap} pb-[clamp(40px,6vw,72px)]`}>
          <Kicker>05 · {t.challengesKicker}</Kicker>
          <h2 id="challenges-title" className="mb-7 text-[clamp(32px,4.4vw,52px)]">
            {t.challengesTitle}
          </h2>
          <ol className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,300px),1fr))] gap-[22px]">
            {details.challenges.map((challenge, i) => (
              <li key={challenge.title} className="flex flex-col gap-3 rounded-[28px] border-2 border-ink bg-neutral-100 p-[clamp(22px,3vw,30px)]">
                <span aria-hidden className="font-heading text-[40px] leading-none text-accent-600">
                  {i + 1}
                </span>
                <h3 className="text-[24px]">{challenge.title}</h3>
                <p className="text-pretty text-neutral-800">{challenge.body}</p>
              </li>
            ))}
          </ol>
        </section>

        {/* Screenshots */}
        {details.screenshots.length > 0 && (
          <section aria-labelledby="screens-title" className={`${wrap} pb-[clamp(40px,6vw,72px)]`}>
            <Kicker>06 · {t.screenshotsKicker}</Kicker>
            <h2 id="screens-title" className="mb-7 text-[clamp(32px,4.4vw,52px)]">
              {t.screenshotsTitle}
            </h2>
            <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,420px),1fr))] gap-[22px]">
              {details.screenshots.map((shot) => (
                <figure key={shot.src} className="rounded-[24px] border-2 border-ink bg-neutral-100 p-3">
                  <a href={shot.src} target="_blank" rel="noopener noreferrer" aria-label={`${t.openImage}: ${shot.alt}`} className="relative block aspect-[16/10] overflow-hidden rounded-[14px] bg-white">
                    <Image src={shot.src} alt={shot.alt} fill sizes="(min-width: 1024px) 560px, 100vw" className="object-contain" />
                  </a>
                  <figcaption className="px-1.5 pb-1 pt-3 text-[15px] font-semibold text-neutral-800">{shot.caption}<span className="mt-1 block text-xs font-normal">{t.openImage} ↗</span></figcaption>
                </figure>
              ))}
            </div>
          </section>
        )}

        {/* Try it */}
        {project.codeAvailable !== false && <section id="run" aria-labelledby="try-title" className={`${wrap} pb-[clamp(40px,6vw,72px)]`}>
          <div className="flex flex-wrap items-center gap-[clamp(24px,4vw,48px)] rounded-[36px] bg-ink p-[clamp(22px,4vw,48px)] text-paper">
            <div className="flex min-w-0 flex-[1_1_320px] flex-col items-start gap-4">
              <p className="text-[13px] font-bold uppercase tracking-[0.12em] text-accent-400">{t.tryKicker}</p>
              <h2 id="try-title" className="text-[clamp(30px,4vw,48px)] text-paper">
                {project.demoUrl ? t.tryTitleDemo : t.tryTitleLocal}
              </h2>
              <p className="max-w-[40ch] text-neutral-300">{project.demoUrl ? t.tryCopyDemo : t.tryCopyLocal}</p>
              <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:flex-wrap">
                <ButtonLink href={project.repoUrl} variant="light">
                  <GitHubIcon />
                  {t.githubRepository}
                </ButtonLink>
                {project.demoUrl && (
                  <ButtonLink href={project.demoUrl} variant="secondary">
                    {t.liveDemo}
                    <ArrowUpRight aria-hidden size={15} strokeWidth={2.75} />
                  </ButtonLink>
                )}
              </div>
            </div>
            <CodeWindow
              title="terminal"
              lines={details.run.map((cmd) => (cmd.startsWith("#") ? cmd : `$ ${cmd}`))}
              className="min-w-0 flex-[1_1_380px] rounded-[20px] border-2 border-neutral-700"
            />
          </div>
        </section>

        }
        {/* Next project */}
        <nav aria-label={t.nextProject} className={`${wrap} pb-[clamp(56px,8vw,110px)]`}>
          <Link
            href={localePath(locale, `/projects/${next.slug}`)}
            className="group flex flex-wrap items-center justify-between gap-4 rounded-[32px] border-2 border-ink bg-accent-300 p-[clamp(22px,3vw,36px)] text-ink no-underline transition-shadow hover:text-ink hover:shadow-[6px_6px_0_var(--color-ink)]"
          >
            <span>
              <span className="mb-1 block text-[13px] font-bold uppercase tracking-[0.12em] text-accent-900">{t.nextProject}</span>
              <span className="block font-heading text-[clamp(26px,3.6vw,44px)] leading-tight">{next.title}</span>
            </span>
            <span aria-hidden className="grid size-14 flex-none place-items-center rounded-full border-2 border-ink bg-neutral-100 transition-transform group-hover:translate-x-1">
              <ArrowRight size={24} strokeWidth={2.75} />
            </span>
          </Link>
        </nav>
      </article>
    </main>
  );
}
