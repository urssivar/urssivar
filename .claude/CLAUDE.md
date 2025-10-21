# Urssivar Documentation Site - Project Roadmap

**Last Updated:** 2025-10-18
**Project:** Kaitag language documentation site
**Tech Stack:** VitePress v1 with custom theme + Nuxt UI
**Status:** Phase 2 Complete - Phase 2.5 Ready (UI Polish) - Then Phase 3 (Content Audit & Reorganization)

---

## Project Vision & Goals

### Purpose
Documentation website for Kaitag language as part of Urssivar initiative (5-year campaign to document Kaitag language, history, and villages).

### Target Audience
**Ordinary folk** - not linguists, not complete beginners. People who want to understand and use Kaitag practically.

### Core Design Philosophy
- **Minimalism & Typography**: Content is the feature. Good typography, spacing, convenient navigation.
- **Printable & Accessible**: Should look great as PDF, like a well-designed textbook. Easy to scan. No unnecessary UI chrome.
- **Fast & Responsive**: Fast loads (for Dagestan connectivity). Responsive layout for all devices.
- **Reading-focused**: Minimize navigation clutter, maximize content space. Non-sticky nav reduces visual clutter.

### Design Aesthetic (Future Implementation)
**Goal:** Minimal, book-like aesthetic. Let Kaitag text and examples be the visual focus.

