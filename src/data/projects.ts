import type { Locale } from "@/i18n/locales";
import { projectsPl } from "@/data/projects.pl";

export type ProjectStatus = "ongoing" | "finished" | "in-progress";

export type ProjectLayout = "feature" | "compact" | "circle" | "phones";

export type ProjectImage = { src: string | null; alt: string; placeholder: string; screenshot?: boolean };

export type ProjectPreview =
  | { kind: "terminal"; title: string; lines: string[] }
  | { kind: "flow"; title: string; lines: string[] }
  | { kind: "stat"; value: string; label: string };

export type ProjectScreenshot = { src: string; alt: string; caption: string };

export type ProjectDetails = {
  overview: string;
  problem: string;
  solution: string;
  features: string[];
  challenges: { title: string; body: string }[];
  screenshots: ProjectScreenshot[];
  run: string[];
};

export type Project = {
  slug: string;
  title: string;
  description: string;
  highlights: string[];
  tech: string[];
  status: ProjectStatus;
  layout: ProjectLayout;
  repoUrl: string;
  codeAvailable?: boolean;
  demoUrl: string | null;
  details: ProjectDetails;
  images: ProjectImage[];
  preview?: ProjectPreview;
  sticker?: string;
};

const GH = "https://github.com/KacperBlok1";

