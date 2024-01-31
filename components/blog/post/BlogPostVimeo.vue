<template>
  <div
    v-if="src"
    class="w-full aspect-w-16 aspect-h-9"
  >
    <iframe
      v-if="isVimeo"
      :src="videoSource"
      class="w-full h-full"
      frameborder="0"
      loading="lazy"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowfullscreen
    ></iframe>
  </div>
</template>

<script setup lang="ts">
import { computed, defineProps } from 'vue'

const props = defineProps({
  src: {
    type: String,
    required: true
  }
})

const isVimeo = computed(() => props.src.includes('vimeo.com'))

const videoSource = computed(() => {
  if (isVimeo.value) {
    return `https://player.vimeo.com/video/${extractVimeo(props.src)}`
  } else {
    return ''
  }
})

const extractVimeo = (src: string) => {
  const idMatch = src.match(/vimeo\.com\/(\d+)/)
  return (idMatch && idMatch[1]) || ''
}
</script>
