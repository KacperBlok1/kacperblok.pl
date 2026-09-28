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

## Domena i SEO

Docelowy adres: `https://kacperblok.pl` (również domyślna wartość w kodzie).
Zmienne `NEXT_PUBLIC_*` należy ustawić **przed** `npm run build`.
Strony PL/EN mają osobne opisy, canonical, hreflang i metadane Open Graph/Twitter.
`/sitemap.xml` zawiera 14 stron z odpowiednikami językowymi; `/robots.txt` wskazuje sitemapę.
Ikony są w `src/app`, a obraz udostępniania 1200×630 to `public/images/og-portfolio.png`
(edytowalne źródło: sąsiedni SVG). CV: `public/cv/Kacper-Blok-CV.pdf`.
Własne strony 404 i trasy przechwytujące nieznane adresy działają w obu wersjach językowych.

## Google Analytics 4

Integracja jest przygotowana, ale bez `NEXT_PUBLIC_GA_ID` pozostaje całkowicie wyłączona.
Po utworzeniu strumienia WWW GA4 dla `https://kacperblok.pl` ustaw jego identyfikator
`NEXT_PUBLIC_GA_ID=G-…` w środowisku wdrożenia i ponownie zbuduj stronę.

Skrypt Google ładuje się dopiero po zgodzie. Odmowa nie wysyła żądań do Google.
Wybór jest zapisywany lokalnie na 180 dni. Link „Ustawienia prywatności” pod stopką
pozwala zmienić decyzję; wycofanie zgody usuwa cookies GA i przeładowuje stronę bez tagu.
Reklamy i Google Signals są wyłączone. Zdarzenia page_view są wysyłane przy wejściu
i nawigacji Next.js; URL nie zawiera query string ani hasha.
W ustawieniach strumienia GA4 wyłącz automatyczne odsłony na zmianach historii
(Enhanced measurement → Page views → advanced settings), ponieważ integracja wysyła je sama.
Pozostałe automatyczne zdarzenia Enhanced measurement również zostaw wyłączone,
jeśli chcesz zbierać tylko opisane tu odsłony.
Po wdrożeniu potwierdź odbiór w Realtime/DebugView swojej usługi GA4.

## Materiały projektów

Wykresy CNN pochodzą z `KacperBlok1/face-emotion-recognition-cnn`, katalog `reports`
(pobrane 28.09.2026); lokalne kopie WebP uniezależniają portfolio od zmian adresów GitHuba.
Galerie prowadzą do obrazów w pełnym rozmiarze. Student Progress i AI Upscaler mają
opisane schematy działania, a nie udawane zrzuty ekranu. Publiczny adres Student Progress
zwracał 404 w dniu sprawdzenia, dlatego `codeAvailable: false` ukrywa niedziałające linki
i instrukcję uruchomienia; po udostępnieniu kodu można zmienić flagę i przywrócić repo
w `src/data/repositories.ts`.
Zdjęcia w „Poza terminalem” pozostają `null`; sekcja pokazuje zdjęcia dopiero po dodaniu ścieżek.
