<script setup lang="ts">
import kits from "@/data/dna.json";
</script>

<template>
  <ol>
    <li v-for="k in kits" :key="k.id" :id="k.id">
      <p class="flex flex-col sm:flex-row gap-2">
        <span lang="xdq">
          {{ `${k.village}, ${k.region}` }}
        </span>
        <a
          :href="
            'https://www.yfull.com/tree/' +
            (k.branch ?? k.subclade ?? k.haplogroup)
          "
        >
          <UButton variant="soft" size="xs">
            <span :class="`text-${k.haplogroup}`" class="font-semibold">
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
.text-R1b {
  @apply text-(--color-amber-600) dark:text-(--color-amber-400);
}

.text-J1 {
  @apply text-(--color-blue-600) dark:text-(--color-blue-400);
}

.text-Q2 {
  @apply text-(--color-emerald-600) dark:text-(--color-emerald-400);
}
</style>
