export function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="flex items-center gap-2 font-mono text-[12px] uppercase tracking-[0.2em] text-maroon">
      <span className="on-air-dot" aria-hidden="true" />
      {children}
    </p>
  );
}

export function Section({
  children,
  className = "",
  tone = "paper",
}: {
  children: React.ReactNode;
  className?: string;
  tone?: "paper" | "dim" | "ink";
}) {
  const bg = tone === "dim" ? "bg-paper-dim" : tone === "ink" ? "bg-ink text-paper" : "bg-paper";
  return (
    <section className={`${bg} ${className}`}>
      <div className="mx-auto max-w-6xl px-6 py-20">{children}</div>
    </section>
  );
}
