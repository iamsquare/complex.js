import { Complex } from '~/complex';

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

/**
 * Performs numerically stable addition of two numbers.
 *
 * Adds numbers of similar small magnitude together before adding to larger magnitude numbers
 * to reduce rounding errors.
 *
 * @param x - The first number.
 * @param y - The second number.
 * @returns The sum x + y computed in a numerically stable way.
 */
export function addStable(x: number, y: number): number {
  const xAbs = Math.abs(x);
  const yAbs = Math.abs(y);

  const xIsZero = isApproximatelyEqual(xAbs, 0);
  const yIsZero = isApproximatelyEqual(yAbs, 0);

  if (xIsZero) return yIsZero ? 0 : y;
  if (yIsZero) return xIsZero ? 0 : x;

  return Math.min(xAbs, yAbs) < 0.1 * Math.max(xAbs, yAbs) ? (xAbs < yAbs ? y + x : x + y) : x + y;
}

/**
 * Performs numerically stable subtraction of two numbers.
 *
 * When subtracting numbers of similar magnitudes, subtracts a common value from both
 * before performing the subtraction to avoid loss of significant digits.
 *
 * @param x - The number to subtract from (minuend).
 * @param y - The number to subtract (subtrahend).
 * @returns The difference x - y computed in a numerically stable way.
 */
export function subtractStable(x: number, y: number): number {
  const xAbs = Math.abs(x);
  const yAbs = Math.abs(y);

  const xIsZero = isApproximatelyEqual(xAbs, 0);
  const yIsZero = isApproximatelyEqual(yAbs, 0);

  if (xIsZero) return yIsZero ? 0 : -y;
  if (yIsZero) return xIsZero ? 0 : x;

  const minAbs = Math.min(xAbs, yAbs);
  const maxAbs = Math.max(xAbs, yAbs);

  if (minAbs > 0.5 * maxAbs) {
    const m = xAbs < yAbs ? x : y;

    return x - m - (y - m);
  }

  return x - y;
}

/**
 * Checks if two floating-point numbers are approximately equal using a combination
 * of absolute and relative error. This is more robust than simple epsilon comparison.
 *
 * For values near zero, uses absolute error: |a - b| < ε
 * For values away from zero, uses relative error: |a - b| < ε · max(|a|, |b|)
 *
 * @param a - First number
 * @param b - Second number
 * @param epsilon - Maximum allowed error (defaults to Complex.EPSILON)
 * @returns True if numbers are approximately equal
 *
 * @example
 * ```typescript
 * isApproximatelyEqual(0.1 + 0.2, 0.3); // => true
 * isApproximatelyEqual(1, 1.0001, 0.001); // => true
 * isApproximatelyEqual(1, 2); // => false
 * ```
 */
export function isApproximatelyEqual(a: number, b: number, epsilon: number = Complex.EPSILON): boolean {
  if (Number.isNaN(a) || Number.isNaN(b)) return false;
  if (!Number.isFinite(a) || !Number.isFinite(b)) return a === b;

  if (a === b) return true;

  const absA = Math.abs(a);
  const absB = Math.abs(b);
  const maxAbs = Math.max(absA, absB);

  if (maxAbs < 1) return Math.abs(a - b) < epsilon;

  return Math.abs(a - b) < epsilon * maxAbs;
}
