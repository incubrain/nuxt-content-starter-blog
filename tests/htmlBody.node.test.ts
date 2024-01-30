import { describe, test, expect } from 'vitest'
import { getPureText, getWordCount } from '~/server/utils/html/htmlBody'

describe('String Processing Tests', () => {
  describe('getPureText Tests', () => {
    test.each([
      {
        input: '  Hello   World  ',
        expected: 'Hello World',
        message: 'String with extra spaces'
      },
      {
        input: '\nNew\nLine\nCharacters\n',
        expected: 'New Line Characters',
        message: 'String with new line characters'
      },
      {
        input: 'Tab\tCharacters\tHere',
        expected: 'Tab Characters Here',
        message: 'String with tab characters'
      },
      {
        input: '',
        expected: '',
        message: 'Empty string'
      }
      // Additional test cases can be added here
    ])('$message', ({ input, expected }) => {
      expect(getPureText(input)).toBe(expected)
    })
  })

  describe('getWordCount Tests', () => {
    test.each([
      {
        input: 'This is a test sentence.',
        expected: 5,
        message: 'Normal sentence'
      },
      {
        input: '  Spaces  before  and  after  ',
        expected: 4,
        message: 'Sentence with extra spaces'
      },
      {
        input: '',
        expected: 0,
        message: 'Empty string'
      },
      {
        input: 'Punctuation! Is, not; counted?',
        expected: 4,
        message: 'Sentence with punctuation'
      },
      {
        input: 'Tabs\tand\nnewlines',
        expected: 3,
        message: 'Sentence with tabs and newlines'
      }
      // Additional test cases can be added here
    ])('$message', ({ input, expected }) => {
      expect(getWordCount(input)).toBe(expected)
    })
  })
})
