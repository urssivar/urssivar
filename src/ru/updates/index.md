---
title: "Обновления"
description: "Новости и прогресс кампании Urssivar по документированию кайтагского языка, истории и народа."
wide: true
---

<script setup lang="ts">
import { data as updates } from './posts.data.js';
</script>

<article>

# Обновления

Новости и прогресс кампании Urssivar по документированию кайтагского языка, истории и народа.

<div class="mt-12 space-y-8">
  <article v-for="update in updates" :key="update.url" class="border-b border-neutral-200 dark:border-neutral-800 pb-8 last:border-0">
    <div class="flex items-baseline gap-3 mb-2">
      <time :datetime="update.date" class="text-sm text-muted font-medium">
        {{ new Date(update.date).toLocaleDateString('ru-RU', { year: 'numeric', month: 'long', day: 'numeric' }) }}
      </time>
    </div>
    <h2 class="text-2xl font-semibold mb-3">
      <a :href="update.url" class="text-neutral-900 dark:text-neutral-100 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
        {{ update.title }}
      </a>
    </h2>
    <p class="text-neutral-600 dark:text-neutral-400 mb-4">
      {{ update.summary }}
    </p>
    <a :href="update.url" class="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-medium text-sm">
      Читать далее →
    </a>
  </article>
</div>

</article>
