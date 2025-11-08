const isNumber = (x: unknown): x is number => typeof x === 'number';
const isNullish = (x: unknown): x is null | undefined => x === undefined || x === null;
const isObject = (x: unknown): x is Record<string, unknown> => typeof x === 'object' && x !== null;

/**
 * Cartesian Coordinate type definition
 */
export type Cartesian = {
  x: number;
  y: number;
};

/**
 * An helper function that checks if an object is a Cartesian coordinate.
 */
export function isCartesian(obj?: unknown): obj is Cartesian {
  if (isNullish(obj) || !isObject(obj)) return false;

  return Object.hasOwn(obj, 'x') && Object.hasOwn(obj, 'y') && isNumber(obj.x) && isNumber(obj.y);
}

/**
 * Polar coordinate type definition
 */
export type Polar = {
  r: number;
  p: number;
};

/**
 * An helper function that checks if an object is a Polar coordinate.
 */
export function isPolar(obj?: unknown): obj is Polar {
  if (isNullish(obj) || !isObject(obj)) return false;

  return Object.hasOwn(obj, 'r') && Object.hasOwn(obj, 'p') && isNumber(obj.r) && isNumber(obj.p);
}
