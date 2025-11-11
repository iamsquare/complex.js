import { Complex } from '~/complex';
import { addStable } from '~/lib/addStable';
import { divide } from '~/operations/divide';
import { isInfinite } from '~/operations/isInfinite';
import { isNaNC } from '~/operations/isNaNC';
import { isZero } from '~/operations/isZero';
import { multiply } from '~/operations/multiply';

/**
 * Calculates the tangent of a complex number: tan(z).
 *
 * Computed as tan(z) = sin(z) / cos(z), with optimizations to avoid numerical cancellation.
 *
 * @param z - The complex number.
 * @returns A new Complex number representing tan(z).
 *
 * @example
 * ```typescript
 * const z = new Complex(0, 0);
 * const result = tan(z);
 * console.log(result.toString()); // => "0"
 * ```
 */
export function tan(z: Complex) {
  if (isInfinite(z) || isNaNC(z)) return Complex.NAN;
  if (isZero(z)) return Complex.ZERO;

  const { re: a2, im: b2 } = multiply(2, z).getComponents();
  const d = addStable(Math.cos(a2), Math.cosh(b2));

  return divide(new Complex(Math.sin(a2), Math.sinh(b2)), d);
}
