import type { QueryBuilderParams } from '@nuxt/content/dist/runtime/types'
import type { PostCategoriesT, PostCardT, AuthorT } from '~/types/posts'
import { postCardSchema, POST_CARD_PROPERTIES } from '~/types/posts'

const { validate } = useValidation()
const { categories } = useCatTag()
const postsToFetch = 10

export default () => {
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

  const getPosts = async ({
    limit = postsToFetch,
    skip = 0,
    category = categories.selected.value,
    isShowcase = false
  } = {}): Promise<void | PostCardT[]> => {
    try {
      const newPosts = await fetchPosts({
        category,
        skip,
        limit
      })

      if (newPosts.length < limit && !isShowcase) {
        noMorePosts.value[category] = true
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
    noMorePosts,
  }
}
