import type { Locale } from "@/i18n/locales";

export type LocalRepo = {
  name: string;
  description: Record<Locale, string>;
  language: string;
};

export const selectedRepositories: LocalRepo[] = [
  {
    name: "fishing-forecast-koszalin",
    description: {
      pl: "Planer wędkarski na własny serwer: API na Fastify i PostgreSQL, ocena 0–100 z wyjaśnieniem, najlepsze godziny i prognoza na 7 dni.",
      en: "Self-hosted fishing planner: Fastify + PostgreSQL API, explainable 0–100 score, time windows and a 7-day forecast.",
    },
    language: "TypeScript",
  },
  {
    name: "analiza-silownia",
    description: {
      pl: "GymTracker: treningi, plany i pomiary. Fastify, Prisma i PostgreSQL w monorepo na Docker Compose.",
      en: "GymTracker: workouts, plans and measurements. Fastify, Prisma and PostgreSQL in a Docker Compose monorepo.",
    },
    language: "TypeScript",
  },
  {
    name: "face-emotion-recognition-cnn",
    description: {
      pl: "Sieć CNN rozpoznająca 7 emocji na twarzy (65% na zbiorze testowym) i aplikacja na FastAPI z kamerą.",
      en: "CNN for 7 facial expressions (65% test accuracy) with a FastAPI webcam app.",
    },
    language: "Python",
  },
  {
    name: "blockout-strona",
    description: {
      pl: "Strona firmy od druku i oznakowania: React 19, SEO generowane przy buildzie, formularz z ochroną przed spamem.",
      en: "Marketing site for a signage company: React 19, build-time SEO and structured data, anti-spam contact form.",
    },
    language: "TypeScript",
  },
  {
    name: "Upscale-bgremove-ai",
    description: {
      pl: "Aplikacja desktopowa: powiększanie zdjęć 4× przez Real-ESRGAN na GPU i opcjonalne usuwanie tła.",
      en: "Desktop app: 4× upscaling with Real-ESRGAN on CUDA and optional background removal.",
    },
    language: "Python",
  },
];
