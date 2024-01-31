<template>
  <div class="w-full">
    <div
      v-if="video.src"
      class="w-full"
    >
      <div class="aspect-w-16 aspect-h-9">
        <iframe
          v-if="isYouTube || isVimeo"
          :src="videoSource"
          class="w-full h-full"
          Fill
          the
          container
          frameborder="0"
          loading="lazy"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        >
        </iframe>
        <video
          v-else
          class="w-full h-full"
          Fill
          the
          container
          controls
          :autoplay="options.autoplay"
          :loop="options.loop"
          :muted="options.autoplay"
        >
          >
          <source
            :src="video.src"
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>
      </div>
      <LazyBlogPostCaption v-if="video.caption">
        {{ video.caption }}
      </LazyBlogPostCaption>
    </div>
    <p
      v-else
      class="text-center text-gray-500"
    >
      Video not available: props {{ video }} {{ options }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { computed, defineProps } from 'vue'

type VideoOptions = {
  autoplay: boolean
  loop: boolean
}

interface Video {
  src: string
  alt: string
  caption: string
}

const p = defineProps({
  video: {
    type: Object as () => Video,
    required: true
  },
  options: {
    type: Object as () => VideoOptions,
    default: () => ({ autoplay: false, loop: false })
  }
})

const ytStrings = ['youtube.com', 'youtu.be']
const isYouTube = computed(() => ytStrings.some((link) => p.video.src.includes(link)))
const isVimeo = computed(() => p.video.src.includes('vimeo.com'))

const videoSource = computed(() => {
  if (isYouTube.value) {
    return `https://www.youtube.com/embed/${extractYoutube(p.video.src)}`
  } else if (isVimeo.value) {
    return `https://player.vimeo.com/video/${extractVimeo(p.video.src)}`
  } else {
    return p.video.src
  }
})

const extractYoutube = (src: string) => {
  const idMatch = src.match(/(youtu\.be\/|youtube\.com\/(watch\?v=|embed\/|v\/))(\w+)/)
  return (idMatch && idMatch[3]) || ''
}

const extractVimeo = (src: string) => {
  // Logic to extract video ID from YouTube or Vimeo src
  const idMatch = src.match(/vimeo\.com\/(\d+)/)
  if (!idMatch) return ''
  return idMatch[1]
}

// Support - YouTube, Vimeo, and self-hosted videos

// Basic Implementation:
// Video component
// Caption section below the video
// Responsive on all screens
// Lazy Loading

// Props - video URL/ID, video options, and caption.

// Consider:
// Autoplay - autoplay the video muted
// Controls - show controls such as play, pause, volume, and full screen.
// Loop - loop the video, good for short videos

// Edge Cases:
// - no video
// - no caption
// - unsupported platform

// Research:
// I don't think html video supports external websites such as YouTube and Vimeo. I'll need to use an embed code.
</script>

<style></style>
