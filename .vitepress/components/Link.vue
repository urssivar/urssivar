<script setup lang="ts">
defineProps({
    to: {
        type: String,
        required: true
    }
});
</script>

<template>
    <a :href="to" :target="to.startsWith('https://') ? '_blank' : ''">
        <slot />
    </a>
</template>
