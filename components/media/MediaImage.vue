<template>
  <NuxtImg
    :src="image.src"
    :alt="image.alt || `${website.name} Blog Post Image`"
    :width="dimensions.width"
    :height="dimensions.height"
    class="w-full"
  />
</template>

<script setup lang="ts">
import type { ImageProps } from '~/types/inline'
const { website } = useInfo()

const props = defineProps({
  image: {
    type: Object as () => ImageProps,
    required: true
  },
  dimensions: {
    type: Object as () => Record<string, number>,
    default: () => ({ width: 700, height: 400 })
  },
  height: {
    type: Number,
    default: null
  }
})
</script>

<style></style>
