import * as cheerio from 'cheerio'
import { getSyllableCount } from '../count/countSyllables'

export const technicalTerms = new Set([
  'array',
  'function',
  'variable',
  'loop',
  'class',
  'rendering',
  'framework',
  'middleware',
  'typescript'

  // ... Add more technical terms relevant to your audience
])

export type ReadabilityFormulaConfig = {
  adjustmentFactor?: number
  difficultWordWeight?: number
  sentenceLengthWeight: number
  syllableWeight?: number
  complexWordWeight?: number
  threshold?: number
}

export const readabilityFormulasConfig = {
  daleChall: {
    adjustmentFactor: 3.6365,
    difficultWordWeight: 0.1579,
    sentenceLengthWeight: 0.0496,
    threshold: 5.0
  } as ReadabilityFormulaConfig,
  fleschKincaid: {
    sentenceLengthWeight: 0.39,
    syllableWeight: 11.8,
    adjustment: -15.59
  } as ReadabilityFormulaConfig,
  gunningFog: {
    sentenceLengthWeight: 0.4,
    complexWordWeight: 1,
    adjustment: 0
  } as ReadabilityFormulaConfig
}

export async function countSyllables(words: string[]): Promise<number> {
  let syllableCount = 0
  words.forEach((word) => {
    syllableCount += getSyllableCount(word)
  })
  return syllableCount
}

export function isTechnicalTerm(word: string): boolean {
  return technicalTerms.has(word.toLowerCase())
}

export function isDifficultWord(word: string): boolean {
  const difficultLengthThreshold = 7
  const syllableThreshold = 3

  const isDifficult =
    (word.length > difficultLengthThreshold || getSyllableCount(word) > syllableThreshold) &&
    !isTechnicalTerm(word)

  console.log(`Word "${word}" is difficult: ${isDifficult}`)
  return isDifficult
}

export async function countDifficultWords(words: string[]): Promise<number> {
  let count = 0
  for (const word of words) {
    if (!technicalTerms.has(word.toLowerCase()) && isDifficultWord(word)) {
      count++
    }
  }
  return count
}

// Define common abbreviations
const commonAbbreviations = ['Dr', 'Mr', 'Mrs', 'Ms', 'Prof', 'Sr', 'Jr', 'St']
const abbreviationRegex = new RegExp(`\\b(${commonAbbreviations.join('|')})\\.$`, 'i')
export function splitSentences(text: string): string[] {
  // Split text at every period, exclamation, or question mark followed by a space
  let sentenceFragments = text.split(/([.!?])\s+/)

  let sentences = []
  let currentSentence = ''

  for (let i = 0; i < sentenceFragments.length; i++) {
    const fragment = sentenceFragments[i]
    const nextFragment = sentenceFragments[i + 1]

    currentSentence += fragment

    // Check if the current fragment is an abbreviation or ends with punctuation
    if (
      !abbreviationRegex.test(fragment) &&
      (nextFragment === '.' || nextFragment === '!' || nextFragment === '?')
    ) {
      sentences.push(currentSentence.trim())
      currentSentence = ''
      i++ // Skip the next fragment (punctuation)
    }
  }

  // Handle any remaining text not followed by a punctuation mark
  if (currentSentence) {
    sentences.push(currentSentence.trim())
  }

  return sentences
}

export async function calculateReadability(
  text: string,
  formulaConfig: ReadabilityFormulaConfig
): Promise<number> {
  const sentences = splitSentences(text)
  console.log('sentenceszz', sentences)
  const words = text.split(/\s+/)

  const numSentences = sentences.length
  const numWords = words.length
  let score: number = 0

  const complexWords = await countDifficultWords(words)
  if (formulaConfig === readabilityFormulasConfig.fleschKincaid) {
    const syllables = await countSyllables(words)
    score =
      formulaConfig.sentenceLengthWeight * (numWords / numSentences) +
      formulaConfig.syllableWeight! * (syllables / numWords) +
      formulaConfig.adjustment!
  } else if (formulaConfig === readabilityFormulasConfig.gunningFog) {
    score =
      formulaConfig.sentenceLengthWeight * (numWords / numSentences) +
      formulaConfig.complexWordWeight! * (complexWords / numWords) * 100
  } else if (formulaConfig === readabilityFormulasConfig.daleChall) {
    const numSentences = text.split(/[.!?]/).length
    const numWords = text.split(/\s+/).length

    const score =
      formulaConfig.difficultWordWeight! * ((complexWords / numWords) * 100) +
      formulaConfig.sentenceLengthWeight * (numWords / numSentences)
    return score > formulaConfig.threshold! ? score + formulaConfig.adjustmentFactor! : score
  }

  return score
}

export function extractTextFromHtml(html: string): string {
  const $ = cheerio.load(html)
  $('script, style').remove() // Remove script and style elements
  return $('body').text() // Extract text from the body element
}

export async function calculateAggregateReadabilityScore(
  htmlContent: string
): Promise<{ score: number; rating: string; message: string }> {
  const textContent = extractTextFromHtml(htmlContent)

  let totalScore = 0
  let count = 0

  for (const formulaConfig of Object.values(readabilityFormulasConfig)) {
    totalScore += await calculateReadability(textContent, formulaConfig)
    count++
  }

  const averageScore = totalScore / count
  let rating: string
  let message: string

  if (averageScore >= 90) {
    rating = 'Extremely Easy'
    message =
      'Content is very easy to read and understand. Suitable for a younger audience or non-native speakers.'
  } else if (averageScore >= 70) {
    rating = 'Easy to Read'
    message = 'Content is straightforward and accessible to most readers.'
  } else if (averageScore >= 50) {
    rating = 'Fairly Difficult'
    message = 'Content is somewhat challenging and may require focused reading.'
  } else if (averageScore >= 30) {
    rating = 'Difficult'
    message =
      'Content is challenging to read and understand. Suitable for readers with good command of the language or technical background.'
  } else {
    rating = 'Very Difficult'
    message =
      'Content is very challenging and likely requires specialized knowledge or higher education to comprehend.'
  }

  return { score: averageScore, rating, message }
}
