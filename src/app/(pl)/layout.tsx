import { SiteShell, siteMetadata, siteViewport } from "@/views/SiteShell";

export const metadata = siteMetadata("pl");
export const viewport = siteViewport;

export default function Layout({ children }: { children: React.ReactNode }) {
  return <SiteShell locale="pl">{children}</SiteShell>;
}
