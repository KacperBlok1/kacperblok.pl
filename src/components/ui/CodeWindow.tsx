type CodeWindowProps = {
  title: string;
  lines: string[];
  className?: string;
};

const dots = ["bg-accent-400", "bg-sage-400", "bg-neutral-500"];

export function CodeWindow({ title, lines, className = "" }: CodeWindowProps) {
  return (
    <div className={`flex flex-col bg-ink text-paper ${className}`}>
      <div className="flex min-w-0 items-center gap-1.5 border-b border-neutral-700 px-3.5 py-2.5 sm:px-4">
        {dots.map((cls) => (
          <span key={cls} aria-hidden className={`size-2.5 flex-none rounded-full ${cls}`} />
        ))}
        <span className="ml-2 truncate font-mono text-xs text-neutral-300">{title}</span>
      </div>
      <pre className="flex-1 whitespace-pre-wrap px-3.5 py-3.5 font-mono text-[11.5px] leading-relaxed text-neutral-200 [overflow-wrap:anywhere] min-[375px]:text-[12.5px] sm:px-4 sm:text-[13.5px]">
        <code>{lines.join("\n")}</code>
      </pre>
    </div>
  );
}
