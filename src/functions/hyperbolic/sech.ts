import { Complex } from '~/complex';
import { addStable } from '~/helpers';
import { divide, isInfinite, isNaNC, isZero } from '~/operations';

/**
 * Calculates the hyperbolic secant of a complex number: sech(z).
 *
 * The hyperbolic secant is the reciprocal of hyperbolic cosine: sech(z) = 1 / cosh(z).
 * Uses optimized computation to avoid numerical cancellation.
 *
 * @param z - The complex number.
 * @returns A new Complex number representing sech(z).
 *
 * @example
 * ```typescript
 * const z = new Complex(0, 0);
 * const result = sech(z);
 * console.log(result.toString()); // => "1"
 * ```
 */
export function sech(z: Complex) {
  if (isInfinite(z) || isNaNC(z)) return Complex.NAN;
  if (isZero(z)) return Complex.ONE;

  const { re: a, im: b } = z.getComponents();
  const d = addStable(Math.cosh(2 * a), Math.cos(2 * b));

  return divide(new Complex(2 * Math.cosh(a) * Math.cos(b), -2 * Math.sinh(a) * Math.sin(b)), d);
}
