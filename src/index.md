---
title: "Urssivar: Kaitag Studies"
description: "Resources & technologies for preserving and studying Kaitag language, culture, history, and people."

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

Urssivar preserves the Kaitag people of Dagestan through language archives, genealogical records, and genetic analysis. **Time is running out** — this is the last chance to capture what remains before the last bearers of tradition are gone.

</article>

<VillageMap />

<article>

We're building a foundation for future research. With enough data, linguists will be able to classify dialects and understand how the language developed, while geneticists can verify legends about village origins and reconstruct ancient history of the people.

## [Kaitag Language](./language/)

Comprehensive linguistic record — from systematic grammar to living speech.

**Dictionary:** 5,000+ entries documenting forms across the varieties. Built through native speaker contributions.

**Oral texts:** Natural speech recordings — tales, memories, dialogues, prayers. Captures not just words, but thought patterns and cultural expression.

## [Kaitag Genealogy](./genealogy/)

Lineage reconstruction combining traditional genealogy with modern genetics to trace family origins and connections.

**Family trees:** Generational records of names, lifespans, settlements, and migrations. Maps kinship networks and movement patterns across the territory.

**DNA analysis:** Y-chromosomal and autosomal testing through FamilyTreeDNA (USA). Confirms relationships, reconstructs clan branches, reveals migration history.

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
