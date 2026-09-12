import Link from "next/link";
import { requireSession } from "@/lib/session";
import { prisma } from "@/lib/prisma";

export default async function DashboardPage() {
  const session = await requireSession();

  const [postCount, publishedCount, unreadCount, portfolioCount] = await Promise.all([
    prisma.post.count(),
    prisma.post.count({ where: { published: true } }),
    prisma.contactSubmission.count({ where: { read: false } }),
    prisma.portfolioItem.count(),
  ]);

  return (
    <div>
      <h1 className="font-display text-3xl">Welcome, {session.name.split(" ")[0]}</h1>
      <p className="mt-1 text-ink/60">Here&apos;s what&apos;s happening on the site.</p>

      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        <Link href="/admin/posts" className="rounded-2xl border border-line bg-paper p-6 hover:border-signal-deep">
          <p className="font-mono text-[12px] uppercase tracking-wider text-maroon">Posts</p>
          <p className="mt-2 font-display text-3xl">{postCount}</p>
          <p className="mt-1 text-sm text-ink/50">{publishedCount} published</p>
        </Link>
        <Link href="/admin/portfolio" className="rounded-2xl border border-line bg-paper p-6 hover:border-signal-deep">
          <p className="font-mono text-[12px] uppercase tracking-wider text-maroon">Portfolio</p>
          <p className="mt-2 font-display text-3xl">{portfolioCount}</p>
          <p className="mt-1 text-sm text-ink/50">items</p>
        </Link>
        <Link href="/admin/inbox" className="rounded-2xl border border-line bg-paper p-6 hover:border-signal-deep">
          <p className="font-mono text-[12px] uppercase tracking-wider text-maroon">Contact inbox</p>
          <p className="mt-2 font-display text-3xl">{unreadCount}</p>
          <p className="mt-1 text-sm text-ink/50">unread messages</p>
        </Link>
      </div>
    </div>
  );
}
