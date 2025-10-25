# Urssivar Documentation Site - Project Guide

**Last Updated:** 2025-10-25
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
- **Layout:** Desktop: left sidebar (articles) + content + right ToC. Mobile: sticky bar with nav/ToC drawers
- **Typography:** `font-medium` weight, `text-muted` (neutral-500) → `text-highlighted` (neutral-900) on hover
- **Footer:** License · Write to us (plain `<a>` tags, middot separator)

### Cross-Linking (Future)
- **Grammar → Dictionary:** Manual, selective links to key example words
- **Dictionary → Grammar:** Automatic tag-based links (`N` → /grammar/nouns)
- **Timing:** After grammar pages complete

### Tech Stack
- VitePress v1, custom theme, Vercel deployment
- Colors: `primary: 'blue'`, `neutral: 'gray'` in app.config.ts
- Components: Layout.vue, SidebarNav.vue, NavBar.vue, TableOfContents.vue
- Composables: useHeaderClicks, useElementIdObserver

---

## Roadmap

### ✅ Completed
- Planning & structure definition
- Navigation implementation (responsive layout, sidebars, drawers)
- Notes section (bilingual, grid layout, social links)

### Current: UI clean up & Content audit

- [ ] Decouple auto-numbers from anchors
- [ ] Use English anchors for /ru pages

- [ ] Genealogy landing
  - [ ] Intro
	- [ ] Table & YFull links
	- [ ] HH pie chart
- [ ] Language landing
	- [ ] Intro
	- [ ] Grammar
	- [ ] Dictionary
	- [ ] Phrasebook & texts ?
- [ ] Dictionary
	- [ ] Intro
	- [ ] Dynamic pages
	- [ ] Custom table sidebar

- [ ] Refactor the layouts
- [ ] Add print media styles
  - [ ] hide nav/sidebars
  - [ ] footer & header buttons
  - [ ] Links, notes on landing
  - [ ] ???
     
- [ ] Implement full-text search

### Next: Content Creation (Priority Order)

- [ ] Integrate typing game into alphabet page
- [ ] Clean up existing grammar pages (remove widgets/glossaries)
- [ ] Move alphabet/orthography from dictionary intro → `/grammar/alphabet`

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
