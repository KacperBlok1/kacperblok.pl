import { AlertCircle } from "lucide-react";
import { getSelectedRepositories } from "@/lib/github";
import { RepoCard } from "@/components/github/RepoCard";
import type { Locale } from "@/i18n/locales";
import { getDictionary } from "@/i18n/ui";

export async function RepoGrid({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);
  const { status, repos } = await getSelectedRepositories(locale);
  const notes = { ok: t.reposOk, partial: t.reposPartial, local: t.reposLocal };

  if (status === "empty") {
    return (
      <div className="rounded-[26px] border-2 border-dashed border-neutral-500 p-8">
        <p className="mb-1.5 font-heading text-2xl text-paper">{t.reposEmptyTitle}</p>
        <p className="text-neutral-300">{t.reposEmptyCopy}</p>
      </div>
    );
  }

  return (
    <div>
      {status === "error" ? (
        <div role="alert" className="mb-5 flex flex-wrap items-center gap-3 rounded-[22px] border-2 border-accent-400 bg-accent-900 px-5 py-4">
          <AlertCircle aria-hidden size={22} strokeWidth={2.75} className="text-accent-300" />
          <p className="flex-[1_1_260px] text-paper">
            {t.reposError}
          </p>
        </div>
      ) : (
        <p aria-live="polite" className="mb-4 text-sm text-neutral-300">
          {notes[status]}
        </p>
      )}
      <ul className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,280px),1fr))] gap-4">
        {repos.map((repo) => (
          <li key={repo.name} className="flex">
            <RepoCard repo={repo} locale={locale} />
          </li>
        ))}
      </ul>
    </div>
  );
}
