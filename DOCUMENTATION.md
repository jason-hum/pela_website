# PELA Products Website, Full Documentation

This is a complete, plain-language guide to the PELA Products website. It is
written so that someone with **no coding experience** can understand how the
site is put together and make simple changes safely. Where a technical word is
unavoidable, it is explained in plain English the first time it appears, and
again in the [Glossary](#glossary) at the bottom.

If you just want a short overview, read [README.md](README.md) instead. This
file is the long, detailed version.

---

## Table of contents

1. [What this website is](#1-what-this-website-is)
2. [How to view the site on your own computer](#2-how-to-view-the-site-on-your-own-computer)
3. [What every file and folder is for](#3-what-every-file-and-folder-is-for)
4. [The six pages, one by one](#4-the-six-pages-one-by-one)
5. [The shared header and footer (how every page stays the same)](#5-the-shared-header-and-footer)
6. [How to make common changes](#6-how-to-make-common-changes)
7. [The look and feel (colors, fonts, spacing)](#7-the-look-and-feel)
8. [The demo video](#8-the-demo-video)
9. [The contact email trick](#9-the-contact-email-trick)
10. [How search engines see the site (SEO)](#10-how-search-engines-see-the-site-seo)
11. [Putting the site on the internet (hosting)](#11-putting-the-site-on-the-internet-hosting)
12. [Glossary of terms](#12-glossary-of-terms)

---

## 1. What this website is

PELA Products sells hand-operated vacuum pumps (called "oil extractors") that
suck used oil out of engines so you can change the oil without crawling under
the machine or removing a drain plug. This website is the company's online
brochure: it shows the four pump models, explains how they work, lists where
they are used, collects press reviews, and tells visitors how to get in touch.

A few important facts about how the site is built:

- It is a **static website**. That means it is just a set of files (mostly
  text) that a web browser reads and displays. There is no database, no login,
  no shopping cart, and nothing running on a server doing calculations. Think
  of it like a PDF brochure that happens to be made of web pages.
- It is **hand-written** in the three basic languages of the web: HTML (the
  content and structure), CSS (the styling and layout), and a small amount of
  JavaScript (a few interactive touches). You do not need any special program
  to open or edit these files, just a plain text editor.
- There is **no build step**. Many modern websites have to be "compiled" or
  "built" by tools before they work. This one does not. You edit a file, save
  it, and refresh the browser. What you see is what you get.

The site is a modernized rebuild of the original `pelaproducts.com`, which was
made in 2009 with Microsoft FrontPage. The words, prices, specifications, and
press list are copied **exactly** from the original. Only the design and layout
were rebuilt to be faster, mobile-friendly, and easier to read.

---

## 2. How to view the site on your own computer

You have two options.

### Option A: just open the file (easiest)

Find `index.html` in the project folder and double-click it. It will open in
your default web browser and the whole site works, including clicking between
pages. This is the simplest way to look around.

### Option B: run a tiny local web server (closer to the real thing)

Some browser features behave slightly better when the files are "served" rather
than opened directly. If you are comfortable using the Terminal app, you can run
one short command from inside the project folder:

```bash
python3 -m http.server 8000
```

Then open `http://localhost:8000/` in your browser. Press `Ctrl + C` in the
Terminal to stop it when you are done. (`localhost` just means "this computer".)

You do not need to install anything special for Option A. Option B uses Python,
which already comes with Mac and most Linux computers.

---

## 3. What every file and folder is for

Here is the whole project, with a plain description of each item.

```
pela_website/
├── index.html              The home page
├── applications.html       "Applications" page (where the pumps are used)
├── description.html        "Description" page (the four models + their specs)
├── how-to-use.html         "How To Use" page (step-by-step instructions)
├── product-reviews.html    "Product Reviews" page (press / magazine list)
├── contact.html            "Where To Buy / Contact" page
│
├── README.md               Short overview for developers
├── DOCUMENTATION.md        This file (the full, plain-language guide)
├── MISSING_ASSETS.md       Notes on where the images and video came from
│
├── sitemap.xml             A list of all pages, for search engines
├── robots.txt              Tells search engines they may index the site
├── favicon.ico             The little icon in the browser tab
│
└── assets/                 Everything the pages load (styles, images, etc.)
    ├── css/
    │   └── style.css       ALL the styling for the whole site, in one file
    ├── js/
    │   └── main.js         ALL the interactive behavior, in one small file
    ├── fonts/              The website's typeface (Hanken Grotesk) + its license
    ├── img/                Photos, product pictures, logos, and tab icons
    ├── reviews/            Scanned magazine reviews saved as PDF files
    └── video/              The demo video (pela.mp4) and the old Flash file
```

The key idea: the **content** of each page lives in its own `.html` file, but
the **styling** (`style.css`) and the **behavior** (`main.js`) are shared by
every page. So if you change a color in `style.css`, it changes everywhere at
once. That is on purpose, so the whole site always looks consistent.

### A note about the `.html` filenames

Each page is one `.html` file. The name of the file is also the address used in
the web browser. For example `applications.html` is reached at
`www.pelaproducts.com/applications.html`. The home page file is `index.html`,
which is the standard name browsers look for first, so it loads when someone
visits just `www.pelaproducts.com/`.

---

## 4. The six pages, one by one

Every page is built from the same simple skeleton, in this order:

1. A hidden information section (the `<head>`) with the page title, the
   description that shows up in Google, the small tab icon, and links to the
   shared stylesheet and font. Visitors never see this part directly.
2. A "Skip to content" link for people using a keyboard or screen reader.
3. The shared **header** (the logo and navigation menu at the top).
4. The **main content**, which is different on each page.
5. The shared **footer** (the dark box at the bottom).
6. A line that loads `main.js` so the interactive bits work.

The header and footer are not typed into each page. They are added
automatically by `main.js` (explained in [Section 5](#5-the-shared-header-and-footer)),
so they are identical everywhere and only have to be edited in one place.

Here is what is unique to each page:

| Page | File | What's on it |
|---|---|---|
| **Home** | `index.html` | The main landing page. A "bento" mosaic (a grid of tiled boxes) with the headline, a featured pump, quick stats, a three-step "how it works" strip, the demo video, and a grid of all four models with prices. |
| **Applications** | `applications.html` | A grid of use cases (boats, mowers, cars, industrial, etc.) with little icons, plus a gallery of real-world photos. |
| **Description** | `description.html` | The catalog. One box per model (PELA 2000, PELA 6000, Big PELA 650, PELA Pro 14) with a photo, a paragraph of description, and a specifications table (capacity, height, tube sizes, price). |
| **How To Use** | `how-to-use.html` | Numbered step-by-step instructions. There are two sets of steps: one for the Big PELA 650 and Pro 14, and one for the PELA 6000 and 2000. Also has a "Watch the video" button. |
| **Product Reviews** | `product-reviews.html` | A reference list of magazines and publications that reviewed PELA, grouped by topic (boating, motorcycles, farming, and so on). A few link to scanned PDFs. |
| **Contact** | `contact.html` | Two boxes: one to email the company, one explaining that pumps are sold through resellers. |

### About the "bento" layout on the home page

You will see the word "bento" in the home page comments. It refers to a
Japanese lunch box divided into compartments of different sizes. The home page
is laid out the same way: a grid of boxes ("cards") of different widths that fit
together neatly. On a phone, those boxes stack into a single column so
everything stays readable. You do not need to understand the grid math to edit
the text inside the boxes.

---

## 5. The shared header and footer

The menu at the top and the dark box at the bottom appear on every page. To
avoid copying and pasting them into six files (and having to fix six files every
time the menu changes), they are written **once** inside `assets/js/main.js`.

Each page simply contains two short placeholder tags:

```html
<site-header current="home"></site-header>
...
<site-footer></site-footer>
```

When the page loads, `main.js` fills these placeholders with the real header and
footer. This is a standard browser feature called a "custom element" (a tag you
define yourself). You do not need to understand the mechanism to use it. Just
know:

- To change a menu link, the company name, or the footer text, edit
  `assets/js/main.js`, not the individual pages.
- The list of menu items lives near the top of `main.js` in a block labelled
  `NAV`. Each line is `["filename.html", "Menu Label", "id"]`.
- The `current="..."` value on each page's `<site-header>` tag tells the menu
  which item to highlight as the current page. For example, the Applications
  page uses `current="applications"`.

---

## 6. How to make common changes

These are the edits you are most likely to want. Always **make a backup copy of
the file first** (or use version control) so you can undo a mistake. After every
change, save the file and refresh the browser to check it.

### Change a piece of wording

1. Open the `.html` file for the page you want to change in a text editor.
2. Find the words you want to change (your editor's "Find" feature helps).
3. Type the new words **between** the angle-bracket tags, not inside them. For
   example, in `<h1>The new way to change oil</h1>`, only edit the text
   `The new way to change oil`. Leave the `<h1>` and `</h1>` parts alone.

### Change a price

Prices appear in two places and both should match:

1. On the **home page** (`index.html`), in the product grid near the bottom,
   each model has a line like `<p class="price">$95.00 USD</p>`.
2. On the **Description page** (`description.html`), in each model's
   specifications table, the last row is the list price.

There is also a price written into the hidden search-engine data near the top of
those two files (a block labelled `application/ld+json`). If you update a price,
update it there too so search results stay correct.

### Replace a product or application photo

All images live in `assets/img/`. The simplest approach is to give your new
image the **same filename** as the one you are replacing, and drop it into that
folder. The page will then show the new image automatically. If you use a new
filename, you also have to update the `src="assets/img/..."` part inside the
`.html` file wherever that image appears. The file `MISSING_ASSETS.md` lists
which image is used on which page.

When you replace an image, also check the `alt="..."` text next to it in the
HTML. That text describes the image for visually impaired visitors and for
search engines, so it should match what the new picture actually shows.

### Add a new magazine review

Open `product-reviews.html`. The reviews are grouped into boxes by topic
(Boating, Motorcycles, and so on). Copy an existing `<li>...</li>` line inside
the right group, paste it, and change the publication name and the description.
If you have a scanned PDF of the review, put the PDF in `assets/reviews/` and
follow the pattern of the entries that already link to a PDF.

### Change a color or the overall look

See [Section 7](#7-the-look-and-feel). In short: all colors are defined once at
the very top of `assets/css/style.css`, so changing one value there updates the
whole site.

### Add a brand-new page

1. Make a copy of an existing simple page, such as `contact.html`, and rename
   it (use lowercase letters and hyphens, for example `warranty.html`).
2. Change the title, description, and the visible content.
3. Add it to the menu by editing the `NAV` list in `assets/js/main.js`.
4. Add it to `sitemap.xml` so search engines can find it.

---

## 7. The look and feel

You do not need to touch any of this to edit text or images. This section is for
when you want to adjust the visual style. The whole design is controlled from
the top of `assets/css/style.css`, in a block labelled `:root`. The values there
are called "design tokens": named settings that the rest of the styling reuses.
Change a token once and it updates everywhere.

### Colors

The palette is built around the PELA logo's dark navy blue, with a brand red and
pink used sparingly (mostly for safety warnings), on top of warm off-white
backgrounds. Each color has a name like `--ink` (the dark navy) or `--accent`
(the logo blue used for buttons and links). To recolor the site, change those
values at the top of the stylesheet. The colors were chosen and checked so that
text always has enough contrast against its background to be easy to read,
including for people with low vision. If you change them, keep dark text on
light backgrounds and light text on dark backgrounds.

### Fonts

The site uses a single typeface called **Hanken Grotesk** for everything:
headings, body text, prices, and labels. Rather than switching between several
fonts, the design creates variety by changing the **weight** (how bold) and
**size** of that one font. This keeps the whole site feeling like one consistent
voice.

The font file is stored in `assets/fonts/` and loaded directly from the site, so
it always works even with no internet connection and there is no request to
Google Fonts. The font is free to use under its license (the `OFL` text file in
that folder). To switch typefaces, you would replace the font files and update
the `@font-face` block near the top of the stylesheet, but that is an advanced
change.

### Spacing and sizing

Spacing (the gaps and padding between things) is also set with tokens, named
`--sp-1` (smallest) up to `--sp-9` (largest). Using these consistent steps is
why the spacing across the site feels even. Sizes for headings use a feature
called `clamp`, which lets text grow on big screens and shrink on small ones
automatically.

### Responsive design (phones, tablets, desktops)

"Responsive" means the layout rearranges itself to fit the screen. On a wide
desktop the home page shows a multi-column grid; on a tablet it becomes fewer
columns; on a phone everything stacks into one column and the menu collapses
into a tap-to-open button. This is handled by rules near the bottom of the
stylesheet labelled `Responsive`. You usually do not need to change these.

---

## 8. The demo video

There is a short demonstration video, `assets/video/pela.mp4`. On the home page
and on the How To Use page, clicking the video tile (or the "Watch the video"
button) opens the video in a pop-up overlay called a "lightbox". The code that
opens and closes this pop-up is in `main.js`. When the pop-up closes, the video
pauses and rewinds, so sound never keeps playing in the background.

There is also an old file, `pela.swf`, in the same folder. That is the original
Flash version of the demo from the old website. Flash no longer works in any
modern browser, so that file is kept only for the record and is not used. The
file `MISSING_ASSETS.md` explains this history in more detail.

To replace the video, put a new `.mp4` file in `assets/video/` named `pela.mp4`
(replacing the old one), and optionally update the still image shown before it
plays, which is `assets/img/pela_video_image.jpg`.

---

## 9. The contact email trick

The company email address is **not** written directly into the contact page as
plain text. If it were, automated programs that crawl the web ("scrapers") could
easily harvest it and send spam. Instead, the address is split into pieces inside
`main.js` and reassembled in the visitor's browser at the moment the page loads.

For visitors, it works exactly as expected: the "Email PELA Products" link on the
contact page becomes a normal clickable email link. For people who have
JavaScript turned off, a backup version of the address is shown written as
`inquiries [at] pelaproducts [dot] com`, which a human can read but a simple
scraper cannot use directly.

To change the email address, edit the two lines in `main.js` labelled `user` and
`domain` in the email section, and update the backup text inside the `<noscript>`
part of `contact.html`.

---

## 10. How search engines see the site (SEO)

SEO stands for "Search Engine Optimization", which just means helping Google and
other search engines understand the site so it shows up well in search results.
This site already does the standard things:

- Every page has a unique **title** and a short **description** (the hidden text
  in the `<head>`). These are what show up as the blue link and gray summary in
  Google results.
- There is a `sitemap.xml` file listing all the pages, and a `robots.txt` file
  that tells search engines they are welcome to index the site.
- Each page includes a block of structured data (labelled `application/ld+json`
  in the `<head>`). This is machine-readable information about the company and
  the products, so search engines can show richer results.
- When a page is shared on social media, special tags (called "Open Graph"
  tags) control the preview image and text that appear. The preview image is
  `assets/img/og-image.png`.

If you change a page's main heading or purpose, it is worth updating its title
and description in the `<head>` to match.

---

## 11. Putting the site on the internet (hosting)

Because this is a static site (just files), hosting it is simple and usually
free. You upload the whole `pela_website` folder to any static-hosting service,
such as Netlify, GitHub Pages, Cloudflare Pages, or ordinary web hosting via
FTP. There is nothing to install or configure on a server.

Two things to take care of when you go live:

### Update the web address if it is not pelaproducts.com

Several files currently assume the site lives at
`https://www.pelaproducts.com/`. If you host it somewhere else, update that
address in:

- the `<link rel="canonical">` and the `og:url` / `og:image` lines in the
  `<head>` of each `.html` page, and
- `sitemap.xml` and `robots.txt`.

### Set up redirects from the old web addresses

The old FrontPage site used different filenames (for example `contact_us.htm`
instead of `contact.html`). To make sure old links and existing search rankings
still reach the right new page, your host should be told to **redirect** the old
addresses to the new ones. README.md contains a ready-made table of these
redirects and example configuration for common hosts. This is a one-time setup
step done at the hosting service, not in these files.

---

## 12. Glossary of terms

- **HTML**: the language that holds a web page's words and structure. The
  `.html` files are the actual pages.
- **CSS**: the language that controls how things look (colors, fonts, layout).
  All of it is in `assets/css/style.css`.
- **JavaScript**: the language for interactive behavior. The small amount this
  site uses is in `assets/js/main.js`.
- **Static site**: a website made only of fixed files, with no database or
  server program. Fast, cheap to host, and simple.
- **Tag**: the angle-bracket pieces in HTML, like `<h1>` and `</h1>`, that wrap
  around content and tell the browser what it is.
- **Asset**: any supporting file a page loads, such as an image, font, video, or
  the stylesheet. They all live in the `assets/` folder.
- **Design token**: a named style setting (like a color or a spacing amount)
  defined once and reused everywhere, at the top of the stylesheet.
- **Responsive**: a layout that automatically rearranges to fit phones, tablets,
  and desktops.
- **Lightbox**: a pop-up overlay that shows content (here, the video) on top of
  a darkened page.
- **Favicon**: the small icon shown in the browser tab.
- **SEO**: "Search Engine Optimization", the practice of helping search engines
  understand and rank the site.
- **Redirect**: an instruction that automatically sends someone from an old web
  address to a new one.
- **Custom element**: a self-named HTML tag (here, `<site-header>` and
  `<site-footer>`) that JavaScript fills in with shared content.

---

For a developer-focused summary, the typography and color details, the exact
color values, and the redirect tables, see [README.md](README.md). For where the
images and video originally came from, see [MISSING_ASSETS.md](MISSING_ASSETS.md).
