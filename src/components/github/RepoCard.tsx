import { ArrowUpRight, Star } from "lucide-react";
import { formatUpdated, type RepoWithMeta } from "@/lib/github";
import type { Locale } from "@/i18n/locales";
import { getDictionary } from "@/i18n/ui";

export function RepoCard({ repo, locale }: { repo: RepoWithMeta; locale: Locale }) {
  const t = getDictionary(locale);
  return (
    <a
      href={repo.url}
      target="_blank"
      rel="noopener noreferrer"
      className="flex flex-1 flex-col gap-2.5 rounded-[26px] border-2 border-neutral-700 bg-neutral-900 px-6 py-[22px] text-paper no-underline transition duration-150 hover:-translate-y-[3px] hover:border-accent-400 hover:text-paper"
    >
      <span className="flex items-center justify-between gap-2.5">
        <span className="break-words font-heading text-[21px] leading-tight [overflow-wrap:anywhere]">{repo.name}</span>
        <ArrowUpRight aria-hidden size={18} strokeWidth={2.75} className="flex-none text-accent-400" />
      </span>
      <span className="flex-1 text-[15px] text-neutral-300">{repo.description}</span>
      <span className="flex flex-wrap gap-x-4 gap-y-2 text-[13px] text-neutral-300">
        <span className="inline-flex items-center gap-1.5">
          <span aria-hidden className="size-[9px] rounded-full bg-accent-400" />
          {repo.language}
        </span>
        <span className="inline-flex items-center gap-1">
          <Star aria-hidden size={13} strokeWidth={2.75} />
          <span className="sr-only">{t.stars}</span>
          {repo.stars ?? "—"}
        </span>
        <span>{formatUpdated(repo.updatedAt, locale)}</span>
      </span>
    </a>
  );
}
