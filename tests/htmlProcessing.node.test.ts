import { extractTextFromHtml } from '~/server/utils/seo/seoReadability'
import { describe, test, expect } from 'vitest'

describe('HTML Processing Tests', () => {
  test('Extract text from HTML', () => {
    const html = '<div>Hello <b>world</b></div>'
    expect(extractTextFromHtml(html)).toBe('Hello world')
  })
})
