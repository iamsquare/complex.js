import { Complex } from '~/complex';
import { isInfinite } from '~/operations/isInfinite';
import { isNaNC } from '~/operations/isNaNC';
import { isZero } from '~/operations/isZero';

/**
 * Negates a complex number: -z.
 *
 * Returns the additive inverse: -(a + ib) = -a - ib.
 *
 * @param z - The complex number to negate.
 * @returns A new Complex number representing -z.
 *
 * @example
 * ```typescript
 * const z = new Complex(3, 4);
 * const neg = negate(z);
 * console.log(neg.toString()); // => "-3 - 4i"
 * ```
 */
export function negate(z: Complex) {
  if (isNaNC(z)) return Complex.NAN;
  if (isInfinite(z)) return Complex.INFINITY;
  if (isZero(z)) return Complex.ZERO;

  return new Complex(-z.getRe(), -z.getIm());
}
