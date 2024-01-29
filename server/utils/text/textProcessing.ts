import * as cheerio from 'cheerio'

const commonAbbreviations = [
  'Dr',
  'Mr',
  'Mrs',
  'Ms',
  'Prof',
  'Sr',
  'Jr',
  'St',
  'e\\.g',
  'i\\.e',
  'U\\.S\\.A',
  'etc',
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec'
]
const abbreviationRegex = new RegExp(`\\b(${commonAbbreviations.join('|')})\\.`, 'gi')

export function preprocessText(text: string) {
  // Normalize whitespace and Unicode characters
  text = text.replace(/\s+/g, ' ').normalize('NFKD')

  // Replace ellipses and apostrophes
  text = text.replace(/\.{3}/g, ' ')
  text = text.replace(/'\b|\b'/g, '')

  // Remove periods from abbreviations (like 'i.e.', 'e.g.', etc.)
  // text = text.replace(/\b([a-z]\.)+/g, (match) => match.replace(/\./g, ''))

  // Remove periods from abbreviations to protect them from being split
  text = text.replace(abbreviationRegex, (match) => match.replace(/\./g, ''))

  // Ensure a space after punctuation if followed by a letter
  text = text.replace(/([.!?])([a-z])/g, '$1 $2')

  return text
}

export function extractTextFromHtml(html: string): string {
  const $ = cheerio.load(html)
  $('script, style').remove() // Remove script and style elements
  return $('body').text() // Extract text from the body element
}

export function processText(text: string): string {
  text = extractTextFromHtml(text)
  text = preprocessText(text)
  return text
}
