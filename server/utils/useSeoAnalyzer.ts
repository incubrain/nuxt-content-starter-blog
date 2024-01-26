import { useHtmlAnalyzer } from './htmlAnalyzer' // Importing the refactored HtmlAnalyzer composable
import type { ContentJson, Heading } from './interfaces'
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
    title: content.title.toLowerCase(),
    metaDescription: content.metaDescription.toLowerCase(),
    keyword: content.keyword.toLowerCase(),
    subKeywords: content.subKeywords.map((subKeyword) => subKeyword.toLowerCase())
  }

  const htmlContent = baseContent.htmlText.toLowerCase()
  // Use the useHtmlAnalyzer composable
  // Perform SEO scoring
  const { getWordCount, getAllLinks, getInternalLinks, getOutboundLinks, getAllHeadingTags } =
    useHtmlAnalyzer(baseContent.htmlText, siteDomainName)
  const { getKeywordDensity, getSubKeywordsDensity } = useKeywordDensity(baseContent, htmlContent)

  // Initialize headings
  const headings: Heading[] = getAllHeadingTags()
  if (!strictMode) {
    headings.push({ tag: 'H1', text: baseContent.title })
  }

  // Perform keyword density analysis
  const keywordDensity = getKeywordDensity()
  const subKeywordsDensity = getSubKeywordsDensity()

  // Additional analyses using HtmlAnalyzer and useSeoAnalyzer results
  const wordCount = getWordCount()
  const allLinks = getAllLinks()
  const totalLinks = allLinks.length
  const internalLinks = getInternalLinks()
  const outboundLinks = getOutboundLinks()

  // Assign SEO messages
  const links = { internal: internalLinks, outbound: outboundLinks }
  const messages = useSeoMessages(
    baseContent,
    keywordDensity.density,
    subKeywordsDensity,
    headings,
    links
  )

  const { getKeywordSeoScore, getSeoScore } = useSeoScoring(
    keywordDensity,
    subKeywordsDensity,
    messages
  )
  const seoScore = getSeoScore()
  const keywordSeoScore = getKeywordSeoScore()

  return {
    keywordDensity,
    subKeywordsDensity,
    seoScore,
    keywordSeoScore,
    messages,
    headings,
    //
    wordCount,
    totalLinks,
    internalLinks,
    outboundLinks
  }
}
