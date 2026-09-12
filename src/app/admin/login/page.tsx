"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Logo } from "@/components/Logo";

export default function AdminLoginPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const form = new FormData(e.currentTarget);
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: form.get("email"),
        password: form.get("password"),
      }),
    });
    setLoading(false);
    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      setError(data.error || "Login failed.");
      return;
    }
    router.push("/admin/dashboard");
    router.refresh();
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-paper-dim px-6">
      <div className="w-full max-w-sm rounded-2xl border border-line bg-paper p-8">
        <Logo />
        <h1 className="mt-6 font-display text-2xl">Admin sign in</h1>
        <form onSubmit={onSubmit} className="mt-6 space-y-4">
          <div>
            <label htmlFor="email" className="font-mono text-[12px] uppercase tracking-wider text-ink/60">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="mt-2 w-full rounded-lg border border-line bg-paper px-4 py-3 outline-none focus:border-signal-deep"
            />
          </div>
          <div>
            <label htmlFor="password" className="font-mono text-[12px] uppercase tracking-wider text-ink/60">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              className="mt-2 w-full rounded-lg border border-line bg-paper px-4 py-3 outline-none focus:border-signal-deep"
            />
          </div>
          {error && <p className="text-sm text-maroon">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-full bg-ink px-6 py-3 font-mono text-[12px] uppercase tracking-wider text-paper transition hover:bg-signal hover:text-ink disabled:opacity-50"
          >
            {loading ? "Signing in…" : "Sign in"}
          </button>
        </form>
      </div>
    </div>
  );
}
