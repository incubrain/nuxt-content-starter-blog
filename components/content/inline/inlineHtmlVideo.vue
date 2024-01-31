<template>
  <div
    class="w-full"
    v-if="video.src"
  >
    <div class="w-full aspect-w-16 aspect-h-9 rounded-md overflow-hidden">
      <video
        class="w-full h-full"
        controls
        :autoplay="options.autoplay"
        :loop="options.loop"
        :muted="options.muted"
        :playsinline="options.playsinline"
      >
        <source
          :src="`/${video.src}`"
          :type="videoType"
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
    Video not available
  </p>
</template>

<script setup lang="ts">
type VideoOptions = {
  autoplay?: boolean
  loop?: boolean
  controls?: boolean
  muted?: boolean
  playsinline?: boolean
}

interface Video {
  src: string
  caption: string
}

const p = defineProps({
  video: {
    type: Object as () => Video,
    required: true
  },
  options: {
    type: Object as () => VideoOptions,
    default: () => ({
      autoplay: false,
      loop: false,
      controls: false,
      muted: false,
      playsinline: false
    })
  }
})

const videoType = computed(() => {
  const ext = p.video.src.split('.').pop()
  return `video/${ext}`
})
</script>
