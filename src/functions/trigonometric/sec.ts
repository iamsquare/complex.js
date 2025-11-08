import Complex from '~/complex';
import { isInfinite, isNaNC, isZero } from '~/operations';

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
export default function sec(z: Complex) {
  if (isInfinite(z) || isNaNC(z)) return Complex.NAN;
  if (isZero(z)) return Complex.ONE;

  // We avoid numeric cancellation by expanding the denominator and simplifying with trigonometric rules.
  const a = z.getRe();
  const b = z.getIm();
  const d = Math.cos(2 * a) + Math.cosh(2 * b);

  return new Complex((2 * (Math.cos(a) * Math.cosh(b))) / d, (2 * (Math.sin(a) * Math.sinh(b))) / d);
}
