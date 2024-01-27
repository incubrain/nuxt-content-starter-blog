import type { ContentJson, MessageData, KeywordDensity } from './interfaces'
import * as config from './seoConfig'

// Assuming these constants are defined in a constants file or somewhere appropriate

export function useSeoMessages({
  content,
  messageData
}: {
  content: ContentJson
  messageData: MessageData
}) {
  const messages = {
    warnings: [] as string[],
    minorWarnings: [] as string[],
    goodPoints: [] as string[]
  }

  const { headings, links, keywords } = messageData
  const { primary, secondary } = keywords

  const primaryBody = primary.body
  const primaryTitle = primary.inTitle
  const primaryMeta = primary.inMetaDescription
  const secondaryBody = secondary.body
  const secondaryTitle = secondary.inTitle
  const secondaryMeta = secondary.inMetaDescription


  function filterHeading(headingTag: string): Heading[] {
    return headings.filter((heading) => heading.tag.toLowerCase() === headingTag.toLowerCase())
  }

  // Utility function to add a message based on condition
  function addMessage(
    condition: boolean,
    message: string,
    type: 'warnings' | 'minorWarnings' | 'goodPoints'
  ) {
    if (condition) {
      messages[type].push(message)
    }
  }

  // Evaluate density for a keyword
  function evaluateKeywordDensity(keywordData: KeywordDensity, type: 'primary' | 'sub') {
    const { keyword, density } = keywordData
    const isPrimary = type === 'primary'

    addMessage(
      density > config.KEYWORD_DENSITY_MAX_THRESHOLD && isPrimary,
      `Serious keyword overstuffing. Current: ${density.toFixed(2)}%,
        Max: ${config.KEYWORD_DENSITY_MAX_THRESHOLD}%.`,
      'warnings'
    )
    addMessage(
      density < config.KEYWORD_DENSITY_MIN_THRESHOLD && isPrimary,
      `Keyword density is too low in the content: ${density.toFixed(2)}%, try increasing it.`,
      'warnings'
    )
    addMessage(
      density >= config.KEYWORD_DENSITY_MIN_THRESHOLD &&
        density <= config.KEYWORD_DENSITY_MAX_THRESHOLD &&
        isPrimary,
      `Keyword density is ${density.toFixed(2)}%.`,
      'goodPoints'
    )

    // Sub-keyword specific evaluations
    if (!isPrimary) {
      const densityStatus =
        density < config.SUB_KEYWORD_DENSITY_VERY_LOW_THRESHOLD ? 'too low' : 'low'
      addMessage(
        density > config.SUB_KEYWORD_DENSITY_MAX_THRESHOLD,
        `Sub keyword "${keyword}" density is too high in content: ${density.toFixed(2)}%.`,
        'warnings'
      )
      addMessage(
        density < config.SUB_KEYWORD_DENSITY_MIN_THRESHOLD,
        `Sub keyword "${keyword}" density is ${densityStatus} in content: ${density.toFixed(2)}%.`,
        'minorWarnings'
      )
      addMessage(
        density >= config.SUB_KEYWORD_DENSITY_MIN_THRESHOLD &&
          density <= config.SUB_KEYWORD_DENSITY_MAX_THRESHOLD,
        `Sub keyword "${keyword}" density is ${density.toFixed(2)}% in the content`,
        'goodPoints'
      )
    }
  }

  // Evaluate keyword-related messages
  function evaluateKeywords() {
    addMessage(!content.keyword, 'Missing main keyword, please add one.', 'warnings')
    addMessage(
      content.keyword.length > 0,
      `Good, your content has a keyword "${content.keyword}".`,
      'goodPoints'
    )

    evaluateKeywordDensity(primaryBody, 'primary')
    secondaryBody.forEach((keyword) => evaluateKeywordDensity(keyword, 'sub'))
  }

  function evaluateTitle() {
    const titleLength = content.title.length
    addMessage(titleLength > config.TITLE_MAX_LENGTH, 'Title tag is too long.', 'warnings')
    addMessage(titleLength < config.TITLE_MIN_LENGTH, 'Title tag is too short.', 'warnings')
    addMessage(
      titleLength >= config.TITLE_MIN_LENGTH && titleLength <= config.TITLE_MAX_LENGTH,
      `Title tag is ${titleLength} characters long.`,
      'goodPoints'
    )
  }

  // Evaluate meta description-related messages
  function evaluateMetaDescription() {
    const metaLength = content.metaDescription.length

    addMessage(!content.metaDescription, 'Missing meta description.', 'warnings')
    addMessage(
      metaLength > config.META_DESCRIPTION_MAX_LENGTH,
      `Meta description is too long: ${metaLength} characters long.`,
      'warnings'
    )
    addMessage(
      metaLength < 100,
      `Meta description is too short: ${metaLength} characters long.`,
      'warnings'
    )
    addMessage(
      metaLength <= config.META_DESCRIPTION_MAX_LENGTH && metaLength >= 100,
      `Meta description is ${metaLength} characters long.`,
      'goodPoints'
    )

    evaluateKeywordDensity(primaryMeta, 'primary')
    secondaryMeta.forEach((keyword) => evaluateKeywordDensity(keyword, 'sub'))
  }

  // Evaluate link-related messages
  function evaluateLinks() {
    const internalLinksCount = links.internal.unique.length
    const outboundLinksCount = links.outbound.unique.length

    addMessage(
      internalLinksCount < 5,
      `Not enough internal links. Only ${internalLinksCount} unique internal links.`,
      'warnings'
    )
    addMessage(
      outboundLinksCount < 3,
      `Not enough outbound links. Only ${outboundLinksCount} outbound links.`,
      'warnings'
    )
    addMessage(
      internalLinksCount >= 5,
      `You have ${internalLinksCount} internal links.`,
      'goodPoints'
    )
    addMessage(
      outboundLinksCount >= 3,
      `You have ${outboundLinksCount} outbound links.`,
      'goodPoints'
    )
  }

  // Evaluate heading-related messages
  function evaluateHeadings() {
    addMessage(
      headings.length === 0,
      'Missing headings, please add at least one heading tag.',
      'warnings'
    )
    addMessage(headings.length > 0, `You have ${headings.length} headings.`, 'goodPoints')
    ;['h1', 'h2', 'h3'].forEach((tag) => {
      const headingCount = filterHeading(tag).length
      const isH1 = tag === 'h1'
      addMessage(
        isH1 && headingCount === 0,
        'Missing h1 tag, please add at least one h1 tag.',
        'warnings'
      )
      addMessage(
        isH1 && headingCount > 1,
        'More than one h1 tag found, please remove all but one h1 tag.',
        'warnings'
      )
      addMessage(
        isH1 && headingCount === 1,
        'You have an h1 tag, which is essential.',
        'goodPoints'
      )
      addMessage(
        !isH1 && headingCount === 0,
        `Missing ${tag} tag, please add at least one ${tag} tag.`,
        'minorWarnings'
      )
      addMessage(!isH1 && headingCount > 0, `You have ${tag} tag(s).`, 'goodPoints')
    })
    evaluateKeywordDensity(primaryTitle, 'primary')
    secondaryTitle.forEach((keyword) => evaluateKeywordDensity(keyword, 'sub'))
  }

  // Call all message assignment methods
  evaluateKeywords()
  evaluateTitle()
  evaluateMetaDescription()
  evaluateLinks()
  evaluateHeadings()

  return messages
}
