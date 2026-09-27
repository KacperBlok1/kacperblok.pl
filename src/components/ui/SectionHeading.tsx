type SectionHeadingProps = {
  id: string;
  index: string;
  kicker: string;
  title: string;
  size?: "md" | "lg";
  tone?: "accent" | "sage" | "light";
  className?: string;
};

const kickerTone = {
  accent: "text-accent-700",
  sage: "text-sage-700",
  light: "text-accent-400",
};

export function SectionHeading({ id, index, kicker, title, size = "md", tone = "accent", className = "" }: SectionHeadingProps) {
  return (
    <div className={className}>
      <p className={`mb-2.5 text-[13px] font-bold uppercase tracking-[0.12em] ${kickerTone[tone]}`}>
        {index} · {kicker}
      </p>
      <h2
        id={id}
        className={size === "lg" ? "text-[clamp(36px,5.4vw,68px)]" : "text-[clamp(32px,4.4vw,52px)]"}
      >
        {title}
      </h2>
    </div>
  );
}

export function Kicker({ children }: { children: React.ReactNode }) {
  return (
    <p className="mb-2.5 text-[13px] font-bold uppercase tracking-[0.12em] text-accent-700">{children}</p>
  );
}
