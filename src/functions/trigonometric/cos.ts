import Complex from '~/complex';
import { isInfinite, isNaNC, isZero } from '~/operations';

/**
 * Calculates the cosine of a complex number: cos(z).
 *
 * For z = a + ib, cos(z) = cos(a)cosh(b) - i*sin(a)sinh(b).
 *
 * @param z - The complex number.
 * @returns A new Complex number representing cos(z).
 *
 * @example
 * ```typescript
 * const z = new Complex(0, 0);
 * const result = cos(z);
 * console.log(result.toString()); // => "1"
 * ```
 */
export default function cos(z: Complex) {
  if (isInfinite(z) || isNaNC(z)) return Complex.NAN;
  if (isZero(z)) return Complex.ONE;

  const a = z.getRe();
  const b = z.getIm();

  return new Complex(Math.cos(a) * Math.cosh(b), -Math.sin(a) * Math.sinh(b));
}
