import type { Locale } from "@/i18n/locales";
import { getDictionary } from "@/i18n/ui";

export function RepoSkeleton({ locale, count = 6 }: { locale: Locale; count?: number }) {
  const t = getDictionary(locale);
  return (
    <div aria-busy="true" aria-live="polite">
      <p className="mb-4 text-sm text-neutral-300">{t.reposLoading}</p>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,280px),1fr))] gap-4">
        {Array.from({ length: count }, (_, i) => (
          <div key={i} className="h-[150px] animate-pulse rounded-[26px] bg-neutral-800" />
        ))}
      </div>
    </div>
  );
}
