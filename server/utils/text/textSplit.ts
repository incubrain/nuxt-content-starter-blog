export function splitSentences(text: string): string[] {
  if (!text) return []

  let sentences = []
  let currentSentence = ''
  let insideQuotes = false

  for (const char of text) {
    currentSentence += char

    if (char === '"' || char === "'") insideQuotes = !insideQuotes

    if (!insideQuotes && /[.!?]/.test(char)) {
      // Check if the next character is not a letter or the end of text
      if (!/[A-Za-z]/.test(text.charAt(text.indexOf(char) + 1))) {
        sentences.push(currentSentence.trim())
        currentSentence = ''
      }
    }
  }

  // Handling the last sentence if not empty
  if (currentSentence) sentences.push(currentSentence.trim())

  return sentences
}

export function splitWords(text: string) {
  // Split the text into words
  const words = text.split(/\s+/)

  // Filter out any empty strings that may have been created by multiple spaces
  return words.filter((word) => word.length > 0)
}
