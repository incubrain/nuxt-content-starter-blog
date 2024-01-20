import { SeoCheck } from 'seord'
import { serverQueryContent } from '#content/server'

import type { PostFullT } from '~/types/posts'
import { POST_FULL_PROPERTIES } from '~/types/posts'

export default defineEventHandler(async (event) => {
  const seoResults = []
  console.log('seo checks api')

  try {
    const articles = await serverQueryContent(event)
      .where({ _partial: { $ne: true } })
      .only(POST_FULL_PROPERTIES)
      .find()

    articles.forEach(async (post: PostFullT): Promise<void> => {
      const contentJson = {
        title: post.title,
        htmlText: post.body,
        keyword: post.keywords.primary,
        subKeywords: post.keywords.secondary,
        metaDescription: post.description,
        languageCode: 'en',
        countryCode: 'us'
      }
      const seoCheck = new SeoCheck(contentJson, 'nuxt-content-starter-blog.vercel.app')

      // Perform analysis
      const result = await seoCheck.analyzeSeo()
      seoResults.push({ postTitle: post.title, postId: post.id, ...result })
    })
    return {
      status: 200,
      message: 'SEO checks completed',
      body: seoResults
    }
  } catch (error) {
    console.error('Error fetching posts:', error)
    return {
      status: 500,
      message: 'Error Checking SEO',
      body: error
    }
  }
})
