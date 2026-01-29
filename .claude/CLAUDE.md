# Urssivar Documentation Site - Project Guide

**Last Updated:** 2026-01-29
**Project:** Kaitag language documentation site
**Tech Stack:** VitePress v1 + Nuxt UI
**Current Phase:** Content creation

---

## Vision & Principles

Documentation website for Kaitag language as part of Urssivar initiative (5-year campaign to document Kaitag language, history, and villages).

**Target Audience:** Ordinary folk - not linguists, not complete beginners. People who want to understand and use Kaitag practically.

**Core Philosophy:**

- **Content-first**: Typography, spacing, navigation serve the content
- **Printable**: Should look great as PDF, like a well-designed textbook
- **Fast & Accessible**: Fast loads (Dagestan connectivity), responsive for all devices
- **Minimal UI**: Book-like aesthetic - monochrome base, generous spacing, clean tables

---

## Site Structure

### Navigation

```
Grammar | Dictionary | Typing | Notes | Apps ▾ (Avdan, Bazur, Yaziv)
```

**Future:** Phrasebook section

### Grammar (12 pages)

Flat sidebar, natural ordering. See `grammar-content-plan.md` for detailed outlines.

Alphabet & Script • Phonology • Nouns & Classes • Cases • Spatial Cases & Postpositions • Copulas • Predicative Particles • Verbs Part 1 • Verbs Part 2 • Adjectives & Adverbs • Pronouns • Numerals

### Notes Section

Campaign updates: language documentation, DNA research, village visits, archival materials, visualizations. Bilingual (EN/RU) with language toggle. Grid layout with note cards linking to full articles.

---

## Design Principles

### Content & Typography

- **Kaitag text:** `++word++` → EB Garamond 20px medium, lang="xdq"
- **Translations:** `--text--` → Inter 14px, muted
- **Emphasis:** `==highlight==` → grayish underline
- **Body:** Inter 16px
- **No complex widgets** - removed Context components, keeping markdown-it plugins

### Navigation & UI

- Desktop: Three-column (sidebar | content 65ch | ToC), mobile: single column with drawers
- Header: Logo, search (Cmd+K), locale switch
- SidebarNav: Hierarchical (module → section → articles), active highlighting
- TableOfContents: IntersectionObserver, auto-numbering support
- Footer: License · Contact (hidden in print)
- Typography: font-medium, text-muted → text-highlighted on hover, 200ms transitions

### Anchors & IDs

**English Anchors for Multilingual Consistency:**

Russian pages use manually-specified English anchors to ensure consistency across languages:

```markdown
## Русский заголовок {#english-anchor}
```

**Why English anchors:**

- Consistent cross-language linking (same anchor works for EN/RU)
- Clean URLs (no Cyrillic percent-encoding)
- Better SEO and accessibility
- Stable identifiers (independent of heading text changes)

**Where applied:**

- Landing pages (index, genealogy, language) - ✅ Done
- Grammar pages - as content is written
- Important sections needing cross-references

**Exception:** Dictionary entries use database IDs (`{#word-1234}`) for uniqueness and programmatic linking.

**Auto-numbering:** Pages with `numbered: true` frontmatter display visual numbers (1, 1.1, 2) via CSS counters, but anchors remain semantic (`#facts`, not `#1`).

### Cross-Linking (Future)

- **Grammar → Dictionary:** Manual, selective links to key example words
- **Dictionary → Grammar:** Automatic tag-based links (`N` → /grammar/nouns)
- **Timing:** After grammar pages complete

### Tech Stack

**Core:** VitePress, Nuxt UI, Tailwind CSS, Vue 3

**Layouts:** 3 layouts - LayoutBase (foundation wrapper with header/footer slots), LayoutDocs (three-column with responsive mobile drawers), Layout404 (error page)

**Theme Components:** Home (logo/title), Toolbar, Prose (content wrapper), Footer, LocaleSwitch, SearchButton, SidebarNav, TableOfContents

**Content Components:** DNAChart/DNATable (D3.js), VillageMap (Leaflet), DictionaryIndex/DictionaryWord/DictionaryWordCard, AlphabetGrid, NoteCard, Stamp

