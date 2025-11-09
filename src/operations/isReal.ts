import type { Complex } from '~/complex';
import { isApproximatelyEqual } from '~/helpers';

/**
 * Checks if a complex number is a real number (has zero imaginary part).
 *
 * A complex number is real if its imaginary part is approximately zero (within epsilon tolerance),
 * meaning it lies on the real axis.
 *
 * @param z - The complex number to check.
 * @returns `true` if z is a real number, `false` otherwise.
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
  return isApproximatelyEqual(z.getIm(), 0);
}
