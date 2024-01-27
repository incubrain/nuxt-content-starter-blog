import { useHtmlAnalyzer } from './htmlAnalyzer' // Importing the refactored HtmlAnalyzer composable
import type { ContentJson, Heading, MessageData } from './interfaces'
import { useKeywordDensity } from './seoKeywordDensity'
import { useSeoScoring } from './seoScoring'
import { useSeoMessages } from './seoMessages' // Assuming you have refactored assignSeoMessages to useSeoMessages

export function useSeoAnalyzer(
  content: ContentJson,
  siteDomainName: string | null = null,
  strictMode: boolean = false
) {
  const baseContent = {
    ...content,
    htmlText: content.htmlText.toLowerCase(),
    title: content.title.toLowerCase(),
    metaDescription: content.metaDescription.toLowerCase(),
    keyword: content.keyword.toLowerCase(),
    subKeywords: content.subKeywords.map((subKeyword) => subKeyword.toLowerCase())
  }

  // Use the useHtmlAnalyzer composable
  // Perform SEO scoring
  const { getWordCount, getAllLinks, getInternalLinks, getOutboundLinks, getAllHeadingTags } =
    useHtmlAnalyzer(baseContent, siteDomainName)
  const { analyzeKeywords } = useKeywordDensity(baseContent)

  // Initialize headings
  const headings: Heading[] = getAllHeadingTags()
  if (!strictMode) {
    headings.push({ tag: 'H1', text: baseContent.title })
  }

  // Perform keyword density analysis
  const keywords = analyzeKeywords()

  // Additional analyses using HtmlAnalyzer and useSeoAnalyzer results
  const wordCount = getWordCount()
  const allLinks = getAllLinks()
  const totalLinks = allLinks.length
  const internalLinks = getInternalLinks()
  const outboundLinks = getOutboundLinks()

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
