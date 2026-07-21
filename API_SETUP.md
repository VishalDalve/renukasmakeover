# API & Integration Setup Guide

Step-by-step instructions for every external API/key this project uses. Each section ends with
exactly which `.env` variable(s) to fill in and which file in the repo consumes them.

Copy `.env.example` to `.env` first if you haven't:

```bash
cp .env.example .env
```

`.env` is already gitignored — never commit real keys, and never paste real tokens/secrets into
chat, tickets, or screenshots.

---

## 1. Instagram Graph API (live auto-refreshing feed)

Used by: `src/components/InstagramFeed.astro` · Env vars: `INSTAGRAM_ACCESS_TOKEN`, `INSTAGRAM_USER_ID`

Requires an Instagram **Business or Creator** account (not personal) linked to a Facebook Page.

### Step 1 — Convert to a Business/Creator account
1. Open the Instagram app → profile → **☰ menu → Settings and privacy → Account type and tools**
2. Tap **Switch to professional account** → choose **Business**
3. Pick a category (e.g. "Beauty, Cosmetic & Personal Care")

### Step 2 — Link a Facebook Page
1. In Instagram: **Settings → Account Center → Accounts** (or "Linked accounts")
2. Connect or create a Facebook Page and link this Instagram account to it
   - No Page yet? Create one free at facebook.com/pages/create — any name works, it's just the
     container Meta requires to issue API access

