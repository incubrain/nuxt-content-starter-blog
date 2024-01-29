import { describe, test, expect } from 'vitest'
import { getAllHeadingTags, getTitleWordCount } from '~/server/utils/html/htmlHeadings'
import { load } from 'cheerio'

describe('HTML Processing Tests', () => {
  describe('getAllHeadingTags Tests', () => {
    test.each([
      {
        html: '<h1>Title</h1><h2>Subtitle</h2>',
        expected: [
          { text: 'Title', tag: 'H1' },
          { text: 'Subtitle', tag: 'H2' }
        ],
        message: 'HTML with multiple headings'
      },
      {
        html: '<div><h3>Nested <span>heading</span></h3></div>',
        expected: [{ text: 'Nested heading', tag: 'H3' }],
        message: 'HTML with nested heading elements'
      },
      {
        html: '<p>No headings</p>',
        expected: [],
        message: 'HTML with no heading tags'
      }
      // Additional test cases can be added here
    ])('$message', ({ html, expected }) => {
      const dom = load(html)
      expect(getAllHeadingTags(dom)).toEqual(expected)
    })
  })

  describe('getTitleWordCount Tests', () => {
    test.each([
      {
        title: 'This is a test title',
        expected: 5,
        message: 'Title with multiple words'
      },
      {
        title: '',
        expected: 0,
        message: 'Empty title'
      },
      {
        title: 'Title',
        expected: 1,
        message: 'Single-word title'
      },
      {
        title: '  Spaces  before and after  ',
        expected: 4,
        message: 'Title with extra spaces'
      }
      // Additional test cases can be added here
    ])('$message', ({ title, expected }) => {
      expect(getTitleWordCount(title)).toBe(expected)
    })
  })
})
