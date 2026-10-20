# Irene and Rebeca Primary School — Website

A fast, accessible one-page website for **Irene and Rebeca Primary School** (Reg. No. P0508098), Missenyi District, Kagera Region, Tanzania.

Built with React 18, Vite, TypeScript, Tailwind CSS, Framer Motion, lucide-react, react-hook-form and zod. English and Kiswahili. Three switchable style directions.

---

## 1. Setup

Requires Node.js 18+.

```bash
npm install
npm run dev        # local development at http://localhost:5173
npm run build      # type-check + production build into dist/
npm run preview    # serve the production build locally
```

> The enquiry form posts to `/api/enquiry`, which only exists once deployed (or with `vercel dev`).
> In plain `npm run dev` the form shows its "couldn't send" message with the phone/WhatsApp/email fallback — that is expected.

## 2. Editing content (no coding needed)

All words on the site live in two files:

| File | What it holds |
| --- | --- |
| `src/content/en.ts` | All English text |
| `src/content/sw.ts` | All Kiswahili text (have a fluent speaker at the school review it) |
| `src/content/site.ts` | Facts that are the same in both languages: phone, email, WhatsApp, address, map link, prospectus link, default style |
| `src/content/images.ts` | Which image file is used where, and its size in pixels |

Change the text between the quotes and save. Anything in `[SQUARE_BRACKETS]` is a placeholder.

### Photos

All 17 photos come from the school's Instagram (@ireneandrebecaprimary). The originals are in `brand/instagram/`
(`ir-<post code>-1.jpg`); `npm run photos` (`scripts/optimize-photos.mjs`) turns them into AVIF + JPEG sizes
in `public/images/photos/` with metadata stripped, and makes `public/images/og-image.jpg`.

| Where | Photo |
| --- | --- |
| Hero | Stone "Irene y Rebeca" entrance monument with the Tanzanian flag |
| About banner | Hillside village view of the school |
| Pre-Primary / Lower / Upper | Pre-primary classroom · Kiswahili syllables lesson · pupils gathering on campus |
| Gallery (12) | School family photo, hall performance, porridge time, assembly hall, campus path, classroom block, garden, visitors, cattle, lamb, sunset, open plains |

To add or swap a photo:
1. Put the original in `brand/instagram/` and add it to the `PHOTOS` list in `scripts/optimize-photos.mjs`.
2. Run `npm run photos`.
3. Reference it in `src/content/images.ts` and write its alt text/caption in `en.ts` and `sw.ts` (same order).

**Safeguarding:** only use photos the school has parental consent for, never put pupils' full names next to photos, and strip location/EXIF data before uploading (e.g. `exiftool -all= photo.jpg`, or export with "remove location" on your phone).

Only the head-teacher portrait is still a placeholder (`npm run placeholders` recreates it; it never touches the logo or photos).

### Logo

- `brand/logo-original.png` — the photo of the school logo this site's logo was redrawn from.
- `brand/logo-full.svg` — vector redraw (mark + "SCHOOL"); copied to `public/images/logo.svg` (404 page, structured data).
- `public/images/logo-mark.svg` — mark only; `public/favicon.svg` — mark on a white tile.
- `src/components/layout/LogoMark.tsx` — the mark used in the header, mobile menu and footer. Its lines follow the text colour, so it turns white on the navy footer while the dots keep their colours.

If the school has an official vector file (SVG/AI/EPS/PDF) from its designer, use that instead of the redraw.

## 3. Switching style direction (A / B / C)

| | Style | Feel |
| --- | --- | --- |
| **A** | Joyful Classic (default) | Blue hero with wave, yellow pencil underline, rounded cards, colourful dots |
| **B** | Modern Editorial | Photo-led hero with dark-blue overlay, big type, thin lines, minimal accents |
| **C** | Playful Bento | Bento grids, chunky shadows, tilted cards, sticker badges |

- **Preview** any style without changing anything: add `?theme=b` or `?theme=c` to the URL.
- **Change the default:** set `theme: 'A' | 'B' | 'C'` in `src/content/site.ts`.
- Styles are defined in `src/theme/variants.ts`. All three share the same content, components, colours and accessibility rules.

## 4. Connecting the enquiry form

