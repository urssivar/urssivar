---
title: "Urssivar: Полевые Заметки"
description: "Находки, эссе и обновления о документировании кайтагского языка, истории и народа."
---

<script setup lang="ts">
import PostCard from "@/components/PostCard.vue";
import { data as notesData } from './notes.data';
import { computed } from "vue";

const props = defineProps<{
  home?: boolean;
}>();

const notes = computed(() => {
  return props.home ? notesData.slice(0, 3) : notesData;
})
</script>

<article>

<template v-if="home">

## [Полевые заметки](./notes/)

</template>
<template v-else>

# Полевые заметки

</template>

Находки, эссе и обновления о нашей работе. Также в [Telegram](https://t.me/urssivar), на [YouTube](https://youtube.com/@urssivar) и [GitHub](https://github.com/urssivar)

<PostCard v-for="n in notes" :key="n.url" :page="n"/>

</article>
