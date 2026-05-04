# Urssivar Documentation Site - Project Guide

**Last Updated:** 2026-05-03
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

## Prose & Voice

### Voice target

**Conviction without sentimentality.** A minority-language documentation effort that knows what it's doing and why — not academic, not startup, not charity. Some defiance, some hope, both earned by the work rather than declared.

- **Plain over poetic.** The facts (one generation left, language demoted in 1938, 56 villages) are heavy enough that adjectives compete with them. Cut "tragic", "vital", "rich heritage", "race against time", "reclaim the legacy".
- **Defiance lives in rhythm, not vocabulary.** A short closing line after a paragraph of detail does more than the word _fight_. Earn the punch through what came before.
- **Hope shown through doing, not declared.** Describing the work — recording speech, sequencing Y-DNA, mapping villages — is hopeful in itself. Skip filler closers like _There's much to be done_.
- **No marketing scaffolding.** Avoid defaults of cause-driven landing pages: _reclaiming the legacy_, _journey_, _vibrant_, _race against time_.
- **Plain register, not flat.** Each sentence does one thing. If it's doing two, split.
- **Russian voice = English voice, not Russian-officialese.** Active verbs over nominalizations: _записываем_ not _осуществляется фиксация_.

### Anchor "of Dagestan"

Keep _of Dagestan_ (or RU _кайтагов Дагестана_) in framing lines: frontmatter descriptions, subheads, section openers. Kaitag are part of the Dagestani mosaic — the site focuses on them only because no one else will, not because they are separate from neighboring peoples. **Avoid Kaitag-vs-others framing.**

### No "we" / "our" in site prose

Site voice describes the work, not the agents.

- **Avoid:** _our heritage_, _our ancestors_, _we document_, _we record_, _our work_.
- **Why:** _our_ assumes a reader you don't have (a Tabasaran neighbor, a researcher in Minsk aren't part of "our"); _we_ adds nothing the work doesn't already imply.

**Exception:** personal essays (e.g. `notes/lost-heritage.md`) where _I/we/my people_ is the author's lived voice, not institutional plural. Don't sanitize those.

### Section pattern (proven on mission landing)

````markdown
## [Section Title](./link/)

Single-sentence stake or framing.

**Label A:** Bare-noun phrase or list. Second sentence with framing or stake.

**Label B:** Bare-noun phrase or list. Second sentence with framing or stake.
````

Each bullet: bold label → noun fragment with no verb → second sentence adding the why/scale. The bare-noun form makes the list read like an inventory of the work itself, not a description of it. Visual scan stays clean because every bullet has the same shape.

### Inventory bullets (no bold label)

For bare lists of formats, files, or links — em-dash + bare-noun purpose, not "for [purpose]":

```markdown
- [Urssivar.com](...) — easy access on any device
- [PDF document](...) — local storage and printing
```

Drop redundant labels outside the link (_The website [X]_ → _[X]_) and articles. Keeps the inventory legible as a scan. Different shape from the bold-label section pattern above; reach for this one when the bullets are a flat list of artifacts rather than scoped framing under a section.

### Triad and titles

- **Site-level triad:** _language, culture, and history of Dagestan_ (EN) / _языка, культуры и истории кайтагов Дагестана_ (RU). Mirror in frontmatter descriptions and subheads.
- **Headline-style titles drop articles.** _Lost Heritage_ not _The Lost Heritage_; _Field Notes_ not _The Field Notes_. Headline impact + cross-language symmetry with article-less Russian.

### Ethnonyms — collective singular

_The Kaitag, the Avar, the Tabasaran_ — not _-s_ plurals. Verb agreement stays plural: _the Kaitag are an indigenous group of Dagestan._ Apply consistently to neighbors named in the same context — _Kubachin and Dargin peoples_, _Lezgic peoples of Tabasaran and Agul_, _Turkic peoples of Kumyk and Terekeme_. Family labels (Lezgic, Turkic) take _peoples of X and Y_ rather than parens, since the bracketed gloss form reads as definition rather than naming.

### Punctuation

- **Quotes:** straight `"…"` for site prose in both EN and RU. Reserve `«…»` only for direct scholarly citations preserving an original Russian source's typography (e.g. blockquoted historical sources on the Flag page).
- **Em-dashes:** for clarification, breath beats, or stake clauses. Avoid two em-dashes in adjacent sentences — restructure with possessives or articles.

### Russian-specific

- **Corrective negation: `не X, а Y` (not `но Y`).** _Не белый, а чёрный_; _не просто звук, а образ мышления людей_. _но_ also works grammatically but reads as a calque from English/French.
- **Don't shadow EN syntax.** Russian needs its own cadence. Don't mirror sentence-by-sentence; let each language find its own form. Idioms often beat literal calques.
- **Watch for root tautologies that EN's lexical variety masks.** EN has _genealogy / family tree / kinship / oral genealogies_ — distinct words. RU equivalents share roots: _генеалогия / родословные / родство_. Vary lexical fields actively (e.g. _семейная память_ in opener + _родословные_ as bullet label + _семейное древо_ in body).

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
