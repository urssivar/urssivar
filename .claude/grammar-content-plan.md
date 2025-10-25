# Grammar Content Development Plan

**Last Updated:** 2025-10-25
**Status:** Ready for content development

Detailed content plans for Grammar section's 12 pages. See `CLAUDE.md` for roadmap and principles.

---

## Grammar Section Structure (12 Pages)

1. **Alphabet & Script** [NEW] - Move from dictionary intro + typing game
2. **Phonology** [REWRITE] - Learner-friendly basics only
3. **Nouns & Classes** [NEW] - Includes oblique stems
4. **Cases** [EXISTS] - Cleanup, includes time expressions
5. **Spatial Cases & Postpositions** [MERGE] - Locative cases + postpositions
6. **Copulas** [EXISTS] - Cleanup, includes negation & possession
7. **Predicative Particles** [MERGE] - Predicatives + questions
8. **Verbs - Part 1: Basics** [NEW] - Stems, tenses, negation, commands
9. **Verbs - Part 2: Advanced** [NEW] - Preverbs, causatives, participles
10. **Adjectives & Adverbs** [NEW] - Includes comparisons
11. **Pronouns** [NEW] - Includes question words
12. **Numerals** [EXISTS] - Complete, includes telling time

**Principles:** Self-contained pages, no "mechanics vs usage" split, natural topic integration, unified spatial system

---

## Detailed Topic Outlines

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

**Page Structure:**
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
- Main locative suffix `++-цци++`
- Other locative suffixes (`++-ан++`, `++-ни++`, `++-са++`, `++-гу++`)
- Dative as locative ("on/at surface")
- Village names as locatives
- Ablative (motion from) with `++тта++`
- **Postpositions** with genitive:
  - Spatial: `++че++` 'above', `++мяҡье++` 'nearby', `++гуни++` 'below'
  - Temporal: `++ьереғ++` 'after', etc.
- Spatial adverbs

**Rationale:** Spatial/locative system is cohesive - cases + postpositions work together

**Sources:**
- `/docs/reference/locative-cases.md` (incomplete, cuts off)
- Scattered examples in cases.md

---

### 6. Copulas [EXISTS - CLEAN UP]
**Status:** Remove Context widgets & glossaries

**Content:**
- Three copula series: `++це++` (facts), `++би++` (presence), `++бел++` (availability)
- Person/class agreement patterns
- **Negation** (negative forms: `++акку++`, `++дейкку++`, `++адел++`)
- **Possession** via `++би++` ("to have")

**Changes:**
- Remove `<Context>` component
- Replace interactive tables with static tables
- Keep cheatsheet structure

---

### 7. Predicative Particles [MERGE]
**Status:** Merge predicatives.md + questions.md

**Content:**
- Modal particles (`++ҡьал++` "surely", `++ккотте++` "probably")
- **Question particles:**
  - Polar: `++у++` ("is/does?")
  - Content: `++йа++`/`++ей++` ("who/what/where?")
  - Rhetorical: `++ра++` ("I wonder...")
  - Tag questions: `++акку у++` ("isn't it?")
- Copula interaction & replacement
- Placement & emphasis
- Question word inventory (`++ча++`, `++ци++`, `++коцци++`, `++чун++`)

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
- **Negation** (prefix `++а-++`, vowel assimilation)
- **Commands** (imperative, prohibitive)
- Regular verb patterns

**Scope:** Core system for basic communication

---

### 9. Verbs - Part 2: Advanced [NEW]
**Status:** Continuation - advanced features

**Content:**
- **Directional preverbs** (`++ка-++`, `++ьа-++`, `++ца-++`) - main patterns
- **Causatives** (`++-их++`, `++-ух++`, `++-ях++`)
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
- **Adverbial forms** (stress shift: `++яхи́++` → `++я́хял++`)
- Suffixes `++-це++`/`++-ил++`
- Manner, time, place adverbs
- **Comparisons** (comparative/superlative)

**Sources:** Dictionary ADJ/ADV entries

---

### 11. Pronouns [NEW]
**Status:** To be created

**Content:**
- Personal pronouns (`++ду++`, `++и++`, `++ниса++`)
- Irregular case forms (`++дила++`, `++дами++`, `++етти++`)
- Demonstratives
- **Question words** (`++ча++`, `++ци++`, `++коцци++`, `++чун++`) - just the forms
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
- **Telling time** (`++сяят цалжи++`, etc.)
- Days/dates (basic)
- Counting with nouns

**Changes:** Clean up meta-notes, complete all sections

---

## Open Questions

### Verbs Scope
- Directional prefixes: main patterns only (not exhaustive)?
- Participles: minimal forms for practical use (relative clauses)?

### Audio Resources
- Reuse typing game audio (`/docs/public/typing/audio/`) for Alphabet page?
- Additional recordings needed?

### Future Sections
- **Phrasebook:** Ready-to-use phrases by situation (complementary to Grammar)
- When to start? Basic structure?
