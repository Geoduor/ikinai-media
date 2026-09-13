import Link from "next/link";
import { Logo } from "./Logo";
import { contact, brand, partners } from "@/lib/site-data";

export function Footer() {
  return (
    <footer className="border-t border-line bg-ink text-paper">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-14 md:grid-cols-4">
        <div>
          <div>
            <Logo invert />
          </div>
          <p className="mt-4 max-w-xs font-accent italic text-paper/70">
            &ldquo;{brand.tagline}&rdquo;
          </p>
        </div>

        <div>
          <p className="font-mono text-[12px] uppercase tracking-wider text-signal">Navigate</p>
          <ul className="mt-4 space-y-2 text-sm text-paper/80">
            <li><Link href="/about">About</Link></li>
            <li><Link href="/services">Services</Link></li>
            <li><Link href="/portfolio">Portfolio</Link></li>
            <li><Link href="/news">News</Link></li>
            <li><Link href="/partnerships">Partnerships</Link></li>
          </ul>
        </div>

        <div>
          <p className="font-mono text-[12px] uppercase tracking-wider text-signal">Contact</p>
          <ul className="mt-4 space-y-2 text-sm text-paper/80">
            <li>{contact.phone}</li>
            <li><a href={`mailto:${contact.email}`}>{contact.email}</a></li>
            <li>{contact.address}</li>
          </ul>
        </div>

        <div>
          <p className="font-mono text-[12px] uppercase tracking-wider text-signal">Follow</p>
          <ul className="mt-4 space-y-2 text-sm text-paper/80">
            <li><a href={contact.youtube} target="_blank" rel="noreferrer">YouTube</a></li>
            <li><a href={contact.x} target="_blank" rel="noreferrer">X (Twitter)</a></li>
            <li><a href={contact.instagram} target="_blank" rel="noreferrer">Instagram</a></li>
          </ul>
        </div>
      </div>

      {partners.length > 0 && (
        <div className="border-t border-paper/10 px-6 py-8">
          <div className="mx-auto max-w-6xl">
            <p className="font-mono text-[11px] uppercase tracking-wider text-paper/50">Partners</p>
            <div className="mt-4 flex flex-wrap items-center gap-6">
              {partners.map((p) => (
                <a
                  key={p.name}
                  href={p.url}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-3 rounded-xl bg-paper px-4 py-2 transition hover:opacity-80"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={p.logo} alt={p.name} className="h-9 w-auto" />
                </a>
              ))}
            </div>
          </div>
        </div>
      )}

      <div className="border-t border-paper/10 px-6 py-5 text-center font-mono text-[11px] uppercase tracking-wider text-paper/50">
        © {new Date().getFullYear()} Ikinai Media. All rights reserved.
      </div>
    </footer>
  );
}
