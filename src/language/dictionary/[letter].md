<script setup>
import { useData } from 'vitepress';
import { capitalize } from '@/utils';
import { useDictData } from '@/composables/dictionary';

import DictWord from '@/components/DictionaryWordCard.vue';

const { params } = useData();
const letter = params.value.letter;

const { dict } = useDictData();
</script>
<!--
<div class="flex">
<span><span lang="xdq">Hello there.</span>.Hello there</span>
Hello there
</div> -->

<h1 :id="letter" class="mb-4">
  <span lang="xdq">{{ capitalize(letter) }}</span>
</h1>

<DictWord v-for="word in dict[letter]" :key="word.id" :word="word"/>
