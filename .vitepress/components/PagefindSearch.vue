<script setup lang="ts">
import { onMounted } from "vue";

onMounted(() => {
  // Add Pagefind CSS
  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = "/pagefind/pagefind-ui.css";
  document.head.appendChild(link);

  // Add Pagefind JS and initialize
  const script = document.createElement("script");
  script.src = "/pagefind/pagefind-ui.js";
  script.onload = () => {
    // @ts-expect-error - PagefindUI is loaded dynamically
    new PagefindUI({
      element: "#pagefind-search",
      showSubResults: true,
    });
  };
  document.head.appendChild(script);
});
</script>

<template>
  <div id="pagefind-search" class="w-80"></div>
</template>
