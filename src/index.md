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

We work on preserving the legacy of the Kaitag people of Dagestan. As elder generations pass away, we race against time to capture what remains before it's lost forever.

</article>

<VillageMap />

<article>

This data becomes the foundation for researching Kaitag. With enough of it, linguists can classify dialects and trace how the language developed, while geneticists can verify village origin legends and reconstruct the ancient history of the people. All of this depends **on us**.

## [Kaitag Language](./language/)

To preserve the Kaitag language, we document it in its living form — through words and speech. What we don't capture now, while the last generation of speakers is alive, will be lost irretrievably.

**Dictionary:** Building the most complete lexical database across villages and dialects. Every word, variant, and form matters.

**Oral texts:** Recording natural speech — tales, memories, dialogues, prayers. Preserving not just vocabulary, but mentality and culture.

## [Kaitag Genealogy](./genealogy/)

To understand our origins and how Kaitag families connect, we trace lineages through legends and DNA analysis. Together, they reveal who our ancestors were and how villages are related.

**Family trees:** Recording names, lifespans, migrations, and kinship networks. Every family story adds to the larger picture.

**DNA analysis:** Y-chromosomal and autosomal testing through FamilyTreeDNA. Verifying oral traditions, revealing ancestral connections, and reconstructing ancient history.

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
