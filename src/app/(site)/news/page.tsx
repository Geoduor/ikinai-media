import Link from "next/link";
import { Eyebrow, Section } from "@/components/ui";
import { prisma } from "@/lib/prisma";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "News" };
export const dynamic = "force-dynamic";

export default async function NewsPage() {
  const posts = await prisma.post.findMany({
    where: { published: true },
    orderBy: { publishedAt: "desc" },
  });

  return (
    <Section>
      <Eyebrow>Talk shows · Podcasts · Documentaries</Eyebrow>
      <h1 className="mt-3 max-w-2xl font-display text-4xl md:text-5xl">News &amp; Stories</h1>

      {posts.length === 0 ? (
        <div className="mt-12 rounded-2xl border border-dashed border-line p-12 text-center">
          <p className="font-display text-xl">Nothing published yet</p>
          <p className="mt-2 text-ink/60">
            New articles and episodes go live here the moment they&apos;re published from the admin
            dashboard.
          </p>
        </div>
      ) : (
        <div className="mt-12 divide-y divide-line border-t border-line">
          {posts.map((p) => (
            <Link key={p.id} href={`/news/${p.slug}`} className="block py-8">
              <p className="font-mono text-[11px] uppercase tracking-wider text-maroon">{p.category}</p>
              <h2 className="mt-2 font-display text-2xl">{p.title}</h2>
              <p className="mt-2 max-w-2xl text-ink/70">{p.excerpt}</p>
            </Link>
          ))}
        </div>
      )}
    </Section>
  );
}
