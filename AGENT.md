# AGENT.md — Ikinai Creatives Media Website Rebuild

## Role & Working Agreement
- **Builder:** the user (product owner / decision-maker).
- **Engineer:** Claude, acting as a senior full-stack software engineer responsible for architecture, implementation, and UI/UX quality.
- **Scope discipline:** Claude stays strictly within this spec. Any new feature, page, or content not listed here must be confirmed with the Builder before being added.
- **No hallucinated content:** All company facts, services, contact details, team names, and packages used anywhere in the site MUST come from the source document (`IKINAI_CREATIVES_MEDIA_PROFILE_2023`) or from the Builder directly. If a needed fact isn't available, Claude flags it and asks — it does not invent copy, stats, testimonials, client logos, or team bios.

---

## 1. Company Facts (verified source data — use as-is)

**Name:** Ikinai Creatives Media
**Type:** Digital & Multimedia business (registered with the Department of Business Registration Services, Kenya)

**Tagline / positioning:** A Digital and Multimedia company specializing in Commercial & Outdoor Advertising, Live Broadcasts, News Production, Videography, Photography, Digital Marketing, and Content Creation (talk shows, podcasts, documentaries).

**Mission:** To leverage the ever-growing Digital, Broadcast and Multimedia Economy to empower community livelihoods and build sustainable corporate business.

**Vision:** To disseminate educative and informative content for social change and transformation through timely access to accurate, safe and truthful information.

**Core Services:**
1. Commercial & Outdoor Advertising
2. Live Broadcasting
3. News Production
4. Videography
5. Photography
6. Digital Marketing
7. Content Creation — Talk Shows, Podcasts, Documentaries
8. Event Planning & Promotion
9. Digital Market Reports / brand perception reporting for corporates

**Strategic Objectives:**
- Create a platform for locally-led, innovative, creative, and research-based programs from diverse stakeholders.
- Create an Artistic and Tech Hub for identifying and nurturing local talent.
- Provide a platform showcasing diverse talent via Videography, Fashion Shows, Modelling, Photography, and Media Internship training.
- Disseminate educative content around Law, Environment, Reproductive Health, Technovation, Philosophy, Education, Intellectual Property, and Economics.
- Corporate advertising and live broadcasts.

**Partnership Packages (KSH, as published):**
| Tier | Price | Key Benefits |
|---|---|---|
| Platinum | KSH 250,000 | Show naming rights, banners at events, AV promo (start/mid/end), online brand mentions, digital ad placement, branded host t-shirts |
| Diamond | KSH 150,000 | Show naming rights, AV promo (3x), online brand mentions, digital ad placement, branded host t-shirts |
| Gold | KSH 100,000 | Show naming rights, AV promo (1x), one online brand mention, digital ad placement, branded host t-shirts |

**Leadership:**
- **Bonface Otieno Odhiambo** — Executive Producer. Trained Video & TV Producer/Director, alumnus of the Kenya Institute of Mass Communication (KIMC). Media technology consultant, educator and trainer. Background includes KTN Media (2012–2014), Anti-Counterfeit Agency (2015–2016, media/communications consultant), and current Acting Programs Controller at KUTV Kenya (since late 2016). Also consults with the University of Girona, Spain, on Career Mobility policy and Sports Science & Nutrition.
- **Benedict Oduor** — Legal Counsel.

**Past/Current Partners & Affiliations mentioned in profile:** KTN, KUTV Kenya, Anti-Counterfeit Authority, KIMC, KCB Foundation, TUK, Kenyatta University, Latewa CBO, Ngori Media.

**Contact:**
- Phone: +254 704 107 373
- Email: ikinaimedia@gmail.com (secondary: bodhiambootieno@gmail.com)
- Physical Address: Tana and Athi Rivers Development Authority (TARDA) Godown, Dundori Road, South B
- Social handles referenced: Twitter/Facebook/Instagram/LinkedIn under "Bonface Otieno" / "Ikinai Media" variants — **exact handles/URLs to be confirmed with Builder before linking**, since the source only lists display names, not verified links.

> ⚠️ Any statistic, client testimonial, award, or press mention NOT listed above must not appear on the site until the Builder supplies it.

---

## 2. Brand Identity (from source profile — retain exactly)

- **Primary color:** Bold mustard/gold yellow (matches profile cover & section banners — sample as `#F2C245` pending exact brand hex from Builder)
- **Secondary:** Black (`#111111`) for headings and high-contrast text
- **Background:** White / off-white
- **Accent labels:** Deep maroon/burgundy and slate blue used for sub-headings in the source document — carry these through as tag/label accent colors
- **Typography feel:** Bold, heavy geometric sans-serif for headlines (as seen on cover); serif italic for signature/contact details — replicate this pairing (e.g., a bold grotesk display font + a serif for quotes/bylines)
- **Photography style:** High-contrast black-and-white documentary/street photography mixed with full-color lifestyle/mobile shots — use this same duotone-vs-color contrast approach in hero and section imagery
- **Logo:** Not present as a standalone asset in the source PDF — **ask Builder for a logo file**, or confirm this project should commission/placeholder one.

---

## 3. Site Architecture

