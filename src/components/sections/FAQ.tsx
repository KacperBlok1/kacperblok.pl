import { Plus } from "lucide-react";
import { faq } from "@/data/faq";
import type { Locale } from "@/i18n/locales";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function FAQ({ locale }: { locale: Locale }) {
  const items = faq[locale];
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map(({ question, answer }) => ({
      "@type": "Question", name: question,
      acceptedAnswer: { "@type": "Answer", text: answer },
    })),
  };
  return (
    <section id="faq" aria-labelledby="faq-title" className="mx-auto max-w-[1200px] px-[clamp(18px,4vw,40px)] py-[clamp(48px,7vw,88px)]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }} />
      <div className="grid gap-8 lg:grid-cols-[1fr_1.5fr] lg:gap-16">
        <SectionHeading id="faq-title" index="06" kicker="FAQ" title={locale === "pl" ? "Jeszcze kilka odpowiedzi." : "A few more answers."} />
        <div className="border-t-2 border-ink">
          {items.map(({ question, answer }) => (
            <details key={question} className="group border-b-2 border-ink py-1">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-5 py-5 text-lg font-semibold [&::-webkit-details-marker]:hidden">
                {question}<Plus aria-hidden size={22} className="shrink-0 transition-transform group-open:rotate-45" />
              </summary>
              <p className="max-w-[60ch] pb-6 text-pretty text-neutral-800">{answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
