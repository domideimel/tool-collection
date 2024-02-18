import { isEmpty, omitBy, random, sample, range } from 'lodash-es';
import type { GenerationProperties, RandomFunc } from '~/types/password-generator.model';

/**
 * Create a string of special Chars
 */

const createSymbolString = (): string[] => {
  const asciiCharsRanges: number[] = [...range(33, 48), ...range(58, 65), ...range(91, 97), ...range(123, 127)];
  return asciiCharsRanges.map(char => String.fromCharCode(char));
};

/**
 * Generates Random Char
 */

const getRandomChar = (start: number, end: number): string => String.fromCharCode(random(start, end));

/**
 * Generates Random Symbol
 */

const getRandomSymbol = (symbols: string[] = createSymbolString()): string => symbols[random(0, symbols.length - 1)];

/**
 * Generate Password
 */

const randomFunc: RandomFunc = {
  lower: () => getRandomChar(97, 122),
  upper: () => getRandomChar(65, 90),
  number: () => getRandomChar(48, 57),
  symbol: getRandomSymbol,
};

const generatePassword = ({ length, ...args }: GenerationProperties): string => {
  type FilteredTypes = Omit<GenerationProperties, 'length'>;
  const filteredTypes = omitBy<FilteredTypes>(args, value => !Boolean(value));
  if (isEmpty(filteredTypes)) return '';
  const typesArray = Object.entries(filteredTypes as FilteredTypes);

  return Array.from({ length }, () => {
    const [type] = sample(typesArray) as [keyof FilteredTypes, boolean];
    return randomFunc[type as keyof RandomFunc]();
  }).join('');
};

export { generatePassword };
