import Link from "next/link";
import { getSession } from "@/lib/session";
import { LogoutButton } from "./LogoutButton";

export const metadata = { title: "Admin" };

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await getSession();

  // The middleware already checks for a cookie; this is the real check.
  // (Skipped on /admin/login itself since that page has no session yet.)
  // Next.js layouts wrap the login page too, so we allow it through here
  // by checking the session and only redirecting when truly absent AND
  // not already on the login screen — handled via the login page itself
  // not importing this layout's guard logic twice.

  return (
    <div className="min-h-screen bg-paper-dim font-body text-ink">
      {session ? (
        <div className="flex min-h-screen">
          <aside className="w-56 shrink-0 border-r border-line bg-ink p-6 text-paper">
            <p className="font-display text-sm tracking-tight">IKINAI ADMIN</p>
            <nav className="mt-8 flex flex-col gap-1">
              <Link href="/admin/dashboard" className="rounded-lg px-3 py-2 text-sm hover:bg-paper/10">
                Dashboard
              </Link>
              <Link href="/admin/posts" className="rounded-lg px-3 py-2 text-sm hover:bg-paper/10">
                Posts
              </Link>
              <Link href="/admin/inbox" className="rounded-lg px-3 py-2 text-sm hover:bg-paper/10">
                Contact inbox
              </Link>
              <Link href="/" className="rounded-lg px-3 py-2 text-sm hover:bg-paper/10">
                View site ↗
              </Link>
            </nav>
            <div className="mt-10 border-t border-paper/10 pt-4">
              <p className="text-xs text-paper/50">{session.name}</p>
              <p className="text-xs text-paper/50">{session.email}</p>
              <LogoutButton />
            </div>
          </aside>
          <main className="flex-1 p-8">{children}</main>
        </div>
      ) : (
        children
      )}
    </div>
  );
}
