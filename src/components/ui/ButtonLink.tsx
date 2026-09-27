import Link from "next/link";

type Variant = "primary" | "secondary" | "ghost" | "dark" | "light" | "sage";
type Size = "md" | "lg";

const variants: Record<Variant, string> = {
  primary:
    "bg-accent-600 text-paper border-2 border-ink hover:bg-accent-700 active:bg-accent-800 hover:text-paper",
  secondary: "bg-neutral-100 text-ink border-2 border-ink hover:bg-paper active:bg-neutral-200 hover:text-ink",
  ghost: "text-accent-700 hover:bg-accent-100 active:bg-accent-200 hover:text-accent-800",
  dark: "bg-ink text-paper border-2 border-ink hover:bg-neutral-800 hover:text-paper",
  light: "bg-accent-400 text-ink border-2 border-paper hover:bg-accent-300 hover:text-ink",
  sage: "bg-sage-800 text-paper border-2 border-ink hover:bg-sage-900 hover:text-paper",
};

const sizes: Record<Size, string> = {
  md: "min-h-12 px-5 text-[15px]",
  lg: "min-h-[54px] px-6 text-[17px]",
};

type ButtonLinkProps = {
  href: string | null;
  children: React.ReactNode;
  variant?: Variant;
  size?: Size;
  className?: string;
  download?: boolean;
  unavailableLabel?: string;
};

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-semibold no-underline transition-colors duration-150";

export function ButtonLink({
  href,
  children,
  variant = "primary",
  size = "md",
  className = "",
  download,
  unavailableLabel,
}: ButtonLinkProps) {
  if (!href) {
    return (
      <span
        aria-disabled="true"
        className={`${base} ${sizes[size]} cursor-not-allowed border-2 border-dashed border-neutral-500 text-neutral-700 ${className}`}
      >
        {unavailableLabel ?? children}
      </span>
    );
  }

  const cls = `${base} ${sizes[size]} ${variants[variant]} ${className}`;
  const external = /^(https?:|mailto:)/.test(href);

  if (external || download) {
    return (
      <a
        href={href}
        className={cls}
        download={download || undefined}
        {...(href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={cls}>
      {children}
    </Link>
  );
}
