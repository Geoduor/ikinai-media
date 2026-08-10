// Recreation of the Ikinai Media knot mark from the reference screenshot.
// Replace the <svg> below with the real logo file as soon as the Builder
// supplies one (see AGENT.md "Still Open" item #1).

export function Logo({ className = "", withWordmark = true }: { className?: string; withWordmark?: boolean }) {
  return (
    <span className={`inline-flex items-center gap-3 ${className}`}>
      <svg viewBox="0 0 64 64" width="36" height="36" aria-hidden="true">
        <g fill="none" stroke="var(--signal)" strokeWidth="6" strokeLinecap="round">
          <path d="M20 12 C8 12 8 32 20 32 C32 32 32 12 44 12 C56 12 56 32 44 32" />
          <path d="M44 52 C56 52 56 32 44 32 C32 32 32 52 20 52 C8 52 8 32 20 32" />
        </g>
      </svg>
      {withWordmark && (
        <span className="flex flex-col leading-none">
          <span className="font-display text-[15px] tracking-tight text-ink">IKINAI</span>
          <span className="font-display text-[15px] tracking-tight text-ink -mt-0.5">MEDIA</span>
          <span className="mt-1 h-[2px] w-6 bg-signal" />
        </span>
      )}
    </span>
  );
}
