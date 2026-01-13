---
title: "Urssivar: Полевые Заметки"
description: "Находки, эссе и обновления о документировании кайтагского языка, истории и народа."
---

<script setup lang="ts">
import PostCard from "@/components/PostCard.vue";
import { data as notes } from './notes.data';
</script>

<article>

# Полевые заметки

Находки, эссе и обновления о нашей работе. Также в [Telegram](https://t.me/urssivar), на [YouTube](https://youtube.com/@urssivar) и [GitHub](https://github.com/urssivar)

<PostCard v-for="n in notes" :key="n.url" :page="n"/>

</article>