**Markdown Plugins:** markdown-it-anchor, -mark, -multimd-table. Custom: inline delimiters (++/--), block delimiters (:::), auto-numbering

**Data:** dictionary.json (2.2MB), dna.json, villages.json

**Styling:** 5 CSS files (280 lines): index, base, components, text-formatting, navigation

**Composables:** nav (useNav), i18n (t, baseUrl), dictionary, dna, elementIdObserver, autoCycle

---

## Implementation Details

### Layout System

**LayoutBase:** Foundation with header/footer slots, uses Toolbar component with Home/SearchButton/LocaleSwitch

**LayoutDocs:** Three-column responsive (sidebar | content 65ch | ToC). Mobile: sticky top toolbar with slideout drawers. Desktop: grid layout with sticky sidebars (max-h-screen, overflow-y-auto, masked edges). Print: linearized with logo header, hidden nav/footer

**Layout404:** Simple error page

Root Layout.vue wraps everything in UApp, routes to Layout404 or LayoutDocs based on page.isNotFound

### Styling

5 CSS files (280 lines): index, base, components, text-formatting, navigation

**Typography:** Inter (body), EB Garamond (Kaitag text), Noto Sans Math

**Colors:** Nuxt UI tokens - primary (blue), neutral (gray), semantic (text-muted/highlighted/accented, bg-muted/default)

### Print Styles

**Implemented:** Headings/tables break-inside-avoid, nav/footer hidden, layout linearized, orphans/widows control

**TODO:** Page headers/footers, link URLs, advanced page breaks, PDF optimization

### Navigation

Three nav trees in `.vitepress/navs/index.ts`: languageNav, notesNav, genealogyNav

Structure: Module → Section → Articles (en/ru localized)

`useNav()` provides: module, section, article, allArticles, otherSections

### i18n

EN: `/` | RU: `/ru`

`t(key)` for translations, `buildPath()` adds /ru prefix, English anchors for cross-language links

---

## Roadmap

### ✅ Completed

- Planning & structure definition
- Layout system (LayoutBase/LayoutDocs/Layout404, responsive three-column, mobile drawers)
- Theme components (Toolbar, Home, Prose, Footer, LocaleSwitch, SearchButton, SidebarNav, TableOfContents)
- Print styles (linearized layout, hidden nav/footer, break-inside-avoid, orphans/widows)
- Navigation (three nav trees, useNav composable, hierarchical structure)
- Notes section (bilingual, grid layout, NoteCard components)
- Genealogy landing (intro, DNATable, DNAChart with D3.js)
- Language landing (intro, grammar/dictionary/phrasebook previews)
- Dictionary (intro, DictionaryIndex/Word/WordCard, dynamic letter pages, custom sidebar)
- Search (Pagefind integration, SearchButton modal)
- English anchors for /ru pages (decouple visual auto-numbering from semantic anchors)

### Current: Content Creation

- [ ] Clean up existing grammar pages (remove old widgets/glossaries)
- [ ] Move alphabet content from dictionary intro → /grammar/alphabet

### Next: Grammar Pages (Priority Order)

1. Alphabet & Script (move + embed typing game)
2. Nouns & Classes (foundational, oblique stems)
3. Spatial Cases & Postpositions (merge content)
4. Predicative Particles (merge predicatives + questions)
5. Verbs Part 1 (basics: tenses, negation, commands)
6. Verbs Part 2 (advanced: preverbs, causatives, participles)
7. Pronouns
8. Adjectives & Adverbs
9. Phonology (rewrite for learners)
10. Numerals (complete, add time expressions)

### Future

- Dictionary cross-links in examples
- Automatic Dictionary → Grammar tag-based links
- Phrasebook section
- Design refinements
- Audio enhancements

---

## Success Criteria

Users should be able to: learn basics (read Grammar top-to-bottom), look up patterns, practice writing (alphabet + typing game), find examples, print & study.

Site should feel: **Practical, Clean, Complete, Accessible, Integrated**
