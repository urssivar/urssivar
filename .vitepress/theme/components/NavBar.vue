<template>
  <div>
    <div class="mx-auto w-full md:w-[calc(65ch)] print:w-full">
      <nav class="px-6 sm:px-12 md:px-0 -mx-1.5 flex items-center gap-4 h-16">
        <slot name="leading" />
        <div class="flex flex-row grow">
          <slot />
        </div>
        <slot name="trailing" />
      </nav>
    </div>
  </div>
</template>
