import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Ikinai Media — Digital & Multimedia Production, Nairobi",
    template: "%s — Ikinai Media",
  },
  description:
    "Ikinai Media is a Nairobi-based digital and multimedia company: live broadcasting, videography, photography, digital marketing, and content creation through talk shows, podcasts and documentaries.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-full flex flex-col antialiased">{children}</body>
    </html>
  );
}
