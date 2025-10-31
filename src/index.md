---
title: "Urssivar: Kaitag Studies"
description: "Preserving and studying Kaitag language, culture, history, and people."

landing: true
wide: true
---

<script setup lang="ts">
import Stamp from "@/components/Stamp.vue";
import VillageMap from "@/components/VillageMap.vue";
import PostCard from "@/components/PostCard.vue";
import { data as notes } from './notes/notes.data';
</script>

<article>

# Urssivar: Kaitag Studies

_Наллара дел да. Ьам ра бел._ {lang=xdq}

Urssivar works on preserving the legacy of the Kaitag people of Dagestan through language archives, genealogical records, and genetic analysis. **Time is running out** — this is our final chance to capture what remains before the last bearers of tradition are gone.

</article>

<VillageMap />

<article>

What we capture now becomes the foundation for understanding Kaitag. With enough data, linguists can classify dialects and trace how the language developed, while geneticists can verify village origin legends and reconstruct the ancient history of the people. All of this depends **on us**.

## [Kaitag Language](./language/)

Linguistic documentation — from systematic grammar to living speech.

**Dictionary:** 5,000+ entries documenting forms across the varieties. Built through native speaker contributions.

**Oral texts:** Recordings of natural speech — tales, memories, dialogues, prayers. Capturing not just words, but thought patterns and cultural expression.

## [Kaitag Genealogy](./genealogy/)

Reconstructing lineages by combining traditional genealogy with modern genetics.

**Family trees:** Documenting names, lifespans, settlements, and migrations across generations. Mapping kinship networks and movement patterns across the territory.

**DNA analysis:** Y-chromosomal and autosomal testing through FamilyTreeDNA (USA). Working to confirm family origins, reconstruct clan branches, and trace migration history.

</article>

<Stamp />

<article>

## [Field Notes](./notes/)

Findings, essays, and updates from our work.

[Telegram](https://t.me/urssivar) · [YouTube](https://youtube.com/@urssivar) ·
[GitHub](https://github.com/urssivar)

--- {.air}

<PostCard v-for="n in notes.slice(0, 3)" :key="n.url" :page="n"/>

</article>
