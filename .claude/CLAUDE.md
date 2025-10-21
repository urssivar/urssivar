# Urssivar Documentation Site - Project Guide

**Last Updated:** 2025-10-21
**Project:** Kaitag language documentation site
**Tech Stack:** VitePress v1 + Nuxt UI
**Current Phase:** 2.5 (UI Polish & Updates Section)

---

## Project Vision

Documentation website for Kaitag language as part of Urssivar initiative (5-year campaign to document Kaitag language, history, and villages).

### Target Audience
**Ordinary folk** - not linguists, not complete beginners. People who want to understand and use Kaitag practically.

### Core Design Philosophy
- **Minimalism & Typography**: Content is the feature. Good typography, spacing, convenient navigation.
- **Printable & Accessible**: Should look great as PDF, like a well-designed textbook.
- **Fast & Responsive**: Fast loads (for Dagestan connectivity). Responsive for all devices.
- **Reading-focused**: Minimize navigation clutter, maximize content space.

### Design Aesthetic (Future)
**Goal:** Minimal, book-like aesthetic inspired by Notion, academic texts, and the landing page at urssivar.com.

**Principles:**
- Typography-first (good pairings, generous spacing, readable hierarchy)
- Minimal UI chrome (lighter nav, simpler sidebar, clean tables)
- Focus on examples (Kaitag text should stand out naturally)
- Printable first (should look good as PDF)
- Monochrome base (white/light gray, black text, minimal color accents)

**Timeline:** Apply after Grammar section is complete (3-5 pages will reveal design needs)

---

## Site Structure

### Top-Level Navigation
```
Grammar | Dictionary | Typing | Apps ▾
                                  ├─ Avdan: Cards for Kids
                                  ├─ Bazur: Online Dictionary
                                  └─ Yaziv: Script Converter
```

**Future addition:** Phrasebook section

### Grammar Section Structure
**12 pages** - flat sidebar, natural ordering. See `grammar-content-plan.md` for detailed content outline.

```
Grammar/
├─ Alphabet & Script
├─ Phonology
├─ Nouns & Classes
├─ Cases
├─ Spatial Cases & Postpositions
├─ Copulas
├─ Predicative Particles
├─ Verbs - Part 1: Basics
├─ Verbs - Part 2: Advanced
├─ Adjectives & Adverbs
├─ Pronouns
└─ Numerals
```

### Other Sections
- **Dictionary**: Simplified intro + ~5,171 lexeme entries
- **Phrasebook**: Future (ready-to-use phrases by situation)
- **Texts**: Future (cultural/historical texts)

### Blog & Updates
**Purpose:** Showcase Urssivar campaign progress (language documentation, DNA research, village visits, team updates, essays, archival materials, visualizations).

**Content Source:** Curated posts from Telegram channel, hosted on main website.

**Landing Page Integration:** Located on main `urssivar.com` landing page (separate from language docs site):
- Simple carousel component showing 2-3 recent posts
- Posts include title, date, summary, link to full article
- Responsive (full-width mobile, constrained desktop)
- **Placement:** After stamp, before footer. Creates natural flow: main content → stamp (visual punctuation) → stay connected (updates + social) → footer (legal).

---

## Responsive Navigation

### Layout Summary
- **Desktop (≥1024px)**: Left sidebar (articles) + center content + right ToC (both sidebars sticky)
- **Tablet (768-1024px)**: Left sidebar + wider content (no right ToC)
- **Mobile (<768px)**: Full-width content + sticky bar with nav/ToC drawers

### Key UX Decisions
- Top nav at **prose width** (not full-width), **NOT sticky**
- Left sidebar shows article list
- Right sidebar (desktop only) shows ToC with scroll tracking
- Mobile sticky bar: `☰` button (nav drawer) + `≡` button (ToC drawer)
- Nav drawer: subsections + articles
- ToC drawer: page headings (h1-h4) with scroll tracking

### Footer
- **Current pages**: License text + 3 social icon buttons (Telegram, YouTube, GitHub)
- **Phase 2.5 change**: License · Contact (centered, dot separator) on all pages; social icons move to Updates section on landing page

---

## Content Organization

### Grammar Content
See `grammar-content-plan.md` for detailed 12-page outline with topic descriptions, content reorganization needs, cross-linking strategy, and development workflow.

