---
layout: print
---

<script setup>
import { useDictData } from '@/composables/dictionary';
// import { navTree } from '@/composables/nav';
import { capitalize } from '@/utils';
import PrintSection from '@/components/PrintSection.vue';
// import LangIntro from './index.md';
// import GrammarIntro from './grammar/index.md';
import Intro from './_intro.md';
import DictIntro from './dictionary/index.md';
import DictionaryWord from '@/components/DictionaryWord.vue';
import Stamp from "@/components/Stamp.vue";
import Home from "@/theme/components/Home.vue";

// const grammarPages = import.meta.glob('./grammar/!(index).md', {
//   eager: true
// });
const { dict, letters } = useDictData();

// const language = navTree.children.find(c => c.path === 'language');
// const grammar = language?.children?.find(c => c.path === 'grammar');
// const grammarArticles = (grammar?.children ?? [])
//   .map(child => {
//     const path = `grammar/${child.path}`;
//     return {
//       path,
//       component: grammarPages[`./${path}.md`]?.default,
//     };
//   })
//   .filter(e => e.component);
</script>

<PrintSection class="break-after-page">
  <div class="print:-mx-18 mb-16">
    <img class="w-full object-cover h-120 invert-10 dark:invert-100" src="/assets/map.webp" />
  </div>
  <Intro />
</PrintSection>

<!-- <PrintSection>
  <LangIntro />
</PrintSection> -->

<!-- <PrintSection path="grammar">
  <GrammarIntro />
</PrintSection>

<PrintSection v-for="entry in grammarArticles" :key="entry.path" :path="entry.path" :shift="1">
  <component :is="entry.component" />
</PrintSection> -->

<PrintSection path="dictionary">
  <Home class="mb-16" />
  <DictIntro />
</PrintSection>

<div class="columns-2 break-before-page">
  <template v-for="letter in letters.slice(0, 3)" :key="letter">
    <PrintSection :path="`dictionary/${letter}`">
      <h2 class="mb-4">{{ capitalize(letter) }}</h2>
      <DictionaryWord v-for="w in dict[letter]" :key="w.id" :word="w" />
    </PrintSection>
  </template>
</div>

<Stamp />
