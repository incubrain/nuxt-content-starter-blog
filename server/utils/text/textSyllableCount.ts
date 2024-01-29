type ProblematicWordsType = {
  [key: string]: number
}

const problematicWords: ProblematicWordsType = {
  abalone: 4,
  abare: 3,
  abbruzzese: 4,
  abed: 2,
  aborigine: 5,
  abruzzese: 4,
  acreage: 3,
  adame: 3,
  adieu: 2,
  adobe: 3,
  anemone: 4,
  anyone: 3,
  apache: 3,
  aphrodite: 4,
  apostrophe: 4,
  ariadne: 4,
  cafe: 2,
  calliope: 4,
  catastrophe: 4,
  chile: 2,
  chloe: 2,
  circe: 2,
  coyote: 3,
  daphne: 2,
  epitome: 4,
  eurydice: 4,
  euterpe: 3,
  every: 2,
  everywhere: 3,
  forever: 3,
  gethsemane: 4,
  guacamole: 4,
  hermione: 4,
  hyperbole: 4,
  jesse: 2,
  jukebox: 2,
  karate: 3,
  machete: 3,
  maybe: 2,
  naive: 2,
  newlywed: 3,
  penelope: 4,
  people: 2,
  persephone: 4,
  phoebe: 2,
  pulse: 1,
  queue: 1,
  recipe: 3,
  riverbed: 3,
  sesame: 3,
  shoreline: 2,
  simile: 3,
  snuffleupagus: 5,
  sometimes: 2,
  syncope: 3,
  tamale: 3,
  waterbed: 3,
  wednesday: 2,
  yosemite: 4,
  zoe: 2
}

// Two expressions of occurrences which normally would be counted as two
// syllables, but should be counted as one.
const EXPRESSION_MONOSYLLABIC_ONE = new RegExp(
  [
    'awe($|d|so)',
    'cia(?:l|$)',
    'tia',
    'cius',
    'cious',
    '[^aeiou]giu',
    '[aeiouy][^aeiouy]ion',
    'iou',
    'sia$',
    'eous$',
    '[oa]gue$',
    '.[^aeiuoycgltdb]{2,}ed$',
    '.ely$',
    '^jua',
    'uai',
    'eau',
    '^busi$',
    '(?:[aeiouy](?:' +
      [
        '[bcfgklmnprsvwxyz]',
        'ch',
        'dg',
        'g[hn]',
        'lch',
        'l[lv]',
        'mm',
        'nch',
        'n[cgn]',
        'r[bcnsv]',
        'squ',
        's[chkls]',
        'th'
      ].join('|') +
      ')ed$)',
    '(?:[aeiouy](?:' +
      [
        '[bdfklmnprstvy]',
        'ch',
        'g[hn]',
        'lch',
        'l[lv]',
        'mm',
        'nch',
        'nn',
        'r[nsv]',
        'squ',
        's[cklst]',
        'th'
      ].join('|') +
      ')es$)'
  ].join('|'),
  'g'
)

const EXPRESSION_MONOSYLLABIC_TWO = new RegExp(
  '[aeiouy](?:' +
    [
      '[bcdfgklmnprstvyz]',
      'ch',
      'dg',
      'g[hn]',
      'l[lv]',
      'mm',
      'n[cgns]',
      'r[cnsv]',
      'squ',
      's[cklst]',
      'th'
    ].join('|') +
    ')e$',
  'g'
)

// Four expression of occurrences which normally would be counted as one
// syllable, but should be counted as two.
const EXPRESSION_DOUBLE_SYLLABIC_ONE = new RegExp(
  '(?:' +
    [
      '([^aeiouy])\\1l',
      '[^aeiouy]ie(?:r|s?t)',
      '[aeiouym]bl',
      'eo',
      'ism',
      'asm',
      'thm',
      'dnt',
      'snt',
      'uity',
      'dea',
      'gean',
      'oa',
      'ua',
      'react?',
      'orbed', // Cancel `'.[^aeiuoycgltdb]{2,}ed$',`
      'shred', // Cancel `'.[^aeiuoycgltdb]{2,}ed$',`
      'eings?',
      '[aeiouy]sh?e[rs]'
    ].join('|') +
    ')$',
  'g'
)

