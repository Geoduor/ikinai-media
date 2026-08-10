import Link from "next/link";
import { Logo } from "./Logo";
import { contact, brand } from "@/lib/site-data";

export function Footer() {
  return (
    <footer className="border-t border-line bg-ink text-paper">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-14 md:grid-cols-4">
        <div>
          <div className="[--signal:#f2c230]">
            <Logo />
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
      <div className="border-t border-paper/10 px-6 py-5 text-center font-mono text-[11px] uppercase tracking-wider text-paper/50">
        © {new Date().getFullYear()} Ikinai Media. All rights reserved.
      </div>
    </footer>
  );
}
