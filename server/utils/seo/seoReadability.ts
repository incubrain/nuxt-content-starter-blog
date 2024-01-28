import * as cheerio from 'cheerio'

export const technicalTerms = new Set([
  'array',
  'function',
  'variable',
  'loop',
  'class'
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
  // A simple heuristic: words longer than a certain length are considered difficult
  // This length can be adjusted based on your needs
  const difficultLengthThreshold = 7

  // A word is difficult if it's longer than the threshold and not a technical term
  return word.length > difficultLengthThreshold && !isTechnicalTerm(word)
}

export function countDifficultWords(
  words: string[],
  formulaConfig: ReadabilityFormulaConfig
): number {
  let count = 0
  for (const word of words) {
    if (!technicalTerms.has(word.toLowerCase()) && isDifficultWord(word)) {
      count++
    }
  }
  return count
}

export function getSyllableCount(word: string): number {
  word = word.toLowerCase().trim()
  if (word.length <= 3) return 1 // A word with 3 or fewer letters counts as one syllable

  // Remove silent 'e' at the end and 'es' in some cases
  word = word.replace(/(?:e(?:s)?)$/, '')

  const vowelGroups = word.match(/[aeiouy]{1,2}/g)
  const syllableCount = vowelGroups ? vowelGroups.length : 0

  // Adjust for specific vowel-consonant patterns or exceptions here if necessary

  return syllableCount
}

export async function countComplexWords(words: string[]): Promise<number> {
  let complexWordCount = 0

  words.forEach((word) => {
    // Splitting hyphenated words
    const subWords = word.split('-')
    subWords.forEach((subWord) => {
      if (getSyllableCount(subWord) >= 3 && !isTechnicalTerm(subWord)) {
        complexWordCount++
      }
    })
  })

  return complexWordCount
}

const commonAbbreviations = ['Mr', 'Mrs', 'Ms', 'Dr', 'Prof', 'Sr', 'Jr', 'St']
const abbreviationRegex = new RegExp(`\\b(?:${commonAbbreviations.join('|')})\\.$`, 'i')

export function splitSentences(text: string): string[] {
  // Split text at every period, exclamation, or question mark followed by a space
  let sentenceFragments = text.split(/([.!?])\s+/)

  let sentences = []
  let currentSentence = ''

  sentenceFragments.forEach((fragment) => {
    currentSentence += fragment
    if (abbreviationRegex.test(currentSentence)) {
      // If the current fragment ends with an abbreviation, keep adding to it
      currentSentence += ' '
    } else {
      // Otherwise, consider it the end of a sentence and start a new one
      sentences.push(currentSentence.trim())
      currentSentence = ''
    }
  })

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

  if (formulaConfig === readabilityFormulasConfig.fleschKincaid) {
    const syllables = await countSyllables(words)
    score =
      formulaConfig.sentenceLengthWeight * (numWords / numSentences) +
      formulaConfig.syllableWeight! * (syllables / numWords) +
      formulaConfig.adjustment!
  } else if (formulaConfig === readabilityFormulasConfig.gunningFog) {
    const complexWords = await countComplexWords(words)
    score =
      formulaConfig.sentenceLengthWeight * (numWords / numSentences) +
      formulaConfig.complexWordWeight! * (complexWords / numWords) * 100
  } else if (formulaConfig === readabilityFormulasConfig.daleChall) {
    const numSentences = text.split(/[.!?]/).length
    const numWords = text.split(/\s+/).length
    const numDifficultWords = countDifficultWords(text.split(/\s+/), formulaConfig)

    const score =
      formulaConfig.difficultWordWeight! * ((numDifficultWords / numWords) * 100) +
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
