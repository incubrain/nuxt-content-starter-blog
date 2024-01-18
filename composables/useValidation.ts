import type { PostCardT, PostFullT } from '~/types/posts'
import { postCardSchema, postFullSchema } from '~/types/posts'

export default () => {
  function isValidPost(
    post: PostCardT | PostFullT,
    schema: typeof postCardSchema | typeof postFullSchema
  ): boolean {
    try {
      schema.parse(post)
      return true
    } catch (error) {
      console.error(post.title, 'failed to validate:', error)
      return false
    }
  }

  return {
    validate: {
      posts: isValidPost
    }
  }
}
