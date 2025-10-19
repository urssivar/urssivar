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
    <Link to="language" class="navlink font-semibold">
    Кайтагский язык
    </Link>

    <div class="m-3" />

    <Link to="language" class="navlink font-semibold">
    Грамматика
    </Link>

    <Link v-for="a in articles" :key="a.title" :to="a.path" class="navlink" :class="{
      'text-highlighted': a.current
    }">
    <span class="ml-4">
      {{ a.title }}
    </span>
    </Link>

    <div class="m-3" />

    <Link to="language" class="navlink font-semibold">
    Словарь
    </Link>
    <Link to="language" class="navlink font-semibold">
    Разговорник
    </Link>
    <Link to="language" class="navlink font-semibold">
    Тексты
    </Link>
  </nav>
</template>
