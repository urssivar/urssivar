<script setup>
import { capitalize } from '@/utils';
import DictWord from '@/components/DictionaryWord.vue';
import DictIndex from '@/components/DictionaryIndex.vue';
import { useDictData } from '@/composables/dictionary';

const { dict } = useDictData();
</script>

<!--@include: ./intro_.md-->

<DictIndex mode="print"/>

<div class='columns-2 break-before-page'>
    <template v-for="(words, letter) in dict">
        <h2 :id="letter">
            {{ capitalize(letter) }}
        </h2>
        <DictWord v-for="word in words" :key="word.id" :word="word"/>
    </template>
</div>
