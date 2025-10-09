<template>
    <div>
        <div class="content-container">
            <nav class="flex gap-3 flex-wrap my-8 text-sm leading-none items-center">
                <ULink to="/">Eng</ULink>
                <ULink to="/ru">Рус</ULink>
                <USeparator orientation="vertical" class="h-[1.2em]" />
                <ULink to="https://t.me/urssivar" external>Telegram</ULink>
                <ULink to="https://youtube.com/@urssivar" external>YouTube</ULink>
                <ULink to="https://github.com/urssivar" external>GitHub</ULink>
            </nav>
        </div>

        <slot />
    </div>
</template>