### Step 3 — Create a Meta Developer App
1. Go to [developers.facebook.com](https://developers.facebook.com), log in with the account that
   manages the Page
2. **My Apps → Create App → "Other" → "Business"**
3. Name it (e.g. "Renukas Makeover Website")
4. Sidebar → **Add Product** → find **Instagram Graph API** → **Set Up**

### Step 4 — Generate a short-lived access token
1. **Tools → Graph API Explorer**
2. Right panel → select your app → **User or Page → Get Token → Get User Access Token**
3. Check permissions: `instagram_basic`, `pages_show_list`, `pages_read_engagement`
4. **Generate Access Token** → approve → copy the token (valid ~1 hour)

### Step 5 — Exchange for a long-lived token (60 days)
Find your **App ID** and **App Secret** under **App Settings → Basic**, then run:

```bash
curl -s "https://graph.facebook.com/v21.0/oauth/access_token?grant_type=fb_exchange_token&client_id=YOUR_APP_ID&client_secret=YOUR_APP_SECRET&fb_exchange_token=YOUR_SHORT_LIVED_TOKEN"
```

The `access_token` in the response is your long-lived token — this is `INSTAGRAM_ACCESS_TOKEN`.

### Step 6 — Get your Instagram User ID
```bash
# A) list Pages you manage
curl -s "https://graph.facebook.com/v21.0/me/accounts?access_token=YOUR_LONG_LIVED_TOKEN"

# B) use the "id" from (A) as PAGE_ID
curl -s "https://graph.facebook.com/v21.0/YOUR_PAGE_ID?fields=instagram_business_account&access_token=YOUR_LONG_LIVED_TOKEN"
```
`instagram_business_account.id` in (B)'s response is `INSTAGRAM_USER_ID`.

### Step 7 — Fill in `.env`
```
INSTAGRAM_ACCESS_TOKEN=...
INSTAGRAM_USER_ID=...
```

### Step 8 — Verify
Restart `npm run dev` and check the homepage Instagram section — it switches from the placeholder
grid to real posts automatically once both vars are set.

### Maintenance
Long-lived tokens expire in ~60 days. Refresh before expiry:
```bash
curl -s "https://graph.instagram.com/refresh_access_token?grant_type=ig_refresh_token&access_token=YOUR_CURRENT_TOKEN"
```
Put a recurring reminder on the calendar, or automate this later with a small scheduled script.
If the token silently expires, the feed just falls back to the placeholder grid — no build error.

### Troubleshooting
- **"Invalid OAuth access token"** — token expired or wrong permissions; regenerate from Step 4.
- **Empty feed, no error** — `INSTAGRAM_ACCESS_TOKEN` or `INSTAGRAM_USER_ID` missing/blank in `.env`,
  or the account isn't actually Business/Creator yet.
- **App in "Development Mode"** — fine for this use case (you're the only user calling the API),
  no App Review needed since you're only reading your own account's media.

---

## 2. Google Places API (live Google Reviews rating widget)

Used by: `src/components/GoogleReviews.astro` · Env vars: `GOOGLE_PLACES_API_KEY`, `GOOGLE_PLACE_ID`

### Step 1 — Create/select a Google Cloud project
1. Go to [console.cloud.google.com](https://console.cloud.google.com)
2. Top bar project dropdown → **New Project** (or reuse an existing one) → name it, create

### Step 2 — Enable the Places API
1. Left sidebar → **APIs & Services → Library**
2. Search **"Places API"** → open it → **Enable**
   - Billing must be attached to the project (Google requires a card on file), but Places API has a
     generous free monthly credit — normal usage here won't incur charges

### Step 3 — Create an API key
1. **APIs & Services → Credentials → + Create Credentials → API key**
2. Click **Edit API key** (or the pencil icon) to restrict it:
   - **Application restrictions:** None (this key is only used server-side at build time, never
     sent to the browser, so IP/referrer restriction isn't needed — just keep it out of git)
   - **API restrictions:** restrict to **Places API** only

### Step 4 — Find your Place ID
1. Open Google's [Place ID Finder tool](https://developers.google.com/maps/documentation/places/web-service/place-id)
2. Search the business by name/address → copy the **Place ID** shown
   - Alternative: Google Business Profile → **Info → Share profile** → the link contains the Place ID

### Step 5 — Fill in `.env`
```
GOOGLE_PLACES_API_KEY=...
GOOGLE_PLACE_ID=...
```

### Step 6 — Verify
Restart `npm run dev` — the homepage reviews section switches from placeholder testimonials to the
real Google rating + up to 5 reviews.

### Maintenance
This fetches at **build time**, not live in the browser — rebuild/redeploy periodically (daily or
weekly) once hosted so the rating stays current. A Cloudflare Pages scheduled/cron deploy trigger
works well for this later.

### Troubleshooting
- **"REQUEST_DENIED"** — API key restricted to the wrong API, or Places API not enabled on the project.
- **Only 5 reviews show** — that's a hard Google limit on the `reviews` field, not a bug.
- **"This API project is not authorized"** — billing not enabled on the Cloud project yet.

---

## 3. Google Maps Embed API (studio location map)

Used by: `src/components/MapEmbed.astro` · Env var: `PUBLIC_GOOGLE_MAPS_EMBED_KEY`

This key **is** exposed to the browser (hence the `PUBLIC_` prefix Astro requires), so it must be
locked down to one API and your domain(s).

### Step 1 — Enable the Maps Embed API
Same Google Cloud project as above → **APIs & Services → Library** → search **"Maps Embed API"** → **Enable**

### Step 2 — Create a second, separate API key
Don't reuse the Places key — a browser-exposed key needs different restrictions.
1. **APIs & Services → Credentials → + Create Credentials → API key**
2. Restrict it:
   - **Application restrictions → Websites** → add your production domain(s) and `localhost` (for
     local dev), e.g. `renukasmakeover.com/*`, `localhost:4321/*`
   - **API restrictions** → **Maps Embed API** only

### Step 3 — Fill in `.env`
```
PUBLIC_GOOGLE_MAPS_EMBED_KEY=...
```

### Step 4 — Verify
Restart `npm run dev`, open `/contact` — the map placeholder becomes a live embedded Google Map.

### Troubleshooting
- **Blank grey box / "For development purposes only" watermark** — billing not enabled, or the key
  is missing the `Maps Embed API` restriction.
- **Map loads on localhost but not production** — production domain not added to the website
  restriction list in Step 2.

---

## 4. WhatsApp

### 4a. Click-to-chat (already working, no API key needed)
Just a `wa.me` link — update the real number in `src/data/site.ts`:
```ts
phone: "+91XXXXXXXXXX",
whatsapp: "91XXXXXXXXXX", // same number, digits only, no +
```

### 4b. WhatsApp Cloud API (later — for automated replies/booking confirmations)
Deferred per project scope, but when you're ready:

1. In the same Meta Developer app used for Instagram (Section 1) → **Add Product → WhatsApp**
2. Meta auto-provisions a test phone number for development — send yourself a test message to confirm setup
3. **WhatsApp → API Setup** page gives you a temporary access token + Phone Number ID immediately
4. For production: **WhatsApp → Getting Started** → add your real business number, verify it via SMS/call
5. Generate a permanent access token: **App Settings → Advanced → System Users** → create a system
   user → generate a token with `whatsapp_business_messaging` permission
6. No paid BSP (WATI/Interakt) needed — this is the free, official Meta API, callable directly from
   a Cloudflare Worker or any backend you write later

This is a build-later item; nothing in the current codebase references it yet.

---

## Quick reference — all `.env` variables

| Variable | Section | Exposed to browser? |
|---|---|---|
| `INSTAGRAM_ACCESS_TOKEN` | §1 | No |
| `INSTAGRAM_USER_ID` | §1 | No |
| `GOOGLE_PLACES_API_KEY` | §2 | No |
| `GOOGLE_PLACE_ID` | §2 | No |
| `PUBLIC_GOOGLE_MAPS_EMBED_KEY` | §3 | Yes — must be domain-restricted |

Anything without the `PUBLIC_` prefix is server/build-time only and never reaches the browser bundle.
