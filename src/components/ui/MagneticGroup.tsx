"use client";

import { useEffect, useRef } from "react";

export function MagneticGroup({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const els = Array.from(root.querySelectorAll<HTMLElement>("[data-tilt]"));
    let x = -1e4;
    let y = -1e4;
    let raf = 0;

    const apply = () => {
      raf = 0;
      for (const el of els) {
        const s = parseFloat(el.dataset.tilt ?? "1") || 1;
        const r = el.getBoundingClientRect();
        const pad = 80;
        if (x < r.left - pad || x > r.right + pad || y < r.top - pad || y > r.bottom + pad) {
          el.style.translate = "";
          continue;
        }
        const mx = Math.max(-1, Math.min(1, (x - (r.left + r.width / 2)) / (r.width / 2 + pad)));
        const my = Math.max(-1, Math.min(1, (y - (r.top + r.height / 2)) / (r.height / 2 + pad)));
        const over = x >= r.left && x <= r.right && y >= r.top && y <= r.bottom;
        el.style.translate = `${(mx * 12 * s).toFixed(1)}px ${(my * 9 * s - (over ? 5 : 0)).toFixed(1)}px`;
      }
    };
    const req = () => {
      if (!raf) raf = requestAnimationFrame(apply);
    };
    const move = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      x = e.clientX;
      y = e.clientY;
      req();
    };
    const leave = () => {
      x = y = -1e4;
      req();
    };

    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("scroll", req, { passive: true });
    document.addEventListener("mouseleave", leave);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", move);
      window.removeEventListener("scroll", req);
      document.removeEventListener("mouseleave", leave);
    };
  }, []);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
