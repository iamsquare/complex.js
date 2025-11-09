import type { Complex } from '~/complex';
import { isApproximatelyEqual } from '~/helpers';

/**
 * Checks if a complex number is purely imaginary (has zero real part and non-zero imaginary part).
 *
 * A complex number is purely imaginary if its real part is approximately zero (within epsilon tolerance)
 * and its imaginary part is not approximately zero. Note that zero (0 + 0i) is not considered purely imaginary.
 *
 * @param z - The complex number to check.
 * @returns `true` if z is purely imaginary, `false` otherwise.
 *
 * @example
 * ```typescript
 * const z1 = new Complex(0, 5);
 * console.log(isPureImaginary(z1)); // => true
 *
 * const z2 = new Complex(0, 0);
 * console.log(isPureImaginary(z2)); // => false
 * ```
 */
export function isPureImaginary(z: Complex) {
  return isApproximatelyEqual(z.getRe(), 0) && !isApproximatelyEqual(z.getIm(), 0);
}
