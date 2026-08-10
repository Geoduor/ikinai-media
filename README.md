# Ikinai Media — Website

Next.js (App Router) + TypeScript + Tailwind CSS + Prisma. One codebase serves both
the public site and the `/admin` dashboard.

## What's here

- **Public site:** Home, About, Services, Portfolio, News, Partnerships, Team, Contact
- **Admin dashboard** (`/admin`): login, dashboard, Posts manager (create/edit/publish/delete),
  Contact inbox
- All real content lives in `src/lib/site-data.ts` (static brand/company facts) and the
  database (Posts, Portfolio items, Contact submissions — things the Builder edits without
  touching code)

See `AGENT.md` for the full project brief, brand data, and open items.

## Getting started (local development)

> 📌 **Prisma is pinned to `6.19.3`.** Prisma 7 (released very recently) made a breaking
> change that drops support for `url` inside `schema.prisma` and instead requires a
> separate `prisma.config.ts` plus driver adapters even for a plain `new PrismaClient()`.
> Don't run `npm install prisma@latest` / `npm install @prisma/client@latest` — that will
> pull in Prisma 7 and break `prisma generate` with a `P1012` schema validation error.

> 📌 **This project uses Postgres (Supabase or Neon), not SQLite** — for both local dev
> and production. Using one shared database for now keeps things simple while the site is
> small; split into separate dev/prod databases later if needed.

> 📌 **Windows + npm's script-blocking:** recent npm versions block dependency install
> scripts by default. After `npm install`, if you see a `allow-scripts` warning listing
> packages like `@prisma/client`, `esbuild`, etc., run:
> ```powershell
> npm approve-scripts --allow-scripts-pending
> npm install
> ```
> Also, on Windows use PowerShell syntax for cleanup commands (`Remove-Item -Recurse -Force
> node_modules`), not `rmdir /s /q` (that's Command Prompt-only).

1. **Create a Postgres database** on [Supabase](https://supabase.com) or
   [Neon](https://neon.tech) (both have free tiers) and copy its connection string.

2. **Install dependencies**
   ```bash
   npm install
   ```
   (`postinstall` automatically runs `prisma generate`.)

3. **Set environment variables** — copy `.env.example` to `.env` and fill in:
   - `DATABASE_URL` — your Supabase/Neon Postgres connection string from step 1
   - `AUTH_SECRET` — generate one with `openssl rand -base64 32`
   - `SEED_ADMIN_EMAIL` / `SEED_ADMIN_PASSWORD` — your first admin login (choose a strong
     password — do **not** reuse the old exposed `ikinai2025admin` password)

4. **Create the database tables and admin account**
   ```bash
   npm run db:migrate   # creates tables
   npm run db:seed      # creates your admin login + seeds Services/Packages/Team
   ```

5. **Run the dev server**
   ```bash
   npm run dev
   ```
   Visit `http://localhost:3000` for the public site and `http://localhost:3000/admin/login`
   to sign in with the credentials from step 3.

## Deploying (Vercel)

1. Push the project to GitHub and import it into Vercel.
2. In Vercel's project settings, set the same environment variables from `.env` — reuse the
   same `DATABASE_URL` from local dev (or a separate production database, once you want one).
3. Vercel will run `npm install` (which runs `prisma generate`) and `npm run build`
   automatically. Since you already ran `db:migrate`/`db:seed` locally against this same
   database, tables and the admin account already exist — no extra step needed on Vercel
   itself, as long as `DATABASE_URL` matches.
4. Point your domain at the Vercel deployment.

## Content model quick reference

| What | Where it's edited |
|---|---|
| Company facts, services, packages, team bios, contact info | `src/lib/site-data.ts` (code — for the Builder + Engineer to update together) |
| News/blog posts | Admin → Posts (fully self-serve) |
| Contact form submissions | Admin → Contact inbox |
| Portfolio items | Not yet wired to an admin UI — schema exists (`PortfolioItem`), editor screen is next on the roadmap (see AGENT.md Section 3b) |

## Known gaps (see AGENT.md "Still Open")

1. Real logo file — currently a faithful SVG recreation from a WhatsApp screenshot.
2. Real portfolio media.
3. Portfolio/Team/Packages admin editors (schema ready, UI not built yet — Posts and
   Contact inbox were prioritized first since "posting and updates" was the headline ask).
4. Verified additional team members, if any exist beyond the two in the source profile.
5. First real deploy + smoke test, since this sandbox couldn't reach Prisma's binary host.
