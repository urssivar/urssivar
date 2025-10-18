<script setup lang="ts">
import Link from '@/components/Link.vue';

const articles = [
  { title: 'Падежи', path: '#', current: true },
  { title: 'Частицы', path: '#' },
  { title: 'Связки', path: '#' }
];
</script>

<template>
  <nav class="text-dimmed text-sm flex flex-col no-underline">
    <Link to="language" class="p-1.5 hover:text-highlighted font-semibold flex items-center gap-1 no-underline">
    <UIcon name="i-material-symbols:arrow-back-2-rounded" class="size-5" />
    Язык
    </Link>

    <div class="m-3" />

    <Link to="language" class="p-1.5 pl-6 ml-1.5 hover:text-highlighted font-semibold no-underline">
    Грамматика
    </Link>

    <!-- <Link to="language" class="no-underline p-1.5 hover:text-highlighted font-semibold">
    Грамматика
    </Link> -->
    <Link v-for="a in articles" :key="a.title" :to="a.path"
      class="no-underline p-1.5 pl-6 ml-1.5 hover:text-highlighted" :class="{
        'text-highlighted': a.current
      }">
    {{ a.title }}
    </Link>

    <div class="m-3" />

    <Link to="language" class="p-1.5 pl-6 ml-1.5 hover:text-highlighted font-semibold no-underline">
    Словарь
    </Link>
    <Link to="language" class="p-1.5 pl-6 ml-1.5 hover:text-highlighted font-semibold no-underline">
    Разговорник
    </Link>
    <Link to="language" class="p-1.5 pl-6 ml-1.5 hover:text-highlighted font-semibold no-underline">
    Тексты
    </Link>
  </nav>
</template>
