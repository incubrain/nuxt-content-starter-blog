<template>
  <div class="max-w-lg mx-auto border border-gray-300 rounded-lg overflow-hidden">
    <blockquote
      class="instagram-media p-4"
      :key="embedContainerKey"
      :data-instgrm-permalink="cleanUrl"
      data-instgrm-version="14"
      :data-instgrm-captioned="options.caption"
      data-width="100%"
      style="
        background: #fff;
        border: 0;
        border-radius: 3px;
        box-shadow: 0 0 1px 0 rgba(0, 0, 0, 0.5), 0 1px 10px 0 rgba(0, 0, 0, 0.15);
        margin: 1px;
        max-width: 540px;
        min-width: 326px;
        padding: 0;
        width: 99.375%;
        width: -webkit-calc(100% - 2px);
        width: calc(100% - 2px);
      "
    >
      <div
        :id="embedContentKey"
        style="padding: 16px"
        class="hidden"
      >
      </div>
    </blockquote>
  </div>
</template>

<script setup lang="ts">
import { v4 as uuidv4 } from 'uuid'

interface IgOptions {
  caption?: boolean
}

const props = defineProps({
  src: {
    type: String,
    required: true
  },
  options: {
    type: Object as PropType<IgOptions>,
    required: false,
    default: () => ({ caption: undefined })
  }
})

// handle these types of urls
// https://www.instagram.com/reel/C2uQ4lWRu7r/?utm_source=ig_web_copy_link
// https://www.instagram.com/p/C2hyDvuIA_q/?utm_source=ig_web_copy_link

// Extracts the base URL (without query parameters) and ensures it ends with a slash

console.log('props.src', props.src)
const cleanUrl = computed(() => {
  if (!props.src.length || typeof props.src !== 'string') {
    console.error('Invalid URL provided:', props.src)
    return ''
  }

  try {
    const url = new URL(props.src)
    console.log('urlStart', url)
    return `${url.origin}${url.pathname}${
      url.pathname.endsWith('/') ? '' : '/'
    }?utm_source=ig_embed&amp;utm_campaign=loading`
  } catch (error) {
    console.error('Error parsing URL:', props.src, error)
    return ''
  }
})

console.log('cleanUrl', cleanUrl.value)

const uuid = uuidv4()

const embedContainerKey = computed(() => {
  return `embed-container-${uuid}`
})

const embedContentKey = computed(() => {
  return `instagram-embed-${uuid}`
})

console.log('embedContainerKey', embedContainerKey.value)

onMounted(() => {
  // Check if Instagram's script is loaded and instgrm object is available
  if (window.instgrm && window.instgrm.Embeds) {
    window.instgrm.Embeds.process()
  }
})

useHead({
  script: [
    {
      src: 'https://www.instagram.com/embed.js',
      async: true,
      defer: true
    }
  ]
})
// cleanUrl.value
// https://www.instagram.com/p/C2hyDvuIA_q/?utm_source=ig_embed&amp;utm_campaign=loading

// desired output structure
// https://www.instagram.com/p/C2uQ4lWRu7r/?utm_source=ig_embed&amp;utm_campaign=loading

// converted from react
</script>

<style></style>
