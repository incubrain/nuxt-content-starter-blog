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
import { POST_FULL_PROPERTIES, postFullSchema } from '~/types/posts'
import type { PostFullT } from '~/types/posts'

const route = useRoute()
const category = ref(String(route.params.category))
const post = ref<PostFullT | undefined>(undefined)

const { validate } = useValidation()

const { error } = await useAsyncData('post', async (): Promise<void> => {
  const p = await queryContent('/blog', category.value)
    .only(POST_FULL_PROPERTIES)
    .where({ _path: route.path })
    .findOne()
  const validPost = validate.posts(p as PostFullT, postFullSchema)
  if (!validPost) return console.error('Post failed to load')
  post.value = p as PostFullT
})

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
  
  defineOgImageComponent('NuxtSeo', {
    title: post.value.title,
    image: `images/blog/${post.value.featured_image}`
  })
}
</script>

<style></style>
