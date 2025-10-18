<script setup lang="ts">
import Link from '@/components/Link.vue';

const articles = [
  { title: 'Падежи', path: '#', current: true },
  { title: 'Частицы', path: '#' },
  { title: 'Связки', path: '#' }
];
</script>

<template>
  <nav class="text-sm flex flex-col">
    <Link to="language" class="navlink font-semibold flex items-center gap-1.5">
    <UIcon name="i-material-symbols:arrow-back-2-rounded" class="size-5" />
    Язык
    </Link>

    <div class="m-3" />

    <Link to="language" class="navlink pl-8 font-semibold">
    Грамматика
    </Link>

    <Link v-for="a in articles" :key="a.title" :to="a.path" class="navlink pl-8" :class="{
      'text-highlighted': a.current
    }">
    {{ a.title }}
    </Link>

    <div class="m-3" />

    <Link to="language" class="navlink pl-8 font-semibold">
    Словарь
    </Link>
    <Link to="language" class="navlink pl-8 font-semibold">
    Разговорник
    </Link>
    <Link to="language" class="navlink pl-8 font-semibold">
    Тексты
    </Link>
  </nav>
</template>
