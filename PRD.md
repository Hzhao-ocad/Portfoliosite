# Sculpture Portfolio - Product Requirements Document

## 1. Project Overview

**Project Name**: Sculpture Portfolio Website
**Purpose**: A professional portfolio website showcasing sculpture works with multilingual support (English/Chinese)
**Target Audience**: Art collectors, gallery curators, potential clients, art enthusiasts

## 2. Core Features

### 2.1 Pages Required

| Page | Description |
|------|-------------|
| **Landing Page** | Hero section with featured works, brief artist intro |
| **Gallery Page** | Complete catalog of works with filtering capabilities |
| **Work Detail Page** | Expanded view of individual works with image gallery and description |
| **Bio Page** | Detailed artist biography, CV, artistic statement |
| **Contact Page** | Contact form and contact information |

### 2.2 Key Functionalities

#### 2.2.1 Landing Page
- Hero section with featured artwork images
- Brief introduction to the artist
- Call-to-action buttons (View Gallery, Contact)
- Quick navigation to other sections

#### 2.2.2 Gallery Page
- Grid or masonry layout displaying all works
- **Filtering by**:
  - **Animal Type**: e.g., Elephant, Lion, Horse, Bird, etc.
  - **Year**: Creation year or time period
  - **Type**: Original vs Copy (limited edition replicas)
- Search functionality (optional but recommended)
- Sort options (newest, oldest, name)
- Responsive grid (desktop: 3-4 columns, tablet: 2-3 columns, mobile: 1-2 columns)

#### 2.2.3 Work Detail Page
- Large hero image of the sculpture
- **Image Gallery**: Lightbox/carousel for multiple angles/views
  - Thumbnails of additional images
  - Full-screen view mode
  - Image zoom functionality
- Work details:
  - Title
  - Year created
  - Material/Medium
  - Dimensions (height x width x depth)
  - Animal type (if applicable)
  - Type (Original/Copy)
  - Price/Inquire (optional)
- Description/story behind the work
- Related works suggestions

#### 2.2.4 Bio Page
- Artist profile photo
- Biography
- Artistic statement
- CV/Timeline:
  - Exhibitions
  - Awards
  - Collections
- Social media links (if any)

#### 2.2.5 Contact Page
- Contact form:
  - Name
  - Email
  - Subject (Inquiry, Commission, General)
  - Message
- Contact information:
  - Email address
  - Phone (optional)
  - Location (optional)
- Social media links

#### 2.2.6 Language Switching
- Toggle button to switch between English (EN) and Chinese (中文)
- All pages and content must be available in both languages
- Language preference should persist across navigation
- Default language: TBD (user preference)

## 3. Technical Requirements

### 3.1 Technology Stack
**Selected: Astro**
- Content-first framework built for this exact use case
- **Content Collections** for structured, type-safe content management
- Zero JavaScript by default (faster page loads)
- Excellent for image-heavy portfolios
- Automatic page generation from content files
- Simple, maintainable workflow for adding new works

### 3.2 Content Architecture (Astro Content Collections)

Astro's Content Collections system will provide the structured, maintainable system you need. Here's how it works:

#### 3.2.1 Project Structure
```
src/
├── content/
│   ├── works/           # Sculpture works - add new files here
│   │   ├── elephant-majesty.md
│   │   ├── lion-pride.md
│   │   └── horse-galloping.md
│   ├── bio/             # Artist biography content
│   └── contact/         # Contact page content
├── pages/
│   ├── index.astro      # Landing page
│   ├── gallery.astro    # Gallery with filters
│   ├── work/
│   │   └── [slug].astro # Dynamic work detail pages
│   ├── bio.astro        # Bio page
│   └── contact.astro    # Contact page
└── public/
    └── images/
        └── works/       # Sculpture images
            ├── elephant-majesty/
            │   ├── main.jpg
            │   ├── detail-1.jpg
            │   └── detail-2.jpg
            └── lion-pride/
                └── ...
```

#### 3.2.2 Work Content File Structure

Each work is created as a markdown file in `src/content/works/`:

```markdown
---
title:
  en: "Elephant Majesty"
  zh: "雄狮威严"
description:
  en: "A powerful representation of an elephant in its natural habitat..."
  zh: "一幅展现大象自然栖息地的强大力量的作品..."
animal: "elephant"
year: 2024
type: "original"
material: "bronze"
dimensions: "120cm x 60cm x 40cm"
featured: true
images:
  - /images/works/elephant-majesty/main.jpg
  - /images/works/elephant-majesty/detail-1.jpg
  - /images/works/elephant-majesty/detail-2.jpg
price: "Inquire"
draft: false
---

This is the optional markdown body for additional content or story about the work.
```

#### 3.2.3 Content Collection Schema

Defined in `src/content/config.ts`:

