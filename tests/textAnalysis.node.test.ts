import {
  countSyllables,
  isTechnicalTerm,
  isDifficultWord,
  countDifficultWords,
  technicalTerms
} from '~/server/utils/seo/seoReadability'
import { getSyllableCount } from '~/server/utils/count/countSyllables'
import { describe, test, expect } from 'vitest'

const sharedWordTestCases = [
  { input: '', expected: 0, message: 'Empty string' },
  { input: 'a', expected: 1, message: 'Single letter "a"' },
  { input: 'testing', expected: 2, message: 'Word "testing"' },
  { input: 'syllable', expected: 3, message: 'Word "syllable"' },
  { input: 'university', expected: 5, message: 'Word "university"' },
  { input: 'onomatopoeia', expected: 6, message: 'Word "onomatopoeia"' },
  { input: '123', expected: 0, message: 'Numeric string "123"' },
  { input: '--', expected: 0, message: 'Non-alphabetic string "--"' },
  { input: 'the', expected: 1, message: 'Common word "the"' },
  { input: 'queue', expected: 1, message: 'Word "queue"' },
  { input: 'rhythm', expected: 2, message: 'Word "rhythm"' },
  { input: 'ablatio', expected: 4, message: 'Word "ablatio"' }
]

const sharedArrayWordTestCases = [
  { input: [''], expected: 0, message: 'Array with empty string' },
  { input: ['a'], expected: 1, message: 'Array with single letter "a"' },
  { input: ['testing'], expected: 2, message: 'Array with word "testing"' },
  { input: ['simple', 'example'], expected: 5, message: 'Array with words "simple example"' },
  {
    input: ['I', 'am', 'testing', 'different', 'syllables', 'here'],
    expected: 1 + 1 + 2 + 3 + 3 + 1,
    message: 'Sequence of words'
  },
  { input: [], expected: 0, message: 'Empty array' }
  // Add more cases as needed for arrays
]

describe('Text Analysis Tests', () => {
  // Test for countSyllables
  describe('countSyllables', () => {
    test.each(sharedArrayWordTestCases)('$message input: $input', async ({ input, expected }) => {
      expect(await countSyllables(input)).toBe(expected)
    })
  })

  describe('getSyllableCount', () => {
    // Define test cases
    test.each(sharedWordTestCases)('$message input: $input', ({ input, expected }) => {
      expect(getSyllableCount(input)).toBe(expected)
    })
  })

  // Test for isTechnicalTerm
  describe('isTechnicalTerm', () => {
    test('should identify technical terms correctly', () => {
      const sampleTerm = Array.from(technicalTerms)[0]
      expect(isTechnicalTerm(sampleTerm)).toBeTruthy()
      expect(isTechnicalTerm('nonTechnicalTerm')).toBeFalsy()
    })
  })

  describe('isDifficultWord', () => {
    test.each([
      {
        input: 'complicated',
        expected: true,
        message: 'Word "complicated" should be considered difficult'
      },
      { input: 'easy', expected: false, message: 'Word "easy" should not be considered difficult' },
      {
        input: 'ablatio',
        expected: true,
        message:
          'Word "ablatio", despite being short, should be considered difficult due to syllable count'
      },
      {
        input: 'cat',
        expected: false,
        message: 'Short word "cat" should not be considered difficult'
      },
      {
        input: 'variable',
        expected: false,
        message:
          'Word "variable", although long, is a technical term and should not be considered difficult'
      }
      // Add more test cases as needed
    ])('$message input: $input', ({ input, expected }) => {
      expect(isDifficultWord(input)).toBe(expected)
    })
  })

  describe('countDifficultWords', () => {
    test.each([
      {
        input: ['This', 'is', 'a', 'simple', 'test'],
        expected: 0,
        message: 'No difficult words in a simple sentence'
      },
      {
        input: ['Complicated', 'sentence', 'with', 'difficult', 'words'],
        expected: 3,
        message: 'Two difficult words in the sentence'
      },
      { input: ['Simple', 'easy', 'short', 'words'], expected: 0, message: 'All words are easy' },
      {
        input: ['Antidisestablishmentarianism', 'is', 'a', 'long', 'word'],
        expected: 1,
        message: 'One long difficult word'
      },
      { input: [], expected: 0, message: 'should handle empty array' }
      // Add more test cases as needed
    ])('$message input: $input', async ({ input, expected }) => {
      expect(await countDifficultWords(input)).toBe(expected)
    })
  })
})
