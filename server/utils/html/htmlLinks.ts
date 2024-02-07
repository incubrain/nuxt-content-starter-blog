import { CheerioAPI } from 'cheerio'
import { LinksGroup } from '../interfaces'

/**
 * Retrieves all link elements ('a' tags) from the HTML content.
 * @returns An array of Link objects with href and text properties.
 */

// !todo make dynamic
const siteDomainName = 'http://localhost:3000'

export function getAllLinks(dom: CheerioAPI): Link[] {
  const allLinks: Link[] = []
  dom('a').each((index, element) => {
    const hrefElement = dom(element)
    const href = hrefElement.attr('href')
    const text = hrefElement.text()
    if (href) {
      allLinks.push({ href, text })
    }
  })
  return allLinks
}

/**
 * Determines if a given link is relative (not an absolute URL).
 * @param href The href attribute of the link.
 * @returns True if the link is relative, false otherwise.
 */
export function isRelativeLink(href: string): boolean {
  return (
    href.startsWith('./') || href.startsWith('../') || href.startsWith('/') || !href.startsWith('#')
  )
}

/**
 * Determines if a given link is a mailto link.
 * @param href The href attribute of the link.
 * @returns True if the link is a mailto link, false otherwise.
 */
export function isMailToLink(href: string): boolean {
  return href.startsWith('mailto:')
}

/**
 * Determines if a given link is internal to the site.
 * @param href The href attribute of the link.
 * @returns True if the link is internal, false otherwise.
 */
export function isInternalLink(href: string): boolean {
  return (
    (siteDomainName && href.startsWith(siteDomainName)) ||
    (isRelativeLink(href) && !isMailToLink(href))
  )
}

/**
 * Retrieves all outbound (external) links from the HTML content.
 * @returns An object of type LinksGroup containing arrays of all, duplicate, and unique outbound links.
 */
export function getExternalLinks(allLinks: Link[]): LinksGroup {
  const outboundLinks = {
    all: [] as Link[],
    duplicate: [] as Link[],
    unique: [] as Link[]
  }

  allLinks.forEach((link) => {
    if (!link.href || isInternalLink(link.href)) return
    outboundLinks.all.push(link)
    if (!outboundLinks.unique.find((l) => l.href === link.href)) {
      outboundLinks.unique.push(link)
    } else {
      outboundLinks.duplicate.push(link)
    }
  })

  return outboundLinks
}

/**
 * Retrieves all internal links from the HTML content.
 * @returns An object of type LinksGroup containing arrays of all, duplicate, and unique internal links.
 */
export function getInternalLinks(allLinks: Link[]): LinksGroup {
  const internalLinks = {
    all: [] as Link[],
    duplicate: [] as Link[],
    unique: [] as Link[]
  }

  allLinks.forEach((link) => {
    if (!link.href || !isInternalLink(link.href)) return

    internalLinks.all.push(link)
    if (!internalLinks.unique.find((l) => l.href === link.href)) {
      internalLinks.unique.push(link)
    } else {
      internalLinks.duplicate.push(link)
    }
  })

  return internalLinks
}

export function getLinks(links: Link[]) {
  const internalLinks = getInternalLinks(links)
  const externalLinks = getExternalLinks(links)

  return {
    links: {
      internal: internalLinks,
      external: externalLinks
    }
  }
}
