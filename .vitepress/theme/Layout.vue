<script setup lang="ts">
import { Content, useData } from 'vitepress';
import Link from '~/components/Link.vue';

const { frontmatter } = useData();
</script>

<template>
  <UApp>
    <div class="content-container">
      <nav class="flex gap-3 flex-wrap text-sm items-center my-8 ">
        <Link to="/">Eng</Link>
        <Link to="/ru">Рус</Link>
        <USeparator orientation="vertical" class="h-[1.2em]" />
        <Link to="https://t.me/urssivar">Telegram</Link>
        <Link to="https://youtube.com/@urssivar">YouTube</Link>
        <Link to="https://github.com/urssivar">GitHub</Link>
      </nav>
    </div>
    <Content :class="{ 'content-container': frontmatter.layout !== 'full' }" />
  </UApp>
</template>
