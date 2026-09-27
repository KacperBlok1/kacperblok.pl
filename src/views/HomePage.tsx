import type { Locale } from "@/i18n/locales";
import { Hero } from "@/components/sections/Hero";
import { QuickFacts } from "@/components/sections/QuickFacts";
import { WhatIBuild } from "@/components/sections/WhatIBuild";
import { SelectedWork } from "@/components/sections/SelectedWork";
import { GitHubSection } from "@/components/sections/GitHubSection";
import { OutsideTerminal } from "@/components/sections/OutsideTerminal";
import { Contact } from "@/components/sections/Contact";

export function HomePage({ locale }: { locale: Locale }) {
  return (
    <main id="main">
      <Hero locale={locale} />
      <QuickFacts locale={locale} />
      <WhatIBuild locale={locale} />
      <SelectedWork locale={locale} />
      <GitHubSection locale={locale} />
      <OutsideTerminal locale={locale} />
      <Contact locale={locale} />
    </main>
  );
}
