<script setup lang="ts">
import { cleanHeadword } from "@/utils";

defineProps<{
  word: {
    id: string;
    headword: string;
    ipa: string;
    tags: string[];
    forms?: string[];
    variants?: string[];
    definitions: string[];
  };
}>();
</script>

<template>
  <p :id="word.id" class="pl-3 -indent-3 m-0">
    <span lang="xdq" class="font-semibold">
      {{ word.headword }}
    </span>
    {{ " " }}
    <span class="text-xs text-toned italic">
      {{ word.tags.join(" ") }}
    </span>
    {{ " " }}
    {{ word.definitions.map((w) => w + ";").join(" ") }}
    <span lang="xdq" class="text-base text-toned font-medium">
      <span v-if="word.forms?.length"> ... {{ word.forms.join(", ") }} </span>
      <span v-if="word.variants?.length" class="italic">
        <br />
        // {{ word.variants.join(", ") }}
      </span>
    </span>
  </p>
</template>
