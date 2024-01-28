import { splitSentences } from '~/server/utils/seo/seoReadability'
import { describe, test, expect } from 'vitest'

describe('Sentence Splitting Tests', () => {
  test('Split sentences correctly', () => {
    const text = 'Dr. Smith is here. He is speaking.'
    const sentences = splitSentences(text)
    expect(sentences.length).toBe(2)
    // Additional assertions
  })
})
