import "server-only";

import { siteConfig } from "@/config/site";
import { selectedRepositories, type LocalRepo } from "@/data/repositories";
import type { Locale } from "@/i18n/locales";
import { getDictionary } from "@/i18n/ui";

export type RepoWithMeta = Omit<LocalRepo, "description"> & {
  description: string;
  url: string;
  stars: number | null;
  updatedAt: string | null;
  hasLiveData: boolean;
};

export type RepoResult = {
  status: "ok" | "partial" | "local" | "error" | "empty";
  repos: RepoWithMeta[];
};

type GitHubRepoResponse = {
  html_url: string;
  stargazers_count: number;
  language: string | null;
  pushed_at: string | null;
  description: string | null;
};

const API = "https://api.github.com";

async function fetchRepo(owner: string, name: string): Promise<GitHubRepoResponse> {
  const headers: Record<string, string> = {
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
  };
  // server only, never expose it as NEXT_PUBLIC_
  const token = process.env.GITHUB_TOKEN;
  if (token) headers.Authorization = `Bearer ${token}`;

  const res = await fetch(`${API}/repos/${owner}/${encodeURIComponent(name)}`, {
    headers,
    next: { revalidate: siteConfig.github.revalidateSeconds },
    signal: AbortSignal.timeout(siteConfig.github.timeoutMs),
  });
  if (!res.ok) throw new Error(`GitHub API ${res.status} for ${name}`);
  return (await res.json()) as GitHubRepoResponse;
}

function localOnly(repo: LocalRepo, locale: Locale): RepoWithMeta {
  return {
    ...repo,
    description: repo.description[locale],
    url: `${siteConfig.github.url}/${repo.name}`,
    stars: null,
    updatedAt: null,
    hasLiveData: false,
  };
}

export async function getSelectedRepositories(locale: Locale): Promise<RepoResult> {
  const { username, fetchMetadata } = siteConfig.github;

  if (selectedRepositories.length === 0) return { status: "empty", repos: [] };
  if (!fetchMetadata) return { status: "local", repos: selectedRepositories.map((r) => localOnly(r, locale)) };

  const results = await Promise.allSettled(selectedRepositories.map((r) => fetchRepo(username, r.name)));

  let failed = 0;
  const repos = results.map((result, i) => {
    const local = selectedRepositories[i];
    if (result.status === "rejected") {
      failed++;
      return localOnly(local, locale);
    }
    const d = result.value;
    return {
      ...local,
      description: local.description[locale],
      url: d.html_url,
      language: d.language ?? local.language,
      stars: d.stargazers_count,
      updatedAt: d.pushed_at,
      hasLiveData: true,
    };
  });

  if (failed === repos.length) return { status: "error", repos };
  return { status: failed > 0 ? "partial" : "ok", repos };
}

export function formatUpdated(iso: string | null, locale: Locale): string {
  const t = getDictionary(locale);
  if (!iso) return t.notSynced;
  const date = new Intl.DateTimeFormat(locale === "pl" ? "pl-PL" : "en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(iso));
  return `${t.updated} ${date}`;
}
