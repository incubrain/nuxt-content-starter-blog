import type { ContentJson, KeywordDensity, Keywords } from './interfaces'

/**
 * Provides keyword density analysis functions for given content.
 * @param content The content object containing the HTML text, keyword, sub-keywords, title, and meta description.
 * @returns Object with methods for keyword density analysis.
 */
export function useKeywordDensity(content: ContentJson) {
  /**
   * Counts the occurrences of a keyword in a given string.
   * @param keyword The keyword to search for.
   * @param stringContent The string content in which to search for the keyword.
   * @returns The number of occurrences of the keyword.
   */
  function countOccurrencesInString(keyword: string, stringContent: string): number {
    return stringContent.split(keyword).length - 1
  }

  /**
   * Calculates the density of a keyword within a given body of text.
   * @param keyword The keyword for which to calculate density.
   * @param bodyText The text in which to calculate the keyword's density. Defaults to content's HTML text.
   * @returns The keyword density as a percentage.
   */
  function calculateDensity(keyword: string, bodyText: string = content.htmlText): number {
    const occurrenceCount = countOccurrencesInString(keyword, bodyText)
    const wordCount = bodyText.split(' ').length
    return (occurrenceCount / wordCount) * 100
  }

  /**
   * Calculates the density of each sub-keyword within the content.
   * @returns An array of objects containing each sub-keyword and its calculated density.
   */
  function getSubKeywordsDensity(): KeywordDensity[] {
    return content.subKeywords.map((subKeyword) => ({
      area: 'body',
      keyword: subKeyword,
      density: calculateDensity(subKeyword)
    }))
  }

  /**
   * Calculates the density of the main keyword within the content.
   * @returns An object containing the main keyword, its density, and its position in the HTML text.
   */
  function getKeywordDensity(): KeywordDensity {
    const density = calculateDensity(content.keyword)
    return {
      area: 'body',
      keyword: content.keyword,
      density,
      position: content.htmlText.indexOf(content.keyword)
    }
  }

  /**
   * Calculates the density of the keyword within the content's title.
   * @param keyword The keyword to analyze in the title. Defaults to the content's main keyword.
   * @returns An object containing the keyword, its density in the title, and its position in the title.
   */
  function getKeywordInTitle(keyword: string = content.keyword): KeywordDensity {
    const density = calculateDensity(keyword, content.title)
    return {
      area: 'title',
      keyword,
      density,
      position: content.title.indexOf(keyword)
    }
  }

  /**
   * Calculates the density of each sub-keyword within the content's title.
   * @returns An array of objects containing each sub-keyword and its calculated density in the title.
   */
  function getSubKeywordsInTitle(): KeywordDensity[] {
    return content.subKeywords.map((subKeyword) => getKeywordInTitle(subKeyword))
  }

  /**
   * Calculates the density of the keyword within the content's meta description.
   * @param keyword The keyword to analyze in the meta description. Defaults to the content's main keyword.
   * @returns An object containing the keyword, its density in the meta description, and its position in the meta description.
   */
  function getKeywordInMetaDescription(keyword: string, area: string): KeywordDensity {
    const density = calculateDensity(keyword, content.metaDescription)
    return {
      area,
      keyword,
      density,
      position: content.metaDescription.indexOf(keyword)
    }
  }

  /**
   * Calculates the density of each sub-keyword within the content's meta description.
   * @returns An array of objects containing each sub-keyword and its calculated density in the meta description.
   */
  function getSubKeywordsInMetaDescription(): KeywordDensity[] {
    return content.subKeywords.map((subKeyword) => getKeywordInMetaDescription(subKeyword, 'meta'))
  }

  function analyzeKeywords(): Keywords {
    const keywordDensity = getKeywordDensity()
    const subKeywordsDensity = getSubKeywordsDensity()
    const subKeywordsInTitle = getSubKeywordsInTitle()
    const subKeywordsInMetaDescription = getSubKeywordsInMetaDescription()
    const keywordInTitle = getKeywordInTitle()
    const keywordInMetaDescription = getKeywordInMetaDescription(content.keyword, 'meta')

    return {
      primary: {
        body: keywordDensity,
        inTitle: keywordInTitle,
        inMetaDescription: keywordInMetaDescription
      },
      secondary: {
        body: subKeywordsDensity,
        inTitle: subKeywordsInTitle,
        inMetaDescription: subKeywordsInMetaDescription
      },
      primaryArray: [keywordDensity, keywordInTitle, keywordInMetaDescription],
      secondaryArray: [...subKeywordsDensity, ...subKeywordsInTitle, ...subKeywordsInMetaDescription]
    }
  }

  return {
    analyzeKeywords,
    countOccurrencesInString
  }
}
