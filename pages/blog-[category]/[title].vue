<template>
  <div class="relative background">
    <div class="flex flex-col justify-center relative">
      <BlogPost
        v-if="post?.body"
        :post="post"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { POST_FULL_PROPERTIES } from '~/types/posts'
import type { PostFullT } from '~/types/posts'

const route = useRoute()
const { website } = useInfo()
const category = ref(String(route.params.category))
const post = ref<PostFullT | undefined>(undefined)
// !todo refactor, figure out why it's not reactive on Vercel

async function fetchPost(category: string, title: string) {
  const p = await queryContent('/blog', category)
    .only(POST_FULL_PROPERTIES)
    .where({ _path: `/blog/${category}/${title}` })
    .findOne()
  return p as PostFullT
}

// Initial fetch
const { error } = await useAsyncData('post', async () => {
  const p = await fetchPost(category.value, String(route.params.title))
  post.value = p as PostFullT
})

// Watch for route changes and re-fetch post data
watch(
  () => route.params,
  async (newParams, oldParams) => {
    if (newParams.title !== oldParams.title) {
      category.value = String(newParams.category)
      console.log('refetching post', newParams.title)
      await fetchPost(category.value, String(newParams.title))
    }
  },
  { deep: true }
)

if (error.value) console.error(error.value)

const env = useRuntimeConfig().public

if (post.value) {
  useSeoMeta({
    title: post.value.title,
    ogTitle: post.value.title,
    description: post.value.description,
    ogDescription: post.value.description,
    ogImage: `${env.baseURL}images/blog/${post.value.featured_image}`,
    twitterCard: 'summary_large_image',
    twitterTitle: post.value.title,
    twitterDescription: post.value.description,
    twitterImage: `${env.baseURL}images/blog/${post.value.featured_image}`
  })

  defineOgImageComponent('OgImageDefault', {
    title: post.value.title,
    description: post.value.description,
    headline: website.name,
    image: `images/blog/${post.value.featured_image}`
  })
}
</script>

<style></style>
