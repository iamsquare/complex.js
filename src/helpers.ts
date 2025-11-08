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

  // If magnitudes are similar, add directly
  if (xAbs === 0) return y;
  if (yAbs === 0) return x;

  // If magnitudes are very different (ratio < 0.1), add smaller to larger
  // Otherwise, add directly (they're similar enough)
  return Math.min(xAbs, yAbs) / Math.max(xAbs, yAbs) < 0.1 ? (xAbs < yAbs ? y + x : x + y) : x + y;
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

  if (xAbs === 0) return y === 0 ? 0 : -y;
  if (yAbs === 0) return x;

  const minAbs = Math.min(xAbs, yAbs);
  const maxAbs = Math.max(xAbs, yAbs);

  // If magnitudes are similar, use stable subtraction by subtracting a common value
  if (minAbs / maxAbs > 0.5) {
    // Choose the value with smaller absolute magnitude as the common value to subtract
    // This minimizes the magnitude of the intermediate results
    const m = xAbs < yAbs ? x : y;

    return x - m - (y - m);
  }

  return x - y;
}