**Key principles:**
- Each page is self-contained and covers its topic thoroughly
- No artificial "mechanics vs usage" division
- Topics integrated where natural (negation in Copulas & Verbs, time in Cases & Numerals)
- Flat structure (questions merge into Predicative Particles, spatial system unified)

### Cross-Linking Strategy

**Reference → Dictionary (Manual, selective)**
- Link example words to dictionary entries
- Format: `++[атта](/dictionary/а#атта)==л== беччив++`
- Only key illustrative words, not every word
- **Timing:** Final pass once grammar pages complete

**Dictionary → Reference (Automatic, future)**
- Tag-based auto-linking in `DWord.vue` component
- Map grammatical tags to pages: `N` → `/grammar/nouns`, `V` → `/grammar/verbs`
- **Timing:** After grammar content stable

**Phrasebook ↔ Grammar/Dictionary (Manual, future)**
- Light cross-references both directions
- **Timing:** When phrasebook section created

### Style Conventions
- **Kaitag text:** `++word++` (renders with Noto Sans font)
- **Translations:** `--translation--` (secondary styling)
- **Emphasis in Kaitag:** `++word ==emphasized-part==++`
- **No complex custom components:** Removed Context widgets, keeping markdown-it plugins

---

## Technical Implementation

### Framework & Architecture
- **VitePress v1 (stable)** - not v2 alpha
- **Custom theme from scratch** - avoids fighting default theme complexity
- Vercel deployment

### Typography System
- **Body text**: Inter 16px
- **Kaitag** (`lang="xdq"`): EB Garamond 20px medium
- **Gloss/translations**: Inter 14px, muted color (0.875em relative sizing)
- **Highlight**: Thick grayish underline
- **Tables**: Smaller text with relative hierarchy (em units for scalability)

### Custom Markdown Syntax
- `++kaitag++` - wraps in spans with lang="xdq"
- `--gloss--` - wraps in spans with class
- `==highlight==` - adds underline styling
- Custom containers with `:::` syntax

### Interactive Features
- **Clickable headers**: Click any header to scroll & update URL hash
- **Implementation**: `useHeaderClicks()` composable in `.vitepress/composables/`
- **Timing**: Runs after page content updates

### Color System
- `primary: 'blue'` and `neutral: 'gray'` in `app.config.ts`
- Use semantic tokens: `primary-600`, `neutral-900`, `blue-600`, `neutral-600`
- Fonts auto-loaded from `@theme` variables in `main.css`

### Component Structure
- `Layout.vue` - Main layout container, handles routing and responsive layout
- `SidebarNav.vue` - Article list for current subsection
- `NavBar.vue` - Reusable navbar with leading/trailing slots
- `TableOfContents.vue` - Dynamic ToC with scroll tracking via IntersectionObserver
- Composables: `useHeaderClicks`, `useElementIdObserver`

### File Organization
```
.vitepress/
  theme/
    Layout.vue
    style.css
    index.js
  composables/
    useHeaderClicks.ts
  config.js
components/
  VillageMap.vue
language/
  grammar/
  dictionary/
```

---

## Development Roadmap

### Phase 1: Planning ✅
- Define vision and audience
- Decide on structure (flat Grammar section)
- Remove complex features (widgets, glossaries)
- Plan cross-linking strategy

### Phase 2: Navigation Implementation ✅
- Implement left sidebar with article list
- Build mobile sticky bar with nav/ToC drawers
- Add responsive breakpoints (1024px)
- Style sidebar, header, menus

### Phase 2.5: UI Polish & Updates Section (Current)
**Language docs site (codex.urssivar.com):**
- [ ] Update footer to License · Contact (centered, dot separator)
- [ ] Keep footer on every page (minimal footprint)
- [ ] Move social icons from footer to Updates section only
- [ ] Add print media styles (hide nav/sidebars on print)

**Main campaign landing (urssivar.com):**
- [ ] Create Updates section (campaign news, essays, archive, visualizations)
- [ ] Create updates carousel component (title, date, summary, link)
- [ ] Integrate carousel + social icons into landing layout
- [ ] Link to full updates archive
- [ ] Ensure responsive behavior

### Phase 3: Content Audit & Reorganization
- [ ] Move alphabet/orthography from dictionary intro → `/grammar/alphabet`
- [ ] Integrate typing game into alphabet page
- [ ] Simplify dictionary intro
- [ ] Clean up existing grammar pages:
  - [ ] Copulas (remove widgets/glossaries)
  - [ ] Cases (remove glossaries, verify links)
  - [ ] Predicatives (remove glossaries)
  - [ ] Questions (remove glossaries)
  - [ ] Locative cases (complete or merge)

