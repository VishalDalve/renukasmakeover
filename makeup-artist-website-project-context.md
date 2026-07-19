# Project Context: Premium Makeup Artist Website (India)

> This file is a self-contained context dump. Paste it into any AI chat (ChatGPT, Claude, Gemini, etc.) to resume this project without re-explaining background.

---

## 1. Project Goal

Build a **top-notch, premium-feeling website for a makeup artist targeting Indian clients** — explicitly different from the generic/templated look of typical Indian MUA websites. The site must also support a **self-makeup & hairstyling class business** the artist runs (1-day crash course, 3-day intensive, custom batches).

## 2. Who's building it

- Builder: a Senior Backend Engineer (10+ years experience, Node.js/TypeScript/payment gateways/blockchain background), based in India, comfortable writing full-stack code — so solutions should lean toward **developer-friendly, low/no-cost, self-managed infrastructure** rather than paid no-code SaaS/page builders.
- Candidate profile for the site: Instagram handle `@renukasmakeover_` was raised as a possible subject — **not yet verified/confirmed**, since Instagram blocks automated fetching and a search did not return a confirmed match. Treat this as unconfirmed until the user supplies bio text, screenshots, or follower/content details directly.

## 3. Reference sites analyzed (competitors / inspiration, Indian market)

- `https://bridemeup.in/contact-us/` — generic template contact page, the "regular" look to avoid.
- `https://tanyaaroramakeovers.com/` — clean Elementor build, brand-name dropping (Dior/MAC/Charlotte Tilbury), has workshop services listed, but generic template feel, no WhatsApp click-to-chat, no Google reviews embed, social links go to generic pages not actual handles, no visible schema markup.
- `https://www.parulgargmakeup.com/` — Squarespace-based, good typography baseline, YouTube linked, WhatsApp number listed, separate Academy/course pages — but homepage is mostly navigation with little storytelling, no visible testimonials, course pages not differentiated by duration.

**Conclusion from analysis:** all three are competent but templated; none combine reviews + Instagram + YouTube + WhatsApp + booking into one seamless trust system. That integration gap is the opportunity.

## 4. Design direction decided

- Aesthetic: **"modern Indian luxury"** — deep jewel tones (emerald, maroon, plum, gold-foil accents) on warm ivory/off-white base. Explicitly avoid rose-gold/glitter clichés and generic Elementor-template look.
- Typography: one elegant serif (headlines) + one clean sans-serif (body).
- Photography: consistent single editing preset across the whole portfolio for a cohesive editorial feel.
- Motion: subtle fade-ins/hover-zoom only — calm, not busy/gimmicky.
- Signature mark: simple monogram/wordmark used consistently across site, Instagram, WhatsApp Business profile.

## 5. Site structure decided

Home → About ("Meet [Name]") → Portfolio (filterable: Bridal/Party/Editorial/Family/Before-After) → Services & Pricing (Bridal packages, party/family, add-ons, transparent starting-price ranges) → **Self-Makeup & Hairstyling Classes** (course finder: 1-day / 3-day / weekend batch / custom corporate; curriculum breakdown; live batch calendar; digital certificates; student testimonials separate from client testimonials) → Gallery/Press → Blog (SEO engine) → Contact (WhatsApp primary CTA, booking calendar embed, click-to-call, Google Maps embed, QR code, form as backup).

## 6. Required integrations & how to implement them

- **Google Business Profile + Reviews**: live rating widget (not screenshot), identical NAP across site/GBP, weekly GBP posting, review-request link sent via WhatsApp post-appointment.
- **Instagram**: live auto-refreshing embed (official oEmbed/Graph API), not static grid.
- **YouTube**: embed latest video/playlist (GRWM, tutorials, class walkthroughs) — used both for SEO dwell-time and as a class sales tool.
- **WhatsApp direct enquiry**: `wa.me/91XXXXXXXXXX?text=...` click-to-chat links, pre-filled with page-specific intent text (different message from Services page vs. Classes page); later automation via **Meta's official WhatsApp Cloud API directly** (not a paid BSP like WATI/Interakt) since the user can code.
- **QR code**: must be **dynamic** (redirect-based, e.g. via a small Cloudflare Worker) so destination can change without reprinting; used on studio signage, class certificates, and a second one at checkout specifically for Google review requests.

## 7. SEO strategy agreed

