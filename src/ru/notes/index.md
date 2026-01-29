---
title: "Urssivar: Полевые Заметки"
description: "Находки, эссе и обновления о документировании кайтагского языка, истории и народа."
---

<script setup lang="ts">
import NoteCard from "@/components/NoteCard.vue";
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

## <a href="notes/">Полевые заметки</a>

</template>
<template v-else>

# Полевые заметки

</template>

Находки, эссе и обновления о нашей работе. Также в [Telegram](https://t.me/urssivar), на [YouTube](https://youtube.com/@urssivar) и [GitHub](https://github.com/urssivar)

<NoteCard v-for="n in notes" :key="n.url" :page="n"/>
