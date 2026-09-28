import { readdirSync } from "node:fs";
import path from "node:path";
import type { NextConfig } from "next";

// On Cloudflare Workers the runtime has no filesystem access to public/,
// so the list of public files is captured at build time and inlined.
function listPublicFiles(dir: string, prefix = ""): string[] {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const rel = `${prefix}/${entry.name}`;
    return entry.isDirectory() ? listPublicFiles(path.join(dir, entry.name), rel) : [rel];
  });
}

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  env: {
    PUBLIC_FILES: JSON.stringify(listPublicFiles(path.join(process.cwd(), "public"))),
  },
  images: {
    remotePatterns: [{ protocol: "https", hostname: "raw.githubusercontent.com", pathname: "/KacperBlok1/**" }],
  },
};

export default nextConfig;
