import { Complex } from '~/complex';
import { isInfinite } from '~/operations/isInfinite';
import { isNaNC } from '~/operations/isNaNC';
import { isZero } from '~/operations/isZero';

/**
 * Calculates the complex conjugate of a complex number: z̅.
 *
 * The complex conjugate of a + ib is a - ib. It reflects the number across the real axis.
 *
 * @param z - The complex number.
 * @returns A new Complex number representing the conjugate of z.
 *
 * @example
 * ```typescript
 * const z = new Complex(3, 4);
 * const conj = conjugate(z);
 * console.log(conj.toString()); // => "3 - 4i"
 * ```
 */
export function conjugate(z: Complex) {
  if (isNaNC(z)) return Complex.NAN;
  if (isInfinite(z)) return Complex.INFINITY;
  if (isZero(z)) return Complex.ZERO;

  return new Complex(z.getRe(), -z.getIm());
}
