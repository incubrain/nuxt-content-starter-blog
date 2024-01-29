import { extractTextFromHtml } from '~/server/utils/seo/seoReadability'
import { describe, test, expect } from 'vitest'

describe('HTML Processing Tests', () => {
  test.each([
    {
      html: '<div>Hello <b>world</b></div>',
      expected: 'Hello world',
      message: 'Simple HTML structure'
    },
    {
      html: '<div><p>Nested <span>elements</span></p></div>',
      expected: 'Nested elements',
      message: 'Nested HTML elements'
    },
    {
      html: '<div>Text with <script>JavaScript code</script></div>',
      expected: 'Text with ',
      message: 'HTML with script tag'
    },
    {
      html: '<div>Text with <style>CSS code</style></div>',
      expected: 'Text with ',
      message: 'HTML with style tag'
    }
    // Add more test cases for different HTML contents and structures
  ])('$message', ({ html, expected }) => {
    expect(extractTextFromHtml(html)).toBe(expected)
  })
})
