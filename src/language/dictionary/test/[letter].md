<script setup>
import { useData } from 'vitepress';
import { onMounted } from 'vue';
import { capitalize } from '@/utils';
import { useDictData } from '@/composables/useDictData';

import DictWord from '@/components/DictWord.vue';

const { params } = useData();
const letter = params.value.letter;

const { dict } = useDictData();

onMounted(() => {
    const title = document.title.split(' | ');
    document.title = capitalize(letter) + ' | ' + title[title.length - 1];
});
</script>

<h1 class="mb-4 text-4xl" lang="xdq"> {{ capitalize(letter) }} </h1>

<DictWord v-for="word in dict[letter]" :key="word.id" :word="word"/>
