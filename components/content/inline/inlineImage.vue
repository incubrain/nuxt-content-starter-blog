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
      class="rounded-md border border-color w-full cursor-pointer transition duration-500 ease-in-out transform hover:scale-105"
      @click="isOpen = true"
    />
    <LazyBlogPostCaption v-if="hasCaption">
      {{ image.caption }}
    </LazyBlogPostCaption>
    <UModal
      v-model="isOpen"
      fullscreen
      :ui="{
        background: '',
        fullscreen: 'w-[minmax(300px,1400px)] h-auto'
      }"
    >
      <div class="w-full h-auto rounded-md overflow-hidden background">
        <NuxtImg
          :src="`images/blog/${params.category}/${image.src}`"
          :alt="image.alt || `${website.name} Blog Post Image`"
          class="transition duration-500 ease-in-out"
          width="1400px"
          height="auto"
        />
        <LazyBlogPostCaption
          v-if="hasCaption"
          class="p-2"
        >
          {{ image.caption }}
        </LazyBlogPostCaption>
        <div
          class="background p-4 rounded-full absolute top-4 right-4 flex justify-center items-center border border-color"
        >
          <UButton
            variant="link"
            class="absolute"
            icon="i-mdi-close"
            aria-label="Close image modal"
            @click="isOpen = false" 
          />
        </div>
      </div>
    </UModal>
  </div>
</template>

<script setup lang="ts">
const { website } = useInfo()
const { params } = useRoute()

const isOpen = ref(false)

type ImageProps = {
  src: string
  alt?: string
  caption?: string
  width?: number
  height?: number
}

const p = defineProps({
  image: {
    type: Object as () => ImageProps,
    required: true,
    default: () => ({ src: '', alt: '', caption: '' })
  }
})

const hasCaption = computed(() => !!p.image.caption)
</script>

<style></style>
