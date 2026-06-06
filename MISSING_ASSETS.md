# Assets fetched from the original site

The original product and application media was downloaded from the live
`pelaproducts.com` and now lives under `assets/img/` (and `assets/video/`).
Filenames are kept as on the original site for traceability.

## Product photos (Home + Description)

| Original URL | Local file | Used on |
|---|---|---|
| `/PL2000BH-use.gif` | `assets/img/PL2000BH-use.gif` | `index.html`, `description.html` |
| `/PL6000BH-use.gif` | `assets/img/PL6000BH-use.gif` | `index.html` (hero + card), `description.html` |
| `/PL650-use.gif`    | `assets/img/PL650-use.gif`    | `index.html`, `description.html` |
| `/PL14K-use.gif`    | `assets/img/PL14K-use.gif`    | `index.html`, `description.html` |
| `/4PUMPSBH-DES.gif` | `assets/img/4PUMPSBH-DES.gif` | `description.html` (full-range lineup) |

## Application photos (Applications)

| Original URL | Local file | Caption |
|---|---|---|
| `/images/boat-app.jpg`  | `assets/img/boat-app.jpg`       | Boats & marine |
| `/images/PL6000-HD.jpg` | `assets/img/PL6000-HD.jpg`      | Motorcycles |
| `/images/PL650-car.jpg` | `assets/img/PL650-car.jpg`      | Cars & 4×4s |
| `/images/PL650-mow.jpg` | `assets/img/PL650-mow.jpg`      | Lawnmowers |
| `/PL2000BH-gener.gif`   | `assets/img/PL2000BH-gener.gif` | Generators |

## How-To step photos (How To Use)

Fetched from the two original instruction sub-pages and placed one-per-step.

| Procedure | Step | Local file |
|---|---|---|
| Big PELA 650 / Pro 14 | Warm up / remove dipstick | `assets/img/PL650-dip.jpg` |
| Big PELA 650 / Pro 14 | Insert the tube | `assets/img/PL650-conn.jpg` |
| Big PELA 650 / Pro 14 | Pump | `assets/img/PL650-user.jpg` |
| Big PELA 650 / Pro 14 | Empty & recycle | `assets/img/PL650-pour.jpg` |
| PELA 6000 / 2000 | (kit overview) | `assets/img/PL2000BH-parts.gif` |
| PELA 6000 / 2000 | Warm oil & insert tube | `assets/img/PL2000-dip.gif` |
| PELA 6000 / 2000 | Attach the pump | `assets/img/PL2000-conn.gif` |
| PELA 6000 / 2000 | Pump | `assets/img/PL2000BH-user.gif` |
| PELA 6000 / 2000 | Stop / pull tube out | `assets/img/PL2000-out.gif` |
| PELA 6000 / 2000 | Empty & recycle | `assets/img/PL2000-pour.gif` |

## Logo & favicon

`assets/img/pelalogo-1.gif` is the original PELA wordmark (red roof + three columns +
"PELA", 171×83). The mark was redrawn as crisp vector art (`assets/img/favicon.svg`)
and is now used both in the site header (inline SVG) and as the favicon. The PNG/ICO
icon set was regenerated from that SVG:

- `favicon.svg` (vector), `favicon.ico` (16/32/48/64), `favicon-16.png`, `favicon-32.png`
- `apple-touch-icon.png` (180), `icon-192.png`, `icon-512.png`

The original low-res wordmark GIF is kept for reference. The `og-image.png` was left
as-is (regenerate from the new mark if you want it to match).

## Downloaded but not currently placed

These are duplicates or low value, kept for completeness:

- `assets/img/PL2000BH-des.gif`, `PL6000BH-des.gif`, `PL650-des.gif`, `PL14K-des.gif`
  — tiny (~55px) thumbnail versions of the product shots already used at larger size.
- `assets/img/PL2000BH-mow.gif` — a second lawnmower shot (the JPEG `PL650-mow.jpg`
  is used instead).

## Video

The original "Video Demonstration" link opened a Flash popup
(`/flash_video/pela_video.html` -> `/flash_video/pela.swf`). The SWF was downloaded to
`assets/video/pela.swf`, and its poster image to `assets/img/pela_video_image.jpg`.

**It is not embedded** because:

1. Flash is unsupported by all modern browsers (no plugin/runtime since 2021).
2. The SWF is a 37 KB, ~2-second stub containing only a tiny 43x45 raw-frame stream
   (confirmed with `ffprobe`) - there is no real demonstration footage inside to
   transcode to MP4/WebM.

If a real demo video surfaces later, drop an `.mp4`/`.webm` into `assets/video/` and
embed it with a `<video controls poster="assets/img/pela_video_image.jpg">` element.
