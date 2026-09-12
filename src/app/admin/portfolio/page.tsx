import Link from "next/link";
import { requireSession } from "@/lib/session";
import { prisma } from "@/lib/prisma";

export default async function AdminPortfolioPage() {
  await requireSession();
  const items = await prisma.portfolioItem.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="font-display text-3xl">Portfolio</h1>
        <Link
          href="/admin/portfolio/new"
          className="rounded-full bg-ink px-5 py-2 font-mono text-[12px] uppercase tracking-wider text-paper hover:bg-signal hover:text-ink"
        >
          + New item
        </Link>
      </div>

      {items.length === 0 ? (
        <p className="mt-8 text-ink/50">No portfolio items yet — add the first one.</p>
      ) : (
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <Link
              key={item.id}
              href={`/admin/portfolio/${item.id}/edit`}
              className="rounded-2xl border border-line bg-paper p-4 hover:border-signal-deep"
            >
              <div className="flex items-center justify-between">
                <span className="rounded-full border border-line px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-ink/50">
                  {item.mediaType}
                </span>
                {item.featured && (
                  <span className="rounded-full bg-signal px-2 py-0.5 font-mono text-[10px] uppercase text-ink">
                    Featured
                  </span>
                )}
              </div>
              <p className="mt-3 font-display text-lg leading-snug">{item.title}</p>
              <p className="mt-1 text-sm text-ink/50">{item.serviceTag}</p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
