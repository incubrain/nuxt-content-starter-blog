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

export interface Heading {
  text: string
  tag: string
}

export interface SeoData {
  seoScore: number
  wordCount: number
  keywordSeoScore: number
  keywordFrequency: number
  messages: { warnings: string[]; goodPoints: string[]; minorWarnings: string[] }
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
