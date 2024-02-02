<template>
  <div>
    <div class="space-y-6 lg:space-y-12">
      <CommonTitle :title="title" />
      <div
        v-if="havePosts"
        class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-8"
      >
        <BlogCard
          v-for="post in postsShowcase"
          :key="`blog-showcase-${post.id}`"
          :post="post"
        />
      </div>
      <div class="flex justify-end">
        <slot />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { TitleT } from '~/types/content'
import type { QueryBuilderParams } from '@nuxt/content/dist/runtime/types'
import type { PostCategoriesT, PostCardT } from '~/types/posts'
import { POST_CARD_PROPERTIES } from '~/types/posts'

const p = defineProps({
  title: {
    type: Object as PropType<TitleT>,
    required: true
  },
  postCategory: {
    type: String as PropType<PostCategoriesT>,
    required: true
  }
})

const postsShowcase: Ref<PostCardT[]> = ref([])
const category = computed(() => p.postCategory)
const havePosts = computed(() => postsShowcase.value.length > 0)

// Fetch posts on server and client
const { error, pending } = await useAsyncData(
  `blog-showcase-${p.postCategory}`,
  async (): Promise<void> => {
    const whereOptions: QueryBuilderParams = {
      // tags: { $in: selectedTags.value },
      status: { $eq: 'published' }
    }

    if (category.value !== 'all') {
      whereOptions.category = category.value
    }

    const posts = (await queryContent('/blog')
      .where(whereOptions)
      .only(POST_CARD_PROPERTIES)
      .sort({ publishedAt: -1 })
      .limit(3)
      .find()) as PostCardT[]

    if (posts.length) {
      postsShowcase.value.push(...posts)
    }
  }
)

if (error.value) {
  console.error('Fetch Posts Error:', error.value)
}
</script>

<style scoped></style>
