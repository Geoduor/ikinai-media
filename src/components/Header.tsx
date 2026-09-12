import Link from "next/link";
import { Logo } from "./Logo";

const links = [
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/news", label: "News" },
  { href: "/partnerships", label: "Partnerships" },
  { href: "/team", label: "Team" },
  { href: "/contact", label: "Contact" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-paper/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" aria-label="Ikinai Media home">
          <Logo />
        </Link>
        <nav className="hidden gap-7 md:flex">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="font-mono text-[13px] uppercase tracking-wider text-ink/70 transition hover:text-ink"
            >
              {l.label}
            </Link>
          ))}
        </nav>
        <Link
          href="/contact"
          className="hidden rounded-full bg-ink px-5 py-2 font-mono text-[12px] uppercase tracking-wider text-paper transition hover:bg-signal hover:text-ink md:inline-block"
        >
          Start a project
        </Link>
      </div>
    </header>
  );
}
