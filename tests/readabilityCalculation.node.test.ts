import {
  calculateReadability,
  calculateAggregateReadabilityScore,
  readabilityFormulasConfig
} from '~/server/utils/seo/seoReadability'
import { describe, test, expect } from 'vitest'

const readLevel = {
  firstToThird: { low: 90, high: 100 },
  fourthToSixth: { low: 80, high: 89 },
  seventhToNinth: { low: 60, high: 79 },
  tenthToTwelfth: { low: 40, high: 59 },
  college: { low: 30, high: 39 },
  specialized: { low: 0, high: 29 }
}

describe('Readability Calculation Tests', () => {
  test.each([
    {
      text: 'The cat sat on the mat.',
      formulaConfig: readabilityFormulasConfig.daleChall,
      expected: readLevel.firstToThird
    },
    {
      text: 'She enjoyed reading her new book under the large, shady tree.',
      formulaConfig: readabilityFormulasConfig.daleChall,
      expected: readLevel.fourthToSixth
    },
    {
      text: 'The experiment demonstrated a significant change in water purity when filtered through charcoal.',
      formulaConfig: readabilityFormulasConfig.daleChall,
      expected: readLevel.seventhToNinth
    },
    {
      text: "The protagonist's journey is symbolic of the existential quest for self-discovery and meaning in the universe.",
      formulaConfig: readabilityFormulasConfig.daleChall,
      expected: readLevel.tenthToTwelfth
    },
    {
      text: 'The study explores the correlation between quantum mechanics and general relativity within the framework of cosmological implications.',
      formulaConfig: readabilityFormulasConfig.daleChall,
      expected: readLevel.college
    },
    {
      text: 'Advanced algorithms in computational linguistics can significantly enhance natural language processing capabilities for machine learning applications.',
      formulaConfig: readabilityFormulasConfig.daleChall,
      expected: readLevel.specialized
    },
    {
      text: 'Simple text. Easy to read.',
      formulaConfig: readabilityFormulasConfig.fleschKincaid,
      expected: readLevel.firstToThird
    },
    {
      text: 'A bit more complex text, with longer sentences and more complex words.',
      formulaConfig: readabilityFormulasConfig.gunningFog,
      expected: readLevel.fourthToSixth
    }
    // Add more test cases for different formulas and text complexities
  ])(`$formulaConfig.name check $text`, async ({ text, formulaConfig, expected }) => {
    const score = await calculateReadability(text, formulaConfig)
    expect(score).toBeGreaterThanOrEqual(expected.low).toBeLessThanOrEqual(expected.high)
  })

  test.each([
    {
      htmlContent: '<p>Simple paragraph.</p><p>Another simple paragraph.</p>',
      expected: 90
    },
    {
      htmlContent: '<div>Complex content with <b>bold</b> text and <i>italic</i>.</div>',
      expected: 50
    }
  ])(
    'calculateAggregateReadabilityScore for different HTML contents',
    async ({ htmlContent, expected }) => {
      const result = await calculateAggregateReadabilityScore(htmlContent)
      expect(result.average).toBeGreaterThanOrEqual(expected)
    }
  )
})
