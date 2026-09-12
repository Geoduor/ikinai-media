import { Eyebrow, Section } from "@/components/ui";
import { services } from "@/lib/site-data";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Services" };

export default function ServicesPage() {
  return (
    <Section>
      <Eyebrow>What we do</Eyebrow>
      <h1 className="mt-3 max-w-2xl font-display text-4xl md:text-5xl">Services</h1>
      <p className="mt-4 max-w-xl text-ink/70">
        Comprehensive digital and multimedia services for brands, institutions and community
        stories.
      </p>
      <div className="mt-12 divide-y divide-line border-t border-line">
        {services.map((s, i) => (
          <div key={s.name} className="grid gap-4 py-8 md:grid-cols-[80px_1fr_1fr]">
            <span className="font-mono text-sm text-maroon">{String(i + 1).padStart(2, "0")}</span>
            <h2 className="font-display text-xl leading-snug">{s.name}</h2>
            <p className="text-ink/70">{s.description}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}
