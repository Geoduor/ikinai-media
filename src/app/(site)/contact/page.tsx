import { Eyebrow, Section } from "@/components/ui";
import { contact } from "@/lib/site-data";
import { ContactForm } from "./ContactForm";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Contact" };

export default function ContactPage() {
  return (
    <Section>
      <Eyebrow>Get in touch</Eyebrow>
      <h1 className="mt-3 max-w-2xl font-display text-4xl md:text-5xl">Contact us</h1>

      <div className="mt-12 grid gap-12 md:grid-cols-2">
        <div>
          <dl className="space-y-6">
            <div>
              <dt className="font-mono text-[12px] uppercase tracking-wider text-maroon">Phone</dt>
              <dd className="mt-1 text-lg">{contact.phone}</dd>
            </div>
            <div>
              <dt className="font-mono text-[12px] uppercase tracking-wider text-maroon">Email</dt>
              <dd className="mt-1 text-lg">{contact.email}</dd>
            </div>
            <div>
              <dt className="font-mono text-[12px] uppercase tracking-wider text-maroon">Address</dt>
              <dd className="mt-1 text-lg">{contact.address}</dd>
            </div>
          </dl>
        </div>
        <ContactForm />
      </div>
    </Section>
  );
}
