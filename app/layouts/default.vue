<template>
    <div>
        <div class="content-container">
            <nav class="flex gap-3 flex-wrap my-8 text-sm items-center">
                <ULink to="/">Eng</ULink>
                <ULink to="/ru">Рус</ULink>
                <USeparator orientation="vertical" class="h-[1.2em]" />
                <ULink to="https://t.me/urssivar" target="_blank">Telegram</ULink>
                <ULink to="https://youtube.com/@urssivar" target="_blank">YouTube</ULink>
                <ULink to="https://github.com/urssivar" target="_blank">GitHub</ULink>
            </nav>
        </div>

        <slot />
    </div>
</template>
