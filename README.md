# Linkgurus website

Arabic-first bilingual site built from `LINKGURUS-WEBSITE-BUILD-SPEC.md`.
Arabic is served from the root; English from `/en/`.

Stack: Next.js App Router + TypeScript, Tailwind v4 tokens, MySQL via
`mysql2`, authenticated SMTP via nodemailer, and a database-backed email job
queue drained by a protected worker endpoint.

## Local development

```bash
npm install
cp .env.example .env.local     # fill in the values you have
npm run assets:stage           # copy template PDFs into private storage
npm run dev
```

The site renders without a database. Form submissions return their normal
generic response and are logged as failures until `DATABASE_*` is configured —
they never surface an error that would distinguish one address from another.

## Deploy (Hostinger Business, Node.js Web App)

1. Set every variable from `.env.example` in hPanel. No secret belongs in git.
2. `npm ci && npm run build`
3. `npm run assets:stage` — copies the downloadable PDFs from
   `TEMPLATE_SOURCE_DIR` into `PRIVATE_TEMPLATE_DIR`. The destination must sit
   **outside** `public/`.
4. `npm run db:migrate` — idempotent, safe to re-run.
5. `npm run db:seed` — registers templates and their per-locale files, and
   verifies each staged file's checksum.
6. Schedule the email worker (hPanel cron), at most once a minute:

   ```
   curl -fsS -X POST https://<host>/api/internal/email-worker/ \
     -H "Authorization: Bearer $CRON_SECRET"
   ```

7. Record the plan's actual resource and email limits in `DEPLOYMENT-NOTES.md`
   before launch (spec 10.5). Hostinger's built-in server mail is capped at 10
   messages/minute and 100/day, which is why authenticated SMTP is required.

## Scripts

| Script | Purpose |
|---|---|
| `npm run dev` / `build` / `start` | Next.js |
| `npm run typecheck` | `tsc --noEmit` |
| `npm run assets:stage` | Copy template PDFs into private storage |
| `npm run db:migrate` | Apply `scripts/schema.sql` |
| `npm run db:seed` | Seed the template registry with checksums |
| `npx tsx scripts/trim-logos.ts` | Regenerate the cropped logo lockups |

## Editing content

- `src/content/ar.ts` and `src/content/en.ts` are **independently authored**.
  English is an institutional counterpart, not a translation of the Arabic —
  do not regenerate one from the other.
- `src/content/pages.ts` is the route registry. A page exists in a locale only
  if it is listed there; that list drives the language toggle, `hreflang` and
  the sitemap.
- Design tokens live in `src/styles/globals.css`, transcribed from
  `BRAND_BUNDLE.md` section 5. Ramp names are spelled out (`blue-500`, not
  `b-500`) because `border-b-500` would otherwise mean a 500px bottom border.

## Source material is not in this repository

The build spec, `BRAND_BUNDLE.md`, the research phases and the template
HTML/PDF sources are deliberately not committed. They live on the working
machine and are listed in `.gitignore`.

A clean clone therefore builds, but with two gaps: template file sizes render
as a dash, and `npm run assets:stage` reports every asset as missing. Supply
the sources and point `TEMPLATE_SOURCE_DIR` at them before deploying.

## What is deliberately not here

Case studies, testimonials, client logos, metrics, prices, a team page, and
any nine-offer grid. Several pages render a labelled prototype placeholder
where a founder decision, legal review or accessibility test is outstanding;
those placeholders are the gate, and must be resolved rather than deleted.
