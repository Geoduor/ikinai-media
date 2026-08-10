"use client";

import { useRouter } from "next/navigation";

export function LogoutButton() {
  const router = useRouter();
  return (
    <button
      onClick={async () => {
        await fetch("/api/auth/logout", { method: "POST" });
        router.push("/admin/login");
        router.refresh();
      }}
      className="mt-3 font-mono text-[11px] uppercase tracking-wider text-paper/60 underline hover:text-paper"
    >
      Log out
    </button>
  );
}
