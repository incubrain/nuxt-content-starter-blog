import type { QueryBuilderParams } from '@nuxt/content/dist/runtime/types'
import type { PostCategoriesT, PostCardT, PostFullT, PostsInitializerT } from '~/types/posts'
import type { ZodIssue, ZodIssueCode } from 'zod'

import { postCardSchema, POST_CARD_PROPERTIES, postFullSchema } from '~/types/posts'

const { categories } = useCatTag()

const postsToFetch = 6

export default () => {
  const seoErrors = useState('seo-errors', () => reactive([]))
  const posts = useState('posts', () => reactive(categories.initialize(() => [] as PostCardT[])))
  console.log('postsState', posts)

  const postsFinished: Ref<Record<PostCategoriesT, boolean>> = useState('posts-left', () =>
    reactive(categories.initialize(() => false))
  )

  const postsLoading = useState('post-loading', () => false as Boolean)

  function isValidPost(
    post: PostCardT | PostFullT,
    schema: typeof postCardSchema | typeof postFullSchema
  ): boolean {
    const parsed = schema.safeParse(post)

    if (!parsed.success) {
      if (process.server && process.env.NODE_ENV !== 'production') {
        // store errors in state object
        // only store if the error doesn't already exist
        let i = 1
        parsed.error.issues.forEach((err: ZodIssue) => {
          const lengthErrors = ['too_small', 'too_big']
          const invalidErrors = [
            'invalid_type',
            'invalid_union',
            'invalid_string',
            'invalid_union_discriminator',
            'invalid_arguments',
            'invalid_return_type',
            'invalid_date'
          ]
          const invalidEnumErrors = ['invalid_enum_value']

          const errDescription = computed(() => {
            if (lengthErrors.includes(err.code)) {
              return `${err.message}. Current length ${post.title.length}`
            } else if (invalidErrors.includes(err.code)) {
              return `${err.message}`
            } else if (invalidEnumErrors.includes(err.code)) {
              return `Invalid tag ${err.message.split(',')[1]}`
            } else {
              return err.message
            }
          })

          const formattedError = {
            id: `seo_validation_error_${post.id}_${i}`,
            title: post.title,
            description: errDescription.value,
            color: 'red',
            icon: 'i-mdi-error',
            timeout: 0
          }

          i += 1

          if (!seoErrors.value.includes(formattedError)) {
            seoErrors.value.push(formattedError)
          }
        })
      }
      // parsed.error?.forEach((err: ZodError) => {
      //   console.log('seo error 2', err)

      // })
      return false
    } else {
      return true
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
    seoErrors,
    isValidPost,
    getInitialPosts,
    getPostsOnScroll
  }
}
