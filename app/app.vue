<script setup lang="ts">
useHead({
  link: [{
    rel: 'preload',
    as: 'image',
    href: '/map.webp',
    type: 'image/webp',
  }],
});
</script>

<template>
  <UApp>
    <NuxtRouteAnnouncer />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </UApp>
</template>
