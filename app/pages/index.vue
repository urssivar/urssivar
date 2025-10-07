<script setup lang="ts">
useSeoMeta({
    title: 'Urssivar: Kaitag Studies',
    description: 'Resources & technologies for preserving and studying Kaitag language, culture, history, and people.',
});
</script>

<template>
    <main class="leading-relaxed">
        <div class="max-w-[65ch] mx-auto px-4">
            <nav class="flex gap-3 flex-wrap mb-8">
                Eng
                <NuxtLink to="/ru" class="text-blue-600 dark:text-blue-300 hover:underline">Рус</NuxtLink>
                <span>/</span>
                <NuxtLink to="https://t.me/urssivar" target="_blank"
                    class="text-blue-600 dark:text-blue-300 hover:underline">Telegram</NuxtLink>
                <NuxtLink to="https://youtube.com/@urssivar" target="_blank"
                    class="text-blue-600 dark:text-blue-300 hover:underline">YouTube</NuxtLink>
                <NuxtLink to="https://github.com/urssivar" target="_blank"
                    class="text-blue-600 dark:text-blue-300 hover:underline">GitHub</NuxtLink>
            </nav>

            <h1 class="text-2xl font-bold mt-0 mb-2 leading-snug">Urssivar: Kaitag Studies</h1>

            <p class="mb-4"><i lang="xdq">Nallara del da. Ham ra bel.</i></p>

            <p class="mb-4">
                We collect words, record stories, restore family trees, and conduct DNA testing.
                <strong>Time is running out</strong> — this is the last chance to preserve what remains.
                Every forgotten word, every lost lineage is a fragment of heritage that will disappear forever.
            </p>
        </div>

        <div class="w-full">
            <ClientOnly>
                <VillageMap />
            </ClientOnly>
        </div>

        <div class="max-w-[65ch] mx-auto px-4">
            <p class="mb-4">
                We're building a foundation for future research on Kaitag.
                With enough data, linguists will be able to classify dialects and understand how the language
                developed,
                while geneticists can verify legends about village origins and reconstruct the ancient history of
                the
                people.
                All of this depends <strong>on us.</strong>
            </p>
            <h2 class="text-xl font-bold mt-6 mb-2 leading-snug">
                <NuxtLink to="https://codex.urssivar.com" class="text-blue-600 dark:text-blue-300 hover:underline">
                    Kaitag Language</NuxtLink>
            </h2>
            <p class="mb-4">
                We're recording living Kaitag speech and creating an archive of original texts: tales, stories,
                songs,
                proverbs —
                everything that will disappear forever without documentation now, while the last generation of
                speakers
                is
                still alive.
            </p>
            <p class="mb-4">
                <strong>Dictionary:</strong> A lexical database of the Kaitag language by villages and
                micro-regions.
                Base corpus of 5,000 words, expanding through contributions from native speakers.
            </p>
            <p class="mb-4">
                <strong>Oral texts:</strong> Natural speech — stories, memories, descriptions of daily life and
                traditions,
                dialogues, prayers. We document not only vocabulary, but also patterns of thought, speech style, and
                culture.
            </p>

            <h2 class="text-xl font-bold mt-6 mb-2 leading-snug">
                <NuxtLink to="https://www.familytreedna.com/groups/kaitag/about"
                    class="text-blue-600 dark:text-blue-300 hover:underline">Kaitag Genealogy</NuxtLink>
            </h2>
            <p class="mb-4">
                We compile family trees — names, lifespans, villages, migrations.
                We use DNA testing to establish origins and kinship connections.
            </p>
            <p class="mb-4">
                <strong>Family trees:</strong> We trace lineages backward through generations, documenting years of
                life,
                villages, and migrations.
            </p>
            <p class="mb-4">
                <strong>DNA tests:</strong> Genetics confirms or refutes genealogies and shows the degree of kinship
                between
                families.
                We work with FamilyTreeDNA laboratory (USA), using Y-chromosomal analysis (paternal line) and
                autosomal
                testing (general ancestry).
                This allows us to reconstruct branches within clans, study migrations, and trace connections between
                villages.
            </p>
        </div>

        <div class="max-w-[65ch] mx-auto px-4">
            <Stamp />
        </div>
    </main>
</template>
