import Image from "next/image";

type MediaProps = {
  src: string | null;
  alt: string;
  placeholder: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
  washed?: boolean;
};

export function Media({
  src,
  alt,
  placeholder,
  className = "",
  sizes = "(min-width: 1024px) 50vw, 100vw",
  priority,
  washed = true,
}: MediaProps) {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      {src ? (
        <Image src={src} alt={alt} fill sizes={sizes} priority={priority} className={`object-cover ${washed ? "washed" : ""}`} />
      ) : (
        <div
          role="img"
          aria-label={`${alt} (placeholder)`}
          className="placeholder-stripes absolute inset-0 grid place-items-center p-4 text-center text-sm font-semibold text-neutral-700"
        >
          {placeholder}
        </div>
      )}
    </div>
  );
}

type TapeProps = { className?: string; tone?: "accent" | "sage" | "neutral" };

const tapeTone = {
  accent: "bg-accent-300/70",
  sage: "bg-sage-300/75",
  neutral: "bg-neutral-300/80",
};

export function Tape({ className = "", tone = "accent" }: TapeProps) {
  return <span aria-hidden className={`pointer-events-none absolute rounded-[3px] ${tapeTone[tone]} ${className}`} />;
}
