<script setup>
import { useData } from 'vitepress';
import { capitalize } from '@/utils';

import DictWord from '@/components/DictionaryWordCard.vue';

const { params } = useData();
const { letter, words } = params.value;
</script>

<h1 :id="letter">
  <span lang="xdq">{{ capitalize(letter) }}</span>
</h1>

<DictWord v-for="w in words" :key="w.id" :word="w"/>
