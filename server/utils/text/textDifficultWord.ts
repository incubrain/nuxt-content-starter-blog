import dCWords from '../formulas/daleChallWordList.json'
const daleChallWords = new Set(dCWords)

export function isCommonWord(word: string) {
  return daleChallWords.has(word.toLowerCase())
}

export function countUncommonWords(words: string[]) {
  return words.filter(isCommonWord).length
}