The form validates in the browser and again on the server (`api/enquiry.ts`, same zod schema in `src/lib/enquirySchema.ts`). The server function also has a honeypot field, a per-IP rate limit (5 per 10 minutes), a same-origin check and a 10 KB body cap. It emails each enquiry as plain text via [Resend](https://resend.com).

1. Create a free Resend account and verify a sending domain (or use their test sender while trying it out).
2. In your hosting dashboard (never in code), set:
   - `RESEND_API_KEY` — your Resend API key
   - `ENQUIRY_TO_EMAIL` — the school office inbox
   - `ENQUIRY_FROM_EMAIL` — e.g. `Website <enquiries@your-domain>`
3. Deploy. Until these are set the endpoint returns 503 and families see the fallback contacts.

The rate limit is in-memory (per server instance). For a strict limit, swap in a shared store such as Upstash Redis.

**Other hosts:** `api/enquiry.ts` targets Vercel. On Netlify or Cloudflare Pages, move the same `POST(request)` logic into `netlify/functions/` or `functions/api/enquiry.ts`.

## 5. Deployment

**Vercel (recommended):** import the GitHub repo; settings come from `vercel.json` (build command, security headers, long-cache for assets). The `api/` folder becomes the serverless function automatically.

**Netlify / Cloudflare Pages:** build command `npm run build`, output folder `dist`. Security headers come from `public/_headers`.

Security headers set: Content-Security-Policy, Strict-Transport-Security, X-Content-Type-Options, X-Frame-Options, Referrer-Policy, Permissions-Policy, Cross-Origin-Opener-Policy. Unknown URLs get the custom `404.html`.

After the first deploy, add the canonical URL, `og:url` and an absolute `og:image` in `index.html` (commented lines show where), and add a 1200×630 `public/images/og-image.jpg`.

## 6. Accessibility & performance notes

- WCAG 2.2 AA colour pairs (checked): navy on white 13.6:1, white on blue-700 7.8:1, white on blue-500 4.7:1, navy on yellow 8.3:1, white on red 5.0:1, white on green-700 6.7:1, grey-600 on white 7.6:1.
  The brand green `#1F8A4C` gives only 4.4:1 with white, so text-bearing green badges use `--green-700: #166A3A`; the brand green stays as a decorative accent.
- Skip link, landmarks, one `h1`, visible 3px yellow focus ring, keyboard-operable menu/lightbox/carousel (Esc closes, focus trapped and restored), labelled form fields with `aria-describedby` errors and a live status region, `lang` switches with EN/SW.
- `prefers-reduced-motion` turns off all animation, parallax, autoplay and smooth scrolling.
- Animations use transform/opacity only. Initial JS ≈ 100 KB gzipped; contact form, lightbox, carousel and map are split into separate chunks. The map loads only on tap. No third-party scripts, no tracking cookies.

### Motion & Three.js

- **Hero constellation (Three.js):** the seven coloured dots of the logo drift with small white stars and link up when close (`src/components/ui/HeroConstellation.tsx`). Three.js is a separate ~176 KB (gzipped) chunk, fetched only after the page is idle on wide screens with a mouse/trackpad, ≥ 4 GB memory, no data-saver/2G and no reduced-motion preference (`src/hooks/useRichDecoration.ts`). It pauses when off-screen or the tab is hidden; phones and slow connections never download it and see the CSS shapes instead.
- **Scroll progress bar**, **hero photo parallax** and **pointer tilt on gallery photos** (`src/components/ui/Motion.tsx`) — transform-only, off under reduced motion; parallax and tilt are off on touch/small screens.

## 7. Project structure

```
api/enquiry.ts              serverless form handler
src/
  components/layout/        Header, MobileMenu, MobileCta, Footer, SkipLink, Logo, LanguageToggle
  components/sections/      Hero, AudienceLinks, About, WhyUs, Stats, Academics, Admissions,
                            Gallery, Testimonials, NewsEvents, Contact (+ ContactForm, MapFrame)
  components/ui/            Button, Card, Badge, SectionHeading, Reveal, CountUp, Lightbox,
                            Carousel, WaveDivider, SafeImage, ErrorBoundary, Decor
  content/                  en.ts, sw.ts, site.ts, images.ts, types.ts, LocaleProvider.tsx
  hooks/                    useActiveSection, useScrollHeader, useFocusTrap, useMediaQuery
  lib/                      enquirySchema (shared validation), icons, cn, scrollTo
  styles/globals.css        design tokens as CSS variables
  theme/                    variants.ts (A/B/C), ThemeProvider
public/                     images, favicon, _headers, robots.txt
404.html                    custom not-found page
```

## 8. Placeholders the school must fill in

**`src/content/site.ts`**
- `[YEAR]` — admissions year shown in the hero badge
- `mapEmbedUrl` — Google Maps "Embed a map" link
- `prospectusUrl` — link to the prospectus PDF (e.g. put `prospectus.pdf` in `public/`)

**`src/content/en.ts` and `sw.ts`** (same items in both languages)
- About: `[MISSION_STATEMENT]`, `[VISION_STATEMENT]`, `[SCHOOL_STORY]`, `[FOUNDING_YEAR]`
- Head teacher: `[HEAD_TEACHER_NAME]`, `[HEAD_TEACHER_WELCOME]` (+ second paragraph), photo
- Why Choose Us: confirm or rewrite all six bracketed descriptions
- Stats: `[PUPILS]`, `[TEACHERS]`, `[YEARS]`, `[PASS_RATE]` — replace `value: null` with a number (e.g. `value: 320`) to enable the count-up animation
- Academics: `[CURRICULUM_DETAILS]`, the three stage descriptions, `[OTHER_SUBJECTS]`, confirm stages/subjects/clubs
- Admissions: the four required documents, `[FEES_DETAILS]`
- Gallery: real photos and captions
- Testimonials: three `[PARENT_TESTIMONIAL]` quotes, `[PARENT_NAME]`, `[CLASS]` (with permission)
- News & Events: three events — `[DD]`, `[MON]`, `[EVENT_TITLE]`, descriptions; `[TERM_1_DATES]`, `[TERM_2_DATES]`, `[TERM_3_DATES]`
- Contact: `[OFFICE_HOURS]`, `[SATURDAY_HOURS]`, `[VACANCIES]`
- Footer privacy notice: `[PRIVACY_CONTACT]`

**Files**
- Head-teacher photo (`public/images/head-teacher.svg` is a placeholder)
- Confirm parental consent for the Instagram photos that show pupils
- Logo — optionally replace the redraw with the school's official vector file
- `index.html` — canonical URL, `og:url`, `og:image` once the domain is known
