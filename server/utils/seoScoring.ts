import type { KeywordDensity } from './interfaces'

export function useSeoScoring(
  keywordDensity: KeywordDensity,
  subKeywordsDensity: KeywordDensity[],
  messages: { warnings: string[]; goodPoints: string[] }
) {
  const MAX_SCORE = 100

  function getSeoScore(): number {
    const messagesScore =
      (messages.goodPoints.length / (messages.warnings.length + messages.goodPoints.length)) * 100
    return Math.min(messagesScore, MAX_SCORE) // SEO score should never go above 100
  }

  function getKeywordSeoScore(): number {
    const keywordInTitleScore = keywordDensity.density * 10
    const subKeywordsInTitleScore = subKeywordsDensity.length * 10
    const subKeywordsDensityScore = subKeywordsDensity.reduce(
      (total, { density }) => total + density * 10,
      0
    )
    const totalScore = keywordInTitleScore + subKeywordsInTitleScore + subKeywordsDensityScore

    return Math.min(totalScore, MAX_SCORE) // SEO score should never go above 100
  }

  return {
    getSeoScore,
    getKeywordSeoScore
  }
}
