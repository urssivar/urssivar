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

**Phonetic notation (Noto Sans via code ticks):**

```markdown
`/tʃʼʷel/` ← IPA (phonemic/phonetic)
[миҡ] ← Kaitag-letter transcription (no ticks — Cyrillic renders fine in IBM Plex Sans)
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

### Print Pipeline

**Route:** `/language/_print` — dev-only compose page (excluded from production builds by `srcExclude: ["**/_*.md"]` in `config.ts`). Navigate there in dev and print with Ctrl+P → Save as PDF.

**Print dialog settings (Chromium):** Margins → None; Headers and footers → off; Background graphics → on. The `@page` rules in `print.css` supply margins and page numbers.

**Architecture:** Compose-at-runtime. `_print.md` imports other `.md` files as Vue components and wraps each in `<PrintSection>`. On mount, `LayoutPrint.vue` calls `transformPrintDom()` which:

1. Assigns section IDs: `data-path` → slug (e.g. `grammar/classes` → `grammar-classes`; empty path → root section name)
2. Shifts heading levels per `data-shift` (grammar articles use `shift=1` to subordinate h1 → h2)
3. Scopes child IDs: `{section-slug}--{original-id}` (prevents collisions across merged content)
4. Rewrites cross-section links to fragment form: `./classes#agreement` → `#grammar-classes--agreement`
5. Rewrites same-origin links to canonical origin (`https://urssivar.com`) so PDF links point to the live site

**Key invariant:** Any content wrapped in `<PrintSection>` gets its IDs scoped and its outgoing links rewritten automatically. Components need no print-mode prop.

**Adding a grammar page to the PDF:** Create the `.md` file, then add it to `grammar.children` in `nav.ts` in learning order. `import.meta.glob` picks it up; the compose page iterates the nav tree. (Grammar sections are currently commented out in `_print.md` — uncomment when ready.)

**CSS distribution:**

- `print.css` — `@page` margins (1in top/bottom, 0 sides), page counters bottom-left/right
- `base.css` — `break-inside-avoid` on headings/blockquotes/pre; `orphans/widows: 3`
- `LayoutPrint.vue` — print padding (`print:px-18`), breakout full-width fix

**Key files:**

- `src/language/_print.md` — compose page
- `.vitepress/theme/layouts/LayoutPrint.vue` — layout + transform mount
- `.vitepress/theme/print/transform.ts` — DOM transform
- `.vitepress/components/PrintSection.vue` — structural wrapper
- `.vitepress/theme/styles/print.css` — `@page` rules

---

## Roadmap

### ✅ Completed (Feb 2026)

**Infrastructure:** Layouts, navigation, search, print styles, bilingual system

**Content:** Dictionary intro (EN/RU), grammar cases + class agreement pages, notes section, genealogy landing

**Visual simplification:** Removed custom markdown delimiters (`++word++` → `**word**`), unified to IBM Plex Sans, simplified weight/color hierarchy

**Print pipeline:** Compose page at `/language/_print` combining dictionary (active) and grammar (ready, commented out). Runtime DOM transform for ID scoping and link rewriting. Native browser print with `@page` CSS.

### Current

**Content creation:** Converting remaining grammar pages to new syntax, writing content per priority order

**Grammar priorities:** Alphabet & Script → Nouns & Classes → Spatial Cases → Predicatives → Verbs (2 parts) → Pronouns → Adjectives → Phonology → Numerals

### Future

- Dictionary ↔ Grammar cross-linking
- Phrasebook section
- Audio enhancements

---

## Success Criteria

Users can: read grammar top-to-bottom (learning path), look up patterns (reference), practice writing (typing game), find examples (search), print & study.

Site feels: **Practical, clean, complete, accessible, integrated**
