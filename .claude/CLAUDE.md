# Urssivar Documentation Site - Project Guide

**Last Updated:** 2026-04-07
**Project:** Kaitag language documentation site
**Tech Stack:** VitePress + Nuxt UI
**Current Phase:** Content creation

---

## Vision & Philosophy

Documentation website for Kaitag language as part of Urssivar initiative (5-year campaign to document Kaitag language, history, and villages).

**Target Audience:** Ordinary people who want to understand and use Kaitag practically - not linguists, not complete beginners.

**Core Principles:**

- **Content-first**: Typography, spacing, navigation serve the content
- **Book-like aesthetic**: Minimal, monochrome, generous spacing, clean presentation
- **Printable**: Should look great as PDF, like a well-designed textbook
- **Fast & accessible**: Works on slow connections (Dagestan), all devices
- **Standard tools**: Prefer standard markdown, avoid custom widgets

---

## Design Language

### Typography & Visual Hierarchy

**Simplified (Feb 2026):**

- **Font:** IBM Plex Sans throughout (body, UI, Kaitag text)
- **Weights:** Semibold (headers + Kaitag words), medium (navigation), normal (body)
- **Colors:** Minimal palette - default text, muted (UI), toned (metadata)
- **Kaitag emphasis:** Standard markdown `**bold**`, no special font or attributes
- **Translations:** Quoted text `"like this"` in prose
- **Highlighting:** `==underlined==` for grammatical focus (case endings, stress)

### Content Structure

**Grammar:** Flat hierarchy, natural learning order. 12 pages covering alphabet through numerals.

**Dictionary:** Bilingual intro pages + dynamic letter pages. Detailed word cards with headwords, tags, forms, examples, etymology.

**Notes:** Bilingual articles about language documentation, DNA research, village history. Grid layout with preview cards.

**Genealogy:** DNA haplogroup data with interactive visualizations.

### Layout Philosophy

**Three-column desktop:** Sidebar (navigation) | Content (65ch max-width) | ToC (outline)
**Mobile:** Single column with slideout drawers
**Print:** Linearized, clean, with proper page breaks

---

## Markdown Syntax

### Standard Patterns

**Kaitag words (inline and in lists):**

```markdown
**музи ҡяр** "sweet pear"
- **атта** "father"
```

**Grammatical highlighting:**

```markdown
**атта==ла==** "father's" (case ending highlighted)
```

**Sentences vs phrases:**
- Sentences: capital first letter, period inside bold — `**Урши икӏул це.**`
- The period separates Kaitag from translation naturally; no dash needed

**IPA reference tables:**

```markdown
| /m/ м | /n/ н | (plain text, no emphasis)
```

**Translations:**
- Grammar prose & lists: quoted on same line — `**атта** "father"`
- Long sentences (In Practice): translation on new line, still quoted
- Dictionary word cards: em-dash separator, no quotes
- Dictionary print: no quotes; dash omitted when Kaitag ends with punctuation

**Inline annotations on examples:**

```markdown
- **кижив** "he sat" _(not \***кавижив**)_
- **атта цяун** "father came"  
  _null masculine_
```

- Short labels: `_(label)_` italic after translation on same line
- Longer elaborations: new line with `_italic text_` (double-space line break)
- Ungrammatical forms: `_(not \***form**)_`

**Blockquotes — for detours only:**

```markdown
> Historical note, dialect variant, or exception that breaks the main flow.
```

Not used for annotations that are part of the teaching flow — use italic new line instead.

**Prettier and merged table cells:**

```markdown
<!-- prettier-ignore -->
| singular | **в-** | **р-** | **б-** |
| plural   | **б-**          || **д-** |
```

Add `<!-- prettier-ignore -->` before any multimd table with merged cells (`||`).

**Stress marks:** Not used in grammar articles — maintenance burden and stress shifts with morphology. Dictionary and orthography article are authoritative for pronunciation.

**Ungrammatical asterisk:** Outside bold — `\***вуҡен**` not `**\*вуҡен**`.

### Grammar Article Template

1. H1 + 1–2 sentence intro
2. Opening examples
3. Summary table in breakout block
4. Thematic sections
5. **In Practice** section at end — 1–2 annotated sentences showing multiple concepts

### Special Blocks

**Breakout (full-width content):**

```markdown
:::
Tables, components, etc. - extends to viewport edges
:::
```

---

## Multilingual Approach

**Structure:** EN at `/`, RU at `/ru`

**Anchors:** Use English anchors even on Russian pages for cross-language consistency:

```markdown
## Русский заголовок {#english-anchor}
```

**Why:** Clean URLs, consistent linking, better SEO, stable identifiers

---

## Implementation Notes

**Core Stack:** VitePress (static site), Vue 3, Nuxt UI, Tailwind CSS

**Markdown Processing:** Standard plugins only - markdown-it-anchor, markdown-it-mark, markdown-it-multimd-table. Custom: numbering, breakouts.

**Key Data:** Dictionary JSON (2.2MB), DNA data, village coordinates

**Alphabet (2024 revision):** Cyrillic-based, 27 Russian letters (minus Щ Ф Ы Э Ё Ю) + 4 additions (Ғ Ҡ Ҳ Ӏ). Ejectives use Ӏ (palochka). /ɸ/ sound = пв digraph.

---

## Roadmap

### ✅ Completed (Feb 2026)

**Infrastructure:** Layouts, navigation, search, print styles, bilingual system

**Content:** Dictionary intro (EN/RU), grammar cases + class agreement pages, notes section, genealogy landing

**Visual simplification:** Removed custom markdown delimiters (`++word++` → `**word**`), unified to IBM Plex Sans, simplified weight/color hierarchy

### Current

**Content creation:** Converting remaining grammar pages to new syntax, writing content per priority order

**Grammar priorities:** Alphabet & Script → Nouns & Classes → Spatial Cases → Predicatives → Verbs (2 parts) → Pronouns → Adjectives → Phonology → Numerals

### Future

- Dictionary ↔ Grammar cross-linking
- Phrasebook section
- Audio enhancements
- PDF optimization

---

## Success Criteria

Users can: read grammar top-to-bottom (learning path), look up patterns (reference), practice writing (typing game), find examples (search), print & study.

Site feels: **Practical, clean, complete, accessible, integrated**
