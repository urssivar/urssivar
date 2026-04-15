---
layout: print
---

<script setup>
import { useDictData } from '@/composables/dictionary';
import { navTree } from '@/composables/nav';
import { capitalize } from '@/utils';
import PrintSection from '@/components/PrintSection.vue';
import LangIntro from './index.md';
import GrammarIntro from './grammar/index.md';
import DictIntro from './dictionary/index.md';
import DictionaryWord from '@/components/DictionaryWord.vue';

const grammarPages = import.meta.glob('./grammar/!(index).md', {
  eager: true
});
const { dict, letters } = useDictData();

const language = navTree.children.find(c => c.path === 'language');
const grammar = language?.children?.find(c => c.path === 'grammar');
const grammarArticles = (grammar?.children ?? [])
  .map(child => {
    const path = `grammar/${child.path}`;
    return {
      path,
      component: grammarPages[`./${path}.md`]?.default,
    };
  })
  .filter(e => e.component);
</script>

<!-- <PrintSection>
  <LangIntro />
</PrintSection>

<PrintSection path="grammar">
  <GrammarIntro />
</PrintSection>

<PrintSection v-for="entry in grammarArticles" :key="entry.path" :path="entry.path" :shift="1">
  <component :is="entry.component" />
</PrintSection> -->

<PrintSection path="dictionary">
  <DictIntro />
</PrintSection>

<div class="columns-2 break-before-page">
  <template v-for="letter in letters" :key="letter">
    <PrintSection :path="`dictionary/${letter}`">
      <h2>{{ capitalize(letter) }}</h2>
      <DictionaryWord v-for="w in dict[letter]" :key="w.id" :word="w" />
    </PrintSection>
  </template>
</div>