**Inspiration:**
- Notion (clean, spacious, typography-focused)
- Landing page [urssivar.com](https://urssivar.com/) - monospace, white, minimal
- Academic linguistics texts - serious, readable, no distractions

**Principles:**
- **Typography-first** - Good font pairings, generous spacing, readable hierarchy
- **Minimal UI chrome** - Lighter nav, simpler sidebar, clean tables
- **Focus on examples** - `++examples++` should stand out naturally
- **Printable first** - Should look good as PDF
- **Monochrome base** - White/light gray, black text, minimal color accents

**Timeline:** Apply after Grammar section is complete (3-5 pages written will reveal design needs)

---

## Site Structure

### Top-Level Navigation
```
┌──────────────────────────────────────────┐
│ Logo .... Search .... Language │ Grammar │ Dictionary │ Typing │ Apps ▾ │
└──────────────────────────────────────────┘
                                                            │
                                                            ├─ Avdan: Cards for Kids
                                                            ├─ Bazur: Online Dictionary
                                                            └─ Yaziv: Script Converter
```

**Future addition:**
```
┌────────────────────────────────────────────────────┐
│ Grammar │ Dictionary │ Phrasebook │ Typing │ Apps ▾ │
└────────────────────────────────────────────────────┘
```

### Grammar Section Structure

**Flat sidebar** - no subsection labels, natural ordering. Each page thoroughly covers its topic.

**Total: 12 pages** - See `grammar-content-plan.md` for detailed content outline.

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

**Purpose:**
- Showcase Urssivar campaign progress (language documentation, DNA research, village visits, team updates)
- Share occasional essays and archival materials
- Visualizations and data stories related to the initiative
- **Scope:** Entire Urssivar project, not just language learning

**Content Source:**
- Curated posts from Telegram channel
- Hosted on main website (not just parsed from telegra.ph links)

**Landing Page Integration:**
Located on main `urssivar.com` landing page (separate from language documentation site):
```
┌──────────────────────────────┐
│ URSSIVAR                     │
│ [Intro paragraphs]           │
│ - Language documentation     │
│ - DNA research direction     │
│                              │
│ ─ Our Latest Updates ─       │
│ [← Carousel: 2-3 recent →]   │
│                              │
│ → Go to language learning    │
│ [TG] [YT] [GH]               │
└──────────────────────────────┘
```

**Implementation Notes:**
- Simple carousel component showing recent blog posts
- Minimal implementation: 2-3 posts visible
- Posts include title, date, summary, link to full article
- Responsive: full-width on mobile, constrained on desktop

---

## Responsive Navigation Design

### Key UX Decisions

1. **Sidebar vs Horizontal Nav** → Subsection switcher moves to left sidebar (more integrated)
2. **Article List Priority** → Articles in sidebar; subsections in dropdown `☰` (15-30 items need space)
3. **Top Nav Width** → Keep at **prose width** (not full-width) for visual harmony with content
4. **Top Nav Stickiness** → NOT sticky (users scroll down to read, not up to navigate)
5. **Mobile Navigation** → Sticky bar with `[☰ Subsection ... ≡]` pattern (thumb-friendly)
6. **Table of Contents** → Right sidebar on desktop, drawer on tablet/mobile (standard pattern)
7. **Menu Structure** → Dropdown with landing link, divider, subsections (current disabled), divider, articles

### Desktop Layout (≥1024px, Design spec: ≥1280px)
```
┌─────────────────────────────────────┐
│ Logo .... Search .... Language      │ (prose-width, NOT sticky)
├─────────────────────────────────────┤
│ [~220px]       [centered]    [~220px]
│ Sidebar │    Content    │  ToC      │
│ ┌─────┐ │                │ ┌─────┐ │
│ │Articles (sticky header)  │ │ ≡ ToC
│ │─────│ │                │ │ (sticky)
│ │Art1 │ │                │ │ ──  │ │
│ │Art2 │ │                │ │ ──  │ │
│ │Art3 │ │                │ │     │ │
│ └─────┘ │                │ └─────┘ │
└─────────────────────────────────────┘
```

**Current Implementation:**
- **Left sidebar**: Article list (no header yet; sidebar header dropdown deferred)
- **Center**: Centered prose content (65ch, grid-based)
- **Right sidebar**: Full ToC with scroll tracking
- Both sidebars: sticky positioning at top
- **Note:** Currently using Tailwind lg:1024px; design spec is 1280px (see "Implementation Notes")

### Tablet Layout (768px-1024px)
```
┌─────────────────────────────────────┐
│ Logo .... Search .... Language      │ (prose-width, NOT sticky)
├─────────────────────────────────────┤
│ [~220px]    [wider]                 │
│ Sidebar │  Content                  │
│ ┌─────┐ │                           │
│ │Articles (sticky)
│ │─────│ │                           │
│ │Art1 │ │                           │
│ │Art2 │ │                           │
│ │Art3 │ │                           │
│ └─────┘ │                           │
└─────────────────────────────────────┘
```

**Current Implementation:**
- **Left sidebar** with article list (sticky)
- Content wider than desktop
- **Note:** ToC drawer only appears on mobile (<768px) currently. Design spec calls for ≡ button in sidebar header on tablet (deferred; see "Implementation Notes" → "Tablet ≡ button placement")

### Mobile Layout (<768px)
```
┌──────────────────────────┐
│ Logo Search Lang         │ (compressed, NOT sticky)
├──────────────────────────┤
│ ☰ Грамматика .... ≡      │ (sticky bar, always visible)
├──────────────────────────┤
│                          │
│   Full-width Content     │
│                          │
└──────────────────────────┘
```

**Current Implementation:**
- **No sidebars** - full-width content
- **Sticky bar** at top with two buttons
- **☰ button**: Opens UDrawer with nav (subsections + articles)
- **≡ button**: Opens UDrawer with ToC (page headings)
- Content centered, full width, readable line length

### Left Sidebar Header (Deferred)
```
┌─────────────────┐
│ ☰ ГРАММАТИКА  ≡ │ (design spec; currently not implemented)
└─────────────────┘
```

- **Left ☰**: Opens subsection menu dropdown (NOT YET IMPLEMENTED)
- **Center**: Current subsection name (uppercase, bold) (NOT YET IMPLEMENTED)
- **Right ≡**: Opens ToC drawer on tablet (DEFERRED; see "Implementation Notes")
- **Status:** Deferred to Phase 2.5. Requires subsection detection (route-based) and fixed header layout.

### Menu Dropdown Structure (Deferred)
```
← Язык
─────────────────
Грамматика   ✓
Словарь
Разговорник
Тексты
```

- **Status:** Not yet implemented. Design calls for dropdown in sidebar header.
- **Current approach:** Subsection links are just flat list items in SidebarNav (temporary, awaiting route detection)
- **Future:** Will implement dropdown menu when route detection is complete

### Mobile Sticky Bar Components (Implemented)

**Nav Drawer (☰) - Implemented:**
- Left-aligned drawer showing subsection navigation
- Content (from SidebarNav.vue):
  ```
  ← Язык
  ──────────────────
  Грамматика
  Словарь
  Разговорник
  Тексты
  ──────────────────
  [Падежи]     ✓
  [Частицы]
  [Связки]
  [... all articles]
  ```
- Uses UDrawer component with width: 66% (sm:320px)
- Backdrop blur effect

**ToC Drawer (≡) - Implemented:**
- Right-aligned drawer showing page table of contents
- Uses UDrawer component with inset positioning
- Dynamically generated from article headings (h1-h4)
- Scroll tracking highlights current section
- Uses IntersectionObserver for efficient scroll detection

### Print Styling (Deferred)

**Design Intent (Not Yet Implemented):**
```css
@media print {
  /* Hide all navigation UI */
  nav, aside, .sidebar, .toc, footer { display: none !important; }

  /* Clean page styling */
  body { margin: 0; padding: 1rem; }
  a { text-decoration: none; }
  * { background: white !important; }
}
```

**Rationale:**
- Articles are self-contained; sidebars/nav not needed on paper
- Users expect textbook-like printouts: content only
- Aligns with "minimal UI" philosophy
- Printed pages feel like excerpt from well-designed reference book

**Status:** To be added in style.css during Phase 2.5. Currently no print styles implemented.

### Footer Implementation (Current)
**Implemented:** License text + 3 social media icon buttons on every page (Layout.vue:113-128)
- License: "Лицензия CC BY 4.0"
- Icons: Telegram, YouTube, GitHub (via Nuxt UI icons)
- Uses NavBar component for consistent styling

**Design Decisions Needed:** See "Open Questions & Decisions Needed" → "Footer Design Decisions"

---

## Content Organization

### Grammar Content Overview
See `grammar-content-plan.md` for **detailed 12-page outline** with:
- Complete topic descriptions for each page
- Content reorganization needs (dictionary intro, typing game relocation)
- Cross-linking strategy
- Development workflow (5 phases with checkboxes)
- Success criteria

**Key principles:**
- Each page is **self-contained** and covers its topic thoroughly
- No artificial "mechanics vs usage" division
- Topics integrated where natural (negation, time, commands across pages)
- Flat structure: questions merge into Predicative Particles, spatial system unified

### Cross-Linking Strategy

**Reference → Dictionary (Manual, selective)**
- Link example words to dictionary entries
- Format: `++[атта](/dictionary/а#атта)==л== беччив++`
- Only for key illustrative words, not every word
- **Timing:** Add during final pass once grammar pages complete

**Dictionary → Reference (Automatic, future)**
- Tag-based auto-linking in `DWord.vue` component
- Map grammatical tags to pages: `N` → `/grammar/nouns`, `V` → `/grammar/verbs`, etc.
- **Timing:** Implement after grammar content stable

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
- **Custom theme from scratch** - additive work (~200 lines for MVP)
- Avoids fighting default theme complexity
- Vercel deployment

### Typography System
- **Body text**: Inter 16px
- **Kaitag** (`lang="xdq"`): EB Garamond 20px medium (readability)
- **Gloss/translations**: Inter 14px, muted color (0.875em relative sizing)
- **Highlight**: Thick grayish underline
- **Tables**: Smaller text maintaining relative hierarchy (em units for scalability)

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

### Image Inversions
- **Stamp**: Original white → `invert-[88%]` light / `invert-[12%]` dark
- **Map**: Original dark → `invert-[12%]` light / `invert-[88%]` dark

### VillageMap Component

**Tooltip Integration:**
- Leaflet blocks pointer events on markers
- Solution: Use `@mouseover`/`@mouseout` to control `v-model:open`
- Capture marker containers via `@ready` event, not template refs
- Use `classList.add/remove` for scaling (reactive `:class` breaks positioning)

**Updating Map Backdrop:**
1. Export from QGIS: EPSG:4326, bounds 47.2754-48.2753 lng, 41.8747-42.2207 lat
2. Update `imageBounds` constant: `[[minLat, minLng], [maxLat, maxLng]]`

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

### Configuration Changes Needed
```typescript
// Change nav label from "Reference" to "Grammar"
{
    text: "Grammar",  // was: "Reference"
    link: "/reference/copulas",  // keep URLs same
    activeMatch: "/reference/",
}

// Remove Typing from top-level nav (embedded in alphabet page)
```

### Implementation Notes (Phase 2 - Navigation)

**Component Structure:**
- `Layout.vue` - Main layout container, handles language routing and responsive layout
- `SidebarNav.vue` - Article list for current subsection (hardcoded for now, awaiting route detection)
- `NavBar.vue` - Reusable navbar component with leading/trailing slots
- `TableOfContents.vue` - Dynamic ToC generator with scroll tracking via IntersectionObserver
- Composables: `useHeaderClicks`, `useElementIdObserver` for interactive features

**Responsive Approach:**
- Desktop (≥1024px): Left sidebar (sticky) + center content + right ToC (sticky)
- Tablet (768-1024px): Left sidebar + wider content, no right ToC sidebar
- Mobile (<768px): Full-width content + sticky top bar with nav/ToC drawers
- **Note:** Currently using `lg:` (1024px) from Tailwind. Design specifies 1280px for desktop. This is intentional simplification for MVP; can adjust to match design exactly.

**Grid Layout:**
- Uses `lg:grid-cols-[1fr_65ch_1fr]` for flexible sidebar widths
- Achieves approximately 220px sidebars on standard displays (design spec)
- Sidebar header is sticky while article list scrolls independently

**Deferred Features:**
1. **Sidebar header dropdown:** Design calls for `[☰ ГРАММАТИКА ≡]` fixed header with dropdown menu. Currently just flat link list. Can be added in future if route detection is implemented.
2. **Print media styles:** Design requires hiding all nav/sidebars on print. Will add `@media print` rules in style.css in Phase 2.5.
3. **Tablet ≡ button:** Design shows ToC button in sidebar header on tablet. Currently only in mobile sticky bar. Final design choice made - no changes needed.

**Current Limitations:**
- SidebarNav.vue uses hardcoded articles (awaiting route detection for dynamic content)
- No subsection dropdown menu (flat list is final design choice)
- No print styling (deferred to Phase 2.5)

---

## Design Decisions - Phase 2 (Resolved)

### Responsive Breakpoint
**Decision:** Keep Tailwind default `lg:1024px`
**Reasoning:** Works well on all standard displays. Design spec (1280px) was ideal but not necessary. Current breakpoint provides good UX without custom configuration overhead.

### Sidebar Navigation
**Decision:** Flat list with spacing & color hierarchy (no dropdown menu)
**Reasoning:** Current implementation uses typography, spacing, and color to create visual hierarchy. Full-height article list is clean and works excellently. Dropdown menu would add unnecessary complexity. Highly functional as-is.

### Tablet Navigation (768px-1024px)
**Decision:** Keep current sticky bar behavior for all screens <lg
**Reasoning:** Tablets benefit from sticky bar with nav/ToC drawers just like mobile. Left sidebar remains visible on tablets for navigation. This works well in practice—no changes needed.

### Footer Placement & Content
**Decision:** Minimal footer (License + Contact) on every page; Social icons only on Updates section (landing)
**Reasoning:**
- License is legal/meta info (belongs universally in footer)
- Contact (email) is always accessible (users can reach out from any page)
- Keeps footer minimal on grammar pages (aligns with "minimal UI" philosophy)
- Social icons move to Updates section on landing (natural place for "join community")
- Clear mental model: Footer = project essentials; Updates section = community hub

### Footer Style
**Decision:** License · Contact (centered, dot separator)
**Reasoning:**
- Compact, intimate feeling with two items
- Dot separator is elegant and minimal
- Centered placement feels intentional (not sparse)
- Works well across all screen sizes and devices
- Matches minimalist, typography-focused aesthetic

### Page Timestamps
**Decision:** Not implementing
**Reasoning:** Content is actively evolving. Timestamps would be maintenance burden and noise. Not needed for this phase.

### Print Media Styles
**Decision:** Deferred to Phase 2.5
**Reasoning:** Landing-page-only footer means grammar pages naturally print cleanly. Print styling will be added alongside footer implementation in Phase 2.5.

### Design Decisions - Phase 2.5 (Navigation & Footer Polish - In Progress)

#### Unified Navigation Typography
**Decision:** All navigation (sidebar, ToC, footer) use `font-medium` weight
**Reasoning:**
- Matches UButton `variant="link"` styling (footer buttons)
- Consistent design language across all navigation contexts
- Medium weight is lighter than semibold (more minimal), heavier than normal (still clear)
- Hierarchy defined by structure (position, spacing, indentation) not weight

#### Navigation Color System
**Decision:** All navigation default to `text-toned`, hover to `text-highlighted`
**Reasoning:**
- Default (`text-toned` = neutral-600): readable but doesn't compete with content
- Hover (`text-highlighted` = neutral-900): maximum contrast, matches body text contrast standards
- Removed container hover effect (redundant with individual link hover)
- Clear two-state system: default + hover

#### Sidebar Weight Hierarchy
**Decision:** Only module kept `font-semibold`; subsections/articles use `font-medium`
**Reasoning:**
- Module = meta-level navigation ("which top-level section?"), deserves visual anchor
- Subsections & articles = content links, structure defines hierarchy via spacing/indentation
- Parallel to ToC: h1 (meta) gets bold, h2-h4 (content) are normal weight
- Reduces visual clutter while maintaining clear three-tier structure

#### ToC h1 Remains Bold
**Decision:** Keep `font-semibold` on h1 (document title)
**Reasoning:**
- h1 functions as "back to top" button (replaces floating UI widget)
- Functional distinction (document meta-nav vs section content-nav) justifies visual distinction
- More minimal than adding separate back-to-top button
- Bold signals "this does something different" than regular section headings

#### Footer Link Implementation
**Decision:** Plain `<a>` tags (not UButton) with `.navlinks` styles
**Reasoning:**
- Simplifies implementation (no UButton theming overrides needed)
- Achieves full consistency: sidebar = ToC = footer (identical CSS)
- UButton is overkill for two text links (better for complex buttons with icons)
- Clearer mental model: footer isn't special, just another navigation context

#### Footer Dot Separator Styling
**Decision:** Middot (·) with `font-medium text-muted select-none`
**Reasoning:**
- Middot character = traditional separator (elegant, minimal)
- Font-medium: matches link text weight (typographic unity)
- Text-muted: subordinate to links, doesn't compete for attention
- Select-none: prevents accidental selection as text (pure separator, not content)
- Small size + muted color = "ghost separator" that integrates with text flow

#### Navigation Text Selectability
**Decision:** Removed `select-none` from `.navlinks` container
**Reasoning:**
- Navigation link labels are content (users should be able to copy them)
- `select-none` appropriate only for pure UI chrome (icons, decorative elements)
- Keep `select-none` only on: dot separators, icon-only buttons
- Links = text that users interact with, not design chrome

#### Drawer Design (ToC Inset vs Nav Full)
**Decision:** Intentional asymmetry: ToC drawer uses `inset`, Nav drawer fills from edge
**Reasoning:**
- Nav = site-level navigation (cross-page) → full drawer is appropriate scope
- ToC = page-level navigation (within document) → inset reinforces "part of this page"
- Visual distinction matches functional distinction
- Users intuitively understand: "full drawer = navigation", "inset drawer = on this page"

#### Footer Link Text Tone
**Decision:** "Write to us" instead of "Contact"
**Reasoning:**
- "Contact" feels corporate/official, creates distance
- "Write to us" is warmer, more grounded, feels genuine
- Reflects project values: ordinary folk, not institutional
- Friendly without being cheesy, unpretentious without being cold
- **Design principle:** UI text should be human-centered and warm where possible, avoiding corporate jargon while maintaining professionalism

---

## Accessibility & Usability

### Content Audience
- Target: Ordinary folk, not linguists
- Clear exception marking (e.g., "Исключение:" for grammatical exceptions)
- Arrow notation `→` for transformations (intuitive but not too techy)
- Proper contrast ratios for muted text

### No Complex Widgets
**Removed:** `<Context>` component with interactive class toggles
- **Why:** Adds cognitive load, breaks printability, interrupts flow
- **Replacement:** Static tables showing all forms at once

**Removed:** Pre-section glossaries
- **Why:** Shows vocabulary before grammar point, breaks flow
- **Replacement:** Examples with inline translations

---

## Development Roadmap

### Phase 1: Planning ✓
- [x] Define vision and audience
- [x] Decide on structure (flat Grammar section)
- [x] Remove complex features (widgets, glossaries)
- [x] Plan cross-linking strategy
- [x] Create roadmap documents

### Phase 2: Navigation Implementation (✅ Complete)
- [x] Implement left sidebar with article list
- [x] Build mobile sticky bar component (with nav drawer & ToC drawer)
- [x] Implement nav drawer (UDrawer for subsections + articles)
- [x] Implement ToC drawer (UDrawer for page headings)
- [x] Add responsive breakpoints (1024px - Tailwind default, works well)
- [x] Style sidebar, header, menus per design specs
- [x] Finalize all UI/navigation decisions (see "Design Decisions - Phase 2")

### Phase 2.5: UI Polish & Updates Section Integration
**Language docs site (codex.urssivar.com):**
- [ ] Update footer to show License · Contact (centered, dot separator)
- [ ] Keep footer on every page (accessible everywhere, minimal footprint)
- [ ] Move social icons (Telegram, YouTube, GitHub) from footer to Updates section only
- [ ] Add print media styles to style.css (hide nav/sidebars on print)

**Main campaign landing (urssivar.com):**
- [ ] Create Updates section (rename from "blog"; includes news, essays, archive, notes, visualizations)
- [ ] Create updates carousel component (simple: title, date, summary, link)
- [ ] Integrate carousel + social icons beside it into landing page layout ("Follow the campaign" CTA)
- [ ] Link to full updates archive from carousel
- [ ] Ensure responsive behavior (mobile/desktop)

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
1. [ ] **Alphabet & Script** - Move from dictionary, embed typing game
2. [ ] **Nouns & Classes** - Foundational (includes oblique stems)
3. [ ] **Spatial Cases & Postpositions** - Merge content
4. [ ] **Predicative Particles** - Merge predicatives + questions
5. [ ] **Verbs - Part 1: Basics** - Core tenses, negation, commands
6. [ ] **Verbs - Part 2: Advanced** - Preverbs, causatives, participles
7. [ ] **Pronouns** - Personal, demonstrative, question words
8. [ ] **Adjectives & Adverbs** - Includes comparisons
9. [ ] **Phonology** - Rewrite as learner-friendly
10. [ ] **Numerals** - Complete content, add telling time

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

## Open Questions & Decisions Needed (Phase 4+)

### Navigation & UI Decisions (✅ Resolved - See "Design Decisions - Phase 2")
All Phase 2 navigation decisions have been finalized and documented.

### Content Scope (Phase 4+)
- **Verbs:** Directional prefixes - main patterns only or exhaustive?
- **Participles:** Minimal forms for practical use or comprehensive?
- **Numerals:** Keep all forms from existing content, or streamline?
- **Phonology:** How deep on sound changes and pronunciation?

### Audio Resources (Phase 4+)
- Reuse typing game audio (`/docs/public/typing/audio/`) for Alphabet page?
- Additional recordings needed after page structure complete?

### Future Sections (Phase 4+)
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

## Notes & Decisions Log

**2025-10-05:**
- Decided to rename "Reference" → "Grammar"
- Removed context-switching widgets and glossaries
- Moved typing game into Grammar/Alphabet page
- Defined cross-linking strategy (manual now, automatic later)
- Clarified Phrasebook vs Grammar distinction

**2025-10-05 (Final Structure):**
- **12 pages total** - flat structure, naturally ordered
- **Key mergers:** Questions → Predicative Particles; Locative cases + Postpositions → Spatial Cases & Postpositions
- **Key integrations:** Negation split between Copulas & Verbs; Time split between Cases & Numerals
- Verbs split into 2 pages: Basics + Advanced
- Each page is self-contained

**2025-10-18 (Planning):**
- Merged three planning documents into comprehensive CLAUDE.md
- Created separate `grammar-content-plan.md` for detailed 12-page outline
- Navigation design finalized with responsive specs and component breakdown

**2025-10-18 (Implementation Complete):**
- Phase 2 navigation implementation complete (MVP)
- ✅ Responsive layout: desktop (3-column), tablet (2-column), mobile (full-width + sticky bar)
- ✅ Components: SidebarNav, NavBar, TableOfContents with scroll tracking
- ✅ Mobile drawers: Nav drawer (☰) with subsections + articles, ToC drawer (≡)
- ✅ Composables: useHeaderClicks (clickable headers), useElementIdObserver (scroll tracking)
- **Deferred/Decided:**
  - Sidebar header dropdown menu - Not implementing (flat list is final design)
  - Print media styles - Moved to Phase 2.5
  - Breakpoint customization - Decided to keep Tailwind default lg:1024px
- **Blocking decisions needed:** See "Open Questions & Decisions Needed" section
- Next: Finalize UI decisions, then proceed to Phase 3 (content audit)

**2025-10-18 (Phase 2 Design Decisions - Resolved):**
- **Responsive Breakpoint:** Keep Tailwind default lg:1024px (simpler than custom 1280px)
- **Sidebar Navigation:** Flat list with spacing & color hierarchy (no dropdown needed for MVP)
- **Tablet Behavior:** Keep current sticky bar for all screens <lg
- **Footer Placement:** Landing page only (cleaner grammar pages, aligns with minimal UI)
- **Footer Content:** Icons only (no labels), keep all 3 social links (Telegram, YouTube, GitHub)
- **Page Timestamps:** Not implementing (maintenance burden, content is evolving)
- **Print Media Styles:** Deferred to Phase 2.5 (landing-page-only footer naturally addresses most)
- ✅ CLAUDE.md updated with all Phase 2 decisions
- ✅ "Open Questions & Decisions Needed" section cleaned of navigation questions
- Created Phase 2.5 (UI Polish) for footer implementation and print media styles
- Ready to proceed to Phase 2.5, then Phase 3 (Content Audit & Reorganization)

**2025-10-18 (Phase 2.5 Scoping - Blog Integration):**
- **Blog Carousel Placement:** Main urssivar.com landing page (separate from language docs site)
- **Blog Content:** Campaign updates, essays, archival data, visualizations (entire Urssivar initiative)
- **Content Source:** Curated posts from Telegram channel, hosted on website
- **Implementation:** Simple carousel (2-3 recent posts) with title, date, summary, link
- **Phase 2.5 Tasks Clarified:**
  - Language docs: Footer (landing only) + print styles
  - Main landing: Blog carousel component + responsive integration
- ✅ Blog & Updates section added to Site Structure
- ✅ Phase 2.5 split into two site areas (language docs vs main landing)
- Ready to proceed with Phase 2.5 implementation
