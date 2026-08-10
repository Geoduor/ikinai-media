import { Eyebrow, Section } from "@/components/ui";
import { team } from "@/lib/site-data";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Team" };

export default function TeamPage() {
  return (
    <Section>
      <Eyebrow>The brilliant minds behind Ikinai</Eyebrow>
      <h1 className="mt-3 max-w-2xl font-display text-4xl md:text-5xl">Team</h1>
      <div className="mt-12 grid gap-8 md:grid-cols-2">
        {team.map((m) => (
          <div key={m.name} className="rounded-2xl border border-line p-8">
            <div className="viewfinder mb-6 aspect-square w-24 bg-ink">
              <span className="vf-tl" /><span className="vf-tr" /><span className="vf-bl" /><span className="vf-br" />
            </div>
            <h2 className="font-display text-2xl">{m.name}</h2>
            <p className="mt-1 font-mono text-[12px] uppercase tracking-wider text-maroon">{m.role}</p>
            <p className="mt-4 text-ink/70">{m.bio}</p>
          </div>
        ))}
      </div>
      <p className="mt-8 text-sm text-ink/50">
        Team photos to be added once supplied — placeholders shown above.
      </p>
    </Section>
  );
}
