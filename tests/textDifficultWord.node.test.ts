import {
  countDifficultWords,
  isDifficultWord,
  isTechnicalTerm
} from '~/server/utils/text/textDifficultWord'
import { describe, test, expect } from 'vitest'

describe('Text Difficult Words Tests', () => {
  // Test for isTechnicalTerm
  describe('isTechnicalTerm', () => {
    test('should identify technical terms correctly', () => {
      const sampleTerm = 'variable'
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
