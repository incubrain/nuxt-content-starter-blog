import type { Heading, ContentJson } from '../interfaces'
import type { CheerioAPI } from 'cheerio'
import { getWordCount } from './htmlBody'

/**
 * Retrieves all heading elements (h1, h2, h3, h4, h5, h6) from the HTML content.
 * @returns An array of Heading objects with text and tag properties.
 */
export function getAllHeadingTags(dom: CheerioAPI): Heading[] {
  const allHeadingTags: Heading[] = []
  dom('h1,h2,h3,h4,h5,h6').each((index, element) => {
    const headingElement = dom(element)
    allHeadingTags.push({
      text: headingElement.text(),
      tag: headingElement.prop('tagName')
    })
  })
  return allHeadingTags
}

/**
 * Calculates the word count of the content's title.
 * @returns The word count of the title.
 */
export function getTitleWordCount(title: string): number {
  return getWordCount(title)
}
