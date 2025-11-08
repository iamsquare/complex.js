import Complex from '~/complex';
import { isInfinite, isNaNC, isZero } from '~/operations';

/**
 * Calculates the hyperbolic cosine of a complex number: cosh(z).
 *
 * For z = a + ib, cosh(z) = cosh(a)cos(b) + i*sinh(a)sin(b).
 *
 * @param z - The complex number.
 * @returns A new Complex number representing cosh(z).
 *
 * @example
 * ```typescript
 * const z = new Complex(0, 0);
 * const result = cosh(z);
 * console.log(result.toString()); // => "1"
 * ```
 */
export default function cosh(z: Complex) {
  if (isInfinite(z) || isNaNC(z)) return Complex.NAN;
  if (isZero(z)) return Complex.ONE;

  const a = z.getRe();
  const b = z.getIm();

  return new Complex(Math.cosh(a) * Math.cos(b), Math.sinh(a) * Math.sin(b));
}
