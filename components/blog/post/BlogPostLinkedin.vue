<template>
  <div class="w-full flex justify-center items-center">
    <iframe
      v-if="embedUrl"
      :src="embedUrl"
      style="border: none; overflow: hidden;"
      :height="embedHeight"
      :width="embedWidth"
      frameborder="0"
      allowfullscreen
      title="Embedded LinkedIn post"
    ></iframe>
    <div v-else> Invalid LinkedIn URL </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  src: {
    type: String,
    required: true
  },
  compact: {
    type: Boolean,
    default: false
  }
})

const embedUrl = computed(() => {
  const matches = props.src.match(/activity-(\d+)/)
  if (matches && matches[1]) {
    if (isCompact.value) {
      return `https://www.linkedin.com/embed/feed/update/urn:li:activity:${matches[1]}?compact=1`
    } else {
      return `https://www.linkedin.com/embed/feed/update/urn:li:activity:${matches[1]}`
    }
  }
  return null
})


const isCompact = computed(() => props.compact)
const embedHeight = computed(() => (isCompact.value ? '399' : '690'))
const embedWidth = computed(() => (isCompact.value ? '710' : '504'))
</script>

<style scoped></style>
