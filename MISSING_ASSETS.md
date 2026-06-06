# Missing assets

The build sandbox has **no network route to `pelaproducts.com`** (every request returned
HTTP 000), and `web_fetch` returns empty bytes for binary files. So the original product
images could not be downloaded automatically. Page **text content was captured in full** —
only binary images are missing.

For each missing image, a clearly-labeled placeholder is already in place (an inline SVG
under `assets/img/`), and the markup carries a `<!-- TODO ... -->` comment at the exact spot.
Replace the placeholder file (or update the `src`) once you've downloaded the real asset.

## Product images (confirmed, referenced on Home + Description)

| Original URL | On page(s) | Placeholder in repo | Suggested final file |
|---|---|---|---|
| https://www.pelaproducts.com/PL2000BH-use.gif | `index.html`, `description.html` | `assets/img/pela-2000.svg` | `assets/img/pela-2000.webp` |
| https://www.pelaproducts.com/PL6000BH-use.gif | `index.html` (hero + card), `description.html` | `assets/img/pela-6000.svg` | `assets/img/pela-6000.webp` |
| https://www.pelaproducts.com/PL650-use.gif | `index.html`, `description.html` | `assets/img/pela-650.svg` | `assets/img/pela-650.webp` |
| https://www.pelaproducts.com/PL14K-use.gif | `index.html`, `description.html` | `assets/img/pela-pro-14.svg` | `assets/img/pela-pro-14.webp` |

## Possibly-missing images (not confirmable — page was network-blocked)

The two original How-To sub-pages (`HowToUse1.htm`, `HowToUse2.htm`) reference "the photo"
in their text ("hold the pump as in the photo"), implying step photos existed on the old
site. Their filenames could **not** be enumerated because raw HTML wasn't retrievable. If you
want those photos on `how-to-use.html`, grab them from the live site and drop them into the
step blocks (search the page source for `<img`).

- Page: `how-to-use.html` (merged from `HowToUse1.htm` + `HowToUse2.htm`)
- Action: inspect original page source for `*.gif`/`*.jpg` and add to the relevant `<li>` in `.steps`.

## Logo / favicon

The original site's "logo" is a FrontPage theme banner (text rendered as a themed image), not
a clean standalone logo asset that could be located. A **fresh favicon + OG image** was
generated from a simple PELA oil-drop wordmark instead:

- `assets/img/favicon.svg`, `favicon.ico`, `favicon-16.png`, `favicon-32.png`
- `assets/img/apple-touch-icon.png` (180), `icon-192.png`, `icon-512.png`
- `assets/img/og-image.png` (1200×630)

If you have the real PELA logo, replace `favicon.svg` and re-run a favicon generator, or just
overwrite the PNG/ICO files at the same sizes.

## How to fetch + optimize the product images (in Claude Code)

```bash
cd assets/img
for f in PL2000BH-use:pela-2000 PL6000BH-use:pela-6000 PL650-use:pela-650 PL14K-use:pela-pro-14; do
  src="${f%%:*}"; out="${f##*:}"
  curl -fsSL "https://www.pelaproducts.com/${src}.gif" -o "${out}.gif"
  # Optimize to WebP (needs cwebp or ImageMagick); keep a PNG fallback if desired:
  cwebp -q 82 "${out}.gif" -o "${out}.webp" 2>/dev/null || magick "${out}.gif" "${out}.webp"
done
```

Then update the `src` attributes from `…/pela-2000.svg` to `…/pela-2000.webp` (and optionally
add `<picture>` with a PNG fallback). Search the HTML for `TODO: replace with real` to find
every spot.
