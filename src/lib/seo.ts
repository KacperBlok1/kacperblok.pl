import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { localePath, type Locale } from "@/i18n/locales";

export function pageMetadata(locale: Locale, path: string, title: string, description: string): Metadata {
  const image = { url: "/images/og-portfolio.png", width: 1200, height: 630, alt: "Kacper Blok — Junior Backend Developer. Python, TypeScript, PostgreSQL, Docker." };
  return {
    metadataBase: new URL(siteConfig.url),
    title,
    description,
    alternates: {
      canonical: localePath(locale, path),
      languages: { pl: localePath("pl", path), en: localePath("en", path), "x-default": localePath("pl", path) },
    },
    openGraph: {
      title, description, type: "website", siteName: "Kacper Blok",
      url: localePath(locale, path), locale: locale === "pl" ? "pl_PL" : "en_US",
      alternateLocale: locale === "pl" ? "en_US" : "pl_PL", images: [image],
    },
    twitter: { card: "summary_large_image", title, description, images: [image] },
  };
}

export const projectDescriptions: Record<string, Record<Locale, string>> = {
  "fishing-forecast": {
    pl: "Planer wędkarski dla Koszalina: prognoza na 7 dni i ocena warunków z wyjaśnieniem. Projekt Kacpra Bloka z API Fastify, PostgreSQL i Dockerem.",
    en: "A fishing planner for Koszalin with a 7-day forecast and explainable conditions score. A project by Kacper Blok using Fastify, PostgreSQL and Docker.",
  },
  gymtracker: {
    pl: "GymTracker — aplikacja do treningów, planów i pomiarów. Zobacz projekt Kacpra Bloka: Fastify, Prisma, PostgreSQL, zrzuty ekranu i opis architektury.",
    en: "GymTracker tracks workouts, plans and measurements. Explore Kacper Blok's project with Fastify, Prisma and PostgreSQL, screenshots and architecture notes.",
  },
  blockout: {
    pl: "Strona Blockout dla firmy od druku i oznakowania. Projekt Kacpra Bloka: React, SEO, formularz kontaktowy i zrzuty ekranu gotowej strony.",
    en: "Blockout: a website for a printing and signage company. Explore Kacper Blok's React project, SEO, contact form and screenshots of the finished website.",
  },
  "face-emotion-recognition": {
    pl: "Rozpoznawanie siedmiu emocji na twarzy z CNN i FastAPI. Zobacz wyniki modelu Kacpra Bloka, wykresy treningu, ograniczenia i opis działania.",
    en: "Facial expression recognition with a CNN and FastAPI. Explore Kacper Blok's model results, training charts, limitations and implementation details.",
  },
  "student-progress": {
    pl: "Student Progress Analyzer — oceny, obecność i przegląd kodu z lokalnym AI. Poznaj projekt Kacpra Bloka w Electron, React, Node.js i MongoDB.",
    en: "Student Progress Analyzer: grading, attendance and code review with local AI. Explore Kacper Blok's Electron, React, Node.js and MongoDB project.",
  },
  "ai-upscaler": {
    pl: "AI Upscaler — powiększanie zdjęć 4× i usuwanie tła. Projekt Kacpra Bloka w Pythonie z Real-ESRGAN, obsługą GPU i interfejsem CustomTkinter.",
    en: "AI Upscaler enlarges photos 4× and optionally removes backgrounds. Kacper Blok's Python project uses Real-ESRGAN, GPU processing and CustomTkinter.",
  },
};
