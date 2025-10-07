<script setup lang="ts">
useSeoMeta({
    title: 'Urssivar: Кайтагские Исследования',
    description: 'Ресурсы & технологии для сохранения и изучения кайтагского языка, культуры, истории, и народа.',
});

useHead({
    htmlAttrs: {
        lang: 'ru'
    }
});
</script>

<template>
    <main class="leading-relaxed">
        <div class="max-w-[65ch] mx-auto px-4">
            <nav class="flex gap-3 flex-wrap mb-8">
                <NuxtLink to="/" class="text-blue-600 dark:text-blue-300 hover:underline">Eng</NuxtLink>
                Рус
                <span>/</span>
                <NuxtLink to="https://t.me/urssivar" target="_blank"
                    class="text-blue-600 dark:text-blue-300 hover:underline">Телеграм</NuxtLink>
                <NuxtLink to="https://youtube.com/@urssivar" target="_blank"
                    class="text-blue-600 dark:text-blue-300 hover:underline">YouTube</NuxtLink>
                <NuxtLink to="https://github.com/urssivar" target="_blank"
                    class="text-blue-600 dark:text-blue-300 hover:underline">GitHub</NuxtLink>
            </nav>

            <h1 class="text-2xl font-bold mt-0 mb-2 leading-snug">Urssivar: Кайтагские Исследования</h1>

            <p class="mb-4"><i lang="xdq">Наллара дел да. Ьам ра бел.</i></p>

            <p class="mb-4">
                Мы собираем слова, записываем предания, восстанавливаем родословные, проводим ДНК-тестирование.
                <strong>Время уходит</strong> — это последний шанс сохранить то, что осталось.
                Каждое забытое слово, каждая утраченная родословная — это фрагмент наследия, который исчезнет навсегда.
            </p>
        </div>

        <div class="w-full">
            <ClientOnly>
                <VillageMap />
            </ClientOnly>
        </div>

        <div class="max-w-[65ch] mx-auto px-4">
            <p class="mb-4">
                Мы создаём базу для будущих исследований Кайтага.
                При достаточном объёме данных лингвисты смогут классифицировать диалекты и понять, как развивался язык,
                а генетики — проверить предания об образовании сёл и восстановить древнюю историю народа.
                Всё это зависит <strong>от нас.</strong>
            </p>

            <h2 class="text-xl font-bold mt-6 mb-2 leading-snug">
                <NuxtLink to="https://codex.urssivar.com/ru" class="text-blue-600 dark:text-blue-300 hover:underline">
                    Кайтагский язык</NuxtLink>
            </h2>
            <p class="mb-4">
                Мы записываем живую кайтагскую речь и создаём архив оригинальных текстов: сказок, рассказов, песен,
                пословиц
                —
                всего, что исчезнет безвозвратно без фиксации сейчас, пока живо последнее поколение носителей.
            </p>
            <p class="mb-4">
                <strong>Словарь:</strong> Словарная база кайтагского языка по сёлам и микрорегионам.
                Базовый массив — 5000 слов, расширяется данными от носителей.
            </p>
            <p class="mb-4">
                <strong>Устные тексты:</strong> Естественная речь — рассказы, воспоминания, описания быта и традиций,
                диалоги, молитвы. Фиксируем не только лексику, но и образ мышления, стиль речи, культуру.
            </p>

            <h2 class="text-xl font-bold mt-6 mb-2 leading-snug">
                <NuxtLink to="https://www.familytreedna.com/groups/kaitag/about"
                    class="text-blue-600 dark:text-blue-300 hover:underline">Кайтагская генеалогия</NuxtLink>
            </h2>
            <p class="mb-4">
                Мы составляем фамильные древа — имена, годы жизни, сёла, миграции.
                Используем ДНК-тестирование для установления происхождения и родственных связей.
            </p>
            <p class="mb-4">
                <strong>Родословные:</strong> Восстанавливаем линии рода через поколения, фиксируем годы жизни, сёла,
                переселения.
            </p>
            <p class="mb-4">
                <strong>ДНК-тесты:</strong> Генетика подтверждает или опровергает родословные и показывает степень
                родства
                между фамилиями.
                Работаем с лабораторией FamilyTreeDNA (США), используя Y-хромосомный анализ (мужская линия) и аутосомный
                тест (общее родство).
                Это позволяет восстанавливать разветвления рода, изучать миграции и связи между сёлами.
            </p>
        </div>

        <div class="max-w-[65ch] mx-auto px-4">
            <Stamp />
        </div>
    </main>
</template>
