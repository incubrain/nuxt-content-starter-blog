import { getSyllableCount } from '../text/textSyllableCount'
import dCWords from '../formulas/daleChallWordList.json'
const daleChallWords = new Set(dCWords)

export function isCommonWord(word: string) {
  return daleChallWords.has(word.toLowerCase())
}

export function countCommonWords(words: string[]) {
  return words.filter(isCommonWord).length
}

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
])

export function isTechnicalTerm(word: string): boolean {
  return technicalTerms.has(word.toLowerCase())
}

export function isDifficultWord(word: string): boolean {
  const difficultLengthThreshold = 7
  const syllableThreshold = 3

  const isDifficult =
    (word.length > difficultLengthThreshold || getSyllableCount(word) > syllableThreshold) &&
    !isTechnicalTerm(word)
  return isDifficult
}

export async function countDifficultWords(words: string[]): Promise<number> {
  let count = 0
  for (const word of words) {
    if (isDifficultWord(word)) {
      count++
    }
  }
  return count
}
