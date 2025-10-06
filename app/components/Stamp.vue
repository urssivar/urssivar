<template>
  <img src="/stamp.png" alt="" class="stamp" aria-hidden="true">
</template>

<style scoped>
.stamp {
  display: block;
  float: right;
  margin: 2rem 0 1rem 2rem;
  width: calc(65ch / 3);
  opacity: 0.3;
  filter: invert(1);
  transform: rotate(15deg);
  user-select: none;
  pointer-events: none;
}

@media (prefers-color-scheme: dark) {
  .stamp {
    filter: invert(0);
  }
}
</style>
