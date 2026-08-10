import { Eyebrow, Section } from "@/components/ui";
import { prisma } from "@/lib/prisma";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Portfolio" };
export const dynamic = "force-dynamic";

export default async function PortfolioPage() {
  const items = await prisma.portfolioItem.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <Section>
      <Eyebrow>Our work</Eyebrow>
      <h1 className="mt-3 max-w-2xl font-display text-4xl md:text-5xl">Portfolio</h1>

      {items.length === 0 ? (
        <div className="mt-12 rounded-2xl border border-dashed border-line p-12 text-center">
          <p className="font-display text-xl">No work published yet</p>
          <p className="mt-2 text-ink/60">
            Real portfolio pieces will appear here as soon as they&apos;re added from the admin
            dashboard.
          </p>
        </div>
      ) : (
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {items.map((item) => (
            <div key={item.id} className="viewfinder overflow-hidden rounded-xl bg-ink">
              <span className="vf-tl" /><span className="vf-tr" /><span className="vf-bl" /><span className="vf-br" />
              {item.mediaType === "image" ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={item.mediaUrl} alt={item.title} className="aspect-[4/3] w-full object-cover" />
              ) : (
                <div className="aspect-[4/3] w-full">
                  <iframe
                    src={item.mediaUrl}
                    title={item.title}
                    className="h-full w-full"
                    allowFullScreen
                  />
                </div>
              )}
              <div className="p-4 text-paper">
                <p className="font-mono text-[11px] uppercase tracking-wider text-signal">{item.serviceTag}</p>
                <h2 className="mt-1 font-display text-base">{item.title}</h2>
              </div>
            </div>
          ))}
        </div>
      )}
    </Section>
  );
}
