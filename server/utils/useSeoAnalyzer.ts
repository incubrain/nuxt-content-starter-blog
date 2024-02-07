import type { ContentJson, Heading, MessageData } from './interfaces'
import { useKeywordDensity } from './seo/seoKeywordDensity'
import { useSeoScoring } from './seo/seoScoring'
import { useSeoMessages } from './seo/seoMessages'
import { htmlDom } from './html/htmlDom'
import * as head from './html/htmlHeadings'
import * as link from './html/htmlLinks'
import * as body from './html/htmlBody'

export async function useSeoAnalyzer(
  content: ContentJson,
  siteDomainName: string | null = null,
  strictMode: boolean = false
) {
  const dom = htmlDom(content.htmlText)

  const baseContent = {
    ...content,
    htmlText: content.htmlText.toLowerCase(),
    htmlLower: dom.text(),
    title: content.title.toLowerCase(),
    metaDescription: content.metaDescription.toLowerCase(),
    keyword: content.keyword.toLowerCase(),
    subKeywords: content.subKeywords.map((subKeyword) => subKeyword.toLowerCase())
  }

  // Use the useHtmlAnalyzer composable

  const { analyzeKeywords } = useKeywordDensity(baseContent)

  // Initialize headings
  const headings: Heading[] = head.getAllHeadingTags(dom)
  if (!strictMode) {
    headings.push({ tag: 'H1', text: baseContent.title })
  }

  // Perform keyword density analysis
  const keywords = analyzeKeywords()

  // Additional analyses using HtmlAnalyzer and useSeoAnalyzer results
  const wordCount = body.getWordCount(baseContent.htmlLower)
  const allLinks = link.getAllLinks(dom)
  const totalLinks = allLinks.length
  const internalLinks = link.getInternalLinks(allLinks)
  const outboundLinks = link.getExternalLinks(allLinks)

  // Assign SEO messages

  const messageData = {
    keywords,
    links: {
      internal: internalLinks,
      outbound: outboundLinks
    },
    headings
  } as MessageData

  const messages = useSeoMessages({
    content: baseContent,
    messageData
  })

  const { getKeywordSeoScore, getSeoScore } = useSeoScoring(keywords, messages)
  const seoScore = getSeoScore()
  const keywordSeoScore = getKeywordSeoScore()
  keywords.score = keywordSeoScore

  return {
    seoScore,
    keywords,
    messages,
    headings,
    count: {
      words: wordCount,
      links: totalLinks,
      linksInternal: internalLinks.all.length,
      linksOutbound: outboundLinks.all.length
    },
    links: {
      internal: internalLinks,
      outbound: outboundLinks
    }
  }
}
