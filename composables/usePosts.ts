import type { QueryBuilderParams } from '@nuxt/content/dist/runtime/types'
import type { PostCategoriesT, PostCardT, PostFullT } from '~/types/posts'

import { postCardSchema, POST_CARD_PROPERTIES, postFullSchema } from '~/types/posts'

const postsToFetch = 6
const { categories } = useCatTag()

export default () => {
  const posts = useState('posts', () => reactive(categories.initialize(() => [] as PostCardT[])))
  const postsLoading = useState('post-loading', () => false as Boolean)
  const postsFinished: Ref<Record<PostCategoriesT, boolean>> = useState('posts-left', () =>
    reactive(categories.initialize(() => false))
  )

  function isValidPost(
    post: PostCardT | PostFullT,
    schema: typeof postCardSchema | typeof postFullSchema
  ): boolean {
    try {
      schema.parse(post)
      return true
    } catch (error) {
      console.error('Error parsing post:', error)
      return false
    }
  }

  const fetchPosts = async ({
    skip,
    limit,
    category
  }: {
    skip: number
    limit: number
    category: PostCategoriesT
  }): Promise<PostCardT[]> => {
    //
    const whereOptions: QueryBuilderParams = {
      // tags: { $in: selectedTags.value },
      status: { $eq: 'published' }
    }

    if (category !== 'all') {
      whereOptions.category = category
    }
    try {
      const postsFetched = await queryContent('/blog')
        .where(whereOptions)
        .only(POST_CARD_PROPERTIES)
        .sort({ publishedAt: -1 })
        .skip(skip)
        .limit(limit)
        .find()

      console.log('postsFetched', postsFetched)
      return postsFetched as PostCardT[]
    } catch (error) {
      console.error('Error fetching posts:', error)
      return []
    }
  }

  const getPosts = async ({
    limit = postsToFetch,
    skip = 0,
    category = categories.selected.lower.value,
    isShowcase = false
  } = {}): Promise<[] | PostCardT[]> => {
    try {
      const newPosts = await fetchPosts({
        category,
        skip,
        limit
      })

      if (newPosts.length < limit && !isShowcase) {
        postsFinished.value[category] = true
      }

      const validPosts = newPosts.filter((post) => isValidPost(post as PostCardT, postCardSchema))
      if (!validPosts.length) return []
      return validPosts as PostCardT[]
    } catch (error) {
      console.error('Failed to get posts:', error)
      return []
    }
  }

  const getInitialPosts = async () => {
    if (posts.value[categories.selected.lower.value].length > 0) return
    const data = await getPosts()

    if (data?.length) {
      posts.value[categories.selected.lower.value] = data
    }
  }

  const getPostsOnScroll = async () => {
    if (postsLoading.value) return
    postsLoading.value = true

    const p = await getPosts({
      skip: posts.value[categories.selected.lower.value].length + 1,
      limit: 6,
      category: categories.selected.lower.value
    })

    await new Promise((resolve) => setTimeout(resolve, 1200))

    if (p?.length) {
      posts.value[categories.selected.lower.value].push(...(p as PostCardT[]))
      postsLoading.value = false
    }
  }

  return {
    getPosts,
    posts,
    postsFinished: computed(() => postsFinished.value[categories.selected.lower.value]),
    postsLoaded: computed(() => posts.value[categories.selected.lower.value].length > 0),
    postsLoading,
    isValidPost,
    getInitialPosts,
    getPostsOnScroll
  }
}
