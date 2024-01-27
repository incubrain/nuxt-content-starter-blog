import type { Keywords, Messages } from './interfaces'

export function useSeoScoring(keywords: Keywords, messages: Messages) {
  const MAX_SCORE = 100
  const WARNING_WEIGHT = 2 // Warnings are twice as impactful as good points
  const OPTIMAL_KEYWORD_DENSITY = { MIN: 1, MAX: 2 } // Optimal keyword density range

  function getSeoScore() {
    if (messages.warnings.length === 0 && messages.goodPoints.length === 0) {
      return 50 // Neutral score if no data
    }
    const weightedWarnings = messages.warnings.length * WARNING_WEIGHT
    const totalMessages = weightedWarnings + messages.goodPoints.length
    const messagesScore = (messages.goodPoints.length / totalMessages) * 100
    return Math.min(messagesScore, MAX_SCORE)
  }

  function getKeywordSeoScore() {
    const primaryKeywordScore = (density: number) => {
      if (density >= OPTIMAL_KEYWORD_DENSITY.MIN && density <= OPTIMAL_KEYWORD_DENSITY.MAX) {
        return 10 // Full score if in optimal range
      }
      // Partial score if outside optimal range
      return Math.max(0, 5 - Math.abs(density - OPTIMAL_KEYWORD_DENSITY.MIN))
    }

    const keywordInTitleScore = primaryKeywordScore(keywords.primary.inTitle.density)
    const keywordInBodyScore = primaryKeywordScore(keywords.primary.body.density)
    const keywordInMetaDataScore = primaryKeywordScore(keywords.primary.inMetaDescription.density)

    // Adjust weight for subkeywords in title and meta description
    const subKeywordsInTitleScore = keywords.secondary.inTitle.reduce(
      (total, { density }) => total + density * 5,
      0
    )
    const subKeywordsInMetaScore = keywords.secondary.inMetaDescription.reduce(
      (total, { density }) => total + density * 3,
      0
    )

    // Adjust weight for subkeyword density in body content
    const subKeywordsDensityScore = keywords.secondary.body.reduce(
      (total, { density }) => total + primaryKeywordScore(density),
      0
    )

    const totalScore =
      keywordInTitleScore +
      keywordInBodyScore +
      keywordInMetaDataScore +
      subKeywordsInTitleScore +
      subKeywordsInMetaScore +
      subKeywordsDensityScore
    return Math.min(totalScore, MAX_SCORE) // SEO score should never go above 100
  }

  return {
    getSeoScore,
    getKeywordSeoScore
  }
}
