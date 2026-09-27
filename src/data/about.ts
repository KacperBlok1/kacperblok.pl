import type { Locale } from "@/i18n/locales";

export type Tone = "accent" | "paper" | "sage" | "sand";

export type QuickFact = { label: string; value: string; tone: Tone };

export const quickFacts: Record<Locale, QuickFact[]> = {
  pl: [
    { label: "Miasto", value: "Gdańsk", tone: "accent" },
    { label: "Czym się zajmuję", value: "Web, backend, AI i serwer domowy", tone: "paper" },
    { label: "Jak się uczę", value: "Buduję → psuję → naprawiam → wdrażam", tone: "sage" },
    { label: "Poza kodem", value: "Siłownia, samochody, wędkowanie i majsterkowanie", tone: "sand" },
  ],
  en: [
    { label: "Based in", value: "Gdańsk, Poland", tone: "accent" },
    { label: "Focus", value: "Web, backend, AI and homelab infrastructure", tone: "paper" },
    { label: "Learning style", value: "Build → break → fix → deploy", tone: "sage" },
    { label: "Outside code", value: "Gym, cars, fishing and hands-on projects", tone: "sand" },
  ],
};

export type BuildArea = {
  title: string;
  copy: string;
  icon: "monitor" | "server" | "scan-face" | "hard-drive";
  tone: Tone;
};

export const buildAreas: Record<Locale, BuildArea[]> = {
  pl: [
    { title: "Aplikacje webowe", copy: "React, TypeScript i nowoczesne interfejsy", icon: "monitor", tone: "accent" },
    { title: "Backend", copy: "Node.js, Fastify, Python, PostgreSQL i REST API", icon: "server", tone: "sage" },
    { title: "Eksperymenty z AI", copy: "Sieci CNN, rozpoznawanie obrazu i lokalne modele językowe", icon: "scan-face", tone: "paper" },
    { title: "Homelab", copy: "Linux, Docker, Proxmox, self-hosting i sieci", icon: "hard-drive", tone: "sand" },
  ],
  en: [
    { title: "Web apps", copy: "React, TypeScript and modern interfaces", icon: "monitor", tone: "accent" },
    { title: "Backend", copy: "Node.js, Fastify, Python, PostgreSQL and REST APIs", icon: "server", tone: "sage" },
    { title: "AI experiments", copy: "CNNs, computer vision and local LLMs", icon: "scan-face", tone: "paper" },
    { title: "Homelab", copy: "Linux, Docker, Proxmox, self-hosting and networking", icon: "hard-drive", tone: "sand" },
  ],
};

export type Snapshot = { id: string; caption: string; placeholder: string; src: string | null; alt: string };

export const snapshots: Record<Locale, Snapshot[]> = {
  pl: [
    { id: "gym", caption: "siłownia", placeholder: "Siłownia", src: null, alt: "Domowa siłownia" },
    { id: "setup", caption: "biurko", placeholder: "Biurko", src: null, alt: "Biurko i serwer domowy" },
    { id: "weekends", caption: "weekendy", placeholder: "Auta / ryby", src: null, alt: "Weekend: samochody i wędkowanie" },
  ],
  en: [
    { id: "gym", caption: "gym", placeholder: "Gym", src: null, alt: "Home gym setup" },
    { id: "setup", caption: "setup", placeholder: "Setup", src: null, alt: "Desk and homelab setup" },
    { id: "weekends", caption: "weekends", placeholder: "Cars / fishing", src: null, alt: "Weekend: cars and fishing" },
  ],
};
