import {
  calculateReadability,
  calculateAggregateReadabilityScore,
  readabilityFormulasConfig,
  type ReadabilityFormulaConfig
} from '~/server/utils/seo/seoReadability'
import { describe, test, expect } from 'vitest'

describe('Readability Calculation Tests', () => {
  test.each([
    {
      text: 'Simple text. Easy to read.',
      formulaConfig: readabilityFormulasConfig.fleschKincaid,
      expected: 90
    },
    {
      text: 'A bit more complex text, with longer sentences and more complex words.',
      formulaConfig: readabilityFormulasConfig.gunningFog,
      expected: 50
    }
    // Add more test cases for different formulas and text complexities
  ])('calculateReadability with different formulas', async ({ text, formulaConfig, expected }) => {
    const score = await calculateReadability(text, formulaConfig)
    expect(score).toBeGreaterThanOrEqual(expected)
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
      expect(result.score).toBeGreaterThanOrEqual(expected)
    }
  )
})
