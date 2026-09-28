import type { Locale } from "@/i18n/locales";

export const faq: Record<Locale, { question: string; answer: string }[]> = {
  pl: [
    { question: "Jakiej pracy szukasz?", answer: "Szukam pracy jako junior backend developer albo stażu. Studiuję informatykę w Gdańsku i chcę rozwijać się przy tworzeniu API, aplikacji serwerowych i integracji." },
    { question: "W jakich technologiach pracujesz?", answer: "Najczęściej używam TypeScriptu, Node.js, Pythona i PostgreSQL. W projektach korzystam też z Fastify, Express, FastAPI i Dockera. Technologie dobieram do problemu — szczegóły opisuję przy każdym projekcie." },
    { question: "Gdzie mogę zobaczyć Twoje projekty?", answer: "W sekcji „Wybrane projekty” znajdziesz opisy działania, technologie, zrzuty ekranu lub schematy oraz instrukcje uruchomienia. Dostępne publicznie repozytoria są podlinkowane na GitHubie. Nie każdy projekt ma demo online." },
    { question: "Czy mogę pobrać Twoje CV?", answer: "Tak. Przycisk „Pobierz CV” na początku strony otwiera plik PDF. Jeśli potrzebujesz dodatkowych informacji o moich projektach lub doświadczeniu, napisz do mnie." },
    { question: "Jak najlepiej się z Tobą skontaktować?", answer: "Napisz na kacper.blok@gmail.com albo przez LinkedIn — linki są w sekcji kontaktowej. Chętnie porozmawiam o pracy, stażu lub współpracy przy konkretnym projekcie." },
  ],
  en: [
    { question: "What kind of role are you looking for?", answer: "I am looking for a junior backend developer role or an internship. I study Computer Science in Gdańsk and want to develop my skills building APIs, server applications and integrations." },
    { question: "Which technologies do you work with?", answer: "I mainly use TypeScript, Node.js, Python and PostgreSQL. My projects also use Fastify, Express, FastAPI and Docker. I choose tools for the problem; each case study explains the stack." },
    { question: "Where can I explore your projects?", answer: "Selected work includes descriptions, technology choices, screenshots or diagrams, and setup instructions. Public repositories are linked on GitHub. Not every project has an online demo." },
    { question: "Can I download your CV?", answer: "Yes. The Download CV button at the top of the page opens a PDF. Get in touch if you would like more information about my projects or experience." },
    { question: "What is the best way to contact you?", answer: "Email kacper.blok@gmail.com or contact me on LinkedIn using the links in the contact section. I am happy to discuss junior roles, internships or a specific collaboration." },
  ],
};
