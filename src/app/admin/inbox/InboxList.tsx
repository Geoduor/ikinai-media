"use client";

import { useState } from "react";

type Submission = {
  id: string;
  name: string;
  email: string;
  message: string;
  read: boolean;
  createdAt: string;
};

export function InboxList({ submissions }: { submissions: Submission[] }) {
  const [items, setItems] = useState(submissions);

  async function toggleRead(id: string, read: boolean) {
    setItems((prev) => prev.map((s) => (s.id === id ? { ...s, read } : s)));
    await fetch(`/api/contact-submissions/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ read }),
    });
  }

  if (items.length === 0) {
    return <p className="text-ink/50">No messages yet.</p>;
  }

  return (
    <div className="divide-y divide-line rounded-2xl border border-line bg-paper">
      {items.map((s) => (
        <div key={s.id} className="flex items-start justify-between gap-6 px-6 py-5">
          <div>
            <div className="flex items-center gap-2">
              <p className="font-display text-lg">{s.name}</p>
              {!s.read && <span className="rounded-full bg-signal px-2 py-0.5 font-mono text-[10px] uppercase text-ink">New</span>}
            </div>
            <p className="text-sm text-ink/50">{s.email}</p>
            <p className="mt-2 max-w-xl text-ink/80">{s.message}</p>
            <p className="mt-2 font-mono text-[11px] uppercase tracking-wider text-ink/40">
              {new Date(s.createdAt).toLocaleString()}
            </p>
          </div>
          <button
            onClick={() => toggleRead(s.id, !s.read)}
            className="shrink-0 rounded-full border border-line px-4 py-2 font-mono text-[11px] uppercase tracking-wider hover:bg-paper-dim"
          >
            {s.read ? "Mark unread" : "Mark read"}
          </button>
        </div>
      ))}
    </div>
  );
}
