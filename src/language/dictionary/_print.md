<script setup>
import { capitalize } from '@/utils';
import DictWord from '@/components/DictionaryWord.vue';
import DictIndex from '@/components/DictionaryIndex.vue';
import { useDictData } from '@/composables/dictionary';
import Stamp from '@/components/Stamp.vue';

const { dict } = useDictData();
</script>

<!--@include: ./_intro.md-->

<DictIndex variant="print"/>

<div class='columns-2 break-before-page'>
    <template v-for="(words, letter) in dict">
        <h2 :id="letter" lang="xdq" class="mb-4">
            {{ capitalize(letter) }}
        </h2>
        <DictWord v-for="word in words" :key="word.id" :word="word"/>
    </template>
</div>

<Stamp />
