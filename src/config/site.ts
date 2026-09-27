import { localePath, type Locale } from "@/i18n/locales";

export type NavItem = { label: string; href: string };

export const siteConfig = {
  name: "Kacper",
  fullName: "Kacper Blok",
  role: "Junior Backend Developer",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  availableForInternships: true,

  email: "kacper.blok@gmail.com",
  cvPath: "/cv/Kacper-Blok-CV.pdf",
  profileImage: null as string | null,

  github: {
    username: "KacperBlok1",
    url: "https://github.com/KacperBlok1",
    fetchMetadata: true,
    revalidateSeconds: 3600,
    timeoutMs: 5000,
  },
  linkedin: "https://www.linkedin.com/in/kacper-blok-058760398/",
};

type SiteCopy = {
  description: string;
  location: string;
  availabilityLabel: string;
  nav: NavItem[];
  hero: {
    kicker: string;
    headline: [string, string, string];
    intro: string;
    photoCaption: string;
    codeCard: { title: string; caption: string; lines: string[] };
    labels: { location: string; building: string; focus: string };
  };
  outside: { title: string; copy: string };
  contact: { heading: string; copy: string; sticker: string };
};

function nav(locale: Locale, labels: [string, string, string, string]): NavItem[] {
  const anchors = ["#about", "#work", "#github", "#contact"];
  return anchors.map((anchor, i) => ({ label: labels[i], href: localePath(locale, `/${anchor}`) }));
}

const codeLines = (city: string, openTo: string) => [
  "me = Developer(",
  '  role="backend",',
  '  level="junior",',
  "  stack=[",
  '    "Python", "TypeScript",',
  '    "PostgreSQL", "Docker",',
  "  ],",
  `  city="${city}",`,
  `  open_to="${openTo}",`,
  ")",
];

export const siteCopy: Record<Locale, SiteCopy> = {
  pl: {
    description:
      "Kacper Blok – junior backend developer i student informatyki z Gdańska. Aplikacje na Node.js i PostgreSQL, narzędzia w Pythonie do rozpoznawania obrazu, wszystko wdrażane w Dockerze.",
    location: "Gdańsk",
    availabilityLabel: "Szukam pracy jako junior lub stażu",
    nav: nav("pl", ["O mnie", "Projekty", "GitHub", "Kontakt"]),
    hero: {
      kicker: "Junior Backend Developer · Python i TypeScript",
      headline: ["Hej, jestem Kacper.", "Buduję backendy,", "które naprawdę działają."],
      intro:
        "Studiuję informatykę w Gdańsku i szukam pracy jako junior backend developer albo stażu. Robię aplikacje na Node.js i PostgreSQL, narzędzia w Pythonie do rozpoznawania obrazu i wdrażam je w Dockerze.",
      photoCaption: "Kacper w trakcie deployu",
      codeCard: { title: "about_me.py", caption: "Kacper w jednym obiekcie", lines: codeLines("Gdańsk, PL", "staż, junior") },
      labels: { location: "Gdańsk", building: "portfolio v1.0", focus: "Node.js • PostgreSQL • Python • Docker" },
    },
    outside: {
      title: "Poza terminalem",
      copy: "Poza kodem siłownia, samochody, wędkowanie i majsterkowanie. Lubię projekty, które zaczynają się od pomysłu, po drodze robią się problemem, a na końcu są czymś przydatnym.",
    },
    contact: {
      heading: "Zróbmy coś przydatnego.",
      copy: "Szukam pracy jako junior albo stażu. Chętnie pogadam też o współpracy albo po prostu o technice.",
      sticker: "odpisuję w ciągu kilku dni",
    },
  },
  en: {
    description:
      "Kacper Blok – junior backend developer and Computer Science student in Gdańsk. Self-hosted apps on Node.js and PostgreSQL, Python tools for computer vision, shipped with Docker.",
    location: "Gdańsk, Poland",
    availabilityLabel: "Open to junior roles & internships",
    nav: nav("en", ["About", "Work", "GitHub", "Contact"]),
    hero: {
      kicker: "Junior Backend Developer · Python & TypeScript",
      headline: ["Hi, I’m Kacper.", "I build backends", "that actually work."],
      intro:
        "Computer Science student in Gdańsk looking for a junior backend role or internship. I build self-hosted apps on Node.js and PostgreSQL, Python tools for computer vision, and ship them with Docker.",
      photoCaption: "Kacper, mid-deploy",
      codeCard: { title: "about_me.py", caption: "Kacper, in one object", lines: codeLines("Gdańsk, PL", "junior roles") },
      labels: { location: "based in Gdańsk, Poland", building: "portfolio v1.0", focus: "Node.js • PostgreSQL • Python • Docker" },
    },
    outside: {
      title: "Outside the terminal",
      copy: "I enjoy strength training, cars, fishing and building things outside of software too. I like projects that start as an idea, turn into a problem, and eventually become something useful.",
    },
    contact: {
      heading: "Let’s build something useful.",
      copy: "I am open to junior roles, internships, collaborations and interesting technical conversations.",
      sticker: "replies within a few days",
    },
  },
};
