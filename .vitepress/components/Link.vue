<script setup lang="ts">
defineProps({
    to: String
});
</script>

<template>
    <a :href="to" :target="to.startsWith('https://') ? '_blank' : ''">
        <slot />
    </a>
</template>
