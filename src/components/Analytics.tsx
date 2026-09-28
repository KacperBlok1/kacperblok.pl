"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import type { Locale } from "@/i18n/locales";

type Choice = "granted" | "denied";
type AnalyticsWindow = Window & {
  dataLayer?: unknown[];
  gtag?: (...args: unknown[]) => void;
};
const measurementId = process.env.NEXT_PUBLIC_GA_ID ?? "";
const enabled = /^G-[A-Z0-9]+$/.test(measurementId);
const storageKey = "portfolio-analytics-consent-v1";
const lifetime = 180 * 24 * 60 * 60 * 1000;

function readChoice(): Choice | null {
  try {
    const saved = JSON.parse(localStorage.getItem(storageKey) ?? "null");
    if (saved && saved.expires > Date.now() && (saved.choice === "granted" || saved.choice === "denied")) return saved.choice;
  } catch { /* Storage can be unavailable in private browsing. */ }
  return null;
}

function disableAnalytics() {
  Reflect.set(window, `ga-disable-${measurementId}`, true);
  // Remove GA cookies on both the current host and parent domains.
  for (const cookie of document.cookie.split(";")) {
    const name = cookie.trim().split("=")[0];
    if (name !== "_ga" && !name.startsWith("_ga_")) continue;
    document.cookie = `${name}=; Max-Age=0; path=/`;
    const parts = location.hostname.split(".");
    for (let i = 0; i < parts.length - 1; i++) {
      document.cookie = `${name}=; Max-Age=0; path=/; domain=${parts.slice(i).join(".")}`;
    }
  }
}

export function Analytics({ locale }: { locale: Locale }) {
  const pathname = usePathname();
  const [choice, setChoice] = useState<Choice | null>(null);
  const [ready, setReady] = useState(false);
  const [open, setOpen] = useState(false);
  const lastPage = useRef<string | null>(null);
  const pl = locale === "pl";

  useEffect(() => {
    if (!enabled) return;
    const saved = readChoice();
    setChoice(saved);
    setOpen(saved === null);
    setReady(true);
    const sync = (event: StorageEvent) => {
      if (event.key !== storageKey && event.key !== null) return;
      // Reload to remove the already loaded tag after a change in another tab.
      disableAnalytics();
      location.reload();
    };
    window.addEventListener("storage", sync);
    return () => window.removeEventListener("storage", sync);
  }, []);

  useEffect(() => {
    if (!enabled || choice !== "granted") return;
    const target = window as AnalyticsWindow;
    Reflect.set(window, `ga-disable-${measurementId}`, false);
    if (!target.gtag) {
      target.dataLayer = target.dataLayer ?? [];
      target.gtag = function () { target.dataLayer!.push(arguments); };
      target.gtag("consent", "default", {
        analytics_storage: "denied", ad_storage: "denied",
        ad_user_data: "denied", ad_personalization: "denied",
      });
      target.gtag("consent", "update", { analytics_storage: "granted" });
      target.gtag("js", new Date());
      target.gtag("config", measurementId, {
        send_page_view: false, allow_google_signals: false,
        allow_ad_personalization_signals: false, cookie_expires: lifetime / 1000,
        page_location: `${location.origin}${pathname}`, page_referrer: "",
      });
      const script = document.createElement("script");
      script.id = "portfolio-google-analytics";
      script.async = true;
      script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
      document.head.appendChild(script);
    }
    if (lastPage.current !== pathname) {
      target.gtag("event", "page_view", {
        page_location: `${location.origin}${pathname}`,
        page_title: document.title,
        page_referrer: lastPage.current ? `${location.origin}${lastPage.current}` : "",
      });
      lastPage.current = pathname;
    }
  }, [choice, pathname]);

  function choose(next: Choice) {
    try { localStorage.setItem(storageKey, JSON.stringify({ choice: next, expires: Date.now() + lifetime })); } catch { /* Keep this session's choice in memory. */ }
    if (next === "denied") {
      disableAnalytics();
      if ((window as AnalyticsWindow).gtag) {
        // Unload the tag as well as disabling collection.
        location.reload();
        return;
      }
    }
    setChoice(next);
    setOpen(false);
  }

  if (!enabled || !ready) return null;
  return (
    <>
      <div className="mx-auto max-w-[1200px] px-[clamp(18px,4vw,40px)] pb-8 text-sm">
        <button type="button" className="min-h-11 cursor-pointer underline underline-offset-4" onClick={() => setOpen(true)} aria-expanded={open} aria-controls="analytics-settings">
          {pl ? "Ustawienia prywatności" : "Privacy settings"}
        </button>
      </div>
      {open && (
        <section id="analytics-settings" aria-labelledby="analytics-title" className="fixed inset-x-3 bottom-3 z-[100] mx-auto max-h-[85dvh] max-w-[720px] overflow-y-auto rounded-2xl border-2 border-ink bg-neutral-100 p-5 shadow-stamp sm:p-6">
          <h2 id="analytics-title" className="text-2xl">{pl ? "Statystyki odwiedzin" : "Visitor analytics"}</h2>
          <p className="mt-3 text-sm text-neutral-800">
            {pl ? "Za Twoją zgodą Google Analytics zapisze cookies i przekaże Google dane o odwiedzanych stronach oraz urządzeniu. Pomaga mi to zrozumieć, które projekty są oglądane. Nie używam tych danych do reklam. Odmowa nie ogranicza strony. Wybór pamiętam przez 180 dni; możesz go zmienić w ustawieniach prywatności u dołu strony." : "With your permission, Google Analytics stores cookies and sends Google data about the pages you visit and your device. This helps me understand which projects people explore. I do not use this data for advertising. Declining does not limit the site. Your choice is saved for 180 days and can be changed in Privacy settings at the bottom of the page."}
          </p>
          <a href="https://policies.google.com/technologies/partner-sites" className="mt-2 inline-block text-sm underline">{pl ? "Jak Google wykorzystuje dane" : "How Google uses data"}</a>
          <div className="mt-4 flex flex-wrap gap-3">
            <button type="button" onClick={() => choose("granted")} className="min-h-11 cursor-pointer rounded-full border-2 border-ink bg-sage-200 px-5 py-2 font-semibold">{pl ? "Zgadzam się" : "Accept analytics"}</button>
            <button type="button" onClick={() => choose("denied")} className="min-h-11 cursor-pointer rounded-full border-2 border-ink bg-neutral-100 px-5 py-2 font-semibold">{pl ? "Tylko niezbędne" : "Essential only"}</button>
            {choice && <button type="button" onClick={() => setOpen(false)} className="min-h-11 cursor-pointer px-3 underline">{pl ? "Zamknij" : "Close"}</button>}
          </div>
        </section>
      )}
    </>
  );
}
