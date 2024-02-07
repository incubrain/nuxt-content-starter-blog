import { describe, test, expect } from 'vitest'
import {
  getAllLinks,
  isRelativeLink,
  isMailToLink,
  isInternalLink,
  getExternalLinks,
  getInternalLinks
} from '~/server/utils/html/htmlLinks'
import { load } from 'cheerio'

describe('HTML Links Processing Tests', () => {
  describe('getAllLinks Tests', () => {
    test.each([
      {
        html: '<a href="http://example.com">External Link</a><a href="/internal">Internal Link</a>',
        expected: [
          { href: 'http://example.com', text: 'External Link' },
          { href: '/internal', text: 'Internal Link' }
        ],
        message: 'HTML with internal and external links'
      },
      {
        html: '<a>No href</a>',
        expected: [],
        message: 'HTML with a tag without href'
      }
      // Additional test cases can be added here
    ])('$message', ({ html, expected }) => {
      const dom = load(html)
      expect(getAllLinks(dom)).toEqual(expected)
    })
  })

  describe('Link Type Tests', () => {
    test.each([
      { input: '/relative', expected: true, func: isRelativeLink, message: 'Relative link' },
      {
        input: 'http://example.com',
        expected: false,
        func: isRelativeLink,
        message: 'Absolute URL'
      },
      {
        input: 'mailto:test@example.com',
        expected: true,
        func: isMailToLink,
        message: 'Mailto link'
      },
      {
        input: 'http://example.com',
        expected: false,
        func: isMailToLink,
        message: 'Non-mailto link'
      },
      {
        input: 'http://localhost:3000/internal',
        expected: true,
        func: isInternalLink,
        message: 'Internal url'
      },
      {
        input: 'http://external.com',
        expected: false,
        func: isInternalLink,
        message: 'External link'
      },
      {
        input: '#toc-link',
        expected: true,
        func: isInternalLink,
        message: 'Internal Hash Link'
      }

      // Additional test cases can be added here
    ])('$input $message', ({ input, expected, func }) => {
      expect(func(input)).toBe(expected)
    })
  })

  describe('getExternalLinks and getInternalLinks Tests', () => {
    const allLinks = [
      { href: 'http://example.com', text: 'External' },
      { href: 'mailto:test@example.com', text: 'Mail' },
      { href: '/internal', text: 'Internal' },
      { href: '/internal', text: 'Internal Duplicate' },
      { href: '#toc-link', text: 'Internal Hash Link' }
    ]

    test('getExternalLinks', () => {
      const expected = {
        all: [{ href: 'http://example.com', text: 'External' }],
        duplicate: [],
        unique: [{ href: 'http://example.com', text: 'External' }]
      }
      expect(getExternalLinks(allLinks)).toEqual(expected)
    })

    test('getInternalLinks', () => {
      const expected = {
        all: [
          { href: '/internal', text: 'Internal' },
          { href: '/internal', text: 'Internal Duplicate' },
          { href: '#toc-link', text: 'Internal Hash Link' }
        ],
        duplicate: [{ href: '/internal', text: 'Internal Duplicate' }],
        unique: [
          { href: '/internal', text: 'Internal' },
          { href: '#toc-link', text: 'Internal Hash Link' }
        ]
      }
      expect(getInternalLinks(allLinks)).toEqual(expected)
    })
  })
})