- Technical: fast static/well-optimized site, HTTPS, clean URLs (`/services/bridal-makeup-pune`, `/classes/3-day-self-makeup-course`), sitemap, **schema.org markup** (LocalBusiness/BeautySalon, Review/AggregateRating, Course, FAQPage) — increasingly important since Google's AI Overviews pull from structured data.
- On-page: dedicated service+location landing pages if multi-city, long-tail keyword targeting (e.g. "HD vs airbrush bridal makeup difference," "self makeup course for brides near me"), genuinely useful (non-templated) blog content, internal linking, descriptive image file names/alt text for Google Images traffic.
- Local: complete GBP optimization, citations on Indian directories (Justdial, Sulekha, WeddingWire India, WedMeGood), active review requests, backlinks from photographers/venues/planners collaborated with.

## 8. Trends/tools to differentiate

- AR virtual try-on widget (e.g. GlamAR) — "Preview Your Bridal Look."
- AI-assisted look-consultation quiz (skin tone/outfit/event time → package recommendation) doubling as lead capture.
- Real-time booking calendar instead of "contact for availability."
- Digital, QR-verifiable class certificates for course graduates.
- Alumni/community page for class graduates.
- Short-form video (Reels/Shorts) embedded natively, not just linked.

## 9. Tech stack decided (optimized for lowest/no server cost, dev-friendly)

| Layer | Choice | Why |
|---|---|---|
| Framework | Astro (content/SEO-heavy) or Next.js (if more interactivity/booking/AR needed) | Astro = zero JS by default; Next.js = more app-like features |
| Hosting | **Cloudflare Pages** | Free tier, unlimited bandwidth, no egress surprises |
| File/image/video storage | **Cloudflare R2** | 10GB free, **zero egress fees ever** — critical for a photo-heavy portfolio |
| Image optimization | Cloudflare Image Resizing / `astro:assets` / `next/image` | Free, avoids Cloudinary/Imgix cost |
| Video hosting | **YouTube embeds** (don't self-host video) | Free, unlimited bandwidth, built-in discovery/SEO |
| CMS | Sanity.io free tier, or just MDX files in git (zero cost, zero moving parts) | For editing content without touching code |
| Booking | **Cal.com** (open-source, free tier, self-hostable later) | Avoids Fresha/Vagaro subscription lock-in |
| Contact form | Web3Forms, or Cloudflare Worker + Resend (free 3,000 emails/mo) | No backend needed |
| WhatsApp (basic) | Plain `wa.me/...` links | Free, no API needed |
| WhatsApp (automation, later) | Meta's official WhatsApp Cloud API directly | Free tier of conversations, no paid BSP middleman needed since user can code |
| Dynamic QR | Small Cloudflare Worker doing a redirect | Free, fully self-controlled vs. paid QR SaaS |
| Google reviews embed | Google Places API (generous free credit) | Avoids paid widget SaaS (Elfsight etc.) |
| Instagram embed | Instagram official oEmbed/Graph API | Free, avoids paid widget SaaS |
| Analytics | Cloudflare Web Analytics + GA4 + Search Console | All free |
| Student portal/DB (if built later, for class certificates/batches) | Supabase free tier (Postgres + Auth + Storage) | Generous free tier |
| Domain/DNS | Cloudflare Registrar (at-cost pricing) | Only unavoidable real cost, ~₹700–1000/year |

**Realistic total cost: ₹0–100/month + yearly domain renewal.** This beats Squarespace/Wix/Webflow ($16–40/month with bandwidth/image limits) given the site is photo-heavy.

## 10. Domain guidance agreed

- Register both `.com` and `.in`; make `.com` canonical if available, 301-redirect the other to it.
- `.in` is genuinely fine (no SEO penalty) for an India-focused service business; `.com` matters more only if targeting NRI/destination-wedding/international clients.
- Domain should be the **artist's personal name** (e.g. `firstnamelastname.com`), not a generic keyword domain (e.g. `punebridalmakeup.com`) — keyword domains read as agency/directory sites and dilute personal-brand SEO. Fallback patterns if exact name is taken: `byname.com`, `namemakeup.com`, `namestudio.com`.

## 11. Open items / not yet resolved

- Confirm the actual artist/brand name and finalize domain name options.
- Verify the Instagram handle/profile intended for this project (bio, content mix, follower count) — not yet confirmed.
- Decide Astro vs. Next.js based on how interactive the booking/AR/quiz features need to be.
- Decide whether a CMS (Sanity) or git-based MDX content is preferred long-term.

## 12. Full guide document already produced

A comprehensive standalone guide (site structure, design direction, SEO, integrations, trends, checklist) was created as a markdown file: `premium-makeup-artist-website-guide.md`. This context file is a condensed companion — refer to that document for full prose detail if needed.
