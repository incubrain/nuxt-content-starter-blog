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
  // Normalize whitespace
  text = text.replace(/\s+/g, ' ')

  // Normalize the string to handle Unicode characters
  text = text.normalize('NFKD')

  // Replace ellipses with a space
  text = text.replace(/\.{3}/g, ' ')

  // Remove periods from abbreviations to protect them from being split
  text = text.replace(abbreviationRegex, (match) => match.replace('.', ''))

  // Ensure a space after punctuation if followed by a letter
  text = text.replace(/([.!?])([A-Za-z])/g, '$1 $2')

  // Remove apostrophes (considering contractions)
  text = text.replace(/'\b|\b'/g, '')

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