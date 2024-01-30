<template>
  <div class="twitter-embed-container flex justify-center items-center w-full">
    <blockquote
      class="twitter-tweet mx-auto"
      data-media-max-width="560"
      :data-tweet-id="tweetId"
      :data-theme="theme"
      :data-lang="lang"
    >
      <!-- The content inside blockquote is a fallback and may not be displayed -->
      <p>Loading tweet...</p>
      <a :href="`https://twitter.com/${username}/status/${tweetId}`"></a>
    </blockquote>
  </div>
</template>

<script setup lang="ts">
const theme = 'light'
const lang = 'en'

const p = defineProps({
  src: {
    type: String,
    required: true
  }
})

const tweetId = computed(() => {
  const match = p.src.match(/status\/(\d+)/)
  return match ? match[1] : ''
})

const username = computed(() => {
  const match = p.src.match(/twitter.com\/([\w]+)/)
  return match ? match[1] : ''
})

onMounted(() => {
  // If Twitter's widgets.js is already loaded, we need to manually call
  // twttr.widgets.load() to render the tweet.
  if (window.twttr && window.twttr.widgets) {
    window.twttr.widgets.load()
  }
})

useHead({
  script: [
    {
      src: 'https://platform.twitter.com/widgets.js',
      async: true,
      defer: true
    }
  ]
})
</script>

<style scoped>
/* Add any specific styles for your twitter embed container here */
</style>
