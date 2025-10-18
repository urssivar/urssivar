# Grammar Section Roadmap

**Last Updated:** 2025-10-05
**Status:** Planning phase complete, ready for content development

---

## Vision & Principles

### Target Audience
**Ordinary folk** - not linguists, not complete beginners. People who want to understand and use Kaitag practically.

### Scope
A **quick & intense reference** covering core language logic - something between a self-learning course and a linguistic index. Practical, focused, and action-oriented.

### Style Guidelines
- **Printable markdown** - no complex interactive widgets
- **Clean formatting** - use `++kaitag++` and `--translation--` notation consistently
- **Self-contained examples** - no glossaries before sections (they break flow)
- **Minimal UI complexity** - removed context-switching widgets and glossaries
- **Direct and concise** - explain the pattern, show examples, move on

---

## Site Structure

### Top-Level Navigation
```
┌──────────────────────────────────────────┐
│ Grammar │ Dictionary │ Typing │ Apps ▾    │
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

```
Grammar/
├─ Alphabet & Script              [NEW - move from dictionary intro + typing game]
├─ Phonology                      [REWRITE - basic sound patterns only]
├─ Nouns & Classes                [NEW - includes oblique stems]
├─ Cases                          [EXISTS - needs cleanup, includes time expressions]
├─ Spatial Cases & Postpositions  [MERGE locative-cases.md + postposition content]
├─ Copulas                        [EXISTS - needs cleanup, includes negation & possession]
├─ Predicative Particles          [MERGE predicatives + questions]
├─ Verbs - Part 1: Basics         [NEW - stems, tenses, negation, commands]
├─ Verbs - Part 2: Advanced       [NEW - preverbs, causatives, participles]
├─ Adjectives & Adverbs           [NEW - includes comparisons]
├─ Pronouns                       [NEW - includes question words]
└─ Numerals                       [EXISTS - complete, includes telling time]
```

**Total: 12 pages**

**Key principles:**
- Each page is **self-contained** and covers its topic thoroughly
- No artificial "mechanics vs usage" division
- Topics integrated where natural (negation in Copulas & Verbs, time in Cases & Numerals)
- Questions merged into Predicative Particles (both use particles)
- Spatial system unified (locative cases + postpositions)

---

## Content Reorganization

### Dictionary Section Changes

**Current state:**
- Dictionary intro contains comprehensive alphabet/orthography/phonology content (linguist-focused)
- Was designed as standalone resource

**Changes needed:**
1. **Move alphabet/orthography content** → `/grammar/alphabet`
2. **Move phonology content** → `/grammar/phonology` (simplified for learners)
3. **Simplify dictionary intro** to focus on:
   - How to use the dictionary
   - Entry structure explanation
   - Credits and contributors
   - Database statistics (5,171 lexemes, sources, license)
   - Basic "how to read entries" (stress marks, tags)

### Typing Game Relocation

**Current:** Top-level nav item (awkward placement)

**New location:** Embedded in `/grammar/alphabet` page as final section

**Structure:**
```markdown
# Alphabet & Script

## Letters & Sounds
[Tables with audio for each letter/sound]

## Consonants
[Detailed breakdown with examples]

## Vowels
[Detailed breakdown with examples]

## Stress Patterns
[Basic rules]

## Typing Setup
[Keyboard layouts: Yandex Keyboard, Google Gboard]
[Text converter: Yaziv]

