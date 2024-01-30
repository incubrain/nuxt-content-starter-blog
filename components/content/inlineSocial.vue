<template>
  <div class="w-full h-auto py-12">
    <BlogPostInstagram
      v-if="social.platform === 'instagram'"
      :src="src"
    />
    <BlogPostTwitter
      v-else-if="social.platform === 'twitter'"
      :src="src"
    />
    <BlogPostGitHub
      v-else-if="social.platform === 'github'"
      :src="src"
    />
    <BlogPostLinkedin
      v-else-if="social.platform === 'linkedin'"
      :src="src"
    />
    <div v-else class="text-center text-gray-500">
      Unsupported platform: {{ social.platform }}
    </div>
  </div>
</template>

<script lang="ts" setup>
interface SocialPost {
  src: string
  platform: string
}

const p = defineProps({
  social: {
    type: Object as () => SocialPost,
    required: true
  }
})

const src = computed(() => {
  return p.social.src
})

// Support - GitHub, Twitter, and Instagram

// Basic Implementation:
// Platform Selection: Ability to specify the social media platform
// Display protrait or landscape mode
// Responsive on all screens
// Lazy Loading

// Props:
// SocialPost object with - platform, url, caption

// Edge Cases:
// - no platform
// - no URL
// - unsupported platform

// Consider:
// Interactive Elements - Follow Buttons, Like Buttons, and Share Buttons. I might be able to do this without API access.

// Research:
// Is their existing implementations I can learn from
// Interactive elements
</script>

<style scoped></style>
