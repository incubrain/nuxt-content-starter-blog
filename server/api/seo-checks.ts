import { useSeoAnalyzer } from '../utils/useSeoAnalyzer'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  try {
    const contentJson = {
      title: body.post.title,
      htmlText: body.postHtml,
      keyword: body.post.keywords.primary,
      subKeywords: body.post.keywords.secondary,
      metaDescription: body.post.description,
      languageCode: 'en',
      countryCode: 'us'
    }
    const seoCheck = useSeoAnalyzer(contentJson, 'nuxt-content-starter-blog.vercel.app')

    console.log('seoCheck', seoCheck)

    // Perform analysis

    return {
      status: 200,
      message: 'SEO checks completed',
      result: seoCheck
    }
  } catch (error) {
    console.error('Error fetching posts:', error)
    return {
      status: 500,
      message: 'Error Checking SEO',
      error
    }
  }
})
