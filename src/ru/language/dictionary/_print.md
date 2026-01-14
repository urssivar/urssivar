---
numbered: true
---

<script setup>
import { capitalize } from '@/utils';
import DictWord from '@/components/DictionaryWord.vue';
import Intro from './index.md';
import { useDictData } from '@/composables/dictionary';
import Stamp from '@/components/Stamp.vue';

const { dict } = useDictData();
</script>

<Intro indexMode="print" />

<div class='columns-2 break-before-page'>
    <template v-for="(words, letter) in dict">
        <h2 :id="letter" lang="xdq" class="mb-4">
            {{ capitalize(letter) }}
        </h2>
        <DictWord v-for="word in words" :key="word.id" :word="word"/>
    </template>
</div>

<Stamp />
