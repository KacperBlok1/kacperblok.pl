import Link from "next/link";
import { localePath, type Locale } from "@/i18n/locales";

export function NotFoundPage({ locale }: { locale: Locale }) {
  const pl = locale === "pl";
  return (
    <main id="main" className="mx-auto flex min-h-[70vh] max-w-[1200px] flex-col items-start justify-center gap-6 px-[clamp(18px,4vw,40px)] py-16">
      <p className="rounded-full border-2 border-ink bg-sage-200 px-4 py-2 text-sm font-bold">404 · {pl ? "Ślepa uliczka" : "A dead end"}</p>
      <h1 className="max-w-[15ch] text-[clamp(44px,7vw,88px)]">{pl ? "Tej strony tutaj nie ma." : "This page isn't here."}</h1>
      <p className="max-w-[48ch] text-lg text-neutral-800">{pl ? "Adres może być nieaktualny albo zawierać literówkę. Moje projekty są o jedno kliknięcie stąd." : "The link may be outdated or contain a typo. My projects are just one click away."}</p>
      <div className="flex flex-wrap gap-4">
        <Link href={localePath(locale)} className="rounded-full border-2 border-ink bg-ink px-6 py-3 font-semibold text-paper no-underline">{pl ? "Strona główna" : "Back home"}</Link>
        <Link href={localePath(locale, "/#work")} className="rounded-full border-2 border-ink px-6 py-3 font-semibold text-ink no-underline">{pl ? "Zobacz projekty" : "Explore projects"} →</Link>
      </div>
    </main>
  );
}
