# Urssivar Documentation Site - Project Guide

**Last Updated:** 2025-12-13
**Project:** Kaitag language documentation site
**Tech Stack:** VitePress v1 + Nuxt UI
**Current Phase:** UI clean up & Content audit

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

**Layouts:** 4 types (BaseLayout, LayoutDocs, LayoutLanding, LayoutArticle) selected via `useLayout()` composable

**Components:** Header, Footer, SidebarNav, TableOfContents, NavBar, DNAChart (D3.js), VillageMap (Leaflet), DictionaryIndex, DictionaryWord, AlphabetGrid

**Markdown Plugins:**
- markdown-it-anchor, -mark, -multimd-table
- Custom: inline delimiters (++/--), block delimiters (:::), auto-numbering

**Data:** dictionary.json (2.2MB), dna.json, villages.json

**Styling:** 5 CSS files (234 lines): base, components, text-formatting, navigation, index

**Composables:** useLayout, useDocsNav, useDictData, useDNAData, t (i18n), buildPath, useElementIdObserver

---

## Implementation Details

### Layout System

4 layouts controlled by frontmatter or nav config:
- **BaseLayout**: Foundation wrapper
- **LayoutDocs**: Three-column (Sidebar | Content 65ch | ToC), mobile drawers, print linearized
- **LayoutLanding**: Simple content wrapper
- **LayoutArticle**: Minimal article wrapper

### Styling

5 CSS files (234 lines): index, base, components, text-formatting, navigation

**Typography:** Inter (body), EB Garamond (Kaitag text), Noto Sans Math

**Colors:** Primary blue, neutral gray, semantic tokens (text-muted → text-highlighted)

### Print Styles

**Implemented:** Headings/tables break-inside-avoid, nav/footer hidden, layout linearized, orphans/widows control

**TODO:** Page headers/footers, link URLs, advanced page breaks, PDF optimization

### Navigation

Three nav trees in `.vitepress/navs/index.ts`: languageNav, notesNav, genealogyNav

Structure: Module → Section → Articles (en/ru localized)

`useDocsNav()` provides: module, section, article, allArticles, otherSections

### i18n

EN: `/` | RU: `/ru`

`t(key)` for translations, `buildPath()` adds /ru prefix, English anchors for cross-language links

---

## Roadmap

### ✅ Completed

- Planning & structure definition
- Navigation implementation (responsive layout, sidebars, drawers)
- Notes section (bilingual, grid layout, social links)
- Layout system refactoring (4 layouts: Base, Docs, Landing, Article)
- Navbar & navigation components (Header, Footer, SidebarNav, ToC)
- Print styles (headings, tables, nav/footer hidden, layout linearized)
- Decouple auto-numbers from anchors
- English anchors for /ru pages
- Genealogy landing (intro, table, HH pie chart with d3.js)
- Language landing (intro, grammar/dictionary/phrasebook previews)
- Dictionary (intro, dynamic letter pages, custom sidebar nav)

### Current: Content Creation

- [ ] Implement full-text search
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
