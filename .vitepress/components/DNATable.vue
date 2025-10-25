<script setup lang="ts">
import kits from '@/data/dna.json';
</script>

<template>
  <p v-for="(k, i) in kits" :key="k.id" :id="k.id" class="my-2">
    <span class="navlinks text-sm">
      <a :href="`#${k.id}`" :title="k.id">
        {{ i + 1 }}
      </a>
    </span>
    <span lang="xdq" class="mx-2">
      {{ k.village }}, {{ k.region }}
    </span>
    <a :href="'https://www.yfull.com/tree/' + (k.branch ?? k.subclade ?? k.haplogroup)">
      <UButton variant="soft" size="xs">
        <template v-if="!k.yfullId">*</template>
        {{ k.haplogroup }}
        <template v-if="k.subclade"> · {{ k.subclade }}</template>
        <template v-if="k.branch"> · {{ k.branch }}</template>
      </UButton>
    </a>
  </p>
</template>
