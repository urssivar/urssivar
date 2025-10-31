---
title: "Urssivar: Field Notes"
description: "Findings, essays, and updates from documenting Kaitag language, history, and people."

landing: true
---

<script setup lang="ts">
import PostCard from "@/components/PostCard.vue";
import { data as notes } from './notes.data';
</script>

# [Urssivar](../index#field-notes): Field Notes

Findings, essays, and updates from documenting Kaitag language, history, and people.

[Telegram](https://t.me/urssivar) · [YouTube](https://youtube.com/@urssivar) · [GitHub](https://github.com/urssivar)

--- {.air}

<PostCard v-for="n in notes" :key="n.url" :page="n"/>
