---
numbered: true
title: "Kaitag Dictionary"
description: "Bilingual Kaitag–English dictionary with forms, examples, and notes."
---

<script setup lang="ts">
import DictIndex from '@/components/DictionaryIndex.vue';
import type { DictionaryIndexMode } from '@/components/DictionaryIndex.vue';
import { useDictData } from '@/composables/dictionary';

const { total } = useDictData();

defineProps<{
  indexMode?: DictionaryIndexMode;
}>();
</script>

# Kaitag Dictionary

::: {.text-xs .italic}
Compiled by Magomed Magomedov, in collaboration with Uzlipat Gasanova and Murad Gasanov (see [Version History](#version-history))

{{ total }} entries · database 25.03.2026 · document 25.04.2026 · license [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/)
:::

This dictionary documents Kaitag through direct work with native speakers, building the foundation for the language's digitization and standardization. Yet, what is captured here is but a fraction of what needs to be preserved across the Kaitag villages and regions, and the work continues. Securing the language's future will take both community effort and academic support.

The dictionary is available in four formats:

- The website [Urssivar.com](https://urssivar.com/language/dictionary) for easy access on any device
- The [PDF document](/assets/pdfs/xdq-dictionary-en.pdf) for local storage and printing
- The [Google Sheets](https://docs.google.com/spreadsheets/d/1TAvQAMAw0jDdStvq2Z1E-m1mz3UWkCMGQBgLCnPQgJs) table for data analysis and linguistic research
- The [GitHub repository](https://github.com/urssivar/dictionary) for full source data and the JSON export for computational use

> **Note:** The dictionary is being updated toward v1.1. For a stable version, use the PDF or Google Sheets above.

<DictIndex :mode="indexMode" />

## Entry Structure

Each entry includes a headword, grammatical tags, and definitions. Grammatical forms are included where relevant. Definitions may carry usage notes and examples. Some entries also include a note and etymology. Where applicable, dialect variants (~) and derived-from («) / see-also (+) links are shown.

The first tag always indicates _part of speech_, with forms listed accordingly:

- Nouns (_n_): absolutive headword (**тӏу́пп** "finger"), oblique (**тӏуппу́-**), plural (**тӏиппе́** "fingers"). May be inherently plural (_pl_) or include an irregular locative (**ья́жни** "on Hajj").
- Verbs (_v_): imperfective infinitive (**кабирга́ра** "to be sitting"), optionally perfective (**кабига́ра** "to sit") and preterite (**ка́бижив** "sat").
- Adjectives (_adj_): may include adverbial form with stress shift (**бухха́р** "cold" → **бу́ххал** "coldly").
- Cardinal numerals (_num_): headword (**чӏвел** "two"), oblique (**чӏул-**), and stem (**чӏу-**).

Other parts of speech include adverbs (_adv_), conjunctions (_conj_), prepositions (_prep_), postpositions (_postp_), interjections (_interj_), pronouns (_pron_), copulas (_cop_), particles (_part_), and determiners (_det_). Some of these categories are assigned loosely and may not reflect precise grammatical classification.

Words may also carry a grammatical class (_cls_), labeled with the neuter **-б-** (**биҡна́** "old").

## Phonetics & Orthography

The modern Kaitag alphabet, based on the Cyrillic script, was developed in 2024 and refined in 2026. It consists of 27 Russian letters (excluding Щщ, Фф, Ыы, Ээ, Ёё, Юю), 3 extended Cyrillic letters (Ғғ, Ҡҡ, Ҳҳ), and 12 digraphs (doubled geminates and ejectives with Ӏӏ).

Useful resources:

- Video presentation ["Evolving the Kaitag script"](https://youtu.be/Ad2o1hwYagA) on YouTube (in Russian)
- Character set in the [Paratype language reference](https://paratype.github.io/cyrillic-languages/index.html?lang=Kaitag&group=cyrillic&ui=en&pg=2)
- Mobile keyboards [Yandex Keyboard](https://redirect.appmetrica.yandex.com/serve/172416875559437678) and [Google Gboard](https://play.google.com/store/apps/details?id=com.google.android.inputmethod.latin)
- Automatic text converter [Yaziv](https://yaziv.raxys.app/xdq?from=cyr_soviet&to=cyr&text=цакъкъа+къабагъ)
- Technical specification on [GitHub](https://github.com/urssivar/script)

### Consonants

:::

|            |
| :--------: | :-----: | :------: | :------: | :---: | :-----: | :-----: | :---: |
|   /m/ м    |  /n/ н  |
|   /b/ б    |  /d/ д  |          |          |       |  /g/ г  |
|   /p/ п    |  /t/ т  |          |          |       |  /k/ к  |  /q/ ҡ  | /ʔ/ ъ |
|  /pː/ пп   | /tː/ тт |          |          |       | /kː/ кк | /qː/ ҡҡ |
|  /pʼ/ пӏ   | /tʼ/ тӏ |          |          |       | /kʼ/ кӏ | /qʼ/ ҡӏ |
|            |         |  /ts/ ц  |  /tʃ/ ч  |
|            |         | /tsː/ цц | /tʃː/ чч |
|            |         | /tsʼ/ цӏ | /tʃʼ/ чӏ |
| /β/, /ʷ/ в |         |  /z/ з   |  /ʒ/ ж   |       |         |  /ʁ/ ғ  |
|            |         |  /s/ с   |  /ʃ/ ш   |       |  /x/ ҳ  |  /χ/ х  | /h/ ь |
|            |         |  /ɾ/ р   |
|            |  /l/ л  |          |          | /j/ й |

:::

> Plain stops and affricates are aspirated: /pʰ/ **п**, /tʰ/ **т**, /tsʰ/ **ц**, /tʃʰ/ **ч**, /kʰ/ **к**, /qʰ/ **ҡ**.

The digraphs **пв** /ɸ/, **ву** /w/, and **гҳ** /ɣ/ appear in onomatopoeia only. The phonemes /ħ/ **хӏ**, /ʡ/ **гӏ**, and /uˤ/ **ю** appear in dialectal forms.

Following a non-sonorant consonant, the letter **в** usually marks labialization rather than a separate sound: **чӏвел** /tʃʼʷel/ "two", **швел** /ʃʷel/ "five".

Some varieties lose gemination syllable-finally, but it is restored before vowels and consistently preserved in spelling:

- **миҡҡ [миҡ]** "wedding" → **ми́ҡҡи** "at wedding"
- **лукка́на** "to give" → **лу́ккне [лукне]** "giving (masd.)"

Geminate fricatives vary considerably between villages and require further study. They are not listed in the alphabet as distinct letters, but shown mainly intervocalically (**ни́шша** "you (pl.)") and word-initially (**сса** "yesterday").

### Vowels

:::

|              |
| :----------: | :-------: | :-----------: |
|  /i/ [ɪ] и   |           |     /u/ у     |
|  /e/ [ɛ] е   | /a/ [ɐ] а | /ʷa/ [ɔ~ʷɐ] о |
| /æ/ [æ~ɐˤ] я |           |

:::

The labialized segment **ва** /ʷa/ is spelled **о** for convenience:

- **гон [гван]** "like"
- **берко́на [берквана]** "to eat"

Unlike Russian, **е** /e/ and **я** /æ/ are always pure vowels and **й** /j/ is always written explicitly:

- **йети́м** /jetim/ "orphan"
- **йулға́н** /julˈʁan/ "quilt"
- **е́тти** /etːi/ "to you"
- **яххи́** /æχːi/ "good"

Stress is contrastive and always marked on headwords: **ьана́** "currently" vs **ьа́на** "plate".

### Spelling Conventions

Sonorant assimilation at morpheme boundaries is not reflected in spelling:

- **чӏве́л** "two" → **чӏве́л-ра [чӏверра]** "both"
- **ази́р** "thousand" → **ази́рна [азинна]** "a thousand times"
- **у́ле** "eye", **уле́н-** (OBL) → **уле́нла [уленна] бара́ра** "to jinx"

Directional (**ка-**, **ьа-**, **ца-**) and negative (**а-**, **ма-**) prefixes shift to **я** /æ/ or **е** /e/ before roots with those vowels:

- **бел** "still is" → **а́бел [ебел]** "no more"
- **бертта́ра** "to rip" → **цабертта́ра [цеберттара]** "to tear"
- **бяҡа́ра** "to wound" → **ьабяҡа́ра [ьябяҡара]** "to kick"

The causative suffixes **-их**, **-ух**, **-ях** assimilate to the following vowel in most varieties:

- **бара́ра** "to do" → **бариха́ра [барахара]** "to force to do"
- **биьо́ра** "to be" → **биьуха́ра [биьахара]** "to let be, to make"
- **бя́рғур** "dried" → **бя́рғяхур [бярғухур]** "made dry"

Morphologically separate words are written with spaces regardless of lexicalization degree:

- **миг бяръи́в** "ice-cold"
- **йяь акко́р** "unscrupulous"
- **ча йел** "somebody"

This extends to compound verbs as well. Though unexpected, it is supported by tests such as negation insertion, stress position, and short-answer behavior:

- **ул бета́ра** "to look" → **ул а́бетур** "didn't look"
- **чи бага́ра** "to see" → **чи ва́живде у? ва́живда** "did you see? I did"
- **чер цабирьо́ра** "to return" → **чер ма́цирьотте** "don't return"

The conventions described in this section prioritize consistency, predictability, and transparency at this early stage. A proper orthographic system for Kaitag remains important work ahead.

## Version History

Maintained by **Magomedov M. T.** from Turaga village. For questions, suggestions, or reports — +7 999 533-93-50, [alkaitagi@outlook.com](mailto:alkaitagi@outlook.com).

**v1.1 (2026, in progress):** In collaboration with **Gasanov M. R.** from Kirki village. Data organized as an open repository with editorial guidelines and tooling. Enriching entries with cross-references, usage examples, semantic tags, aliases, etymologies, and notes.

**[v1.0 (May 2025)](https://github.com/urssivar/dictionary/releases/tag/v1.0):** In collaboration with prof. **Gasanova U. U.**, based on her dissertation's Shilyagi village wordlist (2012). Includes accented headwords, grammatical forms, POS tags, and dialectal variants. Additional references: **Temirbulatova S. M.** (2004, 2008, 2021), **Gabibova K. M.** (2009). Spoken introduction: ["Meet the Kaitag Dictionary"](https://youtu.be/zLPXSASLAFA) (in Russian).
