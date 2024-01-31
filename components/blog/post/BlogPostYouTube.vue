<template>
  <div
    v-if="src"
    class="w-full aspect-w-16 aspect-h-9"
  >
    <iframe
      v-if="isYouTube"
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
const props = defineProps({
  src: {
    type: String,
    required: true
  }
})

const isYouTube = computed(
  () => props.src.includes('youtube.com') || props.src.includes('youtu.be')
)

const videoSource = computed(() => {
  if (isYouTube.value) {
    return `https://www.youtube.com/embed/${extractYoutube(props.src)}`
  } else {
    return ''
  }
})

const extractYoutube = (src: string) => {
  const idMatch = src.match(/(youtu\.be\/|youtube\.com\/(watch\?v=|embed\/|v\/))(\w+)/)
  return (idMatch && idMatch[3]) || ''
}
</script>