const EXPRESSION_DOUBLE_SYLLABIC_TWO = new RegExp(
  [
    'creat(?!u)',
    '[^gq]ua[^auieo]',
    '[aeiou]{3}',
    '^(?:ia|mc|coa[dglx].)',
    '^re(app|es|im|us)',
    '(th|d)eist'
  ].join('|'),
  'g'
)

const EXPRESSION_DOUBLE_SYLLABIC_THREE = new RegExp(
  [
    '[^aeiou]y[ae]',
    '[^l]lien',
    'riet',
    'dien',
    'iu',
    'io',
    'ii',
    'uen',
    '[aeilotu]real',
    'real[aeilotu]',
    'iell',
    'eo[^aeiou]',
    '[aeiou]y[aeiou]'
  ].join('|'),
  'g'
)

const EXPRESSION_DOUBLE_SYLLABIC_FOUR = /[^s]ia/

// Expression to match single syllable pre- and suffixes.
const EXPRESSION_SINGLE = new RegExp(
  [
    '^(?:' +
      [
        'un',
        'fore',
        'ware',
        'none?',
        'out',
        'post',
        'sub',
        'pre',
        'pro',
        'dis',
        'side',
        'some'
      ].join('|') +
      ')',
    '(?:' +
      [
        'ly',
        'less',
        'some',
        'ful',
        'ers?',
        'ness',
        'cians?',
        'ments?',
        'ettes?',
        'villes?',
        'ships?',
        'sides?',
        'ports?',
        'shires?',
        '[gnst]ion(?:ed|s)?'
      ].join('|') +
      ')$'
  ].join('|'),
  'g'
)

// Expression to match double syllable pre- and suffixes.
const EXPRESSION_DOUBLE = new RegExp(
  [
    '^' +
      '(?:' +
      [
        'above',
        'anti',
        'ante',
        'counter',
        'hyper',
        'afore',
        'agri',
        'infra',
        'intra',
        'inter',
        'over',
        'semi',
        'ultra',
        'under',
        'extra',
        'dia',
        'micro',
        'mega',
        'kilo',
        'pico',
        'nano',
        'macro',
        'somer'
      ].join('|') +
      ')',
    '(?:fully|berry|woman|women|edly|union|((?:[bcdfghjklmnpqrstvwxz])|[aeiou])ye?ing)$'
  ].join('|'),
  'g'
)

// Expression to match triple syllable suffixes.
const EXPRESSION_TRIPLE = /(creations?|ology|ologist|onomy|onomist)$/g

// Normalize and clean the string before processing
function preprocessString(value: string) {
  return value
    .toLowerCase()
    .replaceAll(/['’]/g, '') // Remove apostrophes
    .split(/\b/g) // Split on word boundaries
    .map((word: string) => word.replaceAll(/[^a-z]/g, '')) // Remove non-alphabetic characters
}

export function getSyllableCount(value: string) {
  const values = preprocessString(String(value))

  let index = -1
  let sum = 0

  while (++index < values.length) {
    // Remove non-alphabetic characters from a given value.
    sum += one(values[index].replace(/[^a-z]/g, ''))
  }

  return sum
}

function one(value: string) {
  if (problematicWords.hasOwnProperty(value)) {
    return problematicWords[value]
  }
  let count = 0

  if (value.length === 0) return 0
  if (value.length < 3) return 1

  if (value.length >= 5) {
    value = value
      .replace(EXPRESSION_TRIPLE, countFactory(3))
      .replace(EXPRESSION_DOUBLE, countFactory(2))
  }

  value = value
    .replace(EXPRESSION_MONOSYLLABIC_ONE, countFactory(-1))
    .replace(EXPRESSION_MONOSYLLABIC_TWO, countFactory(-1))

  value = value
    .replace(EXPRESSION_DOUBLE_SYLLABIC_ONE, countFactory(1))
    .replace(EXPRESSION_DOUBLE_SYLLABIC_TWO, countFactory(1))
    .replace(EXPRESSION_DOUBLE_SYLLABIC_THREE, countFactory(1))
    .replace(EXPRESSION_DOUBLE_SYLLABIC_FOUR, countFactory(1))

  const parts = value.split(/[^aeiouy]+/)
  count += parts.filter((part) => part !== '').length

  return Math.max(count, 1)

  function countFactory(change: number) {
    return () => {
      count += change
      return ''
    }
  }
}

export async function countSyllables(words: string[]): Promise<number> {
  let syllableCount = 0
  words.forEach((word) => {
    syllableCount += getSyllableCount(word)
  })
  return syllableCount
}
