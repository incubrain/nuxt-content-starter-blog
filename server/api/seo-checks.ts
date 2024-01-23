import { SeoCheck } from 'seord'

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
    const seoCheck = new SeoCheck(contentJson, 'nuxt-content-starter-blog.vercel.app')

    // Perform analysis
    const result = await seoCheck.analyzeSeo()

    return {
      status: 200,
      message: 'SEO checks completed',
      result
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
