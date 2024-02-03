import { processText } from '../text/textProcessing'
import { splitSentences, splitWords } from '../text/textSplit'
import { countDifficultWords } from '../text/textDifficultWord'
import { countSyllables } from '../text/textSyllableCount'
import dCWords from '../formulas/daleChallWordList.json'
const daleChallWords = new Set(dCWords)

type ReadabilityAlgorithms = 'fleschKincaid' | 'gunningFog' | 'daleChall'

export type ReadabilityScoreCalculator = (params: {
  numWords: number
  numSentences: number
  numSyllables?: number
  numComplexWords?: number
  complexWordWeight?: number
}) => number

export type ReadabilityFormulaConfig = {
  name: ReadabilityAlgorithms
  calculateScore: ReadabilityScoreCalculator
  adjustmentFactor?: number
  difficultWordWeight?: number
  sentenceLengthWeight: number
  syllableWeight?: number
  complexWordWeight?: number
  threshold?: number
}

export const readabilityFormulasConfig = {
  daleChall: {
    name: 'daleChall',
    calculateScore: ({ numWords, numSentences, numComplexWords = 0 }) => {
      const score =
        0.1579 * ((numComplexWords / numWords) * 100) + 0.0496 * (numWords / numSentences)
      return score > 5.0 ? score + 3.6365 : score
    },
    adjustmentFactor: 3.6365,
    difficultWordWeight: 0.1579,
    sentenceLengthWeight: 0.0496,
    threshold: 5.0
  } as ReadabilityFormulaConfig,
  fleschKincaid: {
    name: 'fleschKincaid',
    calculateScore: ({ numWords, numSentences, numSyllables = 0 }) => {
      return 0.39 * (numWords / numSentences) + 11.8 * (numSyllables / numWords) - 15.59
    },
    sentenceLengthWeight: 0.39,
    syllableWeight: 11.8,
    adjustment: -15.59
  } as ReadabilityFormulaConfig,
  gunningFog: {
    name: 'gunningFog',
    calculateScore: ({ numWords, numSentences, numComplexWords = 0, complexWordWeight = 1 }) => {
      return (
        0.4 * (numWords / numSentences) + complexWordWeight * (numComplexWords / numWords) * 100
      )
    },
    sentenceLengthWeight: 0.4,
    complexWordWeight: 1,
    adjustment: 0
  } as ReadabilityFormulaConfig
}

function isCommonWord(word: string) {
  return daleChallWords.has(word.toLowerCase())
}

function countCommonWords(words: string[]) {
  return words.filter(isCommonWord).length
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
  const numSyllables = await countSyllables(words)
  let numComplexWords = 0
  if (formulaConfig.name === 'daleChall') {
    numComplexWords = countCommonWords(words)
  } else {
    numComplexWords = await countDifficultWords(words)
  }

  const score = formulaConfig.calculateScore({
    numWords,
    numSentences,
    numSyllables,
    numComplexWords
  })
  console.log(formulaConfig.name, 'numWords', numWords)
  console.log(formulaConfig.name, 'numSentences', numSentences)
  console.log(formulaConfig.name, 'score', score)
  console.log(formulaConfig.name, 'complexWords', numComplexWords)
  console.log(formulaConfig.name, 'syllables', numSyllables)

  return score
}

type RatingResult = {
  rating: string
  message: string
}

function getRatingAndMessage(score: number): RatingResult {
  if (score >= 90) {
    return { rating: '1st to 3rd Grade', message: 'Very easy to read. Best suited for ages 6-9.' }
  } else if (score >= 70) {
    return {
      rating: '4th to 6th Grade',
      message: 'Easy to read. Conversational English for ages 9-12.'
    }
  } else if (score >= 50) {
    return {
      rating: '7th to 9th Grade',
      message: 'Fairly difficult to read. Best suited for ages 12-15.'
    }
  } else if (score >= 30) {
    return {
      rating: '10th to 12th Grade',
      message: 'Difficult to read. Best suited for ages 15-18.'
    }
  } else {
    return {
      rating: 'College',
      message: 'Very difficult to read. Best understood by college students and professionals.'
    }
  }
}

type RatingFull = RatingResult & {
  score: number
  name: string
}

interface Score {
  algorithms: RatingFull[]
  total: number
  average: number
}

export async function calculateAggregateReadabilityScore(htmlContent: string): Promise<Score> {
  const processedText = processText(htmlContent)
  const words = splitWords(processedText)

  let count = 0
  const score = {
    algorithms: [],
    total: 0,
    average: 0
  } as Score

  for (const formulaConfig of Object.values(readabilityFormulasConfig)) {
    console.log('formulaConfig', formulaConfig.name)
    const singleScore = await calculateReadability(processedText, formulaConfig)
    const { rating, message } = getRatingAndMessage(singleScore)
    score.total += singleScore
    score.algorithms.push({ score: singleScore, name: formulaConfig.name, rating, message })
    count++
  }

  console.log('calculateReadability total', score, count)

  score.average = score.total / count
  return score
}
