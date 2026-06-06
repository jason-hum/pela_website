# PELA Products — static website

A modernized rebuild of [pelaproducts.com](https://www.pelaproducts.com/) — a small business
selling manually operated vacuum pumps (oil extractors) for fluid removal. The original was a
2009 Microsoft FrontPage site; this is a clean, fast, responsive static rebuild with the same
content reorganized for better UX.

## Tech stack

Plain hand-written **HTML + CSS**, one small **vanilla JS** file (mobile nav + email
assembly). No frameworks, no build step, no Node toolchain. Open the HTML files directly or
serve the folder statically — that's it.

## Project structure

```
pela_website/
├── index.html              # Home
├── applications.html       # Applications
├── description.html        # Description + specs (PELA 2000 / 6000 / 650 / Pro 14)
├── how-to-use.html         # How To Use (merges the old HowToUse1 + HowToUse2 sub-pages)
├── product-reviews.html    # Product Reviews (press list, outbound links preserved)
├── contact.html            # Where To Buy / Contact (obfuscated email)
├── robots.txt
├── sitemap.xml
├── README.md
├── MISSING_ASSETS.md       # Log of assets that couldn't be auto-downloaded
└── assets/
    ├── css/style.css       # Single shared stylesheet + design tokens
    ├── js/main.js          # Mobile nav toggle + email assembly
    ├── fonts/              # Self-hosted woff2 (Space Grotesk + Inter + Space Mono) + OFL licenses
    └── img/                # Favicons, OG image, product image placeholders
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

- **Type** — three self-hosted families, deliberately paired (all by the same lineage of
  foundries):
  - **Space Grotesk** — display / headings
  - **Inter** — body / UI
  - **Space Mono** — technical accents (spec sheets, prices, SKUs, kickers, footer meta). The
    monospace is the strongest "engineered by a person" signal for a tool/instrument brand.

  All are subset (Latin) `woff2` in `assets/fonts/` (~200 KB total) — no Google Fonts request at
  runtime, so the site stays fast and works fully offline. `font-display: swap` + `<link
  rel="preload">` on the three above-the-fold faces avoid layout flash. Licensed under the SIL
  Open Font License; license files ship alongside (`OFL-*.txt`).
- **Color** — one brand hue + one accent + warm neutrals, as CSS custom properties in `:root`:
  - ink / logo navy `#11304F`, deepest `#0B2238`
  - blueprint-blue accent `#2D6BF0`; **`#1F57D6` is used for accent-as-text** (links, kickers)
    to clear AA contrast on the warm paper
  - warm neutrals: page `#FFFDF9`, paper band `#F4EFE4`, media wells `#EFE9DB`, lines `#E4DDCD`
    / `#D2C8B3`
  - text `#26303A` / soft `#55626E` / faint `#5D6975`
  - one functional warning amber (`#9C5A0E`) reserved for the safety note only
- All text/background pairings were checked for **WCAG AA** contrast (normal text ≥ 4.5:1) on
  both white and the warm paper band.
- **Human-styling details:** a measured-ruler motif and an "EST. 1996" wax-seal stamp (nods to
  the calibrated containers and the brand's age); the home page uses an editorial asymmetric
  hero, a numbered "how it works" strip (instead of a generic icon-tile row), and a catalog-style
  product grid with index numbers + SKUs. Sections alternate onto the paper band (`.section--paper`)
  for rhythm.

To change the palette, edit the tokens at the top of `assets/css/style.css` — every component
inherits from them. To swap a typeface, replace the `woff2` in `assets/fonts/` and update the
matching `@font-face` block.

## Design & accessibility

- Mobile-first, fully responsive (nav collapses to a toggle under 680px).
- Semantic HTML, one `<h1>` per page, skip-link, visible focus states, `alt` on every image,
  `prefers-reduced-motion` respected.
- Restrained B2B/DIY aesthetic: dark-blue ink + a single blueprint-blue accent. Flat, minimal.
- Near-zero JS; CSS is a single ~10 KB file.

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
  **verbatim** from the live site — no specs or claims were invented.
- The old Home page had a "Video Demonstration" link that pointed to `javascript:;` (no real
  URL), so it was dropped rather than fabricated.
- The "How To Use" page was a hub linking to two instruction sub-pages; those were merged into
  one page with in-page anchors for better UX.

## TODOs

- [ ] **Product images** — couldn't be downloaded in the build sandbox (network-blocked).
      Labeled placeholders are in place; see `MISSING_ASSETS.md` for the exact URLs, the spots
      in markup (`TODO: replace with real`), and a fetch/convert script.
- [ ] **How-To step photos** — original sub-pages reference "the photo"; add if desired
      (see `MISSING_ASSETS.md`).
- [ ] **Real logo** — favicon/OG image were generated from a wordmark; swap in the real PELA
      logo if you have it.
- [ ] Update canonical/OG base URL if hosting somewhere other than `www.pelaproducts.com`.
- [ ] Configure the 301 redirects above at hosting time.
```
