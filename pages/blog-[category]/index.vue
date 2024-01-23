<template>
  <div ref="infinateBlogs">
    <CommonHero
      :img="{
        title: `${website.name} blog icon`,
        src: 'images/icons/blog-icon.svg',
        alt: `${website.name} blog icon`,
        width: 140,
        height: 140
      }"
      :title="{
        main: `${website.name.toLocaleUpperCase()} BLOG`,
        subtitle: `If you're not learning, you're not growing.`
      }"
      invert
    />
    <div class="wrapper p-4 lg:p-8">
      <BlogFilter />
    </div>
    <div
      class="wrapper md:px-4 lg:px-8 lg:pb-8 grid grid-cols-1 lg:grid-cols-[0.5fr_1fr] items-start w-full md:gap-4 lg:gap-8 relative"
    >
      <BlogAdFloat />

      <div
        v-if="postsLoaded"
        class="grid md:gap-4 grid-cols-1 lg:gap-8 md:grid-cols-2 h-full"
      >
        <BlogCard
          v-for="post in posts[categories.selected.lower.value]"
          :key="`incubrain-${categories.selected.lower.value}-post-${post.id}`"
          :post="post"
        />
        <ClientOnly>
          <BlogCardSkeleton v-show="loading" />
          <BlogCardSkeleton v-show="loading" />
          <BlogCardSkeleton v-show="loading" />
          <div
            v-show="postsFinished"
            class="flex justify-center items-center w-full border border-primary-500 md:rounded-md background p-8"
          >
            <p class="foreground px-2">No more posts...</p>
          </div>
        </ClientOnly>
      </div>
      <div
        v-else
        class="flex justify-center items-center w-full border border-primary-500 md:rounded-md background p-8"
      >
        <p class="foreground px-2">
          {{ categories.selected.upperFirst.value }}
          has no posts...
        </p>
      </div>
    </div>
    <BlogPostInfinateScroll v-if="!postsFinished" />
  </div>
</template>

<script setup lang="ts">
import type { PostCategoriesT } from '~/types/posts'

const { posts, getInitialPosts, postsLoading, postsFinished, postsLoaded } = usePosts()

const loading = toRef(postsLoading)

const route = useRoute()
const categoryParam = ref(String(route.params.category))

console.log('categoryParam', categoryParam.value)

const { categories } = useCatTag()
categories.toggle(categoryParam.value as PostCategoriesT)

await getInitialPosts()

const { website, seo } = useInfo()
if (website && seo) {
  useSeoMeta({
    title: `${website.name} Blog`,
    ogTitle: `${website.name} Blog`,
    description: `${website.name} Blog`,
    ogDescription: `${website.name} Blog`,
    ogImage: `${website.url}/images/icons/blog-icon.svg`,
    twitterCard: 'summary_large_image',
    twitterTitle: `${website.name} Blog`,
    twitterDescription: `${website.name} Blog`,
    twitterImage: `${website.url}/images/icons/blog-icon.svg`
  })

  defineOgImageComponent('OgImageDefault', {
    title: `${website.name} ${categories.selected.upperFirst.value} Blogs`,
    description: seo.blog[categories.selected.lower.value].description,
    image: `./${seo.image}`
  })
}
</script>

<style></style>
