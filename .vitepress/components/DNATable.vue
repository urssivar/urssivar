<script setup lang="ts">
import kits from "@/data/dna.json";

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
        <span lang="xdq" :title="`Kit: ${k.id}`">
          {{ k.village && k.region ? `${k.village}, ${k.region}` : "???" }}
        </span>
        <a :href="getYfullLink(k)">
          <UButton variant="soft" size="xs">
            <span :class="`hh-${k.haplogroup}`" class="font-semibold">
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

<style scoped>
.hh-R1b {
  @apply text-(--color-amber-600) dark:text-(--color-amber-400);
}

.hh-J1 {
  @apply text-(--color-sky-600) dark:text-(--color-sky-400);
}

.hh-Q2 {
  @apply text-(--color-emerald-600) dark:text-(--color-emerald-400);
}
</style>
