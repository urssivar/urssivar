<script setup lang="ts">
import kits from '@/data/dna.json';
</script>

<template>
    <p v-for="k in kits" :key="k.id">
        <!-- <a :href="k.yfullUrl">{{ k.id }}</a> -->
        {{ k.village }}, {{ k.region }}
    </p>
</template>
