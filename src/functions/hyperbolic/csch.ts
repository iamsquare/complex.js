import { Complex } from '~/complex';
import { subtractStable } from '~/lib/subtractStable';
import { divide } from '~/operations/divide';
import { isInfinite } from '~/operations/isInfinite';
import { isNaNC } from '~/operations/isNaNC';
import { isZero } from '~/operations/isZero';

/**
 * Calculates the hyperbolic cosecant of a complex number: csch(z).
 *
 * The hyperbolic cosecant is the reciprocal of hyperbolic sine: csch(z) = 1 / sinh(z).
 * Uses optimized computation to avoid numerical cancellation.
 *
 * @param z - The complex number.
 * @returns A new Complex number representing csch(z).
 *
 * @example
 * ```typescript
 * const z = new Complex(1, 0);
 * const result = csch(z);
 * console.log(result.toString()); // => approximately "0.851 + 0i"
 * ```
 */
export function csch(z: Complex) {
  if (isInfinite(z) || isNaNC(z)) return Complex.NAN;
  if (isZero(z)) return Complex.INFINITY;

  const { re: a, im: b } = z.getComponents();
  const d = subtractStable(Math.cos(2 * b), Math.cosh(2 * a));

  return divide(new Complex(-2 * Math.sinh(a) * Math.cos(b), 2 * Math.cosh(a) * Math.sin(b)), d);
}
