import Link from "next/link";
import { Eyebrow, Section } from "@/components/ui";
import { services, mission, brand } from "@/lib/site-data";
import { prisma } from "@/lib/prisma";
import { HeroSlideshow } from "./HeroSlideshow";

// Pulls real portfolio images for the hero slideshow, so this stays fresh
// as new work is added via the admin — same caching fix as the Portfolio/
// News pages (Next.js 16 changed caching semantics; dynamic alone isn't
// enough, revalidate = 0 is needed too).
export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function HomePage() {
  const heroImages = await prisma.portfolioItem.findMany({
    where: { mediaType: "image" },
    orderBy: [{ featured: "desc" }, { createdAt: "desc" }],
    take: 8,
    select: { mediaUrl: true },
  });

  return (
    <>
      {/* Hero */}
      <Section className="!py-16 md:!py-24">
        <div className="grid gap-12 md:grid-cols-2 md:items-center">
          <div>
            <Eyebrow>On Air · Nairobi, Kenya</Eyebrow>
            <h1 className="mt-5 font-display text-[13vw] leading-[0.95] tracking-tight md:text-6xl">
              STORIES,
              <br />
              SHOT AND
              <br />
              <span className="text-signal-deep">BROADCAST.</span>
            </h1>
            <p className="mt-6 max-w-md text-ink/70">
              {brand.name} is a Nairobi-based digital and multimedia production house —
              live broadcasting, videography, photography and digital marketing for
              brands and communities alike.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/partnerships"
                className="rounded-full bg-ink px-6 py-3 font-mono text-[12px] uppercase tracking-wider text-paper transition hover:bg-signal hover:text-ink"
              >
                Partner with us
              </Link>
              <Link
                href="/portfolio"
                className="rounded-full border border-ink px-6 py-3 font-mono text-[12px] uppercase tracking-wider transition hover:bg-ink hover:text-paper"
              >
                See our work
              </Link>
            </div>
          </div>

          <div className="viewfinder relative aspect-[4/5] w-full overflow-hidden bg-ink">
            <HeroSlideshow images={heroImages.map((i) => i.mediaUrl)} />
            <span className="vf-tl" /><span className="vf-tr" /><span className="vf-bl" /><span className="vf-br" />
            <div className="relative flex h-full flex-col justify-between p-6 text-paper">
              <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-wider">
                <span className="on-air-dot" style={{ background: "var(--signal)" }} />
                Rec
              </div>
              <p className="font-accent text-2xl italic text-paper/90">&ldquo;Engage Africa. Go Digital.&rdquo;</p>
            </div>
          </div>
        </div>
      </Section>

      {/* Mission */}
      <Section tone="dim">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <Eyebrow>Mission</Eyebrow>
            <p className="mt-4 font-display text-2xl leading-tight md:text-3xl">
              Empowering communities through digital media.
            </p>
          </div>
          <p className="text-ink/70 md:col-span-2 md:text-lg">{mission}</p>
        </div>
      </Section>

      {/* Services */}
      <Section>
        <div className="flex items-end justify-between">
          <div>
            <Eyebrow>What we do</Eyebrow>
            <h2 className="mt-3 font-display text-3xl md:text-4xl">Services</h2>
          </div>
          <Link href="/services" className="hidden font-mono text-[12px] uppercase tracking-wider underline md:block">
            All services →
          </Link>
        </div>
        <div className="mt-10 grid gap-px overflow-hidden rounded-2xl border border-line bg-line md:grid-cols-3">
          {services.slice(0, 6).map((s) => (
            <div key={s.name} className="bg-paper p-6">
              <h3 className="font-display text-base leading-snug">{s.name}</h3>
              <p className="mt-2 text-sm text-ink/60">{s.description}</p>
            </div>
          ))}
        </div>
      </Section>
    </>
  );
}