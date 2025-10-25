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
    <span class="navlinks text-sm">
      <a :href="`#${k.id}`" :title="k.id">
        {{ i + 1 }}
      </a>
    </span>
    <span lang="xdq" class="text-lg mx-2">
      {{ k.village }}, {{ k.region }}
    </span>
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
