import { Check, Clock, RefreshCw } from "lucide-react";
import type { ProjectStatus } from "@/data/projects";
import type { Locale } from "@/i18n/locales";
import { getDictionary } from "@/i18n/ui";

const statusMap = {
  ongoing: { Icon: RefreshCw, cls: "bg-sage-200 text-sage-900 border-sage-800" },
  finished: { Icon: Check, cls: "bg-ink text-paper border-ink" },
  "in-progress": { Icon: Clock, cls: "bg-accent-200 text-accent-900 border-accent-700" },
} as const;

export function StatusBadge({ status, locale }: { status: ProjectStatus; locale: Locale }) {
  const t = getDictionary(locale);
  const { Icon, cls } = statusMap[status];
  return (
    <span
      className={`inline-flex items-center gap-1.5 self-start rounded-full border-2 px-3.5 py-1.5 text-sm font-bold ${cls}`}
    >
      <Icon aria-hidden size={15} strokeWidth={2.75} />
      {t.statusPrefix} {t.status[status]}
    </span>
  );
}
