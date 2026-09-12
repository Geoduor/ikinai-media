import { NextRequest, NextResponse } from "next/server";
import { SESSION_COOKIE } from "@/lib/session-cookie";

// Next.js 16 renamed "middleware.ts" to "proxy.ts" (same edge-runtime request
// interception, clarified naming). This intentionally stays a *thin* check —
// cookie presence only. Full JWT verification happens server-side in
// requireSession()/getSession(), since that needs the Node runtime.
export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (pathname === "/admin/login") return NextResponse.next();

  const hasCookie = req.cookies.has(SESSION_COOKIE);
  if (!hasCookie) {
    const loginUrl = new URL("/admin/login", req.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
