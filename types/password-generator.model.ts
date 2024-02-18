type BooleanProperties = 'lower' | 'upper' | 'number' | 'symbol';

type RandomFunction = () => string;

export type GenerationProperties = Record<BooleanProperties, boolean> & { length: number };

export interface RandomFunc extends Record<BooleanProperties, RandomFunction> {}

export type PasswordMap = Map<string, string>;
