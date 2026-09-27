type TagTone = "neutral" | "accent" | "sage";

const tones: Record<TagTone, string> = {
  neutral: "bg-neutral-200 text-neutral-900 border-neutral-400",
  accent: "bg-accent-200 text-accent-900 border-accent-400",
  sage: "bg-neutral-100 text-sage-900 border-sage-700",
};

export function TagList({ items, tone = "neutral", label = "Tech stack" }: { items: string[]; tone?: TagTone; label?: string }) {
  return (
    <ul aria-label={label} className="flex flex-wrap gap-2">
      {items.map((item) => (
        <li key={item} className={`rounded-full border-[1.5px] px-3 py-1 text-sm font-semibold ${tones[tone]}`}>
          {item}
        </li>
      ))}
    </ul>
  );
}
