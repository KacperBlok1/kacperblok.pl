# Portfolio

Moja strona z projektami, po polsku z wersją angielską. Next.js (App Router), TypeScript, Tailwind CSS 4, Framer Motion.

## Uruchomienie

```bash
npm install
cp .env.example .env.local
npm run dev
```

Strona startuje na http://localhost:3000. Build produkcyjny: `npm run build`, potem `npm run start`.

## Języki

Polska wersja jest pod `/` i `/projects/[slug]`, angielska pod `/en` i `/en/projects/[slug]`.
Przycisk PL/EN w górnym pasku prowadzi do tej samej podstrony w drugim języku. Każda wersja ma
własny `<html lang>` i odnośniki `hreflang`.

- `src/i18n/ui.ts` – napisy interfejsu (przyciski, nagłówki sekcji, komunikaty)
- `src/i18n/locales.ts` – lista języków i budowanie adresów

## Co gdzie jest

- `src/config/site.ts` – dane kontaktowe i linki, a w `siteCopy` teksty hero, kontaktu i nawigacji dla obu języków
- `src/data/projects.ts` – projekty (wersja angielska) i ich podstrony `/projects/[slug]`
- `src/data/projects.pl.ts` – polskie teksty projektów
- `src/data/repositories.ts` – repozytoria w sekcji GitHub
- `src/data/about.ts` – krótkie fakty i sekcja „Co buduję” w obu językach
- `public/images/projects` – zrzuty ekranu projektów
- `public/cv` – tu wrzucić CV jako `Kacper-Blok-CV.pdf`; bez pliku przycisk w hero zamienia się na „Poproś o CV” (mail)

## GitHub

Sekcja z repozytoriami pobiera gwiazdki, język i datę ostatniego pusha z GitHub API po stronie serwera, z cache na godzinę. Jak API nie odpowie, pokazuje się lokalna lista z `repositories.ts`. `GITHUB_TOKEN` jest opcjonalny i nigdy nie trafia do przeglądarki.

## Wdrożenie

Vercel albo własny serwer (`npm ci && npm run build && npm run start` za reverse proxy). Na produkcji ustawić `NEXT_PUBLIC_SITE_URL`.
