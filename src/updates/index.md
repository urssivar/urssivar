<script setup lang="ts">
import { data as updates } from './updates.data';
</script>

# Updates

[Telegram](https://t.me/urssivar) · [YouTube](https://youtube.com/@urssivar) · [GitHub](https://github.com/urssivar) {.text-sm}

News and progress from the Urssivar campaign documenting Kaitag language, history, and people.

<template v-for="u in updates" :key="u.url">
<h4><a :href="u.url">{{ u.title }}</a></h4>
<p><time :datetime="u.date">{{ u.date }}</time> · {{ u.summary }}</p>
</template>
