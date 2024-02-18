import { isEmpty, omitBy, random, sample } from 'lodash-es'
import type { GenerationProperties, RandomFunc } from '~/types/password-generator.model'

/**
 * Create an array and fill it with a range of numbers
 */
const range = (start: number, end: number): number[] => {
  return Array(end - start + 1)
    .fill(null)
    .map((_, idx) => start + idx)
}

/**
 * Create a string of special Chars
 */
const createSymbolString = (): string[] => {
  const asciiCharsRanges: number[] = [...range(33, 47), ...range(58, 64), ...range(91, 96), ...range(123, 126)]
  return asciiCharsRanges.map(char => String.fromCharCode(char))
}

/**
 * Generates Random Char
 */
const getRandomChar = (start: number, end: number): string => String.fromCharCode(random(start, end));

/**
 * Generates Random Symbol
 */
const getRandomSymbol = (symbols: string [] = createSymbolString()): string => symbols[random(0, symbols.length - 1)]

/**
 * Generate Password
 */

const randomFunc: RandomFunc = {
  lower: () => getRandomChar(97, 122),
  upper: () => getRandomChar(65, 90),
  number: () => getRandomChar(48, 57),
  symbol: getRandomSymbol
}

const generatePassword = ({ length, ...args }: GenerationProperties): string => {
  type FilteredTypes = Omit<GenerationProperties, 'length'>
  const filteredTypes = omitBy<FilteredTypes>(args, (value) => !Boolean(value))
  if (isEmpty(filteredTypes)) return ''
  const typesArray = Object.entries(filteredTypes as FilteredTypes)

  return Array.from({ length }, () => {
    const [type] = sample(typesArray) as [keyof FilteredTypes, boolean]
    return randomFunc[type as keyof RandomFunc]()
  }).join('')
}

export {
   getRandomSymbol, generatePassword
}
