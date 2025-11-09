import { Complex } from '~/complex';
import { subtractStable } from '~/helpers';
import { divide, isInfinite, isNaNC, isZero, multiply } from '~/operations';

/**
 * Calculates the cotangent of a complex number: cot(z).
 *
 * The cotangent is the reciprocal of tangent: cot(z) = 1 / tan(z) = cos(z) / sin(z).
 * Uses optimized computation to avoid numerical cancellation.
 *
 * @param z - The complex number.
 * @returns A new Complex number representing cot(z).
 *
 * @example
 * ```typescript
 * const z = new Complex(Math.PI / 2, 0);
 * const result = cot(z);
 * console.log(result.toString()); // => approximately "0 + 0i"
 * ```
 */
export function cot(z: Complex) {
  if (isInfinite(z) || isNaNC(z)) return Complex.NAN;
  if (isZero(z)) return Complex.INFINITY;

  const { re: a2, im: b2 } = multiply(2, z).getComponents();
  const d = subtractStable(Math.cosh(b2), Math.cos(a2));

  return divide(new Complex(Math.sin(a2), -Math.sinh(b2)), d);
}
