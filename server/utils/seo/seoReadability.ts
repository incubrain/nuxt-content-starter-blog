import { processText } from '../text/textProcessing'
import { splitSentences, splitWords } from '../text/textSplit'
import { countDifficultWords } from '../text/textDifficultWord'
import { countSyllables } from '../text/textSyllableCount'

export type ReadabilityFormulaConfig = {
  name: string
  adjustmentFactor?: number
  difficultWordWeight?: number
  sentenceLengthWeight: number
  syllableWeight?: number
  complexWordWeight?: number
  threshold?: number
}

export const readabilityFormulasConfig = {
  daleChall: {
    name: 'Dale-Chall',
    adjustmentFactor: 3.6365,
    difficultWordWeight: 0.1579,
    sentenceLengthWeight: 0.0496,
    threshold: 5.0
  } as ReadabilityFormulaConfig,
  fleschKincaid: {
    name: 'Flesch-Kincaid',
    sentenceLengthWeight: 0.39,
    syllableWeight: 11.8,
    adjustment: -15.59
  } as ReadabilityFormulaConfig,
  gunningFog: {
    name: 'Gunning Fog',
    sentenceLengthWeight: 0.4,
    complexWordWeight: 1,
    adjustment: 0
  } as ReadabilityFormulaConfig
}

export async function calculateReadability(
  text: string,
  formulaConfig: ReadabilityFormulaConfig
): Promise<number> {
  console.log('calculateReadability')
  const sentences = splitSentences(text)
  const words = splitWords(text)

  const numSentences = sentences.length
  const numWords = words.length
  let score: number = 0

  const syllables = await countSyllables(words)
  const complexWords = await countDifficultWords(words)
  console.log('numWords', numWords)
  console.log('numSentences', numSentences)
  if (formulaConfig === readabilityFormulasConfig.fleschKincaid) {
    score =
      formulaConfig.sentenceLengthWeight * (numWords / numSentences) +
      formulaConfig.syllableWeight! * (syllables / numWords) +
      formulaConfig.adjustment!
  } else if (formulaConfig === readabilityFormulasConfig.gunningFog) {
    score =
      formulaConfig.sentenceLengthWeight * (numWords / numSentences) +
      formulaConfig.complexWordWeight! * (complexWords / numWords) * 100
  } else if (formulaConfig === readabilityFormulasConfig.daleChall) {
    console.log('daleChall running')
    score =
      formulaConfig.difficultWordWeight! * ((complexWords / numWords) * 100) +
      formulaConfig.sentenceLengthWeight * (numWords / numSentences)
    score = score > formulaConfig.threshold! ? score + formulaConfig.adjustmentFactor! : score
  }
  console.log('score', score)
  console.log('complexWords', complexWords)
  console.log('syllables', syllables)

  return score
}

export async function calculateAggregateReadabilityScore(
  htmlContent: string
): Promise<{ score: number; rating: string; message: string; words: string[] }> {
  const processedText = processText(htmlContent)
  const words = splitWords(processedText)

  let totalScore = 0
  let count = 0

  for (const formulaConfig of Object.values(readabilityFormulasConfig)) {
    console.log('formulaConfig', formulaConfig.name)
    totalScore += await calculateReadability(processedText, formulaConfig)
    count++
  }

  console.log('calculateReadability totalScore', totalScore, count)

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

  return { score: averageScore, rating, message, words }
}
