import type { QueryBuilderParams } from '@nuxt/content/dist/runtime/types'
import type { PostCategoriesT, PostCardT } from '~/types/posts'
import { postCardSchema, POST_CARD_PROPERTIES } from '~/types/posts'

const { validate } = useValidation()
const postsToLoad = 10

export default () => {
  const { categories } = useCatTag()

  const noMorePosts: Ref<Record<PostCategoriesT, boolean>> = useState('posts-left', () =>
    reactive(categories.initialize(() => false))
  )

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
    console.log('Fetching Posts')
    try {
      const posts = await queryContent('/blog')
        .where(whereOptions)
        .only(POST_CARD_PROPERTIES)
        .sort({ publishedAt: -1 })
        .skip(skip)
        .limit(limit)
        .find()

      return posts as PostCardT[]
    } catch (error) {
      console.error('Error fetching posts:', error)
      return []
    }
  }

  /**
   * Fetches and validates posts based on current filters.
   * @param limit - Max number of posts to fetch.
   * @param skip - Number of posts to skip.
   */

  const getPosts = async ({
    limit = postsToLoad,
    skip = 0,
    category = categories.selected.value
  } = {}): Promise<void | PostCardT[]> => {
    try {
      const newPosts = await fetchPosts({
        category,
        skip,
        limit
      })

      if (newPosts.length < limit) {
        noMorePosts.value[category] = true
        console.log('All posts fetched', noMorePosts, noMorePosts.value[category])
      }
      const validPosts = newPosts.filter((post) =>
        validate.posts(post as PostCardT, postCardSchema)
      )
      if (!validPosts.length) return
      return validPosts as PostCardT[]
    } catch (error) {
      console.error('Failed to get posts:', error)
    }
  }

  return {
    getPosts,
    noMorePosts
  }
}