### Phase 4: New Content Creation (Priority Order)
1. [ ] Alphabet & Script - Move from dictionary, embed typing game
2. [ ] Nouns & Classes - Foundational (includes oblique stems)
3. [ ] Spatial Cases & Postpositions - Merge content
4. [ ] Predicative Particles - Merge predicatives + questions
5. [ ] Verbs - Part 1: Basics - Core tenses, negation, commands
6. [ ] Verbs - Part 2: Advanced - Preverbs, causatives, participles
7. [ ] Pronouns - Personal, demonstrative, question words
8. [ ] Adjectives & Adverbs - Includes comparisons
9. [ ] Phonology - Rewrite as learner-friendly
10. [ ] Numerals - Complete content, add telling time

### Phase 5: Polish & Cross-Linking
- [ ] Add dictionary cross-links in examples
- [ ] Verify internal links between grammar pages
- [ ] Ensure consistent formatting
- [ ] Proofread for clarity and completeness
- [ ] Test printability

### Phase 6: Future Enhancements
- [ ] Implement automatic Dictionary → Grammar tag-based links
- [ ] Create Phrasebook section
- [ ] Add Phrasebook cross-links
- [ ] Design aesthetic refinements (typography, spacing)
- [ ] Consider audio enhancements beyond alphabet

---

## Open Questions (Phase 4+)

### Content Scope
- **Verbs:** Directional prefixes - main patterns only or exhaustive?
- **Participles:** Minimal forms for practical use or comprehensive?
- **Numerals:** Keep all forms from existing content, or streamline?
- **Phonology:** How deep on sound changes and pronunciation?

### Audio Resources
- Reuse typing game audio (`/docs/public/typing/audio/`) for Alphabet page?
- Additional recordings needed after page structure complete?

### Future Sections
- **Phrasebook:** When to start? Basic structure ready?
- **Texts:** What kind of cultural/historical texts to include?

---

## Success Criteria

When complete, users should be able to:

1. **Learn the basics** - Read Grammar section top-to-bottom, understand core mechanics
2. **Look up patterns** - Jump to specific page to find how to do something
3. **Practice writing** - Use alphabet page with typing game
4. **Find examples** - See real Kaitag with inline translations throughout
5. **Explore deeper** - Follow links to dictionary entries
6. **Print & study** - Download/print pages for offline learning

The site should feel:
- **Practical** - Focused on use, not theory
- **Clean** - Easy to scan, minimal clutter
- **Complete** - Covers core language systems
- **Accessible** - For ordinary people, not academics
- **Integrated** - Well-connected sections

---

## Resources & References

- **Project landing:** https://urssivar.com/
- **Documentation site:** https://codex.urssivar.com/
- **Grammar content details:** `grammar-content-plan.md`
- **VitePress docs:** https://vitepress.dev/
- **Nuxt UI:** https://ui.nuxt.com/

---

## Design Principles

### Navigation Typography & Color
- All navigation (sidebar, ToC, footer) use `font-medium` weight
- Default to `text-toned` (neutral-600), hover to `text-highlighted` (neutral-900)
- Module level uses `font-semibold` for visual anchor
- ToC h1 remains bold (functions as "back to top" button)

### Footer Design
- Plain `<a>` tags (not UButton) with `.navlinks` styles for consistency
- Middot separator (·) with `font-medium text-muted select-none`
- "Write to us" instead of "Contact" (warmer, human-centered tone)

### Drawer Design
- Nav drawer fills from edge (site-level navigation)
- ToC drawer uses inset (page-level navigation)
- Intentional asymmetry matches functional distinction

### Accessibility & Usability
- Target: Ordinary folk, not linguists
- Clear exception marking (e.g., "Исключение:" for grammatical exceptions)
- Arrow notation `→` for transformations (intuitive but not too techy)
- Proper contrast ratios for muted text
- Navigation links are selectable text (not UI chrome)

### No Complex Widgets
**Removed:** `<Context>` component with interactive class toggles
- **Why:** Adds cognitive load, breaks printability, interrupts flow
- **Replacement:** Static tables showing all forms at once

**Removed:** Pre-section glossaries
- **Why:** Shows vocabulary before grammar point, breaks flow
- **Replacement:** Examples with inline translations
