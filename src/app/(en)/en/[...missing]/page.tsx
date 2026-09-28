import { notFound } from "next/navigation";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "404 — Page not found | Kacper Blok",
  description: "This page could not be found. Return to Kacper Blok's portfolio and explore backend projects.",
  robots: { index: false, follow: true },
  alternates: { canonical: null, languages: {} },
};

export default function MissingPage() { notFound(); }
