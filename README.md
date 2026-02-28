# albertpardopol.com

Personal medical website for Dr. Albert Pardo Pol — hand surgeon in Barcelona.

## Tech Stack

- **Next.js 15** (App Router, static export)
- **TypeScript**
- **Tailwind CSS v4**
- Server Components by default, minimal client JS

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). The root `/` redirects to `/es`.

## Project Structure

```
app/
  [locale]/
    page.tsx              # Landing page
    layout.tsx            # Locale layout (SEO, structured data)
    aviso-legal/          # Legal notice
    politica-de-privacidad/
    politica-de-cookies/
  sitemap.ts
  robots.ts
  globals.css

components/
  Header.tsx              # Sticky header with language switcher
  Hero.tsx                # Above-the-fold hero with CTAs
  TrustRow.tsx            # Scrollable trust chips
  Conditions.tsx          # Common consultation reasons
  Centers.tsx             # Practice locations
  Reviews.tsx             # Patient reviews (horizontal scroll on mobile)
  FAQ.tsx                 # Accordion FAQ
  Contact.tsx             # Phone, email, WhatsApp
  Footer.tsx              # Legal links
  StickyCTA.tsx           # Mobile sticky booking button
  LanguageSwitcher.tsx    # ES | CA | EN toggle

lib/
  config.ts               # Booking URLs, contact info, feature flags
  reviews.ts              # Patient reviews dataset
  track.ts                # Analytics stub
  seo.ts                  # SEO metadata & structured data helpers
  i18n/
    index.ts              # Dictionary loader
    types.ts              # Dictionary type definition
    es.ts                 # Spanish translations
    ca.ts                 # Catalan translations
    en.ts                 # English translations

middleware.ts             # Locale redirect (/ → /es)
```

## Configuration

### Booking Links

Edit `lib/config.ts` to set real booking URLs:

```ts
export const booking = {
  hospitalDelMar: { url: "https://...", phone: "+34..." },
  vithas: { url: "https://...", phone: "+34..." },
  privado: { url: "https://...", phone: "+34..." },
  default: "https://...",
};
```

### Contact Info

Also in `lib/config.ts`:

```ts
export const contact = {
  phone: "+34 600 000 000",
  email: "info@albertpardopol.com",
  whatsapp: "https://wa.me/34600000000",
};
```

### Patient Reviews

Edit `lib/reviews.ts` to replace fake reviews with real ones.

Toggle the structured data flag in `lib/config.ts`:

```ts
export const REVIEWS_ARE_VERIFIED = false; // Set to true when using real reviews
```

When `false`, no Review/AggregateRating schema is rendered.

### Translations

Edit the dictionary files in `lib/i18n/`:

- `es.ts` — Spanish
- `ca.ts` — Catalan
- `en.ts` — English

All strings are type-checked against `lib/i18n/types.ts`.

### Site URL

Update `SITE_URL` in `lib/config.ts` before deploying:

```ts
export const SITE_URL = "https://albertpardopol.com";
```

## Analytics

A tracking stub is at `lib/track.ts`. In development it logs to the console. Replace the implementation when adding GA/GTM.

CTA elements have `data-cta="booking"` and `data-location="..."` attributes for easy event binding.

## Deploy to Vercel

```bash
npx vercel
```

Or connect the GitHub repository in the Vercel dashboard. No special configuration needed — the defaults work.

## Build

```bash
npm run build
```

All pages are statically generated at build time.
