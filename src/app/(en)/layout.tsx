import { SiteShell, siteMetadata, siteViewport } from "@/views/SiteShell";

export const metadata = siteMetadata("en");
export const viewport = siteViewport;

export default function Layout({ children }: { children: React.ReactNode }) {
  return <SiteShell locale="en">{children}</SiteShell>;
}
