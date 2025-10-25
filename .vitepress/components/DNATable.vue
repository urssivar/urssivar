<script setup lang="ts">
import kits from '@/data/dna.json';

const colors = <Record<string, string>>{
  R1b: '#3b82f6',  // blue-500
  J1: '#14b8a6',   // teal-500
  Q: '#8b5cf6',    // violet-500
};
</script>

<template>
  <p v-for="(k, i) in kits" :key="k.id" :id="k.id" class="my-2">
    <a :href="`#${k.id}`" class="no-underline text-muted hover:text-highlighted">
      {{ i + 1 }}.
    </a>
    <span lang="xdq" class="text-lg">
      {{ `${k.village}, ${k.region}` }}
    </span>
    &nbsp
    <br class="sm:hidden" />
    <a :href="'https://www.yfull.com/tree/' + (k.branch ?? k.subclade ?? k.haplogroup)">
      <UButton variant="soft" size="xs">
        <span :style="{ color: colors[k.haplogroup] }" class="font-semibold">
          {{ k.haplogroup }}
          <template v-if="k.subclade"> · {{ k.subclade }}</template>
          <template v-if="k.branch"> · {{ k.branch }}</template>
        </span>
        <template v-if="!k.yfullId">*</template>
      </UButton>
    </a>
  </p>
</template>
