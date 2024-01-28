import { technicalTerms, readabilityFormulasConfig } from '~/server/utils/seo/seoReadability'
import { describe, test, expect } from 'vitest'

describe('Readability Configuration Tests', () => {
  test('Technical terms are defined and non-empty', () => {
    expect(technicalTerms).toBeDefined()
    expect(technicalTerms.size).toBeGreaterThan(0)
  })

  test('Technical terms contain specific expected terms', () => {
    const expectedTerms = ['array', 'function', 'variable'] // Adjust according to your actual terms
    expectedTerms.forEach((term) => {
      expect(technicalTerms.has(term)).toBeTruthy()
    })
  })

  test('Readability formulas configuration is defined', () => {
    expect(readabilityFormulasConfig).toBeDefined()
  })

  describe('Dale-Chall Configuration', () => {
    const daleChallConfig = readabilityFormulasConfig.daleChall

    test('Dale-Chall configuration exists', () => {
      expect(daleChallConfig).toBeDefined()
    })

    test('Dale-Chall configuration has required properties', () => {
      expect(daleChallConfig).toHaveProperty('adjustmentFactor')
      expect(daleChallConfig).toHaveProperty('difficultWordWeight')
      expect(daleChallConfig).toHaveProperty('sentenceLengthWeight')
      expect(daleChallConfig).toHaveProperty('threshold')
    })

    test('Dale-Chall configuration properties are of correct type', () => {
      expect(typeof daleChallConfig.adjustmentFactor).toBe('number')
      expect(typeof daleChallConfig.difficultWordWeight).toBe('number')
      expect(typeof daleChallConfig.sentenceLengthWeight).toBe('number')
      expect(typeof daleChallConfig.threshold).toBe('number')
    })
  })

  // Similar tests for Flesch-Kincaid and Gunning Fog configurations
})
