# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Professional sculpture portfolio website for artist Zhao Kun. Bilingual EN/ZH. Ceramic animal sculptures in the Chinese freehand (xieyi) tradition; the artist is a Jingdezhen-based ceramic master. The PRD (`PRD.md`) is the source of truth for features and requirements.

## Commands

Node.js is installed locally — always prefix PATH before running commands:

```bash
export PATH="nodejs-temp/nodejs-local:$PATH"
npm run dev       # Dev server with hot reload (localhost:4321)
npm run build     # Production build → dist/
npm run preview   # Preview production build locally
```

## Technology Stack

- **Astro 5** — static site generator, zero JS by default
- **Content Collections** with glob loader (`src/content.config.ts`) — TypeScript-validated markdown content
- **@astrojs/sitemap** — auto-generated sitemap
- **No CSS framework** — custom CSS with design tokens in `src/styles/global.css`

## Architecture

### Content Collections

Works are markdown files in `src/content/works/`. Schema defined in `src/content.config.ts`:

```
title: { en, zh }, description: { en, zh }, animal, year, type ("original"|"copy"),
material, dimensions, featured, images: string[], price?, draft
```

### i18n Approach

- **No URL-based routing** — uses `localStorage` key `lang` (value `"en"` or `"zh"`)
- All translatable elements use `data-en` / `data-zh` attributes
- Client-side script in `BaseLayout.astro` swaps text on page load
- UI string translations live in `src/i18n/translations.ts`

### Page Routes

| Route | File | Notes |
|-------|------|-------|
| `/` | `index.astro` | Hero + featured works (where `featured: true`) |
| `/gallery` | `gallery.astro` | All works, client-side filtering by animal/year/type |
| `/work/[slug]` | `work/[slug].astro` | Detail with lightbox gallery, related works |
| `/bio` | `bio.astro` | Biography, artist statement, exhibition timeline |
| `/contact` | `contact.astro` | Form (no backend yet — alerts on submit) |

### Key Components (`src/components/`)

- `Header.astro` — sticky nav + mobile hamburger + lang toggle
- `Footer.astro` — copyright
- `WorkCard.astro` — gallery grid card with `data-animal`, `data-year`, `data-type` for filtering
- `ImageGallery.astro` — thumbnail switcher + lightbox with keyboard nav

### Design Tokens

Mahogany palette defined as CSS custom properties in `src/styles/global.css`:
- Primary: `#6B3A2A` (mahogany), Dark: `#4A2518`, Accent: `#C4956A` (warm gold)
- Background: `#faf6f1` (warm off-white)
- Fonts: Playfair Display (headings), Inter (body) — loaded from Google Fonts

### Image Conventions

```
public/images/works/<slug>/
    main.png       ← primary image shown in gallery grid
    detail-1.jpg   ← additional angles (optional)
```

## Adding a New Sculpture

1. Create `public/images/works/<slug>/` — add `main.png` (or `.jpg`) + detail images
2. Create `src/content/works/<slug>.md` with bilingual frontmatter (copy an existing file as template)
3. Build auto-generates `/work/<slug>` page and gallery entry

## SEO

`BaseLayout.astro` sets `<title>`, `<meta description>`, Open Graph tags, canonical URL per page. Sitemap auto-generated at `/sitemap-index.xml`.
