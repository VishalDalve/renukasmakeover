# Setup Guide

## Run locally

```bash
npm install
npm run dev
```

Site runs at `http://localhost:4321`. `npm run build` produces a static `dist/` folder; `npm run preview` serves that build locally.

## Replace placeholder content

Everything marked `PLACEHOLDER` needs a real value before launch:

- `src/data/site.ts` — brand name, phone, WhatsApp number, email, address, geo coordinates, Instagram/YouTube URLs.
- `src/data/services.ts` — package names, prices, descriptions.
- `src/pages/about.astro` — artist bio, photo.
- `src/pages/portfolio.astro`, `src/pages/gallery.astro` — real photos (currently dashed placeholder tiles).
- `src/content/blog/*.md` — real blog posts.

## Integrations

Copy `.env.example` to `.env` and fill in values as you get them. `.env` is already gitignored — never commit real keys.

For detailed, step-by-step instructions (with exact click paths, curl commands, and troubleshooting) for each integration below, see **[API_SETUP.md](API_SETUP.md)**:

1. **Instagram** — live auto-refreshing feed via the Instagram Graph API (`INSTAGRAM_ACCESS_TOKEN`, `INSTAGRAM_USER_ID`)
2. **Google Reviews** — live rating widget via the Google Places API (`GOOGLE_PLACES_API_KEY`, `GOOGLE_PLACE_ID`)
3. **Google Maps** — location embed set directly via `site.googleMapsEmbedSrc` in `src/data/site.ts` (a "Share > Embed a map" URL, no API key needed). `PUBLIC_GOOGLE_MAPS_EMBED_KEY` remains a fallback if that field is ever cleared.
4. **WhatsApp** — click-to-chat (already working, just update the number in `src/data/site.ts`) and the Cloud API for later automation

## Not yet wired up (per project scope)

- Booking calendar (Cal.com) — intentionally deferred.
- Dynamic QR code redirect (Cloudflare Worker) — intentionally deferred.
- Hosting (Cloudflare Pages) — set up once local build is finalized.
