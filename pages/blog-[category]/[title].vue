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

const { error, data: fetchedPost } = await useAsyncData('post', async (): Promise<PostFullT> => {
  const p = await queryContent('/blog', category.value)
    .only(POST_FULL_PROPERTIES)
    .where({ _path: `/blog/${category.value}/${route.params.title}` })
    .findOne()
  return p as PostFullT
})

if (error.value) console.error(error.value)

watchEffect(() => {
  if (fetchedPost.value) {
    post.value = fetchedPost.value
  }
})

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
