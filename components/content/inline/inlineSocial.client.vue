<template>
  <div class="w-full h-auto py-12">
    <LazyBlogPostInstagram
      v-if="social.platform === 'instagram'"
      :src="src"
    />
    <LazyBlogPostTwitter
      v-else-if="social.platform === 'twitter'"
      :src="src"
    />
    <LazyBlogPostGitHub
      v-else-if="social.platform === 'github'"
      :src="src"
    />
    <LazyBlogPostLinkedin
      v-else-if="social.platform === 'linkedin'"
      :src="src"
    />
    <LazyBlogPostYouTube
      v-else-if="social.platform === 'youtube'"
      :src="src"
    />
    <LazyBlogPostVimeo
      v-else-if="social.platform === 'vimeo'"
      :src="src"
    />
    <div
      v-else
      class="text-center text-gray-500"
    >
      Unsupported platform: {{ social.platform }}
    </div>
    <LazyBlogPostCaption v-if="social.caption">
      {{ social.caption }}
    </LazyBlogPostCaption>
  </div>
</template>

<script lang="ts" setup>
interface SocialPost {
  src: string
  platform: string
  caption?: string
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

// Support - GitHub, Twitter, and Instagram [x]
// added LinkedIn

// Basic Implementation:
// Platform Selection: Ability to specify the social media platform [x]
// Display protrait or landscape mode
// Responsive on all screens
// Lazy Loading [x]

// Props:
// SocialPost object with - platform, url, caption [x]

// Edge Cases:
// - no platform [x]
// - no URL [x]
// - unsupported platform [x]
</script>

<style scoped></style>
