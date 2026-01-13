<script setup lang="ts">
import { useDNAData } from "@/composables/dna";

const { kits } = useDNAData();

function getYfullLink(k: (typeof kits)[0]) {
  const base = "https://www.yfull.com/tree/";
  const tree = k.branch ?? k.subclade ?? k.haplogroup;
  const highlight = k.yfullId ? `/#:~:text=${k.yfullId}` : "";
  return base + tree + highlight;
}
</script>

<template>
  <ol>
    <li v-for="k in kits" :key="k.id" :id="k.id">
      <p class="flex flex-col sm:flex-row gap-2 sm:items-center">
        <span lang="xdq">
          {{ k.village && k.region ? `${k.village}, ${k.region}` : "???" }}
        </span>
        <a :href="getYfullLink(k)">
          <UButton variant="soft" size="xs">
            <span
              :class="[k.yfullId ? `hh-${k.haplogroup}` : 'text-muted']"
              class="font-semibold"
            >
              {{ k.haplogroup }}
              <template v-if="k.subclade"> · {{ k.subclade }}</template>
              <template v-if="k.branch"> · {{ k.branch }}</template>
            </span>
          </UButton>
        </a>
      </p>
    </li>
  </ol>
</template>

<style scoped>
@reference "@/theme/styles/index.css";

.hh-R1b {
  @apply text-amber-600 dark:text-amber-400;
}

.hh-J1 {
  @apply text-sky-600 dark:text-sky-400;
}

.hh-Q2 {
  @apply text-emerald-600 dark:text-emerald-400;
}
</style>
