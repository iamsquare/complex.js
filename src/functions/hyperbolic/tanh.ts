import { Complex } from '~/complex';
import { addStable } from '~/helpers';
import { divide } from '~/operations/divide';
import { isInfinite } from '~/operations/isInfinite';
import { isNaNC } from '~/operations/isNaNC';
import { isZero } from '~/operations/isZero';
import { multiply } from '~/operations/multiply';

/**
 * Calculates the hyperbolic tangent of a complex number: tanh(z).
 *
 * Computed as tanh(z) = sinh(z) / cosh(z), with optimizations to avoid numerical cancellation.
 *
 * @param z - The complex number.
 * @returns A new Complex number representing tanh(z).
 *
 * @example
 * ```typescript
 * const z = new Complex(0, 0);
 * const result = tanh(z);
 * console.log(result.toString()); // => "0"
 * ```
 */
export function tanh(z: Complex) {
  if (isInfinite(z) || isNaNC(z)) return Complex.NAN;
  if (isZero(z)) return Complex.ZERO;

  const { re: a, im: b } = multiply(z, 2).getComponents();

  return divide(new Complex(Math.sinh(a), Math.sin(b)), addStable(Math.cosh(a), Math.cos(b)));
}
