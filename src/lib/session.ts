import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { SESSION_COOKIE, verifySessionToken } from "./auth";

export async function getSession() {
  const store = await cookies();
  const token = store.get(SESSION_COOKIE)?.value;
  if (!token) return null;
  return verifySessionToken(token);
}

/** Use inside protected admin pages/layouts to guarantee a real session. */
export async function requireSession() {
  const session = await getSession();
  if (!session) redirect("/admin/login");
  return session;
}
