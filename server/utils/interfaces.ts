export interface Link {
  text: string
  href: string
}
export interface LinksGroup {
  all: Link[]
  duplicate: Link[]
  unique: Link[]
}
export interface KeywordDensity {
  area: string
  keyword: string
  density: number
  position?: number
}
export interface ContentJson {
  title: string
  keyword: string
  subKeywords: string[]
  htmlText: string
  metaDescription: string
  languageCode: string
  countryCode: string
}

export interface Keywords {
  primary: {
    body: KeywordDensity
    inTitle: KeywordDensity
    inMetaDescription: KeywordDensity
  }
  secondary: {
    body: KeywordDensity[]
    inTitle: KeywordDensity[]
    inMetaDescription: KeywordDensity[]
  },
  primaryArray: KeywordDensity[]
  secondaryArray: KeywordDensity[]
  score?: number
}

export interface MessageData {
  keywords: Keywords
  links: {
    internal: LinksGroup
    outbound: LinksGroup
  }
  headings: Heading[]
}

export interface Heading {
  text: string
  tag: string
}

export interface Messages {
  warnings: string[]
  goodPoints: string[]
  minorWarnings: string[]
}

export interface SeoData {
  seoScore: number
  wordCount: number
  keywordSeoScore: number
  keywordFrequency: number
  messages: Messages
  keywordDensity: number
  subKeywordDensity: KeywordDensity[]
  totalLinks: number
  internalLinks: LinksGroup
  outboundLinks: LinksGroup
  titleSEO: {
    subKeywordsWithTitle: KeywordDensity[]
    keywordWithTitle: KeywordDensity
    wordCount: number
  }
}
