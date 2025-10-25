<script setup lang="ts">
import { data as posts } from './posts.data';
</script>

# Updates

[Telegram](https://t.me/urssivar) · [YouTube](https://youtube.com/@urssivar) · [GitHub](https://github.com/urssivar) {.text-sm}

News and progress from the Urssivar campaign documenting Kaitag language, history, and people.

<template v-for="p in posts" :key="p.url">
<h3><a :href="p.url">{{ p.frontmatter.title }}</a></h3>
<p>
<span>{{ p.frontmatter.date.toString().substring(0, 10) }} ·</span>
{{ p.frontmatter.description }}
</p>
</template>
