<template>
  <div class="relative w-full flex justify-center items-center md:py-12 foreground">
    <div class="flex flex-col max-w-4xl">
      <NuxtImg
        :src="`images/blog/${post.featured_image}`"
        class="md:rounded-md relative"
        width="900"
        height="480"
      />
      <div class="flex flex-col md:flex-row-reverse gap-12 items-start p-3 rounded-md w-full justify-between">
        <div class="space-x-2">
          <UBadge
            :label="post.category"
            color="primary"
            variant="solid"
            class="text-sm"
          />
          <UBadge
            v-for="tag in post.tags"
            :key="tag"
            :label="tag"
            color="secondary"
            variant="soft"
            class="text-sm"
          />
        </div>
        <BlogPostAuthor
          :author-id="post.authors[0]"
          :published-at="post.publishedAt"
        />
      </div>
      <div
        class="flex relative z-10 gap-8 flex-col items-start mx-auto w-full rounded-md max-w-[740px] pt-8 px-4"
      >
        <h1 class="text-4xl lg:text-5xl font-semibold font-[Oswald] lg:text-center">
          {{ post.title }}
        </h1>
        <div
          class="w-full p-4 lg:p-8 rounded-md border border-color bg-primary-50 dark:bg-primary-950"
        >
          <p class="text-xl">
            {{ post.description }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { PostFullT } from '~/types/posts'

defineProps({
  post: {
    type: Object as PropType<PostFullT>,
    required: true
  }
})
</script>

<style scoped></style>
