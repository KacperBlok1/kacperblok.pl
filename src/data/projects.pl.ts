import type { ProjectTranslation } from "@/data/projects";

export const projectsPl: Record<string, ProjectTranslation> = {
  "fishing-forecast": {
    title: "Czy warto iść na ryby?",
    description:
      "Planer wędkarski dla Koszalina na własnym serwerze: ocena 0–100 dla każdego łowiska i gatunku liczona z pogody, z wyjaśnieniem każdego czynnika, najlepsze godziny i prognoza na 7 dni.",
    highlights: [
      "API na Fastify i PostgreSQL: konta, sesje, łowiska zsynchronizowane między urządzeniami i wspólny cache pogody",
      "Deterministyczna punktacja: 8 czynników z wagami, reguły gatunkowe do ±12 punktów",
      "70 testów w Vitest; CI sprawdza lint, typy, testy i buduje obraz Dockera",
    ],
    details: {
      overview:
        "Planer wędkarski dla Koszalina i okolic, postawiony na moim serwerze. Dla wybranego łowiska i gatunku ocenia warunki od 0 do 100, tłumaczy każdy czynnik, wskazuje najlepsze godziny w ciągu dnia i daje prognozę na 7 dni. Łowiska morskie mają dodatkowy tryb z falą i oceną bezpieczeństwa.",
      problem:
        "Aplikacje pogodowe pokazują liczby, a nie odpowiedź. Pytanie jest prostsze: czy warto iść dziś, o której dokładnie i dlaczego. Do tego odpowiedź musi być taka sama na telefonie i na komputerze.",
      solution:
        "API na Fastify z PostgreSQL trzyma konta, łowiska i ustawienia. Tylko serwer rozmawia z Open-Meteo i przez 15 minut trzyma prognozę każdego łowiska w cache'u. Aplikacja w React (PWA) pokazuje wynik deterministycznego, opisanego algorytmu: osiem czynników z wagami, reguły gatunkowe ograniczone do ±12 punktów i okna czasowe cięte do najwyżej czterech godzin.",
      features: [
        "Konta z hasłami w bcrypt i sesją w ciasteczku httpOnly; tokeny sesji zapisane jako HMAC",
        "Łowiska i ustawienia zapisane przy koncie i dostępne na każdym urządzeniu",
        "Ocena z 8 czynników z wagami, a dla morza także z fali, jeśli są dane",
        "Najlepsze okna czasowe na dziś i prognoza na 7 dni z rozwijanymi szczegółami",
        "PWA do zainstalowania na telefonie, z cache'em interfejsu i trybem tylko do odczytu offline",
      ],
      challenges: [
        {
          title: "Gdy Open-Meteo nie działa",
          body: "Prognozy są trzymane w PostgreSQL: świeże przez 15 minut, awaryjne przez 24 godziny. Jeśli Open-Meteo nie odpowiada, serwer oddaje ostatnią poprawną odpowiedź, a aplikacja pokazuje, ile ma lat. Brak danych o fali jest pokazywany wprost, a nie zgadywany.",
        },
        {
          title: "Strefy czasowe",
          body: "Open-Meteo zwraca czas lokalny łowiska bez strefy. Aplikacja pracuje na tych napisach zamiast przeliczać je zegarem przeglądarki, więc świt wypada o dobrej godzinie nawet wtedy, gdy telefon ma ustawioną inną strefę.",
        },
        {
          title: "Ocena całego dnia",
          body: "Prawie każdy dzień ma jedną dobrą godzinę o świcie, więc sama najlepsza godzina sprawiała, że wszystkie dni wyglądały podobnie. Ocena dnia to 65% najlepszego okna i 35% średniej z godzin dziennych.",
        },
      ],
      screenshots: [
        {
          alt: "Planer wędkarski: ocena 95/100 dla szczupaka, rozbicie na czynniki i trend z 3 dni",
          caption: "Zakładka „Teraz”: ocena, rozbicie na czynniki i trend z 3 dni",
        },
      ],
      run: [
        "cp .env.example .env",
        "# uzupełnij POSTGRES_PASSWORD i SESSION_SECRET",
        "docker compose up -d --build",
        "curl http://localhost:8090/api/health",
      ],
    },
    images: [{ alt: "Planer wędkarski z oceną, rozbiciem na czynniki i trendem z 3 dni" }],
  },

  gymtracker: {
    title: "GymTracker",
    description:
      "Prywatna aplikacja pod telefon do treningów, planów, pomiarów ciała, celów i suplementów. Do postawienia w Dockerze i używania przez Tailscale.",
    highlights: [
      "API na Fastify 5, Zod i Prisma z PostgreSQL 17: 13 modeli, 4 migracje",
      "Monorepo na npm workspaces: API, klient w React i wspólna paczka",
      "Docker Compose z Nginx, przygotowany pod domowy serwer",
    ],
    details: {
      overview:
        "GymTracker to prywatna aplikacja do zapisywania treningów, planów, pomiarów ciała, celów i suplementów, robiona przede wszystkim pod telefon. To monorepo z API na Fastify, klientem w React i bazą PostgreSQL, uruchamiane przez Docker Compose na domowym serwerze i dostępne przez Tailscale.",
      problem:
        "Aplikacje treningowe albo trzymają dane w cudzej chmurze, albo nie mają wszystkiego w jednym miejscu. Chciałem mieć plany, serie, pomiary, cele i suplementy razem, szybkie w obsłudze z telefonu na siłowni.",
      solution:
        "npm workspaces z apps/api (Fastify 5, Zod, Prisma), apps/web (React 19, TanStack Query, Tailwind) i packages/shared. Schemat PostgreSQL 17 jest zarządzany migracjami Prismy; Docker Compose uruchamia bazę, API i frontend serwowany przez Nginx, a migracje odpalają się przy starcie.",
      features: [
        "Treningi z seriami, ciężarem, powtórzeniami i notatkami; plany na dni tygodnia",
        "Kalendarz zaplanowanych, wykonanych i pominiętych treningów",
        "Pomiary ciała (waga, tkanka tłuszczowa, obwody, kroki) z wykresami",
        "Cele, dzienna lista suplementów i eksport wybranego okresu do JSON, CSV albo TXT",
        "Interfejs pod telefon: dolna nawigacja na telefonie, panel boczny od 900 px",
      ],
      challenges: [
        {
          title: "Spójne błędy API",
          body: "Jeden handler błędów w Fastify zamienia błędy walidacji Zod na 400, brak rekordu w Prismie (P2025) na 404, a konflikt unikalności (P2002) na 409, więc handlery tras nie powtarzają tego samego try/catch.",
        },
        {
          title: "Migracje schematu",
          body: "Model danych rósł przez cztery wersjonowane migracje Prismy (schemat startowy, treningi, postępy, historia kalendarza), które uruchamiają się same przy starcie kontenera.",
        },
        {
          title: "Bez logowania",
          body: "Logowania nie ma celowo: aplikacja działa w sieci domowej i przez Tailscale, a PostgreSQL jest dostępny tylko w sieci Dockera. Przed wystawieniem do internetu trzeba by dodać uwierzytelnianie.",
        },
      ],
      screenshots: [
        { alt: "GymTracker na komputerze z dzisiejszym treningiem", caption: "Dzisiaj: zaplanowany trening i przycisk startu" },
        { alt: "Ekran aktywnego treningu z ćwiczeniem, seriami i licznikiem przerwy", caption: "Aktywny trening: ćwiczenie, serie i licznik przerwy" },
        { alt: "Kalendarz miesiąca z zaplanowanymi treningami i statusami", caption: "Kalendarz z planem na kolejne tygodnie" },
        { alt: "Postępy: waga, tkanka tłuszczowa i kroki z wykresami", caption: "Postępy: ostatnie pomiary i wykresy" },
      ],
      run: [
        "cp .env.example .env",
        "# ustaw POSTGRES_PASSWORD",
        "docker compose up -d --build",
        "docker compose exec api npm run prisma:seed -w @gymtracker/api",
        "# aplikacja: http://localhost:8088",
      ],
    },
    images: [
      { alt: "GymTracker na telefonie: dzisiejszy plan" },
      { alt: "GymTracker na telefonie: aktywny trening z licznikiem przerwy" },
    ],
  },

  blockout: {
    title: "Strona Blockout",
    description:
      "Strona firmy z Koszalina od druku wielkoformatowego i oznakowania, zrobiona tak, żeby odwiedziny zamieniały się w zapytania o wycenę.",
    highlights: [
      "React 19 i TypeScript, style w zwykłym CSS oparte na tokenach",
      "SEO przy buildzie: meta, Open Graph, schema.org LocalBusiness i FAQPage",
      "Formularz z walidacją w Zod i dwoma zabezpieczeniami przed spamem; Docker i Nginx",
    ],
    details: {
      overview:
        "Jednostronicowa strona dla Blockout, firmy z Koszalina od druku wielkoformatowego i oznakowania. Ma jedno zadanie: zbierać zapytania o wycenę. Każda sekcja kończy się przyciskiem, a formularz kontaktowy jest dostępny z każdego miejsca strony.",
      problem:
        "Mała lokalna firma potrzebuje strony, którą da się znaleźć w Google, która szybko działa na telefonie i zamienia odwiedziny w zapytania, bez wymyślonych statystyk i opinii, których nie da się potwierdzić.",
      solution:
        "React 19, TypeScript i Vite bez frameworka CSS: system stylów na tokenach w zwykłym CSS, cała treść w typowanych plikach, a tagi SEO i dane schema.org wpisywane do index.html przy buildzie. Nginx w Dockerze serwuje stronę z gzipem, cache'em i nagłówkami bezpieczeństwa.",
      features: [
        "Formularz z walidacją w Zod, ukrytym polem na boty i minimalnym czasem wypełnienia 3 s",
        "Meta, Open Graph i schema.org LocalBusiness + FAQPage generowane przy buildzie",
        "Menu mobilne i galeria z pułapką focusu, obsługa klawiatury, dostępne FAQ",
        "Animacje tylko na transform i opacity, wyłączane przy prefers-reduced-motion",
        "Zero błędów WCAG 2.1 AA w audycie axe-core na komputerze i telefonie",
      ],
      challenges: [
        {
          title: "SEO bez renderowania na serwerze",
          body: "Aplikacji w React działającej w przeglądarce nie widzą roboty, które nie uruchamiają JavaScriptu, więc tytuły, Open Graph i dane strukturalne wpisuje do index.html build Vite.",
        },
        {
          title: "Formularz bez backendu",
          body: "Dopóki nie jest ustawiony adres formularza, strona mówi o tym wprost i podaje telefon oraz e-mail, zamiast udawać, że wiadomość poszła.",
        },
        {
          title: "Bez zmyślonych treści",
          body: "Wcześniejsza wersja miała wymyślone liczby i opinie klientów. Usunąłem je, a kafelki realizacji są wyraźnie oznaczone jako poglądowe, dopóki nie będzie prawdziwych zdjęć.",
        },
      ],
      screenshots: [
        { alt: "Strona główna Blockout z nagłówkiem i przyciskiem wyceny", caption: "Pierwszy ekran z główną akcją" },
        { alt: "Sekcja z pięcioma krokami współpracy na ciemnym tle", caption: "Jak pracujemy: pięć kroków od pomysłu do montażu" },
        { alt: "Sekcja FAQ z rozwijanymi pytaniami", caption: "FAQ jako dostępny akordeon" },
      ],
      run: ["npm install", "npm run dev", "# produkcja: docker compose up -d --build  (port 8080)"],
    },
    images: [{ alt: "Strona główna Blockout" }],
  },

  "face-emotion-recognition": {
    title: "Rozpoznawanie emocji na twarzy",
    description:
      "Sieć CNN wytrenowana od zera do rozpoznawania siedmiu emocji na twarzy, z aplikacją na FastAPI, która działa na obrazie z kamery.",
    highlights: [
      "65% trafności na 7178 zdjęciach testowych 48×48",
      "Jedno przygotowanie obrazu w OpenCV dla treningu, ewaluacji i predykcji",
      "Raport klasyfikacji, macierz pomyłek i wykresy treningu w repozytorium",
    ],
    details: {
      overview:
        "Klasyfikator emocji na twarzy: sieć CNN wytrenowana od zera na wycinkach twarzy 48×48 w skali szarości, oceniona na osobnym zbiorze testowym i podpięta do aplikacji na FastAPI, która czyta obraz z kamery.",
      problem:
        "Twarz w rozdzielczości 48×48 ma mało szczegółów, a klasy są bardzo nierówne: zbiór testowy ma 111 zdjęć „obrzydzenia” i 1774 „radości”. Jedna liczba trafności ukrywa, jak model radzi sobie z rzadkimi klasami.",
      solution:
        "Średniej wielkości CNN (bloki Conv2D z BatchNormalization, MaxPooling, Dropout i GlobalAveragePooling), część walidacyjna wydzielana automatycznie z danych treningowych, ostateczna ocena tylko na nietkniętym zbiorze testowym i jedno przygotowanie obrazu dla treningu, ewaluacji i predykcji na żywo.",
      features: [
        "Wykrywanie twarzy klasyfikatorem Haara z OpenCV, potem wycięcie, skala szarości i 48×48",
        "65,0% trafności na 7 klasach; F1 0,87 dla radości i 0,77 dla zaskoczenia",
        "Wykresy treningu, raport dla każdej klasy i macierz pomyłek zapisane w repo",
        "Skrypt do predykcji na jednym zdjęciu i aplikacja na FastAPI z kamerą",
      ],
      challenges: [
        {
          title: "Rzadkie klasy",
          body: "Czułość dla „obrzydzenia” to 22%, a dla „strachu” 30%: przy tak małej liczbie przykładów model słabo się ich uczy. Raport dla każdej klasy i macierz pomyłek pokazują to zamiast chować za ogólnymi 65%.",
        },
        {
          title: "To samo przygotowanie obrazu wszędzie",
          body: "Gdyby aplikacja z kamerą przygotowywała twarze inaczej niż przy treningu, trafność spadłaby bez żadnego błędu. Jedna wspólna funkcja jest używana przy treningu, ewaluacji i predykcji.",
        },
        {
          title: "Wersje zależności",
          body: "TensorFlow 2.10 wymaga numpy<2 i protobuf<3.20, więc wersje są przypięte, a OpenCV instaluje się z --no-deps, żeby pip nie podbił numpy.",
        },
      ],
      screenshots: [
        { alt: "Strata i trafność na zbiorze treningowym i walidacyjnym w kolejnych epokach", caption: "Historia treningu: strata i trafność w kolejnych epokach" },
        { alt: "Macierz pomyłek siedmiu emocji na zbiorze testowym", caption: "Macierz pomyłek na zbiorze testowym" },
      ],
    },
    images: [{ alt: "Wynik modelu na obrazie z kamery" }],
    statLabel: "trafność · 7 klas",
  },

  "student-progress": {
    title: "Student Progress Analyzer",
    description:
      "Aplikacja desktopowa dla prowadzących: grupy, zadania i obecność, automatyczne oceny w skali 2,0–5,0 i przegląd kodu studentów z GitHuba przez lokalny model AI.",
    highlights: [
      "API na Express i MongoDB zabezpieczone JWT, około 30 endpointów",
      "Przegląd kodu z repozytoriów studentów przez lokalny model (Ollama)",
      "Automatyczne oceny w polskiej skali; import z CSV, eksport do CSV i Excela",
    ],
    details: {
      overview:
        "Aplikacja desktopowa (Electron, React, Node.js), która zdejmuje z prowadzącego zajęcia z programowania całą papierologię: grupy, studentów, zadania i obecność, oceny w skali 2,0–5,0 oraz przegląd kodu z repozytoriów studentów przez model uruchomiony lokalnie.",
      problem:
        "Prowadzenie zajęć z programowania to śledzenie obecności i punktów w arkuszach i czytanie mnóstwa kodu studentów, bez szybkiego podglądu, kto zostaje w tyle.",
      solution:
        "REST API na Express i MongoDB z uwierzytelnianiem JWT, klient w React i Tailwind z wykresami w Recharts i Electron, który zamyka to w przenośną aplikację na Windowsa. API GitHuba pobiera repozytoria i kod studenta, a przegląd robi Ollama na komputerze prowadzącego, więc kod studentów nie trafia do chmury.",
      features: [
        "Grupy, studenci, zadania i obecność ze statystykami aktualizowanymi na bieżąco",
        "Punkty przeliczane na polską skalę ocen (2,0–5,0) dla studenta i całej grupy",
        "Import studentów z CSV, eksport do CSV i Excela na koniec semestru",
        "Przegląd kodu z repozytorium studenta przez AI, zapisywany w jego historii",
        "Pulpit z rozkładem ocen, wykresem obecności i interfejsem po polsku i angielsku",
      ],
      challenges: [
        {
          title: "Odpowiedź modelu jako JSON",
          body: "Lokalne modele często owijają JSON w markdown albo dopisują tekst na końcu. Przed parsowaniem odpowiedź jest czyszczona: wszystko przed pierwszym nawiasem i po ostatnim jest ucinane, a znaczniki kodu usuwane.",
        },
        {
          title: "Bez zainstalowanego MongoDB",
          body: "Jeśli MongoDB nie odpowiada, backend przełącza się na instancję MongoDB w pamięci, więc aplikacja uruchamia się też na świeżym komputerze.",
        },
        {
          title: "Kod studentów zostaje lokalnie",
          body: "Przegląd robi Ollama na komputerze prowadzącego zamiast chmurowego API, więc kod studentów nie trafia do nikogo z zewnątrz.",
        },
      ],
      screenshots: [],
      run: ["npm run install:all", "# potrzebna działająca lokalnie Ollama", "npm run dev", "# na Windowsie jednym kliknięciem: start_app.bat"],
    },
    images: [{ alt: "Schemat przeglądu kodu przez AI" }],
  },

  "ai-upscaler": {
    title: "AI Upscaler",
    description:
      "Aplikacja desktopowa, która powiększa zdjęcia 4× modelem Real-ESRGAN, z opcją usunięcia tła, na karcie graficznej, jeśli jest dostępna.",
    highlights: [
      "Real-ESRGAN x4 na CUDA w FP16, a bez karty na procesorze",
      "Opcjonalne usuwanie tła przez rembg przed powiększeniem",
      "Okno w CustomTkinter z osobnym wątkiem do obróbki; build do .exe przez PyInstaller",
    ],
    details: {
      overview:
        "Aplikacja okienkowa do powiększania zdjęć 4× modelem Real-ESRGAN, z opcją usunięcia tła. Okno jest w CustomTkinter, a cała ciężka praca idzie w osobnym wątku, na karcie graficznej, jeśli jest CUDA.",
      problem:
        "Uruchomienie Real-ESRGAN to zwykle skrypty w terminalu i ręczna konfiguracja. Chciałem jedno okno: wybierasz zdjęcie, decydujesz, czy usunąć tło, i dostajesz ostry wynik 4×.",
      solution:
        "Okno w CustomTkinter i wątek roboczy, który raportuje postęp przez kolejkę: opcjonalne wstępne zmniejszenie w OpenCV, usunięcie tła przez rembg (U²-Net), Real-ESRGAN x4 i na koniec maska wyostrzająca. Plik spec dla PyInstallera pakuje modele do samodzielnego .exe.",
      features: [
        "Powiększanie 4× modelem RealESRGAN_x4plus (RRDBNet, 23 bloki)",
        "Opcjonalne usunięcie tła przez rembg przed powiększeniem",
        "CUDA w połowicznej precyzji z kartą NVIDIA, a bez niej procesor",
        "Okno nie zamarza: obróbka w osobnym wątku, status przez kolejkę",
        "Podgląd zajętej pamięci karty i build do samodzielnego .exe",
      ],
      challenges: [
        {
          title: "Okno, które nie zamarza",
          body: "Powiększanie dużego zdjęcia trochę trwa. Robione w głównej pętli Tk zamroziłoby okno, więc pracę wykonuje osobny wątek i wrzuca statusy do kolejki, którą interfejs sprawdza co 150 ms.",
        },
        {
          title: "Jeden kod dla GPU i CPU",
          body: "Model jest tworzony dla dostępnego urządzenia i używa połowicznej precyzji tylko na CUDA, gdzie oszczędza pamięć; na procesorze zostaje pełna precyzja.",
        },
        {
          title: "Modele w jednym .exe",
          body: "Wagi modelu i folder U²-Net pakuje PyInstaller, a funkcja resource_path znajduje je zarówno przy uruchamianiu ze źródeł, jak i z rozpakowanego pliku wykonywalnego.",
        },
      ],
      screenshots: [],
      run: [
        "pip install -r requirements.txt",
        "# obok upscale.py wrzuć RealESRGAN_x4plus.pth",
        "python upscale.py",
      ],
    },
    images: [{ alt: "Etapy obróbki w AI Upscalerze" }],
  },
};
