---
title: "Urssivar: Field Notes"
description: "Findings, essays, and updates from documenting Kaitag language, history, and people."
---

<script setup lang="ts">
import PostCard from "@/components/PostCard.vue";
import { data as notesData } from './notes.data';
import { computed } from "vue";

const props = defineProps<{
  sub?: boolean;
}>();

const notes = computed(() => {
  return props.sub ? notesData.slice(0, 3) : notesData;
})
</script>

<template v-if="sub">

## <a href="notes/">Field Notes</a>

</template>
<template v-else>

# Field Notes

</template>

Findings, essays, and updates from our work. Also on [Telegram](https://t.me/urssivar), [YouTube](https://youtube.com/@urssivar), and [GitHub](https://github.com/urssivar).

<PostCard v-for="n in notes" :key="n.url" :page="n"/>
