import { describe, test, expect } from 'vitest';
import { getAllLinks, isRelativeLink, isMailToLink, isInternalLink, getOutboundLinks, getInternalLinks } from '~/server/utils/html/htmlLinks';
import { load } from 'cheerio';

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
      },
      // Additional test cases can be added here
    ])('$message', ({ html, expected }) => {
      const dom = load(html);
      expect(getAllLinks(dom)).toEqual(expected);
    });
  });

  describe('Link Type Tests', () => {
    test.each([
      { href: '/relative', expected: true, function: isRelativeLink, message: 'Relative link' },
      { href: 'http://example.com', expected: false, function: isRelativeLink, message: 'Absolute URL' },
      { href: 'mailto:test@example.com', expected: true, function: isMailToLink, message: 'Mailto link' },
      { href: 'http://example.com', expected: false, function: isMailToLink, message: 'Non-mailto link' },
      { href: 'http://localhost:3000/internal', expected: true, function: isInternalLink, message: 'Internal link in development' },
      { href: 'https://nuxt-content-starter-blog.vercel.app/internal', expected: true, function: isInternalLink, message: 'Internal link in production' },
      { href: 'http://external.com', expected: false, function: isInternalLink, message: 'External link' },
      // Additional test cases can be added here
    ])('$message', ({ href, expected, function }) => {
      expect(function(String(href))).toBe(expected);
    });
  });

  describe('getOutboundLinks and getInternalLinks Tests', () => {
    const allLinks = [
      { href: 'http://example.com', text: 'External' },
      { href: 'mailto:test@example.com', text: 'Mail' },
      { href: '/internal', text: 'Internal' },
      { href: '/internal', text: 'Internal Duplicate' }
    ];

    test('getOutboundLinks', () => {
      const expected = {
        all: [{ href: 'http://example.com', text: 'External' }],
        duplicate: [],
        unique: [{ href: 'http://example.com', text: 'External' }]
      };
      expect(getOutboundLinks(allLinks)).toEqual(expected);
    });

    test('getInternalLinks', () => {
      const expected = {
        all: [
          { href: '/internal', text: 'Internal' },
          { href: '/internal', text: 'Internal Duplicate' }
        ],
        duplicate: [{ href: '/internal', text: 'Internal Duplicate' }],
        unique: [{ href: '/internal', text: 'Internal' }]
      };
      expect(getInternalLinks(allLinks)).toEqual(expected);
    });
  });
});
