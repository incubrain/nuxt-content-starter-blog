<template>
  <div>
    <div class="space-y-6 lg:space-y-12">
      <CommonTitle :title="title" />
      <div
        v-if="havePosts"
        class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-8"
      >
        <BlogCard
          v-for="post in postsShowcase[postType]"
          :key="post.title"
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
import type { PostCategoriesT, PostCardT, PostsInitializerT } from '~/types/posts'

const p = defineProps({
  title: {
    type: Object as PropType<TitleT>,
    required: true
  },
  postType: {
    type: String as PropType<PostCategoriesT>,
    required: true
  }
})

const { categories } = useCatTag()
const postsShowcase: PostsInitializerT = reactive(categories.initialize(() => <PostCardT[]>[]))
const havePosts = computed(() => postsShowcase[p.postType].length > 0)

const { getPosts } = usePosts()

// Fetch posts on server and client
const { data: fetchedPosts, error } = await useAsyncData(
  `blog-showcase-${p.postType}`,
  (): Promise<PostCardT[] | void> => getPosts({ limit: 3, skip: 0, category: p.postType })
)

if (error.value) {
  console.error('Fetch Posts Error:', error.value)
}

// Use the fetchedPosts for rendering, which will be consistent across server and client
watchEffect(() => {
  if (fetchedPosts.value) {
    postsShowcase[p.postType] = fetchedPosts.value
  }
})

</script>

<style scoped></style>
