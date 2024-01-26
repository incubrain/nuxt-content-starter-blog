import type { ContentJson, KeywordDensity } from './interfaces'

export function useKeywordDensity(content: ContentJson, htmlBodyText: string) {
  function calculateDensity(keyword: string, bodyText: string = htmlBodyText): number {
    const occurrenceCount = countOccurrencesInString(keyword, bodyText)
    const wordCount = bodyText.split(' ').length
    return (occurrenceCount / wordCount) * 100
  }

  function countOccurrencesInString(keyword: string, stringContent: string): number {
    return stringContent.split(keyword).length - 1
  }

  function getSubKeywordsDensity(): KeywordDensity[] {
    return content.subKeywords.map((subKeyword) => ({
      keyword: subKeyword,
      density: calculateDensity(subKeyword)
    }))
  }

  function getKeywordDensity(): KeywordDensity {
    const density = calculateDensity(content.keyword)
    return {
      keyword: content.keyword,
      density,
      position: content.htmlText.indexOf(content.keyword)
    }
  }

  function getKeywordInTitle(keyword: string = content.keyword): KeywordDensity {
    const density = calculateDensity(keyword, content.title)
    return {
      keyword,
      density,
      position: content.title.indexOf(keyword)
    }
  }

  function getSubKeywordsInTitle(): KeywordDensity[] {
    return content.subKeywords.map((subKeyword) => getKeywordInTitle(subKeyword))
  }

  function getKeywordInMetaDescription(keyword: string = content.keyword): KeywordDensity {
    const density = calculateDensity(keyword, content.metaDescription)
    return {
      keyword,
      density,
      position: content.metaDescription.indexOf(keyword)
    }
  }

  function getSubKeywordsInMetaDescription(): KeywordDensity[] {
    return content.subKeywords.map((subKeyword) => getKeywordInMetaDescription(subKeyword))
  }

  return {
    calculateDensity,
    getKeywordDensity,
    getSubKeywordsDensity,
    getKeywordInTitle,
    getSubKeywordsInTitle,
    getKeywordInMetaDescription,
    getSubKeywordsInMetaDescription
  }
}
