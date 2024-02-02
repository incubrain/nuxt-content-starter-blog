<template>
  <div class="max-w-lg mx-auto overflow-hidden">
    <blockquote
      class="instagram-media dark:invert p-4"
      :key="embedContainerKey"
      :data-instgrm-permalink="cleanUrl"
      data-instgrm-version="14"
      :data-instgrm-captioned="options.caption"
      data-width="100%"
      :style="{
        background: '#000',
        border: 0,
        borderRadius: '3px',
        boxShadow: '0 0 1px 0 rgba(0, 0, 0, 0.5), 0 1px 10px 0 rgba(0, 0, 0, 0.15)',
        margin: '1px',
        maxWidth: '540px',
        minWidth: '326px',
        padding: 0,
        width: '100%'
      }"
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
const isDark = useColorMode().value === 'dark'
const themeColor = computed(() => {
  return isDark ? '#000' : '#fff'
})

console.log('isDark', isDark, themeColor.value)

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

const cleanUrl = computed(() => {
  if (!props.src.length || typeof props.src !== 'string') {
    console.error('Invalid URL provided:', props.src)
    return ''
  }

  try {
    const url = new URL(props.src)
    return `${url.origin}${url.pathname}${
      url.pathname.endsWith('/') ? '' : '/'
    }?utm_source=ig_embed&amp;utm_campaign=loading`
  } catch (error) {
    console.error('Error parsing URL:', props.src, error)
    return ''
  }
})

const uuid = useId()

const embedContainerKey = computed(() => {
  return `embed-container-${uuid}`
})

const embedContentKey = computed(() => {
  return `instagram-embed-${uuid}`
})

onMounted(() => {
  // Check if Instagram's script is loaded and instgrm object is available
  if (window.instgrm && window.instgrm.Embeds) {
    window.instgrm.Embeds.process()
    console.log('igEmbed', window.instgrm)
    // [Exception: TypeError: 'caller', 'callee', and 'arguments' properties may not be accessed on strict mode functions or the arguments objects for calls to them at Function.invokeGetter (<anonymous>:3:28)]
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
</script>

<style scoped>
.instagram-media {
  margin: 0 !important;
  padding: 0 !important;
}

.SocialProof {
  background-color: aqua !important;
}

.Footer {
  background-color: aqua !important;
}
</style>
