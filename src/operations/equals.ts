import { type Complex } from '~/complex';
import { isApproximatelyEqual } from '~/helpers';
import { isInfinite } from '~/operations/isInfinite';
import { isNaNC } from '~/operations/isNaNC';

/**
 * Checks if two complex numbers are equal: z = w.
 *
 * Uses a robust floating-point comparison that combines absolute and relative error
 * to account for precision errors. For values near zero, uses absolute error:
 * |a - b| < ε. For values away from zero, uses relative error:
 * |a - b| < ε · max(|a|, |b|). Two numbers are considered equal if both their
 * real and imaginary parts are approximately equal using this method.
 *
 * Special cases:
 * - Two infinite numbers are considered equal.
 * - NaN is never equal to anything, including itself.
 *
 * @param z - The first complex number.
 * @param w - The second complex number.
 * @returns `true` if z and w are equal (within epsilon tolerance), `false` otherwise.
 *
 * @example
 * ```typescript
 * const z1 = new Complex(1, 2);
 * const z2 = new Complex(1, 2);
 * console.log(equals(z1, z2)); // => true
 *
 * const z3 = new Complex(1.0000001, 2);
 * console.log(equals(z1, z3)); // => true (within epsilon)
 * ```
 */
export function equals(z: Complex, w: Complex) {
  if (isInfinite(z) && isInfinite(w)) return true;
  if (isNaNC(z) || isNaNC(w)) return false;

  return isApproximatelyEqual(z.getRe(), w.getRe()) && isApproximatelyEqual(z.getIm(), w.getIm());
}