### 3a. Public Website (client-facing)
1. **Home** — hero (brand statement + mission), services overview, featured recent posts/news, partnership CTA, contact snippet.
2. **About** — Introduction, Mission & Vision, Strategic Objectives (from source).
3. **Services** — the 9 core services listed above, each with a short description drawn from source text.
4. **Portfolio / Work** — gallery of media work (photos/videos). Populated via Admin; empty state shown until Builder uploads real work samples.
5. **News / Blog / Podcasts** — the "posting" content type the Builder will manage from Admin (articles, talk show episodes, documentaries, event recaps).
6. **Partnerships** — the Platinum/Diamond/Gold package table + partnership opportunity categories (Creative Advertising, Multi-Media Coverage, Promotional Marketing, Event Planning).
7. **Team** — Bonface Otieno Odhiambo (Executive Producer) and Benedict Oduor (Legal Counsel), bios as sourced.
8. **Contact** — address, phone, email, and a contact form that stores submissions for Admin to view (not a public data leak — goes to Admin inbox / notification email).

### 3b. Admin Panel (`/admin`, authenticated, not indexed by search engines)
Content the Builder controls without touching code:
- **Posts/News manager:** create, edit, delete, publish/unpublish, schedule (title, body — rich text, cover image, category, tags, publish date).
- **Portfolio manager:** upload/manage images & video links, categorize by service type.
- **Services manager:** edit service descriptions/order (defaults to source text, editable).
- **Partnership packages manager:** edit tier pricing/benefits without redeploying code.
- **Team manager:** add/edit team members, bios, photos.
- **Contact submissions inbox:** view messages sent via the public contact form.
- **Media library:** central place for uploaded images/video assets.
- **Site settings:** contact info, social links, brand colors (optional theme tokens).
- **Admin authentication:** single admin account to start (email + hashed password, session-based). Designed so a second role (Editor) can be added later without a rebuild, but only one role is built initially.

---

## 4. Tech Stack (confirmed)

- **Framework:** Next.js (App Router), React, TypeScript
- **Database:** PostgreSQL, accessed via an ORM (Prisma)
- **Auth:** NextAuth.js (or equivalent) — credentials-based session auth for the single admin account initially
- **Styling:** Tailwind CSS, using the brand tokens in Section 2
- **Image/video handling:** Next.js Image optimization; video embeds for YouTube/Vimeo links initially (avoids heavy self-hosted video infra unless the Builder requests it)
- **Deployment target:** Frontend + serverless functions on Vercel; database on a managed Postgres provider (e.g., Supabase or Neon) — confirmed by Builder
- **Repo structure:** single Next.js app containing both public site routes and `/admin` routes, sharing one Postgres schema

---

## 5. Explicitly Out of Scope (unless Builder instructs otherwise)
- E-commerce / payment processing
- Multi-language support
- Native mobile app
- Multiple admin roles/permissions (single admin only, for now)
- Self-hosted video streaming infrastructure
- Any invented team members, stats, client logos, or testimonials not supplied by the Builder

---

## 6. Confirmed Real Data (from Builder, Aug 2026)

**Brand name:** Ikinai Media — confirmed final. Matches the logo wordmark and live social handles (@IkinaiMedia / @ikinaimedia). Earlier draft of this doc mistakenly appended "Creatives," reading the Builder's WhatsApp note "ongeza creative at the end" as a literal naming instruction — Builder clarified it meant "be creative with the project" generally, not a name change. The profile PDF's registered filing name, "Ikinai Creatives Media," is used only where the legal entity name is relevant (e.g. footer/legal copy), not as the everyday brand name.

**Logo:** Interlocking yellow ring/knot mark + "IKINAI MEDIA" wordmark with yellow underline, black text, white background. Only seen so far as a WhatsApp screenshot — **actual source file (PNG/SVG) still needed from Builder**; a faithful CSS/SVG recreation will be used as a placeholder until then.

**Confirmed live links:**
- Email: ikinaimedia@gmail.com
- YouTube: https://youtube.com/@ikinaimediacreatives
- X (Twitter): https://x.com/IkinaiMedia
- Instagram: https://www.instagram.com/ikinaimedia ("Engage Africa. Go Digital." — confirmed bio tagline)

**Previous website (github.io/offpitchafrica):** Confirmed by Builder to be a botched/confused build — contains fabricated stats ("150+ Projects", "Founded 2015"), generic pricing unrelated to the real Platinum/Diamond/Gold packages, and social links pointing to a different, unrelated brand ("offpitchafrica"). None of this content is reused. It exists only as a cautionary reference for what NOT to repeat.

**Previous admin dashboard (ikiniamedia.netlify.app/admin):** Old credentials were shared in plaintext over WhatsApp. Not reused. New system gets fresh, securely hashed credentials. Builder should revoke/retire the old Netlify admin once the new site is live.

## 7. Still Open
1. Actual logo source file (PNG/SVG) — currently using a faithful recreation.
2. Real portfolio media (images/video links) to seed the Portfolio section.
3. Any additional team members beyond the two named in the profile.
4. Final domain name + production Vercel/DB (Supabase or Neon) account access.

---

## 8. Engineering Workflow
1. Confirm this AGENT.md with the Builder — no build starts until sign-off.
2. Scaffold Next.js + Prisma + Postgres schema (Posts, Portfolio items, Services, Packages, Team, ContactSubmissions, AdminUser).
3. Build public site pages using placeholder-but-labeled content only where real data is missing (never silently fabricated copy).
4. Build Admin panel with auth, CRUD screens per content type.
5. Wire public pages to pull live content from the database (no hardcoded blog posts).
6. Review pass with Builder before deployment; deploy once Open Items (Section 6) are resolved.
