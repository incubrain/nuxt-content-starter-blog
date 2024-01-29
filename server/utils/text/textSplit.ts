export function splitSentences(text: string): string[] {
  if (!text) return []
  const sentenceFragments = text.split(/([.!?]["']?\s+|["']?[.!?]$)/)
  let sentences: string[] = []
  let currentSentence = ''

  sentenceFragments.forEach((fragment, i) => {
    if (!fragment) return

    currentSentence += fragment

    // Check if the fragment ends with a punctuation followed by a space, a line break, or is the last fragment
    if (/[.!?]["']?\s+$/.test(fragment) || i === sentenceFragments.length - 1) {
      // Add the current sentence to the sentences array and reset currentSentence
      sentences.push(currentSentence.trim())
      currentSentence = ''
    }
  })

  return sentences
}

export function splitWords(text: string) {
  // Split the text into words
  const words = text.split(/\s+/)

  // Filter out any empty strings that may have been created by multiple spaces
  return words.filter((word) => word.length > 0)
}
