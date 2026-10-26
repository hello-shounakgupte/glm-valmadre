# Valmadre Homes — Homepage CRO Sections

Conversion-focused sections to **add** to the existing valmadre.net.au homepage.
No redesign — every section reuses the site's existing design language
(colours, type scale, spacing, buttons) and is built with plain **HTML / CSS / JS**,
no dependencies.

---

## What's in this package

| File | Purpose |
|---|---|
| `index.html` | **Working demo** — a faithful recreation of the current homepage with all 6 CRO sections placed in position. Open it in a browser to preview the end result. |
| `css/cro-sections.css` | The only new stylesheet needed. All classes are prefixed `vh-` so nothing collides with Divi/theme styles. |
| `js/cro-sections.js` | The only new script needed. Vanilla JS: counters, reveal-on-scroll, testimonial slider, FAQ accordion, sticky mobile call bar. |
| `sections/01-trust-stats.html` | Drop-in markup: stats + awards bar |
| `sections/02-why-valmadre.html` | Drop-in markup: five values / USPs |
| `sections/03-testimonials.html` | Drop-in markup: client reviews slider |
| `sections/04-process.html` | Drop-in markup: 5-step process |
| `sections/05-faq.html` | Drop-in markup: accordion FAQ |
| `sections/06-sticky-call-bar.html` | Drop-in markup: mobile call bar |
| `sections/07-optional-cta-phone.html` | Optional: phone button beside the existing CTA |
| `css/site-base.css`, `img/` | Demo assets only — **do not upload** to the live site |

---

## Where each section goes (homepage flow)

```
1. Hero banner                     (existing)
2. Intro split section             (existing)
3. ★ Trust bar — stats + awards    NEW  01-trust-stats.html
4. "What we do" + services         (existing)
5. ★ Why Valmadre — five values    NEW  02-why-valmadre.html
6. Featured projects               (existing)
7. ★ Testimonials                  NEW  03-testimonials.html
8. ★ Process — how we work         NEW  04-process.html
9. ★ FAQ                           NEW  05-faq.html
10. "Let's begin…" CTA             (existing) + optional 07
11. Footer                         (existing)
12. ★ Sticky mobile call bar       NEW  06-sticky-call-bar.html (before </body>)
```

Rhythm: the dark testimonials band echoes the dark hero and CTA, so the page
still alternates light/dark exactly like the current design.

---

## Two ways to integrate

### Option A — Hand to the site developer (recommended)
Give them this folder plus these notes. Each snippet maps 1:1 to a Divi section:

- In each Divi section add a **Code module** (or let the dev rebuild the
  sections natively — every class name and value is documented in
  `css/cro-sections.css`).
- Upload `cro-sections.css` to the child theme (e.g. `/wp-content/themes/PW/cro-sections.css`)
  and enqueue it, or paste its contents into **Divi → Theme Options → Integration → <head>** inside
  `<style>` tags.
- Upload `cro-sections.js` the same way (script tag), or into the footer integration area.
- The snippets use absolute-in-site hrefs (`/about/`, `/contact-us/`, `tel:0897567308`) —
  they work as-is on the live domain. In the demo they are `#`.

### Option B — Paste into Divi Code modules yourself
1. Add a regular Divi section with one full-width row where the snippet belongs.
2. Insert a **Code module**, paste the snippet's markup.
3. Set the section padding to 0 (the CSS handles spacing).
4. Add `cro-sections.css` + `cro-sections.js` via Theme Options → Integrations.

---

## Design fidelity notes

Everything matches the tokens already used by the site:

| Token | Value | Where it's used on the live site |
|---|---|---|
| Background | `#FAFAFA` | all sections |
| Ink / text | `#18191B` | body text, buttons |
| Hairline | `#E4E5E7` | footer border |
| Muted | `rgba(24,25,27,.72)` | card copy |
| Dark band | `#18191B` | matches hero/CTA darkening |
| Eyebrow | 12px uppercase, 0.1em tracking, `freight-neo-pro` 500 | same as "What we do" |
| Headings | 300 weight, clamp() scale identical to `.heading-40` | same as "Featured projects" |
| Buttons | `.vh-link-btn` mirrors the theme's `.link-btn` underline animation; pills mirror `.border-btn-wrap` / `.bg-btn` | — |

Fonts: the new sections inherit the site's `freight-sans-pro` / `freight-neo-pro`
from the body — no extra font loading.

---

## Before launch — content checklist

1. **"100+ Projects completed"** — placeholder. Check the counters on the About page
   and set the real number in `data-vh-count` (both the visible text and the attribute).
2. **Testimonials** — excerpts are taken from reviews already published on /about/.
   Confirm the client is happy to show them on the home page (they're already public).
3. **FAQ answers** — grounded in current site copy (service area, architect
   collaboration, cost control, limited project load, registration). Worth a
   final read by Mike/office to confirm.
4. Optional: swap the three highlighted awards in `01-trust-stats.html` for the
   ones the client most wants to feature.

## Behaviour notes

- Counters animate once when scrolled into view; `prefers-reduced-motion` respected.
- Testimonial slider: arrow buttons, touch swipe, counter updates, buttons disable at ends.
- FAQ: single-open accordion, keyboard accessible (`aria-expanded`), plus → minus icon
  matches the team accordion pattern already on the site.
- Sticky call bar: mobile only (<768px), appears after ~60% of the first viewport is
  scrolled, includes safe-area padding for iPhones.
- No jQuery, no build step, no external requests.
