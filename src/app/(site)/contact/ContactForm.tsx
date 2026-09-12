"use client";

import { useState } from "react";

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    const form = new FormData(e.currentTarget);
    const body = {
      name: String(form.get("name") || ""),
      email: String(form.get("email") || ""),
      message: String(form.get("message") || ""),
    };
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (!res.ok) throw new Error("Request failed");
      setStatus("sent");
      e.currentTarget.reset();
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div className="rounded-2xl border border-line bg-paper-dim p-8">
        <p className="font-display text-xl">Message sent</p>
        <p className="mt-2 text-ink/70">
          Thanks — your message has landed in the Ikinai Media inbox. We&apos;ll reply
          by email or phone.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5">
      <div>
        <label htmlFor="name" className="font-mono text-[12px] uppercase tracking-wider text-ink/60">
          Name
        </label>
        <input
          id="name"
          name="name"
          required
          className="mt-2 w-full rounded-lg border border-line bg-paper px-4 py-3 outline-none focus:border-signal-deep"
        />
      </div>
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
        <label htmlFor="message" className="font-mono text-[12px] uppercase tracking-wider text-ink/60">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          className="mt-2 w-full rounded-lg border border-line bg-paper px-4 py-3 outline-none focus:border-signal-deep"
        />
      </div>
      <button
        type="submit"
        disabled={status === "sending"}
        className="rounded-full bg-ink px-6 py-3 font-mono text-[12px] uppercase tracking-wider text-paper transition hover:bg-signal hover:text-ink disabled:opacity-50"
      >
        {status === "sending" ? "Sending…" : "Send message"}
      </button>
      {status === "error" && (
        <p className="text-sm text-maroon">Something went wrong — please try again, or email us directly.</p>
      )}
    </form>
  );
}
