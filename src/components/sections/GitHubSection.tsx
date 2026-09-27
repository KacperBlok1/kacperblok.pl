import { Suspense } from "react";
import { siteConfig } from "@/config/site";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { GitHubIcon } from "@/components/ui/Icons";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { RepoGrid } from "@/components/github/RepoGrid";
import { RepoSkeleton } from "@/components/github/RepoSkeleton";
import type { Locale } from "@/i18n/locales";
import { getDictionary } from "@/i18n/ui";

export function GitHubSection({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);
  return (
    <section
      id="github"
      aria-labelledby="gh-title"
      className="mx-auto max-w-[1200px] px-[clamp(18px,4vw,40px)] py-[clamp(48px,7vw,88px)]"
    >
      <div className="rounded-[32px] bg-ink px-[clamp(16px,4vw,48px)] py-[clamp(28px,4vw,48px)] text-paper sm:rounded-[40px]">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-5">
          <SectionHeading id="gh-title" index="04" kicker={t.reposKicker} title={t.reposTitle} size="lg" tone="light" className="[&_h2]:text-paper" />
          <ButtonLink href={siteConfig.github.url} variant="light">
            <GitHubIcon />
            {t.visitGithub}
          </ButtonLink>
        </div>
        <Suspense fallback={<RepoSkeleton locale={locale} />}>
          <RepoGrid locale={locale} />
        </Suspense>
      </div>
    </section>
  );
}
