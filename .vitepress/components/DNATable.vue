<script setup lang="ts">
import kits from '@/data/dna.json';

const colors = <Record<string, string>>{
  R1b: '#3b82f6',  // blue-500
  J1: '#14b8a6',   // teal-500
  Q2: '#8b5cf6',    // violet-500
};
</script>

<template>
  <ol>
    <li v-for="k in kits" :key="k.id" :id="k.id">
      <p>
        <span lang="xdq" class="text-lg">
          {{ `${k.village}, ${k.region}` }}
        </span>
        <br class="sm:hidden" />
        <a :href="'https://www.yfull.com/tree/' + (k.branch ?? k.subclade ?? k.haplogroup)" class="sm:ml-2">
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
    </li>
  </ol>
</template>
