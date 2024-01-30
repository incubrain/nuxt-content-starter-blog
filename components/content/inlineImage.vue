<template>
  <div
    class="py-6 w-full flex flex-col justify-center items-center"
    v-if="image.src"
  >
    <NuxtImg
      :src="`images/blog/${params.category}/${image.src}`"
      :alt="image.alt || `${website.name} Blog Post Image`"
      width="700px"
      height="400px"
      class="rounded-md border border-color w-full"
    />
    <BlogPostCaption v-if="image.caption">
      {{ image.caption }}
    </BlogPostCaption>
  </div>
</template>

<script setup lang="ts">
const { website } = useInfo()
const { params } = useRoute()
type ImageProps = {
  src: string
  alt?: string
  caption?: string
}

defineProps({
  image: {
    type: Object as () => ImageProps,
    required: true,
    default: () => ({ src: '', alt: '', caption: '' })
  }
})

// Support - images from the website

// Basic Implementation:
// Props as image object containing: src, alt, and caption. [x]
// Caption below the image. [x]
// Styling - simple rounded corners and styling to caption, sufficient spacing. [x]

// Consider
// Click to enlarge
// Support external images
// Placeholder image

// edge cases
// - no image [x]
// - no alt text [x]
// - no caption [x]
// - large height [x]
// - external image

// Basic Implementation:
// NuxtImage component
// Reuse existing image interface
// Lazy Load to optimize performance.
</script>

<style scoped></style>
