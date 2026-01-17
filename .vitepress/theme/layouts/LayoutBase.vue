<script setup lang="ts">
import Toolbar from "../components/Toolbar.vue";
import Prose from "../components/Prose.vue";
import Home from "../components/Home.vue";
import SearchButton from "../components/SearchButton.vue";
import LocaleSwitch from "../components/LocaleSwitch.vue";
import Footer from "../components/Footer.vue";
</script>

<template>
  <div class="h-screen flex flex-col bg-muted dark:bg-default">
    <slot name="header">
      <Prose class="mt-16 z-20 print:hidden">
        <Toolbar class="-ml-1.5">
          <template #leading>
            <Home />
          </template>
          <template #trailing>
            <SearchButton />
            <LocaleSwitch />
          </template>
        </Toolbar>
      </Prose>
    </slot>
    <slot />
    <slot name="footer">
      <Prose class="print:hidden mt-auto">
        <Footer class="mt-16 mb-4" />
      </Prose>
    </slot>
  </div>
</template>
