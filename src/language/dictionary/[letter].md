<script setup>
import { useData } from 'vitepress';
import { capitalize } from '@/utils';
import { useDictData } from '@/composables/dictionary';

import DictWord from '@/components/DictionaryWordCard.vue';

const { params } = useData();
const letter = params.value.letter;

const { dict } = useDictData();
</script>

<h1 :id="letter">
  <span lang="xdq">{{ capitalize(letter) }}</span>
</h1>

<DictWord v-for="word in dict[letter]" :key="word.id" :word="word"/>
