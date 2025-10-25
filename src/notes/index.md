---
landing: true
---

<script setup lang="ts">
import PostCard from "@/components/PostCard.vue";
import { data as notes } from './notes.data';
</script>

# [Urssivar](../index#field-notes): Field Notes

[Telegram](https://t.me/urssivar) · [YouTube](https://youtube.com/@urssivar) · [GitHub](https://github.com/urssivar)

News and progress from the Urssivar campaign documenting Kaitag language, history, and people.

<PostCard v-for="n in notes" :key="n.url" :page="n"/>
