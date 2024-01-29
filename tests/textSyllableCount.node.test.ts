import { getSyllableCount, countSyllables } from '~/server/utils/text/textSyllableCount'
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

describe('Text Syllable Count Tests', () => {
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
})