export const projects: Project[] = [
  {
    slug: "fishing-forecast",
    title: "Fishing Forecast",
    description:
      "A self-hosted fishing planner for Koszalin: a 0–100 score for each spot and species, built from weather data with every factor explained, plus the best time windows and a 7-day outlook.",
    highlights: [
      "Fastify + PostgreSQL API: accounts, sessions, synced spots and a shared weather cache",
      "Deterministic scoring: 8 weighted factors, species rules capped at ±12 points",
      "70 Vitest tests; CI runs lint, typecheck, tests and a Docker build",
    ],
    tech: ["TypeScript", "Fastify", "PostgreSQL", "React", "Vitest", "Docker"],
    status: "ongoing",
    layout: "feature",
    repoUrl: `${GH}/fishing-forecast-koszalin`,
    demoUrl: null,
    details: {
      overview:
        "A fishing planner for Koszalin and the surrounding area, running on my own server. For a chosen spot and species it scores conditions from 0 to 100, explains every factor, finds the best time windows of the day and gives a 7-day outlook. Sea spots get an extra mode with waves and a safety label.",
      problem:
        "Weather apps show numbers, not an answer. The real question is simpler: is it worth going today, when exactly, and why. And the answer has to be the same on the phone and on the laptop.",
      solution:
        "A Fastify API with PostgreSQL stores accounts, spots and preferences, and is the only part that talks to Open-Meteo, caching each spot's forecast for 15 minutes. A React PWA shows the result of a deterministic, documented algorithm: eight weighted factors, species rules capped at ±12 points, and time windows cut to at most four hours.",
      features: [
        "Accounts with bcrypt-hashed passwords and httpOnly session cookies; tokens stored as HMACs",
        "Spots and settings saved per account and synced across devices",
        "Score from 8 weighted factors, plus waves for sea spots when marine data exists",
        "Best time windows for today and a 7-day outlook with expandable details",
        "Installable PWA with an offline UI cache and a read-only mode from a local copy",
      ],
      challenges: [
        {
          title: "When Open-Meteo is down",
          body: "Forecasts are cached in PostgreSQL: fresh for 15 minutes, kept as a fallback for 24 hours. If Open-Meteo is down, the server returns the last good response and the app shows how old it is. Missing marine data is reported, never invented.",
        },
        {
          title: "Time zones",
          body: "Open-Meteo returns times in the spot's local time without a zone. The app works on those strings instead of parsing them with the browser clock, so dawn lands on the right hour even when the phone is set to another time zone.",
        },
        {
          title: "Scoring a whole day",
          body: "Almost every day has one good hour at dawn, so the best hour alone made all days look the same. The daily score blends the best window (65%) with the daytime average (35%).",
        },
      ],
      screenshots: [
        {
          src: "/images/projects/fishing-forecast.webp",
          alt: "Fishing Forecast dashboard: a 95/100 score for pike, factor breakdown and 3-day trend",
          caption: "The “Now” tab: score, factor breakdown and 3-day trend (UI in Polish)",
        },
      ],
      run: [
        "cp .env.example .env",
        "# set POSTGRES_PASSWORD and SESSION_SECRET",
        "docker compose up -d --build",
        "curl http://localhost:8090/api/health",
      ],
    },
    images: [
      {
        src: "/images/projects/fishing-forecast.webp",
        alt: "Fishing Forecast dashboard with the score, factor breakdown and 3-day trend",
        placeholder: "App screenshot (16:10)",
        screenshot: true,
      },
    ],
  },
  {
    slug: "gymtracker",
    title: "GymTracker",
    description:
      "A private, mobile-first app for workouts, training plans, body measurements, goals and supplements, built to self-host with Docker and use over Tailscale.",
    highlights: [
      "Fastify 5 + Zod + Prisma API on PostgreSQL 17: 13 models, 4 migrations",
      "npm-workspaces monorepo: API, React client and a shared package",
      "Docker Compose with Nginx, built to run on a home server",
    ],
    tech: ["TypeScript", "Fastify", "Prisma", "PostgreSQL", "Zod", "React", "Docker"],
    status: "ongoing",
    layout: "phones",
    repoUrl: `${GH}/analiza-silownia`,
    demoUrl: null,
    details: {
      overview:
        "GymTracker is a private, mobile-first app for tracking workouts, plans, body measurements, goals and supplements. It is a monorepo with a Fastify API, a React client and a PostgreSQL database, meant to run with Docker Compose on a home server and be reached over Tailscale.",
      problem:
        "Workout apps either keep your data in someone else's cloud or don't track everything in one place. I wanted plans, sets, measurements, goals and supplements together, fast to use from a phone in the gym.",
      solution:
        "npm workspaces with apps/api (Fastify 5, Zod, Prisma), apps/web (React 19, TanStack Query, Tailwind) and packages/shared. The PostgreSQL 17 schema is managed with Prisma migrations; Docker Compose runs the database, the API and an Nginx-served frontend, and applies migrations on start.",
      features: [
        "Workouts with sets, weights, reps and notes; training plans by weekday",
        "Calendar of planned, completed and skipped workouts",
        "Body measurements (weight, body fat, circumferences, steps) with trend charts",
        "Goals, a daily supplement checklist and export of any date range to JSON, CSV or TXT",
        "Mobile-first UI: bottom navigation on phones, side panel from 900 px",
      ],
      challenges: [
        {
          title: "Consistent API errors",
          body: "One Fastify error handler maps Zod validation errors to 400, a missing Prisma record (P2025) to 404 and a unique-constraint clash (P2002) to 409, so the route handlers don't repeat the same try/catch.",
        },
        {
          title: "Schema migrations",
          body: "The data model grew through four versioned Prisma migrations (initial schema, workouts, progress features, calendar history), applied automatically when the container starts.",
        },
        {
          title: "No login",
          body: "There is no login on purpose: the app runs on a LAN and over Tailscale, and PostgreSQL is only reachable inside the Docker network. Exposing it to the internet would need an auth layer first.",
        },
      ],
      screenshots: [
        { src: "/images/projects/gymtracker-today.webp", alt: "GymTracker desktop view with today's planned workout", caption: "Today: the planned workout and a start button" },
        { src: "/images/projects/gymtracker-workout.webp", alt: "Active workout screen with the exercise, sets and a rest timer", caption: "Active workout: current exercise, sets and rest timer" },
        { src: "/images/projects/gymtracker-calendar.webp", alt: "Monthly calendar with planned workouts and their status", caption: "Calendar with the plan for the coming weeks" },
        { src: "/images/projects/gymtracker-progress.webp", alt: "Progress page with weight, body fat and steps charts", caption: "Progress: latest measurements and charts" },
      ],
      run: [
        "cp .env.example .env",
        "# set POSTGRES_PASSWORD",
        "docker compose up -d --build",
        "docker compose exec api npm run prisma:seed -w @gymtracker/api",
        "# web: http://localhost:8088",
      ],
    },
    images: [
      { src: "/images/projects/gymtracker-mobile-today.webp", alt: "GymTracker on a phone: today's plan", placeholder: "Today", screenshot: true },
      { src: "/images/projects/gymtracker-mobile-workout.webp", alt: "GymTracker on a phone: an active workout with the rest timer", placeholder: "Workout", screenshot: true },
    ],
  },
  {
    slug: "blockout",
    title: "Blockout Website",
    description:
      "A marketing site for a large-format print and signage company in Koszalin, built to turn visits into quote requests.",
    highlights: [
      "React 19 + TypeScript with a plain-CSS, token-based design system",
      "Build-time SEO: meta, Open Graph, schema.org LocalBusiness and FAQPage",
      "Contact form with Zod validation and two anti-spam checks; Docker + Nginx",
    ],
    tech: ["TypeScript", "React", "Vite", "Zod", "CSS", "Docker", "Nginx"],
    status: "in-progress",
    layout: "compact",
    repoUrl: `${GH}/blockout-strona`,
    demoUrl: null,
    details: {
      overview:
        "A one-page marketing website for Blockout, a large-format print and signage company in Koszalin. It has one job, generating quote requests: every section ends with an action and the contact form is reachable from anywhere on the page.",
      problem:
        "A small local business needs a site that is found on Google, loads fast on phones and turns visits into enquiries, without inventing statistics or testimonials it can't back up.",
      solution:
        "React 19 + TypeScript + Vite without a CSS framework: a token-based design system in plain CSS, all copy in typed content files, and SEO tags plus schema.org data written into index.html at build time. Nginx in Docker serves it with gzip, caching and security headers.",
      features: [
        "Contact form with Zod validation, a honeypot field and a 3-second minimum fill time",
        "Meta, Open Graph and schema.org LocalBusiness + FAQPage generated at build time",
        "Focus-trapped mobile menu and lightbox, keyboard gallery, accessible FAQ",
        "Animations limited to transform and opacity, and off for prefers-reduced-motion",
        "No WCAG 2.1 AA violations in an axe-core audit on desktop and mobile",
      ],
      challenges: [
        {
          title: "SEO without server rendering",
          body: "A client-side React app is invisible to scrapers that don't run JavaScript, so titles, Open Graph tags and structured data are written into index.html by the Vite build.",
        },
        {
          title: "Form without a backend yet",
          body: "Until a form endpoint is configured, the form says so and points to phone and e-mail instead of faking a successful send.",
        },
        {
          title: "No made-up content",
          body: "An earlier version had made-up numbers and invented testimonials. They were removed, and project tiles are clearly marked as placeholders until real photos arrive.",
        },
      ],
      screenshots: [
        { src: "/images/projects/blockout-hero.webp", alt: "Blockout homepage hero with the main headline and call to action", caption: "Hero with the main call to action" },
        { src: "/images/projects/blockout-process.webp", alt: "Five-step process section on a dark background", caption: "How it works: five steps from idea to installation" },
        { src: "/images/projects/blockout-faq.webp", alt: "FAQ section with expandable questions", caption: "FAQ built as an accessible accordion" },
      ],
      run: ["npm install", "npm run dev", "# production: docker compose up -d --build  (port 8080)"],
    },
    images: [{ src: "/images/projects/blockout-card.webp", alt: "Blockout website with printing and signage services and a request-a-quote button", placeholder: "Site screenshot (4:3)", screenshot: true }],
  },
  {
    slug: "face-emotion-recognition",
    title: "Facial Expression Recognition",
    description:
      "A CNN trained from scratch to classify seven facial expressions, served through a FastAPI web app with live webcam input.",
    highlights: [
      "65% accuracy on 7,178 held-out 48×48 test images",
      "One OpenCV preprocessing path shared by training, evaluation and inference",
      "Classification report, confusion matrix and training curves in the repo",
    ],
    tech: ["Python", "Keras", "OpenCV", "FastAPI"],
    status: "in-progress",
    layout: "circle",
    repoUrl: `${GH}/face-emotion-recognition-cnn`,
    demoUrl: null,
    details: {
      overview:
        "A facial expression classifier: a CNN trained from scratch on 48×48 grayscale face crops, evaluated on a held-out test set and served through a FastAPI web app that reads from the webcam.",
      problem:
        "Faces at 48×48 pixels carry little detail and the classes are very uneven: the test set has 111 'disgust' images and 1,774 'happy' ones. A single accuracy number hides how the model does on the rare classes.",
      solution:
        "A mid-sized CNN (Conv2D blocks with BatchNormalization, MaxPooling, Dropout and GlobalAveragePooling), a validation split taken automatically from the training data, a final evaluation only on the untouched test set, and one preprocessing path shared by training, evaluation and live prediction.",
      features: [
        "Face detection with OpenCV's Haar cascade, then crop, grayscale and resize to 48×48",
        "65.0% test accuracy over 7 classes; F1 0.87 for happy and 0.77 for surprise",
        "Training curves, per-class report and confusion matrix saved as artefacts",
        "Single-image prediction script and a FastAPI web app with live webcam input",
      ],
      challenges: [
        {
          title: "Rare classes",
          body: "Recall is 22% for 'disgust' and 30% for 'fear': with so few examples the model learns them poorly. The per-class report and confusion matrix make that visible instead of hiding it behind the overall 65%.",
        },
        {
          title: "Same preprocessing everywhere",
          body: "If the webcam app prepared faces differently from training, accuracy would drop without any error. One shared preprocessing function is used for training, evaluation and prediction.",
        },
        {
          title: "Dependency versions",
          body: "TensorFlow 2.10 needs numpy<2 and protobuf<3.20, so versions are pinned and OpenCV is installed with --no-deps to stop pip from upgrading numpy.",
        },
      ],
      screenshots: [
        {
          src: "/images/projects/cnn-training-history.webp",
          alt: "Training and validation loss and accuracy per epoch",
          caption: "Training history: loss and accuracy per epoch",
        },
        {
          src: "/images/projects/cnn-confusion-matrix.webp",
          alt: "Confusion matrix of the seven emotion classes on the test set",
          caption: "Confusion matrix on the held-out test set",
        },
      ],
      run: [
        'pip install "opencv-python>=4.8.0,<4.10" --no-deps',
        "pip install -r requirements.txt",
        "python -m uvicorn app:app --port 8002 --reload",
      ],
    },
    images: [{ src: null, alt: "Model output on webcam input", placeholder: "Webcam / model output (1:1)" }],
    preview: { kind: "stat", value: "65%", label: "test accuracy · 7 classes" },
    sticker: ":) → happy?",
  },
  {
    slug: "student-progress",
    title: "Student Progress Analyzer",
    description:
      "A desktop app for teachers: groups, tasks and attendance, automatic grading on the Polish 2.0–5.0 scale, and AI review of students' GitHub code with a local LLM.",
    highlights: [
      "JWT-protected Express + MongoDB API with about 30 endpoints",
      "AI code review of students' GitHub repositories with a local model (Ollama)",
      "Automatic grading on the Polish scale; CSV import, CSV and Excel export",
    ],
    tech: ["TypeScript", "Node.js", "Express", "MongoDB", "React", "Electron", "Ollama"],
    status: "in-progress",
    layout: "compact",
    repoUrl: `${GH}/student-progress`,
    codeAvailable: false,
    demoUrl: null,
    details: {
      overview:
        "A desktop app (Electron + React + Node.js) that automates the admin side of teaching a programming class: groups, students, tasks and attendance, grades on the Polish 2.0–5.0 scale, and AI code review of students' GitHub repositories using a model that runs locally.",
      problem:
        "Running a programming class means tracking attendance and points in spreadsheets and reading a lot of student code by hand, with no quick overview of who is falling behind.",
      solution:
        "An Express + MongoDB REST API behind JWT authentication, a React + Tailwind client with Recharts, and Electron wrapping it into a portable Windows app. The GitHub API fetches a student's repositories and code; Ollama runs the review on the teacher's machine, so student code never goes to a cloud service.",
      features: [
        "Groups, students, tasks and attendance, with attendance stats updated as you go",
        "Points converted to the Polish grading scale (2.0–5.0) per student and per class",
        "CSV import of students; CSV and Excel export at the end of the semester",
        "AI code review of a student's GitHub repository, saved to the student's history",
        "Dashboard with grade distribution, attendance chart and a PL/EN interface",
      ],
      challenges: [
        {
          title: "Parsing the model's answer",
          body: "Local models often wrap JSON in markdown or add text after it. A cleaning step cuts everything before the first brace, removes code fences and trims trailing text before the response is parsed.",
        },
        {
          title: "No MongoDB installed",
          body: "If MongoDB isn't reachable, the backend falls back to an in-memory MongoDB instance, so the app still starts on a fresh machine.",
        },
        {
          title: "Student code stays local",
          body: "Reviews run through Ollama on the teacher's computer instead of a cloud API, so students' code is never sent to a third party.",
        },
      ],
      screenshots: [],
      run: ["npm run install:all", "# needs Ollama running locally", "npm run dev", "# Windows one-click: start_app.bat"],
    },
    images: [{ src: null, alt: "AI code review flow", placeholder: "App screenshot (16:10)" }],
    preview: {
      kind: "flow",
      title: "Code review · process diagram",
      lines: [
        "1 GitHub API: student's repos",
        "2 fetch the source code",
        "3 Ollama (local LLM) review",
        "4 parse JSON: line, severity",
        "5 save to student history",
      ],
    },
  },
  {
    slug: "ai-upscaler",
    title: "AI Upscaler",
    description:
      "A desktop app that upscales photos 4× with Real-ESRGAN, with optional background removal, running on the GPU when one is available.",
    highlights: [
      "Real-ESRGAN x4 on CUDA with FP16, CPU fallback",
      "Optional background removal with rembg before upscaling",
      "CustomTkinter GUI with a worker thread; packaged as an .exe with PyInstaller",
    ],
    tech: ["Python", "PyTorch", "Real-ESRGAN", "rembg", "OpenCV", "CustomTkinter"],
    status: "finished",
    layout: "compact",
    repoUrl: `${GH}/Upscale-bgremove-ai`,
    demoUrl: null,
    details: {
      overview:
        "A desktop app for upscaling photos 4× with Real-ESRGAN, with optional background removal. The window is built with CustomTkinter; the heavy work runs on a background thread, on the GPU when CUDA is available.",
      problem:
        "Running Real-ESRGAN usually means command-line scripts and manual setup. The goal was a one-window tool: pick a photo, decide whether to drop the background, get a sharp 4× result.",
      solution:
        "A CustomTkinter GUI with a worker thread that reports progress through a queue: an optional pre-resize with OpenCV, background removal with rembg (U²-Net), Real-ESRGAN x4, then an unsharp mask. A PyInstaller spec bundles the models into a standalone Windows .exe.",
      features: [
        "4× upscaling with the RealESRGAN_x4plus model (RRDBNet, 23 blocks)",
        "Optional background removal with rembg before upscaling",
        "CUDA with half precision when a GPU is available, otherwise the CPU",
        "Responsive window: processing in a worker thread, status updates through a queue",
        "Live GPU memory readout; standalone .exe build with PyInstaller",
      ],
      challenges: [
        {
          title: "Responsive window",
          body: "Upscaling a large photo can take a while. Doing it on the Tk main loop would freeze the window, so a daemon thread does the work and posts status messages to a queue that the UI polls every 150 ms.",
        },
        {
          title: "One code path for GPU and CPU",
          body: "The model is created for whichever device is available and uses half precision only on CUDA, where it saves memory; on the CPU it stays in full precision.",
        },
        {
          title: "Models inside a single .exe",
          body: "The model weights and the U²-Net folder are bundled by PyInstaller, and a resource_path helper finds them both when running from source and from the unpacked executable.",
        },
      ],
      screenshots: [],
      run: [
        "pip install -r requirements.txt",
        "# put RealESRGAN_x4plus.pth next to upscale.py",
        "python upscale.py",
      ],
    },
    images: [{ src: null, alt: "AI Upscaler processing pipeline", placeholder: "App screenshot (4:3)" }],
    preview: {
      kind: "flow",
      title: "Image processing · process diagram",
      lines: [
        "1 load image",
        "2 resize (OpenCV)",
        "3 remove background (optional)",
        "4 Real-ESRGAN x4 · CUDA/CPU",
        "5 unsharp mask",
        "6 save result",
      ],
    },
  },
];

export type ProjectTranslation = {
  title: string;
  description: string;
  highlights: string[];
  details: Omit<ProjectDetails, "screenshots" | "run"> & {
    screenshots: { alt: string; caption: string }[];
    run?: string[];
  };
  images: { alt: string }[];
  statLabel?: string;
  preview?: ProjectPreview;
  sticker?: string;
};

function translate(project: Project, t: ProjectTranslation): Project {
  return {
    ...project,
    title: t.title,
    description: t.description,
    highlights: t.highlights,
    details: {
      ...project.details,
      ...t.details,
      screenshots: project.details.screenshots.map((shot, i) => ({ ...shot, ...t.details.screenshots[i] })),
      run: t.details.run ?? project.details.run,
    },
    images: project.images.map((image, i) => ({ ...image, ...t.images[i] })),
    preview: t.preview ?? (project.preview?.kind === "stat" && t.statLabel ? { ...project.preview, label: t.statLabel } : project.preview),
    sticker: t.sticker ?? project.sticker,
  };
}

export function getProjects(locale: Locale): Project[] {
  if (locale === "en") return projects;
  return projects.map((project) => (projectsPl[project.slug] ? translate(project, projectsPl[project.slug]) : project));
}
