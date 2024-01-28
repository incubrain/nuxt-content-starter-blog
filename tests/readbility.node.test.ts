import { test, expect } from 'vitest'

const testVar = 4

test('my test', () => {
  console.log('test working')
  expect(testVar === 4)
})
