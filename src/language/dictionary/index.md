---
numbered: true
---

<script setup lang="ts">
import DictIndex from '@/components/DictionaryIndex.vue';
import type { DictionaryIndexMode } from '@/components/DictionaryIndex.vue';

defineProps<{
  indexMode?: DictionaryIndexMode;
}>();
</script>

# Kaitag Dictionary

:::
Magomed Magomedov, +7 999 533-93-50, <alkaitagi@outlook.com>  
Uzlipat Gasanova, +7 960 408-99-18, <uzlipat066@mail.ru>  
5,171 entries · [database](https://github.com/urssivar/dictionary/releases/latest) 25.03.2026 · [document](https://urssivar.com/language/dictionary) 25.03.2026 · license [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/) {.text-xs .italic}
:::

:::
The website is being updated toward v1.1. For a stable version, use the PDF or Google Sheets. {.text-xs .italic}
:::

The dictionary draws primarily on the speech of the villages **Turaga** (Irchamul microregion) and **Shilyagi** (Lower Kattagan microregion). Its core is the dissertation of **Gasanova U. U. (2012)**, with whom we spent long hours refining the material. Additional material comes from **Temirbulatova S. M. (2004, 2008, 2021)** and **Gabibova K. M. (2009)**.

For a spoken introduction, see ["Meet the Kaitag Dictionary"](https://youtu.be/zLPXSASLAFA) on YouTube.

The dictionary is available in four formats:

- The website [Urssivar.com](https://urssivar.com/language/dictionary) for easy access on any device
- The [PDF document](/assets/pdfs/kaitag-dictionary-en.pdf) for local storage and printing
- The [Google Sheets](https://docs.google.com/spreadsheets/d/1TAvQAMAw0jDdStvq2Z1E-m1mz3UWkCMGQBgLCnPQgJs) table for data analysis and linguistic research
- The [GitHub repository](https://github.com/urssivar/dictionary) for full source data and the JSON export for computational use

<DictIndex :mode="indexMode" />

## Entry Structure

Each entry includes a headword, grammatical tags, and definitions. Grammatical forms are included where relevant. Definitions may carry usage notes and examples. Some entries also include a note and etymology. Where applicable, dialect variants (~) and derived-from/see-also links (« +, except PDF) are shown.

The first tag always indicates *part of speech*, with forms listed accordingly:

- Nouns (*n*): absolutive headword (**тӏу́пп** "finger"), oblique (**тӏуппу́-**), plural (**тӏиппе́** "fingers"). May be inherently plural (*pl*) or include an irregular locative (**ья́жни** "on Hajj").
- Verbs (*v*): imperfective infinitive (**кабирга́ра** "to be sitting"), optionally perfective (**кабига́ра** "to sit") and preterite (**ка́бижив** "sat").
- Adjectives (*adj*): may include adverbial form with stress shift (**бухха́р** "cold" → **бу́ххал** "coldly").
- Cardinal numerals (*num*): headword (**чӏвел** "two"), oblique (**чӏул-**), and stem (**чӏу-**).

Other parts of speech include adverbs (*adv*), conjunctions (*conj*), prepositions (*prep*), postpositions (*postp*), interjections (*interj*), pronouns (*pron*), copulas (*cop*), particles (*part*), and determiners (*det*). Some of these categories are assigned loosely and may not reflect precise grammatical classification.

Words may also carry a grammatical class (*cls*), labeled with the neuter **-б-** (**биҡна́** "old").

## Phonetics & Orthography

The modern Kaitag alphabet, based on the Cyrillic script, was developed in 2024 and refined in 2026. It consists of 27 Russian letters (excluding Щщ, Фф, Ыы, Ээ, Ёё, Юю), 3 extended Cyrillic letters (Ғғ, Ҡҡ, Ҳҳ), and 12 digraphs (doubled geminates and ejectives with Ӏӏ).

Useful resources:

- Video presentation ["Evolving the Kaitag script"](https://youtu.be/Ad2o1hwYagA) on YouTube
- Character set in the [Paratype language reference](https://paratype.github.io/cyrillic-languages/index.html?lang=Kaitag&group=cyrillic&ui=en&pg=2)
- Mobile keyboards [Yandex Keyboard](https://redirect.appmetrica.yandex.com/serve/172416875559437678) and [Google Gboard](https://play.google.com/store/apps/details?id=com.google.android.inputmethod.latin)
- Automatic text converter [Yaziv](https://yaziv.raxys.app/xdq?from=cyr_soviet&to=cyr&text=цакъкъа+къабагъ)

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

The digraphs **пв** /ɸ/, **ву** /w/, and **гҳ** /ɣ/ appear in onomatopoeia only. The phonemes /ħ/ **хӏ**, /ʡ/ **гӏ**, and /uˤ/ **ю** appear in dialectal entries.

Following a non-sonorant consonant, the letter **в** usually marks labialization rather than a separate sound: **чӏвел** /tʃʼʷel/ "two", **швел** /ʃʷel/ "five".

Some varieties lose gemination syllable-finally, but it is restored before vowels and consistently preserved in spelling:

- **миҡҡ [миҡ]** "wedding" → **ми́ҡҡи** "at wedding"
- **лукка́на** "to give" → **лу́ккне [лукне]** "giving (masd.)"

Geminate fricatives are not listed in the alphabet as distinct letters. The phenomenon varies considerably between villages and requires further study. They are shown mainly intervocalically (**нишша** "you (pl.)"), and occasionally word-initially (**сса** "yesterday").

### Vowels

:::

|              |
| :----------: | :-------: | :-----------: |
|  /i/ [ɪ] и   |           |     /u/ у     |
|  /e/ [ɛ] е   | /a/ [ɐ] а | /ʷa/ [ɔ~ʷɐ] о |
| /æ/ [æ~ɐˤ] я |           |

:::

> **о** is a convenience spelling for the underlying /ʷa/.

Unlike Russian, **е** /e/ and **я** /æ/ are always pure vowels and **й** /j/ is always written explicitly:

- **йети́м** /jetim/ "orphan"
- **йулға́н** /julˈʁan/ "quilt"
- **е́тти** /etːi/ "to you"
- **е́ркӏ** /eɾkʼ/ "river"
- **я́тӏа** /ætʼa/ "frog"
- **яххи́** /æχːi/ "good"

Stress is contrastive and always marked on headwords: **ьана́** "currently" vs **ьа́на** "plate".

### Spelling Conventions

Sonorant assimilation at morpheme boundaries is not reflected in spelling:

- **чӏве́л** "two" → **чӏве́л-ра [чӏверра]** "both"
- **ази́р** "thousand" → **ази́рна [азинна]** "a thousand times"
- **у́ле** "eye", **уле́н-** (OBL) → **уле́нла [уленна] бира́ра** "to jinx"

Directional (**ка-**, **ьа-**, **ца-**) and negative (**а-**, **ма-**) prefixes shift to **я** /æ/ or **е** /e/ before roots with those vowels:

- **бел** "still is" → **а́бел [ебел]** "no more"
- **ц́яун** "came" → **ма́цяв [мяцяв]** "may he not come"
- **бертта́ра** "to rip" → **цабертта́ра [цеберттара]** "to tear"
- **бяҡа́ра** "to wound" → **ьабяҡа́ра [ьябяҡара]** "to kick"

The causative suffixes **-их**, **-ух**, **-ях** assimilate to the following vowel in most varieties:

- **бара́ра** "to do" → **бариха́ра [барахара]** "to force to do"
- **биьо́ра** "to be" → **биьуха́ра [биьахара]** "to let be, to make"
- **бя́рғур** "dried" → **бя́рғяхур [бярғухур]** "made dry"

## Further Work

Three priorities lie ahead: gathering more material urgently — very little has been documented and the older generation is passing; expanding entries with usage examples and village variants; and thorough verification for accuracy and orthographic consistency.

All of this will require crowdsourcing and collaboration.

Улбетай нишшала,  
Мяьямад
