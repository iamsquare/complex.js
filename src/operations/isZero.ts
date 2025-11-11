import type { Complex } from '~/complex';
import { isApproximatelyEqual } from '~/lib/isApproximatelyEqual';

/**
 * Checks if a complex number is zero: z = 0.
 *
 * A complex number is zero if both its real and imaginary parts are approximately zero
 * (within epsilon tolerance).
 *
 * @param z - The complex number to check.
 * @returns `true` if z is zero (0 + 0i), `false` otherwise.
 *
 * @example
 * ```typescript
 * const z1 = new Complex(0, 0);
 * console.log(isZero(z1)); // => true
 *
 * const z2 = new Complex(0, 1);
 * console.log(isZero(z2)); // => false
 * ```
 */
export function isZero(z: Complex) {
  return isApproximatelyEqual(z.getRe(), 0) && isApproximatelyEqual(z.getIm(), 0);
}
