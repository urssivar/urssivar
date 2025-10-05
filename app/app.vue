<template>
  <NuxtRouteAnnouncer />
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<style lang="css">
@import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:ital,wght@0,400;0,700;1,400;1,700&display=swap');

* {
  font-family: "IBM Plex Mono", monospace;
}

main {
  max-width: 65ch;
  margin: 0 auto;
  padding: 2rem 1rem;
  line-height: 1.6;
}

h1,
h2,
h3 {
  margin-top: 1.5em;
  margin-bottom: 0.5em;
  line-height: 1.3;
}

h1 {
  font-size: 1.5em;
}

h2 {
  font-size: 1.25em;
}

h3 {
  font-size: 1.1em;
}

p {
  margin-bottom: 1em;
}
</style>
