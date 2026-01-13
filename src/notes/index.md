---
title: "Urssivar: Field Notes"
description: "Findings, essays, and updates from documenting Kaitag language, history, and people."
---

<script setup lang="ts">
import PostCard from "@/components/PostCard.vue";
import { data as notes } from './notes.data';
</script>

<article>

# Field Notes

Findings, essays, and updates from our work. Also on [Telegram](https://t.me/urssivar), [YouTube](https://youtube.com/@urssivar), and [GitHub](https://github.com/urssivar).

<PostCard v-for="n in notes" :key="n.url" :page="n"/>

</article>
