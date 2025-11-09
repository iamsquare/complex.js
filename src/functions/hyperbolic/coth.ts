import { Complex } from '~/complex';
import { subtractStable } from '~/helpers';
import { divide } from '~/operations/divide';
import { isInfinite } from '~/operations/isInfinite';
import { isNaNC } from '~/operations/isNaNC';
import { isZero } from '~/operations/isZero';
import { multiply } from '~/operations/multiply';

/**
 * Calculates the hyperbolic cotangent of a complex number: coth(z).
 *
 * The hyperbolic cotangent is the reciprocal of hyperbolic tangent: coth(z) = 1 / tanh(z) = cosh(z) / sinh(z).
 * Uses optimized computation to avoid numerical cancellation.
 *
 * @param z - The complex number.
 * @returns A new Complex number representing coth(z).
 *
 * @example
 * ```typescript
 * const z = new Complex(1, 0);
 * const result = coth(z);
 * console.log(result.toString()); // => approximately "1.313 + 0i"
 * ```
 */
export function coth(z: Complex) {
  if (isInfinite(z) || isNaNC(z)) return Complex.NAN;
  if (isZero(z)) return Complex.INFINITY;

  const { re: a2, im: b2 } = multiply(2, z).getComponents();
  const d = subtractStable(Math.cos(b2), Math.cosh(a2));

  return divide(new Complex(-Math.sinh(a2), Math.sin(b2)), d);
}
