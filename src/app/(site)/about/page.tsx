import { Eyebrow, Section } from "@/components/ui";
import { about, mission, vision, strategicObjectives, affiliations } from "@/lib/site-data";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "About" };

export default function AboutPage() {
  return (
    <>
      <Section className="!pb-10">
        <Eyebrow>01 — Introduction</Eyebrow>
        <h1 className="mt-3 max-w-2xl font-display text-4xl md:text-5xl">About Ikinai Media</h1>
        <p className="mt-6 max-w-2xl text-lg text-ink/70">{about}</p>
      </Section>

      <Section tone="dim">
        <div className="grid gap-10 md:grid-cols-2">
          <div className="rounded-2xl border border-line bg-paper p-8">
            <Eyebrow>02 — Mission</Eyebrow>
            <p className="mt-4 font-accent text-xl italic leading-snug">{mission}</p>
          </div>
          <div className="rounded-2xl border border-line bg-paper p-8">
            <Eyebrow>02 — Vision</Eyebrow>
            <p className="mt-4 font-accent text-xl italic leading-snug">{vision}</p>
          </div>
        </div>
      </Section>

      <Section>
        <Eyebrow>03 — Strategic objectives</Eyebrow>
        <h2 className="mt-3 font-display text-3xl md:text-4xl">Where we&apos;re headed</h2>
        <ol className="mt-8 space-y-4">
          {strategicObjectives.map((o, i) => (
            <li key={o} className="flex gap-4 border-b border-line pb-4">
              <span className="font-mono text-sm text-maroon">{String(i + 1).padStart(2, "0")}</span>
              <span className="text-ink/80">{o}</span>
            </li>
          ))}
        </ol>
      </Section>

      <Section tone="ink">
        <Eyebrow>04 — Work with</Eyebrow>
        <h2 className="mt-3 font-display text-3xl md:text-4xl">Organizations we&apos;ve worked with</h2>
        <div className="mt-8 flex flex-wrap gap-3">
          {affiliations.map((a) => (
            <span key={a} className="rounded-full border border-paper/20 px-4 py-2 font-mono text-[12px] uppercase tracking-wider">
              {a}
            </span>
          ))}
        </div>
      </Section>
    </>
  );
}