```typescript
import { defineCollection, z } from 'astro:content';

const works = defineCollection({
  schema: z.object({
    title: z.object({
      en: z.string(),
      zh: z.string(),
    }),
    description: z.object({
      en: z.string(),
      zh: z.string(),
    }),
    animal: z.string(),
    year: z.number(),
    type: z.enum(['original', 'copy']),
    material: z.string(),
    dimensions: z.string(),
    featured: z.boolean().default(false),
    images: z.array(z.string()).min(1),
    price: z.string().optional(),
    draft: z.boolean().default(false),
  }),
});

export const collections = { works };
```

### 3.3 How Adding New Works Works

**Workflow for adding a new sculpture:**

1. **Create folder for images**:
   ```
   public/images/works/my-new-sculpture/
   ```

2. **Add images** to that folder:
   - `main.jpg` (primary image)
   - `detail-1.jpg`, `detail-2.jpg`, etc.

3. **Create markdown file** in `src/content/works/`:
   ```
   src/content/works/my-new-sculpture.md
   ```

4. **Add metadata** in the file's frontmatter (copy template)

5. **That's it!** Astro automatically:
   - Validates the content against the schema
   - Generates a unique URL: `/work/my-new-sculpture`
   - Makes it available in gallery queries
   - Indexes it for search/filtering
   - Updates the site build

### 3.4 Image Storage
- **Phase 1**: Local folder `public/images/works/` with subfolders per work
- **Astro's Image optimization** automatically handles:
  - Responsive image generation
  - Format conversion (WebP)
  - Lazy loading
  - Alt text generation (from title)

### 3.5 Internationalization (i18n)

Using Astro's i18n routing with a simple approach:
- Content stored with both EN/ZH versions
- Language toggle switches the displayed content
- URL structure: `/en/...` or `/zh/...` (optional)

### 3.6 Maintenance Benefits

**Why this architecture is easy to maintain:**

| Feature | Benefit |
|---------|---------|
| **Content Collections** | Type-safe content with automatic validation |
| **Schema enforcement** | Can't forget required fields - TypeScript will warn you |
| **Auto-generated pages** | No manual routing - new files = new pages |
| **File-based workflow** | Edit in any text editor, no database needed |
| **Git-friendly** | Track changes to content like code |
| **Template reuse** | Change one file, all work pages update |
| **No build step for content** | See changes in dev mode instantly |
| **Easy backup** | Content is just text files and images |
| **Portable** | Content works with any Astro theme or design |

**Adding a new work = ~5 minutes:**
1. Copy image folder structure (30s)
2. Add images (2 min)
3. Copy markdown template (30s)
4. Fill in metadata (2 min)
5. Done - page automatically created!

## 4. Design Requirements

### 4.1 Visual Style
- **Minimalist/Clean Design**
- Generous white space
- Elegant typography
- Let sculptures stand out (artwork is the hero)

### 4.2 Color Scheme
- Light background (white/off-white)
- Dark text for readability
- Accent color: TBD (minimal usage, perhaps for CTAs)

### 4.3 Responsive Design
- Mobile-first approach
- Breakpoints:
  - Mobile: < 640px
  - Tablet: 640px - 1024px
  - Desktop: > 1024px

### 4.4 Performance
- Fast page loads (< 3 seconds)
- Optimized images (WebP format, lazy loading)
- Minimal JavaScript

## 5. Content Requirements

### 5.1 Content to Prepare
- Artist biography (English & Chinese)
- Artistic statement (English & Chinese)
- High-quality images of each sculpture:
  - Main shot
  - Multiple angles/views
  - Detail shots
- Work metadata for each piece:
  - Title (EN/ZH)
  - Description (EN/ZH)
  - Year
  - Material
  - Dimensions
  - Animal type
  - Original/Copy classification
- Contact information

## 6. SEO Requirements
- Meta tags for all pages
- Alt text for all images
- Semantic HTML structure
- Open Graph tags for social sharing
- Sitemap generation

## 7. Future Enhancements (Out of Scope for MVP)
- Admin dashboard to manage works
- E-commerce integration
- Virtual 3D model viewer
- Video documentation
- Blog/News section

## 8. Success Criteria
- User can view all works with smooth browsing experience
- Filtering works correctly by animal, year, and type
- Work detail page displays all images and information clearly
- Language switching works seamlessly across all pages
- Site loads quickly with optimized images
- Responsive design works on all devices

## 9. Timeline (To Be Determined)
- Phase 1: MVP with core features (approx. X weeks)
- Phase 2: Refinements and content population (approx. X weeks)
- Phase 3: Future enhancements (as needed)

---

**Version**: 1.1
**Last Updated**: 2026-02-27
**Changes**: Added Astro Content Collections architecture for maintainable content management
