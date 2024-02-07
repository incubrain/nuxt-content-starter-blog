<template>
  <div class="py-6 w-full flex flex-col justify-center items-center">
    <AppModal>
      <template #base="{ toggleOpen }">
        <div
          class="p-1 rounded-full background absolute top-4 right-4 flex justify-center items-center w-7 h-7 z-20 hover:transform hover:scale-110 transition-transform duration-300 ease-in-out"
        >
          <UIcon
            name="i-mdi-arrow-expand-all"
            class="w-5 h-5 cursor-pointer absolute z-10 text-primary"
            @click="toggleOpen"
          />
        </div>
        <MediaImage
          v-if="singleImage"
          :image="processedImages[0]"
        />
        <MediaImageCarousel
          v-else
          :images="processedImages"
        />
      </template>
      <template #modal>
        <LazyMediaImage
          v-if="singleImage"
          :image="processedImages[0]"
          :dimensions="{
            width: 1400,
            height: 800
          }"
        />
        <LazyMediaImageCarousel
          v-else
          :images="processedImages"
        />
      </template>
    </AppModal>
    <BlogPostCaption v-if="hasCaption">
      {{ caption }}
    </BlogPostCaption>
  </div>
</template>

<script setup lang="ts">
import type { ImageProps } from '~/types/inline'

const props = defineProps({
  images: {
    type: Array as () => ImageProps[],
    required: true
  },
  caption: {
    type: String,
    default: ''
  }
})

const { params } = useRoute()
const processedImages = computed(() => {
  return props.images.map((image) => {
    if (image.src.startsWith('http')) {
      return image
    } else {
      return {
        ...image,
        src: `images/blog/${params.category}/${image.src}`
      }
    }
  })
})

const hasCaption = computed(() => !!props.caption)

const singleImage = computed(() => {
  return props.images.length === 1
})

const image = computed(() => {
  return props.images[0]
})
</script>

<style></style>
