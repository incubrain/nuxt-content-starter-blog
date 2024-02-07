/**
 * Converts a string of content to a string with normalized whitespace.
 * @param input The content to normalize.
 * @returns A string with normalized whitespace.
 */
export function getPureText(input: string) {
  return input.trim().replace(/\s+/gi, ' ')
}

/**
 * Calculates the word count of a given string.
 * @param input The string content for which to count words.
 * @returns The word count of the string.
 */
export function getWordCount(input: string): number {
  const content = input.toLowerCase()
  // return 0 if empty string
  if (!content) return 0
  return getPureText(content).split(' ').length
}
