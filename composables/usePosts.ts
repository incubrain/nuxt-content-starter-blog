import type { QueryBuilderParams } from '@nuxt/content/dist/runtime/types'
import type { PostCategoriesT, PostCardT, PostFullT } from '~/types/posts'
import type { ZodIssue, ZodIssueCode } from 'zod'

import { postCardSchema, POST_CARD_PROPERTIES, postFullSchema } from '~/types/posts'

const { categories } = useCatTag()

const postsToFetch = 10

export default () => {
  const toast = useToast()
  const seoErrors = useState('seo-errors', () => reactive([]))
  const noMorePosts: Ref<Record<PostCategoriesT, boolean>> = useState('posts-left', () =>
    reactive(categories.initialize(() => false))
  )

  function isValidPost(
    post: PostCardT | PostFullT,
    schema: typeof postCardSchema | typeof postFullSchema
  ): boolean {
    const parsed = schema.safeParse(post)

    if (!parsed.success) {
      console.warn('Failed to validate post:', parsed.error)
      if (process.server && process.env.NODE_ENV !== 'production') {
        console.log('seo server error', parsed.error)
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
            title: `SEO Error: ${post.title}`,
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

      const validPosts = newPosts.filter((post) => isValidPost(post as PostCardT, postCardSchema))
      if (!validPosts.length) return
      return validPosts as PostCardT[]
    } catch (error) {
      console.error('Failed to get posts:', error)
    }
  }

  return {
    getPosts,
    noMorePosts,
    seoErrors,
    isValidPost
  }
}
