import { load } from 'cheerio'
import type { CheerioAPI } from 'cheerio'
import type { Heading, Link, LinksGroup, ContentJson } from './interfaces'

export function useHtmlAnalyzer(content: ContentJson, siteDomainName: string | null = null) {
  const htmlDom: CheerioAPI = load(content.htmlText)
  const bodyText = htmlDom.text().toLowerCase()

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

  function isRelativeLink(href: string): boolean {
    return (
      href.startsWith('./') ||
      href.startsWith('../') ||
      href.startsWith('/') ||
      href.startsWith('#')
    )
  }

  function isMailToLink(href: string): boolean {
    return href.startsWith('mailto:')
  }

  function isInternalLink(href: string): boolean {
    return (
      (siteDomainName && href.includes(siteDomainName) && href.startsWith('http://')) ||
      (isRelativeLink(href) && !isMailToLink(href))
    )
  }

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

  function getPureText(stringContent: string) {
    return stringContent.trim().replace(/\s+/gi, ' ')
  }

  function getWordCount(stringContent: string | null = null): number {
    const content = stringContent ? stringContent.toLowerCase() : bodyText
    return getPureText(content).split(' ').length
  }

  function totalUniqueInternalLinksCount(): number {
    return getInternalLinks().unique.length
  }

  function totalUniqueExternalLinksCount(): number {
    return getOutboundLinks().unique.length
  }

  function getTitleWordCount(): number {
    return getWordCount(content.title)
  }

  function filterHeading(headings: Heading[], headingTag: string): Heading[] {
    return headings.filter((heading) => heading.tag.toLowerCase() === headingTag.toLowerCase())
  }

  return {
    getAllLinks,
    getAllHeadingTags,
    getOutboundLinks,
    getInternalLinks,
    getWordCount,
    totalUniqueInternalLinksCount,
    totalUniqueExternalLinksCount,
    getTitleWordCount,
    filterHeading
  }
}
