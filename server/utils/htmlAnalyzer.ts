
import { load } from 'cheerio'
import type { CheerioAPI } from 'cheerio'
import type { Heading, Link, LinksGroup, ContentJson } from './interfaces'
/**
 * Analyzes HTML content for SEO-related elements and metrics.
 * @param content Contains the HTML text to be analyzed.
 * @param siteDomainName The domain name of the site, used to determine internal links.
 * @returns Object with methods for HTML content analysis.
 */
export function useHtmlAnalyzer(content: ContentJson, siteDomainName: string | null = null) {
  const htmlDom: CheerioAPI = load(content.htmlText)
  const bodyText = htmlDom.text().toLowerCase()

  /**
   * Retrieves all link elements ('a' tags) from the HTML content.
   * @returns An array of Link objects with href and text properties.
   */
  function getAllLinks(): Link[] {
    const allLinks: Link[] = []
    htmlDom('a').each((index, element) => {
      const hrefElement = htmlDom(element)
      const href = hrefElement.attr('href')
      const text = hrefElement.text()
      if (href) {
        allLinks.push({ href, text })
      }
    })
    return allLinks
  }

  /**
   * Retrieves all heading elements (h1, h2, h3, h4, h5, h6) from the HTML content.
   * @returns An array of Heading objects with text and tag properties.
   */
  function getAllHeadingTags(): Heading[] {
    const allHeadingTags: Heading[] = []
    htmlDom('h1,h2,h3,h4,h5,h6').each((index, element) => {
      const headingElement = htmlDom(element)
      allHeadingTags.push({
        text: headingElement.text(),
        tag: headingElement.prop('tagName')
      })
    })
    return allHeadingTags
  }

  /**
   * Determines if a given link is relative (not an absolute URL).
   * @param href The href attribute of the link.
   * @returns True if the link is relative, false otherwise.
   */
  function isRelativeLink(href: string): boolean {
    return (
      href.startsWith('./') ||
      href.startsWith('../') ||
      href.startsWith('/') ||
      href.startsWith('#')
    )
  }

  /**
   * Determines if a given link is a mailto link.
   * @param href The href attribute of the link.
   * @returns True if the link is a mailto link, false otherwise.
   */
  function isMailToLink(href: string): boolean {
    return href.startsWith('mailto:')
  }

  /**
   * Determines if a given link is internal to the site.
   * @param href The href attribute of the link.
   * @returns True if the link is internal, false otherwise.
   */
  function isInternalLink(href: string): boolean {
    return (
      (siteDomainName && href.includes(siteDomainName) && href.startsWith('http://')) ||
      (isRelativeLink(href) && !isMailToLink(href))
    )
  }

  /**
   * Retrieves all outbound (external) links from the HTML content.
   * @returns An object of type LinksGroup containing arrays of all, duplicate, and unique outbound links.
   */
  function getOutboundLinks(): LinksGroup {
    const allLinks = getAllLinks()
    const outboundLinks = {
      all: [] as Link[],
      duplicate: [] as Link[],
      unique: [] as Link[]
    }

    allLinks.forEach((link) => {
      if (link.href && !isInternalLink(link.href)) {
        outboundLinks.all.push(link)
        if (!outboundLinks.unique.find((l) => l.href === link.href)) {
          outboundLinks.unique.push(link)
        } else {
          outboundLinks.duplicate.push(link)
        }
      }
    })

    return outboundLinks
  }

  /**
   * Retrieves all internal links from the HTML content.
   * @returns An object of type LinksGroup containing arrays of all, duplicate, and unique internal links.
   */
  function getInternalLinks(): LinksGroup {
    const allLinks = getAllLinks()
    const internalLinks = {
      all: [] as Link[],
      duplicate: [] as Link[],
      unique: [] as Link[]
    }

    allLinks.forEach((link) => {
      if (link.href && isInternalLink(link.href)) {
        internalLinks.all.push(link)
        if (!internalLinks.unique.find((l) => l.href === link.href)) {
          internalLinks.unique.push(link)
        } else {
          internalLinks.duplicate.push(link)
        }
      }
    })

    return internalLinks
  }

  /**
   * Converts a string of content to a string with normalized whitespace.
   * @param stringContent The content to normalize.
   * @returns A string with normalized whitespace.
   */
  function getPureText(stringContent: string) {
    return stringContent.trim().replace(/\s+/gi, ' ')
  }

  /**
   * Calculates the word count of a given string.
   * @param stringContent The string content for which to count words.
   * @returns The word count of the string.
   */
  function getWordCount(stringContent: string | null = null): number {
    const content = stringContent ? stringContent.toLowerCase() : bodyText
    return getPureText(content).split(' ').length
  }

  /**
   * Calculates the total number of unique internal links.
   * @returns The count of unique internal links.
   */
  function totalUniqueInternalLinksCount(): number {
    return getInternalLinks().unique.length
  }

  /**
   * Calculates the total number of unique external links.
   * @returns The count of unique external links.
   */
  function totalUniqueExternalLinksCount(): number {
    return getOutboundLinks().unique.length
  }

  /**
   * Calculates the word count of the content's title.
   * @returns The word count of the title.
   */
  function getTitleWordCount(): number {
    return getWordCount(content.title)
  }

  return {
    getAllLinks,
    getAllHeadingTags,
    getOutboundLinks,
    getInternalLinks,
    getWordCount,
    totalUniqueInternalLinksCount,
    totalUniqueExternalLinksCount,
    getTitleWordCount
  }
}
