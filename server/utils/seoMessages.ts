import type { ContentJson, Heading, KeywordDensity, LinksGroup } from './interfaces'

// Assuming these constants are defined in a constants file or somewhere appropriate
const MINIMUM_KEYWORD_DENSITY = 0.46
const MAXIMUM_KEYWORD_DENSITY = 1.1
const MAXIMUM_SUB_KEYWORD_DENSITY = 0.9
const MINIMUM_SUB_KEYWORD_DENSITY = 0.12
const EXTREME_LOW_SUB_KEYWORD_DENSITY = 0.09
const MAXIMUM_TITLE_LENGTH = 70
const MINIMUM_TITLE_LENGTH = 40
const MAXIMUM_META_DESCRIPTION_LENGTH = 160
const MAXIMUM_SUB_KEYWORD_IN_META_DESCRIPTION_DENSITY = 5
const MINIMUM_SUB_KEYWORD_IN_META_DESCRIPTION_DENSITY = 2

export function useSeoMessages(
  content: ContentJson,
  keywordDensity: number,
  subKeywordsDensity: KeywordDensity[],
  headings: Heading[],
  links: { internal: LinksGroup; outbound: LinksGroup }
) {
  const messages = {
    warnings: [] as string[],
    minorWarnings: [] as string[],
    goodPoints: [] as string[]
  }

  function assignMessagesForKeyword() {
    if (content.keyword) {
      messages.goodPoints.push(`Good, your content has a keyword "${content.keyword}".`)

      if (keywordDensity > MAXIMUM_KEYWORD_DENSITY) {
        messages.warnings.push('Serious keyword overstuffing.')
      } else if (keywordDensity < MINIMUM_KEYWORD_DENSITY) {
        messages.warnings.push(
          `Keyword density is too low. It is ${keywordDensity.toFixed(2)}%, try increasing it.`
        )
      } else {
        messages.goodPoints.push(`Keyword density is ${keywordDensity.toFixed(2)}%.`)
      }
    } else {
      messages.warnings.push('Missing main keyword, please add one.')
    }
  }

  function assignMessagesForSubKeywords() {
    if (content.subKeywords.length > 0) {
      messages.goodPoints.push(
        `Good, your content has sub keywords "${content.subKeywords.join(', ')}".`
      )

      subKeywordsDensity.forEach(({ keyword, density }) => {
        if (density > MAXIMUM_SUB_KEYWORD_DENSITY) {
          messages.warnings.push(
            `The density of sub keyword "${keyword}" is too high in the content, i.e. ${density.toFixed(
              2
            )}%.`
          )
        } else if (density < MINIMUM_SUB_KEYWORD_DENSITY) {
          let densityStatus = density < EXTREME_LOW_SUB_KEYWORD_DENSITY ? 'too low' : 'low'
          messages.minorWarnings.push(
            `The density of sub keyword "${keyword}" is ${densityStatus} in the content, i.e. ${density.toFixed(
              2
            )}%.`
          )
        } else {
          messages.goodPoints.push(
            `The density of sub keyword "${keyword}" is ${density.toFixed(
              2
            )}% in the content, which is good.`
          )
        }
      })
    } else {
      messages.minorWarnings.push('Missing sub keywords, please add some.')
    }
  }

  function assignMessagesForTitle() {
    if (content.title) {
      if (content.title.length > MAXIMUM_TITLE_LENGTH) {
        messages.warnings.push('Title tag is too long.')
      } else if (content.title.length < MINIMUM_TITLE_LENGTH) {
        messages.warnings.push('Title tag is too short.')
      } else {
        messages.goodPoints.push(`Title tag is ${content.title.length} characters long.`)
      }
    } else {
      messages.warnings.push('Missing title tag, please add one.')
    }
  }

  function assignMessagesForMetaDescription() {
    if (content.metaDescription) {
      if (content.metaDescription.length > MAXIMUM_META_DESCRIPTION_LENGTH) {
        messages.warnings.push(
          `Meta description is too long. It is ${content.metaDescription.length} characters long, try reducing it.`
        )
      } else {
        messages.goodPoints.push(
          `Meta description is ${content.metaDescription.length} characters long.`
        )
      }
    } else {
      messages.warnings.push('Missing meta description.')
    }
  }

  function assignMessagesForLinks() {
    const internalLinksCount = links.internal.unique.length
    const outboundLinksCount = links.outbound.unique.length

    // Example logic for internal links
    if (internalLinksCount < 5) {
      messages.warnings.push(
        `Not enough internal links. You only have ${internalLinksCount} unique internal links.`
      )
    } else {
      messages.goodPoints.push(`You have ${internalLinksCount} internal links.`)
    }

    // Example logic for outbound links
    if (outboundLinksCount < 3) {
      messages.warnings.push(
        `Not enough outbound links. You only have ${outboundLinksCount} outbound links.`
      )
    } else {
      messages.goodPoints.push(`You have ${outboundLinksCount} outbound links.`)
    }
    // Add logic for duplicate links if needed
  }

  function assignMessagesForHeadings() {
    if (headings.length === 0) {
      messages.warnings.push('Missing headings, please add at least one heading tag.')
    } else {
      messages.goodPoints.push(`You have ${headings.length} headings.`)
    }
    // Additional logic based on specific heading requirements
  }

  // Call all message assignment methods
  assignMessagesForKeyword()
  assignMessagesForSubKeywords()
  assignMessagesForTitle()
  assignMessagesForLinks()
  assignMessagesForMetaDescription()
  assignMessagesForHeadings()

  return messages
}
