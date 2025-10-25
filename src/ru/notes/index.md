---
landing: true
---

<script setup lang="ts">
import PostCard from "@/components/PostCard.vue";
import { data as notes } from './notes.data';
</script>

# [Urssivar](../index#полевые-заметки): Полевые Заметки

Новости и прогресс кампании Urssivar по документированию кайтагского языка, истории и народа.

[Telegram](https://t.me/urssivar) · [YouTube](https://youtube.com/@urssivar) · [GitHub](https://github.com/urssivar)

--- {.air}

<PostCard v-for="n in notes" :key="n.url" :page="n"/>