## Practice
<TypingTest />
```

**Rationale:** Natural flow - learn letters → learn to type them → practice

---

## Cross-Linking Strategy

### Reference → Dictionary (Manual, selective)
- Link example words to dictionary entries
- Format: `++[атта](/dictionary/а#атта)==л== беччив++`
- Only for key illustrative words, not every word
- **Timing:** Add during final pass once grammar pages are complete

### Dictionary → Reference (Automatic, future)
- Tag-based auto-linking in `DWord.vue` component
- Map grammatical tags to pages:
  - `N` → `/grammar/nouns`
  - `V` → `/grammar/verbs`
  - `ERG` → `/grammar/cases#2`
- **Timing:** Implement after grammar content is stable

### Phrasebook → Dictionary (Manual, future)
- Individual word links in phrases
- **Timing:** When phrasebook section is created

### Phrasebook ↔ Grammar (Manual, future)
- Light cross-references both directions
- Grammar: "See Phrasebook for common examples"
- Phrasebook: "See Grammar for pattern details"
- **Timing:** When phrasebook section is created

---

## Phrasebook Section (Future)

### Purpose
Ready-to-use phrases organized by situation - **what to say**, not grammar explanation.

### Distinction from Grammar/Usage
- **Grammar/Usage:** Explains *how* (patterns, rules, mechanics)
- **Phrasebook:** Provides *what* (memorizable phrases for situations)

### Example Sections
- Greetings & Introductions
- At the Market
- Daily Routine
- Family & Relationships
- Directions
- Numbers & Counting
- Food & Dining
- etc.

### Relationship to Grammar
Complementary, not overlapping:
- **Grammar/Questions:** Explains particles ++у++/++йа++, placement rules
- **Phrasebook/Greetings:** Lists ++Се сунела?++ as phrase to memorize

---

## Removed Features

### 1. Context-Switching Widgets
**What:** `<Context>` component with interactive class toggles (masc./fem./neut.)

**Why removed:**
- Adds cognitive load (users learn UI before learning Kaitag)
- Breaks printability
- Interrupts reading flow
- Forces interaction when users want to read

**Replacement:** Clear tables showing all forms at once, inline notation when needed

**Example:**
```markdown
| Masculine | Feminine | Neuter |
|-----------|----------|---------|
| ++ви++    | ++ри++   | ++би++  |

- ++тухтур ==ви==++ --doctor (m.) is [there]--
- ++рирси ==ри==++ --girl is [there]--
- ++чяй ==би==++ --tea is [there]--
```

### 2. Pre-Section Glossaries
**What:** `:::details Glossary` blocks before each page

**Why removed:**
- Shows vocabulary before the grammar point
- Breaks "quick reference" flow
- Redundant with inline translations

**Replacement:** Trust that examples with inline `++word++` `--translation--` are self-explanatory

---

## Grammar Topics Outline (Detailed)

**Total: 12 pages** - Clean, integrated, no artificial divisions

---

### 1. Alphabet & Script [NEW]
**Status:** Move from dictionary intro + embed typing game

**Content:**
- Modern Kaitag alphabet (Cyrillic-based, 2024)
- Letters & sounds with audio samples
- Consonants & vowels
- Orthography conventions
- Basic stress rules
- Keyboard setup & resources
- Embedded typing practice game

**Sources:**
- `/docs/dictionary/intro.md` (phonetics & orthography section)
- `/docs/typing.md` (typing game component)
- `/docs/public/typing/audio/` (existing audio files)

---

### 2. Phonology [REWRITE]
**Status:** Learner-friendly basics only

**Content:**
- Stress patterns (contrastive, shift rules)
- Common sound changes (assimilation, vowel harmony in prefixes)
- Pronunciation tips
- NOT: Deep phonemic analysis, IPA charts

**Scope:** Minimum needed for correct pronunciation

---

### 3. Nouns & Classes [NEW]
**Status:** To be created

**Content:**
- Gender/class system (masculine, feminine, neuter)
- Class agreement basics
- Plural formation patterns
- **Oblique stems** (what they are, when they form, patterns)
- Irregular forms
- Examples from each class

**Note:** Oblique stems explained here, then used throughout Cases page

---

### 4. Cases [EXISTS - CLEAN UP]
**Status:** Remove glossaries, add time expressions

**Content:**
- 5 main cases: Absolutive, Ergative, Genitive, Dative, Comitative
- Functions and usage rules
- **Time expressions** using cases (dative "by X o'clock", ergative "in X hours")
- Uses oblique stems (reference Nouns page)
- Examples throughout

---

### 5. Spatial Cases & Postpositions [MERGE & COMPLETE]
**Status:** Merge locative-cases.md + postposition content

**Content:**
- Main locative suffix ++-цци++
- Other locative suffixes (++-ан++, ++-ни++, ++-са++, ++-гу++)
- Dative as locative ("on/at surface")
- Village names as locatives
- Ablative (motion from) with ++тта++
- **Postpositions** with genitive:
  - Spatial: ++че++ 'above', ++мяҡье++ 'nearby', ++гуни++ 'below'
  - Temporal: ++ьереғ++ 'after', etc.
- Spatial adverbs

**Rationale:** Spatial/locative system is cohesive - cases + postpositions work together

**Sources:**
- `/docs/reference/locative-cases.md` (incomplete, cuts off)
- Scattered examples in cases.md

---

### 6. Copulas [EXISTS - CLEAN UP]
**Status:** Remove Context widgets & glossaries

**Content:**
- Three copula series: ++це++ (facts), ++би++ (presence), ++бел++ (availability)
- Person/class agreement patterns
- **Negation** (negative forms: ++акку++, ++дейкку++, ++адел++)
- **Possession** via ++би++ ("to have")

**Changes:**
- Remove `<Context>` component
- Replace interactive tables with static tables
- Keep cheatsheet structure

---

### 7. Predicative Particles [MERGE]
**Status:** Merge predicatives.md + questions.md

**Content:**
- Modal particles (++ҡьал++ "surely", ++ккотте++ "probably")
- **Question particles:**
  - Polar: ++у++ ("is/does?")
  - Content: ++йа++/++ей++ ("who/what/where?")
  - Rhetorical: ++ра++ ("I wonder...")
  - Tag questions: ++акку у++ ("isn't it?")
- Copula interaction & replacement
- Placement & emphasis
- Question word inventory (++ча++, ++ци++, ++коцци++, ++чун++)

**Rationale:** Both deal with particles, natural fit

**Sources:**
- `/docs/reference/predicatives.md`
- `/docs/reference/questions.md`

---

### 8. Verbs - Part 1: Basics [NEW]
**Status:** Major topic - split into 2 pages

**Content:**
- Verb stems (imperfective, perfective, aorist)
- Infinitive forms
- Class agreement in verbs
- **Basic tenses:**
  - Present (habitual, compound)
  - Past (preterite, compound)
  - Future
- **Negation** (prefix ++а-++, vowel assimilation)
- **Commands** (imperative, prohibitive)
- Regular verb patterns

**Scope:** Core system for basic communication

---

### 9. Verbs - Part 2: Advanced [NEW]
**Status:** Continuation - advanced features

**Content:**
- **Directional preverbs** (++ка-++, ++ьа-++, ++ца-++) - main patterns
- **Causatives** (++-их++, ++-ух++, ++-ях++)
- Aspectual nuances
- Compound verbs (basics)
- **Participles** (minimal - for relative clauses)
- Common irregular verbs

**Scope:** Productive patterns, not exhaustive

---

### 10. Adjectives & Adverbs [NEW]
**Status:** To be created

**Content:**
- Basic adjective usage
- Class agreement in adjectives
- Position in phrases
- **Adverbial forms** (stress shift: ++яхи́++ → ++я́хял++)
- Suffixes ++-це++/++-ил++
- Manner, time, place adverbs
- **Comparisons** (comparative/superlative)

**Sources:** Dictionary ADJ/ADV entries

---

### 11. Pronouns [NEW]
**Status:** To be created

**Content:**
- Personal pronouns (++ду++, ++и++, ++ниса++)
- Irregular case forms (++дила++, ++дами++, ++етти++)
- Demonstratives
- **Question words** (++ча++, ++ци++, ++коцци++, ++чун++) - just the forms
- Possessive forms
- Reflexive (basic)

**Sources:** Dictionary, scattered examples

---

### 12. Numerals [EXISTS - COMPLETE]
**Status:** Finish fragmentary content

**Content:**
- **Cardinals** (1-10, tens, hundreds)
- **Ordinals**
- Distributive forms (if keeping)
- **Telling time** (++сяят цалжи++, etc.)
- Days/dates (basic)
- Counting with nouns

**Changes:** Clean up meta-notes, complete all sections

---

## Key Integration Points

**Negation** → Covered in:
- Copulas (negative copula forms)
- Verbs Part 1 (++а-++ prefix)

**Time expressions** → Covered in:
- Cases (dative "by", ergative "in")
- Numerals (telling time, dates)

**Questions** → Merged into:
- Predicative Particles (question particles + question words)

**Commands** → Covered in:
- Verbs Part 1 (imperative/prohibitive)

**Comparisons** → Covered in:
- Adjectives & Adverbs (comparative/superlative)

**Oblique stems** → Introduced in:
- Nouns (explanation)
- Used in: Cases (examples)

**Spatial system** → Unified in:
- Spatial Cases & Postpositions (locative cases + postpositions together)

---

## Content Development Workflow

### Phase 1: Planning ✓
- [x] Define vision and audience
- [x] Decide on structure (flat Grammar section)
- [x] Remove complex features (widgets, glossaries)
- [x] Plan cross-linking strategy
- [x] Create roadmap document

### Phase 2: Content Audit & Reorganization
- [ ] Move alphabet/orthography from dictionary intro to `/grammar/alphabet`
- [ ] Integrate typing game into alphabet page
- [ ] Simplify dictionary intro (focus on "how to use")
- [ ] Clean up existing grammar pages:
  - [ ] Copulas (remove widgets/glossaries)
  - [ ] Cases (remove glossaries, verify links)
  - [ ] Predicatives (remove glossaries)
  - [ ] Questions (remove glossaries)
  - [ ] Locative cases (complete or merge with Cases)

### Phase 3: New Content Creation (Priority Order)
1. [ ] **Alphabet & Script** - Move from dictionary, embed typing game
2. [ ] **Nouns & Classes** - Foundational (includes oblique stems)
3. [ ] **Spatial Cases & Postpositions** - Merge locative-cases.md content
4. [ ] **Predicative Particles** - Merge predicatives + questions
5. [ ] **Verbs - Part 1: Basics** - Core tenses, negation, commands
6. [ ] **Verbs - Part 2: Advanced** - Preverbs, causatives, participles
7. [ ] **Pronouns** - Personal, demonstrative, question words
8. [ ] **Adjectives & Adverbs** - Includes comparisons
9. [ ] **Phonology** - Rewrite as learner-friendly basics
10. [ ] **Numerals** - Complete fragmentary content, add telling time

### Phase 4: Polish & Cross-Linking
- [ ] Add dictionary cross-links in examples
- [ ] Verify internal links between grammar pages
- [ ] Ensure consistent formatting across all pages
- [ ] Proofread for clarity and completeness
- [ ] Test printability

### Phase 5: Future Enhancements
- [ ] Implement automatic Dictionary → Grammar tag-based links
- [ ] Create Phrasebook section
- [ ] Add Phrasebook cross-links
- [ ] Consider audio enhancements beyond alphabet

---

## Technical Notes

### File Locations
- Grammar pages: `/docs/reference/` (will remain here, just rename nav label)
- Dictionary: `/docs/dictionary/`
- Typing game component: `/components/TypingTest.vue`
- Audio files: `/docs/public/typing/audio/`

### Configuration Files
- English config: `/.vitepress/config/en.ts`
- Russian config: `/.vitepress/config/ru.ts`
- Theme: `/.vitepress/theme/`

### Markup Conventions
- Kaitag text: `++word++` (renders with Noto Sans font)
- Translations: `--translation--`
- Emphasis in Kaitag: `++word ==emphasized-part==++`
- No complex custom components (removed Context, keeping existing markdown-it plugins)

### Changes Needed in Config
```typescript
// Change nav label from "Reference" to "Grammar"
{
    text: "Grammar",  // was: "Reference"
    link: "/reference/copulas",  // keep URLs same
    activeMatch: "/reference/",
}

// Remove Typing from top-level nav (embedded in alphabet page instead)
```

---

## Open Questions

**Resolve these during development:**

### Verbs Scope
- Directional prefixes: main patterns only (not exhaustive)
- Participles: minimal forms for practical use (relative clauses)
- Keep both pages focused on productive patterns

### Audio Resources
- Can reuse typing game audio (`/docs/public/typing/audio/`) for Alphabet page
- Assess if additional recordings needed after page structure is complete

### Content Decisions (make as you go)
- Numerals: keep all forms from existing content, clean up presentation
- Locative cases: already decided to merge with postpositions
- Let examples emerge naturally - don't force coverage

---

## Success Criteria

When this roadmap is complete, users should be able to:

1. **Learn the basics** - Read through Grammar section top-to-bottom and understand core Kaitag mechanics
2. **Look up patterns** - Jump to any page to find how to do something specific
3. **Practice writing** - Use alphabet page with typing game to learn the script
4. **Find examples** - See real Kaitag with inline translations throughout
5. **Explore deeper** - Follow links to dictionary entries for full word details
6. **Print & study** - Download/print pages for offline learning

The section should feel:
- **Practical** - Focused on use, not theory
- **Clean** - Easy to scan, minimal clutter
- **Complete** - Covers core language systems
- **Accessible** - For ordinary people, not academics
- **Integrated** - Well-connected with dictionary and future phrasebook

---

## Design Philosophy (Future)

**Goal:** Minimal, book-like aesthetic. Let Kaitag text and examples be the visual focus.

**Inspiration:**
- Notion (clean, spacious, typography-focused)
- Landing page [urssivar.com](https://urssivar.com/) - monospace, white, minimal
- Academic linguistics texts - serious, readable, no distractions

**Principles:**
- **Typography-first** - Good font pairings, generous spacing, readable hierarchy
- **Minimal UI chrome** - Reduce VitePress default visual weight (lighter nav, simpler sidebar)
- **Clean tables** - No heavy borders, subtle dividers, breathable cells
- **Focus on Kaitag text** - `++examples++` should stand out naturally against clean background
- **Printable aesthetic** - Should look good as PDF, like a well-designed textbook
- **Monochrome base** - White/light gray background, black text, minimal color accents

**Scope:**
- Apply to entire site (Grammar + Dictionary + future Phrasebook)
- Revisit after Grammar section is complete (3-5 pages written will reveal design needs)
- Typography and spacing tweaks can happen gradually during content development

**Not urgent** - Content quality and completeness takes priority. Design refinement comes after.

---

## Notes & Decisions Log

**2025-10-05:**
- Decided to rename "Reference" → "Grammar"
- Removed context-switching widgets and glossaries
- Moved typing game into Grammar/Alphabet page
- Defined cross-linking strategy (manual now, automatic later)
- Clarified Phrasebook vs Grammar distinction

**2025-10-05 (Final Structure):**
- **Killed "Usage Patterns" concept** - no artificial mechanics/usage division
- **12 pages total** - flat structure, naturally ordered
- **Key mergers:**
  - Questions → Predicative Particles (both use particles)
  - Locative cases + Postpositions → Spatial Cases & Postpositions (unified spatial system)
- **Key integrations:**
  - Negation: split between Copulas (forms) & Verbs Part 1 (prefix)
  - Time: split between Cases (dative/ergative usage) & Numerals (telling time)
  - Commands: in Verbs Part 1
  - Comparisons: in Adjectives & Adverbs
  - Oblique stems: introduced in Nouns, used in Cases
- **Verbs split into 2 pages:** Basics (core tenses, negation, commands) + Advanced (preverbs, causatives, participles)
- Each page is self-contained and thoroughly covers its topic
- Design philosophy captured for future implementation (minimal, book-like aesthetic)
