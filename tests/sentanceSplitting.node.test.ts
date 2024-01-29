import { splitSentences } from '~/server/utils/text/textSplit'
import { processText } from '~/server/utils/text/textProcessing'
import { describe, test, expect } from 'vitest'

describe('Sentence Splitting Tests', () => {
  // Define test cases
  const testCases = [
    {
      text: 'Dr. Smith is here. He is speaking.',
      expectedCount: 2,
      message: 'Handles abbreviations like "Dr." correctly'
    },
    {
      text: 'This is a test. This is only a test.',
      expectedCount: 2,
      message: 'Splits regular sentences correctly'
    },
    {
      text: 'No punctuation means one sentence',
      expectedCount: 1,
      message: 'Handles text without punctuation'
    },
    {
      text: 'What about questions? And exclamations!',
      expectedCount: 2,
      message: 'Handles different types of sentence endings'
    },
    {
      text: 'Mr. and Mrs. Smith went to Washington D.C. It was fun.',
      expectedCount: 2,
      message: 'Handles multiple abbreviations'
    },
    {
      text: 'She said, "Hello! How are you?" and walked away.',
      expectedCount: 1,
      message: 'Handles direct speech with punctuation'
    },
    {
      text: '',
      expectedCount: 0,
      message: 'Handles empty string correctly'
    },
    {
      text: 'A sentence without end', // Intentionally missing period
      expectedCount: 1,
      message: 'Handles sentences without a closing punctuation'
    },
    {
      text: 'Special cases: e.g., i.e., etc. are tricky.',
      expectedCount: 1,
      message: 'Handles special cases like e.g., i.e., etc.'
    }
    // Add more test cases as needed
  ]

  test.each(testCases)('$message', ({ text, expectedCount }) => {
    const processedText = processText(text)
    console.log('processedText', processedText)
    const sentences = splitSentences(processedText)
    console.log('processedText', sentences, 'expected: ', expectedCount)
    expect(sentences.length).toBe(expectedCount)
  })
})
