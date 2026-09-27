"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import type { NavItem } from "@/config/site";

export function MobileMenu({
  items,
  availability,
  labels,
}: {
  items: NavItem[];
  availability: string | null;
  labels: { open: string; close: string };
}) {
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setOpen(false);
      buttonRef.current?.focus();
    };
    const mq = window.matchMedia("(min-width: 48rem)");
    const onResize = () => mq.matches && setOpen(false);
    document.addEventListener("keydown", onKey);
    mq.addEventListener("change", onResize);
    return () => {
      document.removeEventListener("keydown", onKey);
      mq.removeEventListener("change", onResize);
    };
  }, [open]);

  return (
    <div className="md:hidden">
      <button
        ref={buttonRef}
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((v) => !v)}
        className="inline-flex size-11 items-center justify-center rounded-full border-2 border-ink bg-neutral-100 text-ink transition-colors hover:bg-paper"
      >
        {open ? <X aria-hidden size={20} strokeWidth={2.75} /> : <Menu aria-hidden size={20} strokeWidth={2.75} />}
        <span className="sr-only">{open ? labels.close : labels.open}</span>
      </button>

      <div
        id={panelId}
        hidden={!open}
        className="absolute inset-x-0 top-full border-b border-ink/15 bg-paper px-[clamp(18px,4vw,40px)] pb-5 pt-2 shadow-soft-md"
      >
        <ul className="flex flex-col">
          {items.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                onClick={() => setOpen(false)}
                className="flex min-h-12 items-center border-b border-ink/10 font-heading text-2xl text-ink no-underline hover:text-accent-700"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
        {availability && (
          <p className="mt-4 inline-flex items-center gap-2 rounded-full border-2 border-ink bg-sage-200 py-1 pl-2 pr-3 text-[13px] font-semibold text-sage-900">
            <span aria-hidden className="size-2.5 rounded-full bg-sage-600 ring-[3px] ring-sage-100" />
            {availability}
          </p>
        )}
      </div>
    </div>
  );
}
