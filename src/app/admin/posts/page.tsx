import Link from "next/link";
import { requireSession } from "@/lib/session";
import { prisma } from "@/lib/prisma";

export default async function AdminPostsPage() {
  await requireSession();
  const posts = await prisma.post.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="font-display text-3xl">Posts</h1>
        <Link
          href="/admin/posts/new"
          className="rounded-full bg-ink px-5 py-2 font-mono text-[12px] uppercase tracking-wider text-paper hover:bg-signal hover:text-ink"
        >
          + New post
        </Link>
      </div>

      {posts.length === 0 ? (
        <p className="mt-8 text-ink/50">No posts yet — create the first one.</p>
      ) : (
        <div className="mt-8 divide-y divide-line rounded-2xl border border-line bg-paper">
          {posts.map((p) => (
            <Link
              key={p.id}
              href={`/admin/posts/${p.id}/edit`}
              className="flex items-center justify-between px-6 py-4 hover:bg-paper-dim"
            >
              <div>
                <p className="font-display text-lg">{p.title}</p>
                <p className="text-sm text-ink/50">{p.category}</p>
              </div>
              <span
                className={`rounded-full px-3 py-1 font-mono text-[11px] uppercase tracking-wider ${
                  p.published ? "bg-signal text-ink" : "border border-line text-ink/50"
                }`}
              >
                {p.published ? "Published" : "Draft"}
              </span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
