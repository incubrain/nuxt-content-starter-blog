<template>
  <div class="relative py-8 flex justify-center items-center w-full">
    <div class="absolute p-2 rounded-full foreground border border-color">
      <NuxtImg
        :src="`${info.website.logo}`"
        :alt="`${info.website.name} logo inline separator`"
        class="dark:invert"
        width="36"
        height="36"
      />
    </div>
    <hr class="w-full border-color">
  </div>
</template>

<script setup lang="ts">
const info = useInfo()

</script>
