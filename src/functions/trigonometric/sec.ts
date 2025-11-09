import { Complex } from '~/complex';
import { addStable } from '~/helpers';
import { divide } from '~/operations/divide';
import { isInfinite } from '~/operations/isInfinite';
import { isNaNC } from '~/operations/isNaNC';
import { isZero } from '~/operations/isZero';

/**
 * Calculates the secant of a complex number: sec(z).
 *
 * The secant is the reciprocal of cosine: sec(z) = 1 / cos(z).
 * Uses optimized computation to avoid numerical cancellation.
 *
 * @param z - The complex number.
 * @returns A new Complex number representing sec(z).
 *
 * @example
 * ```typescript
 * const z = new Complex(0, 0);
 * const result = sec(z);
 * console.log(result.toString()); // => "1"
 * ```
 */
export function sec(z: Complex) {
  if (isInfinite(z) || isNaNC(z)) return Complex.NAN;
  if (isZero(z)) return Complex.ONE;

  const { re: a, im: b } = z.getComponents();
  const d = addStable(Math.cos(2 * a), Math.cosh(2 * b));

  return divide(new Complex(2 * Math.cos(a) * Math.cosh(b), 2 * Math.sin(a) * Math.sinh(b)), d);
}
