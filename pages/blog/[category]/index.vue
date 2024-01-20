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
        v-if="havePosts"
        class="grid md:gap-4 grid-cols-1 lg:gap-8 md:grid-cols-2 h-full"
      >
        <BlogCard
          v-for="post in posts[categories.selected.value]"
          :key="`incubrain-${categories.selected.value}-post-${post.id}`"
          :post="post"
        />
        <ClientOnly>
          <BlogCardSkeleton v-show="postsLoading" />
          <BlogCardSkeleton v-show="postsLoading" />
          <BlogCardSkeleton v-show="postsLoading" />
          <div
            v-show="noMorePosts[categories.selected.value]"
            class="flex justify-center items-center w-full border border-primary-500 md:rounded-md background p-8"
          >
            <p class="foreground px-2">No More Posts...</p>
          </div>
        </ClientOnly>
      </div>
      <div
        v-else
        class="flex justify-center items-center w-full border border-primary-500 md:rounded-md background p-8"
      >
        <p class="foreground px-2">
          {{ catUpperCaseFirst }}
          Currently Has No Posts...
        </p>
      </div>
    </div>
    <ClientOnly>
      <div
        v-if="!noMorePosts[categories.selected.value]"
        ref="sentinel"
      />
      <p> {{ !noMorePosts[categories.selected.value] }}</p>
    </ClientOnly>
  </div>
</template>

<script setup lang="ts">
import type { PostCategoriesT, PostCardT, PostsInitializerT } from '~/types/posts'

const route = useRoute()
const { website, seo } = useInfo()
const categoryParam = ref(String(route.params.category))
const { categories } = useCatTag()
categories.toggle(categoryParam.value as PostCategoriesT)

const { getPosts, noMorePosts, seoErrors } = usePosts()

const catUpperCaseFirst = computed(() => {
  return categories.selected.value.slice(0, 1).toUpperCase() + categories.selected.value.slice(1)
})
const loadingState = ref(false)
const postsLoading = computed(() => loadingState.value)

const posts: PostsInitializerT = reactive(categories.initialize(() => <PostCardT[]>[]))

const havePosts = computed(() => posts[categories.selected.value].length > 0)

// Fetch initial posts
loadingState.value = true
const { data: fetchedPosts, error } = await useAsyncData(
  `posts-${categories.selected.value}`,
  (): Promise<PostCardT[] | void> => getPosts()
)

if (error.value) {
  console.error('Fetch Posts Error:', error.value)
}

watchEffect(() => {
  if (fetchedPosts.value) {
    posts[categories.selected.value] = fetchedPosts.value
    loadingState.value = false
  }
})

// Infinate Post Scroll
const getPostsOnScroll = async () => {
  console.log('getPostsOnScroll')
  if (postsLoading.value) return
  loadingState.value = true
  console.log('getPostsOnScroll 2')

  const { error } = await useAsyncData(
    `posts-${categories.selected.value}`,
    async (): Promise<void> => {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      const p = await getPosts({
        skip: posts[categories.selected.value].length + 1,
        limit: 6,
        category: categories.selected.value
      })
      if (p.length) {
        posts[categories.selected.value].push(...(p as PostCardT[]))
      }
    }
  )

  loadingState.value = false
  await new Promise((resolve) => setTimeout(resolve, 1000))

  if (error.value) {
    console.error('Client Posts Error:', error.value)
  }
}

const sentinel = ref<HTMLElement | null>(null)

watchEffect((onCleanup) => {
  if (!sentinel.value) {
    // The sentinel element is not yet in the DOM.
    return
  }

  const options = {
    root: null,
    rootMargin: '0px',
    threshold: 1.0
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        getPostsOnScroll()
      }
    })
  }, options)

  observer.observe(sentinel.value)

  // Remove Sentinel On UnMounted
  onCleanup(() => {
    if (observer && sentinel.value) {
      observer.unobserve(sentinel.value)
    }
  })
})

// SEO Error Notifications (not visible in production)
const toast = useToast()
onMounted(() => {
  if (seoErrors.value.length) {
    seoErrors.value.forEach((e) => {
      console.log('seo toast', e)
      toast.add(e)
    })

    seoErrors.value = []
  }
})

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
    title: `${website.name} ${catUpperCaseFirst.value} Blogs`,
    description: seo.blog[categories.selected.value].description,
    image: `./${seo.image}`
  })
}
</script>

<style></style>
