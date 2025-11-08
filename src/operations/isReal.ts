import type { Complex } from '~/complex';

/**
 * Checks if a complex number is a real number (has zero imaginary part).
 *
 * A complex number is real if its imaginary part is exactly zero, meaning it lies on the real axis.
 *
 * @param z - The complex number to check.
 * @returns `true` if z is a real number (imaginary part is zero), `false` otherwise.
 *
 * @example
 * ```typescript
 * const z1 = new Complex(5, 0);
 * console.log(isReal(z1)); // => true
 *
 * const z2 = new Complex(5, 3);
 * console.log(isReal(z2)); // => false
 * ```
 */
export function isReal(z: Complex) {
  return z.getIm() === 0;
}
