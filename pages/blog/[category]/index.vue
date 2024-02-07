<template>
  <div>
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

      <div class="grid md:gap-4 grid-cols-1 lg:gap-8 md:grid-cols-2 h-full">
        <BlogCard
          v-for="post in allPosts"
          :key="`incubrain-${categoryParam}-post-${post.id}`"
          :post="post"
        />
        <ClientOnly>
          <BlogCardSkeleton v-show="pending" />
          <BlogCardSkeleton v-show="pending" />
          <BlogCardSkeleton v-show="pending" />
          <div
            v-if="postsFinished"
            class="flex justify-center items-center w-full border border-primary-500 md:rounded-md background p-8"
          >
            <p class="foreground px-2">No more posts...</p>
          </div>
          <template #fallback>
            <p>Loading posts...</p>
          </template>
        </ClientOnly>
      </div>
    </div>
    <BlogPostInfinateScroll
      v-show="!postsFinished && !pending"
      @infinate-trigger="refresh"
    />
  </div>
</template>

<script setup lang="ts">
import type { PostCardT, PostCategoriesT } from '~/types/posts'
import type { QueryBuilderParams } from '@nuxt/content/dist/runtime/types'
import { POST_CARD_PROPERTIES, postCardSchema } from '~/types/posts'

const route = useRoute()
const categoryParam = ref(String(route.params.category) as PostCategoriesT)

const allPosts = ref<PostCardT[]>([])
const pagination = reactive({ skip: 0, limit: 10 })

const postsFinished = ref(false)

const { error, refresh, pending } = useAsyncData(
  `post-cards-${categoryParam.value}`,
  async (): Promise<void> => {
    console.log('fetching posts')
    const whereOptions: QueryBuilderParams = {
      // tags: { $in: selectedTags.value },
      status: { $eq: 'published' }
    }

    const posts = (await queryContent('/blog', categoryParam.value)
      .where(whereOptions)
      .only(POST_CARD_PROPERTIES)
      .sort({ publishedAt: -1 })
      .skip(pagination.skip)
      .limit(pagination.limit)
      .find()) as PostCardT[]

    // validate posts
    if (!posts.length || posts.length < pagination.limit) {
      postsFinished.value = true
    }
    posts.filter((post) => isValidPostCard(post))

    pagination.skip += pagination.limit
    await new Promise((resolve) => setTimeout(resolve, 1200))
    allPosts.value.push(...posts)
  }
)

// Validation & Error Handling
if (error.value) {
  console.error('Error fetching posts:', error)
}

function isValidPostCard(post: PostCardT): boolean {
  try {
    postCardSchema.parse(post)
    return true
  } catch (error) {
    console.error(`Error parsing post: ${post.title}`, error)
    return false
  }
}

// SEO
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
    title: `${website.name} ${categoryParam.value} Blogs`,
    description: seo.blog[categoryParam.value].description,
    image: `./${seo.image}`
  })
}
</script>

<style></style>
