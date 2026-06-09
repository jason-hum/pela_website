# PELA Products — static website

A modernized rebuild of [pelaproducts.com](https://www.pelaproducts.com/), a small business
selling manually operated vacuum pumps (oil extractors) for fluid removal. The original was a
2009 Microsoft FrontPage site; this is a clean, fast, responsive static rebuild with the same
content reorganized for better UX.

> **New to the project or not a coder?** Read [DOCUMENTATION.md](DOCUMENTATION.md) first. It is
> a full, plain-language guide to how the site works and how to make common changes (edit text,
> change a price, swap a photo, add a review) without any coding background. This README is the
> shorter, developer-facing overview.

## Tech stack

Plain hand-written **HTML + CSS**, one small **vanilla JS** file. No frameworks, no build step,
no Node toolchain. Open the HTML files directly or serve the folder statically, that's it.

`assets/js/main.js` does four small things: defines the shared `<site-header>` / `<site-footer>`
custom elements, the mobile nav toggle, runtime email assembly (anti-scraping), and the demo
video lightbox.

## Project structure

```
pela_website/
├── index.html              # Home (bento mosaic + embedded video lightbox)
├── applications.html       # Applications
├── description.html        # Description + specs (PELA 2000 / 6000 / 650 / Pro 14)
├── how-to-use.html         # How To Use (merges the old HowToUse1 + HowToUse2 sub-pages)
├── product-reviews.html    # Product Reviews (press list, links to scanned-review PDFs)
├── contact.html            # Where To Buy / Contact (obfuscated email)
├── robots.txt
├── sitemap.xml
├── README.md               # This file (developer overview)
├── DOCUMENTATION.md        # Full plain-language guide for non-coders
├── MISSING_ASSETS.md       # Map of assets fetched from the original site + video note
└── assets/
    ├── css/style.css       # Single shared stylesheet + design tokens (~28 KB)
    ├── js/main.js          # Shared header/footer + nav toggle + email assembly + video modal
    ├── fonts/              # Self-hosted woff2 (Hanken Grotesk) + OFL license
    ├── img/                # Favicons, OG image, real product + application photos
    ├── reviews/            # Scanned magazine reviews (PDF), linked from product-reviews.html
    └── video/              # Demo video (pela.mp4, embedded) + archived Flash original (pela.swf)
```

Every page shares an **identical header/nav/footer** and a single design-token system (CSS
custom properties in `:root`) so the whole site reads as one cohesive product.

## Preview locally

Easiest — just open `index.html` in a browser. Or serve the folder (better for clean paths
and to mimic hosting):

```bash
# Python 3
python3 -m http.server 8000
# then open http://localhost:8000/
```

Any static server works (`npx serve`, `php -S localhost:8000`, etc.).

## Typography & color

The design is a "Modern Engineered" system: technical and confident, anchored on the dark-blue
logo.

- **Type:** one warm, self-hosted humanist sans, **Hanken Grotesk**, used for everything
  (headings, body, labels, prices, SKUs, footer meta). Hierarchy comes from weight and size
  rather than from switching families, so the whole site reads in a single friendly voice. In
  the CSS the `--font-display` and `--font-mono` tokens simply alias `--font-sans`, so any
  technical labels keep their uppercase + letter-spacing treatment without a second typeface;
  numeric columns stay aligned via `font-variant-numeric: tabular-nums`.

  It ships as subset (Latin) `woff2` in `assets/fonts/` (a variable upright plus an italic, about
  50 KB total), so there is no Google Fonts request at runtime and the site works fully offline.
  `font-display: swap` plus `<link rel="preload">` on the upright face avoid layout flash. Licensed
  under the SIL Open Font License; the license file ships alongside (`OFL-HankenGrotesk.txt`).
- **Color** is one brand hue + a sparing red/pink + warm neutrals, all as CSS custom properties
  in `:root`. Edit the tokens at the top of the stylesheet to recolor the whole site:
  - ink / logo navy `#11304F`, deepest `#0B2238`
  - logo-blue accent `--accent #192F4D` (primary CTA); `--accent-600 #14263E` for hover /
    accent-as-text (links), tuned for AA contrast on the warm background
  - brand red/pink from the logo (`--brand-red #C5362A`, `--brand-pink #E1A6B6`), reserved for
    the safety / caution note and the small "PDF" review chips
  - warm neutral background: a fixed gradient from `#FBF6EE` to `#F1ECE1` to `#E6E6F2`; cards
    sit on white (`--surface #FFFFFF`) with media wells in `--surface-2 #EEF1F6`
  - text `#25303A` / soft `#54616D` / faint `#5C6873`
  - one functional warning amber token (`--warn #9C5A0E`) kept available for notes
- All text/background pairings were checked for **WCAG AA** contrast (normal text ≥ 4.5:1) on
  both white and the warm paper band.
- **Human-styling details:** the home page uses an editorial asymmetric hero, a numbered
  "how it works" strip (instead of a generic icon-tile row), and a catalog-style product grid
  with SKUs. These run through the card/bento geometry described below.

To change the palette, edit the tokens at the top of `assets/css/style.css` — every component
inherits from them. To swap a typeface, replace the `woff2` in `assets/fonts/` and update the
matching `@font-face` block.

## Layout geometry

The site sits on a single fixed, blue-tinted warm gradient; every block is a floating card (header and footer included). The home page is a **responsive bento mosaic** built on a 12-column grid (`.bento` + `.b-*` span utilities) that reflows to 6 columns on tablet and a single stack on mobile. Inner pages lead with a `.page-head` card and render their content (applications, review categories, steps, product specs) as card tiles via a shared card primitive. To retune the mosaic, change the `.b-*` spans in the markup or the breakpoints in the stylesheet.

## Design & accessibility

- Mobile-first, fully responsive (12-col bento reflows to 6 cols at 920px; nav collapses to a
  toggle, and the bento stacks to one column, at 600px).
- Semantic HTML, one `<h1>` per page, skip-link, visible focus states, `alt` on every image,
  `prefers-reduced-motion` respected.
- Restrained B2B/DIY aesthetic: dark-blue logo ink + a sparing brand red. Flat, minimal.
- Near-zero JS (one ~7 KB file); CSS is a single ~28 KB file.

## SEO

- Per-page `<title>` + `<meta name="description">`, plus Open Graph and Twitter Card tags.
- `sitemap.xml` and `robots.txt` at the root.
- JSON-LD structured data: **Organization** on every page; **Product** / **ItemList** on Home
  and Description; **HowTo** on How To Use.
- `og-image.png` (1200×630) for link previews.

> **Note:** canonical/OG URLs assume the site is hosted at `https://www.pelaproducts.com/`.
> If you deploy elsewhere, update the `<link rel="canonical">` and `og:url`/`og:image` base
> in each page's `<head>` and in `sitemap.xml` / `robots.txt`.

## Privacy

The contact email is **not** in the raw HTML as plaintext. `assets/js/main.js` assembles
`inquiries@pelaproducts.com` at runtime from separate parts and wires it into any element with
a `data-email` attribute. A `<noscript>` fallback shows an obfuscated `[at]` / `[dot]` form.

## Old → new URL redirect map

Set these up at hosting time (e.g. `_redirects` on Netlify, `[[redirects]]`, nginx `rewrite`,
or `Redirect 301` in `.htaccess`) so existing SEO equity carries over. All should be **301**
(permanent).

| Old path (FrontPage) | New path |
|---|---|
| `/` | `/` (now `index.html`) |
| `/index.htm` | `/` |
| `/applications.htm` | `/applications.html` |
| `/description.htm` | `/description.html` |
| `/how_to_use.htm` | `/how-to-use.html` |
| `/HowToUse1.htm` | `/how-to-use.html#big-pela` |
| `/HowToUse2.htm` | `/how-to-use.html#pela-6000-2000` |
| `/product_reviews.htm` | `/product-reviews.html` |
| `/contact_us.htm` | `/contact.html` |

Example `.htaccess`:

```apacheconf
RewriteEngine On
Redirect 301 /index.htm          /
Redirect 301 /applications.htm   /applications.html
Redirect 301 /description.htm    /description.html
Redirect 301 /how_to_use.htm     /how-to-use.html
Redirect 301 /HowToUse1.htm      /how-to-use.html#big-pela
Redirect 301 /HowToUse2.htm      /how-to-use.html#pela-6000-2000
Redirect 301 /product_reviews.htm /product-reviews.html
Redirect 301 /contact_us.htm     /contact.html
```

Example Netlify `_redirects`:

```
/index.htm            /                              301
/applications.htm     /applications.html             301
/description.htm      /description.html              301
/how_to_use.htm       /how-to-use.html               301
/HowToUse1.htm        /how-to-use.html#big-pela       301
/HowToUse2.htm        /how-to-use.html#pela-6000-2000 301
/product_reviews.htm  /product-reviews.html          301
/contact_us.htm       /contact.html                  301
```

## Content notes

- Product copy, specs, prices, application list and the full press/review list are reproduced
  **verbatim** from the live site. No specs or claims were invented.
- A demo video (`assets/video/pela.mp4`) is embedded via a lightbox, opened from the video tile
  on Home and the "Watch the video" button on How To Use (handled in `main.js`; the video pauses
  and rewinds on close). The original Flash demo (`pela.swf`) is archived alongside but unused,
  since Flash no longer runs in any browser (see `MISSING_ASSETS.md`).
- The "How To Use" page was a hub linking to two instruction sub-pages; those were merged into
  one page with in-page anchors for better UX.
- Three reviews link to scanned PDFs in `assets/reviews/`; the rest of the press list is text.

## TODOs

- [x] **Product & application images** — fetched from the live site and placed
      (`assets/img/`, original filenames); see `MISSING_ASSETS.md` for the full map. They are
      low-resolution originals, so swap in higher-res versions if they become available.
- [x] **How-To step photos** — fetched from the original instruction sub-pages and placed
      one-per-step on `how-to-use.html` (see `MISSING_ASSETS.md`).
- [x] **Real logo & favicon** — the PELA mark (red roof + three columns) was redrawn as vector
      (`favicon.svg`), used in the header, and the full favicon/icon set regenerated from it.
      The original wordmark GIF is archived at `assets/img/pelalogo-1.gif`.
- [x] **Demo video** — `assets/video/pela.mp4` is embedded via the lightbox on Home and How To
      Use. Swap in higher-quality footage by replacing that file (keep the name) and, optionally,
      the poster `assets/img/pela_video_image.jpg`.
- [ ] **OG image** — `og-image.png` still uses the old generated mark; regenerate from the new
      `favicon.svg` if you want link previews to match.
- [ ] Update canonical/OG base URL if hosting somewhere other than `www.pelaproducts.com`.
- [ ] Configure the 301 redirects above at hosting time.
```
