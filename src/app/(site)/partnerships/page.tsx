import Link from "next/link";
import { Eyebrow, Section } from "@/components/ui";
import { packages } from "@/lib/site-data";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Partnerships" };

const opportunities = [
  {
    name: "Creative Advertising",
    body: "Creative advertisements through live broadcasts, reels, documentaries, infographics, short clips and stories that help increase partners' digital visibility for more sales and potential funding from prospective investors.",
  },
  {
    name: "Multi-Media Coverage",
    body: "Selecting the right content to cover makes a difference in scaling your organization's sales. Digital media statistics don't operate in a vacuum — that's why you need Ikinai Media to do your coverage for you.",
  },
  {
    name: "Promotional Marketing",
    body: "After presenting your digital media overview, we understand your goals and key initiatives, relating them to product feedback generated directly — without extra branding and advertising costs.",
  },
  {
    name: "Event Planning",
    body: "Our team of digital and multimedia professionals assists in planning and promoting your events via our digital platforms.",
  },
];

export default function PartnershipsPage() {
  return (
    <>
      <Section className="!pb-10">
        <Eyebrow>Partner with us</Eyebrow>
        <h1 className="mt-3 max-w-2xl font-display text-4xl md:text-5xl">Partnership opportunities</h1>
      </Section>

      <Section tone="dim">
        <div className="grid gap-8 md:grid-cols-2">
          {opportunities.map((o) => (
            <div key={o.name} className="rounded-2xl border border-line bg-paper p-8">
              <h2 className="font-display text-xl">{o.name}</h2>
              <p className="mt-3 text-ink/70">{o.body}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section>
        <Eyebrow>Packages</Eyebrow>
        <h2 className="mt-3 font-display text-3xl md:text-4xl">Choose your tier</h2>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {packages.map((p) => (
            <div key={p.tier} className="flex flex-col rounded-2xl border border-line p-8">
              <p className="font-mono text-[12px] uppercase tracking-wider text-maroon">{p.tier}</p>
              <p className="mt-2 font-display text-3xl">KSh {p.priceKsh.toLocaleString()}</p>
              <ul className="mt-6 flex-1 space-y-3 text-sm text-ink/70">
                {p.benefits.map((b) => (
                  <li key={b} className="flex gap-2">
                    <span className="text-signal-deep">—</span>
                    {b}
                  </li>
                ))}
              </ul>
              <Link
                href="/contact"
                className="mt-8 rounded-full bg-ink px-5 py-3 text-center font-mono text-[12px] uppercase tracking-wider text-paper transition hover:bg-signal hover:text-ink"
              >
                Enquire about {p.tier}
              </Link>
            </div>
          ))}
        </div>
      </Section>
    </>
  );
}
