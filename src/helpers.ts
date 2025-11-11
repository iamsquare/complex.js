const isNumber = (x: unknown): x is number => typeof x === 'number';
const isNullish = (x: unknown): x is null | undefined => x === undefined || x === null;
const isObject = (x: unknown): x is Record<string, unknown> => typeof x === 'object' && x !== null;

/**
 * Cartesian coordinate type definition.
 *
 * Represents a complex number in Cartesian form with x (real part) and y (imaginary part).
 */
export type Cartesian = {
  /** The real part of the complex number. */
  x: number;
  /** The imaginary part of the complex number. */
  y: number;
};

/**
 * Checks if an object is a Cartesian coordinate.
 *
 * @param obj - The object to check.
 * @returns `true` if obj is a Cartesian coordinate (has x and y number properties), `false` otherwise.
 *
 * @example
 * ```typescript
 * const coord = { x: 1, y: 2 };
 * console.log(isCartesian(coord)); // => true
 *
 * const notCoord = { a: 1, b: 2 };
 * console.log(isCartesian(notCoord)); // => false
 * ```
 */
export function isCartesian(obj?: unknown): obj is Cartesian {
  if (isNullish(obj) || !isObject(obj)) return false;

  return Object.hasOwn(obj, 'x') && Object.hasOwn(obj, 'y') && isNumber(obj.x) && isNumber(obj.y);
}

/**
 * Polar coordinate type definition.
 *
 * Represents a complex number in polar form with r (modulus/radius) and p (phase/argument in radians).
 */
export type Polar = {
  /** The modulus (magnitude/radius) of the complex number. */
  r: number;
  /** The phase (argument) of the complex number in radians. */
  p: number;
};

/**
 * Checks if an object is a Polar coordinate.
 *
 * @param obj - The object to check.
 * @returns `true` if obj is a Polar coordinate (has r and p number properties), `false` otherwise.
 *
 * @example
 * ```typescript
 * const coord = { r: 1, p: Math.PI / 2 };
 * console.log(isPolar(coord)); // => true
 *
 * const notCoord = { radius: 1, phase: Math.PI / 2 };
 * console.log(isPolar(notCoord)); // => false
 * ```
 */
export function isPolar(obj?: unknown): obj is Polar {
  if (isNullish(obj) || !isObject(obj)) return false;

  return Object.hasOwn(obj, 'r') && Object.hasOwn(obj, 'p') && isNumber(obj.r) && isNumber(obj.p);
}
