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
const { isValidPost } = usePosts()
const { website } = useInfo()
const category = ref(String(route.params.category))
console.log('postCategory', route, `/blog/${category.value}/${route.params.title}`)
const post = ref<PostFullT | undefined>(undefined)


const { error } = await useAsyncData('post', async (): Promise<void> => {
  const p = await queryContent('/blog', category.value)
    .only(POST_FULL_PROPERTIES)
    .where({ _path: `/blog/${category.value}/${route.params.title}` })
    .findOne()
  const validPost = isValidPost(p as PostFullT, postFullSchema)
  if (!validPost) return console.error('Post failed to load')
  post.value = p as PostFullT
})

if (error.value) console.error(error.value)

const env = useRuntimeConfig().public
// watch process.server and trigger a function
watchEffect

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
