<template>
    <div class="border-default border-b">
        <nav class="navbar flex gap-2 h-12 items-center">
            <slot name="leading" />
            <div class="flex-1" />
            <slot />
            <div class="flex-1" />
            <slot name="trailing" />
        </nav>
    </div>
</template>
