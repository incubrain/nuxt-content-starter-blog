<template>
  <BlogPost
    v-if="post?.body"
    class="background"
    :post="post"
  />
</template>

<script setup lang="ts">
import { POST_FULL_PROPERTIES } from '~/types/posts'
import type { PostFullT } from '~/types/posts'

const route = useRoute()
const title = computed(() => String(route.params.title))
const category = computed(() => String(route.params.category))
const { website } = useInfo()

const { error, data: post } = await useAsyncData(
  `post-${title.value}`,
  () =>
    queryContent('/blog', category.value)
      .only(POST_FULL_PROPERTIES)
      .where({ _path: route.fullPath, status: { $eq: 'published' } })
      .findOne() as Promise<PostFullT>
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
