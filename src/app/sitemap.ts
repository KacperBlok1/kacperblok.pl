import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { projects } from "@/data/projects";
import { localePath, locales } from "@/i18n/locales";

export default function sitemap(): MetadataRoute.Sitemap {
  return ["/", ...projects.map(({ slug }) => `/projects/${slug}`)].flatMap((path) =>
    locales.map((locale) => ({
      url: new URL(localePath(locale, path), siteConfig.url).href,
      alternates: {
        languages: {
          pl: new URL(localePath("pl", path), siteConfig.url).href,
          en: new URL(localePath("en", path), siteConfig.url).href,
          "x-default": new URL(localePath("pl", path), siteConfig.url).href,
        },
      },
    })),
  );
}
