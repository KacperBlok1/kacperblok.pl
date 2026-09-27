export const locales = ["pl", "en"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "pl";

export const htmlLang: Record<Locale, string> = { pl: "pl-PL", en: "en" };

export function localePath(locale: Locale, path: string = "/"): string {
  if (locale === defaultLocale) return path;
  if (path === "/") return "/en";
  if (path.startsWith("/#")) return `/en${path.slice(1)}`;
  return `/en${path}`;
}

export function switchLocale(pathname: string, target: Locale): string {
  const base = pathname.replace(/^\/en(?=\/|$)/, "") || "/";
  return localePath(target, base);
}
